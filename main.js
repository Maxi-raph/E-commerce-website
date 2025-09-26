const heading = document.querySelector('#home-text h2')
const paragraph = document.querySelector('#home-text p')
const slideContain = document.querySelector('.slide-contain')
const slideContents = document.querySelectorAll('.slide-content')
const slidesTrack = document.querySelector('.slides-track')
const hamburger = document.getElementById('hamburger')
const features = document.querySelectorAll('.features')
const shops = document.querySelectorAll('.shops')
const productsContainer = document.querySelector('.products-container')
const productTrack = document.querySelector('.products-track')
const products = document.querySelectorAll('.products')
const addCarts = document.querySelectorAll('.add-cart')
const hideCashes = document.querySelectorAll('.hide-cash')
const imgContainers = document.querySelectorAll('.img-container')
const heartIcons = document.querySelectorAll('.hearts')
const slideDots = document.querySelectorAll('.slider-dots')

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


function touchend(track, contents, width,dots) {
  delta = endX - startX
  if (delta < -50 && index < contents.length - 2) {
    index++
  }
  else if (delta > 50 && index > 0) {
    index--
  }
  track.style.transition = 'transform 0.6s ease'
  track.style.transform = `translateX(${-index * width}px)`
  dots.forEach(dot=>{
    dot.classList.remove('bg-green-700')
    dots[index].classList.add('bg-green-700')
  })
}
//hero section
let index = 0
let startX = 0
let endX = 0
let slideStyle = window.getComputedStyle(slideContents[0]);
let gap = parseInt(slideStyle.marginRight) || 0;
let slideWidth = slideContents[0].offsetWidth + gap;


document.addEventListener("DOMContentLoaded", () => {
  heading.classList.replace('translate-y-32', 'translate-y-0');
  heading.classList.add('opacity-100')
  hamburger.classList.add('translate-x-0', 'opacity-100')
  setTimeout(() => {
    paragraph.classList.replace('translate-y-32', 'translate-y-0');
    paragraph.classList.add('opacity-100')
  }, 200)
  setTimeout(() => {
    slideContain.classList.replace('translate-y-32', 'translate-y-0');
    slideContain.classList.add('opacity-100')
  }, 300)
});

slideContents.forEach(content => {
  content.addEventListener('touchstart', (e) => {
    let img = e.currentTarget.querySelector('img')
    img.classList.toghle('scale-95')
  })
})
slidesTrack.addEventListener('touchstart', (e) => { touchstart(e,slidesTrack) })

slidesTrack.addEventListener('touchmove', (e) => { touchmove(e,slideWidth,slidesTrack) })

slidesTrack.addEventListener('touchend', () => { touchend(slidesTrack,slideContents,slideWidth) })
//section 2
let observer1 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      const i = Array.from(features).indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('opacity-100')
      }, i * 300)
    }
  })
}, { threshold: 0.5 })

features.forEach(feature => {
  observer1.observe(feature)
})
let observer2 = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.intersectionRatio) {
      entry.target.classList.remove('scale-[1.2]')
      entry.target.classList.add('opacity-100', 'scale-95')
    }
  })
}, { threshold: 0 })

shops.forEach(shop => {
  observer2.observe(shop)
})

let observer3 = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.intersectionRatio) {
      entry.target.classList.remove('scale-0', 'opacity-0')
      entry.target.classList.add('opacity-100', 'scale-100')
    }
  })
}, { threshold: 1 })

observer3.observe(productsContainer)

products.forEach(product => {
  product.addEventListener('click', (e) => {
    e.stopPropagation()
    addCarts.forEach(cart => {
      cart.classList.remove('translate-y-[-23px]')
    })
    hideCashes.forEach(cash => {
      cash.classList.remove('translate-y-[-20px]')
    })
    imgContainers.forEach(contain => {
      contain.classList.remove('scale-[0.9]')
    })
    heartIcons.forEach(heart => {
      heart.classList.add('hidden')
    })
    let addCart = product.querySelector('.add-cart')
    let hideCash = product.querySelector('.hide-cash')
    let imgContainer = product.querySelector('.img-container')
    let heartIcon = product.querySelector('.hearts')
    if (hideCash.classList.contains('clicked')) {
      window.location.href = ''
    }
    if (!hideCash.classList.contains('translate-y-[-20px]')) {
      hideCash.classList.add('translate-y-[-20px]', 'clicked')
      addCart.classList.add('translate-y-[-23px]')
      imgContainer.classList.add('scale-[0.9]')
      heartIcon.classList.remove('hidden')
    }
  })
})
document.addEventListener('click', () => {
  addCarts.forEach(cart => {
    cart.classList.remove('translate-y-[-23px]')
  })
  hideCashes.forEach(cash => {
    cash.classList.remove('translate-y-[-20px]')
  })
  imgContainers.forEach(contain => {
    contain.classList.remove('scale-[0.9]')
  })
  heartIcons.forEach(heart => {
    heart.classList.add('hidden')
  })
})
let productsStyle = window.getComputedStyle(slideContents[0]);
let prodGap = parseInt(productsStyle.marginRight) / 2 || 0;
let prodWidth = products[0].offsetWidth + prodGap;

productTrack.addEventListener('touchstart', (e) => { touchstart(e, productTrack) })

productTrack.addEventListener('touchmove', (e) => { touchmove(e, prodWidth, productTrack) })

productTrack.addEventListener('touchend', () => { touchend(productTrack, products, prodWidth,slideDots) })
