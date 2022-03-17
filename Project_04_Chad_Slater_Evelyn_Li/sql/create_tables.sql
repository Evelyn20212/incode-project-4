-- CREATE POSTS TABLE
-- Every table needs a primary key

DROP TABLE IF EXISTS schedule;
CREATE TABLE IF NOT EXISTS schedule (
   id SERIAL PRIMARY KEY,
   username VARCHAR(50) NOT NULL,
   day_of_week INT NOT NULL,
   start_time TIME NOT NULL,
   end_time TIME NOT NULL
);