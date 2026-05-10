# Link — CLAUDE.md

## 프로젝트 개요

**"여행의 시작, 함께하는 설렘을 더하다"**

여행 준비 시 참여자-주최자 간 양방향 소통 서비스. 의견 충돌 없이 카테고리별 정보 제공과 투표 기반 의사결정으로 여행 계획을 효율적으로 조율한다.

포트폴리오용 풀스택 웹 애플리케이션. AWS를 통한 실제 배포까지 목표.

## 기술 스택

| 영역 | 기술 |
|------|------|
| Backend | Java 21, Spring Boot 4, Spring Security, OAuth2, JWT (jjwt 0.12.6), JPA, MySQL 8 |
| Frontend | React 19, TypeScript 6, Vite 8, React Router v7, Axios, Zustand |
| Deployment | AWS |

## 디렉토리 구조

```
Link/
├── backend/    # Spring Boot 프로젝트
└── frontend/   # React + TypeScript 프로젝트
    └── src/
        ├── pages/          # UI 레이어 — 화면 컴포넌트 (RN 마이그레이션 시 재작성 대상)
        │   └── trip/
        ├── hooks/          # 로직 레이어 — 비즈니스 로직 커스텀 훅 (RN에서 재사용 가능)
        ├── api/            # API 호출 레이어 — axios 기반 (RN에서 재사용 가능)
        ├── store/          # 전역 상태 — Zustand (RN에서 재사용 가능)
        ├── types/          # TypeScript 타입/인터페이스 (RN에서 재사용 가능)
        └── router/         # 라우터 설정 — React Router v7 (RN 시 React Navigation으로 교체)
```

## 주요 기능 (피그마 기준)

### 인증
- 스플래시 화면
- Google 소셜 로그인

### 여행 생성 (주최자)
- 여행 제목, 날짜, 장소, 인원 등 단계별 입력 플로우
- 생성된 여행에 참여자 초대

### 홈
- 캘린더 뷰 (여행 일정 확인)
- 카테고리별 탐색 (숙소, 식당, 관광지 등)
- 결정 현황 (투표 진행 중 / 완료)

### 탐색 / 피드
- 여행지 카드 목록
- 여행 상세 페이지

### 결정 투표
- 참여자가 항목에 투표
- 결과 시각화

### 채팅
- 여행 그룹 내 실시간 채팅

### 마이페이지
- 내 여행 목록, 프로필 관리

## 진행 현황

### 완료
- 프로젝트 폴더 구조 생성 (`backend/`, `frontend/`)
- `backend/`: Spring Boot 초기 프로젝트 생성 (Maven, Java 21, Spring Web / Spring Data JPA / MySQL Driver / Lombok / DevTools / Validation)
- `frontend/`: Vite + React + TypeScript 초기 프로젝트 생성
- 루트 / backend / frontend `.gitignore` 설정 완료
- GitHub push 완료
- Domain Entity 작성 완료 (User, Trip, TripMember, TripItem, Vote, ChatMessage)
- BaseEntity (createdAt, updatedAt) 작성 및 JPA Auditing 활성화
- Spring Security + Google OAuth2 로그인 구현 완료
  - SecurityConfig, JwtTokenProvider, JwtAuthFilter
  - CustomOAuth2UserService, OAuth2SuccessHandler
- application.yml / application-local.yml 설정 완료 (Google OAuth2, JWT Secret)
- pom.xml 의존성 추가 (Spring Security, OAuth2 Client, jjwt)

### 다음 작업
- React Router v7 라우팅 구조 설정
- 페이지 컴포넌트 (pages/) 작성
- Axios API 레이어 구성
- Zustand 전역 상태 설정

## 프론트엔드 아키텍처 원칙 — React Native 마이그레이션 대비

이 프로젝트는 웹(React)으로 개발하되, 향후 앱(React Native) 마이그레이션을 염두에 두고 설계한다.

### 레이어 분리 원칙

| 레이어 | 위치 | RN 재사용 | 규칙 |
|--------|------|-----------|------|
| UI | `pages/`, `components/` | ❌ 재작성 | JSX/CSS 포함, 로직 최소화 |
| 로직 | `hooks/` | ✅ 재사용 | DOM/브라우저 API 의존 금지 |
| API | `api/` | ✅ 재사용 | axios 기반, 순수 함수 |
| 상태 | `store/` | ✅ 재사용 | Zustand만 사용 |
| 타입 | `types/` | ✅ 재사용 | 인터페이스/타입만 정의 |

### 핵심 규칙
- 비즈니스 로직은 반드시 `hooks/`의 커스텀 훅으로 분리 — 페이지 컴포넌트에 직접 작성 금지
- API 호출은 `api/` 레이어에서만 — 컴포넌트나 훅에서 axios 직접 호출 금지
- 전역 상태는 Zustand만 사용 — Context API, Redux 사용 금지
- `hooks/`, `api/`, `store/`, `types/`는 DOM/window/document 등 브라우저 전용 API 사용 금지

### 라우트 구조
| 경로 | 페이지 | 인증 필요 |
|------|--------|-----------|
| `/` | SplashPage | ❌ |
| `/login` | LoginPage | ❌ |
| `/home` | HomePage | ✅ |
| `/trips/new` | TripNewPage | ✅ |
| `/trips/:tripId` | TripDetailPage | ✅ |
| `/trips/:tripId/vote` | TripVotePage | ✅ |
| `/trips/:tripId/chat` | TripChatPage | ✅ |
| `/mypage` | MyPage | ✅ |

## Claude와 협업 방식 — 중요

**이 프로젝트는 사용자가 직접 코드를 작성하는 학습/연습 프로젝트입니다.**

### Claude가 하지 말아야 할 것
- 코드를 대신 작성하거나 완성된 구현체를 제공하지 않는다
- 수정이 필요한 코드를 직접 Edit/Write 도구로 바꾸지 않는다
- "이렇게 수정하면 됩니다" 식의 완성 코드 블록을 제시하지 않는다

### 사용자 배경 — 중요
- Java를 매우 오랫동안 쓰지 않아서 기초적인 것도 잊어버린 상태
- package 선언, import 문, 애노테이션 의미 등 Java 기본 문법도 자세히 설명해줘야 함
- IDE 자동완성이 잘 동작하지 않는 환경이므로, import 경로 등을 직접 알려줘야 함
- Spring Boot도 오랜만이므로 "왜 이 애노테이션이 필요한지"까지 설명할 것

### Claude가 해도 되는 것
- 개념 설명, 동작 원리 안내
- 어떤 방향으로 접근할지 아이디어 제안 (코드 없이)
- 사용자가 작성한 코드 리뷰 및 피드백
- 에러 메시지 해석 및 원인 설명
- Spring Boot / React / AWS 관련 공식 문서나 참고 자료 안내
- 막혔을 때 힌트 제공 (단, 정답 코드는 제공하지 않음)
- package 경로, import 전체 목록, 애노테이션 출처 등 Java 기초 정보를 구체적으로 안내

### 예외
- 사용자가 명시적으로 "코드 작성해줘", "구현해줘" 라고 요청한 경우에만 코드 제공 가능
