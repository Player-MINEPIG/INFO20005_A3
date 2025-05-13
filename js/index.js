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

    // 购物车侧边抽屉逻辑
    const cartBtn = document.querySelector('.cart-btn');
    const cartDrawer = document.querySelector('.cart-drawer');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCartBtn = document.querySelector('.close-cart');

    if (cartBtn && cartDrawer && cartOverlay && closeCartBtn) {
        cartBtn.addEventListener('click', () => {
            cartDrawer.classList.add('active');
            cartOverlay.classList.add('active');
        });
        cartOverlay.addEventListener('click', () => {
            cartDrawer.classList.remove('active');
            cartOverlay.classList.remove('active');
        });
        closeCartBtn.addEventListener('click', () => {
            cartDrawer.classList.remove('active');
            cartOverlay.classList.remove('active');
        });
    }
});