// ==========================================================================
// PYTHON ZERO2ONE — NAVIGATION, SELECTIVE DISCLOSURE, PROGRESS & HUD ENGINE
// ==========================================================================

const PIXEL_CURSORS = [
    { id: 1,  name: "Crimson Cross",    x: 16, y: 16 },
    { id: 2,  name: "Silver Pointer",   x: 4,  y: 4  },
    { id: 3,  name: "Knight Sword",     x: 4,  y: 4  },
    { id: 4,  name: "Amber Rune",       x: 4,  y: 4  },
    { id: 5,  name: "Pizza Slice",      x: 4,  y: 4  },
    { id: 6,  name: "Classic White",    x: 4,  y: 4  },
    { id: 7,  name: "Bold Obsidian",    x: 4,  y: 4  },
    { id: 8,  name: "Kunai Dagger",     x: 4,  y: 4  },
    { id: 9,  name: "Sapphire Drop",    x: 4,  y: 4  },
    { id: 10, name: "Garden Carrot",    x: 4,  y: 4  },
    { id: 11, name: "Shadow Pointer",   x: 4,  y: 4  },
    { id: 12, name: "Sharp Ivory",      x: 4,  y: 4  },
    { id: 13, name: "Fletched Arrow",   x: 4,  y: 4  },
    { id: 14, name: "Emerald Crest",    x: 4,  y: 4  },
    { id: 15, name: "Watermelon",       x: 4,  y: 4  },
    { id: 16, name: "Golden Pointer",   x: 4,  y: 4  },
    { id: 17, name: "Fine Crosshair",   x: 16, y: 16 },
    { id: 18, name: "Glyph Reticle",    x: 4,  y: 4  },
    { id: 19, name: "Aqua Relic",       x: 4,  y: 4  },
    { id: 20, name: "Woodland Leaf",    x: 4,  y: 4  },
    { id: 21, name: "Prism Pointer",    x: 4,  y: 4  },
    { id: 22, name: "Gloved Hand",      x: 6,  y: 4  },
    { id: 23, name: "Sketch Pencil",    x: 4,  y: 4  },
    { id: 24, name: "Jade Crystal",     x: 4,  y: 4  },
    { id: 25, name: "Berry Cake",       x: 4,  y: 4  },
    { id: 26, name: "Steel Edge",       x: 4,  y: 4  },
    { id: 27, name: "Arcane Hand",      x: 6,  y: 4  },
    { id: 28, name: "Target Scope",     x: 16, y: 16 },
    { id: 29, name: "Rose Quartz",      x: 4,  y: 4  },
    { id: 30, name: "River Fish",       x: 4,  y: 4  }
];

const CARD_DIRECTORY = [
    { card: 0,  flower: 1,  bloom: "Lavender Tulips",  title: "The Computational Mindset",      summary: "Computers follow literal step-by-step instructions with zero unspoken intuition." },
    { card: 1,  flower: 2,  bloom: "Golden Tulips",    title: "Mental Model of Programs",       summary: "Programs execute sequentially from top to bottom like a kitchen recipe scroll." },
    { card: 2,  flower: 3,  bloom: "Coral Tulips",     title: "Variables as Mental Containers", summary: "Variables are labeled boxes that store and update values using = assignment." },
    { card: 3,  flower: 4,  bloom: "Crimson Rose",     title: "Data Types - Different Boxes",   summary: "Strings, integers, and booleans define what operations are valid on data." },
    { card: 4,  flower: 5,  bloom: "Sakura Blossoms",  title: "Input/Output Conversation",      summary: "print() speaks to the screen and input() listens (always returning a string)." },
    { card: 5,  flower: 6,  bloom: "Marigold Bundle",  title: "Comparison Operators",           summary: "Operators like ==, !=, <, > ask relationships and evaluate to True or False." },
    { card: 6,  flower: 7,  bloom: "Scarlet Blossoms", title: "Logical Operators",              summary: "Combine truth values with and (both), or (either), and not (invert)." },
    { card: 7,  flower: 8,  bloom: "Ivory Tulip",      title: "Conditionals - Decision Tree",   summary: "if / elif / else branches code so only the first True path executes." },
    { card: 8,  flower: 9,  bloom: "Meadow Daisies",   title: "Nested Conditionals",            summary: "Place checks inside checks to refine decisions through outer and inner gates." },
    { card: 9,  flower: 10, bloom: "Royal Pansies",    title: "While Loops",                    summary: "Repeat a block as long as a condition stays True; update state to avoid infinite loops." },
    { card: 10, flower: 11, bloom: "Calla Lilies",     title: "For Loops & Range",              summary: "Counted repetition over sequences; range(start, stop) stops before stop." },
    { card: 11, flower: 12, bloom: "Twilight Tulip",   title: "Lists - Ordered Data",           summary: "Store ordered collections in numbered slots starting at index [0]." },
    { card: 12, flower: 13, bloom: "Pink Gerberas",    title: "Functions - Reusable Tools",     summary: "Package inputs (parameters), logic, and return outputs into reusable black boxes." },
    { card: 13, flower: 14, bloom: "Forget-Me-Nots",   title: "Dictionaries - Key Lookups",     summary: "Pair meaningful keys with values for instant, self-documenting lookup." },
    { card: 14, flower: 15, bloom: "Twin Sunflowers",  title: "Recursion - Self-Similarity",    summary: "Solve problems by shrinking them toward a simple base case and cascading back up." },
    { card: 15, flower: 16, bloom: "Rosebud Tulip",    title: "Next Steps & Mastery",           summary: "Synthesize all 16 mental models into complete projects and claim your certificate." }
];

