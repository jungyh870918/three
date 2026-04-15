import * as THREE from 'three'
import gsap from 'gsap'

/**
 * Base
 */
// Canvas: HTML의 <canvas> 요소를 가져옵니다.
const canvas = document.querySelector('canvas.webgl')

// Scene: 물체들을 담을 장면을 생성합니다.
const scene = new THREE.Scene()

/**
 * Objects
 */
// 빨간색 큐브 생성.
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/**
 * Clock (Three.js 내장 시간 관리 도구)
 * 프레임 속도(FPS)에 상관없이 일정한 애니메이션 속도를 유지하기 위해 사용합니다.
 */
const clock = new THREE.Clock()

/**
 * GSAP (외부 애니메이션 라이브러리)
 * 복잡한 애니메이션(A에서 B로 이동 등)을 처리할 때 유용합니다.
 * 아래 코드는 1초 대기 후, 1초 동안 x축으로 2만큼 이동시킵니다.
 */
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

/**
 * Animate (애니메이션 루프)
 * requestAnimationFrame은 브라우저의 다음 프레임에 함수를 실행하도록 예약합니다.
 */
const tick = () =>
{
    // 1. elapsedTime 계산: 애니메이션 시작 후 경과된 시간을 초 단위로 가져옵니다.
    const elapsedTime = clock.getElapsedTime()

    // 2. 객체 업데이트 (예시: 시간에 따른 회전 또는 물리적 움직임)
    // mesh.rotation.y = elapsedTime * Math.PI // 1초에 반 바퀴씩 회전
    // mesh.position.y = Math.sin(elapsedTime) // 위아래로 흔들리는 움직임

    // 3. Render: 변경된 위치나 회전값을 반영하여 화면을 다시 그립니다.
    renderer.render(scene, camera)

    // 4. 다음 프레임에 다시 tick 함수를 호출하여 무한 루프를 형성합니다.
    window.requestAnimationFrame(tick)
}

// 애니메이션 시작
tick()