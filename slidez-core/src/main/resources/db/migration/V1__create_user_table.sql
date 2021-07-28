create table users
(
    id  uuid not null,
    email varchar(255) unique,
    first_name varchar(255),
    last_name varchar(255),
    password varchar(255),
    primary key (id)
);