// ==================== GOMBALAN BERURUTAN ====================
// Ini adalah 10 gombalan yang nyambung seperti cerita
const gombalBerurutan = [
    "🌸 Awalnya aku cuma penasaran sama kamu. Tapi ternyata... penasaran itu berubah jadi perhatian.",
    "💖 Lalu aku mulai noticing hal-hal kecil dari kamu. Cara kamu tersenyum, cara kamu bicara... semuanya indah.",
    "✨ Dan tanpa sadar, setiap hari aku selalu nunggu momen buat lihat kamu. Rasanya kurang kalau belum lihat senyummu.",
    "🌻 Kamu tuh kayak sinar matahari di pagi hari. Hangat, menenangkan, dan bikin semangat.",
    "💭 Sekarang, kamu selalu ada di pikiranku. Dari aku bangun tidur sampai mau tidur lagi.",
    "🍬 Kamu lebih manis dari apa pun yang pernah aku rasakan. Dan aku nggak pernah bosan.",
    "🌙 Kalau malam tiba, aku suka lihat bintang. Tapi ternyata... kamu lebih bersinar dari bintang mana pun.",
    "💌 Aku jadi sering nulis hal-hal kecil tentang kamu. Karena kamu pantas untuk diingat setiap hari.",
    "🌹 Dan sekarang aku tahu... aku suka kamu. Bukan karena apa-apa, tapi karena kamu adalah kamu.",
    "💕 Jadi, maukah kamu jadi alasan aku tersenyum setiap hari? Karena bagiku, kamu sudah cukup sempurna. 💕"
];

// ==================== PESAN RAHASIA BERURUTAN ====================
const rahasiaBerurutan = [
    "💌 PS: Sebenarnya dari pertama kamu suka aku, aku langsung merasa ada sesuatu yang indah.",
    "🤫 Aku suka cara kamu menikmati hal-hal kecil. Itu bikin aku makin sayang.",
    "📝 Setiap malam, tanpa gagal, kamu selalu jadi doa terakhirku sebelum tidur.",
    "🌹 Aku punya satu mimpi kecil: bisa liat senyummu setiap hari. Itu aja udah cukup.",
    "💘 Kamu bikin aku percaya kalau 'jatuh cinta' itu bukan cuma kata-kata.",
    "⭐ Jadi... terima kasih ya, sudah hadir di hidupku. Kamu luar biasa. ❤️"
];

// ==================== INISIALISASI ====================
let gombalIndex = 0;
let rahasiaIndex = 0;

// Ambil elemen
const gombalUtama = document.getElementById("gombalUtama");
const btnGombal = document.getElementById("gombalRandomBtn");
const progressGombal = document.getElementById("progressGombal");
const lilin = document.getElementById("lilin");
const api = document.getElementById("api");
const labelLilin = document.getElementById("labelLilin");
const bukaRahasiaBtn = document.getElementById("bukaRahasiaBtn");
const rahasiaIsi = document.getElementById("rahasiaIsi");
const progressRahasia = document.getElementById("progressRahasia");
const statusArea = document.getElementById("statusArea");
const btnLove = document.getElementById("btnLove");
const btnKangen = document.getElementById("btnKangen");
const btnFlower = document.getElementById("btnFlower");
const heartAvatar = document.getElementById("heartAvatar");
const subJudul = document.getElementById("subJudul");
const canvas = document.getElementById("loveCanvas");
const ctx = canvas.getContext("2d");

let lilinMenyala = false;
let loveParticles = [];

// ==================== CANVAS & PARTIKEL ====================
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createLoveParticle(x, y) {
    loveParticles.push({
        x: x,
        y: y,
        size: Math.random() * 12 + 8,
        speedX: (Math.random() - 0.5) * 2.5,
        speedY: Math.random() * -2 - 1.5,
        life: 1,
        char: Math.random() > 0.5 ? "❤️" : "💖"
    });
}

function updateParticles() {
    for (let i = 0; i < loveParticles.length; i++) {
        loveParticles[i].x += loveParticles[i].speedX;
        loveParticles[i].y += loveParticles[i].speedY;
        loveParticles[i].life -= 0.02;
        if (loveParticles[i].life <= 0 || loveParticles[i].y < -80) {
            loveParticles.splice(i, 1);
            i--;
        }
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of loveParticles) {
        ctx.font = `${p.size}px "Segoe UI", "Apple Color Emoji"`;
        ctx.globalAlpha = p.life * 0.9;
        ctx.fillStyle = "#ff3366";
        ctx.fillText(p.char, p.x, p.y);
    }
    ctx.globalAlpha = 1;
}

