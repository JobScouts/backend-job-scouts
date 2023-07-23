CREATE TABLE IF NOT EXISTS user_jobs (
    id serial PRIMARY KEY,
    user_id integer NOT NULL,
    job_id integer NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (job_id) REFERENCES myjobs (id)
);