import { initHeader, getLastPage } from './insertHeader.js';
import { updateCartProducts } from './insertCartDrawer.js';
import { initMenuDrawer } from './insertMenuDrawer.js';

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMenuDrawer();
    updateCartProducts();
});

// Index logo navigation is handled by the sidebar module

// Add back button event
const backBtn = document.querySelector('.back-btn');
backBtn.addEventListener('click', () => {
    window.location.href = getLastPage();   
});

// Add checkout button event
const checkoutBtn = document.querySelector('.checkout-btn');
checkoutBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (e.target.classList.contains('active')) {
        window.location.href = './checkout.html';
    }
    else {
        alert('Empty cart');
    }  
});

// Add window resize event
window.addEventListener('resize', () => {
    if (window.innerWidth > 1368) {
        window.location.href = getLastPage();
    }
});




