document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    contactForm.innerHTML = `
        <div id="contact_modal">
            <div class="modal">
                <header>
                    <h2>Contactez-moi</h2>
                    <img src="assets/icons/close.svg" alt="fermer formulaire" onclick="closeModal()"/>
                </header>
                <form>
                    <div>
                        <label>Prénom</label>
                        <input type="text" id="first" name="first" aria-describedby="firstError"/>
                        <div class="error" id="firstError"></div>
                    </div>
                    <div>
                        <label>Nom</label>
                        <input type="text" id="last" name="last" aria-describedby="lastError"/>
                        <div class="error" id="lastError"></div>
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="text" id="email" name="email" aria-describedby="emailError"/>
                        <div class="error" id="emailError"></div>
                    </div>
                    <div>
                        <label>Votre message</label>
                        <textarea rows="4" id="message" name="message" aria-describedby="messageError"></textarea>
                        <div class="error" id="messageError"></div>
                    </div>
                    <button class="contact_button" aria-label="Envoyer le message">Envoyer</button>
                </form>
            </div>
        </div>
    `;
});
