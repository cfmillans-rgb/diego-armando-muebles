const fs = require('fs');

const appJsContent = `
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
`;

const cotizadorJsContent = `
let currentStep = 1;
const totalSteps = 4;
let projectData = {
  type: 'cocina',
  dim_width: 240,
  dim_height: 220,
  dim_depth: 60,
  dim_unknown: false,
  material: 'Melamina Estándar'
};

document.addEventListener('DOMContentLoaded', () => {
  // Option Card Selection
  document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', function() {
      // Remove selected from siblings
      this.parentNode.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
      // Select this
      this.classList.add('selected');
      projectData.type = this.dataset.type;
    });
  });

  // Dimension inputs
  document.getElementById('dim-width').addEventListener('input', (e) => projectData.dim_width = e.target.value);
  document.getElementById('dim-height').addEventListener('input', (e) => projectData.dim_height = e.target.value);
  document.getElementById('dim-depth').addEventListener('input', (e) => projectData.dim_depth = e.target.value);
  
  document.getElementById('dim-unknown').addEventListener('change', (e) => {
    projectData.dim_unknown = e.target.checked;
    const inputs = ['dim-width', 'dim-height', 'dim-depth'];
    inputs.forEach(id => {
      document.getElementById(id).disabled = e.target.checked;
      document.getElementById(id).style.opacity = e.target.checked ? '0.5' : '1';
    });
  });
});

window.nextStep = () => {
  if (currentStep < totalSteps) {
    if (currentStep === 2) {
      generateMaterialStep();
    }
    if (currentStep === 3) {
      generateSummary();
    }
    
    // Hide current
    document.getElementById('step-pane-' + currentStep).classList.remove('active');
    document.getElementById('step-circle-' + currentStep).classList.remove('active');
    document.getElementById('step-circle-' + currentStep).classList.add('completed');
    
    currentStep++;
    
    // Show next
    document.getElementById('step-pane-' + currentStep).classList.add('active');
    document.getElementById('step-circle-' + currentStep).classList.add('active');
    
    updateProgress();
    updateControls();
    updateTitle();
  }
};

window.prevStep = () => {
  if (currentStep > 1) {
    // Hide current
    document.getElementById('step-pane-' + currentStep).classList.remove('active');
    document.getElementById('step-circle-' + currentStep).classList.remove('active');
    
    currentStep--;
    
    // Show previous
    document.getElementById('step-pane-' + currentStep).classList.add('active');
    document.getElementById('step-circle-' + currentStep).classList.remove('completed');
    document.getElementById('step-circle-' + currentStep).classList.add('active');
    
    updateProgress();
    updateControls();
    updateTitle();
  }
};

function updateProgress() {
  const percent = ((currentStep - 1) / (totalSteps - 1)) * 100;
  document.getElementById('stepper-progress').style.width = percent + '%';
}

function updateControls() {
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  
  if (currentStep === 1) {
    btnPrev.classList.add('hidden');
  } else {
    btnPrev.classList.remove('hidden');
  }
  
  if (currentStep === totalSteps) {
    btnNext.classList.add('hidden');
  } else {
    btnNext.classList.remove('hidden');
  }
}

function updateTitle() {
  const titles = [
    '1. ¿QUÉ NECESITAMOS FABRICAR?',
    '2. ESPECIFICACIONES DIMENSIONALES',
    '3. SELECCIÓN DE MATERIALIDAD',
    '4. HOJA DE RUTA & COTIZACIÓN'
  ];
  document.getElementById('step-current-title').innerText = titles[currentStep - 1];
}

function generateMaterialStep() {
  const content = document.getElementById('step3-dynamic-content');
  content.innerHTML = '';
  
  const options = [
    { name: 'Melamina Estándar', desc: 'Blanco / Colores sólidos básicos', priceMod: 1 },
    { name: 'Melamina Maderada', desc: 'Texturas de madera nativa', priceMod: 1.2 },
    { name: 'High Gloss / Pet', desc: 'Acabado brillante o mate antihuellas', priceMod: 1.5 },
  ];
  
  if(projectData.type === 'cubierta') {
    options.length = 0;
    options.push({ name: 'Granito', desc: 'Piedra natural de alta dureza', priceMod: 1 });
    options.push({ name: 'Cuarzo Silestone', desc: 'Colores puros, antibacteriano', priceMod: 1.4 });
  }
  
  options.forEach((opt, idx) => {
    const div = document.createElement('div');
    div.className = \`option-card p-5 \${idx === 0 ? 'selected' : ''}\`;
    div.onclick = function() {
      document.querySelectorAll('#step3-dynamic-content .option-card').forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      projectData.material = opt.name;
    };
    if (idx === 0) projectData.material = opt.name;
    
    div.innerHTML = \`
      <h4 class="font-heading text-lg font-bold">\${opt.name}</h4>
      <p class="font-tech text-[9px] text-[#9ba399] uppercase mt-1">\${opt.desc}</p>
      <div class="check-badge absolute top-4 right-4 text-[#d4a034]"><i data-lucide="check-circle-2" class="w-5 h-5"></i></div>
    \`;
    content.appendChild(div);
  });
  lucide.createIcons();
}

function generateSummary() {
  const typeMap = {
    'cocina': 'COCINA A MEDIDA',
    'closet': 'CLÓSET / VESTIDOR',
    'vanitorio': 'VANITORIO DE BAÑO',
    'mueble_tv': 'MUEBLE DE SALÓN',
    'cubierta': 'CUBIERTA DE PIEDRA',
    'reparacion': 'MANTENCIÓN TÉCNICA'
  };
  
  document.getElementById('summary-type').innerText = typeMap[projectData.type] || 'PROYECTO';
  
  if(projectData.dim_unknown) {
    document.getElementById('summary-dim').innerText = 'PENDIENTE (RECTIFICACIÓN TALLER)';
  } else {
    document.getElementById('summary-dim').innerText = \`\${projectData.dim_width}W x \${projectData.dim_height}H x \${projectData.dim_depth}D CM\`;
  }
  
  document.getElementById('summary-mat').innerText = projectData.material.toUpperCase();
  
  // Calculate fake price for demo
  let basePrice = 300000;
  if(projectData.type === 'cocina') basePrice = 800000;
  if(projectData.type === 'closet') basePrice = 450000;
  if(projectData.type === 'reparacion') basePrice = 50000;
  
  let mod = 1;
  if(projectData.material.includes('Maderada')) mod = 1.2;
  if(projectData.material.includes('Gloss') || projectData.material.includes('Cuarzo')) mod = 1.5;
  
  const minPrice = Math.round((basePrice * mod) / 1000) * 1000;
  const maxPrice = Math.round((basePrice * mod * 1.3) / 1000) * 1000;
  
  const formatter = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
  
  if(projectData.type === 'reparacion') {
    document.getElementById('price-result').innerText = 'Visita desde ' + formatter.format(30000);
  } else {
    document.getElementById('price-result').innerText = \`\${formatter.format(minPrice)} - \${formatter.format(maxPrice)}\`;
  }
}

window.sendWhatsApp = () => {
  const phone = "56992317042";
  const typeMap = {
    'cocina': 'Cocina a Medida',
    'closet': 'Clóset / Vestidor',
    'vanitorio': 'Vanitorio',
    'mueble_tv': 'Mueble de Salón',
    'cubierta': 'Cubierta',
    'reparacion': 'Reparación / Mantención'
  };
  
  let msg = \`Hola Diego Armando, me gustaría cotizar un proyecto.\\n\\n*Detalles del Proyecto:*\\n- Tipo: \${typeMap[projectData.type]}\\n\`;
  
  if (projectData.dim_unknown) {
    msg += \`- Dimensiones: No estoy seguro, necesito rectificación.\\n\`;
  } else {
    msg += \`- Dimensiones aprox: \${projectData.dim_width}cm ancho x \${projectData.dim_height}cm alto x \${projectData.dim_depth}cm prof.\\n\`;
  }
  
  msg += \`- Materialidad: \${projectData.material}\\n\\nQuedo atento(a) para coordinar.\`;
  
  const encodedMsg = encodeURIComponent(msg);
  window.open(\`https://wa.me/\${phone}?text=\${encodedMsg}\`, '_blank');
};
`;

fs.writeFileSync('js/app.js', appJsContent, 'utf8');
fs.writeFileSync('js/cotizador.js', cotizadorJsContent, 'utf8');
console.log('js files successfully rewritten');
