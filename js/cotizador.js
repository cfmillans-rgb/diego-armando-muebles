// Cotizador Engine - Diego Armando Muebles
// WhatsApp oficial: +56992317042

const COTIZADOR_PHONE = '56992317042';

const state = {
  currentStep: 1,
  projectType: 'cocina',
  projectTypeName: 'Cocina a Medida',
  dimensions: {
    width: 240,
    height: 220,
    depth: 60,
    unknown: false
  },
  features: {
    structureType: 'lineal',
    doorType: 'correderas',
    interiorOptions: ['repisas', 'cajones', 'barra'],
    extras: []
  },
  materials: {
    mainMaterial: 'melamina-18',
    colorGroup: 'blanco-neutro',
    countertop: 'granito'
  },
  photos: [],
  contact: {
    name: '',
    phone: '',
    email: '',
    commune: 'Santiago',
    notes: ''
  },
  estimatedRange: {
    min: 850000,
    max: 1350000
  }
};

// Project Type Configs
const PROJECT_TYPES = {
  cocina: {
    name: 'Cocina a Medida',
    basePriceMin: 850000,
    basePriceMax: 1350000,
    defaultDims: { width: 300, height: 230, depth: 60 }
  },
  closet: {
    name: 'Clóset / Vestidor',
    basePriceMin: 550000,
    basePriceMax: 920000,
    defaultDims: { width: 200, height: 240, depth: 60 }
  },
  vanitorio: {
    name: 'Vanitorio para Baño',
    basePriceMin: 280000,
    basePriceMax: 490000,
    defaultDims: { width: 90, height: 85, depth: 50 }
  },
  mueble_tv: {
    name: 'Mueble de TV / Living',
    basePriceMin: 380000,
    basePriceMax: 680000,
    defaultDims: { width: 180, height: 160, depth: 35 }
  },
  cubierta: {
    name: 'Cubierta (Granito / Cuarzo)',
    basePriceMin: 320000,
    basePriceMax: 650000,
    defaultDims: { width: 240, height: 4, depth: 60 }
  },
  reparacion: {
    name: 'Reparación o Mantención',
    basePriceMin: 90000,
    basePriceMax: 220000,
    defaultDims: { width: 0, height: 0, depth: 0 }
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initCotizador();
});

function initCotizador() {
  setupProjectTypeCards();
  setupDimensionsListeners();
  setupDynamicStep3();
  setupDynamicStep4();
  setupPhotoUploader();
  setupStepperNavigation();
  updateStepView();
}

function selectProjectType(type) {
  state.projectType = type;
  state.projectTypeName = PROJECT_TYPES[type]?.name || 'Mueble a Medida';
  
  // Set default dims
  if (PROJECT_TYPES[type]?.defaultDims) {
    state.dimensions.width = PROJECT_TYPES[type].defaultDims.width;
    state.dimensions.height = PROJECT_TYPES[type].defaultDims.height;
    state.dimensions.depth = PROJECT_TYPES[type].defaultDims.depth;
    
    const wInput = document.getElementById('dim-width');
    const hInput = document.getElementById('dim-height');
    const dInput = document.getElementById('dim-depth');
    if (wInput) wInput.value = state.dimensions.width || '';
    if (hInput) hInput.value = state.dimensions.height || '';
    if (dInput) dInput.value = state.dimensions.depth || '';
  }

  // Update UI selection
  document.querySelectorAll('.type-card').forEach(card => {
    if (card.dataset.type === type) {
      card.classList.add('selected');
    } else {
      card.classList.remove('selected');
    }
  });

  setupDynamicStep3();
  setupDynamicStep4();
  calculateEstimation();
}

function setupProjectTypeCards() {
  document.querySelectorAll('.type-card').forEach(card => {
    card.addEventListener('click', () => {
      const type = card.dataset.type;
      selectProjectType(type);
    });
  });
}

function setupDimensionsListeners() {
  const wInput = document.getElementById('dim-width');
  const hInput = document.getElementById('dim-height');
  const dInput = document.getElementById('dim-depth');
  const unknownCheck = document.getElementById('dim-unknown');

  if (wInput) {
    wInput.addEventListener('input', (e) => {
      state.dimensions.width = parseFloat(e.target.value) || 0;
      calculateEstimation();
    });
  }
  if (hInput) {
    hInput.addEventListener('input', (e) => {
      state.dimensions.height = parseFloat(e.target.value) || 0;
      calculateEstimation();
    });
  }
  if (dInput) {
    dInput.addEventListener('input', (e) => {
      state.dimensions.depth = parseFloat(e.target.value) || 0;
      calculateEstimation();
    });
  }
  if (unknownCheck) {
    unknownCheck.addEventListener('change', (e) => {
      state.dimensions.unknown = e.target.checked;
      const dimsBox = document.getElementById('dimensions-inputs-box');
      if (dimsBox) {
        dimsBox.style.opacity = e.target.checked ? '0.4' : '1';
        dimsBox.style.pointerEvents = e.target.checked ? 'none' : 'auto';
      }
      calculateEstimation();
    });
  }
}

