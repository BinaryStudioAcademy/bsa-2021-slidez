create table polls
(
    id  uuid not null,
    name varchar(255),
    createdAt timestamp without time zone,
    updatedAt timestamp without time zone,
    primary key (id)
);