function animateParticles() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animateParticles);
}
animateParticles();

function burstLove(fromX, fromY, jumlah = 12) {
    for (let i = 0; i < jumlah; i++) {
        let x = fromX !== undefined ? fromX + (Math.random() - 0.5) * 40 : Math.random() * canvas.width;
        let y = fromY !== undefined ? fromY + (Math.random() - 0.5) * 40 : Math.random() * canvas.height * 0.8 + 50;
        createLoveParticle(x, y);
    }
}

// Klik di mana saja (bukan tombol) buat tabur love
document.body.addEventListener("click", (e) => {
    if (!e.target.closest('button')) {
        burstLove(e.clientX, e.clientY, 8);
    }
});

// ==================== GOMBAL BERURUTAN ====================
function tampilkanGombalBerikutnya() {
    // Tampilkan gombal sesuai index
    gombalUtama.innerHTML = `"${gombalBerurutan[gombalIndex]}"`;
    progressGombal.innerText = `${gombalIndex + 1} / ${gombalBerurutan.length}`;
    
    // Efek animasi
    gombalUtama.style.transform = "scale(1.02)";
    setTimeout(() => gombalUtama.style.transform = "scale(1)", 150);
    
    // Status
    if (gombalIndex === gombalBerurutan.length - 1) {
        statusArea.innerHTML = "🌸 Ini gombalan terakhir... tapi cerita kita nggak akan berhenti di sini ya 💕";
    } else {
        statusArea.innerHTML = `📖 Lanjut ke gombalan ke-${gombalIndex + 1}... semoga suka 💖`;
    }
    
    // Tabur love
    burstLove(undefined, undefined, 6);
    
    // Pindah ke index berikutnya, kalau sudah habis balik ke awal
    gombalIndex++;
    if (gombalIndex >= gombalBerurutan.length) {
        gombalIndex = 0;
        statusArea.innerHTML = "🔄 Ulang dari awal! Karena cerita ini selalu indah untuk diulang 🌹";
    }
    
    setTimeout(() => {
        if(statusArea.innerHTML.includes("Lanjut ke gombalan") || statusArea.innerHTML.includes("Ulang dari awal")) {
            if(gombalIndex !== 0) statusArea.innerHTML = "💬 klik tombol gombal untuk lanjut cerita...";
            else statusArea.innerHTML = "💬 cerita dimulai lagi... 💬";
        }
    }, 2000);
}

btnGombal.addEventListener("click", tampilkanGombalBerikutnya);

// ==================== PESAN RAHASIA BERURUTAN ====================
function tampilkanRahasiaBerikutnya() {
    rahasiaIsi.innerHTML = `💕 ${rahasiaBerurutan[rahasiaIndex]} 💕`;
    progressRahasia.innerText = `${rahasiaIndex + 1} / ${rahasiaBerurutan.length}`;
    
    burstLove(undefined, undefined, 10);
    
    if (rahasiaIndex === rahasiaBerurutan.length - 1) {
        statusArea.innerHTML = "💌 Ini pesan rahasia terakhir... jangan sampai hilang ya 💌";
    } else {
        statusArea.innerHTML = `🔐 Pesan rahasia ke-${rahasiaIndex + 1}... hanya untukmu 🤫`;
    }
    
    heartAvatar.style.transform = "scale(1.1)";
    setTimeout(() => heartAvatar.style.transform = "scale(1)", 300);
    
    rahasiaIndex++;
    if (rahasiaIndex >= rahasiaBerurutan.length) {
        rahasiaIndex = 0;
        statusArea.innerHTML = "🔄 Pesan rahasia berulang... tapi isinya tetap cuma buat kamu ❤️";
        setTimeout(() => {
            if(statusArea.innerHTML.includes("berulang")) statusArea.innerHTML = "💬 klik pesan selanjutnya...";
        }, 2000);
    }
    
    setTimeout(() => {
        if(statusArea.innerHTML.includes("Pesan rahasia ke-")) statusArea.innerHTML = "💬 lanjut baca pesan rahasianya...";
    }, 2000);
}

