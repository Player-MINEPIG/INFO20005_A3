import { initCartDrawer } from './insertCartDrawer.js';
import { initSidebar } from './insertSidebar.js';

document.addEventListener('DOMContentLoaded', () => {
    initCartDrawer();
    initSidebar('.side-bar');
});

// Index logo navigation
document.addEventListener('click', function(e) {
    if (e.target.closest('.logo')) {
        window.location.href = './index.html';
    }
});

