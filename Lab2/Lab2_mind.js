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

    const saturn = createSaturn();
    const ring = createRing();

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(saturn, ring);

    camera.position.z = 20;

    renderer.setAnimationLoop(() => {
        rotateObject(saturn, 0.005, 'y');
        rotateObject(ring, 0.005, 'y');

        renderer.render(scene, camera);
    });

    await mindarThree.start();
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
