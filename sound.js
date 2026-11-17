const SoundFX = {
    enabled: true,
    ctx: null,

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
    },

    playTone(freq, type, duration, vol = 0.12, slideTo = null) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        if (slideTo) {
            osc.frequency.exponentialRampToValueAtTime(slideTo, this.ctx.currentTime + duration);
        }

        gain.gain.setValueAtTime(vol, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    },

    hit() {
        this.playTone(180, "sawtooth", 0.14, 0.14, 60);
    },

    guard() {
        this.playTone(260, "triangle", 0.18, 0.14, 190);
    },

    magic() {
        this.playTone(420, "sine", 0.32, 0.15, 880);
    },

    heal() {
        this.playTone(340, "triangle", 0.25, 0.14, 620);
    },

    coin() {
        this.playTone(980, "sine", 0.1, 0.12);
        setTimeout(() => this.playTone(1320, "sine", 0.18, 0.12), 80);
    },

    levelUp() {
        [440, 554, 659, 880].forEach((f, i) => {
            setTimeout(() => this.playTone(f, "triangle", 0.22, 0.14), i * 100);
        });
    },

    defeat() {
        this.playTone(220, "sawtooth", 0.45, 0.15, 55);
    }
};
