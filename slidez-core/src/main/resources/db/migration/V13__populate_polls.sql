INSERT INTO presentations (id, name, link, created_at, updated_at)
VALUES ('ed60e789-ab15-4756-b95e-218b43b6dfff',
        'The Secret of Java Senior',
        'link.to/google', '2021-08-19','2021-08-19');

INSERT INTO polls (id, name, created_at, updated_at,
                   is_multi, is_template)
VALUES ('ed60e789-ab15-4756-b95e-218b43b6dfcf','Do you like JAVA ?','2021-08-19','2021-08-19','false','false');

INSERT INTO poll_options (id, name, poll_id) VALUES
('ed60e789-ab15-4756-b95e-218b43b6dfc1','Yes!','ed62e789-ab15-4756-b95e-218b43b6dfcf'),
('ed60e789-ab15-4756-b95e-218b43b6dfc2','Of course!', 'ed60e789-ab15-4756-b95e-218b43b6dfcf'),
('ed60e789-ab15-4756-b95e-218b43b6dfc3','Sure!','ed60e789-ab15-4756-b95e-218b43b6dfcf'),
('ed60e789-ab15-4756-b95e-218b43b6dfc4','Certainly!','ed60e789-ab15-4756-b95e-218b43b6dfcf'),
('ed60e789-ab15-4756-b95e-218b43b6dfc5','Absolutly!','ed60e789-ab15-4756-b95e-218b43b6dfcf');
