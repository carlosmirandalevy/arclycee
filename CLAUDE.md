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
- `juego.js` — game loop, manejo de escenas, inventario overlay, combate overlay, toasts
- `entrada.js` — input unificado (teclado + táctil) vía `estaPresionada(accion)`
- `configuracion.js` — constantes globales y mapeo de teclas (`TECLAS_POR_DEFECTO`)
- `renderizado.js` — wrapper de Canvas 2D
- `sonido-procedural.js` — efectos con Web Audio API

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

### Combate (`js/mecanicas/combate.js`)
- Estilo Undertale con ruta pacifista (paciencia 100 = victoria pacífica)
- Se inicia desde escenas vía `juego.combate.iniciar({...})`
- Resultado se verifica FUERA del bloque `if (enCombate)` porque al terminar `enCombate` ya es false
- **Opciones personalizadas por enemigo**: `enemigo.opcionesPersonalizadas` — array de acciones con `{id, nombre, paciencia: [min, max], hostilidad: [min, max], mensaje, respuestaEnemigo}`
- Cuando hay opciones personalizadas, `_ejecutarPersonalizada()` reemplaza el switch genérico
- El turno enemigo usa `_ultimaAccion.respuestaEnemigo` para contra-respuestas específicas
- `pistaPersonalizada` en el enemigo cambia el texto de ayuda inferior

### Menú principal (`js/escenas/menu-principal.js`)
- 6 opciones: nuevoJuego, continuarJuego, idioma, documentacion, opciones, creditos
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

## Qué NO hacer

- No usar frameworks ni librerías (excepto LeafletJS para mapas)
- No escribir código sin comentarios en español
- No usar Q/Esc para salir de mundos (solo M o borde inferior)
- No crear archivos de documentación sin que se pida
- No usar `entrada.izquierda` — siempre `entrada.estaPresionada('izquierda')`
- No llamar "cemí dorado" al artefacto taíno — históricamente los cemíes tenían detalles de guanín (aleación oro/plata/cobre), no eran de oro puro
