const fs = require('fs')
const path = require('path')

class ManifestWebpackPlugin {

  constructor(options) {
    this.options = options
    if(!options.disable) {
      this.generateManifest()
    }
  }

  generateManifest() {
    this.src = path.resolve(__dirname, this.options.source)
    this.des = path.resolve(__dirname, this.options.output)
    const manifest = []
    this.getFolderInfo(this.src, manifest)
    const data = JSON.stringify(manifest)
    fs.writeFileSync(this.des + path.sep + 'manifest.json', data, { flag: 'w' })
  }

  getFolderInfo(folder, manifest) {
    const info = fs.readdirSync(folder, {
      withFileTypes: true
    })
    info.forEach((item) => {
      if(item.isDirectory()) {
        const newFolder = path.join(folder, item.name)
        const obj = {}
        obj[item.name] = [], manifest.push(obj)
        this.getFolderInfo(newFolder, obj[item.name])
      } else {
        let prefix = folder.replace(this.src, '')
        prefix = prefix.replace(/\\/g, '/')
        prefix = prefix.replace(/(^\/)|(\/$)/g, '')
        prefix = prefix ? prefix + '/' : prefix
        manifest.push(prefix + item.name)
      }
      
    })
  }

  apply(compiler) {
 
  }
}

module.exports = ManifestWebpackPlugin