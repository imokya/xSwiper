class Alert {

  _createDom() {
    const el = $('<div>').addClass('alert hide fadeIn')
    el.css({
      width: '400px',
      padding: '20px',
      height: '50px',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 20,
      margin: 'auto',
      color: '#fff',
      position: 'absolute',
      textAlign: 'center',
      borderRadius: '5px',
      background: 'rgba(0, 0, 0, 0.95)'
    })
    $('#app').append(el)
    this.el = el
  }

  show(msg) {
    clearTimeout(this.id)
    $('.alert').remove()
    this._createDom()
    this.el.html(msg)
    this.el.removeClass('hide')
    this.id = setTimeout(() => {
      this.el.remove()
    }, 1000)
  }

}

export default new Alert