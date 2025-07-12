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

const user = 'flack667';
const apiKey = 'd97a158f727a67c53785c2aa78ff5641'; // ← buraya API anahtarını ekle

let elapsedSeconds = 0;
const fakeDuration = 180; // Simgesel olarak 3:00 gösteriyoruz

function updateProgress() {
    elapsedSeconds++;
    if (elapsedSeconds > fakeDuration) elapsedSeconds = 0;

    const bar = document.getElementById('progress-bar');
    const elapsed = document.getElementById('elapsed');

    const percent = (elapsedSeconds / fakeDuration) * 100;
    bar.style.width = percent + '%';

    const min = Math.floor(elapsedSeconds / 60);
    const sec = String(elapsedSeconds % 60).padStart(2, '0');
    elapsed.textContent = `${min}:${sec}`;
}

async function updateNowPlaying() {
    try {
        const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json&limit=1`);
        const data = await res.json();
        const track = data.recenttracks.track[0];
        const nowPlaying = track['@attr']?.nowplaying === 'true';

        if (nowPlaying) {
            document.getElementById('track-name').textContent = track.name;
            document.getElementById('artist-name').textContent = track.artist['#text'];
            document.getElementById('album-art').src = track.image[2]['#text'];
            elapsedSeconds = 0; // reset
        } else {
            document.getElementById('track-name').textContent = 'Şu anda çalan parça yok.';
            document.getElementById('artist-name').textContent = '';
            document.getElementById('album-art').src = '';
            document.getElementById('progress-bar').style.width = '0%';
            elapsedSeconds = 0;
        }
    } catch (e) {
        console.error("Veri alınamadı:", e);
    }
}

updateNowPlaying();
setInterval(updateNowPlaying, 30000); // 30 sn'de bir güncelle
setInterval(updateProgress, 1000);     // her saniye süreyi artır