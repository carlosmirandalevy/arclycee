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
- `guardado.js` — `SistemaGuardado` con `guardarLocal()`, `cargarLocal()`, `crearDatosGuardado(juego)`

### Escenas (`js/escenas/`)
- Ciclo de vida: `iniciar(juego)`, `actualizar(dt, entrada, jugador, companeros)`, `dibujar(renderizador, ancho, alto, textos, jugador, companeros)`
- Una escena activa a la vez, se cambia con `juego.cambiarEscena('nombre')`

### Mundos (`js/mundos/`)
- Top-down (asentamientos, La Isabela, Mundo Acuático) o plataforma (cuevas)
- Los mundos top-down setean `jugador.modoJuego = 'topdown'`
- Salida: tecla M (mapa) o caminar al borde inferior — NO usar Q/Esc para salir de mundos
- Mundo Acuático (`js/mundos/acuatico/`): velocidad × 0.7 para simular nado, medusas como peligros pasivos (daño + lentitud), depth-sorted rendering
- Santuario del Manatí (`js/mundos/acuatico/santuario-manati.js`): sub-nivel accesible desde borde derecho del Mundo Acuático, 1800×1200px, 2 acciones ecológicas (liberar manatí + limpiar arrecife), 3 tiburones patrulleros, zona de hélices, flags `progreso.manatiLiberado` / `progreso.arrecifeLimpiado` para evitar doble conteo, completar ambas dispara `misiones.completar('rescateManati')`
- **Rescate del manatí como sidequest**: la primera conversación con Dra. Sofía descubre e inicia la misión `rescateManati`. Al completar ambas acciones ecológicas (manatí + arrecife), la misión se completa automáticamente con +10 reputación por cada acción

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

### Idiomas (`js/idiomas/`)
- 3 idiomas: `es.js`, `fr.js`, `en.js`
- Acceso: `juego.idiomas.traducciones[juego.idiomas.idiomaActual]`
- Toda string visible al jugador debe estar en los 3 archivos de idioma

### Toasts (`juego.js`)
- `juego.mostrarToast(texto, duracion)` — mensaje flotante no intrusivo
- Usar al recoger objetos, completar misiones, etc.

## Patrones importantes

