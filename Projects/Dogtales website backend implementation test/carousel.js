export function initCarousels() {
    // Main image carousel
    const images = document.querySelectorAll('.image-container img');
    let currentIndex = 0;
    function changeImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }
    setInterval(changeImage, 4000);

    // Hero image carousel
    const heroImages = document.querySelectorAll('.hero .image-container img');
    let heroIndex = 0;
    function changeHeroImage() {
        heroImages[heroIndex].classList.remove('active');
        heroIndex = (heroIndex + 1) % heroImages.length;
        heroImages[heroIndex].classList.add('active');
    }
    setInterval(changeHeroImage, 4000);

    // Film strip carousel
    document.querySelectorAll('.film-strip').forEach(filmStrip => {
        const imgs = filmStrip.querySelectorAll('img');
        let idx = 0;
        filmStrip.style.width = `${imgs.length * 250}px`;
        function showFilmStripImage() {
            filmStrip.style.transform = `translateX(-${idx * 250}px)`;
            idx = (idx + 1) % (imgs.length - 1);
        }
        showFilmStripImage();
        setInterval(showFilmStripImage, 4000);
    });
}