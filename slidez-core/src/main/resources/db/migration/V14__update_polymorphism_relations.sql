BEGIN;

ALTER TABLE interactive_element
    DROP COLUMN owner_id;

ALTER TABLE poll
    ADD COLUMN owner_id UUID NOT NULL,
    ADD CONSTRAINT fk_poll_user FOREIGN KEY (owner_id) REFERENCES "user" (id);

ALTER TABLE quiz
    ADD COLUMN owner_id UUID NOT NULL,
    ADD CONSTRAINT fk_poll_user FOREIGN KEY (owner_id) REFERENCES "user" (id);

ALTER TABLE qa_session
    ADD COLUMN owner_id UUID NOT NULL,
    ADD CONSTRAINT fk_poll_user FOREIGN KEY (owner_id) REFERENCES "user" (id);

COMMIT;
