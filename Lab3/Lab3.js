import * as THREE from './Libs/three/three.module.min.js';
import { ARButton } from './Libs/webxr/ARButton.js';

let camera, scene, renderer, xrSession, xrReferenceSpace;

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
  box2.position.set(0, 5, 0);
  box2.scale.set(5, 5, 5);
  scene.add(box2);

  // Create colored boxes
  const coloredBox1 = new THREE.Mesh(boxGeometry, coloredMaterial);
  coloredBox1.position.set(4.5, 0.5, 2);
  coloredBox1.scale.set(2, 2, 0.2);
  scene.add(coloredBox1);

  const coloredBox2 = new THREE.Mesh(boxGeometry, coloredMaterial);
  coloredBox2.position.set(-4, 1, 3);
  coloredBox2.scale.set(1, 1, 1);
  scene.add(coloredBox2);

  // Create cylinder
  const cylinder = new THREE.Mesh(cylinderGeometry, brickMaterial);
  cylinder.position.set(0, 2, -5);
  cylinder.rotation.set(Math.PI / 4, 0, 0);
  scene.add(cylinder);

  // Create camera
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(0, 2, 3);
  camera.lookAt(0, 0, 0);

  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Enable ARButton
  const xrButton = ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] });
  xrButton.addEventListener('selectstart', onSelectStart);

  document.body.appendChild(xrButton);

  // Handle resizing
  window.addEventListener('resize', onWindowResize, false);
}

function onSelectStart(event) {
  if (xrSession) {
    const controller = event.target;

    // Perform hit test
    const hitTestSource = xrSession.requestHitTestSource({ space: xrReferenceSpace });
    const hitTestResults = xrSession.requestHitTest(hitTestSource);

    // Handle hit test results
    hitTestResults.then((results) => {
      if (results.length > 0) {
        const pose = results[0].getPose(xrReferenceSpace);

        // Position the object based on hit test results
        const hitMatrix = new THREE.Matrix4().fromArray(pose.transform.matrix);
        const position = new THREE.Vector3();
        const scale = new THREE.Vector3();
        const rotation = new THREE.Quaternion();

        hitMatrix.decompose(position, rotation, scale);

        // Update the objects' position and orientation
        coloredBox1.position.copy(position);
        coloredBox1.setRotationFromQuaternion(rotation);

        coloredBox2.position.copy(position);
        coloredBox2.setRotationFromQuaternion(rotation);

        cylinder.position.copy(position);
        cylinder.setRotationFromQuaternion(rotation);
      }
    });
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  renderer.setAnimationLoop(() => {
    if (xrSession) {
      // Update XR frame
      xrSession.requestAnimationFrame(onXRFrame);
    } else {
      // Regular rendering loop
      renderer.render(scene, camera);
    }
  });
}

function onXRFrame(time, frame) {
  // Update XR pose and render the scene
  const pose = frame.getViewerPose(xrReferenceSpace);

  if (pose) {
    const views = pose.views;

    // Update camera for each view
    for (let i = 0; i < views.length; ++i) {
      const view = views[i];
      const viewport = xrSession.renderState.baseLayer.getViewport(view);
      renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
      camera.projectionMatrix.fromArray(view.projectionMatrix);
      camera.matrixWorldInverse.fromArray(view.transform.inverse.matrix);
      camera.position.setFromMatrixPosition(camera.matrixWorldInverse);
      camera.quaternion.setFromRotationMatrix(camera.matrixWorldInverse);
      renderer.render(scene, camera);
    }
  }
}

window.onload = function () {
  init();
  animate();
};
