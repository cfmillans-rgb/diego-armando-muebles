
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
    div.className = `option-card p-5 ${idx === 0 ? 'selected' : ''}`;
    div.onclick = function() {
      document.querySelectorAll('#step3-dynamic-content .option-card').forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      projectData.material = opt.name;
    };
    if (idx === 0) projectData.material = opt.name;
    
    div.innerHTML = `
      <h4 class="font-heading text-lg font-bold">${opt.name}</h4>
      <p class="font-tech text-[9px] text-[#9ba399] uppercase mt-1">${opt.desc}</p>
      <div class="check-badge absolute top-4 right-4 text-[#d4a034]"><i data-lucide="check-circle-2" class="w-5 h-5"></i></div>
    `;
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
    document.getElementById('summary-dim').innerText = `${projectData.dim_width}W x ${projectData.dim_height}H x ${projectData.dim_depth}D CM`;
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
    document.getElementById('price-result').innerText = `${formatter.format(minPrice)} - ${formatter.format(maxPrice)}`;
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
  
  let msg = `Hola Diego Armando, me gustaría cotizar un proyecto.\n\n*Detalles del Proyecto:*\n- Tipo: ${typeMap[projectData.type]}\n`;
  
  if (projectData.dim_unknown) {
    msg += `- Dimensiones: No estoy seguro, necesito rectificación.\n`;
  } else {
    msg += `- Dimensiones aprox: ${projectData.dim_width}cm ancho x ${projectData.dim_height}cm alto x ${projectData.dim_depth}cm prof.\n`;
  }
  
  msg += `- Materialidad: ${projectData.material}\n\nQuedo atento(a) para coordinar.`;
  
  const encodedMsg = encodeURIComponent(msg);
  window.open(`https://wa.me/${phone}?text=${encodedMsg}`, '_blank');
};
