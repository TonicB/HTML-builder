const { stdin, stdout } = process
const fs = require('fs')
const path = require('path')

// By CALLBACK HELL
// fs.readdir(
//   path.join(__dirname, 'secret-folder'),
//   {withFileTypes: true},
//   (err, data) => {
//     data.filter( file => file.isFile()).map(file => file.name).forEach( file => {
//       fs.stat(
//         path.join(__dirname,'secret-folder\\') + file,
//         (err, stat) => {
//           console.log(`${file}   ${path.extname(file)}  ${stat.size} kb`)
//         }
//         )
//     })
//   }
// )

let filesList

const readDir = () => {
  return new Promise((res, rej) => {
    fs.readdir(
        path.join(__dirname, 'secret-folder'),
        {withFileTypes: true},
        (err, data) => {
          if(!err) res(data)
        })
  })
}

const showFileInfo = (file) => {
  return new Promise((res, rej) => {
    fs.stat(
      path.join(__dirname,'secret-folder\\') + file,
      (err, stat) => {
        if (!err) console.log(`${file.split('.')[0]}   ${path.extname(file)}  ${stat.size} kb`)
      }
    )
  })
}

// By promises chain
// readDir().then((files) => {
//   files.filter( file => file.isFile()).forEach(file => showFileInfo(file.name))
// })

// By async/await
async function printFileInfo () {
  filesList = await readDir()
  filesList.filter( file => file.isFile()).forEach(file => showFileInfo(file.name))
}

printFileInfo()
