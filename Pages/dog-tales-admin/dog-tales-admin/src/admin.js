// File: /dog-tales-admin/dog-tales-admin/src/admin.js

require('dotenv').config();

// Supabase setup (Vite env, see .env and .gitignore)
const supabaseUrl = 'https://mekkzrxycoylxodgkfsn.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// --- SOLID: Single Responsibility for UI ---
function showSection(showId, ...hideIds) {
  document.getElementById(showId).style.display = 'block';
  hideIds.forEach(id => document.getElementById(id).style.display = 'none');
}

function togglePassword(inputId, btnId) {
  const input = document.getElementById(inputId);
  const btn = document.getElementById(btnId);
  btn.onclick = () => {
    if (input.type === "password") {
      input.type = "text";
      btn.textContent = "Hide";
    } else {
      input.type = "password";
      btn.textContent = "Show";
    }
  };
}

// --- Supabase Connection Test ---
async function testSupabaseConnection() {
  const { data, error } = await supabase.from('adminUsers').select('*').limit(1);
  if (error) {
    alert('Supabase connection failed. See console.');
    console.error('Supabase error:', error);
  } else {
    console.log('Supabase connection OK. Sample:', data);
  }
}

// --- Signup Handler ---
async function handleSignup(e) {
  e.preventDefault();
  const usernameOrEmail = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const msg = document.getElementById('signup-message');
  msg.textContent = '';

  // Insert user into adminUsers table
  const { data, error } = await supabase.from('adminUsers').insert([
    {
      username: usernameOrEmail,
      email: usernameOrEmail,
      password: password
    }
  ]);
  if (error) {
    msg.textContent = error.message;
  } else {
    msg.textContent = 'Signup successful! You can now log in.';
    showSection('loginSection', 'signupSection');
  }
}

// --- Login Handler ---
async function handleLogin(e) {
  e.preventDefault();
  const usernameOrEmail = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const msg = document.getElementById('login-message');
  msg.textContent = '';

  // Find user by username or email and password
  const { data, error } = await supabase
    .from('adminUsers')
    .select('*')
    .or(`username.eq.${usernameOrEmail},email.eq.${usernameOrEmail}`)
    .eq('password', password)
    .single();

  if (error || !data) {
    msg.textContent = 'Invalid credentials.';
    return;
  }

  // Show dashboard, hide login
  showSection('adminDashboard', 'loginSection', 'signupSection');
  document.getElementById('roleInfo').textContent = `Logged in as: ${data.username} (${data.role})`;
  loadBookings();
}

// --- Load Bookings ---
async function loadBookings() {
  const { data, error } = await supabase.from('bookings').select('*');
  const tbody = document.querySelector('#bookings-table tbody');
  tbody.innerHTML = '';
  if (error) {
    tbody.innerHTML = `<tr><td colspan="7">Error loading bookings.</td></tr>`;
    return;
  }
  data.forEach(booking => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${booking.id}</td>
      <td>${booking.name || ''}</td>
      <td>${booking.service || ''}</td>
      <td>${booking.phone || ''}</td>
      <td>${booking.date || ''}</td>
      <td>${booking.message || ''}</td>
      <td></td>
    `;
    tbody.appendChild(row);
  });
}

// --- DOMContentLoaded: Setup UI and Events ---
document.addEventListener('DOMContentLoaded', function () {
  // Password toggles
  togglePassword('signup-password', 'toggle-signup-password');
  togglePassword('login-password', 'toggle-login-password');

  // Section toggles
  document.getElementById('showSignup').onclick = () => showSection('signupSection', 'loginSection');
  document.getElementById('showLogin').onclick = () => showSection('loginSection', 'signupSection');

  // Form handlers
  document.getElementById('admin-signup-form').onsubmit = handleSignup;
  document.getElementById('admin-login-form').onsubmit = handleLogin;

  // Test Supabase connection
  testSupabaseConnection();
});