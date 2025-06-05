import { initCartDrawer } from './insertCartDrawer.js';
import { initHeader } from './insertHeader.js';
import { initMenuDrawer } from './insertMenuDrawer.js';
import { updateCartProducts } from './insertCartDrawer.js';

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initCartDrawer();
    initMenuDrawer();

    // Validations
    let emailValid = false;
    let deliveryValid = false;
    let paymentValid = false;

    // Email active
    const emailCard = document.querySelector('.email');
    emailCard.addEventListener('click', () => {
        if (emailCard.classList.contains('available') && !emailCard.classList.contains('active')) {
            activeCard(emailCard);
        }
    });

    // Delivery active
    const deliveryCard = document.querySelector('.delivery');
    deliveryCard.addEventListener('click', () => {
        if (deliveryCard.classList.contains('available') && !deliveryCard.classList.contains('active')) {
            activeCard(deliveryCard);
        }
    });

    // Payment active
    const paymentCard = document.querySelector('.payment');
    paymentCard.addEventListener('click', () => {
        if (paymentCard.classList.contains('available') && !paymentCard.classList.contains('active')) {
            activeCard(paymentCard);
        }
    });

    // Email validation
    const emailInput = emailCard.querySelector('input');
    const emailContinueBtn = emailCard.querySelector('button');

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    emailInput.addEventListener('input', () => {
        if (isValidEmail(emailInput.value.trim())) {
            emailContinueBtn.classList.add('active');
            deliveryCard.classList.add('available');
            emailValid = true;
            reviewOrderButtonState();
        } else {
            emailContinueBtn.classList.remove('active');
            deliveryCard.classList.remove('available');
            emailValid = false;
            reviewOrderButtonState();
        }
    });

    emailContinueBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isValidEmail(emailInput.value.trim())) {
            alert('Please enter a valid email address');
            return;
        }
        activeCard(deliveryCard);
    });

    // Delivery validation
    const deliveryContinueBtn = deliveryCard.querySelector('button');
    const deliveryInputs = deliveryCard.querySelectorAll('input[type="text"]');
    const deliveryRadios = deliveryCard.querySelectorAll('input[type="radio"]');
    let checkedRadio = null;
    const customDeliveryAddress = deliveryCard.querySelector('.custom-delivery-address');

    function checkDeliveryInputs() {
        const allFilled = Array.from(deliveryInputs).every(input => input.value.trim() !== '');

        checkedRadio = null;
        deliveryRadios.forEach(radio => {
            if (radio.checked) {
                checkedRadio = radio;
            }
        });

        if (checkedRadio) {
            if (checkedRadio.value === 'pickup') {
                localStorage.setItem('deliveryFee', 0);
                updateCartProducts();
                deliveryContinueBtn.classList.add('active');
                paymentCard.classList.add('available');
                deliveryValid = true;
                reviewOrderButtonState();
            } else if (checkedRadio.value === 'auspost') {
                localStorage.setItem('deliveryFee', 10.00);
                updateCartProducts();
                if (allFilled) {
                    deliveryContinueBtn.classList.add('active');
                    paymentCard.classList.add('available');
                    deliveryValid = true;
                    reviewOrderButtonState();
                } else {
                    deliveryContinueBtn.classList.remove('active');
                    paymentCard.classList.remove('available');
                    deliveryValid = false;
                    reviewOrderButtonState();
                }
            }
        }
    }

    function onDeliveryRadioChange() {
        checkDeliveryInputs();
        if (checkedRadio.value === 'auspost') {
            customDeliveryAddress.classList.add('active');
        } else {
            customDeliveryAddress.classList.remove('active');
        }
    }

    deliveryInputs.forEach(input => {
        input.addEventListener('input', checkDeliveryInputs);
    });

    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', onDeliveryRadioChange);
    });

    deliveryContinueBtn.addEventListener('click', (e) => {
        console.log('deliveryContinueBtn clicked');
        e.stopPropagation();
        if (!deliveryContinueBtn.classList.contains('active')) {
            alert('Please fill in all required fields');
            return;
        }
        activeCard(paymentCard);
    });

    // Payment validation
    const paymentContinueBtn = paymentCard.querySelector('button');
    const paymentRadios = paymentCard.querySelectorAll('.payment-option input[type="radio"]');
    let checkedPaymentRadio = null;
    const billingRadios = paymentCard.querySelectorAll('.billing-option input[type="radio"]');
    let checkedBillingRadio = null;
    const customBillingAddress = paymentCard.querySelector('.custom-billing-address');
    const billingInputs = customBillingAddress.querySelectorAll('input[type="text"]');
    
    function checkPaymentInputs() {
        const allFilled = Array.from(billingInputs).every(input => input.value.trim() !== '');
        const isPaymentRadioChecked = Array.from(paymentRadios).some(radio => radio.checked);

        checkedPaymentRadio = null;
        paymentRadios.forEach(radio => {
            if (radio.checked) {
                checkedPaymentRadio = radio;
            }
        });

        checkedBillingRadio = null;
        billingRadios.forEach(radio => {
            if (radio.checked) {
                checkedBillingRadio = radio;
            }
        });

        if (isPaymentRadioChecked && checkedBillingRadio) {
            if (checkedBillingRadio.value === 'same-as-shipping') {
                paymentContinueBtn.classList.add('active');
                paymentValid = true;
                reviewOrderButtonState();
            } else if (checkedBillingRadio.value === 'different-billing') {
                if (allFilled) {
                    paymentContinueBtn.classList.add('active');
                    paymentValid = true;
                    reviewOrderButtonState();
                } else {
                    paymentContinueBtn.classList.remove('active');
                    paymentValid = false;
                    reviewOrderButtonState();
                }
            }
        }
        
    }

    function onBillingRadioChange() {
        checkPaymentInputs();
        if (checkedBillingRadio.value === 'different-billing') {
            customBillingAddress.classList.add('active');
        } else {
            customBillingAddress.classList.remove('active');
        }
    }

    billingRadios.forEach(radio => {
        radio.addEventListener('change', onBillingRadioChange);
    });

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', checkPaymentInputs);
    });

    billingInputs.forEach(input => {
        input.addEventListener('input', checkPaymentInputs);
    });

    paymentContinueBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!paymentContinueBtn.classList.contains('active')) {
            alert('Please fill in all required fields');
            return;
        }
        storeData();
        window.location.href = './review-order.html';
    });

    // Active card
    function activeCard(targetCard) {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('active');
        });
        targetCard.classList.add('active');
    }

    // Review order button
    const reviewOrderBtn = document.querySelector('.review-order-btn');
    reviewOrderBtn.addEventListener('click', () => {
        if (!reviewOrderButtonState()) {
            alert('Please fill in all required fields');
            return;
        }
        storeData();
        window.location.href = './review-order.html';
    });

    function reviewOrderButtonState() {
        if (emailValid && deliveryValid && paymentValid) {
            reviewOrderBtn.classList.add('active');
            return true;
        } else {
            reviewOrderBtn.classList.remove('active');
            return false;
        }
    }

    function storeData() {
        // store email and options
        localStorage.setItem('email', emailInput.value);
        localStorage.setItem('delivery', checkedRadio.value);
        localStorage.setItem('payment', checkedPaymentRadio.value);
        localStorage.setItem('billing', checkedBillingRadio.value);

        // store delivery address
        localStorage.setItem('deliveryAddress', JSON.stringify({
            firstName: deliveryInputs[0].value,
            lastName: deliveryInputs[1].value,
            addressLine1: deliveryInputs[2].value,
            addressLine2: deliveryInputs[3].value,
            suburb: deliveryInputs[4].value,
            state: deliveryInputs[5].value,
            postcode: deliveryInputs[6].value,
            country: deliveryInputs[7].value,
            phoneNumber: deliveryInputs[8].value,
        }));

        // store billing address
        localStorage.setItem('billingAddress', JSON.stringify({
            firstName: billingInputs[0].value,
            lastName: billingInputs[1].value,
            addressLine1: billingInputs[2].value,
            addressLine2: billingInputs[3].value,
            suburb: billingInputs[4].value,
            state: billingInputs[5].value,
            postcode: billingInputs[6].value,
            country: billingInputs[7].value,
            phoneNumber: billingInputs[8].value,
        }));
    }
});





