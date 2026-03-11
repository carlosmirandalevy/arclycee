// ============================================================
// mapa-leaflet.js - Mapa interactivo con LeafletJS
// ============================================================
// Este archivo crea un mapa del mundo real usando LeafletJS,
// una libreria gratuita para mapas interactivos.
//
// El mapa muestra la Republica Dominicana con marcadores en
// sitios arqueologicos reales: cuevas tainas, ruinas coloniales,
// museos, y mas. Los jugadores pueden explorar el mapa para
// descubrir nuevas misiones y aprender sobre la historia real.
// ============================================================

export class MapaLeaflet {
  constructor() {
    // La instancia del mapa de Leaflet (se crea al llamar iniciar())
    this.mapa = null;

    // El elemento HTML donde se dibuja el mapa (un div)
    this.contenedor = null;

    // Si el mapa se esta mostrando o no
    this.visible = false;

    // Lista de todos los marcadores en el mapa
    this.marcadores = [];

    // --- Capas del mapa ---
    // Cada capa agrupa un tipo de sitio diferente.
    // El jugador puede activar/desactivar capas para ver
    // solo lo que le interesa (como filtros en Google Maps)
    this.capas = {
      museos: null,          // Museos y colecciones privadas
      patrimonios: null,     // Sitios de patrimonio cultural
      taino: null,           // Sitios arqueologicos tainos
      colonial: null,        // Sitios arqueologicos coloniales
      submarino: null,       // Arqueologia submarina
      cuevas: null,          // Cuevas y sistemas subterraneos
      prospectiva: null      // Posibles nuevos descubrimientos
    };
  }

  // --- Crear el mapa y centrarlo en Republica Dominicana ---
  // elementoDOM: el div de HTML donde queremos poner el mapa
  //
  // El centro del mapa es aproximadamente el centro de la isla,
  // con zoom 8 que muestra todo el pais completo.
  iniciar(elementoDOM) {
    this.contenedor = elementoDOM;

    // Creamos el mapa centrado en Republica Dominicana
    // 18.7357 es la latitud (que tan al norte esta)
    // -70.1627 es la longitud (que tan al oeste esta, negativo = oeste)
    this.mapa = L.map(elementoDOM).setView([18.7357, -70.1627], 8);

    // Agregamos las imagenes del mapa (los "tiles")
    // Usamos OpenStreetMap que es gratuito y libre
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(this.mapa);

    // Inicializamos cada capa como un grupo vacio
    // Esto nos permite agregar y quitar marcadores por categoria
    for (const nombreCapa of Object.keys(this.capas)) {
      this.capas[nombreCapa] = L.layerGroup().addTo(this.mapa);
    }

    this.visible = true;

    // Agregamos los sitios conocidos al mapa
    this.agregarSitiosTainos();
    this.agregarSitiosColoniales();
  }

  // --- Mostrar el mapa ---
  mostrar() {
    if (this.contenedor) {
      this.contenedor.style.display = 'block';
      this.visible = true;

      // Le decimos a Leaflet que recalcule el tamano
      // porque al estar oculto, no sabia las dimensiones correctas
      if (this.mapa) {
        this.mapa.invalidateSize();
      }
    }
  }

  // --- Ocultar el mapa ---
  ocultar() {
    if (this.contenedor) {
      this.contenedor.style.display = 'none';
      this.visible = false;
    }
  }

  // --- Agregar un marcador al mapa ---
  // lat, lng: coordenadas del sitio (latitud y longitud)
  // titulo: nombre del lugar
  // descripcion: texto que aparece al hacer click
  // capa: en que capa ponerlo (ej: 'taino', 'colonial')
  // icono: icono personalizado de Leaflet (opcional)
  agregarMarcador(lat, lng, titulo, descripcion, capa, icono = null) {
    // Verificamos que la capa exista
    if (!this.capas[capa]) {
      console.warn(`La capa "${capa}" no existe. Marcador no agregado.`);
      return null;
    }

    // Creamos el marcador con o sin icono personalizado
    const opciones = icono ? { icon: icono } : {};
    const marcador = L.marker([lat, lng], opciones);

    // Le ponemos un popup con el nombre y la descripcion
    // El popup aparece cuando el jugador hace click en el marcador
    marcador.bindPopup(`<strong>${titulo}</strong><br>${descripcion}`);

    // Agregamos el marcador a su capa correspondiente
    marcador.addTo(this.capas[capa]);

    // Lo guardamos en la lista general de marcadores
    this.marcadores.push({
      marcador,
      titulo,
      descripcion,
      capa,
      lat,
      lng
    });

    return marcador;
  }

