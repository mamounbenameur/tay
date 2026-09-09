/* ==========================================================================
   MATH REALM - ROMANTIC CRUSH GIFT APPLICATION LOGIC
   Features: Floating Hearts & Math Background, Web Audio Romantic Chimes,
             Cartesian Heart Plotter, Confetti Cannon, Typewriter Love Note
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Subsystems
    const audio = new AudioSynth();
    const mathBg = new MathBackground('math-bg-canvas');
    const confetti = new ConfettiEngine('confetti-canvas');
    const repereGraph = new ReperePlotter('repere-canvas');

    // Stage State
    let currentStage = 1;
    let stage1Solved = false;
    let stage2Solved = false;

    // DOM Elements
    const stage1 = document.getElementById('stage-1');
    const stage2 = document.getElementById('stage-2');
    const stage3 = document.getElementById('stage-3');

    const pill1 = document.getElementById('pill-1');
    const pill2 = document.getElementById('pill-2');
    const pill3 = document.getElementById('pill-3');

    const stage1Input = document.getElementById('stage1-input');
    const stage1CheckBtn = document.getElementById('stage1-check-btn');
    const stage1Feedback = document.getElementById('stage1-feedback');
    const stage1NextContainer = document.getElementById('stage1-next-container');
    const gotoStage2Btn = document.getElementById('goto-stage2-btn');

    const stage2Input = document.getElementById('stage2-input');
    const stage2CheckBtn = document.getElementById('stage2-check-btn');
    const stage2Feedback = document.getElementById('stage2-feedback');

    const celebrationModal = document.getElementById('celebration-modal');
    const loveLetterModal = document.getElementById('love-letter-modal');
    const btnOpenLoveLetter = document.getElementById('btn-open-love-letter');
    const closeLetterBtn = document.getElementById('close-letter-btn');
    const typewriterContent = document.getElementById('typewriter-content');

    const btnRestartQuest = document.getElementById('btn-restart-quest');
    const btnReplayAnim = document.getElementById('btn-replay-anim');
    const btnToggleGrid = document.getElementById('btn-toggle-grid');
    const soundToggleBtn = document.getElementById('sound-toggle-btn');
    const soundIconOn = document.getElementById('sound-icon-on');
    const soundIconOff = document.getElementById('sound-icon-off');

    // Sound Toggle Logic
    let soundEnabled = true;
    soundToggleBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        audio.setEnabled(soundEnabled);
        if (soundEnabled) {
            soundIconOn.classList.remove('hidden');
            soundIconOff.classList.add('hidden');
            audio.playClick();
        } else {
            soundIconOn.classList.add('hidden');
            soundIconOff.classList.remove('hidden');
        }
    });

    // ----------------------------------------------------------------------
    // STAGE 1 LOGIC: 2 + 2 = 4 (With Romantic Touch)
    // ----------------------------------------------------------------------
    const handleStage1Submit = () => {
        audio.playClick();
        const val = stage1Input.value.trim();

        if (val === '4') {
            stage1Solved = true;
            stage1Feedback.className = 'feedback-msg success';
            stage1Feedback.innerHTML = '<span>✓ Correct! 2 + 2 = 4, but 1 + 1 = Us 💕 Gateway Unlocked!</span>';
            stage1NextContainer.classList.remove('hidden');
            pill1.classList.remove('active');
            pill1.classList.add('completed');
            audio.playCorrect();
            stage1Input.disabled = true;
            stage1CheckBtn.disabled = true;
        } else {
            stage1Feedback.className = 'feedback-msg error';
            stage1Feedback.innerHTML = '<span>✕ Not quite! Hint: 2 + 2 = 4! Try typing 4 💕</span>';
            audio.playError();
        }
    };

    document.getElementById('stage1-form').addEventListener('submit', (e) => {
        e.preventDefault();
        handleStage1Submit();
    });

    gotoStage2Btn.addEventListener('click', () => {
        audio.playClick();
        transitionStage(1, 2);
    });

    // ----------------------------------------------------------------------
    // STAGE 2 LOGIC: Heart Equation Solution
    // ----------------------------------------------------------------------

    const handleStage2Submit = () => {
        audio.playClick();
        const rawVal = stage2Input.value.trim().toLowerCase();


       
        stage2Solved = true;
        stage2Feedback.className = 'feedback-msg success';
        stage2Feedback.innerHTML = '<span>bazzzz ijaaabtek shiiha cutiee </span>';
        pill2.classList.remove('active');
        pill2.classList.add('completed');
        audio.playCorrect();

        stage2Input.disabled = true;
        stage2CheckBtn.disabled = true;

        setTimeout(() => {
            transitionStage(2, 3);
            // Start plotting the heart curve on the X-Y Repère
            repereGraph.startPlotAnimation(() => {
                audio.playVictory();
                confetti.triggerBurst();
                setTimeout(() => {
                    showCelebrationModal();
                }, 1200);
            });
        }, 2000);

        
    };

    document.getElementById('stage2-form').addEventListener('submit', (e) => {
        e.preventDefault();
        handleStage2Submit();
    });

    // ----------------------------------------------------------------------
    // STAGE TRANSITION MANAGER
    // ----------------------------------------------------------------------
    function transitionStage(fromStage, toStage) {
        currentStage = toStage;

        const fromCard = document.getElementById(`stage-${fromStage}`);
        const toCard = document.getElementById(`stage-${toStage}`);

        fromCard.classList.remove('active');
        fromCard.classList.add('hidden');

        toCard.classList.remove('hidden');
        void toCard.offsetWidth; // force reflow
        toCard.classList.add('active');

        if (toStage === 2) {
            pill2.classList.add('active');
            stage2Input.focus();
        } else if (toStage === 3) {
            pill3.classList.add('active');
        }
    }

    // Graph Controls
    btnReplayAnim.addEventListener('click', () => {
        audio.playClick();
        repereGraph.startPlotAnimation(() => {
            audio.playVictory();
            confetti.triggerBurst();
            setTimeout(() => {
                showCelebrationModal();
            }, 600);
        });
    });

    btnToggleGrid.addEventListener('click', () => {
        audio.playClick();
        btnToggleGrid.classList.toggle('active');
        repereGraph.toggleGrid();
    });

    // Modal Control Handlers
    function showCelebrationModal() {
        celebrationModal.classList.remove('hidden');
        confetti.startContinuous();
    }

    function hideCelebrationModal() {
        celebrationModal.classList.add('hidden');
        confetti.stopContinuous();
    }

    // Love Letter Modal Handler with Typewriter Effect
    btnOpenLoveLetter.addEventListener('click', () => {
        audio.playClick();
        hideCelebrationModal();
        loveLetterModal.classList.remove('hidden');
        triggerTypewriterEffect();
    });

    closeLetterBtn.addEventListener('click', () => {
        audio.playClick();
        loveLetterModal.classList.add('hidden');
        showCelebrationModal();
    });

    function triggerTypewriterEffect() {
        const fullMessage = "Pawwwwww";
        typewriterContent.innerText = '';
        let i = 0;
        const interval = setInterval(() => {
            typewriterContent.innerText += fullMessage.charAt(i);
            i++;
            if (i >= fullMessage.length) {
                clearInterval(interval);
            }
        }, 32);
    }

    btnRestartQuest.addEventListener('click', () => {
        audio.playClick();
        hideCelebrationModal();
        loveLetterModal.classList.add('hidden');
        resetQuest();
    });

    function resetQuest() {
        currentStage = 1;
        stage1Solved = false;
        stage2Solved = false;

        pill1.className = 'pill active';
        pill2.className = 'pill';
        pill3.className = 'pill';

        stage1Input.disabled = false;
        stage1Input.value = '';
        stage1CheckBtn.disabled = false;
        stage1Feedback.innerHTML = '';
        stage1Feedback.className = 'feedback-msg';
        stage1NextContainer.classList.add('hidden');

        stage2Input.disabled = false;
        stage2Input.value = '';
        stage2CheckBtn.disabled = false;
        stage2Feedback.innerHTML = '';
        stage2Feedback.className = 'feedback-msg';

        stage1.classList.remove('hidden');
        stage1.classList.add('active');
        stage2.classList.add('hidden');
        stage2.classList.remove('active');
        stage3.classList.add('hidden');
        stage3.classList.remove('active');

        repereGraph.reset();
        stage1Input.focus();
    }
});

/* ==========================================================================
   WEB AUDIO SYNTHESIZER
   ========================================================================== */
