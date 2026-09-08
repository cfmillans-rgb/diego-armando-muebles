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
      this.parentNode.querySelectorAll('.option-card').forEach(c => {
        c.classList.remove('selected');
        c.setAttribute('aria-pressed', 'false');
      });
      this.classList.add('selected');
      this.setAttribute('aria-pressed', 'true');
      projectData.type = this.dataset.type;
    });
  });

  // Dimension inputs
  const dimWidth = document.getElementById('dim-width');
  const dimHeight = document.getElementById('dim-height');
  const dimDepth = document.getElementById('dim-depth');
  
  if (dimWidth) dimWidth.addEventListener('input', (e) => { projectData.dim_width = e.target.value; clearDimError(); });
  if (dimHeight) dimHeight.addEventListener('input', (e) => { projectData.dim_height = e.target.value; clearDimError(); });
  if (dimDepth) dimDepth.addEventListener('input', (e) => { projectData.dim_depth = e.target.value; clearDimError(); });
  
  const dimUnknown = document.getElementById('dim-unknown');
  if (dimUnknown) {
    dimUnknown.addEventListener('change', (e) => {
      projectData.dim_unknown = e.target.checked;
      const inputs = ['dim-width', 'dim-height', 'dim-depth'];
      inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          el.disabled = e.target.checked;
          el.style.opacity = e.target.checked ? '0.5' : '1';
          el.classList.remove('input-error');
        }
      });
      clearDimError();
    });
  }
});

function clearDimError() {
  const errorEl = document.getElementById('dim-error');
  if (errorEl) errorEl.classList.add('hidden');
  ['dim-width', 'dim-height', 'dim-depth'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('input-error');
  });
}

function validateDimensions() {
  if (projectData.dim_unknown) return true;
  
  const w = parseInt(projectData.dim_width);
  const h = parseInt(projectData.dim_height);
  const d = parseInt(projectData.dim_depth);
  
  const valid = w >= 10 && h >= 10 && d >= 10;
  
  if (!valid) {
    const errorEl = document.getElementById('dim-error');
    if (errorEl) errorEl.classList.remove('hidden');
    
    ['dim-width', 'dim-height', 'dim-depth'].forEach(id => {
      const el = document.getElementById(id);
      if (el && parseInt(el.value) < 10) {
        el.classList.add('input-error');
      }
    });
  }
  
  return valid;
}

function updateProgress() {
  const label = document.getElementById('step-progress-label');
  const bar = document.getElementById('step-progress-bar');
  if (label) label.textContent = 'Paso ' + currentStep + ' de ' + totalSteps;
  if (bar) bar.style.width = ((currentStep / totalSteps) * 100) + '%';
}

window.nextStep = () => {
  if (currentStep < totalSteps) {
    // Validate step 2 (dimensions) before advancing
    if (currentStep === 2 && !validateDimensions()) {
      return;
    }
    
    if (currentStep === 2) {
      generateMaterialStep();
    }
    if (currentStep === 3) {
      generateSummary();
    }
    
    // Hide current
    const currentPane = document.getElementById('step-pane-' + currentStep);
    if (currentPane) {
      currentPane.classList.remove('active');
      currentPane.classList.add('hidden');
    }
    
    currentStep++;
    
    // Show next
    const nextPane = document.getElementById('step-pane-' + currentStep);
    if (nextPane) {
      nextPane.classList.remove('hidden');
      nextPane.classList.add('active');
    }
    
    updateControls();
    updateTitle();
    updateProgress();
  }
};

window.prevStep = () => {
  if (currentStep > 1) {
    const currentPane = document.getElementById('step-pane-' + currentStep);
    if (currentPane) {
      currentPane.classList.remove('active');
      currentPane.classList.add('hidden');
    }
    
    currentStep--;
    
    const prevPane = document.getElementById('step-pane-' + currentStep);
    if (prevPane) {
      prevPane.classList.remove('hidden');
      prevPane.classList.add('active');
    }
    
    updateControls();
    updateTitle();
    updateProgress();
  }
};