// Step 3: Dynamic Features based on project type
function setupDynamicStep3() {
  const container = document.getElementById('step3-dynamic-content');
  if (!container) return;

  const type = state.projectType;

  if (type === 'closet') {
    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <label class="block text-xs font-bold text-[#1e3a2b] uppercase tracking-wider mb-2">Tipo de Clóset</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="option-card p-4 rounded-xl flex items-center justify-between selected" data-group="structure" data-val="empotrado" onclick="selectOptionCard(this, 'structure')">
              <div>
                <p class="font-bold text-[#151917] text-sm">Empotrado a Muro</p>
                <p class="text-xs text-gray-500">De suelo a cielo y entre muros</p>
              </div>
              <span class="check-badge w-6 h-6 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
            </div>
            <div class="option-card p-4 rounded-xl flex items-center justify-between" data-group="structure" data-val="independiente" onclick="selectOptionCard(this, 'structure')">
              <div>
                <p class="font-bold text-[#151917] text-sm">Independiente / Modular</p>
                <p class="text-xs text-gray-500">Mueble exento con costados visibles</p>
              </div>
              <span class="check-badge w-6 h-6 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-[#1e3a2b] uppercase tracking-wider mb-2">Tipo de Puertas</label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="option-card p-3.5 rounded-xl flex items-center justify-between selected" data-group="doors" data-val="correderas" onclick="selectOptionCard(this, 'doors')">
              <div>
                <p class="font-bold text-[#151917] text-sm">Correderas</p>
                <p class="text-xs text-gray-500">Riel suave de aluminio</p>
              </div>
              <span class="check-badge w-5 h-5 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
            </div>
            <div class="option-card p-3.5 rounded-xl flex items-center justify-between" data-group="doors" data-val="abatibles" onclick="selectOptionCard(this, 'doors')">
              <div>
                <p class="font-bold text-[#151917] text-sm">Abatibles</p>
                <p class="text-xs text-gray-500">Bisagras cierre suave</p>
              </div>
              <span class="check-badge w-5 h-5 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
            </div>
            <div class="option-card p-3.5 rounded-xl flex items-center justify-between" data-group="doors" data-val="sin_puertas" onclick="selectOptionCard(this, 'doors')">
              <div>
                <p class="font-bold text-[#151917] text-sm">Sin Puertas</p>
                <p class="text-xs text-gray-500">Estilo Walk-in</p>
              </div>
              <span class="check-badge w-5 h-5 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-[#1e3a2b] uppercase tracking-wider mb-2">Distribución Interior</label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <label class="p-3 bg-white border border-gray-200 rounded-xl flex items-center gap-2 cursor-pointer hover:border-[#1e3a2b] transition">
              <input type="checkbox" checked class="accent-[#1e3a2b] w-4 h-4" onchange="toggleFeatureOption('cajones', this.checked)">
              <span class="text-xs sm:text-sm font-semibold text-gray-800">Cajoneras</span>
            </label>
            <label class="p-3 bg-white border border-gray-200 rounded-xl flex items-center gap-2 cursor-pointer hover:border-[#1e3a2b] transition">
              <input type="checkbox" checked class="accent-[#1e3a2b] w-4 h-4" onchange="toggleFeatureOption('repisas', this.checked)">
              <span class="text-xs sm:text-sm font-semibold text-gray-800">Repisas</span>
            </label>
            <label class="p-3 bg-white border border-gray-200 rounded-xl flex items-center gap-2 cursor-pointer hover:border-[#1e3a2b] transition">
              <input type="checkbox" checked class="accent-[#1e3a2b] w-4 h-4" onchange="toggleFeatureOption('barra', this.checked)">
              <span class="text-xs sm:text-sm font-semibold text-gray-800">Barra colgar</span>
            </label>
            <label class="p-3 bg-white border border-gray-200 rounded-xl flex items-center gap-2 cursor-pointer hover:border-[#1e3a2b] transition">
              <input type="checkbox" class="accent-[#1e3a2b] w-4 h-4" onchange="toggleFeatureOption('zapatero', this.checked)">
              <span class="text-xs sm:text-sm font-semibold text-gray-800">Zapatero</span>
            </label>
          </div>
        </div>
      </div>
    `;
  } else if (type === 'cocina') {
    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <label class="block text-xs font-bold text-[#1e3a2b] uppercase tracking-wider mb-2">Forma de la Cocina</label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="option-card p-4 rounded-xl flex items-center justify-between selected" data-group="structure" data-val="lineal" onclick="selectOptionCard(this, 'structure')">
              <div>
                <p class="font-bold text-[#151917] text-sm">Lineal Recta</p>
                <p class="text-xs text-gray-500">Muebles base + aéreos</p>
              </div>
              <span class="check-badge w-6 h-6 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
            </div>
            <div class="option-card p-4 rounded-xl flex items-center justify-between" data-group="structure" data-val="en_l" onclick="selectOptionCard(this, 'structure')">
              <div>
                <p class="font-bold text-[#151917] text-sm">En "L" / Esquinera</p>
                <p class="text-xs text-gray-500">Aprovecha dos muros contiguos</p>
              </div>
              <span class="check-badge w-6 h-6 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
            </div>
            <div class="option-card p-4 rounded-xl flex items-center justify-between" data-group="structure" data-val="isla" onclick="selectOptionCard(this, 'structure')">
              <div>
                <p class="font-bold text-[#151917] text-sm">Con Isla / Península</p>
                <p class="text-xs text-gray-500">Módulo central o desayunador</p>
              </div>
              <span class="check-badge w-6 h-6 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-[#1e3a2b] uppercase tracking-wider mb-2">Módulos Especiales Deseados</label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <label class="p-3 bg-white border border-gray-200 rounded-xl flex items-center gap-2 cursor-pointer hover:border-[#1e3a2b] transition">
              <input type="checkbox" checked class="accent-[#1e3a2b] w-4 h-4" onchange="toggleFeatureOption('torre_hornos', this.checked)">
              <span class="text-xs sm:text-sm font-semibold text-gray-800">Torre Hornos</span>
            </label>
            <label class="p-3 bg-white border border-gray-200 rounded-xl flex items-center gap-2 cursor-pointer hover:border-[#1e3a2b] transition">
              <input type="checkbox" checked class="accent-[#1e3a2b] w-4 h-4" onchange="toggleFeatureOption('cajoneras_soft', this.checked)">
              <span class="text-xs sm:text-sm font-semibold text-gray-800">Cajones Freno</span>
            </label>
            <label class="p-3 bg-white border border-gray-200 rounded-xl flex items-center gap-2 cursor-pointer hover:border-[#1e3a2b] transition">
              <input type="checkbox" class="accent-[#1e3a2b] w-4 h-4" onchange="toggleFeatureOption('cava_vinos', this.checked)">
              <span class="text-xs sm:text-sm font-semibold text-gray-800">Cava Vinos</span>
            </label>
            <label class="p-3 bg-white border border-gray-200 rounded-xl flex items-center gap-2 cursor-pointer hover:border-[#1e3a2b] transition">
              <input type="checkbox" class="accent-[#1e3a2b] w-4 h-4" onchange="toggleFeatureOption('despensa_extraible', this.checked)">
              <span class="text-xs sm:text-sm font-semibold text-gray-800">Despensa Alta</span>
            </label>
          </div>
        </div>
      </div>
    `;
  } else if (type === 'vanitorio') {
    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <label class="block text-xs font-bold text-[#1e3a2b] uppercase tracking-wider mb-2">Montaje</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="option-card p-4 rounded-xl flex items-center justify-between selected" data-group="structure" data-val="suspendido" onclick="selectOptionCard(this, 'structure')">
              <div>
                <p class="font-bold text-[#151917] text-sm">Suspendido / Flotante</p>
                <p class="text-xs text-gray-500">Diseño limpio y moderno</p>
              </div>
              <span class="check-badge w-6 h-6 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
            </div>
            <div class="option-card p-4 rounded-xl flex items-center justify-between" data-group="structure" data-val="a_piso" onclick="selectOptionCard(this, 'structure')">
              <div>
                <p class="font-bold text-[#151917] text-sm">A Piso con Zócalo</p>
                <p class="text-xs text-gray-500">Mayor capacidad de almacenamiento</p>
              </div>
              <span class="check-badge w-6 h-6 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-[#1e3a2b] uppercase tracking-wider mb-2">Bacha / Lavamanos</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="option-card p-4 rounded-xl flex items-center justify-between selected" data-group="doors" data-val="sobrepuesta" onclick="selectOptionCard(this, 'doors')">
              <div>
                <p class="font-bold text-[#151917] text-sm">Bacha Sobrepuesta</p>
                <p class="text-xs text-gray-500">Bowl apoyado sobre la cubierta</p>
              </div>
              <span class="check-badge w-6 h-6 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
            </div>
            <div class="option-card p-4 rounded-xl flex items-center justify-between" data-group="doors" data-val="bajo_cubierta" onclick="selectOptionCard(this, 'doors')">
              <div>
                <p class="font-bold text-[#151917] text-sm">Bajo Cubierta / Integrada</p>
                <p class="text-xs text-gray-500">Línea continua elegante</p>
              </div>
              <span class="check-badge w-6 h-6 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (type === 'mueble_tv') {
    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <label class="block text-xs font-bold text-[#1e3a2b] uppercase tracking-wider mb-2">Configuración del Mueble de TV</label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="option-card p-4 rounded-xl flex items-center justify-between selected" data-group="structure" data-val="panel_flotante" onclick="selectOptionCard(this, 'structure')">
              <div>
                <p class="font-bold text-[#151917] text-sm">Panel Flotante + Repisas</p>
                <p class="text-xs text-gray-500">Panel mural con soporte y repisas</p>
              </div>
              <span class="check-badge w-6 h-6 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
            </div>
            <div class="option-card p-4 rounded-xl flex items-center justify-between" data-group="structure" data-val="rack_cajones" onclick="selectOptionCard(this, 'structure')">
              <div>
                <p class="font-bold text-[#151917] text-sm">Rack Bajo con Cajones</p>
                <p class="text-xs text-gray-500">Módulo inferior para consolas y audio</p>
              </div>
              <span class="check-badge w-6 h-6 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
            </div>
            <div class="option-card p-4 rounded-xl flex items-center justify-between" data-group="structure" data-val="centro_integral" onclick="selectOptionCard(this, 'structure')">
              <div>
                <p class="font-bold text-[#151917] text-sm">Centro Integral Completo</p>
                <p class="text-xs text-gray-500">Mueble de piso a techo con vitrina</p>
              </div>
              <span class="check-badge w-6 h-6 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (type === 'reparacion') {
    container.innerHTML = `
      <div class="space-y-4">
        <label class="block text-xs font-bold text-[#1e3a2b] uppercase tracking-wider mb-2">Servicios de Reparación o Mantención Requeridos</label>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label class="p-3.5 bg-white border border-gray-200 rounded-xl flex items-center gap-3 cursor-pointer hover:border-[#1e3a2b] transition">
            <input type="checkbox" checked class="accent-[#1e3a2b] w-5 h-5" onchange="toggleFeatureOption('bisagras', this.checked)">
            <div>
              <p class="font-bold text-gray-800 text-sm">Cambio de bisagras (cierre suave)</p>
              <p class="text-xs text-gray-500">Alineación y regulación de puertas caídas</p>
            </div>
          </label>
          <label class="p-3.5 bg-white border border-gray-200 rounded-xl flex items-center gap-3 cursor-pointer hover:border-[#1e3a2b] transition">
            <input type="checkbox" checked class="accent-[#1e3a2b] w-5 h-5" onchange="toggleFeatureOption('rieles_cajones', this.checked)">
            <div>
              <p class="font-bold text-gray-800 text-sm">Cambio de rieles de cajones</p>
              <p class="text-xs text-gray-500">Rieles telescópicos metálicos reforzados</p>
            </div>
          </label>
          <label class="p-3.5 bg-white border border-gray-200 rounded-xl flex items-center gap-3 cursor-pointer hover:border-[#1e3a2b] transition">
            <input type="checkbox" class="accent-[#1e3a2b] w-5 h-5" onchange="toggleFeatureOption('rieles_closet', this.checked)">
            <div>
              <p class="font-bold text-gray-800 text-sm">Rieles de puertas de clóset</p>
              <p class="text-xs text-gray-500">Ruedas y guías de puertas correderas</p>
            </div>
          </label>
          <label class="p-3.5 bg-white border border-gray-200 rounded-xl flex items-center gap-3 cursor-pointer hover:border-[#1e3a2b] transition">
            <input type="checkbox" class="accent-[#1e3a2b] w-5 h-5" onchange="toggleFeatureOption('tiradores_ajuste', this.checked)">
            <div>
              <p class="font-bold text-gray-800 text-sm">Cambio de tiradores y manillas</p>
              <p class="text-xs text-gray-500">Modernización y nivelación general</p>
            </div>
          </label>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="space-y-4">
        <label class="block text-xs font-bold text-[#1e3a2b] uppercase tracking-wider mb-2">Selecciona el material de la cubierta</label>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="option-card p-4 rounded-xl flex items-center justify-between selected" data-group="structure" data-val="granito" onclick="selectOptionCard(this, 'structure')">
            <div>
              <p class="font-bold text-[#151917] text-sm">Granito Natural</p>
              <p class="text-xs text-gray-500">Máxima dureza al calor y corte</p>
            </div>
            <span class="check-badge w-6 h-6 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
          </div>
          <div class="option-card p-4 rounded-xl flex items-center justify-between" data-group="structure" data-val="cuarzo" onclick="selectOptionCard(this, 'structure')">
            <div>
              <p class="font-bold text-[#151917] text-sm">Cuarzo Diseñado</p>
              <p class="text-xs text-gray-500">Acabado pulido sin poros</p>
            </div>
            <span class="check-badge w-6 h-6 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
          </div>
          <div class="option-card p-4 rounded-xl flex items-center justify-between" data-group="structure" data-val="marmol" onclick="selectOptionCard(this, 'structure')">
            <div>
              <p class="font-bold text-[#151917] text-sm">Mármol Clásico</p>
              <p class="text-xs text-gray-500">Elegancia con vetas naturales</p>
            </div>
            <span class="check-badge w-6 h-6 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
          </div>
        </div>
      </div>
    `;
  }
}

