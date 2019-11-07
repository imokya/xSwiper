import Swiper from 'swiper'
import $ from 'zepto-webpack'
import Wechat from './utils/wechat'

import config from 'root/app.json'
import manifest from './manifest.json'
import Router from './utils/router'
import Event from './utils/event'
import 'swiper/css/swiper.min.css'
import './css/app.styl'
import global from './global'

let router, swiper
const speed = 600

const app = {

  init() {
    this.initRouter()
    this.initAssets()
    this.initSlides()
    this.initSwiper()
  },

  initRouter() {
    router = new Router({
      mode: config.hash ? 'hash' : ''
    })
    router.add(':path', (path)=> {
      const index = this.slidePaths.indexOf(path)
      swiper.slideTo(index)
    })
    router.listen()
  },

  go(path) {
    const index = this.slidePaths.indexOf(path)
    swiper.slideTo(index, speed)
  },

  initAssets() {
    this.assets = []
    this.getAssets(manifest, this.assets)
  },

  getAssets(arr, assets) {
    arr.forEach((item) => {
      if(typeof(item) === 'string') {
        assets.push(`${item}?v=${config.version}`)
      } else {
        this.getAssets(Object.values(item)[0], assets)
      }
    })
  },

  initSlides() {
    this.rootEl = document.createElement('div')
    this.wrapEl = document.createElement('div')
    this.rootEl.classList.add('swiper-container')
    this.wrapEl.classList.add('swiper-wrapper')
    this.slideElems = []
    this.slidePaths = []
    this.slides = []

    config.pages.forEach((page) => {
      const tempEl = document.createElement('div')
      const el = require(`root/src/${page}/index.html`)
      const slide = require(`root/src/${page}/index`)
      const style = require(`root/src/${page}/index.styl`)
      tempEl.innerHTML = el
      if(Object.keys(style).length > 0) {
        const c1 = Object.keys(style)[0]
        const c2 = Object.values(style)[0]
        tempEl.firstChild.classList.add(c1, c2)
      } 
      slide.default.app = app
      const slidePath = page.split('/')[1]
      slide.default.path = slidePath
      this.initPageAssets(slide.default, page)
      this.slides.push(slide.default)
      this.slidePaths.push(slidePath)
      this.slideElems.push(tempEl.innerHTML)
    })
    this.rootEl.appendChild(this.wrapEl)
    this.appEl = document.querySelector('#app')
    this.appEl.appendChild(this.rootEl)
  },

  initPageAssets(slideObj, path) {
    let page = path.split('/')[1]
    let assets = []
    for(let item of manifest) {
      if(typeof(item) === 'object') {
        if(Object.keys(item)[0] === page) {
          this.getAssets(Object.values(item)[0], assets)
        }
      }
    }
    slideObj.assets = assets
  },

  initSwiper() { 
    const path = router.path.split('/')[0] || 
                 this.slidePaths[0]
    const slideIndex = this.slidePaths.indexOf(path)
    this.swiper = swiper = new Swiper('.swiper-container', {
      speed,
      effect: 'cube',
      allowTouchMove: false,
      runCallbacksOnInit: false,
      preventInteractionOnTransition: true,
      initialSlide: slideIndex,
      fadeEffect: {
        crossFade: false
      },
      direction: 'vertical',
      loop: false,
      virtual: {
        slides: this.slideElems
      },
      on: {
        init() {
          const curSlide = app.slides[slideIndex]
          curSlide.el = this.slides[slideIndex].firstChild
          if (curSlide) {
            curSlide.init && curSlide.init()
            curSlide.mounted && curSlide.mounted()
          }
          router.go(curSlide.path)
        },
        slideChange() {
          const curSlide = app.slides[this.activeIndex]
          if (curSlide) {
            curSlide.init && curSlide.init()
          }
          router.go(curSlide.path)
        },
        slideChangeTransitionEnd() {
          const preSlide = app.slides[this.previousIndex] 
          if (preSlide && preSlide.destroy) preSlide.destroy()
        },
        slideChangeTransitionStart() {
          const curSlide = app.slides[this.activeIndex] 
          curSlide.el = document.querySelector('.swiper-slide-active').firstChild
          if (curSlide && curSlide.mounted) curSlide.mounted()
        }
      }
    })

  }

}

global.init()
app.init()

app.config = config
app.router = router
window.Wechat = Wechat
window.app = app
