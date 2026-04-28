const fs = require('fs').promises;
const path = require('path');

const inputPath = path.join(__dirname, 'input.txt');
const outputPath = path.join(__dirname, 'wordcount.txt');

async function countWords(text) {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

async function run() {
  try {
    const text = await fs.readFile(inputPath, 'utf8');
    const wordCount = await countWords(text);
    const result = `Word count: ${wordCount}\n`;
    await fs.writeFile(outputPath, result, 'utf8');
    console.log(`Read ${inputPath}, wrote count to ${outputPath}`);
  } catch (error) {
    console.error('Error during file operations:', error.message);
    process.exitCode = 1;
  }
}

run();
