/**
 * ============================================================================
 * LANGUAGE TOGGLE FUNCTIONALITY
 * ============================================================================
 * 
 * HOW IT WORKS:
 * 1. When page loads, check if user has saved language preference
 * 2. If not, detect browser's default language
 * 3. Load that language automatically
 * 4. Add click listener to toggle button
 * 5. When clicked, switch to opposite language
 * 6. Save preference for next visit
 * 
 * STORAGE: Uses browser's localStorage
 * - localStorage.getItem('preferredLanguage') - Get saved language
 * - localStorage.setItem('preferredLanguage', language) - Save language
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ====================================================================
    // STEP 1: INITIALIZE LANGUAGE ON PAGE LOAD
    // ====================================================================
    
    console.log('Language system initializing...');
    
    /**
     * Check if user has previously selected a language
     * localStorage stores data on user's computer between visits
     */
    let savedLanguage = localStorage.getItem('preferredLanguage');
    
    /**
     * If no saved preference, detect browser's language
     * navigator.language returns things like 'en-US', 'sw-TZ', 'en'
     * We only need the first part before the hyphen
     */
    if (!savedLanguage) {
        const browserLanguage = navigator.language.split('-')[0];
        
        // Support both 'en' and 'sw'
        savedLanguage = (browserLanguage === 'sw') ? 'sw' : 'en';
        
        console.log(`No saved language. Browser language: ${browserLanguage}. Using: ${savedLanguage}`);
    } else {
        console.log(`Using saved language: ${savedLanguage}`);
    }
    
    // Load the detected/saved language
    loadLanguage(savedLanguage);
    
    // ====================================================================
    // STEP 2: ADD CLICK LISTENER TO TOGGLE BUTTON
    // ====================================================================
    
    const toggleButton = document.getElementById('language-toggle');
    
    if (toggleButton) {
        // Add click event listener
        toggleButton.addEventListener('click', function() {
            // Get current language from browser storage
            const currentLanguage = localStorage.getItem('preferredLanguage') || 'en';
            
            // Determine new language (opposite of current)
            const newLanguage = currentLanguage === 'en' ? 'sw' : 'en';
            
            console.log(`Switching language from ${currentLanguage} to ${newLanguage}`);
            
            // Load new language
            loadLanguage(newLanguage);
        });
    } else {
        console.warn('Language toggle button not found on page');
    }
});

/**
 * ====================================================================
 * LOAD LANGUAGE FUNCTION
 * ====================================================================
 * 
 * Main function that:
 * 1. Calls translatePage to update all visible text
 * 2. Sets HTML language attribute
 * 3. Saves preference to browser
 * 
 * @param {string} language - Either 'en' (English) or 'sw' (Swahili)
 */
function loadLanguage(language) {
    // Validate language code
    if (language !== 'en' && language !== 'sw') {
        console.error(`Invalid language: ${language}. Using English instead.`);
        language = 'en';
    }
    
    // Call the translation function (from translations.js)
    if (typeof translatePage === 'function') {
        translatePage(language);
        console.log(`Language changed to: ${language === 'en' ? 'English' : 'Swahili'}`);
    } else {
        console.error('translatePage function not found. Make sure translations.js is loaded first.');
    }
    
    // Update HTML language attribute (for accessibility and SEO)
    document.documentElement.lang = language;
    
    // Save preference to localStorage for next visit
    localStorage.setItem('preferredLanguage', language);
}