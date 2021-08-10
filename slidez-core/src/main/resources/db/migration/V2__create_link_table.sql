create table link
(
    link_id         bigint not null,
    session_id      uuid,
    link            varchar(255),
    expiration_date TIMESTAMP WITHOUT TIME ZONE,
    primary key (link_id)
);
