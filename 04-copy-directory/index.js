const fs = require('fs')
const path = require('path')

const makeDir = new Promise((res, rej) => {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {if (err) throw err;})
  res()
})
makeDir.then( () => {
  return new Promise((res, rej) => {
    fs.readdir(
      path.join(__dirname, 'files-copy'),
      (err, data) => {
         if (err) throw err
         res(data)
        })
  })
}).then((files) => {
  function removeFile(file) {
    return new Promise((res, rej) => {
      fs.rm(path.join(__dirname, 'files-copy', file),
      { force: true },
      (err) => {if (err) throw err;})
    })
  }
  const promises = files.map(file => removeFile(file))
   return Promise.all(promises);
}).then(() => {
  console.log('yes')
  return new Promise((res, rej) => {
    fs.readdir(
      path.join(__dirname, 'files'),
      (err, data) => {
         if (err) throw err
         res(data)
        })
  })
}).then((files) => {
  console.log(files)
  function copyFile(file) {
    return new Promise((res, rej) => {
      fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), (err) => {if (err) throw err;})
    })
  }
  const promises = files.map(file => copyFile(file))
  return Promise.all(promises)
}).then(() => {
  console.log('All files copied successfully')
})
.catch((err) => {
  console.log('Error:', err)
});
