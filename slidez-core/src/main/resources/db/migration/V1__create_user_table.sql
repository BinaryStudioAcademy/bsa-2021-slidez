CREATE TABLE IF NOT EXISTS "user"
(
    id         UUID PRIMARY KEY,
    email      VARCHAR(255) UNIQUE         NOT NULL,
    password   VARCHAR(255)                NOT NULL,
    role       VARCHAR(255)                NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
