// script.js — full file (paste whole file, replacing existing)

// ========== Set current year in footer ==========
document.addEventListener("DOMContentLoaded", function () {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// ========== Image modal logic ==========
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImg");
    const avatarImg = document.querySelector(".avatar-inner img");
    const closeBtn = document.querySelector(".img-modal .close");

    function openModal(src) {
        if (!modal || !modalImg) return;
        modalImg.src = src;
        modal.style.display = "block";
        // Optional: focus for accessibility
        modal.setAttribute('tabindex', '-1');
        modal.focus();
    }

    function closeModal() {
        if (!modal) return;
        modal.style.display = "none";
    }

    if (avatarImg) {
        avatarImg.addEventListener('click', function () {
            openModal(this.src || this.getAttribute('src'));
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Click outside to close
    window.addEventListener('click', function (event) {
        if (event.target === modal) closeModal();
    });

    // ESC key to close
    document.addEventListener('keydown', function (e) {
        if (e.key === "Escape" || e.key === "Esc") closeModal();
    });
});

// ========== Robust scroll reveal animation ==========
(function () {
    // Config
    const throttleRAF = true;
    const triggerRatio = 0.85; // element top must be less than window.innerHeight * triggerRatio

    let ticking = false;

    function getRevealElements() {
        return Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    }

    function checkReveal() {
        const elements = getRevealElements();
        if (!elements || elements.length === 0) {
            // Uncomment next line to debug: console.log('No .reveal elements found.');
            return;
        }

        const triggerBottom = window.innerHeight * triggerRatio;

        elements.forEach(el => {
            // If already shown, skip (so animation triggers once)
            if (el.classList.contains('show')) return;

            const rect = el.getBoundingClientRect();
            // Element enters view when its top < triggerBottom
            if (rect.top < triggerBottom) {
                el.classList.add('show');
            }
        });
    }

    // Handler (throttled via rAF)
    function onScrollOrResize() {
        if (!throttleRAF) {
            checkReveal();
            return;
        }
        if (!ticking) {
            window.requestAnimationFrame(function () {
                checkReveal();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Run on load, scroll and resize
    document.addEventListener('DOMContentLoaded', function () {
        // Small delay to allow layout to settle (images/fonts)
        setTimeout(checkReveal, 120);
    });

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    // Also run immediately in case script is included at bottom
    setTimeout(checkReveal, 300);
})();

