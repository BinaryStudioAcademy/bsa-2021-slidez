CREATE TABLE IF NOT EXISTS quiz_answer
(
    id         UUID PRIMARY KEY,
    quiz_id    UUID         NOT NULL,
    title      VARCHAR(255) NOT NULL,
    is_correct BOOLEAN      NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quiz (id) ON DELETE CASCADE ON UPDATE CASCADE
)
