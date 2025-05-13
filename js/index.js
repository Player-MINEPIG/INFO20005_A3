document.addEventListener('DOMContentLoaded', () => {

    // Fold menu button
    let isFolded = false;
    let foldMenuButton = document.querySelector('.menu-btn');

    if (foldMenuButton) {
        foldMenuButton.addEventListener('click', () => {
            console.log('foldMenuButton clicked');
            isFolded = !isFolded;
            if (isFolded) {
                foldMenuButton.classList.add('active');
                document.querySelector('.main-menu').classList.add('folded');
            } else {
                foldMenuButton.classList.remove('active');
                document.querySelector('.main-menu').classList.remove('folded');
            }
        });
    } else {
        console.error('Menu button not found');
    }
});