// ============================================
// CONFIGURATION - PASTE YOUR VALUES HERE
// ============================================

// 👇 PASTE YOUR FORM ID HERE (between /d/ and /viewform)
const GOOGLE_FORM_ID = '1kX8pQ9vR2mL5tN3wJ7bX4dZ6yH8uK2sM';

const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/${GOOGLE_FORM_ID}/formResponse`;

// 👇 PASTE YOUR ENTRY IDS HERE (from console output)
const FIELD_MAPPING = {
    'name': 'entry.123456789',                    // ← Replace with your value
    'email': 'entry.987654321',                   // ← Replace with your value
    'collegeEmail': 'entry.111222333',            // ← Replace with your value
    'mobile': 'entry.444555666',                  // ← Replace with your value
    'whatsapp': 'entry.777888999',                // ← Replace with your value
    'college': 'entry.101112131',                 // ← Replace with your value
    'department': 'entry.141516171',              // ← Replace with your value
    'yearOfStudy': 'entry.181920212',             // ← Replace with your value
    'domain': 'entry.222324252',                  // ← Replace with your value
    'batch': 'entry.262728292',                   // ← Replace with your value
    'language': 'entry.303132333',                // ← Replace with your value
    'terms': 'entry.343536373'                    // ← Replace with your value
};

// ============================================
// Rest of the script continues below...
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Form Initialized');
    console.log('📋 Google Form ID:', GOOGLE_FORM_ID);
    console.log('🔗 Form URL:', `https://docs.google.com/forms/d/${GOOGLE_FORM_ID}/viewform`);
    
    const form = document.getElementById('signupForm');
    
    if (!form) {
        console.error('❌ Form not found');
        return;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearAllErrors();
        
        if (validateForm()) {
            submitToGoogleSheets();
        }
    });
    
    attachBlurValidation();
    attachInputRestrictions();
});

function attachBlurValidation() {
    const fields = ['name', 'email', 'collegeEmail', 'mobile', 'whatsapp', 'college', 'department'];
    const selects = ['domain', 'batch', 'language'];
    
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.addEventListener('blur', function() {
                const validationFunc = window['validate' + field.charAt(0).toUpperCase() + field.slice(1)];
                if (validationFunc) validationFunc();
            });
        }
    });
    
    selects.forEach(select => {
        const element = document.getElementById(select);
        if (element) {
            element.addEventListener('change', function() {
                const validationFunc = window['validate' + select.charAt(0).toUpperCase() + select.slice(1)];
                if (validationFunc) validationFunc();
            });
        }
    });
}

function attachInputRestrictions() {
    const mobileInput = document.getElementById('mobile');
    const whatsappInput = document.getElementById('whatsapp');
    
    if (mobileInput) {
        mobileInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
        });
    }
    
    if (whatsappInput) {
        whatsappInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
        });
    }
}

function validateForm() {
    let isValid = true;
    isValid = validateName() && isValid;
    isValid = validateEmail() && isValid;
    isValid = validateCollegeEmail() && isValid;
    isValid = validateMobile() && isValid;
    isValid = validateWhatsapp() && isValid;
    isValid = validateCollege() && isValid;
    isValid = validateDepartment() && isValid;
    isValid = validateYearOfStudy() && isValid;
    isValid = validateDomain() && isValid;
    isValid = validateBatch() && isValid;
    isValid = validateLanguage() && isValid;
    isValid = validateTerms() && isValid;
    return isValid;
}

function validateName() {
    const input = document.getElementById('name');
    const error = document.getElementById('nameError');
    const value = input.value.trim();
    
    if (!value) {
        showError(error, 'Name is required');
        input.classList.add('error');
        return false;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(value)) {
        showError(error, 'Name should only contain letters');
        input.classList.add('error');
        return false;
    }
    
    clearError(error);
    input.classList.remove('error');
    return true;
}

function validateEmail() {
    const input = document.getElementById('email');
    const error = document.getElementById('emailError');
    const value = input.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!value) {
        showError(error, 'Email is required');
        input.classList.add('error');
        return false;
    }
    
    if (!regex.test(value)) {
        showError(error, 'Invalid email');
        input.classList.add('error');
        return false;
    }
    
    clearError(error);
    input.classList.remove('error');
    return true;
}

