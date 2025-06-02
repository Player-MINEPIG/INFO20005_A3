import { initSidebar } from './insertSidebar.js';

export function initCartDrawer() {
    // Load different cart drawer HTML for different pages
    const data = document.body.dataset.page;
    
  async function fetchCartDrawerHTML() {
    if (data === 'index') {
        const res = await fetch(`../components/cart-drawers/homepage-cart-drawer.html`);
        if (!res.ok) throw new Error('Failed to load homepage cart drawer HTML');
        return await res.text();
    }
    else if (data === 'shop') {
        const res = await fetch(`../components/cart-drawers/shop-cart-drawer.html`);
        if (!res.ok) throw new Error('Failed to load shop cart drawer HTML');
        return await res.text();
    }
  }

    // Insert HTML and bind events when page loads
    fetchCartDrawerHTML().then(cartDrawerHTML => {
        document.body.insertAdjacentHTML('beforeend', cartDrawerHTML);
        if (data === 'index') {
            document.querySelector('.hero-header .cart-btn').addEventListener('click', showCartDrawer);
            document.querySelector('.cart-menu .cart-btn').addEventListener('click', hideCartDrawer);
        } else {
            initSidebar('.cart-menu');
        }
        // Bind close events
        document.querySelector('.cart-overlay').addEventListener('click', hideCartDrawer);
    });
} 

export function showCartDrawer() {
    console.log('showCartDrawer');
    document.querySelector('.cart-drawer').classList.add('active');
    document.querySelector('.cart-overlay').classList.add('active');
    document.dispatchEvent(new Event('cartDrawerShown'));
}

export function hideCartDrawer() {
    document.querySelector('.cart-drawer').classList.remove('active');
    document.querySelector('.cart-overlay').classList.remove('active');
    document.dispatchEvent(new Event('cartDrawerHidden'));
}