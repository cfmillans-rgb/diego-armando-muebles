document.addEventListener('DOMContentLoaded', () => {
  // --- Header Scroll Effect ---
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('bg-[#0c0d0c]/95', 'border-b', 'border-[#d4a034]/20', 'shadow-md');
      } else {
        header.classList.remove('bg-[#0c0d0c]/95', 'border-b', 'border-[#d4a034]/20', 'shadow-md');
      }
    });
  }

  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // --- Scroll Reveal (Respecting prefers-reduced-motion) ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal-up');
  
  const revealOnScroll = () => {
    if (prefersReducedMotion) {
      reveals.forEach(reveal => reveal.classList.add('active'));
      return;
    }
    
    const windowHeight = window.innerHeight;
    const elementVisible = 50;
    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };
  
  if (!prefersReducedMotion) {
    window.addEventListener('scroll', revealOnScroll, { passive: true });
  }
  revealOnScroll(); // Trigger on load

  // --- Services Interaction (Tabs Accessibilidad) ---
  const serviceTabs = document.querySelectorAll('.service-tab');
  if (serviceTabs.length > 0) {
    serviceTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const key = e.currentTarget.getAttribute('data-key');
        updateServiceView(key, e.currentTarget);
      });
    });
  }

  // --- Modal Close Button ---
  const closeModalBtn = document.getElementById('close-modal-btn');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', window.closeProjectModal);
  }
  
  const modalBackdrop = document.getElementById('project-modal-backdrop');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', window.closeProjectModal);
  }

  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('project-modal');
      if (modal && !modal.classList.contains('hidden')) {
        window.closeProjectModal();
      }
    }
  });
});

// --- Services Data (Datos referenciales solicitados mantener) ---
const serviceData = {
  cocinas: {
    title: 'Cocinas integrales',
    img: 'assets/images/cocina_verde_algarrobo.png',
    desc: 'Diseño de base, aéreos e islas. Optimizamos el flujo de trabajo y utilizamos quincallería de tráfico pesado.'
  },
  closets: {
    title: 'Clósets y vestidores',
    img: 'assets/images/closet_empotrado.png',
    desc: 'Armarios a medida de piso a cielo. Optimizamos el almacenaje con zapateros, cajoneras profundas y perfilería de aluminio.'
  },
  cubiertas: {
    title: 'Cubiertas de piedra',
    img: 'assets/images/cocina_alto_brillo.png',
    desc: 'Instalación de Granito natural y Cuarzo. Cortes a medida, rebajes para encimeras y zócalos sellados.'
  },
  muebles_tv: {
    title: 'Muebles de salón',
    img: 'assets/images/mueble_tv_puente_alto.png',
    desc: 'Paneles flotantes, racks de TV y bibliotecas. Diseño limpio con ocultamiento inteligente de cables.'
  },
  reparaciones: {
    title: 'Mantención técnica',
    img: 'assets/images/flyer_brand.png',
    desc: 'Ajuste de bisagras, cambio de rieles telescópicos, escuadre de puertas y mantención general.'
  }
};

window.updateServiceView = (key, targetElement) => {
  const data = serviceData[key];
  if(!data) return;
  
  // Update texts and image
  document.getElementById('service-view-title').innerText = data.title;
  document.getElementById('service-view-desc').innerText = data.desc;
  
  const imgEl = document.getElementById('service-view-img');
  imgEl.style.opacity = 0;
  setTimeout(() => {
    imgEl.src = data.img;
    imgEl.alt = "Vista previa de " + data.title;
    imgEl.style.opacity = 1;
  }, 200);
  
  // Update ARIA states
  document.querySelectorAll('.service-tab').forEach(el => {
    el.classList.remove('active', 'border-[#d4a034]');
    el.setAttribute('aria-selected', 'false');
  });
  
  if (targetElement) {
    targetElement.classList.add('active', 'border-[#d4a034]');
    targetElement.setAttribute('aria-selected', 'true');
  }
};

