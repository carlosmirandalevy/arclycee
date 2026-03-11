# Changelog

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
