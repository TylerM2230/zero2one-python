// ==========================================================================
// PYTHON ZERO2ONE — SHARED THREE.JS 3D PEDAGOGICAL VISUALIZATION ENGINE
// ==========================================================================

(function() {
    window.ThreeScenes0To7 = window.ThreeScenes0To7 || {};
    window.ThreeScenes8To15 = window.ThreeScenes8To15 || {};

    function hookGlobalFunction(fnName, afterCallback) {
        const original = window[fnName];
        if (typeof original === 'function') {
            window[fnName] = function(...args) {
                const res = original.apply(this, args);
                try {
                    afterCallback(...args, res);
                } catch (err) {
                    console.warn('3D scene hook warning in ' + fnName + ':', err);
                }
                return res;
            };
        }
    }

    function makeTextSprite(text, opts = {}) {
        const bgColor = opts.bg || 'rgba(18, 30, 38, 0.92)';
        const borderColor = opts.border || '#66c032';
        const textColor = opts.color || '#f5efe0';
        const fontSize = opts.fontSize || 28;
        const scale = opts.scale || 1.25;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.font = `bold ${fontSize}px "Courier Prime", "Courier New", monospace`;
        const metrics = ctx.measureText(String(text));
        const padX = 24;
        const padY = 16;
        canvas.width = Math.max(128, Math.ceil(metrics.width + padX * 2));
        canvas.height = Math.max(64, fontSize + padY * 2);

        ctx.font = `bold ${fontSize}px "Courier Prime", "Courier New", monospace`;
        ctx.fillStyle = bgColor;
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 4;

        // Asymmetric rounded rect
        const r = 12;
        const w = canvas.width - 6;
        const h = canvas.height - 6;
        ctx.beginPath();
        ctx.moveTo(3 + 4, 3);
        ctx.lineTo(3 + w - r, 3);
        ctx.quadraticCurveTo(3 + w, 3, 3 + w, 3 + r);
        ctx.lineTo(3 + w, 3 + h - r);
        ctx.quadraticCurveTo(3 + w, 3 + h, 3 + w - r, 3 + h);
        ctx.lineTo(3 + r, 3 + h);
        ctx.quadraticCurveTo(3, 3 + h, 3, 3 + h - r);
        ctx.lineTo(3, 3 + 4);
        ctx.quadraticCurveTo(3, 3, 3 + 4, 3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(text), canvas.width / 2, canvas.height / 2 + 1);

        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
        const sprite = new THREE.Sprite(material);
        const aspect = canvas.width / canvas.height;
        sprite.scale.set(scale * aspect * 0.55, scale * 0.55, 1);
        sprite.renderOrder = 10;
        return sprite;
    }

    function createStage(containerEl, badgeTitle, initialCaption) {
        if (!containerEl || typeof THREE === 'undefined') return null;

        const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        const orbitHintText = isTouch ? 'Touch to Orbit' : 'Drag to Orbit 3D';

        const stageWrap = document.createElement('div');
        stageWrap.className = 'three-viz-stage';
        stageWrap.innerHTML = `
            <div class="three-stage-hud">
                <span class="three-stage-badge">${badgeTitle}</span>
                <div style="display: flex; align-items: center; gap: 6px;">
                    <span class="three-stage-badge three-stage-orbit-hint">${orbitHintText}</span>
                    <button type="button" class="three-stage-toggle-btn" title="Toggle 3D Stage Visibility">Hide 3D</button>
                </div>
            </div>
            <div class="three-stage-caption">${initialCaption || ''}</div>
        `;

        containerEl.insertBefore(stageWrap, containerEl.firstChild);
        const captionEl = stageWrap.querySelector('.three-stage-caption');
        const toggleBtn = stageWrap.querySelector('.three-stage-toggle-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const collapsed = stageWrap.classList.toggle('stage-collapsed');
                toggleBtn.textContent = collapsed ? 'Show 3D Stage' : 'Hide 3D';
            });
        }

        const width = stageWrap.clientWidth || 640;
        const height = stageWrap.clientHeight || 270;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);

        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        } catch (e) {
            stageWrap.remove();
            return null;
        }

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        stageWrap.appendChild(renderer.domElement);

        // Woodland lighting
        const hemiLight = new THREE.HemisphereLight(0xf5efe0, 0x182c27, 0.9);
        hemiLight.position.set(0, 12, 0);
        scene.add(hemiLight);

        const dirLight = new THREE.DirectionalLight(0xffeab3, 1.05);
        dirLight.position.set(6, 10, 8);
        scene.add(dirLight);

        // Subtle woodland floor grid
        const grid = new THREE.GridHelper(14, 14, 0x388934, 0x243b33);
        grid.position.y = -1.6;
        scene.add(grid);

        // Orbit drag state
        let isDragging = false;
        let prevX = 0;
        let prevY = 0;
        let theta = 0.25;
        let phi = 0.42;
        let radius = 9.5;
        const target = new THREE.Vector3(0, 0.1, 0);

        function updateCamera() {
            const x = target.x + radius * Math.sin(theta) * Math.cos(phi);
            const y = target.y + radius * Math.sin(phi);
            const z = target.z + radius * Math.cos(theta) * Math.cos(phi);
            camera.position.set(x, y, z);
            camera.lookAt(target);
        }
        updateCamera();

        const dom = renderer.domElement;
        dom.addEventListener('mousedown', (e) => {
            isDragging = true;
            prevX = e.clientX;
            prevY = e.clientY;
        });
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - prevX;
            const dy = e.clientY - prevY;
            prevX = e.clientX;
            prevY = e.clientY;
            theta -= dx * 0.008;
            phi = Math.max(0.12, Math.min(1.15, phi + dy * 0.006));
            updateCamera();
        });
        window.addEventListener('mouseup', () => { isDragging = false; });

        // Prevent swipe navigation conflict when rotating 3D stage on touchscreens
        dom.addEventListener('touchstart', (e) => {
            e.stopPropagation();
            if (e.touches.length === 1) {
                isDragging = true;
                prevX = e.touches[0].clientX;
                prevY = e.touches[0].clientY;
            }
        }, { passive: true });
        dom.addEventListener('touchmove', (e) => {
            e.stopPropagation();
            if (!isDragging || e.touches.length !== 1) return;
            const dx = e.touches[0].clientX - prevX;
            const dy = e.touches[0].clientY - prevY;
            prevX = e.touches[0].clientX;
            prevY = e.touches[0].clientY;
            theta -= dx * 0.008;
            phi = Math.max(0.12, Math.min(1.15, phi + dy * 0.006));
            updateCamera();
        }, { passive: true });
        dom.addEventListener('touchend', (e) => {
            e.stopPropagation();
            isDragging = false;
        }, { passive: true });

        // Resize observer
        if (typeof ResizeObserver !== 'undefined') {
            const ro = new ResizeObserver(() => {
                const nw = stageWrap.clientWidth;
                const nh = stageWrap.clientHeight;
                if (nw > 0 && nh > 0) {
                    camera.aspect = nw / nh;
                    camera.updateProjectionMatrix();
                    renderer.setSize(nw, nh);
                }
            });
            ro.observe(stageWrap);
        }

        const animCallbacks = [];
        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            const dt = clock.getDelta();
            const elapsed = clock.getElapsedTime();
            for (let i = 0; i < animCallbacks.length; i++) {
                animCallbacks[i](dt, elapsed);
            }
            renderer.render(scene, camera);
        }
        animate();

        return {
            scene,
            camera,
            renderer,
            grid,
            target,
            setCameraOrbit(t, p, r) {
                theta = t;
                phi = p;
                if (r) radius = r;
                updateCamera();
            },
            setCaption(text) {
                if (captionEl) captionEl.textContent = text;
            },
            onTick(fn) {
                animCallbacks.push(fn);
            }
        };
    }

    window.ThreeVizToolkit = {
        createStage,
        makeTextSprite,
        hookGlobalFunction,
        COLORS: {
            leaf: 0x66c032,
            leafDark: 0x388934,
            pine: 0x1c3331,
            amber: 0xe8b04b,
            bark: 0x5a4228,
            barkDark: 0x3a2d1b,
            slate: 0x1a2c38,
            cream: 0xf5efe0,
            error: 0xde6852,
            magic: 0x4a86c0
        }
    };

    function bootCurrentPageScene() {
        if (typeof THREE === 'undefined') return;
        const path = window.location.pathname;
        const cardMatch = path.match(/card_(\d+)\.html/);

        if (cardMatch) {
            const cardNum = parseInt(cardMatch[1], 10);
            const key = 'card_' + cardNum;
            if (cardNum <= 7 && window.ThreeScenes0To7[key]) {
                window.ThreeScenes0To7[key](window.ThreeVizToolkit);
            } else if (cardNum >= 8 && window.ThreeScenes8To15[key]) {
                window.ThreeScenes8To15[key](window.ThreeVizToolkit);
            }
        } else if (path.endsWith('index.html') || path.endsWith('/')) {
            if (window.ThreeScenes0To7['index']) {
                window.ThreeScenes0To7['index'](window.ThreeVizToolkit);
            }
        }
    }

    window.bootCurrentPageScene = bootCurrentPageScene;
})();