// Card-specific "Predict & Reveal" selective disclosure micro-challenges
const SELF_CHECKS = {
    0: {
        q: "If you tell a computer: \"Spread peanut butter on the bread\" without first telling it to open the jar, what happens?",
        options: [
            { text: "It figures out you meant to open the jar first", correct: false },
            { text: "It fails or does something literal and unintended", correct: true },
            { text: "It skips the line and finishes the sandwich", correct: false }
        ],
        explanation: "Correct! Computers have 0% common sense and 100% literal obedience. Every prerequisite step must be stated explicitly."
    },
    1: {
        q: "What happens if Line 1 of a program is `print( greeting )` and Line 2 is `greeting = \"Hello\"`?",
        options: [
            { text: "Python looks ahead to Line 2 and prints \"Hello\"", correct: false },
            { text: "NameError: `greeting` does not exist yet at Line 1", correct: true },
            { text: "It prints an empty line", correct: false }
        ],
        explanation: "Spot on! Python reads strictly from top to bottom. At Line 1, `greeting` hasn't been created yet."
    },
    2: {
        q: "Predict the final value of `score` after running:\n`score = 10`\n`score = score + 5`",
        options: [
            { text: "15 (reads 10, adds 5, stores 15 in score)", correct: true },
            { text: "10 (variables cannot be changed once set)", correct: false },
            { text: "SyntaxError (algebraic impossibility)", correct: false }
        ],
        explanation: "Exactly right! `=` evaluates the right side first (`10 + 5 -> 15`) and pours the result back into the `score` container."
    },
    3: {
        q: "What is the result of evaluating `\"25\" + \"5\"` versus `int(\"25\") + 5` in Python?",
        options: [
            { text: "Both evaluate to the number 30", correct: false },
            { text: "`\"255\"` (str) and `30` (int)", correct: true },
            { text: "Both raise a TypeError", correct: false }
        ],
        explanation: "Well done! Adding two strings glues them together (`\"255\"`), whereas `int(\"25\")` converts the text to a number so `25 + 5` becomes `30`."
    },
    4: {
        q: "If a user types `19` into `age = input(\"Age: \")`, what data type is stored inside `age`?",
        options: [
            { text: "String (`\"19\"`) — `input()` always returns text", correct: true },
            { text: "Integer (`19`) — because 19 is digits", correct: false },
            { text: "Boolean (`True`)", correct: false }
        ],
        explanation: "Correct! `input()` always returns a string (`str`). Wrap it in `int(input(...))` whenever you need to do arithmetic."
    },
    5: {
        q: "What is the difference between `x = 7` and `x == 7`?",
        options: [
            { text: "`=` stores 7 in `x`; `==` asks if `x` equals 7 (returns True/False)", correct: true },
            { text: "They do the exact same thing", correct: false },
            { text: "`==` stores 7 in `x` twice as fast", correct: false }
        ],
        explanation: "Exactly! Single `=` is an action (assignment into a box); double `==` is a question that returns `True` or `False`."
    },
    6: {
        q: "What does `(5 > 3) and (10 == 20)` evaluate to?",
        options: [
            { text: "True — because `5 > 3` is True", correct: false },
            { text: "False — `and` requires BOTH sides to be True", correct: true },
            { text: "None", correct: false }
        ],
        explanation: "Right! With `and`, both conditions must be `True`. Since `10 == 20` is `False`, the whole expression is `False`."
    },
    7: {
        q: "In an `if / elif / else` chain, what happens if BOTH the `if` condition and the `elif` condition are True?",
        options: [
            { text: "Both blocks execute one after another", correct: false },
            { text: "Only the first True block (`if`) executes; the rest are skipped", correct: true },
            { text: "The `else` block runs as a tie-breaker", correct: false }
        ],
        explanation: "Correct! Like water taking the first open channel, Python executes the first branch that evaluates to `True` and skips the rest of the chain."
    },
    8: {
        q: "In a nested conditional, when does the inner `if` statement get checked?",
        options: [
            { text: "Only when the outer `if` condition is True", correct: true },
            { text: "Every time, regardless of the outer `if`", correct: false },
            { text: "Only when the outer `if` is False", correct: false }
        ],
        explanation: "Spot on! The outer condition acts as the outer fortress gate. If it is `False`, Python never enters the indented block inside it."
    },
    9: {
        q: "What happens in a `while count < 3:` loop if you forget to update `count` inside the loop body?",
        options: [
            { text: "Python automatically adds 1 to `count`", correct: false },
            { text: "An infinite loop — `count < 3` stays True forever", correct: true },
            { text: "The loop runs 3 times and stops", correct: false }
        ],
        explanation: "Exactly! A `while` loop only stops when its condition becomes `False`. You must update the checked variable inside the loop."
    },
    10: {
        q: "Which numbers are generated by `range(2, 6)`?",
        options: [
            { text: "2, 3, 4, 5 (stops before 6)", correct: true },
            { text: "2, 3, 4, 5, 6 (includes 6)", correct: false },
            { text: "0, 1, 2, 3, 4, 5", correct: false }
        ],
        explanation: "Correct! `range(start, stop)` starts at `2` and stops strictly BEFORE `stop` (`6`), giving `2, 3, 4, 5`."
    },
    11: {
        q: "Given `spells = [\"spark\", \"shield\", \"heal\"]`, what is `spells[1]` and `spells[-1]`?",
        options: [
            { text: "`\"spark\"` and `\"heal\"`", correct: false },
            { text: "`\"shield\"` and `\"heal\"`", correct: true },
            { text: "`\"shield\"` and `\"spark\"`", correct: false }
        ],
        explanation: "Nice! Indices start at `0`, so `[1]` is the second item (`\"shield\"`), and `[-1]` always grabs the last item (`\"heal\"`)."
    },
    12: {
        q: "Why do we use `return` inside a function instead of just `print()`?",
        options: [
            { text: "`return` hands the computed value back so the caller can store or reuse it", correct: true },
            { text: "`return` and `print()` are identical", correct: false },
            { text: "`return` deletes the function from memory", correct: false }
        ],
        explanation: "Exactly! `print()` only shows text on the screen, whereas `return` sends the actual data value back out of the function machine."
    },
    13: {
        q: "Given `hero = {\"name\": \"Lyra\", \"level\": 4}`, how do you access `4`?",
        options: [
            { text: "`hero[1]`", correct: false },
            { text: "`hero[\"level\"]`", correct: true },
            { text: "`hero.level(4)`", correct: false }
        ],
        explanation: "Correct! Dictionaries unlock values by their meaningful key (`\"level\"`), not by numeric slot position."
    },
    14: {
        q: "What is the role of the **base case** in a recursive function?",
        options: [
            { text: "It provides the stopping condition that returns an answer without recursing further", correct: true },
            { text: "It makes the function call itself faster", correct: false },
            { text: "It resets all variables to zero", correct: false }
        ],
        explanation: "Spot on! Like the leaf at the tip of a bonsai branch, the base case stops the recursion so answers can cascade back up."
    }
};

