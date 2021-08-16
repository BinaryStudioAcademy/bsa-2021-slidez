create table if not exists polls
(
    id         uuid not null,
    name       varchar(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    user_id    uuid,
    primary key (id)
);

create table if not exists poll_options
(
    id      uuid not null,
    name    varchar(255),
    poll_id uuid,
    primary key (id)
);

create table if not exists presentation_interactive_element
(
    id uuid not null
);


alter table if exists polls
    add constraint fk_polls2users foreign key (user_id) references users;

alter table if exists poll_options
    add constraint fk_poll_options2polls foreign key (poll_id) references polls;