// Step 4: Materials & Countertops
function setupDynamicStep4() {
  const container = document.getElementById('step4-dynamic-content');
  if (!container) return;

  const showCountertop = ['cocina', 'vanitorio', 'cubierta'].includes(state.projectType);

  container.innerHTML = `
    <div class="space-y-6">
      <div>
        <label class="block text-xs font-bold text-[#1e3a2b] uppercase tracking-wider mb-2">Material de Fabricación</label>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="option-card p-4 rounded-xl flex items-center justify-between selected" data-group="material" data-val="melamina-18" onclick="selectOptionCard(this, 'material')">
            <div>
              <p class="font-bold text-[#151917] text-sm">Melamina 18mm</p>
              <p class="text-xs text-gray-500">Cantos PVC sellados y alta resistencia</p>
            </div>
            <span class="check-badge w-6 h-6 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
          </div>
          <div class="option-card p-4 rounded-xl flex items-center justify-between" data-group="material" data-val="alto-brillo" onclick="selectOptionCard(this, 'material')">
            <div>
              <p class="font-bold text-[#151917] text-sm">Alto Brillo (High Gloss)</p>
              <p class="text-xs text-gray-500">Acabado espejo ultra moderno</p>
            </div>
            <span class="check-badge w-6 h-6 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
          </div>
          <div class="option-card p-4 rounded-xl flex items-center justify-between" data-group="material" data-val="hidrofuga" onclick="selectOptionCard(this, 'material')">
            <div>
              <p class="font-bold text-[#151917] text-sm">Melamina Hidrófuga (RH)</p>
              <p class="text-xs text-gray-500">Ideal para zonas húmedas</p>
            </div>
            <span class="check-badge w-6 h-6 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
          </div>
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold text-[#1e3a2b] uppercase tracking-wider mb-2">Tonalidad / Color Deseado</label>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="option-card p-3 rounded-xl flex items-center gap-3 selected" data-group="color" data-val="blanco-neutro" onclick="selectOptionCard(this, 'color')">
            <span class="w-6 h-6 rounded-full bg-white border border-gray-300 shadow-inner flex-shrink-0"></span>
            <div>
              <p class="font-bold text-xs text-gray-800">Blanco / Neutros</p>
            </div>
          </div>
          <div class="option-card p-3 rounded-xl flex items-center gap-3" data-group="color" data-val="verde-olivo" onclick="selectOptionCard(this, 'color')">
            <span class="w-6 h-6 rounded-full bg-[#4c6355] shadow-inner flex-shrink-0"></span>
            <div>
              <p class="font-bold text-xs text-gray-800">Verde Olivo / Salvia</p>
            </div>
          </div>
          <div class="option-card p-3 rounded-xl flex items-center gap-3" data-group="color" data-val="madera-roble" onclick="selectOptionCard(this, 'color')">
            <span class="w-6 h-6 rounded-full bg-[#a06f47] shadow-inner flex-shrink-0"></span>
            <div>
              <p class="font-bold text-xs text-gray-800">Madera / Roble</p>
            </div>
          </div>
          <div class="option-card p-3 rounded-xl flex items-center gap-3" data-group="color" data-val="grafito-negro" onclick="selectOptionCard(this, 'color')">
            <span class="w-6 h-6 rounded-full bg-[#272b2e] shadow-inner flex-shrink-0"></span>
            <div>
              <p class="font-bold text-xs text-gray-800">Grafito / Negro</p>
            </div>
          </div>
        </div>
      </div>

      ${showCountertop ? `
        <div>
          <label class="block text-xs font-bold text-[#1e3a2b] uppercase tracking-wider mb-2">Tipo de Cubierta</label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="option-card p-4 rounded-xl flex items-center justify-between selected" data-group="countertop" data-val="granito" onclick="selectOptionCard(this, 'countertop')">
              <div>
                <p class="font-bold text-[#151917] text-sm">Granito Natural</p>
                <p class="text-xs text-gray-500">Negro San Gabriel, Gris Mara, etc.</p>
              </div>
              <span class="check-badge w-6 h-6 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
            </div>
            <div class="option-card p-4 rounded-xl flex items-center justify-between" data-group="countertop" data-val="cuarzo" onclick="selectOptionCard(this, 'countertop')">
              <div>
                <p class="font-bold text-[#151917] text-sm">Cuarzo Silestone / Calacatta</p>
                <p class="text-xs text-gray-500">Diseño premium sin poros</p>
              </div>
              <span class="check-badge w-6 h-6 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
            </div>
            <div class="option-card p-4 rounded-xl flex items-center justify-between" data-group="countertop" data-val="postformado" onclick="selectOptionCard(this, 'countertop')">
              <div>
                <p class="font-bold text-[#151917] text-sm">Cubierta Postformada</p>
                <p class="text-xs text-gray-500">Económica y resistente</p>
              </div>
              <span class="check-badge w-6 h-6 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center text-xs">✓</span>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function selectOptionCard(elem, group) {
  const parent = elem.closest('div.grid');
  if (!parent) return;
  parent.querySelectorAll(`[data-group="${group}"]`).forEach(c => c.classList.remove('selected'));
  elem.classList.add('selected');

  const val = elem.dataset.val;
  if (group === 'structure') state.features.structureType = val;
  if (group === 'doors') state.features.doorType = val;
  if (group === 'material') state.materials.mainMaterial = val;
  if (group === 'color') state.materials.colorGroup = val;
  if (group === 'countertop') state.materials.countertop = val;

  calculateEstimation();
}

function toggleFeatureOption(opt, checked) {
  if (checked) {
    if (!state.features.interiorOptions.includes(opt)) {
      state.features.interiorOptions.push(opt);
    }
  } else {
    state.features.interiorOptions = state.features.interiorOptions.filter(i => i !== opt);
  }
  calculateEstimation();
}

// Photo Uploader Drag & Drop + Input
function setupPhotoUploader() {
  const dropArea = document.getElementById('photo-dropzone');
  const fileInput = document.getElementById('photo-input');

  if (!dropArea || !fileInput) return;

  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropArea.classList.add('drag-over');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropArea.classList.remove('drag-over');
    });
  });

  dropArea.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    handlePhotoFiles(files);
  });

  fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    handlePhotoFiles(files);
  });
}

