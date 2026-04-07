// Erasmus Recruitment — Interactive JS

const PRICES = {
  basic:   { S: 5475, A: 4225, B: 3825, C: 3125, D: 2625 },
  premium: { S: 6300, A: 5050, B: 4650, C: 3950, D: 3450 },
  main:    { S: 10300, A: 9050, B: 8650, C: null,  D: null  }
};

const PLABELS = {
  basic: 'Basic Platform',
  premium: 'Premium Platform',
  main: 'Main Partner'
};

const DLABELS = {
  S: 'Package S (5 activities)',
  A: 'Package A (4 activities)',
  B: 'Package B (3 activities)',
  C: 'Package C (2 activities)',
  D: 'Package D (1 activity)'
};

let platform = 'basic';
let days = 'A';

function updateCalc() {
  const price   = PRICES[platform][days];
  const priceEl = document.getElementById('calcPrice');
  const comboEl = document.getElementById('calcCombo');
  const naEl    = document.getElementById('calcNA');

  if (price === null) {
    priceEl.textContent = '—';
    comboEl.style.display = 'none';
    naEl.style.display = 'block';
  } else {
    priceEl.textContent = '€' + price.toLocaleString('nl-NL');
    comboEl.textContent = PLABELS[platform] + ' + ' + DLABELS[days];
    comboEl.style.display = 'block';
    naEl.style.display = 'none';
  }
}

function initCalc() {
  document.querySelectorAll('#platformBtns .cb').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#platformBtns .cb').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      platform = btn.dataset.platform;
      updateCalc();
    });
  });
  document.querySelectorAll('#daysBtns .cb').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#daysBtns .cb').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      days = btn.dataset.days;
      updateCalc();
    });
  });
  updateCalc();
}

function initTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('tab-' + tab.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });
}

function initNav() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }
}

function initScrollReveal() {
  const cards = document.querySelectorAll(
    '.pkg-card, .day-card, .act-card, .c-card'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        if ((entry.target.classList.contains('pkg-featured') || entry.target.classList.contains('day-featured')) && window.innerWidth > 768) {
          entry.target.style.transform = 'translateY(-6px)';
        } else {
          entry.target.style.transform = '';
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(18px)';
    card.style.transition = `opacity 0.45s ease ${i * 0.05}s, transform 0.45s ease ${i * 0.05}s, border-color .25s, box-shadow .25s`;
    observer.observe(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCalc();
  initTabs();
  initScrollReveal();
});