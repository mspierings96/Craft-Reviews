-- drop database
DROP DATABASE IF EXISTS craft_review_db;
CREATE DATABASE craft_review_db;

-- create table for holding review results
USE craft_review_db;
CREATE TABLE reviews (
id INTEGER NOT NULL auto_increment primary key,
apiID INTEGER NOT NULL,
review INTEGER NOT NULL,
userNameID varchar (30),
constraint fk_userName FOREIGN KEY (userNameID) references users(id)
);

-- create table for holding login info
USE craft_review_db;
Create table users (
id INTEGER NOT NULL auto_increment PRIMARY KEY,
userName varchar (30),
passwords varchar (50)
);