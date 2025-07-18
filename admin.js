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

// Hardcoded password for admin login
const ADMIN_PASSWORD = 'dogtales76';

// Dummy booking data for demonstration
const demoBookings = [
  { id: 1, name: "John Doe", service: "Boarding", phone: "123-456-7890", date: "2025-07-10", message: "No allergies." },
  { id: 2, name: "Jane Smith", service: "Grooming", phone: "555-123-4567", date: "2025-07-12", message: "Prefers morning." }
];

// Handle admin login
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('admin-login-form');
  const errorMessage = document.getElementById('error-message');
  const adminBookingsSection = document.getElementById('adminBookings');
  const bookingsTableBody = document.querySelector('#bookings-table tbody');

  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      errorMessage.textContent = '';
      const password = document.getElementById('password').value;

      if (password !== ADMIN_PASSWORD) {
        errorMessage.textContent = 'Incorrect password.';
        return;
      }

      // Hide login form and show bookings
      loginForm.style.display = 'none';
      adminBookingsSection.style.display = 'block';

      // Populate bookings table
      bookingsTableBody.innerHTML = '';
      demoBookings.forEach(booking => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${booking.id}</td>
          <td>${booking.name}</td>
          <td>${booking.service}</td>
          <td>${booking.phone}</td>
          <td>${booking.date}</td>
          <td>${booking.message}</td>
        `;
        bookingsTableBody.appendChild(row);
      });

      // Log admin login
      await logAdminLogin(password);
    });
  }
});

// Event listener for sign-in button
document.getElementById('signInButton').addEventListener('click', signIn);

// Firebase Cloud Function to store booking
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.storeBooking = functions.https.onCall(async (data, context) => {
  const { name, phone, service, date, message } = data;
  const bookingRef = await admin.firestore().collection('bookings').add({
    name,
    phone,
    service,
    date,
    message,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
  return { bookingId: bookingRef.id };
});

exports.logAdminLogin = functions.https.onCall(async (data, context) => {
  const { password } = data;
  await admin.firestore().collection('adminLogins').add({
    loginTime: admin.firestore.FieldValue.serverTimestamp(),
    password // Not recommended to store plain passwords!
  });
  return { status: 'logged' };
});

async function logAdminLogin(password) {
  await firebase.functions().httpsCallable('logAdminLogin')({ password });
}