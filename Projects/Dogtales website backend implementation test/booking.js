//Purpose:
    // Sanitizes input.
    // Creates bookings in Supabase.
    // Loads booking history.
    // Generates Google Calendar links.
// Status:
    // createBookingItem checks for user, inserts booking, and shows success/error.
    // loadBookingHistory fetches user’s bookings and calls a render callback.
    // No issues detected.

import { supabase, getCurrentUser } from './auth.js';

export function sanitizeInput(str) {
    if (typeof str !== 'string') return str; // Ensure it's a string
    return str.replace(/[<>]/g, '');
}

function generateGoogleCalendarLink(booking) {
    const start = encodeURIComponent(`${booking.date}T${booking.time}:00`);
    const end = encodeURIComponent(`${booking.date}T${parseInt(booking.time.split(':')[0])+1}:00`);
    const text = encodeURIComponent(`Dog Tales Kennels: ${booking.service}`);
    const details = encodeURIComponent(booking.notes || '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}`;
}

export async function createBookingItem(bookingDetails, showModalError, showModalSuccess) {
    const user = getCurrentUser();
    if (!user) {
        showModalError('You must be logged in to book.');
        return null; // Return null to indicate failure
    }
    // Sanitize all relevant fields before insertion
    const { name, phone, service, date, time, notes, message } = bookingDetails;
    const sanitizedName = sanitizeInput(name);
    const sanitizedPhone = sanitizeInput(phone);
    const sanitizedService = sanitizeInput(service);
    const sanitizedDate = sanitizeInput(date);
    const sanitizedTime = sanitizeInput(time);
    const sanitizedNotes = sanitizeInput(notes);
    const sanitizedMessage = sanitizeInput(message);

    const title = sanitizedService || "General Inquiry";
    const description = `Name: ${sanitizedName}\nPhone: ${sanitizedPhone}\nService: ${sanitizedService}\nDate: ${sanitizedDate}\nTime: ${sanitizedTime}\nNotes: ${sanitizedNotes}\nCustom Message: ${sanitizedMessage}`;
    
    const { data, error } = await supabase
        .from('items')
        .insert([{
            title,
            description,
            user_id: user.id
        }])
        .select(); // Add .select() to return the inserted data

    if (error) {
        showModalError(error.message);
        return null; // Return null to indicate failure
    }
    else {
        showModalSuccess('Booking saved!');
        const addToCalendarBtn = document.getElementById('addToCalendarBtn');
        if (addToCalendarBtn) { // Check if element exists
            addToCalendarBtn.href = generateGoogleCalendarLink(bookingDetails);
            addToCalendarBtn.style.display = 'block';
        }
        return data[0]; // Return the inserted item
    }
}

export async function loadBookingHistory(showModalError, renderHistory) {
    const user = getCurrentUser();
    if (!user) {
        // Optionally show a message that user needs to be logged in to see history
        return;
    }
    const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
    if (error) {
        showModalError('Could not load booking history.');
        return;
    }
    renderHistory(data);
}
