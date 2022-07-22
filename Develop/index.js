// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const{ writeFile } = require('fs');
const { start } = require('repl');



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



    // create license section based off answer and add badge to top of readme

    const generateLicenseImage = function(licenseString) {

        const lowercaseLicense = licenseString.toLowerCase();

        if(lowercaseLicense === 'apache') {
            return '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
        } else if(lowercaseLicense === 'gnu') {
            return '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
        } else if(lowercaseLicense === 'isc') {
            return '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)'
        } else if(lowercaseLicense === 'mit') {
            return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
        } else if(lowercaseLicense === 'boost') {
            return '[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)'
        } else if(lowercaseLicense === 'mozilla') {
            return '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)'
        }
        
    }



    const generateLicenseText = function(licenseString) {

        const lowercaseLicense = licenseString.toLowerCase();

        if(lowercaseLicense === 'apache') {
            // URL reference
            // https://choosealicense.com/licenses/apache-2.0/
            return 'Under the Apache License 2.0, users may distribute and modify software. Users may also use it commercially or patent it. Private use is also available. In order to do this, the license must be present and be inline with copyright notices.'
        } else if(lowercaseLicense === 'gnu') {
            // URL reference
            // https://choosealicense.com/licenses/gpl-3.0/
            return 'Under the GNU General Public License v3.0, users may distrubute and modify software. Users may also use it commercially or patent it. Private use is also available. In order to do this, the license must be present and be inline with copyright notices. Users must also disclose the source of the copied/referenced code as well as use the same license as the copied/referenced code.'
        } else if(lowercaseLicense === 'isc') {
            // URL reference
            // https://choosealicense.com/licenses/isc/
            return 'The ISC License states... Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies'
        } else if(lowercaseLicense === 'mit') {
            // URL reference
            // https://choosealicense.com/licenses/mit/
            return 'The MIT License states... Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.'
        } else if(lowercaseLicense === 'boost') {
            // URL reference
            // https://www.boost.org/LICENSE_1_0.txt
            return 'The Boost License states...  Permission is hereby granted, free of charge, to any person or organization obtaining a copy of the software and accompanying documentation covered by this license (the "Software") to use, reproduce, display, distribute, execute, and transmit the Software, and to prepare derivative works of the Software, and to permit third-parties to whom the Software is furnished to do so, all subject to the following: The copyright notices in the Software and this entire statement, including the above license grant, this restriction and the following disclaimer, must be included in all copies of the Software, in whole or in part, and all derivative works of the Software, unless such copies or derivative works are solely in the form of machine-executable object code generated by a source language processor.'
        } else if(lowercaseLicense === 'mozilla') {
            // URL reference
            // https://www.mozilla.org/en-US/MPL/2.0/
            return 'The Mozilla Public License 2.0 states... Each Contributor hereby grants You a world-wide, royalty-free, non-exclusive license: under intellectual property rights (other than patent or trademark) Licensable by such Contributor to use, reproduce, make available, modify, display, perform, distribute, and otherwise exploit its Contributions, either on an unmodified basis, with Modifications, or as part of a Larger Work; and under Patent Claims of such Contributor to make, use, sell, offer for sale, have made, import, and otherwise transfer either its Contributions or its Contributor Version.'
        }
        
    }
     


    const generateLicenseLink = function(licenseString) {

        const lowercaseLicense = licenseString.toLowerCase();

        if(lowercaseLicense === 'apache') {
            return 'https://www.apache.org/licenses/LICENSE-2.0'
        } else if(lowercaseLicense === 'gnu') {
            return 'https://www.gnu.org/licenses/gpl-3.0.en.html'
        } else if(lowercaseLicense === 'isc') {
            return 'https://choosealicense.com/licenses/isc/'
        } else if(lowercaseLicense === 'mit') {
            return 'https://choosealicense.com/licenses/mit/'
        } else if(lowercaseLicense === 'boost') {
            return 'https://www.boost.org/users/license.html'
        } else if(lowercaseLicense === 'mozilla') {
            return 'https://www.mozilla.org/en-US/MPL/2.0/'
        }
        
    }



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
    
${generateLicenseImage(answers.license)}


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
${generateLicenseText(answers.license)}\n
Licence link URL - ${generateLicenseLink(answers.license)}

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
