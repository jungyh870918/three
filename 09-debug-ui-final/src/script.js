import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

/**
 * [강의 요약: 왜 Debug UI인가?]
 * 개발자, 디자이너, 클라이언트가 코드 수정 없이 색상, 속도, 위치 등을 실시간으로 조절하여 
 * 최적의 경험을 찾기 위함입니다. lil-gui는 가볍고 사용이 간편한 인기 라이브러리입니다.
 */

/**
 * Debug Setup
 */
const gui = new GUI({
    width: 300,            // 패널 너비 설정
    title: 'Nice debug UI', // 패널 제목 변경
    closeFolders: false    // 폴더를 기본적으로 열어둘지 여부
})

// 'h' 키를 눌러 디버그 패널을 숨기거나 나타낼 수 있는 토글 기능
window.addEventListener('keydown', (event) =>
{
    if(event.key == 'h')
        gui.show(gui._hidden)
})

/**
 * [강의 요약: debugObject]
 * lil-gui는 객체의 '속성'만 수정할 수 있습니다. 
 * Three.js 내부에서 변형되는 값이 아닌 순수 데이터를 보관하거나, 함수(버튼)를 실행하기 위해 
 * 별도의 debugObject를 만들어 관리하는 것이 좋습니다.
 */
const debugObject = {}

/**
 * Base
 */
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

/**
 * Object
 */
debugObject.color = '#a778d8' // 초기 컬러값 보관

// BoxGeometry(가로, 세로, 깊이, 가로세그먼트, 세로세그먼트, 깊이세그먼트)
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Debug Tweaks (Folders)
 */
// 관련 트윅들을 그룹화하기 위해 폴더 생성
const cubeTweaks = gui.addFolder('Awesome cube')

// 1. Range (숫자 조절)
cubeTweaks
    .add(mesh.position, 'y') // 조절할 객체와 속성명
    .min(- 3)                // 최소값
    .max(3)                  // 최대값
    .step(0.01)              // 조절 단위
    .name('elevation')       // UI에 표시될 이름

// 2. Checkbox (불리언 조절)
cubeTweaks.add(mesh, 'visible')      // 객체 표시 여부
cubeTweaks.add(material, 'wireframe') // 와이어프레임 모드 활성화

// 3. Color (색상 선택)
// Three.js의 색상 관리 방식 때문에 직접 material.color를 수정하기보다 
// debugObject의 값을 거쳐 .set()으로 업데이트하는 방식이 권장됩니다.
cubeTweaks
    .addColor(debugObject, 'color')
    .onChange(() =>
    {
        material.color.set(debugObject.color)
    })

// 4. Button (함수 실행)
// 객체 안에 함수를 정의하고 이를 .add()하면 UI에 버튼이 생성됩니다.
debugObject.spin = () =>
{
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
}
cubeTweaks.add(debugObject, 'spin')

// 5. Geometry 재생성 (세밀한 제어)
// Geometry의 세그먼트(분할 수)는 생성 시점에만 결정되므로, 
// 값이 바뀔 때마다 기존 Geometry를 메모리에서 해제(dispose)하고 새로 만들어야 합니다.
debugObject.subdivision = 2
cubeTweaks
    .add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(() => // 드래그가 끝났을 때만 실행하여 성능 저하 방지
    {
        // 메모리 누수 방지를 위해 기존 지오메트리 삭제
        mesh.geometry.dispose() 
        // 새 지오메트리 할당
        mesh.geometry = new THREE.BoxGeometry(
            1, 1, 1,
            debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
        )
    })

/**
 * Sizes & Camera & Renderer (기존 설정 및 분석)
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // [업데이트] 브라우저 창 크기 변경 대응
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // [카메라] 화면비(Aspect Ratio)를 갱신하고 투영 행렬을 업데이트해야 물체가 찌그러지지 않습니다.
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // [렌더러] 렌더링 사이즈를 조절하고, 고해상도 디스플레이(Retina 등)에서의 선명도를 유지합니다.
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// 디버깅 툴 사용 시 물체를 다각도에서 보기 편하도록 초기 위치를 조정했습니다.
camera.position.set(1, 1, 2) 
scene.add(camera)

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas)
// [변화 포인트] 디버깅 시 부드러운 시점 이동을 위해 관성(Damping)을 활성화했습니다.
// 이를 활성화하면 tick() 함수에서 매번 controls.update()를 호출해야 합니다.
controls.enableDamping = true 

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // [중요] Damping 효과를 적용하기 위해 프레임마다 컨트롤을 업데이트합니다.
    controls.update()

    // [향후 변경 예고] 
    // 1. 색상 관리(Color Management) 관련 설정이 Renderer 섹션에 추가될 수 있습니다.
    // 2. GUI로 조절하는 애니메이션 변수(속도 등)가 이 tick 함수 내 로직에 반영될 예정입니다.
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()