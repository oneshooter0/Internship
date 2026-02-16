// Initialize when DOM is loaded
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
        
        // Clear all previous error messages
        clearAllErrors();
        
        // Validate all fields
        const isValid = validateForm();
        console.log('Form validation result:', isValid);
        
        if (isValid) {
            console.log('Validation passed - submitting form');
            submitForm();
        } else {
            console.log('Validation failed - showing errors');
        }
    });
    
    // Real-time validation for individual fields
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
    
    // Number-only input restriction for mobile and WhatsApp fields
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

// Validation functions
function validateForm() {
    let isValid = true;
    
    // Validate all fields
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
    
    console.log('Overall validation result:', isValid);
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
    
    // College email is optional
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

// Helper functions
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
    
    // Remove error class from all inputs and selects
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
}

function submitForm() {
    const form = document.getElementById('signupForm');
    
    if (!form) {
        console.error('Form not found');
        alert('Error: Form not found');
        return;
    }
    
    try {
        const formData = new FormData(form);
        
        // Convert form data to object
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            collegeEmail: formData.get('collegeEmail') || '',
            mobile: formData.get('mobile'),
            whatsapp: formData.get('whatsapp'),
            college: formData.get('college'),
            department: formData.get('department'),
            yearOfStudy: formData.get('yearOfStudy'),
            domain: formData.get('domain'),
            batch: formData.get('batch'),
            language: formData.get('language'),
            terms: formData.get('terms'),
            submittedAt: new Date().toISOString()
        };
        
        console.log('Form data collected:', data);
        
        // Save to LocalStorage
        try {
            let applications = JSON.parse(localStorage.getItem('applications')) || [];
            applications.push(data);
            localStorage.setItem('applications', JSON.stringify(applications));
            console.log('✓ Application saved to LocalStorage');
            console.log('Total applications saved:', applications.length);
        } catch (storageError) {
            console.warn('LocalStorage not available:', storageError);
        }
        
        // OPTIONAL: Send to backend (uncomment to use)
        // sendToBackend(data);
        
        // Show success message
        showSuccessMessage();
        
    } catch (error) {
        console.error('Error during form submission:', error);
        alert('There was an error submitting your form. Please check the console and try again.');
    }
}

// Optional function to send data to backend
function sendToBackend(data) {
    fetch('/api/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log('Backend response:', result);
        showSuccessMessage();
    })
    .catch(error => {
        console.error('Backend error:', error);
        // Still show success even if backend fails (data is saved locally)
        showSuccessMessage();
    });
}

function showSuccessMessage() {
    const form = document.getElementById('signupForm');
    const successMessage = document.getElementById('successMessage');
    
    if (!form || !successMessage) {
        console.error('Form or success message element not found');
        alert('Application submitted successfully!');
        return;
    }
    
    console.log('Showing success message');
    
    // Hide the form
    form.style.display = 'none';
    
    // Show the success message
    successMessage.style.display = 'block';
    
    // Scroll to success message
    setTimeout(() => {
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

// Debug function - View all saved applications
window.viewApplications = function() {
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    console.table(applications);
    return applications;
};

console.log('Script loaded successfully. To view saved applications, run: viewApplications()');