class AudioSynth {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
    }

    setEnabled(flag) {
        this.enabled = flag;
    }

    playClick() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
    }

    playCorrect() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime + idx * 0.08;

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.25);
        });
    }

    playError() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.2);

        gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);
    }

    playVictory() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const arpeggio = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
        arpeggio.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const startTime = this.ctx.currentTime + i * 0.07;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, startTime);

            gain.gain.setValueAtTime(0.25, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(startTime);
            osc.stop(startTime + 0.6);
        });
    }
}

/* ==========================================================================
   FLOATING HEARTS & MATH SYMBOLS BACKGROUND
   ========================================================================== */
class MathBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.symbols = ['💖', '💕', '♥', '✨', '🌸', 'π', '∫', '∞', '∑', '√x', 'θ', 'Δ', 'e'];
        this.particles = [];
        this.resize();

        window.addEventListener('resize', () => this.resize());
        this.initParticles();
        this.animate();
    }

    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }

    initParticles() {
        this.particles = [];
        const count = Math.floor((this.width * this.height) / 20000);
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                symbol: this.symbols[Math.floor(Math.random() * this.symbols.length)],
                size: Math.random() * 18 + 14,
                speedY: -(Math.random() * 0.45 + 0.15),
                speedX: (Math.random() - 0.5) * 0.25,
                opacity: Math.random() * 0.45 + 0.15,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.015
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.particles.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotSpeed;

            if (p.y < -30) {
                p.y = this.height + 30;
                p.x = Math.random() * this.width;
            }

            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            this.ctx.font = `${p.size}px "Outfit", sans-serif`;
            this.ctx.fillStyle = `rgba(255, 77, 141, ${p.opacity})`;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = 'rgba(255, 77, 141, 0.5)';
            this.ctx.fillText(p.symbol, 0, 0);
            this.ctx.restore();
        });

        requestAnimationFrame(() => this.animate());
    }
}

