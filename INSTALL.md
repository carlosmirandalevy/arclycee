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
├── index.html              ← Punto de entrada
├── estilos/
│   └── principal.css       ← Estilos del juego
├── js/
│   ├── motor/              ← Motor del juego (loop, render, input, audio, save)
│   ├── escenas/            ← Pantallas (menú, selección, intro)
│   ├── mundos/             ← Niveles y mapas del mundo
│   │   ├── taino/          ← Mundo Taíno (Cuevas, Asentamiento I y II)
│   │   └── colonial/       ← Mundo Colonial (La Isabela)
│   ├── personajes/         ← Pepito/a y compañeros
│   │   └── companeros/     ← Magnoboot, Viralata, Cemí
│   ├── mecanicas/          ← Combate, diálogos, inventario, misiones
│   ├── clima/              ← Sistema de clima y huracanes
│   ├── idiomas/            ← Traducciones ES/FR/EN
│   ├── mapas/              ← Integración LeafletJS
│   ├── misiones/           ← Sistema de quests y easter eggs
│   └── utilidades/         ← Funciones de matemáticas y colisiones
├── assets/                 ← Sprites, tiles, sonidos, música (por generar)
├── datos/
│   └── instrucciones-assets.md  ← Prompts para generar arte con IA
└── resources/
    └── idea-original.md    ← Documento de diseño del juego
```

## Audio

El juego genera efectos de sonido proceduralmente usando la Web Audio API — no necesita archivos de audio. Los sonidos se crean automáticamente al saltar, aterrizar, caminar, recoger objetos y descubrir petroglifos. También hay goteos de agua ambientales.

**Nota**: El navegador bloquea el audio hasta la primera interacción del usuario (click o tecla). Una vez que presionas cualquier tecla, los sonidos comenzarán a funcionar.

## Generar Assets

No hay sprites incluidos todavía — el juego usa placeholders programáticos detallados. Para generar arte:

1. Lee `datos/instrucciones-assets.md`
2. Usa los prompts con MidJourney o Nano Banana Pro para sprites
3. Usa Suno AI para música
4. Coloca los archivos en las carpetas indicadas en el documento
