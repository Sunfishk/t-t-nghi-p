// 1. Đồng hồ đếm ngược thời gian thực
const targetDate = new Date("2026-01-24T10:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// 2. Hiệu ứng trượt mượt khi cuộn trang (Fade-in)
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(25px)";
    section.style.transition = "all 0.6s ease-out";
    observer.observe(section);
});

// 3. Hàm bật / tắt ẩn hiện lời chúc khi nhấn vào
function toggleWish(element) {
    element.classList.toggle("active");
    const icon = element.querySelector(".toggle-icon");
    if (element.classList.contains("active")) {
        icon.innerHTML = "🙈 Đóng lại";
    } else {
        icon.innerHTML = "👁️ Xem lời chúc";
    }
}

// 4. Xử lý khi gửi Form lời chúc mới
const rsvpForm = document.getElementById("rsvpForm");
const wishesContainer = document.getElementById("wishesContainer");

rsvpForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("guestNameInput").value;
    const attendance = document.getElementById("attendanceSelect").value;
    const message = document.getElementById("wishMessage").value;

    const statusBadge = attendance === "Có" ? "🎉 Sẽ tham dự" : "😢 Không thể đến";

    // Tạo phần tử lời chúc mới ở trạng thái ẩn nội dung
    const wishElement = document.createElement("div");
    wishElement.classList.add("wish-item");
    wishElement.setAttribute("onclick", "toggleWish(this)");
    wishElement.innerHTML = `
        <div class="wish-header">
            <strong>${name}</strong> <span class="badge-status">${statusBadge}</span>
            <span class="toggle-icon">👁️ Xem lời chúc</span>
        </div>
        <div class="wish-content">
            <p>${message}</p>
        </div>
    `;

    wishesContainer.prepend(wishElement);

    // Reset form
    rsvpForm.reset();
    alert("✨ Cảm ơn bạn đã gửi lời chúc!");
});