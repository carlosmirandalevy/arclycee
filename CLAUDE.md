# CLAUDE.md — Guía para Claude Code en ArcLycée

## Sobre el proyecto

ArcLycée es un RPG 2D educativo sobre el patrimonio arqueológico de la República Dominicana. Creado por les fous du robot (~13 años) del Liceo Francés de Santo Domingo. Usa HTML5 Canvas + JavaScript vanilla (ES modules, sin frameworks).

## Prioridad #1: Legibilidad

El código debe ser legible por estudiantes de 13 años. Esto significa:
- **Comentarios en español** — explicativos, no obvios
- **Variables y funciones en español** (camelCase): `velocidadJugador`, `estaPresionada`, `iniciarDialogo`
- **Comentarios extensos** al inicio de cada archivo explicando QUÉ hace y POR QUÉ existe
- Preferir código claro sobre código clever

## Arquitectura

### Motor del juego (`js/motor/`)
- `juego.js` — game loop, manejo de escenas, inventario overlay, combate overlay, batú overlay, toasts, guardado/carga
- `entrada.js` — input unificado (teclado + táctil) vía `estaPresionada(accion)`
- `configuracion.js` — constantes globales y mapeo de teclas (`TECLAS_POR_DEFECTO`)
- `renderizado.js` — wrapper de Canvas 2D
- `sonido-procedural.js` — efectos con Web Audio API
- `musica.js` — `SistemaMusica` con 16 grupos musicales (32 MP3s, 2 por escenario), crossfade 2s, override para combate/batú/duelo, volumen en localStorage
- `guardado.js` — `SistemaGuardado` con `guardarLocal()`, `cargarLocal()`, `crearDatosGuardado(juego)`

### Escenas (`js/escenas/`)
- Ciclo de vida: `iniciar(juego)`, `actualizar(dt, entrada, jugador, companeros)`, `dibujar(renderizador, ancho, alto, textos, jugador, companeros)`
- Una escena activa a la vez, se cambia con `juego.cambiarEscena('nombre')`

### Mundos (`js/mundos/`)
- Top-down (asentamientos, La Isabela, Mundo Acuático) o plataforma (cuevas)
- Los mundos top-down setean `jugador.modoJuego = 'topdown'`
- Salida: tecla M (mapa) o caminar al borde inferior — NO usar Q/Esc para salir de mundos
- Mundo Acuático (`js/mundos/acuatico/`): velocidad × 0.7 para simular nado, 4 especies de tortugas (carey, tinglar, caguama, verde) con aletas animadas, pez león patrullero (figura de 8), ballenas jorobadas como path Bezier continuo (sin artefactos de doble-alfa), medusas como peligros pasivos (daño + lentitud + sacudida 0.4s), depth-sorted rendering, rotación de nado (±75° lateral, 180° al bajar), corales fotografiables (`fotografiables[]`), sacudida del avatar al recibir daño (`_sacudida` con decaimiento)
- Santuario del Manatí (`js/mundos/acuatico/santuario-manati.js`): sub-nivel accesible desde borde derecho del Mundo Acuático, 1800×1200px, 2 acciones ecológicas (liberar manatí + limpiar arrecife), 3 tiburones patrulleros (mordida con `sfx.mordidaTiburon()` + sacudida 0.5s), zona de hélices con lanchas rápidas (speedboats cada 8-15s, -8 vida, `sfx.lanchaImpacto()` + sacudida 0.6s, toast una vez por entrada a la zona via `_heliceToastMostrado`), sistema de oxígeno (barra O₂ se agota en ~60s, recarga en superficie, -3 vida/1.5s por asfixia), 6 corales fotografiables con descripciones científicas, flags `progreso.manatiLiberado` / `progreso.arrecifeLimpiado` para evitar doble conteo, completar ambas dispara `misiones.completar('rescateManati')`. Mensajes de transición al cruzar entre Naufragio ↔ Santuario (2 toasts secuenciales)
- **Rescate del manatí como sidequest**: la primera conversación con la Dra. Sofía (bióloga marina) descubre e inicia la misión `rescateManati`. Al completar ambas acciones ecológicas (manatí + arrecife), la misión se completa automáticamente con +10 reputación por cada acción

