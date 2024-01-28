function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


//FORM

//variables from DOM
const first = document.getElementById('first');
const last = document.getElementById('last');
const email = document.getElementById('email');
const message = document.getElementById('message');



const form = document.querySelector('form');

// form.addEventListener('keydown', e => { //prevents enter key from submitting the form
//     if (e.key === 'Enter' && e.target.nodeName !== 'TEXTAREA') {
//         e.preventDefault();
//     }
// });




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
    const messageValue = message.value.trim();
  
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
      emailValidate = true;
    }
  
  
     // Message
    if (messageValue.length === 0) {
        setError(message, 'Veuillez indiquer le motif de voter message');
    }  else {
        setSuccess(message);      
        messageValidate = true;
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
      console.log('error form validation');
    }
  
  
  };