// filepath: /home/infoscience/Documents/Dog Tales Kennels/V2/website/admin.js

// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Sign-in function
function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('Sign-in successful:', user);
            fetchBookingData();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Sign-in error:', errorCode, errorMessage);
            alert('Sign-in failed: ' + errorMessage);
        });
}

// Fetch booking data
function fetchBookingData() {
    const bookingsRef = firebase.database().ref('bookings');
    bookingsRef.on('value', (snapshot) => {
        const bookings = snapshot.val();
        displayBookings(bookings);
    });
}

// Display booking data
function displayBookings(bookings) {
    const bookingsContainer = document.getElementById('bookingsContainer');
    bookingsContainer.innerHTML = ''; // Clear previous data

    for (const bookingId in bookings) {
        const booking = bookings[bookingId];
        const bookingElement = document.createElement('div');
        bookingElement.classList.add('booking-item');
        bookingElement.innerHTML = `
            <p><strong>Name:</strong> ${booking.name}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>
            <p><strong>Service:</strong> ${booking.service}</p>
            <p><strong>Date:</strong> ${booking.date}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
            <p><strong>Notes:</strong> ${booking.notes || 'N/A'}</p>
            <hr>
        `;
        bookingsContainer.appendChild(bookingElement);
    }
}

// Event listener for sign-in button
document.getElementById('signInButton').addEventListener('click', signIn);