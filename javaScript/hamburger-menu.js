/**
 * ============================================================================
 * HAMBURGER MENU FUNCTIONALITY - MOBILE NAVIGATION
 * ============================================================================
 * 
 * WHAT THIS DOES:
 * 1. When user clicks hamburger button on mobile
 * 2. Navigation menu slides down
 * 3. When user clicks again, menu slides up
 * 4. When user clicks a link, menu closes automatically
 * 5. On desktop (768px+), hamburger is hidden and nav is always visible
 * 
 * HOW IT WORKS:
 * - Toggles .active class on nav menu
 * - CSS shows/hides menu based on this class
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================================================
    // GET ELEMENTS FROM HTML
    // ========================================================================
    
    const hamburgerBtn = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Check if elements exist
    if (!hamburgerBtn || !navMenu) {
        console.warn('Hamburger menu elements not found');
        return;
    }
    
    // ========================================================================
    // HAMBURGER BUTTON CLICK - OPEN/CLOSE MENU
    // ========================================================================
    
    /**
     * When user clicks the hamburger button:
     * 1. Toggle the .active class on nav menu
     * 2. Toggle the .active class on hamburger button
     * 3. This triggers CSS to show/hide the menu
     */
    hamburgerBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent click from bubbling up
        
        // Toggle menu visibility
        navMenu.classList.toggle('active');
        hamburgerBtn.classList.toggle('active');
        
        // Log for debugging
        if (navMenu.classList.contains('active')) {
            console.log('✅ Mobile menu opened');
        } else {
            console.log('✅ Mobile menu closed');
        }
    });
    
    // ========================================================================
    // NAVIGATION LINKS CLICK - CLOSE MENU
    // ========================================================================
    
    /**
     * When user clicks a navigation link:
     * 1. Close the menu (remove .active class)
     * 2. Close the hamburger button (remove .active class)
     * 
     * This improves UX - menu automatically closes after clicking a link
     */
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close menu
            navMenu.classList.remove('active');
            hamburgerBtn.classList.remove('active');
            console.log('✅ Menu closed after link click');
        });
    });
    
    // ========================================================================
    // CLICK OUTSIDE MENU - CLOSE MENU
    // ========================================================================
    
    /**
     * When user clicks anywhere outside the menu:
     * 1. Close the menu
     * 
     * This improves UX - menu closes if user clicks elsewhere
     */
    document.addEventListener('click', function(e) {
        // Check if click was outside nav menu
        const isClickInsideNav = navMenu.contains(e.target);
        const isClickOnHamburger = hamburgerBtn.contains(e.target);
        
        // If clicked outside, close menu
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburgerBtn.classList.remove('active');
            console.log('✅ Menu closed (clicked outside)');
        }
    });
    
    // ========================================================================
    // HANDLE WINDOW RESIZE
    // ========================================================================
    
    /**
     * When window is resized (e.g., rotating phone from portrait to landscape):
     * 1. Check if window is now larger than 768px (tablet size)
     * 2. If yes, close the menu (user can now see full nav)
     * 3. Remove .active classes
     */
    window.addEventListener('resize', function() {
        // If window is 768px or wider, close mobile menu
        if (window.innerWidth >= 768) {
            navMenu.classList.remove('active');
            hamburgerBtn.classList.remove('active');
        }
    });
    
    // ========================================================================
    // KEYBOARD SUPPORT - ESC KEY TO CLOSE
    // ========================================================================
    
    /**
     * When user presses ESC key:
     * 1. Close the menu
     * 
     * This improves accessibility - keyboard users expect ESC to close menus
     */
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburgerBtn.classList.remove('active');
            hamburgerBtn.focus(); // Move focus back to button
            console.log('✅ Menu closed (ESC key pressed)');
        }
    });
});