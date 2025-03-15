function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector("form");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
  
  // Reset form and remove success message when closing modal
  const successMessage = document.querySelector(".success-message");
  if (successMessage) {
    successMessage.remove();
  }
  
  // Remove any close buttons that might exist
  const closeButtons = document.querySelectorAll(".close-button");
  closeButtons.forEach(button => button.remove());
  
  form.style.display = "block";
  form.reset();

  // Remove error messages
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach(error => error.remove());
}

// Form validation
function validate(e) {
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
    displayError(firstName, "Le prénom doit contenir au moins 2 caractères.");
    isValid = false;
  }

  // 2. Validate last name - minimum 2 characters
  const lastName = document.getElementById("last");
  if (!lastName.value || lastName.value.trim().length < 2) {
    displayError(lastName, "Le nom doit contenir au moins 2 caractères.");
    isValid = false;
  }

  // 3. Validate email
  const email = document.getElementById("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value || !emailRegex.test(email.value)) {
    displayError(email, "Veuillez entrer une adresse email valide.");
    isValid = false;
  }

  // 4. Validate birthdate
  const birthdate = document.getElementById("birthdate");
  if (!birthdate.value) {
    displayError(birthdate, "Veuillez entrer votre date de naissance.");
    isValid = false;
  }

  // 5. Validate quantity - must be a number
  const quantity = document.getElementById("quantity");
  if (quantity.value === "" || isNaN(quantity.value) || quantity.value < 0 || quantity.value > 99) {
    displayError(quantity, "Veuillez entrer un nombre entre 0 et 99.");
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
    displayError(document.querySelector('.formData:nth-of-type(6)'), "Veuillez sélectionner un tournoi.");
    isValid = false;
  }

  // 7. Validate terms and conditions checkbox
  const termsCheckbox = document.getElementById("checkbox1");
  if (!termsCheckbox.checked) {
    displayError(termsCheckbox.parentElement, "Vous devez accepter les conditions d'utilisation.");
    isValid = false;
  }

  // If valid, display success message
  if (isValid) {
    showSuccessMessage();
  }

  return false; // Always prevent default form submission
}

// Display error message beneath the input
function displayError(element, message) {
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

function showSuccessMessage() {
  // Remove any existing success messages or close buttons to avoid duplicates
  const existingMessages = document.querySelectorAll(".success-message");
  existingMessages.forEach(msg => msg.remove());
  
  const existingButtons = document.querySelectorAll(".close-button");
  existingButtons.forEach(btn => btn.remove());
  
  // Hide the form
  form.style.display = "none";
  
  // Create a success message
  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.textContent = "Merci pour votre inscription!";
  
  // Add the success message to the modal
  const modalBody = document.querySelector(".modal-body");
  modalBody.appendChild(successMessage);
  
  // Add a close button to the success message
  const closeButton = document.createElement("button");
  closeButton.className = "btn-submit close-button";
  closeButton.textContent = "Fermer";
  closeButton.addEventListener("click", closeModal);
  
  modalBody.appendChild(closeButton);
}

// Remove the onsubmit attribute from HTML and use event listener instead
form.addEventListener("submit", validate);