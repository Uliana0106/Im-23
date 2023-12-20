import * as THREE from './Libs/three/three.module.min.js';

document.addEventListener("DOMContentLoaded", () => {
        startRotation();
    });

    function startRotation() {
        // Set up scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Create Saturn
        const saturnGeometry = new THREE.SphereGeometry(1, 32, 32);
        const saturnMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 });
        const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
        scene.add(saturn);

        // Create Ring
        const ringGeometry = new THREE.RingGeometry(1.2, 1.8, 32);
        const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        scene.add(ring);

        // Position the ring relative to Saturn
        ring.position.set(0, 0, 0); // Adjust the position as needed

        // Set camera position
        camera.position.z = 5;

        // Animation loop
        const animate = function () {
            requestAnimationFrame(animate);

            // Rotate Saturn around its own axis
            saturn.rotation.y += 0.005;

            // Rotate the ring along with Saturn
            ring.rotation.y += 0.005;

            renderer.render(scene, camera);
        };

        animate();
    }
