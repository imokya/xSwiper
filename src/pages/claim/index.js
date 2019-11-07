import Alert from 'src/utils/alert'

let sex = 1

export default {

  mounted() {
    this.el = $(this.el)
    this._bindEvent()
  },

  _bindEvent() {
    this.el.on('click', '.sex>div', (e) => {
      const target = $(e.target)
      $('.sex>div').removeClass('active')
      $(e.target).addClass('active')
      sex = $(e.target).index()
    })
    this.el.on('click', '.button.save', (e) => {
      this._validate()
    })
    this.el.on('click', '.button.back', (e) => {
      this.app.go('unlock')
    })
  },

  _validate() {
    const nameEl = this.el.find('input[name=name]')
    const ageEl = this.el.find('input[name=age]')
    const telEl = this.el.find('input[name=tel]')
    const adrEl = this.el.find('input[name=adr]')
    const name = $.trim(nameEl.val())
    const age = $.trim(ageEl.val())
    const tel = $.trim(telEl.val())
    const adr = $.trim(adrEl.val())
    if(name === '' || age === '' || adr === '') {
      Alert.show('请填写完整信息')
      return
    }
    if (!/^[0-9]{11}$/.test(tel)) {
      Alert.show('电话号码格式不正确')
      return
    }
  },

  destroy() {
    this.el.off()
  }
  
}