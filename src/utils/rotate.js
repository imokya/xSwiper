export default {

  init() {
    this._createDom()
    this._bindEvent()
  },

  _bindEvent() {
    $(window).on('orientationchange', (e) => {
      console.log(window.orientation % 90)
      const ori = window.orientation
      if (ori == 90 || ori == -90) {
        this.el.removeClass('hide')
      } else {
        this.el.addClass('hide')
      }
    })
  },

  _createDom() {
    const el = $('<div>').addClass('orientation-tip hide')
    el.css({
      position: 'absolute',
      top: '0px',
      width: '100%',
      height: '100%',
      zIndex: 30,
      background: '#000'
    })
    const tipEl = $('<div>')
    const imgURL = require('img/rotate.png')
    tipEl.css({
      width: '194px',
      height: '183px',
      margin: 'auto',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      background: `url(${imgURL}) no-repeat`
    })
    el.append(tipEl)
    $('body').append(el)
    this.el = el
  }

}