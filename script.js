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
