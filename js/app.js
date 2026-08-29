// App JS - Diego Armando Muebles
// Handles UI, Lightbox Modal, Filter tabs, Mobile Menu, and FAQ accordions

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initPortfolioFilters();
  initFaqAccordion();
  initSmoothScroll();
});

// Mobile Navigation Toggle
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');

  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
      });
    });
  }
}

// Portfolio Filter Logic
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const projectCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => {
        b.classList.remove('bg-[#e0b142]', 'text-black', 'font-extrabold');
        b.classList.add('bg-[#1a1d1b]', 'text-gray-300', 'hover:text-white', 'border', 'border-white/15');
      });
      btn.classList.add('bg-[#e0b142]', 'text-black', 'font-extrabold');
      btn.classList.remove('bg-[#1a1d1b]', 'text-gray-300', 'hover:text-white', 'border', 'border-white/15');

      projectCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

// FAQ Accordion
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (trigger && answer) {
      trigger.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');

        document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
        document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

        if (!isOpen) {
          answer.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });
}

// Smooth scroll helper
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Lightbox Modal for Project Details
const PROJECT_MODAL_DATA = {
  'cocina-algarrobo': {
    title: 'Cocina Verde Olivo con Granito Negro',
    location: 'Algarrobo, V Región',
    category: 'Cocinas a Medida',
    image: 'assets/images/cocina_verde_algarrobo.png',
    description: 'Fabricación integral de muebles base y aéreos en acabado verde olivo mate con tiradores negros de perfilería continua. Cubierta de granito natural negro pulido con zócalos y salpicadero blanco tipo metro.',
    specs: [
      'Material: Melamina 18mm con cantos PVC sellados',
      'Cubierta: Granito Negro San Gabriel con rebaje para encimera',
      'Quincallería: Bisagras cierre suave y rieles telescópicos pesados',
      'Instalación: Montaje milimétrico en Algarrobo'
    ],
    projectType: 'cocina'
  },
  'cocina-providencia': {
    title: 'Cocina Alto Brillo con Cava Integrada',
    location: 'Providencia, Santiago',
    category: 'Cocinas a Medida',
    image: 'assets/images/cocina_alto_brillo.png',
    description: 'Diseño en esquina en acabado High Gloss blanco espejo. Incluye botellero / cava vertical de suelo a cielo para 14 botellas y nicho para horno microondas.',
    specs: [
      'Material: Melamina Alto Brillo (High Gloss) blanca',
      'Detalles: Cava vertical con repisas ranuradas',
      'Distribución: Módulo esquinero con máximo almacenamiento',
      'Garantía: Estructura y montaje de taller garantizados'
    ],
    projectType: 'cocina'
  },
  'closet-santiago': {
    title: 'Clóset Empotrado con Puertas Correderas',
    location: 'Puente Alto / Santiago',
    category: 'Clósets & Vestidores',
    image: 'assets/images/closet_empotrado.png',
    description: 'Clóset a medida instalado de piso a cielo con riel superior e inferior de aluminio. Distribución interior con zapatero lateral vertical de 8 niveles, 5 cajoneras reforzadas y repisas regulables.',
    specs: [
      'Material: Melamina blanca 18mm reforzada',
      'Sistema de puertas: Correderas sobre rieles de aluminio',
      'Cajoneras: Rieles telescópicos de carga pesada',
      'Instalación: Ajuste exacto a muros y cielo'
    ],
    projectType: 'closet'
  },
  'tv-puente-alto': {
    title: 'Mueble de Televisor Flotante con Repisas',
    location: 'Puente Alto, Santiago',
    category: 'Muebles de TV & Hogar',
    image: 'assets/images/mueble_tv_puente_alto.png',
    description: 'Centro de entretenimiento mural flotante en melamina tono madera nórdica. Repisas aéreas decorativas simétricas y módulo inferior con 2 cajoneras y tiradores de aluminio.',
    specs: [
      'Diseño: Panel mural con pasacables oculto',
      'Repisas: 4 repisas flotantes de soporte reforzado',
      'Cajones: 2 amplios cajones con correderas telescópicas',
      'Fijación: Anclaje de alta resistencia a muro'
    ],
    projectType: 'mueble_tv'
  },
  'flyer-oficial': {
    title: 'Taller & Servicios Diego Armando Muebles',
    location: 'Santiago y Región Metropolitana',
    category: 'Servicios Integrales',
    image: 'assets/images/flyer_brand.png',
    description: 'Diseño, Creación, Instalación y Reparación de muebles a medida. Trato directo con el maestro mueblista, materiales seleccionados y quincallería de primera.',
    specs: [
      'Contacto directo: +569 9231 7042',
      'Instagram: @diegoarmandomuebles',
      'Cobertura: Santiago, Providencia, Puente Alto, Algarrobo y alrededores',
      'Calidad, durabilidad y acabados que marcan la diferencia'
    ],
    projectType: 'cocina'
  }
};

function openProjectModal(projectId) {
  const data = PROJECT_MODAL_DATA[projectId];
  if (!data) return;

  const modal = document.getElementById('project-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalLocation = document.getElementById('modal-location');
  const modalCategory = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-description');
  const modalSpecs = document.getElementById('modal-specs');
  const modalCotizarBtn = document.getElementById('modal-cotizar-btn');

  if (modalImg) modalImg.src = data.image;
  if (modalTitle) modalTitle.textContent = data.title;
  if (modalLocation) modalLocation.textContent = `📍 ${data.location}`;
  if (modalCategory) modalCategory.textContent = data.category;
  if (modalDesc) modalDesc.textContent = data.description;

  if (modalSpecs) {
    modalSpecs.innerHTML = data.specs.map(spec => `
      <li class="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
        <span class="text-[#e0b142] font-bold">✓</span>
        <span>${spec}</span>
      </li>
    `).join('');
  }

  if (modalCotizarBtn) {
    modalCotizarBtn.onclick = () => {
      closeProjectModal();
      startCotizarWithService(data.projectType);
    };
  }

  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});
