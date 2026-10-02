# 🧠 ebbinghaus-vocab (망각곡선 보카 부스터) - Kiro 검수 및 인계 안내서

이 저장소(웹앱)는 2026-10-02 사용자 요청에 따라 Deep Research 에듀테크 보고서 2순위 과제로 독립 제작된 정식 웹앱입니다.
기존 166개 사이트 및 홈서버 시스템과의 충돌을 방지하기 위해 완전히 독립된 구성(`Webapp_Staging\ebbinghaus-vocab`)으로 패키징되었습니다.

## 1. 사이트 개요
* **서비스명:** 망각곡선 보카 부스터 (Ebbinghaus Vocab Booster)
* **목표 도메인:** `https://ebbinghaus-vocab.enjoy-onepage.com/` (CNAME 등록 완료)
* **학습 대상:** 중·고등 수험생, 토익/수능 준비생, 일반 성인 영어 학습자
* **핵심 기능:**
  1. 3D 플립 인터랙티브 플래시카드 (앞면: 단어/예문/발음, 뒷면: 뜻/어원/유의어)
  2. 에빙하우스 망각곡선 및 FSRS 기반 4단계 간격 반복(Spaced Repetition) 평가 엔진
  3. 실시간 망각곡선 SVG 인터랙티브 차트 (시간 경과에 따른 기억 감쇠선 vs 복습 고착선 비교)
  4. Web Speech API 기반 원어민 영어 발음 TTS (외부 의존성 없음)
  5. Web Audio API 기반 소프트 클릭 및 성공 화음 펜타토닉 합성
  6. 수능 필수 50, 토익 필수 50, 중학 필수 50 고품질 프리셋 내장 + 사용자 단어 추가 기능
  7. 100% 클라이언트 사이드 로컬 연산 (LocalStorage / IndexedDB 보증)

## 2. 준수된 아키텍처 및 표준 (WEBAPP_BUILD_STANDARD & ANTIGRAVITY_SELF_CHECKLIST)
* **외부 의존성 제로:** Tailwind CDN 일체 배제, 순수 Vanilla CSS (`style.css?v=1.0`)
* **골드 스탠다드 3단 광고 파이프라인 탑재:**
  * 상단 슬림 배너 (`data-ad-slot="3824727725"`, 90px 클램프 완비)
  * 중간 반응형 배너 (`data-ad-slot="1186914926"`)
  * 하단 대형 배너 (`data-ad-slot="3416334507"`)
  * 1:1 인라인 푸시 원칙 완벽 준수
* **신뢰성 페이지 구비:** `about.html`(학술적 기준), `privacy.html`(프라이버시 보증)
* **SEO 및 메타데이터:** JSON-LD (`WebApplication`, `FAQPage`), OpenGraph, `robots.txt`, `sitemap.xml`, `rss.xml`, `manifest.json`
* **모바일 최적화 (320px~412px):**
  * 가로 오버플로우 0px (`document.documentElement.scrollWidth === clientWidth`)
  * 모든 h1, h2 제목 무조건 1줄 (`white-space: nowrap`)
  * 모든 버튼 텍스트 1줄 (`white-space: nowrap`), 최소 터치 높이 44px 보장

## 3. Kiro 사후 조치 옵션
* **옵션 A (정식 채택 및 영구 편입 시):**
  * `Webapp_Upgrade\repos\ebbinghaus-vocab`로 위치를 유지하거나 등록.
  * 홈서버가 2시간마다 돌 때 자동으로 대시보드와 허브 카드에 수집됩니다.
* **옵션 B (원클릭 롤백 및 흔적 없는 삭제 시):**
  * GitHub 저장소(`somsoo/ebbinghaus-vocab`)만 삭제하거나, 로컬 폴더를 삭제하면 기존 시스템에 단 1바이트의 영향도 남기지 않고 즉시 정리됩니다.
