ALTER TABLE IF EXISTS presentation_interactive_element
    DROP COLUMN type,
    ADD COLUMN  created_at TIMESTAMP WITHOUT TIME ZONE,
    ADD COLUMN  updated_at TIMESTAMP WITHOUT TIME ZONE,
    ADD COLUMN  slide_id varchar(255),
    ADD COLUMN  type int;

ALTER TABLE IF EXISTS quiz_answers
    ADD COLUMN is_correct boolean;

ALTER TABLE IF EXISTS quizzes
    ADD COLUMN presentation_interactive_element_id UUID;

ALTER TABLE IF EXISTS qa_sesions
    ADD COLUMN presentation_interactive_element_id UUID;
