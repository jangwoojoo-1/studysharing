# 학습 공유 게시판 (Study Sharing Board)

## 🚀 소개

이 프로젝트는 `HTML`, `CSS`, `JavaScript`를 기반으로 한 간단한 커뮤니티 게시판입니다. **GitHub Pages**를 활용한 웹 호스팅을 연습하는 것을 목표로 제작되었습니다.

**Firebase**의 **Firestore**를 실시간 데이터베이스로 사용하여, 사용자들이 학습 내용, 질문, 정보 등을 공유하고 소통할 수 있는 동적인 웹 애플리케이션입니다.

다만 github.io 페이지를 만들어보는 것이 목표였기에데이터베이스는 test 과정에서만 사용하고 지웠고, 실제로 작동하지 않습니다.

-----

## ✨ 주요 기능

  * **실시간 CRUD**: 게시글과 댓글을 실시간으로 생성, 조회, 수정, 삭제할 수 있습니다.
  * **댓글 기능**: 각 게시글에 댓글을 작성하여 소통할 수 있습니다.
  * **카테고리 필터**: '일반', '질문', '정보', '잡담' 등 카테고리별로 게시글을 필터링하여 볼 수 있습니다.
  * **마크다운(Markdown) 지원**: `marked.js` 라이브러리를 활용하여 게시글과 댓글 내용에 마크다운 문법을 적용할 수 있습니다.

-----

## 🛠️ 사용된 기술

  * **Frontend**:
      * HTML
      * CSS
      * JavaScript
  * **Backend (BaaS)**:
      * Firebase (Firestore)
  * **Libraries**:
      * **`marked.js`**: 마크다운 렌더링을 위한 라이브러리

-----

## ⚙️ 설정 및 실행 방법

1.  **저장소 복제(Clone)**:
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    ```
2.  **Firebase 설정**:
      * Firebase 웹사이트에서 새 프로젝트를 생성합니다.
      * `docs/script.js` 파일 내의 `firebaseConfig` 변수를 자신의 Firebase 프로젝트 설정 정보로 교체합니다.
    <!-- end list -->
    ```javascript
    // 🔥 Firebase 설정 (자신의 Firebase 설정 정보로 교체)
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
    ```
3.  **실행**:
      * `docs/index.html` 파일을 웹 브라우저에서 열어 바로 확인할 수 있습니다.