/* ==========================================================================
   CARTESIAN COORDINATE REPERE & PARAMETRIC HEART PLOTTER
   ========================================================================== */
class ReperePlotter {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');

        this.showGrid = true;
        this.isAnimating = false;
        this.animationProgress = 0;
        this.animationReq = null;

        this.telemetryT = document.getElementById('telemetry-t');
        this.telemetryX = document.getElementById('telemetry-x');
        this.telemetryY = document.getElementById('telemetry-y');
        this.statusText = document.getElementById('plot-status-text');

        this.resize();
        this.drawStaticGraph();
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.width = this.canvas.width = rect.width || 700;
        this.height = this.canvas.height = 480;

        this.originX = this.width / 2;
        this.originY = this.height / 2 + 15;
        this.scale = Math.min(this.width, this.height) / 5.2;
    }

    toggleGrid() {
        this.showGrid = !this.showGrid;
        this.redraw();
    }

    reset() {
        this.isAnimating = false;
        if (this.animationReq) cancelAnimationFrame(this.animationReq);
        this.animationProgress = 0;
        this.statusText.innerText = "Ready to Plot";
        this.updateTelemetry(0, 0, 0);
        this.redraw();
    }

    updateTelemetry(t, x, y) {
        if (this.telemetryT) this.telemetryT.innerText = `${t.toFixed(2)} rad`;
        if (this.telemetryX) this.telemetryX.innerText = x.toFixed(2);
        if (this.telemetryY) this.telemetryY.innerText = y.toFixed(2);
    }

    getHeartPoint(t) {
        const x = (16 * Math.pow(Math.sin(t), 3)) / 10;
        const y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 10;
        return { x, y };
    }

    toPixel(x, y) {
        return {
            px: this.originX + x * this.scale,
            py: this.originY - y * this.scale
        };
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawGridAndAxes();

        if (this.animationProgress > 0) {
            this.drawHeartCurve(this.animationProgress);
        }
    }

    drawStaticGraph() {
        this.redraw();
    }

    drawGridAndAxes() {
        const { ctx, width, height, originX, originY, scale } = this;

        if (this.showGrid) {
            ctx.strokeStyle = 'rgba(255, 120, 180, 0.08)';
            ctx.lineWidth = 1;

            for (let x = originX % (scale / 2); x < width; x += scale / 2) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }

            for (let y = originY % (scale / 2); y < height; y += scale / 2) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }
        }

        ctx.strokeStyle = 'rgba(255, 77, 141, 0.7)';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 77, 141, 0.4)';

        ctx.beginPath();
        ctx.moveTo(0, originY);
        ctx.lineTo(width, originY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(originX, 0);
        ctx.lineTo(originX, height);
        ctx.stroke();

        ctx.fillStyle = '#ff4d8d';
        ctx.font = '700 13px "Fira Code", monospace';
        ctx.shadowBlur = 6;

        ctx.beginPath();
        ctx.moveTo(width - 12, originY - 6);
        ctx.lineTo(width - 2, originY);
        ctx.lineTo(width - 12, originY + 6);
        ctx.fill();
        ctx.fillText('X', width - 20, originY - 12);

        ctx.beginPath();
        ctx.moveTo(originX - 6, 12);
        ctx.lineTo(originX, 2);
        ctx.lineTo(originX + 6, 12);
        ctx.fill();
        ctx.fillText('Y', originX + 14, 18);

        ctx.fillStyle = 'rgba(255, 240, 245, 0.6)';
        ctx.font = '600 11px "Fira Code", monospace';
        ctx.shadowBlur = 0;
        ctx.fillText('(0,0)', originX + 6, originY + 16);

        const ticks = [-2, -1, 1, 2];
        ticks.forEach(val => {
            const p = this.toPixel(val, 0);
            ctx.strokeStyle = 'rgba(255, 77, 141, 0.8)';
            ctx.beginPath();
            ctx.moveTo(p.px, originY - 5);
            ctx.lineTo(p.px, originY + 5);
            ctx.stroke();

            ctx.fillText(val.toFixed(1), p.px - 12, originY + 20);
        });

        ticks.forEach(val => {
            const p = this.toPixel(0, val);
            ctx.strokeStyle = 'rgba(255, 77, 141, 0.8)';
            ctx.beginPath();
            ctx.moveTo(originX - 5, p.py);
            ctx.lineTo(originX + 5, p.py);
            ctx.stroke();

            ctx.fillText(val.toFixed(1), originX - 32, p.py + 4);
        });
    }

    drawHeartCurve(maxT) {
        const { ctx } = this;
        const step = 0.02;

        ctx.save();
        ctx.beginPath();

        let first = true;
        let lastPt = { x: 0, y: 0 };

        for (let t = 0; t <= maxT; t += step) {
            const pt = this.getHeartPoint(t);
            const p = this.toPixel(pt.x, pt.y);
            if (first) {
                ctx.moveTo(p.px, p.py);
                first = false;
            } else {
                ctx.lineTo(p.px, p.py);
            }
            lastPt = pt;
        }

        ctx.strokeStyle = '#ff2a75';
        ctx.lineWidth = 3.8;
        ctx.shadowBlur = 22;
        ctx.shadowColor = '#ff2a75';
        ctx.stroke();

        if (maxT >= Math.PI * 2) {
            ctx.fillStyle = 'rgba(255, 42, 117, 0.25)';
            ctx.fill();
        }

        const headPixel = this.toPixel(lastPt.x, lastPt.y);
        ctx.beginPath();
        ctx.arc(headPixel.px, headPixel.py, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 25;
        ctx.shadowColor = '#ffd700';
        ctx.fill();

        ctx.restore();

        this.updateTelemetry(maxT, lastPt.x, lastPt.y);
    }

    startPlotAnimation(onComplete) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.animationProgress = 0;
        this.statusText.innerText = "Plotting Heart Equation...";

        const totalT = Math.PI * 2;
        const durationMs = 3800;
        const startTime = performance.now();

        const animateFrame = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            this.animationProgress = progress * totalT;

            this.redraw();

            if (progress < 1) {
                this.animationReq = requestAnimationFrame(animateFrame);
            } else {
                this.animationProgress = totalT;
                this.redraw();
                this.isAnimating = false;
                this.statusText.innerText = "Heart Plot Complete! 💕";
                if (onComplete) onComplete();
            }
        };

        this.animationReq = requestAnimationFrame(animateFrame);
    }
}

