# Changelog

## v0.6.0 — Asentamiento Taíno II + Viralata (2026-03-11)

### Agregado

**Asentamiento Taíno II** (`js/mundos/taino/asentamiento-taino-2.js`)
- Nivel top-down agrícola (1400x1000) con tema de agricultura, medicina y ceremonia
- 6 conucos (montículos de cultivo) con plantas únicas dibujadas: yuca, maíz, batata, ají, tabaco
- Río que cruza la aldea (los taínos cultivaban cerca del agua)
- Dujo ceremonial (asiento tallado del cacique) en el centro del batey
- 4 bohíos incluyendo un caney ceremonial
- 3 NPCs educativos con 4 líneas de diálogo cada uno:
  - Behique Yuisa (curandero): medicina natural, ceremonia de la cohoba, plantas curativas
  - Guarionex (agricultor): conucos, técnicas de cultivo, importancia de la yuca
  - Higüemota (música): areíto, maracas, güiros, tambores, tradición oral
- Navaja Suiza coleccionable en el batey
- Misión: hablar con los 3 aldeanos → marca nodo completado y desbloquea nodo 3 (La Isabela)
- 14 palmeras decorativas con profundidad

**Compañero Viralata** (perro callejero rastreador)
- Perro callejero aparece en el Asentamiento Taíno I cerca de la entrada
- Sprite con cola animada, oreja caída y indicador `[E] Adoptar`
- 3 líneas de diálogo de adopción traducidas a ES/FR/EN
- Al adoptar: crea instancia de Viralata, la activa y la agrega a `juego.companeros`
- Sigue al jugador con lerp (0.06) detrás y a la izquierda
- Mueve la cola cuando detecta objetos escondidos cerca (radio de olfato: 50px)
- No aparece si el jugador ya lo adoptó (verifica `juego.companeros`)
- Persiste entre escenas como Magnoboot

**Traducciones** (ES/FR/EN)
- 12 líneas de diálogo por NPC × 3 idiomas = 36 líneas nuevas para aldea 2
- 3 líneas de adopción de Viralata × 3 idiomas = 9 líneas nuevas
- Textos de misión de aldea 2 traducidos

### Corregido
- Progreso de nivel (desbloqueo de nodos) ahora se guarda ANTES de procesar la salida con Q, evitando que el jugador salga sin que se registre su avance
- Viralata ahora tiene métodos `activar()`/`desactivar()` — el juego se congelaba al adoptar al perro porque el callback llamaba un método que no existía

---

## v0.5.0 — Asentamiento Taíno I + Sistema de Compañeros (2026-03-11)

### Agregado

**Asentamiento Taíno I** (`js/mundos/taino/asentamiento-taino-1.js`)
- Nivel completo top-down (vista desde arriba) con aldea taína
- 5 bohíos: 4 circulares + 1 caney rectangular (casa del cacique)
- Batey (plaza ceremonial) con círculo de piedras decorativas
- 3 NPCs educativos: Cacique Guacanagaríx, Anacaona (alfarera), Caonabó (pescador)
- Cada NPC tiene 4 líneas de diálogo que enseñan sobre la vida taína: yucayeques, alfarería, casabe, pesca con canoas
- 12 palmeras decorativas con renderizado por profundidad (las de abajo tapan al jugador)
- Caminos de tierra conectando estructuras
- Brújula coleccionable en el batey
- Misión: hablar con los 3 aldeanos → marca nodo completado y desbloquea nodo 2
- Colisión circular con bohíos

**Sistema de compañeros funcional**
- La Dra. Martínez ahora entrega a Magnoboot al terminar su diálogo (callback `alTerminar`)
- Magnoboot se activa, aparece junto al jugador y lo sigue con lerp suave
- Los compañeros se actualizan y dibujan en la cueva con offset de cámara correcto
- Los compañeros persisten entre escenas vía `juego.companeros[]`
- Compañeros también se renderizan y siguen al jugador en el Asentamiento (top-down)

**Traducciones de la aldea** (ES/FR/EN)
- 12 líneas de diálogo por NPC × 3 idiomas = 36 líneas nuevas
- Textos de misión de la aldea traducidos

