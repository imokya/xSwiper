import Alert from 'src/utils/alert'
import Dialog from 'src/utils/dialog'


export default {

  mounted() {
    this.el = $(this.el)
    this._createDialog()
    this._bindEvent()
  },

  _createDialog() {
    if (!this.successDialog) {
      this.successDialog = new Dialog({
        el: $('<div>').addClass('dialog-exchange-success abs center hide')
      })
    }
    if (!this.failDialog) {
      this.failDialog = new Dialog({
        el: $('<div>').addClass('dialog-exchange-fail abs center hide')
      })
    }
  },

  _bindEvent() {
    this.el.on('click', '.button.back', (e) => {
      this.app.go('unlock')
    })
    this.el.on('click', '.button.confirm', (e) => {
      this._validate()
    })
  },

  _validate() {
    const codeEl = this.el.find('input[name=code]')
    const code = $.trim(codeEl.val())
    if (code === '') {
      Alert.show('请输入兑换码')
      return
    }
    this.failDialog.show()
  },

  destroy() {
    this.el.off()
    this.successDialog.destroy()
    this.successDialog = null
    this.failDialog.destroy()
    this.failDialog = null
  }
  
}