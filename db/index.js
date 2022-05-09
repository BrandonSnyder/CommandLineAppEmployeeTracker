const connection = require("./connection");

// Function creation or queries
// SQL query promisified for finding department id's and names
class Helper{
  constructor(connection) {
    this.connection = connection;    //ERASE
  }
  //   View all departments.
  findDepts() {
    return this.connection
      .promise()
      .query("SELECT department.id, department.name FROM department;");
  }
  // View All Roles
   findRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
      );
  }
  // View All Employees
   findEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
      );
  }

  // Add Department
   createDepartment(department) {
    return this.connection
      .promise()
      .query("INSERT INTO department SET ?", department);
  }

  // Add a role
   createRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }

  // add Employee
   addEmployee(employee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", employee);
  }

  // update employee
   updateEmployeeRole(employeeId, roleId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id = ?", [
        roleId,
        employeeId,
      ]);
  }
}

module.exports = new Helper(connection);
