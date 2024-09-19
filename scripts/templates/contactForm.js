// contactForm.js

    // // Call fetchPhotographersData and then update the photographer's name
    // fetchPhotographersData().then(() => {
    //     updatePhotographerName(); // Call updatePhotographerName after data is loaded
    // }).catch(error => {
    //     console.error('Error fetching photographers data:', error);
    // });

    // const updatePhotographerName = () => {
    //     const params = new URLSearchParams(window.location.search);
    //     const photographerId = params.get('id'); 
    //     const photographerNameElement = document.querySelector('.modal_form_name');

    //     if (typeof data === 'undefined' || !data.photographers) {
    //         console.error('Data not loaded or photographers array is missing');
    //         return;
    //     }

    //     // Access the photographers array within Data
    //     const photographer = data.photographers.find(p => p.id == photographerId); // Use '==' to compare string and number

    //     if (photographer) {
    //         // Set the photographer's name in the modal
    //         photographerNameElement.textContent = photographer.name;
    //     } else {
    //         // If not found, set a default message or handle the error
    //         photographerNameElement.textContent = "Photographer not found";
    //     }
    // };


    const openCloseFormContact = () => {
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
    };

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
    openCloseFormContact();
    validateForm();
    // updatePhotographerName();
});
