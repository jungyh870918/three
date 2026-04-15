import * as THREE from 'three' // Three.js 라이브러리의 모든 기능을 가져옵니다.

/**
 * 1. 기초 설정 (Canvas & Scene)
 */
// HTML에서 렌더링 결과물을 보여줄 <canvas> 요소를 선택합니다.
const canvas = document.querySelector('canvas.webgl')

// 3D 객체들이 배치될 가상의 공간을 생성합니다.
const scene = new THREE.Scene()

/**
 * 2. 객체 생성 (Object)
 * - 여기서 '1'은 픽셀이 아닌 Three.js 자체 단위(Unit)입니다.
 * - 렌더러 사이즈가 바뀌어도 이 '1'이라는 절대 크기는 변하지 않습니다.
 */
const geometry = new THREE.BoxGeometry(1, 1, 1) // 가로, 세로, 깊이가 1인 정육면체 데이터를 만듭니다.
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }) // 빛의 영향을 받지 않는 빨간색 재질을 만듭니다.
const mesh = new THREE.Mesh(geometry, material) // 데이터와 재질을 결합해 실제 '물체'를 만듭니다.
scene.add(mesh) // 장면에 물체를 추가합니다. 기본 위치는 (0, 0, 0)입니다.

/**
 * 3. 사이즈 설정 (Sizes)
 * - width, height는 실제 브라우저에 그려질 캔버스의 해상도(픽셀 단위)입니다.
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * 4. 카메라 설정 (Camera)
 */
/**
 * PerspectiveCamera(fov, aspect, near, far)
 * - fov (시야각): 75도. 세로 방향의 시야 범위를 결정합니다. 작을수록 줌인(망원), 클수록 줌아웃(광각).
 * - aspect (종횡비): 가로/세로 비율. 렌더러 사이즈와 맞춰야 물체가 찌그러지지 않습니다.
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

/**
 * 좌표계 이해 (Right-hand Coordinate System)
 * - X축: 가로 (오른쪽이 +)
 * - Y축: 세로 (위쪽이 +)
 * - Z축: 앞뒤 (내 얼굴 쪽으로 다가오는 방향이 +)
 * camera.position.z = 3은 카메라를 '나의 방향'으로 3만큼 뒤로 뺀 것입니다.
 */
camera.position.z = 3 
scene.add(camera)

/**
 * 5. 렌더러 설정 (Renderer)
 * - 렌더러는 3D 장면을 카메라 시점으로 촬영해 2D 이미지(픽셀)로 변환하는 역할을 합니다.
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

// 렌더러 사이즈는 캔버스의 실제 '픽셀 크기'를 결정합니다.
// 물체의 크기가 '1'이라도 렌더러가 1600x1200이면 화면에 더 크고 선명하게 보입니다.
renderer.setSize(sizes.width, sizes.height)

// 최종적으로 '장면'을 '카메라'의 시선으로 그리도록 명령합니다.
renderer.render(scene, camera)