const fs = require('fs')
const path = require('path')

class AssetsManifestWebpackPlugin {

  constructor(options) {
    this.options = options
    this.generateManifest()
  }

  generateManifest() {
    const src = path.resolve(__dirname, this.options.source)
    const des = path.resolve(__dirname, this.options.output)
    const content = fs.readdirSync(src)
    console.log(content)
  }

  apply(compiler) {
 
  }

}

module.exports = AssetsManifestWebpackPlugin