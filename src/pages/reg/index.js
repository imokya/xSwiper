import Dialog from 'src/utils/dialog'
import Alert from 'src/utils/alert'
import axios from 'axios'
import BScroll from 'better-scroll'

let agree = false
const COUNT_TIME = 5

export default {

  mounted() {
    this.el = $(this.el)
    this.count = COUNT_TIME  
    if (!this.dialog) {
      this.dialog = new Dialog({
        cancel: false,
        el: $(this.el).find('.dialog')
      })  
    }
    this._bindEvent()
  },

  _bindEvent() {
    this.el.on('click', '.reg-term', (e) => {
      this.dialog.show()
      this._loadTerm()
    })
    this.el.on('click', '.button.unlock', (e) => {
      this._validate()
    })
    this.el.on('click', '.button.code', (e) => {
      this._getCode()
    })
    $(document).on('click', '.button.yes', (e) => {
      agree = true
      this._setTerm()
    })
    $(document).on('click', '.button.no', (e) => {
      agree = false
      this._setTerm()
    })
  },

  _getCode() {
    if (this.waiting) return
    const telEl = this.el.find('input[name=tel]')
    const tel = $.trim(telEl.val())
    if (!/^[0-9]{11}$/.test(tel)) {
      Alert.show('电话格式不正确')
      return
    }
    this._countDown()
  },

  _countDown() {
    this.waiting = true
    const butCode = this.el.find('.button.code')
    if (this.count > 0) {
      butCode.text(`${this.count}s`)
      setTimeout(this._countDown.bind(this), 1000)
      this.count--
    } else {
      this.count = COUNT_TIME
      this.waiting = false
      butCode.text('获取验证码')
    }
  },

  _validate() {
    if (!agree) {
      Alert.show('请先同意条款')
      return
    }
    this.app.go('puzzle')
  },

  _setTerm() {
    const el = this.el.find('.reg-term')
    agree ? el.addClass('agree') : el.removeClass('agree')
    this.dialog.hide()
  },

  async _loadTerm() {
    this.dialog.el.removeClass('hide')
    const res = await axios.get('term.html')
    const el = this.dialog.el.find('.term-content')
    el.html(res.data)
    setTimeout(() => {
      this._setScroll()
    })
  },

  _setScroll() {
    this._destroyScroll()
    this.scroll = new BScroll('.scroll', {
      bounce: false,
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
    this.dialog.destroy()
    this.dialog = null
    $(document).off()
  }
  
}