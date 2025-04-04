class FormHandler {
  constructor() {
    // DOM Elements
    this.modalbg = document.querySelector(".bground");
    this.modalBtn = document.querySelectorAll(".modal-btn");
    this.formData = document.querySelectorAll(".formData");
    this.form = document.querySelector("form");
    this.closeBtn = document.querySelector(".close");
    
    // Bind methods to ensure 'this' refers to the class instance
    this.launchModal = this.launchModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.validate = this.validate.bind(this);
    this.displayError = this.displayError.bind(this);
    this.showSuccessMessage = this.showSuccessMessage.bind(this);
    
    // Initialize event listeners
    this.initEventListeners();
    
    // Expose methods globally to be accessible from HTML
    window.closeModal = this.closeModal;
    window.validate = this.validate;
  }
  
  initEventListeners() {
    // Launch modal event
    this.modalBtn.forEach((btn) => btn.addEventListener("click", this.launchModal));
    
    // Form submission - adding this in code even though the HTML has onsubmit
    this.form.addEventListener("submit", this.validate);
    
    // Close button event listener
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", this.closeModal);
    }
  }
  
  // Launch modal form
  launchModal() {
    this.modalbg.style.display = "block";
  }
  
  // Close modal form
  closeModal() {
    this.modalbg.style.display = "none";
    
    // Reset form and remove success message when closing modal
    const successMessage = document.querySelector(".success-message");
    if (successMessage) {
      successMessage.remove();
    }
    
    // Remove any close buttons that might exist
    const closeButtons = document.querySelectorAll(".close-button");
    closeButtons.forEach(button => button.remove());
    
    this.form.style.display = "block";
    this.form.reset();
  
    // Remove error messages
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(error => error.remove());
  }
  
  // Form validation
  validate(e) {
    // Prevent default form submission behavior
    if (e) e.preventDefault();
    
    // Check if success message already exists - if so, don't proceed
    if (document.querySelector(".success-message")) {
      return false;
    }
    
    // Reset error messages
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(error => error.remove());
    
    let isValid = true;
  
    // 1. Validate first name - minimum 2 characters
    const firstName = document.getElementById("first");
    if (!firstName.value || firstName.value.trim().length < 2) {
      this.displayError(firstName, "Le prénom doit contenir au moins 2 caractères.");
      isValid = false;
    }
  
    // 2. Validate last name - minimum 2 characters
    const lastName = document.getElementById("last");
    if (!lastName.value || lastName.value.trim().length < 2) {
      this.displayError(lastName, "Le nom doit contenir au moins 2 caractères.");
      isValid = false;
    }
  
    // 3. Validate email
    const email = document.getElementById("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value || !emailRegex.test(email.value)) {
      this.displayError(email, "Veuillez entrer une adresse email valide.");
      isValid = false;
    }
  
    // 4. Validate birthdate
    const birthdate = document.getElementById("birthdate");
    if (!birthdate.value) {
      this.displayError(birthdate, "Veuillez entrer votre date de naissance.");
      isValid = false;
    }
  
    // 5. Validate quantity - must be a number
    const quantity = document.getElementById("quantity");
    if (quantity.value === "" || isNaN(quantity.value) || quantity.value < 0 || quantity.value > 99) {
      this.displayError(quantity, "Veuillez entrer un nombre entre 0 et 99.");
      isValid = false;
    }
  
    // 6. Validate location selection (radio buttons)
    const locations = document.querySelectorAll('input[name="location"]');
    let locationSelected = false;
    locations.forEach(location => {
      if (location.checked) {
        locationSelected = true;
      }
    });
    if (!locationSelected) {
      this.displayError(document.querySelector('.formData:nth-of-type(6)'), "Veuillez sélectionner un tournoi.");
      isValid = false;
    }
  
    // 7. Validate terms and conditions checkbox
    const termsCheckbox = document.getElementById("checkbox1");
    if (!termsCheckbox.checked) {
      this.displayError(termsCheckbox.parentElement, "Vous devez accepter les conditions d'utilisation.");
      isValid = false;
    }
  
    // If valid, display success message
    if (isValid) {
      this.showSuccessMessage();
    }
  
    return false; // Always prevent default form submission
  }
  
  // Display error message beneath the input
  displayError(element, message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.style.color = "red";
    errorDiv.style.fontSize = "0.8rem";
    errorDiv.style.marginTop = "5px";
    errorDiv.textContent = message;
    
    // For radio buttons and checkboxes, append to the parent element
    if (element.type === "radio" || element.type === "checkbox" || element.classList.contains("formData")) {
      element.appendChild(errorDiv);
    } else {
      // For text inputs, append after the input
      element.insertAdjacentElement('afterend', errorDiv);
    }
  }
  
  showSuccessMessage() {
    // Remove any existing success messages or close buttons to avoid duplicates
    const existingMessages = document.querySelectorAll(".success-message");
    existingMessages.forEach(msg => msg.remove());
    
    const existingButtons = document.querySelectorAll(".close-button");
    existingButtons.forEach(btn => btn.remove());
    
    // Hide the form
    this.form.style.display = "none";
    
    // Create a success message
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.style.marginTop = "10rem";
    successMessage.textContent = "Merci pour votre inscription!";
    
    // Add the success message to the modal
    const modalBody = document.querySelector(".modal-body");
    modalBody.appendChild(successMessage);
    
    // Add a close button to the success message
    const closeButton = document.createElement("button");
    closeButton.className = "btn-submit close-button";
    closeButton.style.marginTop = "20rem";
    closeButton.textContent = "Fermer";
    closeButton.addEventListener("click", this.closeModal);
    
    modalBody.appendChild(closeButton);
  }
}

// Responsive navigation menu
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Initialize the form handler when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const formHandler = new FormHandler();
});