

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS answer;
DROP TABLE IF EXISTS question;



CREATE TABLE IF NOT EXISTS users (
    role varchar(20) NOT NULL,
    username varchar(64) UNIQUE NOT NULL,
    password varchar(32) NOT NULL,
    status varcahr(20) NOT NULL,
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL);



CREATE TABLE IF NOT EXISTS question (
    qID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    qTitle varchar(30),
    qText TEXT,
    qCategory varchar(15),
    username varchar(40),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );


CREATE TABLE IF NOT EXISTS answer (
    answerID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    questionID INTEGER(5), 
    username varchar(40),
    answerText TEXT,
    upvote INTEGER(2) ,
    downvote INTEGER(2),  
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   
    );