/* ==========================================================================
   CONFETTI CANNON SYSTEM
   ========================================================================== */
class ConfettiEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animating = false;
        this.colors = ['#ff4d8d', '#ff2a75', '#c084fc', '#ffd700', '#10b981', '#ffffff'];

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }

    triggerBurst() {
        this.resize();
        for (let i = 0; i < 120; i++) {
            this.particles.push({
                x: this.width / 2,
                y: this.height / 2 + 50,
                size: Math.random() * 9 + 5,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                vx: (Math.random() - 0.5) * 18,
                vy: (Math.random() - 0.7) * 20,
                gravity: 0.35,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.2,
                opacity: 1
            });
        }
        if (!this.animating) this.startContinuous();
    }

    startContinuous() {
        this.animating = true;
        this.loop();
    }

    stopContinuous() {
        this.animating = false;
        this.particles = [];
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    loop() {
        if (!this.animating && this.particles.length === 0) return;

        this.ctx.clearRect(0, 0, this.width, this.height);

        this.particles.forEach((p, idx) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.rotation += p.rotSpeed;
            p.opacity -= 0.008;

            if (p.opacity <= 0) {
                this.particles.splice(idx, 1);
                return;
            }

            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            this.ctx.globalAlpha = Math.max(0, p.opacity);
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            this.ctx.restore();
        });

        if (this.animating || this.particles.length > 0) {
            requestAnimationFrame(() => this.loop());
        }
    }
}
