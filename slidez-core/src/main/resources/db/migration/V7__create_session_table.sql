CREATE TABLE IF NOT EXISTS session
(
    id              UUID PRIMARY KEY,
    presentation_id UUID                        NOT NULL,
    link_id         UUID                        NOT NULL,
    status          VARCHAR(255)                NOT NULL,
    created_at      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    FOREIGN KEY (presentation_id) REFERENCES presentation (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (link_id) REFERENCES link (id) ON DELETE CASCADE ON UPDATE CASCADE
);
