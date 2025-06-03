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
});

function expandProductCard(targetCard) {
    if (targetCard.classList.contains('expanded')) return;
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        // card.classList.remove('expanded');
        fadeOut(card);

        card.removeEventListener('transitionend', onTransitionEnd);

        card.addEventListener('transitionend', onTransitionEnd);
    });

    targetCard.classList.add('expanded');

    function onTransitionEnd(e) {
        console.log(e.propertyName);
        console.log(e.currentTarget);
        console.log("transitionend");
        

        // opacity
        if (e.propertyName === 'opacity') {
            onFadeOutEnd(e);
            console.log("fadeoutend");
            console.log("----------");
            return;
        };

        // flex
        if (e.propertyName === 'flex-grow') {
            onFlexTransitionEnd(e);
            console.log("flextransitionend");
            console.log("----------");
            return;
        };
    }

    function onFadeOutEnd(e) {
        if (e.currentTarget === targetCard) {
            targetCard.classList.add('expanded');
        } else {
            e.currentTarget.classList.remove('expanded');
        }
    }

    function onFlexTransitionEnd(e) {
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

// Index logo navigation is handled by the sidebar module