function getStaticPrefix() {
    const path = window.location.pathname;
    return path.includes('/cards/') ? '../static' : 'static';
}

function getRootPrefix() {
    const path = window.location.pathname;
    return path.includes('/cards/') ? '../' : '';
}

function getCurrentCardNumber() {
    const match = window.location.pathname.match(/card_(\d+)\.html/);
    return match ? parseInt(match[1], 10) : null;
}

// ============================================
// 0. PROGRESS & BLOOM COLLECTION TRACKER
// ============================================
function getCollectedBlooms() {
    try {
        const raw = localStorage.getItem('zero2one_blooms');
        const arr = raw ? JSON.parse(raw) : [];
        return Array.isArray(arr) ? arr : [];
    } catch (e) {
        return [];
    }
}

function markBloomCollected(cardNum) {
    if (typeof cardNum !== 'number' || cardNum < 0 || cardNum > 15) return;
    const current = getCollectedBlooms();
    if (!current.includes(cardNum)) {
        current.push(cardNum);
        current.sort((a, b) => a - b);
        try {
            localStorage.setItem('zero2one_blooms', JSON.stringify(current));
        } catch (e) {}
    }
}

function unlockAllBlooms() {
    const all = Array.from({ length: 16 }, (_, i) => i);
    try {
        localStorage.setItem('zero2one_blooms', JSON.stringify(all));
    } catch (e) {}
    return all;
}

window.Zero2OneProgress = {
    getCollectedBlooms,
    markBloomCollected,
    unlockAllBlooms,
    CARD_DIRECTORY
};

