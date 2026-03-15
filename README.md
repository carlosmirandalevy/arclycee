# ArcLycée — Aventura Arqueológica Dominicana

Un videojuego RPG 2D educativo para explorar el patrimonio arqueológico de la República Dominicana. Creado por la clase de Robótica del Liceo Francés de Santo Domingo — 2026.

## El Juego

Juegas como Pepito o Pepita, un/a joven de 14 años con ascendencia taína, española y africana. Tras descubrir una reliquia misteriosa en una obra de construcción, caes en las Cuevas del Pomier y comienzas una aventura a través de 9 mundos interconectados: Taíno (3 niveles), Colonial (2), Acuático (2), Jurídico, Laboratorio y LFSD.

### Características

- **RPG 2D** con vista top-down y secciones de plataforma (cuevas, museos)
- **Ruta pacifista**: resuelve conflictos convenciendo al oponente — sin necesidad de pelear
- **Activismo ciudadano**: combate contra Constructor Méndez con redes sociales, protestas, denuncias y vías legales
- **Control ecológico**: combate contra el pez león invasor con captura, pesca, protección de coral y alertas a buzos
- **Justicia patrimonial**: combate legal contra el traficante Rodrigo Torres con Ley 318, evidencia forense, INTERPOL y UNESCO 1970
- **3 idiomas completos**: Español, Français, English — toda la interfaz, controles, combate, cinemáticas, mini-juegos y toasts traducidos (~130 claves UI)
- **Mapa de isla con tiles**: bitmap de 128×68 tiles trazado desde imagen de referencia, con 8 tipos de terreno, 8 cordilleras, 5 ríos, 2 lagos, cámara libre con zoom (0.25×-3×), drag táctil/ratón y colisiones
- **Mapa de referencia real** (tecla R): overlay LeafletJS con 7 capas de Stadia Maps y 4 capas de datos: 16 sitios taínos, 8 sitios coloniales, 12 naufragios históricos y 30 museos a lo largo de toda La Hispaniola (RD + Haití)
- **Créditos cinematográficos**: créditos estilo película tras el final con nombres del equipo y el Liceo Francés
- **Sistema de compañeros**: Magnoboot (robot excavador con detección de metal vía tecla F), Viralata (perro rastreador) y Cemí Murciélago (espíritu de cueva)
- **Sonidos procedurales**: efectos generados por código con Web Audio API (sin archivos de audio)
- **Diálogos narrativos**: sistema de diálogos con efecto máquina de escribir, opciones y traducción
- **NPCs mentores recurrentes**: Roberto Cassá (7 conversaciones de historia) y Lcda. Carmen Vidal (5 temas legales)
- **Guardia Presidencial**: cambio de guardia ceremonial animado en el Panteón Nacional
- **Inventario visual**: mochila de 20 slots con grilla navegable, íconos únicos, descripciones traducidas y objetos usables (curación desde inventario con E)
- **Sistema de curación**: el Behique Yuisa cura completamente al jugador, Guarionex da hojas de guanábana (+30 vida) y Anacaona da vasija curativa (+35 vida) — objetos usables desde el inventario en cualquier momento
- **Guardado automático**: el progreso se guarda al volver al mapa del mundo (localStorage)
- **Sprites de enemigos**: cada enemigo tiene su sprite único en combate (soldado, constructor, pez león, traficante)
- **Mini-juego de batú**: juego de pelota taíno con física 2D, golpes por cadera/hombro/cabeza/rodilla, IA vencible, datos educativos entre puntos
- **Easter eggs** personalizados para cada miembro del equipo
- **Notificaciones toast**: mensajes flotantes no intrusivos al recoger objetos
- **Múltiples finales** (5) según tus decisiones: completo, pacifista, museo, ecológico u oscuro
- **Sistema de clima**: sol, nubes, lluvia, tormenta, huracán y terremoto con partículas, efectos en jugador y sonido ambiental (lluvia continua, truenos)
- **Álbum de fotos**: toma fotos y selfies de NPCs, petroglifos y objetos — las fotos renderizan solo el sprite del NPC/objeto centrado sobre fondo oscuro (bloque cuadrado), las selfies muestran al NPC y al jugador lado a lado (rectángulo vertical). Sin capturas de pantalla
- **Misiones secundarias**: 5 sidequests: batú (pelota taína), rescate del manatí, y 3 del LFSD (calibración de señal, programación de robot, conexión de cables) con mini-juegos únicos
- **Registro de juego**: Game Log con tecla L, pestañas de misiones principales y secundarias
- **Sistema de reputación**: puntuación 0-100 que afecta combates y diálogos
- **Desktop y móvil** con controles táctiles virtuales (joystick analógico o cruceta, configurable desde Opciones), touch/pinch zoom en mapa

### Mundos

| Mundo | Descripción |
|---|---|
| Taíno | Cuevas del Pomier, Asentamiento I (aldea con bohíos, vasija curativa de Anacaona), Asentamiento II (agricultura, areíto, mini-juego de batú, curación del Behique, guanábana de Guarionex) |
| Colonial | La Isabela (primer asentamiento europeo), Zona Colonial de Santo Domingo (Patrimonio UNESCO, Museo de la Catedral, combate con Constructor Méndez, Panteón Nacional con cambio de guardia, Reloj de Sol, Roberto Cassá como mentor) |
| Acuático | Naufragio de la Santa María (la nave capitana de Colón, encallada cerca de Cap-Haïtien en Nochebuena de 1492), fauna marina educativa (tortuga carey nadadora), medusas como peligros pasivos (daño + lentitud), combate ecológico contra pez león, Santuario del Manatí (liberar manatí, limpiar arrecife, tiburones patrulleros) |
| Jurídico | Aeropuerto Internacional de Punta Cana (interior), red de tráfico de artefactos, combate legal contra traficante (Ley 318, evidencia forense, INTERPOL, UNESCO 1970), mentora Lcda. Carmen Vidal con 5 temas legales rotativos |
| Laboratorio | Museo de las Atarazanas Reales (autenticación por C-14, restauración reversible, museología), Dr. Morbán, Dra. López, Restauradora Ana, Roberto Cassá mentor, Visitante Sospechoso con falsificaciones |
| LFSD | Liceo Francés de Santo Domingo — aula de robótica con Prof. Nicolas Droulers y 8 NPCs estudiantes, 3 misiones secundarias con mini-juegos (calibración, programación de robot, conexión de cables) |

## Tecnologías

- **HTML5 Canvas + JavaScript vanilla** — código legible y educativo
- **Web Audio API** — sonidos procedurales generados por código (salto, pasos, goteo, acordes)
- **Kaplay.js** — solo para touch input
- **LeafletJS** — mapas interactivos con sitios arqueológicos reales
- **CSS3** — estilos responsivos para desktop y móvil

## Equipo

Elian · Théo · Carlos Guillermo · Jules · Alberto · Rafael · Tom · Nael

## Documentación

Disponible en 3 idiomas: [`docs/index.html`](docs/index.html) (ES), [`docs/en.html`](docs/en.html) (EN), [`docs/fr.html`](docs/fr.html) (FR). También accesible desde el menú principal del juego (opción "Documentación").

La documentación incluye una página de **Characters** con todos los NPCs y miembros del equipo: [`docs/characters.html`](docs/characters.html) (ES), [`docs/characters-en.html`](docs/characters-en.html) (EN), [`docs/characters-fr.html`](docs/characters-fr.html) (FR).

## Licencia

Proyecto educativo del Liceo Francés de Santo Domingo.
