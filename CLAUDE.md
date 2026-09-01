# CLAUDE.md — Guía para Claude Code en ArcLycée

<!-- BEGIN cemi-cost-policy v1 (managed — source: cemi-web/authoring-rules/canonical/cost-policy.md) -->
## ⛔ HARD RULE — never use external/paid services without asking (all CEMI repos)

NEVER invoke any paid or third-party service outside Claude's own model without **asking, confirming, AND informing the user first — every single time.** The user pays for Claude Max 20x; do the work inside Claude. A documented "default" or convention does NOT override this. When in doubt, ask.

- **Translation:** translation is **ALWAYS Claude** — the build agent translating inline on the user's Max subscription, or Claude subagents / the Anthropic API (Haiku default, Sonnet for tone-critical fields, Opus as the content warrants). **NEVER Google Cloud Translation, Google Translate, DeepL, Amazon Translate, Microsoft / Azure Translator, Gemini, or ANY other external machine-translation service.** This holds even if a downstream repo, script, or doc presents such a provider as a "default", an "option", or a documented convention — **a documented convention does NOT override this hard rule.** Do NOT use any `scripts/translate-*.mjs` / `bulk-translate-*.mjs` helper that calls an external MT provider.
- **Image generation:** Gemini / Imagen image models are paid external APIs — do NOT auto-invoke (even if previously documented as the "default"). Ask first.
- **Any other external/paid API** (TTS, third-party data, scraping/enrichment services, etc.): ask first.

Silent use of paid external services has caused real, unwanted cost. Treat this as a hard guardrail.
<!-- END cemi-cost-policy v1 -->

<!-- BEGIN cemi-i18n-quote-hygiene v4 (managed — source: cemi-web/authoring-rules/canonical/i18n-quote-hygiene.md) -->
## 🈂 Localized-text hygiene — quotes, multibyte, significant spaces (all CEMI repos)

**Scope: any operation over localized text — translating it, DERIVING from it, or reformatting it.** Excerpt and meta-description generators, subtitle and cue splitters, chunkers, word wrappers, search indexers and TTS segmenters are all covered, and most of them involve no translation step at all. The rules below were originally written for translation; the hazards are not limited to it.

These bugs share a failure mode, which is why they live together: **nothing throws.** The JSON parses, the text looks right, the build passes, and only the bytes changed.

The most frequent one: a translation agent nests English `"…"` quotes inside a foreign-language string and silently breaks the JSON. When translating into JSON or any structured/code format:

- **Never emit a raw ASCII `"` inside a JSON string value.** Use the locale's typographic quote pair (table below), or escape it as `\"`.
- **Select/segment the text blocks carefully** so quotes and punctuation never cross or corrupt the surrounding structure — and with multibyte **CJK (Chinese / Japanese / Korean)** characters, never split mid-character when chunking or truncating.

| Locale | Quote pair to use |
|---|---|
| DE | `„…"` (U+201E / U+201C) |
| FR / IT / AR | `«…»` |
| ZH | `「…」` (corner brackets) or full-width `"…"` |
| JA | `「…」` |
| ES / PT | `«…»` or curly `"…"` |

- **Never split or trim localized text on JavaScript `\s`.** In any pipeline that **re-emits** the text — cue splitters, word wrappers, chunkers, excerpt and meta-description generators, TTS segmenters — `\s` matches **U+202F, U+00A0 and U+2009**, so `split(/\s+/)` + rejoin, `replace(/\s+/g, ' ')` and `trim()` silently delete the typographic spaces French requires before `: ; ? !` and inside `« … »`. No validator catches it. Split only on breakable whitespace: `[^\S\u202f\u00a0\u2009]+`, and trim the same way.

  **Safe exception:** `\s+` remains correct where the output is *not* served text — slugs, URL segments, search-query tokenization, filename derivation. The rule is about text that goes back on screen.

  Verify it yourself in ten seconds:

  ```bash
  node -e "console.log(/\s/.test('\u202f'), JSON.stringify(' \u202fx\u202f '.trim()))"
  # -> true "x"     the thin space matched \s, and trim() ate it
  ```

  **Two shapes, and prefer the second for trimming.** For splitting, negate the no-break spaces: `split(/(?<=[.?!])[^\S\u202f\u00a0\u2009]+/)`. For trimming, allow-list ASCII instead of negating — `t.replace(/^[ \t\r\n]+|[ \t\r\n]+$/g, '')` — which is stricter and reads as intent rather than as an exclusion.

  **When auditing a file for this pattern, grep it exhaustively — never trust an enumeration, including one in a report like this.** Run `grep -nE '\.trim\(\)|/\\s' <file>` over the WHOLE file and fix every hit. This has now failed twice in the same file: a first pass fixed one instance and left three, a second reported three and found six. Both times the shortfall came from reading a truncated grep, not from the pattern being subtle. A colon split is the easiest to miss and the most damaging, because `:` is exactly where the French thin space lives.

  Origin: two independently written pipelines in `ailearning-web` corrupted FR output this way in 2026-08, and no build failed on either. Wording adopted from `mediamax-system/.claude/rules/translation-protocol.md` §1, which had it first; deeper canon for cue segmentation lives at `mediamax-system/knowledge/production/tts/18f`.

