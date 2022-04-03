INSERT INTO
   users(id, surname, firstname, email, password)
VALUES
('aa88dba7-930e-4075-8405-3dd66434d5b2', 'doe', 'john', 'jd@email.com', '$2a$10$52i22ljiWwyfjfhMVOvnceI.hMNhgHcXEfBsNvr8yFp38ibZbTESa'),
('91bda5be-e6c5-4a6d-931a-357147d62c7c','admin','admin','admin@email.com','$2a$10$82nRc1ZlUIyrVLCZkHjOp.f5h4kHYLtwkBvCl1oq1.ft/NV0IXmvm');
INSERT INTO
   schedule(user_id, day_of_week, start_time, end_time)
VALUES
('aa88dba7-930e-4075-8405-3dd66434d5b2', 1, '00:00', '01:00'),
('aa88dba7-930e-4075-8405-3dd66434d5b2', 2, '00:01', '02:00'),
('91bda5be-e6c5-4a6d-931a-357147d62c7c', 1, '02:00', '03:00');

