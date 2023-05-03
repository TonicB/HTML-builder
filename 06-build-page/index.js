const { isUtf8 } = require('buffer');
const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const pathComps = path.join(__dirname, 'components');
const componentsObj = {};

async function writeFromCompToObj(fileBaseName) {
  const content = await fsPromises.readFile(path.join(pathComps, fileBaseName))
  componentsObj[path.parse(fileBaseName).name] = content.toString()
};

(async () => {
  const componentsDirents = await fsPromises.readdir(pathComps, {withFileTypes: true})
  const componentsFiles = componentsDirents.filter(x => x.isFile() && path.extname(x.name) === '.html').map(x => x.name)
  for (const file of componentsFiles) {await writeFromCompToObj(file)}
  await fsPromises.mkdir(path.join(__dirname, 'project-dist'), {recursive: true})
  const tempContent = await fsPromises.readFile(path.join(__dirname, 'template.html'), {encoding: 'utf8'})
  let indexHtmlContent = tempContent
  for (const key in componentsObj) {
    const re = new RegExp(`{{${key}}}`, 'gi')
    indexHtmlContent = indexHtmlContent.replace(re, componentsObj[key])
  }
  await fsPromises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), indexHtmlContent)

  const styles = await fsPromises.readdir(path.join(__dirname, 'styles'), {withFileTypes: true})
  const stylesCssFiles = styles.filter(f => f.isFile() && path.extname(f.name) === '.css').map(f => f.name)
  let bundleContent

  for (const f of stylesCssFiles) {
    const contentFromFile = await fsPromises.readFile(path.join(__dirname, 'styles', f), {encoding: 'utf8'})
    bundleContent = bundleContent + contentFromFile
  }

  await fsPromises.writeFile(path.join(__dirname, 'project-dist', 'style.css'), bundleContent);

  async function deepCopy (dir) {
    await fsPromises.mkdir(path.join(__dirname, 'project-dist', dir), { recursive: true })
    const filesOfDistDir = await fsPromises.readdir(path.join(__dirname, 'project-dist', dir))
    for (const file of filesOfDistDir) {
      await fsPromises.rm(path.join(__dirname, 'project-dist', dir, file), { force: true, recursive: true })
    }
    const filesToCopyDirents = await fsPromises.readdir(path.join(__dirname, dir), {withFileTypes: true})
    
    for (const fileDirent of filesToCopyDirents) {
      if (fileDirent.isFile()) {
        await fsPromises.copyFile(path.join(__dirname, dir, fileDirent.name), path.join(__dirname, 'project-dist', dir, fileDirent.name))
      } else {
        await deepCopy(path.join(dir, fileDirent.name))
      }
    }
  }

  deepCopy('assets')
})()