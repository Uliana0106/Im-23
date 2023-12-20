import * as THREE from './Libs/three/three.module.min.js';
import { MindARThree } from './Libs/mindar/mindar-image-three.prod.js';

document.addEventListener("DOMContentLoaded", () => {
    startRotation();
});

async function startRotation() {
    const mindarThree = new MindARThree({
        container: document.body,
        imageTargetSrc: 'assets/markers/saturno/saturno.mind',
        uiLoading: "no",
        uiScanning: "yes",
        uiError: "yes",
        debug: "yes",
    });

    const { scene, camera, renderer } = mindarThree;

    // Create Saturn with texture
    const saturn = createSaturn();
    // Create Ring with texture
    const ring = createRing();

    // Add objects to anchor
    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(saturn, ring);

    // Set camera position
    camera.position.z = 20;

    // Set up lighting
    const light = new THREE.PointLight(0xffffff, 1, 500000);
    light.position.set(0, 0, 500000);
    scene.add(light);

    // Set up animation loop
    renderer.setAnimationLoop(() => {
        rotateObject(saturn, 0.005, 'y');
        rotateObject(ring, 0.005, 'y');

        renderer.render(scene, camera);
    });

    // Start AR
    await mindarThree.start();
}

function createSaturn() {
    const geometry = new THREE.SphereGeometry(6, 50, 50);
    const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('assets/images/saturn_texture.jpg'),
        roughness: 1
    });
    const saturn = new THREE.Mesh(geometry, material);
    setScale(saturn);
    return saturn;
}

function createRing() {
    const geometry = new THREE.RingGeometry(7.45, 13.7, 30);
    const material = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
        roughness: 1
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