create table presentations
(
    id UUID PRIMARY KEY,
    name varchar(255) NOT NULL,
    link varchar(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
