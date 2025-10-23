// Shelby Roman - Portfolio

// When page fully loads
document.addEventListener('DOMContentLoaded', () => {

    // Open and close mobile menu

    // Get mobile menu button and navigation links container by ID
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    // If they both exist
    if (mobileMenu && navLinks) {
        // Add click event listener to mobile menu button
        mobileMenu.addEventListener('click', () => {
            // Toggle the 'active' class on the navigation links container and mobile menu button
            // Active class is used to show or hide the mobile menu
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when the link is clicked

    // Get a list of all <a> tags in the nav links container
    const allNavLinks = document.querySelectorAll('#nav-links a');

    // Loop through those links
    allNavLinks.forEach(link => {
        // Add click event listener to each link
        link.addEventListener('click', () => {
            // If mobile menu is open
            if (navLinks.classList.contains('active')) {
                // Remove active class to close mobile menu
                navLinks.classList.remove('active');
                // Remove active class from button to reset the animation
                mobileMenu.classList.remove('active');
            }
        });
    });

    // Highlight the nav link corresponding to the section currently on screen

    // Select all <section> elements and <header> elements that have an 'id' attribute
    const sections = document.querySelectorAll('section[id], header[id]');

    // Use InterSectionObserver to watch when elements enter or leave the screen
    const observer = new IntersectionObserver((entries) => {
        // 'entries' is an array of all sections being watched
        entries.forEach(entry => {
            // If the section is currently in the viewport
            if (entry.isIntersecting) {
                // Remove active-link class from ALL navigation links
                allNavLinks.forEach(link => link.classList.remove('active-link'));
                
                // Get id of the section that just entered the viewport
                const id = entry.target.getAttribute('id');

                // Find the nav link that has an 'href' matching the section's id
                const activeLink = document.querySelector(`#nav-links a[href="#${id}"]`);
                
                // If there is a matching link
                if (activeLink) {
                    // Add the active-link class to it so that it gets highlighted
                    activeLink.classList.add('active-link');
                }
            }
        });
    }, { 
        // Consider a section as intersecting when it crosses a horizontal line in the middle of the screen
        rootMargin: '-50% 0px -50% 0px'
    });

    // Watch each of the sections found
    sections.forEach(section => {
        observer.observe(section);
    });

});