const images = document.querySelectorAll('.image-container img');

let currentIndex = 0;

function changeImage() {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
}

setInterval(changeImage, 4000);

// HERO IMAGE CAROUSEL WITH PAN EFFECT
const heroImages = document.querySelectorAll('.hero .image-container img');

let heroIndex = 0;

function changeHeroImage() {
    heroImages[heroIndex].classList.remove('active');
    heroIndex = (heroIndex + 1) % heroImages.length;
    heroImages[heroIndex].classList.add('active');
}

setInterval(changeHeroImage, 4000);

// FILM STRIP CAROUSELS WITH PAN EFFECT
document.querySelectorAll('.film-strip').forEach(filmStrip => {
    const imgs = filmStrip.querySelectorAll('img');
    let idx = 0;

    // Set the width of the film strip based on the number of images
    filmStrip.style.width = `${imgs.length * 250}px`; // Assuming each image is 250px wide

    function showFilmStripImage() {
        // Move images based on the index
        filmStrip.style.transform = `translateX(-${idx * 250}px)`;
        idx = (idx + 1) % (imgs.length - 1); // Loop back to the first image (excluding the duplicate)
    }

    showFilmStripImage();
    setInterval(showFilmStripImage, 4000); // Change image every 4 seconds
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
let menuVisible = false;

menuButton.addEventListener('click', () => {
    menuVisible = !menuVisible;
    menuButton.classList.toggle('active', menuVisible);
    navLinks.style.display = menuVisible ? 'flex' : 'none';
});

window.addEventListener('scroll', () => {
    if (menuVisible) {
        menuVisible = false;
        navLinks.style.display = 'none';
        menuButton.classList.remove('active');
    }
});

// Modal logic for booking form
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('bookingModal');
    const closeModalBtn = document.getElementById('closeModal');
    const serviceButtons = document.querySelectorAll('.service-book-btn');
    const serviceOptions = document.querySelectorAll('.service-option');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const userInfoForm = document.getElementById('userInfoForm');

    // Open modal and prefill service if button clicked
    serviceButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            modal.style.display = 'block';
            // Prefill service type in quick-book tab
            const service = btn.getAttribute('data-service');
            serviceOptions.forEach(opt => {
                if (opt.getAttribute('data-service') === service) {
                    opt.classList.add('selected');
                } else {
                    opt.classList.remove('selected');
                }
            });
            // Switch to quick-book tab
            tabBtns.forEach(tb => tb.classList.remove('active-tab'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            tabBtns[0].classList.add('active-tab');
            tabContents[0].classList.add('active');
        });
    });

    // Close modal
    closeModalBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        userInfoForm.reset();
        serviceOptions.forEach(opt => opt.classList.remove('selected'));
    });

    // Close modal when clicking outside content
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            userInfoForm.reset();
            serviceOptions.forEach(opt => opt.classList.remove('selected'));
        }
    });

    // Service option selection
    serviceOptions.forEach(opt => {
        opt.addEventListener('click', function () {
            serviceOptions.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
        });
    });

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            tabBtns.forEach(tb => tb.classList.remove('active-tab'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            btn.classList.add('active-tab');
            document.getElementById(btn.getAttribute('data-tab')).classList.add('active');
        });
    });

    // Prevent form submission (for now)
    userInfoForm.addEventListener('submit', function (e) {
        e.preventDefault();
    });

    // (Optional) Add logic for sendBookingBtn here
});
