export default {

  mounted() {
    this.el = $(this.el)
    this._bindEvent()
  },

  _bindEvent() {
    this.el.on('click', '.button.share', (e) => {
      console.log('share')
    })
  },

  destroy() {
    this.el.off()
  }
  
}