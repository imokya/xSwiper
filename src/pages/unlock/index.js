import Dialog from 'src/utils/dialog'

export default {

  mounted() {
    this.el = $(this.el)
    this._bindEvent()
  },

  _createDialog() {
    this.dialog = new Dialog({
      el: $('<div>').addClass('dialog-checkin-success abs center hide')
    })
  },

  _bindEvent() {
    this.el.on('click', '.button.checkin', (e) => {
      this._createDialog()
      this.dialog.show()
    })
    this.el.on('click', '.button.exchange', (e) => {
      this.app.go('exchange')
    })
    this.el.on('click', '.button.callin', (e) => {
      this.app.go('callin')
    })
  },

  destroy() {
    this.el.off()
  }
  
}