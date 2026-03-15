# Changelog

## v0.16.5 — LFSD classroom details, cinematic ending polish (2026-03-15)

### Agregado
- **Prof. Nicolas Droulers avatar**: pelo blanco y barba blanca, cuerpo delgado, sonrisa — actualizado en el juego y en docs/character-sprites.js. Incluido en "El Equipo — Les Fous du Robot" en docs/characters (ES/EN/FR) con borde azul LFSD
- **Pantallas Scratch** en mesas de trabajo LFSD: monitores muestran IDE de Scratch con paleta de categorías (colores icónicos) y bloques de código apilados
- **Mesa FIRST LEGO League**: tapete blanco con caminos negros con borde blanco (line-following paths), zonas de misión de colores, bases de inicio verde/roja
- **Robot LEGO animado**: robot con orugas naranja y sensor verde que recorre los caminos del mapa FLL, pausa en cada waypoint para girar, y continúa
- **Sonido de motor robot**: zumbido continuo (`robotFLLIniciar`/`robotFLLDetener`) — oscilador sawtooth grave con filtro lowpass, se inicia al moverse y se detiene al pausar
- **Etiqueta "Impresora 3D"** traducida (ES/EN/FR) con pieza imprimiéndose visible
- **Scroll manual en créditos**: flechas arriba/abajo para navegar los créditos de cinemática final sin interrumpir el scroll automático
- **"les fous du robot" en créditos**: mostrado bajo "Creado por" antes de los nombres del equipo en la cinemática final

### Mejorado
- **Logo en cinemática**: reposicionado debajo de la reputación, justo encima de "Aventura Arqueológica Dominicana"
- **Menú principal**: bloqueo de entrada al iniciar — evita que presionar E en los créditos active "Nuevo Juego" inmediatamente
- **Cinemática final**: protección contra llamadas múltiples a `_irAlMenu()` al terminar los créditos

---

## v0.16.4 — Hero images, logo, world previews, branding overhaul (2026-03-15)

### Agregado
- **Hero images** en menú principal del juego: 3 imágenes (ES/EN/FR) con viñeta oscura en los bordes, se selecciona según el idioma activo
- **Logo del juego** (`resources/arclycee-logo.png`): letras de piedra con cemí murciélago, fondo transparente. Mostrado en: menú créditos del juego, cinemática final, navegación de docs (64px), footer de docs (64px)
- **Favicon nuevo**: generado desde arte original del cemí con la letra "A", multi-tamaño (16/32/48 ICO + PNG + apple-touch-icon 180px + og-share 192px)
- **World previews** (`docs/world-previews.js`): renders Canvas 2D animados de los 9 mundos del juego, reemplazan las ilustraciones SVG estáticas. Incluye: Cuevas (oscuridad + antorcha), Taíno I/II (bohíos, conucos), La Isabela (ruinas + mar), Zona Colonial (catedral, panteón), Acuático (naufragio + burbujas + medusa), Jurídico (aeropuerto), Museo (vitrinas + lab C-14), LFSD (aula + 9 estudiantes). Animación con requestAnimationFrame + IntersectionObserver
- **Image prompts** (`resources/image-prompts.md`): prompts para Gemini Nano Banana Pro 2 para logo (512×512) y poster (1920×1080)
- **Diana en LFSD** (docs/worlds): listada por nombre en la sección de estudiantes de les fous du robot en los 3 idiomas

### Mejorado
- **Docs hero**: las 3 páginas principales (index.html, en.html, fr.html) usan la hero image como banner en vez del icono cemí + h1
- **Docs navegación**: logo ArcLycée 64px en la barra de navegación (enlaza a inicio) + logo 64px centrado en el footer de todas las 18 páginas
- **Créditos del menú**: logo grande (140px), 9 miembros en 3 columnas, "les fous du robot" en dorado, "Liceo Francés de Santo Domingo — 2026"
- **Créditos de cinemática final**: logo (120px) reemplaza el texto "ArcLycée" en el scroll de créditos
- **Listado de estudiantes LFSD**: sin número fijo ("8 estudiantes" → lista por nombre), Diana incluida en ES/EN/FR

### Corregido
- **worlds-fr.html**: error de sintaxis JS por apóstrofo francés en `d'ArcLycée` — reemplazado con escapes Unicode

---

## v0.16.3 — Technical diagrams, character avatars, batú rebalance (2026-03-15)

### Agregado
- **10 diagramas técnicos SVG** (`docs/tech-diagrams.js`): generados programáticamente con i18n (ES/EN/FR), insertados automáticamente en la documentación técnica. Cubren: arquitectura de módulos, game loop, pila de overlays, combate por turnos, sistema de input, cadena de audio, pipeline de terreno, máquina de estados del clima, árbol de decisión de finales, ciclo de vida de sidequests
- **Diana** añadida al equipo: 9.º miembro de les fous du robot, avatar personalizado (piel clara, pelo rubio largo rizado, cuerpo delgado, camiseta verde), créditos actualizados, docs/characters en 3 idiomas
- **Manatí adulto** en docs/characters: sprite dedicado (más grande que la cría, con cicatrices de red), descripción del rescate en red fantasma, reunión madre-cría. Descripción del bebé manatí corregida
- **Scott Pilgrim** en Carlos Guillermo: 2 líneas de diálogo nuevas (carlosG16, carlosG17) en ES/EN/FR sobre la película y el juego

### Mejorado
- **Avatares personalizados del equipo LFSD**: Carlos Guillermo (piel clara, pelo largo castaño oscuro, gafas azul oscuro, camiseta azul, pantalones naranjas), Rafael (piel clara, pelo castaño claro, delgado), Diana (piel clara, pelo rubio rizado largo) — tanto en el juego como en docs/character-sprites.js
- **Sprite de Fabiola Herrera** en docs: ahora refleja su personaje del juego (piel clara, pelo largo castaño oscuro, labios rojos, blusa blanca)
- **Sprite del pez león** en docs: corregido para mirar en una sola dirección (derecha), con cola, boca y espinas correctamente orientadas
- **Batú rebalanceado**: primero en 5 puntos (era 3), velocidad del jugador 250 px/s (era 200), error de IA reducido a 15% (era 30%)
- **Diagrama de finales**: pills de terminal con fondo opaco 85% y texto blanco para legibilidad
- **Diagrama de sidequests**: ancho reducido para evitar corte del nodo "Completada"

---

## v0.16.2 — Comprehensive technical documentation + source code viewer (2026-03-15)

### Agregado
- **Documentación técnica completa** (`docs/technical.html`, `technical-en.html`, `technical-fr.html`): 22 secciones cubriendo toda la arquitectura del código — game loop, input, renderizado, audio procedural (57 sonidos catalogados), combate, diálogos, compañeros, inventario, álbum de fotos, mapa de tiles, mapa del mundo, mecánicas acuáticas, clima, 4 mini-juegos, reputación, misiones, guardado, mapa Leaflet, finales, i18n, jugador, configuración
- **Visor de código fuente** (`docs/source-viewer.js`): las 34 referencias a archivos .js en la documentación técnica son clicables y abren un modal con el código fuente formateado con syntax highlighting (colores estilo GitHub Dark: keywords en rojo, strings en azul, comentarios en gris, funciones en púrpura, números en azul). Incluye números de línea, conteo de líneas, cierre con Escape/click fuera, responsive para móvil

### Mejorado
- **Documentación técnica reescrita**: de ~110 líneas básicas (controles + tech stack) a ~1,140 líneas por idioma con cobertura exhaustiva de todos los sistemas del juego

---

## v0.16.1 — Collision feedback, photo album for corals & turtles, shark bite sound (2026-03-15)

### Agregado
- **Sonido de impacto de lancha** (`lanchaImpacto()`): golpe grave + chapoteo + grito Wilhelm sintético (3 capas de audio procedural)
- **Sonido de mordida de tiburón** (`mordidaTiburon()`): crujido de mandíbulas (ruido high-pass) + golpe grave + gruñido con vibrato (distinto al de lancha)
- **Sacudida del avatar al recibir daño**: oscilación lateral `sin(t*50)` con decaimiento — 0.6s para lanchas, 0.5s para tiburones, 0.4s para medusas
- **Fotos y selfies de tortugas**: renderizado dedicado `_renderizarTortuga()` con sprites específicos por especie (carey con rayas, tinglar con crestas y manchas, caguama con marca de corazón, verde con manchas)
- **Fotos y selfies de corales**: renderizado dedicado `_renderizarCoral()` con sprites por tipo (cerebro con surcos meándricos, cuerno de alce con ramas bifurcadas, abanico con venación radial, mesa con plataforma)
- **Corales fotografiables** en ambos mundos acuáticos: 6 corales con descripciones científicas en Santuario, arrecife en Naufragio
- **Array `fotografiables`** en sistema de fotos: las escenas pueden exponer elementos extra para el álbum

### Mejorado
- **Toast de zona de hélices**: se muestra una sola vez al entrar a la zona, se reinicia al salir — ya no se repite cada 1.5s
- **Detección de tortugas en fotos**: NPCs con id `tortuga*` usan renderizado dedicado en vez del genérico

