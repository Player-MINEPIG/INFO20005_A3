import { initSidebar } from './insertSidebar.js';
import { getCart } from './cartOperation.js';

export function initCartDrawer() {
    // Load different cart drawer HTML for different pages
    const data = document.body.dataset.page;
    
  async function fetchCartDrawerHTML() {
    if (data === 'index') {
        const res = await fetch(`../components/cart-drawers/homepage-cart-drawer.html`);
        if (!res.ok) throw new Error('Failed to load homepage cart drawer HTML');
        return await res.text();
    }
    else {
        const res = await fetch(`../components/cart-drawers/non-homepage-cart-drawer.html`);
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
    document.querySelector('.cart-drawer').classList.add('active');
    document.querySelector('.cart-overlay').classList.add('active');
    document.dispatchEvent(new Event('cartDrawerShown'));
    updateCartProducts();
}

export function hideCartDrawer() {
    document.querySelector('.cart-drawer').classList.remove('active');
    document.querySelector('.cart-overlay').classList.remove('active');
    document.dispatchEvent(new Event('cartDrawerHidden'));
}

let productNameImgMap = {
    'Colombia - Hulia Decaf De Cana': '../assets/images/hulia-cut.jpg',
    'Colombia - China Alta': '../assets/images/china-cut.jpg'
}

let productNameBackgroundMap = {
    'Colombia - Hulia Decaf De Cana': 'linear-gradient(180deg, #E1BB67 0%, #9E844B 150%)',
    'Colombia - China Alta': 'linear-gradient(180deg, #A65A47 0%, #894534 100%)'
}

function updateCartProducts() {
    const cartProducts = document.querySelector('.cart-products');
    cartProducts.innerHTML = '';
    const cart = getCart();
    cart.forEach(product => {
        cartProducts.innerHTML += `
            <div class="cart-product" style="background: ${productNameBackgroundMap[product.name]}">
                <h3>${product.name}</h3>
                <span class="cart-product-size">
                    <span>Size: </span>
                    <span class="cart-product-size-option">${product.size}</span>
                </span>
                <img class="cart-product-img" src="${productNameImgMap[product.name]}" alt="${product.name}">
                <span class="cart-product-price">
                    <span class="cart-product-price-number">A$${product.pricePerUnit * product.quantity}</span>
                </span>
                <span class="cart-product-quantity">
                    <img class="minus-icon" src="../assets/images/triangle.svg" alt="Minus">
                    <input type="number" class="quantity-number" value="${product.quantity}" min="1" max="99">
                    <img class="plus-icon" src="../assets/images/triangle.svg" alt="Plus">
                </span>
            </div>
        `;
    });
}