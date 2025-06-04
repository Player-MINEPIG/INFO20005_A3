export function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

export function addToCart(product) {
    const cart = getCart();
    const existingProduct = cart.find(item => item.name === product.name && item.size === product.size && item.pricePerUnit === product.pricePerUnit);
    
    if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + product.quantity;
    } else {
        cart.push(product);
    }
    
    setCart(cart);
}

export function removeFromCart(product) {
    const cart = getCart();
    const existingProduct = cart.find(item => item.name === product.name && item.size === product.size && item.pricePerUnit === product.pricePerUnit);
    if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) - product.quantity;
        if (existingProduct.quantity <= 0) {
            cart.splice(cart.indexOf(existingProduct), 1);
        }
    }
    setCart(cart);
}

export function clearCart() {
    localStorage.removeItem('cart');
}

// Add to cart click
export function onAddToCartClick(btn, addToCartAvailable) {
    if (!addToCartAvailable) return;
    const productInfo = btn.closest('.product-info');
    const product = {
        name: productInfo.querySelector('.product-info h2').textContent,
        size: productInfo.querySelector('.size-option.selected').textContent,
        pricePerUnit: parseFloat(productInfo.querySelector('.size-option.selected').dataset.price) || 22.00,
        quantity: parseInt(productInfo.querySelector('.quantity .quantity-number').value),
    };
    addToCart(product);
    updateCartBadge(document.querySelectorAll('.cart-badge'));
}

// Update cart badge
export function updateCartBadge(cartBadges) {
    const cart = getCart();
    if (cart.length < 0) {
        cartBadges.forEach(badge => badge.textContent = '0');
    } else if (cart.length < 10) {
        cartBadges.forEach(badge => badge.textContent = cart.length);
    } else {
        cartBadges.forEach(badge => badge.textContent = '9+');
    }
}