### Corregido
- **Barra de O₂ tapada por reputación**: la barra de reputación ya no se dibuja en el Santuario del Manatí
- **Toast de transición demasiado largo**: dividido en 2 mensajes secuenciales con 4s de separación

---

## v0.16.0 — Aquatic world overhaul: whales, turtles, corals, oxygen, speedboats + map i18n + Diana rename (2026-03-15)

### Agregado
- **3 nuevas especies de tortuga**: Tinglar (laúd, azul oscuro con crestas, la más grande), Caguama (boba, marrón rojizo, marca en forma de corazón) y Verde (ya existente en el santuario) — cada una con diálogo educativo de 4 líneas en 3 idiomas
- **Animación de aletas**: las 4 especies de tortuga mueven sus aletas al nadar con pares diagonales alternados (patrón `Math.sin`)
- **Pez león móvil**: patrulla en figura de 8 (curva de Lissajous) en vez de quedarse estático
- **Lanchas rápidas en Santuario del Manatí**: speedboats cruzan la zona de hélices cada 8-15 segundos con estela de olas, espuma y motor fuera de borda. Cascos de 5 colores aleatorios. Golpe = -8 vida con invulnerabilidad de 2s
- **Sonido de motor de lancha** (`lanchaMotor()`): motor fuera de borda con efecto Doppler (onda cuadrada + ruido de agua filtrado)
- **Sistema de oxígeno en Santuario del Manatí**: barra O₂ azul en HUD, se agota en ~60s nadando, se recarga al subir a la superficie (zona peligrosa). Alerta sonora + toast al 25%. Daño por asfixia (-3 vida/1.5s) al 0%
- **Rotación de nado**: avatar rota ~75° al nadar lateralmente, 180° (cabeza abajo) al nadar hacia abajo, transición suave con lerp
- **Mensajes de transición acuática**: al cruzar entre Naufragio y Santuario se muestra un mensaje sobre dejar/recoger el equipo de buceo (tanques de oxígeno, snorkel vs. buceo profundo)
- **Mapa Leaflet trilingüe**: ~200 claves de traducción para los 150+ sitios, capas, overlays y UI del mapa de referencia real (ES/EN/FR). Patrón `clave` en cada marcador, lookup via `_textosMapa()`
- **Diana renombrada** (antes Sofía en LFSD): nueva historia sobre su navaja suiza arqueológica diseñada en 3D e impresa, incluida como objeto en el juego

### Mejorado
- **Ballenas jorobadas reescritas**: silueta completa como un solo path Bezier continuo (hocico → joroba → fluke → vientre) — elimina artefacto de "cabeza cuadrada" por doble-alfa en formas superpuestas. Ambos mundos acuáticos
- **Ballenas más visibles**: opacidad base 0.22-0.32 (antes 0.12-0.20), opacidad cantando 0.50 (antes 0.35), hasta 2 simultáneas, spawn rate +67%, cooldown de canto 12s (antes 20s), `vidaMax` corregido para fade-in inmediato
- **Coral cerebro realista**: gradiente radial 3D, surcos meándricos multi-Bezier clipeados a la forma, valles intermedios, brillo especular, sombra inferior (4 instancias actualizadas)
- **Coral abanico realista**: tallo leñoso con textura, gradiente radial, vena central + 6-8 venas radiales curvas con sub-venas bifurcadas, malla de arcos concéntricos como red de gorgonia (4 instancias actualizadas)
- **Tortuga carey**: ahora siempre mira en la dirección en que nada (tracking de `mirandoDerecha` con flip de sprite)

---

## v0.15.8 — Complete i18n: structure names, LFSD dialogues, Alberto pranks (2026-03-15)

### Agregado
- **Sección `lugares`** en los 3 idiomas con 32 nombres traducidos: bohíos taínos, cultivos, edificios de La Isabela, salas del museo Atarazanas Reales
- **Alberto → Carlos Guillermo pranks**: Alberto ahora le esconde el libro y la lonchera a Carlos Guillermo como broma amistosa, reflejando la amistad del equipo

### Corregido
- **Diálogos LFSD no se traducían**: la ruta `textos?.dialogos?.lfsd` era incorrecta — la sección `lfsd` está al nivel raíz, no dentro de `dialogos`. Corregido a `textos?.lfsd`
- **Prof. Droulers** → renombrado a **Prof. Nicolas Droulers** en los 3 idiomas y el fallback

---

## v0.15.7 — Translate toasts, labels, HUD messages + hide reputation on map (2026-03-15)

### Agregado
- **~50 claves de traducción** para toasts (guardado, misiones, laboratorio, santuario), etiquetas de ubicación (SALIDA, RECEPCIÓN, ADUANAS, MUSEO, Santuario, HÉLICES), leyenda del mapa de riesgo y HUD del mapa

### Corregido
- **Barra de reputación en mapa del mundo**: ya no se muestra en la pantalla del mapa — solo visible dentro de niveles

---

## v0.15.6 — Full i18n: all UI strings translated to English and French (2026-03-15)

### Agregado
- **~130 claves de traducción** en sección `ui` de los 3 archivos de idioma (ES/EN/FR)
- **Nombres de personajes traducidos**: "Espíritu Taína" → "Taíno Spirit" / "Esprit Taïno", "Petroglifo" → "Petroglyph" / "Pétroglyphe"
- **Toasts de inventario traducidos**: "ítem añadido al inventario" → "item added to inventory" / "objet ajouté à l'inventaire" en los 9 mundos

### Mejorado
- **Controles de mundo** (barra inferior): 10 variantes de controles traducidas según el tipo de mundo
- **Etiquetas de acción**: `[E] Hablar`, `[E] Examinar`, `[F] Detectar Metal` y 10 más traducidas
- **Combate**: Hostilidad, Tu vida, indicadores de turno, controles y pista por defecto traducidos
- **Cinemáticas**: intro completa (4 textos), selección de personaje (descripción + controles), créditos (13 strings)
- **Mini-juegos**: instrucciones de calibración, programación de bloques y conexión de cables traducidas
- **Menú/HUD**: selector de niveles (Konami), registro de misiones, controles de batú traducidos

### Archivos modificados
- 26 archivos: 3 idiomas, 4 escenas, 6 mecánicas, 1 motor, 10 mundos, 1 mapa, 1 registro

---

## v0.15.5 — Gift counter, 5 endings, Prof. Droulers, coral reef, LFSD unlock fix (2026-03-15)

### Agregado
- **Contador de regalos** (🎁): HUD en y=74 en 5 mundos muestra ítems/compañeros recibidos de NPCs (Asentamiento I: 1, Asentamiento II: 2, Cuevas Pomier: 1, La Isabela: 1, Mundo Acuático: 1). Se vuelve verde al completar
- **5to final — Completo**: requiere 8+ nodos + 5 sidequests completadas + todos pacificados. Nuevo título "Leyenda de Quisqueya" con fondo de rayos dorados giratorios y acorde C major 9
- **Final Pacifista**: renombrado del antiguo "Completo" (8+ nodos + todos pacificados, sin requerir sidequests)
- **Prof. Nicolas Droulers**: NPC mentor en LFSD con sprite personalizado (delgado, pelo blanco, sonrisa), 5 pares de diálogos rotativos sobre el proyecto, el patrimonio y sus estudiantes
- **Desbloqueo dinámico de LFSD**: el nodo LFSD se desbloquea al descubrir cualquier sidequest que lo mencione (La Isabela → buenasVibraciones, Santuario → metalCompleto, Museo → cienciaLoca), sin necesidad de completar Mundo Laboratorio

### Mejorado
- **Arrecife de coral realista**: reemplazado círculos aleatorios por formaciones determinísticas: base rocosa, coral cerebro con surcos, coral cuerno de ciervo con puntas blancas, abanico de mar con Bézier, esponjas tubo púrpura, coral de fuego amarillo, algas animadas con sin()

### Corregido
- **Toast de ballena atascado**: corregida duración de `4000` (interpretado como 4000 segundos) a `4` segundos

---

## v0.15.4 — HUD layout fix: Vida + Reputación side by side (2026-03-14)

### Mejorado
- **Barras de HUD en una fila**: Vida (120px) y Reputación (100px) ahora se dibujan lado a lado en la misma línea (y=10), sin solapar los indicadores de mundo (NPCs, objetos, habilidades) que aparecen debajo (y=42+)
- **Etiqueta "Reputación" dentro de la barra**: el texto se muestra dentro de la barra de color como "Vida" dentro de la suya, con el color indicando el nivel (rojo→amarillo→verde→dorado)

---

## v0.15.3 — Sistema de curación con NPCs taínos (2026-03-14)

