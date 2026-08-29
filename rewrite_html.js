const fs = require('fs');

const htmlContent = `<!DOCTYPE html>
<html lang="es" class="scroll-smooth bg-[#0c0d0c]">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Diego Armando Muebles | Manufactura a Medida & Arquitectura Interior</title>
  <meta name="description" content="Diseño, fabricación e instalación de muebles a medida, cocinas, clósets empotrados y cubiertas de granito en Santiago y V Región.">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            taller: {
              black: '#0c0d0c',
              panel: '#121412',
              panel2: '#181b18',
              olive: '#2d3826',
              oliveDark: '#222a1c',
              gold: '#d4a034',
              goldHover: '#e2b042'
            }
          }
        }
      }
    }
  </script>

  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body class="text-white antialiased selection:bg-[#d4a034] selection:text-black">

  <!-- TOP BAR ARCHITECTURAL -->
  <div class="bg-[#0c0d0c] text-[#9ba399] text-[10px] sm:text-xs py-2 px-4 border-b border-[#d4a034]/20 font-tech uppercase tracking-widest flex justify-between items-center z-50 relative">
    <div class="max-w-7xl mx-auto w-full flex justify-between items-center">
      <div class="flex items-center gap-4">
        <span class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-[#d4a034] animate-pulse"></span> STGO / V REGIÓN</span>
        <span class="hidden sm:inline border-l border-[#d4a034]/20 pl-4">100% FABRICACIÓN A MEDIDA</span>
      </div>
      <div class="flex items-center gap-4 text-[#d4a034]">
        <a href="https://instagram.com/diegoarmandomuebles" target="_blank" class="hover:text-white transition flex items-center gap-1.5">
          <i data-lucide="instagram" class="w-3.5 h-3.5"></i> @diegoarmandomuebles
        </a>
      </div>
    </div>
  </div>

  <!-- NAVIGATION HEADER -->
  <header id="main-header" class="fixed top-8 w-full z-40 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      
      <!-- Brand Logo Circular -->
      <a href="#" class="flex items-center gap-4 group">
        <div class="w-12 h-12 rounded-full border border-[#d4a034]/40 bg-[#0c0d0c] shadow-lg flex items-center justify-center p-1 group-hover:border-[#d4a034] transition duration-500">
          <svg viewBox="0 0 100 100" class="w-full h-full text-[#d4a034]">
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" stroke-width="1" />
            <path d="M36 36 L64 64 M64 36 L36 64" stroke="currentColor" stroke-width="2" stroke-linecap="square" />
            <circle cx="50" cy="50" r="8" fill="#0c0d0c" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </div>
        <div>
          <span class="block font-heading text-xl font-bold tracking-widest text-white group-hover:text-[#d4a034] transition">
            DIEGO ARMANDO
          </span>
          <span class="block font-tech text-[9px] text-[#9ba399] uppercase tracking-[0.2em] mt-0.5">
            Taller de Mobiliario
          </span>
        </div>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8 font-tech text-[10px] uppercase tracking-widest text-[#9ba399]">
        <a href="#servicios" class="hover:text-[#d4a034] transition">Especialidades</a>
        <a href="#trabajos" class="hover:text-[#d4a034] transition">Portafolio</a>
        <a href="#proceso" class="hover:text-[#d4a034] transition">Proceso</a>
      </nav>

      <div class="hidden md:block">
        <a href="#cotizador" class="btn-premium px-6 py-3 border border-[#d4a034] text-[#d4a034] font-tech text-[10px] font-bold uppercase tracking-widest hover:bg-[#d4a034] hover:text-[#0c0d0c] transition-all flex items-center gap-2">
          <i data-lucide="calculator" class="w-3.5 h-3.5"></i> Iniciar Configuración
        </a>
      </div>

      <!-- Mobile Toggle -->
      <button id="mobile-menu-btn" class="md:hidden text-[#d4a034]">
        <i data-lucide="menu" class="w-6 h-6"></i>
      </button>
    </div>
  </header>

  <!-- HERO SECTION EDITORIAL -->
  <section class="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-blueprint">
    <div class="absolute inset-0 z-0">
      <img src="assets/images/cocina_verde_algarrobo.png" alt="Cocina Verde Olivo" class="w-full h-full object-cover opacity-30 mix-blend-luminosity">
      <div class="absolute inset-0 bg-gradient-to-r from-[#0c0d0c] via-[#0c0d0c]/80 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#0c0d0c] via-transparent to-[#0c0d0c]/50"></div>
    </div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full reveal-up">
      <!-- Grid Framework -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div class="lg:col-span-8 flex flex-col justify-center">
          <div class="font-tech text-[#d4a034] text-[11px] tracking-widest mb-6 flex items-center gap-4">
            <span>[ 01 // FABRICACIÓN A MEDIDA ]</span>
            <div class="h-px w-12 bg-[#d4a034]/40"></div>
          </div>
          
          <h1 class="font-heading text-5xl sm:text-7xl lg:text-[5.5rem] font-bold leading-[0.9] text-white tracking-tight mb-8">
            MOBILIARIO <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#d4a034] to-[#f0c242]">A MEDIDA.</span>
          </h1>
          
          <p class="font-tech text-xs sm:text-sm text-[#9ba399] max-w-lg leading-relaxed mb-10 border-l border-[#d4a034]/30 pl-4">
            Diseño de precisión, manufactura en taller propio e instalación garantizada. Cocinas, clósets y vanitorios pensados para el espacio real.
          </p>
          
          <div class="flex flex-col sm:flex-row items-center gap-5">
            <a href="#cotizador" class="btn-premium w-full sm:w-auto px-8 py-4 bg-[#d4a034] text-[#0c0d0c] font-tech text-[11px] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-3">
              Cotizar Proyecto <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
            <a href="#trabajos" class="w-full sm:w-auto px-8 py-4 border border-[#d4a034]/40 text-white font-tech text-[11px] uppercase tracking-[0.15em] hover:border-[#d4a034] transition flex items-center justify-center gap-3">
              Ver Portafolio
            </a>
          </div>
        </div>

        <div class="lg:col-span-4 hidden lg:flex flex-col justify-end">
          <div class="border border-[#d4a034]/20 p-5 backdrop-blur-sm bg-[#0c0d0c]/60">
            <div class="font-tech text-[9px] text-[#9ba399] uppercase tracking-widest mb-3 cota-line">Fotografía en Terreno</div>
            <img src="assets/images/cocina_verde_algarrobo.png" alt="Cocina a medida Algarrobo" class="w-full h-48 object-cover grayscale hover:grayscale-0 transition duration-700">
            <div class="flex justify-between items-center mt-3 font-tech text-[9px] text-[#d4a034]">
              <span>PROYECTO: ALGARROBO</span>
              <span>DIM: 3200×2400</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Technical decorations -->
    <div class="absolute bottom-10 left-10 tech-marker hidden md:block">COORD: 33°27'S 70°40'W</div>
    <div class="absolute bottom-10 right-10 tech-marker hidden md:block">ESCALA: 1:100</div>
  </section>

  <!-- QUÉ HACEMOS (ESPECIALIDADES ASIMÉTRICO) -->
  <section id="servicios" class="py-24 bg-[#0c0d0c] relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 tech-border-bottom pb-6 reveal-up">
        <div>
          <span class="font-tech text-[10px] text-[#d4a034] tracking-[0.2em] block mb-3">[ 02 // ESPECIALIDADES ]</span>
          <h2 class="font-heading text-4xl sm:text-5xl font-bold">LÍNEAS DE PRODUCCIÓN</h2>
        </div>
        <p class="font-tech text-xs text-[#9ba399] max-w-sm mt-4 md:mt-0 text-right">
          Manufactura técnica y acabados de primera categoría para cada área de tu hogar.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 reveal-up stagger-1">
        
        <!-- Interactive List -->
        <div class="lg:col-span-5 flex flex-col justify-center space-y-2">
          <div class="service-item-hover active p-4 cursor-pointer" onmouseover="updateServiceView('cocinas')">
            <div class="flex justify-between items-center">
              <h3 class="font-heading text-2xl font-bold">COCINAS INTEGRALES</h3>
              <i data-lucide="utensils" class="w-5 h-5 service-icon text-white/40"></i>
            </div>
            <p class="font-tech text-[10px] text-[#9ba399] mt-2 uppercase">Melaminas, Herrajes cierre suave, Cubiertas</p>
          </div>
          
          <div class="service-item-hover p-4 cursor-pointer" onmouseover="updateServiceView('closets')">
            <div class="flex justify-between items-center">
              <h3 class="font-heading text-2xl font-bold">CLÓSETS & VESTIDORES</h3>
              <i data-lucide="door-closed" class="w-5 h-5 service-icon text-white/40"></i>
            </div>
            <p class="font-tech text-[10px] text-[#9ba399] mt-2 uppercase">Empotrados, Puertas correderas, Cajoneras</p>
          </div>
          
          <div class="service-item-hover p-4 cursor-pointer" onmouseover="updateServiceView('cubiertas')">
            <div class="flex justify-between items-center">
              <h3 class="font-heading text-2xl font-bold">CUBIERTAS DE PIEDRA</h3>
              <i data-lucide="layers" class="w-5 h-5 service-icon text-white/40"></i>
            </div>
            <p class="font-tech text-[10px] text-[#9ba399] mt-2 uppercase">Granito, Cuarzo, Marmol</p>
          </div>
          
          <div class="service-item-hover p-4 cursor-pointer" onmouseover="updateServiceView('muebles_tv')">
            <div class="flex justify-between items-center">
              <h3 class="font-heading text-2xl font-bold">MUEBLES DE SALÓN</h3>
              <i data-lucide="tv" class="w-5 h-5 service-icon text-white/40"></i>
            </div>
            <p class="font-tech text-[10px] text-[#9ba399] mt-2 uppercase">Racks, Paneles Flotantes, Bibliotecas</p>
          </div>
          
          <div class="service-item-hover p-4 cursor-pointer" onmouseover="updateServiceView('reparaciones')">
            <div class="flex justify-between items-center">
              <h3 class="font-heading text-2xl font-bold">MANTENCIÓN TÉCNICA</h3>
              <i data-lucide="wrench" class="w-5 h-5 service-icon text-white/40"></i>
            </div>
            <p class="font-tech text-[10px] text-[#9ba399] mt-2 uppercase">Bisagras, Rieles, Ajustes de puertas</p>
          </div>
        </div>

        <!-- Featured View -->
        <div class="lg:col-span-7">
          <div class="border border-[#d4a034]/20 p-2 bg-[#121412] relative h-full min-h-[400px]">
            <div class="absolute top-6 right-6 z-10 flex items-center gap-2 font-tech text-[10px] bg-[#0c0d0c]/80 px-3 py-1.5 border border-[#d4a034]/30 backdrop-blur">
              <i data-lucide="maximize" class="w-3 h-3 text-[#d4a034]"></i> <span id="service-view-title">COCINAS INTEGRALES</span>
            </div>
            <img id="service-view-img" src="assets/images/cocina_verde_algarrobo.png" class="w-full h-full object-cover grayscale-[0.3] transition duration-500">
            
            <div class="absolute bottom-6 left-6 right-6 bg-[#0c0d0c]/90 backdrop-blur p-5 border border-[#d4a034]/20 flex justify-between items-end">
              <div>
                <p id="service-view-desc" class="font-tech text-xs text-[#9ba399] max-w-sm leading-relaxed">
                  Diseño de base, aéreos e islas. Optimizamos el flujo de trabajo (triángulo de trabajo) y utilizamos quincallería de tráfico pesado.
                </p>
              </div>
              <a href="#cotizador" class="text-[#d4a034] font-tech text-[10px] uppercase font-bold hover:text-white transition flex items-center gap-1">
                Cotizar <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </section>

  <!-- PORTFOLIO CASE STUDIES -->
  <section id="trabajos" class="py-24 bg-[#121412] relative border-t border-[#d4a034]/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 tech-border-bottom pb-6 reveal-up">
        <div>
          <span class="font-tech text-[10px] text-[#d4a034] tracking-[0.2em] block mb-3">[ 03 // CASE STUDIES ]</span>
          <h2 class="font-heading text-4xl sm:text-5xl font-bold">ARCHIVO DE PROYECTOS</h2>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-10">
        
        <!-- Case 1 -->
        <div class="editorial-card cursor-pointer group reveal-up stagger-1" onclick="openProjectModal('cocina-algarrobo')">
          <div class="h-80 relative overflow-hidden bg-[#0c0d0c]">
            <img src="assets/images/cocina_verde_algarrobo.png" alt="Cocina Algarrobo" class="w-full h-full object-cover">
            <div class="absolute top-4 left-4 font-tech text-[9px] bg-[#0c0d0c] text-white px-2 py-1 uppercase tracking-widest border border-white/20">
              C-01
            </div>
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <span class="font-tech text-[10px] text-[#d4a034] uppercase tracking-widest block mb-1">Cocina a Medida</span>
                <h3 class="font-heading text-2xl font-bold group-hover:text-[#d4a034] transition">PROYECTO ALGARROBO</h3>
              </div>
              <i data-lucide="arrow-up-right" class="w-6 h-6 text-[#9ba399] group-hover:text-[#d4a034] transition"></i>
            </div>
            <div class="flex flex-wrap gap-3 font-tech text-[9px] text-[#9ba399] uppercase">
              <span class="px-2 py-1 border border-white/10">Verde Olivo</span>
              <span class="px-2 py-1 border border-white/10">Granito Negro</span>
              <span class="px-2 py-1 border border-white/10">Quincallería Cierre Suave</span>
            </div>
          </div>
        </div>

        <!-- Case 2 -->
        <div class="editorial-card cursor-pointer group reveal-up stagger-2" onclick="openProjectModal('cocina-providencia')">
          <div class="h-80 relative overflow-hidden bg-[#0c0d0c]">
            <img src="assets/images/cocina_alto_brillo.png" alt="Cocina Providencia" class="w-full h-full object-cover">
            <div class="absolute top-4 left-4 font-tech text-[9px] bg-[#0c0d0c] text-white px-2 py-1 uppercase tracking-widest border border-white/20">
              C-02
            </div>
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <span class="font-tech text-[10px] text-[#d4a034] uppercase tracking-widest block mb-1">Cocina Alto Brillo</span>
                <h3 class="font-heading text-2xl font-bold group-hover:text-[#d4a034] transition">PROYECTO PROVIDENCIA</h3>
              </div>
              <i data-lucide="arrow-up-right" class="w-6 h-6 text-[#9ba399] group-hover:text-[#d4a034] transition"></i>
            </div>
            <div class="flex flex-wrap gap-3 font-tech text-[9px] text-[#9ba399] uppercase">
              <span class="px-2 py-1 border border-white/10">High Gloss Blanco</span>
              <span class="px-2 py-1 border border-white/10">Cava Integrada</span>
              <span class="px-2 py-1 border border-white/10">Mesón Isla</span>
            </div>
          </div>
        </div>

        <!-- Case 3 -->
        <div class="editorial-card cursor-pointer group reveal-up stagger-1" onclick="openProjectModal('closet-puente-alto')">
          <div class="h-80 relative overflow-hidden bg-[#0c0d0c]">
            <img src="assets/images/closet_empotrado.png" alt="Clóset Puente Alto" class="w-full h-full object-cover">
            <div class="absolute top-4 left-4 font-tech text-[9px] bg-[#0c0d0c] text-white px-2 py-1 uppercase tracking-widest border border-white/20">
              V-01
            </div>
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <span class="font-tech text-[10px] text-[#d4a034] uppercase tracking-widest block mb-1">Clóset Empotrado</span>
                <h3 class="font-heading text-2xl font-bold group-hover:text-[#d4a034] transition">PROYECTO PUENTE ALTO</h3>
              </div>
              <i data-lucide="arrow-up-right" class="w-6 h-6 text-[#9ba399] group-hover:text-[#d4a034] transition"></i>
            </div>
            <div class="flex flex-wrap gap-3 font-tech text-[9px] text-[#9ba399] uppercase">
              <span class="px-2 py-1 border border-white/10">Piso a Cielo</span>
              <span class="px-2 py-1 border border-white/10">Puertas Correderas</span>
              <span class="px-2 py-1 border border-white/10">Zapatero Vertical</span>
            </div>
          </div>
        </div>

        <!-- Case 4 -->
        <div class="editorial-card cursor-pointer group reveal-up stagger-2" onclick="openProjectModal('tv-puente-alto')">
          <div class="h-80 relative overflow-hidden bg-[#0c0d0c]">
            <img src="assets/images/mueble_tv_puente_alto.png" alt="Mueble TV Puente Alto" class="w-full h-full object-cover">
            <div class="absolute top-4 left-4 font-tech text-[9px] bg-[#0c0d0c] text-white px-2 py-1 uppercase tracking-widest border border-white/20">
              M-01
            </div>
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <span class="font-tech text-[10px] text-[#d4a034] uppercase tracking-widest block mb-1">Mueble de Salón</span>
                <h3 class="font-heading text-2xl font-bold group-hover:text-[#d4a034] transition">PANEL TV FLOTANTE</h3>
              </div>
              <i data-lucide="arrow-up-right" class="w-6 h-6 text-[#9ba399] group-hover:text-[#d4a034] transition"></i>
            </div>
            <div class="flex flex-wrap gap-3 font-tech text-[9px] text-[#9ba399] uppercase">
              <span class="px-2 py-1 border border-white/10">Panel Mural</span>
              <span class="px-2 py-1 border border-white/10">Pasacables Oculto</span>
              <span class="px-2 py-1 border border-white/10">Cajoneras Inferiores</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- CONFIGURADOR (COTIZADOR PREMIUM) -->
  <section id="cotizador" class="py-24 bg-blueprint relative border-t border-[#d4a034]/20">
    <div class="absolute inset-0 bg-gradient-to-b from-[#0c0d0c] to-transparent"></div>
    
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <div class="text-center mb-16 reveal-up">
        <span class="font-tech text-[10px] text-[#d4a034] tracking-[0.2em] block mb-3">[ 04 // HERRAMIENTA TÉCNICA ]</span>
        <h2 class="font-heading text-4xl sm:text-5xl font-bold uppercase mb-4">Configurador de Proyecto</h2>
        <p class="font-tech text-xs text-[#9ba399] max-w-xl mx-auto">
          Especifica tu requerimiento. Nuestro sistema generará una hoja de ruta técnica que se enviará directamente a nuestro taller vía WhatsApp.
        </p>
      </div>

      <div class="bg-[#0c0d0c] border border-[#d4a034]/30 p-6 sm:p-10 relative reveal-up stagger-1 shadow-2xl">
        <!-- Stepper -->
        <div class="relative max-w-2xl mx-auto mb-12">
          <div class="stepper-line">
            <div class="stepper-progress" id="stepper-progress" style="width: 0%"></div>
          </div>
          <div class="flex justify-between relative z-10">
            <div class="flex flex-col items-center gap-2">
              <div id="step-circle-1" class="step-circle active w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-[#d4a034] text-[#0c0d0c]">1</div>
              <span class="font-tech text-[9px] uppercase tracking-widest hidden sm:block text-[#9ba399]">Tipo</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div id="step-circle-2" class="step-circle w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-[#121412] border border-[#d4a034]/30 text-[#9ba399]">2</div>
              <span class="font-tech text-[9px] uppercase tracking-widest hidden sm:block text-[#9ba399]">Medidas</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div id="step-circle-3" class="step-circle w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-[#121412] border border-[#d4a034]/30 text-[#9ba399]">3</div>
              <span class="font-tech text-[9px] uppercase tracking-widest hidden sm:block text-[#9ba399]">Material</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div id="step-circle-4" class="step-circle w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-[#121412] border border-[#d4a034]/30 text-[#9ba399]">4</div>
              <span class="font-tech text-[9px] uppercase tracking-widest hidden sm:block text-[#9ba399]">Análisis</span>
            </div>
          </div>
        </div>

        <h3 id="step-current-title" class="font-heading text-xl font-bold mb-8 pb-4 border-b border-white/10 uppercase tracking-widest">
          1. ¿QUÉ NECESITAMOS FABRICAR?
        </h3>

        <!-- STEP 1: TIPO -->
        <div id="step-pane-1" class="step-pane active">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div class="option-card p-5 selected" data-type="cocina">
              <i data-lucide="utensils" class="w-6 h-6 text-[#d4a034] mb-4"></i>
              <h4 class="font-heading text-lg font-bold">COCINA</h4>
              <p class="font-tech text-[9px] text-[#9ba399] uppercase">Mobiliario & Isla</p>
              <div class="check-badge absolute top-4 right-4 text-[#d4a034]"><i data-lucide="check-circle-2" class="w-5 h-5"></i></div>
            </div>
            <div class="option-card p-5" data-type="closet">
              <i data-lucide="door-closed" class="w-6 h-6 text-[#d4a034] mb-4"></i>
              <h4 class="font-heading text-lg font-bold">CLÓSET</h4>
              <p class="font-tech text-[9px] text-[#9ba399] uppercase">Empotrado / Vestidor</p>
              <div class="check-badge absolute top-4 right-4 text-[#d4a034]"><i data-lucide="check-circle-2" class="w-5 h-5"></i></div>
            </div>
            <div class="option-card p-5" data-type="vanitorio">
              <i data-lucide="bath" class="w-6 h-6 text-[#d4a034] mb-4"></i>
              <h4 class="font-heading text-lg font-bold">VANITORIO</h4>
              <p class="font-tech text-[9px] text-[#9ba399] uppercase">Mueble de Baño</p>
              <div class="check-badge absolute top-4 right-4 text-[#d4a034]"><i data-lucide="check-circle-2" class="w-5 h-5"></i></div>
            </div>
            <div class="option-card p-5" data-type="mueble_tv">
              <i data-lucide="tv" class="w-6 h-6 text-[#d4a034] mb-4"></i>
              <h4 class="font-heading text-lg font-bold">MUEBLE TV</h4>
              <p class="font-tech text-[9px] text-[#9ba399] uppercase">Rack / Panel Mural</p>
              <div class="check-badge absolute top-4 right-4 text-[#d4a034]"><i data-lucide="check-circle-2" class="w-5 h-5"></i></div>
            </div>
            <div class="option-card p-5" data-type="cubierta">
              <i data-lucide="layers" class="w-6 h-6 text-[#d4a034] mb-4"></i>
              <h4 class="font-heading text-lg font-bold">CUBIERTA</h4>
              <p class="font-tech text-[9px] text-[#9ba399] uppercase">Granito / Cuarzo</p>
              <div class="check-badge absolute top-4 right-4 text-[#d4a034]"><i data-lucide="check-circle-2" class="w-5 h-5"></i></div>
            </div>
            <div class="option-card p-5" data-type="reparacion">
              <i data-lucide="wrench" class="w-6 h-6 text-[#d4a034] mb-4"></i>
              <h4 class="font-heading text-lg font-bold">REPARACIÓN</h4>
              <p class="font-tech text-[9px] text-[#9ba399] uppercase">Mantención</p>
              <div class="check-badge absolute top-4 right-4 text-[#d4a034]"><i data-lucide="check-circle-2" class="w-5 h-5"></i></div>
            </div>
          </div>
        </div>

        <!-- STEP 2: MEDIDAS -->
        <div id="step-pane-2" class="step-pane">
          <div class="mb-6">
            <p class="font-tech text-[10px] text-[#9ba399] uppercase mb-4 tracking-widest">Valores aproximados en centímetros (CM)</p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label class="font-tech text-[10px] text-[#d4a034] uppercase block mb-2">Ancho Lineal</label>
                <div class="relative">
                  <input type="number" id="dim-width" value="240" class="w-full bg-[#121412] border border-[#d4a034]/30 focus:border-[#d4a034] p-4 text-white font-tech outline-none">
                  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ba399] font-tech text-xs">CM</span>
                </div>
              </div>
              <div>
                <label class="font-tech text-[10px] text-[#d4a034] uppercase block mb-2">Altura Muro</label>
                <div class="relative">
                  <input type="number" id="dim-height" value="220" class="w-full bg-[#121412] border border-[#d4a034]/30 focus:border-[#d4a034] p-4 text-white font-tech outline-none">
                  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ba399] font-tech text-xs">CM</span>
                </div>
              </div>
              <div>
                <label class="font-tech text-[10px] text-[#d4a034] uppercase block mb-2">Profundidad</label>
                <div class="relative">
                  <input type="number" id="dim-depth" value="60" class="w-full bg-[#121412] border border-[#d4a034]/30 focus:border-[#d4a034] p-4 text-white font-tech outline-none">
                  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ba399] font-tech text-xs">CM</span>
                </div>
              </div>
            </div>
            
            <div class="mt-6 flex items-start gap-3 p-4 bg-[#2d3826]/30 border border-[#2d3826]">
              <input type="checkbox" id="dim-unknown" class="mt-1 accent-[#d4a034]">
              <label for="dim-unknown" class="font-tech text-[10px] text-[#9ba399] uppercase leading-relaxed cursor-pointer">
                <span class="text-[#d4a034] font-bold">Solicitar visita técnica de rectificación.</span> 
                No estoy seguro de las medidas exactas; prefiero que Diego Armando mida en terreno.
              </label>
            </div>
          </div>
        </div>

        <!-- STEP 3: MATERIAL -->
        <div id="step-pane-3" class="step-pane">
          <div id="step3-dynamic-content" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Dynamic based on step 1 (Appended by JS) -->
          </div>
        </div>

        <!-- STEP 4: RESULTADO -->
        <div id="step-pane-4" class="step-pane">
          <div class="bg-[#121412] border border-[#d4a034]/30 p-6 sm:p-8">
            <h4 class="font-tech text-[10px] text-[#d4a034] uppercase tracking-widest mb-4">Estimación Preliminar (CLP)</h4>
            <div class="font-heading text-4xl sm:text-5xl font-bold text-white mb-6" id="price-result">
              $850.000 - $1.200.000
            </div>
            
            <div class="space-y-4 mb-8">
              <p class="font-tech text-[10px] text-[#9ba399] uppercase tracking-widest border-b border-[#d4a034]/10 pb-2">
                <span class="text-[#d4a034]">PROYECTO:</span> <span id="summary-type">COCINA A MEDIDA</span>
              </p>
              <p class="font-tech text-[10px] text-[#9ba399] uppercase tracking-widest border-b border-[#d4a034]/10 pb-2">
                <span class="text-[#d4a034]">DIMENSIONES:</span> <span id="summary-dim">240x220x60 CM</span>
              </p>
              <p class="font-tech text-[10px] text-[#9ba399] uppercase tracking-widest pb-2">
                <span class="text-[#d4a034]">DETALLES:</span> <span id="summary-mat">Melamina Maderada</span>
              </p>
            </div>
            
            <button onclick="sendWhatsApp()" class="w-full btn-premium py-4 bg-[#25D366] text-black font-tech text-[11px] font-bold uppercase tracking-[0.1em] flex items-center justify-center gap-3">
              <i data-lucide="message-circle" class="w-5 h-5"></i>
              Enviar Especificaciones por WhatsApp
            </button>
            <p class="text-center font-tech text-[9px] text-[#9ba399] mt-4 uppercase">Directo con el taller (+569 9231 7042)</p>
          </div>
        </div>

        <!-- Controls -->
        <div class="mt-10 flex justify-between border-t border-[#d4a034]/20 pt-6">
          <button id="btn-prev" onclick="prevStep()" class="font-tech text-[10px] text-[#9ba399] uppercase tracking-widest hover:text-white transition hidden flex items-center gap-2">
            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Volver
          </button>
          <div class="flex-1"></div>
          <button id="btn-next" onclick="nextStep()" class="btn-outline-tech px-8 py-3 text-[#d4a034] font-tech text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            Continuar <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- MODAL CASE STUDY -->
  <div id="project-modal" class="fixed inset-0 z-[100] hidden flex items-center justify-center p-4 sm:p-6">
    <div id="project-modal-backdrop" class="absolute inset-0 bg-[#0c0d0c]/90 opacity-0" onclick="closeProjectModal()"></div>
    
    <div id="project-modal-content" class="relative bg-[#121412] border border-[#d4a034]/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto opacity-0 translate-y-8 shadow-2xl flex flex-col md:flex-row">
      <button onclick="closeProjectModal()" class="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-[#0c0d0c] border border-[#d4a034]/40 text-[#d4a034] hover:bg-[#d4a034] hover:text-black transition">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
      
      <!-- Image Side -->
      <div class="w-full md:w-1/2 bg-[#0c0d0c]">
        <img id="modal-img" src="" alt="Proyecto" class="w-full h-64 md:h-full object-cover">
      </div>
      
      <!-- Content Side -->
      <div class="w-full md:w-1/2 p-8 flex flex-col">
        <span class="font-tech text-[10px] text-[#d4a034] uppercase tracking-widest block mb-2" id="modal-category">CATEGORÍA</span>
        <h3 class="font-heading text-3xl font-bold mb-6" id="modal-title">TÍTULO DEL PROYECTO</h3>
        
        <div class="space-y-4 mb-8 flex-1">
          <div>
            <h4 class="font-tech text-[10px] text-[#9ba399] uppercase tracking-widest border-b border-[#d4a034]/10 pb-1 mb-2">Desafío Técnico</h4>
            <p class="font-tech text-xs leading-relaxed" id="modal-desc">Descripción del proyecto...</p>
          </div>
          <div>
            <h4 class="font-tech text-[10px] text-[#9ba399] uppercase tracking-widest border-b border-[#d4a034]/10 pb-1 mb-2">Especificaciones</h4>
            <ul class="font-tech text-xs space-y-2" id="modal-specs">
              <!-- Specs generated by JS -->
            </ul>
          </div>
        </div>
        
        <button onclick="quoteSimilarProject()" class="w-full border border-[#d4a034] py-3 text-[#d4a034] hover:bg-[#d4a034] hover:text-black font-tech text-[10px] font-bold uppercase tracking-widest transition flex items-center justify-center gap-2">
          <i data-lucide="calculator" class="w-3.5 h-3.5"></i> Cotizar Proyecto Similar
        </button>
      </div>
    </div>
  </div>

  <!-- FOOTER EDITORIAL -->
  <footer class="bg-[#0c0d0c] pt-16 pb-8 border-t border-[#d4a034]/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
      <div class="mb-8 md:mb-0 text-center md:text-left">
        <span class="font-heading text-2xl font-bold tracking-widest text-white">DIEGO ARMANDO</span>
        <p class="font-tech text-[10px] text-[#9ba399] uppercase tracking-widest mt-1">Taller de Mobiliario a Medida</p>
      </div>
      <div class="flex flex-col items-center md:items-end font-tech text-[10px] text-[#9ba399] uppercase tracking-widest space-y-2">
        <a href="https://wa.me/56992317042" class="hover:text-[#d4a034] transition">+569 9231 7042</a>
        <a href="https://instagram.com/diegoarmandomuebles" class="hover:text-[#d4a034] transition">@diegoarmandomuebles</a>
        <span class="opacity-50">Santiago, Chile</span>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/5 text-center font-tech text-[9px] text-[#9ba399] uppercase tracking-widest">
      &copy; 2026 Diego Armando Muebles. Todos los derechos reservados.
    </div>
  </footer>

  <script src="js/app.js"></script>
  <script src="js/cotizador.js"></script>
  <script>lucide.createIcons();</script>
</body>
</html>`;

fs.writeFileSync('index.html', htmlContent, 'utf8');
console.log('index.html successfully rewritten');
