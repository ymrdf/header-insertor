const program = require("commander");
const packageJson = require('../package.json');

function list(val) {
  return val.split(',');
}

program
  .version(packageJson.version)
  .usage("[options]")
  .option("-p, --position <n>", "string, a dictionary or file")
  .option("-t, --text <n>", "string, the text which will be inserted")
  .option("-e, --encoding <n>", `string, character encoding type, one of 
          'ascii','utf8','utf16le','ucs2','base64','latin1','binary','hex',default 'utf8'`,
           /^(ascii|utf8|utf16le|ucs2|base64|latin1|binary|hex)$/i)
  .option('-f, --file-extensions <items>',
   'list, A list of extensions which will be inserted, default null', list)
  .parse(process.argv);

let position = ".";
let text;
let encoding = "utf8";
let extensions;

if (program.position) {
  position = program.position;
}
if (program.text) {
  text = program.text;
}
if (program.encoding) {
  encoding = program.encoding;
}
if (program.fileExtensions) {
  extensions = program.fileExtensions;
}

module.exports = { position, text, encoding, extensions };