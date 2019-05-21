class Event {
  
  constructor(params) {
    this._listeners = {}
  }

  on(type, func) {
    if(!this._listeners[type]) {
      this._listeners[type] = []
    }
    this._listeners[type].push(func)
  }

  emit(type) {
    const arr = this._listeners[type]
    if(arr) {
      for(let func of arr) {
        const params = [].slice.call(arguments, 1)
        func.apply({}, params)
      }
    }
  }

  off(type, func) {
    const arr = this._listeners[type]
    if(arr) {
      if(func) {
        for(let i = 0; i< arr.length; i++) {
          const f = arr[i]
          if(func === f) {
            arr.splice(i, 1)
          }
        }
      } else {
        this._listeners[type] = null
      }
    }
  }

  once(type, func) {
    const that = this
    this.on(type, function f() {
      func.apply({}, arguments)
      that.off(type, f)
    })
  }
}

export default Event