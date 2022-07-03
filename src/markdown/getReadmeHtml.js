const fs = require('fs-extra');
const path = require('path');
const markdownToHtml = require('./markdownToHtml');

const readmeFilePath = path.join(__dirname, '../../README.md');
const htmlFilePath = path.join(__dirname, 'template.html');
let cache = '';

async function getReadmeHtml() {
  if (cache) {
    return cache;
  }
  const fileContent = await fs.readFile(readmeFilePath, 'utf8');
  const htmlContent = await fs.readFile(htmlFilePath, 'utf8');
  const md = await markdownToHtml(fileContent);
  const html = htmlContent.replace('${md}', md);
  cache = html;
  return cache;
}

module.exports = getReadmeHtml;
