// Purpose:
    // Initializes carousels.
    // Sets up DOMContentLoaded event for modal and booking logic.
    // Hooks up booking/auth button events.
    // Provides error/success helpers.
// Status:
    // initCarousels() is called.
// Imports necessary modules
import { initCarousels } from './carousel.js';
import { handleSignUp, handleSignIn, handleOAuthSignIn, handleSignOut, listenForAuthChanges, updateAuthUI as authModuleUpdateAuthUI, getCurrentUser } from './auth.js';
import { createBookingItem, loadBookingHistory, sanitizeInput } from './booking.js';

// Initialize carousels
initCarousels();

// Helper for showing modal errors
function showModalError(message) {
    const errorDiv = document.getElementById('modalError');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        errorDiv.style.color = '#e53935'; // Ensure error color
        setTimeout(() => { errorDiv.style.display = 'none'; }, 5000);
    }
}

// Helper for showing modal success messages
function showModalSuccess(message) {
    const errorDiv = document.getElementById('modalError'); // Reusing the same div for simplicity
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        errorDiv.style.color = '#4CAF50'; // Green color for success
        setTimeout(() => { errorDiv.style.display = 'none'; }, 5000);
    }
}

// Function to pre-fill profile fields
function prefillProfile(user) {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const userStatusSpan = document.getElementById('user-status');
    const authEmailInput = document.getElementById('auth-email');
    const signUpModalBtn = document.getElementById('sign-up-modal');
    const signInModalBtn = document.getElementById('sign-in-modal');
    const signInGoogleModalBtn = document.getElementById('sign-in-google-modal');
    const signInGithubModalBtn = document.getElementById('sign-in-github-modal');
    const signOutModalBtn = document.getElementById('sign-out-modal');
    const authTabBtn = document.getElementById('auth-tab-btn');

    if (user) {
        if (nameInput) nameInput.value = user.user_metadata?.full_name || '';
        if (phoneInput) phoneInput.value = user.phone || ''; // Assuming phone is part of user metadata or profile
        if (userStatusSpan) userStatusSpan.textContent = `Logged in as: ${user.email}`;
        if (authEmailInput) authEmailInput.value = user.email; // Prefill auth email
        
        // Hide sign-in/up buttons, show sign-out
        if (signUpModalBtn) signUpModalBtn.style.display = 'none';
        if (signInModalBtn) signInModalBtn.style.display = 'none';
        if (signInGoogleModalBtn) signInGoogleModalBtn.style.display = 'none';
        if (signInGithubModalBtn) signInGithubModalBtn.style.display = 'none';
        if (signOutModalBtn) signOutModalBtn.style.display = 'block';
        if (authTabBtn) authTabBtn.textContent = 'Profile / Sign Out'; // Change tab text
    } else {
        if (nameInput) nameInput.value = '';
        if (phoneInput) phoneInput.value = '';
        if (userStatusSpan) userStatusSpan.textContent = 'Not logged in';
        if (authEmailInput) authEmailInput.value = '';

        // Show sign-in/up buttons, hide sign-out
        if (signUpModalBtn) signUpModalBtn.style.display = 'block';
        if (signInModalBtn) signInModalBtn.style.display = 'block';
        if (signInGoogleModalBtn) signInGoogleModalBtn.style.display = 'block';
        if (signInGithubModalBtn) signInGithubModalBtn.style.display = 'block';
        if (signOutModalBtn) signOutModalBtn.style.display = 'none';
        if (authTabBtn) authTabBtn.textContent = 'Sign In / Up'; // Change tab text back
    }
}

// Custom updateAuthUI to handle specific UI elements in main.js
function updateAuthUI(user) {
    prefillProfile(user); // Call the prefillProfile function
    // Any other UI updates specific to main.js can go here
    const historyTabBtn = document.getElementById('history-tab-btn');
    if (historyTabBtn) {
        historyTabBtn.style.display = user ? 'block' : 'none'; // Show history tab only if logged in
    }
}

