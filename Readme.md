# 🧊 Three.js Journey 학습 기록

> **Three.js Journey** 강좌를 통해 학습한 핵심 개념과 샘플 코드를 정리한 저장소입니다.  
> 🚀 **[나의 치트시트 페이지 보기](https://<본인아이디>.github.io/<리포지토리이름>/)**

---

## 📌 학습 개요
Three.js의 기초부터 애니메이션, 복잡한 씬 구성까지의 여정을 기록합니다. 단순히 코드를 복사하는 것이 아니라, WebGL의 동작 원리와 3D 그래픽스의 수학적 개념을 이해하는 것을 목표로 합니다.

## 📂 주요 학습 내용

### 1. 기초 설정 (The Big Three)
모든 Three.js 장면은 아래 세 가지 요소의 결합으로 이루어집니다.
- **Scene**: 물체가 놓이는 공간
- **Camera**: 장면을 비추는 시점 (Perspective / Orthographic)
- **Renderer**: 장면을 캔버스에 그리는 엔진

[Image of Three.js architecture showing Scene, Camera and Renderer relationship]

### 2. 객체의 구성 (Mesh)
- **Geometry**: 정점(Vertices)으로 이루어진 물체의 뼈대
- **Material**: 빛과 반응하는 방식이나 색상, 질감 정의
- **Mesh**: Geometry와 Material을 결합하여 장면에 추가할 수 있는 객체

[Image of Three.js Mesh structure showing Geometry and Material]

### 3. 변형 및 그룹화 (Transform & Group)
- `Position`, `Scale`, `Rotation` 속성을 이용한 물체 제어
- `THREE.Group`을 사용한 객체들의 계층 구조 형성 (Scene Graph 이해)

### 4. 애니메이션 루프
- `window.requestAnimationFrame`을 이용한 재귀적 렌더링
- `THREE.Clock`을 활용하여 디스플레이 주사율(FPS)에 독립적인 일정한 속도 구현
- **GSAP** 라이브러리를 활용한 정교한 트윈 애니메이션

## 🛠️ 사용 기술 및 도구
- **Language**: JavaScript (ES6+)
- **Library**: [Three.js](https://threejs.org/), [GSAP](https://greensock.com/gsap/)
- **Deployment**: GitHub Pages
- **Styling**: Tailwind CSS (Cheat Sheet Page)

---

## 📖 실행 방법

1. 이 저장소를 클론합니다.
   ```bash
   git clone [https://github.com/](https://github.com/)<본인아이디>/<리포지토리이름>.git