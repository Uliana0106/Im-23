document.addEventListener("DOMContentLoaded", () => {
         startRotation();
      });

      function startRotation() {
         const saturn = document.querySelector('#saturn');
         const ring = document.querySelector('#ring');

         if (saturn && ring) {
            setInterval(() => {
               // Rotate Saturn around its own axis
               const currentSaturnRotation = saturn.object3D.rotation;
               saturn.object3D.rotation.set(
                  currentSaturnRotation.x,
                  currentSaturnRotation.y + 0.005, // Adjust the rotation speed as needed
                  currentSaturnRotation.z
               );

               // Rotate the ring along with Saturn
               const currentRingRotation = ring.object3D.rotation;
               ring.object3D.rotation.set(
                  currentRingRotation.x,
                  currentRingRotation.y + 0.005, // Adjust the rotation speed as needed
                  currentRingRotation.z
               );
            }, 16); // Adjust the interval for smoother animation
         }
      }