const cypress = require('cypress');
const fs = require('fs');
const { execSync } = require('child_process');
// require('dotenv').config();

// console.log(process.env.USER_LINK_SUBMISSION);

// Replace 'https://example.com' with the actual URL
// const fileContent = fs.readFileSync('./cypress/e2e/spec.cy.js', 'utf8');
// const updatedContent = fileContent.replace(/http[^\"]+/g, process.env.USER_LINK_SUBMISSION);
// fs.writeFileSync('./cypress/e2e/spec.cy.js', updatedContent);

// Run Cypress tests
cypress.run().then((cypressResults) => {
  fs.writeFileSync('cypressResults.json', JSON.stringify(cypressResults, null, 2));

  // Run Jest tests and capture results
  try {
    console.log('Running Jest tests...');
    try {
      execSync('npm run test', { stdio: 'inherit' });
    } catch (error) {
    }
    console.log('Jest tests completed.');

    // Merge Cypress and Jest results
    const cypressResults = JSON.parse(fs.readFileSync('cypressResults.json', 'utf8'));
    const jestResults = JSON.parse(fs.readFileSync('jestResults.json', 'utf8'));

    const mergedResults = {
      cypress: cypressResults,
      jest: jestResults
    };

    fs.writeFileSync('combinedResults.json', JSON.stringify(mergedResults, null, 2));
  } catch (err) {
    console.error('Error running Jest tests:', err);
  }
}).catch((err) => {
  console.error(err);
});
