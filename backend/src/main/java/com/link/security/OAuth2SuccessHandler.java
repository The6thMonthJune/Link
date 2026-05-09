package com.link.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

// @Component : Spring이 이 클래스를 자동으로 감지하고 관리하게 함
// @Service, @Controller 등과 같은 역할인데 "어느 계층인지 모를 때" 씀
@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    // AuthenticationSuccessHandler : 로그인 성공 시 동작을 정의하는 인터페이스

    private final JwtTokenProvider jwtTokenProvider;

    public OAuth2SuccessHandler(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    // 로그인 성공하면 Spring Security가 이 메서드를 자동으로 호출
    // request  : 들어온 HTTP 요청
    // response : 내보낼 HTTP 응답
    // authentication : 로그인한 사용자의 인증 정보
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        // authentication에서 OAuth2 사용자 정보 꺼내기
        // getPrincipal() = "현재 로그인한 주체(사람)"를 가져옴
        // (OAuth2User) = 타입 캐스팅 (Object → OAuth2User로 변환)
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        // 사용자 이메일 추출
        String email = oAuth2User.getAttribute("email");

        // 이메일 기반으로 JWT 토큰 생성
        String token = jwtTokenProvider.createToken(email);

        // 로그인 성공 후 프론트엔드로 리디렉션
        // URL 뒤에 토큰을 붙여서 전달
        // 프론트에서 이 토큰을 받아서 저장하고 이후 요청에 사용
        response.sendRedirect("http://localhost:3000?token=" + token);
    }
}