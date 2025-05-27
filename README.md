
# Dog Tales Kennel Website

## Overview

This website is designed for Dog Tales Kennel, a business in Kenya that provides expert dog training, breeding, and care services. The site is built with HTML, CSS, and JavaScript. It features a responsive design, ensuring optimal viewing across various devices.
[Github pages](https://dogtales.github.io/website/)

## File Structure

* `index.html`: Contains the main HTML structure of the website.
* `style.css`: Includes all the CSS styles for the website's appearance.
* `script.js`: Contains the JavaScript code for interactive elements and dynamic functionality.
* `images/`: (This directory is implied from the code, you'll need to create it and populate it.) Contains all images used on the website (logo, hero images, service images, etc.).

## HTML Structure (index.html)

The HTML file is structured as follows:

* **`<head>`**: Contains meta information, links to external stylesheets (Google Fonts, custom CSS), and the page title.
* **`<header>`**: Includes the navigation bar with the logo, menu button, and navigation links.
* **`<section>`**:
    * **Hero Section**: Features a rotating image gallery and welcome text.
    * **Welcome Section**: Provides an introduction to Dog Tales Kennel.
    * **Services Section**: Showcases the services offered (Dog Training, Dog Breeding, Dog Handling) with filmstrip image previews, video embeds, and service descriptions.
    * **Why Us Section**: Highlights the unique selling points of Dog Tales Kennel.
    * **Contact Section**: Provides contact information.
* **`<footer>`**: Contains copyright information and a footer note.
* **Floating Action Buttons**: Includes WhatsApp and YouTube buttons for easy contact and social media linking.

## CSS Styling (style.css)

The CSS file is organized to style the different sections of the website. Key aspects include:

* **CSS Variables**: Defines a color palette for consistent styling.
* **Layout**: Uses flexbox for responsive layouts and grid for the footer.
* **Responsive Design**: Employs media queries to adjust the layout for smaller screens.
* **Animations and Transitions**: Uses CSS transitions for smooth visual effects (e.g., logo hover, menu button, service card hover).

## JavaScript Functionality (script.js)

The JavaScript file handles the following dynamic features:

* **Image Carousel**: Rotates images in the hero section.
* **Smooth Scrolling**: Enables smooth scrolling when clicking on navigation links.
* **Service Card Interaction**: Shows/hides filmstrip and video containers on hover/click.  Clicking a service card also attempts to autoplay the associated video.
* **Mobile Menu**: Toggles the visibility of the navigation links on smaller screens.

## Images

The website uses various images. Ensure that you have all the necessary images in the `images/` directory. The image URLs are hardcoded in the HTML.

## Fonts

The website uses Google Fonts:

* Poppins
* Great Vibes

## Libraries

* Font Awesome: Used for the WhatsApp and YouTube icons.

## Customization

To customize the website, you can:

* Modify the text content in the HTML file.
* Change the colors by adjusting the CSS variables in `style.css`.
* Replace the images in the `images/` directory and update the image URLs in the HTML.
* Adjust the JavaScript code in `script.js` to modify the interactive elements.
