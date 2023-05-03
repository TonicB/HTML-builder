const fs = require('fs')
const path = require('path')
const componentsObj = {}

const readFromFile = (file, dir = '') => { 
  return new Promise((res,rej) => {
    const stream = fs.createReadStream(path.join(__dirname, dir, file))
    stream.on('readable', () => {
      const data = stream.read()
      res(data)
    })
  })
}

const readDir = (dir) => {
  return new Promise((res, rej) => {
    fs.readdir(
        path.join(__dirname, dir),
        (err, data) => {
          if(!err) res(data)
        })
  })
}

// readFromFile('template.html')
// .then(data => {
//   console.log(data.toString().match(/{{\w+}}/gm).map(x => x.slice(2, -2)))
// })

readDir('components')
.then(data => Promise.all(data.map(x => {
  componentsObj[path.parse(x).name] = undefined
  return readFromFile(x, 'components')
})))
.then(data => data.forEach(x => 
  console.log(x.toString())
))
.then(() => console.log(componentsObj))