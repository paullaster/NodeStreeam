const fs = require('fs');
const {promisify} = require('util');
let writeFile = promisify(fs.writeFile);
writeFile('sample.txt', 'This is a sample file! gerrit??')
 .then(() =>{
     console.log('the file was successfully created ');
})
.catch((err) =>{
    console.log('error creating file!');
})