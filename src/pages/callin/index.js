import LoadingDialog from 'src/utils/loading-dialog'

export default {

  mounted() {
    this.el = $(this.el)
    this._bindEvent()
  },

  _createDialog() {
    this.loadingDialog = new LoadingDialog({
      title: '分享中...'
    })
  },

  _bindEvent() {
    this.el.on('click', '.button.share', (e) => {
      this._createDialog()
      this.loadingDialog.show()
      setTimeout(() => {
        this.loadingDialog.done()
        setTimeout(() => {
          this.loadingDialog.destroy()
        }, 1000)
      }, 2000)
    })
  },

  destroy() {
    this.el.off()
  }
  
}