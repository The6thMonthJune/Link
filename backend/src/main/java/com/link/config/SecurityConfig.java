package com.link.config;

import com.link.security.CustomOAuth2UserService;
import com.link.security.JwtAuthFilter;
import com.link.security.OAuth2SuccessHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// @Configuration : 이 클래스가 Spring 설정 파일임을 알려줌
// 일반 클래스가 아니라 "설정을 담당하는 클래스"라고 Spring에게 선언하는 것
@Configuration

// @EnableWebSecurity : Spring Security 기능을 활성화
// 이게 없으면 아래 설정들이 아무 의미 없음
@EnableWebSecurity
public class SecurityConfig {

    // 다른 클래스를 가져다 씀 (의존성 주입)
    // @Autowired 대신 생성자 주입 방식 사용 (Spring 권장 방식)
    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(CustomOAuth2UserService customOAuth2UserService,
                          OAuth2SuccessHandler oAuth2SuccessHandler,
                          JwtAuthFilter jwtAuthFilter) {
        this.customOAuth2UserService = customOAuth2UserService;
        this.oAuth2SuccessHandler = oAuth2SuccessHandler;
        this.jwtAuthFilter = jwtAuthFilter;
    }

    // @Bean : Spring이 이 메서드의 반환값을 관리하게 함
    // filterChain = 요청이 들어올 때마다 거치는 보안 필터들의 묶음
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // CSRF 보안 비활성화
                // CSRF는 브라우저 기반 세션 공격 방어용인데,
                // 우리는 JWT 토큰 방식이라 필요 없음
                .csrf(csrf -> csrf.disable())

                // 세션 정책 설정
                // STATELESS = 서버가 세션을 아예 만들지 않음
                // JWT 방식은 토큰으로만 인증하므로 세션이 필요 없음
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // URL별 접근 권한 설정
                .authorizeHttpRequests(auth -> auth
                        // 아래 경로들은 로그인 없이 누구나 접근 가능
                        // /api/public/** : 공개 API (** 은 하위 경로 전부 포함)
                        // /login/**     : 로그인 관련 경로
                        // /oauth2/**    : Google OAuth 관련 경로
                        .requestMatchers("/api/public/**", "/login/**", "/oauth2/**").permitAll()

                        // 위에서 허용한 것 외의 모든 요청은 로그인 필요
                        .anyRequest().authenticated()
                )

                // OAuth2 로그인 설정
                .oauth2Login(oauth2 -> oauth2
                        // Google에서 받아온 사용자 정보를 처리할 서비스 지정
                        .userInfoEndpoint(userInfo ->
                                userInfo.userService(customOAuth2UserService))

                        // 로그인 성공했을 때 실행할 핸들러 지정
                        .successHandler(oAuth2SuccessHandler)
                )

                // JWT 필터를 UsernamePasswordAuthenticationFilter 앞에 추가
                // 즉, 요청이 들어오면 JWT 검증을 먼저 하고 그 다음 인증 처리
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}