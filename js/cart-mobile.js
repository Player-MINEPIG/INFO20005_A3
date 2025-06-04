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




