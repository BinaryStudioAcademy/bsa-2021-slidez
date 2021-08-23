CREATE TABLE IF NOT EXISTS link
(
    id           UUID PRIMARY KEY,
    code         VARCHAR(6)                  NOT NULL,
    leased_until TIMESTAMP,
    created_at   TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at   TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
