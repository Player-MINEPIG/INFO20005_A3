import { initCartDrawer } from './insertCartDrawer.js';
import { initSidebar } from './insertSidebar.js';

document.addEventListener('DOMContentLoaded', () => {
    initCartDrawer();
    initSidebar('.side-bar');
});

// Index logo navigation is handled by the sidebar module

