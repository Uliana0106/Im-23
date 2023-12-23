import * as THREE from './Libs/three/three.module.min.js';
import { ARButton } from './Libs/webxr/ARButton.js';

let camera, scene, renderer;

function init() {
  scene = new THREE.Scene();

  // Load texture
  const textureLoader = new THREE.TextureLoader();
  const brickTexture = textureLoader.load("https://images.unsplash.com/photo-1584505192555-4feb7834358a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJpY2slMjB0ZXh0dXJlfGVufDB8fDB8fHww");

  // Create materials
  const brickMaterial = new THREE.MeshBasicMaterial({ map: brickTexture });
  const coloredMaterial = new THREE.MeshBasicMaterial({ color: 0xADD8E6 });

  // Create geometries
  const boxGeometry = new THREE.BoxGeometry();
  const planeGeometry = new THREE.PlaneGeometry(100, 100);
  const cylinderGeometry = new THREE.CylinderGeometry(2, 2, 4, 32);

  // Create meshes
  const box1 = new THREE.Mesh(boxGeometry, brickMaterial);
  box1.position.set(0, 0, 0);
  box1.scale.set(15, 4, 4);
  scene.add(box1);

  // ... (add other boxes and meshes here)

  // Create colored boxes
  const coloredBox1 = new THREE.Mesh(boxGeometry, coloredMaterial);
  coloredBox1.position.set(4.5, 0.5, 2);
  coloredBox1.scale.set(2, 2, 0.2);
  scene.add(coloredBox1);

  // ... (add other colored boxes)

  // Create camera
  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 30);
  camera.lookAt(0, 0, 0);

  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Enable ARButton
  const xrButton = ARButton.createButton(renderer);
  document.body.appendChild(xrButton);

  // Handle resizing
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}

window.onload = function () {
  init();
  animate();
};




