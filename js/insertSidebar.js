import { showCartDrawer, hideCartDrawer } from './insertCartDrawer.js';
import { updateCartBadge } from './cartOperation.js';

export function initSidebar(positionSelector) {
    async function fetchSidebarHTML() {
        const data = document.body.dataset.page;
        if (data !== 'index') {
            const res = await fetch(`../components/sidebar/sidebar.html`);
            if (!res.ok) throw new Error('Failed to load sidebar HTML');
            return await res.text();
        }
    }

    let isFolded = false;
    // Insert HTML and bind events when page loads
    fetchSidebarHTML().then(sidebarHTML => {
        document.querySelector(positionSelector).insertAdjacentHTML('afterbegin', sidebarHTML);

        // Bind cart drawer events
        const openCartBtn = document.querySelector('.side-bar .cart-btn');
        if (openCartBtn) {
            openCartBtn.addEventListener('click', showCartDrawer);
        }
        const closeCartBtn = document.querySelector('.cart-menu .cart-btn');
        if (closeCartBtn) {
            closeCartBtn.addEventListener('click', hideCartDrawer);
        }

        // Bind menu button events
        const menuGroups = document.getElementsByClassName('menu-group');
        for (let i = 0; i < menuGroups.length; i++) {
            const menuGroup = menuGroups[i];
            const menuBtn = menuGroup.querySelector('.menu-btn');
            if (menuBtn) {
                menuBtn.addEventListener('click', () => {
                    isFolded = !isFolded;
                    syncAllMenuGroups(isFolded);
                });
            }
        }

        // Bind logo events
        const logo = document.querySelectorAll('.logo');
        for (let i = 0; i < logo.length; i++) {
            logo[i].addEventListener('click', () => {
                window.location.href = './index.html';
            });
        }

        updateCartBadge();
    });

    // synchronize the fold menu state with the cart drawer
    document.addEventListener('cartDrawerShown', function () {
        syncAllMenuGroups(isFolded);
    });

    document.addEventListener('cartDrawerHidden', function () {
        syncAllMenuGroups(isFolded);
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
} 