### Agregado
- **Curación del Behique**: interactuar con Behique Yuisa en Asentamiento II cura al jugador a 100 HP. En re-visitas muestra `[E] Curar` y cura sin repetir el diálogo largo
- **Hojas de Guanábana**: Guarionex (agricultor) da hojas y semillas de guanábana como ítem usable de inventario (+30 vida). Se puede obtener de nuevo si se usó
- **Vasija Curativa**: Anacaona (alfarera) da vasija de barro con pulpa de higüero, savia de maguey y tuna como ítem usable de inventario (+35 vida). Se puede obtener de nuevo si se usó
- **Toast de curación en inventario**: al usar un objeto curativo desde el inventario, se muestra toast con el nombre del ítem y vida restaurada
- **Íconos de inventario**: íconos pixel art para guanábana (hojas verdes con semillas) y vasija curativa (vasija de barro con decoración taína)
- **Flag `esCurandero`**: NPCs curanderos siempre muestran `[E]` y permiten re-interacción (no se ocultan tras hablar)
- **Callback `alUsar`** en Inventario: permite que juego.js muestre toasts al usar objetos

### Eliminado
- **Casabe de piso**: eliminado el pickup de casabe curativo del Asentamiento I (reemplazado por vasija de Anacaona)
- **Hierbas curativas de piso**: eliminadas las hierbas curativas del Asentamiento II (reemplazadas por curación del Behique + guanábana de Guarionex)

### Traducciones
- Nuevas cadenas en ES/EN/FR: guanábana, vasija curativa, behiqueCurar, behiqueSano, agricultorGuanabana, agricultorSaludo, alfarerVasija, alfareraSaludo

---

## v0.15.2 — Documentación de personajes, canvas tile map, mejoras de fotos (2026-03-14)

### Agregado
- **Página de personajes en docs**: nueva pestaña en la documentación con todos los NPCs organizados por mundo, avatares, y el equipo creador ("les fous du robot")
- **Canvas tile map en docs**: reemplazado SVG de islas en la documentación de mundos con `<canvas>` inline que renderiza el mapa real de 128×68 tiles del juego con posiciones reales de nodos
- **Sistema de fotos para Dra. Martínez**: Cuevas del Pomier ahora expone la NPC arqueóloga para el sistema de foto/selfie (T=foto, G=selfie)

### Mejorado
- **Renderizado de fotos/selfies**: las fotos ahora muestran solo el sprite del NPC/objeto centrado sobre fondo oscuro neutro (cuadrado). Las selfies muestran NPC y jugador lado a lado en rectángulo vertical. Ya no usa fondos temáticos que parecían capturas de pantalla. Usa detección de bounding-box para auto-centrar cualquier sprite
- **Diálogos LFSD en docs**: los 11 personajes estudiantes ahora tienen líneas de diálogo completas en la documentación ES/EN/FR (antes solo 3 estudiantes con diálogos parciales)
- **Navegación de documentación**: corregido el highlighting de pestañas que siempre mostraba "Inicio", el idioma que siempre mostraba "ES", y la imagen del cemí que no se mostraba. Añadido soporte para URLs sin extensión (/docs/mechanics → mechanics.html)
- **Rutas de recursos**: corregidas las rutas de favicon y logo cemí en los 18 archivos HTML de documentación (resources/ → ../resources/)

### Corregido
- **Bucle de redirección en navegación**: `/docs/mechanics` ya no redirige a `/docs/mechanics/` (lo cual rompía la carga de CSS/JS). Ahora maneja URLs sin extensión directamente
- **`/docs` sin trailing slash**: redirige correctamente `/docs` → `/docs/` sin afectar subpáginas

---

## v0.15.1 — Sidequests, reputación en combate, corrección histórica Santa María (2026-03-14)

### Agregado
- **Batú como sidequest**: Higüemota ofrece el batú como misión secundaria — el jugador puede aceptar o rechazar. Si rechaza, queda como misión pendiente que puede retomar al hablar de nuevo
- **Rescate del manatí como sidequest**: liberar al manatí y limpiar el arrecife ahora son objetivos de la misión secundaria "Rescate del manatí". Al completar ambas acciones ecológicas, la misión se marca como completada
- **Reputación por combate**: derrotar enemigos aumenta la reputación — victoria pacífica +15, victoria por fuerza +5. Aplicado en La Isabela, Zona Colonial, Mundo Acuático y Aeropuerto de Punta Cana
- **Reputación por acciones ecológicas**: liberar al manatí (+10) y limpiar el arrecife (+10)
- **Arresto cinematográfico**: al derrotar al traficante Rodrigo Torres en el Aeropuerto, Inspector Ramírez y Agente Montero caminan hacia él, lo arrestan con diálogo, y lo escoltan fuera de la escena
- **Diálogo post-arresto**: Inspector Ramírez tiene diálogo nuevo tras el arresto
- **Opciones de diálogo**: sistema de ↑↓ para elegir opciones en conversaciones (usado en oferta de batú)
- **Historia Principal en Registro (L)**: la pestaña muestra los 9 mundos en orden con íconos de estado (✅ completado, 🔓 desbloqueado, 🔒 bloqueado), nombre traducido y descripción
- **5 misiones secundarias**: batú, rescate del manatí, buenas vibraciones, metal completo, ciencia loca

### Mejorado
- **Batú rebalanceado**: gravedad reducida (600→480), saque más rápido (300→400) con arco más plano, IA más lenta (85%→72%) con mayor retardo de reacción (0.15s→0.3s), 30% errores e imprecisión posicional de 25px
- **Selfies lado a lado**: en selfies con NPCs, el avatar del jugador y el NPC aparecen uno al lado del otro en vez de arriba/abajo
- **Fotos con sprites reales**: las fotos y selfies muestran el avatar real del NPC con su apariencia y accesorios, no un sprite genérico

### Corregido
- **Corrección histórica — Santa María**: renombrado "Naufragio La Pinta" a "Naufragio Santa María". No hay registro histórico del hundimiento de La Pinta. La Santa María, nave capitana de Colón, encalló cerca de Cap-Haïtien la Nochebuena de 1492
- **Reubicación del naufragio**: nodo movido de la costa sureste (tileX: 100, tileY: 44) a la costa norte de Haití (tileX: 36, tileY: 10) cerca de Cap-Haïtien
- **Respawn al morir**: el jugador ahora reaparece en el mundo donde murió, no en el siguiente mundo desbloqueado
- **Roberto Cassá en Museo Atarazanas**: ahora cuenta como conversación (era 3/3, corregido a 4/4). Se cambió `esMentor: false` y se incrementó `totalNPCs` a 4
- **Orden Judicial reubicada**: movida junto a Inspector Ramírez cerca de la oficina de INTERPOL
- **Torres oculto post-arresto**: Rodrigo Torres se oculta del renderizado e interacción tras ser escoltado fuera

---

## v0.15.0 — Mapa geográfico, LFSD, misiones secundarias y sonido ambiental (2026-03-14)

### Agregado
- **Nivel LFSD** (`js/mundos/lfsd/mundo-lfsd.js`): aula de robótica del Liceo Francés como nivel interior top-down con 8 NPCs estudiantes (les fous du robot) y 3 dadores de misiones
- **3 mini-juegos de misiones secundarias**:
  - `calibracion-senal.js` (Good Vibrations): calibrar magnetómetro con 3 diales en osciloscopio
  - `programacion-bloques.js` (Full Metal Archeologist): programar robot submarino con bloques
  - `conexion-cables.js` (Weird Science): conectar 6 cables en circuito bajo presión de tiempo
- **Sistema de misiones secundarias** (`misiones-secundarias.js`): 3 sidequests con estados descubierta/en_progreso/completada
- **Registro de juego** (`registro-juego.js`): Game Log accesible con tecla L, con pestañas Principal/Secundaria
- **Sistema de reputación** (`reputacion.js`): puntuación 0-100 con 4 niveles (desconocido→legendario), medidor visual, bonus en combate
- **Álbum de fotos por sprites** (`album-fotos.js`): reescritura completa — genera retratos desde sprites de entidades en vez de capturas de pantalla del canvas
- **Santuario del Manatí** (`santuario-manati.js`): sub-nivel acuático con 2 acciones ecológicas, tiburones patrulleros y zona de hélices
- **Sonido ambiental de lluvia**: lluvia procedural continua (ruido blanco filtrado + gotas individuales) que se activa automáticamente durante lluvia/tormenta/huracán
- **Sonido de trueno**: retumbar grave durante tormentas, disparado aleatoriamente cada 4-15 segundos
- **Touch/pinch/drag en mapa del mundo**: soporte móvil con arrastre táctil, zoom por pellizco, y arrastre con ratón en desktop
- **Capa de sitios arqueológicos** en mapa Leaflet: 8 sitios reales inexplorados de RD (Cueva de Berna, Punta Macao, El Cabo, etc.), desbloqueables tras completar misión del robot

### Mejorado
- **Mapa geográfico completo**: 8 cordilleras (Central, Septentrional, Oriental, Neiba, Bahoruco + 3 macizos haitianos), 5 ríos (Yaque del Norte/Sur, Yuna, Ozama, Artibonite), 2 lagos (Enriquillo, Saumâtre) — trazados desde mapas topográficos NASA y mapa hidrográfico de referencia
- **Península de Samaná** agregada al bitmap de la isla
- **Posiciones de nodos geográficamente correctas**: Santo Domingo en la costa sur (fila 44), La Isabela en la costa norte, Punta Cana en el extremo este, Asentamiento Taíno II en el Valle del Cibao, etc.
- **Bitmap de isla corregido**: cerrados gaps falsos en filas 32-35 y 40-43 que creaban manchas de agua artificiales
- **Zoom del mapa**: mínimo reducido de 0.5× a 0.25× para ver toda la isla
- **Mapa de tiles escalado 2×**: 128×68 tiles (antes 64×34) para más espacio entre nodos

