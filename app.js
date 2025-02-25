(() => {
    "use strict";
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = "";
                }));
                document.body.style.paddingRight = "";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
            lockPaddingElements.forEach((lockPaddingElement => {
                lockPaddingElement.style.paddingRight = lockPaddingValue;
            }));
            document.body.style.paddingRight = lockPaddingValue;
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.addEventListener("DOMContentLoaded", (() => {
        setTimeout((() => {
            let items = document.querySelectorAll(".menu__item");
            let count = 1;
            items.forEach((item => {
                item.style.cssText = `\n            transition-duration: 0.6s;\n\t\t\ttransition-delay: ${count * .2}s;\n\t\t\ttransition-timing-function: ease;`;
                count++;
            }));
        }), 500);
        const damping = .994;
        const duration = 6e3;
        let startTime = null;
        let imges = document.querySelectorAll(".hero__mascot");
        let parent = document.querySelector(".hero");
        let parentRect = parent.getBoundingClientRect();
        imges.forEach((img => {
            let posX = parentRect.width / 2 - img.width / 2, posY = parentRect.height / 4.3 - img.height / 2;
            img.style.transform = `translate(${posX}px, ${posY}px)`;
            let velocityX = (Math.random() * 5 + 1) * (Math.random() < .5 ? 1 : -1);
            let velocityY = (Math.random() * 5 + 1) * (Math.random() < .5 ? 1 : -1);
            function moveImage(timestamp, img) {
                if (!startTime) startTime = timestamp;
                let elapsedTime = timestamp - startTime;
                if (elapsedTime >= duration) return;
                let rect = img.getBoundingClientRect();
                let parentRect = parent.getBoundingClientRect();
                if (rect.left <= parentRect.left || rect.right >= parentRect.right) {
                    velocityX *= -1;
                    if ((Math.random() < .2 ? 1 : -1) > 0) {
                        velocityY *= -1.1;
                        velocityX *= 1.1;
                    }
                }
                if (rect.top + window.scrollY <= parentRect.top + window.scrollY || rect.bottom + window.scrollY >= parentRect.bottom + window.scrollY) {
                    velocityY *= -1;
                    if ((Math.random() < .2 ? 1 : -1) > 0) {
                        velocityX *= -1.1;
                        velocityY *= 1.1;
                    }
                }
                posX += velocityX;
                posY += velocityY;
                img.style.transform = `translate(${posX}px, ${posY}px)`;
                velocityX *= damping;
                velocityY *= damping;
                requestAnimationFrame((t => moveImage(t, img)));
            }
            setTimeout((() => {
                let kentiky = document.querySelectorAll(".hero__mascot");
                let kentikyVideo = document.querySelector(".hero__video");
                kentikyVideo.play();
                kentiky.forEach((e => {
                    e.style.animation = "none";
                }));
                requestAnimationFrame((t => moveImage(t, img)));
            }), 5e3);
        }));
    }));
    window["FLS"] = true;
    menuInit();
})();