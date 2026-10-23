const typing = document.getElementById('typing');
const word = [
    "Design Responsive Websites",
    "Build Modern Websites",
    "Create interactive Websites",
    "Develop Web Applications",
    "Turn Ideas into Reality",];

let index = 0;
let letter = 0;
let deleting = false;

function typeEffect() {
    let words = word[index];
    if (deleting) {
        letter--;
    } else {
        letter++;
    }
    typing.textContent = words.substring(0, letter);

    if (!deleting && letter === words.length) {
        deleting = true;
        setTimeout(typeEffect, 1000);
        return;
    }

    if (deleting && letter === 0) {
        deleting = false;
        index = (index + 1) % word.length;
    }

    setTimeout(typeEffect, deleting ? 40 : 80)
}

typeEffect();
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let current = 0;
            const duration = 5000; // 2 seconds
            const startTime = performance.now();

            function updateCounter(currentTime) {

                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                current = Math.floor(progress * target);

                counter.textContent = current + "+";

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + "+";
                }
            }

            requestAnimationFrame(updateCounter);

            // Stop observing so the animation runs only once
            observer.unobserve(counter);
        }

    });

}, {
    threshold: 0.8
});

// Observe each counter
counters.forEach(counter => {
    observer.observe(counter);
});

// const contactForm = document.getElementById("contactForm");
// const formResponse = document.getElementById("formResponse");

// contactForm.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const name = document.getElementById("name").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const message = document.getElementById("message").value.trim();

//     if (name === "" || email === "" || message === "") {
//         formResponse.textContent = "Please fill in all fields before sending us a message.";
//         formResponse.style.color = "red";
//         return;
//     }

//     formResponse.textContent = "Thank you! Please send us your message, and we will get back to you.";
//     formResponse.style.color = "lightgreen";

//     contactForm.reset();
// });

// Your EmailJS details
const SERVICE_ID = "service_4629rvl";
const TEMPLATE_ID = "template_bfqdtwe";
const PUBLIC_KEY = "t_-h_sro7J-JZChlB";

// Contact form elements
const contactForm = document.getElementById("contactForm");
const formResponse = document.getElementById("formResponse");
const sendBtn = document.getElementById("sendBtn");

// Check that EmailJS and the form exist
if (contactForm && window.emailjs) {

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Check the form fields
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            formResponse.textContent =
                "Please fill in all fields before sending us a message.";

            formResponse.style.color = "red";
            return;
        }

        // Show a sending message
        // sendBtn.disabled = true;
        // sendBtn.textContent = "Sending...";
        // formResponse.textContent = "";

        // Send the message to your Gmail
        emailjs.sendForm(
            SERVICE_ID,
            TEMPLATE_ID,
            contactForm,
            { publicKey: PUBLIC_KEY }
        )
        .then(function () {

            formResponse.textContent =
                "Thank you for contacting me! Your message has been sent successfully.";

            formResponse.style.color = "lightgreen";

            contactForm.reset();

        })
        .catch(function (error) {

            console.error("EmailJS error:", error);

            formResponse.textContent =
                "Sorry, your message could not be sent. Please try again.";

            formResponse.style.color = "red";

        })
        .finally(function () {

            sendBtn.disabled = false;
            sendBtn.textContent = "Send Message";

        });

    });

} else {
    console.error(
        "Contact form or EmailJS library not found. Check your HTML script tags."
    );
}

const year = document.getElementById('year');
year.textContent = new Date().getFullYear();