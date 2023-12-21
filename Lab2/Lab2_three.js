import * as THREE from './Libs/three/three.module.min.js';


document.addEventListener("DOMContentLoaded", () => {
    startRotation();
});

function startRotation() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const saturn = createSaturn();
    const ring = createRing();

    const anchor = new THREE.Object3D();
    anchor.add(saturn, ring);
    scene.add(anchor);

    camera.position.z = 20;

    const animate = () => {
        requestAnimationFrame(animate);

        rotateObject(saturn, 0.005, 'y');
        rotateObject(ring, 0.005, 'y');

        renderer.render(scene, camera);
    };

    animate();
}

function createSaturn() {
    const geometry = new THREE.SphereGeometry(6, 50, 50);
    const material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('assets/images/saturn_texture.jpg')
    });
    const saturn = new THREE.Mesh(geometry, material);
    setScale(saturn);
    return saturn;
}

function createRing() {
    const geometry = new THREE.RingGeometry(7.45, 13.7, 30);
    const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: 0xffffff,
        transparent: true,
        opacity: 0.5
    });
    const ring = new THREE.Mesh(geometry, material);
    setScale(ring);
    return ring;
}

function rotateObject(object, speed, axis) {
    object.rotation[axis] += speed;
}

function setScale(object) {
    object.scale.set(0.03, 0.03, 0.03);
}
