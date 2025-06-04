import { initHeader, getLastPage } from './insertHeader.js';
import { updateCartProducts } from './insertCartDrawer.js';

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    updateCartProducts();
});

// Index logo navigation is handled by the sidebar module

// Add back button event
const backBtn = document.querySelector('.back-btn');
backBtn.addEventListener('click', () => {
    window.location.href = getLastPage();   
});




