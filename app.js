function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");

    // Rastgele pozisyon ve animasyon süresi
    snowflake.style.left = Math.random() * window.innerWidth + "px";
    snowflake.style.animationDuration = 2 + Math.random() * 3 + "s"; // 2-5 saniye

    document.body.appendChild(snowflake);

    // Belirli süre sonra DOM'dan sil
    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}

// Her 100ms'de bir kar tanesi üret
setInterval(createSnowflake, 100);


const homeBtn = document.getElementById("homeBtn");
const aboutBtn = document.getElementById("aboutBtn");
const homeSection = document.getElementById("homeSection");
const aboutSection = document.getElementById("aboutSection");

homeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    homeSection.style.display = "block";
    aboutSection.style.display = "none";
});

aboutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    homeSection.style.display = "none";
    aboutSection.style.display = "block";
});

function updateClock() {
    const clockElement = document.getElementById("clock");

    const now = new Date();

    // İstanbul saatine çevir
    const options = {
        timeZone: 'Europe/Istanbul',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };

    const timeString = now.toLocaleString('tr-TR', options);

    clockElement.textContent = timeString;
}

// Her saniye güncelle
setInterval(updateClock, 1000);
updateClock(); // ilk çağrı
