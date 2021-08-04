create table polls
(
    id  uuid not null,
    user_id uuid not null,
    name varchar(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    primary key (id),
    foreign key (user_id) references users(id)
);