function updateControls() {
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  
  if (btnPrev) {
    if (currentStep === 1) {
      btnPrev.classList.add('hidden');
    } else {
      btnPrev.classList.remove('hidden');
    }
  }
  
  if (btnNext) {
    if (currentStep === totalSteps) {
      btnNext.classList.add('hidden');
    } else {
      btnNext.classList.remove('hidden');
    }
  }
}

function updateTitle() {
  const titles = [
    '1. ¿Qué mueble necesitas?',
    '2. Dimensiones referenciales',
    '3. Selección de materialidad',
    '4. Resumen y envío por WhatsApp'
  ];
  const titleEl = document.getElementById('step-current-title');
  if (titleEl) {
    titleEl.innerText = titles[currentStep - 1];
  }
}

function generateMaterialStep() {
  const content = document.getElementById('step3-dynamic-content');
  if (!content) return;
  content.innerHTML = '';
  
  const options = [
    { name: 'Melamina Estándar', desc: 'Blanco / Colores sólidos básicos' },
    { name: 'Melamina Maderada', desc: 'Texturas de madera nativa' },
    { name: 'High Gloss / Pet', desc: 'Acabado brillante o mate antihuellas' },
  ];
  
  if (projectData.type === 'cubierta') {
    options.length = 0;
    options.push({ name: 'Granito', desc: 'Piedra natural de alta dureza' });
    options.push({ name: 'Cuarzo Silestone', desc: 'Colores puros, antibacteriano' });
  }
  
  options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-card p-4 text-left focus:outline-none focus:ring-2 focus:ring-[#d4a034]' + (idx === 0 ? ' selected' : '');
    btn.setAttribute('aria-pressed', idx === 0 ? 'true' : 'false');
    btn.onclick = function() {
      document.querySelectorAll('#step3-dynamic-content .option-card').forEach(c => {
        c.classList.remove('selected');
        c.setAttribute('aria-pressed', 'false');
      });
      this.classList.add('selected');
      this.setAttribute('aria-pressed', 'true');
      projectData.material = opt.name;
    };
    if (idx === 0) projectData.material = opt.name;
    
    btn.innerHTML = '<h4 class="font-heading text-base font-bold text-white">' + opt.name + '</h4>' +
      '<p class="font-tech text-[10px] text-[#9ba399] mt-1">' + opt.desc + '</p>';
    content.appendChild(btn);
  });
}

function generateSummary() {
  const typeMap = {
    'cocina': 'Cocina a medida',
    'closet': 'Clóset / Vestidor',
    'vanitorio': 'Vanitorio de baño',
    'mueble_tv': 'Mueble de salón',
    'cubierta': 'Cubierta de piedra',
    'reparacion': 'Mantención técnica'
  };
  
  const typeEl = document.getElementById('summary-type');
  if (typeEl) typeEl.innerText = typeMap[projectData.type] || 'Proyecto';
  
  const dimEl = document.getElementById('summary-dim');
  if (dimEl) {
    if (projectData.dim_unknown) {
      dimEl.innerText = 'Pendiente (rectificación taller)';
    } else {
      dimEl.innerText = projectData.dim_width + ' x ' + projectData.dim_height + ' x ' + projectData.dim_depth + ' cm';
    }
  }
  
  const matEl = document.getElementById('summary-mat');
  if (matEl) matEl.innerText = projectData.material;

  // Re-init lucide icons for WhatsApp button icon
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
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
  
  var msg = 'Hola Diego Armando, me gustaría cotizar un proyecto.\n\n';
  msg += '*Detalles del Proyecto:*\n';
  msg += '- Tipo: ' + (typeMap[projectData.type] || 'Proyecto') + '\n';
  
  if (projectData.dim_unknown) {
    msg += '- Dimensiones: No estoy seguro, necesito rectificación.\n';
  } else {
    msg += '- Dimensiones aprox: ' + projectData.dim_width + 'cm ancho x ' + projectData.dim_height + 'cm alto x ' + projectData.dim_depth + 'cm prof.\n';
  }
  
  msg += '- Materialidad: ' + projectData.material + '\n\nQuedo atento(a) para coordinar.';
  
  var encodedMsg = encodeURIComponent(msg);
  window.open('https://wa.me/' + phone + '?text=' + encodedMsg, '_blank');
};
