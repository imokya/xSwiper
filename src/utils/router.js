let options, routes = []
let hashChangeHandler

class Router {

  constructor(params) {
    options = Object.assign({
      prefix: '/',
      mode: 'hash'
    }, params)
  }

  go(path) {
    location.hash = options.prefix + path
  }

  check() {
    for(let route of routes) {
      route.re = route.re.replace(/:[^\/]+/ig, '([^\/]+)')
      route.re = route.re.replace('/', '\\/')
      const matches = this.path.match(route.re)
      if(matches) {
        matches.shift()
        route.func.apply({}, matches)
      }
    }
  }

  listen() {
    hashChangeHandler = this._onHashChange.bind(this)
    window.addEventListener('hashchange', hashChangeHandler)
  }

  add(re, func) {
    const isExist = this._isExist(re, func)
    if(!isExist) {
      routes.push({re, func})
    }
  }

  remove(re, func) {
    for(let i of routes) {
      const route = routes[i]
      if(re === route.re && func === route.func) {
        routes.splice(i, 1)
        break
      }
    }
  }

  destroy() {
    routes = []
    window.removeEventListener('hashchange', hashChangeHandler)
  }

  get path() {
    return location.hash.replace(/^#\//, '')
  }

  _onHashChange() {
    this.check()
  }

  _isExist(re, func) {
    for(let route of routes) {
      if(re === route.re && func === re.func) {
        return true
      }
    }
    return false
  }

}

export default Router