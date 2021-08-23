CREATE TABLE IF NOT EXISTS presentation
(
    id         UUID PRIMARY KEY,
    user_id    UUID                        NOT NULL,
    name       VARCHAR(255)                NOT NULL,
    link       VARCHAR(255) UNIQUE         NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE ON UPDATE CASCADE
);
