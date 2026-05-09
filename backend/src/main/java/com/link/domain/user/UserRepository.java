package com.link.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

// JpaRepository<엔티티 타입, PK 타입>을 상속받으면
// save(), findById(), findAll() 등 기본 DB 쿼리 메서드를 자동으로 사용할 수 있음
// 인터페이스만 선언해도 Spring이 구현체를 자동으로 만들어줌
public interface UserRepository extends JpaRepository<User, Long> {

    // findBy + 필드명 형식으로 작성하면 Spring Data JPA가 쿼리를 자동 생성
    // "SELECT * FROM users WHERE email = ?" 과 동일
    // Optional = 결과가 없을 수도 있으므로 null 대신 Optional로 감싸서 반환
    java.util.Optional<User> findByEmail(String email);
}