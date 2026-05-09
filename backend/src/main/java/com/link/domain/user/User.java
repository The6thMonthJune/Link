package com.link.domain.user;

import com.link.domain.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor  // JPA가 내부적으로 기본 생성자를 필요로 함
@AllArgsConstructor // @Builder와 함께 쓸 때 필요 (@Builder는 전체 필드 생성자를 사용함)
@Builder            // User.builder().email(...).build() 방식으로 객체 생성 가능하게 함
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String provider;

    @Column
    private String name;

    @Column
    private String profileImageUrl;

    // 이미 가입한 유저가 다시 로그인했을 때 최신 정보로 업데이트
    // Entity 필드는 private이라 외부에서 직접 못 바꾸므로, 이 메서드를 통해서만 수정
    public void updateProfile(String name, String profileImageUrl) {
        this.name = name;
        this.profileImageUrl = profileImageUrl;
    }
}