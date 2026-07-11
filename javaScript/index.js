/**
 * ============================================================================
 * LEMANYX INTELLIGENCE - CAREERS PAGE INTERACTION
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // GET ELEMENTS
    const applyBtn = document.getElementById("button-hero");
    const formBox = document.getElementById("form-box");
    const closeBtn = document.getElementById("close-btn");
    const careersForm = document.getElementById("careersForm");
    
    console.log('✅ Careers form script loaded');

    // ========================================================================
    // GET API URL FROM ENVIRONMENT
    // ========================================================================
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const API_ENDPOINT = `${API_URL}/api/submit-application`;
    
    console.log('API Endpoint:', API_ENDPOINT);

    // OPEN FORM
    if (applyBtn && formBox) {
        applyBtn.addEventListener("click", function(e) {
            e.preventDefault();
            formBox.hidden = false;
            setTimeout(() => {
                formBox.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
            console.log('✅ Form is now visible');
        });
    }

    // CLOSE FORM
    if (closeBtn && formBox) {
        closeBtn.addEventListener("click", function(e) {
            e.preventDefault();
            formBox.hidden = true;
            console.log('✅ Form is now hidden');
        });
    }

    // FORM SUBMISSION
    if (careersForm) {
        careersForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const fullname = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            const role = document.getElementById('role').value.trim();
            const portfolio = document.getElementById('portfolio').value.trim();
            const motivation = document.getElementById('motivation').value.trim();
            
            // Validate
            if (!fullname || !email || !role || !portfolio || !motivation) {
                alert('❌ Please fill in all fields');
                return;
            }
            
            // Get submit button
            const submitBtn = careersForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // ✅ USE API_ENDPOINT from environment
                const response = await fetch(API_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fullname: fullname,
                        email: email,
                        role: role,
                        portfolio: portfolio,
                        motivation: motivation
                    })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    alert('✅ Application submitted successfully!');
                    careersForm.reset();
                    formBox.hidden = true;
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    alert('❌ Error: ' + (data.message || 'Failed to submit'));
                }
                
            } catch (error) {
                console.error('Error:', error);
                alert('❌ Could not connect to server at ' + API_URL);
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});