import config from 'root/app.json'
import manifest from './manifest.json'
import 'styles/app.scss'

let swiper

const app = {

  init() {
    this.initAssets()
    this.createDoms()
    this.createSwiper()
  },

  initAssets() {
    this.assets = []
    this.getAssets(manifest, this.assets)
  },

  getAssets(arr, assets) {
    arr.forEach((item) => {
      if(typeof(item) === 'string') {
        assets.push(item)
      } else {
        this.getAssets(Object.values(item)[0], assets)
      }
    })
  },

  createDoms() {
    this.rootEl = document.createElement('div')
    this.wrapEl = document.createElement('div')
    this.rootEl.classList.add('swiper-container')
    this.wrapEl.classList.add('swiper-wrapper')
    this.slideElems = []
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
      this.initPageAssets(slide.default, page)
      this.slides.push(slide.default)
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

  createSwiper() { 
    swiper = new Swiper('.swiper-container', {
      effect: 'fade',
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
          const curSlide = app.slides[0]
          if(curSlide && curSlide.init) curSlide.init()
          if(curSlide.hash) {
            location.hash = curSlide.hash
          }
        },
        transitionStart() {
          const curSlide = app.slides[swiper.activeIndex]
          if(curSlide && curSlide.init) curSlide.init()
          if(curSlide.hash) {
            location.hash = curSlide.hash
          }
        },
        transitionEnd() {
          const curSlide = app.slides[swiper.realIndex]
          const preSlide = app.slides[swiper.previousIndex] 
          if(preSlide && preSlide.destroy) preSlide.destroy()
          if(curSlide && curSlide.start) curSlide.start()
        }
      }
    })
  }

}

app.init()
