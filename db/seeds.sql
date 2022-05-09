use employees;

INSERT INTO department
    (name)
VALUES
    ('Medical'),
    ('Engineering'),
    ('IT'),
    ('Sales');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Doctor', 300000, 1),
    ('PA', 120000, 1),
    ('Mechanical Engineer', 100000, 2),
    ('Civil Engineer', 90000, 2),
    ('Security Operation Lead', 120000, 3),
    ('Security Operation Intern', 80000, 3),
    ('Sales Person', 90000, 4),
    ('Sale Intern', 55000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Phil', 'Phil', 1, NULL),
    ('Aaron', 'Blah', 2, 1),
    ('Brandon', 'Rupee', 3, NULL),
    ('Alex', 'Pez', 4, 3),
    ('Tom', 'Heart', 5, NULL),
    ('Kenneth', 'Tate', 6, 5),
    ('Jenn', 'Wiz', 7, NULL),
    ('Kel', 'Co', 8, 7);
