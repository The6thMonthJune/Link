package com.link.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

// OncePerRequestFilter : 모든 HTTP 요청마다 딱 한 번만 실행되는 필터
// SecurityConfig에서 .addFilterBefore()로 등록했기 때문에 매 요청마다 자동 실행됨
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // HTTP 요청의 Authorization 헤더에서 토큰 꺼내기
        // 프론트에서 "Authorization: Bearer {토큰}" 형식으로 보냄
        String token = resolveToken(request);

        // 토큰이 존재하고 유효하면 Spring Security에 인증 정보 등록
        if (token != null && jwtTokenProvider.validateToken(token)) {
            String email = jwtTokenProvider.getEmail(token);

            // UsernamePasswordAuthenticationToken : Spring Security의 인증 객체
            // email을 principal로, 권한 목록은 빈 리스트로 설정
            // 이 객체를 SecurityContext에 넣으면 "이 요청은 인증된 요청"으로 처리됨
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(email, null, List.of());

            // SecurityContextHolder : 현재 요청의 인증 정보를 저장하는 공간
            // 여기에 넣어야 컨트롤러 등에서 "지금 로그인한 사람이 누구인지" 알 수 있음
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        // 다음 필터로 요청 전달 (필터 체인 계속 진행)
        filterChain.doFilter(request, response);
    }

    // Authorization 헤더에서 토큰만 추출하는 메서드
    // "Bearer {토큰}" 형식에서 "Bearer " 부분을 제거하고 토큰 문자열만 반환
    private String resolveToken(HttpServletRequest request) {
        String bearer = request.getHeader("Authorization");
        if (bearer != null && bearer.startsWith("Bearer ")) {
            return bearer.substring(7); // "Bearer " 는 7글자이므로 그 뒤부터 잘라냄
        }
        return null;
    }
}