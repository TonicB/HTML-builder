const { stdin, stdout } = process
const fs = require('fs')
const path = require('path')
fs.readdir(
  path.join(__dirname, 'secret-folder'),
  {withFileTypes: true},
  (err, data) => {
    data.filter( file => file.isFile()).map(file => file.name).forEach( file => {
      console.log(`${file}   ${path.extname(file)}    ${fs.statSync(path.join(__dirname,'secret-folder\\') + file).size} kb`)
    })
  }
)
