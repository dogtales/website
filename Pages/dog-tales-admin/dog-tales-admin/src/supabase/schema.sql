CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
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

-- Example: Only top_tier can edit/delete, middle_tier can edit, regular_tier can view, random_tier can only login
-- You can update permissions after user creation by a top_tier user (manager admin)

-- BOOKINGS TABLE
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    service VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example: Set permissions for a user (to be run by a top_tier user)
-- UPDATE users SET can_view = TRUE, can_edit = TRUE, can_delete = TRUE WHERE id = 1 AND role = 'top_tier';