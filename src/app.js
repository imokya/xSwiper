import Swiper from 'swiper'
import $ from 'zepto-webpack'

import config from 'root/app.json'
import manifest from './manifest.json'
import Router from './utils/router'
import Event from './utils/event'
import 'swiper/dist/css/swiper.min.css'
import 'styles/app.scss'


let router, swiper

const app = {

  init() {
    this.initRouter()
    this.initAssets()
    this.initSlides()
    this.initSwiper()
  },

  initRouter() {
    router = new Router()
    router.add(':path', (path)=> {
      const index = this.slidePaths.indexOf(path)
      swiper.slideTo(index)
    })
    router.listen()
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
      const el = require(`root/${page}/index.html`)
      const slide = require(`root/${page}/index`)
      const style = require(`root/${page}/index.scss`)
      tempEl.innerHTML = el
      if(Object.keys(style).length > 0) {
        const c1 = Object.keys(style)[0]
        const c2 = Object.values(style)[0]
        tempEl.firstChild.classList.add(c1, c2)
      } 
      slide.default.app = app
      slide.default.el = tempEl.firstChild
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
    let inited = false
    swiper = new Swiper('.swiper-container', {
      effect: 'fade',
      initialSlide: slideIndex,
      fadeEffect: {
        crossFade: true
      },
      direction: 'vertical',
      loop: false,
      virtual: {
        slides: this.slideElems
      },
      on: {
        init() {
          const curSlide = app.slides[slideIndex]
          if(curSlide && curSlide.init) curSlide.init()
          router.go(curSlide.path)
          inited = true
        },
        slideChange() {
          if(inited) {
            const curSlide = app.slides[swiper.activeIndex]
            if(curSlide && curSlide.init) curSlide.init()
            router.go(curSlide.path)
          }
        },
        slideChangeTransitionEnd() {
          if(inited) {
            const curSlide = app.slides[swiper.activeIndex]
            const preSlide = app.slides[swiper.previousIndex] 
            if(preSlide && preSlide.destroy) preSlide.destroy()
            if(curSlide && curSlide.start) curSlide.start()
          }
          inited = true
        }
      }
    })
  }
}

app.init()

app.config = config
app.router = router
window.app = app
