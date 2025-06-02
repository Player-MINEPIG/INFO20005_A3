import { initCartDrawer } from './insertCartDrawer.js';
import { initSidebar } from './insertSidebar.js';

document.addEventListener('DOMContentLoaded', () => {
    initCartDrawer();
    initSidebar('.side-bar');
});

// Index logo navigation is handled by the sidebar module

// Add card navigation events for mobile
const espressoCard = document.querySelector('.espresso-card');
if (espressoCard) {
    espressoCard.addEventListener('click', () => {
        if (window.innerWidth < 1368) {
            window.location.href = '/pages/espressos.html';
        }
    });
}



