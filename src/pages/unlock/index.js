import Dialog from 'src/utils/dialog'

export default {

  mounted() {
    this.el = $(this.el)
    if (!this.dialog) {
      this.dialog = new Dialog({
        el: $('<div>').addClass('dialog-checkin-success abs center hide')
      })
    }
    this._bindEvent()
  },

  _bindEvent() {
    this.el.on('click', '.button.checkin', (e) => {
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
    this.dialog.destroy()
    this.dialog = null
  }
  
}