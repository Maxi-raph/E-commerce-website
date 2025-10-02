let favoritesArr = JSON.parse(localStorage.getItem('favorites')) || []
let cartsArr = JSON.parse(localStorage.getItem('carts')) || []

// ===============================
// HELPERS
// ===============================
function clickedProduct(e, addCarts, hideCashes, imgContainers, heartIcons) {
  addCarts.forEach(cart => cart.classList.remove('translate-y-[-23px]'))
  hideCashes.forEach(cash => cash.classList.remove('translate-y-[-20px]'))
  imgContainers.forEach(contain => contain.classList.remove('scale-[0.9]'))
  heartIcons.forEach(heart => heart.classList.add('hidden'))
}
  function enableClick(storedArr = [],container,span) {
    
  // -------------------------------
  // PRODUCT CLICK HANDLERS (1, 2, 3)
  // -------------------------------
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
            e.target.classList.toggle('text-red-500')
            e.target.classList.remove('hidden')
            const productData = {
              id: product.dataset.id,
              name: product.querySelector('h4').textContent,
              price: product.querySelector(`.hide-cash${i}`).textContent,
              image: product.querySelector('img').src
            }
            if (!favoritesArr.some(item => item.id === productData.id)) {
              favoritesArr.push(productData)
            }
            if (!e.target.classList.contains('text-red-500')) {
              favoritesArr = favoritesArr.filter(item => item.id !== product.dataset.id)
            }
            localStorage.setItem('favorites', JSON.stringify(favoritesArr))
 if (storedArr.length > 0) {
  storedArr.filter(item => {
    if (item.id == product.dataset.id) {
      let removedFav = container.querySelector(`[data-id="${item.id}"]`)
      container.removeChild(removedFav)
    }
  })
  storedArr = storedArr.filter(item => item.id !== product.dataset.id)
  favoritesArr = favoritesArr.filter(item => item.id !== product.dataset.id)
  localStorage.setItem('favorites', JSON.stringify(favoritesArr))
  if (storedArr.length === 0) {
    span.textContent = "No favorites yet!";
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
            
            let exists = cartsArr.find(item => item.id == product.dataset.id)
            if (exists) {
              exists.quantity++
            }
            if (!cartsArr.some(item => item.id == product.dataset.id)) {
              cartsArr.push(productData)
            }
            localStorage.setItem('carts', JSON.stringify(cartsArr))
          }
          window.location.href = 'cart.html'
        } else {
          const addCarts = document.querySelectorAll(`.add-cart${i}`)
          const hideCashes = document.querySelectorAll(`.hide-cash${i}`)
          const imgContainers = document.querySelectorAll(`.img-container${i}`)
          const heartIcons = document.querySelectorAll(`.hearts${i}`)
          clickedProduct(e, addCarts, hideCashes, imgContainers, heartIcons)
          hideCash.classList.add('translate-y-[-20px]')
          addCart.classList.add('translate-y-[-23px]')
          imgContainer.classList.add('scale-[0.9]')
          heartIcon.classList.remove('hidden')
        }
      })
    })
  }
  
    // -------------------------------
  // DOCUMENT CLICK RESET
  // -------------------------------
  document.addEventListener('click', () => {
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
  })
  }
  
