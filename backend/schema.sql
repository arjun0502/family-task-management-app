-- Families Table
CREATE TABLE Families (
    id SERIAL PRIMARY KEY,
    surname VARCHAR(100) NOT NULL
);

-- Users Table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    family_id INT REFERENCES Families(id),
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Tasks Table
CREATE TABLE Tasks (
    id SERIAL PRIMARY KEY,
    family_id INT REFERENCES Families(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL
);

-- SuggestedTasks Table
CREATE TABLE SuggestedTasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL,
    estimated_cost DECIMAL(10,2)
);

