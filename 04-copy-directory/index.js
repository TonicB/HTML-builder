const fs = require('fs')
const path = require('path')

const makeDir = new Promise((res, rej) => {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {if (err) throw err;})
  res()
})

const readDir = (dir) => { return () => {
  return new Promise((res, rej) => {
    fs.readdir(path.join(__dirname, dir), (err, data) => {
      if (!err) {
        res(data)
      }
     })
  })
}
}
const rmFile = (file) => {
      return new Promise((res, rej) => {
      fs.rm(path.join(__dirname, 'files-copy', file),
      { force: true },
      (err) => {if (!err) res();})
    })
}

const promisesRm = (arr) => {
  return arr.map( el => rmFile(el))
}

const copyFile = (file) => {
  return new Promise((res, rej) => {
    fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), (err) => {if (!err) res();})
  })
}

const promisesCopy = (arr) => {
  return arr.map( el => copyFile(el))
}

makeDir
.then(readDir('files-copy'))
.then(data => Promise.all(promisesRm(data)))
.then(readDir('files'))
.then(data => Promise.all(promisesCopy(data)))
