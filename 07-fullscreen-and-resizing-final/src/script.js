import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas: HTML에서 WebGL이 그려질 도화지를 선택합니다.
const canvas = document.querySelector('canvas.webgl')

// Scene: 3D 물체들을 담는 가상 공간입니다.
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes (뷰포트 크기 설정)
 * 고정된 해상도 대신 window.innerWidth/Height를 사용하여 현재 브라우저 창 크기에 맞춥니다.
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Handle Resize (창 크기 조절 대응)
 * 사용자가 브라우저 창 크기를 바꿀 때마다 실행되어 화면이 일그러지지 않게 합니다.
 */
window.addEventListener('resize', () =>
{
    /**
     * 1. 해상도 데이터 갱신
     * 브라우저 창의 현재 크기(innerWidth/Height)를 가져와 sizes 객체에 저장합니다.
     */
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    /**
     * 2. 카메라 투영 데이터 갱신
     * - 창 크기는 우리가 극장에서 보는 화면 사이즈다. 카메라의 시야각과 비율이 이 화면에 맞춰져야 물체가 찌그러지지 않고 제대로 보입니다.
     * - aspect: 가로/세로 비율이 틀어지면 물체가 찌그러져 보이므로 이를 실시간 보정합니다.
     * - updateProjectionMatrix: 카메라의 내부 수학 행렬을 재계산합니다. 
     * 설정값 변경 후 이 함수를 부르지 않으면 화면에 반영되지 않습니다.
     */
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    /**
     * 3. 렌더러 및 캔버스 물리 크기 조절
     * - 렌더러에게 우리가 그림을 그릴 '도화지의 픽셀 해상도'를 창 크기에 맞추라고 명령합니다.
     * - 스타일(CSS) 크기와 실제 렌더링 해상도를 동시에 일치시킵니다.
     */
    renderer.setSize(sizes.width, sizes.height)
    
    /**
     * 4. 고해상도 디스플레이(Retina 등) 최적화
     * - 기기의 픽셀 밀도를 가져오되, 성능 저하와 배터리 소모를 방지하기 위해 
     * 최대 2배 해상도까지만 사용하도록 제한합니다. (업계 표준 최적화 방식)
     */
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Fullscreen (전체 화면 전환)
 * 더블 클릭(dblclick) 시 전체 화면 모드로 진입하거나 해제합니다.
 */
window.addEventListener('dblclick', () =>
{
    // 사파리 등 접두사가 필요한 브라우저 호환성을 고려합니다.
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        // 전체 화면 진입 (캔버스 기준)
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        // 전체 화면 해제 (문서 기준)
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls: 마우스 드래그로 카메라를 제어할 수 있게 합니다.
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true // 관성 효과를 주어 움직임을 부드럽게 만듭니다.

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
// 초기 렌더링 시에도 픽셀 비율을 설정합니다.
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate (애니메이션 루프)
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Damping(관성) 효과가 적용되려면 매 프레임마다 컨트롤을 업데이트해야 합니다.
    controls.update()

    // Render: 현재 장면을 화면에 그립니다.
    renderer.render(scene, camera)

    // 다음 프레임에 다시 tick 실행
    window.requestAnimationFrame(tick)
}

tick()