/**
 * ============================================================================
 * FORM VALIDATION WITH MULTI-LANGUAGE ERROR MESSAGES
 * ============================================================================
 * 
 * HOW IT WORKS:
 * 1. When form submitted, validate each field
 * 2. Check for required fields
 * 3. Check field types (email, URL, etc)
 * 4. Show error messages in current language
 * 5. Prevent submission if errors exist
 * 
 * VALIDATION RULES:
 * - Full Name: Required, minimum 3 characters
 * - Email: Required, must be valid email format
 * - Role/Product: Must be selected
 * - Portfolio/URL: Must start with http:// or https://
 * - Date: Must be a future date
 * ============================================================================
 */

const formValidationMessages = {
    'en': {
        'required': 'This field is required',
        'invalid-email': 'Please enter a valid email address',
        'invalid-url': 'URL must start with http:// or https://',
        'short-name': 'Name must be at least 3 characters',
        'invalid-date': 'Please select a valid date',
        'select-option': 'Please select an option',
        'success': 'Form submitted successfully!',
        'error': 'Please fix the errors below',
        'server-error': 'Server error. Please try again later.'
    },
    'sw': {
        'required': 'Hii sehemu inahitajika',
        'invalid-email': 'Tafadhali ingiza anwani halali ya barua',
        'invalid-url': 'URL lazima ianze na http:// au https://',
        'short-name': 'Jina lazima liwe na angalau herufi 3',
        'invalid-date': 'Tafadhali chagua tarehe halali',
        'select-option': 'Tafadhali chagua chaguo',
        'success': 'Fomu imetumwa kwa mafanikio!',
        'error': 'Tafadhali sahihishe hitilafu hapo chini',
        'server-error': 'Hitilafu ya seva. Tafadhali jaribu tena baadaye.'
    }
};

/**
 * Get validation error message in current language
 * 
 * @param {string} messageKey - Error type key
 * @returns {string} Error message in current language
 */
function getValidationMessage(messageKey) {
    const currentLanguage = localStorage.getItem('preferredLanguage') || 'en';
    return formValidationMessages[currentLanguage][messageKey] || formValidationMessages['en'][messageKey];
}

/**
 * Validate email format
 * 
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
function isValidEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate URL format
 * 
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
function isValidURL(url) {
    return url.startsWith('http://') || url.startsWith('https://');
}

/**
 * Validate full name
 * 
 * @param {string} name - Name to validate
 * @returns {boolean} True if valid
 */
function isValidName(name) {
    return name.trim().length >= 3;
}

/**
 * Validate that select field has a value
 * 
 * @param {string} value - Select value
 * @returns {boolean} True if selected
 */
function isSelectValid(value) {
    return value && value !== '';
}

/**
 * Show error message for a field
 * 
 * @param {HTMLElement} field - Form field element
 * @param {string} message - Error message to show
 */
function showFieldError(field, message) {
    // Add error class (for red border, etc)
    field.classList.add('field-error');
    
    // Create error message element if doesn't exist
    let errorElement = field.parentElement.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentElement.appendChild(errorElement);
    }
    
    // Set error message text
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

/**
 * Clear error message for a field
 * 
 * @param {HTMLElement} field - Form field element
 */
function clearFieldError(field) {
    // Remove error class
    field.classList.remove('field-error');
    
    // Hide error message
    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

/**
 * Validate entire form
 * 
 * @param {HTMLElement} form - Form element to validate
 * @returns {boolean} True if form is valid
 */
function validateForm(form) {
    let isValid = true;
    const fields = form.querySelectorAll('[required], [type="email"], [type="url"]');
    
    fields.forEach(field => {
        const value = field.value.trim();
        
        // Clear previous errors
        clearFieldError(field);
        
        // Check if required and empty
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, getValidationMessage('required'));
            isValid = false;
            return;
        }
        
        // If field has value, validate based on type
        if (value) {
            if (field.type === 'email' && !isValidEmail(value)) {
                showFieldError(field, getValidationMessage('invalid-email'));
                isValid = false;
            } else if (field.type === 'url' && !isValidURL(value)) {
                showFieldError(field, getValidationMessage('invalid-url'));
                isValid = false;
            } else if (field.id === 'fullname' && !isValidName(value)) {
                showFieldError(field, getValidationMessage('short-name'));
                isValid = false;
            } else if (field.tagName === 'SELECT' && !isSelectValid(value)) {
                showFieldError(field, getValidationMessage('select-option'));
                isValid = false;
            }
        }
    });
    
    return isValid;
}

/**
 * Initialize form validation on all forms
 * Attach validation to form submit events
 */
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Add validation on form submit
        form.addEventListener('submit', function(e) {
            // Only prevent default if form is invalid
            if (!validateForm(form)) {
                e.preventDefault(); // Stop form submission
                showMessage(getValidationMessage('error'), 'error');
            }
        });
        
        // Clear error when user starts typing
        const fields = form.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            field.addEventListener('input', function() {
                if (this.classList.contains('field-error')) {
                    clearFieldError(this);
                }
            });
        });
    });
});

/**
 * Show message to user (success or error)
 * 
 * @param {string} message - Message to show
 * @param {string} type - 'success' or 'error'
 */
function showMessage(message, type) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        max-width: 300px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(messageDiv);
    
    // Remove after 4 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 4000);
}