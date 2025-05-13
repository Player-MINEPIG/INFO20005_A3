export function initCartDrawer() {
    // Load different cart drawer HTML for different pages
  async function fetchCartDrawerHTML() {
    const data = document.body.dataset.page;
    if (data === 'index') {
        const res = await fetch(`/components/cart-drawers/homepage-cart-drawer.html`);
        if (!res.ok) throw new Error('Failed to load homepage cart drawer HTML');
        return await res.text();
    }
    else if (data === 'shop') {
        const res = await fetch(`/components/cart-drawers/shop-cart-drawer.html`);
        if (!res.ok) throw new Error('Failed to load shop cart drawer HTML');
        return await res.text();
    }
  }

    // Insert HTML and bind events when page loads
    fetchCartDrawerHTML().then(cartDrawerHTML => {
        document.body.insertAdjacentHTML('beforeend', cartDrawerHTML);
        // Bind close events
        document.querySelector('.cart-overlay').addEventListener('click', hideCartDrawer);
        document.querySelector('.cart-menu .cart-btn').addEventListener('click', hideCartDrawer);
    });

    function showCartDrawer() {
        document.querySelector('.cart-drawer').classList.add('active');
        document.querySelector('.cart-overlay').classList.add('active');
    }

    function hideCartDrawer() {
        document.querySelector('.cart-drawer').classList.remove('active');
        document.querySelector('.cart-overlay').classList.remove('active');
    }

    const openCartBtn = document.querySelector('.cart-btn');
    if (openCartBtn) {
        openCartBtn.addEventListener('click', showCartDrawer);
    }
} 