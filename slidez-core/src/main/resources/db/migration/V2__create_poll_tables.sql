create table polls
(
    id         uuid not null,
    name       varchar(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    user_id    uuid,
    primary key (id)
);

create table poll_options
(
    id      uuid not null,
    name    varchar(255),
    poll_id uuid,
    primary key (id)
);

alter table if exists polls
    add constraint fk_polls2users foreign key (user_id) references users;

alter table if exists poll_options
    add constraint fk_poll_options2polls foreign key (poll_id) references polls;
