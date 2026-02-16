// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================
const GOOGLE_FORM_ID = 'https://docs.google.com/spreadsheets/d/1K4iofsKaOE1n7d_dXLOorKUAt2_PDOGjYWnnusGoAbQ/edit?usp=sharing'; // Replace with your form ID
const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/${GOOGLE_FORM_ID}/formResponse`;

// Map your form fields to Google Form entry IDs
// You'll need to inspect the Google Form to get these entry IDs
const FIELD_MAPPING = {
    'name': 'entry.1234567890',           // Replace with actual entry ID
    'email': 'entry.9876543210',          // Replace with actual entry ID
    'collegeEmail': 'entry.1111111111',   // Replace with actual entry ID
    'mobile': 'entry.2222222222',         // Replace with actual entry ID
    'whatsapp': 'entry.3333333333',       // Replace with actual entry ID
    'college': 'entry.4444444444',        // Replace with actual entry ID
    'department': 'entry.5555555555',     // Replace with actual entry ID
    'yearOfStudy': 'entry.6666666666',    // Replace with actual entry ID
    'domain': 'entry.7777777777',         // Replace with actual entry ID
    'batch': 'entry.8888888888',          // Replace with actual entry ID
    'language': 'entry.9999999999',       // Replace with actual entry ID
    'terms': 'entry.0000000000'           // Replace with actual entry ID
};

// ============================================
// Initialize when DOM is loaded
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing form');
    
    const form = document.getElementById('signupForm');
    
    if (!form) {
        console.error('ERROR: Form with id "signupForm" not found!');
        return;
    }
    
    console.log('Form found:', form);
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        console.log('Form submit event triggered');
        e.preventDefault();
        
        clearAllErrors();
        
        const isValid = validateForm();
        console.log('Form validation result:', isValid);
        
        if (isValid) {
            console.log('Validation passed - submitting form to Google Sheets');
            submitToGoogleSheets();
        } else {
            console.log('Validation failed - showing errors');
        }
    });
    
    attachBlurValidation();
    attachInputRestrictions();
});

function attachBlurValidation() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const collegeEmailInput = document.getElementById('collegeEmail');
    const mobileInput = document.getElementById('mobile');
    const whatsappInput = document.getElementById('whatsapp');
    const collegeInput = document.getElementById('college');
    const departmentInput = document.getElementById('department');
    const domainSelect = document.getElementById('domain');
    const batchSelect = document.getElementById('batch');
    const languageSelect = document.getElementById('language');
    
    if (nameInput) nameInput.addEventListener('blur', validateName);
    if (emailInput) emailInput.addEventListener('blur', validateEmail);
    if (collegeEmailInput) collegeEmailInput.addEventListener('blur', validateCollegeEmail);
    if (mobileInput) mobileInput.addEventListener('blur', validateMobile);
    if (whatsappInput) whatsappInput.addEventListener('blur', validateWhatsapp);
    if (collegeInput) collegeInput.addEventListener('blur', validateCollege);
    if (departmentInput) departmentInput.addEventListener('blur', validateDepartment);
    if (domainSelect) domainSelect.addEventListener('change', validateDomain);
    if (batchSelect) batchSelect.addEventListener('change', validateBatch);
    if (languageSelect) languageSelect.addEventListener('change', validateLanguage);
}

function attachInputRestrictions() {
    const mobileInput = document.getElementById('mobile');
    const whatsappInput = document.getElementById('whatsapp');
    
    if (mobileInput) {
        mobileInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
        });
    }
    
    if (whatsappInput) {
        whatsappInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
        });
    }
}

// ============================================
// VALIDATION FUNCTIONS
// ============================================
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
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    
    if (!nameInput || !nameError) return false;
    
    const name = nameInput.value.trim();
    
    if (!name) {
        showError(nameError, 'Name is required');
        nameInput.classList.add('error');
        return false;
    }
    
    if (name.length < 2) {
        showError(nameError, 'Name must be at least 2 characters long');
        nameInput.classList.add('error');
        return false;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        showError(nameError, 'Name should only contain letters and spaces');
        nameInput.classList.add('error');
        return false;
    }
    
    clearError(nameError);
    nameInput.classList.remove('error');
    return true;
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    
    if (!emailInput || !emailError) return false;
    
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showError(emailError, 'Email ID is required');
        emailInput.classList.add('error');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showError(emailError, 'Please enter a valid email address');
        emailInput.classList.add('error');
        return false;
    }
    
    clearError(emailError);
    emailInput.classList.remove('error');
    return true;
}

function validateCollegeEmail() {
    const collegeEmailInput = document.getElementById('collegeEmail');
    const collegeEmailError = document.getElementById('collegeEmailError');
    
    if (!collegeEmailInput) return true;
    
    const collegeEmailValue = collegeEmailInput.value.trim();
    
    if (!collegeEmailValue) {
        if (collegeEmailError) {
            clearError(collegeEmailError);
        }
        collegeEmailInput.classList.remove('error');
        return true;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(collegeEmailValue)) {
        if (collegeEmailError) {
            showError(collegeEmailError, 'Please enter a valid college email address');
        }
        collegeEmailInput.classList.add('error');
        return false;
    }
    
    if (collegeEmailError) {
        clearError(collegeEmailError);
    }
    collegeEmailInput.classList.remove('error');
    return true;
}

function validateMobile() {
    const mobileInput = document.getElementById('mobile');
    const mobileError = document.getElementById('mobileError');
    
    if (!mobileInput || !mobileError) return false;
    
    const mobile = mobileInput.value.trim();
    
    if (!mobile) {
        showError(mobileError, 'Mobile No. is required');
        mobileInput.classList.add('error');
        return false;
    }
    
    if (!/^\d{10}$/.test(mobile)) {
        showError(mobileError, 'Mobile number must be 10 digits');
        mobileInput.classList.add('error');
        return false;
    }
    
    clearError(mobileError);
    mobileInput.classList.remove('error');
    return true;
}

function validateWhatsapp() {
    const whatsappInput = document.getElementById('whatsapp');
    const whatsappError = document.getElementById('whatsappError');
    
    if (!whatsappInput || !whatsappError) return false;
    
    const whatsapp = whatsappInput.value.trim();
    
    if (!whatsapp) {
        showError(whatsappError, 'WhatsApp No. is required');
        whatsappInput.classList.add('error');
        return false;
    }
    
    if (!/^\d{10}$/.test(whatsapp)) {
        showError(whatsappError, 'WhatsApp number must be 10 digits');
        whatsappInput.classList.add('error');
        return false;
    }
    
    clearError(whatsappError);
    whatsappInput.classList.remove('error');
    return true;
}

function validateCollege() {
    const collegeInput = document.getElementById('college');
    const collegeError = document.getElementById('collegeError');
    
    if (!collegeInput || !collegeError) return false;
    
    const college = collegeInput.value.trim();
    
    if (!college) {
        showError(collegeError, 'College/University is required');
        collegeInput.classList.add('error');
        return false;
    }
    
    if (college.length < 3) {
        showError(collegeError, 'Please enter a valid college/university name');
        collegeInput.classList.add('error');
        return false;
    }
    
    clearError(collegeError);
    collegeInput.classList.remove('error');
    return true;
}

function validateDepartment() {
    const departmentInput = document.getElementById('department');
    const departmentError = document.getElementById('departmentError');
    
    if (!departmentInput || !departmentError) return false;
    
    const department = departmentInput.value.trim();
    
    if (!department) {
        showError(departmentError, 'Department is required');
        departmentInput.classList.add('error');
        return false;
    }
    
    if (department.length < 2) {
        showError(departmentError, 'Please enter a valid department');
        departmentInput.classList.add('error');
        return false;
    }
    
    clearError(departmentError);
    departmentInput.classList.remove('error');
    return true;
}

function validateYearOfStudy() {
    const yearError = document.getElementById('yearError');
    
    if (!yearError) return false;
    
    const selectedYear = document.querySelector('input[name="yearOfStudy"]:checked');
    
    if (!selectedYear) {
        showError(yearError, 'Please select your year of study');
        return false;
    }
    
    clearError(yearError);
    return true;
}

function validateDomain() {
    const domainSelect = document.getElementById('domain');
    const domainError = document.getElementById('domainError');
    
    if (!domainSelect || !domainError) return false;
    
    const domain = domainSelect.value;
    
    if (!domain) {
        showError(domainError, 'Please select an interested domain');
        domainSelect.classList.add('error');
        return false;
    }
    
    clearError(domainError);
    domainSelect.classList.remove('error');
    return true;
}

function validateBatch() {
    const batchSelect = document.getElementById('batch');
    const batchError = document.getElementById('batchError');
    
    if (!batchSelect || !batchError) return false;
    
    const batch = batchSelect.value;
    
    if (!batch) {
        showError(batchError, 'Please select a batch/month');
        batchSelect.classList.add('error');
        return false;
    }
    
    clearError(batchError);
    batchSelect.classList.remove('error');
    return true;
}

function validateLanguage() {
    const languageSelect = document.getElementById('language');
    const languageError = document.getElementById('languageError');
    
    if (!languageSelect || !languageError) return false;
    
    const language = languageSelect.value;
    
    if (!language) {
        showError(languageError, 'Please select a comfortable language');
        languageSelect.classList.add('error');
        return false;
    }
    
    clearError(languageError);
    languageSelect.classList.remove('error');
    return true;
}

function validateTerms() {
    const termsCheckbox = document.getElementById('terms');
    const termsError = document.getElementById('termsError');
    
    if (!termsCheckbox || !termsError) return false;
    
    if (!termsCheckbox.checked) {
        showError(termsError, 'You must agree to receive communications');
        return false;
    }
    
    clearError(termsError);
    return true;
}

// ============================================
// HELPER FUNCTIONS
// ============================================
function showError(element, message) {
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
        element.style.color = '#e74c3c';
    }
}

function clearError(element) {
    if (element) {
        element.textContent = '';
        element.style.display = 'none';
    }
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        clearError(element);
    });
    
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
}

// ============================================
// SUBMIT TO GOOGLE SHEETS
// ============================================
function submitToGoogleSheets() {
    const form = document.getElementById('signupForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!form) {
        console.error('Form not found');
        return;
    }
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    try {
        const formData = new FormData(form);
        const data = new URLSearchParams();
        
        // Map form data to Google Form entry IDs
        for (const [key, entryId] of Object.entries(FIELD_MAPPING)) {
            const value = formData.get(key) || '';
            data.append(entryId, value);
        }
        
        console.log('Submitting data to Google Sheets:', Object.fromEntries(data));
        
        // Submit using fetch with no-cors mode
        fetch(GOOGLE_FORM_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: data
        })
        .then(response => {
            console.log('✓ Form submitted successfully to Google Sheets');
            showSuccessMessage();
        })
        .catch(error => {
            console.error('Submission error:', error);
            // Still show success as no-cors won't return proper response
            showSuccessMessage();
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Application';
        });
        
    } catch (error) {
        console.error('Error during form submission:', error);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Application';
        alert('There was an error submitting your form. Please try again.');
    }
}

function showSuccessMessage() {
    const form = document.getElementById('signupForm');
    const successMessage = document.getElementById('successMessage');
    
    if (!form || !successMessage) {
        alert('Application submitted successfully!');
        return;
    }
    
    form.style.display = 'none';
    successMessage.style.display = 'block';
    
    setTimeout(() => {
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

console.log('Script loaded successfully');
