import { updateCartBadge } from './cartOperation.js';
import { switchMenuDrawer } from './insertMenuDrawer.js';

export function initHeader() {
    async function fetchHeaderHTML() {
        const res = await fetch(`../components/header/header.html`);
        if (!res.ok) throw new Error('Failed to load header HTML');
        return await res.text();
    }

    fetchHeaderHTML().then(headerHTML => {
        const container = document.querySelector('.container');
        container.insertAdjacentHTML('afterbegin', headerHTML);

        // Bind logo click event
        const logos = document.getElementsByClassName('logo');
        for (let i = 0; i < logos.length; i++) {
            logos[i].addEventListener('click', () => {
                window.location.href = './index.html';
            });
        }

        // Bind cart button click event
        const cartBtn = document.querySelector('header .cart-btn');
        cartBtn.addEventListener('click', () => {
            setLastPage();
            window.location.href = './cart-mobile.html';
        });

        // Bind menu button click event
        const menuBtn = document.querySelector('header .menu-btn');
        menuBtn.addEventListener('click', () => {
            switchMenuDrawer(document.querySelector('header').offsetHeight + 'px');
        });

        updateCartBadge();
    });
}

function setLastPage() {
    const lastPage = window.location.pathname;
    localStorage.setItem('lastPage', lastPage);
}

export function getLastPage() {
    const lastPage = localStorage.getItem('lastPage');
    if (lastPage) {
        return lastPage;
    }
    return './index.html';
}