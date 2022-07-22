// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const{ writeFile } = require('fs');



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
        message: 'For the table of contents section, other than Installation, Usage, Contributions, Testing and Questions, list any other sections you wish to include. Give your answer seperated by commas with first letter capitalised. EG - User Agreement, Merging Requirement, Conclusion',
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

    // for generating table of contents
    const arrayOfContents = answers.tableOfContents.split(', ')
    console.log(arrayOfContents);

    const contentTableFunction = function(array) {
        
        let entireString = ''
        // let finalString;

        array.forEach(function(element) {

            // make the entire string lowercase
            const allLowerCase = element.toLowerCase();
            
            // need to make first letter capitalised as well

            let elementWithNoSpaces;
            // what if one of the elements contains more than one word, need to check for ' '
            if(allLowerCase.includes(' ')) {
                elementWithNoSpaces = allLowerCase.replaceAll(' ', '-')

                entireString = entireString.concat(`- [${element}](#${elementWithNoSpaces})\n`) 
            } else {
                entireString = entireString.concat(`- [${element}](#${allLowerCase})\n`) 
            }

           
        })

        console.log(entireString);

        return entireString;
    }

    let sectionsString = '';

    arrayOfContents.forEach(function(element) {
        sectionsString = sectionsString.concat(`## ${element}\n`)
        console.log(sectionsString)
    })


    writeFile('./README.md', 
    `# ${answers.title}
    
## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributions](#contributions)
- [Testing](#testing)
- [Questions](#questions)
${contentTableFunction(arrayOfContents)}

## Installation
${answers.installInstructions}

## Usage
${answers.usage}

## Contributions
${answers.contribution}

## Testing
${answers.testGuidelines}

## Questions Section
GitHub Profile... \n
github.com/${answers.githubUsername}

Email Address... \n
${answers.email}

${sectionsString};



`, 
    error => {
        if(error) console.error(error);
    })
})


// // TODO: Create an array of questions for user input
// const questions = [];

// // TODO: Create a function to write README file
// function writeToFile(fileName, data) {}

// // TODO: Create a function to initialize app
// function init() {}

// // Function call to initialize app
// init();