### Compañeros (`js/personajes/companeros/`)
- Patrón: propiedad `tipo` (string), flag `activo`, métodos `activar()`/`desactivar()`
- Siguen al jugador con lerp
- Se dibujan con `ctx.save(); ctx.translate(offsetX, offsetY); companero.dibujar(ctx); ctx.restore();`
- Persisten entre escenas vía `juego.companeros[]`

### Input
- `Entrada.estaPresionada(accion)` — SIEMPRE usar este método, no acceder propiedades directas
- Patrón de bloqueo: `bloqueoEntrada = true` cuando se actúa, `= false` cuando se suelta la tecla
- `bloqueoEntrada` debe empezar en `true` al entrar a escenas donde la tecla de activación podría estar presionada
- `Entrada` escucha `window.blur` y limpia teclas presionadas al perder foco (evita teclas "pegadas" al cambiar de pestaña)

### Combate (`js/mecanicas/combate.js`)
- Estilo Undertale con ruta pacifista (convencimiento 100 = victoria pacífica)
- Se inicia desde escenas vía `juego.combate.iniciar({...})`
- Resultado se verifica FUERA del bloque `if (enCombate)` porque al terminar `enCombate` ya es false
- **Opciones personalizadas por enemigo**: `enemigo.opcionesPersonalizadas` — array de acciones con `{id, nombre, paciencia: [min, max], hostilidad: [min, max], mensaje, respuestaEnemigo}`
- Cuando hay opciones personalizadas, `_ejecutarPersonalizada()` reemplaza el switch genérico
- El turno enemigo usa `_ultimaAccion.respuestaEnemigo` para contra-respuestas específicas
- `pistaPersonalizada` en el enemigo cambia el texto de ayuda inferior
- `etiquetaConvencimiento` en el enemigo personaliza el nombre del medidor verde (ej: "Controlado:" para pez león)
- `tipoSprite` en el enemigo selecciona el sprite de combate: `'soldado'`, `'constructor'`, `'pezLeon'`, `'traficante'`
- Sprites de enemigos: `_dibujarSoldado()`, `_dibujarConstructor()`, `_dibujarPezLeon()`, `_dibujarTraficante()` — cada uno con diseño único
- **Selección de compañero**: al atacar con compañeros activos, sub-menú `_seleccionandoCompanero` muestra Solo/Magnoboot(+3)/Viralata(+2)/Cemí(+4). Q cancela. `_ejecutarAtaque(jugador, companeroTipo)` aplica bonus
- **Panel de ayuda (H)**: `_infoVisible` toggle, overlay con instrucciones de combate, rutas pacifista/agresiva, medidores. Tecla `ayuda` en `configuracion.js`
- **Indicador de estado**: muestra dinámicamente quién va ganando (casi convencido, muy hostil, progresando, tenso)
- **Barra HP enemigo oculta** para combates con `opcionesPersonalizadas` (pez león, traficante) — se ganan por convicción
- **[E] Continuar**: ambas fases (acción jugador + contraataque enemigo) muestran mensaje 2.5s y esperan E, `_esperandoContinuar` / `_esperandoContinuarEnemigo`

### Guardado (`js/motor/guardado.js`, `juego.js`)
- `juego.guardarPartida()` — guarda en localStorage, muestra toast
- `juego.cargarPartida()` — restaura estado completo, va al mapa
- Auto-guardado al volver al mapa del mundo (`cambiarEscena('mapaPrincipal')`)
- `crearDatosGuardado(juego)` serializa: escena, género, vida, progreso, inventario (objetos), compañeros (tipo+activo), idioma
- Compañeros se restauran como instancias reales vía `_crearCompaneroBasico(tipo, activo)` usando imports de Magnoboot/Viralata/CemiMurcielago

### Menú principal (`js/escenas/menu-principal.js`)
- 7 opciones: nuevoJuego, continuarJuego, idioma, mapaReal, documentacion, opciones, creditos
- `documentacion` abre `docs/index.html`, `docs/en.html` o `docs/fr.html` según `codigosIdioma[idiomaIndice]`
- Idioma se cambia con flechas horizontales cuando la opción está seleccionada
- **Hero images**: 3 imágenes hero por idioma en `resources/artes/` precargadas en `_precargarImagenesHero()`, dibujadas con viñeta oscura (gradientes en 4 bordes) sobre fondo negro
- **Logo en menú**: `resources/arclycee-logo.png` precargado junto con las hero images, mostrado en créditos (140px) y en la cinemática final (120px)
- **Créditos**: logo + 10 nombres en 3 columnas + "les fous du robot" + "Liceo Francés de Santo Domingo — 2026"

