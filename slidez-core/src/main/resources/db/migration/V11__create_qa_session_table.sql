CREATE TABLE IF NOT EXISTS qa_session
(
    id                     UUID PRIMARY KEY,
    interactive_element_id UUID         NOT NULL,
    title                  VARCHAR(255) NOT NULL,
    FOREIGN KEY (interactive_element_id) REFERENCES interactive_element (id) ON DELETE CASCADE ON UPDATE CASCADE
);
