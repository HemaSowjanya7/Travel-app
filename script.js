// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // Highlight the active navigation link
    const navLinks = document.querySelectorAll("nav ul li a");
    const currentPage = window.location.pathname.split("/").pop(); // Get current page name

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("text-orange-500", "font-bold"); // Highlight active link
        } else {
            link.classList.remove("text-orange-500", "font-bold");
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // Adjust for fixed header
                    behavior: "smooth"
                });
            }
        });
    });

    // Contact Form Validation
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            // Check if any field is empty
            if (name === "" || email === "" || message === "") {
                alert("Please fill out all fields before submitting.");
                return;
            }

            // Validate email format
            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            // If all validations pass
            alert("Your message has been sent successfully!");
            contactForm.reset(); // Clear form fields after submission
        });
    }

    // Function to validate email format
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Open and close modal functionality
    const openModal = (modalId) => {
        document.getElementById(modalId).classList.remove('hidden');
    };

    const closeModal = (modalId) => {
        document.getElementById(modalId).classList.add('hidden');
    };

    // Show trip modal when clicking "Plan Your Trip"
    document.querySelectorAll('[onclick="openTripModal()"]').forEach(button => {
        button.addEventListener('click', () => openModal('tripModal'));
    });

    // Show sign-up and sign-in modal triggers
    document.querySelectorAll('[onclick="openModal(\'signinModal\')"]').forEach(button => {
        button.addEventListener('click', () => openModal('signinModal'));
    });

    document.querySelectorAll('[onclick="openModal(\'signupModal\')"]').forEach(button => {
        button.addEventListener('click', () => openModal('signupModal'));
    });

    // Switching between Sign In and Sign Up modals
    document.querySelectorAll('[onclick="showSignupModal()"]').forEach(button => {
        button.addEventListener('click', () => {
            closeModal('signinModal');
            openModal('signupModal');
        });
    });

    document.querySelectorAll('[onclick="showSigninModal()"]').forEach(button => {
        button.addEventListener('click', () => {
            closeModal('signupModal');
            openModal('signinModal');
        });
    });

    // Close modal when X button is clicked
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });

    // Trip Modal - Calculate price estimate based on user input
    document.querySelector("#tripModal form").addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form values
        const bookingType = document.getElementById("bookingType").value;
        const startLocation = document.querySelector("input[placeholder='Enter starting location']").value.trim();
        const endLocation = document.querySelector("input[placeholder='Enter ending location']").value.trim();
        const days = document.querySelector("input[placeholder='Enter number of days']").value.trim();

        // Basic form validation
        if (!startLocation || !endLocation || !days) {
            alert("Please fill out all the fields.");
            return;
        }

        // Calculate price estimate based on the booking type
        let priceEstimate;
        if (bookingType === "transport") {
            priceEstimate = days * 1000;  // Assume transport cost is 1000 per day
        } else if (bookingType === "hotel") {
            priceEstimate = days * 2000;  // Assume hotel cost is 2000 per day
        } else if (bookingType === "package") {
            priceEstimate = days * 5000;  // Assume package cost is 5000 per day
        }

        // Update the price field with the calculated estimate
        const estimatedPriceInput = document.querySelector("input[placeholder='Estimated Price']");
        if (estimatedPriceInput) {
            estimatedPriceInput.value = "₹" + priceEstimate.toLocaleString();
        }

        // Optional: Close modal after submission (you can modify based on your workflow)
        closeModal('tripModal');
    });

});
