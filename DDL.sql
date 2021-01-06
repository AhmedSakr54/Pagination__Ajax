CREATE DATABASE `Lab4`;

USE `Lab4`;

CREATE TABLE department (
    department_id int AUTO_INCREMENT,
    department_name varchar(40) NOT NULL,
    PRIMARY KEY (department_id)
);

CREATE TABLE professor ( 
    professor_id int AUTO_INCREMENT,
    professor_name varchar(40) NOT NULL,
    PRIMARY KEY (professor_id)
);

CREATE TABLE course (
    course_id int AUTO_INCREMENT,
    course_name varchar(40) NOT NULL,
    course_description varchar(255) NOT NULL,
    department_id int NOT NULL,
    professor_id int NOT NULL,
    PRIMARY KEY (course_id),
    FOREIGN KEY (department_id) REFERENCES department (department_id),
    FOREIGN KEY (professor_id) REFERENCES professor (professor_id)
);

-- INSERT INTO department (department_name) VALUES ("CCE");
-- INSERT INTO department (department_name) VALUES ("EME");
-- INSERT INTO department (department_name) VALUES ("OCE");

-- INSERT INTO professor (professor_name) VALUES ("prof1");
-- INSERT INTO professor (professor_name) VALUES ("prof2");
-- INSERT INTO professor (professor_name) VALUES ("prof3");
-- INSERT INTO professor (professor_name) VALUES ("prof4");
-- INSERT INTO professor (professor_name) VALUES ("prof5");
-- INSERT INTO course (course_name, course_description, department_id, professor_id) VALUES ("Database Systems", "learn databases", 1, 1);
-- INSERT INTO course (course_name, course_description, department_id, professor_id) VALUES ("Operating Systems", "learn OS", 1, 1);
-- INSERT INTO course (course_name, course_description, department_id, professor_id) VALUES ("Algorithms", "learn Algorithms", 1, 2);
-- INSERT INTO course (course_name, course_description, department_id, professor_id) VALUES ("Numerical Analysis", "learn Numerical methods", 1, 3);

INSERT INTO professor (professor_name) VALUES ("prof6");
INSERT INTO professor (professor_name) VALUES ("prof7");
INSERT INTO professor (professor_name) VALUES ("prof8");

INSERT INTO course (course_name, course_description, department_id, professor_id) VALUES ("Programming 1", "learn programming basics", 1, 3);
INSERT INTO course (course_name, course_description, department_id, professor_id) VALUES ("Programming 2", "learn Object Oriented Programming", 1, 4);
INSERT INTO course (course_name, course_description, department_id, professor_id) VALUES ("Data structures1", "learn basic data structures like linked lists", 1, 5);
INSERT INTO course (course_name, course_description, department_id, professor_id) VALUES ("Data structures2", "More about data structures", 1, 5);
INSERT INTO course (course_name, course_description, department_id, professor_id) VALUES ("Database Systems", "learn databases", 1, 1);
INSERT INTO course (course_name, course_description, department_id, professor_id) VALUES ("Machine Drawing", "Draw machines on auto cad", 2, 5);

INSERT INTO course (course_name, course_description, department_id, professor_id) VALUES ("Fluid Mechanics", "Fluid Mechanics description", 2, 6);
INSERT INTO course (course_name, course_description, department_id, professor_id) VALUES ("Course about offshore", "learn OCE description", 3, 7);
INSERT INTO course (course_name, course_description, department_id, professor_id) VALUES ("Discrete Structures", "learn proofs and what not.", 1, 5);
INSERT INTO course (course_name, course_description, department_id, professor_id) VALUES ("Computer Organization", "learn hardware", 1, 1);
INSERT INTO course (course_name, course_description, department_id, professor_id) VALUES ("Computer Architecutre", "learn hardware even more", 1, 1);
INSERT INTO course (course_name, course_description, department_id, professor_id) VALUES ("Digital Logic 1", "learn combinational circuits", 1, 8);
INSERT INTO course (course_name, course_description, department_id, professor_id) VALUES ("Digital Logic 2", "learn sequential circuits", 1, 8);

SELECT C.course_name, C.course_description, D.department_name, P.professor_name
FROM course C, department D, professor P
WHERE (C.professor_id = P.professor_id AND C.department_id = D.department_id) AND (REPLACE(C.course_name, " ","") LIKE REPLACE('%database systems%', " ","") OR REPLACE(C.course_description," ","") LIKE REPLACE('%database systems%', " ","") OR REPLACE(P.professor_name," ","") LIKE REPLACE('%database systems%', " ","") OR REPLACE(D.department_name," ","") LIKE REPLACE('%database systems%', " ","")); 