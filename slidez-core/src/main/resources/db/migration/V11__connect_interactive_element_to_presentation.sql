ALTER TABLE presentation_interactive_element
    ADD COLUMN presentation_id UUID;

ALTER TABLE presentation_interactive_element
    ADD FOREIGN KEY (presentation_id) REFERENCES presentations(id);
