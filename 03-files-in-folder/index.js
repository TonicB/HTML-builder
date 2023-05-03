const { stdin, stdout } = process
const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');

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
//_____________________________________________________________________________________________

// By promises chain

// const readDir = () => {
//   return new Promise((res, rej) => {
//     fs.readdir(
//         path.join(__dirname, 'secret-folder'),
//         {withFileTypes: true},
//         (err, data) => {
//           if(!err) res(data)
//         })
//   })
// }

// const showFileInfo = (file) => {
//   return new Promise((res, rej) => {
//     fs.stat(
//       path.join(__dirname,'secret-folder', file),
//       (err, stat) => {
//         if (!err) console.log(`${file.split('.')[0]}   ${path.extname(file)}  ${stat.size} kb`)
//       }
//     )
//   })
// }

// readDir()
// .then((files) => { files.filter( file => file.isFile()).forEach(file => showFileInfo(file.name))})
//____________________________________________________________________________________________________________

// By async/await
(async function printFileInfo () {
  const filesList = await fsPromises.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err) => {if(err) throw err})
  filesList.filter( file => file.isFile())
  .forEach(file => fs.stat(
      path.join(__dirname,'secret-folder', file.name),
      (err, stat) => {
        if (!err) console.log(`${file.name.split('.')[0]}   ${path.extname(file.name)}  ${stat.size} kb`)
      }
    ))
})()