function getPrevNextButtons() {
    const prevBtn =
        document.querySelector('[data-nav="prev"]') ||
        document.querySelector('.nav-arrows .arrow-button:first-child') ||
        document.querySelector('.sticky-nav-left .sticky-nav-arrow:first-child');
    const nextBtn =
        document.querySelector('[data-nav="next"]') ||
        document.querySelector('.nav-arrows .arrow-button:last-child') ||
        document.querySelector('.sticky-nav-left .sticky-nav-arrow:last-child');
    return { prevBtn, nextBtn };
}

function triggerArrowNav(direction) {
    const { prevBtn, nextBtn } = getPrevNextButtons();
    const targetBtn = direction === 'prev' ? prevBtn : nextBtn;
    if (targetBtn && !targetBtn.disabled) {
        targetBtn.classList.add('key-pressed');
        setTimeout(() => targetBtn.classList.remove('key-pressed'), 180);
        targetBtn.click();
    }
}

// ============================================
// 1. KEYBOARD NAVIGATION (Left/Right Arrows, Ctrl+B, Ctrl+H)
// ============================================
document.addEventListener('keydown', function(e) {
    const rootPrefix = getRootPrefix();

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        navigateWithTransition(rootPrefix + 'browse.html');
        return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        navigateWithTransition(rootPrefix + 'index.html');
        return;
    }

    if (e.key === 'Escape') {
        const pop = document.getElementById('cursor-picker-popover');
        if (pop) pop.classList.remove('open');
        const jumper = document.getElementById('card-jumper-popover');
        if (jumper) jumper.classList.remove('open');
        return;
    }

    const activeElement = document.activeElement;
    const isInputFocused = activeElement &&
        (activeElement.tagName === 'INPUT' ||
         activeElement.tagName === 'TEXTAREA' ||
         activeElement.tagName === 'SELECT' ||
         activeElement.isContentEditable);

    if (!isInputFocused && !e.altKey && !e.shiftKey) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            triggerArrowNav('prev');
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            triggerArrowNav('next');
        }
    }
});

// ============================================
// 2. SWIPE GESTURE SUPPORT (With Scrollable Element Guard)
// ============================================
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let ignoreCurrentSwipe = false;
const swipeThreshold = 85;
const swipeAngleThreshold = 28;

function shouldIgnoreSwipeTarget(target) {
    if (!target || !target.closest) return false;
    if (target.closest('.three-viz-stage, pre, code, .viz-code-block, .viz-terminal, .flower-garden-strip, input, select, textarea, button, summary, .mastery-certificate')) {
        return true;
    }
    let el = target;
    while (el && el !== document.body) {
        if (el.scrollWidth > el.clientWidth + 4) {
            return true;
        }
        el = el.parentElement;
    }
    return false;
}

