create table sessions
(
    id UUID PRIMARY KEY,
    presentation_id UUID NOT NULL,
    status varchar(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
