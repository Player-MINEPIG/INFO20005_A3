import { updateCartBadge } from './cartOperation.js';

export function initHeader() {
    async function fetchHeaderHTML() {
        const res = await fetch(`../components/header/header.html`);
        if (!res.ok) throw new Error('Failed to load header HTML');
        return await res.text();
    }

    fetchHeaderHTML().then(headerHTML => {
        const container = document.querySelector('.container');
        container.insertAdjacentHTML('afterbegin', headerHTML);
        const logos = document.getElementsByClassName('logo');
        for (let i = 0; i < logos.length; i++) {
            logos[i].addEventListener('click', () => {
                window.location.href = './index.html';
            });
        }
        updateCartBadge();
    });
}