---

## v0.14.0 — Mini-juego de Batú (pelota taína) (2026-03-13)

### Agregado
- **Mini-juego de batú** (`js/mecanicas/batu.js`): juego de pelota taíno jugable como overlay, con física 2D completa (gravedad, rebotes elásticos, fricción del aire)
- **4 tipos de golpe** según altura del impacto: cadera/yugo (más fuerte, 45°), hombro (60°), cabeza (casi vertical), rodilla (bajo, defensivo)
- **IA del rival**: velocidad al 85%, retardo de reacción de 150ms, 15% de errores intencionales — vencible por jugadores de ~13 años
- **6 datos educativos** mostrados entre puntos: pelota de cupey, petroglifos en bateyes, yugo de piedra, areíto, diplomacia deportiva, sitios arqueológicos (Chacuey, La Aleta, Tibes, Caguana)
- **2 historias**: resolución de disputa pesquera (diplomacia) o partido amistoso durante areíto (ceremonia)
- **Renderizado completo**: cancha lateral con bordes de piedra y petroglifos, espectadores animados, cacique en dujo, pelota con estela de movimiento, personajes con yugo visible
- **5 sonidos procedurales** para batú: `batuGolpe` (impacto seco), `batuRebote` (caucho contra piedra), `batuPunto` (arpegio celebratorio), `batuSaque` (señal tipo silbato), `batuMultitud` (ruido de espectadores)
- **Integración con Asentamiento Taíno II**: Higüemota (NPC músico) ofrece el batú en su segunda conversación, con 3 estados de diálogo (areíto → oferta → resultado)
- **Traducciones completas** en ES/EN/FR: sección `batu` con 28 claves + 6 claves de diálogo de Higüemota en `aldea2`
- Integrado en `juego.js` como overlay (mismo patrón que el combate): `this.batu = new JuegoBatu()`, con hooks en `actualizar()` y `dibujar()`

---

## v0.13.6 — Mapa de tiles trazado desde imagen de referencia (2026-03-13)

### Mejorado
- **Forma de la isla completamente rediseñada**: la costa ahora se define con un bitmap de 64×34 tiles trazado directamente desde la imagen de referencia pixelada (`resources/hispaniola-map-pixelated-tiled.png`), en vez de las aproximaciones con elipses
- Isla mucho más fiel a la geografía real: ambas penínsulas de Haití, Bahía de Samaná abierta al este, Golfo de la Gonâve, Punta Cana, costa sur con bahías
- **Île de la Gonâve** correctamente separada del continente por un canal de agua
- **Indicador de cierre en mapa de referencia**: banner "R / Esc — cerrar mapa" visible al abrir el mapa Leaflet
- **Tecla Escape cierra el mapa de referencia** además de R

### Corregido
- Todos los nodos del juego verificados en terreno caminable (nodo + punto de spawn 1 tile debajo)
- Node 0 (Pomier) movido de zona montañosa a terreno llano para evitar que el jugador quede atrapado
- Naufragio (Node 5) reposicionado a agua costera válida en el nuevo bitmap
- La Isabela (Node 3) reposicionada para que el spawn no caiga en agua
- Reemplazada función `_distanciaACordillera()` (rota) por `_distanciaACordilleras()` que itera las 6 cadenas montañosas
- Añadida función `_esLago()` para lagos interiores (Enriquillo + Étang Saumâtre)

---

## v0.13.5 — Mapa Real accesible desde el menú principal (2026-03-13)

### Agregado
- **Opción "Mapa Real" en el menú principal**: permite ver el mapa de referencia Leaflet sin necesidad de iniciar una partida
- Traducido a ES ("Mapa Real"), EN ("Real Map"), FR ("Carte Réelle")
- Se cierra con R, Q o Escape
- El menú principal ahora tiene 7 opciones: Nuevo Juego, Continuar, Idioma, Mapa Real, Documentación, Opciones, Créditos

---

## v0.13.4 — Museos de La Hispaniola + íconos grandes (2026-03-13)

### Agregado

**Capa de museos** (`js/mapas/mapa-leaflet.js`)
- 30 museos históricos y arqueológicos con marcadores 🏛 en el mapa de referencia (R)
- Santo Domingo (14): Hombre Dominicano, Atarazanas, Alcázar de Colón, Casas Reales, Catedral Primada, Historia Natural, Resistencia, Bellapart, Arte Moderno, Trampolín, Ámbar, Larimar, Fortaleza Ozama, Faro a Colón
- Santiago (2): Centro León, Tabaco La Aurora
- Puerto Plata (3): Ámbar, Fortaleza San Felipe, Museo La Isabela
- Otras ciudades RD (6): Altos de Chavón, Ballenas (Samaná), La Vega Vieja, Hermanas Mirabal, Basílica Higüey, San Pedro de Macorís
- Haití (5): MUPANAH, Musée d'Art Haïtien, Centre d'Art, Saint-Martial, Ogier-Fombrun
- Citadelle Laferrière y Sans-Souci movidos de Colonial a Museos
- Capa toggleable desde el panel inferior derecho

### Mejorado
- **Íconos de marcadores más grandes**: de 16px/20px a 28px/32px para mejor visibilidad
- Eliminadas duplicaciones entre capas (museos solo en capa Museos, sitios/ruinas en Taíno/Colonial)

---

## v0.13.3 — Naufragios + sitios arqueológicos de toda La Hispaniola (2026-03-13)

### Agregado

**Capa de naufragios históricos** (`js/mapas/mapa-leaflet.js`)
- 12 naufragios alrededor de La Hispaniola con marcadores ⚓ en el mapa de referencia (R)
- Santa María (1492), San Miguel (1551), Concepción (1641), Monte Cristi Pipe Wreck (1660), Quedagh Merchant (1699), Guadalupe (1724), Conde de Tolosa (1724), Le Scipion (1782), Golden Fleece (1827), Hickory (1944), Astron (1978), zona de naufragios de Santo Domingo
- Capa toggleable desde el panel inferior derecho

**Sitios arqueológicos de Haití** (`js/mapas/mapa-leaflet.js`)
- 5 sitios taínos en Haití: En Bas Saline, Fort-Liberté, Grotte Marie-Jeanne, Museo Taíno Cap-Haïtien, Sainte-Suzanne
- 4 sitios coloniales en Haití: Citadelle Laferrière, Sans-Souci, Cap-Haïtien, Jacmel

### Corregido
- **Coordenadas de sitios taínos y coloniales corregidas**: todas las ubicaciones verificadas con coordenadas reales
- Sitios taínos ampliados de 7 a 17 (añadidos: Berna, Las Caritas, Cotuí, Chacuey, La Caleta, Juan Dolio, Museo del Hombre)
- Sitios coloniales ampliados de 5 a 12 (añadidos: Atarazanas, San Francisco, Ozama, San Felipe + 4 de Haití)

---

## v0.13.2 — Nodos del mapa reubicados a posiciones geográficas reales (2026-03-13)

### Corregido
- **Nodos del mapa de isla (M) ahora coinciden con el mapa real (R)**: las posiciones de los 8 niveles se recalcularon a partir de las coordenadas lat/lng reales
  - Pomier (21,19), Asentamiento I (19,17), Asentamiento II (22,16): agrupados cerca de San Cristóbal
  - La Isabela (12,8): costa noroeste
  - Zona Colonial (26,17) y Atarazanas (28,16): juntos en Santo Domingo
  - Naufragio (29,22): costa sur de Santo Domingo (en agua)
  - Punta Cana (42,14): extremo este (sin cambio)

---

## v0.13.1 — Stadia Maps API key configurada (2026-03-13)

### Corregido
- **Mapa de referencia (R) daba error de autenticación**: configurada API key real de Stadia Maps (dominio: `arc.cemi.ai`)
- Las 6 capas de Stadia (acuarela, terreno, tóner, oscuro, suave, OSM bright) ahora cargan correctamente
- Capa CARTO Voyager como respaldo sin API key

---

## v0.13.0 — Mapa con tiles, mapa de referencia Leaflet, créditos (2026-03-13)

### Agregado

**Mapa de isla con tiles** (`js/mundos/mapa-tiles.js`, `mapa-principal.js`)
- Generación procedural de La Hispaniola con 8 tipos de terreno: agua profunda, agua superficial, arena, pradera, bosque, montaña, camino, río
- 48×30 tiles (1536×960px) — más grande que la pantalla, requiere scroll con cámara
- Cámara lerp-based con clamping a bordes del mapa
- Colisiones por tile (agua profunda y montaña bloquean movimiento)
- Mini-mapa en esquina superior derecha con posición del jugador y nodos
- Detalles animados procedurales: olas, copas de árboles, briznas de hierba
- Coastline con 7 elipses, bahías, Cordillera Central, 3 ríos

