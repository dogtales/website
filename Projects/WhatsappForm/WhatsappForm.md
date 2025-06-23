IN a website how could one create a button that could automatically send a booking message  when the user is first prompted to enter their name and phone number then an option for automatic generated message for booking or a second option for them to writing their own message . All in a form that pops up from clicking the button then sends to the busines whatsapp number

I'll create a comprehensive solution with a popup form that collects user information and provides both pre-generated and custom message options for WhatsApp booking. Here's a complete HTML file with embedded CSS and JavaScript:

```html

```

### Key Features:

1. **Modern UI**:
   - Clean, responsive design with Tailwind CSS
   - Smooth animations and transitions
   - Font Awesome icons for visual appeal

2. **Booking Form**:
   - Collects name and phone number (required fields)
   - Two message options via tabs:
     - **Quick Book**: Predefined service types with date/time selection
     - **Custom Message**: Free-form text input

3. **Service Selection**:
   - Visual service options with icons
   - Interactive selection feedback

4. **WhatsApp Integration**:
   - Generates properly formatted WhatsApp message
   - Opens WhatsApp with pre-filled message containing all booking details
   - Proper URL encoding for the message

5. **User Experience**:
   - Form validation
   - Clear tab navigation
   - Responsive design works on all devices
   - Smooth modal animations

To use this in your project:
1. Replace `businessWhatsAppNumber` with your actual WhatsApp number (including country code, without '+' or '00')
2. Customize the service options if needed
3. Adjust colors to match your brand by modifying the Tailwind classes

The form will automatically format the message appropriately based on whether the user selects quick booking or writes their own message.