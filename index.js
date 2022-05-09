const { prompt } = require("inquirer");
const db = require("./db");
// require("console.table");

const mainPrompt = () => {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Departments",
          value: "viewDepartments",
        },
        {
          name: "View All Roles",
          value: "viewRoles",
        },
        {
          name: "View All Employees",
          value: "viewEmployees",
        },
        {
          name: "Add A Department",
          value: "addDept",
        },
        {
          name: "Add A Role",
          value: "addRole",
        },
        {
          name: "Add Employee",
          value: "addEmployee",
        },
        {
          name: "Update An Employee",
          value: "updateEmployees",
        },
        {
          name: "Exit terminal",
          value: "exit",
        },
      ],
    },
  ]).then((res) => {
    console.log(res);
    let var1 = res.choice;
    switch (var1) {
      case "viewDepartments":
        viewDepartmentsFunc();
        break;
      case "viewRoles":
        viewRolesFunc();
        break;
      case "viewEmployees":
        viewAllEmployeeFunc();
        break;
      case "addDept":
        addDepartmentFunc();
        break;
      case "addRole":
        addRoleFunc();
        break;
      case "addEmployee":
        addNewEmployeeFunc();
        break;
      case "updateEmployees":
        updateEmployeeFunc();
        break;
      default:
        process.exit();
    }
  });
};
// function creating formatted table showing department names and department ids

const viewDepartmentsFunc = () => {
  db.findDepts()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => mainPrompt());
};
// ViewDepartmentsFunc is working with the findDepts function in db/index.js folder.
// function that show view of job title, role id, the department that role belongs to, and the salary for that role
const viewRolesFunc = () => {
  db.findRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => mainPrompt());
};
// viewRolesFunc is working with the findRoles function in db/index.js folder.

// function that shows formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
const viewAllEmployeeFunc = () => {
  db.findEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => mainPrompt());
};
// viewAllEmployeeFunc is working with the findEmployees function in db/index.js folder.

//Function that creates a new department
const addDepartmentFunc = () =>{
  prompt([
    {
      name: "name",
      message: "What is the new department name?"
    }
  ])
    .then(res => {
      let name = res;
      db.createDepartment(name)
        .then(() => console.log(`The ${name.name} department has been added`))
        .then(() => mainPrompt())
    })
}
// addDepartmentFunc is working with the createDepartment function in db/index.js folder.

// Function that creates a new role prompting user to enter the name, salary, and department for the role and that role is added to the database
const addRoleFunc = () => {
  db.findDepts()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

      prompt([
        {
          name: "title",
          message: "What is the name of the role?"
        },
        {
          name: "salary",
          message: "What is the salary of the role?"
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department does the role belong to?",
          choices: departmentChoices
        }
      ])
        .then(role => {
          db.createRole(role)
            .then(() => console.log(`${role.title} has been added to the role database`))
            .then(() => mainPrompt())
        })
    })
}
// addRoleFunc is working with the createRole function in db/index.js folder.

// Function that adds a new employee prompting for first name, last name, role, and manager, and that employee is added to the database
const addNewEmployeeFunc = () =>{
  {
    prompt([
      {
        name: "first_name",
        message: "Please enter the first name of the new employee?"
      },
      {
        name: "last_name",
        message: "Please enter the last name of the new employee?"
      }
    ])
      .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;
  
        db.findRoles()
          .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
              name: title,
              value: id
            }));
  
            prompt({
              type: "list",
              name: "roleId",
              message: "What is the employee's role?",
              choices: roleChoices
            })
              .then(res => {
                let roleId = res.roleId;
  
                db.findEmployees()
                  .then(([rows]) => {
                    let employees = rows;
                    const managers = employees.map(({ id, first_name, last_name }) => ({
                      name: `${first_name} ${last_name}`,
                      value: id
                    }));
  
                    managers.unshift({ name: "None", value: null });
  
                    prompt({
                      type: "list",
                      name: "managerId",
                      message: "Who is the new employee's manager?",
                      choices: managers
                    })
                      .then(res => {
                        let employee = {
                          manager_id: res.managerId,
                          role_id: roleId,
                          first_name: firstName,
                          last_name: lastName
                        }
  
                        db.addEmployee(employee);
                      })
                      .then(() => console.log(
                        `${firstName} ${lastName} has been added to the database`
                      ))
                      .then(() => mainPrompt())
                  })
              })
          })
      })
  }
}
// addNewEmployeeFunc is working with the findRoles function and addEmployee function in db/index.js folder.

// Function that prompts user to select an employee and update their role.
const updateEmployeeFunc = () =>{
  db.findEmployees()
  .then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's role do you want to update?",
        choices: employeeChoices
      }
    ])
      .then(res => {
        let employeeId = res.employeeId;
        db.findRoles()
          .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
              name: title,
              value: id
            }));

            prompt([
              {
                type: "list",
                name: "roleId",
                message: "Which role do you want to assign the selected employee?",
                choices: roleChoices
              }
            ])
              .then(res => db.updateEmployeeRole(employeeId, res.roleId))
              .then(() => console.log("Updated employee's role"))
              .then(() => mainPrompt())
          });
      });
  })
}
// updateEmployeeFunc is working with the findEmployees function and findRoles function in db/index.js folder.

const init = () => {
  mainPrompt();
};

init();
