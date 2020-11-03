CREATE TABLE dragon(
    id SERIAL PRIMARY KEY,
    birthdate TIMESTAMP NOT NULL,
    nickname VARCHAR(64),
    "isPublic" BOOLEAN NOT NULL,
    "saleValue" INTEGER NOT NULL, 
    "sireValue" INTEGER NOT NULL,
    "generationID" INTEGER, 
    FOREIGN KEY ("generationID") REFERENCES generation(id)
);