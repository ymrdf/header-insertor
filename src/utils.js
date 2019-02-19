const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

let extensions,
    encoding,
    text = '',
    number = 0;

/**
 * Main function to write
 * @param {Object} args,
 * {
 *  extensions:Array, Files with these extensions, will be written.
 *  encoding:String, Character encoding type of files.One of 'ascii','utf8',
 *                   'utf16le','ucs2','base64','latin1','binary','hex'.
 *  text:String, The text which will be inserted.
 *  postion:String, A dictionary or file which will be inserted into.
 */
function write(args){
  extensions = args.extensions;
  encoding = args.encoding;
  const textArr = args.text.split(/\\n|\\r/);
  const len = textArr.length;
  if(len === 1){
    text = args.text;
  }else{
    if(textArr[textArr.length - 1] == ''){
      textArr.pop();
    }
    for(let i of textArr){
      text = text + i + '\r\n';
    }
  }

  writeToPath(args.position)
}

/**
 * Write text into filePath, include dictionary and file
 * @param {String} filepath , dictionary or file
 */
async function writeToPath(filepath){
  const stat = await getStat(filepath).catch(e => console.log(chalk.red(err)));
  if(stat.isFile()){
    if(typeMatchesTest(filepath)){
      console.log(chalk.green(++number + '   insert ' + filepath));
      writeCodeToFile(filepath).catch(e => console.log(chalk.red(err)));
    }
  }else if(stat.isDirectory()){
    writeCodeToDir(filepath).catch(e => console.log(chalk.red(err)));
  }
}


//Wirte text to directory
async function writeCodeToDir(dir){
  const files = await readdir(dir).catch(err => {
    throw(err);
  });
  try{
    for(const file of files){
      const filepath = path.resolve(dir, file);
      writeToPath(filepath);
    }
  }catch(err){
    throw(err);
  }
}

//Wirte text to a file.
function writeCodeToFile(path){
  return new Promise((r,j) => {
    fs.open(path,'r+', (e,fd)=>{
      if(e) j(e);
      fs.readFile(fd,{encoding:encoding},(err1,content) => {
        if(err1) j(err1);
        fs.write(fd,text + content, 0, encoding,
          (err, written, string) => {
          if(err) j(err);
          r(string);
        })
      })
      
    })
  })
}

function readdir(path){
  return new Promise((r,j) => {
    fs.readdir(path,(err, files) => {
      if(err) j(err);
      r(files)
    })
  })
}

function getStat(path){
  return new Promise((r,j) => {
    fs.stat(path, (err, stat) => {
      if(err) j(err);
      r(stat)
    })
  })
}

/**
 *  Public:
 *  @param {String} filename,filename to check if it matches the tests.
 *
 *  Returns {Bool}
 */
function typeMatchesTest(filename){
  if(extensions && Array.isArray(extensions) && extensions.length > 0){
    return extensions.reduce((pre,cur) => {
      let temp = cur;
      if(cur.indexOf('.') != 0){
        temp = '.' + cur;
      }
      temp = temp + "$";
      return pre || new RegExp(temp).test(filename);
    },false);
  }else{
    return true;
  }
}

module.exports = {
  write
}