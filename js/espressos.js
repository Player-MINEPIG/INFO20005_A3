import { initCartDrawer } from './insertCartDrawer.js';
import { initSidebar } from './insertSidebar.js';

document.addEventListener('DOMContentLoaded', () => {
    initCartDrawer();
    initSidebar('.side-bar');
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            expandProductCard(card);
        });
    });

    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            console.log("size option clicked");
            onSizeOptionClick(option, sizeOptions);
        });
    });
});

// Expand product card animation
function expandProductCard(targetCard) {
    if (targetCard.classList.contains('expanded')) return;
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        fadeOut(card);

        card.removeEventListener('transitionend', onTransitionEnd);

        card.addEventListener('transitionend', onTransitionEnd);
    });

    function onTransitionEnd(e) {
        // opacity
        if (e.propertyName === 'opacity') {
            onFadeEnd(e);
            return;
        };

        // flex
        if (e.propertyName === 'flex-grow') {
            onFlexTransitionEnd(e);
            return;
        };
    }

    function onFadeEnd(e) {
        // check if fade out
        const opacity = window.getComputedStyle(e.currentTarget.querySelector('.product-info')).opacity;
        if (opacity === '0') {
            const detailPs = e.currentTarget.querySelectorAll('.product-detail p');
            detailPs.forEach(p => {
                p.style.display = 'none';
            });

            if (e.currentTarget === targetCard) {
                targetCard.classList.add('expanded');
            } else {
                e.currentTarget.classList.remove('expanded');
            }
        }
    }

    function onFlexTransitionEnd(e) {
        const detailPs = e.currentTarget.querySelectorAll('.product-detail p');
        detailPs.forEach(p => {
            p.style.display = 'flex';
        });
        fadeIn(e.currentTarget);
    }
}

function fadeOut(card) {
    card.classList.remove('fade-in');
    card.classList.add('fade-out');
}

function fadeIn(card) {
    card.classList.remove('fade-out');
    card.classList.add('fade-in');
}

// Size option click
function onSizeOptionClick(targetOption, options) {
    if (targetOption.classList.contains('selected')) {
        options.forEach(option => {
            option.classList.remove('selected');
        });
    } else {
        options.forEach(option => {
            option.classList.remove('selected');
        });
        targetOption.classList.add('selected');
    }
}

// Index logo navigation is handled by the sidebar module

