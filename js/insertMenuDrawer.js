export function initMenuDrawer() {
  async function fetchMenuDrawerHTML() {
    const res = await fetch(`../components/menu-drawers/menu-drawer.html`);
    if (!res.ok) throw new Error('Failed to load menu drawer HTML');
    return await res.text();
  }

    // Insert HTML and bind events when page loads
    fetchMenuDrawerHTML().then(menuDrawerHTML => {
        document.querySelector('.container').insertAdjacentHTML('beforeend', menuDrawerHTML);

        // Bind close events
        document.querySelector('.menu-overlay').addEventListener('click', hideMenuDrawer);
    });
} 

let isDrawerOpen = false;

export function switchMenuDrawer(topHeight) {
    if (isDrawerOpen) {
        hideMenuDrawer();
    } else {
        showMenuDrawer(topHeight);
    }
}

function showMenuDrawer(topHeight) {
    document.querySelector('.menu-drawer').style.top = topHeight;
    document.querySelector('.menu-drawer').classList.add('active');
    document.querySelector('.menu-overlay').classList.add('active');
    isDrawerOpen = true;
}

function hideMenuDrawer() {
    document.querySelector('.menu-drawer').style.top = '-100%';
    document.querySelector('.menu-drawer').classList.remove('active');
    document.querySelector('.menu-overlay').classList.remove('active');
    isDrawerOpen = false;
}