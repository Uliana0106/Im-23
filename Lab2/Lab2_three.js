import * as THREE from './Libs/three/three.module.min.js';

document.addEventListener("DOMContentLoaded", () => {
         startRotation();
      });

      async function startRotation() {
         const { scene, camera, renderer } = initScene();

         // Load textures
         const saturnTexture = await loadTexture('assets/images/saturn_texture.jpg');
         const ringTexture = await loadTexture('assets/images/ring_texture.jpg');

         const saturn = createSaturn(saturnTexture);
         const ring = createRing(ringTexture);

         // Add ambient light
         const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
         scene.add(ambientLight);

         // Add point light
         const pointLight = new THREE.PointLight(0xffffff, 1);
         pointLight.position.set(0, 0, 10);
         scene.add(pointLight);

         camera.position.z = 20;

         renderer.setAnimationLoop(() => {
            rotateObject(saturn, 0.005, 'y');
            rotateObject(ring, 0.005, 'y');

            renderer.render(scene, camera);
         });
      }

      function initScene() {
         const scene = new THREE.Scene();
         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
         const renderer = new THREE.WebGLRenderer();
         renderer.setSize(window.innerWidth, window.innerHeight);
         document.body.appendChild(renderer.domElement);

         return { scene, camera, renderer };
      }

      function createSaturn(texture) {
         const geometry = new THREE.SphereGeometry(6, 50, 50);
         const material = new THREE.MeshPhongMaterial({ map: texture });
         const saturn = new THREE.Mesh(geometry, material);
         setScale(saturn);
         scene.add(saturn);
         return saturn;
      }

      function createRing(texture) {
         const geometry = new THREE.RingGeometry(7.45, 13.7, 30);
         const material = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5
         });
         const ring = new THREE.Mesh(geometry, material);
         setScale(ring);
         scene.add(ring);
         return ring;
      }

      function rotateObject(object, speed, axis) {
         object.rotation[axis] += speed;
      }

      function setScale(object) {
         object.scale.set(0.03, 0.03, 0.03);
      }

      async function loadTexture(url) {
         return new Promise((resolve) => {
            new THREE.TextureLoader().load(url, resolve);
         });
      }
