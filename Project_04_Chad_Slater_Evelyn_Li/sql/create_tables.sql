-- CREATE POSTS TABLE
-- Every table needs a primary key
-- CREATE USER TABLE 

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
   id VARCHAR(50) PRIMARY KEY,
   surname VARCHAR(50) NOT NULL,
   firstname VARCHAR(50) NOT NULL,
   email VARCHAR(50) NOT NULL,
   password VARCHAR(75) NOT NULL,
   created TIME DEFAULT now()
);

DROP TABLE IF EXISTS schedule;
CREATE TABLE IF NOT EXISTS schedule (
   schedule_id SERIAL PRIMARY KEY,
   user_id VARCHAR(50) NOT NULL,
   day_of_week INT NOT NULL,
   start_time TIME NOT NULL,
   end_time TIME NOT NULL,
   CONSTRAINT fk_users
      FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
