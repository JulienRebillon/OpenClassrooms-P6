    
    
   
    
    const openCloseFormContact = () => {
        setTimeout(() => { //timeout required to deal with contact-button not being generated in time.
            const contactBtn = document.querySelector(".contact-button");
            const contactModal = document.querySelector(".modal_wrapper");
            const closeModal = document.querySelector(".btn_close");
    
            if (contactBtn && contactModal && closeModal) {
                contactBtn.addEventListener("click", () => {
                    contactModal.style.display = "flex";
                    closeModal.focus();
                });
    
                closeModal.addEventListener("click", () => contactModal.style.display = "none");
            } else {
                console.error("One or more elements are missing for openCloseFormContact.");
            }
        }, 200); // Adjust delay as needed
    };

    const waitForContactButton = setInterval(() => {
        const contactBtn = document.querySelector(".contact-button");
        if (contactBtn) {
            openCloseFormContact();  // Call the function when the button exists
            clearInterval(waitForContactButton);  // Stop the interval
        }
    }, 100); // Check every 100ms

    const validateForm = () => {
        const form = document.querySelector('.modal_form form');
        const firstName = document.querySelector("#firstname");
        const lastName = document.querySelector("#lastname");
        const email = document.querySelector("#email");
        const message = document.querySelector("#message");

        if (form && firstName && lastName && email && message) {
            form.addEventListener('input', () => displayCustomMessage());

            form.addEventListener('submit', e => {
                e.preventDefault();
                if (!form.checkValidity()) displayCustomMessage();
                else {
                    const formDatas = {
                        firstName: firstName.value,
                        lastName: lastName.value,
                        email: email.value,
                        message: message.value,
                    };
                    console.log(JSON.stringify(formDatas));
                    document.querySelectorAll('.formField').forEach(input => input.classList.remove('valid'));
                    form.reset();
                }
            });

        const checkInputValidity = (input, regex) => {
            const errorMessage = input.dataset.error;
            const messageProvider = input.nextElementSibling;
            const isValid = regex.test(input.value);

            if (isValid) {
                messageProvider.innerHTML = "";
                messageProvider.removeAttribute("role");
                input.removeAttribute("aria-invalid");
            } else {
                messageProvider.innerHTML = errorMessage;
                messageProvider.setAttribute("role", "alert");
                input.setAttribute("aria-invalid", "true");
            }

            input.classList.toggle('invalid', !isValid);
            input.classList.toggle('valid', isValid);
        };

        const displayCustomMessage = () => {
            const regexName = /^([A-Za-z|\s]{2,50})?([-]{0,1})?([A-Za-z|\s]{2,50})$/;
            const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            const regexMessage = /^[A-Za-z0-9|\s]{20,500}$/;

            checkInputValidity(firstName, regexName);
            checkInputValidity(lastName, regexName);
            checkInputValidity(email, regexEmail);
            checkInputValidity(message, regexMessage);
        };
    } else {
        console.error("One or more elements are missing for validateForm.");
    }
};

// Call the functions once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    const contactModal = document.querySelector(".modal_wrapper");
    if (contactModal) {
        contactModal.style.display = "none"; // Ensure modal is hidden when page loads
    }

    openCloseFormContact();
    validateForm();
});
