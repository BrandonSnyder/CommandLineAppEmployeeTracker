-- Department Table including (id:INT Primary Key,name: VARCHAR(30)-dept name)
CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- Role table including (id:INT PRIMARY KEY, title:VARCHAR(30)-hold role title, salary:DECIMAL- to hold salary, department_id: INT hold reference to department role belongs to)
CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE--- change
--   DELETE CASCADE: When we create a foreign key using this option, it deletes the referencing rows in the child table when the referenced row is deleted in the parent table which has a primary key.
);

-- Employee Table including (id:INT PRIMARY KEY, first_name:VARCHAR(30), last_name:VARCHAR(30), role_id: INT-to hold reference to employee role, Manager_id: INT- to hold reference to another employee that is the manager of the current employee. Null for has no manager.)
CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INT UNSIGNED,
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);