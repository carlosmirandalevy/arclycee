# Instalación y Ejecución

## Requisitos

- Un navegador web moderno (Chrome, Firefox, Safari, Edge)
- Un servidor local (el juego usa ES modules, que no funcionan abriendo el HTML directamente)

## Opción 1: Python (ya instalado en la mayoría de computadoras)

```bash
cd arclycee
python3 -m http.server 8080
```

Abre http://localhost:8080 en el navegador.

## Opción 2: Node.js

```bash
cd arclycee
npx serve .
```

Abre la URL que muestra en la terminal.

## Opción 3: VS Code

Instala la extensión **Live Server** (Ritwick Dey), haz clic derecho en `index.html` y selecciona "Open with Live Server".

## Opción 4: Firebase Hosting (producción)

```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

## Controles

| Acción | Teclado | Móvil |
|---|---|---|
| Mover | WASD o Flechas | D-pad virtual |
| Saltar (en cuevas) | Espacio | Botón SALTO |
| Interactuar / Confirmar | E o Enter | Botón A |
| Cancelar / Salir menú | Q o Escape | Botón B |
| Inventario | I | Botón X |
| Habilidad especial | F | Botón Y |
| Volver al mapa | M | — |
| Mapa de referencia | R (solo en mapa) | — |
| Registro de misiones | L | — |
| Tomar foto | T | — |
| Tomar selfie | G | — |
| Álbum de fotos | P | — |

**En móvil**: el control de movimiento puede ser un **joystick analógico** (por defecto) o una **cruceta de 4 botones**. Se cambia desde Opciones en el menú principal.

**En combate:**

| Acción | Teclado |
|---|---|
| Elegir opción | Flechas ← → |
| Confirmar acción | E o Enter |

**Dentro del inventario:**

| Acción | Teclado |
|---|---|
| Navegar slots | Flechas o WASD |
| Usar objeto | E o Enter |
| Cerrar inventario | I o Q |

## Estructura del Proyecto

```
arclycee/
├── index.html              ← Punto de entrada del juego
├── docs/
│   ├── index.html          ← Documentación completa (ES)
│   ├── en.html             ← Documentación completa (EN)
│   ├── fr.html             ← Documentación completa (FR)
│   ├── characters.html     ← Personajes: NPCs y equipo (ES/EN/FR)
│   ├── technical.html      ← Referencia técnica con visor de código (ES/EN/FR)
│   ├── source-viewer.js    ← Visor de código fuente con syntax highlighting
│   ├── tech-diagrams.js    ← 10 diagramas SVG técnicos con i18n (ES/EN/FR)
│   ├── world-previews.js   ← Renders Canvas 2D animados de los 9 mundos
│   └── ...                 ← Mundos, mecánicas, diálogos (ES/EN/FR)
├── estilos/
│   └── principal.css       ← Estilos del juego
├── js/
│   ├── motor/              ← Motor del juego (loop, render, input, audio, save)
│   ├── escenas/            ← Pantallas (menú, selección, intro)
│   ├── mundos/             ← Niveles y mapas del mundo
│   │   ├── mapa-tiles.js   ← Bitmap de la isla trazado desde referencia (128×68 tiles)
│   │   ├── mapa-principal.js ← Mapa del mundo con cámara y colisiones
│   │   ├── taino/          ← Mundo Taíno (Cuevas, Asentamiento I y II)
│   │   ├── colonial/       ← Mundo Colonial (La Isabela, Zona Colonial)
│   │   ├── acuatico/       ← Mundo Acuático (Naufragio de la Santa María)
│   │   ├── juridico/       ← Mundo Jurídico (Aeropuerto de Punta Cana)
│   │   ├── laboratorio/    ← Mundo Laboratorio (Museo Atarazanas Reales)
│   │   └── lfsd/           ← LFSD (Liceo Francés — misiones secundarias)
│   ├── personajes/         ← Pepito/a y compañeros
│   │   └── companeros/     ← Magnoboot, Viralata, Cemí
│   ├── mecanicas/          ← Combate, diálogos, inventario, batú, misiones
│   ├── clima/              ← Sistema de clima y huracanes
│   ├── idiomas/            ← Traducciones ES/FR/EN
│   ├── mapas/              ← Mapa de referencia con LeafletJS
│   │   ├── mapa-leaflet.js ← Orquestador del mapa de referencia
│   │   └── referencia/     ← Módulos del mapa real (capas, marcadores, transiciones)
│   ├── misiones/           ← Sistema de quests y easter eggs
│   └── utilidades/         ← Funciones de matemáticas y colisiones
├── assets/                 ← Sprites, tiles, sonidos, música (por generar)
├── datos/
│   └── instrucciones-assets.md  ← Prompts para generar arte con IA
└── resources/
    ├── idea-original.md    ← Documento de diseño del juego
    ├── image-prompts.md    ← Prompts para generar logo y poster con IA
    ├── arclycee-logo.png   ← Logo del juego (transparente)
    ├── favicon.ico          ← Favicon del juego (16+32+48px)
    ├── favicon-32.png       ← Favicon PNG 32x32
    ├── apple-touch-icon.png ← Ícono para iOS 180x180
    ├── og-share.png         ← Imagen para redes sociales 192x192
    ├── artes/               ← Hero images, logo original, favicon original
    ├── music/               ← 30 pistas MP3 (2 por escenario, 15 grupos)
    └── music-prompts.md     ← Prompts de Suno para generar la música
```

## Audio

### Música de fondo
El juego incluye 15 temas musicales (30 pistas MP3, 2 variantes por escenario) en `resources/music/`. El sistema `js/motor/musica.js` alterna las 2 pistas de cada grupo en loop con crossfade suave de 2 segundos. Combate y batú hacen override temporal de la música del mundo. El volumen se ajusta desde el menú de opciones y se guarda en localStorage.

### Efectos de sonido
El juego genera 60+ efectos de sonido proceduralmente usando la Web Audio API — no necesita archivos de audio. Los sonidos se crean automáticamente al saltar, aterrizar, caminar, recoger objetos y descubrir petroglifos.

**Nota**: El navegador bloquea el audio hasta la primera interacción del usuario (click o tecla). La música y los sonidos comienzan al presionar la primera tecla en el menú.

## Generar Assets

No hay sprites incluidos todavía — el juego usa placeholders programáticos detallados. Para generar arte:

1. Lee `datos/instrucciones-assets.md`
2. Usa los prompts con MidJourney o Nano Banana Pro para sprites
3. Usa Suno AI para música
4. Coloca los archivos en las carpetas indicadas en el documento
