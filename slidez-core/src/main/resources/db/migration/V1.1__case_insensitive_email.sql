create collation IF NOT EXISTS case_insensitive
(
	provider = icu,
	locale = 'und-u-ks-level2',
	deterministic = false
);

alter table users
alter column email type varchar(255) collate case_insensitive;
