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
    this.getFolderInfo(manifest)
    const data = JSON.stringify(manifest)
    console.log(manifest)
    fs.writeFileSync(this.des + path.sep + 'manifest.json', data, { flag: 'w' })
  }

  getFolderInfo(manifest, prefix = '') {
    const newPrefix = prefix ?  prefix + '/' : prefix
    const folder = this.src + path.sep + prefix
    const result = fs.readdirSync(folder, {
      withFileTypes: true
    })
    result.forEach((item) => {
      if(item.isDirectory()) {
        const obj = {}
        obj[item.name] = [], manifest.push(obj)
        this.getFolderInfo(obj[item.name], newPrefix + item.name)
      } else {
        manifest.push(newPrefix + item.name)
      }
    })
  }

  apply(compiler) {
 
  }
}

module.exports = ManifestWebpackPlugin