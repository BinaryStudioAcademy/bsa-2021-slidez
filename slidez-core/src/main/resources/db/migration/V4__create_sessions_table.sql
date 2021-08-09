CREATE TABLE IF NOT EXISTS sessiones
(
    id UUID PRIMARY KEY,
    presentation_id UUID,
    status integer,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);