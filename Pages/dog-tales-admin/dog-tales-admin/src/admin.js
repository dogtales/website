// File: /dog-tales-admin/dog-tales-admin/src/admin.js

// Import Supabase key from environment variable
const supabaseUrl = 'https://mekkzrxycoylxodgkfsn.supabase.co'; // Your Supabase URL
const supabaseKey = process.env.SUPABASE_KEY; // Use environment variable for the anon key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Handle admin sign-in form submission
document.getElementById('admin-login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
    });

    if (error) {
        document.getElementById('error-message').innerText = error.message;
    } else {
        document.getElementById('adminBookings').style.display = 'block';
        loadBookings();
    }
});

// Load bookings data from Supabase
async function loadBookings() {
    const { data, error } = await supabase
        .from('bookings')
        .select('*');

    if (error) {
        console.error('Error loading bookings:', error);
    } else {
        const bookingsTableBody = document.getElementById('bookings-table').querySelector('tbody');
        bookingsTableBody.innerHTML = '';

        data.forEach(booking => {
            const row = bookingsTableBody.insertRow();
            row.insertCell(0).innerText = booking.id;
            row.insertCell(1).innerText = booking.name;
            row.insertCell(2).innerText = booking.service;
            row.insertCell(3).innerText = booking.phone;
            row.insertCell(4).innerText = booking.date;
            row.insertCell(5).innerText = booking.message;
        });
    }
}