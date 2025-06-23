document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const bookingBtn = document.getElementById('bookingBtn');
    const bookingModal = document.getElementById('bookingModal');
    const closeModal = document.getElementById('closeModal');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const serviceOptions = document.querySelectorAll('.service-option');
    const sendBookingBtn = document.getElementById('sendBookingBtn');
    const userInfoForm = document.getElementById('userInfoForm');
    
    // Business WhatsApp number (replace with actual number)
    const businessWhatsAppNumber = '254115411167';
    
    // Open modal
    bookingBtn.addEventListener('click', function() {
        bookingModal.classList.add('active');
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        bookingModal.classList.remove('active');
    });
    
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active tab button
            tabBtns.forEach(tb => tb.classList.remove('text-blue-600', 'border-blue-600'));
            tabBtns.forEach(tb => tb.classList.add('text-gray-500'));
            this.classList.remove('text-gray-500');
            this.classList.add('text-blue-600', 'border-blue-600');
            
            // Show corresponding content
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
    
    // Send booking via WhatsApp
    sendBookingBtn.addEventListener('click', function() {
        // Get form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        
        if (!name || !phone) {
            alert('Please enter your name and phone number');
            return;
        }
        
        // Determine which tab is active
        const activeTab = document.querySelector('.tab-content.active').id;
        let whatsappMessage = '';
        
        if (activeTab === 'quick-book') {
            // Generate quick booking message
            const selectedService = document.querySelector('.service-option.selected')?.getAttribute('data-service') || 'Not specified';
            const date = document.getElementById('date').value || 'Not specified';
            const time = document.getElementById('time').value || 'Not specified';
            const notes = document.getElementById('notes').value || 'None';
            
            whatsappMessage = `Hi! I'd like to book an appointment:\n\n` +
                             `*Name:* ${name}\n` +
                             `*Phone:* ${phone}\n` +
                             `*Service:* ${selectedService}\n` +
                             `*Preferred Date:* ${date}\n` +
                             `*Preferred Time:* ${time}\n` +
                             `*Additional Notes:* ${notes}`;
        } else {
            // Use custom message
            const customMessage = document.getElementById('message').value;
            whatsappMessage = `Hi! This is ${name} (${phone}).\n\n` + customMessage;
        }
        
        // Encode message for WhatsApp URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Open WhatsApp with pre-filled message
        window.open(`https://wa.me/${businessWhatsAppNumber}?text=${encodedMessage}`, '_blank');
        
        // Close modal
        bookingModal.classList.remove('active');
        
        // Reset form
        userInfoForm.reset();
        serviceOptions.forEach(opt => opt.classList.remove('selected'));
        tabBtns[0].click(); // Reset to first tab
    });
    
    // Close modal when clicking outside
    bookingModal.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            bookingModal.classList.remove('active');
        }
    });
});