bukaRahasiaBtn.addEventListener("click", tampilkanRahasiaBerikutnya);

// ==================== LILIN ====================
lilin.addEventListener("click", () => {
    if (!lilinMenyala) {
        api.classList.add("menyala");
        lilinMenyala = true;
        labelLilin.innerHTML = "🕯️ lilin cinta menyala 🔥";
        statusArea.innerHTML = "✨ Lilin menyala! Hangat seperti pelukmu ✨";
        burstLove(lilin.getBoundingClientRect().left + 30, lilin.getBoundingClientRect().top + 30, 15);
    } else {
        api.classList.remove("menyala");
        lilinMenyala = false;
        labelLilin.innerHTML = "🕯️ nyalakan lagi lilinnya, sayang~";
        statusArea.innerHTML = "😢 Lilin padam... tapi cintaku tetap menyala untukmu";
    }
    setTimeout(() => {
        if(statusArea.innerHTML.includes("Lilin")) statusArea.innerHTML = "💬 semangat terus ya! 💬";
    }, 2000);
});

// ==================== TOMBOL AKSI ====================
btnLove.addEventListener("click", () => {
    statusArea.innerHTML = "💕 Detak jantungku berdegup kencang. Hanya kamu penyebabnya 💕";
    for(let i = 0; i < 40; i++) {
        setTimeout(() => burstLove(undefined, undefined, 1), i * 25);
    }
    heartAvatar.style.transform = "scale(1.15)";
    setTimeout(() => heartAvatar.style.transform = "scale(1)", 400);
    setTimeout(() => {
        if(statusArea.innerHTML.includes("Detak jantung")) statusArea.innerHTML = "💬 kamu juga berdebar? 💬";
    }, 2000);
});

btnKangen.addEventListener("click", () => {
    statusArea.innerHTML = "🥺 Aku kangen banget sama kamu... kapan kita ketemu? 🥺❤️";
    burstLove(undefined, undefined, 20);
    gombalUtama.innerHTML = '"Aku rela jalan 1000 km asal bisa peluk kamu 🤗"';
    setTimeout(() => {
        if(statusArea.innerHTML.includes("kangen")) statusArea.innerHTML = "💬 semoga cepet ketemu ya 💬";
    }, 2000);
});

btnFlower.addEventListener("click", () => {
    statusArea.innerHTML = "🌹🌻🌸 Bunga cinta bermekaran untukmu! 🌸🌻🌹";
    for(let i = 0; i < 60; i++) {
        setTimeout(() => {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            createLoveParticle(x, y);
        }, i * 25);
    }
    setTimeout(() => {
        if(statusArea.innerHTML.includes("Bunga")) statusArea.innerHTML = "💬 kamu suka bunganya? 💬";
    }, 2500);
});

// ==================== SAPAAN AWAL ====================
window.addEventListener("load", () => {
    // Reset index
    gombalIndex = 0;
    rahasiaIndex = 0;
    
    // Tampilkan gombal pertama
    gombalUtama.innerHTML = `"${gombalBerurutan[0]}"`;
    progressGombal.innerText = `1 / ${gombalBerurutan.length}`;
    
    // Tampilkan pesan rahasia pertama
    rahasiaIsi.innerHTML = `💕 ${rahasiaBerurutan[0]} 💕`;
    progressRahasia.innerText = `1 / ${rahasiaBerurutan.length}`;
    
    // Geser index biar next-nya lanjut ke 2
    gombalIndex = 1;
    rahasiaIndex = 1;
    
    resizeCanvas();
    statusArea.innerHTML = "💖 Halo Sayang 💖 Semua kata-kata di sini berurutan ya. Klik next untuk lanjut baca!";
    setTimeout(() => burstLove(undefined, undefined, 12), 500);
    setTimeout(() => {
        if(statusArea.innerHTML.includes("Halo Sayang")) statusArea.innerHTML = "💬 klik Gombal Berikutnya untuk mulai... 💬";
    }, 3000);
});

// Hover di hati
heartAvatar.addEventListener("mouseenter", () => {
    burstLove(heartAvatar.getBoundingClientRect().left + 60, heartAvatar.getBoundingClientRect().top + 60, 6);
});