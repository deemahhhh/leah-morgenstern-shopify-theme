/* Leah Morgenstern Shopify Theme — Global JS */

(function () {
  'use strict';

  // ----- IntersectionObserver reveals -----
  let io = null;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
  }

  function observeReveals(root) {
    const els = (root || document).querySelectorAll('.reveal:not(.in), .reveal-stagger:not(.in)');
    if (io) els.forEach((el) => io.observe(el));
    else els.forEach((el) => el.classList.add('in'));
  }

  observeReveals();

  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.in), .reveal-stagger:not(.in)').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in');
    });
  }, 250);

  if ('MutationObserver' in window) {
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.querySelectorAll) observeReveals(node);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  // ----- Shopify Cart (AJAX API) -----
  async function fetchCart() {
    const res = await fetch('/cart.js');
    return res.json();
  }

  async function addToCart(variantId) {
    await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity: 1 })
    });
    const cart = await fetchCart();
    updateCartUI(cart);
    openDrawer();
  }

  async function removeFromCart(key) {
    await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: 0 })
    });
    const cart = await fetchCart();
    updateCartUI(cart);
  }

  function updateCartUI(cart) {
    const count = cart.item_count || 0;
    document.querySelectorAll('.cart-count').forEach((el) => {
      el.textContent = count;
      el.style.display = count > 0 ? 'inline-flex' : 'none';
    });

    const list = document.querySelector('.cart-items');
    const totalEl = document.querySelector('.cart-total .amount');
    if (!list) return;

    if (!cart.items || cart.items.length === 0) {
      list.innerHTML = '<div class="cart-empty">Your cart is quiet.<br><br><a class="btn-link" href="/collections/all">Explore the collection</a></div>';
      if (totalEl) totalEl.textContent = formatMoney(0);
      return;
    }

    list.innerHTML = cart.items.map((item) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div>
          <div class="name">${item.title}</div>
          <div class="price">${formatMoney(item.price)} · qty ${item.quantity}</div>
          <a href="#" class="remove" data-key="${item.key}">Remove</a>
        </div>
        <div class="price">${formatMoney(item.line_price)}</div>
      </div>
    `).join('');

    if (totalEl) totalEl.textContent = formatMoney(cart.total_price);

    list.querySelectorAll('[data-key]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        removeFromCart(a.getAttribute('data-key'));
      });
    });
  }

  function formatMoney(cents) {
    return '$' + (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2 });
  }

  function openDrawer() {
    document.querySelector('.cart-drawer')?.classList.add('open');
    document.querySelector('.drawer-backdrop')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    document.querySelector('.cart-drawer')?.classList.remove('open');
    document.querySelector('.drawer-backdrop')?.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ----- Event delegation -----
  document.addEventListener('click', (e) => {
    if (e.target.closest('.cart-btn')) {
      e.preventDefault();
      openDrawer();
      return;
    }
    if (e.target.closest('.cart-close, .drawer-backdrop')) {
      closeDrawer();
      return;
    }
    const addBtn = e.target.closest('[data-add-to-cart]');
    if (addBtn) {
      e.preventDefault();
      addToCart(addBtn.getAttribute('data-add-to-cart'));
    }
  });

  // ----- Mobile menu -----
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      })
    );
  }

  // ----- Init cart on load -----
  fetchCart().then(updateCartUI).catch(() => {});

})();


// Filter tabs
document.addEventListener('DOMContentLoaded',function(){var tabs=document.querySelectorAll('.filter-tab');var items=document.querySelectorAll('.product-grid-item');if(!tabs.length||!items.length)return;tabs.forEach(function(tab){tab.addEventListener('click',function(){var filter=tab.getAttribute('data-filter');tabs.forEach(function(t){t.classList.remove('active')});tab.classList.add('active');items.forEach(function(item){if(filter==='all'){item.style.display=''}else{item.style.display=(item.getAttribute('data-type')||'').toLowerCase()===filter.toLowerCase()?'':'none'}})})})});