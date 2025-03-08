let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}

function plusSlides(n) {
    slideIndex += n;
    showSlides();
}

// Loading Bar Functionality
const links = document.querySelectorAll('nav ul li a');
links.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        const targetUrl = this.getAttribute('href');
        showLoader();
        setTimeout(() => {
            window.location.href = targetUrl; // Navigate after delay
        }, 5000); // 5 seconds delay
    });
});

function showLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    document.body.appendChild(loader);
    loader.style.display = 'block'; // Show loader
}
