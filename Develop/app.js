const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const open = require("open");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

function start() {
    console.log("Let's build your team!");
    inquirer.prompt([{
            type: "input",
            name: "managerName",
            message: "What is your manager's name?"
        }, {
            type: "input",
            name: "managerId",
            message: "What is your manager's Id?"
        }, {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's email?"
        },
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "What is your manager's office number?"
        }
    ]).then(function (data) {
        console.log(data)
        const manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOfficeNumber);

        team.push(manager);

        updateTeam();
    })

    // function to prompt if user wants to add to their team
    function updateTeam() {
        // prompt for if user want to add another team member
        inquirer.prompt([{
            type: "list",
            name: "newTeamMember",
            message: "Do you want to add another team member?",
            choices: ["yes", "no"]
        }]).then(function (data) {
            console.log(data);
            if (data.newTeamMember === "yes") {
                // if statement if yes to run addNewTeamMember()
                addNewTeamMember();
            } else {
                // else render team 
                // function to render html for team array
                makeTeam();
                console.log(team);
            }
        })
    }

    // function to add new team members
    function addNewTeamMember() {
        // prompt to ask user what kind of team member 
        inquirer.prompt([{
                type: "list",
                name: "typeOfEmployee",
                message: "What kind of employee do you want to add?",
                choices: ["intern", "engineer"]
            }

        ]).then(function (data) {
            console.log(data);
            // if user chooses intern
            if (data.typeOfEmployee === "intern") {
                // prompts for intern
                inquirer.prompt([{
                        type: "input",
                        name: "internName",
                        message: "What is your intern's name?"
                    }, {
                        type: "input",
                        name: "internId",
                        message: "What is your intern's Id?"
                    }, {
                        type: "input",
                        name: "internEmail",
                        message: "What is your intern's email?"
                    },
                    {
                        type: "input",
                        name: "internSchool",
                        message: "What school does your intern go to?"
                    }
                ]).then(function (data) {
                    console.log(data)
                    const intern = new Intern(data.internName, data.internId, data.internEmail, data.internSchool);

                    // push into team array
                    team.push(intern);

                    // call update team function
                    updateTeam();
                })
                // if user chooses engineer
            } else {
                // prompt for engineer
                inquirer.prompt([{
                        type: "input",
                        name: "engineerName",
                        message: "What is your engineer's name?"
                    }, {
                        type: "input",
                        name: "engineerId",
                        message: "What is your engineer's Id?"
                    }, {
                        type: "input",
                        name: "engineerEmail",
                        message: "What is your engineer's email?"
                    },
                    {
                        type: "input",
                        name: "github",
                        message: "What is your engineer's github username?"
                    }
                ]).then(function (data) {
                    console.log(data)
                    const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.github);

                    // push into team array
                    team.push(engineer);

                    // call update team function
                    updateTeam();
                })

            }

        })
    }

    function makeTeam() {
        // create output directory if it doesn't exist
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFileSync(outputPath, render(team), "utf-8");
    }

}


start();




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```