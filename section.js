/* ==========================================================================
   Motor genérico del visor de slides, usado por cada sección.
   Recibe una configuración (ver seccion-*.html) y arma el DOM a partir
   del contenido compartido en slides-data.js.
   ========================================================================== */
function initSection(config) {
  const ids = config.ids;
  const track = document.getElementById('sliderTrack');
  const indicator = document.getElementById('pageIndicator');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progressFill = document.getElementById('progressFill');
  const transitionView = document.getElementById('transitionView');

  // Construye las slides a partir de los datos compartidos
  ids.forEach((id, i) => {
    const data = window.SLIDES[id];
    const slide = document.createElement('div');
    slide.className = 'slide';

    const isLast = i === ids.length - 1;
    slide.innerHTML = `
      <div class="card"><div class="card-scroll-area">
        <span class="slide-eyebrow">${config.sectionLabel} · ${i + 1} / ${ids.length}</span>
        <h2 class="slide-title">${data.title}</h2>
        <div class="slide-body">${data.body}</div>
        ${isLast ? `<div class="cta-wrapper"><button class="btn-final" id="sectionCtaBtn">${config.transitionBtn}</button></div>` : ''}
      </div></div>
    `;
    track.appendChild(slide);
  });

  const cards = () => document.querySelectorAll('.card-scroll-area');
  let currentIndex = 0;
  const total = ids.length;

  function update() {
    track.style.transform = `translateX(-${currentIndex * 100}vw)`;
    indicator.textContent = `${currentIndex + 1} / ${total}`;
    progressFill.style.width = `${((currentIndex + 1) / total) * 100}%`;

    prevBtn.classList.toggle('is-hidden', currentIndex === 0);
    nextBtn.classList.toggle('is-hidden', currentIndex === total - 1);

    const currentCard = cards()[currentIndex];
    if (currentCard) currentCard.scrollTo({ top: 0, behavior: 'instant' });
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < total - 1) { currentIndex++; update(); }
  });
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) { currentIndex--; update(); }
  });

  update();

  // CTA final de la sección -> pantalla de transición
  document.getElementById('sectionCtaBtn').addEventListener('click', () => {
    transitionView.classList.add('is-active');
  });
}
