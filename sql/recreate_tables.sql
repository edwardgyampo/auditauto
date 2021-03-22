DROP TABLE IF EXISTS automobiles CASCADE;
CREATE TABLE automobiles (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    manufacturer_id INT REFERENCES manufacturers(id)
);

DROP TABLE IF EXISTS manufacturers CASCADE;
CREATE TABLE manufacturers (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS customers CASCADE;
CREATE TABLE customers (
    full_name VARCHAR(255) NOT NULL,
    reference_code VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) PRIMARY KEY
);