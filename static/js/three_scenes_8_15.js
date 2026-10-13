// ==========================================================================
// PYTHON ZERO2ONE — THREE.JS 3D SCENES FOR CARDS 8 TO 15
// ==========================================================================

(function() {
    window.ThreeScenes8To15 = window.ThreeScenes8To15 || {};

    function findVizContainer(preferredId, fallbackIndex) {
        if (preferredId) {
            const el = document.getElementById(preferredId);
            if (el) {
                const viz = el.closest('.visualization');
                if (viz) return viz;
            }
        }
        const all = document.querySelectorAll('.visualization');
        if (typeof fallbackIndex === 'number' && all[fallbackIndex]) {
            return all[fallbackIndex];
        }
        return all[all.length - 1] || null;
    }

    function replaceSprite(toolkit, parent, oldSprite, text, opts, position) {
        const pos = position || (oldSprite ? oldSprite.position.clone() : new THREE.Vector3());
        if (oldSprite) {
            parent.remove(oldSprite);
            if (oldSprite.material) {
                if (oldSprite.material.map) oldSprite.material.map.dispose();
                oldSprite.material.dispose();
            }
        }
        const next = toolkit.makeTextSprite(text, opts);
        next.position.copy(pos);
        parent.add(next);
        return next;
    }

    function clearGroupChildren(group) {
        while (group.children.length > 0) {
            const child = group.children[0];
            group.remove(child);
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(m => {
                        if (m.map) m.map.dispose();
                        m.dispose();
                    });
                } else {
                    if (child.material.map) child.material.map.dispose();
                    child.material.dispose();
                }
            }
        }
    }

    // ==========================================================================
    // CARD 8: 3D CONCENTRIC FORTRESS COURTYARD (NESTED CONDITIONALS)
    // ==========================================================================
    window.ThreeScenes8To15.card_8 = function(toolkit) {
        const container = findVizContainer('hasTicket', 1);
        const stage = toolkit.createStage(
            container,
            '3D Concentric Fortress Courtyard — Nested Conditionals',
            'Outer Gate (has_ticket) guards the courtyard; Inner Gate A (is_adult) and Inner Gate B (elif has_guardian) stand inside.'
        );
        if (!stage) return;

        const C = toolkit.COLORS;
        stage.setCameraOrbit(0.32, 0.54, 10.8);

        // Courtyard floor
        const floorMat = new THREE.MeshLambertMaterial({ color: C.pine });
        const floor = new THREE.Mesh(new THREE.BoxGeometry(9.2, 0.25, 8.6), floorMat);
        floor.position.set(0, -1.55, 0.1);
        stage.scene.add(floor);

        // Inner Sanctum (Goal Keep at back z = -3.1)
        const sanctumBase = new THREE.Mesh(
            new THREE.CylinderGeometry(1.45, 1.65, 0.3, 8),
            new THREE.MeshLambertMaterial({ color: C.leafDark })
        );
        sanctumBase.position.set(0, -1.32, -3.1);
        stage.scene.add(sanctumBase);

        const sanctumOrbMat = new THREE.MeshPhongMaterial({
            color: C.leaf,
            emissive: 0x1e4d1b,
            shininess: 80
        });
        const sanctumCrystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), sanctumOrbMat);
        sanctumCrystal.position.set(0, -0.55, -3.1);
        stage.scene.add(sanctumCrystal);

        const sanctumLabel = toolkit.makeTextSprite('Inner Keep [Access Granted]', {
            border: '#66c032',
            fontSize: 22,
            scale: 1.05
        });
        sanctumLabel.position.set(0, 0.25, -3.1);
        stage.scene.add(sanctumLabel);

        // Helper to build a 3D Fortress Gate with sliding portcullis
        function buildGate(x, z, width, labelText) {
            const group = new THREE.Group();
            group.position.set(x, -1.42, z);
            stage.scene.add(group);

            const stoneMat = new THREE.MeshLambertMaterial({ color: C.barkDark });
            const trimMat = new THREE.MeshLambertMaterial({ color: C.bark });

            const pillarOffset = width * 0.5 + 0.28;
            const leftPillar = new THREE.Mesh(new THREE.BoxGeometry(0.56, 2.2, 0.56), stoneMat);
            leftPillar.position.set(-pillarOffset, 1.1, 0);
            group.add(leftPillar);

            const rightPillar = new THREE.Mesh(new THREE.BoxGeometry(0.56, 2.2, 0.56), stoneMat);
            rightPillar.position.set(pillarOffset, 1.1, 0);
            group.add(rightPillar);

            const lintel = new THREE.Mesh(new THREE.BoxGeometry(width + 1.3, 0.42, 0.66), trimMat);
            lintel.position.set(0, 2.25, 0);
            group.add(lintel);

            // Portcullis iron grate
            const portcullis = new THREE.Group();
            const barMat = new THREE.MeshPhongMaterial({ color: 0x8a9ba8, shininess: 60 });
            const barCount = 5;
            for (let i = 0; i < barCount; i++) {
                const bx = -width * 0.38 + (i / (barCount - 1)) * (width * 0.76);
                const vBar = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.85, 8), barMat);
                vBar.position.set(bx, 0.95, 0);
                portcullis.add(vBar);
            }
            const hBar1 = new THREE.Mesh(new THREE.BoxGeometry(width * 0.9, 0.08, 0.1), barMat);
            hBar1.position.set(0, 0.5, 0);
            portcullis.add(hBar1);

            const hBar2 = new THREE.Mesh(new THREE.BoxGeometry(width * 0.9, 0.08, 0.1), barMat);
            hBar2.position.set(0, 1.35, 0);
            portcullis.add(hBar2);

            group.add(portcullis);

            // Status beacon crystal on top of lintel
            const beaconMat = new THREE.MeshPhongMaterial({
                color: C.amber,
                emissive: 0x332200,
                shininess: 90
            });
            const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), beaconMat);
            beacon.position.set(0, 2.65, 0);
            group.add(beacon);

            const titleSprite = toolkit.makeTextSprite(labelText, {
                border: '#e8b04b',
                fontSize: 22,
                scale: 1.05
            });
            titleSprite.position.set(0, 3.25, 0);
            group.add(titleSprite);

            const stateSprite = toolkit.makeTextSprite('Checking...', {
                border: '#66c032',
                fontSize: 20,
                scale: 0.95
            });
            stateSprite.position.set(0, 2.75, 0.45);
            group.add(stateSprite);

            return {
                group,
                portcullis,
                beaconMat,
                stateSprite,
                targetPortcullisY: 0,
                updateStateLabel(txt, borderHex, beaconHex, emissiveHex) {
                    this.stateSprite = replaceSprite(
                        toolkit,
                        this.group,
                        this.stateSprite,
                        txt,
                        { border: borderHex, fontSize: 20, scale: 0.95 },
                        new THREE.Vector3(0, 2.75, 0.45)
                    );
                    this.beaconMat.color.setHex(beaconHex);
                    this.beaconMat.emissive.setHex(emissiveHex);
                }
            };
        }

        // Concentric fortress walls connecting the gates
        const wallMat = new THREE.MeshLambertMaterial({ color: 0x2d2419 });
        // Outer front wall segments flanking Outer Gate at z = 1.95
        const outerWallL = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.6, 0.35), wallMat);
        outerWallL.position.set(-2.75, -0.62, 1.95);
        stage.scene.add(outerWallL);

        const outerWallR = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.6, 0.35), wallMat);
        outerWallR.position.set(2.75, -0.62, 1.95);
        stage.scene.add(outerWallR);

        // Courtyard side walls from z = 1.95 to z = -1.05
        const sideWallL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.6, 3.1), wallMat);
        sideWallL.position.set(-4.0, -0.62, 0.45);
        stage.scene.add(sideWallL);

        const sideWallR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.6, 3.1), wallMat);
        sideWallR.position.set(4.0, -0.62, 0.45);
        stage.scene.add(sideWallR);

        // Center divider wall between Inner Gate A and Inner Gate B at z = -1.05
        const midWall = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.6, 0.35), wallMat);
        midWall.position.set(0, -0.62, -1.05);
        stage.scene.add(midWall);

        // Build the 3 gates
        const outerGate = buildGate(0, 1.95, 1.8, 'Outer: if has_ticket:');
        const innerGateA = buildGate(-1.95, -1.05, 1.55, 'Inner A: if is_adult:');
        const innerGateB = buildGate(1.95, -1.05, 1.55, 'Inner B: elif has_guardian:');

        // Glowing Traveler Orb
        const travelerGroup = new THREE.Group();
        travelerGroup.position.set(0, -0.85, 3.85);
        stage.scene.add(travelerGroup);

        const orbMat = new THREE.MeshPhongMaterial({
            color: C.amber,
            emissive: 0x664411,
            shininess: 100
        });
        const orbMesh = new THREE.Mesh(new THREE.SphereGeometry(0.34, 24, 24), orbMat);
        travelerGroup.add(orbMesh);

        const haloMat = new THREE.MeshBasicMaterial({
            color: C.amber,
            transparent: true,
            opacity: 0.28,
            wireframe: true
        });
        const haloMesh = new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 12), haloMat);
        travelerGroup.add(haloMesh);

        let travelerSprite = toolkit.makeTextSprite('Traveler', {
            border: '#e8b04b',
            fontSize: 20,
            scale: 0.9
        });
        travelerSprite.position.set(0, 0.78, 0);
        travelerGroup.add(travelerSprite);

        // Waypoint path animation state
        let waypoints = [new THREE.Vector3(0, -0.85, 3.85)];
        let wpIndex = 0;

        function syncFortressState() {
            const hasTicket = Boolean(document.getElementById('hasTicket')?.checked);
            const isAdult = Boolean(document.getElementById('isAdult')?.checked);
            const hasGuardian = Boolean(document.getElementById('hasGuardian')?.checked);

            travelerGroup.position.set(0, -0.85, 3.9);
            wpIndex = 0;

            if (!hasTicket) {
                outerGate.targetPortcullisY = 0;
                innerGateA.targetPortcullisY = 0;
                innerGateB.targetPortcullisY = 0;

                outerGate.updateStateLabel('False [LOCKED]', '#de6852', C.error, 0x551111);
                innerGateA.updateStateLabel('Unreached', '#5a4228', C.slate, 0x091015);
                innerGateB.updateStateLabel('Unreached', '#5a4228', C.slate, 0x091015);

                orbMat.color.setHex(C.error);
                haloMat.color.setHex(C.error);
                travelerSprite = replaceSprite(
                    toolkit,
                    travelerGroup,
                    travelerSprite,
                    'Blocked at Outer Gate',
                    { border: '#de6852', fontSize: 20, scale: 0.92 },
                    new THREE.Vector3(0, 0.78, 0)
                );

                waypoints = [
                    new THREE.Vector3(0, -0.85, 3.9),
                    new THREE.Vector3(0, -0.85, 2.85)
                ];
                stage.setCaption('has_ticket is False -> Outer Gate stays LOCKED; traveler stops outside and inner gates are never tested.');
            } else {
                outerGate.targetPortcullisY = 1.45;
                outerGate.updateStateLabel('True [OPEN]', '#66c032', C.leaf, 0x1e4d1b);

                if (isAdult) {
                    innerGateA.targetPortcullisY = 1.45;
                    innerGateB.targetPortcullisY = 0;

                    innerGateA.updateStateLabel('True [OPEN]', '#66c032', C.leaf, 0x1e4d1b);
                    innerGateB.updateStateLabel('Skipped (elif)', '#5a4228', C.slate, 0x091015);

                    orbMat.color.setHex(C.leaf);
                    haloMat.color.setHex(C.leaf);
                    travelerSprite = replaceSprite(
                        toolkit,
                        travelerGroup,
                        travelerSprite,
                        'Admitted (Adult)',
                        { border: '#66c032', fontSize: 20, scale: 0.92 },
                        new THREE.Vector3(0, 0.78, 0)
                    );

                    waypoints = [
                        new THREE.Vector3(0, -0.85, 3.9),
                        new THREE.Vector3(0, -0.85, 1.95),
                        new THREE.Vector3(0, -0.85, 0.45),
                        new THREE.Vector3(-1.95, -0.85, 0.2),
                        new THREE.Vector3(-1.95, -0.85, -1.05),
                        new THREE.Vector3(-0.9, -0.85, -2.3),
                        new THREE.Vector3(0, -0.75, -3.1)
                    ];
                    stage.setCaption('has_ticket is True -> Enters courtyard -> is_adult is True -> Inner Gate A opens and admits traveler!');
                } else if (hasGuardian) {
                    innerGateA.targetPortcullisY = 0;
                    innerGateB.targetPortcullisY = 1.45;

                    innerGateA.updateStateLabel('False [CLOSED]', '#de6852', C.error, 0x551111);
                    innerGateB.updateStateLabel('True [OPEN]', '#66c032', C.leaf, 0x1e4d1b);

                    orbMat.color.setHex(C.leaf);
                    haloMat.color.setHex(C.amber);
                    travelerSprite = replaceSprite(
                        toolkit,
                        travelerGroup,
                        travelerSprite,
                        'Admitted (With Guardian)',
                        { border: '#66c032', fontSize: 20, scale: 0.95 },
                        new THREE.Vector3(0, 0.78, 0)
                    );

                    waypoints = [
                        new THREE.Vector3(0, -0.85, 3.9),
                        new THREE.Vector3(0, -0.85, 1.95),
                        new THREE.Vector3(0, -0.85, 0.45),
                        new THREE.Vector3(-1.35, -0.85, 0.1),
                        new THREE.Vector3(1.95, -0.85, 0.1),
                        new THREE.Vector3(1.95, -0.85, -1.05),
                        new THREE.Vector3(0.9, -0.85, -2.3),
                        new THREE.Vector3(0, -0.75, -3.1)
                    ];
                    stage.setCaption('has_ticket is True -> is_adult is False -> Checks elif has_guardian (True) -> Inner Gate B opens!');
                } else {
                    innerGateA.targetPortcullisY = 0;
                    innerGateB.targetPortcullisY = 0;

                    innerGateA.updateStateLabel('False [CLOSED]', '#de6852', C.error, 0x551111);
                    innerGateB.updateStateLabel('False [CLOSED]', '#de6852', C.error, 0x551111);

                    orbMat.color.setHex(C.error);
                    haloMat.color.setHex(C.amber);
                    travelerSprite = replaceSprite(
                        toolkit,
                        travelerGroup,
                        travelerSprite,
                        'Denied in Courtyard',
                        { border: '#de6852', fontSize: 20, scale: 0.92 },
                        new THREE.Vector3(0, 0.78, 0)
                    );

                    waypoints = [
                        new THREE.Vector3(0, -0.85, 3.9),
                        new THREE.Vector3(0, -0.85, 1.95),
                        new THREE.Vector3(0, -0.85, 0.45),
                        new THREE.Vector3(-1.55, -0.85, -0.1),
                        new THREE.Vector3(1.75, -0.85, -0.1)
                    ];
                    stage.setCaption('has_ticket is True (inside courtyard), but both is_adult and has_guardian are False -> Denied at inner gates.');
                }
            }
        }

        stage.onTick((dt, elapsed) => {
            // Animate portcullis gates smoothly
            [outerGate, innerGateA, innerGateB].forEach(g => {
                g.portcullis.position.y += (g.targetPortcullisY - g.portcullis.position.y) * Math.min(1, dt * 7);
            });

            // Glide traveler orb along waypoints
            if (wpIndex < waypoints.length) {
                const targetPt = waypoints[wpIndex];
                const dist = travelerGroup.position.distanceTo(targetPt);
                const speed = 4.6 * dt;
                if (dist <= speed) {
                    travelerGroup.position.copy(targetPt);
                    wpIndex++;
                } else {
                    const dir = targetPt.clone().sub(travelerGroup.position).normalize();
                    travelerGroup.position.addScaledVector(dir, speed);
                }
            }

            orbMesh.position.y = Math.sin(elapsed * 4.0) * 0.07;
            haloMesh.rotation.y = elapsed * 1.4;
            haloMesh.rotation.x = elapsed * 0.9;
            sanctumCrystal.rotation.y = elapsed * 1.2;
            sanctumCrystal.position.y = -0.55 + Math.sin(elapsed * 2.5) * 0.08;
        });

        toolkit.hookGlobalFunction('checkAccess', syncFortressState);
        syncFortressState();
    };

    // ==========================================================================
    // CARD 9: 3D WHILE-LOOP BOOMERANG ORBIT & COUNTER PILLAR
    // ==========================================================================
    window.ThreeScenes8To15.card_9 = function(toolkit) {
        const container = findVizContainer('loop-visualization', 1);
        const stage = toolkit.createStage(
            container,
            '3D While-Loop Boomerang Orbit & Counter Pillar',
            'Runner orbits the track while counter < limit, stacking voxel blocks on the central pillar each lap.'
        );
        if (!stage) return;

        const C = toolkit.COLORS;
        stage.setCameraOrbit(0.42, 0.52, 10.6);

        const trackCenter = new THREE.Vector3(-0.6, -1.35, 0);
        const trackRadius = 2.75;

        // Circular Boomerang Track Ring
        const ringGeo = new THREE.RingGeometry(trackRadius - 0.38, trackRadius + 0.38, 48);
        ringGeo.rotateX(-Math.PI / 2);
        const ringMat = new THREE.MeshLambertMaterial({ color: C.barkDark, side: THREE.DoubleSide });
        const trackMesh = new THREE.Mesh(ringGeo, ringMat);
        trackMesh.position.copy(trackCenter);
        stage.scene.add(trackMesh);

        const railGeo = new THREE.TorusGeometry(trackRadius, 0.06, 12, 56);
        railGeo.rotateX(Math.PI / 2);
        const railMat = new THREE.MeshPhongMaterial({ color: C.leafDark, emissive: 0x102812 });
        const railMesh = new THREE.Mesh(railGeo, railMat);
        railMesh.position.set(trackCenter.x, trackCenter.y + 0.04, trackCenter.z);
        stage.scene.add(railMesh);

        // Condition Arch at angle = 0 (front of loop: x = trackCenter.x, z = trackRadius)
        const archGroup = new THREE.Group();
        archGroup.position.set(trackCenter.x, trackCenter.y, trackCenter.z + trackRadius);
        stage.scene.add(archGroup);

        const archPillarMat = new THREE.MeshLambertMaterial({ color: C.bark });
        const archPillarL = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.7, 0.28), archPillarMat);
        archPillarL.position.set(-0.62, 0.85, 0);
        archGroup.add(archPillarL);

        const archPillarR = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.7, 0.28), archPillarMat);
        archPillarR.position.set(0.62, 0.85, 0);
        archGroup.add(archPillarR);

        const archTop = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.28, 0.36), archPillarMat);
        archTop.position.set(0, 1.75, 0);
        archGroup.add(archTop);

        const condGemMat = new THREE.MeshPhongMaterial({ color: C.leaf, emissive: 0x1d4d1a, shininess: 90 });
        const condGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.24, 0), condGemMat);
        condGem.position.set(0, 2.15, 0);
        archGroup.add(condGem);

        let condSprite = toolkit.makeTextSprite('Condition: counter < 5', {
            border: '#66c032',
            fontSize: 21,
            scale: 1.05
        });
        condSprite.position.set(0, 2.72, 0);
        archGroup.add(condSprite);

        // Increment Pad at angle = Math.PI (back of loop: x = trackCenter.x, z = -trackRadius)
        const incGroup = new THREE.Group();
        incGroup.position.set(trackCenter.x, trackCenter.y, trackCenter.z - trackRadius);
        stage.scene.add(incGroup);

        const incPadMat = new THREE.MeshPhongMaterial({ color: C.amber, emissive: 0x3b2608 });
        const incPad = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.68, 0.16, 6), incPadMat);
        incPad.position.set(0, 0.08, 0);
        incGroup.add(incPad);

        const incSprite = toolkit.makeTextSprite('Increment: counter += 1', {
            border: '#e8b04b',
            fontSize: 20,
            scale: 0.98
        });
        incSprite.position.set(0, 0.95, 0);
        incGroup.add(incSprite);

        // Exit Ramp branching right from the Condition Arch (toward +X at z = trackRadius)
        const exitRampGroup = new THREE.Group();
        exitRampGroup.position.set(trackCenter.x + 2.15, trackCenter.y, trackCenter.z + trackRadius);
        stage.scene.add(exitRampGroup);

        const rampMesh = new THREE.Mesh(
            new THREE.BoxGeometry(3.2, 0.14, 0.72),
            new THREE.MeshLambertMaterial({ color: C.slate })
        );
        exitRampGroup.add(rampMesh);

        const exitSwitchBar = new THREE.Mesh(
            new THREE.BoxGeometry(0.9, 0.16, 0.14),
            new THREE.MeshPhongMaterial({ color: C.error, emissive: 0x331111 })
        );
        exitSwitchBar.position.set(-1.35, 0.25, 0);
        exitRampGroup.add(exitSwitchBar);

        const exitSprite = toolkit.makeTextSprite('Exit Ramp (counter == limit)', {
            border: '#de6852',
            fontSize: 19,
            scale: 0.94
        });
        exitSprite.position.set(0.65, 0.85, 0);
        exitRampGroup.add(exitSprite);

        // Central Voxel Counter Pillar & Golden Limit Ring
        const pillarBase = new THREE.Mesh(
            new THREE.CylinderGeometry(0.85, 0.98, 0.24, 8),
            new THREE.MeshLambertMaterial({ color: C.bark })
        );
        pillarBase.position.set(trackCenter.x, trackCenter.y + 0.12, trackCenter.z);
        stage.scene.add(pillarBase);

        const voxelStackGroup = new THREE.Group();
        voxelStackGroup.position.set(trackCenter.x, trackCenter.y + 0.24, trackCenter.z);
        stage.scene.add(voxelStackGroup);

        const limitRingGroup = new THREE.Group();
        limitRingGroup.position.set(trackCenter.x, trackCenter.y + 2.1, trackCenter.z);
        stage.scene.add(limitRingGroup);

        const limitRingMesh = new THREE.Mesh(
            new THREE.TorusGeometry(0.75, 0.06, 12, 32),
            new THREE.MeshPhongMaterial({ color: C.amber, emissive: 0x55380b, shininess: 100 })
        );
        limitRingMesh.rotation.x = Math.PI / 2;
        limitRingGroup.add(limitRingMesh);

        let limitSprite = toolkit.makeTextSprite('Limit Ring: 5', {
            border: '#e8b04b',
            fontSize: 20,
            scale: 0.92
        });
        limitSprite.position.set(0, 0.55, 0);
        limitRingGroup.add(limitSprite);

        // Runner Orb
        const runnerGroup = new THREE.Group();
        stage.scene.add(runnerGroup);

        const runnerMat = new THREE.MeshPhongMaterial({ color: C.leaf, emissive: 0x1e4d1a, shininess: 100 });
        const runnerOrb = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 20), runnerMat);
        runnerGroup.add(runnerOrb);

        let runnerSprite = toolkit.makeTextSprite('counter = 0', {
            border: '#66c032',
            fontSize: 20,
            scale: 0.88
        });
        runnerSprite.position.set(0, 0.65, 0);
        runnerGroup.add(runnerSprite);

        // Animation state
        let currentAngle = 0;
        let targetAngle = 0;
        let onExitRamp = false;
        let exitProgress = 0;
        let activeMax = 5;
        let stackedCount = 0;
        let incPulse = 0;

        function getMaxHeight() {
            return 2.25;
        }

        function rebuildVoxelStack(count, maxLimit) {
            clearGroupChildren(voxelStackGroup);
            const maxH = getMaxHeight();
            const blockH = Math.min(0.36, maxH / Math.max(1, maxLimit));
            const ringY = trackCenter.y + 0.24 + maxLimit * blockH;
            limitRingGroup.position.y = ringY;

            for (let i = 0; i < count; i++) {
                const isTop = i === count - 1;
                const mat = new THREE.MeshPhongMaterial({
                    color: isTop ? C.amber : (i % 2 === 0 ? C.leaf : C.leafDark),
                    emissive: isTop ? 0x3d2808 : 0x0d260e
                });
                const box = new THREE.Mesh(new THREE.BoxGeometry(0.92, Math.max(0.06, blockH - 0.03), 0.92), mat);
                box.position.set(0, i * blockH + blockH * 0.5, 0);
                voxelStackGroup.add(box);
            }
        }

        function updateLimitUI() {
            const raw = parseInt(document.getElementById('countTo')?.value, 10) || 5;
            activeMax = Math.min(20, Math.max(1, raw));
            limitSprite = replaceSprite(
                toolkit,
                limitRingGroup,
                limitSprite,
                'Limit Ring: ' + activeMax,
                { border: '#e8b04b', fontSize: 20, scale: 0.92 },
                new THREE.Vector3(0, 0.55, 0)
            );
            rebuildVoxelStack(stackedCount, activeMax);
        }

        function syncPositionOnTrack(angle) {
            const x = trackCenter.x - Math.sin(angle) * trackRadius;
            const z = trackCenter.z + Math.cos(angle) * trackRadius;
            runnerGroup.position.set(x, trackCenter.y + 0.35, z);
        }
        syncPositionOnTrack(0);

        toolkit.hookGlobalFunction('runWhileLoop', function() {
            updateLimitUI();
            stackedCount = 0;
            currentAngle = 0;
            targetAngle = activeMax * Math.PI * 2;
            onExitRamp = true;
            exitProgress = 0;
            condGemMat.color.setHex(C.leaf);
            runnerMat.color.setHex(C.leaf);
            stage.setCaption('Running while loop: orbiting ' + activeMax + ' laps and stacking blocks until counter == ' + activeMax + ' triggers Exit Ramp.');
        });

        toolkit.hookGlobalFunction('stepWhileLoop', function() {
            updateLimitUI();
            const stepVal = typeof loopCounter !== 'undefined' ? loopCounter : 1;
            const maxVal = typeof loopMax !== 'undefined' ? loopMax : activeMax;

            if (stepVal <= maxVal) {
                onExitRamp = false;
                exitProgress = 0;
                stackedCount = stepVal;
                rebuildVoxelStack(stackedCount, maxVal);
                targetAngle = stepVal * Math.PI * 2;
                incPulse = 1.0;

                condGemMat.color.setHex(C.leaf);
                runnerMat.color.setHex(C.leaf);
                condSprite = replaceSprite(
                    toolkit,
                    archGroup,
                    condSprite,
                    'Check: ' + (stepVal - 1) + ' < ' + maxVal + ' [True]',
                    { border: '#66c032', fontSize: 20, scale: 1.0 },
                    new THREE.Vector3(0, 2.72, 0)
                );
                runnerSprite = replaceSprite(
                    toolkit,
                    runnerGroup,
                    runnerSprite,
                    'counter = ' + stepVal,
                    { border: '#66c032', fontSize: 20, scale: 0.88 },
                    new THREE.Vector3(0, 0.65, 0)
                );
                stage.setCaption('Step ' + stepVal + '/' + maxVal + ': Condition (' + (stepVal - 1) + ' < ' + maxVal + ') is True -> Boomerang orbits & stacks voxel #' + stepVal + '.');
            } else {
                onExitRamp = true;
                condGemMat.color.setHex(C.error);
                runnerMat.color.setHex(C.amber);
                condSprite = replaceSprite(
                    toolkit,
                    archGroup,
                    condSprite,
                    'Check: ' + maxVal + ' < ' + maxVal + ' [False]',
                    { border: '#de6852', fontSize: 20, scale: 1.0 },
                    new THREE.Vector3(0, 2.72, 0)
                );
                runnerSprite = replaceSprite(
                    toolkit,
                    runnerGroup,
                    runnerSprite,
                    'Exited (counter = ' + maxVal + ')',
                    { border: '#e8b04b', fontSize: 20, scale: 0.92 },
                    new THREE.Vector3(0, 0.65, 0)
                );
                stage.setCaption('Termination Check: counter (' + maxVal + ') < ' + maxVal + ' is False -> Gate switches to Exit Ramp!');
            }
        });

        toolkit.hookGlobalFunction('resetLoop', function() {
            updateLimitUI();
            stackedCount = 0;
            currentAngle = 0;
            targetAngle = 0;
            onExitRamp = false;
            exitProgress = 0;
            rebuildVoxelStack(0, activeMax);
            syncPositionOnTrack(0);

            condGemMat.color.setHex(C.leaf);
            runnerMat.color.setHex(C.leaf);
            condSprite = replaceSprite(
                toolkit,
                archGroup,
                condSprite,
                'Condition: counter < ' + activeMax,
                { border: '#66c032', fontSize: 20, scale: 1.0 },
                new THREE.Vector3(0, 2.72, 0)
            );
            runnerSprite = replaceSprite(
                toolkit,
                runnerGroup,
                runnerSprite,
                'counter = 0',
                { border: '#66c032', fontSize: 20, scale: 0.88 },
                new THREE.Vector3(0, 0.65, 0)
            );
            stage.setCaption('Loop reset: counter = 0 at Condition Arch. Click Run or Step Through to orbit.');
        });

        const countInput = document.getElementById('countTo');
        if (countInput) {
            countInput.addEventListener('input', updateLimitUI);
        }

        stage.onTick((dt, elapsed) => {
            condGem.rotation.y = elapsed * 1.5;

            if (currentAngle < targetAngle) {
                const speed = Math.max(5.5, (targetAngle - currentAngle) * 3.8);
                const prevLap = Math.floor(currentAngle / (Math.PI * 2));
                currentAngle = Math.min(targetAngle, currentAngle + speed * dt);
                const newLap = Math.floor(currentAngle / (Math.PI * 2));

                if (newLap > prevLap && stackedCount < newLap) {
                    stackedCount = Math.min(activeMax, newLap);
                    rebuildVoxelStack(stackedCount, activeMax);
                    incPulse = 1.0;
                    runnerSprite = replaceSprite(
                        toolkit,
                        runnerGroup,
                        runnerSprite,
                        'counter = ' + stackedCount,
                        { border: '#66c032', fontSize: 20, scale: 0.88 },
                        new THREE.Vector3(0, 0.65, 0)
                    );
                }

                syncPositionOnTrack(currentAngle);
            } else if (onExitRamp) {
                if (stackedCount < activeMax) {
                    stackedCount = activeMax;
                    rebuildVoxelStack(stackedCount, activeMax);
                }
                condGemMat.color.setHex(C.error);
                condSprite = replaceSprite(
                    toolkit,
                    archGroup,
                    condSprite,
                    'Check: ' + activeMax + ' < ' + activeMax + ' [False]',
                    { border: '#de6852', fontSize: 20, scale: 1.0 },
                    new THREE.Vector3(0, 2.72, 0)
                );
                exitProgress = Math.min(1, exitProgress + dt * 1.8);
                exitSwitchBar.rotation.y = exitProgress * 0.65;
                const rx = trackCenter.x + exitProgress * 3.1;
                const rz = trackCenter.z + trackRadius;
                runnerGroup.position.set(rx, trackCenter.y + 0.35, rz);
            } else {
                exitSwitchBar.rotation.y += (0 - exitSwitchBar.rotation.y) * Math.min(1, dt * 6);
            }

            if (incPulse > 0) {
                incPulse = Math.max(0, incPulse - dt * 2.5);
                incPad.scale.set(1 + incPulse * 0.35, 1 + incPulse * 0.8, 1 + incPulse * 0.35);
            }
        });

        updateLimitUI();
    };

    // ==========================================================================
    // CARD 10: 3D RIVER STEPPING STONES & EXCLUDED STOP BARRIER (range())
    // ==========================================================================
    window.ThreeScenes8To15.card_10 = function(toolkit) {
        const container = findVizContainer('stepping-stones', 2);
        const stage = toolkit.createStage(
            container,
            '3D River Stepping Stones & Non-Inclusive stop Barrier',
            'range(start, stop, step) raises stepping stones across the river and halts before the excluded stop barrier.'
        );
        if (!stage) return;

        const C = toolkit.COLORS;
        stage.setCameraOrbit(0.16, 0.46, 10.9);

        // River water bed & grassy banks
        const waterMat = new THREE.MeshPhongMaterial({
            color: C.magic,
            transparent: true,
            opacity: 0.72,
            shininess: 90
        });
        const waterMesh = new THREE.Mesh(new THREE.BoxGeometry(9.2, 0.22, 4.4), waterMat);
        waterMesh.position.set(0, -1.45, 0);
        stage.scene.add(waterMesh);

        const bankMat = new THREE.MeshLambertMaterial({ color: C.leafDark });
        const leftBank = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.55, 4.6), bankMat);
        leftBank.position.set(-5.1, -1.28, 0);
        stage.scene.add(leftBank);

        const rightBank = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.55, 4.6), bankMat);
        rightBank.position.set(5.1, -1.28, 0);
        stage.scene.add(rightBank);

        const stonesGroup = new THREE.Group();
        stage.scene.add(stonesGroup);

        // Hopping Traveler Orb
        const hopperGroup = new THREE.Group();
        hopperGroup.position.set(-4.8, -0.6, 0);
        stage.scene.add(hopperGroup);

        const hopperMat = new THREE.MeshPhongMaterial({ color: C.amber, emissive: 0x55360a, shininess: 100 });
        const hopperMesh = new THREE.Mesh(new THREE.SphereGeometry(0.28, 20, 20), hopperMat);
        hopperGroup.add(hopperMesh);

        let hopperSprite = toolkit.makeTextSprite('ii', {
            border: '#e8b04b',
            fontSize: 20,
            scale: 0.85
        });
        hopperSprite.position.set(0, 0.62, 0);
        hopperGroup.add(hopperSprite);

        let hopTargets = [];
        let hopSegment = 0;
        let hopT = 0;

        function buildRiverStones() {
            clearGroupChildren(stonesGroup);

            const start = parseInt(document.getElementById('rangeStart')?.value, 10) || 0;
            const stop = parseInt(document.getElementById('rangeStop')?.value, 10) || 0;
            const step = parseInt(document.getElementById('rangeStep')?.value, 10);

            hopTargets = [ { pos: new THREE.Vector3(-4.8, -0.6, 0), val: 'start', padMat: null } ];
            hopSegment = 0;
            hopT = 0;
            hopperGroup.position.set(-4.8, -0.6, 0);

            if (isNaN(step) || step === 0) {
                const errGate = toolkit.makeTextSprite('ValueError: step cannot be 0', {
                    border: '#de6852',
                    fontSize: 22,
                    scale: 1.15
                });
                errGate.position.set(0, 0.4, 0);
                stonesGroup.add(errGate);
                stage.setCaption('ValueError: range() arg 3 (step) must not be zero!');
                return;
            }

            const isEmpty = (step > 0 && start >= stop) || (step < 0 && start <= stop);
            const generated = [];
            if (!isEmpty) {
                const maxGen = 9;
                if (step > 0) {
                    for (let i = start; i < stop && generated.length < maxGen; i += step) {
                        generated.push(i);
                    }
                } else {
                    for (let i = start; i > stop && generated.length < maxGen; i += step) {
                        generated.push(i);
                    }
                }
            }

            // Build combined display items: generated stones + sunken skipped stones between them
            const items = [];
            const dir = step > 0 ? 1 : -1;
            for (let g = 0; g < generated.length; g++) {
                const val = generated[g];
                items.push({ val, type: 'generated' });
                const nextVal = (g + 1 < generated.length) ? generated[g + 1] : stop;
                if (Math.abs(step) > 1 && items.length < 13) {
                    const skippedVal = val + dir;
                    if ((dir > 0 && skippedVal < nextVal) || (dir < 0 && skippedVal > nextVal)) {
                        items.push({ val: skippedVal, type: 'skipped' });
                    }
                }
            }

            const startX = -3.65;
            const endX = 2.45;
            const count = Math.max(1, items.length);
            const stepX = count > 1 ? (endX - startX) / count : 0;

            items.forEach((item, idx) => {
                const sx = startX + idx * stepX;
                if (item.type === 'generated') {
                    const stoneBase = new THREE.Mesh(
                        new THREE.BoxGeometry(0.68, 0.52, 0.68),
                        new THREE.MeshLambertMaterial({ color: C.bark })
                    );
                    stoneBase.position.set(sx, -1.12, 0);
                    stonesGroup.add(stoneBase);

                    const padMat = new THREE.MeshPhongMaterial({
                        color: C.leaf,
                        emissive: 0x163814
                    });
                    const stonePad = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.14, 0.74), padMat);
                    stonePad.position.set(sx, -0.8, 0);
                    stonesGroup.add(stonePad);

                    const lbl = toolkit.makeTextSprite('[' + item.val + ']', {
                        border: '#66c032',
                        fontSize: 20,
                        scale: 0.82
                    });
                    lbl.position.set(sx, -0.25, 0.45);
                    stonesGroup.add(lbl);

                    hopTargets.push({
                        pos: new THREE.Vector3(sx, -0.45, 0),
                        val: item.val,
                        padMat
                    });
                } else {
                    // Sunken skipped stone
                    const sunken = new THREE.Mesh(
                        new THREE.BoxGeometry(0.46, 0.25, 0.46),
                        new THREE.MeshLambertMaterial({ color: C.slate, transparent: true, opacity: 0.65 })
                    );
                    sunken.position.set(sx, -1.36, 0.35);
                    stonesGroup.add(sunken);

                    const skipLbl = toolkit.makeTextSprite(String(item.val), {
                        border: '#3a2d1b',
                        color: '#9db0a6',
                        fontSize: 17,
                        scale: 0.62
                    });
                    skipLbl.position.set(sx, -0.95, 0.55);
                    stonesGroup.add(skipLbl);
                }
            });

            // Excluded stop Barrier Gate at x = 3.55
            const barrierX = 3.55;
            const barrierGroup = new THREE.Group();
            barrierGroup.position.set(barrierX, -1.35, 0);
            stonesGroup.add(barrierGroup);

            const pylonMat = new THREE.MeshPhongMaterial({ color: C.error, emissive: 0x441111 });
            const pylonL = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 1.85, 10), pylonMat);
            pylonL.position.set(0, 0.9, -0.85);
            barrierGroup.add(pylonL);

            const pylonR = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 1.85, 10), pylonMat);
            pylonR.position.set(0, 0.9, 0.85);
            barrierGroup.add(pylonR);

            const laserBar1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 1.75), pylonMat);
            laserBar1.position.set(0, 1.35, 0);
            barrierGroup.add(laserBar1);

            const laserBar2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 1.75), pylonMat);
            laserBar2.position.set(0, 0.75, 0);
            barrierGroup.add(laserBar2);

            const excludedStone = new THREE.Mesh(
                new THREE.BoxGeometry(0.65, 0.3, 0.65),
                new THREE.MeshLambertMaterial({ color: 0x4a2323 })
            );
            excludedStone.position.set(0.35, 0.1, 0);
            barrierGroup.add(excludedStone);

            const stopSprite = toolkit.makeTextSprite('stop = ' + stop + ' [Excluded]', {
                border: '#de6852',
                fontSize: 21,
                scale: 1.05
            });
            stopSprite.position.set(0, 2.15, 0);
            barrierGroup.add(stopSprite);

            if (isEmpty) {
                stage.setCaption('Empty range(' + start + ', ' + stop + ', ' + step + '): 0 stepping stones generated; halts before stop = ' + stop + '.');
            } else {
                stage.setCaption('range(' + start + ', ' + stop + ', ' + step + ') visits [' + generated.join(', ') + '] and stops right before excluded stop = ' + stop + '.');
            }
        }

        stage.onTick((dt, elapsed) => {
            waterMesh.position.y = -1.45 + Math.sin(elapsed * 2.2) * 0.03;

            if (hopTargets.length > 1 && hopSegment < hopTargets.length - 1) {
                hopT += dt * 2.2;
                const from = hopTargets[hopSegment].pos;
                const to = hopTargets[hopSegment + 1].pos;

                if (hopT >= 1.0) {
                    hopT = 0;
                    hopSegment++;
                    const landed = hopTargets[hopSegment];
                    hopperGroup.position.copy(landed.pos);
                    if (landed.padMat) {
                        landed.padMat.color.setHex(C.amber);
                        landed.padMat.emissive.setHex(0x4a3008);
                    }
                    hopperSprite = replaceSprite(
                        toolkit,
                        hopperGroup,
                        hopperSprite,
                        'ii = ' + landed.val,
                        { border: '#66c032', fontSize: 20, scale: 0.88 },
                        new THREE.Vector3(0, 0.62, 0)
                    );
                } else {
                    hopperGroup.position.lerpVectors(from, to, hopT);
                    hopperGroup.position.y += Math.sin(hopT * Math.PI) * 0.72;
                }
            } else {
                hopperMesh.position.y = Math.sin(elapsed * 3.6) * 0.05;
            }
        });

        toolkit.hookGlobalFunction('runForLoop', buildRiverStones);
        buildRiverStones();
    };

    // ==========================================================================
    // CARD 11: 3D INDEXED VOXEL CRATE RACK (LISTS)
    // ==========================================================================
    window.ThreeScenes8To15.card_11 = function(toolkit) {
        const container = findVizContainer('list-display', 1);
        const stage = toolkit.createStage(
            container,
            '3D Indexed Voxel Crate Rack — Lists',
            'Ordered crates labeled with positive index [0..n-1] on top, negative index [-n..-1] below, and 3D Selector Spotlight.'
        );
        if (!stage) return;

        const C = toolkit.COLORS;
        stage.setCameraOrbit(0.14, 0.36, 10.4);

        // Support rack rails
        const railMat = new THREE.MeshLambertMaterial({ color: C.barkDark });
        const railFront = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.16, 0.18), railMat);
        railFront.position.set(0, -1.05, 0.45);
        stage.scene.add(railFront);

        const railBack = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.16, 0.18), railMat);
        railBack.position.set(0, -1.05, -0.45);
        stage.scene.add(railBack);

        const cratesGroup = new THREE.Group();
        stage.scene.add(cratesGroup);

        // 3D Selector Spotlight Rig
        const spotlightGroup = new THREE.Group();
        spotlightGroup.position.set(0, 0, 0);
        stage.scene.add(spotlightGroup);

        const coneMat = new THREE.MeshBasicMaterial({
            color: C.amber,
            transparent: true,
            opacity: 0.2,
            side: THREE.DoubleSide
        });
        const coneMesh = new THREE.Mesh(new THREE.ConeGeometry(0.85, 2.7, 20, 1, true), coneMat);
        coneMesh.position.set(0, 0.45, 0);
        spotlightGroup.add(coneMesh);

        const emitterMat = new THREE.MeshPhongMaterial({ color: C.amber, emissive: 0x553808, shininess: 90 });
        const emitterOrb = new THREE.Mesh(new THREE.OctahedronGeometry(0.24, 0), emitterMat);
        emitterOrb.position.set(0, 1.85, 0);
        spotlightGroup.add(emitterOrb);

        const ringHalo = new THREE.Mesh(
            new THREE.RingGeometry(0.62, 0.76, 28),
            new THREE.MeshBasicMaterial({ color: C.amber, side: THREE.DoubleSide })
        );
        ringHalo.rotation.x = -Math.PI / 2;
        ringHalo.position.set(0, -0.94, 0);
        spotlightGroup.add(ringHalo);

        let targetSpotlightX = 0;
        let crateXPositions = [];

        function getListState() {
            const listRef = (typeof myList !== 'undefined' && Array.isArray(myList)) ? myList : [];
            const selRef = (typeof selectedSlot !== 'undefined') ? selectedSlot : 0;
            return { list: listRef, selected: selRef };
        }

        function rebuildCrates() {
            clearGroupChildren(cratesGroup);
            crateXPositions = [];

            const { list, selected } = getListState();
            const n = list.length;

            if (n === 0) {
                spotlightGroup.visible = false;
                const emptyLbl = toolkit.makeTextSprite('my_list = [] (Empty Rack)', {
                    border: '#e8b04b',
                    fontSize: 22,
                    scale: 1.15
                });
                emptyLbl.position.set(0, 0, 0);
                cratesGroup.add(emptyLbl);
                stage.setCaption('my_list is empty (len == 0). Append an item to place a crate at index [0] / [-1].');
                return;
            }

            spotlightGroup.visible = true;
            const spacing = Math.min(1.85, 8.2 / Math.max(1, n));
            const startX = -((n - 1) * spacing) / 2;

            list.forEach((item, idx) => {
                const cx = startX + idx * spacing;
                crateXPositions.push(cx);

                const isSelected = idx === selected;
                const negIdx = idx - n;

                const crateNode = new THREE.Group();
                crateNode.position.set(cx, isSelected ? -0.32 : -0.48, 0);
                cratesGroup.add(crateNode);

                const boxMat = new THREE.MeshPhongMaterial({
                    color: isSelected ? C.leaf : C.bark,
                    emissive: isSelected ? 0x1a3d18 : 0x1a120a,
                    shininess: 50
                });
                const box = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.95, 0.95), boxMat);
                crateNode.add(box);

                const frameEdges = new THREE.LineSegments(
                    new THREE.EdgesGeometry(new THREE.BoxGeometry(1.07, 0.97, 0.97)),
                    new THREE.LineBasicMaterial({ color: isSelected ? C.amber : 0x8c6d46 })
                );
                crateNode.add(frameEdges);

                // Top Sprite: Positive Index [0], [1]...
                const posSprite = toolkit.makeTextSprite('[' + idx + ']', {
                    border: '#66c032',
                    fontSize: 22,
                    scale: 0.82
                });
                posSprite.position.set(0, 0.85, 0);
                crateNode.add(posSprite);

                // Center Sprite: Item Value
                const valSprite = toolkit.makeTextSprite('"' + item + '"', {
                    border: isSelected ? '#e8b04b' : '#f5efe0',
                    fontSize: 21,
                    scale: 0.9
                });
                valSprite.position.set(0, 0.02, 0.62);
                crateNode.add(valSprite);

                // Bottom Sprite: Negative Index [-n..-1]
                const negSprite = toolkit.makeTextSprite('[' + negIdx + ']', {
                    border: '#e8b04b',
                    color: '#ffeab3',
                    fontSize: 20,
                    scale: 0.78
                });
                negSprite.position.set(0, -0.85, 0.2);
                crateNode.add(negSprite);
            });

            const activeIdx = (selected !== null && selected >= 0 && selected < n) ? selected : 0;
            targetSpotlightX = crateXPositions[activeIdx] || 0;
            coneMat.color.setHex(C.amber);
            emitterMat.color.setHex(C.amber);
            ringHalo.material.color.setHex(C.amber);

            const itemVal = list[activeIdx];
            const negIndex = activeIdx - n;
            stage.setCaption(
                'Spotlight on crate [' + activeIdx + '] / [' + negIndex + '] -> "' + itemVal + '" (len == ' + n + ').'
            );
        }

        function checkIndexErrorFeedback() {
            const outText = document.getElementById('list-output')?.textContent || '';
            if (outText.includes('IndexError')) {
                coneMat.color.setHex(C.error);
                emitterMat.color.setHex(C.error);
                ringHalo.material.color.setHex(C.error);
                targetSpotlightX = 4.3;
                stage.setCaption(outText);
            }
        }

        stage.onTick((dt, elapsed) => {
            spotlightGroup.position.x += (targetSpotlightX - spotlightGroup.position.x) * Math.min(1, dt * 8);
            emitterOrb.rotation.y = elapsed * 1.8;
            ringHalo.rotation.z = elapsed * 0.8;
        });

        toolkit.hookGlobalFunction('renderList', rebuildCrates);
        toolkit.hookGlobalFunction('inspectSlot', rebuildCrates);
        toolkit.hookGlobalFunction('addItem', rebuildCrates);
        toolkit.hookGlobalFunction('accessItem', () => {
            rebuildCrates();
            checkIndexErrorFeedback();
        });
        toolkit.hookGlobalFunction('removeItem', () => {
            rebuildCrates();
            checkIndexErrorFeedback();
        });
        toolkit.hookGlobalFunction('resetList', rebuildCrates);

        rebuildCrates();
    };

    // ==========================================================================
    // CARD 12: 3D ARCANE FUNCTION MACHINE (def HOPPERS, GEARS, return CHUTE)
    // ==========================================================================
    window.ThreeScenes8To15.card_12 = function(toolkit) {
        const container = findVizContainer('functionType', 1);
        const stage = toolkit.createStage(
            container,
            '3D Arcane Function Machine — def Hoppers, Gear Chamber & return Chute',
            'Arguments drop into the left def Hoppers, spin the central Function Chamber gears, and eject a Return Crystal.'
        );
        if (!stage) return;

        const C = toolkit.COLORS;
        stage.setCameraOrbit(0.2, 0.4, 10.6);

        // Left: Input Hoppers (x = -3.4)
        const hopperGroup = new THREE.Group();
        hopperGroup.position.set(-3.4, -0.35, 0);
        stage.scene.add(hopperGroup);

        const funnelMat = new THREE.MeshPhongMaterial({ color: C.bark, shininess: 40 });
        const funnel1 = new THREE.Mesh(new THREE.ConeGeometry(0.65, 0.8, 12, 1, true), funnelMat);
        funnel1.rotation.x = Math.PI;
        funnel1.position.set(0, 0.65, -0.55);
        hopperGroup.add(funnel1);

        const funnel2 = new THREE.Mesh(new THREE.ConeGeometry(0.65, 0.8, 12, 1, true), funnelMat);
        funnel2.rotation.x = Math.PI;
        funnel2.position.set(0, 0.65, 0.55);
        hopperGroup.add(funnel2);

        const pipeMat = new THREE.MeshLambertMaterial({ color: C.slate });
        const intakePipe = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 2.0, 12), pipeMat);
        intakePipe.rotation.z = Math.PI / 2;
        intakePipe.position.set(1.15, 0.05, 0);
        hopperGroup.add(intakePipe);

        let hopperSprite = toolkit.makeTextSprite('Input Args', {
            border: '#e8b04b',
            fontSize: 20,
            scale: 0.98
        });
        hopperSprite.position.set(0, 1.75, 0);
        hopperGroup.add(hopperSprite);

        // Argument spheres dropping into hoppers
        const argSphere1 = new THREE.Mesh(
            new THREE.SphereGeometry(0.24, 16, 16),
            new THREE.MeshPhongMaterial({ color: C.amber, emissive: 0x442b06 })
        );
        stage.scene.add(argSphere1);

        const argSphere2 = new THREE.Mesh(
            new THREE.SphereGeometry(0.24, 16, 16),
            new THREE.MeshPhongMaterial({ color: C.magic, emissive: 0x102b44 })
        );
        stage.scene.add(argSphere2);

        // Center: Function Machine & Spinning Gears (x = 0)
        const machineGroup = new THREE.Group();
        machineGroup.position.set(0, -0.35, 0);
        stage.scene.add(machineGroup);

        const chassisMat = new THREE.MeshPhongMaterial({ color: C.slate, shininess: 50 });
        const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.65, 2.05, 1.55), chassisMat);
        machineGroup.add(chassis);

        const chassisTrim = new THREE.LineSegments(
            new THREE.EdgesGeometry(new THREE.BoxGeometry(2.68, 2.08, 1.58)),
            new THREE.LineBasicMaterial({ color: C.leaf })
        );
        machineGroup.add(chassisTrim);

        // Helper to build a 3D toothed gear
        function makeGear(radius, teeth, colorHex) {
            const gear = new THREE.Group();
            const gMat = new THREE.MeshPhongMaterial({ color: colorHex, shininess: 80 });
            const disc = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, 0.18, 20), gMat);
            disc.rotation.x = Math.PI / 2;
            gear.add(disc);

            for (let i = 0; i < teeth; i++) {
                const angle = (i / teeth) * Math.PI * 2;
                const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.22, 0.2), gMat);
                tooth.position.set(Math.cos(angle) * (radius + 0.06), Math.sin(angle) * (radius + 0.06), 0);
                tooth.rotation.z = angle;
                gear.add(tooth);
            }
            return gear;
        }

        const gear1 = makeGear(0.46, 8, C.amber);
        gear1.position.set(-0.55, 0.15, 0.85);
        machineGroup.add(gear1);

        const gear2 = makeGear(0.36, 6, C.leaf);
        gear2.position.set(0.32, -0.22, 0.85);
        machineGroup.add(gear2);

        const gear3 = makeGear(0.3, 6, C.magic);
        gear3.position.set(0.68, 0.42, 0.85);
        machineGroup.add(gear3);

        let defSprite = toolkit.makeTextSprite('def add(a, b):', {
            border: '#66c032',
            fontSize: 22,
            scale: 1.08
        });
        defSprite.position.set(0, 1.68, 0);
        machineGroup.add(defSprite);

        let bodySprite = toolkit.makeTextSprite('return a + b', {
            border: '#4a86c0',
            fontSize: 20,
            scale: 0.95
        });
        bodySprite.position.set(0, -1.35, 0.6);
        machineGroup.add(bodySprite);

        // Right: return Chute & Output Pedestal (x = 3.4)
        const outGroup = new THREE.Group();
        outGroup.position.set(3.4, -0.35, 0);
        stage.scene.add(outGroup);

        const outChute = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 2.0, 12), pipeMat);
        outChute.rotation.z = Math.PI / 2;
        outChute.position.set(-1.15, -0.05, 0);
        outGroup.add(outChute);

        const pedestal = new THREE.Mesh(
            new THREE.CylinderGeometry(0.85, 1.0, 0.55, 8),
            new THREE.MeshLambertMaterial({ color: C.leafDark })
        );
        pedestal.position.set(0, -0.82, 0);
        outGroup.add(pedestal);

        // Return Crystal
        const crystalGroup = new THREE.Group();
        crystalGroup.position.set(3.4, 0.1, 0);
        stage.scene.add(crystalGroup);

        const crystalMat = new THREE.MeshPhongMaterial({
            color: C.leaf,
            emissive: 0x1d4d1a,
            shininess: 100
        });
        const crystalMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), crystalMat);
        crystalGroup.add(crystalMesh);

        let returnSprite = toolkit.makeTextSprite('return -> 8', {
            border: '#66c032',
            fontSize: 22,
            scale: 1.05
        });
        returnSprite.position.set(0, 0.88, 0);
        crystalGroup.add(returnSprite);

        // Pipeline animation progress (0..1.4)
        let pipelineTime = 0;

        function triggerFunctionPipeline() {
            pipelineTime = 0;
            const fnType = document.getElementById('functionType')?.value || 'add';
            const inTxt = document.getElementById('fn-stage-input-val')?.textContent || 'a = 5, b = 3';
            const bodyTxt = document.getElementById('fn-stage-body-val')?.textContent || 'return 5 + 3';
            const outTxt = document.getElementById('fn-stage-output-val')?.textContent || '8';

            const sigMap = {
                add: 'def add(a, b):',
                multiply: 'def multiply(a, b):',
                greet: 'def greet(name):',
                is_even: 'def is_even(n):'
            };

            argSphere2.visible = (fnType === 'add' || fnType === 'multiply');

            hopperSprite = replaceSprite(
                toolkit,
                hopperGroup,
                hopperSprite,
                'Args: ' + inTxt,
                { border: '#e8b04b', fontSize: 20, scale: 0.98 },
                new THREE.Vector3(0, 1.75, 0)
            );
            defSprite = replaceSprite(
                toolkit,
                machineGroup,
                defSprite,
                sigMap[fnType] || 'def fn():',
                { border: '#66c032', fontSize: 22, scale: 1.08 },
                new THREE.Vector3(0, 1.68, 0)
            );
            bodySprite = replaceSprite(
                toolkit,
                machineGroup,
                bodySprite,
                bodyTxt,
                { border: '#4a86c0', fontSize: 20, scale: 0.95 },
                new THREE.Vector3(0, -1.35, 0.6)
            );
            returnSprite = replaceSprite(
                toolkit,
                crystalGroup,
                returnSprite,
                'return -> ' + outTxt,
                { border: '#66c032', fontSize: 22, scale: 1.05 },
                new THREE.Vector3(0, 0.88, 0)
            );

            stage.setCaption(
                (sigMap[fnType] || 'def fn():') + ' receives (' + inTxt + '), evaluates (' + bodyTxt + '), and ejects return value ' + outTxt + '.'
            );
        }

        stage.onTick((dt, elapsed) => {
            pipelineTime = Math.min(1.5, pipelineTime + dt);

            // Phase 1 (0..0.5s): Arg spheres drop into hoppers & slide into chamber
            if (pipelineTime < 0.5) {
                const t = pipelineTime / 0.5;
                const ax = -3.4 + Math.max(0, (t - 0.4) / 0.6) * 2.2;
                const ay = 1.6 - Math.min(1, t / 0.4) * 1.9;
                argSphere1.position.set(ax, ay, -0.55 * (1 - t));
                argSphere2.position.set(ax, ay, 0.55 * (1 - t));
                argSphere1.scale.setScalar(1);
                argSphere2.scale.setScalar(1);
            } else {
                argSphere1.scale.setScalar(0.001);
                argSphere2.scale.setScalar(0.001);
            }

            // Phase 2 (0.4..1.05s): Rapid gear spin inside Function Machine
            const gearBoost = (pipelineTime >= 0.35 && pipelineTime <= 1.05) ? 6.5 : 0.8;
            gear1.rotation.z -= dt * gearBoost;
            gear2.rotation.z += dt * gearBoost * 1.3;
            gear3.rotation.z -= dt * gearBoost * 1.5;

            // Phase 3 (0.9..1.4s): Return Crystal ejects from chute onto pedestal
            if (pipelineTime < 0.9) {
                crystalGroup.position.set(1.2, -0.35, 0);
                crystalGroup.scale.setScalar(0.2);
            } else {
                const ct = Math.min(1, (pipelineTime - 0.9) / 0.45);
                crystalGroup.position.set(1.2 + ct * 2.2, -0.25 + Math.sin(ct * Math.PI) * 0.45 + ct * 0.4, 0);
                crystalGroup.scale.setScalar(0.2 + ct * 0.8);
            }

            crystalMesh.rotation.y = elapsed * 1.6;
            crystalMesh.position.y = Math.sin(elapsed * 3.0) * 0.06;
        });

        toolkit.hookGlobalFunction('updateFunction', triggerFunctionPipeline);
        toolkit.hookGlobalFunction('callFunction', triggerFunctionPipeline);
        triggerFunctionPipeline();
    };

    // ==========================================================================
    // CARD 13: 3D KEY-HASH RING OF RUNIC CHESTS (DICTIONARIES)
    // ==========================================================================
    window.ThreeScenes8To15.card_13 = function(toolkit) {
        const container = findVizContainer('dict-display', 1);
        const stage = toolkit.createStage(
            container,
            '3D Key-Hash Ring of Runic Chests — Dictionaries',
            'Central Hash Pedestal fires a direct lookup beam to person[key] to pop open its chest and reveal its value gem.'
        );
        if (!stage) return;

        const C = toolkit.COLORS;
        stage.setCameraOrbit(0.35, 0.56, 10.8);

        // Central Hash Pedestal
        const pedGroup = new THREE.Group();
        pedGroup.position.set(0, -1.45, 0);
        stage.scene.add(pedGroup);

        const pedBase = new THREE.Mesh(
            new THREE.CylinderGeometry(0.75, 0.95, 0.7, 8),
            new THREE.MeshLambertMaterial({ color: C.slate })
        );
        pedBase.position.set(0, 0.35, 0);
        pedGroup.add(pedBase);

        const prismMat = new THREE.MeshPhongMaterial({
            color: C.leaf,
            emissive: 0x1d4d1a,
            shininess: 100
        });
        const hashPrism = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), prismMat);
        hashPrism.position.set(0, 1.15, 0);
        pedGroup.add(hashPrism);

        let hashSprite = toolkit.makeTextSprite('hash("name")', {
            border: '#66c032',
            fontSize: 20,
            scale: 0.96
        });
        hashSprite.position.set(0, 1.95, 0);
        pedGroup.add(hashSprite);

        // Error shockwave ring for KeyError
        const errorRingMat = new THREE.MeshBasicMaterial({
            color: C.error,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide
        });
        const errorRing = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.75, 32), errorRingMat);
        errorRing.rotation.x = -Math.PI / 2;
        errorRing.position.set(0, 0.8, 0);
        pedGroup.add(errorRing);

        // Direct Laser Beam from center pedestal to active chest
        const beamGroup = new THREE.Group();
        beamGroup.position.set(0, -0.35, 0);
        stage.scene.add(beamGroup);

        const beamMat = new THREE.MeshBasicMaterial({
            color: C.leaf,
            transparent: true,
            opacity: 0.85
        });
        const beamGeo = new THREE.CylinderGeometry(0.06, 0.06, 1, 10);
        beamGeo.rotateX(Math.PI / 2);
        const beamMesh = new THREE.Mesh(beamGeo, beamMat);
        beamGroup.add(beamMesh);

        const pulseOrb = new THREE.Mesh(
            new THREE.SphereGeometry(0.15, 12, 12),
            new THREE.MeshBasicMaterial({ color: C.amber })
        );
        beamGroup.add(pulseOrb);

        const chestsGroup = new THREE.Group();
        stage.scene.add(chestsGroup);

        let chestNodes = [];
        let errorFlashTime = 0;

        function getDictState() {
            const dictRef = (typeof myDict !== 'undefined' && myDict) ? myDict : {};
            const keyRef = (typeof activeKey !== 'undefined') ? activeKey : null;
            return { dict: dictRef, active: keyRef };
        }

        function rebuildChests() {
            clearGroupChildren(chestsGroup);
            chestNodes = [];

            const { dict, active } = getDictState();
            const entries = Object.entries(dict);
            const ringRadius = 3.2;

            if (entries.length === 0) {
                beamGroup.visible = false;
                stage.setCaption('person = {} (Empty Dictionary). Add a key-value pair to forge a Runic Chest.');
                return;
            }

            entries.forEach(([key, val], idx) => {
                const angle = (idx / entries.length) * Math.PI * 2;
                const cx = Math.sin(angle) * ringRadius;
                const cz = Math.cos(angle) * ringRadius;
                const isUnlocked = key === active;

                const chest = new THREE.Group();
                chest.position.set(cx, -1.4, cz);
                chest.lookAt(0, -1.4, 0);
                chestsGroup.add(chest);

                // Chest base
                const baseMesh = new THREE.Mesh(
                    new THREE.BoxGeometry(1.1, 0.62, 0.78),
                    new THREE.MeshLambertMaterial({ color: isUnlocked ? C.bark : C.barkDark })
                );
                baseMesh.position.set(0, 0.31, 0);
                chest.add(baseMesh);

                // Hinged lid pivot at back edge
                const lidPivot = new THREE.Group();
                lidPivot.position.set(0, 0.62, -0.39);
                chest.add(lidPivot);

                const lidMesh = new THREE.Mesh(
                    new THREE.BoxGeometry(1.14, 0.24, 0.82),
                    new THREE.MeshPhongMaterial({
                        color: isUnlocked ? C.amber : C.bark,
                        shininess: 60
                    })
                );
                lidMesh.position.set(0, 0.12, 0.39);
                lidPivot.add(lidMesh);

                // Glowing Value Gem inside chest
                const gemMat = new THREE.MeshPhongMaterial({
                    color: isUnlocked ? C.leaf : C.magic,
                    emissive: isUnlocked ? 0x22551c : 0x0b2238,
                    shininess: 100
                });
                const gemMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.24, 0), gemMat);
                gemMesh.position.set(0, isUnlocked ? 0.95 : 0.45, 0);
                chest.add(gemMesh);

                // Key Sprite on chest front
                const keySprite = toolkit.makeTextSprite('"' + key + '"', {
                    border: isUnlocked ? '#e8b04b' : '#4a86c0',
                    fontSize: 20,
                    scale: 0.86
                });
                keySprite.position.set(0, 0.38, 0.58);
                chest.add(keySprite);

                // Value Sprite above gem
                const valSprite = toolkit.makeTextSprite('-> "' + val + '"', {
                    border: isUnlocked ? '#66c032' : '#3a2d1b',
                    fontSize: 20,
                    scale: isUnlocked ? 0.92 : 0.75
                });
                valSprite.position.set(0, isUnlocked ? 1.55 : 1.08, 0);
                chest.add(valSprite);

                chestNodes.push({
                    key,
                    val,
                    worldPos: new THREE.Vector3(cx, -0.35, cz),
                    lidPivot,
                    gemMesh,
                    targetLidAngle: isUnlocked ? -1.18 : 0,
                    targetGemY: isUnlocked ? 0.95 : 0.45
                });
            });

            const matched = chestNodes.find(c => c.key === active);
            if (matched) {
                beamGroup.visible = true;
                const dist = matched.worldPos.length();
                beamGroup.lookAt(matched.worldPos);
                beamMesh.scale.set(1, 1, dist);
                beamMesh.position.set(0, 0, dist * 0.5);
                beamMat.color.setHex(C.leaf);
                prismMat.color.setHex(C.leaf);
                prismMat.emissive.setHex(0x1d4d1a);

                hashSprite = replaceSprite(
                    toolkit,
                    pedGroup,
                    hashSprite,
                    'person["' + matched.key + '"]',
                    { border: '#66c032', fontSize: 20, scale: 0.96 },
                    new THREE.Vector3(0, 1.95, 0)
                );
                stage.setCaption(
                    'Direct Key Lookup: person["' + matched.key + '"] fires laser beam straight to chest "' + matched.key + '" -> unlocks "' + matched.val + '".'
                );
            } else {
                beamGroup.visible = false;
            }
        }

        function handleLookupResult() {
            rebuildChests();
            const outText = document.getElementById('dict-output')?.textContent || '';
            const lookupKey = document.getElementById('lookupKey')?.value.trim() || 'missing_key';
            if (outText.includes('KeyError')) {
                errorFlashTime = 1.0;
                beamGroup.visible = false;
                prismMat.color.setHex(C.error);
                prismMat.emissive.setHex(0x551111);
                hashSprite = replaceSprite(
                    toolkit,
                    pedGroup,
                    hashSprite,
                    'KeyError: "' + lookupKey + '"',
                    { border: '#de6852', fontSize: 20, scale: 1.0 },
                    new THREE.Vector3(0, 1.95, 0)
                );
                stage.setCaption('KeyError: "' + lookupKey + '" not found in ring of chests! All chests remain locked.');
            }
        }

        stage.onTick((dt, elapsed) => {
            hashPrism.rotation.y = elapsed * 1.5;
            hashPrism.position.y = 1.15 + Math.sin(elapsed * 3.0) * 0.06;

            chestNodes.forEach(c => {
                c.lidPivot.rotation.x += (c.targetLidAngle - c.lidPivot.rotation.x) * Math.min(1, dt * 8);
                c.gemMesh.position.y += (c.targetGemY - c.gemMesh.position.y) * Math.min(1, dt * 8);
                c.gemMesh.rotation.y = elapsed * 2.0;
            });

            if (beamGroup.visible) {
                const pulseZ = ((elapsed * 2.4) % 1.0) * 3.2;
                pulseOrb.position.set(0, 0, pulseZ);
            }

            if (errorFlashTime > 0) {
                errorFlashTime = Math.max(0, errorFlashTime - dt * 1.1);
                const s = 1 + (1 - errorFlashTime) * 4.2;
                errorRing.scale.set(s, s, 1);
                errorRingMat.opacity = errorFlashTime * 0.85;
            } else {
                errorRingMat.opacity = 0;
            }
        });

        toolkit.hookGlobalFunction('renderDict', rebuildChests);
        toolkit.hookGlobalFunction('lookupValue', handleLookupResult);
        toolkit.hookGlobalFunction('quickLookupKey', handleLookupResult);
        toolkit.hookGlobalFunction('addPair', rebuildChests);
        toolkit.hookGlobalFunction('deletePair', rebuildChests);
        toolkit.hookGlobalFunction('resetDict', rebuildChests);

        rebuildChests();
    };

    // ==========================================================================
    // CARD 14: 3D VERTICAL CALL-STACK TOWER & FRACTAL VOXEL BONSAI (RECURSION)
    // ==========================================================================
    window.ThreeScenes8To15.card_14 = function(toolkit) {
        const container = findVizContainer('recursion-steps', 1);
        const stage = toolkit.createStage(
            container,
            '3D Call-Stack Tower & Fractal Voxel Bonsai — Recursion',
            'Phase 1 stacks factorial(n..1) slabs up to the golden Base Case crown; Phase 2 cascades return values down.'
        );
        if (!stage) return;

        const C = toolkit.COLORS;
        stage.setCameraOrbit(0.22, 0.42, 11.0);

        // Left: Vertical Call-Stack Tower at x = -2.4
        const towerBase = new THREE.Mesh(
            new THREE.BoxGeometry(3.2, 0.24, 2.0),
            new THREE.MeshLambertMaterial({ color: C.slate })
        );
        towerBase.position.set(-2.4, -1.48, 0);
        stage.scene.add(towerBase);

        const stackHeader = toolkit.makeTextSprite('Call Stack: factorial(n)', {
            border: '#4a86c0',
            fontSize: 20,
            scale: 0.96
        });
        stackHeader.position.set(-2.4, 2.35, 0);
        stage.scene.add(stackHeader);

        const stackFramesGroup = new THREE.Group();
        stackFramesGroup.position.set(-2.4, -1.36, 0);
        stage.scene.add(stackFramesGroup);

        // Cascade energy ring sliding along the Call-Stack Tower
        const cascadeRing = new THREE.Mesh(
            new THREE.TorusGeometry(1.15, 0.05, 10, 32),
            new THREE.MeshBasicMaterial({ color: C.amber })
        );
        cascadeRing.rotation.x = Math.PI / 2;
        cascadeRing.position.set(-2.4, -1.2, 0);
        stage.scene.add(cascadeRing);

        // Right: Fractal Voxel Bonsai at x = 2.35
        const potGroup = new THREE.Group();
        potGroup.position.set(2.35, -1.48, 0);
        stage.scene.add(potGroup);

        const potMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(1.1, 0.82, 0.48, 10),
            new THREE.MeshLambertMaterial({ color: C.bark })
        );
        potMesh.position.set(0, 0.24, 0);
        potGroup.add(potMesh);

        const bonsaiHeader = toolkit.makeTextSprite('Fractal Voxel Bonsai', {
            border: '#66c032',
            fontSize: 20,
            scale: 0.96
        });
        bonsaiHeader.position.set(2.35, 2.35, 0);
        stage.scene.add(bonsaiHeader);

        const bonsaiGroup = new THREE.Group();
        bonsaiGroup.position.set(2.35, -1.02, 0);
        stage.scene.add(bonsaiGroup);

        // Animation state for Phase 1 (Call Descent) & Phase 2 (Return Cascade)
        let currentN = 5;
        let frameNodes = [];
        let branchLevels = [];
        let animElapsed = 0;

        function factorialVal(k) {
            let r = 1;
            for (let i = 2; i <= k; i++) r *= i;
            return r;
        }

        function buildRecursionScene() {
            clearGroupChildren(stackFramesGroup);
            clearGroupChildren(bonsaiGroup);
            frameNodes = [];
            branchLevels = [];
            animElapsed = 0;

            const rawN = parseInt(document.getElementById('factInput')?.value, 10);
            if (isNaN(rawN) || rawN < 1 || rawN > 8) {
                stage.setCaption('Enter a valid integer n between 1 and 8 to trace the 3D Call-Stack Tower.');
                return;
            }
            currentN = rawN;

            // 1. Build Call-Stack Slabs from bottom (k = n) up to top (k = 1 Base Case)
            const maxStackH = 2.85;
            const slabH = Math.min(0.42, maxStackH / currentN);

            for (let idx = 0; idx < currentN; idx++) {
                const k = currentN - idx; // n down to 1
                const isBase = k === 1;
                const yPos = idx * slabH + slabH * 0.5;
                const width = 2.4 - idx * (0.9 / Math.max(1, currentN));

                const slabGroup = new THREE.Group();
                slabGroup.position.set(0, yPos, 0);
                stackFramesGroup.add(slabGroup);

                const slabMat = new THREE.MeshPhongMaterial({
                    color: isBase ? C.amber : C.magic,
                    emissive: isBase ? 0x442b06 : 0x0d2136,
                    shininess: 70
                });
                const slabMesh = new THREE.Mesh(
                    new THREE.BoxGeometry(width, Math.max(0.12, slabH - 0.05), 1.15),
                    slabMat
                );
                slabGroup.add(slabMesh);

                if (isBase) {
                    const crown = new THREE.Mesh(
                        new THREE.OctahedronGeometry(0.24, 0),
                        new THREE.MeshPhongMaterial({ color: C.amber, emissive: 0x664408, shininess: 100 })
                    );
                    crown.position.set(0, slabH * 0.5 + 0.24, 0);
                    slabGroup.add(crown);
                }

                const callText = isBase
                    ? 'f(1) -> BASE CASE = 1'
                    : 'f(' + k + ') = ' + k + ' * f(' + (k - 1) + ')';
                const retText = 'f(' + k + ') returns ' + factorialVal(k);

                const label = toolkit.makeTextSprite(callText, {
                    border: isBase ? '#e8b04b' : '#4a86c0',
                    fontSize: 19,
                    scale: 0.86
                });
                label.position.set(0, 0, 0.72);
                slabGroup.add(label);

                frameNodes.push({
                    k,
                    isBase,
                    yWorld: -1.36 + yPos,
                    slabGroup,
                    slabMat,
                    label,
                    callText,
                    retText,
                    inReturnMode: false
                });
            }

            // 2. Build Fractal Voxel Bonsai with depth matching currentN (visually capped at 5 splits)
            const visualDepth = Math.min(currentN, 5);
            for (let d = 0; d <= visualDepth; d++) branchLevels.push([]);

            function growBranch(parent, length, radius, depthLeft, levelIdx) {
                const branchGroup = new THREE.Group();
                parent.add(branchGroup);

                const isLeafTip = depthLeft === 1;
                const bMat = new THREE.MeshPhongMaterial({
                    color: isLeafTip ? C.leaf : C.bark,
                    emissive: isLeafTip ? 0x183d16 : 0x140d06
                });
                const seg = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.75, radius, length, 7), bMat);
                seg.position.set(0, length * 0.5, 0);
                branchGroup.add(seg);
                branchLevels[levelIdx].push(bMat);

                if (depthLeft <= 1) {
                    const leafMat = new THREE.MeshPhongMaterial({
                        color: C.leaf,
                        emissive: 0x224d1e,
                        shininess: 80
                    });
                    const canopy = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.24, 0.36), leafMat);
                    canopy.position.set(0, length + 0.08, 0);
                    branchGroup.add(canopy);
                    branchLevels[levelIdx].push(leafMat);
                    return;
                }

                const spread = 0.48;
                for (let side of [-1, 1]) {
                    const pivot = new THREE.Group();
                    pivot.position.set(0, length, 0);
                    pivot.rotation.z = side * spread;
                    pivot.rotation.y = side * 0.55;
                    branchGroup.add(pivot);
                    growBranch(pivot, length * 0.74, radius * 0.72, depthLeft - 1, levelIdx + 1);
                }
            }

            growBranch(bonsaiGroup, 0.88, 0.16, visualDepth, 0);

            stage.setCaption(
                'Tracing factorial(' + currentN + '): Phase 1 stacks calls up to base case f(1)=1; Phase 2 cascades returns down to ' + factorialVal(currentN) + '.'
            );
        }

        stage.onTick((dt) => {
            if (frameNodes.length === 0) return;

            animElapsed += dt;
            const stepDur = 0.42;
            const totalDownTime = currentN * stepDur;
            const totalUpTime = currentN * stepDur;
            const totalCycle = totalDownTime + totalUpTime + 1.4;
            const t = animElapsed % totalCycle;

            if (t <= totalDownTime) {
                // Phase 1: Stacking upward toward Base Case
                const activeIdx = Math.min(currentN - 1, Math.floor(t / stepDur));
                cascadeRing.position.y = frameNodes[activeIdx].yWorld;
                cascadeRing.material.color.setHex(C.magic);

                frameNodes.forEach((fn, idx) => {
                    fn.slabGroup.visible = idx <= activeIdx;
                    if (fn.inReturnMode) {
                        fn.inReturnMode = false;
                        fn.slabMat.color.setHex(fn.isBase ? C.amber : C.magic);
                        fn.label = replaceSprite(
                            toolkit,
                            fn.slabGroup,
                            fn.label,
                            fn.callText,
                            { border: fn.isBase ? '#e8b04b' : '#4a86c0', fontSize: 19, scale: 0.86 },
                            new THREE.Vector3(0, 0, 0.72)
                        );
                    }
                });
            } else {
                // Phase 2: Base-Case Return Cascade downward
                const upT = t - totalDownTime;
                const returnSteps = Math.min(currentN - 1, Math.floor(upT / stepDur));
                const activeIdx = (currentN - 1) - returnSteps;
                cascadeRing.position.y = frameNodes[activeIdx].yWorld;
                cascadeRing.material.color.setHex(C.leaf);

                frameNodes.forEach((fn, idx) => {
                    fn.slabGroup.visible = true;
                    const resolved = idx >= activeIdx;
                    if (resolved && !fn.inReturnMode) {
                        fn.inReturnMode = true;
                        fn.slabMat.color.setHex(fn.isBase ? C.amber : C.leaf);
                        fn.label = replaceSprite(
                            toolkit,
                            fn.slabGroup,
                            fn.label,
                            fn.retText,
                            { border: '#66c032', fontSize: 19, scale: 0.88 },
                            new THREE.Vector3(0, 0, 0.72)
                        );
                    }
                });
            }

            bonsaiGroup.rotation.y = Math.sin(animElapsed * 0.45) * 0.35;
        });

        toolkit.hookGlobalFunction('visualizeRecursion', buildRecursionScene);
        buildRecursionScene();
    };

    // ==========================================================================
    // CARD 15: 3D MODULAR SYSTEM BLUEPRINT DIORAMA (CAPSTONE ARCHITECTURE)
    // ==========================================================================
    window.ThreeScenes8To15.card_15 = function(toolkit) {
        const container = findVizContainer('blueprint-detail', 0);
        const stage = toolkit.createStage(
            container,
            '3D Modular System Blueprint Diorama — Capstone Architecture',
            'Isometric 3D node network showing glowing data packets flowing across Input, Loop, Conditional, Function, and Data Vault stations.'
        );
        if (!stage) return;

        const C = toolkit.COLORS;
        stage.setCameraOrbit(0.36, 0.56, 11.2);

        const nodes = {};

        function createStation(key, title, colorHex, geoType) {
            const group = new THREE.Group();
            stage.scene.add(group);

            const base = new THREE.Mesh(
                new THREE.CylinderGeometry(0.72, 0.85, 0.26, 8),
                new THREE.MeshLambertMaterial({ color: C.slate })
            );
            base.position.set(0, -1.35, 0);
            group.add(base);

            const iconMat = new THREE.MeshPhongMaterial({
                color: colorHex,
                emissive: 0x122618,
                shininess: 90
            });

            let iconMesh;
            if (geoType === 'torus') {
                iconMesh = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.11, 12, 24), iconMat);
            } else if (geoType === 'octa') {
                iconMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.46, 0), iconMat);
            } else if (geoType === 'box') {
                iconMesh = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.68, 0.68), iconMat);
            } else if (geoType === 'cone') {
                iconMesh = new THREE.Mesh(new THREE.ConeGeometry(0.46, 0.78, 8), iconMat);
            } else {
                iconMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.65, 6), iconMat);
            }
            iconMesh.position.set(0, -0.7, 0);
            group.add(iconMesh);

            const titleSprite = toolkit.makeTextSprite(title, {
                border: '#66c032',
                fontSize: 19,
                scale: 0.88
            });
            titleSprite.position.set(0, 0.15, 0);
            group.add(titleSprite);

            const roleSprite = toolkit.makeTextSprite('Ready', {
                border: '#e8b04b',
                fontSize: 17,
                scale: 0.8
            });
            roleSprite.position.set(0, -0.28, 0.55);
            group.add(roleSprite);

            nodes[key] = {
                group,
                iconMesh,
                iconMat,
                titleSprite,
                roleSprite,
                targetPos: new THREE.Vector3()
            };
        }

        createStation('input', 'Input Dock', C.amber, 'cone');
        createStation('func', 'Function Forge', C.leaf, 'cyl');
        createStation('cond', 'Conditional Switch', C.magic, 'octa');
        createStation('loop', 'Loop Ring', C.amber, 'torus');
        createStation('data', 'Data Vault', C.leaf, 'box');

        const conduitsGroup = new THREE.Group();
        stage.scene.add(conduitsGroup);

        const packetsGroup = new THREE.Group();
        stage.scene.add(packetsGroup);

        let activeEdges = [];
        let packetMeshes = [];

        const LAYOUTS = {
            1: {
                caption: 'Project 01 (Calculator): Input Dock (a, b, op) -> Function Forge (def calculate) -> Conditional Switch (if/elif op) -> Data Vault (return result).',
                positions: {
                    input: new THREE.Vector3(-3.6, 0, 0.8),
                    func:  new THREE.Vector3(-1.2, 0, -0.8),
                    cond:  new THREE.Vector3(1.4, 0, -0.8),
                    data:  new THREE.Vector3(3.6, 0, 0.8),
                    loop:  new THREE.Vector3(0, 0, 2.3)
                },
                roles: {
                    input: 'Args: a, b, op',
                    func:  'def calculate()',
                    cond:  'if op == "+/-/*"',
                    data:  'return result',
                    loop:  'Single Call'
                },
                edges: [
                    ['input', 'func'],
                    ['func', 'cond'],
                    ['cond', 'data']
                ]
            },
            2: {
                caption: 'Project 02 (Guess the Number): Data Vault (secret = 42) -> Loop Ring (while not guessed) <-> Input Dock (guess) -> Conditional Switch (<, >, ==).',
                positions: {
                    data:  new THREE.Vector3(-3.7, 0, 0),
                    loop:  new THREE.Vector3(-1.1, 0, -1.2),
                    input: new THREE.Vector3(1.8, 0, -1.2),
                    cond:  new THREE.Vector3(1.8, 0, 1.5),
                    func:  new THREE.Vector3(-1.1, 0, 1.5)
                },
                roles: {
                    data:  'secret = 42',
                    loop:  'while not won:',
                    input: 'guess = guesses[i]',
                    cond:  'if guess == 42:',
                    func:  'attempts += 1'
                },
                edges: [
                    ['data', 'loop'],
                    ['loop', 'input'],
                    ['input', 'cond'],
                    ['cond', 'func'],
                    ['func', 'loop']
                ]
            },
            3: {
                caption: 'Project 03 (Todo List Manager): Function Forge (add_task / show_tasks) -> Data Vault (list of dicts) -> Loop Ring (for i in range) -> Conditional Switch ("[x]" if done).',
                positions: {
                    func:  new THREE.Vector3(-3.6, 0, -0.6),
                    data:  new THREE.Vector3(-1.2, 0, -1.2),
                    loop:  new THREE.Vector3(1.3, 0, -1.2),
                    cond:  new THREE.Vector3(3.6, 0, -0.6),
                    input: new THREE.Vector3(0, 0, 1.9)
                },
                roles: {
                    func:  'add_task() / show()',
                    data:  'todo_list [dicts]',
                    loop:  'for i in range():',
                    cond:  '"[x]" if done',
                    input: 'print(i, status)'
                },
                edges: [
                    ['func', 'data'],
                    ['data', 'loop'],
                    ['loop', 'cond'],
                    ['cond', 'input']
                ]
            }
        };

        function applyBlueprintLayout(id) {
            const cfg = LAYOUTS[id] || LAYOUTS[1];

            Object.keys(nodes).forEach(k => {
                const n = nodes[k];
                n.targetPos.copy(cfg.positions[k]);
                n.roleSprite = replaceSprite(
                    toolkit,
                    n.group,
                    n.roleSprite,
                    cfg.roles[k],
                    { border: '#e8b04b', fontSize: 17, scale: 0.82 },
                    new THREE.Vector3(0, -0.28, 0.55)
                );
            });

            activeEdges = cfg.edges;
            clearGroupChildren(packetsGroup);
            packetMeshes = [];

            activeEdges.forEach((edge, idx) => {
                const pkt = new THREE.Mesh(
                    new THREE.SphereGeometry(0.17, 14, 14),
                    new THREE.MeshPhongMaterial({ color: C.amber, emissive: 0x553608, shininess: 100 })
                );
                packetsGroup.add(pkt);
                packetMeshes.push({ mesh: pkt, edge, offset: idx * 0.28 });
            });

            stage.setCaption(cfg.caption);
        }

        function rebuildConduits() {
            clearGroupChildren(conduitsGroup);
            activeEdges.forEach(([fromKey, toKey]) => {
                const pA = nodes[fromKey].group.position.clone().add(new THREE.Vector3(0, -0.85, 0));
                const pB = nodes[toKey].group.position.clone().add(new THREE.Vector3(0, -0.85, 0));
                const dist = pA.distanceTo(pB);
                if (dist < 0.05) return;

                const mid = pA.clone().add(pB).multiplyScalar(0.5);
                const tubeGeo = new THREE.CylinderGeometry(0.05, 0.05, dist, 8);
                tubeGeo.rotateX(Math.PI / 2);
                const tube = new THREE.Mesh(
                    tubeGeo,
                    new THREE.MeshBasicMaterial({ color: C.leafDark, transparent: true, opacity: 0.75 })
                );
                tube.position.copy(mid);
                tube.lookAt(pB);
                conduitsGroup.add(tube);
            });
        }

        stage.onTick((dt, elapsed) => {
            let moved = false;
            Object.keys(nodes).forEach(k => {
                const n = nodes[k];
                if (n.group.position.distanceTo(n.targetPos) > 0.01) {
                    n.group.position.lerp(n.targetPos, Math.min(1, dt * 7));
                    moved = true;
                }
                n.iconMesh.rotation.y = elapsed * 1.3;
            });

            if (moved || conduitsGroup.children.length !== activeEdges.length) {
                rebuildConduits();
            }

            packetMeshes.forEach(p => {
                const [fromKey, toKey] = p.edge;
                const pA = nodes[fromKey].group.position.clone().add(new THREE.Vector3(0, -0.7, 0));
                const pB = nodes[toKey].group.position.clone().add(new THREE.Vector3(0, -0.7, 0));
                const t = ((elapsed * 0.75 + p.offset) % 1.0);
                p.mesh.position.lerpVectors(pA, pB, t);
                p.mesh.position.y += Math.sin(t * Math.PI) * 0.25;
            });
        });

        // Snap initial positions immediately
        Object.keys(nodes).forEach(k => {
            nodes[k].group.position.copy(LAYOUTS[1].positions[k]);
        });

        toolkit.hookGlobalFunction('selectBlueprint', (id) => {
            applyBlueprintLayout(id);
        });
        window.selectProject = window.selectBlueprint;

        applyBlueprintLayout(1);
        rebuildConduits();
    };
})();