---

## v0.4.0 — Cinemática con Audio y Sprite Mejorado (2026-03-11)

### Agregado

**Sonidos procedurales en la cinemática de introducción**
- Paso 0: acorde grave misterioso (E2 + B2) que establece el tono narrativo
- Paso 1: pasos del personaje caminando por la obra de construcción
- Paso 2: acorde de descubrimiento cuando la reliquia brilla
- Paso 3: rumble de terremoto (sawtooth filtrado) + crujidos de roca rompiéndose
- Paso 4: viento de caída (ruido bandpass ascendente) + ráfagas cortas
- Paso 5: impacto grave al llegar al fondo + ruido de escombros

**Sprite detallado del personaje en la cinemática**
- Personaje caminando (pasos 1-2) con cabeza, cabello, ojos con pupilas, torso con ropa, brazos y piernas animadas, zapatos
- Personaje cayendo (paso 4) con ojos mirando hacia abajo
- Estilo visual consistente con el sprite del jugador en la cueva

---

## v0.3.0 — Inventario (2026-03-11)

### Agregado

**Sistema de inventario jugable** (`js/mecanicas/inventario.js`)
- Grilla visual de 5x4 (20 slots) con panel oscuro centrado y borde dorado
- Navegación con flechas, usar objetos con E, cerrar con I o Q
- Íconos únicos dibujados por código para cada objeto: linterna (con rayo de luz), fragmento de mapa (pergamino con texto), artefacto taíno (Cemí dorado con cara), brújula (con aguja roja), navaja suiza (con cruz), magnetómetro (con pantalla verde)
- Info del objeto seleccionado: nombre traducido, descripción de 2 líneas, indicador `[E] Usar` si es consumible
- Contador de slots usados (`3/20 slots`)
- Funciona como overlay global — se puede abrir en cualquier escena jugable (cueva, mapa)
- Botón táctil X en móvil también abre el inventario

**Integración con la cueva**
- Recoger linterna, fragmento de mapa y artefacto taíno los agrega al inventario con nombre, descripción e ícono
- Los objetos recogidos aparecen con sus textos traducidos según el idioma actual

**Traducciones de inventario** (ES/FR/EN)
- Nombres y descripciones de 7 objetos traducidos
- Textos de UI: título, vacío, lleno, usar, cerrar, slots

### Corregido
- Frame de gracia al cerrar inventario con Q: evita que la escena interprete ese Q como "salir"
- Controles actualizados en cueva y mapa para mostrar la tecla I

---

## v0.2.0 — Cueva Viva + Diálogos (2026-03-11)

### Agregado

**Sonido procedural** (`js/motor/sonido-procedural.js`)
- Efectos de sonido generados por código con Web Audio API (cero archivos de audio)
- Sonidos: salto (boing ascendente), aterrizaje (golpe grave), pasos (grava filtrada), recoger objeto (dos notas alegres), descubrir petroglifo (acorde misterioso), daño (distorsión grave), goteo de agua (plink ambiental), bleep de diálogo (estilo Undertale)

**Sistema de diálogos integrado en la cueva**
- Diálogo de introducción: el Espíritu Taína habla 4 líneas al caer a la cueva
- Cada petroglifo muestra un diálogo educativo con texto cultural detallado (no texto plano)
- NPC Arqueóloga (Dra. Martínez) cerca de la salida con 4 líneas de diálogo y entrega de Magnoboot
- Movimiento del jugador bloqueado durante diálogos
- Todos los textos traducidos a ES/FR/EN (20+ strings nuevas por idioma)

**Partículas y ambiente**
- Goteos de agua cayendo del techo con gravedad
- Motas de polvo flotantes con movimiento aleatorio
- Partículas de impacto (polvo) al aterrizar en plataformas

**Parallax de profundidad**
- Capa lejana (20% velocidad): formaciones rocosas grandes
- Capa media (50% velocidad): estalactitas y estalagmitas triangulares

