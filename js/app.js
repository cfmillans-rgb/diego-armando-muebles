
document.addEventListener('DOMContentLoaded', () => {
  // --- Header Scroll Effect ---
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Scroll Reveal ---
  const reveals = document.querySelectorAll('.reveal-up, .reveal-fade');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger on load
});

// --- Services Interaction ---
const serviceData = {
  cocinas: {
    title: 'COCINAS INTEGRALES',
    img: 'assets/images/cocina_verde_algarrobo.png',
    desc: 'Diseño de base, aéreos e islas. Optimizamos el flujo de trabajo (triángulo de trabajo) y utilizamos quincallería de tráfico pesado.'
  },
  closets: {
    title: 'CLÓSETS & VESTIDORES',
    img: 'assets/images/closet_empotrado.png',
    desc: 'Armarios a medida de piso a cielo. Optimizamos el almacenaje con zapateros, cajoneras profundas y perfilería de aluminio.'
  },
  cubiertas: {
    title: 'CUBIERTAS DE PIEDRA',
    img: 'assets/images/cocina_alto_brillo.png', // Using available image
    desc: 'Instalación de Granito natural y Cuarzo. Cortes a medida, rebajes para encimeras y zócalos sellados.'
  },
  muebles_tv: {
    title: 'MUEBLES DE SALÓN',
    img: 'assets/images/mueble_tv_puente_alto.png',
    desc: 'Paneles flotantes, racks de TV y bibliotecas. Diseño limpio con ocultamiento inteligente de cables (pasacables).'
  },
  reparaciones: {
    title: 'MANTENCIÓN TÉCNICA',
    img: 'assets/images/flyer_brand.png', // Using available image
    desc: 'Ajuste de bisagras, cambio de rieles telescópicos, escuadre de puertas y mantención general de quincallería.'
  }
};

window.updateServiceView = (key) => {
  const data = serviceData[key];
  if(!data) return;
  
  document.getElementById('service-view-title').innerText = data.title;
  const imgEl = document.getElementById('service-view-img');
  imgEl.style.opacity = 0;
  setTimeout(() => {
    imgEl.src = data.img;
    imgEl.style.opacity = 1;
  }, 150);
  document.getElementById('service-view-desc').innerText = data.desc;
  
  document.querySelectorAll('.service-item-hover').forEach(el => el.classList.remove('active'));
  event.currentTarget.classList.add('active');
};

// --- Modal Case Study ---
const caseStudies = {
  'cocina-algarrobo': {
    category: 'Cocina a Medida',
    title: 'PROYECTO ALGARROBO',
    img: 'assets/images/cocina_verde_algarrobo.png',
    desc: 'Diseño e instalación de cocina integral en la V Región. Se requería maximizar el espacio de guardado manteniendo una estética limpia y moderna que conversara con el entorno natural.',
    specs: [
      'Materialidad: Melamina Verde Olivo 18mm',
      'Cubierta: Granito Negro Absoluto',
      'Tiradores: Perfil Gola Negro Mate',
      'Quincallería: Bisagras cierre suave marca Ducasse'
    ]
  },
  'cocina-providencia': {
    category: 'Cocina Alto Brillo',
    title: 'PROYECTO PROVIDENCIA',
    img: 'assets/images/cocina_alto_brillo.png',
    desc: 'Renovación completa de cocina en departamento. El cliente solicitó un acabado reflectante para amplificar la luz natural, incorporando una cava de vinos vertical a medida.',
    specs: [
      'Materialidad: Tablero High Gloss Blanco',
      'Distribución: Diseño en L con península',
      'Detalle: Cava vertical para 14 botellas',
      'Iluminación: Cinta LED bajo muebles aéreos'
    ]
  },
  'closet-puente-alto': {
    category: 'Clóset Empotrado',
    title: 'PROYECTO PUENTE ALTO',
    img: 'assets/images/closet_empotrado.png',
    desc: 'Fabricación de clóset de muro a muro y de piso a cielo. El desafío fue aprovechar la altura total de la habitación para maleteros, dejando un área inferior altamente funcional.',
    specs: [
      'Configuración: 3 puertas correderas de aluminio',
      'Interior: 5 cajones con riel telescópico',
      'Distribución: Barras dobles de colgar y zapatero vertical',
      'Acabado: Melamina textura lino'
    ]
  },
  'tv-puente-alto': {
    category: 'Mueble de Salón',
    title: 'PANEL TV FLOTANTE',
    img: 'assets/images/mueble_tv_puente_alto.png',
    desc: 'Centro de entretenimiento moderno y suspendido. Se diseñó un panel mural que oculta todo el cableado eléctrico y de red, manteniendo una estética minimalista.',
    specs: [
      'Estructura: Panel flotante reforzado',
      'Funcionalidad: Pasacables ocultos traseros',
      'Almacenamiento: 4 cajones inferiores sin tirador (push-to-open)',
      'Diseño: Contraste madera/negro mate'
    ]
  }
};

window.openProjectModal = (id) => {
  const data = caseStudies[id];
  if(!data) return;
  
  document.getElementById('modal-img').src = data.img;
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
  
  // Trigger animation
  setTimeout(() => {
    backdrop.style.opacity = '1';
    content.style.opacity = '1';
    content.style.transform = 'translateY(0)';
  }, 10);
};

window.closeProjectModal = () => {
  const backdrop = document.getElementById('project-modal-backdrop');
  const content = document.getElementById('project-modal-content');
  
  backdrop.style.opacity = '0';
  content.style.opacity = '0';
  content.style.transform = 'translateY(32px)';
  
  setTimeout(() => {
    document.getElementById('project-modal').classList.add('hidden');
  }, 400);
};

window.quoteSimilarProject = () => {
  closeProjectModal();
  document.getElementById('cotizador').scrollIntoView({behavior: 'smooth'});
};
