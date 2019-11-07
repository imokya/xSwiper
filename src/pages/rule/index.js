import BScroll from 'better-scroll'

export default {

  mounted() {
    this.el = $(this.el)
    this._setScroll()
    this._bindEvent()
  },

  _bindEvent() {
    this.el.on('click', '.button.unlock', (e) => {
      this.app.go('puzzle')
    })
  },
  
  _setScroll() {
    this._destroyScroll()
    this.scroll = new BScroll('.rule-scroll', {
      bounce: false,
      scrollY: true,
      scrollbar: {
        fade: false
      }
    })
  },

  _destroyScroll() {
    if (this.scroll) {
      this.scroll.scrollTo(0, 0)
      this.scroll.destroy()
    }
  },

  destroy() {
    this._destroyScroll()
    this.el.off()
  }
  
}