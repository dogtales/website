# Dog Tales Admin Dashboard

## Overview
The Dog Tales Admin Dashboard is a web application designed for managing bookings and user authentication for Dog Tales Kennels. This project utilizes Supabase as the backend database to store user data and bookings information.

## Project Structure
```
dog-tales-admin
├── src
│   ├── admin.html          # HTML structure for the admin dashboard
│   ├── admin.js            # JavaScript logic for handling sign-in and bookings
│   ├── style.css           # Styles for the admin dashboard
│   └── supabase
│       └── schema.sql      # SQL schema for the Supabase database
├── package.json            # npm configuration file
└── README.md               # Project documentation
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd dog-tales-admin
   ```

2. **Install Dependencies**
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Set Up Supabase**
   - Create a Supabase account and project.
   - Configure your database by executing the SQL commands in `src/supabase/schema.sql` to create the necessary tables.

4. **Configure Environment Variables**
   Set up your environment variables for Supabase in your project. You may need to create a `.env` file in the root directory with the following variables:
   ```
   SUPABASE_URL=<your-supabase-url>
   SUPABASE_ANON_KEY=<your-anon-key>
   ```

5. **Run the Application**
   Open `src/admin.html` in your web browser to access the admin dashboard.

## Usage Guidelines
- The admin dashboard allows users to sign in using their email and password.
- Upon successful login, users can view and manage bookings.
- Bookings data is retrieved from the Supabase database and displayed in the dashboard.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.