**Always validate that every translated JSON file parses before applying it** (make it part of `/ship`). Example (adjust the path to your repo's i18n files):

```bash
for loc in en es fr de it zh ja pt ar; do
  node -e "JSON.parse(require('fs').readFileSync('src/i18n/$loc.json','utf8'))" && echo "$loc OK" || echo "$loc FAIL"
done
```

**Deeper protocol** (find/replace contract for subagent-produced translations, applier requirements, quality gates): see `mediamax-system/.claude/rules/translation-protocol.md`. The find/replace contract is mandatory whenever a translation agent emits structured pairs to apply against source HTML/JSON/ASS. Origin: 2026-06-17 batch where ~13% of pairs failed to match because agents retyped find strings.
<!-- END cemi-i18n-quote-hygiene v4 -->

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
- `musica.js` — `SistemaMusica` con 18 grupos musicales (36 MP3s, 2 por escenario), crossfade 2s, override para combate/batú/duelo/areíto/bossCemi/bossCemiCutscene, volumen en localStorage
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
- **[E] Continuar**: ambas fases (acción jugador + contraataque enemigo) muestran mensaje y "[E] Continuar" de inmediato (sin pausa obligatoria), el jugador avanza a su ritmo. `_esperandoContinuar` / `_esperandoContinuarEnemigo`

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
- **Hero images**: 3 imágenes hero por idioma en `resources/artes/` precargadas en `_precargarImagenesHero()`, dibujadas como fondo completo (cover) del canvas con gradiente oscuro en la mitad inferior para legibilidad del menú. El menú se centra verticalmente sobre la imagen
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
- **HUD layout**: Vida bar `(10, 10, 120, 14)` + Reputación bar `(140, 10, 100, 14)` en la misma fila. En Santuario del Manatí: Vida bar + O₂ bar `(140, 10, 100, 14)` (azul, parpadea rojo al <25%). Los mundos dibujan sus indicadores (NPCs, objetos, habilidades) a partir de y=42. No agregar más barras encima de y=42. **Reputación solo visible en mundos jugables** (`escenasJugables`, no en `mapaPrincipal`) y sin overlays activos (combate, batú, areíto, boss, duelo, rappel, inventario, registro). No se muestra en menú principal ni cinemáticas
- Física: `factorTiempo = dt * 60` para movimiento independiente de framerate. **Cualquier aceleración por frame** (ej: `GRAVEDAD` en Cuevas del Pomier) debe multiplicarse también por `factorTiempo`; si no, el salto/caída se rompe en monitores de 120/144/165 Hz aunque el desplazamiento siga escalado
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
- **Combate Cazador de Cimarrones**: Marcos (vigía) detecta un cazador de esclavos colonial y dispara combate. Enemigo: 45 HP, fuerza 3, velocidad 2, hostilidad 75, `tipoSprite: 'soldado'` (uniforme rojo oscuro, casco de conquistador), `conPerro: true` (sabueso rastreador dibujado junto al sprite, 35% de ataque especial de mordida con menos daño pero sube hostilidad +3). Usa opciones de combate estándar (no personalizadas). Victoria pacífica: `vigilaPaz` + `combatesPacificados++` + 15 rep. Victoria por fuerza: `vigiaVictoria` + `combatesViolentos++` + 5 rep. i18n: `montana.enemigoCazador`, `montana.ataquePerro`
- **Lago Enriquillo** (`js/mundos/enriquillo/lago-enriquillo.js`): lago hipersalino 40m bajo el nivel del mar con Isla Cabritos (Guarizacca). Ecosistema: 5 Cocodrilos Americanos (Crocodylus acutus, death roll + sonido), 7 iguanas (Cyclura cornuta con cuernos + Cyclura ricordii con ojos rojos), 9 flamencos rosados (una pata), 3 cucús/burrowing owls (madrigueras), 3 culebras corredoras (Haitiophis anomalus, 2m), Las Caritas (7 petroglifos). Enriquillo (6 diálogos: rebelión 1519-1533, amor con Mencía), Mencía, Tamayo. Natación con rotación diagonal. Toast educativo por especie. Nodo 10. HUD con contadores `👥 NPCs 0/3` y `🗿 Caritas 0/1`. Helper `_salirAlMapa()` unifica las dos rutas de salida (M y borde inferior) y muestra una pista one-time sobre la Espada perdida desenterrada por una tormenta, gated por `progreso.enriquilloVisitado` y `progreso.espadaEnriquillo`
- **Anacaona (primera visita)**: tras el primer diálogo completo con Anacaona en Yucayeque de Marién, toast retardado 1.8s pista que volver a hablar con ella desbloquea una misión y un lugar secretos. Solo si `idoloEnriquillo` aún no está descubierta. Clave i18n: `aldea.anacaonaPista`
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
- **Boss fight: Espíritu del Cemí** (`js/mecanicas/boss-cemi.js`): bullet hell secreto en Isla Cabritos. 4 patrones (espiral, anillo, onda, dirigido), 5 corazones, 3 ciclos (1.0×→1.3×→1.6×, doble patrón en ciclo 3). Espada de Enriquillo. Victoria: Bendición Divina (+30 vida, +5 fuerza, +20% velocidad). Derrota: despertar como sueño. Pedestal oculto detrás de arbusto, visible tras entregar ídolo. **Esc/Q sale del combate** en las fases `intro`/`combate`/`aturdido`/`golpe`/`transicion` llamando `alTerminar('huida')` — la escena ignora este valor, así el pedestal y la espada siguen disponibles
- **Mapa de referencia Leaflet** (`js/mapas/`): `mapa-leaflet.js` orquesta módulos en `referencia/` (capas, marcadores, transiciones). Se abre con R desde cualquier escena jugable. Stadia Maps API key en `capas.js` línea 18 (dominio registrado: `arc.cemi.ai`). 6 capas de datos toggleables: 🗿 Taínos (16 sitios), 🏰 Coloniales (8 sitios), ⚓ Naufragios (12 pecios), 🏛 Museos (30 museos RD+Haití), 🔍 Inexplorados (8, tras robot), 🔬 Potencial Arqueológico (15 sitios investigados). Marcadores con DivIcon coloreados por estado. `window._viajarANodo(id)` para click-to-travel. Totalmente trilingüe
- **Duelo de espadas** (`js/mecanicas/duelo-espada.js`): mini-juego de esgrima lateral contra Soldado Diego en La Isabela. Overlay como batú/combate. Dos modos: 'agresivo' (derrotar bajando HP) y 'pacifista' (diálogos amistosos suben convicción a 100). Posturas realistas: en garde (idle), estocada/lunge (E, cuerpo avanza con `lungeOffset`), bloqueo (Q, espada vertical), esquive (↓, arquear espalda hacia atrás). Parry si se bloquea en los primeros 0.2s del golpe enemigo → Diego aturdido 1s. Diego IA: acercarse, atacar alto (60%) o bajo (40%), retroceder. Toast "¡En garde!" al inicio, "¡Parry!" al conseguirlo. Opciones de diálogo horizontal (←→) antes del duelo: Atacar/Hablar/Negociar/Huir. Huir = pacifista sin pelea. Música propia: grupo 'duelo' (Blades of La Isabela, 2 MP3s). `juego.dueloEspada.iniciar({modo, juego, alTerminar})`. Resultado se procesa en `la-isabela.js._procesarResultadoDuelo()`
- **Batú mini-juego** (`js/mecanicas/batu.js`): juego de pelota taíno como overlay. Física 2D con gravedad, rebotes y tipos de golpe según altura (cadera/hombro/cabeza/rodilla). IA con 72% velocidad, 15% errores intencionales. Se inicia desde `asentamiento-taino-1.js` al aceptar el desafío del Cacique Guacanagaríx. Al ganar, el cacique entrega su corona (accesorio permanente, `progreso.coronaCacique`). `juego.batu.iniciar({historia, alTerminar})`. Primero en 5 puntos gana. **Esc/Q abandona el partido** sin penalización — callback `alTerminar(gano, abandonado)` con segundo parámetro `abandonado=true` para que la escena omita la toast de derrota y el bono de reputación. El diálogo de oferta del cacique acepta ←/→ además de ↑/↓ (layout horizontal de botones)
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
- **Footer compartido**: `navigation.js` genera el footer dinámicamente en todas las páginas de docs. Las páginas usan `<div id="doc-footer"></div>` como placeholder (o se crea automáticamente). El footer incluye logo, versión (`VERSION`), tagline traducido, enlace al juego y enlace al formulario de feedback. Cambiar la versión solo requiere editar `VERSION` en `navigation.js`
- **Menú Técnico (docs)**: 5 ítems — Mecánicas, Programación, Cambios, Clónanos, Participa. **Menú Aprender (antes Pedagogía)**: 5 ítems — Educación, Uso de IA, Guía de Aprendizaje, Arquepedia, Evaluación. **Menú Acerca de**: 4 ítems con anchor links (`#introduccion`, `#nota-profesor`, `#equipo`, `#contacto`). Los ítems hijos de grupos pueden tener propiedad `hash` para enlazar a secciones dentro de la misma página
- **Página Participa** (`docs/contribute.html`, `-en.html`, `-fr.html`): invita a estudiantes, profesores, arqueólogos y programadores a contribuir. Explica que el proyecto está en desarrollo continuo. Secciones por audiencia con formas concretas de ayudar
- **Landing pages con links**: las 5 tarjetas `.landing-feature` (13 Mundos, Ruta Pacifista, Educativo, Creado por Estudiantes, Código Abierto) son enlaces clicables a las páginas correspondientes en docs/. La tarjeta "3 Idiomas" queda como div sin link. Se añadió `color: inherit; text-decoration: none; display: block;` al CSS para mantener la apariencia de tarjeta
- **Hero image con marco**: las 3 landing pages (root) y las 3 dashboards (docs) muestran la hero image envuelta en `.landing-frame` con borde 4px dorado-apagado. Click en la imagen hace scroll suave al selector de idioma debajo. SVG de marco irregular con doble borde está presente pero oculto (`display: none`) — se puede restaurar cambiando la clase
- **Formulario de feedback**: formulario externo en `https://arclycee-aux.web.app/form.html` (repo `arclycee-aux/`). Integrado en `juego.html` (botón flotante dorado, solo visible online), en las 3 landing pages (`index.html`, `index-en.html`, `index-fr.html`), en `docs/about*.html` (sección "Contáctanos" con modal) y **en todas las páginas de docs** vía `navigation.js` (botón flotante inyectado automáticamente, bottom-right desktop, top-right mobile). Usa `if (!document.getElementById('arc-feedback-btn'))` para evitar duplicados con about.html. Pasa `?lang=` para i18n automático. Firebase Firestore backend (proyecto `cemiai`, base de datos `arclycee`). **Importante**: el iframe NO debe tener `background: #fff` — sin fondo evita el flash blanco antes de que cargue el formulario
- **Hero banners en docs**: cada página principal (`index.html`, `en.html`, `fr.html`) muestra la hero image del idioma correspondiente con clase `.hero-banner` (full-width, border-radius inferior)

## Qué NO hacer

- No usar frameworks ni librerías (excepto LeafletJS para mapas)
- No escribir código sin comentarios en español
- No usar Q/Esc para salir de mundos (solo M o borde inferior)
- No crear archivos de documentación sin que se pida
- No usar `entrada.izquierda` — siempre `entrada.estaPresionada('izquierda')`
- No llamar "cemí dorado" al artefacto taíno — históricamente los cemíes tenían detalles de guanín (aleación oro/plata/cobre), no eran de oro puro

<!-- BEGIN cemi-contact-emails v2 (managed — source: cemi-web/authoring-rules/canonical/contact-emails.md) -->
## 📧 Contact emails (all CEMI repos)

Valid, working contact addresses for CEMI — real and monitored. Safe to use in site copy, footers, contact forms, persona contact routing, press kits, proposals, and any outward-facing material.

**Addresses (all `@cemi.ai`):** `ai-staff@` · `business@` · `contact@` (general inbox) · `info@` · `invest@` · `legal@` · `partners@` · `privacy@` · `security@` · `support@`

**The same set is aliased at these initiative domains:** `@ailearning.global`, `@airtistic.ai`, `@ibizai.io`, `@lawra.io`, `@skaills.ai` — so e.g. `contact@ailearning.global`, `legal@lawra.io`, `support@ibizai.io` all resolve.

Default to `contact@cemi.ai`; route by purpose where a specific address fits (legal → `legal@`, security → `security@`, investment → `invest@`, partnerships/alliances → `partners@`, sales/commercial → `business@`, privacy/GDPR → `privacy@`). Do **not** invent addresses outside this list. Consultable at `/admin/emails`.
<!-- END cemi-contact-emails v2 -->

<!-- BEGIN cemi-html-sanitization v1 (managed — source: cemi-web/authoring-rules/canonical/html-sanitization.md) -->
## 🛡️ HTML sanitization — never inject untrusted HTML unsanitized (all CEMI repos)

Any content rendered into the DOM as raw HTML — `{@html}` (Svelte), `set:html` / `<Fragment set:html>` (Astro), `dangerouslySetInnerHTML` (React), `.innerHTML`, `v-html` — **MUST be sanitized before injection UNLESS its source is fully trusted.**

- **Trusted (no sanitizer required):** build-time content authored in-repo and git-reviewed — committed markdown/HTML, hardcoded icon-SVG constants, seed-script template literals. The git diff is the review gate.
- **Untrusted (sanitize ALWAYS):** anything user-contributed, form-submitted, externally fetched, runtime-AI-generated, or otherwise not git-reviewed — community resources, comments/discussions, user notes, uploaded/imported docs, runtime-rendered markdown. These are live XSS surfaces.

**How:** sanitize with a vetted library — **DOMPurify** (runtime) or **rehype-sanitize** (at markdown render). Both are MIT + local — no paid/external API (satisfies the cost-policy hard rule).

**The allowlist MUST preserve the mandatory CEMI visual HTML** — inline `<svg>` diagrams, `<pre><code>` blocks, `<table>`, and `<aside class="inset inset--*">` author insets. Getting the allowlist wrong silently strips compliance-required visuals — test it against a known-good content unit before shipping. Strip `<script>`, event handlers (`on*`), `javascript:` URLs, and `<iframe>`/`<object>`/`<embed>` unless explicitly required and origin-restricted.

**One sanitizer, one allowlist, reused everywhere** — a per-sink ad-hoc filter drifts; centralize it.

Origin: a 2026-07-22 audit of `experience` found its content `{@html}` sinks (content bodies, program/experience overviews, user-contributed community resources) injected UNSANITIZED with no sanitizer in the repo — the live XSS gap that prompted this rule. `experience` has since **addressed it on its own** — a single centralized DOMPurify sanitizer (`src/lib/utils/sanitize-html.ts`) with a shared allowlist, applied at its content sinks — and is the **reference implementation** for this rule. This block is documentation: syncing it into a repo records the rule and does **NOT** modify that repo's existing sanitization code — never overwrite or override a repo's own working handling to match the prose here; if a repo already satisfies the rule, the block just documents it. When adopting the sitecraft §6.4 markdown pipeline, sanitize as part of the render step, not after.
<!-- END cemi-html-sanitization v1 -->

<!-- BEGIN cemi-impact-arc v1 (managed — source: cemi-web/authoring-rules/canonical/impact-arc.md) -->
## 🌱 The Impact Arc — how CEMI intervenes (all CEMI repos)

**Impact Arc** (ES: **Arco de Impacto** · FR: **Arc d'Impact**) is CEMI's five-stage frame for how we act on and with stakeholders:

**Engage → Enable → Inspire → Empower → Connect**

**Origin and ownership.** The Impact Arc was **created by Carlos Miranda Levy** as his personal mantra and creed — **"NEVER HELP: Engage, Enable, Inspire, Empower and Connect"** — and has been **inherited by CEMI as a group**, where it now serves as the organization's **social-impact perspective**: the frame for how CEMI and its organizations act on and with stakeholders. **Authorship remains his; the adoption is organization-wide.** Credit him as its author wherever the origin is relevant; never present it as an anonymous or institutionally-authored model.

The word *help* implies asymmetry: someone who knows better supplying solutions to someone who doesn't. That assumption is the starting point of dependency, not development. The Arc rejects it deliberately, and each stage builds on the one before.

- **Engage** — Meet stakeholders where they are. They take part in understanding their own situation before any solution is designed. Never diagnose or prescribe on someone's behalf without their active participation.
- **Enable** — Provide knowledge, skills, and tools — never finished solutions. Build capability, not dependency. Nothing is given without asking something in return, because exchange creates ownership and commitment.
- **Inspire** — Show possibilities and opportunities that expand what stakeholders believe they can achieve. Aspiration is not imposed; it is awakened by exposure to what is possible.
- **Empower** — Shift ownership entirely. Stakeholders build their own path. Our role is scaffolding — frameworks, resources, access — not constructing the building.
- **Connect** — Link stakeholders to others, to networks, and to the world, so their growth never depends on a single point of failure. Networks multiply what any individual or organization achieves alone, and sustain it beyond any single relationship.

**What it is — and how to present it honestly.** The Arc is **anti-assistentialist**: it builds the stakeholder's agency and never does *for* them. It is an **organizational philosophy and design position** — a worldview about how human potential is unlocked, applied as a design stance for social projects and interventions. It is **NOT an evidence-based or researched framework**, was not designed as pedagogy or motivation theory, and must never be presented as validated in any derived material (decks, proposals, articles, curricula, persona voice, grant copy). Where it converges with researched constructs (e.g. self-determination theory), you may write **"aligns with"** — never *"derived from"*, *"based on"*, or *"proven by"*. Its authority is conviction and practice, not evidence; claiming otherwise is exactly the fabrication the anti-hallucination canon forbids.

**Where it applies.** CEMI social interventions and projects generally. Operationalized in **Smoother Onboarding** (`smoother-system`) as the five-stage structure of the participant journey. Designed and used with **adults**; transfer to children and youth is plausible but **unvalidated** — say so rather than assuming it.

**Coherence with CEMI's other identity principles.** The Arc is philosophically continuous with **learning-first, not teaching-first** (center the learner's process, not the teacher's delivery) and with **"augmentation, not replacement"** and **"change it, but change it well"**. The common thread is *agency over assistance*: enhance what people can do; never substitute for who they are.

**Naming — use these exact forms, do not re-translate.** The framework: **Impact Arc** (EN) · **Arco de Impacto** (ES) · **Arc d'Impact** (FR). The motto it comes from, as documented in Carlos's persona canon:

- **EN** — "NEVER HELP: Engage, Enable, Inspire, Empower and Connect"
- **ES** — «NUNCA AYUDAR: Involucrar, Habilitar, Inspirar, Empoderar y Conectar»
- **FR** — « N'AIDEZ JAMAIS : Engager, Rendre possible, Inspirer, Autonomiser et Connecter »

Stage names per locale:

| EN | ES | FR |
|---|---|---|
| Engage | Involucrar | Engager |
| Enable | Habilitar | Rendre possible |
| Inspire | Inspirar | Inspirer |
| Empower | Empoderar | Autonomiser |
| Connect | Conectar | Connecter |

Use the motto when quoting Carlos, the framework name when referring to the organizational canon. The stages are **fixed and ordered** — do not add, rename, drop, or reorder them, and do not coin new translations: the ES and FR forms above are canon (note FR *Rendre possible* for Enable and *Autonomiser* for Empower — neither is a literal cognate, and both are deliberate).
<!-- END cemi-impact-arc v1 -->

<!-- BEGIN cemi-png-logos v1 (managed — source: cemi-web/authoring-rules/canonical/png-logos.md) -->
## 🖼️ HARD RULE — logos are PNG, never SVG (all CEMI media/video repos)

Anywhere a logo's **type is rendered** — hyperframe/video compositions, brand-closes, chrome overlays, canvas/OG cards, favicons, generated imagery — always use a **PNG** logo, **never SVG**. SVG logos render their **fonts incorrectly** at render time: the wordmark depends on the font being available in the (often headless) renderer, so it comes out wrong. PNG bakes the type, so it is always correct.

- **Hyperframes / video:** chrome and brand-lockup MUST be PNG. SVG wordmarks render wrong in the compositor.
- **White logos** don't show on light/white backgrounds — use the color version or add a glow. (Brand-closes are dark, so white is fine there.)
- **Per-repo logo sets are independent** — each repo owns its own approved PNG set; do NOT sync one repo's brand logos into another.

This is about **logos** (they carry type). Inline **SVG icons** in UI are the correct choice and are unaffected by this rule.
<!-- END cemi-png-logos v1 -->

<!-- BEGIN CEMI AUTHORING RULES (managed by cemi-web/authoring-rules/sync.sh) -->
<!-- version: 2026.09.02  do not edit manually; edit the canonical and re-run sync.sh -->

# CEMI authoring rules for content written under a persona's voice

**Version:** 2026.09.02
**Source of truth:** `cemi-web/authoring-rules/canonical/persona-authoring-rules.md`
**Synced into each consumer repo's `CLAUDE.md` as a managed block.**

These rules apply whenever Claude Code (or any assistant) writes static content under a CEMI persona's voice — opinion articles, article frontmatter `*Take` fields, comments, blog posts, video scripts, social drafts, video descriptions, press releases, or anything attributed to a named persona.

The runtime chat widgets get a similar rule via `SHARED_PERSONA_GUARDRAILS` in `chat-persona.ts`. Static authoring needs the same discipline because static content is more persistent, more indexable, and more damaging when wrong.

---

## Factual honesty — no fabrication of verifiable-looking claims

Six categories. All hard red lines.

1. **Personal anecdotes / family stories / first-person memories.**
   Use ONLY anecdotes documented in the persona's canon (`bioLong` in the personas SSoT, or the validated-anecdotes list when present). No invented uncles, cousins, neighbors, clients, mentors, students, or "I once knew…" stories. If no documented anecdote fits, make the rhetorical point without one. A clean argument beats a fabricated memory.

2. **Statistics, percentages, "X out of Y" claims.**
   Never invent a number. If you don't have a real verified figure with a citable source, use directional language ("rates have compressed substantially in some segments") instead of a fake precise one ("30-60% rate compression"). If you cite a figure, you must be able to point to the source.

3. **Named reports / surveys / studies / indexes / handbooks.**
   Never invent "the AIGA Design Census says X" or "according to a 2024 McKinsey report" or "Animation Guild reports show Y". Only cite real reports the writer can actually verify exist and say what they're claiming. If a report exists but says something subtly different, characterize it honestly ("the BLS handbook documents X" — not "the BLS handbook is the first to do Y").

4. **"First" / "only" / "largest" / "earliest" superlatives.**
   Never assert these without a real verifiable source. They are almost always wrong when invented. Drop the superlative rather than guess.

5. **Named partnerships, deals, product launches, M&A, industry events.**
   Never invent. "Company X partnered with Y on Z in 2025" must reflect a real public event. Fabricated partnerships are libel-adjacent and damage credibility. Real referenced examples: 2023 WGA / SAG-AFTRA strikes; Andersen v. Stability AI; Getty v. Stability AI; Spawning / Have I Been Trained (real opt-out tool).

6. **Personal relationships and direct experience.**
   Do not claim the persona actively mentors, advises, employs, knows, or works with specific named people / groups unless the canon documents it. Speak to general audiences ("any artist navigating this shift") rather than fake-specific relationships ("young Latin American artists I work with"). The persona doesn't get to claim experiences it doesn't actually have.

**The rule in one line:** prefer (a) verified cited fact, (b) documented canon, or (c) silence — never fabrication.

Real, verifiable cultural references ARE good and welcome. Cite them accurately.

---

## Fictional personas — authority without claimed institutional roles

Distinct from the fabrication rules above (which concern *verifiable* claims): even for an openly **fictional** persona, do not build its authority on **claimed institutional roles, titles, or positions** — and *anonymizing the institution does not fix it*. "Professor of X at the University of Edinburgh," "Professor at a leading Scottish university," "holds the Paulo Freire Chair at the University of São Paulo," "holds a chair in critical pedagogy at a major Brazilian university," and "Founder of [company]" are all the same problem: they assert a titled position the person does not hold. In academia especially, claiming a professorship/chair/deanship (real or vaguely-gestured) reads as a credential claim and is frowned upon.

**There is a fine line** between an interesting fictional character and a misleading credential claim. Go too strict and the characters become flat; the goal is not blandness — it is authority earned honestly.

**Establish authority, character, and perspective through other means:**
- **Intellectual stance & lineage** — what they champion and whose ideas they build on ("champions evidence-based pedagogy and the Socratic method"; "rooted in Freire's critical pedagogy, Dewey's learning-by-doing, and Ubuntu"). Citing real thinkers as *influences* is welcome and accurate; claiming to *hold their named chair* is not.
- **Temperament & voice** — "measured, precise, intellectually warm"; "warm, direct, community-minded"; "practical, kinetic, transformation-driven."
- **Domain & conviction** — the problem they care about and the line they hold ("no tool earns a place in the classroom until it proves it deepens understanding").
- **General, non-titled experience** — "grounded in years of classroom teaching" is fine (a formative experience); "Professor at…", "Chair at…", "Founder & Board Member of…" is not (a titled institutional position).

**The rule in one line:** describe the persona by *what it thinks, values, and is like* — never by a position it holds at an institution, real or invented.

---

## Learning-first, not teaching-first

Education is about the **learning** experience, not the teaching experience. Center the **learner's process** — never the teacher's. Even when the topic *is* teaching, approach it from the learner's side: what does the learner experience, understand, retain, and become able to do?

This is a CEMI/aiLearning **project-identity** principle, not a stylistic preference:
- The initiative is named **aiLearning** (not aiTeaching).
- The methodology is **"Smoother Experiences"** — learning *experiences*.
- It is also a **personal conviction of Carlos Miranda Levy** — a cousin of his *"change it, but change it well"* and *"augmentation, not replacement"* frames.

**When writing any CEMI education content or persona voice:**
- Lead from the learner: the participant, the parent, the person becoming capable — not the instructor's craft or convenience.
- Tools and methods are judged by what they do to *understanding and capability*, not by how they help "deliver" or "teach."
- Prefer learner-centered framings ("frees every learner to…", "each learner's path", "what the learner can now do") over teacher-centered ones ("frees teachers to…", "how to teach X"). Teachers matter enormously — but they are in service of the learning, which is the subject.
- Even the education personas' authority is about deepening *learning*, not performing *teaching*.

**The rule in one line:** the learner's experience is the subject; teaching is in service of it.

### Terminology in Smoother's own voice — «participante», never «estudiante»

Use **Sujeto de Aprendizaje / participante / aprendiz**. Never «estudiante», never «alumno», never "trainee". The support role is the **Orientador de Aprendizaje** (never «docente»/«profesor»); a learning experience is never called a «curso».

**Why these words are refused.** The objection is not connotation — it is that each refused term defines the person by their **position relative to an institution**, rather than by what they are doing:

- **«Estudiante» / "student"** names an enrolment status, not an activity: one is a student *of* a teacher, *at* a school. The word puts the institution in the frame and the person in a receptive position inside it. It is also life-stage coded — it implies youth, full-time study, pre-professional standing — which is why it lands badly in adult professional development.
- **«Alumno»** carries the same problem more strongly. Its etymology is Latin *alumnus*, "the nourished one", from *alere*, to nourish: the learner as the one who is fed. That is an accurate description of a transmission model — precisely the model Smoother rejects — with the passivity encoded in the noun. It is also the most school-coded and, for adults, the most infantilising of the options.
- **"Trainee"** is explicitly subordinate and provisional: someone below full competence, on probation. Training is done *to* the person. It names a rank in an organisation, not a relationship to learning.
- **«Participante»**, by contrast, names what the person *does*. No institutional subordination, no age coding, no implied deficit. It reads the same for a 22-year-old and a 55-year-old department head.

**Do NOT use the false etymology.** The claim that «alumno» derives from *a-lumen*, «sin luz» / "without light", is **false**, though it circulates widely in Spanish-language education discourse. It must never appear in CEMI material or be used as justification anywhere. The genuine etymology (*alere* → nourished, fostered) makes the point honestly and needs no embellishment.

**Honest labelling — state this plainly.** This is a **design position and a matter of project identity, not an evidence claim.** No study shows that «participante» produces better learning outcomes than «estudiante». The justification is coherence: the initiative is aiLearning, not aiTeaching; the offering is learning *experiences*, not courses; adopting the receptive word in our own voice would quietly contradict what is being sold. Never present it as research-backed.

**This is not language-policing.** Cited frameworks keep their own terms — the OECD says "student agency" and we quote it as such; Gagné says "learners". The rule governs **Smoother's own voice**, not other people's words.

### La regla de capacidad — una persona, tres registros

*(The capacity rule: one person, three registers.)* Carlos's ruling, 2026-08-14, unifying a fork between two offerings that had each written their own incompatible interpretation of when the prohibition applies. The Onboarding SSoT ruled "never student/estudiante/alumno/trainee anywhere"; the aiLearning Challenge SSoT permitted student/escuela in the institutional register when addressing schools, parents and ministries. Both were right about their own audience — onboarding's counterparty is an employer, the Challenge's is a school — and onboarding could say "never anywhere" only because it had never had a school as a counterparty.

The prohibition protects **Smoother's own voice**; the exception is **the counterparty's own institutional register**, whatever that institution is. The same person is named differently depending on the capacity in which they are being addressed:

1. **In the learning process** — Smoother's voice, methodology, programme content, anything the learner reads: **Sujeto de Aprendizaje / participante / aprendiz**. Never «estudiante», never «alumno».
2. **In organizational capacity, employer** — proposals, commercial copy addressed to HR buyers, contracts, ROI material: **employee / new hire**; Spanish commercial copy prefers **colaborador** over «empleado».
3. **In organizational capacity, educational institution** — addressed to schools, educators, parents, ministries, sponsors; and in consent and safeguarding instruments: **student / estudiante / estudiantado** and **school / escuela** are permitted, because that is the register with which the institution names its own relationship with the person who studies.

«Alumno» is always avoided in favour of «estudiante». **"Trainee" never.** The exception never reaches Smoother's voice or anything a participant reads: a consent form addressed to a family may say «estudiante»; a Unidad de Aprendizaje may not. **Enforcement is per artifact surface.**

**This statement supersedes any offering-local version.** Consumer SSoTs point at this rule rather than defining their own. In `smoother-system` it is already landed in `CLAUDE.md`, and both offering vocabularies (`ssot/smoother-onboarding/00-meta/vocabulary.yaml`, `ssot/desafios/00-meta/vocabulary.yaml`) have been collapsed to pointers.


**Sibling principle — the Impact Arc.** Learning-first is one expression of a wider CEMI stance: *agency over assistance*. The organizational frame for that stance is the **Impact Arc** (ES: *Arco de Impacto* · FR: *Arc d'Impact*) — **Engage → Enable → Inspire → Empower → Connect** — **created by Carlos Miranda Levy** as his personal creed *"NEVER HELP: Engage, Enable, Inspire, Empower and Connect"* and **inherited by CEMI as a group** as its social-impact perspective (authorship stays his). It is an organizational philosophy and design position, **not** an evidence-based framework, and must never be presented as validated. Canonical entry: the `cemi-impact-arc` managed block (source: `cemi-web/authoring-rules/canonical/impact-arc.md`).

---

## Specifically for Carlos Miranda Levy

Carlos's persona canon documents the allowed biographical scope. When writing under his voice, use ONLY what is documented; nothing else.

- **Places he can speak from**: Singapore, Santiago de Chile, Silicon Valley, Paris, Japan, the Caribbean (Dominican Republic).
- **Fields he can speak from**: Content Creation, Disaster Response, AI, Education, Consulting, Startups, Social Entrepreneurship, Parenting.
- **Family**: one son, born 2012. **Do not invent** siblings, uncles, cousins, partners, additional children, or any other family member.
- **Validated family anecdotes** (use only as documented, do not embellish):
  - Carlos's grandfather was a blacksmith ("herrero") so famous that people came from other towns on horseback to have him shoe their horses. The arrival of the automobile transformed his trade. (Use as a real anchor for "trade transformation" discussions. Do not invent dates, do not invent how he died, do not characterize him as rejecting change.)
- **Relationships NOT claimed**: Carlos does not have a documented active mentorship of young artists (Latin American or otherwise). Speak in general or second-person terms ("any artist navigating this shift", "artists working in the compressing middle") rather than first-person specific ("young artists I mentor", "the artists I work with").
- **How he refers to himself (title preference)**: Carlos IS the founder of CEMI, but does not like to brag or lead with that title. In bylines, signatures, persona roles, and self-introductions, prefer **"Coordinator of CEMI's Enhanced Intelligences"** (or something to that effect) over "Founder of CEMI." State the founder fact only when directly relevant or asked — never as a flex.
- **Learning-first conviction**: Carlos holds that education is about the *learning* experience, not the teaching experience (see the "Learning-first, not teaching-first" section above). It's a personal conviction and sits alongside his *"change it, but change it well"* and *"augmentation, not replacement"* frames — invoke it when he speaks on education, edtech, or AI in learning.

---

## Other personas

Same rule structure applies to every other persona — Aurelius, Saya, Marcus, Zara, Mira, Paletta, Pixelle, Eva, Mateo, Sol, and the rest. Until each persona's canon documents specific validated anecdotes, do NOT improvise anecdotes for them. Use real public/historical references or speak in general terms.

When in doubt: pull up the persona's record at `https://cemi.ai/admin/personas` (or read the canon in `cemi-web/personas-snapshot.json` / the synced markdown in each consumer repo) and use only what is documented.

---

## Inclusion — normalized, never tokenized

A discipline sibling to "steelman, don't strawman," applied whenever a persona carries a represented identity attribute (disability, neurodiversity, ethnicity, age, body type, faith) — in its `profile.appearance.representation`, in its portrait, and in any content it appears in. **The person is first; the attribute is context, never the subject.** (Adapted from the MediaMax/Juguetón inclusion spec — *"Mateo construye. Usa silla. Fin."* / *"PRIMERO Sofía."*)

**Do:** keep the persona's personality primary; let others interact *with the person*, not with the wheelchair/aid; show the same tools, products, and competence as everyone else; let an attribute (a slower tempo, a visible feature) be authentic and unremarked; celebrate achievements without condescension.

**Don't:**
- Make the attribute the plot, or surface the persona only in an "inclusion moment / special episode" (tokenism).
- Frame as inspiration/pity ("despite their…", "overcoming…"), with sad/"triumphal" music or pitying camera angles.
- Hide or "correct" the attribute; edit to erase a natural tempo; over-help ("assisting" unasked); give "special tools for special people."
- Reduce the persona to the attribute ("the one in the wheelchair") instead of their name and character.

This complements the Indigenous `knowledge-boundary` rule (represent at the level openly-sharing teachers would recognize; nothing closed/initiatory; nothing exoticized).

---

## Portraits — representation fidelity (mandatory)

A persona's portrait is part of its canon. When generating or regenerating any persona image, these rules are mandatory.

1. **Match the portrait to the persona's ethnicity, heritage, gender, and age.** The apparent ethnicity in the image must never conflict with the persona's name, stated heritage, or `appearance`. Do NOT leave the image model to infer ethnicity from a name — it guesses wrong (a "Wei Chen" or "Priya Sharma" rendered as European; a "Tyrone Williams" not rendered as African American). Encode ethnicity/heritage, gender, and age **explicitly** in the generation prompt, sourced from a durable `appearance` field on the persona — never from vibes or the name alone.

2. **Keep a deliberate balance of ethnicities and genders across every roster.** A panel / team / cohort should represent a genuine range — never skew toward one group, and make sure under-represented groups actually appear *and appear correctly*. Review the whole set's composition, not each portrait in isolation. If the names imply diversity, the images must deliver it.

3. **Historical / inspired-by-real-figure personas must resemble the known depictions of that figure.** For any persona that is, or is inspired by, a real historical person, the portrait must reproduce that person's distinctive, well-documented features — glasses style, facial hair, hairstyle, era-accurate dress — not a generic period figure. Give the generator the *specific* features; "faithful to known likeness" alone is not enough. The specificity required, by example:
   - **Jean Piaget** — large bald forehead with white hair at the sides, **thick black-framed glasses**, clean-shaven (no mustache); mid-20th-century suit.
   - **John Dewey** — full **bushy mustache and NO beard**, **thin round wire/rimless glasses**, side-parted hair; early-20th-century suit.
   - **Rabindranath Tagore** — long flowing white beard and hair, simple robe.
   - **Maria Montessori** — dark hair worn up, early-20th-century high-collared dress.

   Verify the result against known photographs/portraits before accepting it.

**The rule in one line:** the image must look like who the persona actually is — right ethnicity and gender, the *real person* for historical figures, balanced across the roster — never a mismatched or generic face.

### Image variation set (all render modes)

Every persona's imagery is produced in **three render modes** — **photo** (realistic), **semi-realistic caricature**, and **fun 3D caricature (Pixar/Disney style)** — and, in each mode, as **four framings** derived from one full-body source: **full-body**, **waist-up**, **head/square** (head-and-shoulders), and **face** (a tight square headshot cropped on the face). Generate the full body once; crop the other three from it (don't generate them separately). Full-body means the whole standing figure, head to feet, with **natural/normal proportions** (no big-head caricature) and no oval/vignette/frame. Model choice: realistic + semi-realistic on the default (Flash) model; the fun 3D transformation needs the Pro model. Store each variation on the SSoT image bucket under the persona id (id-prefixed filenames) and record it in the personas collection so downstream consumers of the SSoT can select the mode + framing they need.

#### Settled generation prompt (reference model)

Compose each image as **`<style lead>` + `<persona appearance likeness>` + `<composition contract>`**, run **image-to-image** from the persona's realistic portrait, and force a tall aspect in the API config (`imageConfig.aspectRatio: '3:4'`). Generate the **full body once**, then crop the **waist-up** (top ~55%) and **head/square** (top-cropped square) from it. Reference implementation: `cemi-web/scripts/generate-caricatures.mjs`.

**Composition contract** (shared by all modes — the hard-won wording that avoids ovals, letterboxing, cut feet, and square-not-tall):
> COMPOSITION (follow exactly): a TALL vertical FULL-BODY caricature image showing the ENTIRE person standing — from the top of the head all the way down to and INCLUDING the FEET and shoes. The WHOLE figure must be inside the frame: head near the top, feet near the bottom, with a little empty space above the head and below the feet. Do NOT crop or cut off the feet, the legs, or the top of the head — the complete body head-to-toe must be visible. The background must be a completely FLAT, SOLID, UNIFORM single plain color — no texture, no gradient, no scenery or props, and no cast/ground shadow — so the figure can be cleanly cut out and used as an overlay. Use NATURAL, REALISTIC human body proportions with a NORMAL-sized head (about seven to eight heads tall for an adult) — do NOT enlarge the head; no big-head or chibi caricature proportions. NOT an oval or floating cut-out; no vignette, no rounded/curved edges, no picture frame, border, or matte, no letterbox/pillarbox bands. No text or watermark.

**Style lead — semi-realistic caricature** (default/Flash model):
> Turn this person into a warm, friendly full-body SEMI-REALISTIC illustrated character of the SAME person — a clean, hand-illustrated cartoon rendering that stays faithful to their likeness, facial features, skin tone/ethnicity, hair, glasses, and distinctive features. CRITICAL: use fully REALISTIC, natural, life-like body proportions — a normal-sized head at a true adult head-to-body ratio (about seven to eight heads tall). This is NOT a caricature: do NOT enlarge, inflate, or exaggerate the head or any feature. Dignified, never mocking.

**Style lead — fun 3D caricature** (Pro model — Flash under-stylizes this):
> Turn this person into an OBVIOUSLY STYLIZED, fun full-body 3D-ANIMATED CARTOON character in the style of a modern feature animation film (Pixar / Disney / DreamWorks). CRITICAL: it must clearly read as a 3D animated cartoon — NOT photorealistic — with strong animated-film stylization (soft rounded features, warm expressive eyes, smooth subsurface-scattering skin, cinematic soft lighting) but NATURAL, realistic body proportions and a NORMAL-sized head (not a big-head caricature). Faithfully preserve the person's likeness, ethnicity, skin tone, hairstyle, facial hair, glasses, and distinctive features.

**Likeness lock:** always append the persona's documented `appearance` so image-to-image can't drift (e.g. *Piaget — thick black-framed glasses, large bald forehead, white side hair, clean-shaven / no mustache*). Never use the word **"portrait"** in the prompt (it forces an oval bust vignette) — say "full-body caricature image."

#### Transparent cutouts (background removal)

Each rendered image should also be available as a **transparent-background cutout** (RGBA PNG/WebP) for use as an overlay/composite. **The opaque studio/flat original is always kept as the fallback** — the cutout never replaces it. Cut out the full body once, then derive the transparent waist-up + head/square crops the same way (top ~55% / top-cropped square, alpha preserved).

**Tooling — `rembg`, run locally (free, no paid API).** Install as part of the Personas / MediaMax image stack and pre-cache the models:

```bash
pip install --user "rembg[cpu]"    # onnxruntime-backed; models auto-download on first use
```

**Model choice — pick by subject:**
- **People / human portraits → `birefnet-portrait`** (primary; best hair/edge matting on humans).
- **Objects / products / non-human elements → `birefnet-general`** (best general matting).
- **`isnet-general-use`** — the lightweight fallback (≈178 MB vs birefnet's ≈1 GB) for either subject when speed/size matters; near-identical on clean silhouettes.
- `u2net` / `u2net_human_seg` are older baselines — prefer the birefnet pair above.

> **⚠️ Memory-intensive — can crash the machine.** The birefnet models (~1 GB) run inference in RAM, and full-body images are large; a big batch can exhaust system memory and crash the process / the whole session (observed on WSL2). Mitigate: run in **small batches**, one image at a time in the loop (don't parallelize the cutout stage), keep other heavy jobs off the box, and drop to the lighter **`isnet-general-use`** (~178 MB) when memory-constrained. If a run dies mid-batch, just re-run — the stage is idempotent (it overwrites `-cutout.png`).

Reference implementations: `cemi-web/scripts/cutout-batch.py` (Stage 1 — birefnet cutout) + `cemi-web/scripts/upload-photo-cutouts.mjs` (Stage 2 — derive crops, webp with alpha, upload, set `photoFullCutout*` fields). Alpha survives sharp `extract`/`resize`; write WebP with `alphaQuality: 100`.

#### Face-focused headshots (OpenCV)

The **face** framing is a tight square headshot cropped on the face — distinct from the head/square (head-and-shoulders) crop. Derive it with **OpenCV face detection** (not a fixed proportional crop): detect the face, frame hair-to-shoulders around it, fall back to a top-center proportional square only when no face is found (e.g. some 3D cartoons). Applies to every render mode + the realistic cutout.

**Tooling — `opencv-python-headless`, run locally (free, no paid API), part of the Personas / MediaMax image stack:**

```bash
pip install --user "opencv-python-headless<5"   # PIN to 4.x — see gotcha below
```

> **⚠️ OpenCV version gotcha:** `opencv-python-headless` **5.0.0** ships a broken build where `cv2.CascadeClassifier` is missing (`cv2.data` loads, but the class raises `AttributeError`). **Pin to `<5` (4.x)** — 4.13.x works. Don't install bare `opencv-python-headless` (it resolves to 5.0.0).

The bundled Haar cascade (`cv2.data.haarcascades/haarcascade_frontalface_default.xml`, plus `_alt2` as a second pass) needs no download. Constrain detection to the top ~55% of the frame and filter implausible boxes (face width 7–45% of image, top in the upper 40%).

> **⚠️ Pick the TOPMOST detection, not the largest.** Patterned/ornate clothing (brocade, florals, textured fabric) can produce a false-positive "face" on the **torso** that is *bigger* than the real face — so selecting by area crops the chest (this cropped Rousseau's floral waistcoat instead of his head). In a standing full-body figure the real face is always the **highest** plausible detection, so choose the smallest-`y` box (tie-break on area). Filtering alone is not enough; the selection rule is load-bearing.

Reference implementation: `cemi-web/scripts/face-crop.py` (+ `scripts/upload-face-crops.mjs` for upload + `*Face` fields; both take `--only=<id>` to re-crop a single persona).

---

## Audit pattern (what to grep for when reviewing existing content)

When auditing existing static content for these failures, look for:

- First-person stories without a canon source: `my (uncle|aunt|cousin|grandfather|grandmother|brother|sister|neighbor)`, `I once knew`, `a friend of mine`, `years ago I`.
- Suspicious stat ranges: `\d{1,3}[-–]\d{1,3}%`, `\d+x faster`, `\d+ out of \d+`, "according to multiple surveys", "studies show".
- Suspicious citations: `(AIGA|McKinsey|Deloitte|Gartner|Animation Guild|BLS|Pew|Nielsen|IPSOS) (Census|Report|Survey|Handbook|Index|Study)`.
- Suspicious superlatives: `first (\w+ ){0,3}(handbook|company|country|state|report|study|partnership)`, `the (only|largest|earliest)`.
- Suspicious partnerships: `(partnership|deal|collaboration) (between|with) [A-Z]\w+ and [A-Z]\w+`, `\d{4}` near a product/launch claim.
- First-person mentorship: `(young|emerging|the) artists I (work with|mentor|advise|teach)`, `clients I serve`.

A formal audit script lives at `cemi-web/scripts/audit-opinion-content.mjs`; sister sites can run it against their own `src/content/opinion/**/*.md`.

---

## When generating new content

The default discipline:
1. Make the structural point first, then look for a real reference to anchor it.
2. If you can't find a real reference, leave the point unanchored — abstract rigor is better than fabricated grounding.
3. If a personal voice asks for an anecdote, check the persona canon. If nothing fits, drop the anecdote and rely on structural argument.
4. Cite real reports / cases / events with care. If unsure whether a report exists or says what you remember, omit it.
5. Never insert a "this is similar to when X partnered with Y" sentence without verifying X and Y actually did partner.

Brevity and honesty beat fluency. A short paragraph of true things is worth more than three paragraphs of plausible fiction under a real person's name.

---

## Anti-hallucination & fact-checking (operational canon)

*Consolidated 2026-07-13 from ailearning-web practice, mediamax-system's anti-hallucination protocol, and sitecraft's authenticity rules — at Carlos's direction. This section is the ecosystem-wide SSoT; repo-local variants defer to it.*

### The hierarchy (always)

Prefer, in order: **(a) verified, cited fact → (b) documented canon → (c) silence.** Never fabrication. A clean argument beats a fabricated detail; a short paragraph of true things beats three paragraphs of plausible fiction.

### Tiered labeling (canonical flags)

Every claim in generated content carries its epistemic status until editorial review clears it:

- `[SOURCE: <type> — <reference>]` — verified; the reference is real and was checked.
- `[INFERENCE: based on <what>]` — reasoned, clearly framed as reasoning, never dressed as fact.
- `[REQUIRES VERIFICATION: <what kind of source would settle this>]` — the canonical "flagged" marker. (Aliases `[TBD]`, `[TBD — real data required]`, `[FUENTE: verificar]` in older docs mean the same; new content uses `[REQUIRES VERIFICATION]` or the repo's established Spanish equivalent.)

Nothing carrying `[REQUIRES VERIFICATION]` ships to production. Cited or it doesn't ship.

### The five prohibited fabrications

1. Invented statistics or round-number metrics ("87% of parents…", "10,000+ users") — use directional language or flag.
2. Fabricated or trimmed-meaning quotes — quotes are verbatim from a checked source, or they don't exist. (Where pipelines automate this, verbatim-validation gates are mandatory — see mediamax `VC-02`.)
3. Invented reports, surveys, studies, or named research.
4. Invented partnerships, deals, events, or relationships (libel-adjacent).
5. Unverified superlatives ("first", "only", "largest").

If a real source exists but says something subtly different — characterize it honestly, don't round it up.

### The three-pass fact-check (before anything publishes)

1. **Writer self-check:** every claim labeled per the tiers above.
2. **Independent pass:** a second set of eyes (or a dedicated verification agent) checks every `[SOURCE:]` actually says what's claimed and hunts unlabeled claims.
3. **Source review:** quotes against tape/text; numbers against the primary document.

Never publish a claim you haven't verified *as if* it's verified. Corrections, when needed, are visible — not silent edits.

### The authenticity test (3 questions, from sitecraft)

Before delivering any content: Is it **specific** (not generic filler)? Is it **evidence-backed** (or honestly labeled)? Is it **voice-matched**? Any "no" → rewrite.

### Audit pattern

Periodically grep for fabrication signatures — suspicious stat ranges (`\d{1,3}[-–]\d{1,3}%`), branded-report citation patterns, unverifiable relationship claims. Reference implementation: `cemi-web/scripts/audit-opinion-content.mjs`.

### Deep references

Full operational detail: `mediamax-system/knowledge/brand-brief/BB-05-anti-hallucination-protocol.md` (tier system, prohibited practices with examples, five verification questions) and `mediamax-system/knowledge/production/15b-podcast-audio-narrative.md` §6 (three-pass pipeline, uncertainty handling, corrections policy). Chatbots additionally require citation/source-linking per `sitecraft-system/protocol/chatbot-and-personas.md`.

<!-- END CEMI AUTHORING RULES -->
