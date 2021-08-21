CREATE TABLE IF NOT EXISTS poll
(
    id                     UUID PRIMARY KEY,
    interactive_element_id UUID         NOT NULL,
    title                  VARCHAR(255) NOT NULL,
    is_multi               BOOLEAN      NOT NULL,
    is_template            BOOLEAN      NOT NULL,
    FOREIGN KEY (interactive_element_id) REFERENCES interactive_element (id) ON DELETE CASCADE ON UPDATE CASCADE
);
