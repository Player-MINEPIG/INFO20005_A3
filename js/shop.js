import { initCartDrawer } from './insertCartDrawer.js';

document.addEventListener('DOMContentLoaded', () => {
    initCartDrawer();
});

// Fold menu button
let isFolded = false;
document.addEventListener('click', function (e) {
    if (e.target.closest('.menu-btn')) {
        const menuGroup = e.target.closest('.menu-group');
        if (menuGroup) {
            isFolded = !isFolded;
            syncAllMenuGroups(isFolded);
        }
    }
});

// synchronize the fold menu state with the cart drawer
document.addEventListener('cartDrawerShown', function () {
    syncAllMenuGroups(isFolded);
});

document.addEventListener('cartDrawerHidden', function () {
    syncAllMenuGroups(isFolded);
});

// Index logo navigation
document.addEventListener('click', function(e) {
    if (e.target.closest('.logo')) {
        window.location.href = './index.html';
    }
});

function switchFoldMenu(isFolded, menuGroup) {
    if (isFolded) {
        menuGroup.querySelector('.menu-btn').classList.add('active');
        menuGroup.querySelector('.main-menu').classList.add('folded');
    } else {
        menuGroup.querySelector('.menu-btn').classList.remove('active');
        menuGroup.querySelector('.main-menu').classList.remove('folded');
    }
}

function syncAllMenuGroups(isFolded) {
    let menuGroups = document.getElementsByClassName('menu-group');
    for (let i = 0; i < menuGroups.length; i++) {
        switchFoldMenu(isFolded, menuGroups[i]);
    }
}

