import * as THREE from './Libs/three/three.module.min.js';

let scene, camera, renderer;
        let saturn, ring;

        init();
        animate();

        function init() {
            // Create scene
            scene = new THREE.Scene();
            
            // Create camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 10;

            // Create renderer
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            // Create Saturn
            const saturnTexture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/1/1e/Solarsystemscope_texture_8k_saturn.jpg');
            const saturnMaterial = new THREE.MeshBasicMaterial({ map: saturnTexture });
            const saturnGeometry = new THREE.SphereGeometry(6, 50, 50);
            saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
            scene.add(saturn);

            // Create Ring
            const ringTexture = new THREE.TextureLoader().load('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/06a094a4-7bd7-4bb9-b998-6c1e17f66c08/ddh2ahf-922e939b-70b8-4103-9f88-26bd1efb852f.png/v1/fill/w_1024,h_80/saturn_rings_texture_map_13k_by_fargetanik_ddh2ahf-fullview.png?token=...'); // Your ring texture URL
            const ringMaterial = new THREE.MeshBasicMaterial({ map: ringTexture, side: THREE.DoubleSide, roughness: 1 });
            const ringGeometry = new THREE.RingGeometry(7.45, 13.7, 50);
            ring = new THREE.Mesh(ringGeometry, ringMaterial);
            scene.add(ring);

            // Create light
            const light = new THREE.PointLight();
            light.position.set(-50, 0, 0);
            scene.add(light);
        }

        function animate() {
            requestAnimationFrame(animate);

            // Rotate Saturn around its own axis
            saturn.rotation.y += 0.005;

            // Rotate the ring along with Saturn
            ring.rotation.y += 0.005;

            renderer.render(scene, camera);
        }