function initSwipeSupport() {
    const cardStack = document.querySelector('.hypercard-stack');
    if (!cardStack) return;

    cardStack.addEventListener('touchstart', function(e) {
        ignoreCurrentSwipe = shouldIgnoreSwipeTarget(e.target);
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    cardStack.addEventListener('touchend', function(e) {
        if (ignoreCurrentSwipe) return;
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        if (absDeltaX < swipeThreshold) return;
        if (absDeltaY > absDeltaX * Math.tan(swipeAngleThreshold * Math.PI / 180)) return;

        if (deltaX > 0) {
            triggerArrowNav('prev');
        } else {
            triggerArrowNav('next');
        }
    }, { passive: true });
}

// ============================================
// 3. SMOOTH NAVIGATION TRANSITIONS
// ============================================
function navigateWithTransition(url) {
    const stack = document.querySelector('.hypercard-stack');
    if (stack) {
        stack.style.opacity = '0';
        stack.style.transform = 'translateY(6px) translateZ(0)';
        setTimeout(() => {
            window.location.href = url;
        }, 140);
    } else {
        window.location.href = url;
    }
}

// ============================================
// 4. PIXEL & BOTANICAL FLOWER CURSOR SYSTEM
// ============================================
function applyPixelCursor(cursorId) {
    const staticPrefix = getStaticPrefix();
    let styleEl = document.getElementById('custom-cursor-style');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'custom-cursor-style';
        document.head.appendChild(styleEl);
    }

    const strId = String(cursorId || 'default');
    localStorage.setItem('zero2one_cursor', strId);

    const previewImg = document.getElementById('active-cursor-preview');

    if (strId.startsWith('flower_')) {
        const flowerNum = parseInt(strId.replace('flower_', ''), 10);
        if (flowerNum >= 1 && flowerNum <= 16) {
            const cursorUrl = `${staticPrefix}/images/cursors/flower_${flowerNum}.png`;
            styleEl.textContent = `
                html, body, .hypercard-stack, .card-content, .visualization, .viz-box {
                    cursor: url('${cursorUrl}') 16 16, auto !important;
                }
                a, button, .hc-button, .arrow-button, .card-item, .corner-sun-widget, .cursor-picker-trigger, .cursor-option, input[type="checkbox"], select, summary {
                    cursor: url('${cursorUrl}') 16 16, pointer !important;
                }
            `;
            if (previewImg) previewImg.src = cursorUrl;
        }
    } else {
        const idNum = Number(strId);
        const cursorMeta = PIXEL_CURSORS.find(c => c.id === idNum);

        if (!cursorId || strId === 'default' || !cursorMeta) {
            styleEl.textContent = '';
            if (previewImg) previewImg.src = `${staticPrefix}/images/cursors/pcursor_6.png`;
        } else {
            const cursorUrl = `${staticPrefix}/images/cursors/pcursor_${cursorMeta.id}.png`;
            styleEl.textContent = `
                html, body, .hypercard-stack, .card-content, .visualization, .viz-box {
                    cursor: url('${cursorUrl}') ${cursorMeta.x} ${cursorMeta.y}, auto !important;
                }
                a, button, .hc-button, .arrow-button, .card-item, .corner-sun-widget, .cursor-picker-trigger, .cursor-option, input[type="checkbox"], select, summary {
                    cursor: url('${cursorUrl}') ${cursorMeta.x} ${cursorMeta.y}, pointer !important;
                }
            `;
            if (previewImg) previewImg.src = cursorUrl;
        }
    }

    document.querySelectorAll('.cursor-option').forEach(el => {
        el.classList.toggle('active', el.getAttribute('data-cursor-id') === strId);
    });
    const defBtn = document.getElementById('cursor-default-btn');
    if (defBtn) {
        defBtn.classList.toggle('active', !cursorId || strId === 'default');
    }
}

function applyFlowerCursor(flowerId) {
    const num = parseInt(String(flowerId).replace('flower_', ''), 10);
    if (num >= 1 && num <= 16) {
        applyPixelCursor(`flower_${num}`);
    } else {
        applyPixelCursor(flowerId);
    }
}

window.applyFlowerCursor = applyFlowerCursor;

// ============================================
// 5. COMPACT UPPER-CORNER PIXEL SUN, CURSOR HUD & QUICK CARD JUMPER
// ============================================
function initCornerHud() {
    if (document.querySelector('.corner-hud')) return;

    const staticPrefix = getStaticPrefix();
    const rootPrefix = getRootPrefix();
    const savedTheme = localStorage.getItem('zero2one_sunlit') === 'true';
    if (savedTheme) {
        document.body.classList.add('sunlit-mode');
    }

    const savedCursor = localStorage.getItem('zero2one_cursor') || '20';

    const hud = document.createElement('div');
    hud.className = 'corner-hud';
    hud.innerHTML = `
        <button type="button" class="cursor-picker-trigger" id="wizard-summon-trigger" title="Summon or Dismiss Wizard Guide" style="display: none;">
            <img class="cursor-preview-img" src="${staticPrefix}/images/mascot.png" alt="Wizard">
            <span id="wizard-summon-label">Guide</span>
        </button>
        <button type="button" class="cursor-picker-trigger" id="cursor-picker-trigger" title="Select Botanical or Pixel Cursor">
            <img id="active-cursor-preview" class="cursor-preview-img" src="${staticPrefix}/images/cursors/pcursor_20.png" alt="Cursor">
            <span>Cursor</span>
        </button>
        <button type="button" class="corner-sun-widget" id="corner-sun-toggle" title="Toggle Sunlit Glade / Woodland Night Mode">
            <img class="corner-sun-img" src="${staticPrefix}/images/sun.png" alt="Toggle Theme">
        </button>
    `;

    const popover = document.createElement('div');
    popover.className = 'cursor-picker-popover';
    popover.id = 'cursor-picker-popover';

    const flowerOptionsHtml = CARD_DIRECTORY.map(c => `
        <button type="button" class="cursor-option" data-cursor-id="flower_${c.flower}" title="Card ${c.card}: ${c.bloom}">
            <img src="${staticPrefix}/images/cursors/flower_${c.flower}.png" alt="${c.bloom}">
        </button>
    `).join('');

    const pointerOptionsHtml = PIXEL_CURSORS.map(c => `
        <button type="button" class="cursor-option" data-cursor-id="${c.id}" title="${c.name}">
            <img src="${staticPrefix}/images/cursors/pcursor_${c.id}.png" alt="${c.name}">
        </button>
    `).join('');

    popover.innerHTML = `
        <div class="cursor-picker-header">
            <span>16 Botanical Blooms &amp; 30 Pointers</span>
            <button type="button" id="close-cursor-popover" style="background:none;border:none;color:var(--text-secondary);cursor:pointer;padding:2px 4px;" aria-label="Close">
                <svg class="svg-icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>
        <div style="font-size:10px;color:var(--accent-secondary);font-family:var(--font-stack);margin-bottom:5px;font-weight:700;">WOODLAND BLOOMS (CARDS 0–15)</div>
        <div class="cursor-grid" style="margin-bottom:10px;max-height:115px;">
            ${flowerOptionsHtml}
        </div>
        <div style="font-size:10px;color:var(--text-secondary);font-family:var(--font-stack);margin-bottom:5px;font-weight:700;">PIXEL POINTERS (30)</div>
        <div class="cursor-grid" style="max-height:155px;">
            ${pointerOptionsHtml}
        </div>
        <button type="button" class="cursor-default-btn" id="cursor-default-btn">
            System Default Pointer
        </button>
    `;

    // Quick Card Jumper Popover (triggered by clicking .card-number or .sticky-nav-center)
    const jumper = document.createElement('div');
    jumper.className = 'card-jumper-popover';
    jumper.id = 'card-jumper-popover';

    document.body.appendChild(hud);
    document.body.appendChild(popover);
    document.body.appendChild(jumper);

    function renderJumperList() {
        const collected = getCollectedBlooms();
        const currentCard = getCurrentCardNumber();
        const cardsPrefix = rootPrefix ? '../cards/' : 'cards/';

        const itemsHtml = CARD_DIRECTORY.map(c => {
            const isDone = collected.includes(c.card);
            const isCurrent = currentCard === c.card;
            return `
                <a href="${cardsPrefix}card_${c.card}.html" class="card-jumper-item ${isCurrent ? 'current' : ''}">
                    <img src="${staticPrefix}/images/cursors/flower_${c.flower}.png" alt="${c.bloom}">
                    <div style="min-width:0;flex:1;">
                        <div style="font-weight:700;font-size:0.78rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c.card}. ${c.title}</div>
                    </div>
                    <span class="card-jumper-check">${isDone ? '✓' : ''}</span>
                </a>
            `;
        }).join('');

        jumper.innerHTML = `
            <div class="cursor-picker-header">
                <span>Quick Jump (${collected.length}/16 Blooms Explored)</span>
                <button type="button" id="close-jumper-popover" style="background:none;border:none;color:var(--text-secondary);cursor:pointer;padding:2px 4px;" aria-label="Close">
                    <svg class="svg-icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <div style="display:flex;gap:6px;margin-bottom:8px;">
                <a href="${rootPrefix}index.html" class="hc-button" style="flex:1;padding:5px 8px;font-size:0.76rem;text-decoration:none;">Home</a>
                <a href="${rootPrefix}browse.html" class="hc-button" style="flex:1;padding:5px 8px;font-size:0.76rem;text-decoration:none;">Browse Map</a>
            </div>
            <div class="card-jumper-list">
                ${itemsHtml}
            </div>
        `;

        const closeBtn = jumper.querySelector('#close-jumper-popover');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => jumper.classList.remove('open'));
        }
    }

    renderJumperList();

    // Wire up Card Number badge & mobile sticky center badge to toggle Quick Jumper
    document.querySelectorAll('.card-number, .sticky-nav-center').forEach(badge => {
        badge.title = 'Click to Quick-Jump to any Card (0–15)';
        badge.addEventListener('click', function(e) {
            e.stopPropagation();
            popover.classList.remove('open');
            renderJumperList();
            jumper.classList.toggle('open');
        });
    });

    document.getElementById('corner-sun-toggle').addEventListener('click', function() {
        const isSunlit = document.body.classList.toggle('sunlit-mode');
        localStorage.setItem('zero2one_sunlit', String(isSunlit));
    });

    const triggerBtn = document.getElementById('cursor-picker-trigger');
    triggerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        jumper.classList.remove('open');
        popover.classList.toggle('open');
    });

    document.getElementById('close-cursor-popover').addEventListener('click', function() {
        popover.classList.remove('open');
    });

    popover.addEventListener('click', e => e.stopPropagation());
    jumper.addEventListener('click', e => e.stopPropagation());

    document.addEventListener('click', function() {
        popover.classList.remove('open');
        jumper.classList.remove('open');
    });

    popover.querySelectorAll('.cursor-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-cursor-id');
            applyPixelCursor(id);
        });
    });

    document.getElementById('cursor-default-btn').addEventListener('click', function() {
        applyPixelCursor('default');
    });

    applyPixelCursor(savedCursor);
}

