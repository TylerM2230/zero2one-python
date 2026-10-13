// ==========================================================================
// PYTHON ZERO2ONE — 3D SCENES FOR HOME (INDEX) & CARDS 0 THROUGH 7
// ==========================================================================

(function() {
    window.ThreeScenes0To7 = window.ThreeScenes0To7 || {};

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function clamp(v, min, max) {
        return Math.max(min, Math.min(max, v));
    }

    function updateSpriteText(toolkit, parent, oldSprite, text, opts) {
        const pos = oldSprite ? oldSprite.position.clone() : new THREE.Vector3();
        const vis = oldSprite ? oldSprite.visible : true;
        if (oldSprite && parent) {
            parent.remove(oldSprite);
            if (oldSprite.material && oldSprite.material.map) {
                oldSprite.material.map.dispose();
            }
            if (oldSprite.material) {
                oldSprite.material.dispose();
            }
        }
        const next = toolkit.makeTextSprite(text, opts);
        next.position.copy(pos);
        next.visible = vis;
        if (parent) parent.add(next);
        return next;
    }

    // ======================================================================
    // HOME (index.html): 3D Living Voxel Bonsai Tree
    // ======================================================================
    window.ThreeScenes0To7['index'] = function(toolkit) {
        const container = document.querySelector('.visualization');
        const stage = toolkit.createStage(
            container,
            '3D Voxel Bonsai Grimoire',
            'Stage 0/3: The Seed — Click "Water & Grow Mental Model" to cultivate your computational tree'
        );
        if (!stage) return;

        const { scene } = stage;
        const { COLORS } = toolkit;
        stage.setCameraOrbit(0.35, 0.36, 9.2);

        const treeRoot = new THREE.Group();
        treeRoot.position.y = -1.25;
        scene.add(treeRoot);

        // Terracotta Pot
        const potMat = new THREE.MeshStandardMaterial({ color: 0xb85d3b, roughness: 0.75, metalness: 0.1 });
        const potBase = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 0.95, 0.9, 8), potMat);
        potBase.position.y = 0.45;
        treeRoot.add(potBase);

        const potRim = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.42, 0.22, 8), potMat);
        potRim.position.y = 0.92;
        treeRoot.add(potRim);

        // Rich dark soil bed
        const soilMat = new THREE.MeshStandardMaterial({ color: COLORS.barkDark, roughness: 0.95 });
        const soil = new THREE.Mesh(new THREE.CylinderGeometry(1.32, 1.32, 0.14, 8), soilMat);
        soil.position.y = 0.98;
        treeRoot.add(soil);

        // Stage 0 Seed Core
        const seedMat = new THREE.MeshStandardMaterial({
            color: COLORS.amber,
            emissive: 0x6b4c1b,
            roughness: 0.35,
            metalness: 0.2
        });
        const seedGroup = new THREE.Group();
        seedGroup.position.set(0, 1.15, 0);
        const seedMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(0.28, 0), seedMat);
        seedGroup.add(seedMesh);

        const sproutMat = new THREE.MeshStandardMaterial({ color: COLORS.leaf, roughness: 0.5 });
        const sproutStem = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.36, 0.12), sproutMat);
        sproutStem.position.y = 0.26;
        seedGroup.add(sproutStem);

        const sproutLeafL = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.08, 0.16), sproutMat);
        sproutLeafL.position.set(-0.16, 0.44, 0);
        sproutLeafL.rotation.z = 0.35;
        seedGroup.add(sproutLeafL);

        const sproutLeafR = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.08, 0.16), sproutMat);
        sproutLeafR.position.set(0.16, 0.44, 0);
        sproutLeafR.rotation.z = -0.35;
        seedGroup.add(sproutLeafR);
        treeRoot.add(seedGroup);

        // Stage 1: Voxel Trunk
        const barkMat = new THREE.MeshStandardMaterial({ color: COLORS.bark, roughness: 0.85 });
        const trunkGroup = new THREE.Group();
        trunkGroup.position.set(0, 1.0, 0);
        const trunkBlocks = [
            { x: 0, y: 0.22, z: 0, sx: 0.52, sy: 0.45, sz: 0.52 },
            { x: 0.05, y: 0.62, z: 0.02, sx: 0.46, sy: 0.45, sz: 0.46 },
            { x: -0.04, y: 1.02, z: 0.04, sx: 0.40, sy: 0.45, sz: 0.40 },
            { x: -0.10, y: 1.40, z: 0.0, sx: 0.35, sy: 0.42, sz: 0.35 },
            { x: -0.02, y: 1.75, z: -0.04, sx: 0.30, sy: 0.38, sz: 0.30 }
        ];
        trunkBlocks.forEach(b => {
            const m = new THREE.Mesh(new THREE.BoxGeometry(b.sx, b.sy, b.sz), barkMat);
            m.position.set(b.x, b.y, b.z);
            trunkGroup.add(m);
        });
        // Small early leaf tuft on trunk
        const earlyLeaf = new THREE.Mesh(
            new THREE.BoxGeometry(0.85, 0.38, 0.85),
            new THREE.MeshStandardMaterial({ color: COLORS.leafDark, roughness: 0.65 })
        );
        earlyLeaf.position.set(0, 2.02, 0);
        trunkGroup.add(earlyLeaf);
        treeRoot.add(trunkGroup);

        // Stage 2: Voxel Branches & Mid Canopy
        const branchGroup = new THREE.Group();
        branchGroup.position.set(0, 1.0, 0);
        const branchCoords = [
            // Left branch
            { x: -0.45, y: 1.45, z: 0.1, sx: 0.65, sy: 0.22, sz: 0.22 },
            { x: -0.82, y: 1.62, z: 0.15, sx: 0.45, sy: 0.20, sz: 0.20 },
            // Right branch
            { x: 0.42, y: 1.60, z: -0.1, sx: 0.70, sy: 0.22, sz: 0.22 },
            { x: 0.85, y: 1.78, z: -0.12, sx: 0.45, sy: 0.20, sz: 0.20 },
            // Back/front branch
            { x: 0.05, y: 1.55, z: 0.45, sx: 0.22, sy: 0.22, sz: 0.65 }
        ];
        branchCoords.forEach(b => {
            const m = new THREE.Mesh(new THREE.BoxGeometry(b.sx, b.sy, b.sz), barkMat);
            m.position.set(b.x, b.y, b.z);
            branchGroup.add(m);
        });

        const leafMatLight = new THREE.MeshStandardMaterial({ color: COLORS.leaf, roughness: 0.55 });
        const leafMatDark = new THREE.MeshStandardMaterial({ color: COLORS.leafDark, roughness: 0.65 });
        const midPads = [
            { x: -0.95, y: 1.85, z: 0.15, sx: 1.15, sy: 0.38, sz: 0.95, mat: leafMatLight },
            { x: 0.95, y: 1.98, z: -0.12, sx: 1.2, sy: 0.40, sz: 1.0, mat: leafMatDark },
            { x: 0.05, y: 1.82, z: 0.72, sx: 0.95, sy: 0.35, sz: 0.85, mat: leafMatLight }
        ];
        midPads.forEach(p => {
            const m = new THREE.Mesh(new THREE.BoxGeometry(p.sx, p.sy, p.sz), p.mat);
            m.position.set(p.x, p.y, p.z);
            branchGroup.add(m);
        });
        treeRoot.add(branchGroup);

        // Stage 3: Full Crown Canopy & Voxel Flowers
        const crownGroup = new THREE.Group();
        crownGroup.position.set(0, 1.0, 0);
        const crownPads = [
            { x: 0, y: 2.38, z: 0, sx: 1.85, sy: 0.48, sz: 1.65, mat: leafMatLight },
            { x: -0.1, y: 2.72, z: 0.05, sx: 1.25, sy: 0.38, sz: 1.15, mat: leafMatDark },
            { x: -1.15, y: 2.08, z: 0.15, sx: 0.85, sy: 0.32, sz: 0.85, mat: leafMatDark },
            { x: 1.15, y: 2.22, z: -0.1, sx: 0.85, sy: 0.32, sz: 0.85, mat: leafMatLight }
        ];
        crownPads.forEach(p => {
            const m = new THREE.Mesh(new THREE.BoxGeometry(p.sx, p.sy, p.sz), p.mat);
            m.position.set(p.x, p.y, p.z);
            crownGroup.add(m);
        });

        // Voxel Blossoms on the canopy
        const petalMat = new THREE.MeshStandardMaterial({ color: 0xff8da1, emissive: 0x4a1525, roughness: 0.4 });
        const centerMat = new THREE.MeshStandardMaterial({ color: COLORS.amber, emissive: 0x6b4c1b, roughness: 0.3 });
        const flowerPositions = [
            [-0.65, 2.65, 0.55],
            [0.62, 2.62, 0.48],
            [0.0, 2.95, 0.25],
            [-1.1, 2.28, 0.35],
            [1.15, 2.42, -0.05],
            [0.25, 2.58, -0.65],
            [-0.45, 2.55, -0.55]
        ];
        flowerPositions.forEach(fp => {
            const fGroup = new THREE.Group();
            fGroup.position.set(fp[0], fp[1], fp[2]);
            const base = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.10, 0.24), petalMat);
            const core = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.14, 0.11), centerMat);
            core.position.y = 0.04;
            fGroup.add(base, core);
            crownGroup.add(fGroup);
        });
        treeRoot.add(crownGroup);

        // Floating label sprite above tree
        let stageLabel = toolkit.makeTextSprite('STAGE 0: THE SEED (Cards 0-1)', {
            border: '#e8b04b',
            scale: 1.15
        });
        stageLabel.position.set(0, 3.05, 0);
        scene.add(stageLabel);

        // Watering droplet particles
        const dropGroup = new THREE.Group();
        scene.add(dropGroup);
        const dropMat = new THREE.MeshStandardMaterial({ color: COLORS.magic, emissive: 0x1c4566, roughness: 0.2 });
        const drops = [];
        for (let i = 0; i < 10; i++) {
            const d = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.16, 0.09), dropMat);
            d.visible = false;
            dropGroup.add(d);
            drops.push({ mesh: d, vx: (Math.random() - 0.5) * 1.4, vy: -2.6 - Math.random() * 1.2, vz: (Math.random() - 0.5) * 1.4 });
        }
        let waterAnimTimer = 0;

        let targetStage = 0;
        let trunkScale = 0.001;
        let branchScale = 0.001;
        let crownScale = 0.001;

        const stageCaptions = [
            'Stage 0/3: The Seed — Sequential thinking & literal steps (Cards 0-1)',
            'Stage 1/3: The Trunk — Variables, Data Types & Logical Truth (Cards 2-6)',
            'Stage 2/3: The Branches — Conditionals, Loops & Lists (Cards 7-11)',
            'Stage 3/3: The Full Canopy — Functions, Dictionaries & Recursion (Cards 12-15)'
        ];
        const stageLabels = [
            'STAGE 0: THE SEED (Cards 0-1)',
            'STAGE 1: THE TRUNK (Cards 2-6)',
            'STAGE 2: THE BRANCHES (Cards 7-11)',
            'STAGE 3: FULL CANOPY (Cards 12-15)'
        ];

        function syncStageState() {
            let st = 0;
            if (typeof currentBonsaiStage !== 'undefined') {
                st = currentBonsaiStage;
            } else {
                const badgeEl = document.getElementById('bonsai-stage-badge');
                if (badgeEl) {
                    const m = badgeEl.textContent.match(/STAGE\s+(\d+)/i);
                    if (m) st = parseInt(m[1], 10);
                }
            }
            targetStage = clamp(st, 0, 3);
            stage.setCaption(stageCaptions[targetStage]);
            stageLabel = updateSpriteText(toolkit, scene, stageLabel, stageLabels[targetStage], {
                border: targetStage === 3 ? '#66c032' : '#e8b04b',
                scale: 1.15
            });
            waterAnimTimer = 0.85;
            drops.forEach((d, idx) => {
                d.mesh.visible = true;
                const angle = (idx / drops.length) * Math.PI * 2;
                d.mesh.position.set(Math.cos(angle) * 0.65, 2.6 + (idx % 3) * 0.25, Math.sin(angle) * 0.65);
            });
        }

        toolkit.hookGlobalFunction('waterBonsai', syncStageState);
        toolkit.hookGlobalFunction('setBonsaiStage', syncStageState);

        stage.onTick((dt, elapsed) => {
            treeRoot.rotation.y = Math.sin(elapsed * 0.45) * 0.18;

            const wantTrunk = targetStage >= 1 ? 1 : 0.001;
            const wantBranch = targetStage >= 2 ? 1 : 0.001;
            const wantCrown = targetStage >= 3 ? 1 : 0.001;

            trunkScale = lerp(trunkScale, wantTrunk, Math.min(1, dt * 6));
            branchScale = lerp(branchScale, wantBranch, Math.min(1, dt * 6));
            crownScale = lerp(crownScale, wantCrown, Math.min(1, dt * 6));

            trunkGroup.scale.setScalar(trunkScale);
            trunkGroup.visible = trunkScale > 0.02;

            branchGroup.scale.setScalar(branchScale);
            branchGroup.visible = branchScale > 0.02;

            crownGroup.scale.setScalar(crownScale);
            crownGroup.visible = crownScale > 0.02;

            seedGroup.position.y = 1.12 + Math.sin(elapsed * 2.5) * 0.03;

            if (waterAnimTimer > 0) {
                waterAnimTimer -= dt;
                drops.forEach(d => {
                    d.mesh.position.y += d.vy * dt;
                    if (d.mesh.position.y < -0.2) {
                        d.mesh.position.y = 2.5;
                    }
                    if (waterAnimTimer <= 0) {
                        d.mesh.visible = false;
                    }
                });
            }
        });
    };

    // ======================================================================
    // CARD 0: Apprentice Golem Tabletop
    // ======================================================================
    window.ThreeScenes0To7['card_0'] = function(toolkit) {
        const container = document.querySelector('.visualization');
        const stage = toolkit.createStage(
            container,
            '3D Apprentice Golem Tabletop',
            'Step 1/5: Vague command "Open the jar" — Golem lacks exact shelf/slot coordinates!'
        );
        if (!stage) return;

        const { scene } = stage;
        const { COLORS } = toolkit;
        stage.setCameraOrbit(0.18, 0.44, 9.8);

        // Wooden Tabletop
        const tableMat = new THREE.MeshStandardMaterial({ color: COLORS.bark, roughness: 0.85 });
        const tableTop = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.28, 3.6), tableMat);
        tableTop.position.set(0, -0.8, 0);
        scene.add(tableTop);

        // Shelf 2 Slot 1 on back-left
        const shelfMat = new THREE.MeshStandardMaterial({ color: COLORS.barkDark, roughness: 0.9 });
        const shelfGroup = new THREE.Group();
        shelfGroup.position.set(-2.35, 0.35, -1.1);
        const shelfPlank = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.14, 1.1), shelfMat);
        const shelfPillarL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.1, 0.9), shelfMat);
        shelfPillarL.position.set(-0.75, -0.5, 0);
        const shelfPillarR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.1, 0.9), shelfMat);
        shelfPillarR.position.set(0.75, -0.5, 0);
        shelfGroup.add(shelfPlank, shelfPillarL, shelfPillarR);

        const shelfTag = toolkit.makeTextSprite('Shelf 2, Slot 1', { scale: 0.85, border: '#e8b04b' });
        shelfTag.position.set(0, 1.15, 0);
        shelfGroup.add(shelfTag);
        scene.add(shelfGroup);

        // Apprentice Golem Head & Floating Hands
        const stoneMat = new THREE.MeshStandardMaterial({ color: 0x6c7a80, roughness: 0.7, metalness: 0.15 });
        const eyeMat = new THREE.MeshStandardMaterial({ color: COLORS.amber, emissive: COLORS.amber, roughness: 0.2 });

        const golemHead = new THREE.Group();
        golemHead.position.set(0, 1.45, -1.35);
        const headCube = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.05, 0.95), stoneMat);
        const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.14, 0.08), eyeMat);
        eyeL.position.set(-0.26, 0.12, 0.48);
        const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.14, 0.08), eyeMat);
        eyeR.position.set(0.26, 0.12, 0.48);
        const brow = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.14, 0.16), shelfMat);
        brow.position.set(0, 0.32, 0.46);
        golemHead.add(headCube, eyeL, eyeR, brow);
        scene.add(golemHead);

        let golemStatusSprite = toolkit.makeTextSprite('MISSING COORDS: Which jar?', {
            border: '#de6852',
            scale: 1.05
        });
        golemStatusSprite.position.set(0, 2.45, -1.1);
        scene.add(golemStatusSprite);

        const handL = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.28, 0.52), stoneMat);
        const handR = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.28, 0.52), stoneMat);
        scene.add(handL, handR);

        // Peanut Butter Jar + Detachable Lid
        const jarGroup = new THREE.Group();
        const glassMat = new THREE.MeshStandardMaterial({ color: 0xc88a3b, roughness: 0.35, metalness: 0.1 });
        const jarBody = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.72, 14), glassMat);
        jarBody.position.y = 0.36;
        jarGroup.add(jarBody);

        const lidMat = new THREE.MeshStandardMaterial({ color: 0xde6852, roughness: 0.4 });
        const jarLid = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.16, 14), lidMat);
        jarLid.position.y = 0.76;
        jarGroup.add(jarLid);
        scene.add(jarGroup);

        // Bread Slice 1 on Wooden Board
        const breadGroup = new THREE.Group();
        breadGroup.position.set(1.15, -0.58, 0.35);
        const crustMat = new THREE.MeshStandardMaterial({ color: 0x9c6430, roughness: 0.8 });
        const crumbMat = new THREE.MeshStandardMaterial({ color: 0xf2dfb6, roughness: 0.7 });
        const crustMesh = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.16, 1.15), crustMat);
        const crumbMesh = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.18, 0.98), crumbMat);
        breadGroup.add(crustMesh, crumbMesh);

        // Spread Peanut Butter Layer (hidden until Step 4)
        const pbSpreadMat = new THREE.MeshStandardMaterial({ color: 0xb8732a, roughness: 0.45 });
        const pbSpreadMesh = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.08, 0.84), pbSpreadMat);
        pbSpreadMesh.position.y = 0.11;
        pbSpreadMesh.scale.set(0.01, 1, 0.01);
        pbSpreadMesh.visible = false;
        breadGroup.add(pbSpreadMesh);

        const breadLabel = toolkit.makeTextSprite('bread_slice_1', { scale: 0.8, border: '#66c032' });
        breadLabel.position.set(0, -0.45, 0.65);
        breadGroup.add(breadLabel);
        scene.add(breadGroup);

        // Spreader Knife
        const knifeGroup = new THREE.Group();
        const handleMat = new THREE.MeshStandardMaterial({ color: COLORS.barkDark, roughness: 0.8 });
        const bladeMat = new THREE.MeshStandardMaterial({ color: 0xd8e2e6, roughness: 0.25, metalness: 0.8 });
        const knifeHandle = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.12, 0.16), handleMat);
        const knifeBlade = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.04, 0.18), bladeMat);
        knifeBlade.position.x = -0.52;
        knifeGroup.add(knifeHandle, knifeBlade);
        knifeGroup.position.set(2.35, -0.55, 0.35);
        scene.add(knifeGroup);

        let stepIndex = 0;
        let stepClock = 0;

        const captions = [
            'Step 1/5 (Vague): "Open the jar" — Golem grasps at empty air because shelf/slot coordinates are missing.',
            'Step 2/5 (Precise): locate(item="peanut_butter_jar", shelf=2, slot=1) — Golem retrieves jar to worktable.',
            'Step 3/5 (Precise): grip(jar_lid) & rotate(counter_clockwise, turns=3) — Lid unscrews and lifts off.',
            'Step 4/5 (Vague): "Put peanut butter on the bread" — Golem slams the entire glass jar upside-down onto the bread!',
            'Step 5/5 (Precise): scoop_with_knife("2_tbsp") -> spread_evenly("bread_slice_1") — Smoothly spreads peanut butter!'
        ];

        const statusTexts = [
            { text: 'ERROR: Missing shelf & slot coordinates!', border: '#de6852' },
            { text: 'OK: Target acquired at Shelf 2, Slot 1', border: '#66c032' },
            { text: 'OK: Lid rotated 3x counter-clockwise', border: '#66c032' },
            { text: 'MISHAP: Placed whole jar on bread!', border: '#de6852' },
            { text: 'MASTERPIECE: 2 tbsp spread on slice_1!', border: '#66c032' }
        ];

        function applyStep(idx) {
            stepIndex = clamp(idx, 0, 4);
            stepClock = 0;
            stage.setCaption(captions[stepIndex]);
            golemStatusSprite = updateSpriteText(
                toolkit,
                scene,
                golemStatusSprite,
                statusTexts[stepIndex].text,
                { border: statusTexts[stepIndex].border, scale: 1.05 }
            );
            const isErr = stepIndex === 0 || stepIndex === 3;
            eyeMat.color.setHex(isErr ? COLORS.error : COLORS.leaf);
            eyeMat.emissive.setHex(isErr ? COLORS.error : COLORS.leaf);
        }

        applyStep(0);

        toolkit.hookGlobalFunction('cycleInstructions', () => {
            const idx = typeof currentIdx !== 'undefined' ? currentIdx : (stepIndex + 1) % 5;
            applyStep(idx);
        });

        stage.onTick((dt, elapsed) => {
            stepClock += dt;

            if (stepIndex === 0) {
                // Vague: Jar sits on shelf, hands wave in confusion on right/center
                jarGroup.position.set(-2.35, 0.42, -1.1);
                jarGroup.rotation.set(0, 0, 0);
                jarLid.position.set(0, 0.76, 0);
                jarLid.rotation.set(0, 0, 0);
                pbSpreadMesh.visible = false;
                knifeGroup.position.set(2.35, -0.55, 0.35);
                knifeGroup.rotation.set(0, 0, 0);

                golemHead.rotation.z = Math.sin(elapsed * 5) * 0.16;
                handL.position.set(-0.4 + Math.sin(elapsed * 4) * 0.45, 0.45 + Math.cos(elapsed * 3) * 0.2, 0.4);
                handR.position.set(0.9 + Math.cos(elapsed * 4) * 0.45, 0.55 + Math.sin(elapsed * 3) * 0.2, 0.4);
            } else if (stepIndex === 1) {
                // Precise locate: move jar from shelf (-2.35, 0.42, -1.1) to center table (-0.5, -0.66, 0.2)
                const t = clamp(stepClock * 1.6, 0, 1);
                golemHead.rotation.z = 0;
                jarGroup.position.set(
                    lerp(-2.35, -0.55, t),
                    lerp(0.42, -0.66, t) + Math.sin(t * Math.PI) * 0.65,
                    lerp(-1.1, 0.25, t)
                );
                jarGroup.rotation.set(0, 0, 0);
                jarLid.position.set(0, 0.76, 0);
                pbSpreadMesh.visible = false;

                handL.position.set(jarGroup.position.x - 0.48, jarGroup.position.y + 0.42, jarGroup.position.z);
                handR.position.set(jarGroup.position.x + 0.48, jarGroup.position.y + 0.42, jarGroup.position.z);
            } else if (stepIndex === 2) {
                // Precise unscrew lid: jar at (-0.55, -0.66, 0.25), lid rotates and lifts off to (-1.45, -0.58, 0.35)
                const t = clamp(stepClock * 1.3, 0, 1);
                golemHead.rotation.z = 0;
                jarGroup.position.set(-0.55, -0.66, 0.25);
                jarGroup.rotation.set(0, 0, 0);
                pbSpreadMesh.visible = false;

                jarLid.rotation.y = t * Math.PI * 6;
                jarLid.position.set(
                    lerp(0, -0.95, clamp((t - 0.5) * 2, 0, 1)),
                    t < 0.5 ? lerp(0.76, 1.15, t * 2) : lerp(1.15, 0.08, (t - 0.5) * 2),
                    0
                );

                handL.position.set(-1.05, -0.28, 0.25);
                handR.position.set(-0.55 + jarLid.position.x, -0.66 + jarLid.position.y + 0.24, 0.25);
            } else if (stepIndex === 3) {
                // Mishap: whole jar flipped upside down on top of breadGroup (1.15, -0.58, 0.35)
                const t = clamp(stepClock * 1.8, 0, 1);
                golemHead.rotation.z = Math.sin(elapsed * 6) * 0.14;
                jarLid.position.set(-0.95, 0.08, 0);
                pbSpreadMesh.visible = false;

                jarGroup.position.set(
                    lerp(-0.55, 1.15, t),
                    lerp(-0.66, 0.22, t) + Math.sin(t * Math.PI) * 0.5,
                    lerp(0.25, 0.35, t)
                );
                jarGroup.rotation.z = lerp(0, Math.PI, t);
                handL.position.set(0.55, 0.25, 0.35);
                handR.position.set(1.75, 0.25, 0.35);
            } else if (stepIndex === 4) {
                // Masterpiece: Jar upright at (-0.55, -0.66, 0.25), knife spreads smoothly over bread (1.15, -0.58, 0.35)
                golemHead.rotation.z = 0;
                jarGroup.position.set(-0.55, -0.66, 0.25);
                jarGroup.rotation.set(0, 0, 0);
                jarLid.position.set(-0.95, 0.08, 0);

                const sweep = Math.sin(elapsed * 4.5) * 0.32;
                knifeGroup.position.set(1.35 + sweep, -0.28, 0.35);
                knifeGroup.rotation.set(0, 0, -0.18);

                handL.position.set(-1.05, -0.28, 0.25);
                handR.position.set(knifeGroup.position.x + 0.3, -0.1, 0.35);

                pbSpreadMesh.visible = true;
                const spreadProgress = clamp(stepClock * 1.2, 0.1, 1);
                pbSpreadMesh.scale.set(spreadProgress, 1, spreadProgress);
            }
        });
    };

    // ======================================================================
    // CARD 1: Sequential Execution Scroll & 3D Toaster Pipeline
    // ======================================================================
    window.ThreeScenes0To7['card_1'] = function(toolkit) {
        const container = document.querySelector('.visualization');
        const stage = toolkit.createStage(
            container,
            '3D Sequential Execution Pipeline',
            'Line 0: Ready — Press "Execute Next Line" to watch the Program Counter step top-to-bottom'
        );
        if (!stage) return;

        const { scene } = stage;
        const { COLORS } = toolkit;
        stage.setCameraOrbit(0.15, 0.38, 10.2);

        // Left side: 5 Stacked Instruction Tablets + Sliding Golden Program Counter Ring
        const scrollGroup = new THREE.Group();
        scrollGroup.position.set(-2.55, 0.2, 0);
        scene.add(scrollGroup);

        const tabletMatIdle = new THREE.MeshStandardMaterial({ color: COLORS.slate, roughness: 0.7 });
        const tabletMatDone = new THREE.MeshStandardMaterial({ color: COLORS.pine, roughness: 0.6 });
        const tabletMatActive = new THREE.MeshStandardMaterial({
            color: COLORS.leafDark,
            emissive: 0x1e4d1b,
            roughness: 0.4
        });

        const lineTexts = [
            '1. get_slice()',
            '2. insert(bread)',
            '3. toast(120s)',
            '4. pop_up()',
            '5. spread_butter()'
        ];
        const tablets = [];
        for (let i = 0; i < 5; i++) {
            const y = (2 - i) * 0.62;
            const tabMesh = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.42, 0.24), tabletMatIdle.clone());
            tabMesh.position.set(0, y, 0);
            scrollGroup.add(tabMesh);

            const lbl = toolkit.makeTextSprite(lineTexts[i], { scale: 0.78, border: '#388934' });
            lbl.position.set(0, y, 0.22);
            scrollGroup.add(lbl);
            tablets.push({ mesh: tabMesh, y });
        }

        // Golden Program Counter Pointer Ring
        const pcMat = new THREE.MeshStandardMaterial({
            color: COLORS.amber,
            emissive: 0x6e4b16,
            roughness: 0.25,
            metalness: 0.7
        });
        const pcFrame = new THREE.Mesh(new THREE.BoxGeometry(2.58, 0.52, 0.32), pcMat);
        pcFrame.material.wireframe = true;
        pcFrame.position.set(0, 1.85, 0);
        scrollGroup.add(pcFrame);

        let pcSprite = toolkit.makeTextSprite('PC -> Line 0 (Ready)', { border: '#e8b04b', scale: 0.9 });
        pcSprite.position.set(-2.55, 2.25, 0);
        scene.add(pcSprite);

        // Right side: Loaf, Toaster with Coils, Plate & Butter
        const kitchenGroup = new THREE.Group();
        kitchenGroup.position.set(1.55, -0.85, 0);
        scene.add(kitchenGroup);

        // Sourdough Loaf on left of kitchen station
        const crustMat = new THREE.MeshStandardMaterial({ color: 0x9c6430, roughness: 0.8 });
        const rawCrumbMat = new THREE.MeshStandardMaterial({ color: 0xf5e6c4, roughness: 0.75 });
        const toastedMat = new THREE.MeshStandardMaterial({ color: 0xc87d28, roughness: 0.6 });

        const loafMesh = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.72, 0.85), crustMat);
        loafMesh.position.set(-1.65, 0.36, 0);
        kitchenGroup.add(loafMesh);

        // Active Bread Slice
        const sliceGroup = new THREE.Group();
        const sliceBody = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.68, 0.78), rawCrumbMat.clone());
        sliceGroup.add(sliceBody);

        // Melted Butter Pat on slice (visible at line 5)
        const butterMat = new THREE.MeshStandardMaterial({ color: 0xffe169, emissive: 0x4a3b08, roughness: 0.3 });
        const butterPat = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.08, 0.45), butterMat);
        butterPat.position.y = 0.12;
        butterPat.visible = false;
        sliceGroup.add(butterPat);

        sliceGroup.position.set(-1.12, 0.36, 0);
        kitchenGroup.add(sliceGroup);

        // 3D Toaster in center of kitchen station
        const toasterGroup = new THREE.Group();
        toasterGroup.position.set(0, 0.52, 0);
        const chromeMat = new THREE.MeshStandardMaterial({ color: 0xaab8c2, roughness: 0.3, metalness: 0.65 });
        const wallL = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.95, 0.22), chromeMat);
        wallL.position.z = 0.42;
        const wallR = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.95, 0.22), chromeMat);
        wallR.position.z = -0.42;
        const baseWall = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.18, 1.05), chromeMat);
        baseWall.position.y = -0.42;
        toasterGroup.add(wallL, wallR, baseWall);

        // Glowing Coils inside toaster
        const coilMat = new THREE.MeshStandardMaterial({
            color: 0x443333,
            emissive: 0x000000,
            roughness: 0.4
        });
        const coil1 = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.65, 0.05), coilMat);
        coil1.position.z = 0.24;
        const coil2 = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.65, 0.05), coilMat);
        coil2.position.z = -0.24;
        toasterGroup.add(coil1, coil2);
        kitchenGroup.add(toasterGroup);

        // Ceramic Plate on right of kitchen station
        const plateMat = new THREE.MeshStandardMaterial({ color: COLORS.cream, roughness: 0.3 });
        const plateMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.68, 0.12, 16), plateMat);
        plateMesh.position.set(1.65, 0.06, 0);
        kitchenGroup.add(plateMesh);

        let activeLine = 0;
        let targetPcY = 1.85;

        const lineCaptions = [
            'Line 0 (Ready): Program Counter awaits above Line 1. Raw sourdough loaf is ready.',
            'Line 1 Executed: bread = get_slice("sourdough") — Fresh slice detached from loaf.',
            'Line 2 Executed: toaster.insert(bread) — Bread slice lowered into the toaster slot.',
            'Line 3 Executed: toaster.toast(seconds=120) — Coils glow orange-red, crisping the slice!',
            'Line 4 Executed: warm_toast = toaster.pop_up() — Golden toast pops onto the plate.',
            'Line 5 Executed: spread_butter(warm_toast) — Golden butter melts across the toast!'
        ];

        function syncExecutionState() {
            activeLine = typeof currentLine !== 'undefined' ? clamp(currentLine, 0, 5) : 0;
            stage.setCaption(lineCaptions[activeLine]);

            const pcText = activeLine === 0 ? 'PC -> Line 0 (Ready)' : `PC -> Line ${activeLine}`;
            pcSprite = updateSpriteText(toolkit, scene, pcSprite, pcText, {
                border: activeLine === 5 ? '#66c032' : '#e8b04b',
                scale: 0.9
            });

            targetPcY = activeLine === 0 ? 1.85 : tablets[activeLine - 1].y;

            tablets.forEach((t, idx) => {
                const lineNum = idx + 1;
                if (lineNum === activeLine) {
                    t.mesh.material = tabletMatActive;
                } else if (lineNum < activeLine) {
                    t.mesh.material = tabletMatDone;
                } else {
                    t.mesh.material = tabletMatIdle;
                }
            });

            // Update coil glow and toast color
            if (activeLine === 3) {
                coilMat.color.setHex(0xff5522);
                coilMat.emissive.setHex(0xd93814);
            } else {
                coilMat.color.setHex(0x443333);
                coilMat.emissive.setHex(0x000000);
            }

            if (activeLine >= 3) {
                sliceBody.material.color.setHex(0xc87d28);
            } else {
                sliceBody.material.color.setHex(0xf5e6c4);
            }

            butterPat.visible = activeLine === 5;
        }

        toolkit.hookGlobalFunction('executeNext', syncExecutionState);
        toolkit.hookGlobalFunction('resetExecution', syncExecutionState);

        stage.onTick((dt, elapsed) => {
            pcFrame.position.y = lerp(pcFrame.position.y, targetPcY, Math.min(1, dt * 8));

            // Animate bread slice position & rotation by line
            let tx = -1.12, ty = 0.36, rz = 0;
            if (activeLine === 1) {
                tx = 0;
                ty = 1.38 + Math.sin(elapsed * 4) * 0.06;
                rz = 0;
            } else if (activeLine === 2 || activeLine === 3) {
                tx = 0;
                ty = 0.56;
                rz = 0;
            } else if (activeLine === 4 || activeLine === 5) {
                tx = 1.65;
                ty = 0.22;
                rz = Math.PI / 2;
            }
            sliceGroup.position.x = lerp(sliceGroup.position.x, tx, Math.min(1, dt * 7));
            sliceGroup.position.y = lerp(sliceGroup.position.y, ty, Math.min(1, dt * 7));
            sliceGroup.rotation.z = lerp(sliceGroup.rotation.z, rz, Math.min(1, dt * 7));
        });
    };

    // ======================================================================
    // CARD 2: 3D Labeled Variable Chests & Right-to-Left Assignment Funnel
    // ======================================================================
    window.ThreeScenes0To7['card_2'] = function(toolkit) {
        const container = document.querySelector('.visualization');
        const stage = toolkit.createStage(
            container,
            '3D Variable Chests & Assignment Funnel',
            'Assignment (=) reads the right side first and pours the new value into the chest on the left'
        );
        if (!stage) return;

        const { scene } = stage;
        const { COLORS } = toolkit;
        stage.setCameraOrbit(0.12, 0.42, 10.4);

        const chestConfigs = [
            { key: 'name', label: 'name', x: -3.15, color: COLORS.amber },
            { key: 'age', label: 'age', x: -1.05, color: COLORS.leaf },
            { key: 'score', label: 'score', x: 1.05, color: COLORS.magic },
            { key: 'student', label: 'is_student', x: 3.15, color: 0xc97bdb }
        ];

        const chests = {};
        const chestWoodMat = new THREE.MeshStandardMaterial({ color: COLORS.bark, roughness: 0.8 });
        const chestTrimMat = new THREE.MeshStandardMaterial({ color: COLORS.amber, roughness: 0.4, metalness: 0.5 });

        chestConfigs.forEach(cfg => {
            const g = new THREE.Group();
            g.position.set(cfg.x, -0.75, 0);

            // Open-top chest base & walls
            const base = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.16, 1.25), chestWoodMat);
            const wallF = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.72, 0.12), chestWoodMat);
            wallF.position.set(0, 0.36, 0.56);
            const wallB = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.72, 0.12), chestWoodMat);
            wallB.position.set(0, 0.36, -0.56);
            const wallL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.72, 1.02), chestWoodMat);
            wallL.position.set(-0.71, 0.36, 0);
            const wallR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.72, 1.02), chestWoodMat);
            wallR.position.set(0.71, 0.36, 0);
            const trim = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.10, 1.32), chestTrimMat);
            trim.position.y = 0.72;
            g.add(base, wallF, wallB, wallL, wallR, trim);

            // Token inside chest
            const tokenMat = new THREE.MeshStandardMaterial({
                color: cfg.color,
                emissive: 0x16241a,
                roughness: 0.3,
                metalness: 0.25
            });
            const tokenMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.36, 1), tokenMat);
            tokenMesh.position.set(0, 0.65, 0);
            g.add(tokenMesh);

            // Variable name plate on front
            const nameSprite = toolkit.makeTextSprite(cfg.label, {
                border: '#e8b04b',
                scale: 0.88
            });
            nameSprite.position.set(0, -0.35, 0.75);
            g.add(nameSprite);

            // Value sprite hovering inside/above chest
            const valSprite = toolkit.makeTextSprite('', {
                border: '#66c032',
                scale: 0.95
            });
            valSprite.position.set(0, 1.28, 0);
            g.add(valSprite);

            scene.add(g);
            chests[cfg.key] = { group: g, token: tokenMesh, valSprite, x: cfg.x, color: cfg.color };
        });

        // Floating Directional Assignment Funnel (= Read Right -> Pour Left)
        const funnelGroup = new THREE.Group();
        funnelGroup.position.set(-1.05, 1.65, 0);
        const funnelMat = new THREE.MeshStandardMaterial({
            color: COLORS.amber,
            emissive: 0x5c3e10,
            roughness: 0.3,
            metalness: 0.6,
            side: THREE.DoubleSide
        });
        const funnelCone = new THREE.Mesh(new THREE.ConeGeometry(0.62, 0.75, 16, 1, true), funnelMat);
        funnelCone.rotation.x = Math.PI;
        const funnelSpout = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.42, 12), funnelMat);
        funnelSpout.position.y = -0.45;
        funnelGroup.add(funnelCone, funnelSpout);

        let funnelBanner = toolkit.makeTextSprite('= (Read Right -> Pour Left)', {
            border: '#e8b04b',
            scale: 0.95
        });
        funnelBanner.position.set(0, 0.75, 0);
        funnelGroup.add(funnelBanner);

        // Moving token for right-to-left evaluation animation
        const pourOrbMat = new THREE.MeshStandardMaterial({ color: COLORS.leaf, emissive: 0x204d14, roughness: 0.2 });
        const pourOrb = new THREE.Mesh(new THREE.SphereGeometry(0.24, 14, 14), pourOrbMat);
        pourOrb.visible = false;
        funnelGroup.add(pourOrb);

        scene.add(funnelGroup);

        let targetFunnelX = -1.05;
        let pourTimer = 0;

        function readCurrentValues() {
            const vName = document.getElementById('var-name')?.textContent || '"Alice"';
            const vAge = document.getElementById('var-age')?.textContent || '25';
            const vScore = document.getElementById('var-score')?.textContent || '0';
            const vStudent = document.getElementById('var-student')?.textContent || 'True';
            return { name: vName, age: vAge, score: vScore, student: vStudent };
        }

        function refreshChestSprites(activeKey, exprLabel) {
            const vals = readCurrentValues();
            Object.keys(chests).forEach(k => {
                const c = chests[k];
                c.valSprite = updateSpriteText(toolkit, c.group, c.valSprite, vals[k], {
                    border: k === activeKey ? '#e8b04b' : '#66c032',
                    scale: k === activeKey ? 1.08 : 0.95
                });
            });
            if (activeKey && chests[activeKey]) {
                targetFunnelX = chests[activeKey].x;
                pourTimer = 1.0;
                pourOrb.visible = true;
            }
            if (exprLabel) {
                funnelBanner = updateSpriteText(toolkit, funnelGroup, funnelBanner, exprLabel, {
                    border: '#e8b04b',
                    scale: 0.95
                });
            }
        }

        refreshChestSprites('age', '= (Read Right -> Pour Left)');

        toolkit.hookGlobalFunction('runOperation', (op) => {
            const vals = readCurrentValues();
            if (op === 'reassign') {
                refreshChestSprites('age', `age = age + 1  (Pour ${vals.age} into age)`);
                stage.setCaption(`Right-to-Left Evaluation: Read old age, add 1 -> Pour ${vals.age} into chest [age]`);
            } else if (op === 'changeName') {
                refreshChestSprites('name', `name = ${vals.name}  (Pour into name)`);
                stage.setCaption(`Right-to-Left Evaluation: Pour string ${vals.name} into chest [name]`);
            } else if (op === 'updateScore') {
                refreshChestSprites('score', `score = score + 10  (Pour ${vals.score})`);
                stage.setCaption(`Right-to-Left Evaluation: Read score, add 10 -> Pour ${vals.score} into chest [score]`);
            } else if (op === 'toggleStudent') {
                refreshChestSprites('student', `is_student = not is_student (${vals.student})`);
                stage.setCaption(`Right-to-Left Evaluation: Flip boolean -> Pour ${vals.student} into chest [is_student]`);
            }
        });

        function onResetVars() {
            refreshChestSprites('name', '= (Reset All Containers)');
            stage.setCaption('All 4 variable chests reset to initial values: "Alice", 25, 0, True');
        }
        toolkit.hookGlobalFunction('reset', onResetVars);
        toolkit.hookGlobalFunction('resetVariables', onResetVars);

        stage.onTick((dt, elapsed) => {
            funnelGroup.position.x = lerp(funnelGroup.position.x, targetFunnelX, Math.min(1, dt * 7));
            funnelCone.rotation.y = elapsed * 0.8;

            Object.keys(chests).forEach((k, i) => {
                chests[k].token.rotation.y = elapsed * 1.1 + i;
                chests[k].token.position.y = 0.62 + Math.sin(elapsed * 2.5 + i) * 0.06;
            });

            if (pourTimer > 0) {
                pourTimer -= dt * 1.25;
                const p = 1 - clamp(pourTimer, 0, 1);
                // Arc from right of funnel (+1.1, +0.45) into top of funnel (0, 0.25) and down spout (0, -0.95)
                if (p < 0.55) {
                    const u = p / 0.55;
                    pourOrb.position.set(lerp(1.15, 0, u), lerp(0.35, 0.25, u) + Math.sin(u * Math.PI) * 0.35, 0);
                } else {
                    const u = (p - 0.55) / 0.45;
                    pourOrb.position.set(0, lerp(0.25, -1.05, u), 0);
                }
                if (pourTimer <= 0) {
                    pourOrb.visible = false;
                }
            }
        });
    };

    // ======================================================================
    // CARD 3: 3D Type Geometry & Casting Transfiguration Forge
    // ======================================================================
    window.ThreeScenes0To7['card_3'] = function(toolkit) {
        const container = document.querySelector('.visualization');
        const stage = toolkit.createStage(
            container,
            '3D Type Geometry & Transfiguration Forge',
            'str = Parchment Plank | int = Metallic Polyhedron | bool = Truth Crystal — Test + and int()/str() below!'
        );
        if (!stage) return;

        const { scene } = stage;
        const { COLORS } = toolkit;
        stage.setCameraOrbit(0.18, 0.38, 9.8);

        // Central Transfiguration Portal Ring (int() / str() forge)
        const portalGroup = new THREE.Group();
        portalGroup.position.set(0, 0.25, 0);
        const portalMat = new THREE.MeshStandardMaterial({
            color: COLORS.amber,
            emissive: 0x573b0c,
            roughness: 0.25,
            metalness: 0.75
        });
        const portalRing = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.10, 14, 32), portalMat);
        portalGroup.add(portalRing);

        let portalBadge = toolkit.makeTextSprite('Type Forge: + / int() / str()', {
            border: '#e8b04b',
            scale: 0.95
        });
        portalBadge.position.set(0, 1.55, 0);
        portalGroup.add(portalBadge);
        scene.add(portalGroup);

        // Materials for the 3 fundamental types
        const strMat = new THREE.MeshStandardMaterial({ color: 0xe6d2a8, roughness: 0.75 });
        const intMat = new THREE.MeshStandardMaterial({ color: COLORS.magic, roughness: 0.25, metalness: 0.7 });
        const boolMat = new THREE.MeshStandardMaterial({ color: COLORS.leaf, emissive: 0x1b4212, roughness: 0.25 });
        const errMat = new THREE.MeshStandardMaterial({ color: COLORS.error, emissive: 0x6e1b10, roughness: 0.3 });

        // Left, Right, and Result token holders
        const leftHolder = new THREE.Group();
        const rightHolder = new THREE.Group();
        const centerResultHolder = new THREE.Group();
        scene.add(leftHolder, rightHolder, centerResultHolder);

        function buildTypeMesh(kind) {
            if (kind === 'str') {
                // Flat parchment plank with quote end-caps
                const g = new THREE.Group();
                const plank = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.38, 0.65), strMat);
                const quoteL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.48, 0.72), portalMat);
                quoteL.position.x = -0.68;
                const quoteR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.48, 0.72), portalMat);
                quoteR.position.x = 0.68;
                g.add(plank, quoteL, quoteR);
                return g;
            } else if (kind === 'int') {
                // Faceted metallic icosahedron/dodecahedron
                return new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 0), intMat);
            } else {
                // Two-sided boolean crystal
                return new THREE.Mesh(new THREE.OctahedronGeometry(0.58, 0), boolMat);
            }
        }

        // Error spark cubes
        const sparks = [];
        const sparkGroup = new THREE.Group();
        scene.add(sparkGroup);
        for (let i = 0; i < 12; i++) {
            const s = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.14), errMat);
            s.visible = false;
            sparkGroup.add(s);
            const ang = (i / 12) * Math.PI * 2;
            sparks.push({ mesh: s, vx: Math.cos(ang) * 2.4, vy: Math.sin(ang) * 2.0, vz: (Math.random() - 0.5) * 2.0 });
        }

        let animState = {
            mode: 'showcase',
            timer: 0
        };

        function clearGroup(g) {
            while (g.children.length > 0) {
                g.remove(g.children[0]);
            }
        }

        function populateHolder(holder, kind, labelText, borderCol) {
            clearGroup(holder);
            const mesh = buildTypeMesh(kind);
            holder.add(mesh);
            const sp = toolkit.makeTextSprite(labelText, { border: borderCol || '#66c032', scale: 0.92 });
            sp.position.set(0, 0.98, 0);
            holder.add(sp);
        }

        function setShowcase() {
            animState.mode = 'showcase';
            animState.timer = 0;
            populateHolder(leftHolder, 'str', 'str: "Hello World"', '#e8b04b');
            populateHolder(centerResultHolder, 'int', 'int: 42', '#4a86c0');
            populateHolder(rightHolder, 'bool', 'bool: True / False', '#66c032');
            leftHolder.position.set(-2.9, 0.1, 0);
            centerResultHolder.position.set(0, 0.1, 0);
            rightHolder.position.set(2.9, 0.1, 0);
            leftHolder.visible = true;
            rightHolder.visible = true;
            centerResultHolder.visible = true;
            sparks.forEach(s => { s.mesh.visible = false; });
        }

        setShowcase();

        toolkit.hookGlobalFunction('tryOperation', (op) => {
            animState.timer = 0;
            sparks.forEach(s => { s.mesh.visible = false; });

            if (op === 'valid1') {
                animState.mode = 'fuse';
                populateHolder(leftHolder, 'int', '5 (int)', '#4a86c0');
                populateHolder(rightHolder, 'int', '3 (int)', '#4a86c0');
                populateHolder(centerResultHolder, 'int', '8 (int)', '#66c032');
                portalBadge = updateSpriteText(toolkit, portalGroup, portalBadge, '5 + 3 -> 8 (int addition)', { border: '#66c032', scale: 0.95 });
                stage.setCaption('Both operands are int polyhedra: 5 + 3 fuses mathematically into 8 (int)');
            } else if (op === 'valid2') {
                animState.mode = 'fuse';
                populateHolder(leftHolder, 'str', '"Hello" (str)', '#e8b04b');
                populateHolder(rightHolder, 'str', '" World" (str)', '#e8b04b');
                populateHolder(centerResultHolder, 'str', '"Hello World" (str)', '#66c032');
                portalBadge = updateSpriteText(toolkit, portalGroup, portalBadge, '"Hello" + " World" -> Concatenation', { border: '#66c032', scale: 0.95 });
                stage.setCaption('Both operands are str parchment planks: + glues them end-to-end into "Hello World"');
            } else if (op === 'invalid') {
                animState.mode = 'collide';
                populateHolder(leftHolder, 'str', '"5" (str)', '#e8b04b');
                populateHolder(rightHolder, 'int', '3 (int)', '#4a86c0');
                clearGroup(centerResultHolder);
                portalBadge = updateSpriteText(toolkit, portalGroup, portalBadge, 'TypeError: str + int rejected!', { border: '#de6852', scale: 0.95 });
                stage.setCaption('TypeError! Parchment plank "5" (str) and metallic 3 (int) have incompatible physics and bounce apart!');
            } else if (op === 'invalid2') {
                animState.mode = 'collide';
                populateHolder(leftHolder, 'bool', 'True (bool)', '#66c032');
                populateHolder(rightHolder, 'str', '"hello" (str)', '#e8b04b');
                clearGroup(centerResultHolder);
                portalBadge = updateSpriteText(toolkit, portalGroup, portalBadge, 'TypeError: bool + str rejected!', { border: '#de6852', scale: 0.95 });
                stage.setCaption('TypeError! Boolean crystal True cannot be glued directly onto string "hello" without str(True)!');
            }
        });

        toolkit.hookGlobalFunction('tryCasting', (mode) => {
            animState.timer = 0;
            sparks.forEach(s => { s.mesh.visible = false; });

            if (mode === 'to_int') {
                animState.mode = 'cast_ok';
                populateHolder(leftHolder, 'str', '"25" (str)', '#e8b04b');
                populateHolder(rightHolder, 'int', '+ 5 (int)', '#4a86c0');
                populateHolder(centerResultHolder, 'int', '30 (int)', '#66c032');
                portalBadge = updateSpriteText(toolkit, portalGroup, portalBadge, 'int("25") + 5 -> 30 (int)', { border: '#66c032', scale: 0.95 });
                stage.setCaption('int("25") passes through the Transfiguration Ring, sheds its quotes, and fuses with 5 -> 30!');
            } else if (mode === 'to_str') {
                animState.mode = 'cast_ok';
                populateHolder(leftHolder, 'int', '25 (int)', '#4a86c0');
                populateHolder(rightHolder, 'str', '+ "5" (str)', '#e8b04b');
                populateHolder(centerResultHolder, 'str', '"255" (str)', '#66c032');
                portalBadge = updateSpriteText(toolkit, portalGroup, portalBadge, 'str(25) + "5" -> "255" (str)', { border: '#66c032', scale: 0.95 });
                stage.setCaption('str(25) wraps number 25 in parchment quotes so it concatenates with "5" -> "255"!');
            } else if (mode === 'bad_int') {
                animState.mode = 'collide';
                populateHolder(leftHolder, 'str', '"twenty" (str)', '#de6852');
                clearGroup(rightHolder);
                clearGroup(centerResultHolder);
                portalBadge = updateSpriteText(toolkit, portalGroup, portalBadge, 'ValueError: int("twenty") failed!', { border: '#de6852', scale: 0.95 });
                stage.setCaption('ValueError! The int() portal can transfigure digit strings like "25", but rejects English word "twenty"!');
            }
        });

        stage.onTick((dt, elapsed) => {
            portalRing.rotation.z = elapsed * 0.9;
            animState.timer += dt;
            const t = animState.timer;

            if (animState.mode === 'showcase') {
                leftHolder.position.y = 0.1 + Math.sin(elapsed * 2) * 0.08;
                centerResultHolder.position.y = 0.1 + Math.sin(elapsed * 2 + 2) * 0.08;
                rightHolder.position.y = 0.1 + Math.sin(elapsed * 2 + 4) * 0.08;
            } else if (animState.mode === 'fuse' || animState.mode === 'cast_ok') {
                const u = clamp(t * 1.15, 0, 1);
                if (u < 0.65) {
                    const p = u / 0.65;
                    leftHolder.visible = true;
                    rightHolder.visible = true;
                    centerResultHolder.visible = false;
                    leftHolder.position.set(lerp(-3.0, -0.35, p), 0.25, 0);
                    rightHolder.position.set(lerp(3.0, 0.35, p), 0.25, 0);
                } else {
                    leftHolder.visible = false;
                    rightHolder.visible = false;
                    centerResultHolder.visible = true;
                    centerResultHolder.position.set(0, 0.25 + Math.sin(elapsed * 3) * 0.06, 0);
                }
            } else if (animState.mode === 'collide') {
                const u = clamp(t * 1.5, 0, 1);
                centerResultHolder.visible = false;
                leftHolder.visible = true;
                rightHolder.visible = rightHolder.children.length > 0;

                if (u < 0.45) {
                    const p = u / 0.45;
                    leftHolder.position.set(lerp(-3.0, -0.55, p), 0.25, 0);
                    rightHolder.position.set(lerp(3.0, 0.55, p), 0.25, 0);
                } else {
                    const p = (u - 0.45) / 0.55;
                    leftHolder.position.set(lerp(-0.55, -2.6, p), 0.25 + Math.sin(p * Math.PI) * 0.4, 0);
                    rightHolder.position.set(lerp(0.55, 2.6, p), 0.25 + Math.sin(p * Math.PI) * 0.4, 0);
                    sparks.forEach(s => {
                        s.mesh.visible = p < 0.85;
                        s.mesh.position.set(s.vx * p * 0.8, 0.25 + s.vy * p * 0.8, s.vz * p * 0.8);
                    });
                }
            }
        });
    };

    // ======================================================================
    // CARD 4: 3D I/O Messenger Capsule Bridge & Memory Dock
    // ======================================================================
    window.ThreeScenes0To7['card_4'] = function(toolkit) {
        const container =
            document.getElementById('userName')?.closest('.visualization') ||
            document.querySelectorAll('.visualization')[1] ||
            document.querySelector('.visualization');

        const stage = toolkit.createStage(
            container,
            '3D I/O Messenger Bridge & Memory Dock',
            'input() launches string capsules from User Tower into variables; int() converts age before math'
        );
        if (!stage) return;

        const { scene } = stage;
        const { COLORS } = toolkit;
        stage.setCameraOrbit(0.14, 0.40, 10.4);

        // Left: User Tower (input() transmitter)
        const userTower = new THREE.Group();
        userTower.position.set(-3.35, -0.65, 0);
        const towerMat = new THREE.MeshStandardMaterial({ color: COLORS.bark, roughness: 0.75 });
        const roofMat = new THREE.MeshStandardMaterial({ color: COLORS.amber, roughness: 0.4 });
        const towerBody = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.72, 1.55, 8), towerMat);
        towerBody.position.y = 0.78;
        const towerRoof = new THREE.Mesh(new THREE.ConeGeometry(0.75, 0.65, 8), roofMat);
        towerRoof.position.y = 1.85;
        userTower.add(towerBody, towerRoof);

        const userBadge = toolkit.makeTextSprite('User input()', { border: '#e8b04b', scale: 0.88 });
        userBadge.position.set(0, 2.48, 0);
        userTower.add(userBadge);
        scene.add(userTower);

        // Center: Variable Memory Receiving Dock (name & age chests + int() ring in front of age)
        const dockGroup = new THREE.Group();
        dockGroup.position.set(0, -0.65, 0);
        scene.add(dockGroup);

        const boxMat = new THREE.MeshStandardMaterial({ color: COLORS.slate, roughness: 0.65 });
        const nameDock = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.68, 1.05), boxMat);
        nameDock.position.set(0, 1.25, 0);
        dockGroup.add(nameDock);

        let nameDockSprite = toolkit.makeTextSprite('name = "Lyra" (str)', { border: '#66c032', scale: 0.88 });
        nameDockSprite.position.set(0, 1.92, 0);
        dockGroup.add(nameDockSprite);

        const ageDock = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.68, 1.05), boxMat);
        ageDock.position.set(0, 0.15, 0);
        dockGroup.add(ageDock);

        let ageDockSprite = toolkit.makeTextSprite('age = 21 (int)', { border: '#4a86c0', scale: 0.88 });
        ageDockSprite.position.set(0, -0.52, 0);
        dockGroup.add(ageDockSprite);

        // int() Converter Ring guarding the age variable dock
        const intRingMat = new THREE.MeshStandardMaterial({
            color: COLORS.magic,
            emissive: 0x183959,
            roughness: 0.25,
            metalness: 0.7
        });
        const intRing = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.07, 12, 24), intRingMat);
        intRing.rotation.y = Math.PI / 2;
        intRing.position.set(-1.35, 0.15, 0);
        dockGroup.add(intRing);

        const intRingLabel = toolkit.makeTextSprite('int()', { border: '#4a86c0', scale: 0.75 });
        intRingLabel.position.set(-1.35, 0.78, 0);
        dockGroup.add(intRingLabel);

        // Right: print() Console Projector Horn
        const printTower = new THREE.Group();
        printTower.position.set(3.35, -0.65, 0);
        const hornBase = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.35, 0.95), boxMat);
        hornBase.position.y = 0.68;
        const hornConeMat = new THREE.MeshStandardMaterial({
            color: COLORS.leaf,
            emissive: 0x1e4d12,
            roughness: 0.35,
            side: THREE.DoubleSide
        });
        const hornCone = new THREE.Mesh(new THREE.ConeGeometry(0.68, 0.95, 14, 1, true), hornConeMat);
        hornCone.rotation.z = Math.PI / 2;
        hornCone.position.set(-0.65, 1.05, 0);
        printTower.add(hornBase, hornCone);

        let printSprite = toolkit.makeTextSprite('print() Console', { border: '#66c032', scale: 0.92 });
        printSprite.position.set(0, 2.15, 0);
        printTower.add(printSprite);
        scene.add(printTower);

        // Travelling Capsules
        const strCapMat = new THREE.MeshStandardMaterial({ color: COLORS.amber, emissive: 0x4d3409, roughness: 0.3 });
        const intCapMat = new THREE.MeshStandardMaterial({ color: COLORS.magic, emissive: 0x16385c, roughness: 0.25 });
        const outCapMat = new THREE.MeshStandardMaterial({ color: COLORS.leaf, emissive: 0x1d4f12, roughness: 0.25 });

        const capName = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.28, 0.28), strCapMat);
        const capAge = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.28, 0.28), strCapMat.clone());
        const capPrint = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), outCapMat);
        scene.add(capName, capAge, capPrint);

        let ioAnim = { timer: 0, validAge: true, active: false };

        function triggerIOFlow() {
            const nameVal = document.getElementById('userName')?.value.trim() || 'Lyra';
            const ageRaw = document.getElementById('userAge')?.value.trim() || '21';
            const parsedAge = Number(ageRaw);
            const isInt = Number.isInteger(parsedAge) && ageRaw !== '';

            ioAnim.timer = 0;
            ioAnim.validAge = isInt;
            ioAnim.active = true;

            nameDockSprite = updateSpriteText(
                toolkit,
                dockGroup,
                nameDockSprite,
                `name = "${nameVal}" (str)`,
                { border: '#66c032', scale: 0.88 }
            );

            if (isInt) {
                ageDockSprite = updateSpriteText(
                    toolkit,
                    dockGroup,
                    ageDockSprite,
                    `age = ${parsedAge} (int)`,
                    { border: '#4a86c0', scale: 0.88 }
                );
                printSprite = updateSpriteText(
                    toolkit,
                    printTower,
                    printSprite,
                    `print: "Hello ${nameVal}! Next yr: ${parsedAge + 1}"`,
                    { border: '#66c032', scale: 0.86 }
                );
                intRingMat.color.setHex(COLORS.magic);
                stage.setCaption(
                    `input() sent "${nameVal}" (str) and "${ageRaw}" -> int() converted to ${parsedAge} (int) -> print() outputs next year ${parsedAge + 1}`
                );
            } else {
                ageDockSprite = updateSpriteText(
                    toolkit,
                    dockGroup,
                    ageDockSprite,
                    `ValueError: int("${ageRaw}")`,
                    { border: '#de6852', scale: 0.88 }
                );
                printSprite = updateSpriteText(
                    toolkit,
                    printTower,
                    printSprite,
                    'print() halted by ValueError!',
                    { border: '#de6852', scale: 0.86 }
                );
                intRingMat.color.setHex(COLORS.error);
                stage.setCaption(
                    `ValueError! Capsule "${ageRaw}" (str) bounced off the int() converter ring because it is not a whole number!`
                );
            }
        }

        triggerIOFlow();
        toolkit.hookGlobalFunction('runProgram', triggerIOFlow);
        toolkit.hookGlobalFunction('processInput', triggerIOFlow);

        stage.onTick((dt, elapsed) => {
            intRing.rotation.x = elapsed * 1.4;
            ioAnim.timer = (ioAnim.timer + dt * 0.75) % 1.8;
            const p = clamp(ioAnim.timer / 1.4, 0, 1);

            // Name capsule travels smoothly from User Tower (-3.35, 0.6) to nameDock (0, 0.6)
            const uName = clamp(p * 1.6, 0, 1);
            capName.position.set(lerp(-3.1, 0, uName), 0.62 + Math.sin(uName * Math.PI) * 0.25, 0);

            // Age capsule travels from User Tower (-3.1, -0.5) through intRing (-1.35, -0.5)
            if (ioAnim.validAge) {
                const uAge = clamp(p * 1.5, 0, 1);
                capAge.position.set(lerp(-3.1, 0, uAge), -0.5, 0);
                capAge.material.color.setHex(uAge > 0.55 ? COLORS.magic : COLORS.amber);
                capPrint.visible = p > 0.55;
                const uPrint = clamp((p - 0.55) / 0.45, 0, 1);
                capPrint.position.set(lerp(0.4, 3.1, uPrint), lerp(0.1, 0.4, uPrint), 0);
            } else {
                capPrint.visible = false;
                if (p < 0.45) {
                    const uAge = p / 0.45;
                    capAge.position.set(lerp(-3.1, -1.35, uAge), -0.5, 0);
                    capAge.material.color.setHex(COLORS.amber);
                } else {
                    const uBounce = (p - 0.45) / 0.55;
                    capAge.position.set(lerp(-1.35, -2.75, uBounce), -0.5 + Math.sin(uBounce * Math.PI) * 0.55, 0);
                    capAge.material.color.setHex(COLORS.error);
                }
            }
        });
    };

    // ======================================================================
    // CARD 5: 3D Relational Laser Scale vs Assignment Funnel
    // ======================================================================
    window.ThreeScenes0To7['card_5'] = function(toolkit) {
        const container =
            document.getElementById('num1')?.closest('.visualization') ||
            document.querySelectorAll('.visualization')[1] ||
            document.querySelector('.visualization');

        const stage = toolkit.createStage(
            container,
            '3D Relational Laser Scanner & Judgment Crystal',
            'Comparison operators scan two heights without changing them and emit True (green) or False (red)'
        );
        if (!stage) return;

        const { scene } = stage;
        const { COLORS } = toolkit;
        stage.setCameraOrbit(0.15, 0.38, 9.8);

        // Two Number Pillars (num1 on left, num2 on right)
        const p1Mat = new THREE.MeshStandardMaterial({ color: COLORS.magic, roughness: 0.35, metalness: 0.4 });
        const p2Mat = new THREE.MeshStandardMaterial({ color: COLORS.amber, roughness: 0.35, metalness: 0.4 });

        const pillar1 = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.0, 1.15), p1Mat);
        const pillar2 = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.0, 1.15), p2Mat);
        scene.add(pillar1, pillar2);

        let label1 = toolkit.makeTextSprite('num1 = 5', { border: '#4a86c0', scale: 0.9 });
        let label2 = toolkit.makeTextSprite('num2 = 10', { border: '#e8b04b', scale: 0.9 });
        scene.add(label1, label2);

        // Laser Scan Beam connecting the pillar tops
        const laserMat = new THREE.MeshStandardMaterial({
            color: COLORS.leaf,
            emissive: COLORS.leaf,
            roughness: 0.1
        });
        const laserBar = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 4.2, 10), laserMat);
        laserBar.rotation.z = Math.PI / 2;
        scene.add(laserBar);

        // Boolean Judgment Crystal at top center
        const crystalMat = new THREE.MeshStandardMaterial({
            color: COLORS.leaf,
            emissive: 0x1d4f12,
            roughness: 0.2,
            metalness: 0.3
        });
        const judgmentCrystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 0), crystalMat);
        judgmentCrystal.position.set(0, 1.75, 0);
        scene.add(judgmentCrystal);

        let verdictSprite = toolkit.makeTextSprite('5 < 10 -> True', {
            border: '#66c032',
            scale: 1.08
        });
        verdictSprite.position.set(0, 2.58, 0);
        scene.add(verdictSprite);

        // Funnel indicator for = vs == explorer
        const funnelConeMat = new THREE.MeshStandardMaterial({
            color: COLORS.amber,
            emissive: 0x4d3409,
            roughness: 0.3,
            side: THREE.DoubleSide
        });
        const assignFunnel = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.55, 14, 1, true), funnelConeMat);
        assignFunnel.rotation.x = Math.PI;
        assignFunnel.position.set(-2.1, 1.65, 0);
        assignFunnel.visible = false;
        scene.add(assignFunnel);

        let targetH1 = 1.0;
        let targetH2 = 1.8;

        function computePillarHeight(v) {
            if (!Number.isFinite(v)) return 1.0;
            return clamp(0.45 + (v / 15) * 1.4, 0.35, 2.35);
        }

        function syncComparison() {
            assignFunnel.visible = false;
            laserBar.visible = true;

            const n1 = parseFloat(document.getElementById('num1')?.value || '5');
            const n2 = parseFloat(document.getElementById('num2')?.value || '10');
            const op = document.getElementById('operator')?.value || '<';

            let ans = false;
            switch (op) {
                case '<': ans = n1 < n2; break;
                case '>': ans = n1 > n2; break;
                case '==': ans = n1 == n2; break;
                case '!=': ans = n1 != n2; break;
                case '<=': ans = n1 <= n2; break;
                case '>=': ans = n1 >= n2; break;
            }

            targetH1 = computePillarHeight(n1);
            targetH2 = computePillarHeight(n2);

            label1 = updateSpriteText(toolkit, scene, label1, `num1: ${n1}`, { border: '#4a86c0', scale: 0.9 });
            label2 = updateSpriteText(toolkit, scene, label2, `num2: ${n2}`, { border: '#e8b04b', scale: 0.9 });

            verdictSprite = updateSpriteText(
                toolkit,
                scene,
                verdictSprite,
                `${n1} ${op} ${n2} -> ${ans ? 'True' : 'False'}`,
                { border: ans ? '#66c032' : '#de6852', scale: 1.08 }
            );

            const col = ans ? COLORS.leaf : COLORS.error;
            crystalMat.color.setHex(col);
            crystalMat.emissive.setHex(ans ? 0x1d4f12 : 0x5c180e);
            laserMat.color.setHex(col);
            laserMat.emissive.setHex(col);

            stage.setCaption(
                `Relational Scan: ${n1} ${op} ${n2} evaluates to ${ans ? 'True' : 'False'} without modifying either pillar.`
            );
        }

        syncComparison();
        toolkit.hookGlobalFunction('compare', syncComparison);

        toolkit.hookGlobalFunction('exploreEquals', (mode) => {
            if (mode === 'assign') {
                assignFunnel.visible = true;
                laserBar.visible = false;
                targetH1 = computePillarHeight(5);
                targetH2 = computePillarHeight(5);
                label1 = updateSpriteText(toolkit, scene, label1, 'x = 5 (Stored!)', { border: '#e8b04b', scale: 0.95 });
                label2 = updateSpriteText(toolkit, scene, label2, 'Value: 5', { border: '#e8b04b', scale: 0.9 });
                verdictSprite = updateSpriteText(
                    toolkit,
                    scene,
                    verdictSprite,
                    'x = 5 (Assignment Funnel: Pours 5 into x)',
                    { border: '#e8b04b', scale: 1.02 }
                );
                crystalMat.color.setHex(COLORS.amber);
                crystalMat.emissive.setHex(0x4d3409);
                stage.setCaption('Single Equals (=) is an Assignment Funnel: it pours 5 into container x (no True/False).');
            } else if (mode === 'compare_true') {
                assignFunnel.visible = false;
                laserBar.visible = true;
                targetH1 = computePillarHeight(5);
                targetH2 = computePillarHeight(5);
                label1 = updateSpriteText(toolkit, scene, label1, 'x (holds 5)', { border: '#4a86c0', scale: 0.9 });
                label2 = updateSpriteText(toolkit, scene, label2, '5', { border: '#66c032', scale: 0.9 });
                verdictSprite = updateSpriteText(
                    toolkit,
                    scene,
                    verdictSprite,
                    'x == 5 -> True (Heights Match!)',
                    { border: '#66c032', scale: 1.05 }
                );
                crystalMat.color.setHex(COLORS.leaf);
                crystalMat.emissive.setHex(0x1d4f12);
                laserMat.color.setHex(COLORS.leaf);
                stage.setCaption('Double Equals (==) is a Laser Scanner: asks "Does x equal 5?" -> Returns True!');
            } else {
                assignFunnel.visible = false;
                laserBar.visible = true;
                targetH1 = computePillarHeight(5);
                targetH2 = computePillarHeight(20);
                label1 = updateSpriteText(toolkit, scene, label1, 'x (still holds 5)', { border: '#4a86c0', scale: 0.9 });
                label2 = updateSpriteText(toolkit, scene, label2, '99', { border: '#de6852', scale: 0.9 });
                verdictSprite = updateSpriteText(
                    toolkit,
                    scene,
                    verdictSprite,
                    'x == 99 -> False (Mismatch!)',
                    { border: '#de6852', scale: 1.05 }
                );
                crystalMat.color.setHex(COLORS.error);
                crystalMat.emissive.setHex(0x5c180e);
                laserMat.color.setHex(COLORS.error);
                stage.setCaption('Double Equals (==) asks "Does x (5) equal 99?" -> Returns False without changing x!');
            }
        });

        stage.onTick((dt, elapsed) => {
            pillar1.scale.y = lerp(pillar1.scale.y, targetH1, Math.min(1, dt * 7));
            pillar2.scale.y = lerp(pillar2.scale.y, targetH2, Math.min(1, dt * 7));

            pillar1.position.set(-2.1, -1.5 + pillar1.scale.y * 0.5, 0);
            pillar2.position.set(2.1, -1.5 + pillar2.scale.y * 0.5, 0);

            label1.position.set(-2.1, -1.5 + pillar1.scale.y + 0.45, 0);
            label2.position.set(2.1, -1.5 + pillar2.scale.y + 0.45, 0);

            const top1 = -1.5 + pillar1.scale.y;
            const top2 = -1.5 + pillar2.scale.y;
            laserBar.position.set(0, (top1 + top2) * 0.5, 0);
            laserBar.rotation.z = Math.PI / 2 + Math.atan2(top2 - top1, 4.2);

            judgmentCrystal.rotation.y = elapsed * 1.4;
            judgmentCrystal.position.y = 1.75 + Math.sin(elapsed * 2.5) * 0.07;
        });
    };

    // ======================================================================
    // CARD 6: 3D Arcane Logic Gate Conduits (Series AND, Parallel OR, Inverter NOT)
    // ======================================================================
    window.ThreeScenes0To7['card_6'] = function(toolkit) {
        const container =
            document.getElementById('circuitType')?.closest('.visualization') ||
            document.querySelectorAll('.visualization')[1] ||
            document.querySelector('.visualization');

        const stage = toolkit.createStage(
            container,
            '3D Arcane Logic Gate Conduits',
            'Toggle Switch A, Switch B, and Circuit Type to see Series (AND), Parallel (OR), and Inverter (NOT) flow'
        );
        if (!stage) return;

        const { scene } = stage;
        const { COLORS } = toolkit;
        stage.setCameraOrbit(0.08, 0.52, 10.4);

        const stoneMat = new THREE.MeshStandardMaterial({ color: COLORS.slate, roughness: 0.75 });
        const bridgeTrueMat = new THREE.MeshStandardMaterial({ color: COLORS.leaf, emissive: 0x1a4710, roughness: 0.35 });
        const bridgeFalseMat = new THREE.MeshStandardMaterial({ color: COLORS.error, emissive: 0x4f160d, roughness: 0.45 });

        // Left: Mana Source Pedestal
        const sourceMesh = new THREE.Mesh(
            new THREE.OctahedronGeometry(0.48, 0),
            new THREE.MeshStandardMaterial({ color: COLORS.amber, emissive: 0x6b4812, roughness: 0.2 })
        );
        sourceMesh.position.set(-3.6, 0.0, 0);
        scene.add(sourceMesh);

        const sourceLbl = toolkit.makeTextSprite('Power Source', { border: '#e8b04b', scale: 0.85 });
        sourceLbl.position.set(-3.6, 0.9, 0);
        scene.add(sourceLbl);

        // Right: Output Lantern Crystal
        const lanternMat = new THREE.MeshStandardMaterial({ color: COLORS.error, emissive: 0x3b110b, roughness: 0.25 });
        const lanternMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(0.55, 0), lanternMat);
        lanternMesh.position.set(3.6, 0.0, 0);
        scene.add(lanternMesh);

        let lanternLbl = toolkit.makeTextSprite('Lantern: OFF (False)', { border: '#de6852', scale: 0.95 });
        lanternLbl.position.set(3.6, 0.98, 0);
        scene.add(lanternLbl);

        // Fixed conduit end-segments
        const segStart = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.16, 0.44), stoneMat);
        segStart.position.set(-2.6, -0.35, 0);
        const segEnd = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.16, 0.44), stoneMat);
        segEnd.position.set(2.6, -0.35, 0);
        const segMid = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.16, 0.44), stoneMat);
        segMid.position.set(0, -0.35, 0);
        scene.add(segStart, segEnd, segMid);

        // Movable Drawbridge A and Drawbridge B
        const bridgeA = new THREE.Group();
        const plankA = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.16, 0.42), bridgeFalseMat.clone());
        plankA.position.x = 0.65;
        bridgeA.add(plankA);
        scene.add(bridgeA);

        const bridgeB = new THREE.Group();
        const plankB = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.16, 0.42), bridgeFalseMat.clone());
        plankB.position.x = 0.65;
        bridgeB.add(plankB);
        scene.add(bridgeB);

        // NOT Gate Rotating Prism
        const notPrism = new THREE.Mesh(
            new THREE.OctahedronGeometry(0.52, 0),
            new THREE.MeshStandardMaterial({ color: COLORS.magic, emissive: 0x16385c, roughness: 0.25 })
        );
        notPrism.position.set(0, 0.05, 0);
        notPrism.visible = false;
        scene.add(notPrism);

        let switchALbl = toolkit.makeTextSprite('A: False', { border: '#de6852', scale: 0.85 });
        let switchBLbl = toolkit.makeTextSprite('B: False', { border: '#de6852', scale: 0.85 });
        scene.add(switchALbl, switchBLbl);

        // Flowing Mana Particles
        const particles = [];
        const particleMat = new THREE.MeshStandardMaterial({ color: COLORS.amber, emissive: COLORS.amber, roughness: 0.1 });
        for (let i = 0; i < 8; i++) {
            const p = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 10), particleMat);
            scene.add(p);
            particles.push({ mesh: p, offset: i / 8 });
        }

        let state = { type: 'AND', sw1: false, sw2: false, out: false };

        function syncCircuit3D() {
            const type = document.getElementById('circuitType')?.value || 'AND';
            const sw1 = Boolean(document.getElementById('switch1')?.checked);
            const sw2 = Boolean(document.getElementById('switch2')?.checked);
            const out = type === 'AND' ? (sw1 && sw2) : (type === 'OR' ? (sw1 || sw2) : !sw1);

            state = { type, sw1, sw2, out };

            plankA.material.color.setHex(sw1 ? COLORS.leaf : COLORS.error);
            plankB.material.color.setHex(sw2 ? COLORS.leaf : COLORS.error);

            lanternMat.color.setHex(out ? COLORS.leaf : COLORS.error);
            lanternMat.emissive.setHex(out ? 0x246117 : 0x3b110b);

            lanternLbl = updateSpriteText(
                toolkit,
                scene,
                lanternLbl,
                `Lantern: ${out ? 'ON (True)' : 'OFF (False)'}`,
                { border: out ? '#66c032' : '#de6852', scale: 0.95 }
            );

            if (type === 'AND') {
                // Series: Bridge A on left (-1.75), Bridge B on right (+0.45)
                segMid.visible = true;
                notPrism.visible = false;
                bridgeB.visible = true;
                switchBLbl.visible = true;

                bridgeA.position.set(-1.85, -0.35, 0);
                bridgeB.position.set(0.45, -0.35, 0);

                switchALbl = updateSpriteText(toolkit, scene, switchALbl, `Switch A: ${sw1 ? 'True' : 'False'}`, {
                    border: sw1 ? '#66c032' : '#de6852',
                    scale: 0.85
                });
                switchALbl.position.set(-1.15, 0.75, 0);

                switchBLbl = updateSpriteText(toolkit, scene, switchBLbl, `Switch B: ${sw2 ? 'True' : 'False'}`, {
                    border: sw2 ? '#66c032' : '#de6852',
                    scale: 0.85
                });
                switchBLbl.position.set(1.15, 0.75, 0);

                stage.setCaption(`AND Gate (Series Conduit): Both Bridge A (${sw1}) and Bridge B (${sw2}) must be lowered -> ${out}`);
            } else if (type === 'OR') {
                // Parallel: Bridge A at z = -0.95, Bridge B at z = +0.95
                segMid.visible = false;
                notPrism.visible = false;
                bridgeB.visible = true;
                switchBLbl.visible = true;

                bridgeA.position.set(-0.65, -0.35, -0.95);
                bridgeB.position.set(-0.65, -0.35, 0.95);

                switchALbl = updateSpriteText(toolkit, scene, switchALbl, `Branch A: ${sw1 ? 'True' : 'False'}`, {
                    border: sw1 ? '#66c032' : '#de6852',
                    scale: 0.85
                });
                switchALbl.position.set(0, 0.75, -0.95);

                switchBLbl = updateSpriteText(toolkit, scene, switchBLbl, `Branch B: ${sw2 ? 'True' : 'False'}`, {
                    border: sw2 ? '#66c032' : '#de6852',
                    scale: 0.85
                });
                switchBLbl.position.set(0, 0.75, 0.95);

                stage.setCaption(`OR Gate (Parallel Conduit): Energy flows if Branch A (${sw1}) OR Branch B (${sw2}) is lowered -> ${out}`);
            } else {
                // NOT: Inverter prism in center
                segMid.visible = true;
                notPrism.visible = true;
                bridgeB.visible = false;
                switchBLbl.visible = false;

                bridgeA.position.set(-1.85, -0.35, 0);
                switchALbl = updateSpriteText(toolkit, scene, switchALbl, `Input A: ${sw1 ? 'True' : 'False'} -> not A: ${out}`, {
                    border: out ? '#66c032' : '#de6852',
                    scale: 0.92
                });
                switchALbl.position.set(0, 1.05, 0);

                stage.setCaption(`NOT Gate (Inverter Prism): Flips Input A (${sw1}) into Output ${out}!`);
            }
        }

        syncCircuit3D();
        toolkit.hookGlobalFunction('updateCircuit', syncCircuit3D);

        stage.onTick((dt, elapsed) => {
            sourceMesh.rotation.y = elapsed * 1.2;
            lanternMesh.rotation.y = elapsed * (state.out ? 2.2 : 0.4);
            notPrism.rotation.y = elapsed * 1.8;

            // Animate drawbridge tilt angles (0 = closed/lowered, 0.85 rad = raised/open)
            const targetAngleA = state.type === 'NOT' ? 0 : (state.sw1 ? 0 : 0.85);
            const targetAngleB = state.sw2 ? 0 : 0.85;
            bridgeA.rotation.z = lerp(bridgeA.rotation.z, targetAngleA, Math.min(1, dt * 8));
            bridgeB.rotation.z = lerp(bridgeB.rotation.z, targetAngleB, Math.min(1, dt * 8));

            // Animate energy particles along active paths
            particles.forEach((p, idx) => {
                const u = (elapsed * 0.48 + p.offset) % 1;
                let maxX = 3.5;
                let z = 0;

                if (state.type === 'AND') {
                    if (!state.sw1) maxX = -1.85;
                    else if (!state.sw2) maxX = 0.45;
                } else if (state.type === 'OR') {
                    const upperLane = idx % 2 === 0;
                    const laneOpen = upperLane ? state.sw1 : state.sw2;
                    z = (upperLane ? -0.95 : 0.95) * Math.sin(u * Math.PI);
                    if (!laneOpen) maxX = -0.65;
                } else if (state.type === 'NOT') {
                    if (state.sw1) maxX = 0.0; // blocked by inverter when input is True
                }

                const x = lerp(-3.5, maxX, u);
                p.mesh.position.set(x, -0.12 + Math.sin(u * Math.PI * 4) * 0.05, z);
            });
        });
    };

    // ======================================================================
    // CARD 7: 3D Bonsai Waterfall Decision Tree (if / elif / else)
    // ======================================================================
    window.ThreeScenes0To7['card_7'] = function(toolkit) {
        const container =
            document.getElementById('numInput')?.closest('.visualization') ||
            document.querySelectorAll('.visualization')[1] ||
            document.querySelector('.visualization');

        const stage = toolkit.createStage(
            container,
            '3D Waterfall Decision Tree',
            'The orb rolls down the trunk and enters the FIRST True branch; all lower branches shutter closed (SKIPPED)'
        );
        if (!stage) return;

        const { scene } = stage;
        const { COLORS } = toolkit;
        stage.setCameraOrbit(0.12, 0.40, 10.2);

        const barkMat = new THREE.MeshStandardMaterial({ color: COLORS.bark, roughness: 0.8 });
        const basinIdleMat = new THREE.MeshStandardMaterial({ color: COLORS.slate, roughness: 0.7 });
        const basinWinMat = new THREE.MeshStandardMaterial({ color: COLORS.leaf, emissive: 0x1e4d12, roughness: 0.35 });
        const gateBlockedMat = new THREE.MeshStandardMaterial({ color: COLORS.error, emissive: 0x4f150c, roughness: 0.4 });

        // Central Vertical Waterfall Chute
        const chuteSpine = new THREE.Mesh(new THREE.BoxGeometry(0.55, 3.6, 0.45), barkMat);
        chuteSpine.position.set(0, 0.1, -0.1);
        scene.add(chuteSpine);

        // Branch 1 Chute (Right: if num > 0 -> POSITIVE)
        const chuteIf = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.22, 0.45), barkMat);
        chuteIf.position.set(1.3, 0.95, 0);
        chuteIf.rotation.z = -0.22;
        scene.add(chuteIf);

        const basinIf = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.58, 0.36, 12), basinIdleMat.clone());
        basinIf.position.set(2.65, 0.55, 0);
        scene.add(basinIf);

        let lblIf = toolkit.makeTextSprite('if num > 0: POSITIVE', { border: '#66c032', scale: 0.88 });
        lblIf.position.set(2.55, 1.35, 0);
        scene.add(lblIf);

        // Branch 2 Chute (Left: elif num < 0 -> NEGATIVE)
        const chuteElif = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.22, 0.45), barkMat);
        chuteElif.position.set(-1.3, -0.05, 0);
        chuteElif.rotation.z = 0.22;
        scene.add(chuteElif);

        const basinElif = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.58, 0.36, 12), basinIdleMat.clone());
        basinElif.position.set(-2.65, -0.45, 0);
        scene.add(basinElif);

        let lblElif = toolkit.makeTextSprite('elif num < 0: NEGATIVE', { border: '#e8b04b', scale: 0.88 });
        lblElif.position.set(-2.55, 0.35, 0);
        scene.add(lblElif);

        // Branch 3 Basin (Bottom Center: else -> ZERO)
        const basinElse = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.62, 0.36, 12), basinIdleMat.clone());
        basinElse.position.set(0, -1.45, 0);
        scene.add(basinElse);

        let lblElse = toolkit.makeTextSprite('else: ZERO (Default)', { border: '#4a86c0', scale: 0.88 });
        lblElse.position.set(0, -2.05, 0);
        scene.add(lblElse);

        // Shutter Gates showing SKIPPED / FALSE barriers
        const gateBarIf = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.55, 0.58), gateBlockedMat);
        gateBarIf.position.set(0.45, 1.15, 0.1);
        const gateBarElif = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.55, 0.58), gateBlockedMat);
        gateBarElif.position.set(-0.45, 0.15, 0.1);
        const gateBarElse = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.18, 0.58), gateBlockedMat);
        gateBarElse.position.set(0, -0.85, 0.1);
        scene.add(gateBarIf, gateBarElif, gateBarElse);

        // Rolling Numbered Orb
        const orbGroup = new THREE.Group();
        const orbMesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.34, 16, 16),
            new THREE.MeshStandardMaterial({ color: COLORS.amber, emissive: 0x61420e, roughness: 0.2 })
        );
        orbGroup.add(orbMesh);

        let orbSprite = toolkit.makeTextSprite('num = 0', { border: '#e8b04b', scale: 0.9 });
        orbSprite.position.set(0, 0.68, 0);
        orbGroup.add(orbSprite);
        scene.add(orbGroup);

        let anim = { branch: 'else', t: 0, num: 0 };

        function syncDecisionTree() {
            const rawVal = document.getElementById('numInput')?.value;
            const num = rawVal === '' || rawVal === undefined ? 0 : parseFloat(rawVal);
            anim.num = num;
            anim.t = 0;

            orbSprite = updateSpriteText(toolkit, orbGroup, orbSprite, `num = ${num}`, {
                border: '#e8b04b',
                scale: 0.9
            });

            basinIf.material = basinIdleMat;
            basinElif.material = basinIdleMat;
            basinElse.material = basinIdleMat;

            if (num > 0) {
                anim.branch = 'if';
                basinIf.material = basinWinMat;
                gateBarIf.visible = false;
                gateBarElif.visible = true;
                gateBarElse.visible = true;

                lblIf = updateSpriteText(toolkit, scene, lblIf, 'if num > 0: TRUE (TAKEN)', { border: '#66c032', scale: 0.92 });
                lblElif = updateSpriteText(toolkit, scene, lblElif, 'elif num < 0: SKIPPED', { border: '#de6852', scale: 0.85 });
                lblElse = updateSpriteText(toolkit, scene, lblElse, 'else: SKIPPED', { border: '#de6852', scale: 0.85 });
                stage.setCaption(`num = ${num}: First condition (num > 0) is True! Orb diverts right into POSITIVE; elif and else are SKIPPED.`);
            } else if (num < 0) {
                anim.branch = 'elif';
                basinElif.material = basinWinMat;
                gateBarIf.visible = true;
                gateBarElif.visible = false;
                gateBarElse.visible = true;

                lblIf = updateSpriteText(toolkit, scene, lblIf, 'if num > 0: FALSE', { border: '#de6852', scale: 0.85 });
                lblElif = updateSpriteText(toolkit, scene, lblElif, 'elif num < 0: TRUE (TAKEN)', { border: '#66c032', scale: 0.92 });
                lblElse = updateSpriteText(toolkit, scene, lblElse, 'else: SKIPPED', { border: '#de6852', scale: 0.85 });
                stage.setCaption(`num = ${num}: if (num > 0) is False; orb drops to elif (num < 0) which is True -> NEGATIVE! else is SKIPPED.`);
            } else {
                anim.branch = 'else';
                basinElse.material = basinWinMat;
                gateBarIf.visible = true;
                gateBarElif.visible = true;
                gateBarElse.visible = false;

                lblIf = updateSpriteText(toolkit, scene, lblIf, 'if num > 0: FALSE', { border: '#de6852', scale: 0.85 });
                lblElif = updateSpriteText(toolkit, scene, lblElif, 'elif num < 0: FALSE', { border: '#de6852', scale: 0.85 });
                lblElse = updateSpriteText(toolkit, scene, lblElse, 'else: DEFAULT (TAKEN)', { border: '#66c032', scale: 0.92 });
                stage.setCaption('num = 0: Both if and elif are False; orb falls straight into the default else basin -> ZERO!');
            }
        }

        syncDecisionTree();
        toolkit.hookGlobalFunction('evaluateNumber', syncDecisionTree);
        toolkit.hookGlobalFunction('quickTestNumber', syncDecisionTree);

        stage.onTick((dt) => {
            anim.t = clamp(anim.t + dt * 0.95, 0, 1);
            const u = anim.t;

            if (anim.branch === 'if') {
                if (u < 0.35) {
                    const p = u / 0.35;
                    orbGroup.position.set(0, lerp(2.05, 1.15, p), 0.25);
                } else {
                    const p = (u - 0.35) / 0.65;
                    orbGroup.position.set(lerp(0, 2.65, p), lerp(1.15, 0.85, p), 0.25);
                }
            } else if (anim.branch === 'elif') {
                if (u < 0.5) {
                    const p = u / 0.5;
                    orbGroup.position.set(0, lerp(2.05, 0.15, p), 0.25);
                } else {
                    const p = (u - 0.5) / 0.5;
                    orbGroup.position.set(lerp(0, -2.65, p), lerp(0.15, -0.15, p), 0.25);
                }
            } else {
                orbGroup.position.set(0, lerp(2.05, -1.15, u), 0.25);
            }
        });
    };
})();
