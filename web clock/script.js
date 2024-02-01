document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("clockCanvas");
    const context = canvas.getContext("2d");
    const digitalClock = document.getElementById("digitalClock");

    function drawClock() {
        const now = new Date();
        const hours = now.getHours() % 12 || 12; // Convert 0 to 12
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Draw clock face
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(canvas.width / 2, canvas.height / 2, 150, 0, 2 * Math.PI);
        context.lineWidth = 2;
        context.strokeStyle = "#333";
        context.stroke();

        // Draw numbers
        context.font = "bold 20px Arial";
        context.fillStyle = "#333";
        context.textAlign = "center";
        context.textBaseline = "middle";
        for (let i = 1; i <= 12; i++) {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x = canvas.width / 2 + 120 * Math.cos(angle);
            const y = canvas.height / 2 + 120 * Math.sin(angle);
            context.fillText(i, x, y);
        }

        // Draw hour hand
        const hourAngle = ((hours % 12 + minutes / 60) * 30 - 90) * (Math.PI / 180);
        drawHand(context, hourAngle, 80, 6, "#FFD700");

        // Draw minute hand
        const minuteAngle = ((minutes + seconds / 60) * 6 - 90) * (Math.PI / 180);
        drawHand(context, minuteAngle, 120, 4, "#0000FF");

        // Draw second hand
        const secondAngle = (seconds * 6 - 90) * (Math.PI / 180);
        drawHand(context, secondAngle, 140, 2, "#FF0000");

        // Update digital clock
        const digitalTime = now.toLocaleTimeString();
        digitalClock.textContent = digitalTime;
    }

    function drawHand(context, angle, length, width, color) {
        const x = canvas.width / 2 + length * Math.cos(angle);
        const y = canvas.height / 2 + length * Math.sin(angle);

        context.beginPath();
        context.moveTo(canvas.width / 2, canvas.height / 2);
        context.lineTo(x, y);
        context.lineWidth = width;
        context.lineCap = "round";
        context.strokeStyle = color;
        context.stroke();
    }

    function animateClock() {
        drawClock();
        requestAnimationFrame(animateClock);
    }

    animateClock();
});