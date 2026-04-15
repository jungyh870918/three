import * as THREE from 'three'

/**
 * Canvas
 * HTML에서 WebGL 내용을 그릴 바탕이 되는 요소를 선택합니다.
 */
const canvas = document.querySelector('canvas.webgl')

/**
 * Scene
 * 물체, 조명, 카메라를 담는 공간인 '장면'을 생성합니다.
 */
const scene = new THREE.Scene()

/**
 * Axes Helper
 * x(빨강), y(초록), z(파랑) 축을 시각적으로 보여줍니다.
 * 매개변수 2는 각 축의 선 길이를 의미합니다.
 */
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper) // 생성한 헬퍼를 장면에 추가합니다.

/**
 * Objects (그룹화 및 객체 생성)
 * Scene Graph 개념: 여러 물체를 하나의 그룹으로 묶어 한꺼번에 변형(Transform)할 수 있습니다.
 */
const group = new THREE.Group() // 여러 Mesh를 담을 컨테이너(그룹)를 생성합니다.
group.scale.y = 2              // 그룹 전체의 높이(y축)를 2배로 늘립니다.
group.rotation.y = 0.2         // 그룹 전체를 y축 기준으로 0.2 라디안만큼 회전시킵니다.
scene.add(group)               // 그룹을 장면에 추가합니다.

// 첫 번째 큐브 생성
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), // 기하학적 구조(가로, 세로, 높이 1단위)
    new THREE.MeshBasicMaterial({ color: 0xff0000 }) // 재질(빨간색)
)
cube1.position.x = - 1.5       // 그룹 내에서 왼쪽으로 1.5단위 이동
group.add(cube1)               // scene이 아닌 group에 추가하여 그룹의 변형을 따르게 합니다.

// 두 번째 큐브 생성
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube2.position.x = 0           // 그룹의 중앙에 위치
group.add(cube2)

// 세 번째 큐브 생성
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube3.position.x = 1.5         // 그룹 내에서 오른쪽으로 1.5단위 이동
group.add(cube3)

/**
 * Sizes
 * 렌더링할 화면의 가로, 세로 크기를 설정합니다.
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 * PerspectiveCamera: 원근법이 적용된 카메라입니다.
 * (시야각 75도, 가로세로 비율)
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

// 카메라 위치 조정: z축 방향으로 3단위 뒤로 이동하여 물체를 바라봅니다.
camera.position.z = 3 

// camera.lookAt(new THREE.Vector3(0, - 1, 0)) // 주석 처리됨: 카메라가 특정 좌표를 정면으로 바라보게 설정
scene.add(camera) // 카메라를 장면에 추가합니다.

/**
 * Renderer
 * Scene과 Camera를 결합하여 Canvas에 실제 그림을 그려주는 도구입니다.
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height) // 렌더러 크기를 위에서 정한 사이즈로 설정합니다.

// 마지막으로 scene과 camera를 인자로 넘겨 실제 화면에 렌더링합니다.
renderer.render(scene, camera)