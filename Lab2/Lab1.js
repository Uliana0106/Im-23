AFRAME.registerComponent('camera-move', {
        init: function () {
          // Рух камери
          this.el.addEventListener('loaded', () => {
            const camera = this.el;
            let distance = 20;
            let speed = 0.1; 

            camera.setAttribute('position', `0 2 ${distance}`);

            this.el.sceneEl.addEventListener('renderstart', () => {
              camera.object3D.position.z -= speed;
              distance -= speed;

              if (distance <= 0) {
                distance = 20;
                camera.object3D.position.z = distance;
              }
            });
          });
        }
      });

      document.querySelector('a-camera').setAttribute('camera-move', '');
