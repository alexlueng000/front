// Function to set the active tab based on the current URL
function setActiveTab() {
    const navItems = document.querySelectorAll('.nav.navbar-nav > li');
    const currentUrl = window.location.href;

    navItems.forEach((item) => {
        const link = item.querySelector('a');

        // Remove the 'active' class from all items
        item.classList.remove('active');

        // Add 'active' class if the href matches the current URL
        if (link && link.getAttribute('href') && currentUrl.includes(link.getAttribute('href'))) {
            item.classList.add('active');

            // Highlight parent items for dropdowns
            highlightParents(item);
        } else if (item.querySelector('.sub-menu')) {
            // If no direct match, check sub-menu links
            const subLinks = item.querySelectorAll('.sub-menu a');
            subLinks.forEach((subLink) => {
                if (currentUrl.includes(subLink.getAttribute('href'))) {
                    item.classList.add('active');
                    highlightParents(item);
                }
            });
        }
    });
}

// Function to highlight parent items
function highlightParents(item) {
    let parent = item.parentElement.closest('li');
    while (parent) {
        parent.classList.add('active');
        parent = parent.parentElement.closest('li');
    }
}

// Add click event listener to set 'active' on user interaction
document.querySelectorAll('.nav.navbar-nav > li > a').forEach((link) => {
    link.addEventListener('click', function (event) {
        if (this.getAttribute('href') === 'javascript:;' || !this.getAttribute('href')) {
            event.preventDefault(); // Prevent default behavior for non-navigable links
        }

        document.querySelectorAll('.nav.navbar-nav > li').forEach((item) => {
            item.classList.remove('active');
        });
        const clickedItem = this.parentElement;
        clickedItem.classList.add('active');

        // Highlight parent items for dropdowns
        highlightParents(clickedItem);
    });
});

// Call the function on page load
window.onload = setActiveTab;
