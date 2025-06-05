import { initCartDrawer } from './insertCartDrawer.js';
import { initHeader } from './insertHeader.js';
import { initMenuDrawer } from './insertMenuDrawer.js';
import { updateCartProducts } from './insertCartDrawer.js';

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
        const deliveryAddressValues = localStorage.getItem('deliveryAddress');
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
        const billingAddressValues = localStorage.getItem('billingAddress');
        document.querySelector('.first-name input').value = billingAddressValues.firstName;
        document.querySelector('.last-name input').value = billingAddressValues.lastName;
        document.querySelector('.address input:nth-child(2)').value = billingAddressValues.addressLine1;
        document.querySelector('.address input:nth-child(3)').value = billingAddressValues.addressLine2;
        document.querySelector('.suburb input').value = billingAddressValues.suburb;
        document.querySelector('.state input').value = billingAddressValues.state;
        document.querySelector('.postcode input').value = billingAddressValues.postcode;
        document.querySelector('.country input').value = billingAddressValues.country;
        document.querySelector('.phone-number input').value = billingAddressValues.phoneNumber;
    }
});





