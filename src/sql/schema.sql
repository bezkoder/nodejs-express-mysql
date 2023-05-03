CREATE TABLE IF NOT EXISTS tutorials (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    description VARCHAR(255),
    published BOOLEAN
);