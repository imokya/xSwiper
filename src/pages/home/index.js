import Dialog from 'src/utils/dialog'

export default {

  mounted() {
    this.el = $(this.el)
    this._createDialog()
    this._bindEvent()
  },

  _createDialog() {
    if (!this.dialog) {
      this.dialog = new Dialog({
        el: $('<div>').addClass('dialog dialog-info-tip abs center hide')
      })
    }
    //this.dialog.show()
  },

  _bindEvent() {
    this.el.on('click', '.button.start', (e) => {
      this.app.go('reg')
    })
  },

  destroy() {
    this.el.off()
  }
  
}