**Personaje mejorado**
- Sprite programático detallado: cabeza, cabello (corto/largo según género), ojos con pupilas, torso con línea de ropa, brazos y piernas animadas, zapatos
- Squash al saltar (se aplasta) y stretch al aterrizar (se estira) para feedback visual
- Animación de piernas y brazos al caminar

**Plataformas mejoradas**
- Textura de roca con variaciones de color cada 24px
- Musgo verde en plataformas grandes
- Bordes de luz y sombra más detallados

**Objetos coleccionables con íconos**
- Linterna: cilindro amarillo con rayo de luz
- Fragmento de mapa: pergamino con líneas de texto
- Artefacto taíno: Cemí dorado con ojos

**NPC Arqueóloga**
- Sprite de la Dra. Martínez con bata blanca, gafas, pelo recogido
- Indicador `[E] Hablar` parpadeante al acercarse
- Nombre flotante encima del personaje

**HUD mejorado**
- Contador de petroglifos descubiertos (🗿 3/5)
- Texto de misión traducido dinámicamente
- Mensaje de caída ahora usa diálogo en vez de texto plano

### Corregido
- Orden de creación del jugador en `juego.js`: ahora se crea ANTES de llamar `iniciar()` en la escena, evitando null reference al posicionar al jugador

---

## v0.1.0 — Scaffold y Mundo Taíno (2026-03-11)

### Agregado

**Motor del juego**
- Game loop con delta time y canvas responsivo (960x540, escala automática)
- Sistema de entrada unificado: teclado (WASD, flechas, Enter, Escape) + controles táctiles virtuales
- Renderizador con estilos intercambiables (Pixel Art / Cuphead)
- Cargador de recursos (imágenes y audio) con seguimiento de progreso
- Sistema de audio con música y efectos separados
- Sistema de guardado (localStorage + placeholder para Firebase)
- Configuración centralizada con constantes de sprites, física y controles

**Escenas**
- Menú principal con partículas flotantes, selector de idioma integrado y créditos
- Selección de personaje (Pepito / Pepita) con preview animado
- Cinemática de introducción en 6 pasos: obra → reliquia → terremoto → caída a la cueva

**Mundo Taíno**
- Cuevas del Pomier: nivel plataforma de 3000px con 15 plataformas
- 5 petroglifos taínos interactivos con símbolos (sol, murciélago, cara, espiral, rana)
- Sistema de oscuridad con círculo de luz (se agranda con linterna)
- 3 graffitis vandálicos mostrando el problema real de las cuevas
- 3 objetos coleccionables (linterna, fragmento de mapa, artefacto taíno)
- Respawn al caer al vacío (devuelve al último punto seguro, -10 HP)
- Mapa del mundo estilo Super Mario World con 4 nodos y desbloqueo progresivo

**Personajes**
- Jugador (Pepito/Pepita) con movimiento top-down y plataforma
- Magnoboot: robot excavador con detección de metal
- Viralata: perro rastreador con sistema de olfato
- Cemí Murciélago: espíritu con 6 niveles de poder (eco-localización → visión de cemí)

**Mecánicas**
- Combate estilo Undertale con ruta pacifista completa (hablar, negociar, educar, pacificar)
- Sistema de diálogos con efecto máquina de escribir y opciones
- Inventario de 20 slots con cuadrícula visual
- Sistema de misiones (principales y secundarias)
- 8 easter eggs personalizados del equipo (cuchara de Elian, shawarma de Carlos Guillermo, etc.)

**Clima**
- Sistema de clima dinámico (soleado, lluvia, tormenta, huracán, terremoto)
- Huracán categoría 1-5 con fases, escombros y empuje de viento

**Internacionalización**
- 3 idiomas completos: Español, Français, English
- Selector de idioma accesible desde el menú principal

**Mapas**
- Integración LeafletJS con sitios arqueológicos reales de RD
- 7 capas: museos, patrimonios, taíno, colonial, submarino, cuevas, prospectiva

**Documentación**
- Prompts para generar todos los assets con MidJourney, Nano Banana Pro, Suno AI, jsfxr
- Tabla de resoluciones de sprites (jugador 32x32, items 16x16, petroglifos 48x48, bosses 64x64)