  // --- Agregar sitios arqueologicos tainos ---
  // Los tainos fueron los habitantes originales de la isla
  // antes de que llegaran los espanoles en 1492.
  // Dejaron petroglifos (dibujos en piedra), ceramica,
  // y muchos objetos en cuevas por toda la isla.
  agregarSitiosTainos() {
    this.agregarMarcador(
      18.4074, -70.1511,
      'Cuevas del Pomier',
      'El conjunto de cuevas con arte rupestre mas importante del Caribe. '
      + 'Tiene mas de 6,000 petroglifos y pictografias tainas. '
      + 'Las cuevas fueron usadas como lugares ceremoniales.',
      'taino'
    );

    this.agregarMarcador(
      18.3230, -68.8224,
      'Parque Nacional del Este',
      'Hogar de la Isla Saona y multiples cuevas con evidencia taina. '
      + 'Los tainos usaban esta zona para pescar y realizar ceremonias. '
      + 'Aqui se encontraron cemies (idolos religiosos).',
      'taino'
    );

    this.agregarMarcador(
      18.4631, -69.6297,
      'Cuevas de las Maravillas',
      'Cuevas con impresionantes formaciones geologicas y '
      + 'petroglifos tainos. Tienen un museo subterraneo que '
      + 'protege el arte rupestre con mas de 500 anos de antiguedad.',
      'taino'
    );

    this.agregarMarcador(
      18.9147, -69.4714,
      'Cueva de Fun Fun',
      'Una de las cuevas mas grandes del Caribe. Los tainos '
      + 'la usaban como refugio y lugar sagrado. Para explorarla '
      + 'hay que hacer rappel y caminar por un rio subterraneo.',
      'taino'
    );

    this.agregarMarcador(
      19.0600, -69.9200,
      'Los Haitises',
      'Parque Nacional con mogotes (colinas de piedra caliza) y cuevas '
      + 'que contienen arte rupestre taino. La Cueva de la Arena y la '
      + 'Cueva de San Gabriel tienen petroglifos bien preservados.',
      'taino'
    );

    this.agregarMarcador(
      18.4800, -69.9400,
      'Parque Mirador del Este',
      'Sitio donde se encontraron restos de un asentamiento taino. '
      + 'Incluye herramientas de piedra, ceramica y restos de alimentos '
      + 'que nos dicen como vivian los tainos cerca de los rios.',
      'taino'
    );

    this.agregarMarcador(
      19.2200, -69.3100,
      'Cueva Padre Nuestro',
      'Sistema de cuevas con cenotes (pozos naturales de agua) '
      + 'y petroglifos tainos. Los tainos creian que estas cuevas '
      + 'eran la entrada al mundo de los espiritus.',
      'taino'
    );
  }

  // --- Agregar sitios arqueologicos coloniales ---
  // Estos son lugares de la epoca colonial espanola (1492-1844).
  // La Republica Dominicana tiene los primeros edificios europeos
  // de todo el continente americano.
  agregarSitiosColoniales() {
    this.agregarMarcador(
      18.4722, -69.8833,
      'Zona Colonial de Santo Domingo',
      'La primera ciudad permanente fundada por europeos en America (1498). '
      + 'Tiene la primera catedral, el primer hospital, la primera '
      + 'universidad y el primer monasterio del Nuevo Mundo. '
      + 'Es Patrimonio de la Humanidad por la UNESCO.',
      'colonial'
    );

    this.agregarMarcador(
      19.8897, -71.0825,
      'La Isabela',
      'El primer asentamiento europeo permanente en America, '
      + 'fundado por Cristobal Colon en 1493. Aqui se construyo '
      + 'la primera iglesia y se celebro la primera misa en el '
      + 'Nuevo Mundo. Hoy es un parque arqueologico.',
      'colonial'
    );

    this.agregarMarcador(
      18.4735, -69.8834,
      'Alcazar de Colon',
      'Palacio construido en 1510 para Diego Colon, hijo de '
      + 'Cristobal Colon. Es el edificio colonial mas importante '
      + 'de Santo Domingo. Hoy es un museo con muebles y objetos '
      + 'de la epoca colonial.',
      'colonial'
    );

    this.agregarMarcador(
      18.4860, -69.8790,
      'Fortaleza Ozama',
      'La fortaleza militar mas antigua de America, construida '
      + 'entre 1502 y 1508 para proteger la ciudad de piratas. '
      + 'Tiene una torre del homenaje con vistas al rio Ozama.',
      'colonial'
    );

    this.agregarMarcador(
      19.7580, -70.6980,
      'La Vega Vieja',
      'Ruinas de una de las primeras ciudades coloniales, fundada '
      + 'en 1494. Aqui se encontro la primera Cruz del Nuevo Mundo '
      + 'y restos de un fuerte espanol.',
      'colonial'
    );
  }

  // --- Mostrar u ocultar una capa ---
  // nombreCapa: cual capa alternar (ej: 'taino', 'colonial')
  //
  // Si la capa esta visible, la ocultamos.
  // Si esta oculta, la mostramos.
  alternarCapa(nombreCapa) {
    if (!this.capas[nombreCapa]) {
      console.warn(`La capa "${nombreCapa}" no existe.`);
      return;
    }

    const capa = this.capas[nombreCapa];

    // hasLayer verifica si el mapa tiene esa capa visible
    if (this.mapa.hasLayer(capa)) {
      this.mapa.removeLayer(capa);
    } else {
      this.mapa.addLayer(capa);
    }
  }

  // --- Volar a una ubicacion especifica ---
  // El mapa se mueve suavemente hasta las coordenadas indicadas.
  // Es como un "fly to" en Google Maps.
  centrarEn(lat, lng, zoom = 14) {
    if (this.mapa) {
      this.mapa.flyTo([lat, lng], zoom);
    }
  }

  // --- Limpiar y destruir el mapa ---
  // Liberamos la memoria quitando todos los marcadores y el mapa.
  // Es importante hacer esto cuando el jugador sale de la pantalla
  // del mapa para no desperdiciar recursos.
  destruir() {
    if (this.mapa) {
      this.mapa.remove();
      this.mapa = null;
    }

    this.marcadores = [];
    this.contenedor = null;
    this.visible = false;

    // Ponemos todas las capas en null
    for (const nombreCapa of Object.keys(this.capas)) {
      this.capas[nombreCapa] = null;
    }
  }
}
