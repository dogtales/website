CREATE TABLE adminUsers (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) GENERATED ALWAYS AS (
        CASE
            WHEN LENGTH(password) = 10 THEN 'top_tier'
            WHEN LENGTH(password) = 8 THEN 'middle_tier'
            WHEN LENGTH(password) = 6 THEN 'regular_tier'
            WHEN LENGTH(password) = 4 THEN 'random_tier'
            ELSE 'unknown'
        END
    ) STORED,
    can_view BOOLEAN DEFAULT FALSE,
    can_edit BOOLEAN DEFAULT FALSE,
    can_delete BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Set permissions after user creation (example: only top_tier can edit/delete)
-- UPDATE adminUsers SET can_view = TRUE, can_edit = TRUE, can_delete = TRUE WHERE id = 1 AND role = 'top_tier';

-- EMAILS TABLE LINKED TO adminUsers
CREATE TABLE userEmails (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES adminUsers(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL
);

-- BOOKINGS TABLE LINKED TO adminUsers
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES adminUsers(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    service VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);