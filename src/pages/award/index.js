
export default {

  mounted() {
    this.el = $(this.el)
    this._bindEvent()
  },

  _bindEvent() {
    this.el.on('click', '.button.back', (e) => {
      this.app.go('puzzle')
    })
  },

  destroy() {

    this.el.off()
  }
  
}