// ===============================
// STORAGE MANAGEMENT
// ===============================
function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || []
}

function setFavorites(arr) {
  localStorage.setItem('favorites', JSON.stringify(arr))
}

function getCarts() {
  return JSON.parse(localStorage.getItem('carts')) || []
}

function setCarts(arr) {
  localStorage.setItem('carts', JSON.stringify(arr))
}

let favorites = getFavorites()
let carts = getCarts()

// ===============================
// UI RENDERING FUNCTIONS
// ===============================
function renderFavorites(arr = [], container, span) {
  container.innerHTML = ""

  arr.forEach(product => {
    let node = document.createElement('div')
    node.classList.add(
      'flex', 'flex-shrink-0', 'w-[48%]', 'flex-col',
      'gap-1', 'products1', 'shadow', 'p-1', 'bg-stone-400'
    )
    node.dataset.id = product.id
    node.innerHTML = `
      <div class="relative w-full img-container1 transition-all duration-500 mb-2">
        <img class="transition-all duration-1000" src="${product.image}" alt="" />
        <i class="hearts1 heart-icon text-red-500 fa-regular fa-heart text-xl absolute top-1 right-1 bg-white w-10 h-12 flex items-center justify-center transition-all duration-500 hidden"></i>
      </div>
      <h4 class="text-xl w-full font-marcel text-white">${product.name}</h4>
      <div class="overflow-y-hidden h-6">
        <span class="hide-cash1 transition-all block duration-500 translate-y-0 text-white">${product.price}</span>
        <a class="translate-y-[5px] add-cart1 block transition-all duration-500 text-white">ADD TO CART</a>
      </div>
    `
    container.appendChild(node)
  })

  enableClick(arr, container, span)

  if (arr.length === 0 && span) {
    span.textContent = "No favorites yet!"
  }
}

function renderCart(arr = [], container, total, footText, span) {
  container.innerHTML = ""   
  let newTotal = 0          
  arr.forEach(product => {
    let div = document.createElement('div')
    div.classList.add(
      "flex", "flex-shrink-0", "w-full", "gap-4", "products",
      "shadow", "p-1", "bg-stone-400", "min-h-40"
    )
    div.dataset.id = product.id
    div.innerHTML = `
      <div class="relative w-24 h-32 flex-none img-container transition-all duration-500 shadow">
        <img class="transition-all duration-1000 w-full h-full" src="${product.image}" alt="" />
      </div>
      <div class="flex flex-col justify-between pb-1">
        <h4 class="text-[18px] w-full font-marcel text-white">${product.name}</h4>
        <span class="hide-cash transition-all block duration-500 text-white font-marcel price">${product.price}</span>
        <div class="text-white flex gap-1 items-center justify-between w-36 bg-stone-600 shadow rounded-md">
          <i class="minus-icon text-xl w-8 text-center fa-solid fa-minus"></i>
          <input type="number" value="${parseInt(product.quantity)}" class="w-16 h-8 text-black text-sm text-center font-marcel rounded-none" disabled />
          <i class="add-icon text-2xl w-8 text-center fa-solid fa-plus"></i>
        </div>
      </div>
      <div class="flex flex-col justify-between items-start pb-1 pr-6 w-32">
        <p class="text-white font-marcel w-12 text-center subtotal">
          $${(parseFloat(product.price.slice(1)) * product.quantity).toFixed(2)}
        </p>
        <i class="fa-solid fa-trash del-btn text-xl text-center text-white ml-2"></i>
      </div>
    `
    container.appendChild(div)

    newTotal += parseFloat(product.price.slice(1)) * Number(product.quantity)
  })
  
  if (arr.length > 0){
    total.textContent = `$${newTotal.toFixed(2)}`
    footText.textContent = "Estimated Total:"
    span.textContent = ""
  } else {
    total.textContent = ""
    footText.textContent = ""
    span.textContent = "Nothing in cart yet!"
  }
}

