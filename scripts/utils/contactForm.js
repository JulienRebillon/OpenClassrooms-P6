function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


//



form.addEventListener('submit', e => { //empeche le rafraichissement par défaut du navigateur

    e.preventDefault();
    validateInputs();
  
  });


//Add and remove class error
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
  
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
  }
  
const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
  
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
  };



  //Regex definition
const isValidFirst = /^[a-zA-Z'-À-ÿ]+[^0-9@?#]+$/;
const isValidLast = /^[a-zA-Z'-À-ÿ]+[^0-9@?#]+$/;
const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateInputs = () => { //on utilise trim pour enlever les espaces superflus
    const firstValue = first.value.trim();
    const lastValue = last.value.trim();
    const emailValue = email.value.trim();
    //const birthdateValue = birthdate.value.trim();
    const quantityValue = quantity.value.trim();
  
    // Prénom
    if (firstValue.length <= 1) {
      setError(first, 'Vous devez rentrer au moins deux caractères');
    } else if (!isValidFirst.test(firstValue)) {
      setError(first, 'Le prénom n\'est pas valide');
    } else {
      setSuccess(first);
      firstValidate = true;
    }
  
    // Nom
    if (lastValue.length <= 1) {
      setError(last, 'Vous devez rentrer au moins deux caractères');
    } else if (!isValidLast.test(lastValue)) {
      setError(last, 'Le nom n\'est pas valide');
    } else {
      setSuccess(last);
      lastValidate = true;
    }
  
    // Email
    if (emailValue.length === 0) {
      setError(email, 'L\'adresse email n\'est pas renseignée');
    } else if (!isValidEmail.test(emailValue)) {
      setError(email, 'L\'adresse email n\'est pas valide');
      
    } else {
      setSuccess(email);      
      //setError(email, ''); //reset du message d'erreur
      emailValidate = true;
    }
  
  
  
    // Date de naissance
  
   
    let birthdateInput = document.getElementById('birthdate');
    let enteredDate = birthdateInput.value.replace(/\D/g, ''); // Remove non-numeric characters;
    let regexDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$|^\d{8}$/;
  
    if (!regexDate.test(enteredDate)) {
      setError(birthdate, 'La date n\'est pas valide');
    } else {
      setSuccess(birthdate);
      birthdateValidate = true;
    }
  
  
  
    
  
  
  
  
    //validate all inputs and display in console.log
    if ( firstValidate === true && lastValidate === true 
      && emailValidate === true && messageValidate === true 
      ) {console.log("First name: " + firstNameInput.value + "\n" +
        "Last name: " + lastNameInput.value + "\n" +
        "Email: " + emailInput.value + "\n" +
        "Message: " + messageInput.value);      
      
      closeModal();
      
    } else {
      console.log('erreur validation');
    }
  
  
  };