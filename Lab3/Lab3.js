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

  const box2 = new THREE.Mesh(boxGeometry, brickMaterial);
  box2.position.set(-10.77, 0, -7.673);
  box2.rotation.set(0, -60 * Math.PI / 180, 0);
  box2.scale.set(20, 4, 4);
  scene.add(box2);

  const box3 = new THREE.Mesh(boxGeometry, brickMaterial);
  box3.position.set(5.5, 0, -4.402);
  box3.rotation.set(0, 90 * Math.PI / 180, 0);
  box3.scale.set(5, 4, 4);
  scene.add(box3);

  const box4 = new THREE.Mesh(boxGeometry, brickMaterial);
  box4.position.set(-0.4, 0, -0.6);
  box4.scale.set(2, 4, 4);
  scene.add(box4);

  const box5 = new THREE.Mesh(boxGeometry, brickMaterial);
  box5.position.set(-6.53, 0, -15.305);
  box5.scale.set(15, 4, 4);
  scene.add(box5);

  const cylinder = new THREE.Mesh(cylinderGeometry, brickMaterial);
  cylinder.position.set(5.5, 0, -7.1);
  scene.add(cylinder);

  const plane = new THREE.Mesh(planeGeometry, new THREE.MeshBasicMaterial({ color: 0x888 }));
  plane.rotation.set(-Math.PI / 2, 0, 0);
  plane.position.set(0, -2, 0);
  scene.add(plane);

  const coloredBox1 = new THREE.Mesh(boxGeometry, coloredMaterial);
  coloredBox1.position.set(4.5, 0.5, 2);
  coloredBox1.scale.set(2, 2, 0.2);
  scene.add(coloredBox1);

  const coloredBox2 = new THREE.Mesh(boxGeometry, coloredMaterial);
  coloredBox2.position.set(-5.5, 0.5, 2);
  coloredBox2.scale.set(2, 2, 0.2);
  scene.add(coloredBox2);

  const coloredBox3 = new THREE.Mesh(boxGeometry, coloredMaterial);
  coloredBox3.position.set(-6, 0.15, -13.4);
  coloredBox3.scale.set(2, 2, 0.2);
  scene.add(coloredBox3);

  const coloredBox4 = new THREE.Mesh(boxGeometry, coloredMaterial);
  coloredBox4.position.set(-9, 0.15, -17.3);
  coloredBox4.scale.set(2, 2, 0.2);
  scene.add(coloredBox4);

  const coloredBox5 = new THREE.Mesh(boxGeometry, coloredMaterial);
  coloredBox5.position.set(7.444, 0.15, -5.544);
  coloredBox5.rotation.set(0, 90 * Math.PI / 180, 0);
  coloredBox5.scale.set(2, 2, 0.2);
  scene.add(coloredBox5);

  const coloredBox6 = new THREE.Mesh(boxGeometry, coloredMaterial);
  coloredBox6.position.set(-12.326, 0.15, -6.311);
  coloredBox6.rotation.set(0, -60 * Math.PI / 180, 0);
  coloredBox6.scale.set(2, 2, 0.2);
  scene.add(coloredBox6);

  // Create camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, -10);

  // Enable ARButton
  const xrButton = ARButton.createButton(new THREE.WebGLRenderer());
  document.body.appendChild(xrButton);

  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

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




