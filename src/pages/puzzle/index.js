export default {

  mounted() {
    this.el = $(this.el)
    this._bindEvent()
    this._initPuzzle()
  },

  _initPuzzle() {
    const progress = 25
    const el = this.el.find('.progress-percent')
    const puzzleEl = this.el.find('.puzzle')
    const puzzleImgUrl = `${progress/5|0}.jpg` 
    el.css({
      width: `${progress}%`
    })
    puzzleEl.css({
      background: `url('img/puzzle/puzzles/${puzzleImgUrl}') no-repeat`
    })
  },

  _bindEvent() {
    this.el.on('click', '.button.rule', (e) => {
      this.app.go('rule')
    })
    this.el.on('click', '.button.ben', (e) => {
      this.app.go('claim')
    })
    this.el.on('click', '.button.pet', (e) => {
      this.app.go('award')
    })
    this.el.on('click', '.button.ulk', (e) => {
      this.app.go('unlock')
    })
  },
  
  destroy() {
    this.el.off()
  }
  
}