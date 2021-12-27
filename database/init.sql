CREATE TABLE SKIN_RESISTENCE(
  ID VARCHAR(20),
  TIME_OF_CREATION TIMESTAMP UNIQUE,
  VALUE INTEGER,
  PRIMARY KEY (ID, TIME_OF_CREATION)
);

CREATE TABLE MOOD(
  ID VARCHAR(20),
  TIME_OF_CREATION TIMESTAMP UNIQUE,
  VALUE VARCHAR(10),
  PRIMARY KEY (ID, TIME_OF_CREATION)
);
