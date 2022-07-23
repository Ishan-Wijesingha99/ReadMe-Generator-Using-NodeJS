
// import modules we need
const inquirer = require('inquirer');
const { writeFile } = require('fs');
const { renderLicenseBadge, renderLicenseSection, renderLicenseLink } = require('./utils/generateLicense')



// inquire user in the terminal section
inquirer.prompt([
    // questions asked in terminal
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

    // generating table of contents

    // split the string answers.tableOfContents into an array
    const arrayOfContents = answers.tableOfContents.split(', ')

    // function for generating table of contents
    const contentTableFunction = function(array) {
        
        // start content table string as an empty string
        let entireString = ''

        // loop over each section user wants to include in table of contents
        array.forEach(function(element) {

            // make the entire string lowercase
            const allLowerCase = element.toLowerCase();

            // need to check if one of the elements contains more than one word; need to check for ' '
            let elementWithNoSpaces;
            if(allLowerCase.includes(' ')) {
                // replace spaces with hyphen
                elementWithNoSpaces = allLowerCase.replaceAll(' ', '-')

                // keep adding to the initial empty string so that by the end of the loop, the entire table of contents text is generated
                entireString = entireString.concat(`- [${element}](#${elementWithNoSpaces})\n`) 
            } else {
                 // keep adding to the initial empty string so that by the end of the loop, the entire table of contents text is generated
                entireString = entireString.concat(`- [${element}](#${allLowerCase})\n`) 
            }

        })

        // return the final string which is the entire table of contents section
        return entireString;
    }



    // now that we've added the table of contents, we now need to add sections to the readme for each section the user entered in

    // start with an empty string
    let sectionsString = '';

    // loop over the array which has all the sections the user wants to include in table of contents
    arrayOfContents.forEach(function(element) {
        // continually add to the initially empty string so that by the end of the loop, it contains all the sections needed by the user
        sectionsString = sectionsString.concat(`## ${element}\n\n`);
    })

   

    // generate other questions the user wants to display on readme file.

    // split questions and answers given by user into an array
    const arrayOfQsAndAnswers = answers.questionsAndAnswers.split(', ');

    // create empty arrays, one for the questions the user has entered, and one for the answers the user has entered
    let arrayOfQs = []
    let arrayOfAnswers = []

    // loop over array of Qs and answers
    arrayOfQsAndAnswers.forEach(function(element) {

        if(element.includes('Q. ')) {
            // push questions into arrayOfQs
            arrayOfQs.push(element)
        } else if(element.includes('A. ')) {
            // push answers into arrayOfAnswers
            arrayOfAnswers.push(element)
        }

    })

    // function to generate questions and answers user entered into command prompt
    const generateQuestions = function(questionsArray, AnswersArray) {
        // start with empty string
        let startingString = ''

        // loop over BOTH the arrayOfQs and arrayOfAnswers using a for-loop
        for(let i = 0; i<arrayOfQs.length; i++) {
            
            // for the current iteration, add to startingString, first concat the question
            startingString = startingString.concat(`${arrayOfQs[i]}\n\n`);

            // then concat the answer for the current iteration
            startingString = startingString.concat(`${arrayOfAnswers[i]}\n\n`)
        }

        // at the end of the loop, the final string should contain all the questions and answers, return this
        return startingString;
    }



    // write the file based off the input the user has provided in the terminal
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
        // if there is an error, log it to the console as an error
        if(error) console.error(error);
    })
})


