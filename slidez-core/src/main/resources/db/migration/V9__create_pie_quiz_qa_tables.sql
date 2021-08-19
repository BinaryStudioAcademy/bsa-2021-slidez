ALTER TABLE IF EXISTS presentation_interactive_element
    ALTER COLUMN id SET DATA TYPE UUID,
    ALTER COLUMN id SET NOT NULL,
    ADD COLUMN  type varchar(255),
    ADD COLUMN  poll_id    UUID,
    ADD COLUMN  quiz_id    UUID,
    ADD COLUMN  qa_id      UUID,
    ADD PRIMARY KEY (id);

CREATE TABLE IF NOT EXISTS quizzes
(
    id         UUID NOT NULL,
    title      VARCHAR(255),
    is_multi   BOOLEAN,
    is_template BOOLEAN,
    created_at TIMESTAMP WITHOUT TIME ZONE,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS quiz_answers
(
    id      UUID NOT NULL,
    title   VARCHAR(255),
    quiz_id UUID,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS quiz_answers
    ADD CONSTRAINT fk_answer2quiz FOREIGN KEY (quiz_id) REFERENCES quizzes;

CREATE TABLE IF NOT EXISTS qa_sessions
(
    id         UUID NOT NULL,
    presentation_interactive_element_id uuid,
    title      VARCHAR(255),
    is_moderated   BOOLEAN,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS presentation_interactive_element
    ADD CONSTRAINT fk_pie2pool FOREIGN KEY (poll_id) REFERENCES polls,
    ADD CONSTRAINT fk_pie2quiz FOREIGN KEY (quiz_id) REFERENCES quizzes,
    ADD CONSTRAINT fk_pie2qa   FOREIGN KEY (qa_id)   REFERENCES qa_sessions;
