package com.link.security;

import com.link.domain.user.User;
import com.link.domain.user.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// @Service : 이 클래스가 비즈니스 로직을 담당하는 서비스임을 Spring에게 알림
// Spring이 자동으로 객체를 생성하고 관리함
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    // implements = "이 인터페이스의 규칙을 따르겠다"
    // OAuth2UserService 인터페이스를 구현 → loadUser 메서드를 반드시 작성해야 함

    private final UserRepository userRepository; // DB 접근용

    // Spring 기본 제공 OAuth2UserService
    // 실제로 Google 서버에 요청해서 사용자 정보를 가져오는 역할
    private final DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Google 로그인 성공 후 자동으로 호출되는 메서드
    // OAuth2UserRequest : Google로부터 받은 액세스 토큰 등 요청 정보
    // 반환값 OAuth2User : Spring Security가 인증된 사용자로 인식하는 객체
    // @Transactional : 이 메서드 안에서 일어나는 DB 작업을 하나의 트랜잭션으로 묶음
    // 중간에 오류가 나면 전체 롤백되어 데이터 일관성을 보장함
    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {

        // Google 서버에 실제로 요청해서 사용자 정보(이름, 이메일 등)를 가져옴
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        // Google이 주는 사용자 정보에서 이메일과 이름 꺼내기
        // getAttribute()는 Map에서 값 꺼내는 것과 같음
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String picture = oAuth2User.getAttribute("picture"); // 프로필 이미지 URL

        // DB에서 이메일로 유저 조회
        // Optional = 값이 있을 수도 없을 수도 있는 컨테이너 (null 대신 씀)
        userRepository.findByEmail(email)
                .ifPresentOrElse(
                        // 이미 가입한 유저면 → 이름, 프로필 사진 업데이트
                        existingUser -> existingUser.updateProfile(name, picture),
                        // 처음 로그인하는 유저면 → 새로 DB에 저장
                        () -> userRepository.save(
                                User.builder()
                                        .email(email)
                                        .name(name)
                                        .profileImageUrl(picture) // User 필드명에 맞게 수정
                                        .provider("google")
                                        .build()
                        )
                );

        // Spring Security에게 "이 사람이 로그인했다"고 알려주는 객체 반환
        return oAuth2User;
    }
}