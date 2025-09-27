// ===============================
// DOM ELEMENTS
// ===============================
const heading = document.querySelector('#home-text h2')
const paragraph = document.querySelector('#home-text p')
const heroContain = document.querySelector('.slide-contain')
const heroContents = document.querySelectorAll('.slide-content')
const heroTrack = document.querySelector('.slides-track')
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
let heroIndexRef = { value: 0 }
let prodIndexRef = { value: 0 }
let prodIndex2Ref = { value: 0 }
let startX = 0
let endX = 0

function touchstart(event, track) {
  startX = event.touches[0].clientX
  track.style.transition = 'none'
}

function touchmove(event, width, track,indexRef) {
  endX = event.touches[0].clientX
  delta = endX - startX
  let offset = -indexRef.value * width + delta
  track.style.transform = `translateX(${offset}px)`
}

function touchend(track, contents, width, dots = [],indexRef) {
  delta = endX - startX
  if (delta < -50 && indexRef.value < contents.length - 2) {
    indexRef.value++
  } else if (delta > 50 && indexRef.value > 0) {
    indexRef.value--
  }
  
  track.style.transition = 'transform 0.6s ease'
  track.style.transform = `translateX(${-indexRef.value * width}px)`
  
  dots.forEach(dot => {
    dot.classList.remove('bg-stone-400')
    dots[indexRef.value].classList.add('bg-stone-400')
  })
}

function heroTouchend(track, contents, width,indexRef) {
  delta = endX - startX
  console.log(indexRef)
  if (delta < -50 && indexRef.value < contents.length) {
    indexRef.value++
    if (indexRef.value == contents.length) indexRef.value = 0
  } else if (delta > 50 && indexRef.value > -1) {
    indexRef.value--
    if (indexRef.value == -1) indexRef.value = contents.length - 1
  }
  
  track.style.transition = 'transform 0.6s ease'
  track.style.transform = `translateX(${-indexRef.value * width}px)`
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
    heroContain.classList.replace('translate-y-32', 'translate-y-0')
    heroContain.classList.add('opacity-100')
  }, 300)
})


// ===============================
// SLIDE TOUCH HANDLERS
// ===============================
let heroStyle = window.getComputedStyle(heroContents[0])
let gap = parseInt(heroStyle.marginRight) || 0
let heroWidth = heroContents[0].offsetWidth + gap

heroContents.forEach(content => {
  content.addEventListener('touchstart', (e) => {
    let img = e.currentTarget.querySelector('img')
    img.classList.toggle('scale-95')
  })
})

heroTrack.addEventListener('touchstart', (e) => { touchstart(e, heroTrack) })
heroTrack.addEventListener('touchmove', (e) => { touchmove(e, heroWidth, heroTrack,heroIndexRef) })
heroTrack.addEventListener('touchend', () => { heroTouchend(heroTrack, heroContents, heroWidth,heroIndexRef) })


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
      heroIndexRef.value = 0
      prodIndexRef.value = 0
      prodIndex2Ref.value = 0
      productTrack.style.transition = 'transform 0.6s ease'
      productTrack.style.transform = `translateX(0px)`
      slideDots.forEach(dot => dot.classList.remove('bg-stone-400'))
      slideDots[0].classList.add('bg-stone-400')
      productTrack2.style.transition = 'transform 0.6s ease'
      productTrack2.style.transform = `translateX(0px)`
      slideDots2.forEach(dot => dot.classList.remove('bg-stone-400'))
      slideDots2[0].classList.add('bg-stone-400')
      heroTrack.style.transition = 'transform 0.6s ease'
      heroTrack.style.transform = `translateX(0px)`
    }
  })
}, { threshold: 0 })

productsContainer.forEach(container => {
  trackObserver.observe(container)
})
trackObserver.observe(heroContain)

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
productTrack.addEventListener('touchmove', (e) => { touchmove(e, prodWidth, productTrack,prodIndexRef) })
productTrack.addEventListener('touchend', () => { touchend(productTrack, products, prodWidth, slideDots,prodIndexRef) })


let productsStyle2 = window.getComputedStyle(products2[0])
let prodGap2 = parseInt(productsStyle2.marginRight) || 0
let prodWidth2 = products2[0].offsetWidth + prodGap2

productTrack2.addEventListener('touchstart', (e) => { touchstart(e, productTrack2) })
productTrack2.addEventListener('touchmove', (e) => { touchmove(e, prodWidth2, productTrack2,prodIndex2Ref) })
productTrack2.addEventListener('touchend', () => { touchend(productTrack2, products2, prodWidth2, slideDots2,prodIndex2Ref) })