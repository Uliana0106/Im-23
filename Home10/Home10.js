document.addEventListener("DOMContentLoaded", () => {
    async function init() {
        const model = await handPoseDetection.createDetector(handPoseDetection.SupportedModels.MediaPipeHands, {
            runtime: 'mediapipe', // or 'tfjs',
            solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
            modelType: 'full'
        });

        const webcam = new tmImage.Webcam(window.innerHeight, window.innerHeight, true); // width, height, flip

        let text = document.getElementById("text");

        await webcam.setup(); // request access to the webcam
        await webcam.play();

        document.body.appendChild(webcam.canvas);

        let skip = 1;

        // Function to calculate angles between fingers
        function calculateFingerAngles(keypoints) {
            const fingerPairs = [
                ["thumb_tip", "index_finger_tip"],
                ["index_finger_tip", "middle_finger_tip"],
                ["middle_finger_tip", "ring_finger_tip"],
                ["ring_finger_tip", "pinky_finger_tip"]
            ];

            const angles = fingerPairs.map(pair => {
                const point1 = getKeypointPosition(keypoints, pair[0]);
                const point2 = getKeypointPosition(keypoints, pair[1]);
                const angle = calculateAngle(point1, point2);
                return angle;
            });

            return angles;
        }

        // Function to get the position of a keypoint
        function getKeypointPosition(keypoints, keypointName) {
            const keypoint = keypoints.find(kp => kp["name"] === keypointName);
            return { x: keypoint["x"], y: keypoint["y"] };
        }

        // Function to calculate the angle between two points
        function calculateAngle(point1, point2) {
            const radians = Math.atan2(point2.y - point1.y, point2.x - point1.x);
            let angle = radians * (180 / Math.PI);
            angle = angle < 0 ? angle + 360 : angle; // Ensure the angle is positive
            return angle;
        }

        async function loop() {
            skip++;
            webcam.update(); // update the webcam frame
            if (skip % 5 == 0) {
                // predict can take in an image, video, or canvas HTML element
                const prediction = await model.estimateHands(webcam.canvas);
                if (prediction.length == 0)
                    text.innerHTML = "руки не видно";
                else {
                    let str = "";
                    for (let hand = 0; hand < prediction.length; hand++) {
                        str += "<p>Визначено руку: " + prediction[hand]["handedness"] +
                            " з ймовірністю " + prediction[hand]["score"].toFixed(2) + "<br>";
                        for (let finger = 0; finger < prediction[hand]["keypoints"].length; finger++) {
                            str += "&nbsp;&nbsp;&nbsp;Палець: " +
                                prediction[hand]["keypoints"][finger]["name"] + " (" +
                                prediction[hand]["keypoints"][finger]["x"].toFixed(0) + ", " +
                                prediction[hand]["keypoints"][finger]["y"].toFixed(0) + ")<br>";
                        }

                        // Calculate and display angles between fingers
                        const angles = calculateFingerAngles(prediction[hand]["keypoints"]);
                        for (let i = 0; i < angles.length; i++) {
                            str += "&nbsp;&nbsp;&nbsp;<span style='color: red;'>Кут між пальцями " + (i + 1) + ": " + angles[i].toFixed(2) + "</span><br>";
                        }
                    }
                    text.innerHTML = str;
                }
            }
            window.requestAnimationFrame(loop);
        }

        window.requestAnimationFrame(loop);
    }

    init();
});
