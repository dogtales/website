To get web analytics for your GitHub Pages site hosted with a custom domain, you can follow these steps:

1. **Choose an Analytics Service**: Select a web analytics service, such as Google Analytics, Matomo, or any other that suits your needs.
    
2. **Sign Up and Create a Property**:
    
    - For Google Analytics, go to the [Google Analytics website](https://analytics.google.com/) and sign in with your Google account.
    - Create a new property for your website. You’ll receive a tracking ID (e.g., `UA-XXXXXXXXX-X`).
3. **Add Analytics Script to Your Site**:
    
    - If you are using Google Analytics, copy the provided JavaScript tracking code.
    - Open your GitHub Pages repository, and navigate to the HTML file where you want to add the tracking code (usually in the `<head>` section).
    - Paste the tracking code just before the closing `</head>` tag.
    
    Example:
    
    html
    

4. ```xml
    <head>
        <meta charset="utf-8">
        <title>Your Website Title</title>
        <!-- Other head elements -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXXX-X"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-XXXXXXXXX-X');
        </script>
    </head>
    ```
    
5. **Commit Your Changes**:
    
    - Save the changes to your HTML file and commit them to your GitHub repository.
6. **Check Your Analytics Dashboard**:
    
    - After a few hours or days, you can check your analytics dashboard to view traffic data, user behavior, and other metrics.
7. **Verify Tracking**:
    
    - You can use the Google Tag Assistant Chrome extension or similar tools to verify that your tracking code is properly implemented.

By following these steps, you should be able to set up and access web analytics for your GitHub Pages site effectively.