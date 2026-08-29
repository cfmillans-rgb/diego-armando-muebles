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
      this.parentNode.querySelectorAll('.option-card').forEach(c => {
        c.classList.remove('selected');
        c.setAttribute('aria-pressed', 'false');
      });
      // Select this
      this.classList.add('selected');
      this.setAttribute('aria-pressed', 'true');
      projectData.type = this.dataset.type;
    });
  });

  // Dimension inputs
  const dimWidth = document.getElementById('dim-width');
  const dimHeight = document.getElementById('dim-height');
  const dimDepth = document.getElementById('dim-depth');
  
  if (dimWidth) dimWidth.addEventListener('input', (e) => projectData.dim_width = e.target.value);
  if (dimHeight) dimHeight.addEventListener('input', (e) => projectData.dim_height = e.target.value);
  if (dimDepth) dimDepth.addEventListener('input', (e) => projectData.dim_depth = e.target.value);
  
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
        }
      });
    });
  }
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
  }
};

window.prevStep = () => {
  if (currentStep > 1) {
    // Hide current
    const currentPane = document.getElementById('step-pane-' + currentStep);
    if (currentPane) {
      currentPane.classList.remove('active');
      currentPane.classList.add('hidden');
    }
    
    currentStep--;
    
    // Show previous
    const prevPane = document.getElementById('step-pane-' + currentStep);
    if (prevPane) {
      prevPane.classList.remove('hidden');
      prevPane.classList.add('active');
    }
    
    updateControls();
    updateTitle();
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
    '4. Hoja de ruta para taller'
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
  
  if(projectData.type === 'cubierta') {
    options.length = 0;
    options.push({ name: 'Granito', desc: 'Piedra natural de alta dureza' });
    options.push({ name: 'Cuarzo Silestone', desc: 'Colores puros, antibacteriano' });
  }
  
  options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = \`option-card p-4 text-left focus:outline-none focus:ring-2 focus:ring-[#d4a034] \${idx === 0 ? 'selected' : ''}\`;
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
    
    btn.innerHTML = \`
      <h4 class="font-heading text-base font-bold text-white">\${opt.name}</h4>
      <p class="font-tech text-[10px] text-[#9ba399] uppercase mt-1">\${opt.desc}</p>
    \`;
    content.appendChild(btn);
  });
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
  
  const typeEl = document.getElementById('summary-type');
  if (typeEl) typeEl.innerText = typeMap[projectData.type] || 'PROYECTO';
  
  const dimEl = document.getElementById('summary-dim');
  if (dimEl) {
    if(projectData.dim_unknown) {
      dimEl.innerText = 'PENDIENTE (RECTIFICACIÓN TALLER)';
    } else {
      dimEl.innerText = \`\${projectData.dim_width}W x \${projectData.dim_height}H x \${projectData.dim_depth}D CM\`;
    }
  }
  
  const matEl = document.getElementById('summary-mat');
  if (matEl) matEl.innerText = projectData.material.toUpperCase();
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
