CREATE TABLE IF NOT EXISTS session_event
(
    id      UUID PRIMARY KEY,
    session_id varchar(255) NOT NULL,
    session_events   jsonb NOT NULL
);
