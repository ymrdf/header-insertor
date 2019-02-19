const { write } = require('../src/utils.js');
const args = require("../src/args.js");
const chalk = require('chalk');
const readline = require('readline');
let { position, text, encoding, extensions } = args;

/**
 * If text is undefined, let user to input it;
 */
if (typeof text === 'undefined') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question(`${chalk.green('Please specify the <text to insert>:')}`, (answer) => {
    text = answer;
    rl.close();
    start()
  });
}

//Start insert text;
start();

function start(){
  if(position && text && encoding){
    write({ position, text, encoding, extensions });
  }
}
