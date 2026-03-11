# Instrucciones para Generar Assets del Juego

## Tabla de Resoluciones Oficial

| Elemento | Tamaño | Referencia en código |
|---|---|---|
| Jugador (Pepito/Pepita) | 32x32 px | `TAMANO_SPRITES.JUGADOR` |
| Compañeros (Magnoboot, Viralata) | 24x24 px | `TAMANO_SPRITES.COMPANERO` |
| Cemí Murciélago | 16x16 px | `TAMANO_SPRITES.CEMI` |
| NPCs | 32x32 px | `TAMANO_SPRITES.NPC` |
| Bosses | 64x64 px | `TAMANO_SPRITES.BOSS` |
| Bosses especiales | 96x96 px | `TAMANO_SPRITES.BOSS_GRANDE` |
| Items / Iconos inventario | 16x16 px | `TAMANO_SPRITES.ITEM` |
| Petroglifos taínos | 48x48 px | `TAMANO_SPRITES.PETROGLIFO` |
| Tiles (cueva, suelo, paredes) | 32x32 px | `TAMANO_SPRITES.TILE` |

Todas las resoluciones están definidas en `js/motor/configuracion.js` → `TAMANO_SPRITES`.

---

## Sprites del Jugador (Pepito/Pepita) — 32x32

### Con MidJourney
```
Pixel art character sprite sheet, 32x32 pixels per frame, 14-year-old
Dominican boy/girl, mixed Taíno-Spanish-African heritage, medium brown
skin, dark curly hair, blue outfit (boy) / purple outfit (girl),
4 directions (front, back, left, right), 3 frames walking animation
each direction, retro 2D RPG style like Stardew Valley,
transparent background --ar 4:1 --s 250
```

### Con Nano Banana Pro
Usa el mismo prompt pero ajusta al formato de la herramienta.

### Ubicación de archivos
- `assets/sprites/pepito/` — Sprites de Pepito
- `assets/sprites/pepita/` — Sprites de Pepita (misma estructura, diferente color)

Cada sprite sheet debe tener:
- **caminar-abajo.png** (3 frames de 32x32 = imagen de 96x32)
- **caminar-arriba.png** (3 frames)
- **caminar-izquierda.png** (3 frames)
- **caminar-derecha.png** (3 frames)
- **quieto.png** (1 frame, 32x32)

---

## Tiles de Cueva — 32x32

### Prompt para MidJourney
```
Pixel art tileset, cave environment, 32x32 tiles, dark brown stone
walls, stalactites, stalagmites, rocky platforms, underground atmosphere,
Dominican cave system like Cuevas del Pomier, retro 2D platformer style,
tileable, transparent background --ar 1:1 --s 200
```

### Tiles necesarios (colocar en `assets/tiles/cueva/`)
- **piedra.png** (32x32) — Bloque sólido de piedra
- **piedra-superficie.png** (32x32) — Superficie de plataforma (con musgo)
- **piedra-fondo.png** (32x32) — Pared del fondo de la cueva
- **estalactita.png** (32x32) — Estalactita colgando del techo
- **estalagmita.png** (32x32) — Estalagmita en el suelo
- **agua.png** (64x32) — Charco de agua (2 frames de animación)

---

## Petroglifos Taínos — 48x48

Los petroglifos son más grandes que los tiles normales para que los
jugadores puedan apreciar el detalle del arte taíno real.

### Prompt para MidJourney
```
Pixel art Taíno petroglyphs, 48x48 pixels each, ancient Dominican cave
art, carved in dark stone, each symbol separate: sun face with rays,
bat spirit cemí with spread wings, spiral water symbol, frog fertility
symbol, human face ceremonial mask, warm earth tones with gold outlines,
pixel art style --s 150
```

### Archivos (colocar en `assets/sprites/objetos/petroglifos/`)
- **petroglifo-sol.png** (48x48) — Sol taíno
- **petroglifo-murcielago.png** (48x48) — Cemí murciélago
- **petroglifo-espiral.png** (48x48) — Espiral de agua
- **petroglifo-rana.png** (48x48) — Rana (fertilidad)
- **petroglifo-cara.png** (48x48) — Rostro/máscara ceremonial

---

## Compañeros

### Magnoboot (Robot Excavador) — 24x24
```
Pixel art small excavation robot, 24x24 pixels per frame, silver/gray
body, red antenna on top, cyan LED eyes, mechanical drill arm, friendly
cute appearance, 4 directions sprite sheet, retro game style like
Stardew Valley --ar 4:1 --s 200
```
Colocar en `assets/sprites/companeros/magnoboot/`

### Viralata (Perro Callejero) — 24x24
```
Pixel art small street dog, 24x24 pixels per frame, brown mutt with
floppy ears, friendly expression, wagging tail animation, Dominican
stray dog, 4 directions walking, retro 2D RPG style --ar 4:1 --s 200
```
Colocar en `assets/sprites/companeros/viralata/`

### Cemí Murciélago (Espíritu) — 16x16
```
Pixel art spirit bat, 16x16 pixels, glowing purple ethereal bat ghost,
Taíno cemí spirit, translucent with magical particles, 2 frames flapping
wings animation, small mystical creature, retro game style --ar 2:1 --s 200
```
Colocar en `assets/sprites/companeros/cemi/`

