DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	user_name VARCHAR(255),
	user_password VARCHAR(255),
	email VARCHAR(255)
);