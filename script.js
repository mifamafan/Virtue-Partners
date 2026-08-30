document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('contactModal');
    const openButtons = document.querySelectorAll('.open-modal-btn');
    const closeButton = document.querySelector('.close-btn');
    const leadForm = document.getElementById('leadForm');

    // Open Modal Function
    openButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    });

    // Close Modal Function
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close Modal when clicking outside the container box
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle Form Submission Mock
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const selectedService = document.getElementById('service-select').value;
        
        alert(`Thank you ${name}! Your inquiry for our "${selectedService}" division has been safely received.`);
        
        leadForm.reset();
        modal.style.display = 'none';
    });
});
