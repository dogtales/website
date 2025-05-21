const images = document.querySelectorAll('.image-container img');
let currentIndex = 0;

function changeImage() {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
}

setInterval(changeImage, 4000);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    const filmStrip = card.querySelector('.film-strip');
    const videoContainer = card.querySelector('.video-container');
    card.addEventListener('mouseenter', () => {
        filmStrip.style.display = 'flex';
        videoContainer.style.display = 'none';
    });
    card.addEventListener('mouseleave', () => {
        filmStrip.style.display = 'none';
        videoContainer.style.display = 'block';
    });
    card.addEventListener('click', () => {
        const video = videoContainer.querySelector('iframe');
        video.src += "?autoplay=1";
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