// ============================================
// 5a. DISMISS WIZARD & EXPAND CARD ANIMATION
// ============================================
function setWizardDismissed(dismissed) {
    document.body.classList.toggle('wizard-dismissed', Boolean(dismissed));
    try {
        localStorage.setItem('zero2one_wizard_dismissed', String(Boolean(dismissed)));
    } catch (e) {}
    const summonBtn = document.getElementById('wizard-summon-trigger');
    if (summonBtn) {
        summonBtn.style.display = dismissed ? 'flex' : 'none';
    }
}

function initWizardDismissControl() {
    const assistant = document.querySelector('.ascii-assistant');
    const bubble = document.querySelector('.assistant-bubble');
    const avatar = document.querySelector('.assistant-avatar');
    const summonBtn = document.getElementById('wizard-summon-trigger');

    if (!assistant || !bubble) return;

    // Restore saved wizard state if user previously dismissed it
    if (localStorage.getItem('zero2one_wizard_dismissed') === 'true') {
        setWizardDismissed(true);
    }

    if (!bubble.querySelector('.wizard-dismiss-row')) {
        const row = document.createElement('div');
        row.className = 'wizard-dismiss-row';
        row.innerHTML = `
            <button type="button" class="wizard-dismiss-btn" title="Hide Wizard Guide and expand card">
                <span>Got it, thanks</span>
                <svg class="svg-icon" style="width:13px;height:13px;" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
        `;
        bubble.appendChild(row);

        row.querySelector('.wizard-dismiss-btn').addEventListener('click', function(e) {
            e.stopPropagation();
            setWizardDismissed(true);
        });
    }

    if (avatar) {
        avatar.title = 'Click to hide Wizard Guide and expand card';
        avatar.addEventListener('click', function() {
            setWizardDismissed(true);
        });
    }

    if (summonBtn) {
        summonBtn.addEventListener('click', function() {
            setWizardDismissed(false);
        });
    }
}