function handlePhotoFiles(files) {
  if (!files || files.length === 0) return;

  Array.from(files).forEach(file => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      state.photos.push({
        name: file.name,
        dataUrl: e.target.result
      });
      renderPhotoPreviews();
    };
    reader.readAsDataURL(file);
  });
}

function renderPhotoPreviews() {
  const container = document.getElementById('photos-preview');
  const countBadge = document.getElementById('photos-count-badge');
  if (!container) return;

  container.innerHTML = '';
  if (countBadge) {
    countBadge.textContent = `${state.photos.length} foto(s) seleccionada(s)`;
    countBadge.classList.toggle('hidden', state.photos.length === 0);
  }

  state.photos.forEach((photo, index) => {
    const div = document.createElement('div');
    div.className = 'relative w-20 h-20 rounded-xl overflow-hidden border-2 border-[#1e3a2b] shadow-sm group';
    div.innerHTML = `
      <img src="${photo.dataUrl}" alt="${photo.name}" class="w-full h-full object-cover">
      <button type="button" onclick="removePhoto(${index})" class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-90 hover:opacity-100 transition shadow">
        ✕
      </button>
    `;
    container.appendChild(div);
  });
}

function removePhoto(index) {
  state.photos.splice(index, 1);
  renderPhotoPreviews();
}

