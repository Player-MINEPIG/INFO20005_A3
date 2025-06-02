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

function expandProductCard(card) {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.classList.remove('expanded');
    });
    card.classList.add('expanded');
}

// Index logo navigation is handled by the sidebar module

