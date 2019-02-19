# header-insertor

A simple tool to insert some text before file's content.

## Install

```
npm install header-insertor -g
```

## Usage

```js
Usage: header-insertor [options] <file ...>

Options:
  -V, --version                  output the version number
  -p, --position <n>             string, a dictionary or file
  -t, --text <n>                 string, the text which will be inserted
  -e, --encoding <n>             string, character encoding type, one of
            'ascii','utf8','utf16le','ucs2','base64','latin1','binary','hex',default 'utf8'
  -f, --file-extensions <items>  list, A list of extensions which will be inserted, default null
  -h, --help                     output usage information
```

### example
```js
header-insertor -p ./test.js
Please specify the <text to insert>:
```
Then,the program will ask you to input the text which you want to insert;Please input:```/* eslint-disable */ \n```;

#### input:
```js
const a = 1;
```
#### output
```js
/* eslint-disable */
const a = 1;
```