**Mapa de referencia real** (`js/mapas/mapa-leaflet.js`, `js/mapas/referencia/`)
- Overlay Leaflet activado con tecla R desde el mapa principal
- 7 capas de tiles: 6 de Stadia Maps (acuarela, terreno, tóner, oscuro, suave, OSM bright) + CARTO Voyager
- Control de capas en esquina superior derecha
- 8 marcadores interactivos con DivIcon coloreado por estado (completado/disponible/bloqueado)
- Click-to-travel: popup con botón "Viajar aquí" → animación de vuelo → cambio de escena
- 7 sitios arqueológicos taínos + 5 sitios coloniales con marcadores informativos
- Toggle de capas arqueológicas en esquina inferior derecha
- Animación de ruta con polyline dorado punteado

**Créditos cinematográficos** (`js/escenas/final-cinematica.js`)
- Créditos estilo película tras el final del juego
- Scroll vertical automático con fondo estrellado
- Nombres del equipo: Elian, Théo, Carlos Guillermo, Jules, Alberto, Rafael, Tom, Nael
- Lycée Français de Saint-Domingue, Santo Domingo, 2026
- E para acelerar, skip automático al terminar

### Modificado
- `juego.js`: importa MapaLeaflet, inicializa referencia map, maneja tecla R
- `configuracion.js`: añade `referencia: ['r', 'R']` a teclas
- `principal.css`: estilos para marcadores y animación de ruta

---

## v0.12.2 — NPCs accesibles en Museo Atarazanas + Mapa con tiles (WIP) (2026-03-13)

### Corregido

**NPCs inaccesibles en Museo Atarazanas** (`js/mundos/laboratorio/mundo-laboratorio.js`)
- Dr. Morbán, Dra. López y Restauradora Ana estaban posicionados dentro de sus salas (Sala de Exhibición, Laboratorio C-14, Taller de Restauración) que tienen colisión
- El jugador no podía entrar a las salas para hablar con ellos
- Movidos los 3 NPCs a justo fuera de sus salas respectivas (debajo de la entrada)
- Objetos coleccionables (certificado y catálogo) también movidos fuera de las salas

### En progreso

**Sistema de tiles para mapa de la isla** (`js/mundos/mapa-tiles.js`)
- Nuevo archivo que genera la forma de La Hispaniola con elipses
- Tiles: agua profunda, agua superficial, arena, pradera, bosque, montaña, camino, río
- 48×30 tiles (1536×960px) con cámara que sigue al jugador
- Renderizado con detalles procedurales (olas animadas, copas de árboles, briznas de hierba)
- Cordillera Central, ríos, bahías y playas generados proceduralmente
- Posiciones de los 8 nodos del juego mapeados a ubicaciones geográficas reales
- Aún no conectado al mapa principal (en desarrollo)

---

## v0.12.1 — Joystick táctil + corrección Laboratorio (2026-03-13)

### Agregado

**Joystick virtual** (`js/motor/entrada.js`)
- Nuevo control de movimiento analógico para dispositivos táctiles
- Stick circular que se arrastra con el dedo, reemplaza la cruceta de 4 botones
- Zona muerta del 15% para evitar falsos positivos
- Soporte diagonal natural (arriba+derecha al mismo tiempo)
- Multitouch: el joystick y los botones de acción funcionan simultáneamente
- El stick se ilumina dorado al tocarlo y vuelve al centro al soltar

**Selector de controles táctiles** (`js/escenas/menu-principal.js`)
- Nueva opción en el submenú Opciones: "Controles táctiles: < Joystick / Cruceta >"
- Cambio con flechas izquierda/derecha o Enter
- Preferencia guardada en localStorage (persiste entre sesiones)
- Descripción del modo activo debajo del selector
- Traducido a ES/FR/EN

### Corregido

**Mundo Laboratorio crasheaba al hablar con NPCs** (`js/mundos/laboratorio/mundo-laboratorio.js`)
- `this.dialogos.iniciar()` no existía → corregido a `this.dialogos.iniciarDialogo()`
- Diálogos pasaban strings planos en vez de objetos `{personaje, texto}` → corregido con nombre de personaje por NPC
- `this.dialogos.activo` → `this.dialogos.estaActivo()` (propiedad no existía, el método sí)
- `this.dialogos.actualizar(entrada)` → `actualizar(dt)` + manejo de input con `avanzar()` (mismo patrón que mundo-juridico.js)

---

## v0.12.0 — Mundo Laboratorio + Finales + Clima (2026-03-13)

### Agregado

**Mundo Laboratorio — Museo de las Atarazanas Reales** (`js/mundos/laboratorio/mundo-laboratorio.js`)
- Acto 5: autenticación de artefactos recuperados en el museo
- Nivel top-down 1800x1200, interior de museo con piso de mármol
- 8 estructuras: Sala de Exhibición, Laboratorio C-14, Taller de Restauración, 3 Vitrinas, Mostrador de Recepción, Almacén de Piezas
- 5 NPCs educativos:
  - Dr. Fernando Morbán: director del museo, explica el proceso de autenticación
  - Dra. López: científica, enseña datación por Carbono-14
  - Restauradora Ana: principios de restauración reversible
  - Roberto Cassá: mentor recurrente con 5 diálogos rotativos sobre museos
  - Visitante Sospechoso: intenta vender falsificaciones, aprende sobre autenticación
- 2 objetos coleccionables: Certificado de Autenticidad, Catálogo del Museo
- Sin combate — la enseñanza es por diálogos
- Nodo 7 en el mapa del mundo (conectado desde Aeropuerto)

**Múltiples Finales** (`js/escenas/final-cinematica.js`)
- 4 finales determinados por las decisiones del jugador:
  - Completo: todos los nodos + combates pacificados → mensaje triunfante
  - Museo: final por defecto → exhibición museística
  - Ecológico: acciones ecológicas ≥ 3, sin violencia → conservación marina
  - Oscuro: más combates violentos que pacificados → reflexión
- 5 pantallas de texto por final con fondos temáticos y sonidos procedurales
- Sistema de tracking: `combatesPacificados`, `combatesViolentos`, `accionesEcologicas` en progreso

**Sistema de Clima** (`js/clima/clima.js` activado)
- El sistema de clima (391 líneas) ahora se instancia y activa en mundos exteriores
- Configuración por escena: asentamientos = soleado, mundo colonial = nublado
- Desactivado en interiores (cuevas, submarino, aeropuerto, museo)
- 6 tipos: soleado, nublado, lluvia, tormenta, huracán, terremoto
- Transiciones suaves con lerp, partículas visuales, efectos en jugador

### Modificado
- `juego.js`: importa y registra MundoLaboratorio, FinalCinematica, SistemaClima
- `mapa-principal.js`: nodo 7 (Museo Atarazanas) con ícono 🏛
- `guardado.js`: serializa los 3 nuevos campos de progreso
- `inventario.js`: íconos para certificadoAutenticidad y catalogoMuseo
- `la-isabela.js`, `zona-colonial.js`, `mundo-acuatico.js`, `mundo-juridico.js`: tracking de combate para finales
- `es.js`, `en.js`, `fr.js`: ~100 líneas de diálogos + finales + objetos por idioma

---

## v0.11.1 — Corrección combate + Inspector accesible (2026-03-12)

### Corregido
- **Mensajes de acción en combate desaparecían demasiado rápido**: la pausa antes del turno enemigo era de 0.8s, insuficiente para leer. Ahora es 2.5s para mensajes largos (pez león, traficante) y 1.8s para mensajes cortos (genéricos)
- **Inspector Ramírez inaccesible**: estaba dentro de la Oficina de INTERPOL (estructura con colisión), el jugador no podía entrar. Movido al frente de la oficina

---

## v0.11.0 — Mundo Jurídico: Aeropuerto de Punta Cana (2026-03-12)

### Agregado

**Mundo Jurídico — Aeropuerto de Punta Cana** (`js/mundos/juridico/mundo-juridico.js`)
- Acto 4: el mapa de naufragios revela una red de tráfico de artefactos arqueológicos
- Nivel top-down 1800x1200, interior de aeropuerto con velocidad normal
- 8 estructuras con colisión: Mostrador de Aduanas, Máquina de Rayos X, 3 Barreras de Seguridad, Carrusel de Equipaje, Puerta de Embarque, Oficina de INTERPOL
- 5 NPCs educativos:
  - Dra. Martínez: arqueóloga que alerta sobre el tráfico
  - Agente Rosa Montero: agente aduanal que explica procedimientos
  - Inspector Ramírez: inspector de aduanas con información sobre contrabando
  - Lcda. Carmen Vidal: abogada mentora con diálogo rotativo (5 temas legales)
  - Rodrigo Torres: traficante antagonista con combate legal
- Misión: hablar con los 3 NPCs principales + derrotar al traficante → completa el nodo

