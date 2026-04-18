import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
const canvas = document.querySelector('canvas.webgl')

const sizes = {
    width: 800,
    height: 600
}

/**
 * Cursor (마우스 좌표 설정)
 * 렌더러의 캔버스 안에서 마우스 위치를 Three.js가 활용할 수 있도록 가공하는 과정입니다.
 * 브라우저 좌표를 -0.5 ~ +0.5 사이의 값으로 정규화하여 중앙을 0으로 만듭니다.
 */
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) =>
{
    // event.clientX / sizes.width 는 0~1 사이 값을 반환하며, 0.5를 빼서 중앙을 0으로 설정합니다.
    cursor.x = event.clientX / sizes.width - 0.5
    
    // 웹 브라우저의 Y축(아래가 +)을 Three.js의 Y축(위가 +)과 맞추기 위해 값을 반전(-)시킵니다.
    cursor.y = - (event.clientY / sizes.height - 0.5)
})

// Scene
const scene = new THREE.Scene()

// Object (큐브)
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

/**
 * Controls (마우스 카메라 제어)
 */
const controls = new OrbitControls(camera, canvas)
// enableDamping: 마우스를 멈춰도 관성에 의해 부드럽게 움직이는 효과를 줍니다.
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/**
 * Animate (애니메이션 루프)
 */
const clock = new THREE.Clock()

const tick = () =>
{
    // elapsedTime: Clock 인스턴스 생성 이후 현재까지 '흘러간 시간'을 초 단위로 계산합니다.
    const elapsedTime = clock.getElapsedTime()

    /**
     * window.requestAnimationFrame(tick) 의 정체:
     * 1. 브라우저에게 다음 프레임(화면 갱신) 때 이 함수(tick)를 실행하라고 예약합니다.
     * 2. tick 안에서 다시 tick을 예약하여 무한 루프를 생성하며, 초당 약 60회 화면을 다시 그립니다.
     */

    // Damping(부드러운 움직임) 효과를 적용하기 위해 매 프레임마다 컨트롤 상태를 업데이트합니다.
    controls.update()

    // Render: 현재 장면(Scene)을 카메라(Camera) 시점으로 다시 그립니다.
    renderer.render(scene, camera)

    // 다음 프레임 예약
    window.requestAnimationFrame(tick)
}

tick()