// ===============================
// EVENT HANDLING FUNCTIONS
// ===============================
function bindCartEvents(cartContainer, total, footText, cartSpan) {
  cartContainer = document.querySelector(".cart-container")
  total = document.querySelector(".total")
  footText = document.querySelector(".estimate")
  cartSpan = document.querySelector(".span")
  
  const products = document.querySelectorAll('.products')
  const plusIcons = document.querySelectorAll('.add-icon')
  const minusIcons = document.querySelectorAll('.minus-icon')
  const delBtn = document.querySelectorAll('.del-btn')

  function updateTotal() {
    const newTotal = carts.reduce((acc, item) => {
      return acc + parseFloat(item.price.slice(1)) * item.quantity
    }, 0)
    total.textContent = newTotal > 0 ? `$${newTotal.toFixed(2)}` : ''
    footText.textContent = newTotal > 0 ? 'Estimated Total:' : ''
    cartSpan.textContent = newTotal > 0 ? '' : 'Nothing in cart yet!'
  }

  function clearCart(i) {
    let data = carts.find(item => item.id == products[i].dataset.id)
    let node = cartContainer.querySelector(`[data-id="${data.id}"]`)
    cartContainer.removeChild(node)
    carts = carts.filter(item => item.id !== products[i].dataset.id)
    setCarts(carts)
    updateTotal()
  }

  plusIcons.forEach((add, i) => {
    add.addEventListener('click', () => {
      carts.find((item, j) => {
        if (item.id == products[i].dataset.id) {
          const product = document.querySelector(`[data-id="${item.id}"]`)
          const quantity = product.querySelector('input')
          const price = product.querySelector('.price')
          const subTotal = product.querySelector('.subtotal')

          carts[j].quantity++
          quantity.value++
          subTotal.textContent = `$${(parseFloat(price.textContent.slice(1)) * carts[j].quantity).toFixed(2)}`
          setCarts(carts)
          updateTotal()
        }
      })
    })
  })

  minusIcons.forEach((minus, i) => {
    minus.addEventListener('click', () => {
      carts.find((item, j) => {
        if (item.id == products[i].dataset.id) {
          const product = document.querySelector(`[data-id="${item.id}"]`)
          const quantity = product.querySelector('input')
          const price = product.querySelector('.price')
          const subTotal = product.querySelector('.subtotal')

          carts[j].quantity--
          quantity.value--
          subTotal.textContent = `$${(parseFloat(price.textContent.slice(1)) * carts[j].quantity).toFixed(2)}`
          setCarts(carts)
          updateTotal()

          if (quantity.value == 0) {
            clearCart(i)
          }
        }
      })
    })
  })

  delBtn.forEach((del, i) => {
    del.addEventListener('click', () => clearCart(i))
  })
}

// ===============================
// UI REFRESH HANDLER
// ===============================
function refreshUI() {
  carts = getCarts()
  favorites = getFavorites()

  const cartContainer = document.querySelector(".cart-container")
  const total = document.querySelector(".total")
  const footText = document.querySelector(".estimate")
  const cartSpan = document.querySelector(".span")

  if (cartContainer && total && footText && cartSpan) {
    renderCart(carts, cartContainer, total, footText, cartSpan)
    bindCartEvents(carts, cartContainer, total, footText, cartSpan)
  }

  const favoritesContainer = document.querySelector(".favorites-container")
  const favSpan = document.querySelector("span")

  if (favoritesContainer && favSpan) {
    renderFavorites(favorites, favoritesContainer, favSpan)
  }
    
}
// ===============================
// GLOBAL VARIABLES FOR SLIDERS
// ===============================
let heroIndexRef = { value: 0 }
let prodIndexRef = { value: 0 }
let testIndexRef = { value: 0 }
let startX = 0
let endX = 0
let delta = 0

// ===============================
// INITIALIZATION EVENTS
// ===============================
document.addEventListener("DOMContentLoaded", refreshUI)

window.addEventListener("pageshow", (e) => {
  if (e.persisted) {
    refreshUI()
  }
})

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    refreshUI()
  }
})

