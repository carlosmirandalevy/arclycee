# ArcLycée — Aventura Arqueológica Dominicana

Un videojuego RPG 2D educativo para explorar el patrimonio arqueológico de la República Dominicana. Creado por la clase de Robótica del Liceo Francés de Santo Domingo — 2026.

## El Juego

Juegas como Pepito o Pepita, un/a joven de 14 años con ascendencia taína, española y africana. Tras descubrir una reliquia misteriosa en una obra de construcción, caes en las Cuevas del Pomier y comienzas una aventura a través de 5 mundos interconectados: Taíno, Colonial, Acuático, Jurídico y Laboratorio/Museo.

### Características

- **RPG 2D** con vista top-down y secciones de plataforma (cuevas, museos)
- **Ruta pacifista**: resuelve conflictos convenciendo al oponente — sin necesidad de pelear
- **Activismo ciudadano**: combate contra Constructor Méndez con redes sociales, protestas, denuncias y vías legales
- **Control ecológico**: combate contra el pez león invasor con captura, pesca, protección de coral y alertas a buzos
- **Justicia patrimonial**: combate legal contra el traficante Rodrigo Torres con Ley 318, evidencia forense, INTERPOL y UNESCO 1970
- **3 idiomas**: Español, Français, English
- **Mapa de isla con tiles**: mapa procedural de La Hispaniola con 8 tipos de terreno, cámara libre, colisiones y mini-mapa
- **Mapa de referencia real** (tecla R): overlay LeafletJS con 7 capas de Stadia Maps (acuarela, terreno, tóner, oscuro, suave, OSM, Voyager), sitios arqueológicos reales y viaje interactivo
- **Créditos cinematográficos**: créditos estilo película tras el final con nombres del equipo y el Liceo Francés
- **Sistema de compañeros**: Magnoboot (robot excavador con detección de metal vía tecla F), Viralata (perro rastreador) y Cemí Murciélago (espíritu de cueva)
- **Sonidos procedurales**: efectos generados por código con Web Audio API (sin archivos de audio)
- **Diálogos narrativos**: sistema de diálogos con efecto máquina de escribir, opciones y traducción
- **NPCs mentores recurrentes**: Roberto Cassá (7 conversaciones de historia) y Lcda. Carmen Vidal (5 temas legales)
- **Guardia Presidencial**: cambio de guardia ceremonial animado en el Panteón Nacional
- **Inventario visual**: mochila de 20 slots con grilla navegable, íconos únicos y descripciones traducidas
- **Guardado automático**: el progreso se guarda al volver al mapa del mundo (localStorage)
- **Sprites de enemigos**: cada enemigo tiene su sprite único en combate (soldado, constructor, pez león, traficante)
- **Easter eggs** personalizados para cada miembro del equipo
- **Notificaciones toast**: mensajes flotantes no intrusivos al recoger objetos
- **Múltiples finales** (4) según tus decisiones: completo, museo, ecológico u oscuro
- **Sistema de clima**: sol, nubes, lluvia, tormenta, huracán y terremoto con partículas y efectos en jugador
- **Desktop y móvil** con controles táctiles virtuales (joystick analógico o cruceta, configurable desde Opciones)

### Mundos

| Mundo | Descripción |
|---|---|
| Taíno | Cuevas del Pomier, Asentamiento I (aldea con bohíos), Asentamiento II (agricultura y areíto) |
| Colonial | La Isabela (primer asentamiento europeo), Zona Colonial de Santo Domingo (Patrimonio UNESCO, Museo de la Catedral, combate con Constructor Méndez, Panteón Nacional con cambio de guardia, Reloj de Sol, Roberto Cassá como mentor) |
| Acuático | Naufragio de La Pinta (exploración submarina), fauna marina educativa (tortuga carey nadadora), medusas como peligros pasivos (daño + lentitud), combate ecológico contra pez león (atrapar, pescar, proteger coral, alertar buzos), arqueóloga submarina con mapa de naufragios |
| Jurídico | Aeropuerto Internacional de Punta Cana (interior), red de tráfico de artefactos, combate legal contra traficante (Ley 318, evidencia forense, INTERPOL, UNESCO 1970), mentora Lcda. Carmen Vidal con 5 temas legales rotativos |
| Laboratorio | Museo de las Atarazanas Reales (autenticación por C-14, restauración reversible, museología), Dr. Morbán, Dra. López, Restauradora Ana, Roberto Cassá mentor, Visitante Sospechoso con falsificaciones |

## Tecnologías

- **HTML5 Canvas + JavaScript vanilla** — código legible y educativo
- **Web Audio API** — sonidos procedurales generados por código (salto, pasos, goteo, acordes)
- **Kaplay.js** — solo para touch input
- **LeafletJS** — mapas interactivos con sitios arqueológicos reales
- **CSS3** — estilos responsivos para desktop y móvil

## Equipo

Elian · Théo · Carlos Guillermo · Jules · Alberto · Rafael · Tom · Nael

## Documentación

Disponible en 3 idiomas: [`docs.html`](docs.html) (ES), [`docs-en.html`](docs-en.html) (EN), [`docs-fr.html`](docs-fr.html) (FR). También accesible desde el menú principal del juego (opción "Documentación").

## Licencia

Proyecto educativo del Liceo Francés de Santo Domingo.
