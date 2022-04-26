const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");


const mainPrompt = () =>{
    prompt([
        {type: 'list',
        name:"choice",
        message: 'what would you like to do?',
        choices: [
            {
                name: "View All Departments",
            value: "viewDepartments"
            },
            {
                name: "View All Roles",
                value: "viewRoles"
            },
            {
                name: "View All Employees",
                value: "viewEmployees"
            },
            {
                name: "Add A Department",
                value: "addDept"
            },
            {
                name: "Add A Role",
                value: "addRole"
            },
            {
                name: "Add Employee",
                value: "addEmployee"
            },
            {
                name: "Update An Employee",
                value: "updateEmployees"
            }
        ]}
    ])
}
// function creating formatted table showing department names and department ids
const viewDeparmentsfunc = () =>{}

// function that show view of job title, role id, the department that role belongs to, and the salary for that role
const viewRolesfunc = () =>{}

// function that shows formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
const viewAllEmployeeFunc = () =>{}

//Function that creates a new department  
const addDeparmentFunc = () =>{}

// Function that creates a new role prompting user to enter the name, salary, and department for the role and that role is added to the database
const addRoleFunc = () =>{}

// Function that adds a new emplyee prompting for first name, last name, role, and manager, and that employee is added to the database
const addNewEmployeeFunc = () =>{}

// Function that prompts user to select an employee and update their role. 
const updateEmployeeFunc = () =>{}

const viewDeparments = () =>{}

const init = () =>{ 
    mainPrompt()
}

init()