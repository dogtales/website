# Dog Tales Kennel Website

## Overview

Dog Tales Kennel is a Kenyan business specializing in expert dog training, breeding, and care services. This website provides information about the business, showcases its services, and offers easy ways for visitors to get in touch. The site is built with **HTML**, **CSS**, and **JavaScript**, and is fully responsive for mobile and desktop devices.

**Live Demo:** [Dog Tales Kennel Website (GitHub Pages)](https://dogtales.github.io/website/)

---

## Features

- **Responsive Design:** Optimized for all screen sizes using CSS Flexbox and media queries.
- **Hero Image Carousel:** Rotating gallery in the hero section.
- **Service Highlights:** Interactive cards for Dog Training, Breeding, and Handling, each with image filmstrips and video embeds.
- **Smooth Navigation:** Smooth scrolling for navigation links and a mobile-friendly menu.
- **Contact & Social Links:** Floating WhatsApp and YouTube action buttons for instant contact and social engagement.
- **Modern Typography:** Uses Google Fonts for a clean, professional look.
- **Accessible & Semantic HTML:** Structured for readability and accessibility.

---

## File Structure

```
website/
├── index.html         # Main HTML file
├── style.css          # All CSS styles
├── script.js          # JavaScript for interactivity
├── images/            # All images (logo, hero, services, etc.)
└── README.md          # Project documentation
```

---

## HTML Structure (`index.html`)

- **`<head>`**: Meta tags, Google Fonts, Font Awesome, CSS links, and page title.
- **`<header>`**: Logo, navigation links, and mobile menu button.
- **`<main>`**:
  - **Hero Section**: Rotating image carousel and welcome message.
  - **Welcome Section**: Brief introduction to Dog Tales Kennel.
  - **Services Section**: Interactive cards for each service, with images and embedded videos.
  - **Why Us Section**: Unique selling points and business values.
  - **Contact Section**: Contact details and inquiry form (if present).
- **Floating Action Buttons**: WhatsApp and YouTube icons for quick access.
- **`<footer>`**: Copyright.

---

## CSS Styling (`style.css`)

- **CSS Variables:** Centralized color palette for easy customization.
- **Layout:** Flexbox and grid for responsive, modern layouts.
- **Animations:** Transitions for hover effects and carousel.
- **Media Queries:** Optimized for mobile, tablet, and desktop.
- **Custom Fonts:** Uses Poppins and Great Vibes from Google Fonts.

---

## JavaScript Functionality (`script.js`)

- **Hero Carousel:** Rotates hero images automatically.
- **Smooth Scrolling:** For navigation links.
- **Service Card Interactivity:** Hover/click to reveal filmstrips and play videos.
- **Mobile Menu Toggle:** Shows/hides navigation on small screens.

---

## Images

All images (logo, hero, services, etc.) should be placed in the `images/` directory. Update image paths in `index.html` as needed.

---

## Fonts

- [Poppins](https://fonts.google.com/specimen/Poppins)
- [Great Vibes](https://fonts.google.com/specimen/Great+Vibes)

---

## Libraries & Assets

- **Font Awesome:** For WhatsApp and YouTube icons (via CDN).
- **Google Fonts:** For typography.

---

## Customization

- **Text:** Edit content in `index.html`.
- **Colors:** Change CSS variables in `style.css`.
- **Images:** Replace files in `images/` and update paths in HTML.
- **Interactivity:** Modify or extend features in `script.js`.

---

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dogtales/website.git
   cd website
   ```
2. **Add your images:** Place all required images in the `images/` folder.
3. **Open `index.html` in your browser** to view the site locally.
4. **Customize** as needed.

---

## License

This project is for Dog Tales Kennel. Please contact the business for reuse permissions.
