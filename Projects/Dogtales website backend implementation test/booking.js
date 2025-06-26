import { supabase, getCurrentUser } from './auth.js';

export function sanitizeInput(str) {
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
        return;
    }
    const { name, phone, service, date, time, notes, message } = bookingDetails;
    const title = service || "General Inquiry";
    const description = `Name: ${name}\nPhone: ${phone}\nService: ${service}\nDate: ${date}\nTime: ${time}\nNotes: ${notes}\nCustom Message: ${message}`;
    const { error } = await supabase
        .from('items')
        .insert([{
            title,
            description,
            user_id: user.id
        }]);
    if (error) showModalError(error.message);
    else {
        showModalSuccess('Booking saved!');
        const addToCalendarBtn = document.getElementById('addToCalendarBtn');
        addToCalendarBtn.href = generateGoogleCalendarLink(bookingDetails);
        addToCalendarBtn.style.display = 'block';
    }
}

export async function loadBookingHistory(showModalError, renderHistory) {
    const user = getCurrentUser();
    if (!user) return;
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