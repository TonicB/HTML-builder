const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

// By promises chain
// const readDir = (dir) => { return () => {
//   return new Promise((res, rej) => {
//     fs.readdir(
//       path.join(__dirname, dir),
//       {withFileTypes: true},
//       (err, data) => {if (!err) res(data)}
//       )
//   })
// }
// }

// const readFromFile = (file) => { 
//   return new Promise((res,rej) => {
//     const stream = fs.createReadStream(path.join(__dirname, 'styles', file))
//     stream.on('readable', () => {
//       const data = stream.read()
//       res(data)
//     })
//   })
// }

// const makeFile = (data) => { 
//   return new Promise((res, rej) => {
//     fs.open(path.join(__dirname, 'project-dist', 'bundle.css'), 'w', (err) => {if (err) throw err;})
//     res(data)
//   })
// }

// const promises = (arr) => arr.filter(file => file.isFile()).filter(file => path.extname(file.name) === '.css').map(file => readFromFile(file.name))

// const bundle = (data) => {
//   data.forEach(x => {
//     fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), x, (err) => {if (err) throw err})
//   })
// }

// readDir('styles')()
// .then(data => Promise.all(promises(data)))
// .then(data => makeFile(data))
// .then(data => bundle(data));
//___________________________________________________________________________________

// By async/await
(async () => {
  try {

    const styles = await fsPromises.readdir(path.join(__dirname, 'styles'), {withFileTypes: true})
    const stylesCssFiles = styles.filter(f => f.isFile() && path.extname(f.name) === '.css').map(f => f.name)
    let bundleContent = ''
    
    for (const f of stylesCssFiles) {
      const contentFromFile = await fsPromises.readFile(path.join(__dirname, 'styles', f), {encoding: 'utf8'})
      bundleContent += contentFromFile
    }
    
    await fsPromises.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), bundleContent)
  } catch (e) {
    console.error(e)
  }
})()

