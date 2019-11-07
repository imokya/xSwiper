export default {

  init() {
    this._bindEvent()
  },

  _bindEvent() {
    $('.headup').on('click', '.headup-music', (e) => {
      const audio = $('#music')[0]
      const target = $(e.target)
      if (audio.paused) {
        audio.play()
        target.removeClass('off')
      } else {
        audio.pause()
        target.addClass('off')
      }
    })
  }
  
}