**Combate legal — Traficante Rodrigo Torres** (`combate.js`)
- 4 opciones legales personalizadas:
  - Ley 318: citar la ley dominicana de patrimonio cultural (1968)
  - Evidencia: presentar pruebas forenses de procedencia
  - INTERPOL: contactar la red internacional contra tráfico de arte
  - UNESCO 1970: invocar la convención contra importación ilícita
- Etiqueta personalizada: "Evidencia:" en vez de "Convencido:"
- Sprite de traficante: `_dibujarTraficante()` con diseño único
- Contra-respuestas del traficante para cada acción legal

**Lcda. Carmen Vidal — NPC mentora recurrente**
- Flag `esMentor: true` — no cuenta para completar la misión
- 5 conversaciones rotativas que ciclan con `_carmenConversacion % 5`:
  1. Presentación y marco legal dominicano
  2. Ley 318-68 de Patrimonio Cultural
  3. Convención UNESCO 1970
  4. Rol de INTERPOL en delitos contra patrimonio
  5. Procesos judiciales y repatriación de artefactos

**Objetos coleccionables** (2 nuevos)
- `registroAduanal`: registro de aduanas con evidencia de contrabando
- `ordenJudicial`: orden judicial para decomiso de artefactos
- Íconos de inventario: registro marrón (#8B4513), orden gris (#2F4F4F)

**Integración con el mapa del mundo** (`mapa-principal.js`)
- Nodo 6: "Aeropuerto de Punta Cana" (tipo jurídico)
- Conectado desde nodo 5 (Naufragio la Santa María)
- Título del mundo cambia a "Mundo Jurídico" al seleccionar nodo 6+
- Se desbloquea automáticamente al completar el Mundo Acuático

**Registro de escena** (`juego.js`)
- `MundoJuridico` importado y registrado como `'mundoJuridico'`
- Añadido a `escenasJugables` (crea jugador al entrar)
- Añadido al selector de niveles Konami: "Aeropuerto de Punta Cana (Jurídico)"

**Traducciones** (ES/FR/EN)
- Diálogos de 5 NPCs × 3 idiomas
- 5 conversaciones de Carmen Vidal × 3 idiomas
- 4 acciones de combate (nombre + mensaje + respuesta) × 3 idiomas
- 2 objetos nuevos con nombre y descripción × 3 idiomas
- Textos de misión y pistas de combate

---

## v0.10.0 — Guardado automático + combate ecológico pez león + sprites de enemigos (2026-03-12)

### Agregado

**Sistema de guardado funcional** (`juego.js`, `guardado.js`)
- `guardarPartida()`: guarda en localStorage al volver al mapa del mundo
- `cargarPartida()`: restaura estado completo desde "Continuar Juego" en el menú
- Auto-guardado automático cada vez que el jugador regresa al mapa
- Toast de confirmación: "💾 Partida guardada" / "📂 Partida cargada"
- Datos guardados: progreso del mapa (nodos completados/desbloqueados), inventario UI + jugador, compañeros (tipo + activo), vida, género, idioma, timestamp
- Compañeros restaurados como instancias reales (Magnoboot, Viralata, CemiMurcielago)
- `crearDatosGuardado()` reescrito para serializar correctamente inventario (objetos, no clase) y compañeros (tipo + estado, no instancias)

**Sprites de enemigos en combate** (`combate.js`)
- Sistema de dispatch `tipoSprite` — cada enemigo muestra su propio sprite
- `_dibujarSoldado()`: uniforme rojo oscuro con casco de conquistador (morión)
- `_dibujarConstructor()`: camisa amarilla con casco de construcción
- `_dibujarPezLeon()`: cuerpo con rayas rojas/blancas, aletas pectorales en abanico con varillas y membrana semitransparente, espinas dorsales venenosas con puntas brillantes, cola en V, ojo con banda oscura, boca

### Cambiado

**Medidor de combate renombrado**: "Paciencia" → "Convencido"
- Etiqueta personalizable por enemigo vía `etiquetaConvencimiento`
- Personas: "Convencido:" (Soldado Diego, Constructor Méndez)
- Pez León: "Controlado:" (porque es control ecológico, no convencimiento)
- Mensajes de feedback: "Convencido +X" en vez de "Paciencia +X"
- Pista genérica: "Usa Hablar o Negociar para convencer al oponente"
- Traducciones actualizadas en ES/FR/EN

**Combate ecológico del pez león rediseñado** (`mundo-acuatico.js`)
- 4 nuevas opciones realistas (reemplazando "Educar" y "Alertar Pescadores"):
  - 🥅 Atrapar: captura con red para acuario (seguro, moderado)
  - 🎣 Pescar: arpón para comer — estrategia REAL del Caribe (fuerte)
  - 🪸 Proteger Coral: barreras para peces herbívoros (defensivo, lento)
  - 🤿 Alertar Buzos: organizar jornada de remoción grupal (alto riesgo/recompensa)
- 4 contra-respuestas ecológicas del pez león:
  - vs Atrapar: eriza espinas venenosas (picadura)
  - vs Pescar: se reproduce rápidamente (más juveniles)
  - vs Proteger: devora peces herbívoros → algas invaden coral
  - vs Alertar: caza peces loro jóvenes → coral sin limpiar
- Resolución pacífica: pesca controlada, carne comestible, torneos de caza reales

**Documentación actualizada** (docs.html, docs-en.html, docs-fr.html)
- Sección de combate: "Paciencia" → "Convencimiento/Convincing/Conviction"
- Nueva sección: Combate Ecológico del Pez León con 4 opciones y contra-respuestas
- Nueva sección: Sprites de Enemigos (soldado, constructor, pez león)
- Nueva sección: Guardado Automático en mecánicas
- Mundo Acuático: NPCs actualizados de "planificados" a implementados (Manuel, Tortuga, Arqueóloga, Pez León)
- Mundo Acuático: mecánicas actualizadas de "planificadas" a implementadas

### Corregido
- Constructor Méndez ahora muestra casco de construcción en combate (no casco de conquistador)
- Versión en menú principal actualizada a v0.10

---

## v0.9.2 — Sprites detallados en selección + fix teclado (2026-03-12)

### Mejorado
- **Pantalla de selección de personaje**: sprites reescritos con el diseño detallado del juego (cabeza, cabello, ojos con pupilas, torso con ropa, brazos, piernas animadas, zapatos, sombra) escalado ×2.5, reemplazando el placeholder simple anterior
- **Animación idle en selección**: el personaje seleccionado mueve piernas y brazos suavemente con `Math.sin`

### Corregido
- **Teclado se quedaba "pegado" al abrir documentación**: al abrir `docs.html` en nueva pestaña, el foco se iba a esa pestaña y los eventos `keyup` se perdían. Ahora `Entrada` escucha `window.blur` y limpia todas las teclas presionadas al perder foco
- **Refoco automático tras documentación**: `menu-principal.js` llama `window.focus()` 100ms después de `window.open()` para que el teclado vuelva a funcionar al regresar

---

## v0.9.1 — Corrección medusa + tortuga nadadora (2026-03-12)

### Corregido
- **Juego se congelaba al tocar medusa**: `sfx.danio()` no existía → corregido a `sfx.dano()`, que es el método real de sonido de daño
- **Tortuga carey no se movía**: ahora nada en un circuito ovalado (120×60px) alrededor del arrecife de coral con `Math.cos`/`Math.sin` a velocidad lenta (0.4 rad/s)

---

## v0.9.0 — Mundo Acuático: Naufragio de la Santa María (2026-03-12)

### Agregado

**Mundo Acuático — Naufragio de la Santa María** (`js/mundos/acuatico/mundo-acuatico.js`)
- Primer nivel jugable del Mundo Acuático: exploración submarina del naufragio de la Santa María
- Nivel top-down 1600x1100 con tratamiento visual submarino completo:
  - Degradado azul profundo (`#0a1a3a` → `#1a3a5a`)
  - Fondo arenoso con textura sutil
  - 20 algas marinas animadas (balanceo con `Math.sin`)
  - 25 partículas de burbujas ascendentes
  - 4 rayos de luz diagonales desde la superficie (oscilantes)
  - Tinte de agua overlay `rgba(20, 60, 120, 0.15)`
- 6 estructuras del naufragio con colisión:
  - Casco principal de la Santa María (madera oscura con algas y agujero)
  - Fragmento del casco (con coral creciendo)
  - Mástil roto (con grietas y restos de cuerda animados)
  - Ancla de hierro oxidado (con brazos curvos y puntas)
  - Arrecife de coral (formas irregulares multicolor)
  - Canoa del pescador (cerca de la entrada)
- 4 NPCs con sprites detallados:
  - Pescador Manuel: traje de neopreno, máscara de buceo, historia de la Santa María
  - Tortuga Carey: caparazón con patrón carey, aletas, educación sobre extinción
  - Arqueóloga Submarina: escafandra, tanque de oxígeno, libreta impermeable, da mapa de naufragios
  - Pez León: rayas rojas/blancas, espinas venenosas, cola, combate ecológico
- Depth sorting de entidades (NPCs + jugador + compañeros ordenados por Y)
- Jugador con máscara de buceo + aletas + burbujitas al nadar

**Medusas — Peligros pasivos** (4 medusas)
- Movimiento sinusoidal entre waypoints
- Sprite semi-transparente: campana pulsante + tentáculos ondulantes + centro luminoso
- Contacto = 5 HP daño + 2 segundos de lentitud (velocidad × 0.4)
- 1.5 segundos de invulnerabilidad tras picadura
- Indicador visual ⚠ sobre cada medusa
- Efecto visual de lentitud: aura morada parpadeante alrededor del jugador
- Toast de notificación: "🪼 ¡Picadura de medusa! Movimiento reducido"

**Movimiento submarino**
- Velocidad base × 0.7 (sensación de nadar)
- Velocidad × 0.4 durante efecto de lentitud por medusa
- Animación de nado más lenta (0.12 vs 0.15)

**Combate ecológico — Pez León** (especie invasora)
- 4 opciones personalizadas de combate ecológico:
  - Atrapar: captura con red → eriza espinas venenosas
  - Educar: impacto de invasoras → peces loro limpian coral
  - Proteger Coral: barreras → ataca peces loro
  - Alertar Pescadores: pesca controlada → intenta huir
- Resolución pacífica: pesca controlada, carne de pez león comestible
- Pista personalizada: "Usa acciones ecológicas para controlar al invasor"

**Objetos coleccionables** (2 nuevos)
- `clavoBronce`: clavo de bronce del casco de la Santa María (aparece tras combate)
- `mapaNaufragios`: mapa de naufragios del Caribe (dado por la arqueóloga vía diálogo)
- Íconos de inventario: clavo con cabeza ancha (#B87333), mapa azulado con siluetas de barcos (#4488cc)

**Integración con el mapa del mundo** (`mapa-principal.js`)
- Nodo 5: "Naufragio la Santa María" (tipo `naufragio`, ícono ⚓)
- Conectado desde nodo 4 (Zona Colonial)
- Título del mundo cambia a "Mundo Acuático" al seleccionar nodo 5+
- Lógica de título actualizada para 3 mundos (Taíno < 3, Colonial 3-4, Acuático 5+)

**Desbloqueo automático** (`zona-colonial.js`)
- Completar la Zona Colonial desbloquea automáticamente el nodo 5

**Registro de escena** (`juego.js`)
- `MundoAcuatico` importado y registrado como `'mundoAcuatico'`
- Añadido a `escenasJugables` (crea jugador al entrar)
- Añadido al selector de niveles Konami: "Naufragio la Santa María (Acuático)"

**Traducciones** (ES/FR/EN)
- ~35 strings nuevas por idioma en `dialogos.acuatico`:
  - 4 líneas × 4 NPCs = 16 diálogos
  - Pre/post combate = 5 líneas
  - 4 acciones de combate (nombre + mensaje + respuesta) = 12 strings
  - Pista de combate, misión, medusa = 3 strings
- 2 objetos nuevos con nombre y descripción × 3 idiomas

---

## v0.8.3 — Menú Documentación + Mundo Acuático + Corrección Guanín (2026-03-12)

### Agregado

**Opción "Documentación" en el menú principal** (`menu-principal.js`)
- Nueva opción entre "Idioma" y "Opciones" que abre la documentación en una nueva pestaña
- Abre automáticamente el archivo correcto según el idioma activo: `docs.html` (ES), `docs-en.html` (EN), `docs-fr.html` (FR)
- Traducción del label en los 3 idiomas: "Documentación" / "Documentation" / "Documentation"

**Fauna marina del Mundo Acuático** (documentación, 3 idiomas)
- 5 especies amigables/educativas:
  - 4 tortugas marinas: Carey (Hawksbill), Tinglar (Leatherback), Tortuga Verde, Caguama (Loggerhead)
  - Ballenas jorobadas (migran dic-mar a Samaná)
  - Delfines nariz de botella
  - Manatí antillano (especie precolombina en peligro)
  - Pez loro (vital para arrecifes y formación de arena blanca)
- 3 amenazas/enemigos:
  - Pez león: especie invasora, encuentro de combate
  - Aguas vivas (medusas): obstáculo de esquivar con daño + lentitud
  - Saqueadores submarinos: traficantes conectados al Mundo Jurídico
- Nivel adicional: Museo de las Atarazanas Reales como destino final
- Mecánicas expandidas: corrientes marinas, fauna interactiva como guías, combate contra pez león

**Navegación responsive en documentación** (3 archivos HTML)
- Nav cambiado de `overflow-x: auto` a flexbox con `flex-wrap: wrap`
- Media query `@media (max-width: 600px)` con padding y fuente reducidos

### Corregido

**Artefacto Taíno — corrección histórica** (guanín, no oro)
- Descripción: "Un cemí dorado" → "Un cemí con detalles dorados" (y equivalentes EN/FR)
- Nueva línea de diálogo de la Dra. Martínez (`arqueologoGuanin`): explica que nunca se ha hallado un cemí completamente dorado, pero los taínos adornaban sus cemíes con guanín — una aleación de oro, plata y cobre — especialmente en los ojos y órganos sensoriales
- Traducciones en ES/FR/EN
- Documentación actualizada: NPC card de Dra. Martínez y item card del artefacto en los 3 idiomas

---

## v0.8.2 — Documentación HTML + Museo de la Catedral (2026-03-12)

### Agregado

**Página de documentación** (`docs.html`)
- Documentación completa del proyecto accesible desde el navegador
- Diseño oscuro inspirado en la estética del juego
- Secciones: Historia, Flujo del Juego, Mundos, Compañeros, Combate, Mecánicas, Controles, Tecnologías, Equipo
- Previsualizaciones de cada mundo generadas en canvas (Cuevas, Asentamiento I, II, La Isabela, Zona Colonial)
- Sprites de los 3 compañeros dibujados en canvas (Magnoboot, Viralata, Cemí Murciélago)
- Detalle de todos los NPCs con avatar, rol y descripción
- Diagrama visual del flujo de progresión del juego
- Tabla de combate con las 4 opciones de activismo ciudadano y contra-respuestas
- Lista de los 8 easter eggs del equipo
- Navegación sticky con scroll suave
- Totalmente responsive

---

## v0.8.1 — Museo de la Catedral + Fabiola Herrera (2026-03-12)

### Agregado

**Museo de la Catedral** (edificio en Zona Colonial)
- Nuevo edificio junto a la Catedral Primada: la restaurada Real Cárcel de Santo Domingo
- Sprite detallado: mampostería colonial, puerta doble con arco, 3 ventanas con rejas de hierro forjado, letrero "MUSEO" y cruz dorada
- 15 salas temáticas con tesoros del siglo XVI al XX: Sagrario, cruces pectorales, Águila Bicéfala, Coro Alto, Piedra Pentagonal

**Fabiola Herrera — NPC del Museo** (6to NPC de Zona Colonial)
- Directora del Voluntariado del Museo de la Catedral (persona real)
- Economista jubilada e innovadora que transformó el sueño del museo en realidad
- 6 líneas de diálogo: presentación, historia del edificio, tesoros del museo, su cambio de carrera, filosofía museística, objetos que hablan
- Cuenta para completar la misión (totalNPCs: 4 → 5)

**Traducciones** (ES/FR/EN)
- 6 líneas de Fabiola × 3 idiomas = 18 líneas nuevas

---

## v0.8.0 — Zona Colonial + Activismo Ciudadano + Favicon (2026-03-12)

### Agregado

**Zona Colonial de Santo Domingo** (`js/mundos/colonial/zona-colonial.js`)
- Nuevo nivel completo: la Zona Colonial, Patrimonio de la Humanidad (UNESCO 1990)
- Nivel top-down 1800x1200 con cuadrícula urbana colonial
- 6 monumentos históricos dibujados:
  - Catedral Primada de América (primera catedral del Nuevo Mundo)
  - Hospital San Nicolás de Bari (primer hospital de América, 1503)
  - Monasterio San Francisco (primero de América, hoy ruinas para conciertos)
  - Calle de las Damas (primera calle empedrada de América, 1502)
  - Panteón Nacional (antigua iglesia jesuita, hoy mausoleo de héroes)
  - Reloj de Sol (siglo XVI, pedestal de piedra con disco horario y gnomon giratorio)
- 5 NPCs educativos:
  - Constructor Méndez: antagonista con combate de activismo ciudadano
  - Dra. Pérez: arqueóloga del Museo del Hombre Dominicano
  - Don Rafael: guía turístico certificado
  - María: estudiante de arquitectura de la UASD
  - Roberto Cassá: historiador mentor con diálogos rotativos
- Zonas de excavación detectables con Magnoboot (pulso de radar revela objetos enterrados)
- Mapa de riesgo con zonas coloreadas (verde/amarillo/rojo) y bordes punteados
- Calles empedradas, árboles tropicales, colisiones con edificios
- 4 objetos coleccionables con íconos: plano colonial, moneda colonial, azulejo antiguo, llave de hierro

**Roberto Cassá — NPC mentor recurrente**
- Flag `esMentor: true` — no cuenta para completar la misión, siempre muestra [E] Hablar
- 7 conversaciones rotativas que ciclan con `_cassaConversacion % 7`:
  1. Saludo de reencuentro
  2. Comentario sobre el conflicto con el constructor
  3. Datos históricos profundos (restos de Colón, hospital, origen de Calle de las Damas)
  4. Patrimonio UNESCO y su significado
  5. Historia de la Calle de las Damas (Ovando, María de Toledo)
  6. El Reloj de Sol del siglo XVI
  7. Pista sobre el Mundo Acuático
- Toast de proximidad: "Roberto Cassá tiene mucho que contar. ¡Habla con él varias veces!"

**Guardia Presidencial del Panteón Nacional**
- 4 guardias: 2 activos montando guardia + 2 de relevo (invisibles hasta la ceremonia)
- Uniformes militares dibujados con detalle (boina, uniforme verde oliva, botas)
- Animación de piernas al marchar (misma fórmula que el jugador: `Math.sin(cuadro * 5) * 3`)
- Cambio de guardia ceremonial cada 45 segundos con 4 fases:
  1. Relevo entra marchando desde fuera de pantalla (derecha)
  2. Se detienen frente a frente ante el Panteón
  3. Intercambian posiciones
  4. Guardia saliente marcha fuera de pantalla
- Diálogo narrado: protocolo militar, historia del Panteón, la llama eterna

**Combate de activismo ciudadano** (`js/mecanicas/combate.js`)
- Sistema de opciones personalizadas por enemigo (`opcionesPersonalizadas`)
- 4 acciones de activismo contra el Constructor Méndez:
  - Redes Sociales: publicas fotos → Constructor paga influencers
  - Protestas: organizas manifestación → Constructor patrocina teteos y conciertos
  - Denunciar: reportas a autoridades → Constructor negocia excepciones con políticos
  - Vía Legal: recurso legal → Constructor dilata con maniobras jurídicas
- Cada acción tiene rangos [min, max] de paciencia y hostilidad
- Acciones más fuertes tienen contra-respuestas más fuertes (riesgo/recompensa)
- Pista personalizada: "Usa activismo ciudadano para llenar la barra de Paciencia"
- Resolución pacífica: Constructor descubre estatus UNESCO → rediseña hotel protegiendo ruinas
- Resolución por derrota: Constructor recapacita y habla con inversionistas

**Favicon y Open Graph** (`resources/`)
- Favicon generado desde el logo Cemí: `favicon.ico` (16+32px), `favicon-32.png`, `apple-touch-icon.png` (180x180)
- Imagen para redes sociales: `og-share.png` (1200x630, fondo oscuro con logo y título)
- Meta tags OG y Twitter Card en `index.html`

**Traducciones** (ES/FR/EN)
- Diálogos de Zona Colonial: constructor (pre-combate, paz x4, derrota x2, repite)
- Diálogos de Cassá: 7 conversaciones × 2-4 líneas cada una
- Diálogos de guardias: 5 líneas narradas
- 4 acciones de combate + 4 mensajes del jugador + 4 contra-respuestas del constructor
- 4 objetos nuevos con nombre y descripción (plano, moneda, azulejo, llave)
- Íconos de inventario: plano con cuadrícula, moneda con corona, azulejo decorado, llave con dientes

### Corregido
- Constructor Méndez: resolución del conflicto reescrita — no abandona el hotel, sino que lo rediseña para proteger las ruinas (más realista y educativo)
- Guardias de relevo: ahora invisibles hasta que comienza la ceremonia de cambio
- Guardias marchando: entran desde fuera de pantalla horizontalmente (no se deslizan verticalmente)
- Cassá reubicado de la Catedral a Calle de las Damas (más apropiado temáticamente)
- Versión en el menú principal actualizada de v0.1 a v0.8

---

## v0.7.0 — Mundo Colonial + Combate + Mejoras UI (2026-03-12)

### Agregado

**La Isabela — Mundo Colonial** (`js/mundos/colonial/la-isabela.js`)
- Primer nivel del Mundo Colonial: las ruinas de La Isabela (1494)
- Nivel top-down 1600x1100 con zona costera caribeña
- 5 edificios coloniales dibujados: Iglesia (ruinas con arco y cruz), Casa de Colón (con techo), Alhóndiga, Torre de Vigía (con almenas), Cementerio Colonial (con cruces)
- Caminos de piedra conectando los edificios
- Mar al fondo con olas animadas
- 14 árboles tropicales decorativos
- 3 NPCs educativos:
  - Soldado Diego: guardián que inicia combate, se pacifica mediante diplomacia
  - Fray Ramón Pané: primer cronista de las Indias, enseña sobre su obra histórica
  - Guatiguaná: líder taíno, habla sobre la resistencia y la pervivencia cultural
- Magnetómetro coleccionable: aparece solo después de resolver el encuentro con el soldado
- Misión: hablar con los 3 personajes → marca nodo completado

**Sistema de combate funcional** (`js/mecanicas/combate.js`)
- Combate estilo Undertale con ruta pacifista completamente jugable
- 5 opciones: Atacar, Hablar, Negociar, Objeto, Huir
- Medidores de Paciencia (verde, sube al dialogar) y Hostilidad (rojo, baja con diplomacia)
- Paciencia al 100% = victoria pacífica; vida del enemigo a 0 = victoria por combate
- Turno del enemigo con pausa de 0.8s para leer el mensaje de tu acción
- Mensajes de feedback por turno (ej: "Hablas con calma. Paciencia +18")
- Barra de vida del jugador con colores (verde → amarillo → rojo) y HP numérico
- Sprite del enemigo con casco de conquistador
- Pista visual: "Usa Hablar o Negociar para llenar la barra de Paciencia"
- Indicador de turno: "Tu turno" / "turno del enemigo"
- Bloqueo de entrada al iniciar para evitar capturar teclas del diálogo anterior

**Compañero Cemí Murciélago** (`js/personajes/companeros/cemi-murcielago.js`)
- Se obtiene del Behique Yuisa en el Asentamiento Taíno II
- Propiedad `tipo: 'cemiMurcielago'` para identificación
- Métodos `activar()`/`desactivar()` para el sistema de compañeros
- Verificación de duplicados (no se otorga si ya lo tienes)
- Diálogo adicional del Behique traducido a ES/FR/EN

**Habilidad especial de Magnoboot** (tecla F)
- Animación de detección de metal: pulso de radar con círculos concéntricos
- Se activa con F cuando Magnoboot está en el equipo
- Indicador `[F] Detectar Metal` en el HUD de niveles donde está activo

**Mensajes flotantes (toasts)** (`juego.js`)
- Sistema de notificaciones no intrusivas en la parte superior de la pantalla
- Aparecen al recoger cualquier objeto: "✦ Magnetómetro — añadido al inventario"
- Animación de entrada (baja desde arriba) y salida (desvanecimiento)
- Fondo oscuro redondeado con borde dorado
- Máximo 4 toasts simultáneos
- Integrado en las 4 escenas con objetos: Cuevas, Asentamiento I, Asentamiento II, La Isabela

**Selector de niveles secreto** (Konami Code)
- Secuencia secreta: ↑↑↓↓←→←→ abre un selector de niveles
- Permite saltar a cualquiera de las 8 escenas del juego
- Navegación con flechas, E para confirmar, Q para cerrar
- Funciona desde cualquier pantalla

**Navegación mejorada — tecla M para mapa**
- Nueva tecla M (mapa) para volver al mapa del mundo desde cualquier nivel
- Salir también caminando al borde inferior del nivel
- Q/Esc ya no salen de los mundos (evita salidas accidentales)
- Actualizado en: Cuevas del Pomier, Asentamiento I, Asentamiento II, La Isabela

**Traducciones** (ES/FR/EN)
- Diálogos de La Isabela: soldado (4 líneas), cronista (4), taíno (4), misiones
- Diálogo del Behique otorgando el Cemí Murciélago
- Textos de misión actualizados de (Q) a (M)

### Corregido
- **Selección de personaje se saltaba**: E todavía presionada del menú activaba confirmar inmediatamente. Ahora `bloqueoEntrada` empieza en `true`
- **Combate imposible de ganar**: paciencia al 100% no terminaba el combate porque el resultado se verificaba dentro del bloque `enCombate` (que ya era `false`). Movido fuera del bloque
- **Hablar demasiado débil en combate**: daba 2-9 paciencia por turno, ahora da 12-25
- **Daño enemigo excesivo**: reducido de `fuerza*3 + random(5)` a `fuerza*2 + random(3)`
- **Vida del jugador no visible en combate**: añadida barra de HP del jugador en el lado derecho
- **Magnetómetro inaccesible**: estaba dentro del bounding box de la iglesia; movido fuera y rediseñado como detector de metales
- **Acentos faltantes**: corregidos ~40 textos sin tildes (Arqueológica, años, taína, española, ¿Dónde estoy?, y todos los textos del mapa LeafletJS)
- Identificadores `tipo` añadidos a los 3 compañeros (magnoboot, viralata, cemiMurcielago)

---

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
