// ==========================================
// FLOATING SAKURA WATERFALL EFFECTS
// ==========================================
const sakuraContainer = document.createElement('div');
sakuraContainer.id = 'sakura-container';
document.body.prepend(sakuraContainer);

const styleElement = document.createElement('style');
styleElement.innerHTML = `
    #sakura-container {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        z-index: 1; pointer-events: none;
    }
    .heart-element {
        position: absolute; background-color: var(--soft-pink, #ffb3c1);
        display: inline-block; width: 10px; height: 10px;
        transform: rotate(-45deg); animation: fall linear infinite;
        filter: drop-shadow(0 0 5px rgba(255, 133, 162, 0.5)); opacity: 0.6;
    }
    .heart-element::before, .heart-element::after {
        content: ""; background-color: var(--soft-pink, #ffb3c1);
        border-radius: 50%; position: absolute; width: 10px; height: 10px;
    }
    .heart-element::before { top: -5px; left: 0; }
    .heart-element::after { top: 0; left: 5px; }
    @keyframes fall {
        0% { top: -10%; transform: translateX(0) rotate(-45deg) scale(0.5); opacity: 0; }
        10% { opacity: 0.6; }
        90% { opacity: 0.6; }
        100% { top: 110%; transform: translateX(100px) rotate(45deg) scale(1); opacity: 0; }
    }
`;
document.head.appendChild(styleElement);

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-element');
    heart.style.left = Math.random() * 100 + 'vw';
    const size = Math.random() * 8 + 6;
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    
    const scale = Math.random() * 0.8 + 0.4;
    heart.style.transform = `rotate(-45deg) scale(${scale})`;
    heart.style.animationDuration = Math.random() * 5 + 5 + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    sakuraContainer.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 10000);
}

for (let i = 0; i < 40; i++) { createHeart(); }
setInterval(createHeart, 300);

// ==========================================
// CORE AUDIOS & OVERLAY INTERACTION MANAGEMENT
// ==========================================
const giftOverlay = document.getElementById('gift-overlay');
const giftBox = document.getElementById('gift-box');
const audio = document.getElementById('romantic-audio');
const btn = document.querySelector('.player-btn');
const text = document.getElementById('track-text');
const dot = document.getElementById('music-dot');

audio.volume = 0.2; 

function updateMusicUI() {
    if (audio.paused) {
        btn.textContent = 'Play';
        text.textContent = 'Music Paused';
        dot.style.animation = 'none';
        dot.style.backgroundColor = 'var(--text-muted)';
    } else {
        btn.textContent = 'Pause';
        text.textContent = 'Now Playing: Shape of My Heart';
        dot.style.animation = 'dotPulse 1.5s infinite alternate';
    }
}

// FIX: Overlay diklik langsung otomatis nge-fade out lan muter lagu bebas eror
giftBox.addEventListener('click', () => {
    giftOverlay.classList.add('fade-out');
    audio.play().then(() => {
        updateMusicUI();
    }).catch(err => {
        console.log("Audio playback delayed: interaction required.");
    });
});

function toggleAudio() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    updateMusicUI();
}

// ==========================================
// CLICK BURST FLOWER SYSTEM (EFEK RAMAI)
// ==========================================
const flowerTypes = ['🌸', '🌺', '🌹', '🌷', '💐', '✨'];

document.addEventListener('click', (e) => {
    // Ojok nggae efek meledak lek sing diklik iku tombol kado utawa player
    if(e.target.closest('#gift-box') || e.target.closest('.music-player')) return;
    createFlowerBurst(e.clientX, e.clientY);
});

function createFlowerBurst(x, y) {
    const flowerCount = 20; 

    for (let i = 0; i < flowerCount; i++) {
        const flower = document.createElement('div');
        flower.classList.add('click-flower');
        
        flower.textContent = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        flower.style.left = x + 'px';
        flower.style.top = y + 'px';
        
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 120 + 80; 
        
        const tx = Math.cos(angle) * distance + 'px';
        const ty = Math.sin(angle) * distance + 'px';
        
        const scale = Math.random() * 0.8 + 0.6;
        const rot = (Math.random() * 360) + 'deg';
        const size = (Math.random() * 15 + 15) + 'px';

        flower.style.setProperty('--tx', tx);
        flower.style.setProperty('--ty', ty);
        flower.style.setProperty('--scale', scale);
        flower.style.setProperty('--rot', rot);
        flower.style.setProperty('--flower-size', size);

        document.body.appendChild(flower);
        setTimeout(() => { flower.remove(); }, 800);
    }
}