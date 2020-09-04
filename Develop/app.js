const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "./templates");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// Employee.js, Manager.js, Engineer.js, Intern.js

const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const teamMembers = [];

const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your manager's name?",
        default: "Nelio"
    },
    {
        type: "input",
        name: "id",
        message: "What is your manager's id?",
        default: "1234"
    },
    {
        type: "input",
        name: "email",
        message: "What is your manager's email?",
        default: "nelio@nelio.com"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is your manager's office number?",
        default: "305 786 1212"
    },
    {
        type: "list",
        name: "teamMember",
        message: "Which type of team member would you like to add?",
        choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members."
        ]
    },
];

const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your engineer's name?",
        default: "David"
    },
    {
        type: "input",
        name: "id",
        message: "What is your engineer's id?",
        default: "56789"
    },
    {
        type: "input",
        name: "email",
        message: "What is your engineer's email?",
        default: "david@david.com"
    },
    {
        type: "input",
        name: "github",
        message: "What is your engineer's GitHub username?",
        default: "githubTAdavid"
    },
    {
        type: "list",
        name: "teamMember",
        message: "Which type of team member would you like to add?",
        choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members."
        ]
    },
];

const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your intern's name?",
        default: "Lisa"
    },
    {
        type: "input",
        name: "id",
        message: "What is your intern's id?",
        default: "2020"
    },
    {
        type: "input",
        name: "email",
        message: "What is your intern's email?",
        default: "lisa@lisa.com"
    },
    {
        type: "input",
        name: "school",
        message: "What is your intern's school?",
        default: "UMiami"
    },
    {
        type: "list",
        name: "teamMember",
        message: "Which type of team member would you like to add?",
        choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members."
        ]
    },
];

// function appendToFile(fileName, readmeText) {
//     fs.appendFile(fileName, readmeText, function (error) {
//         if (error) {
//             console.log("Error: ", error);
//         } else {
//             console.log("view.txt generated!");
//         }
//     });
// }

// async function promptUser(questions) {
//     return await inquirer.prompt(questions);
// }

// function promptManager(managerQuestions) {
//     return inquirer.prompt(managerQuestions);
// }

// console.log("Manager: Please build your team.\n");

// promptManager(managerQuestions)
function promptManager(questions, employeeType) {
    inquirer.prompt(questions)
        .then(function (answers) {

            let newTeamMember;

            if (employeeType == "Manager") {
                newTeamMember = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            } else if (employeeType == "Engineer") {
                newTeamMember = new Engineer(answers.name, answers.id, answers.email, answers.github);
            } else if (employeeType == "Intern") {
                newTeamMember = new Intern(answers.name, answers.id, answers.email, answers.school);
            }

            // let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            // let manager = new Manager(managerAnswers.name, managerAnswers.id, managerAnswers.email, managerAnswers.officeNumber);

            teamMembers.push(newTeamMember);

            // appendToFile("view.txt", renderManager(manager));
            writeFileAsync("./output/team.html", render.render(teamMembers));

            // renderManager(manager);

            if (answers.teamMember == "I don't want to add any more team members.") {
                return answers;
            } else if (answers.teamMember == "Engineer") {
                // promptEngineer(engineerQuestions);
                promptManager(engineerQuestions, "Engineer");
            } else if (answers.teamMember == "Intern") {
                // promptIntern(internQuestions);
                promptManager(internQuestions, "Intern");
            } else {
                console.log("Error");
            }

            return answers;

            // const html = generateHTML(answers);
            // return writeFileAsync("index.html", html);

        }).catch(function (err) {
            console.log(err);
        });

}


console.log("Manager: Please build your team.\n");

promptManager(managerQuestions, "Manager");

// After the user has input all employees desired, call the `render` function (required above) 
// and pass in an array containing all employee objects; 
// the `render` function will generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file 
// using the HTML returned from the `render` function. 
// Now write it to a file named `team.html` in the `output` folder. 
// You can use the variable `outputPath` above to target this location.
// Hint: you may need to check if the `output` folder exists and create it if it does not.


// HINT: each employee type (manager, engineer, or intern) has slightly different information; 
// write your code to ask different questions via inquirer depending on employee type.

// HINT: make sure to build out your classes first! 
// Remember that your Manager, Engineer, and Intern classes should all extend from a class named Employee; 
// see the directions for further information. 
// Be sure to test out each class and verify it generates an object with the correct structure and methods. 
// This structure will be crucial in order for the provided `render` function to work!



// await 
// .then
//promptUser(engineerQuestions)
// function promptEngineer(engineerQuestions) {
//     return inquirer.prompt(engineerQuestions);
// }

// promptEngineer(engineerQuestions)
//     .then(async function (engineerAnswers) {

//         // let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
//         let engineer = new Engineer(engineerAnswers.name, engineerAnswers.id, engineerAnswers.email, engineerAnswers.github);
//         // console.log(engineer.getName());

//         teamMembers.push(engineer);
//         // console.log(JSON.stringify(answers));

//         // appendToFile("view.txt", renderManager(manager));
//         await writeFileAsync("index.html", render.render(teamMembers));

//         // renderEngineer(engineer);

//         if (answers.teamMember == "I don't want to add any more team members.") {
//             return answers;
//         } else if (answers.teamMember == "Engineer") {
//         promptEngineer(engineerQuestions);
//         } else if (answers.teamMember == "Intern") {
//         promptIntern(internQuestions);
//         } else {
//             console.log("Error");
//         }

//         return await answers;

//         // const html = generateHTML(answers);
//         // return writeFileAsync("index.html", html);
//     })

// // await 
// // .then
// //promptUser(internQuestions)
// function promptIntern(internQuestions) {
//     return inquirer.prompt(internQuestions);
// }

// promptIntern(internQuestions)
//     .then(async function (internAnswers) {

//         // let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
//         let intern = new Intern(internAnswers.name, internAnswers.id, internAnswers.email, internAnswers.school);
//         // console.log(intern.getName());

//         teamMembers.push(intern);
//         // console.log(JSON.stringify(answers));

//         // appendToFile("view.txt", JSON.stringify(answers));
//         await writeFileAsync("index.html", render.render(teamMembers));

//         if (answers.teamMember == "I don't want to add any more team members.") {
//             return answers;
//         } else if (answers.teamMember == "Engineer") {
//             promptEngineer(engineerQuestions);
//         } else if (answers.teamMember == "Intern") {
//             promptIntern(internQuestions);
//         } else {
//             console.log("Error");
//         }

//         // console.log("Don't forget to write to HTML");

//         return await answers;

//         // const html = generateHTML(answers);
//         // return writeFileAsync("index.html", html);
//      })


// .then(async function (answers) {
//     // render(teamMembers);
// })















//     // if (answers.teamMember == "I don't want to add any more team members.") {
//     //     break;
//     // } else if (answers.teamMember == "Engineer") {
//     //     await promptUser(engineerQuestions);
//     // } else if (answers.teamMember == "Intern") {
//     //     await promptUser(internQuestions);
//     // } else {
//     //     console.log("Something else");
//     // }
//     // console.log("Don't forget to write to HTML");

// const replacePlaceholders = (template, placeholder, value) => {
//     const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
//     return template.replace(pattern, value);
// };

// const renderManager = manager => {
//     let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
//     template = replacePlaceholders(template, "name", manager.getName());
//     template = replacePlaceholders(template, "role", manager.getRole());
//     template = replacePlaceholders(template, "email", manager.getEmail());
//     template = replacePlaceholders(template, "id", manager.getId());
//     template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
//     return template;
// };