// Form validation and submission handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear all previous error messages
        clearAllErrors();
        
        // Validate all fields
        if (validateForm()) {
            // If validation passes, submit the form
            submitForm();
        }
    });
    
    // Real-time validation for individual fields
    document.getElementById('name').addEventListener('blur', validateName);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('collegeEmail').addEventListener('blur', validateCollegeEmail);
    document.getElementById('mobile').addEventListener('blur', validateMobile);
    document.getElementById('whatsapp').addEventListener('blur', validateWhatsapp);
    document.getElementById('college').addEventListener('blur', validateCollege);
    document.getElementById('department').addEventListener('blur', validateDepartment);
    document.getElementById('domain').addEventListener('change', validateDomain);
    document.getElementById('batch').addEventListener('change', validateBatch);
    document.getElementById('language').addEventListener('change', validateLanguage);
});

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
    
    return isValid;
}

function validateName() {
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    const name = nameInput.value.trim();
    
    if (!name) {
        showError(nameError, 'Name is required');
        return false;
    }
    
    if (name.length < 2) {
        showError(nameError, 'Name must be at least 2 characters long');
        return false;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        showError(nameError, 'Name should only contain letters and spaces');
        return false;
    }
    
    clearError(nameError);
    return true;
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showError(emailError, 'Email ID is required');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showError(emailError, 'Please enter a valid email address');
        return false;
    }
    
    clearError(emailError);
    return true;
}

function validateCollegeEmail() {
    const collegeEmailInput = document.getElementById('collegeEmail');
    const collegeEmailValue = collegeEmailInput.value.trim();
    
    // College email is optional
    if (!collegeEmailValue) {
        return true;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(collegeEmailValue)) {
        showError(document.getElementById('collegeEmail'), 'Please enter a valid college email address');
        return false;
    }
    
    clearError(document.querySelector('[for="collegeEmail"] + input').parentElement.querySelector('.error-message'));
    return true;
}

function validateMobile() {
    const mobileInput = document.getElementById('mobile');
    const mobileError = document.getElementById('mobileError');
    const mobile = mobileInput.value.trim();
    
    if (!mobile) {
        showError(mobileError, 'Mobile No. is required');
        return false;
    }
    
    if (!/^\d{10}$/.test(mobile)) {
        showError(mobileError, 'Mobile number must be 10 digits');
        return false;
    }
    
    clearError(mobileError);
    return true;
}

function validateWhatsapp() {
    const whatsappInput = document.getElementById('whatsapp');
    const whatsappError = document.getElementById('whatsappError');
    const whatsapp = whatsappInput.value.trim();
    
    if (!whatsapp) {
        showError(whatsappError, 'WhatsApp No. is required');
        return false;
    }
    
    if (!/^\d{10}$/.test(whatsapp)) {
        showError(whatsappError, 'WhatsApp number must be 10 digits');
        return false;
    }
    
    clearError(whatsappError);
    return true;
}

function validateCollege() {
    const collegeInput = document.getElementById('college');
    const collegeError = document.getElementById('collegeError');
    const college = collegeInput.value.trim();
    
    if (!college) {
        showError(collegeError, 'College/University is required');
        return false;
    }
    
    if (college.length < 3) {
        showError(collegeError, 'Please enter a valid college/university name');
        return false;
    }
    
    clearError(collegeError);
    return true;
}

function validateDepartment() {
    const departmentInput = document.getElementById('department');
    const departmentError = document.getElementById('departmentError');
    const department = departmentInput.value.trim();
    
    if (!department) {
        showError(departmentError, 'Department is required');
        return false;
    }
    
    if (department.length < 2) {
        showError(departmentError, 'Please enter a valid department');
        return false;
    }
    
    clearError(departmentError);
    return true;
}

function validateYearOfStudy() {
    const yearError = document.getElementById('yearError');
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
    const domain = domainSelect.value;
    
    if (!domain) {
        showError(domainError, 'Please select an interested domain');
        return false;
    }
    
    clearError(domainError);
    return true;
}

function validateBatch() {
    const batchSelect = document.getElementById('batch');
    const batchError = document.getElementById('batchError');
    const batch = batchSelect.value;
    
    if (!batch) {
        showError(batchError, 'Please select a batch/month');
        return false;
    }
    
    clearError(batchError);
    return true;
}

function validateLanguage() {
    const languageSelect = document.getElementById('language');
    const languageError = document.getElementById('languageError');
    const language = languageSelect.value;
    
    if (!language) {
        showError(languageError, 'Please select a comfortable language');
        return false;
    }
    
    clearError(languageError);
    return true;
}

function validateTerms() {
    const termsCheckbox = document.getElementById('terms');
    const termsError = document.getElementById('termsError');
    
    if (!termsCheckbox.checked) {
        showError(termsError, 'You must agree to receive communications');
        return false;
    }
    
    clearError(termsError);
    return true;
}

// Helper functions
function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function clearError(element) {
    element.textContent = '';
    element.style.display = 'none';
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        clearError(element);
    });
}

function submitForm() {
    const form = document.getElementById('signupForm');
    const formData = new FormData(form);
    
    // Convert form data to object
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        collegeEmail: formData.get('collegeEmail'),
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
    
    // Log the form data (In production, send this to your backend)
    console.log('Form submitted with data:', data);
    
    // Here you would typically send the data to your backend server
    // Example:
    // fetch('/api/submit-form', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(result => {
    //     console.log('Success:', result);
    //     showSuccessMessage();
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    //     alert('There was an error submitting your form. Please try again.');
    // });
    
    // For now, just show the success message
    showSuccessMessage();
}

function showSuccessMessage() {
    const form = document.getElementById('signupForm');
    const successMessage = document.getElementById('successMessage');
    
    // Hide the form
    form.style.display = 'none';
    
    // Show the success message
    successMessage.style.display = 'block';
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Optional: Add number-only input restriction for mobile and WhatsApp fields
document.getElementById('mobile').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
});

document.getElementById('whatsapp').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
});
