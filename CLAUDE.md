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
- React Router v7 라우팅 구조 설정 (createBrowserRouter, Layout/Outlet 패턴)
- Zustand 인증 상태 관리 (`useAuthStore`) 구현
- Axios 인스턴스 + 인터셉터 구성 (`api/client.ts`)
- Tailwind CSS v4 + 디자인 토큰 설정 (`@theme` in index.css)
- SplashPage, LoginPage (Google OAuth redirect, fade-in 애니메이션) 구현
- AppLayout (max-w-[393px] 모바일 컨테이너) 구현
- HomePage 구현
  - HamburgerMenuBtn, SeeMoreBtn 헤더
  - Calendar 컴포넌트 (주간/월간 스와이프 토글, 애니메이션)
  - EmptyTripView 컴포넌트 (캘린더 상태 연동 마진)
- BottomNav 컴포넌트 구현 (lucide-react, Union.png 배경, 가운데 Plus FAB)

### 다음 작업
- SplashPage 토큰 확인 → 자동 라우팅 로직
- OAuth 콜백 페이지 (백엔드에서 JWT 수신)
- 여행 생성 모달 (TripNewModal)
- TripDetailPage, TripVotePage, TripChatPage, MyPage
- 백엔드 REST API 컨트롤러/서비스 레이어
- AWS 배포

## 포트폴리오 메모 — 기술적 하이라이트

Claude와 작업하면서 구현한 기술적으로 흥미로운 부분들. 포트폴리오 작성 시 강조할 것.

### 프론트엔드
- **스와이프 제스처 (Calendar)**: `useState` 대신 `useRef`로 startY 저장 → 클로저 stale 문제 해결. `window` 레벨 mouseup/touchend 리스너로 스와이프 감지 영역 확장
- **상태 끌어올리기 (State Lifting)**: Calendar의 `isExpanded`를 HomePage로 끌어올려 EmptyTripView의 마진을 동적으로 제어 (136px ↔ 96px)
- **CSS max-height 애니메이션**: `height: auto`는 애니메이션 불가 → `max-h-[200px]` ↔ `max-h-[600px]` 트랜지션으로 부드러운 캘린더 확장/축소
- **CSS Grid 이미지 겹치기**: `absolute` 없이 `col-start-1 row-start-1`로 두 이미지 오버랩 (EmptyTripView)
- **Fixed 요소 중앙 정렬**: `fixed bottom-0 left-1/2 -translate-x-1/2`로 max-width 컨테이너 기준 BottomNav 정렬
- **BottomNav FAB 패턴**: 커스텀 Union.png 배경(상단 라운딩 + 중앙 아치) + `absolute -translate-y-1/2`로 Plus 버튼 돌출 구현
- **BottomNav 아이콘 active/inactive 전환**: Figma에서 export한 이미지 쌍 (Home.png / Home_Active.png 등) → `isActive(path)` 조건으로 src 전환
- **z-index 스태킹 버그 수정**: `absolute inset-0` 탭 컨테이너가 Plus 버튼 클릭을 막는 문제 → `z-10`으로 해결. fixed 요소 레이어링 이해
- **말풍선 컴포넌트**: `rounded-xl rounded-bl-none` 패턴으로 특정 모서리만 sharp 처리. `showBubble` prop으로 조건부 렌더링
- **탭 알림 배지**: 아이콘 우측 상단에 `absolute -top-1 -right-2`로 뱃지 오버레이. active 상태 + count 조건부 표시
- **다단계 바텀시트 모달 (TripCreateModal)**: step 상태로 단계 관리, 중첩 모달 open/close 상태 분리
- **중첩 바텀시트 z-index**: 메인 모달(z-40/z-50) 위에 중첩 모달(z-[60]/z-[70]) 스태킹
- **날짜 범위 선택 캘린더 (TripDatePickerModal)**: 시작/종료일 상태 관리, `bg-primary/20`으로 범위 하이라이트, `rounded-none`으로 범위 연결 시각화. 월 이동(prev/next) 구현
- **Tailwind v4 디자인 토큰**: `@theme`으로 시맨틱 컬러 변수 정의 → 다크모드 확장 가능한 구조
- **React Native 마이그레이션 대비 레이어 분리**: UI(pages/components) / 로직(hooks) / API / 상태(Zustand) / 타입 레이어 분리

### 백엔드
- **Spring Security + Google OAuth2 + JWT**: 소셜 로그인 후 JWT 발급, 이후 모든 요청 토큰 검증
- **JPA Auditing**: `@MappedSuperclass` BaseEntity로 createdAt/updatedAt 자동 관리
- **jakarta.* 네임스페이스**: Spring Boot 3+ 기준 javax.* → jakarta.* 마이그레이션 적용

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