// --- Modal Case Study (Datos referenciales solicitados mantener) ---
const caseStudies = {
  'cocina-algarrobo': {
    category: 'Cocina a Medida',
    title: 'Proyecto Algarrobo',
    img: 'assets/images/cocina_verde_algarrobo.png',
    desc: 'Diseño e instalación de cocina integral en la V Región. [DATOS REFERENCIALES POR VERIFICAR CON EL CLIENTE]',
    specs: [
      'Materialidad: Melamina Verde Olivo 18mm',
      'Cubierta: Granito Negro Absoluto',
      'Tiradores: Perfil Gola Negro Mate',
      'Quincallería: Bisagras cierre suave marca Ducasse'
    ]
  },
  'cocina-providencia': {
    category: 'Cocina Alto Brillo',
    title: 'Proyecto Providencia',
    img: 'assets/images/cocina_alto_brillo.png',
    desc: 'Renovación completa de cocina en departamento. [DATOS REFERENCIALES POR VERIFICAR CON EL CLIENTE]',
    specs: [
      'Materialidad: Tablero High Gloss Blanco',
      'Distribución: Diseño en L con península',
      'Detalle: Cava vertical para 14 botellas',
      'Iluminación: Cinta LED bajo muebles aéreos'
    ]
  },
  'closet-puente-alto': {
    category: 'Clóset Empotrado',
    title: 'Proyecto Puente Alto',
    img: 'assets/images/closet_empotrado.png',
    desc: 'Fabricación de clóset de muro a muro y de piso a cielo. [DATOS REFERENCIALES POR VERIFICAR CON EL CLIENTE]',
    specs: [
      'Configuración: 3 puertas correderas de aluminio',
      'Interior: 5 cajones con riel telescópico',
      'Distribución: Barras dobles de colgar y zapatero vertical',
      'Acabado: Melamina textura lino'
    ]
  },
  'tv-puente-alto': {
    category: 'Mueble de Salón',
    title: 'Panel TV Flotante',
    img: 'assets/images/mueble_tv_puente_alto.png',
    desc: 'Centro de entretenimiento suspendido. Se diseñó un panel mural que oculta el cableado. [DATOS REFERENCIALES POR VERIFICAR CON EL CLIENTE]',
    specs: [
      'Estructura: Panel flotante reforzado',
      'Funcionalidad: Pasacables ocultos traseros',
      'Almacenamiento: 4 cajones inferiores (push-to-open)',
      'Diseño: Contraste madera/negro mate'
    ]
  }
};

let previousFocusElement = null;

window.openProjectModal = (id) => {
  const data = caseStudies[id];
  if(!data) return;
  
  previousFocusElement = document.activeElement;
  
  document.getElementById('modal-img').src = data.img;
  document.getElementById('modal-img').alt = "Fotografía del " + data.title;
  document.getElementById('modal-category').innerText = data.category;
  document.getElementById('modal-title').innerText = data.title;
  document.getElementById('modal-desc').innerText = data.desc;
  
  const specsList = document.getElementById('modal-specs');
  specsList.innerHTML = '';
  data.specs.forEach(spec => {
    const li = document.createElement('li');
    li.innerHTML = '<span class="text-[#d4a034] mr-2">•</span> ' + spec;
    specsList.appendChild(li);
  });
  
  const modal = document.getElementById('project-modal');
  const backdrop = document.getElementById('project-modal-backdrop');
  const content = document.getElementById('project-modal-content');
  
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Evita el scroll de fondo
  
  // Trigger animation & set focus
  setTimeout(() => {
    backdrop.style.opacity = '1';
    content.style.opacity = '1';
    content.style.transform = 'translateY(0)';
    document.getElementById('close-modal-btn').focus();
  }, 10);
};

window.closeProjectModal = () => {
  const backdrop = document.getElementById('project-modal-backdrop');
  const content = document.getElementById('project-modal-content');
  
  backdrop.style.opacity = '0';
  content.style.opacity = '0';
  content.style.transform = 'translateY(32px)';
  document.body.style.overflow = ''; 
  
  setTimeout(() => {
    document.getElementById('project-modal').classList.add('hidden');
    if (previousFocusElement) {
      previousFocusElement.focus();
    }
  }, 300); // 300ms coincides with tailwind transition duration
};

window.quoteSimilarProject = () => {
  window.closeProjectModal();
  document.getElementById('cotizador').scrollIntoView({behavior: 'smooth'});
  // Opcional: preseleccionar el cotizador según el proyecto
};