- `alTerminar` callback en diálogos para encadenar eventos (ej: diálogo → combate)
- `escenasJugables` array en juego.js determina cuándo crear el jugador
- Inventario dual: `jugador.inventario` (array simple) + `juego.inventario` (UI con Inventario class). `inventario.usar(id, jugador)` maneja ítems usables (`tipo: 'curacion'` llama `jugador.curar(valor)`). Callback `inventario.alUsar` notifica a juego.js para toasts
- **Ítems curativos**: objetos con `{tipo: 'curacion', esUsable: true, valor: N}` se usan con E en inventario. Guanábana (+30), vasija curativa (+35)
- **NPC curandero**: flag `esCurandero: true` en NPC — siempre muestra `[E]`, no muestra checkmark, permite re-interacción. Behique Yuisa cura a 100 HP, Anacaona y Guarionex dan ítems curativos (re-obtibles si se usan)
- **HUD layout**: Vida bar `(10, 10, 120, 14)` + Reputación bar `(140, 10, 100, 14)` en la misma fila. Los mundos dibujan sus indicadores (NPCs, objetos, habilidades) a partir de y=42. No agregar más barras encima de y=42
- Física: `factorTiempo = dt * 60` para movimiento independiente de framerate
- Progreso: `juego.progreso.nodosCompletados` y `nodosDesbloqueados`
- **Diálogo rotativo**: contador `_cassaConversacion` que incrementa tras cada diálogo, `indice = contador % array.length` para ciclar
- **NPC mentor**: `esMentor: true` excluye del conteo de misión, siempre muestra [E] Hablar, nunca muestra checkmark
- **Animación de marcha**: `cuadroAnimacion` + `esAnimando` flag, piernas con `Math.sin(cuadro * 5) * 3`
- **Guardias invisibles**: `if (!guardia.activo && !this._cambioEnCurso) return` al inicio de `_dibujarGuardia()`
- **Medusas pasivas**: movimiento sinusoidal entre waypoints, contacto = daño + `efectoLentitud` (segundos), cooldown con `invulnerabilidad`
- **Depth sorting**: entidades se ordenan por Y antes de dibujar para efecto de profundidad (usado en Mundo Acuático)
- **Sprites en selección de personaje**: `_dibujarPersonaje()` usa el sprite detallado del juego escalado ×2.5 (no placeholders simples)
- **Combate pez león**: 4 opciones ecológicas (atrapar, pescar, proteger coral, alertar buzos) con contra-respuestas realistas
- **Mundo Jurídico** (`js/mundos/juridico/`): Aeropuerto de Punta Cana interior, velocidad normal, combate legal con opciones de Ley 318/Evidencia/INTERPOL/UNESCO, mentora con diálogo rotativo (5 temas legales)
- **Combate traficante**: 4 opciones legales (Ley 318, evidencia forense, INTERPOL, UNESCO 1970), etiqueta "Evidencia:" en vez de "Convencido:"
- **Arresto cinematográfico**: tras derrotar a Torres, Inspector Ramírez y Agente Montero caminan hacia él, lo arrestan con diálogo, y lo escoltan fuera. State machine: `esperando→caminando→dialogo→escoltando→completado`. Torres se oculta tras `_torresSacado = true`
- **Mundo Laboratorio** (`js/mundos/laboratorio/`): museo interior, velocidad normal, sin combate — educación por cadenas de diálogo, 5 NPCs (3 cuentan para misión + 1 mentor + 1 sospechoso), 2 coleccionables con requisitos. NPCs deben estar FUERA de las estructuras con colisión (no adentro, o el jugador no puede alcanzarlos)
- **Mapa con tiles** (`js/mundos/mapa-tiles.js`): la costa de Hispaniola se define con `ISLA_BITMAP`, un array de 68 strings de 128 chars ('1'=tierra, '0'=agua) escalado 2× desde el bitmap original trazado de `resources/hispaniola-map-pixelated-tiled.png`. `_esTierra()` hace lookup directo en el bitmap. Montañas vía `_distanciaACordilleras()` (8 cadenas en `CORDILLERAS`), lagos con `_esLago()` (`LAGOS` array, 2 lagos), ríos con Bresenham (5 ríos), bosques con hash pseudo-aleatorio. 128×68 tiles. `generarMapaIsla()` devuelve array 2D, `dibujarTilesVisibles()` con culling, `esCaminable()` para colisión. Nodos en `obtenerNodosIsla()` con `tileX/tileY`. **Importante**: al posicionar nodos, verificar que tanto el tile del nodo como el tile +1 fila abajo (spawn point) sean caminables. Posiciones trazadas desde `resources/hispaniola-plain-topographic-map-nasa.jpg` y `resources/hispaniola-map-pixelated-tiled.png`
- **Touch/drag en mapa** (`js/mundos/mapa-principal.js`): touch drag (1 dedo), pinch zoom (2 dedos), mouse drag (desktop). Variables `_arrastrando`/`_ratonArrastrando` desactivan el camera lerp durante el arrastre
- **Sistema de clima** (`js/clima/`): `SistemaClima` en `clima.js` + `SistemaHuracan` en `huracan.js`, instanciado en `juego.js`, activado solo en escenas exteriores vía mapa `climaPorEscena` en `cambiarEscena()`. `dibujar()` recibe `ctx` raw (no Renderizador). Sonido ambiental: `_actualizarSonido()` inicia/detiene lluvia procedural (`sfx.lluviaAmbiente()`) y dispara truenos (`sfx.trueno()`) según el clima. `detenerSonidos()` se llama al desactivar clima en `cambiarEscena()`
- **Álbum de fotos** (`js/mecanicas/album-fotos.js`): fotos cuadradas (160×160) y selfies verticales (160×200) con fondo oscuro neutro. `_renderizarNPCCentrado()` dibuja el sprite en un canvas auxiliar 200×200, escanea pixel data para detectar bounding box, y dibuja el sprite recortado+centrado en el canvas final. `_renderizarEntidadCentrada()` despacha a NPC/petroglifo/objeto. `_dibujarNPCGenerico()` es el fallback cuando la escena no tiene `_dibujarNPC()`. Selfies: entidad a la izquierda + jugador a la derecha. Se activa con T (foto) y G (selfie), álbum con P. Nota: `cuevas-pomier.js` expone `this.npcs = [this.arqueologa]` y `_dibujarNPC()` para que el sistema de fotos pueda renderizar la arqueóloga
- **Misiones secundarias** (`js/mecanicas/misiones-secundarias.js`): 5 quests (batú, rescateManati, buenasVibraciones, metalCompleto, cienciaLoca) con estados `no_descubierta`→`descubierta`→`en_progreso`→`completada`. Se descubren hablando con NPCs en mundos existentes
- **LFSD** (`js/mundos/lfsd/mundo-lfsd.js`): nivel interior de la clase de robótica, Prof. Nicolas Droulers (mentor con diálogo rotativo) y 8 NPCs estudiantes (3 quest-givers con camisetas de color), 4 estaciones de trabajo, pizarra, impresora 3D. Se desbloquea al descubrir cualquier sidequest que lo mencione (buenasVibraciones, metalCompleto, cienciaLoca) — no requiere completar Mundo Laboratorio
- **Contador de regalos**: `🎁 recibidos/total` en HUD (y=74) en 5 mundos. Muestra ítems y compañeros recibidos de NPCs. Se vuelve verde al completar
- **Múltiples finales** (`js/escenas/final-cinematica.js`): 5 finales (completo, pacifista, museo, ecológico, oscuro) determinados por `progreso.combatesPacificados`, `combatesViolentos`, `accionesEcologicas`, `nodosCompletados.length` y `misiones.contarCompletadas()`. Completo requiere 8+ nodos + 5 sidequests + todos pacificados. Pacifista requiere 8+ nodos + todos pacificados
- **Tracking de combate**: cada mundo con combate incrementa `combatesPacificados` o `combatesViolentos` al terminar, Acuático también incrementa `accionesEcologicas`
- **Reputación en combate**: victoria pacífica = +15 reputación, victoria por fuerza = +5. Aplicado en los 4 mundos con combate (La Isabela, Zona Colonial, Mundo Acuático, Aeropuerto)
- **Controles táctiles duales**: `entrada.modoControlTactil` = `'joystick'` o `'dpad'`, cambiable desde Opciones con `cambiarModoTactil(modo)`, preferencia en localStorage `arclycee_control_tactil`
- **Mapa de referencia Leaflet** (`js/mapas/`): `mapa-leaflet.js` orquesta módulos en `referencia/` (capas, marcadores, transiciones). Se abre con R desde `mapaPrincipal`. Stadia Maps API key en `capas.js` línea 18 (dominio registrado: `arc.cemi.ai`). 4 capas de datos toggleables: 🗿 Taínos (16 sitios), 🏰 Coloniales (8 sitios), ⚓ Naufragios (12 pecios), 🏛 Museos (30 museos RD+Haití). Marcadores con DivIcon coloreados por estado. `window._viajarANodo(id)` para click-to-travel
- **Batú mini-juego** (`js/mecanicas/batu.js`): juego de pelota taíno como overlay (patrón idéntico al combate). Física 2D con gravedad, rebotes y tipos de golpe según altura (cadera/hombro/cabeza/rodilla). IA con 72% velocidad, 30% errores intencionales, retardo de reacción 0.3s. Se inicia desde `asentamiento-taino-2.js` al aceptar la sidequest de Higüemota. `juego.batu.iniciar({historia, alTerminar})`. Datos educativos entre puntos. Primero en 3 puntos gana. Sonidos: `batuGolpe`, `batuRebote`, `batuPunto`, `batuSaque`, `batuMultitud`
- **Opciones de diálogo**: las líneas de diálogo pueden tener `opciones: [{texto, valor}]`. `avanzar()` bloquea en opciones. `seleccionarOpcion(±1)` para navegar ↑↓, `confirmarOpcion()` para elegir. Usado en oferta de batú, etc.
- **Registro de juego** (`js/mecanicas/registro-juego.js`): Game Log con tecla L. Pestaña "Historia Principal" muestra los 9 nodos del mundo con estado (✅/🔓/🔒) desde `juego.progreso`. Pestaña "Secundaria" muestra sidequests. Constructor recibe `juego` para acceder al progreso
- **Créditos cinematográficos**: fase `_enCreditos` en `final-cinematica.js`, scroll vertical automático (`_creditosY -= velocidad * dt`), E para acelerar/saltar, lista de 8 creadores + Lycée Français + año 2026

## Qué NO hacer

- No usar frameworks ni librerías (excepto LeafletJS para mapas)
- No escribir código sin comentarios en español
- No usar Q/Esc para salir de mundos (solo M o borde inferior)
- No crear archivos de documentación sin que se pida
- No usar `entrada.izquierda` — siempre `entrada.estaPresionada('izquierda')`
- No llamar "cemí dorado" al artefacto taíno — históricamente los cemíes tenían detalles de guanín (aleación oro/plata/cobre), no eran de oro puro
