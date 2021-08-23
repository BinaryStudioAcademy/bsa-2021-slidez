CREATE TABLE IF NOT EXISTS interactive_element
(
    id              UUID PRIMARY KEY,
    presentation_id UUID         NOT NULL,
    type            VARCHAR(255) NOT NULL,
    slide_id        VARCHAR(255) NOT NULL,
    owner_id        UUID         NOT NULL,
    FOREIGN KEY (presentation_id) REFERENCES presentation (id) ON DELETE CASCADE ON UPDATE CASCADE
);
