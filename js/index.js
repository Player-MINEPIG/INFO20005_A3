document.addEventListener('DOMContentLoaded', () => {

    // Fold menu button
    let isFolded = false;
    let foldMenuButton = document.querySelector('.menu-btn');

    if (foldMenuButton) {
        foldMenuButton.addEventListener('click', () => {
            console.log('foldMenuButton clicked');
            isFolded = !isFolded;
            if (isFolded) {
                foldMenuButton.classList.add('active');
                document.querySelector('.main-menu').classList.add('folded');
            } else {
                foldMenuButton.classList.remove('active');
                document.querySelector('.main-menu').classList.remove('folded');
            }
        });
    } else {
        console.error('Menu button not found');
    }

    // Cart Drawer
    const openCartBtn = document.querySelector('.hero-header .cart-btn');
    const closeCartBtn = document.querySelector('.cart-menu .cart-btn');
    const cartDrawer = document.querySelector('.cart-drawer');
    const cartOverlay = document.querySelector('.cart-overlay')

    if (openCartBtn && cartDrawer && cartOverlay) {
        openCartBtn.addEventListener('click', () => {
            cartDrawer.classList.add('active');
            cartOverlay.classList.add('active');
        });
        closeCartBtn.addEventListener('click', () => {
            cartDrawer.classList.remove('active');
            cartOverlay.classList.remove('active');
        });
        cartOverlay.addEventListener('click', () => {
            cartDrawer.classList.remove('active');
            cartOverlay.classList.remove('active');
        });
    }
});