import { initCartDrawer } from './insertCartDrawer.js';
import { initHeader } from './insertHeader.js';
import { initMenuDrawer } from './insertMenuDrawer.js';

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initCartDrawer();
    initMenuDrawer();

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
        } else {
            emailContinueBtn.classList.remove('active');
            deliveryCard.classList.remove('available');
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


    // Active card
    function activeCard(targetCard) {
        console.log(targetCard);
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('active');
        });
        targetCard.classList.add('active');
    }
});

// Index logo navigation is handled by the sidebar module





