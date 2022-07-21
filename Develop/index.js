// TODO: Include packages needed for this application
const inquirer = require('inquirer');



inquirer.prompt([
    {
        type: 'input',
        message: 'Enter the title you would like for your README file.',
        name: 'title' 
    },
    {
        type: 'input',
        message: 'Enter a description to describe your README file.',
        name: 'description'
    },
    {
        type: 'input',
        message: 'For the table of contents section, list each section you wish to include seperated by commas. EG - Installation, Usage, Conclusion',
        name: 'tableOfContents'
    },
    {
        type: 'input',
        message: 'Enter installation instructions.',
        name: 'installInstructions'
    },
    {
        type: 'input',
        message: 'Enter details about the usage of your application.',
        name: 'usage'
    },
    {
        type: 'input',
        message: 'Enter details about the contribution guidlines for your application.',
        name: 'contribution'
    },
    {
        type: 'input',
        message: 'Enter details and instructions about testing for your application.',
        name: 'testGuidelines'
    },
    {
        type: 'input',
        message: 'Enter your GitHub username.',
        name: 'githubUsername'
    },
    {
        type: 'input',
        message: 'Enter your email address.',
        name: 'email'
    },
]).then(answers => {
    console.log(answers)
    






})


// // TODO: Create an array of questions for user input
// const questions = [];

// // TODO: Create a function to write README file
// function writeToFile(fileName, data) {}

// // TODO: Create a function to initialize app
// function init() {}

// // Function call to initialize app
// init();
