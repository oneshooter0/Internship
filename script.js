// Form submission handler
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Clear previous errors
    clearErrors();

    // Validate form
    if (!validateForm()) {
        return;
    }

    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        collegeEmail: document.getElementById('collegeEmail').value,
        mobile: document.getElementById('mobile').value,
        whatsapp: document.getElementById('whatsapp').value,
        parentsMobile: document.getElementById('parentsMobile').value,
        college: document.getElementById('college').value,
        department: document.getElementById('department').value,
        yearOfStudy: document.querySelector('input[name="yearOfStudy"]:checked').value,
        domain: document.getElementById('domain').value,
        batch: document.getElementById('batch').value,
        language: document.getElementById('language').value,
        motivation: getSelectedCheckboxes('motivation').join(', '),
        additionalInfo: document.getElementById('additionalInfo').value,
        submittedAt: new Date().toLocaleString()
    };

    console.log('Form Data:', formData);

    // Send to Formspree
    submitToFormspree(formData);
});

// Submit to Formspree
function submitToFormspree(formData) {
    // Replace YOUR_FORM_ID with your actual Formspree form ID
    const FORMSPREE_ID = 'YOUR_FORM_ID'; // You'll get this from Formspree
    
    fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            showSuccessMessage();
            document.getElementById('signupForm').reset();
        } else {
            alert('Error submitting form. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting form. Please try again.');
    });
}

// Validation function
function validateForm() {
    const form = document.getElementById('signupForm');
    let isValid = true;

    // Validate Name
    const name = document.getElementById('name').value.trim();
    if (!name) {
        showError('nameError', 'Please enter your full name');
        isValid = false;
    }

    // Validate Email
    const email = document.getElementById('email').value.trim();
    if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate Mobile
    const mobile = document.getElementById('mobile').value.trim();
    if (!isValidPhone(mobile)) {
        showError('mobileError', 'Please enter a valid 10-digit mobile number');
        isValid = false;
    }

    // Validate WhatsApp
    const whatsapp = document.getElementById('whatsapp').value.trim();
    if (!isValidPhone(whatsapp)) {
        showError('whatsappError', 'Please enter a valid 10-digit WhatsApp number');
        isValid = false;
    }

    // Validate Parents Mobile
    const parentsMobile = document.getElementById('parentsMobile').value.trim();
    if (!isValidPhone(parentsMobile)) {
        showError('parentsMobileError', 'Please enter a valid 10-digit parent contact number');
        isValid = false;
    }

    // Validate College
    const college = document.getElementById('college').value.trim();
    if (!college) {
        showError('collegeError', 'Please enter your college name');
        isValid = false;
    }

    // Validate Department
    const department = document.getElementById('department').value.trim();
    if (!department) {
        showError('departmentError', 'Please enter your department');
        isValid = false;
    }

    // Validate Year of Study
    const yearOfStudy = document.querySelector('input[name="yearOfStudy"]:checked');
    if (!yearOfStudy) {
        showError('yearError', 'Please select your year of study');
        isValid = false;
    }

    // Validate Domain
    const domain = document.getElementById('domain').value;
    if (!domain) {
        showError('domainError', 'Please select your interested domain');
        isValid = false;
    }

    // Validate Batch
    const batch = document.getElementById('batch').value;
    if (!batch) {
        showError('batchError', 'Please select your preferred batch');
        isValid = false;
    }

    // Validate Language
    const language = document.getElementById('language').value;
    if (!language) {
        showError('languageError', 'Please select your comfortable language');
        isValid = false;
    }

    // Validate Motivation
    const selectedMotivations = getSelectedCheckboxes('motivation');
    if (selectedMotivations.length === 0) {
        showError('motivationError', 'Please select at least one reason for joining');
        isValid = false;
    }

    // Validate Terms
    const terms = document.getElementById('terms').checked;
    if (!terms) {
        showError('termsError', 'Please agree to receive communications');
        isValid = false;
    }

    return isValid;
}

// Helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.parentElement.classList.add('error');
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.parentElement.classList.remove('error');
    });
}

function getSelectedCheckboxes(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(checkboxes).map(cb => cb.value);
}

// Show success message
function showSuccessMessage() {
    const form = document.getElementById('signupForm');
    const successMessage = document.getElementById('successMessage');
    
    form.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth' });

    // Add overlay
    createOverlay();
}

function createOverlay() {
    if (!document.querySelector('.overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
        `;
        document.body.appendChild(overlay);
    }
}

// Prevent number fields from accepting non-numeric input
document.getElementById('mobile').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').slice(0, 10);
});

document.getElementById('whatsapp').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').slice(0, 10);
});

document.getElementById('parentsMobile').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').slice(0, 10);
});

console.log('Career Launch Signup Form loaded successfully');