// Stepper Navigation
function setupStepperNavigation() {
  const btnPrev = document.getElementById('btn-step-prev');
  const btnNext = document.getElementById('btn-step-next');

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (state.currentStep > 1) {
        state.currentStep--;
        updateStepView();
      }
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (state.currentStep < 6) {
        state.currentStep++;
        updateStepView();
      }
    });
  }
}

function goToStep(stepNumber) {
  state.currentStep = stepNumber;
  updateStepView();
  
  const cotizadorSection = document.getElementById('cotizador');
  if (cotizadorSection) {
    cotizadorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function updateStepView() {
  const steps = [1, 2, 3, 4, 5, 6];
  steps.forEach(num => {
    const pane = document.getElementById(`step-pane-${num}`);
    const indicator = document.getElementById(`step-indicator-${num}`);
    
    if (pane) {
      if (num === state.currentStep) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    }

    if (indicator) {
      if (num === state.currentStep) {
        indicator.className = 'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-[#1e3a2b] text-white ring-4 ring-[#1e3a2b]/20 transition-all';
        indicator.innerHTML = num;
      } else if (num < state.currentStep) {
        indicator.className = 'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-[#c98a4b] text-white transition-all';
        indicator.innerHTML = '✓';
      } else {
        indicator.className = 'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-gray-200 text-gray-600 transition-all';
        indicator.innerHTML = num;
      }
    }
  });

  const btnPrev = document.getElementById('btn-step-prev');
  const btnNext = document.getElementById('btn-step-next');
  
  if (btnPrev) {
    btnPrev.style.visibility = state.currentStep === 1 ? 'hidden' : 'visible';
  }
  
  if (btnNext) {
    if (state.currentStep === 6) {
      btnNext.classList.add('hidden');
    } else {
      btnNext.classList.remove('hidden');
    }
  }

  const stepTitles = {
    1: 'Paso 1: ¿Qué tipo de proyecto deseas fabricar?',
    2: 'Paso 2: ¿Cuáles son las medidas aproximadas?',
    3: `Paso 3: Características y distribución para ${state.projectTypeName}`,
    4: 'Paso 4: Materiales, colores y cubiertas',
    5: 'Paso 5: Sube fotos de tu espacio actual',
    6: 'Paso 6: Tu cotización referencial y envío por WhatsApp'
  };

  const titleElem = document.getElementById('step-current-title');
  if (titleElem && stepTitles[state.currentStep]) {
    titleElem.textContent = stepTitles[state.currentStep];
  }

  calculateEstimation();
  if (state.currentStep === 6) {
    renderStep6Summary();
  }
}

function calculateEstimation() {
  const config = PROJECT_TYPES[state.projectType] || PROJECT_TYPES.cocina;
  let min = config.basePriceMin;
  let max = config.basePriceMax;

  if (!state.dimensions.unknown && state.dimensions.width > 0) {
    const defaultW = config.defaultDims.width || 200;
    const ratio = state.dimensions.width / defaultW;
    const scaleFactor = 0.45 + (ratio * 0.55);
    min = Math.round(min * scaleFactor);
    max = Math.round(max * scaleFactor);
  }

  if (state.materials.mainMaterial === 'alto-brillo') {
    min *= 1.25;
    max *= 1.30;
  } else if (state.materials.mainMaterial === 'hidrofuga') {
    min *= 1.15;
    max *= 1.18;
  }

  if (['cocina', 'vanitorio', 'cubierta'].includes(state.projectType)) {
    if (state.materials.countertop === 'cuarzo') {
      min += 220000;
      max += 350000;
    } else if (state.materials.countertop === 'granito') {
      min += 160000;
      max += 260000;
    }
  }

  min = Math.round(min / 10000) * 10000;
  max = Math.round(max / 10000) * 10000;

  state.estimatedRange = { min, max };
}

function formatCLP(amount) {
  return new Intl.NumberFormat('es-CL').format(amount);
}

function renderStep6Summary() {
  const summaryBox = document.getElementById('step6-summary-card');
  const priceElem = document.getElementById('step6-price-range');

  if (priceElem) {
    priceElem.textContent = `$${formatCLP(state.estimatedRange.min)} – $${formatCLP(state.estimatedRange.max)} CLP`;
  }

  if (summaryBox) {
    const dimText = state.dimensions.unknown 
      ? 'Medidas por confirmar en visita técnica' 
      : `${state.dimensions.width} cm ancho × ${state.dimensions.height} cm alto × ${state.dimensions.depth} cm prof.`;
    
    const matLabels = {
      'melamina-18': 'Melamina 18mm reforzada',
      'alto-brillo': 'Alto Brillo (High Gloss)',
      'hidrofuga': 'Melamina Hidrófuga (RH Antihumedad)'
    };

    const colorLabels = {
      'blanco-neutro': 'Blanco / Neutros',
      'verde-olivo': 'Verde Olivo / Salvia',
      'madera-roble': 'Madera Roble / Tonalidad Cálida',
      'grafito-negro': 'Grafito / Negro Mate'
    };

    const countLabels = {
      'granito': 'Granito Natural',
      'cuarzo': 'Cuarzo Diseñado / Calacatta',
      'postformado': 'Cubierta Postformada'
    };

    summaryBox.innerHTML = `
      <div class="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-3 text-sm">
        <div class="flex justify-between border-b border-gray-200 pb-2">
          <span class="text-gray-500 font-medium">Proyecto:</span>
          <span class="font-bold text-[#1e3a2b]">${state.projectTypeName}</span>
        </div>
        <div class="flex justify-between border-b border-gray-200 pb-2">
          <span class="text-gray-500 font-medium">Dimensiones:</span>
          <span class="font-semibold text-gray-800 text-right">${dimText}</span>
        </div>
        <div class="flex justify-between border-b border-gray-200 pb-2">
          <span class="text-gray-500 font-medium">Material principal:</span>
          <span class="font-semibold text-gray-800">${matLabels[state.materials.mainMaterial] || 'Melamina 18mm'}</span>
        </div>
        <div class="flex justify-between border-b border-gray-200 pb-2">
          <span class="text-gray-500 font-medium">Tono preferido:</span>
          <span class="font-semibold text-gray-800">${colorLabels[state.materials.colorGroup] || 'A elección'}</span>
        </div>
        ${['cocina', 'vanitorio', 'cubierta'].includes(state.projectType) ? `
        <div class="flex justify-between border-b border-gray-200 pb-2">
          <span class="text-gray-500 font-medium">Cubierta:</span>
          <span class="font-semibold text-gray-800">${countLabels[state.materials.countertop] || 'Granito'}</span>
        </div>
        ` : ''}
        <div class="flex justify-between">
          <span class="text-gray-500 font-medium">Fotos del espacio:</span>
          <span class="font-semibold text-[#1e3a2b]">${state.photos.length > 0 ? `${state.photos.length} imagen(es) seleccionada(s)` : 'Sin fotos adjuntas'}</span>
        </div>
      </div>
    `;
  }
}

function sendToWhatsApp() {
  const nameInput = document.getElementById('contact-name');
  const phoneInput = document.getElementById('contact-phone');
  const communeInput = document.getElementById('contact-commune');
  const notesInput = document.getElementById('contact-notes');

  const name = nameInput ? nameInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const commune = communeInput ? communeInput.value : 'Santiago';
  const notes = notesInput ? notesInput.value.trim() : '';

  if (!name) {
    alert('Por favor, ingresa tu nombre para dirigir la cotización.');
    if (nameInput) nameInput.focus();
    return;
  }

  const dimText = state.dimensions.unknown 
    ? 'Por definir en visita técnica' 
    : `${state.dimensions.width} cm ancho × ${state.dimensions.height} cm alto × ${state.dimensions.depth} cm prof.`;

  const matLabels = {
    'melamina-18': 'Melamina 18mm',
    'alto-brillo': 'Alto Brillo (High Gloss)',
    'hidrofuga': 'Melamina Hidrófuga (RH)'
  };

  const countLabels = {
    'granito': 'Granito Natural',
    'cuarzo': 'Cuarzo Diseñado',
    'postformado': 'Postformado'
  };

  let message = `🪵 *SOLICITUD DE COTIZACIÓN - DIEGO ARMANDO MUEBLES* 🪵\n\n`;
  message += `👋 *Nombre:* ${name}\n`;
  if (phone) message += `📞 *Teléfono:* ${phone}\n`;
  message += `📍 *Comuna:* ${commune}\n\n`;
  message += `📐 *PROYECTO:* ${state.projectTypeName}\n`;
  message += `📏 *Medidas:* ${dimText}\n`;
  message += `🎨 *Material:* ${matLabels[state.materials.mainMaterial] || 'Melamina 18mm'}\n`;
  
  if (['cocina', 'vanitorio', 'cubierta'].includes(state.projectType)) {
    message += `🪨 *Cubierta:* ${countLabels[state.materials.countertop] || 'Granito'}\n`;
  }

  if (state.features.interiorOptions && state.features.interiorOptions.length > 0) {
    message += `⚙️ *Detalles:* ${state.features.interiorOptions.join(', ')}\n`;
  }

  if (state.photos.length > 0) {
    message += `📷 *Fotos del espacio:* Tengo ${state.photos.length} foto(s) del lugar para enviar por este chat.\n`;
  }

  if (notes) {
    message += `💬 *Comentario:* ${notes}\n`;
  }

  message += `\n💰 *Estimación web referencial:* $${formatCLP(state.estimatedRange.min)} – $${formatCLP(state.estimatedRange.max)} CLP\n\n`;
  message += `_Hola Diego, me gustaría recibir la cotización formal y coordinar una visita técnica para rectificar medidas._`;

  const encodedMsg = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${COTIZADOR_PHONE}?text=${encodedMsg}`;

  window.open(whatsappUrl, '_blank');
}

function startCotizarWithService(serviceType) {
  selectProjectType(serviceType);
  goToStep(2);
}
