class LoadingDialog {

  constructor(_conf) {
    this.conf = Object.assign({
      cancel: false
    }, _conf)
    this._initDom()
    this._bindEvent()
  }

  _cleanup() {
    const overlay = $('.overlay')
    overlay.off()
    overlay.remove()
  }

  _initDom() {
    this._cleanup()
    this.overlay = $('<div>').addClass('hide overlay')
    this.overlay.css({
      top: 0,
      zIndex: 20,
      width: '750px',
      height: '100%',
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.95)'
    })
    const el = $('<div>').addClass('dialog dialog-loading hide center abs')
    el.css({
      width: '589px',
      height: '182px',
      color: '#fff',
      background: 'url(img/loading.png) no-repeat'
    })
    const spinnerEl = $('<div>').addClass('spinner')
    spinnerEl.css({
      marginRight: '30px'
    })
    el.append(spinnerEl)
    const loadingMsgEl =  $('<div>').addClass('loading-msg')
    loadingMsgEl.html(this.conf.title)
    el.append(loadingMsgEl)
    this.overlay.append(el)
    $('#app').append(this.overlay)
    this.spinnerEl = spinnerEl
    this.loadingMsgEl = loadingMsgEl
    this.el = el
  }

  done() {
    this.spinnerEl.remove()
    this.loadingMsgEl.html('操作成功')
  }

  _bindEvent() {
    this.overlay.on('click', (e) => {
      if (this.conf.cancel)
        this.overlay.addClass('hide')
    })
  }

  hide() {
    this.overlay.removeClass('fadeIn')
    this.overlay.addClass('hide')
    this.el.addClass('hide')
  }

  show() {
    this.overlay.addClass('fadeIn')
    this.overlay.removeClass('hide')
    this.el.removeClass('hide')
  }

  destroy() {
    if(this.overlay) {
      this.overlay.off()
      this.overlay.remove()
    }
  　this.el && this.el.remove()
  }

}

export default LoadingDialog