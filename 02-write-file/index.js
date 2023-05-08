const { stdin, stdout } = process
const fs = require('fs')
const path = require('path')

fs.writeFile(
  path.join(__dirname, 'text.txt'), '',
  (err) => {
    if (err) throw err;
    // console.log('Файл был создан');
})

stdout.write('Input some text:\n')
stdin.on('data', data => {
    if(data.toString().trim() === 'exit') {
      console.log('Bye')
      process.exit()
    }
   
    fs.appendFile(
      path.join(__dirname, 'text.txt'),
      data.toString(),
      err => {
        if (err) throw err
      }
      )
  // }
})

process.on('SIGINT', () => {
  console.log('Bye')
  process.exit()
})