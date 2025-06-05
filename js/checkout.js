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
        if (emailCard.classList.contains('available')) {
            activeCard('.email');
        }
    });

    // Delivery active
    const deliveryCard = document.querySelector('.delivery');
    deliveryCard.addEventListener('click', () => {
        if (deliveryCard.classList.contains('available')) {
            activeCard('.delivery');
        }
    });

    // Payment active
    const paymentCard = document.querySelector('.payment');
    paymentCard.addEventListener('click', () => {
        if (paymentCard.classList.contains('available')) {
            activeCard('.payment');
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

    emailContinueBtn.addEventListener('click', () => {
        if (!isValidEmail(emailInput.value.trim())) {
            alert('Please enter a valid email address');
            return;
        }
        activeCard('.delivery');
    });

    // Delivery validation


    // Active card
    function activeCard(card) {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('active');
        });
        document.querySelector(card).classList.add('active');
    }
});

// Index logo navigation is handled by the sidebar module





