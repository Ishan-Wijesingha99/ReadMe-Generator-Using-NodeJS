// TODInclude packages needed for this application
const inquirer = require('inquirer');
const { writeFile } = require('fs');
const { renderLicenseBadge, renderLicenseSection, renderLicenseLink } = require('./utils/generateLicense')



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
        message: 'For the table of contents section, other than Installation, Usage, Contributions, Testing, License and Questions, list any other sections you wish to include. Give your answer seperated by commas with first letters capitalised. EG - User Agreement, Merging Requirement, Conclusion',
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
        message: "Choose which license you would like to use for your application. This README generator only includes the most common licenses to choose from. These licenses are, the Apache License 2.0 (apache), the GNU GPLv3 License (gnu), the ISC License (isc), the MIT License (mit), the Boost Software license 1.0 (boost), and the Mozilla Public License (mozilla). Enter the text in brackets for whichever license you wish to include.",
        name: 'license'
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
    {
        type: 'input',
        message: 'Enter instructions on how to reach you.',
        name: 'instructionsToReachOut'
    },
    {
        type: 'input',
        message: 'To add additional questions, type the question and then the answer, seperated by a comma. Start every question with Q. and every answer with A. , do this for as many questions as you wish. EG - Q. What version is the application?, A. version 1.0.1., Q. When is the next update scheduled to come out?, A. By the end of 2023.',
        name: 'questionsAndAnswers'
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
        sectionsString = sectionsString.concat(`## ${element}\n\n`)
        console.log(sectionsString)
    })



   



    


    // generate other questions the user wants to display on README file.
    const arrayOfQsAndAnswers = answers.questionsAndAnswers.split(', ');

    console.log(arrayOfQsAndAnswers);

    let arrayOfQs = []
    let arrayOfAnswers = []
    arrayOfQsAndAnswers.forEach(function(element) {

        if(element.includes('Q. ')) {
            arrayOfQs.push(element)
        } else if(element.includes('A. ')) {
            arrayOfAnswers.push(element)
        }

    })

    console.log(arrayOfQs);
    console.log(arrayOfAnswers);

    const generateQuestions = function(questionsArray, AnswersArray) {
        let startingString = ''

        for(let i = 0; i<arrayOfQs.length; i++) {
            
            startingString = startingString.concat(`${arrayOfQs[i]}\n\n`);

            startingString = startingString.concat(`${arrayOfAnswers[i]}\n\n`)
        }

        console.log(startingString)

        return startingString;
    }

   



    





    writeFile('./README.md', 
`# ${answers.title}
    
${renderLicenseBadge(answers.license)}


## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributions](#contributions)
- [Testing](#testing)
- [License](#license)
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

## License
${renderLicenseSection(answers.license)}\n
Licence link URL - ${renderLicenseLink(answers.license)}

## Questions Section

Q. What is the GitHub profile?\n
A. github.com/${answers.githubUsername}

Q. What is the email address...\n
A. ${answers.email}

Q. What are the instructions for reaching out...
A. ${answers.instructionsToReachOut}

${generateQuestions(arrayOfQs, arrayOfAnswers)}



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
