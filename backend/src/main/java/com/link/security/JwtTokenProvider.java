package com.link.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.io.Decoders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

// @Component : Spring이 관리하는 객체로 등록
@Component
public class JwtTokenProvider {

    // application-local.yml의 jwt.secret 값을 자동으로 읽어옴
    // @Value("${설정키}") 형식으로 yml 파일의 값을 변수에 주입
    @Value("${jwt.secret}")
    private String secretKey;

    // 토큰 유효 시간 : 24시간 (밀리초 단위)
    // 1000 = 1초, * 60 = 1분, * 60 = 1시간, * 24 = 24시간
    private final long TOKEN_VALIDITY = 1000L * 60 * 60 * 24;

    // JWT 서명에 사용할 키 객체 생성
    // 문자열 secretKey → 암호화에 사용할 Key 객체로 변환
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // JWT 토큰 생성 메서드
    // email을 받아서 토큰을 만들고 문자열로 반환
    public String createToken(String email) {
        return Jwts.builder()
                .subject(email)                          // 토큰 안에 이메일 저장
                .issuedAt(new Date())                    // 토큰 발급 시간
                .expiration(new Date(                    // 토큰 만료 시간
                        System.currentTimeMillis() + TOKEN_VALIDITY))
                .signWith(getSigningKey())               // 위에서 만든 키로 서명
                .compact();                              // 최종적으로 문자열로 변환
    }

    // JWT 토큰이 유효한지 검증
    // 유효하면 true, 만료됐거나 변조됐으면 false 반환
    public boolean validateToken(String token) {
        try {
            // 토큰 파싱 시도 → 실패하면 아래 catch로 넘어감
            Jwts.parser()
                    .verifyWith(getSigningKey()) // 서명 검증
                    .build()
                    .parseSignedClaims(token);   // 토큰 해석
            return true;
        } catch (ExpiredJwtException e) {
            // 토큰 유효기간 만료 → 예외를 던지지 않고 false로 처리
            // 예외를 던지면 호출하는 쪽에서 매번 try-catch를 써야 하므로 불편함
            return false;
        } catch (Exception e) {
            // 토큰 변조 또는 형식 오류
            return false;
        }
    }

    // 토큰 안에서 이메일 꺼내기
    // 로그인한 사용자가 누구인지 확인할 때 사용
    public String getEmail(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()    // 토큰 안의 데이터(payload) 부분
                .getSubject();   // subject에 저장했던 이메일 꺼내기
    }
}