---

## NPCs — 32x32

### Prompt general para NPCs
```
Pixel art NPC character, 32x32 pixels, [DESCRIPCION], retro 2D RPG
style, transparent background --s 200
```

Reemplazar [DESCRIPCION] con:
- **Abuelo español:** elderly European man, white beard, warm smile, explorer hat
- **Abuela francesa:** elegant elderly French woman, silver hair, kind eyes
- **Espíritu tatárabuela taína:** ethereal indigenous woman, translucent glowing, feather headdress
- **Espíritu tatarabuelo africano:** ethereal African elder, translucent glowing, wise expression
- **Señor Avaro:** wealthy greedy businessman, gold rings, expensive suit, suspicious expression
- **Chica con patines:** cool 16-year-old girl, roller skates, messenger bag, headphones
- **Guía con Internet:** modern young adult, tablet in hand, glasses, tech-savvy look
- **Arqueólogo:** field researcher, khaki outfit, magnifying glass, notebook

Colocar en `assets/sprites/npcs/`

---

## Bosses — 64x64

### Prompt para bosses
```
Pixel art boss character, 64x64 pixels, [DESCRIPCION], imposing
presence, detailed, retro 2D RPG boss style, transparent background --s 250
```

Reemplazar [DESCRIPCION] con:
- **Jefe Saqueador:** masked treasure thief, dark cloak, stolen artifacts visible
- **Constructor Corrupto:** angry construction foreman, hard hat, demolition equipment
- **Traficante de Reliquias:** shady dealer, trench coat, fake artifacts
- **Político Corrupto:** smug politician, expensive suit, briefcase full of money

Colocar en `assets/sprites/enemigos/bosses/`

---

## Objetos Coleccionables — 16x16

### Prompt general
```
Pixel art item icons, 16x16 pixels each, archaeological tools and
artifacts on transparent background, retro RPG inventory style:
flashlight, compass, Swiss army knife, ancient scroll map, magnetometer
device, golden Taíno artifact, clay pot (botija) --ar 7:1 --s 200
```

### Archivos (colocar en `assets/sprites/objetos/`)
- **linterna.png** (16x16)
- **brujula.png** (16x16)
- **navaja.png** (16x16)
- **mapa-antiguo.png** (16x16)
- **magnetometro.png** (16x16)
- **artefacto-taino.png** (16x16)
- **botija.png** (16x16)

---

## Easter Eggs (Items Especiales) — 16x16

```
Pixel art special unique items, 16x16 pixels each, transparent background,
retro RPG style, each with distinct glow or particle effect: golden
back-scratcher spoon, supersonic glowing french fries, perfectly preserved
shawarma wrap, ancient lightsaber hilt, magical laughing sushi roll,
epic golden guitar, smart glowing handball, legendary perfect hamburger
--ar 8:1 --s 200
```

### Archivos (colocar en `assets/sprites/objetos/easter-eggs/`)
- **cuchara-elian.png** (16x16) — Cuchara dorada mística
- **papas-theo.png** (16x16) — Papas fritas supersónicas
- **shawarma-carlos.png** (16x16) — Shawarma arqueológico
- **sable-jules.png** (16x16) — Sable de luz antiguo
- **sushi-alberto.png** (16x16) — Sushi del bromista
- **guitarra-rafael.png** (16x16) — Guitarra épica
- **balon-tom.png** (16x16) — Balón inteligente
- **hamburguesa-nael.png** (16x16) — Hamburguesa legendaria

---

## Música y Sonidos

### Música (colocar en `assets/musica/`)
Herramientas recomendadas: **Suno AI**, **AIVA**, **Soundraw**

| Archivo | Descripción | Prompt sugerido |
|---|---|---|
| menu.mp3 | Menú principal | "Mysterious yet warm Caribbean-inspired ambient music, soft marimba, ocean breeze, 90 BPM, loop" |
| cueva.mp3 | Cuevas del Pomier | "Dark cave ambient music, water drips echo, mysterious wind, subtle tribal drums, tense exploration, loop" |
| mapa.mp3 | Mapa del mundo | "Adventurous Caribbean exploration theme, upbeat merengue-inspired RPG overworld music, 120 BPM, loop" |
| combate.mp3 | Encuentros | "Tense but playful RPG battle music, Caribbean percussion, building intensity, 140 BPM, loop" |
| victoria.mp3 | Victoria | "Short triumphant RPG victory fanfare, 5 seconds, brass and steel drums, celebratory" |

### Efectos de sonido (colocar en `assets/sonidos/`)
Herramienta recomendada: **jsfxr.app** (gratis, en el navegador)

- **saltar.wav** — Preset "Jump" en jsfxr
- **recoger.wav** — Preset "Pickup/Coin" en jsfxr
- **dialogo.wav** — Preset "Blip/Select" con tono bajo
- **menu-navegar.wav** — Preset "Blip/Select" con tono alto
- **menu-seleccionar.wav** — Preset "Powerup" corto
- **paso-cueva.wav** — Preset "Hit/Hurt" con volumen bajo y tono grave
- **agua-gota.wav** — Preset "Blip/Select" con decay largo
- **descubrimiento.wav** — Preset "Powerup" con reverb largo
