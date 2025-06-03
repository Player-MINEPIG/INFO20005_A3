import { initCartDrawer } from './insertCartDrawer.js';
import { initSidebar } from './insertSidebar.js';

document.addEventListener('DOMContentLoaded', () => {

    // Initialize cart drawer
    initCartDrawer();

    // Initialize sidebar
    // Index logo navigation is handled by the sidebar module
    initSidebar('.side-bar');

    // Add product card expand animation
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            expandProductCard(card);
        });
    });

    // Add size option click handler
    const sizes = document.querySelectorAll('.size');
    sizes.forEach(size => {
        const options = size.querySelectorAll('.size-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                onSizeOptionClick(option, options, size);
            });
        });
    });

    // Add quantity click handler
    const quantityInputs = document.querySelectorAll('.quantity');
    quantityInputs.forEach(input => {
        input.querySelector('.minus-icon').addEventListener('click', () => {
            onMinusIconClick(input);
        });
        input.querySelector('.plus-icon').addEventListener('click', () => {
            onPlusIconClick(input);
        });
    });
});

// Expand product card animation
function expandProductCard(targetCard) {
    if (targetCard.classList.contains('expanded')) return;
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        fadeOut(card);

        card.removeEventListener('transitionend', onTransitionEnd);

        card.addEventListener('transitionend', onTransitionEnd);
    });

    function onTransitionEnd(e) {
        // opacity
        if (e.propertyName === 'opacity') {
            onFadeEnd(e);
            return;
        };

        // flex
        if (e.propertyName === 'flex-grow') {
            onFlexTransitionEnd(e);
            return;
        };
    }

    function onFadeEnd(e) {
        // check if fade out
        const opacity = window.getComputedStyle(e.currentTarget.querySelector('.product-info')).opacity;
        if (opacity === '0') {
            const detailPs = e.currentTarget.querySelectorAll('.product-detail p');
            detailPs.forEach(p => {
                p.style.display = 'none';
            });

            if (e.currentTarget === targetCard) {
                targetCard.classList.add('expanded');
            } else {
                e.currentTarget.classList.remove('expanded');
            }
        }
    }

    function onFlexTransitionEnd(e) {
        const detailPs = e.currentTarget.querySelectorAll('.product-detail p');
        detailPs.forEach(p => {
            p.style.display = 'flex';
        });
        fadeIn(e.currentTarget);
    }
}

function fadeOut(card) {
    card.classList.remove('fade-in');
    card.classList.add('fade-out');
}

function fadeIn(card) {
    card.classList.remove('fade-out');
    card.classList.add('fade-in');
}

// Size option click
function onSizeOptionClick(targetOption, options, size) {
    const addToCartBtn = size.closest('.product-info').querySelector('.add-to-cart');
    
    if (targetOption.classList.contains('selected')) {
        options.forEach(option => {
            option.classList.remove('selected');
        });
        addToCartBtn.classList.remove('available');
    } else {
        options.forEach(option => {
            option.classList.remove('selected');
        });
        targetOption.classList.add('selected');
        addToCartBtn.classList.add('available');
    }
}

// Quantity click
function onMinusIconClick(targetInput) {
    const quantityNumber = targetInput.querySelector('.quantity-number');
    const quantity = parseInt(quantityNumber.value);
    quantityNumber.value = Math.max(1, quantity - 1);
}

function onPlusIconClick(targetInput) {
    const quantityNumber = targetInput.querySelector('.quantity-number');
    const quantity = parseInt(quantityNumber.value);
    quantityNumber.value = Math.min(99, quantity + 1);
}