### Idiomas (`js/idiomas/`)
- 3 idiomas: `es.js`, `fr.js`, `en.js`
- Acceso: `juego.idiomas.traducciones[juego.idiomas.idiomaActual]`
- Toda string visible al jugador debe estar en los 3 archivos de idioma
- **Sección `ui`**: ~130 claves para strings de interfaz compartidas entre múltiples archivos (controles, etiquetas de acción, combate, cinemáticas, mini-juegos, créditos, nombres de personajes, toasts de inventario)
- **Patrón de acceso en mundos/escenas**: `const textos = this._obtenerTextos();` → `textos?.ui?.clave || 'fallback en español'`
- **Patrón de acceso en mecánicas**: reciben `textos` como parámetro de `dibujar()` → `textos?.ui?.clave || 'fallback'`
- **Nombres de personajes en diálogos**: usar `textos?.ui?.espirituTaina` / `textos?.ui?.petroglifo` para nombres genéricos traducibles. Los nombres propios históricos (Cacique Guacanagaríx, Fray Ramón Pané, Roberto Cassá, etc.) NO se traducen
- **Sección `lugares`**: nombres de estructuras (bohíos, edificios, salas de museo), cultivos taínos y etiquetas de lugar. Cada estructura tiene propiedad `clave` que se busca en `textos?.lugares?.[clave] || nombre`
- **Diálogos del LFSD**: la sección `lfsd` está al nivel raíz de traducciones (no dentro de `dialogos`). Acceso: `textos?.lfsd?.key`, NO `textos?.dialogos?.lfsd?.key`

### Toasts (`juego.js`)
- `juego.mostrarToast(texto, duracion)` — mensaje flotante no intrusivo
- Usar al recoger objetos, completar misiones, etc.

## Patrones importantes

