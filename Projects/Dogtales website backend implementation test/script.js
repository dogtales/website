// This file now primarily handles general UI/UX, carousels, and navigation.
// Supabase authentication and booking logic are moved to auth.js, booking.js, and main.js.

// Existing carousel and navigation logic (no changes needed here)
const images = document.querySelectorAll('.image-container img');
let currentIndex = 0;
function changeImage() {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
}
setInterval(changeImage, 4000);

const heroImages = document.querySelectorAll('.hero .image-container img');
let heroIndex = 0;
function changeHeroImage() {
    heroImages[heroIndex].classList.remove('active');
    heroIndex = (heroIndex + 1) % heroImages.length;
    heroImages[heroIndex].classList.add('active');
}
setInterval(changeHeroImage, 4000);

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

// --- Supabase Integration: Removed duplicate Supabase client initialization ---
// The Supabase client is now initialized and exported from auth.js

document.addEventListener('DOMContentLoaded', function() {
    // Existing DOM elements for booking modal
    const serviceBookBtns = document.querySelectorAll('.service-book-btn');
    const bookingModal = document.getElementById('bookingModal');
    const closeModal = document.getElementById('closeModal');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const serviceOptions = document.querySelectorAll('.service-option');
    const sendBookingBtn = document.getElementById('sendBookingBtn');
    const userInfoForm = document.getElementById('userInfoForm');
    // const businessWhatsAppNumber = '254115411167'; // This is now handled in main.js

    // New DOM elements for Supabase Auth within the modal
    // These elements are now primarily managed by main.js for event listeners
    // const authTabBtn = document.getElementById('auth-tab-btn');
    // const authEmailInput = document.getElementById('auth-email');
    // const authPasswordInput = document.getElementById('auth-password');
    // const signUpModalBtn = document.getElementById('sign-up-modal');
    // const signInModalBtn = document.getElementById('sign-in-modal');
    // const signInGoogleModalBtn = document.getElementById('sign-in-google-modal');
    // const signInGithubModalBtn = document.getElementById('sign-in-github-modal');
    // const signOutModalBtn = document.getElementById('sign-out-modal');
    // const userStatusSpan = document.getElementById('user-status');
    // const historyTabBtn = document.getElementById('history-tab-btn');

    // Removed currentUser variable as it's managed in auth.js

    // --- Supabase Authentication Functions ---
    // These functions are now imported and handled by main.js
    // Removed updateAuthUI, handleSignUp, handleSignIn, handleOAuthSignIn, handleSignOut

    // --- Supabase Data (Item) Creation ---
    // This function is now imported and handled by main.js
    // Removed createBookingItem

    // --- Existing Booking Modal Logic (Adapted for Supabase) ---

    // Open modal when a service button is clicked
    serviceBookBtns.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.getAttribute('data-service');
            serviceOptions.forEach(option => {
                option.classList.remove('selected');
                if (option.getAttribute('data-service') === serviceName) {
                    option.classList.add('selected');
                }
            });
            // Ensure quick-book tab is active
            const quickBookTabBtn = document.querySelector('.tab-btn[data-tab="quick-book"]');
            if (quickBookTabBtn) quickBookTabBtn.click();
            bookingModal.classList.add('active');
            // showModalError(''); // This is now handled by main.js
        });
    });

    // Close modal
    closeModal.addEventListener('click', function(e) {
        e.preventDefault();
        bookingModal.classList.remove('active');
        // showModalError(''); // This is now handled by main.js
    });

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(tb => tb.classList.remove('active-tab'));
            this.classList.add('active-tab');
            const tabId = this.getAttribute('data-tab');
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            // showModalError(''); // This is now handled by main.js
            // loadBookingHistory(); // This is now handled by main.js
        });
    });

    // Service selection
    serviceOptions.forEach(option => {
        option.addEventListener('click', function() {
            serviceOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Removed sendBookingBtn event listener as it's now in main.js

    // Close modal when clicking outside
    bookingModal.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            bookingModal.classList.remove('active');
            // showModalError(''); // This is now handled by main.js
        }
    });

    // Keyboard accessibility: close modal on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            bookingModal.classList.remove('active');
            // showModalError(''); // This is now handled by main.js
        }
    });

    // --- Supabase Auth Event Listeners within Modal ---
    // These are now handled by main.js
    // Removed event listeners for signUpModalBtn, signInModalBtn, signInGoogleModalBtn, signInGithubModalBtn, signOutModalBtn

    // Initial check and listen for auth state changes
    // This is now handled by main.js
    // Removed supabase.auth.getUser() and onAuthStateChange listeners

    // Removed loadBookingHistory function as it's now in booking.js and called from main.js
    // Removed prefillProfile function as it's now in main.js
});

// Removed the duplicate updateAuthUI function here.
// The prefillProfile function is now defined and used in main.js.

const img = document.createElement('img');
img.src = '...';
img.alt = '...';
img.loading = 'lazy';
