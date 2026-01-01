// Intelligent Test Selector (placeholder implementation)
// In a real setup, this script would analyze git diff, coverage data, etc.
// For now it simply prints a list of test files to run (all tests).
const fs = require('fs');
const path = require('path');

function getAllTestFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllTestFiles(filePath));
        } else if (file.endsWith('.spec.ts') || file.endsWith('.spec.js')) {
            results.push(filePath);
        }
    });
    return results;
}

const testDir = path.resolve(__dirname, '../tests/e2e');
const allTests = getAllTestFiles(testDir);
// Output as a JSON array to stdout; CI can capture this.
console.log(JSON.stringify({ tests: allTests }, null, 2));
