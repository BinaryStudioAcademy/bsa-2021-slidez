CREATE TABLE IF NOT EXISTS user_profile
(
    id         UUID PRIMARY KEY,
    user_id    UUID                        NOT NULL,
    first_name VARCHAR(255),
    last_name  VARCHAR(255),
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE ON UPDATE CASCADE
);