// Function to render booking history
function renderBookingHistory(data) {
    const list = document.getElementById('bookingHistoryList');
    if (!list) return;
    list.innerHTML = ''; // Clear previous entries

    if (data.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No bookings found.';
        list.appendChild(li);
        return;
    }

    data.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${sanitizeInput(item.title)}</strong><br>
                        Date: ${sanitizeInput(item.created_at.split('T')[0])}<br>
                        Details: ${sanitizeInput(item.description.split('\n')[2] || '')}
                        <hr>`; // Display title, date, and a snippet of description
        list.appendChild(li);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const serviceBookBtns = document.querySelectorAll('.service-book-btn');
    const bookingModal = document.getElementById('bookingModal');
    const closeModal = document.getElementById('closeModal');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const serviceOptions = document.querySelectorAll('.service-option');
    const sendBookingBtn = document.getElementById('sendBookingBtn');
    const userInfoForm = document.getElementById('userInfoForm');
    const businessWhatsAppNumber = '254115411167';

    // Auth elements
    const authEmailInput = document.getElementById('auth-email');
    const authPasswordInput = document.getElementById('auth-password');
    const signUpModalBtn = document.getElementById('sign-up-modal');
    const signInModalBtn = document.getElementById('sign-in-modal');
    const signInGoogleModalBtn = document.getElementById('sign-in-google-modal');
    const signInGithubModalBtn = document.getElementById('sign-in-github-modal');
    const signOutModalBtn = document.getElementById('sign-out-modal');
    const historyTabBtn = document.getElementById('history-tab-btn');


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
            // Ensure quick-book tab is active and modal is shown
            const quickBookTabBtn = document.querySelector('.tab-btn[data-tab="quick-book"]');
            if (quickBookTabBtn) quickBookTabBtn.click();
            bookingModal.classList.add('active');
            showModalError(''); // Clear any previous errors
        });
    });

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function(e) {
            e.preventDefault();
            bookingModal.classList.remove('active');
            showModalError(''); // Clear errors on close
        });
    }

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(tb => tb.classList.remove('active-tab'));
            this.classList.add('active-tab');
            const tabId = this.getAttribute('data-tab');
            tabContents.forEach(content => content.classList.remove('active'));
            const targetTabContent = document.getElementById(tabId);
            if (targetTabContent) {
                targetTabContent.classList.add('active');
            }
            showModalError(''); // Clear errors on tab switch

            // Load history if history tab is clicked
            if (tabId === 'history-tab') {
                loadBookingHistory(showModalError, renderBookingHistory);
            }
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
    if (sendBookingBtn) {
        sendBookingBtn.addEventListener('click', async function() {
            const now = Date.now();
            if (now - lastBookingTime < 60000) { // 1 minute cooldown
                showModalError('Please wait a minute before making another booking.');
                return;
            }
            lastBookingTime = now;

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;

            if (!name || !phone) {
                showModalError('Please enter your name and phone number.');
                return;
            }

            const activeTab = document.querySelector('.tab-content.active');
            if (!activeTab) {
                showModalError('Please select a booking type or provide a custom message.');
                return;
            }
            const activeTabId = activeTab.id;

            let whatsappMessage = '';
            let bookingDetails = { name: sanitizeInput(name), phone: sanitizeInput(phone) };

            if (activeTabId === 'quick-book') {
                const selectedServiceElement = document.querySelector('.service-option.selected');
                const selectedService = selectedServiceElement ? selectedServiceElement.getAttribute('data-service') : 'Not specified';
                const date = document.getElementById('date').value;
                const time = document.getElementById('time').value;
                const notes = document.getElementById('notes').value;

                whatsappMessage = `Hello Dog Tales Kennels! I'd like to inquire about your services.\n\n` +
                    `*Name:* ${bookingDetails.name}\n` +
                    `*Phone:* ${bookingDetails.phone}\n` +
                    `*Service of Interest:* ${sanitizeInput(selectedService)}\n` +
                    (date ? `*Preferred Date:* ${sanitizeInput(date)}\n` : '') +
                    (time ? `*Preferred Time:* ${sanitizeInput(time)}\n` : '') +
                    (notes ? `*Additional Notes:* ${sanitizeInput(notes)}` : '');
                
                bookingDetails = { 
                    ...bookingDetails, 
                    service: sanitizeInput(selectedService), 
                    date: sanitizeInput(date), 
                    time: sanitizeInput(time), 
                    notes: sanitizeInput(notes) 
                };

            } else if (activeTabId === 'custom-message') {
                const customMessage = document.getElementById('message').value;
                whatsappMessage = `Hello Dog Tales Kennels! This is ${bookingDetails.name} (${bookingDetails.phone}).\n\n` + sanitizeInput(customMessage);
                bookingDetails = { ...bookingDetails, message: sanitizeInput(customMessage), service: "Custom Message" };
            } else {
                showModalError('Please select a booking type or provide a custom message.');
                return;
            }

            // Save to Supabase if user is logged in
            const currentUser = getCurrentUser();
            if (currentUser) {
                const savedBooking = await createBookingItem(bookingDetails, showModalError, showModalSuccess);
                if (savedBooking) {
                    showModalSuccess('Booking saved to your account and WhatsApp message prepared!');
                } else {
                    showModalError('Booking could not be saved to your account. Please try again.');
                }
            } else {
                showModalError('Booking details will only be sent via WhatsApp. Log in to save your bookings!');
            }

            // Always send via WhatsApp
            const encodedMessage = encodeURIComponent(whatsappMessage);
            window.open(`https://wa.me/${businessWhatsAppNumber}?text=${encodedMessage}`, '_blank');
            
            // Reset form after sending
            bookingModal.classList.remove('active');
            if (userInfoForm) userInfoForm.reset();
            serviceOptions.forEach(opt => opt.classList.remove('selected'));
            const quickBookTabBtn = document.querySelector('.tab-btn[data-tab="quick-book"]');
            if (quickBookTabBtn) quickBookTabBtn.click(); // Reset to Quick Book tab
        });
    }

    // Close modal when clicking outside
    if (bookingModal) {
        bookingModal.addEventListener('click', function(e) {
            if (e.target === bookingModal) {
                bookingModal.classList.remove('active');
                showModalError(''); // Clear errors on close
            }
        });
    }

    // Keyboard accessibility: close modal on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && bookingModal.classList.contains('active')) {
            bookingModal.classList.remove('active');
            showModalError(''); // Clear errors on close
        }
    });

    // --- Supabase Auth Event Listeners within Modal ---
    if (signUpModalBtn) {
        signUpModalBtn.addEventListener('click', () => {
            const email = authEmailInput ? authEmailInput.value : '';
            const password = authPasswordInput ? authPasswordInput.value : '';
            handleSignUp(email, password, showModalError);
        });
    }
    if (signInModalBtn) {
        signInModalBtn.addEventListener('click', () => {
            const email = authEmailInput ? authEmailInput.value : '';
            const password = authPasswordInput ? authPasswordInput.value : '';
            handleSignIn(email, password, showModalError);
        });
    }
    if (signInGoogleModalBtn) {
        signInGoogleModalBtn.addEventListener('click', () => handleOAuthSignIn('google', showModalError));
    }
    if (signInGithubModalBtn) {
        signInGithubModalBtn.addEventListener('click', () => handleOAuthSignIn('github', showModalError));
    }
    if (signOutModalBtn) {
        signOutModalBtn.addEventListener('click', () => handleSignOut(showModalError));
    }

    // Initial check and listen for auth state changes
    listenForAuthChanges(updateAuthUI, prefillProfile);
});
