// Tabs de canais
document.querySelectorAll('.tabs [data-tab]').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var tab = this.dataset.tab;
    document.querySelectorAll('.tabs [data-tab]').forEach(function(b) {
      b.classList.toggle('active', b.dataset.tab === tab);
    });
    document.querySelectorAll('.tab-content').forEach(function(panel) {
      panel.style.display = panel.dataset.content === tab ? '' : 'none';
    });
  });
});

// Comparador de roteadores (arrastar / hover)
var comp = document.querySelector('.comparador');
if (comp) {
  var setPos = function(pct) {
    comp.style.setProperty('--pos', pct + '%');
    comp.style.setProperty('--zte-opacity', (1 - pct / 100).toFixed(3));
    comp.style.setProperty('--huawei-opacity', (pct / 100).toFixed(3));
    comp.dataset.pos = pct;
  };
  setPos(50);
  comp.addEventListener('mousemove', function(e) {
    var r = comp.getBoundingClientRect();
    setPos(Math.round(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * 100));
  });
  comp.addEventListener('touchmove', function(e) {
    if (!e.touches[0]) return;
    var r = comp.getBoundingClientRect();
    setPos(Math.round(Math.max(0, Math.min(1, (e.touches[0].clientX - r.left) / r.width)) * 100));
  }, { passive: true });
}

// Animações de scroll (cima / baixo / esquerda / direita)
var elementos = document.querySelectorAll('.cima, .baixo, .esquerda, .direita');
var fadeScroll = function() {
  var limite = window.innerHeight * 0.5;
  elementos.forEach(function(el) {
    el.classList.toggle('ativo', el.getBoundingClientRect().top - limite < 320);
  });
};
requestAnimationFrame(fadeScroll);
window.addEventListener('scroll', fadeScroll, { passive: true });
window.addEventListener('resize', fadeScroll);

// Reveal via IntersectionObserver
var io = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(function(el) { io.observe(el); });

// Sticky CTA (aparece após rolar 70% da viewport, some perto do footer)
var stickyCta = document.getElementById('sticky-cta');
if (stickyCta) {
  var onScroll = function() {
    var y = window.scrollY;
    var h = window.innerHeight;
    var footer = document.querySelector('.footer');
    var footerTop = footer ? footer.getBoundingClientRect().top + y : Infinity;
    stickyCta.classList.toggle('visible', y > h * 0.7 && !(y + h > footerTop + 80));
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
