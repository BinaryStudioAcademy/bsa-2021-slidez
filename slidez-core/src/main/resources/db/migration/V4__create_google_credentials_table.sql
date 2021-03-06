-- user_id MUST be unique, because credentials will be bound to it and such index will
-- make fetch much faster
CREATE TABLE IF NOT EXISTS google_credentials
(
    id                     UUID PRIMARY KEY,
    user_id                UUID                        NOT NULL UNIQUE,
    access_token           TEXT,
    refresh_token          TEXT,
    expiration_time_millis BIGINT,
    created_at             TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at             TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE ON UPDATE CASCADE
);