// ===============================
// INTERACTION HELPERS
// ===============================
  function resetProductSize() {
    for (let i = 1; i < 4; i++) {
      const addCarts = document.querySelectorAll(`.add-cart${i}`)
      const hideCashes = document.querySelectorAll(`.hide-cash${i}`)
      const imgContainers = document.querySelectorAll(`.img-container${i}`)
      const heartIcons = document.querySelectorAll(`.hearts${i}`)
        
      addCarts.forEach(cart => cart.classList.remove('translate-y-[-23px]'))
      hideCashes.forEach(cash => cash.classList.remove('translate-y-[-20px]'))
      imgContainers.forEach(contain => contain.classList.remove('scale-[0.9]'))
      heartIcons.forEach(heart => heart.classList.add('hidden'))
    }
  }

function enableClick(fav = [], container, span) {
  // PRODUCT CLICK HANDLERS (1, 2, 3)
  for (let i = 1; i < 4; i++) {
    document.querySelectorAll(`.products${i}`).forEach(product => {
      product.addEventListener('click', (e) => {
        e.stopPropagation()
        let addCart = product.querySelector(`.add-cart${i}`)
        let hideCash = product.querySelector(`.hide-cash${i}`)
        let imgContainer = product.querySelector(`.img-container${i}`)
        let heartIcon = product.querySelector(`.hearts${i}`)
        
        if (hideCash.classList.contains('translate-y-[-20px]')) {
          if (e.target == heartIcon) {
            e.target.classList.remove('hidden')
            e.target.classList.toggle('text-red-500')
             
            const productData = {
              id: product.dataset.id,
              name: product.querySelector('h4').textContent,
              price: product.querySelector(`.hide-cash${i}`).textContent,
              image: product.querySelector('img').src
            }
            if (!fav.some(item => item.id === productData.id)) {
              fav.push(productData)
              setFavorites(fav)
            }
            if (!e.target.classList.contains('text-red-500')) {
              if (fav.length > 0) {
               if (container) {
                fav.filter(item => {
                if (item.id == product.dataset.id) {
                let removedFav = container.querySelector(`[data-id="${item.id}"]`)
                container.removeChild(removedFav)
                 }
                })
               }
                fav = fav.filter(item => item.id !== product.dataset.id)
                setFavorites(fav)
              }
              if(fav.length == 0){
                if (span) {
                span.textContent = "No favorites yet!";      
                }
              }
            }
            return
          }
          if (e.target == addCart || e.target !== heartIcon) {
            const productData = {
              id: product.dataset.id,
              name: product.querySelector('h4').textContent,
              price: product.querySelector(`.hide-cash${i}`).textContent,
              image: product.querySelector('img').src,
              quantity: 1
            }
            
            let exists = carts.find(item => item.id == productData.id)
            if (exists) {
              exists.quantity++
            }else{
              carts.push(productData)
            }
            setCarts(carts)
          }
          resetProductSize()
          let p = document.createElement('p')
          p.classList.add('absolute', 'top-1','right-1','rounded-md','p-1','bg-green-500','text-white','font-marcel','w-20','text-center','font-bold')
          p.textContent = 'Added'
          let contain = product.querySelector(`.img-container${i}`)
          contain.appendChild(p)
          setTimeout(() => {
          contain.removeChild(p) 
          }, 800)
        } else {
          const addCarts = document.querySelectorAll(`.add-cart${i}`)
          const hideCashes = document.querySelectorAll(`.hide-cash${i}`)
          const imgContainers = document.querySelectorAll(`.img-container${i}`)
          const heartIcons = document.querySelectorAll(`.hearts${i}`)
          resetProductSize()
          hideCash.classList.add('translate-y-[-20px]')
          addCart.classList.add('translate-y-[-23px]')
          imgContainer.classList.add('scale-[0.9]')
          heartIcon.classList.remove('hidden')

        }
      })
    })
  // I ENSURED THAT THE FAVOURITES THAT HAVE BEEN CLICKED MAINTAINED PERSISTENCE
    fav.forEach(item => {
    let product = document.querySelector(`[data-id="${item.id}"]`)
    let heart = product.querySelector('.fa-heart')
    heart.classList.add('text-red-500')
  })
  }

  // DOCUMENT CLICK RESET
  document.addEventListener('click', () => {
   resetProductSize()
  })
}