// ============================================
// 6. SELECTIVE DISCLOSURE: ACCORDIONS, INTUITION CHECK & CODE COPY
// ============================================
function initSelectiveDisclosure() {
    const disclosures = Array.from(document.querySelectorAll('details.hc-disclosure'));

    disclosures.forEach(det => {
        const chevron = det.querySelector('.hc-disclosure-chevron');
        const syncText = () => {
            if (chevron) {
                chevron.textContent = det.open ? '− Collapse' : '+ Explore';
            }
        };
        syncText();
        det.addEventListener('toggle', syncText);
    });

    if (disclosures.length > 0 && !document.querySelector('.hc-disclosure-toolbar')) {
        const firstDet = disclosures[0];
        const toolbar = document.createElement('div');
        toolbar.className = 'hc-disclosure-toolbar';
        toolbar.innerHTML = `
            <span class="hc-disclosure-toolbar-label">
                <svg class="svg-icon" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                Deep-Dive Notes &amp; Examples (${disclosures.length} sections — tap to expand)
            </span>
            <button type="button" class="hc-disclosure-toggle-all">Expand All Notes</button>
        `;
        firstDet.parentNode.insertBefore(toolbar, firstDet);

        const toggleAllBtn = toolbar.querySelector('.hc-disclosure-toggle-all');
        const updateBtnLabel = () => {
            const allOpen = disclosures.every(d => d.open);
            toggleAllBtn.textContent = allOpen ? 'Collapse All Notes' : 'Expand All Notes';
        };
        disclosures.forEach(d => d.addEventListener('toggle', updateBtnLabel));

        toggleAllBtn.addEventListener('click', () => {
            const allOpen = disclosures.every(d => d.open);
            disclosures.forEach(d => { d.open = !allOpen; });
            updateBtnLabel();
        });
    }

    // Mount interactive "Check Your Intuition (Predict & Reveal)" card if on card_0..card_14
    const cardNum = getCurrentCardNumber();
    if (cardNum !== null && SELF_CHECKS[cardNum] && !document.querySelector('.hc-self-check')) {
        const checkData = SELF_CHECKS[cardNum];
        const encouragement = document.querySelector('.flower-encouragement');
        if (encouragement && encouragement.parentNode) {
            const box = document.createElement('div');
            box.className = 'hc-self-check';

            const optionsHtml = checkData.options.map((opt, idx) => `
                <button type="button" class="hc-button hc-check-option" data-idx="${idx}" data-correct="${opt.correct}">
                    ${opt.text}
                </button>
            `).join('');

            box.innerHTML = `
                <div class="hc-self-check-header">
                    <span class="hc-self-check-badge">Quick Intuition Check — Predict &amp; Reveal</span>
                    <span style="font-size:0.78rem;color:var(--text-secondary);font-family:var(--font-stack);">Card ${cardNum} Self-Test</span>
                </div>
                <div class="hc-self-check-question">${checkData.q.replace(/\n/g, '<br>')}</div>
                <div class="hc-self-check-options">
                    ${optionsHtml}
                </div>
                <div class="hc-self-check-reveal" id="self-check-reveal-${cardNum}"></div>
            `;

            encouragement.parentNode.insertBefore(box, encouragement);

            const revealEl = box.querySelector(`#self-check-reveal-${cardNum}`);
            const optionBtns = box.querySelectorAll('.hc-check-option');

            optionBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const isCorrect = this.getAttribute('data-correct') === 'true';
                    optionBtns.forEach(b => {
                        if (b.getAttribute('data-correct') === 'true') {
                            b.classList.add('correct-choice');
                        } else if (b === this) {
                            b.classList.add('wrong-choice');
                        }
                    });
                    revealEl.classList.add('visible');
                    revealEl.className = 'hc-self-check-reveal visible ' + (isCorrect ? 'viz-state-success' : '');
                    revealEl.innerHTML = (isCorrect ? '<strong>✓ Spot On!</strong> ' : '<strong>Insight:</strong> ') + checkData.explanation;
                });
            });
        }
    }

    // Make flower in .flower-encouragement clickable to equip its botanical cursor
    if (cardNum !== null) {
        const encouragementImg = document.querySelector('.flower-encouragement img');
        if (encouragementImg) {
            const flowerId = cardNum + 1;
            encouragementImg.style.cursor = 'pointer';
            encouragementImg.title = `Click to equip Card ${cardNum}'s Botanical Bloom cursor!`;
            encouragementImg.addEventListener('click', () => {
                applyFlowerCursor(flowerId);
            });
        }
    }

    // Add Copy button to static code blocks
    document.querySelectorAll('pre.viz-code-block:not([id])').forEach(pre => {
        if (pre.parentElement && pre.parentElement.classList.contains('code-block-wrapper')) return;
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const copyBtn = document.createElement('button');
        copyBtn.type = 'button';
        copyBtn.className = 'code-copy-btn';
        copyBtn.textContent = 'Copy';
        copyBtn.title = 'Copy Python snippet';
        copyBtn.addEventListener('click', () => {
            const text = pre.textContent || '';
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    copyBtn.textContent = 'Copied ✓';
                    setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1400);
                });
            }
        });
        wrapper.appendChild(copyBtn);
    });
}

