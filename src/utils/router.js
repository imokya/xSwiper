import Event from './event'

let _options, _routes = []
let _hashChangeHandler

class Router extends Event {

  constructor(params) {
    super()
    _options = Object.assign({
      prefix: '/',
      mode: 'hash'
    }, params)
  }

  go(path) {
    if (_options.mode === 'hash')
      location.hash = _options.prefix + path
  }

  check() {
    for(let route of _routes) {
      route.re = route.re.replace(/:[^\/]+/ig, '([^\/]+)')
      route.re = route.re.replace('/', '\\/')
      const matches = this.path.match(route.re)
      if(matches) {
        matches.shift()
        route.func.apply({}, matches)
        this.emit('change')
      }
    }
  }

  listen() {
    _hashChangeHandler = this._onHashChange.bind(this)
    window.addEventListener('hashchange', _hashChangeHandler)
  }

  add(re, func) {
    const isExist = this._isExist(re, func)
    if(!isExist) {
      _routes.push({re, func})
    }
  }

  remove(re, func) {
    for(let i of _routes) {
      const route = _routes[i]
      if(re === route.re && func === route.func) {
        _routes.splice(i, 1)
        break
      }
    }
  }

  destroy() {
    routes = []
    window.removeEventListener('hashchange', _hashChangeHandler)
  }

  get path() {
    return location.hash.replace(/^#\//, '')
  }

  _onHashChange() {
    this.check()
  }

  _isExist(re, func) {
    for(let route of _routes) {
      if(re === route.re && func === re.func) {
        return true
      }
    }
    return false
  }

}

export default Router