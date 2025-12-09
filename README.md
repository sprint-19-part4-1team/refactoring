# ♻️ Refactoring

```jsx
// ❌ 안티패턴: 모든 계층이 뒤섞임
"use client";

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Infrastructure (localStorage)
    const token = localStorage.getItem("accessToken");

    // 2. Domain Logic (토큰 검증)
    if (!token || isTokenExpired(token)) {
      router.push("/login");
      return;
    }
    // 3. Infrastructure (fetch)
    fetch("/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      // 4. Presentation Logic
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return <div>{user?.name}</div>;
}
```

## 위 코드의 문제점

- 모든 로직이 한 곳에 몰려있음 (단일 책임 원칙(SRP) X)
  - 토큰을 가져오는 로직
  - 토큰을 검증하는 로직
  - user 정보를 가져오는 api 요청
  - user.name을 그리는 div 요소
- next.js를 사용하지만 useEffect 내부에서 fetch를 사용하고 있어서 SSR 고려 X

## 개선 방향

### 1. 도메인(DDD) 주도 설계 방식 적용하기 (변화에 유연한 구조 만들기 → 역할 분리)

- [DDD 참고 >](https://xiubindev.tistory.com/142)
- [폴더 구조 참고 >](https://reboot.studio/blog/folder-structures-to-organize-react-project)
- 도메인 별로 폴더를 분리해서, 도메인 내의 응집성을 높이고 서로 다른 도메인간의 의존도를 낮추기

### 2. 아키텍쳐 분리

- 계층별 책임에 맞게 레이어 분리하기

## 이해되지 않는 용어 정리

### 아키텍쳐(Architecture)? 뭔데?

- 코드가 섞이지 않고, 역할이 명확한 구조를 만드는 방식 (a.k.a. 청사진)
- 명확한 정답이 있는건 아님

### 레이어???

#### 1. Presentation Layer (프레젠테이션 계층)

- 화면과 사용자 인터랙션만 담당함 (React 컴포넌트)
  **무슨 역할을 할까?**
- UI 그리기
- 상태 보여주기
- 사용자 입력 처리 (onClick 등...)
- Next.js라면 서버/클라이언트 컴포넌트를 분리하기도 함 (준비된 데이터를 단순히 UI로 표현)

#### 2. Application Layer (애플리케이션 계층)

- use case를 정의하는 계층
- 이 상황에서 어떤 동작을 해야하는가?를 결정
- 앱을 어떻게 동작시킬것인가를 결정하는 로직들 (행동대장 느낌..)
- ex) 유저 데이터를 불러오고 저장

#### 3. Domain Layer (도메인 계층)

- 비즈니스 규칙, 정책, 순수 로직만 담당함
- UI나 기술에 의존하지 X (UI 코드 X, fetch X)
- ex) 유효성 검사

+) 아직 헷갈리는거 (날짜 포맷팅 함수 예시)

- 우리 서비스는 날짜를 이렇게 보여줘 (7일 이후 YYYY-MM-DD, 방금전, n분전..등등): 도메인 계층
- 단순히 date를 iso string으로 변환하기: 유틸함수

#### 4. Infrastructure Layer (인프라 계층)

- 외부 시스템과 실제로 연결되는 구현부
- 기술 의존성이 있는 코드는 인프라 계층에 해당됨
- ex) axios 인스턴스, fetch wrapper, 로컬스토리지 접근, 외부 api 연동 등등
