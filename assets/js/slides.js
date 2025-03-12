//BANNER SLIDE//

let slideIndex = 0;


function showSlides() {
    let slides = document.getElementsByClassName("slide");
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    slideIndex++;
    
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    slides[slideIndex - 1].style.display = "block";  
    
    setTimeout(showSlides, 5000); // Change slide every 5 seconds
}

showSlides(); // Initialize the slideshow

//ABOUT US ANIMATION//
document.addEventListener("DOMContentLoaded", function () {
  const animatedSection = document.querySelector(".about-text");

  // Function to check if an element is in the viewport
  const isInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight * 0.8; // Trigger when it's about 80% into view
  };

  const handleScrollAnimation = () => {
    if (isInViewport(animatedSection)) {
      animatedSection.classList.add("show");
    }
  };

  // Trigger animation on scroll
  window.addEventListener("scroll", handleScrollAnimation);

  // Trigger on page load in case it's already in view
  handleScrollAnimation();
});

//TESTIMONIALS//
document.addEventListener("DOMContentLoaded", function () {
  const testimonials = document.querySelectorAll(".testimonial");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  let currentIndex = 0;

  const showTestimonial = (index) => {
    testimonials.forEach((testimonial, idx) => {
      // Hide all testimonials
      testimonial.style.opacity = 0;
      testimonial.style.transform = "translateX(100%)";
    });

    // Show only the current testimonial
    testimonials[index].style.opacity = 1;
    testimonials[index].style.transform = "translateX(0)";
  };

  const showNextTestimonial = () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  };

  const showPreviousTestimonial = () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
  };

  prevButton.addEventListener("click", showPreviousTestimonial);
  nextButton.addEventListener("click", showNextTestimonial);

  // Initialize the first testimonial view
  showTestimonial(currentIndex);

  // Optional: Auto-rotate testimonials every 5 seconds
  setInterval(showNextTestimonial, 5000);
});

//CONTACT FORM//
function sendMessage() {
      const fullName = document.getElementById("fullName").value;
      const email = document.getElementById("email").value;
      const contactNumber = document.getElementById("contactNumber").value;
      const address = document.getElementById("address").value;
      const messageContent = document.getElementById("message").value;

      const message = 
        `Full Name: ${fullName}%0A` +
        `Email: ${email}%0A` +
        `Contact Number: ${contactNumber}%0A` +
        `Address: ${address}%0A` +
        `Message: ${messageContent}`;

      const whatsappNumber = '27726962588'; // Replace with your WhatsApp number

      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      window.open(whatsappURL, '_blank');
    }
	
//FAQ QUESTIONS//	
// Function to toggle answers in the FAQ
        function toggleAnswer(index) {
            const answers = document.querySelectorAll('.faq-answer');
            const questions = document.querySelectorAll('.faq-question span');

            // Collapse all other answers
            answers.forEach((answer, i) => {
                if (i !== index) {
                    answer.style.display = 'none';
                    questions[i * 2 + 1].innerHTML = '&#9660;';
                }
            });

            // Toggle the clicked answer
            const currentAnswer = answers[index];
            const currentIcon = questions[index * 2 + 1];

            if (currentAnswer.style.display === 'block') {
                currentAnswer.style.display = 'none';
                currentIcon.innerHTML = '&#9660;';
            } else {
                currentAnswer.style.display = 'block';
                currentIcon.innerHTML = '&#9650;';
            }
        }
