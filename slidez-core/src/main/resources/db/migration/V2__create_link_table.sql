create table link
(
    link_id         uuid not null,
    session_id      int8,
    link            varchar(255),
    expiration_date TIMESTAMP WITHOUT TIME ZONE,
    primary key (link_id)
);
