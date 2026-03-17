// ============================================================
// CONFIGURACION.JS - Los números mágicos que controlan todo el juego
// ============================================================
// Guardamos todos los valores importantes aquí en UN solo lugar
// para que si queremos cambiar algo (como la velocidad del jugador),
// no tengamos que buscar en 50 archivos diferentes.
// ============================================================

// --- Tamaño de la pantalla del juego ---
// Usamos 960x540 porque es proporción 16:9 (como la tele moderna)
// y es exactamente la mitad de 1920x1080 (Full HD), así se escala fácil
export const ANCHO_JUEGO = 960;
export const ALTO_JUEGO = 540;

// --- Tamaño de cada "cuadrito" del mapa ---
// 32 pixeles es el estándar en juegos 2D porque se ve bien
// y es potencia de 2 (las computadoras aman los números potencia de 2)
export const TAMANO_TILE = 32;

// --- Física ---
// La gravedad jala al jugador hacia abajo cada frame.
// 0.6 se siente bien para saltos tipo plataforma — no muy flotante,
// no muy pesado. Si quieres saltos más altos, baja este número.
export const GRAVEDAD = 0.6;

// --- Movimiento del jugador ---
// Cuántos pixeles se mueve el jugador por frame.
// 3 es un buen balance: suficiente rápido para no aburrir,
// suficiente lento para controlar bien en cuevas estrechas.
export const VELOCIDAD_JUGADOR = 3;

// --- Rendimiento ---
// 60 cuadros por segundo es lo estándar para juegos suaves.
// Abajo de 30 se siente "lagueado", arriba de 60 gasta batería sin necesidad.
export const FPS_OBJETIVO = 60;

// --- Escalado responsivo ---
// Estos límites evitan que el juego se vea gigante o microscópico
// cuando el jugador cambia el tamaño de la ventana del navegador.
export const ESCALA_MINIMA = 0.5;  // No encoger más de la mitad
export const ESCALA_MAXIMA = 3.0;  // No agrandar más de 3 veces

// --- Estilos de arte ---
// El juego puede verse de dos formas diferentes:
// "pixel" es el estilo retro clásico (como Undertale)
// "cuphead" es el estilo dibujado a mano (como... Cuphead)
// Esto cambia qué carpeta de imágenes usa el juego.
export const ESTILOS_ARTE = {
  PIXEL: 'pixel',
  CUPHEAD: 'cuphead'
};

// --- Resolución de sprites ---
// Cada tipo de elemento tiene su tamaño ideal en pixeles.
// Así los artistas saben exactamente qué tamaño hacer cada sprite.
export const TAMANO_SPRITES = {
  JUGADOR:     { ancho: 32, alto: 32 },   // Pepito/Pepita — mismo tamaño que un tile
  COMPANERO:   { ancho: 24, alto: 24 },   // Magnoboot, Viralata — más pequeños = sidekick
  CEMI:        { ancho: 16, alto: 16 },   // Cemí Murciélago — espíritu pequeño flotante
  NPC:         { ancho: 32, alto: 32 },   // Personajes del mundo — misma escala que el jugador
  BOSS:        { ancho: 64, alto: 64 },   // Jefes — más grandes = más imponentes
  BOSS_GRANDE: { ancho: 96, alto: 96 },   // Jefes especiales — ocupan mucha pantalla
  ITEM:        { ancho: 16, alto: 16 },   // Objetos del inventario — iconos compactos
  PETROGLIFO:  { ancho: 48, alto: 48 },   // Petroglifos — más grandes para apreciar el arte taíno
  TILE:        { ancho: 32, alto: 32 },   // Tiles del mapa — estándar, potencia de 2
};

// --- Teclas por defecto ---
// Mapeamos las acciones del juego a teclas del teclado.
// Así el código del juego solo pregunta "¿se presionó 'saltar'?"
// sin importar QUÉ tecla física es — eso lo decidimos aquí.
export const TECLAS_POR_DEFECTO = {
  arriba:     ['w', 'W', 'ArrowUp'],
  abajo:      ['s', 'S', 'ArrowDown'],
  izquierda:  ['a', 'A', 'ArrowLeft'],
  derecha:    ['d', 'D', 'ArrowRight'],
  saltar:     [' '],                      // Barra espaciadora
  accion:     ['e', 'E', 'Enter'],         // Interactuar con cosas (E o Enter)
  cancelar:   ['q', 'Q', 'Escape'],       // Salir de menús (Q o Escape)
  inventario: ['i', 'I'],                 // Abrir mochila
  especial:   ['f', 'F'],                 // Habilidad especial
  mapa:       ['m', 'M'],                 // Volver al mapa del mundo
  referencia: ['r', 'R'],                 // Abrir mapa de referencia (Leaflet)
  registro:   ['l', 'L'],                 // Abrir registro de misiones
  foto:       ['t', 'T'],                 // Tomar foto de un objeto/NPC cercano
  selfie:     ['g', 'G'],                 // Tomar selfie con un objeto/NPC cercano
  album:      ['p', 'P'],                 // Abrir/cerrar el álbum de fotos
  ayuda:      ['h', 'H'],                 // Ayuda / instrucciones contextuales
  zoomIn:     ['+', '='],                // Acercar la cámara en el mapa del mundo
  zoomOut:    ['-', '_']                 // Alejar la cámara en el mapa del mundo
};

// --- Guardado ---
// La clave que usamos para guardar en el navegador (localStorage).
// Usamos un nombre único para que no choque con otros juegos.
export const CLAVE_GUARDADO = 'arclycee_guardado';
