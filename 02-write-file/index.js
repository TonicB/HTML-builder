const { stdin, stdout } = process
const fs = require('fs')
const path = require('path')

fs.writeFile(
  path.join(__dirname, 'text.txt'),
  '',
  (err) => {
    if (err) throw err;
    // console.log('Файл был создан');
})

stdout.write('Введите текст, который нужно добавить в файл:')
stdin.on('data', data => {
  fs.appendFile(
    path.join(__dirname, 'text.txt'),
    data.toString(),
    err => {
      if (err) throw err
    }
  )
})