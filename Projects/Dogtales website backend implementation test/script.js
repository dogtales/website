import { SUPABASE_URL, SUPABASE_KEY } from './supabase-config.js';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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

// --- Supabase Integration: New Code Starts Here ---

// Initialize Supabase (REPLACE WITH YOUR ACTUAL PROJECT URL AND ANON KEY)
// const supabaseUrl = 'https://your-project-ref.supabase.co'; // e.g., 'https://abcdefg1234.supabase.co'
// const supabaseKey = 'your-anon-key'; // e.g., 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
// const supabase = supabase.createClient(supabaseUrl, supabaseKey);

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
    const businessWhatsAppNumber = '254115411167';

    // New DOM elements for Supabase Auth within the modal
    const authTabBtn = document.getElementById('auth-tab-btn');
    const authEmailInput = document.getElementById('auth-email');
    const authPasswordInput = document.getElementById('auth-password');
    const signUpModalBtn = document.getElementById('sign-up-modal');
    const signInModalBtn = document.getElementById('sign-in-modal');
    const signInGoogleModalBtn = document.getElementById('sign-in-google-modal');
    const signInGithubModalBtn = document.getElementById('sign-in-github-modal');
    const signOutModalBtn = document.getElementById('sign-out-modal');
    const userStatusSpan = document.getElementById('user-status');
    const historyTabBtn = document.getElementById('history-tab-btn');

    let currentUser = null; // To store the current logged-in user

    // --- Supabase Authentication Functions ---
    const updateAuthUI = (user) => {
        currentUser = user;
        if (user) {
            userStatusSpan.textContent = `Logged in as: ${user.email}`;
            signOutModalBtn.style.display = 'block';
            signUpModalBtn.style.display = 'none';
            signInModalBtn.style.display = 'none';
            signInGoogleModalBtn.style.display = 'none';
            signInGithubModalBtn.style.display = 'none';
            // Optionally disable name/phone fields if user is logged in and we want to use their profile data
            // document.getElementById('name').value = user.user_metadata?.full_name || '';
            // document.getElementById('phone').value = user.phone || '';
        } else {
            userStatusSpan.textContent = 'Not logged in';
            signOutModalBtn.style.display = 'none';
            signUpModalBtn.style.display = 'block';
            signInModalBtn.style.display = 'block';
            signInGoogleModalBtn.style.display = 'block';
            signInGithubModalBtn.style.display = 'block';
            // Clear name/phone fields if they were pre-filled
            // document.getElementById('name').value = '';
            // document.getElementById('phone').value = '';
        }
    };

    const handleSignUp = async () => {
        const email = authEmailInput.value;
        const password = authPasswordInput.value;
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
            alert(`Error signing up: ${error.message}`);
        } else {
            alert('Sign up successful! Check your email for a confirmation link.');
            authEmailInput.value = '';
            authPasswordInput.value = '';
            bookingModal.classList.remove('active'); // Close modal
        }
    };

    const handleSignIn = async () => {
        const email = authEmailInput.value;
        const password = authPasswordInput.value;
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            alert(`Error signing in: ${error.message}`);
        } else {
            alert('Signed in successfully!');
            authEmailInput.value = '';
            authPasswordInput.value = '';
            bookingModal.classList.remove('active'); // Close modal
            updateAuthUI(data.user);
        }
    };

    const handleOAuthSignIn = async (provider) => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: { redirectTo: window.location.href }
        });
        if (error) {
            alert(`Error with ${provider} sign in: ${error.message}`);
        }
        // Redirect will handle the rest
    };

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert(`Error signing out: ${error.message}`);
        } else {
            alert('Signed out successfully!');
            updateAuthUI(null);
            bookingModal.classList.remove('active'); // Close modal
        }
    };

    // --- Supabase Data (Item) Creation ---
    const createBookingItem = async (bookingDetails) => {
        if (!currentUser) {
            alert('Please sign in to save your booking details.');
            return null;
        }

        const { name, phone, service, date, time, notes, message } = bookingDetails;
        const title = service || "General Inquiry";
        const description = `Name: ${name}\nPhone: ${phone}\nService: ${service}\nDate: ${date}\nTime: ${time}\nNotes: ${notes}\nCustom Message: ${message}`;

        const { data, error } = await supabase
            .from('items') // Using 'items' table for bookings
            .insert([{
                title: title,
                description: description,
                user_id: currentUser.id // Link booking to the logged-in user
            }])
            .select();

        if (error) {
            alert(`Error saving booking: ${error.message}`);
            return null;
        } else {
            console.log('Booking saved to Supabase:', data);
            return data[0];
        }
    };

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
            tabBtns[0].click(); // Ensure quick-book tab is active
            bookingModal.classList.add('active');
        });
    });

    // Close modal
    closeModal.addEventListener('click', function(e) {
        e.preventDefault();
        bookingModal.classList.remove('active');
    });

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(tb => tb.classList.remove('active-tab'));
            this.classList.add('active-tab');
            const tabId = this.getAttribute('data-tab');
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Service selection
    serviceOptions.forEach(option => {
        option.addEventListener('click', function() {
            serviceOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    let lastBookingTime = 0;
    // Send booking via WhatsApp AND save to Supabase
    sendBookingBtn.addEventListener('click', async function() {
        const now = Date.now();
        if (now - lastBookingTime < 60000) {
            showModalError('Please wait a minute before making another booking.');
            return;
        }
        lastBookingTime = now;

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;

        if (!name || !phone) {
            alert('Please enter your name and phone number.');
            return;
        }

        const activeTab = document.querySelector('.tab-content.active').id;
        let whatsappMessage = '';
        let bookingDetails = { name, phone };

        if (activeTab === 'quick-book') {
            const selectedServiceElement = document.querySelector('.service-option.selected');
            const selectedService = selectedServiceElement ? selectedServiceElement.getAttribute('data-service') : 'Not specified';
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const notes = document.getElementById('notes').value;

            whatsappMessage = `Hello Dog Tales Kennels! I'd like to inquire about your services.\n\n` +
                `*Name:* ${name}\n` +
                `*Phone:* ${phone}\n` +
                `*Service of Interest:* ${selectedService}\n` +
                (date ? `*Preferred Date:* ${date}\n` : '') +
                (time ? `*Preferred Time:* ${time}\n` : '') +
                (notes ? `*Additional Notes:* ${notes}` : '');
            
            bookingDetails = { ...bookingDetails, service: selectedService, date, time, notes };

        } else if (activeTab === 'custom-message') {
            const customMessage = document.getElementById('message').value;
            whatsappMessage = `Hello Dog Tales Kennels! This is ${name} (${phone}).\n\n` + customMessage;
            bookingDetails = { ...bookingDetails, message: customMessage, service: "Custom Message" };
        } else {
            alert('Please select a booking type or provide a custom message.');
            return;
        }

        // Save to Supabase if user is logged in
        if (currentUser) {
            const savedBooking = await createBookingItem(bookingDetails);
            if (savedBooking) {
                alert('Booking saved to your account and WhatsApp message prepared!');
            } else {
                alert('Booking could not be saved to your account. Please try again.');
            }
        } else {
            alert('Booking details will only be sent via WhatsApp. Log in to save your bookings!');
        }

        // Always send via WhatsApp
        const encodedMessage = encodeURIComponent(whatsappMessage);
        window.open(`https://wa.me/${businessWhatsAppNumber}?text=${encodedMessage}`, '_blank');
        
        bookingModal.classList.remove('active');
        userInfoForm.reset();
        serviceOptions.forEach(opt => opt.classList.remove('selected'));
        tabBtns[0].click(); // Reset to Quick Book tab
    });

    // Close modal when clicking outside
    bookingModal.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            bookingModal.classList.remove('active');
        }
    });

    // Keyboard accessibility: close modal on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            bookingModal.classList.remove('active');
        }
    });

    // --- Supabase Auth Event Listeners within Modal ---
    signUpModalBtn.addEventListener('click', handleSignUp);
    signInModalBtn.addEventListener('click', handleSignIn);
    signInGoogleModalBtn.addEventListener('click', () => handleOAuthSignIn('google'));
    signInGithubModalBtn.addEventListener('click', () => handleOAuthSignIn('github'));
    signOutModalBtn.addEventListener('click', handleSignOut);

    // Initial check and listen for auth state changes
    supabase.auth.getUser().then(({ data: { user } }) => {
        updateAuthUI(user);
    });

    supabase.auth.onAuthStateChange((event, session) => {
        updateAuthUI(session?.user || null);
    });

    async function loadBookingHistory() {
        if (!currentUser) return;
        const { data, error } = await supabase
            .from('items')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('created_at', { ascending: false });
        const list = document.getElementById('bookingHistoryList');
        list.innerHTML = '';
        if (error) {
            showModalError('Could not load booking history.');
            return;
        }
        if (data.length === 0) {
            list.innerHTML = '<li>No bookings found.</li>';
            return;
        }
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.title} (${item.created_at.split('T')[0]})`;
            list.appendChild(li);
        });
    }
    // Call this when user logs in or when history tab is clicked
    historyTabBtn.addEventListener('click', loadBookingHistory);
});

const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
function prefillProfile(user) {
    if (!user) return;
    nameInput.value = user.user_metadata?.full_name || '';
    phoneInput.value = user.phone || '';
}
// Call this in updateAuthUI(user)
updateAuthUI = (user) => {
    currentUser = user;
    if (user) {
        userStatusSpan.textContent = `Logged in as: ${user.email}`;
        signOutModalBtn.style.display = 'block';
        signUpModalBtn.style.display = 'none';
        signInModalBtn.style.display = 'none';
        signInGoogleModalBtn.style.display = 'none';
        signInGithubModalBtn.style.display = 'none';
        prefillProfile(user);
    } else {
        userStatusSpan.textContent = 'Not logged in';
        signOutModalBtn.style.display = 'none';
        signUpModalBtn.style.display = 'block';
        signInModalBtn.style.display = 'block';
        signInGoogleModalBtn.style.display = 'block';
        signInGithubModalBtn.style.display = 'block';
    }
};

const img = document.createElement('img');
img.src = '...';
img.alt = '...';
img.loading = 'lazy';
