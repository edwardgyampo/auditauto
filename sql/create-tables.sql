CREATE TABLE manufacturers (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

CREATE TABLE models (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    manufacturer_id INT REFERENCES manufacturers(id)
);

CREATE TABLE sample_customers (
    full_name VARCHAR(255) NOT NULL,
    reference_code VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) PRIMARY KEY
);