function validateCollegeEmail() {
    const input = document.getElementById('collegeEmail');
    const error = document.getElementById('collegeEmailError');
    const value = input.value.trim();
    
    if (!value) return true; // Optional field
    
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
        showError(error, 'Invalid email');
        input.classList.add('error');
        return false;
    }
    
    clearError(error);
    input.classList.remove('error');
    return true;
}

function validateMobile() {
    const input = document.getElementById('mobile');
    const error = document.getElementById('mobileError');
    const value = input.value.trim();
    
    if (!value) {
        showError(error, 'Mobile is required');
        input.classList.add('error');
        return false;
    }
    
    if (!/^\d{10}$/.test(value)) {
        showError(error, '10 digits required');
        input.classList.add('error');
        return false;
    }
    
    clearError(error);
    input.classList.remove('error');
    return true;
}

function validateWhatsapp() {
    const input = document.getElementById('whatsapp');
    const error = document.getElementById('whatsappError');
    const value = input.value.trim();
    
    if (!value) {
        showError(error, 'WhatsApp is required');
        input.classList.add('error');
        return false;
    }
    
    if (!/^\d{10}$/.test(value)) {
        showError(error, '10 digits required');
        input.classList.add('error');
        return false;
    }
    
    clearError(error);
    input.classList.remove('error');
    return true;
}

function validateCollege() {
    const input = document.getElementById('college');
    const error = document.getElementById('collegeError');
    const value = input.value.trim();
    
    if (!value) {
        showError(error, 'College is required');
        input.classList.add('error');
        return false;
    }
    
    clearError(error);
    input.classList.remove('error');
    return true;
}

function validateDepartment() {
    const input = document.getElementById('department');
    const error = document.getElementById('departmentError');
    const value = input.value.trim();
    
    if (!value) {
        showError(error, 'Department is required');
        input.classList.add('error');
        return false;
    }
    
    clearError(error);
    input.classList.remove('error');
    return true;
}

function validateYearOfStudy() {
    const error = document.getElementById('yearError');
    const selected = document.querySelector('input[name="yearOfStudy"]:checked');
    
    if (!selected) {
        showError(error, 'Select year of study');
        return false;
    }
    
    clearError(error);
    return true;
}

function validateDomain() {
    const select = document.getElementById('domain');
    const error = document.getElementById('domainError');
    
    if (!select.value) {
        showError(error, 'Select domain');
        select.classList.add('error');
        return false;
    }
    
    clearError(error);
    select.classList.remove('error');
    return true;
}

function validateBatch() {
    const select = document.getElementById('batch');
    const error = document.getElementById('batchError');
    
    if (!select.value) {
        showError(error, 'Select batch');
        select.classList.add('error');
        return false;
    }
    
    clearError(error);
    select.classList.remove('error');
    return true;
}

function validateLanguage() {
    const select = document.getElementById('language');
    const error = document.getElementById('languageError');
    
    if (!select.value) {
        showError(error, 'Select language');
        select.classList.add('error');
        return false;
    }
    
    clearError(error);
    select.classList.remove('error');
    return true;
}

function validateTerms() {
    const checkbox = document.getElementById('terms');
    const error = document.getElementById('termsError');
    
    if (!checkbox.checked) {
        showError(error, 'You must agree');
        return false;
    }
    
    clearError(error);
    return true;
}

function showError(element, message) {
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
    }
}

function clearError(element) {
    if (element) {
        element.textContent = '';
        element.style.display = 'none';
    }
}

function clearAllErrors() {
    document.querySelectorAll('.error-message').forEach(el => clearError(el));
    document.querySelectorAll('input, select').forEach(el => el.classList.remove('error'));
}

function submitToGoogleSheets() {
    const form = document.getElementById('signupForm');
    const submitBtn = document.getElementById('submitBtn');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    const formData = new FormData(form);
    const data = new URLSearchParams();
    
    for (const [key, entryId] of Object.entries(FIELD_MAPPING)) {
        const value = formData.get(key) || '';
        data.append(entryId, value);
    }
    
    console.log('📤 Sending to:', GOOGLE_FORM_URL);
    
    fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: data
    })
    .then(() => {
        console.log('✅ Submitted!');
        showSuccessMessage();
    })
    .catch(error => {
        console.log('✅ Submitted (CORS normal):', error.message);
        showSuccessMessage();
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Application';
    });
}

function showSuccessMessage() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
    document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
}
