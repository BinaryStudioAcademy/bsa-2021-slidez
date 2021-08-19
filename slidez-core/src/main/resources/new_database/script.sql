CREATE TABLE IF NOT EXISTS "user" (
                        id UUID PRIMARY KEY,
                        email VARCHAR(255) UNIQUE,
                        password VARCHAR(255),
                        role VARCHAR(255) NOT NULL,
                        oauthToken TEXT,
                        created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                        updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL
);

create collation case_insensitive
    (
    provider = icu,
    locale = 'und-u-ks-level2',
    deterministic = false
);

alter table "user"
    alter column email type varchar(255) collate case_insensitive;

CREATE TABLE IF NOT EXISTS user_profile (
                              id UUID PRIMARY KEY,
                              user_id UUID NOT NULL,
                              first_name VARCHAR(255),
                              last_name VARCHAR(255),
                              created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                              updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                              FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- user_id MUST be unique, because credentials will be bound to it and such index will
-- make fetch much faster
CREATE TABLE IF NOT EXISTS google_credentials (
                                    id UUID PRIMARY KEY,
                                    user_id UUID NOT NULL UNIQUE,
                                    access_token TEXT,
                                    refresh_token TEXT,
                                    expiration_time_millis BIGINT NOT NULL,
                                    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                                    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                                    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS presentation (
                              id UUID PRIMARY KEY,
                              user_id UUID NOT NULL,
                              link VARCHAR(255) NOT NULL,
                              created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                              updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                              FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS link (
                      id UUID PRIMARY KEY,
                      code VARCHAR(6) NOT NULL,
                      leasedUntil TIMESTAMP NOT NULL,
                      created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                      updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS session (
                         id UUID PRIMARY KEY,
                         presentation_id UUID NOT NULL,
                         link_id UUID NOT NULL,
                         created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                         updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                         FOREIGN KEY (presentation_id) REFERENCES presentation(id) ON DELETE CASCADE ON UPDATE CASCADE,
                         FOREIGN KEY (link_id) REFERENCES link(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS interactive_element (
                                     id UUID PRIMARY KEY,
                                     type VARCHAR(255) NOT NULL,
                                     presentation_id UUID NOT NULL,
                                     owner_id UUID NOT NULL,
                                     FOREIGN KEY (presentation_id) REFERENCES presentation(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS poll (
                      id UUID PRIMARY KEY,
                      interactive_element_id UUID NOT NULL,
                      title VARCHAR (255) NOT NULL,
                      is_multi BOOLEAN NOT NULL,
                      is_template BOOLEAN NOT NULL,
                      FOREIGN KEY (interactive_element_id) REFERENCES interactive_element(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS quiz (
                      id UUID PRIMARY KEY,
                      interactive_element_id UUID NOT NULL,
                      title VARCHAR (255) NOT NULL,
                      is_multi BOOLEAN NOT NULL,
                      is_template BOOLEAN NOT NULL,
                      FOREIGN KEY (interactive_element_id) REFERENCES interactive_element(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS qa_session (
                            id UUID PRIMARY KEY,
                            interactive_element_id UUID NOT NULL,
                            title VARCHAR (255) NOT NULL,
                            FOREIGN KEY (interactive_element_id) REFERENCES interactive_element(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS poll_answer (
                             id UUID PRIMARY KEY,
                             poll_id UUID NOT NULL,
                             title VARCHAR (255) NOT NULL,
                             FOREIGN KEY (poll_id) REFERENCES poll(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS quiz_answer (
                             id UUID PRIMARY KEY,
                             quiz_id UUID NOT NULL,
                             title VARCHAR (255) NOT NULL,
                             FOREIGN KEY (quiz_id) REFERENCES quiz(id) ON DELETE CASCADE ON UPDATE CASCADE
)
