import { initCartDrawer } from './insertCartDrawer.js';
import { initHeader, getLastPage } from './insertHeader.js';

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initCartDrawer();
});

// Index logo navigation is handled by the sidebar module

// Add back button event
const backBtn = document.querySelector('.back-btn');
backBtn.addEventListener('click', () => {
    window.location.href = getLastPage();   
});