// ===============================
// MAIN PAGE LOGIC
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------
  // DOM ELEMENTS
  // -------------------------------
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
  
  // -------------------------------
  // FAVORITES ICON
  // -------------------------------
  if (!favoritesIcon) return
  favoritesIcon.addEventListener('click', () => {
    window.location.href = 'favorites.html'
  })
  
  cartIcon.addEventListener('click', () => {
    window.location.href = 'cart.html'
  })
  enableClick()
  // -------------------------------
  // SLIDER HELPERS
  // -------------------------------
  let heroIndexRef = { value: 0 }
  let prodIndexRef = { value: 0 }
  let testIndexRef = { value: 0 }
  let startX = 0
  let endX = 0
  
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
  
  function touchend(track, contents, width, dots = [], indexRef, visibleCount,event) {
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
  
  // -------------------------------
  // HERO SECTION ANIMATIONS
  // -------------------------------
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
  
  // -------------------------------
  // HERO TOUCH HANDLERS
  // -------------------------------
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
  
  // -------------------------------
  // INTERSECTION OBSERVERS
  // -------------------------------
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
  
  // -------------------------------
  // RESET SLIDERS WHEN OUT OF VIEW
  // -------------------------------
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
  // -------------------------------
  // WINDOW LOAD → SLIDER TOUCH SETUP
  // -------------------------------
  window.addEventListener('load', () => {
    // ===============================
    // PRODUCT SLIDER TOUCH
    // ===============================
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
      productTrack.addEventListener('touchend', (e) => { touchend(productTrack, products, prodWidth, slideDots, prodIndexRef, 2,e) })
    }
    
    // ===============================
    // TESTIMONIALS SLIDER TOUCH
    // ===============================
    let testStyles = window.getComputedStyle(testimonials[0])
    let testWidth = parseInt(testStyles.width)
    
    testimonialsTrack.addEventListener('touchstart', (e) => {
      touchstart(e, testimonialsTrack)
    })
    
    testimonialsTrack.addEventListener('touchmove', (e) => {
      touchmove(e, testWidth, testimonialsTrack, testIndexRef)
    })
    
    testimonialsTrack.addEventListener('touchend', () => {
      touchend(testimonialsTrack, testimonials, testWidth, slideDots4, testIndexRef, 1)
    })
  })
})

// ===============================
// FAVORITES HTML LOGIC
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const favoritesContainer = document.querySelector('.favorites-container')
  const span = document.querySelector('span')
  if (!favoritesContainer) return
  let storedFav = JSON.parse(localStorage.getItem('favorites')) || []
  // render favorites
  storedFav.forEach(product => {
    let node = document.createElement('div')
    node.classList.add('flex', 'flex-shrink-0', 'w-[48%]', 'flex-col', 'gap-1', 'products1', 'shadow', 'p-1', 'bg-stone-400')
    node.dataset.id = product.id
    node.innerHTML = `
      <div class="relative w-full img-container1 transition-all duration-500 mb-2">
        <img class="transition-all duration-1000" src="${product.image}" alt="" />
        <i class="hearts1 fa-regular fa-heart text-xl text-red-500 absolute top-1 right-1 bg-white w-10 h-12 flex items-center justify-center transition-all duration-500 hidden"></i>
      </div>
      <h4 class="text-xl w-full font-marcel text-white">${product.name}</h4>
      <div class="overflow-y-hidden h-6">
        <span class="hide-cash1 transition-all block duration-500 translate-y-0 text-white">${product.price}</span>
        <a class="translate-y-[5px] add-cart1 block transition-all duration-500 text-white">ADD TO CART</a>
      </div>`
    favoritesContainer.appendChild(node)
  })
  enableClick(storedFav,favoritesContainer,span)
  if (storedFav.length === 0) {
    span.textContent = "No favorites yet!";
  }
})

