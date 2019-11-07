export default {

  mounted() {
    this.el = $(this.el)
    this._bindEvent()
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