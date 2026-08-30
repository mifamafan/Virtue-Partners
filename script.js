document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('contactModal');
    const openButtons = document.querySelectorAll('.open-modal-btn');
    const closeButton = document.querySelector('.close-btn');
    const leadForm = document.getElementById('leadForm');
    const formStatus = document.getElementById('form-status');

    // Open Modal
    openButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = 'flex';
            // Clear status if reopening
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        });
    });

    // Close Modal
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Asynchronous Ajax Formspree Submission
    leadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const data = new FormData(leadForm);
        formStatus.textContent = 'Sending request...';
        formStatus.className = 'form-status sending';

        try {
            const response = await fetch(leadForm.action, {
                method: leadForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                formStatus.className = 'form-status success';
                leadForm.reset();
                // Close modal after short delay
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 3000);
            } else {
                const responseData = await response.json();
                if (Object.hasOwn(responseData, 'errors')) {
                    formStatus.textContent = responseData['errors'].map(error => error.message).join(', ');
                } else {
                    formStatus.textContent = 'Oops! There was a problem submitting your form.';
                }
                formStatus.className = 'form-status error';
            }
        } catch (error) {
            formStatus.textContent = 'Oops! There was a network connectivity issue.';
            formStatus.className = 'form-status error';
        }
    });
});
