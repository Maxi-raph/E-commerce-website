// ===============================
// DOM ELEMENTS
// ===============================
const heading = document.querySelector('#home-text h2')
const paragraph = document.querySelector('#home-text p')
const slideContain = document.querySelector('.slide-contain')
const slideContents = document.querySelectorAll('.slide-content')
const slidesTrack = document.querySelector('.slides-track')
const hamburger = document.getElementById('hamburger')

const features = document.querySelectorAll('.features')
const shops = document.querySelectorAll('.shops')
const productsContainer = document.querySelectorAll('.products-container')

const productTrack = document.querySelector('.products-track')
const products = document.querySelectorAll('.products')
const addCarts = document.querySelectorAll('.add-cart')
const hideCashes = document.querySelectorAll('.hide-cash')
const imgContainers = document.querySelectorAll('.img-container')
const heartIcons = document.querySelectorAll('.hearts')
const slideDots = document.querySelectorAll('.slider-dots')

const productTrack2 = document.querySelector('.products-track2')
const products2 = document.querySelectorAll('.products2')
const addCarts2 = document.querySelectorAll('.add-cart2')
const hideCashes2 = document.querySelectorAll('.hide-cash2')
const imgContainers2 = document.querySelectorAll('.img-container2')
const heartIcons2 = document.querySelectorAll('.hearts2')
const slideDots2 = document.querySelectorAll('.slider-dots2')


// ===============================
// SLIDER HELPERS
// ===============================
let index = 0
let startX = 0
let endX = 0

function touchstart(event, track) {
  startX = event.touches[0].clientX
  track.style.transition = 'none'
}

function touchmove(event, width, track) {
  endX = event.touches[0].clientX
  delta = endX - startX
  let offset = -index * width + delta
  track.style.transform = `translateX(${offset}px)`
}

function touchend(track, contents, width, dots = []) {
  delta = endX - startX
  
  if (delta < -50 && index < contents.length - 2) {
    index++
  } else if (delta > 50 && index > 0) {
    index--
  }
  
  track.style.transition = 'transform 0.6s ease'
  track.style.transform = `translateX(${-index * width}px)`
  
  dots.forEach(dot => {
    dot.classList.remove('bg-stone-400')
    dots[index].classList.add('bg-stone-400')
  })
}

function slidesTouchend(track, contents, width) {
  delta = endX - startX
  
  if (delta < -50 && index < contents.length) {
    index++
    if (index == contents.length) index = 0
  } else if (delta > 50 && index > -1) {
    index--
    if (index == -1) index = contents.length - 1
  }
  
  track.style.transition = 'transform 0.6s ease'
  track.style.transform = `translateX(${-index * width}px)`
}


// ===============================
// HERO SECTION ANIMATIONS
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  heading.classList.replace('translate-y-32', 'translate-y-0')
  heading.classList.add('opacity-100')
  
  hamburger.classList.add('translate-x-0', 'opacity-100')
  
  setTimeout(() => {
    paragraph.classList.replace('translate-y-32', 'translate-y-0')
    paragraph.classList.add('opacity-100')
  }, 200)
  
  setTimeout(() => {
    slideContain.classList.replace('translate-y-32', 'translate-y-0')
    slideContain.classList.add('opacity-100')
  }, 300)
})


// ===============================
// SLIDE TOUCH HANDLERS
// ===============================
let slideStyle = window.getComputedStyle(slideContents[0])
let gap = parseInt(slideStyle.marginRight) || 0
let slideWidth = slideContents[0].offsetWidth + gap

slideContents.forEach(content => {
  content.addEventListener('touchstart', (e) => {
    let img = e.currentTarget.querySelector('img')
    img.classList.toggle('scale-95')
  })
})

slidesTrack.addEventListener('touchstart', (e) => { touchstart(e, slidesTrack) })
slidesTrack.addEventListener('touchmove', (e) => { touchmove(e, slideWidth, slidesTrack) })
slidesTrack.addEventListener('touchend', () => { slidesTouchend(slidesTrack, slideContents, slideWidth) })


// ===============================
// INTERSECTION OBSERVERS
// ===============================
let observer1 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const i = Array.from(features).indexOf(entry.target)
      setTimeout(() => {
        entry.target.classList.add('opacity-100')
      }, i * 300)
    }
  })
}, { threshold: 0.5 })

features.forEach(feature => observer1.observe(feature))


let observer2 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('scale-[1.2]')
      entry.target.classList.add('opacity-100', 'scale-95')
    }
  })
}, { threshold: 0 })

shops.forEach(shop => observer2.observe(shop))


let observer3 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('scale-0', 'opacity-0')
      entry.target.classList.add('opacity-100', 'scale-100')
    }
  })
}, { threshold: 1 })

let trackObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      index = 0
      productTrack.style.transition = 'transform 0.6s ease'
      productTrack.style.transform = `translateX(0px)`
      slideDots.forEach(dot => dot.classList.remove('bg-stone-400'))
      slideDots[0].classList.add('bg-stone-400')
      productTrack2.style.transition = 'transform 0.6s ease'
      productTrack2.style.transform = `translateX(0px)`
      slideDots2.forEach(dot => dot.classList.remove('bg-stone-400'))
      slideDots2[0].classList.add('bg-stone-400')
      slidesTrack.style.transition = 'transform 0.6s ease'
      slidesTrack.style.transform = `translateX(0px)`
    }
  })
}, { threshold: 0 })

productsContainer.forEach(container => {
  trackObserver.observe(container)
})
trackObserver.observe(slideContain)

productsContainer.forEach(container => observer3.observe(container))


// ===============================
// PRODUCT CLICK HANDLERS
// ===============================
products.forEach(product => {
  product.addEventListener('click', (e) => {
    e.stopPropagation()
    let addCart = product.querySelector('.add-cart')
    let hideCash = product.querySelector('.hide-cash')
    let imgContainer = product.querySelector('.img-container')
    let heartIcon = product.querySelector('.hearts')
    
    if (hideCash.classList.contains('translate-y-[-20px]')) {
      if (e.target.classList.contains('hearts')) {
        e.target.classList.add('text-red-500')
        e.target.classList.remove('hidden')
        //I'll add the favorites in an array here so that once i click the heart icon at the top, i'll go to a site where all the favourites are in a row
        return
      }
      window.location.href = ''
    } else {
      clickedProduct(e, addCarts, hideCashes, imgContainers, heartIcons)
      hideCash.classList.add('translate-y-[-20px]')
      addCart.classList.add('translate-y-[-23px]')
      imgContainer.classList.add('scale-[0.9]')
      heartIcon.classList.remove('hidden')
    }
  })
})

products2.forEach(product => {
  product.addEventListener('click', (e) => {
    e.stopPropagation()
    let addCart = product.querySelector('.add-cart2')
    let hideCash = product.querySelector('.hide-cash2')
    let imgContainer = product.querySelector('.img-container2')
    let heartIcon = product.querySelector('.hearts2')
    
    if (hideCash.classList.contains('translate-y-[-20px]')) {
      if (e.target.classList.contains('hearts2')) {
        e.target.classList.add('text-red-500')
        e.target.classList.remove('hidden')
        //I'll add the favorites in an array here so that once i click the heart icon at the top, i'll go to a site where all the favourites are in a row
        return
      }
      window.location.href = ''
    } else {
      clickedProduct(e, addCarts2, hideCashes2, imgContainers2, heartIcons2)
      hideCash.classList.add('translate-y-[-20px]')
      addCart.classList.add('translate-y-[-23px]')
      imgContainer.classList.add('scale-[0.9]')
      heartIcon.classList.remove('hidden')
    }
  })
})

function clickedProduct(e, addCarts, hideCashes, imgContainers, heartIcons) {
  addCarts.forEach(cart => cart.classList.remove('translate-y-[-23px]'))
  hideCashes.forEach(cash => cash.classList.remove('translate-y-[-20px]'))
  imgContainers.forEach(contain => contain.classList.remove('scale-[0.9]'))
  heartIcons.forEach(heart => heart.classList.add('hidden'))
}


// ===============================
// DOCUMENT CLICK RESET
// ===============================
document.addEventListener('click', () => {
  addCarts.forEach(cart => cart.classList.remove('translate-y-[-23px]'))
  hideCashes.forEach(cash => cash.classList.remove('translate-y-[-20px]'))
  imgContainers.forEach(contain => contain.classList.remove('scale-[0.9]'))
  heartIcons.forEach(heart => heart.classList.add('hidden'))
  
  addCarts2.forEach(cart => cart.classList.remove('translate-y-[-23px]'))
  hideCashes2.forEach(cash => cash.classList.remove('translate-y-[-20px]'))
  imgContainers2.forEach(contain => contain.classList.remove('scale-[0.9]'))
  heartIcons2.forEach(heart => heart.classList.add('hidden'))
})


// ===============================
// PRODUCT SLIDER TOUCH
// ===============================
let productsStyle = window.getComputedStyle(products[0])
let prodGap = parseInt(productsStyle.marginRight) || 0
let prodWidth = products[0].offsetWidth + prodGap

productTrack.addEventListener('touchstart', (e) => { touchstart(e, productTrack) })
productTrack.addEventListener('touchmove', (e) => { touchmove(e, prodWidth, productTrack) })
productTrack.addEventListener('touchend', () => { touchend(productTrack, products, prodWidth, slideDots) })


let productsStyle2 = window.getComputedStyle(products2[0])
let prodGap2 = parseInt(productsStyle2.marginRight) || 0
let prodWidth2 = products2[0].offsetWidth + prodGap2

productTrack2.addEventListener('touchstart', (e) => { touchstart(e, productTrack2) })
productTrack2.addEventListener('touchmove', (e) => { touchmove(e, prodWidth2, productTrack2) })
productTrack2.addEventListener('touchend', () => { touchend(productTrack2, products2, prodWidth2, slideDots2) })