// ===============================
// CART HTML LOGIC
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.querySelector('.cart-container')
  const total = document.querySelector('.total')
  const footText = document.querySelector('.estimate')
  const span = document.querySelector('.span')
  if (!cartContainer) return
  let storedCart = JSON.parse(localStorage.getItem('carts')) || []
  storedCart.forEach(product => {
    let node = document.createElement('div')
    node.classList.add('flex', 'flex-shrink-0', 'w-full', 'gap-4', 'products', 'shadow', 'p-1', 'bg-stone-400', 'min-h-40')
    node.dataset.id = product.id
    node.innerHTML = `
      <div class="relative w-24 h-32 flex-none img-container transition-all duration-500 shadow">
      <img class="transition-all duration-1000 w-full h-full" src="${product.image}" alt="" />
    </div>
    <div class="flex flex-col justify-between pb-1">
      <h4 class="text-[18px] w-full font-marcel text-white">${product.name}</h4>
      <span class="hide-cash transition-all block duration-500 text-white font-marcel price">${product.price}</span>
    <div class=" text-white flex gap-1 items-center justify-between w-36 bg-stone-600 shadow rounded-md ">
       <i class="minus-icon text-xl w-8  text-center fa-solid fa-minus"></i>
       <input type="number" value="${parseInt(product.quantity)}" class="w-16 h-8 text-black text-sm text-center font-marcel rounded-none" disabled="true"/>
       <i class="add-icon text-2
       xl w-8 text-center fa-solid fa-plus"></i>
    </div>
    </div>
    <div class="flex flex-col justify-between items-start pb-1 pr-6  w-32">
      <p class="text-white font-marcel w-12 text-center text-wrap subtotal">$${(parseFloat(product.price.slice(1)) * product.quantity).toFixed(2)}</p>
      <button class="del-btn w-16 h-7 text-center bg-black text-sm text-white rounded font-marcel">Delete</button>
    </div>
     `
    cartContainer.appendChild(node)
    let currentTotal = parseFloat(total.textContent.replace('$', '')) || 0;
    let newTotal = currentTotal + parseFloat(product.price.slice(1)) * product.quantity;
    total.textContent = `$${newTotal.toFixed(2)}`;
    footText.textContent = 'EstimatedTotal:'
  })
  const products = document.querySelectorAll('.products')
  const plusIcons = document.querySelectorAll('.add-icon')
  const minusIcons = document.querySelectorAll('.minus-icon')
  const delBtn = document.querySelectorAll('.del-btn')
  
  plusIcons.forEach((add, i) => {
    const products = document.querySelectorAll('.products')
    const quantity = products[i].querySelector('input')
    const price = products[i].querySelector('.price')
    const subTotal = products[i].querySelector('.subtotal')
    add.addEventListener('click', (e) => {
      storedCart[i].quantity++
      cartsArr[i].quantity++
      quantity.value++
      subTotal.textContent = `$${parseFloat((price.textContent.slice(1) * storedCart[i].quantity)).toFixed(2)}`
      let newTotal = `$${parseFloat(total.textContent.slice(1)) + parseFloat(price.textContent.slice(1))}.00`
      total.textContent = newTotal
      localStorage.setItem('carts', JSON.stringify(cartsArr))
    })
  })
  minusIcons.forEach((minus, i) => {
    const products = document.querySelectorAll('.products')
    const quantity = products[i].querySelector('input')
    const price = products[i].querySelector('.price')
    const subTotal = products[i].querySelector('.subtotal')
    minus.addEventListener('click', (e) => {
      if (quantity.value == 1) {
        storedCart.filter(item => {
          if (item.id == products[i].dataset.id) {
            let node = cartContainer.querySelector(`[data-id="${item.id}"]`)
            total.textContent = `$${parseFloat(total.textContent.slice(1)) - parseFloat(subTotal.textContent.slice(1))}.00`
            cartContainer.removeChild(node)
            storedCart = storedCart.filter(item => item.id !== products[i].dataset.id)
            cartsArr = cartsArr.filter(item => item.id !== products[i].dataset.id)
            localStorage.setItem('carts', JSON.stringify(cartsArr))
            if (storedCart.length == 0) {
             footText.textContent = ''
             total.textContent = ''
             span.textContent = "Nothing in cart yet!"
            }
          }
        })
        return
      }
      storedCart[i].quantity--
      cartsArr[i].quantity--
      quantity.value--
      subTotal.textContent = `$${parseFloat((price.textContent.slice(1) * storedCart[i].quantity)).toFixed(2)}`
      let newTotal = `$${parseFloat(total.textContent.slice(1)) - parseFloat(price.textContent.slice(1))}.00`
      total.textContent = newTotal
      localStorage.setItem('carts', JSON.stringify(cartsArr))
    })
  })
  
  delBtn.forEach((del, i) => {
    const subTotal = products[i].querySelector('.subtotal')
    del.addEventListener('click', () => {
      storedCart.filter(item => {
        if (item.id == products[i].dataset.id) {
          let node = cartContainer.querySelector(`[data-id="${item.id}"]`)
          total.textContent = `$${parseFloat(total.textContent.slice(1)) - parseFloat(subTotal.textContent.slice(1))}.00`
          cartContainer.removeChild(node)
          storedCart = storedCart.filter(item => item.id !== products[i].dataset.id)
          cartsArr = cartsArr.filter(item => item.id !== products[i].dataset.id)
          localStorage.setItem('carts', JSON.stringify(cartsArr))
          if (storedCart.length == 0) {
           footText.textContent = ''
           total.textContent = ''
           span.textContent = "Nothing in cart yet!"
          }
        }
      })
    })
  })
  if (storedCart.length == 0) {
  footText.textContent = ''
  total.textContent = ''
  span.textContent = "Nothing in cart yet!"
  }
})
