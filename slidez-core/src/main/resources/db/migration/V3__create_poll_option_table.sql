create table poll_options
(
    id  uuid not null,
    poll_id uuid not null,
    name varchar(255),
    primary key (id),
    foreign key (poll_id) references polls(id)
);
