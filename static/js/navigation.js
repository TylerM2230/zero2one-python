// Modern navigation with keyboard shortcuts and swipe gestures

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', function(e) {
    // Ctrl + B for Browse
    if (e.ctrlKey && !e.metaKey && e.key === 'b') {
        e.preventDefault();
        navigateWithTransition('browse.html');
    }

    // Ctrl + H for Home
    if (e.ctrlKey && !e.metaKey && e.key === 'h') {
        e.preventDefault();
        navigateWithTransition('index.html');
    }

    // Arrow keys for card navigation (when not in input/textarea)
    const activeElement = document.activeElement;
    const isInputFocused = activeElement &&
        (activeElement.tagName === 'INPUT' ||
         activeElement.tagName === 'TEXTAREA' ||
         activeElement.isContentEditable);

    // Only navigate if no input is focused and no modifier keys are pressed
    if (!isInputFocused && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
        const prevBtn = document.querySelector('.arrow-button[onclick*="prev"]');
        const nextBtn = document.querySelector('.arrow-button[onclick*="next"]');

        if (e.key === 'ArrowLeft' && prevBtn && !prevBtn.disabled) {
            e.preventDefault();
            prevBtn.click();
        }

        if (e.key === 'ArrowRight' && nextBtn && !nextBtn.disabled) {
            e.preventDefault();
            nextBtn.click();
        }
    }
});

// ============================================
// SWIPE GESTURE SUPPORT
// ============================================
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
const swipeThreshold = 80; // Minimum distance for swipe
const swipeAngleThreshold = 30; // Maximum angle deviation from horizontal

const cardStack = document.querySelector('.hypercard-stack');

if (cardStack) {
    cardStack.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    cardStack.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Check if swipe is primarily horizontal
    if (absDeltaX < swipeThreshold) return;
    if (absDeltaY > absDeltaX * Math.tan(swipeAngleThreshold * Math.PI / 180)) return;

    // Swipe right = previous card
    if (deltaX > 0) {
        const prevBtn = document.querySelector('.sticky-nav-arrow[onclick*="prev"], .arrow-button[onclick*="prev"]');
        if (prevBtn && !prevBtn.disabled) {
            prevBtn.click();
        }
    }
    // Swipe left = next card
    else {
        const nextBtn = document.querySelector('.sticky-nav-arrow[onclick*="next"], .arrow-button[onclick*="next"]');
        if (nextBtn && !nextBtn.disabled) {
            nextBtn.click();
        }
    }
}

// ============================================
// SMOOTH NAVIGATION TRANSITIONS
// ============================================
function navigateWithTransition(url) {
    const stack = document.querySelector('.hypercard-stack');
    if (stack) {
        stack.style.opacity = '0';
        stack.style.transform = 'translateY(10px) translateZ(0)';
        setTimeout(() => {
            window.location.href = url;
        }, 200);
    } else {
        window.location.href = url;
    }
}

// ============================================
// AUTO-HIDE STICKY NAV ON SCROLL
// ============================================
let lastScrollTop = 0;
const stickyNav = document.querySelector('.sticky-top-nav');
let scrollTimeout;

if (stickyNav) {
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Only hide/show if scrolled more than 50px
            if (Math.abs(scrollTop - lastScrollTop) > 50) {
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // Scrolling down & past 100px
                    stickyNav.classList.add('hidden');
                } else {
                    // Scrolling up
                    stickyNav.classList.remove('hidden');
                }
                lastScrollTop = scrollTop;
            }
        }, 50);
    }, { passive: true });
}

// ============================================
// ENTRANCE ANIMATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const stack = document.querySelector('.hypercard-stack');
    if (stack) {
        stack.style.opacity = '0';
        stack.style.transform = 'translateY(20px) translateZ(0)';

        requestAnimationFrame(() => {
            stack.style.transition = 'opacity 400ms cubic-bezier(0.4, 0, 0.2, 1), transform 400ms cubic-bezier(0.4, 0, 0.2, 1)';
            stack.style.opacity = '1';
            stack.style.transform = 'translateY(0) translateZ(0)';
        });
    }
});
