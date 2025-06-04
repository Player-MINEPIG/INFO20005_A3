import { initCartDrawer } from './insertCartDrawer.js';
import { updateCartBadge } from './cartOperation.js';

document.addEventListener('DOMContentLoaded', () => {
    initCartDrawer();
    updateCartBadge(document.querySelector('.cart-badge'));
    
    // Shop card navigation
    const shopCard = document.querySelector('.shop-card');
    if (shopCard) {
        shopCard.addEventListener('click', () => {
            window.location.href = './shop.html';
        });
    }

    // Index logo navigation
    const logos = document.getElementsByClassName('logo');
    for (let i = 0; i < logos.length; i++) {
        logos[i].addEventListener('click', () => {
            window.location.href = './index.html';
        });
    }


    // Fold menu button
    let isFolded = false;
    let foldMenuButton = document.querySelector('.menu-btn');

    if (foldMenuButton) {
        foldMenuButton.addEventListener('click', () => {
            console.log('foldMenuButton clicked');
            isFolded = !isFolded;
            if (isFolded) {
                foldMenuButton.classList.add('active');
                document.querySelector('.main-menu').classList.add('folded');
            } else {
                foldMenuButton.classList.remove('active');
                document.querySelector('.main-menu').classList.remove('folded');
            }
        });
    } else {
        console.error('Menu button not found');
    }
});