/* ===== STYLE SNAP - MAIN JAVASCRIPT ===== */

// ===== LOADER =====
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 800);
  }
});

// ===== DARK MODE TOGGLE =====
const darkToggle = document.getElementById('darkToggle');
let isDark = localStorage.getItem('darkMode') !== 'false';

function applyDarkMode() {
  document.body.classList.toggle('light-mode', !isDark);
  if (darkToggle) darkToggle.textContent = isDark ? '☀️' : '🌙';
}
applyDarkMode();

if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    isDark = !isDark;
    localStorage.setItem('darkMode', isDark);
    applyDarkMode();
  });
}

// ===== NAVBAR =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Active nav link
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle('show', window.scrollY > 400);
  }
});
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== REVEAL ON SCROLL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      revealObserver.unobserve(el.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== HERO PARTICLES =====
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const colors = ['#9b5de5', '#00b4d8', '#f72585'];
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 8 + 4;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration:${Math.random() * 12 + 8}s;
      animation-delay:${Math.random() * 8}s;
    `;
    container.appendChild(p);
  }
}
initParticles();

// ===== CART =====
let cart = JSON.parse(localStorage.getItem('styleSnapCart') || '[]');

function updateCartUI() {
  const countEls = document.querySelectorAll('.cart-count');
  countEls.forEach(el => { el.textContent = cart.length; });
  localStorage.setItem('styleSnapCart', JSON.stringify(cart));
}
updateCartUI();

function addToCart(name, price) {
  cart.push({ name, price });
  updateCartUI();
  showToast(`✨ ${name} added to cart!`);
}

// ===== TOAST =====
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== ADD TO CART BUTTONS =====
document.querySelectorAll('.add-cart-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card');
    const name = card.querySelector('.product-name')?.textContent || 'Item';
    const price = card.querySelector('.product-price')?.textContent || '$0';
    addToCart(name, price);
  });
});

// ===== TRENDING SLIDER =====
let sliderIndex = 0;
const sliderTrack = document.getElementById('sliderTrack');

function slideNext() {
  if (!sliderTrack) return;
  const items = sliderTrack.querySelectorAll('.slide-item');
  if (!items.length) return;
  sliderIndex = (sliderIndex + 1) % items.length;
  const offset = sliderIndex * (items[0].offsetWidth + 24);
  sliderTrack.style.transform = `translateX(-${offset}px)`;
  sliderTrack.style.transition = 'transform 0.5s ease';
}

function slidePrev() {
  if (!sliderTrack) return;
  const items = sliderTrack.querySelectorAll('.slide-item');
  if (!items.length) return;
  sliderIndex = (sliderIndex - 1 + items.length) % items.length;
  const offset = sliderIndex * (items[0].offsetWidth + 24);
  sliderTrack.style.transform = `translateX(-${offset}px)`;
  sliderTrack.style.transition = 'transform 0.5s ease';
}

const nextBtn = document.getElementById('sliderNext');
const prevBtn = document.getElementById('sliderPrev');
if (nextBtn) nextBtn.addEventListener('click', slideNext);
if (prevBtn) prevBtn.addEventListener('click', slidePrev);

let autoSlide = setInterval(slideNext, 3500);
if (sliderTrack) {
  sliderTrack.addEventListener('mouseenter', () => clearInterval(autoSlide));
  sliderTrack.addEventListener('mouseleave', () => {
    autoSlide = setInterval(slideNext, 3500);
  });
}

// ===== SHOP FILTERS =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    productCards.forEach(card => {
      const cat = card.dataset.category || '';
      const show = filter === 'all' || cat === filter;
      card.style.display = show ? 'block' : 'none';
      if (show) {
        card.style.animation = 'fadeInUp 0.4s ease';
      }
    });
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const success = document.getElementById('formSuccess');
    if (success) { success.style.display = 'block'; }
    contactForm.reset();
    setTimeout(() => { if (success) success.style.display = 'none'; }, 4000);
  });
}

// ===== CHATBOT =====
const chatFab = document.getElementById('chatFab');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');

const botResponses = {
  greet: ["Hey 👋 Welcome to Style Snap! I'm Snap — your style assistant. How can I help?"],
  products: ["We've got 🔥:\n• Oversized Hoodies\n• Cargo Pants\n• Chunky Sneakers\n• Y2K Bomber Jackets\n• Chain Accessories\nHead to our Shop page to browse everything!"],
  order: ["Ordering is easy! 🛍️\n1. Browse the Shop page\n2. Click 'Add to Cart'\n3. Head to checkout\n4. Fill in your details\n5. Done! We deliver in 3-5 days 🚀"],
  contact: ["Reach us at:\n📧 hello@stylesnap.com\n📞 +1 (555) 123-4567\n📍 123 Fashion Ave, NY\n\nOr visit our Contact page!"],
  shipping: ["We offer:\n🚀 Express (1-2 days) - $9.99\n📦 Standard (3-5 days) - FREE over $50\nWe ship worldwide! 🌍"],
  default: ["Hmm, I'm not sure about that 🤔 Try asking about:\n• Products\n• How to order\n• Shipping\n• Contact info"]
};

function getBotReply(msg) {
  const m = msg.toLowerCase();
  if (m.match(/hi|hello|hey|sup|yo/)) return botResponses.greet[0];
  if (m.match(/product|have|sell|collection|item|cloth/)) return botResponses.products[0];
  if (m.match(/order|buy|purchase|checkout|cart|shop/)) return botResponses.order[0];
  if (m.match(/contact|email|phone|address|reach|location/)) return botResponses.contact[0];
  if (m.match(/ship|deliver|delivery|shipping/)) return botResponses.shipping[0];
  return botResponses.default[0];
}

function addChatMessage(text, sender) {
  if (!chatMessages) return;
  const div = document.createElement('div');
  div.className = `chat-msg ${sender}`;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleChat() {
  const val = chatInput?.value.trim();
  if (!val) return;
  addChatMessage(val, 'user');
  chatInput.value = '';
  setTimeout(() => addChatMessage(getBotReply(val), 'bot'), 600);
}

if (chatFab) {
  chatFab.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
    if (chatWindow.classList.contains('open') && chatMessages.children.length === 0) {
      setTimeout(() => addChatMessage("Hey 👋 Welcome to Style Snap! I'm Snap — your style assistant. Ask me anything!", 'bot'), 300);
    }
  });
}
if (chatClose) chatClose.addEventListener('click', () => chatWindow.classList.remove('open'));
if (chatSend) chatSend.addEventListener('click', handleChat);
if (chatInput) {
  chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') handleChat(); });
}

// Quick reply buttons
document.querySelectorAll('.quick-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const q = btn.dataset.q;
    addChatMessage(q, 'user');
    setTimeout(() => addChatMessage(getBotReply(q), 'bot'), 600);
  });
});

// ===== COUNTER ANIMATION =====
function animateCount(el, target, suffix = '') {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + suffix;
  }, 25);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        const val = parseInt(el.dataset.val);
        const suf = el.dataset.suffix || '';
        animateCount(el, val, suf);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) statsObserver.observe(statsSection);