- `alTerminar` callback en diálogos para encadenar eventos (ej: diálogo → combate)
- `escenasJugables` array en juego.js determina cuándo crear el jugador
- Inventario dual: `jugador.inventario` (array simple) + `juego.inventario` (UI con Inventario class). `inventario.usar(id, jugador)` maneja ítems usables (`tipo: 'curacion'` llama `jugador.curar(valor)`). Callback `inventario.alUsar` notifica a juego.js para toasts
- **Ítems curativos**: objetos con `{tipo: 'curacion', esUsable: true, valor: N}` se usan con E en inventario. Guanábana (+30), vasija curativa (+35)
- **NPC curandero**: flag `esCurandero: true` en NPC — siempre muestra `[E]`, no muestra checkmark, permite re-interacción. Behique Yuisa cura a 100 HP, Anacaona y Guarionex dan ítems curativos (re-obtibles si se usan)
- **HUD layout**: Vida bar `(10, 10, 120, 14)` + Reputación bar `(140, 10, 100, 14)` en la misma fila. En Santuario del Manatí: Vida bar + O₂ bar `(140, 10, 100, 14)` (azul, parpadea rojo al <25%). Los mundos dibujan sus indicadores (NPCs, objetos, habilidades) a partir de y=42. No agregar más barras encima de y=42
- Física: `factorTiempo = dt * 60` para movimiento independiente de framerate
- Progreso: `juego.progreso.nodosCompletados` y `nodosDesbloqueados`
- **Diálogo rotativo**: contador `_cassaConversacion` que incrementa tras cada diálogo, `indice = contador % array.length` para ciclar
- **NPC mentor**: `esMentor: true` excluye del conteo de misión, siempre muestra [E] Hablar, nunca muestra checkmark
- **Animación de marcha**: `cuadroAnimacion` + `esAnimando` flag, piernas con `Math.sin(cuadro * 5) * 3`
- **Guardias invisibles**: `if (!guardia.activo && !this._cambioEnCurso) return` al inicio de `_dibujarGuardia()`
- **Medusas pasivas**: movimiento sinusoidal entre waypoints, contacto = daño + `efectoLentitud` (segundos) + sacudida 0.4s, cooldown con `invulnerabilidad`
- **Sacudida del avatar** (`_sacudida`): timer que decrementa con dt, mientras > 0 el sprite oscila lateralmente con `Math.sin(tiempoTotal * 50) * amplitud * intensidad`. Usado en lanchas (0.6s), tiburones (0.5s) y medusas (0.4s)
- **Depth sorting**: entidades se ordenan por Y antes de dibujar para efecto de profundidad (usado en Mundo Acuático)
- **Corales realistas**: coral cerebro con gradiente 3D + surcos meándricos multi-Bezier clipeados; coral abanico (gorgonia) con tallo leñoso, gradiente radial, venas ramificadas con sub-venas y malla de arcos concéntricos
- **Sprites en selección de personaje**: `_dibujarPersonaje()` usa el sprite detallado del juego escalado ×2.5 (no placeholders simples)
- **Combate pez león**: 4 opciones ecológicas (atrapar, pescar, proteger coral, alertar buzos) con contra-respuestas realistas
- **Palenque de Lemba** (`js/mundos/montana/mundo-montana.js`): montaña interior, comunidad cimarrona de Sebastián Lemba (~1540s). 5 NPCs (Lemba mentor rotativo, Kofi herrero da Machete Cimarrón +2 daño, Amara tamborera da Tambor de Guerra +2 daño, Yemayá curandera, Marcos vigía con combate). Chozas africanas circulares, atalaya, hoguera, pinos. Nodo 9 entre Taíno I y II. `progreso.artefactosAfricanos` para bonus de ataque
- **Lago Enriquillo** (`js/mundos/enriquillo/lago-enriquillo.js`): lago hipersalino 40m bajo el nivel del mar con Isla Cabritos (Guarizacca). Ecosistema: 5 Cocodrilos Americanos (Crocodylus acutus, death roll + sonido), 7 iguanas (Cyclura cornuta con cuernos + Cyclura ricordii con ojos rojos), 9 flamencos rosados (una pata), 3 cucús/burrowing owls (madrigueras), 3 culebras corredoras (Haitiophis anomalus, 2m), Las Caritas (7 petroglifos). Enriquillo (6 diálogos: rebelión 1519-1533, amor con Mencía), Mencía, Tamayo. Natación con rotación diagonal. Toast educativo por especie. Nodo 10
- **Mundo Jurídico** (`js/mundos/juridico/`): Aeropuerto de Punta Cana interior, velocidad normal, combate legal con opciones de Ley 318/Evidencia/INTERPOL/UNESCO, mentora con diálogo rotativo (5 temas legales)
- **Combate traficante**: 4 opciones legales (Ley 318, evidencia forense, INTERPOL, UNESCO 1970), etiqueta "Evidencia:" en vez de "Convencido:"
- **Arresto cinematográfico**: tras derrotar a Torres, Miguel Sánchez y Agente Montero caminan hacia él, lo arrestan con diálogo, y lo escoltan fuera. State machine: `esperando→caminando→dialogo→escoltando→completado`. Torres se oculta tras `_torresSacado = true`
- **Manantial de la Aleta** (`js/mundos/aleta/`): cenote sagrado taíno en Parque Nacional Cotubanamá. 3 fases: rapel por pozo vertical (overlay `rappel.js`), cueva oscura con linterna (`cueva-oscura.js`, máscara radial `destination-in`), buceo en cenote (`cenote-buceo.js`, O₂ 120s, corrientes, 3 artefactos). Hub `manantial-aleta.js` gestiona fases y prerequisito (`equipoBuceoObtenido`). Nodo 12. Fase guardada en `progreso.mundos.manantialAleta`
- **Museo del Hombre Dominicano** (`js/mundos/museo/museo-hombre.js`): interior de museo con vitrinas, suelo de mármol. Dr. Veloz (curador, recibe artefactos, completa sidequest `ofrendasAleta` +20 rep), Dra. Conrad (Indiana University, contexto científico), 2 visitantes educativos. Nodo 13, desbloqueado al recoger 3 artefactos del cenote
- **Mundo Laboratorio** (`js/mundos/laboratorio/`): museo interior, velocidad normal, sin combate — educación por cadenas de diálogo, 5 NPCs (3 cuentan para misión + 1 mentor + 1 sospechoso), 2 coleccionables con requisitos. NPCs deben estar FUERA de las estructuras con colisión (no adentro, o el jugador no puede alcanzarlos)
- **Mapa con tiles** (`js/mundos/mapa-tiles.js`): la costa de Hispaniola se define con `ISLA_BITMAP`, un array de 68 strings de 128 chars ('1'=tierra, '0'=agua) escalado 2× desde el bitmap original trazado de `resources/hispaniola-map-pixelated-tiled.png`. `_esTierra()` hace lookup directo en el bitmap. Montañas vía `_distanciaACordilleras()` (8 cadenas en `CORDILLERAS`), lagos con `_esLago()` (`LAGOS` array, 2 lagos), ríos con Bresenham (5 ríos), bosques con hash pseudo-aleatorio. 128×68 tiles. `generarMapaIsla()` devuelve array 2D, `dibujarTilesVisibles()` con culling, `esCaminable()` para colisión. Nodos en `obtenerNodosIsla()` con `tileX/tileY`. **Importante**: al posicionar nodos, verificar que tanto el tile del nodo como el tile +1 fila abajo (spawn point) sean caminables. Posiciones trazadas desde `resources/hispaniola-plain-topographic-map-nasa.jpg` y `resources/hispaniola-map-pixelated-tiled.png`
- **Touch/drag en mapa** (`js/mundos/mapa-principal.js`): touch drag (1 dedo), pinch zoom (2 dedos), mouse drag (desktop). Variables `_arrastrando`/`_ratonArrastrando` desactivan el camera lerp durante el arrastre
- **Sistema de clima** (`js/clima/`): `SistemaClima` en `clima.js` + `SistemaHuracan` en `huracan.js`, instanciado en `juego.js`, activado solo en escenas exteriores vía mapa `climaPorEscena` en `cambiarEscena()`. `dibujar()` recibe `ctx` raw (no Renderizador). Sonido ambiental: `_actualizarSonido()` inicia/detiene lluvia procedural (`sfx.lluviaAmbiente()`) y dispara truenos (`sfx.trueno()`) según el clima. `detenerSonidos()` se llama al desactivar clima en `cambiarEscena()`
- **Álbum de fotos** (`js/mecanicas/album-fotos.js`): fotos cuadradas (160×160) y selfies verticales (160×200) con fondo oscuro neutro. `_renderizarEntidadCentrada()` despacha según `tipoEntidad`: `'tortuga'` → `_renderizarTortuga()` (sprite dedicado por especie), `'coral'` → `_renderizarCoral()` (sprite dedicado por tipo: cerebro/cuerno/abanico/mesa), `'npc'` → `_renderizarNPCCentrado()` (canvas aux 200×200 con bounding box scan), `'petroglifo'` → piedra con símbolo, `'objeto'` → caja dorada. NPCs con id `tortuga*` se detectan como `tipoEntidad: 'tortuga'` automáticamente. Escenas exponen `fotografiables[]` para elementos extra (corales, arrecifes). Se activa con T (foto) y G (selfie), álbum con P
- **Misiones secundarias** (`js/mecanicas/misiones-secundarias.js`): 8 quests (batú, rescateManati, buenasVibraciones, metalCompleto, cienciaLoca, museoCatedral, idoloEnriquillo, ofrendasAleta) con estados `no_descubierta`→`descubierta`→`en_progreso`→`completada`. Se descubren hablando con NPCs en mundos existentes. `ofrendasAleta` se descubre al recoger 3 artefactos del cenote
- **LFSD** (`js/mundos/lfsd/mundo-lfsd.js`): nivel interior de la clase de robótica, Prof. Nicolas Droulers (pelo y barba blanca, mentor con diálogo rotativo) y 10 NPCs estudiantes (3 quest-givers con camisetas de color), 3 mesas con pantallas Scratch (IDE con paleta de categorías y bloques de código), mesa FIRST LEGO League (tapete con caminos negros/blancos, zonas de misión, robot LEGO animado con orugas que recorre los paths con zumbido de motor continuo `robotFLLIniciar()`/`robotFLLDetener()`), impresora 3D con etiqueta traducida, pizarra. Se desbloquea al descubrir cualquier sidequest que lo mencione (buenasVibraciones, metalCompleto, cienciaLoca) — no requiere completar Mundo Laboratorio. Avatares personalizados: Diana (rubia, piel clara, delgada), Carlos Guillermo (pelo largo castaño, gafas azul oscuro, camiseta azul, pantalones naranjas), Rafael (piel clara, pelo castaño claro, delgado). `salir()` detiene sonidos continuos del robot
- **Contador de regalos**: `🎁 recibidos/total` en HUD (y=74) en 5 mundos. Muestra ítems y compañeros recibidos de NPCs. Se vuelve verde al completar
- **Múltiples finales** (`js/escenas/final-cinematica.js`): 5 finales (completo, pacifista, museo, ecológico, oscuro) determinados por `progreso.combatesPacificados`, `combatesViolentos`, `accionesEcologicas`, `nodosCompletados.length` y `misiones.contarCompletadas()`. Completo requiere 8+ nodos + 5 sidequests + todos pacificados. Pacifista requiere 8+ nodos + todos pacificados
- **Tracking de combate**: cada mundo con combate incrementa `combatesPacificados` o `combatesViolentos` al terminar, Acuático también incrementa `accionesEcologicas`
- **Reputación en combate**: victoria pacífica = +15 reputación, victoria por fuerza = +5. Aplicado en los 4 mundos con combate (La Isabela, Zona Colonial, Mundo Acuático, Aeropuerto)
- **Controles táctiles duales**: `entrada.modoControlTactil` = `'joystick'` o `'dpad'`, cambiable desde Opciones con `cambiarModoTactil(modo)`, preferencia en localStorage `arclycee_control_tactil`
- **Boss fight: Espíritu del Cemí** (`js/mecanicas/boss-cemi.js`): bullet hell secreto en Isla Cabritos. 4 patrones (espiral, anillo, onda, dirigido), 5 corazones, 3 ciclos (1.0×→1.3×→1.6×, doble patrón en ciclo 3). Espada de Enriquillo. Victoria: Bendición Divina (+30 vida, +5 fuerza, +20% velocidad). Derrota: despertar como sueño. Pedestal oculto detrás de arbusto, visible tras entregar ídolo
- **Mapa de referencia Leaflet** (`js/mapas/`): `mapa-leaflet.js` orquesta módulos en `referencia/` (capas, marcadores, transiciones). Se abre con R desde cualquier escena jugable. Stadia Maps API key en `capas.js` línea 18 (dominio registrado: `arc.cemi.ai`). 6 capas de datos toggleables: 🗿 Taínos (16 sitios), 🏰 Coloniales (8 sitios), ⚓ Naufragios (12 pecios), 🏛 Museos (30 museos RD+Haití), 🔍 Inexplorados (8, tras robot), 🔬 Potencial Arqueológico (15 sitios investigados). Marcadores con DivIcon coloreados por estado. `window._viajarANodo(id)` para click-to-travel. Totalmente trilingüe
- **Duelo de espadas** (`js/mecanicas/duelo-espada.js`): mini-juego de esgrima lateral contra Soldado Diego en La Isabela. Overlay como batú/combate. Dos modos: 'agresivo' (derrotar bajando HP) y 'pacifista' (diálogos amistosos suben convicción a 100). Posturas realistas: en garde (idle), estocada/lunge (E, cuerpo avanza con `lungeOffset`), bloqueo (Q, espada vertical), esquive (↓, arquear espalda hacia atrás). Parry si se bloquea en los primeros 0.2s del golpe enemigo → Diego aturdido 1s. Diego IA: acercarse, atacar alto (60%) o bajo (40%), retroceder. Toast "¡En garde!" al inicio, "¡Parry!" al conseguirlo. Opciones de diálogo horizontal (←→) antes del duelo: Atacar/Hablar/Negociar/Huir. Huir = pacifista sin pelea. Música propia: grupo 'duelo' (Blades of La Isabela, 2 MP3s). `juego.dueloEspada.iniciar({modo, juego, alTerminar})`. Resultado se procesa en `la-isabela.js._procesarResultadoDuelo()`
- **Batú mini-juego** (`js/mecanicas/batu.js`): juego de pelota taíno como overlay. Física 2D con gravedad, rebotes y tipos de golpe según altura (cadera/hombro/cabeza/rodilla). IA con 72% velocidad, 15% errores intencionales. Se inicia desde `asentamiento-taino-1.js` al aceptar el desafío del Cacique Guacanagaríx. Al ganar, el cacique entrega su corona (accesorio permanente, `progreso.coronaCacique`). `juego.batu.iniciar({historia, alTerminar})`. Primero en 5 puntos gana
- **Areíto DDR** (`js/mecanicas/areito.js`): danza ceremonial taína estilo Dance Dance Revolution / Friday Night Funkin. 4 carriles de flechas (← ↓ ↑ →), notas suben hacia zona de acierto. 3 fases de dificultad (lenta → media → intensa, 60s). Puntuación: Perfecto/Bien/Fallo con combo multiplicador ×4. Ranking S/A/B/C/D. Se inicia con Higüemota en `asentamiento-taino-2.js`. Visual: batey nocturno con antorchas animadas y danzarines silueta. `juego.areito.iniciar({alTerminar, juego})`
- **Rapel** (`js/mecanicas/rappel.js`): mini-juego de descenso por pozo vertical del cenote. Flechas de dirección suben por pantalla, jugador presiona la correcta en la zona dulce. Medidor de agarre (100 puntos, -12/-25 por fallo). 35 prompts con dificultad progresiva (1.0 → 0.45s intervalo). Visual: pozo oscuro con cuerda, personaje con casco. `juego.rappel.iniciar({alTerminar, juego})`
- **Opciones de diálogo**: las líneas de diálogo pueden tener `opciones: [{texto, valor}]`. `avanzar()` bloquea en opciones. `seleccionarOpcion(±1)` para navegar, `confirmarOpcion()` para elegir. Layout horizontal (←→) o vertical (↑↓) según el mundo. Usado en oferta de batú, duelo de espadas, etc.
- **Registro de juego** (`js/mecanicas/registro-juego.js`): Game Log con tecla L. Pestaña "Historia Principal" muestra los 9 nodos del mundo con estado (✅/🔓/🔒) desde `juego.progreso`. Pestaña "Secundaria" muestra sidequests. Constructor recibe `juego` para acceder al progreso
- **Créditos cinematográficos**: fase `_enCreditos` en `final-cinematica.js`, scroll vertical automático (`_creditosY -= velocidad * dt`), flechas arriba/abajo para scroll manual sin interrumpir el auto-scroll, E para acelerar/saltar, "les fous du robot" bajo "Creado por", lista de 10 creadores + Lycée Français + año 2026. `bloqueoEntrada = true` en `menuPrincipal.iniciar()` evita que E residual active Nuevo Juego. `_yaTermino` flag previene llamadas múltiples a `_irAlMenu()`
- **Documentación técnica** (`docs/technical.html`, `technical-en.html`, `technical-fr.html`): 22 secciones cubriendo toda la arquitectura del código (game loop, input, renderizado, 57 sonidos, combate, diálogos, compañeros, inventario, álbum, mapa tiles, mapa mundo, acuático, clima, mini-juegos, reputación, guardado, Leaflet, finales, i18n, jugador, config). Cada referencia a un archivo .js es clicable gracias a `source-viewer.js`
- **Visor de código fuente** (`docs/source-viewer.js`): auto-convierte `<code>js/...</code>` en enlaces clicables que abren un modal con syntax highlighting (regex-based: keywords, strings, comments, numbers, functions). GitHub Dark theme. Inyecta sus propios estilos CSS
- **Diagramas técnicos** (`docs/tech-diagrams.js`): 10 SVGs generados programáticamente con i18n (ES/EN/FR). Detecta idioma vía `<html lang>`. Insertados automáticamente tras headings en las secciones correspondientes de la documentación técnica
- **Previews de mundos** (`docs/world-previews.js`): Canvas 2D renders animados de los 9 mundos del juego. IIFE con 10 funciones renderer, matching multilingüe por título de sección, IntersectionObserver para eficiencia. Se incluye en `worlds*.html`
- **Logo y branding**: `resources/arclycee-logo.png` (fondo transparente) usado en menú principal, créditos, cinemática final, navegación docs y footer docs. `navigation.js` inyecta logo en nav bar (28px) y footer (48px) dinámicamente vía DOM
- **Hero banners en docs**: cada página principal (`index.html`, `en.html`, `fr.html`) muestra la hero image del idioma correspondiente con clase `.hero-banner` (full-width, border-radius inferior)

## Qué NO hacer

- No usar frameworks ni librerías (excepto LeafletJS para mapas)
- No escribir código sin comentarios en español
- No usar Q/Esc para salir de mundos (solo M o borde inferior)
- No crear archivos de documentación sin que se pida
- No usar `entrada.izquierda` — siempre `entrada.estaPresionada('izquierda')`
- No llamar "cemí dorado" al artefacto taíno — históricamente los cemíes tenían detalles de guanín (aleación oro/plata/cobre), no eran de oro puro