// ============================================
// 6a. BROWSE PAGE ENHANCEMENTS (Progress Badges & Concept Peek)
// ============================================
function initBrowseEnhancements() {
    const grid = document.getElementById('browse-card-grid');
    if (!grid) return;

    const collected = getCollectedBlooms();
    const items = grid.querySelectorAll('.card-item');

    items.forEach(item => {
        const href = item.getAttribute('href') || '';
        const match = href.match(/card_(\d+)\.html/);
        if (!match) return;
        const cardNum = parseInt(match[1], 10);
        const meta = CARD_DIRECTORY.find(c => c.card === cardNum);
        if (!meta) return;

        // Add collected badge if visited
        if (collected.includes(cardNum)) {
            const topRow = item.querySelector('div');
            if (topRow && !topRow.querySelector('.card-item-bloom-badge')) {
                const badge = document.createElement('span');
                badge.className = 'card-item-bloom-badge';
                badge.textContent = '✓ Bloomed';
                topRow.appendChild(badge);
            }
        }

        // Add selective-disclosure concept preview text
        if (!item.querySelector('.card-item-preview')) {
            const preview = document.createElement('div');
            preview.className = 'card-item-preview';
            preview.textContent = meta.summary;
            item.appendChild(preview);
        }
    });

    const counterEl = document.getElementById('browse-bloom-count');
    if (counterEl) {
        counterEl.textContent = `${collected.length} / 16 Blooms Collected`;
    }
}

// ============================================
// 7. AUTOMATIC THREE.JS PEDAGOGICAL ENGINE LOADER
// ============================================
function loadScriptSeq(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}

async function initThreePedagogy() {
    const path = window.location.pathname;
    if (path.endsWith('browse.html')) return;

    const staticPrefix = getStaticPrefix();
    try {
        if (typeof THREE === 'undefined') {
            await loadScriptSeq('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
        }
        await loadScriptSeq(`${staticPrefix}/js/three_viz.js`);
        const cardMatch = path.match(/card_(\d+)\.html/);
        if (cardMatch && parseInt(cardMatch[1], 10) >= 8) {
            await loadScriptSeq(`${staticPrefix}/js/three_scenes_8_15.js`);
        } else {
            await loadScriptSeq(`${staticPrefix}/js/three_scenes_0_7.js`);
        }
        if (typeof window.bootCurrentPageScene === 'function') {
            window.bootCurrentPageScene();
        }
    } catch (err) {
        console.warn('Three.js pedagogical visualization skipped:', err);
    }
}

// ============================================
// 8. INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const currentCard = getCurrentCardNumber();
    if (currentCard !== null) {
        markBloomCollected(currentCard);
    }

    initCornerHud();
    initWizardDismissControl();
    initSelectiveDisclosure();
    initBrowseEnhancements();
    initSwipeSupport();
    initThreePedagogy();

    const stack = document.querySelector('.hypercard-stack');
    if (stack) {
        stack.style.opacity = '0';
        stack.style.transform = 'translateY(8px) translateZ(0)';

        requestAnimationFrame(() => {
            stack.style.transition = 'opacity 250ms ease, transform 250ms ease';
            stack.style.opacity = '1';
            stack.style.transform = 'translateY(0) translateZ(0)';
        });
    }
});