// ===============================
// SLIDER HELPERS
// ===============================
function touchstart(event, track) {
  startX = event.touches[0].clientX
  track.style.transition = 'none'
}

function touchmove(event, width, track, indexRef) {
  endX = event.touches[0].clientX
  delta = endX - startX
  let offset = -indexRef.value * width + delta
  track.style.transform = `translateX(${offset}px)`
}

function touchend(track, contents, width, dots = [], indexRef, visibleCount, event) {
  delta = endX - startX
  if (event.target.classList.contains('hearts1') || event.target.classList.contains('hearts2') || event.target.classList.contains('hearts3')) return
  if (delta < -50 && indexRef.value < contents.length - visibleCount) {
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

function heroTouchend(track, contents, width, indexRef) {
  delta = endX - startX
  if (delta < -50 && indexRef.value < contents.length) {
    indexRef.value++
    if (indexRef.value == contents.length) {
      indexRef.value = 0
      track.style.transition = 'none'
      track.style.transform = `translateX(${-indexRef.value * width}px)`
      return
    }
  } else if (delta > 50 && indexRef.value > -1) {
    indexRef.value--
    if (indexRef.value == -1) {
      indexRef.value = contents.length - 1
      track.style.transition = 'none'
      track.style.transform = `translateX(${-indexRef.value * width}px)`
      return
    }
  }
  
  track.style.transition = 'transform 0.6s ease'
  track.style.transform = `translateX(${-indexRef.value * width}px)`
}

// ===============================
// MAIN PAGE LOGIC
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  // DOM ELEMENTS
  const favoritesIcon = document.getElementById('heart-icon')
  const cartIcon = document.getElementById('cart-icon')
  const heading = document.querySelector('#home-text h2')
  const paragraph = document.querySelector('#home-text p')
  const heroContain = document.querySelector('.slide-contain')
  const heroContents = document.querySelectorAll('.slide-content')
  const heroTrack = document.querySelector('.slides-track')
  const hamburger = document.getElementById('hamburger')
  
  const features = document.querySelectorAll('.features')
  const shops = document.querySelectorAll('.shops')
  const productsContainer = document.querySelectorAll('.products-container')
  
  const productTrack = document.querySelector('.products-track1')
  const products1 = document.querySelectorAll('.products1')
  const slideDots = document.querySelectorAll('.slider-dots1')
  
  const productTrack2 = document.querySelector('.products-track2')
  const products2 = document.querySelectorAll('.products2')
  const slideDots2 = document.querySelectorAll('.slider-dots2')
  
  const productTrack3 = document.querySelector('.products-track3')
  const products3 = document.querySelectorAll('.products3')
  const slideDots3 = document.querySelectorAll('.slider-dots3')
  
  const videoframe = document.querySelector('.videoframe')
  const testimonialsContain = document.querySelector('.testimonials-container')
  const testimonialsTrack = document.querySelector('.testimonials-track')
  const testimonials = document.querySelectorAll('.testimonials')
  const slideDots4 = document.querySelectorAll('.slider-dots4')
  
  // FAVORITES AND CART ICONS
  if (!favoritesIcon) return
  favoritesIcon.addEventListener('click', () => {
    window.location.href = 'favorites.html'
  })
  
  cartIcon.addEventListener('click', () => {
    window.location.href = 'cart.html'
  })
  const favoritesContainer = document.querySelector('.favorites-container')
  const favSpan = document.querySelector('span')
  enableClick(favorites)

  // HERO SECTION ANIMATIONS
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
  
  // HERO TOUCH HANDLERS
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
  heroTrack.addEventListener('touchmove', (e) => { touchmove(e, heroWidth, heroTrack, heroIndexRef) })
  heroTrack.addEventListener('touchend', () => { heroTouchend(heroTrack, heroContents, heroWidth, heroIndexRef) })
  
  // INTERSECTION OBSERVERS
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
  productsContainer.forEach(container => observer3.observe(container))
  observer3.observe(videoframe)
  
  // RESET SLIDERS WHEN OUT OF VIEW
  let trackObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        heroIndexRef.value = 0
        prodIndexRef.value = 0
        testIndexRef.value = 0
        
        heroTrack.style.transition = 'transform 0.6s ease'
        heroTrack.style.transform = `translateX(0px)`
        
        for (let i = 1; i < 4; i++) {
          const productTrack = document.querySelector(`.products-track${i}`)
          const slideDots = document.querySelectorAll(`.slider-dots${i}`)
          
          productTrack.style.transition = 'transform 0.6s ease'
          productTrack.style.transform = `translateX(0px)`
          slideDots.forEach(dot => dot.classList.remove('bg-stone-400'))
          slideDots[0].classList.add('bg-stone-400')
          resetProductSize()
        }
        
        testimonialsTrack.style.transition = 'transform 0.6s ease'
        testimonialsTrack.style.transform = `translateX(0px)`
        slideDots4.forEach(dot => dot.classList.remove('bg-stone-400'))
        slideDots4[0].classList.add('bg-stone-400')
      }
    })
  }, { threshold: 0 })
  productsContainer.forEach(container => { trackObserver.observe(container) })
  trackObserver.observe(heroContain)
  trackObserver.observe(testimonialsContain)
  
  // WINDOW LOAD → SLIDER TOUCH SETUP
  window.addEventListener('load', () => {
    // PRODUCT SLIDER TOUCH
    for (let i = 1; i < 4; i++) {
      const productTrack = document.querySelector(`.products-track${i}`)
      const products = document.querySelectorAll(`.products${i}`)
      const slideDots = document.querySelectorAll(`.slider-dots${i}`)
      
      let productsStyle = window.getComputedStyle(productTrack)
      let prodGap = parseInt(productsStyle.rowGap) || 0
      let prodPad = parseInt(productsStyle.paddingLeft) || 0
      let prodWidth = products[0].offsetWidth + prodGap
      
      productTrack.addEventListener('touchstart', (e) => { touchstart(e, productTrack) })
      productTrack.addEventListener('touchmove', (e) => { touchmove(e, prodWidth, productTrack, prodIndexRef) })
      productTrack.addEventListener('touchend', (e) => { touchend(productTrack, products, prodWidth, slideDots, prodIndexRef, 2, e) })
    }
    
    // TESTIMONIALS SLIDER TOUCH
    let testStyles = window.getComputedStyle(testimonials[0])
    let testWidth = parseInt(testStyles.width)
    
    testimonialsTrack.addEventListener('touchstart', (e) => {
      touchstart(e, testimonialsTrack)
    })
    
    testimonialsTrack.addEventListener('touchmove', (e) => {
      touchmove(e, testWidth, testimonialsTrack, testIndexRef)
    })
    
    testimonialsTrack.addEventListener('touchend', (e) => {
      touchend(testimonialsTrack, testimonials, testWidth, slideDots4, testIndexRef, 1,e)
    })
  })
})

// ===============================
// FAVORITES HTML LOGIC
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const favoritesContainer = document.querySelector('.favorites-container')
  const favSpan = document.querySelector('span')
  if (!favoritesContainer) return
  renderFavorites(favorites, favoritesContainer, favSpan)
})
  
// ===============================
// CART HTML LOGIC
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.querySelector('.cart-container')
  const total = document.querySelector('.total')
  const footText = document.querySelector('.estimate')
  const cartSpan = document.querySelector('.span')
  if (!cartContainer) return
  
  renderCart(carts, cartContainer, total, footText, cartSpan)
  bindCartEvents(carts, cartContainer, total, footText, cartSpan)
})
