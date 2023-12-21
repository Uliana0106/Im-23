import * as THREE from './Libs/three/three.module.min.js';

document.addEventListener('DOMContentLoaded', init);

    function init() {
      // Set up scene
      const scene = new THREE.Scene();

      // Set up camera
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 10;

      // Set up renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      // Create Saturn
      const saturnGeometry = new THREE.SphereGeometry(6, 50, 50);
      const saturnTexture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/1/1e/Solarsystemscope_texture_8k_saturn.jpg');
      const saturnMaterial = new THREE.MeshBasicMaterial({ map: saturnTexture });
      const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
      scene.add(saturn);

      // Create Saturn's ring
      const ringGeometry = new THREE.RingGeometry(7.45, 13.7, 50);
      const ringTexture = new THREE.TextureLoader().load('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/06a094a4-7bd7-4bb9-b998-6c1e17f66c08/ddh2ahf-922e939b-70b8-4103-9f88-26bd1efb852f.png/v1/fill/w_1024,h_80/saturn_rings_texture_map_13k_by_fargetanik_ddh2ahf-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODAiLCJwYXRoIjoiXC9mXC8wNmEwOTRhNC03YmQ3LTRiYjktYjk5OC02YzFlMTdmNjZjMDhcL2RkaDJhaGYtOTIyZTkzOWItNzBiOC00MTAzLTlmODgtMjZiZDFlZmI4NTJmLnBuZyIsIndpZHRoIjoiPD0xMDI0In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.A3B3IhD-nZr6Izd7djZnbkDnfBdBBX5C6mLhlmi2X_A');
      const ringMaterial = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: ringTexture, roughness: 1 });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      scene.add(ring);

      // Set up light
      const light = new THREE.PointLight(0xFFFFFF, 1);
      light.position.set(-50, 0, 0);
      scene.add(light);

      // Set up animation
      function animate() {
        requestAnimationFrame(animate);

        // Rotate Saturn around its own axis
        saturn.rotation.y += 0.005;

        // Rotate the ring along with Saturn
        ring.rotation.y += 0.005;

        renderer.render(scene, camera);
      }

      animate();
    }