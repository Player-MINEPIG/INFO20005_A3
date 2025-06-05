import { initCartDrawer } from './insertCartDrawer.js';
import { initHeader } from './insertHeader.js';
import { initMenuDrawer } from './insertMenuDrawer.js';
import { getCart } from './cartOperation.js';

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initCartDrawer();
    initMenuDrawer();

    // Readonly all inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.readOnly = true;
    });

    // Render email
    const email = localStorage.getItem('email');
    const emailInput = document.querySelector('.email input');
    emailInput.value = email;

    // Render delivery
    let deliveryOptionValue = localStorage.getItem('delivery');
    if (!deliveryOptionValue) {
        deliveryOptionValue = 'pickup';
    }
    const deliveryOption = document.querySelector('.delivery-option input[value="' + deliveryOptionValue + '"]');
    deliveryOption.checked = true;

    document.querySelectorAll('.delivery-option').forEach(option => {
        const radio = option.querySelector('input[type="radio"]');
        if (radio) {
            if (!radio.checked) {
                option.style.display = 'none';
            }
        }
    });

    if (deliveryOptionValue === 'auspost') {
        const deliveryAddress = document.querySelector('.custom-delivery-address');
        deliveryAddress.classList.add('active');
        const deliveryAddressValues = JSON.parse(localStorage.getItem('deliveryAddress'));
        document.querySelector('.first-name input').value = deliveryAddressValues.firstName;
        document.querySelector('.last-name input').value = deliveryAddressValues.lastName;
        document.querySelector('.address input:nth-child(2)').value = deliveryAddressValues.addressLine1;
        document.querySelector('.address input:nth-child(3)').value = deliveryAddressValues.addressLine2;
        document.querySelector('.suburb input').value = deliveryAddressValues.suburb;
        document.querySelector('.state input').value = deliveryAddressValues.state;
        document.querySelector('.postcode input').value = deliveryAddressValues.postcode;
        document.querySelector('.country input').value = deliveryAddressValues.country;
        document.querySelector('.phone-number input').value = deliveryAddressValues.phoneNumber;
    }

    // Render payment
    let paymentOptionValue = localStorage.getItem('payment');
    if (!paymentOptionValue) {
        paymentOptionValue = 'credit-card';
    }
    const paymentOption = document.querySelector('.payment-option input[value="' + paymentOptionValue + '"]');
    paymentOption.checked = true;

    document.querySelectorAll('.payment-option').forEach(option => {
        const radio = option.querySelector('input[type="radio"]');
        if (radio) {
            if (!radio.checked) {
                option.style.display = 'none';
            }
        }
    });

    let billingOptionValue = localStorage.getItem('billing');
    if (!billingOptionValue) {
        billingOptionValue = 'same-as-shipping';
    }
    const billingOption = document.querySelector('.billing-option input[value="' + billingOptionValue + '"]');
    billingOption.checked = true;

    document.querySelectorAll('.billing-option').forEach(option => {
        const radio = option.querySelector('input[type="radio"]');
        if (radio) {
            if (!radio.checked) {
                option.style.display = 'none';
            }
        }
    });

    if (billingOptionValue === 'different-billing') {
        const billingAddress = document.querySelector('.custom-billing-address');
        billingAddress.classList.add('active');
        const billingAddressValues = JSON.parse(localStorage.getItem('billingAddress'));
        billingAddress.querySelector('.first-name input').value = billingAddressValues.firstName;
        billingAddress.querySelector('.last-name input').value = billingAddressValues.lastName;
        billingAddress.querySelector('.address input:nth-child(2)').value = billingAddressValues.addressLine1;
        billingAddress.querySelector('.address input:nth-child(3)').value = billingAddressValues.addressLine2;
        billingAddress.querySelector('.suburb input').value = billingAddressValues.suburb;
        billingAddress.querySelector('.state input').value = billingAddressValues.state;
        billingAddress.querySelector('.postcode input').value = billingAddressValues.postcode;
        billingAddress.querySelector('.country input').value = billingAddressValues.country;
        billingAddress.querySelector('.phone-number input').value = billingAddressValues.phoneNumber;
    }

    function updateCheckoutProducts() {
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

        const checkoutProducts = document.querySelector('.checkout-products');
        checkoutProducts.innerHTML = '';
        const cart = getCart();
        let totalPrice = 0;
        if (cart.length === 0) {
            checkoutProducts.innerHTML = '<p>Your cart is empty.</p>';
            document.querySelector('.checkout-subtotal-amount').textContent = `A$${totalPrice}`;
            return;
        }
        cart.forEach(product => {
            const price = product.pricePerUnit * product.quantity;
            totalPrice += price;
            checkoutProducts.innerHTML += `
                <div class="checkout-product" style="background: ${productNameBackgroundMap[product.name]}">
                    <h3>${product.name}</h3>
                    <span class="checkout-product-size">
                        <span>Size: </span>
                        <span class="checkout-product-size-option">${product.size}</span>
                    </span>
                    <img class="checkout-product-img" src="${productNameImgMap[product.name]}" alt="${product.name}">
                    <span class="checkout-product-price">
                        <span class="checkout-product-price-number">A$${price}</span>
                    </span>
                    <span class="checkout-product-quantity">
                        <input type="number" class="quantity-number" value="${product.quantity}" min="1" max="99">
                    </span>
                </div>
            `;
        });
    
        // Bind product card click event
        checkoutProducts.querySelectorAll('.checkout-product').forEach(product => {
            product.addEventListener('click', () => {
                window.location.href = productNamePageMap[product.querySelector('h3').textContent];
            });
        });
    
        // Update subtotal
        totalPrice += parseFloat(localStorage.getItem('deliveryFee') || 0);
        document.querySelector('.checkout-subtotal-amount').textContent = `A$${totalPrice}`;
    }

    updateCheckoutProducts();
});







