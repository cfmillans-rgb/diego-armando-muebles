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

    // Close mobile menu on link click
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

      // Update button active state
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#1e3a2b]', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
      });
      btn.classList.add('bg-[#1e3a2b]', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100');

      // Filter cards
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

        // Close all
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
    category: 'Cocinas Integrales',
    image: 'assets/images/cocina_verde_algarrobo.png',
    description: 'Fabricación completa de muebles base y aéreos en tono verde olivo mate con tiradores de perfilería negra. Cubierta de granito negro pulido con rebaje para encimera vitrocerámica y revestimiento cerámico tipo metro blanco.',
    specs: [
      'Material: Melamina 18mm con cantos PVC 2mm',
      'Cubierta: Granito Negro San Gabriel con zócalo',
      'Bisagras y Rieles: Cierre suave telescópicos',
      'Tiempo de fabricación e instalación: 12 días hábiles'
    ],
    projectType: 'cocina'
  },
  'cocina-providencia': {
    title: 'Cocina Alto Brillo con Cava Vertical',
    location: 'Providencia, Santiago',
    category: 'Cocinas Integrales',
    image: 'assets/images/cocina_alto_brillo.png',
    description: 'Diseño ultra-moderno en esquina con acabado High Gloss blanco espejo. Incluye botellero / cava vertical integrada de piso a cielo, espacio empotrado para horno microondas y muebles modulares de alta capacidad.',
    specs: [
      'Material: Melamina Alto Brillo (High Gloss) blanca',
      'Detalles: Cava vertical para 14 botellas',
      'Distribución: Módulo esquinero de máximo aprovechamiento',
      'Garantía: 1 año en estructura e instalación'
    ],
    projectType: 'cocina'
  },
  'closet-santiago': {
    title: 'Clóset Empotrado con Puertas Correderas',
    location: 'Puente Alto / Santiago',
    category: 'Clósets & Vestidores',
    image: 'assets/images/closet_empotrado.png',
    description: 'Clóset a medida instalado de piso a cielo con sistema de puertas correderas de suave desplazamiento. Distribución interior optimizada con zapatero vertical lateral de 8 niveles, 5 amplios cajones y repisas regulables.',
    specs: [
      'Material: Melamina blanca 18mm reforzada',
      'Rieles: Sistema corredero superior e inferior de aluminio',
      'Cajoneras: Rieles telescópicos metálicos de carga pesada',
      'Instalación: Ajuste preciso a muros y nivelación'
    ],
    projectType: 'closet'
  },
  'tv-puente-alto': {
    title: 'Mueble de Televisor Flotante con Repisas',
    location: 'Puente Alto, Santiago',
    category: 'Muebles de TV & Hogar',
    image: 'assets/images/mueble_tv_puente_alto.png',
    description: 'Centro de entretenimiento flotante con panel mural texturado tono madera nórdica y repisas aéreas simétricas. Módulo inferior suspendido con 2 cajones amplios y tiradores metálicos de aluminio.',
    specs: [
      'Diseño: Panel de fondo con pasacables oculto',
      'Repisas: Repisas flotantes dobles para decoración y audio',
      'Cajones: 2 módulos de guardado con tiradores ergonómicos',
      'Anclaje: Fijación reforzada a muro de concreto'
    ],
    projectType: 'mueble_tv'
  },
  'flyer-oficial': {
    title: 'Taller & Servicios Diego Armando Muebles',
    location: 'Santiago y Región Metropolitana',
    category: 'Servicios Integrales',
    image: 'assets/images/flyer_brand.png',
    description: 'Servicio integral de carpintería y diseño a medida: Cocinas, Clósets, Vanitorios, Cubiertas de Granito/Cuarzo/Mármol y Reparación general de muebles existentes con atención personalizada por Diego Armando.',
    specs: [
      'Contacto directo: +569 9231 7042',
      'Instagram: @diegoarmandomuebles',
      'Cobertura: Santiago, Providencia, Puente Alto, Algarrobo y más',
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
      <li class="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
        <span class="text-[#1e3a2b] font-bold">✓</span>
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

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});
