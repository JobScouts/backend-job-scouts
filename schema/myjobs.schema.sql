CREATE TABLE if NOT exists myjobs(
   id serial primary key ,
    job_title VARCHAR(100) NOT NULl,
    employer_name VARCHAR(255) NOT NULL,
    employer_logo VARCHAR(255) NOT NULL,
    employer_website VARCHAR(100) NOT NULL,
    job_highlights VARCHAR(255) NOT NULL,
    job_apply_link VARCHAR(255) NOT NULL
);