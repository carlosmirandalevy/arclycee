# CLAUDE.md — Guía para Claude Code en ArcLycée

## Sobre el proyecto

ArcLycée es un RPG 2D educativo sobre el patrimonio arqueológico de la República Dominicana. Creado por 8 estudiantes (~13 años) del Liceo Francés de Santo Domingo. Usa HTML5 Canvas + JavaScript vanilla (ES modules, sin frameworks).

## Prioridad #1: Legibilidad

El código debe ser legible por estudiantes de 13 años. Esto significa:
- **Comentarios en español** — explicativos, no obvios
- **Variables y funciones en español** (camelCase): `velocidadJugador`, `estaPresionada`, `iniciarDialogo`
- **Comentarios extensos** al inicio de cada archivo explicando QUÉ hace y POR QUÉ existe
- Preferir código claro sobre código clever

## Arquitectura

### Motor del juego (`js/motor/`)
- `juego.js` — game loop, manejo de escenas, inventario overlay, combate overlay, toasts, guardado/carga
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
- `documentacion` abre `docs.html`, `docs-en.html` o `docs-fr.html` según `codigosIdioma[idiomaIndice]`
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
- Inventario dual: `jugador.inventario` (array simple) + `juego.inventario` (UI con Inventario class)
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
- **Mundo Laboratorio** (`js/mundos/laboratorio/`): museo interior, velocidad normal, sin combate — educación por cadenas de diálogo, 5 NPCs (3 cuentan para misión + 1 mentor + 1 sospechoso), 2 coleccionables con requisitos. NPCs deben estar FUERA de las estructuras con colisión (no adentro, o el jugador no puede alcanzarlos)
- **Mapa con tiles** (`js/mundos/mapa-tiles.js`): genera la isla de Hispaniola con elipses para la costa, bahías que recortan tierra, Cordillera Central, ríos con Bresenham, bosques con hash pseudo-aleatorio. 48×30 tiles. `generarMapaIsla()` devuelve array 2D, `dibujarTilesVisibles()` con culling, `esCaminable()` para colisión. Nodos en `obtenerNodosIsla()` con `tileX/tileY`
- **Sistema de clima** (`js/clima/`): `SistemaClima` en `clima.js` + `SistemaHuracan` en `huracan.js`, instanciado en `juego.js`, activado solo en escenas exteriores vía mapa `climaPorEscena` en `cambiarEscena()`. `dibujar()` recibe `ctx` raw (no Renderizador)
- **Múltiples finales** (`js/escenas/final-cinematica.js`): 4 finales (completo, museo, ecológico, oscuro) determinados por `progreso.combatesPacificados`, `combatesViolentos`, `accionesEcologicas` y `nodosCompletados.length`
- **Tracking de combate**: cada mundo con combate incrementa `combatesPacificados` o `combatesViolentos` al terminar, Acuático también incrementa `accionesEcologicas`
- **Controles táctiles duales**: `entrada.modoControlTactil` = `'joystick'` o `'dpad'`, cambiable desde Opciones con `cambiarModoTactil(modo)`, preferencia en localStorage `arclycee_control_tactil`
- **Mapa de referencia Leaflet** (`js/mapas/`): `mapa-leaflet.js` orquesta módulos en `referencia/` (capas, marcadores, transiciones). Se abre con R desde `mapaPrincipal`. Stadia Maps API key en `capas.js` línea 18 (dominio registrado: `arc.cemi.ai`). 4 capas de datos toggleables: 🗿 Taínos (16 sitios), 🏰 Coloniales (8 sitios), ⚓ Naufragios (12 pecios), 🏛 Museos (30 museos RD+Haití). Marcadores con DivIcon coloreados por estado. `window._viajarANodo(id)` para click-to-travel
- **Créditos cinematográficos**: fase `_enCreditos` en `final-cinematica.js`, scroll vertical automático (`_creditosY -= velocidad * dt`), E para acelerar/saltar, lista de 8 creadores + Lycée Français + año 2026

## Qué NO hacer

- No usar frameworks ni librerías (excepto LeafletJS para mapas)
- No escribir código sin comentarios en español
- No usar Q/Esc para salir de mundos (solo M o borde inferior)
- No crear archivos de documentación sin que se pida
- No usar `entrada.izquierda` — siempre `entrada.estaPresionada('izquierda')`
- No llamar "cemí dorado" al artefacto taíno — históricamente los cemíes tenían detalles de guanín (aleación oro/plata/cobre), no eran de oro puro
