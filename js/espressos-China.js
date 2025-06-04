import { initCartDrawer } from './insertCartDrawer.js';
import { initSidebar } from './insertSidebar.js';
import { onAddToCartClick } from './cartOperation.js';

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

    // Add to cart availability
    let addToCartAvailable = false;

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
    const quantityContainers = document.querySelectorAll('.quantity');
    quantityContainers.forEach(container => {
        container.querySelector('.minus-icon').addEventListener('click', () => {
            onMinusIconClick(container);
        });
        container.querySelector('.plus-icon').addEventListener('click', () => {
            onPlusIconClick(container);
        });
        container.querySelector('.quantity-number').addEventListener('change', () => {
            onQuantityChange(container);
        });
    });

    // Add add to cart handler
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            onAddToCartClick(btn, addToCartAvailable);
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
        const productInfo = size.closest('.product-info');
        const addToCartBtn = productInfo.querySelector('.add-to-cart');

        if (targetOption.classList.contains('selected')) {
            options.forEach(option => {
                option.classList.remove('selected');
            });
            addToCartAvailable = false;
            onPriceChange(productInfo);
            addToCartBtn.classList.remove('available');
        } else {
            options.forEach(option => {
                option.classList.remove('selected');
            });
            targetOption.classList.add('selected');
            addToCartAvailable = true;
            onPriceChange(productInfo);
            addToCartBtn.classList.add('available');
        }
    }

    // Quantity click
    function onMinusIconClick(targetContainer) {
        const quantityNumber = targetContainer.querySelector('.quantity-number');
        const quantity = parseInt(quantityNumber.value);
        quantityNumber.value = Math.max(1, quantity - 1);
        onPriceChange(targetContainer.closest('.product-info'));
    }

    function onPlusIconClick(targetContainer) {
        const quantityNumber = targetContainer.querySelector('.quantity-number');
        const quantity = parseInt(quantityNumber.value);
        quantityNumber.value = Math.min(99, quantity + 1);
        onPriceChange(targetContainer.closest('.product-info'));
    }

    // Quantity change
    function onQuantityChange(targetContainer) {
        const quantityNumber = targetContainer.querySelector('.quantity-number');
        const quantity = parseInt(quantityNumber.value);
        if (quantity < 1) {
            quantityNumber.value = 1;
        }
        if (quantity > 99) {
            quantityNumber.value = 99;
        }
        const productInfo = targetContainer.closest('.product-info');
        onPriceChange(productInfo);
    }

    // Price Change
    function onPriceChange(productInfo) {
        const priceNumber = productInfo.querySelector('.price .price-number');
        if (addToCartAvailable) {
            productInfo.querySelector('.price span').style.display = 'none';
            priceNumber.style.display = 'flex';
        }
        else {
            productInfo.querySelector('.price span').style.display = 'flex';
        }
        const defaultPricePerUnit = 22.00;
        const selectedSizeOption = productInfo.querySelector('.size-option.selected');
        if (selectedSizeOption === null) {
            priceNumber.textContent = `A$${defaultPricePerUnit * parseInt(productInfo.querySelector('.quantity .quantity-number').value)}`;
        } else {
            priceNumber.textContent = `A$${selectedSizeOption.dataset.price * parseInt(productInfo.querySelector('.quantity .quantity-number').value)}`;
        }
    }

});



