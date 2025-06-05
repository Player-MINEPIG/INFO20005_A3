import { initSidebar } from './insertSidebar.js';
import { addToCart, removeFromCart, getCart, updateCartBadge } from './cartOperation.js';

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

        // Bind checkout button event
        document.querySelector('.checkout-btn').addEventListener('click', (e) => {
            if (e.target.classList.contains('active')) {
                window.location.href = './checkout.html';
            }
            else {
                alert('Empty cart');
            }  
        });

        updateCartProducts();
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

const productNameImgMap = {
    'Colombia - Hulia Decaf De Cana': '../assets/images/hulia-cut.jpg',
    'Colombia - China Alta': '../assets/images/china-cut.jpg'
}

const productNameBackgroundMap = {
    'Colombia - Hulia Decaf De Cana': 'linear-gradient(180deg, #E1BB67 0%, #9E844B 150%)',
    'Colombia - China Alta': 'linear-gradient(180deg, #A65A47 0%, #894534 100%)'
}

const productNamePageMap = {
    'Colombia - Hulia Decaf De Cana': './espressos-Hulia.html',
    'Colombia - China Alta': './espressos-China.html'
}

export function updateCartProducts() {
    const cartProducts = document.querySelector('.cart-products');
    cartProducts.innerHTML = '';
    const cart = getCart();
    let totalPrice = 0;
    if (cart.length === 0) {
        cartProducts.innerHTML = '<p>Your cart is empty.</p>';
        document.querySelector('.subtotal-amount').textContent = `A$${totalPrice}`;
        document.querySelector('.checkout-btn').classList.remove('active');
        return;
    }
    cart.forEach(product => {
        const price = product.pricePerUnit * product.quantity;
        totalPrice += price;
        cartProducts.innerHTML += `
            <div class="cart-product" style="background: ${productNameBackgroundMap[product.name]}">
                <h3>${product.name}</h3>
                <span class="cart-product-size">
                    <span>Size: </span>
                    <span class="cart-product-size-option">${product.size}</span>
                </span>
                <img class="cart-product-img" src="${productNameImgMap[product.name]}" alt="${product.name}">
                <span class="cart-product-price">
                    <span class="cart-product-price-number">A$${price}</span>
                </span>
                <span class="cart-product-quantity">
                    <img class="minus-icon" src="../assets/images/triangle.svg" alt="Minus">
                    <input type="number" class="quantity-number" value="${product.quantity}" min="1" max="99">
                    <img class="plus-icon" src="../assets/images/triangle.svg" alt="Plus">
                </span>
            </div>
        `;
    });

    // Bind product card click event
    cartProducts.querySelectorAll('.cart-product').forEach(product => {
        product.addEventListener('click', () => {
            window.location.href = productNamePageMap[product.querySelector('h3').textContent];
        });
    });
    
    // Bind quantityevents
    document.querySelectorAll('.cart-product-quantity .minus-icon').forEach(icon => {
        icon.addEventListener('click', onCartMinusIconClick);
    });
    document.querySelectorAll('.cart-product-quantity .plus-icon').forEach(icon => {
        icon.addEventListener('click', onCartPlusIconClick);
    });

    // Update subtotal
    totalPrice += parseFloat(localStorage.getItem('deliveryFee') || 0);
    document.querySelector('.subtotal-amount').textContent = `A$${totalPrice}`;

    // Enable checkout button if cart is not empty
    document.querySelector('.checkout-btn').classList.add('active');
}

function onCartMinusIconClick(e) {
    e.stopPropagation();
    const cartProduct = e.target.closest('.cart-product');
    const quantity = parseInt(cartProduct.querySelector('.quantity-number').value);
    const product = {
        name: cartProduct.querySelector('h3').textContent,
        size: cartProduct.querySelector('.cart-product-size-option').textContent,
        pricePerUnit: parseFloat(cartProduct.querySelector('.cart-product-price-number').textContent.replace(/[^\d.]/g, '')) / quantity,
        quantity: 1,
    };
    removeFromCart(product);
    updateCartProducts();
    updateCartBadge();
}

function onCartPlusIconClick(e) {
    e.stopPropagation();
    const cartProduct = e.target.closest('.cart-product');
    const quantity = parseInt(cartProduct.querySelector('.quantity-number').value);
    const product = {
        name: cartProduct.querySelector('h3').textContent,
        size: cartProduct.querySelector('.cart-product-size-option').textContent,
        pricePerUnit: parseFloat(cartProduct.querySelector('.cart-product-price-number').textContent.replace(/[^\d.]/g, '')) / quantity,
        quantity: 1,
    };
    addToCart(product);
    updateCartProducts();
    updateCartBadge();
}