// AUDIO ENGINE STATE
const audioCtx = new (window.AudioContext ? window.AudioContext : (window.webkitAudioContext ? window.webkitAudioContext : null))();
let audioEnabled = true;
let sirenOscillator = null;

function playSound(f, type, dur, vol) {
    if (!audioEnabled || audioCtx.state === 'suspended') return;
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(f, audioCtx.currentTime);
    g.gain.setValueAtTime(vol, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    osc.connect(g); g.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + dur);
}

function startGlobalSiren() {
    if (!audioEnabled) return;
    sirenOscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    sirenOscillator.type = 'sawtooth';
    sirenOscillator.frequency.setValueAtTime(200, audioCtx.currentTime);
    sirenOscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.5);
    sirenOscillator.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 1.0);

    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    sirenOscillator.connect(gain);
    gain.connect(audioCtx.destination);
    sirenOscillator.start();

    const sirenInterval = setInterval(() => {
        if (!sirenOscillator) { clearInterval(sirenInterval); return; }
        sirenOscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.5);
        sirenOscillator.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 1.0);
    }, 1000);
}

function stopGlobalSiren() {
    if (sirenOscillator) {
        sirenOscillator.stop();
        sirenOscillator = null;
    }
}

function toggleAudio() {
    audioEnabled = !audioEnabled;
    document.getElementById("muteBtn").innerText = `🔊 Audio: ${audioEnabled ? 'ON' : 'OFF'}`;
    if (!audioEnabled) stopGlobalSiren();
}