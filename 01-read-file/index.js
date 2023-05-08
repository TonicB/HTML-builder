const fs = require('fs')
const path = require('path')
const { stdout } = process

const stream = fs.createReadStream(path.join(__dirname,'text.txt'), {encoding: 'utf-8'})
stream.on('readable', () => {
  const data = stream.read()
  stdout.write(data)
  console.log(data)
  process.exit()
})
