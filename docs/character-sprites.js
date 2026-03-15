/**
 * character-sprites.js — Renderizador de sprites de personajes en pixel art
 *
 * Este script busca elementos con clase "npc-avatar" y atributo "data-sprite",
 * y reemplaza su contenido (emoji) con un <canvas> que dibuja el sprite
 * del personaje en pixel art.
 *
 * Se usa en las páginas de documentación para mostrar los avatares de los
 * personajes del juego ArcLycée.
 *
 * Creado por les fous du robot — Liceo Francés de Santo Domingo, 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    // Buscar todos los elementos con clase npc-avatar y atributo data-sprite
    const avatares = document.querySelectorAll('.npc-avatar[data-sprite]');

    avatares.forEach(elemento => {
        const tipoSprite = elemento.getAttribute('data-sprite');
        const info = obtenerInfoSprite(tipoSprite);

        if (!info) return; // Si no reconocemos el sprite, dejamos el emoji

        // Crear el canvas con el tamaño apropiado
        const canvas = document.createElement('canvas');
        canvas.width = info.ancho;
        canvas.height = info.alto;

        // Estilo para pixel art nítido (sin suavizado)
        canvas.style.imageRendering = 'pixelated';
        canvas.style.width = info.ancho + 'px';
        canvas.style.height = info.alto + 'px';

        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;

        // Dibujar el sprite correspondiente
        info.dibujar(ctx, info.ancho, info.alto);

        // Reemplazar el contenido del elemento con el canvas
        elemento.textContent = '';
        elemento.appendChild(canvas);
    });
});


// ============================================================
// INFORMACIÓN DE CADA SPRITE
// ============================================================

/**
 * Devuelve un objeto con { ancho, alto, dibujar } para cada tipo de sprite.
 * ancho/alto son las dimensiones del canvas.
 * dibujar(ctx, ancho, alto) es la función que pinta el sprite.
 */
function obtenerInfoSprite(tipo) {
    // Mapa de sprites humanoides simples (solo cambian color de cuerpo)
    const estudiantesSimples = {
        'emile':     '#4488ff',
        'lucas':     '#ff8844',
        'theo':      '#ffcc00',
        'nael':      '#cc44cc',
        'jules':     '#44cccc',
        'alberto':   '#66aa66',
        'elian':     '#cc4444',
        'tom':       '#4466aa',
    };

    if (estudiantesSimples[tipo]) {
        return spriteHumanoide((ctx) => {
            // Estudiantes: cuerpo de color, pelo estándar
            dibujarBaseHumanoide(ctx, {
                colorCuerpo: estudiantesSimples[tipo],
            });
        });
    }

    // Diana (sofia-lfsd): delgada, piel clara, pelo rubio largo rizado
    if (tipo === 'sofia-lfsd' || tipo === 'diana') {
        return spriteHumanoide((ctx) => {
            dibujarBaseHumanoide(ctx, {
                colorCuerpo: '#44aa44',
                colorPiel: '#F5DEB3',
                colorPelo: '#E8C84A',
                anchoPelo: 20,
                alturaPelo: 6,
            });
            // Cuerpo más delgado: cubrir los bordes con fondo
            ctx.fillStyle = 'rgba(0,0,0,0)';
            ctx.clearRect(-10, -8, 2, 16);
            ctx.clearRect(8, -8, 2, 16);
            // Pelo largo a los lados (llega hasta la cintura)
            ctx.fillStyle = '#E8C84A';
            ctx.fillRect(-11, -18, 4, 24);
            ctx.fillRect(7, -18, 4, 24);
            // Rizos: pequeños píxeles que sobresalen
            ctx.fillRect(-13, -8, 2, 3);
            ctx.fillRect(11, -8, 2, 3);
            ctx.fillRect(-12, 0, 2, 3);
            ctx.fillRect(10, 0, 2, 3);
        });
    }

    // Rafael: piel clara, pelo castaño claro, delgado
    if (tipo === 'rafael') {
        return spriteHumanoide((ctx) => {
            dibujarBaseHumanoide(ctx, {
                colorCuerpo: '#cc6644',
                colorPiel: '#F5DEB3',
                colorPelo: '#A0784C',
            });
            // Cuerpo más delgado: recortar bordes
            ctx.clearRect(-10, -8, 2, 16);
            ctx.clearRect(8, -8, 2, 16);
        });
    }

    // Carlos Guillermo: piel clara, pelo largo castaño oscuro, gafas azul oscuro
    if (tipo === 'carlos-g') {
        return spriteHumanoide((ctx) => {
            dibujarBaseHumanoide(ctx, {
                colorCuerpo: '#4488DD',
                colorPiel: '#F5DEB3',
                colorPelo: '#3B2314',
                anchoPelo: 20,
                alturaPelo: 6,
            });
            // Pantalones naranjas (cubrir piernas azules por defecto)
            ctx.fillStyle = '#DD7722';
            ctx.fillRect(-7, 8, 7, 8);
            ctx.fillRect(0, 8, 7, 8);
            // Pelo largo a los lados (llega hasta los hombros)
            ctx.fillStyle = '#3B2314';
            ctx.fillRect(-11, -18, 4, 20);
            ctx.fillRect(7, -18, 4, 20);
            // Gafas de marco azul oscuro
            ctx.strokeStyle = '#1a2a5a';
            ctx.lineWidth = 1.2;
            ctx.strokeRect(-7, -8, 5, 5);
            ctx.strokeRect(2, -8, 5, 5);
            // Puente
            ctx.beginPath();
            ctx.moveTo(-2, -6);
            ctx.lineTo(2, -6);
            ctx.stroke();
        });
    }

    // Prof. Nicolas Droulers: delgado, pelo blanco, barba blanca, camisa azul LFSD
    if (tipo === 'profesor') {
        return spriteHumanoide((ctx) => {
            dibujarBaseHumanoide(ctx, {
                colorCuerpo: '#2255AA',
                colorPelo: '#EEEEEE',
                alturaPelo: 5,
            });
            // Cuerpo más delgado: recortar bordes
            ctx.clearRect(-10, -8, 2, 16);
            ctx.clearRect(8, -8, 2, 16);
            // Barba blanca debajo de la cara
            ctx.fillStyle = '#DDDDDD';
            ctx.fillRect(-5, 0, 10, 5);
            // Forma redondeada inferior de la barba
            ctx.fillRect(-3, 5, 6, 2);
            // Sonrisa (siempre sonriente)
            ctx.strokeStyle = '#8a5a3a';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(0, -1, 4, 0.1, Math.PI - 0.1);
            ctx.stroke();
        });
    }

    // Sprites específicos de cada personaje
    switch (tipo) {

        // ---- JUGADOR ----
        case 'pepito':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#4488ff',
                    alturaPelo: 6,
                });
            });

        case 'pepita':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#aa44ff',
                    colorPelo: '#1a0a00',
                    anchoPelo: 20,
                    alturaPelo: 6,
                });
                // Trenzas laterales
                ctx.fillStyle = '#1a0a00';
                ctx.fillRect(-10, -7, 4, 10); // trenza izquierda
                ctx.fillRect(6, -7, 4, 10);   // trenza derecha
            });

        // ---- COMPAÑEROS ----
        case 'magnoboot':
            return {
                ancho: 48, alto: 64,
                dibujar: (ctx) => {
                    ctx.imageSmoothingEnabled = false;
                    ctx.translate(24, 36);
                    const s = 1.5; // escala
                    ctx.scale(s, s);

                    // Sombra
                    dibujarSombra(ctx);

                    // Cuerpo plateado
                    ctx.fillStyle = '#b0b0b0';
                    ctx.fillRect(-10, -12, 20, 24);

                    // Antena
                    ctx.strokeStyle = '#808080';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(0, -12);
                    ctx.lineTo(10, -20);
                    ctx.stroke();

                    // Bolita roja de la antena
                    ctx.fillStyle = '#ff4444';
                    ctx.beginPath();
                    ctx.arc(10, -20, 3, 0, Math.PI * 2);
                    ctx.fill();

                    // Ojos cian
                    ctx.fillStyle = '#44ffff';
                    ctx.fillRect(-6, -6, 4, 4);
                    ctx.fillRect(2, -6, 4, 4);
                },
            };

        case 'viralata':
            return {
                ancho: 64, alto: 48,
                dibujar: (ctx) => {
                    ctx.imageSmoothingEnabled = false;
                    ctx.translate(32, 28);
                    const s = 1.5;
                    ctx.scale(s, s);

                    // Sombra
                    dibujarSombra(ctx);

                    // Cuerpo marrón
                    ctx.fillStyle = '#8B4513';
                    ctx.fillRect(-11, -7, 22, 14);

                    // Cabeza
                    ctx.fillStyle = '#A0522D';
                    ctx.fillRect(-16, -10, 10, 12);

                    // Ojo
                    ctx.fillStyle = '#000';
                    ctx.fillRect(-14, -7, 2, 2);

                    // Nariz
                    ctx.fillStyle = '#333';
                    ctx.fillRect(-17, -4, 2, 2);

                    // Orejas
                    ctx.fillStyle = '#6B3410';
                    ctx.fillRect(-16, -15, 5, 5);
                    ctx.fillRect(-8, -15, 5, 5);

                    // Patas delanteras
                    ctx.fillStyle = '#6B3410';
                    ctx.fillRect(-10, 7, 4, 5);
                    ctx.fillRect(-2, 7, 4, 5);

                    // Patas traseras
                    ctx.fillRect(4, 7, 4, 5);

                    // Cola
                    ctx.strokeStyle = '#8B4513';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(11, -4);
                    ctx.lineTo(16, -8);
                    ctx.stroke();
                },
            };

        case 'cemi':
            return {
                ancho: 64, alto: 48,
                dibujar: (ctx) => {
                    ctx.imageSmoothingEnabled = false;
                    ctx.translate(32, 26);
                    const s = 1.5;
                    ctx.scale(s, s);

                    // Sombra
                    dibujarSombra(ctx);

                    // Cuerpo (círculo púrpura)
                    ctx.fillStyle = '#9c27b0';
                    ctx.beginPath();
                    ctx.arc(0, 0, 6, 0, Math.PI * 2);
                    ctx.fill();

                    // Ala izquierda (triángulo)
                    ctx.fillStyle = '#6a1b9a';
                    ctx.beginPath();
                    ctx.moveTo(0, 6);
                    ctx.lineTo(-10, 0);
                    ctx.lineTo(-3, 10);
                    ctx.closePath();
                    ctx.fill();

                    // Ala derecha (triángulo espejado)
                    ctx.beginPath();
                    ctx.moveTo(0, 6);
                    ctx.lineTo(10, 0);
                    ctx.lineTo(3, 10);
                    ctx.closePath();
                    ctx.fill();

                    // Ojos amarillos
                    ctx.fillStyle = '#ffff00';
                    ctx.fillRect(-4, -2, 2, 2);
                    ctx.fillRect(2, -2, 2, 2);
                },
            };

        // ---- CUEVAS DEL POMIER ----
        case 'dra-martinez':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#DDDDDD',
                    colorPiel: '#C8886A',
                    colorPelo: '#3A2010',
                });
                // Moño (bun) encima del pelo
                ctx.fillStyle = '#3A2010';
                ctx.fillRect(-4, -17, 8, 4);

                // Gafas
                ctx.strokeStyle = '#666666';
                ctx.lineWidth = 0.8;
                ctx.strokeRect(-6, -6, 4, 3);  // lente izquierdo
                ctx.strokeRect(2, -6, 4, 3);   // lente derecho
                // Puente de las gafas
                ctx.beginPath();
                ctx.moveTo(-2, -5);
                ctx.lineTo(2, -5);
                ctx.stroke();
            });

        // ---- ASENTAMIENTO TAÍNO I ----
        case 'cacique':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#DAA520',
                    colorPiel: '#C68642',
                });
                // Corona: 5 rectángulos dorados en la parte superior
                ctx.fillStyle = '#DAA520';
                for (let i = 0; i < 5; i++) {
                    ctx.fillRect(-8 + i * 4, -18, 3, 6);
                }
            });

        case 'anacaona':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#CD853F',
                    colorPiel: '#C68642',
                });
                // Olla de cerámica cerca del cuerpo
                ctx.fillStyle = '#B8860B';
                ctx.beginPath();
                ctx.arc(14, 3, 6, 0, Math.PI * 2);
                ctx.fill();
            });

        case 'caonabo':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#8B7355',
                    colorPiel: '#C68642',
                });
                // Caña de pescar (línea hacia arriba-derecha)
                ctx.strokeStyle = '#8B7355';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(12, -2);
                ctx.lineTo(18, -16);
                ctx.stroke();

                // Hilo de pesca (línea fina hacia abajo)
                ctx.strokeStyle = '#aaaaaa';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(18, -16);
                ctx.lineTo(18, 6);
                ctx.stroke();
            });

        // ---- ASENTAMIENTO TAÍNO II ----
        case 'behique':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#6B8E23',
                    colorPiel: '#C68642',
                });
                // Collar de huesos: 4 rectángulos blancos
                ctx.fillStyle = '#ffffff';
                for (let i = 0; i < 4; i++) {
                    ctx.fillRect(-7 + i * 4, -1, 3, 4);
                }
                // Pluma verde en el pelo
                ctx.fillStyle = '#4a8a23';
                ctx.fillRect(6, -18, 3, 8);
            });

        case 'guarionex':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#8B6914',
                    colorPiel: '#C68642',
                });
                // Coa (palo de cavar): línea hacia abajo con punta triangular
                ctx.strokeStyle = '#6B3410';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(14, -4);
                ctx.lineTo(16, 12);
                ctx.stroke();

                // Punta triangular de la coa
                ctx.fillStyle = '#6B3410';
                ctx.beginPath();
                ctx.moveTo(14, 12);
                ctx.lineTo(18, 12);
                ctx.lineTo(16, 16);
                ctx.closePath();
                ctx.fill();
            });

        case 'higuemota':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#B8860B',
                    colorPiel: '#C68642',
                });
                // Maraca: círculo con mango
                ctx.fillStyle = '#B8860B';
                ctx.beginPath();
                ctx.arc(16, -4, 6, 0, Math.PI * 2);
                ctx.fill();

                // Mango de la maraca
                ctx.strokeStyle = '#6B3410';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(16, 2);
                ctx.lineTo(16, 10);
                ctx.stroke();
            });

        // ---- LA ISABELA ----
        case 'soldado-diego':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#8B0000',
                });
                // Morión (casco español)
                ctx.fillStyle = '#808080';
                ctx.fillRect(-12, -16, 24, 8);

                // Espada
                ctx.strokeStyle = '#AAAAAA';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(-14, -2);
                ctx.lineTo(-14, 14);
                ctx.stroke();
                // Empuñadura dorada
                ctx.strokeStyle = '#DAA520';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(-17, -1);
                ctx.lineTo(-11, -1);
                ctx.stroke();
            });

        case 'fray-ramon':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#3a2a1a',
                });
                // Libro que sostiene
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(11, -2, 10, 14);
                // Páginas interiores
                ctx.fillStyle = '#EEEECC';
                ctx.fillRect(13, 0, 6, 10);
            });

        case 'guatiguana':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#A0522D',
                    colorPiel: '#C68642',
                });
                // Collar de conchas: 5 círculos blancos en arco
                ctx.fillStyle = '#ffffff';
                for (let i = 0; i < 5; i++) {
                    const angulo = Math.PI * 0.3 + (i / 4) * Math.PI * 0.4;
                    const cx = Math.cos(angulo) * 10;
                    const cy = -Math.sin(angulo) * 4 + 1;
                    ctx.beginPath();
                    ctx.arc(cx, cy, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

        case 'roberto-cassa':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#2a4a6a',
                });
                // Gafas redondas
                ctx.strokeStyle = '#666666';
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.arc(-4, -5, 4, 0, Math.PI * 2);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(4, -5, 4, 0, Math.PI * 2);
                ctx.stroke();
                // Puente
                ctx.beginPath();
                ctx.moveTo(0, -5);
                ctx.lineTo(0, -5);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(-1, -5);
                ctx.lineTo(1, -5);
                ctx.stroke();

                // Libro rojo bajo el brazo
                ctx.fillStyle = '#8B0000';
                ctx.fillRect(11, 2, 8, 12);
            });

        // ---- ZONA COLONIAL ----
        case 'constructor-mendez':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#DDAA00',
                });
                // Casco de construcción amarillo
                ctx.fillStyle = '#FFD700';
                ctx.fillRect(-12, -16, 24, 8);
                // Banda del casco
                ctx.fillStyle = '#CC9900';
                ctx.fillRect(-12, -10, 24, 2);
            });

        case 'dra-perez':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#4a8a6a',
                    colorPelo: '#2a1a0a',
                });
                // Moño como dra-martinez
                ctx.fillStyle = '#2a1a0a';
                ctx.fillRect(-4, -17, 8, 4);
            });

        case 'don-rafael':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#6a4a2a',
                });
                // Sombrero de ala ancha (más ancho que la cabeza)
                ctx.fillStyle = '#3a2a1a';
                ctx.fillRect(-14, -15, 28, 4); // ala
                ctx.fillRect(-8, -19, 16, 5);  // copa
            });

        case 'maria':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#aa6644',
                    colorPelo: '#1a0a00',
                    anchoPelo: 20,
                    alturaPelo: 6,
                });
                // Trenzas laterales como pepita
                ctx.fillStyle = '#1a0a00';
                ctx.fillRect(-10, -7, 4, 10);
                ctx.fillRect(6, -7, 4, 10);
            });

        case 'fabiola':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#EEEEDD', // blusa blanca
                    colorPiel: '#E8C8A8',   // piel clara
                    colorPelo: '#1a0e08',   // castaño muy oscuro
                    anchoPelo: 22,
                    alturaPelo: 7,
                });
                // Pelo largo a ambos lados (hasta los hombros)
                ctx.fillStyle = '#1a0e08';
                ctx.fillRect(-12, -19, 6, 24);
                ctx.fillRect(6, -19, 6, 24);
                // Mechón frontal (flequillo al lado)
                ctx.fillRect(-9, -17, 10, 4);
                // Labios rojos (rasgo distintivo)
                ctx.fillStyle = '#CC2222';
                ctx.fillRect(-3, -2, 6, 2);
            });

        // ---- MUNDO ACUÁTICO ----
        case 'pescador-manuel':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#5a7a4a',
                });
                // Sombrero de ala ancha
                ctx.fillStyle = '#8B7355';
                ctx.fillRect(-14, -15, 28, 4);
                ctx.fillRect(-8, -19, 16, 5);

                // Caña de pescar
                ctx.strokeStyle = '#8B7355';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(12, -2);
                ctx.lineTo(18, -16);
                ctx.stroke();

                // Hilo
                ctx.strokeStyle = '#aaaaaa';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(18, -16);
                ctx.lineTo(18, 6);
                ctx.stroke();
            });

        case 'tortuga-carey':
            return {
                ancho: 64, alto: 48,
                dibujar: (ctx) => {
                    ctx.imageSmoothingEnabled = false;
                    ctx.translate(32, 26);
                    const s = 1.5;
                    ctx.scale(s, s);

                    dibujarSombra(ctx);
                    dibujarTortuga(ctx, '#5a8a3a', '#7aaa5a', '#4a6a2a');
                },
            };

        case 'arqueologa-sub':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#2a6a8a',
                });
                // Gafas de buceo
                ctx.fillStyle = '#44aaff';
                ctx.beginPath();
                ctx.arc(-4, -6, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(4, -6, 3, 0, Math.PI * 2);
                ctx.fill();

                // Snorkel
                ctx.strokeStyle = '#44aaff';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(8, -6);
                ctx.lineTo(10, -14);
                ctx.lineTo(12, -14);
                ctx.stroke();
            });

        case 'pez-leon':
            return {
                ancho: 64, alto: 48,
                dibujar: (ctx) => {
                    ctx.imageSmoothingEnabled = false;
                    ctx.translate(32, 24);
                    const s = 1.5;
                    ctx.scale(s, s);

                    dibujarSombra(ctx);

                    // Cuerpo (elipse roja)
                    ctx.fillStyle = '#CC3333';
                    ctx.beginPath();
                    ctx.ellipse(0, 0, 12, 7, 0, 0, Math.PI * 2);
                    ctx.fill();

                    // Rayas blancas y rojo oscuro
                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = 0.8;
                    for (let i = -8; i <= 8; i += 4) {
                        ctx.beginPath();
                        ctx.moveTo(i, -6);
                        ctx.lineTo(i, 6);
                        ctx.stroke();
                    }
                    ctx.strokeStyle = '#881111';
                    ctx.lineWidth = 0.6;
                    for (let i = -6; i <= 6; i += 4) {
                        ctx.beginPath();
                        ctx.moveTo(i, -5);
                        ctx.lineTo(i, 5);
                        ctx.stroke();
                    }

                    // Cola (lado izquierdo — el pez mira a la derecha)
                    ctx.fillStyle = '#CC5544';
                    ctx.beginPath();
                    ctx.moveTo(-12, 0);
                    ctx.lineTo(-17, -5);
                    ctx.lineTo(-17, 5);
                    ctx.closePath();
                    ctx.fill();

                    // Aletas pectorales (abanico de espinas hacia atrás/abajo)
                    ctx.strokeStyle = '#CC3333';
                    ctx.lineWidth = 0.8;
                    for (let a = -3; a <= 3; a++) {
                        ctx.beginPath();
                        ctx.moveTo(-2, 3);
                        ctx.lineTo(-14, a * 3 + 2);
                        ctx.stroke();
                    }

                    // Espinas dorsales (más hacia la cabeza/derecha)
                    ctx.strokeStyle = '#FFAA44';
                    ctx.lineWidth = 0.8;
                    for (let i = -4; i <= 8; i += 3) {
                        ctx.beginPath();
                        ctx.moveTo(i, -7);
                        ctx.lineTo(i + 1, -13);
                        ctx.stroke();
                    }

                    // Ojo (lado derecho = cabeza)
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(6, -3, 4, 3);
                    ctx.fillStyle = '#ffcc00';
                    ctx.fillRect(7, -2, 2, 2);

                    // Boca
                    ctx.fillStyle = '#881111';
                    ctx.fillRect(12, -1, 2, 1);
                },
            };

        // ---- SANTUARIO MANATÍ ----
        case 'dra-sofia':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#2a8a6a',
                    colorPelo: '#3A2010',
                });
                // Portapapeles
                ctx.fillStyle = '#DDDDDD';
                ctx.fillRect(12, -2, 7, 10);
                ctx.fillStyle = '#aaaaaa';
                ctx.fillRect(13, -3, 5, 2); // clip
            });

        case 'tortuga-verde':
            return {
                ancho: 64, alto: 48,
                dibujar: (ctx) => {
                    ctx.imageSmoothingEnabled = false;
                    ctx.translate(32, 26);
                    const s = 1.5;
                    ctx.scale(s, s);

                    dibujarSombra(ctx);
                    dibujarTortuga(ctx, '#3a8a5a', '#5aaa7a', '#2a6a4a');
                },
            };

        case 'manati':
            return {
                ancho: 64, alto: 48,
                dibujar: (ctx) => {
                    ctx.imageSmoothingEnabled = false;
                    ctx.translate(32, 24);
                    const s = 1.5;
                    ctx.scale(s, s);

                    dibujarSombra(ctx);

                    // Cuerpo ovalado gris
                    ctx.fillStyle = '#8a8a9a';
                    ctx.beginPath();
                    ctx.ellipse(0, 0, 14, 8, 0, 0, Math.PI * 2);
                    ctx.fill();

                    // Cabeza/hocico redondeado
                    ctx.fillStyle = '#9a9aaa';
                    ctx.beginPath();
                    ctx.ellipse(-14, -1, 5, 5, 0, 0, Math.PI * 2);
                    ctx.fill();

                    // Ojos amables
                    ctx.fillStyle = '#333333';
                    ctx.beginPath();
                    ctx.arc(-16, -3, 1.5, 0, Math.PI * 2);
                    ctx.fill();

                    // Aletas pequeñas
                    ctx.fillStyle = '#7a7a8a';
                    ctx.beginPath();
                    ctx.ellipse(-6, 7, 4, 2, 0.3, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.ellipse(4, 7, 4, 2, -0.3, 0, Math.PI * 2);
                    ctx.fill();

                    // Cola (aleta caudal)
                    ctx.fillStyle = '#7a7a8a';
                    ctx.beginPath();
                    ctx.ellipse(14, -2, 3, 5, 0.3, 0, Math.PI * 2);
                    ctx.fill();
                },
            };

        case 'manati-adulto':
            return {
                ancho: 64, alto: 48,
                dibujar: (ctx) => {
                    ctx.imageSmoothingEnabled = false;
                    ctx.translate(32, 24);
                    const s = 1.5;
                    ctx.scale(s, s);

                    dibujarSombra(ctx);

                    // Cuerpo más grande que la cría
                    ctx.fillStyle = '#7a7a8a';
                    ctx.beginPath();
                    ctx.ellipse(0, 0, 18, 10, 0, 0, Math.PI * 2);
                    ctx.fill();

                    // Cabeza/hocico
                    ctx.fillStyle = '#8a8a9a';
                    ctx.beginPath();
                    ctx.ellipse(-18, -1, 6, 6, 0, 0, Math.PI * 2);
                    ctx.fill();

                    // Ojos
                    ctx.fillStyle = '#333333';
                    ctx.beginPath();
                    ctx.arc(-20, -3, 1.5, 0, Math.PI * 2);
                    ctx.fill();

                    // Cicatrices de la red (marcas claras en el cuerpo)
                    ctx.strokeStyle = '#aaaaaa';
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(-5, -4); ctx.lineTo(3, -3);
                    ctx.moveTo(-3, 2); ctx.lineTo(5, 3);
                    ctx.stroke();

                    // Aletas
                    ctx.fillStyle = '#6a6a7a';
                    ctx.beginPath();
                    ctx.ellipse(-8, 9, 5, 3, 0.3, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.ellipse(5, 9, 5, 3, -0.3, 0, Math.PI * 2);
                    ctx.fill();

                    // Cola (aleta caudal grande)
                    ctx.fillStyle = '#6a6a7a';
                    ctx.beginPath();
                    ctx.ellipse(18, -2, 4, 7, 0.3, 0, Math.PI * 2);
                    ctx.fill();
                },
            };

        // ---- MUNDO JURÍDICO ----
        case 'inspector-ramirez':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#1a3a5a',
                });
                // Gorra con banda dorada
                ctx.fillStyle = '#1a3a5a';
                ctx.fillRect(-10, -15, 20, 6);
                ctx.fillStyle = '#FFD700';
                ctx.fillRect(-10, -10, 20, 2);

                // Insignia dorada en el pecho
                ctx.fillStyle = '#FFD700';
                ctx.fillRect(-3, -1, 6, 4);
            });

        case 'agente-montero':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#2a4a3a',
                });
                // Gorra similar
                ctx.fillStyle = '#2a4a3a';
                ctx.fillRect(-10, -15, 20, 6);
                ctx.fillStyle = '#FFD700';
                ctx.fillRect(-10, -10, 20, 2);
            });

        case 'lcda-vidal':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#3a3a5a',
                    colorPelo: '#2a1a0a',
                });
                // Moño
                ctx.fillStyle = '#2a1a0a';
                ctx.fillRect(-4, -17, 8, 4);

                // Gafas rectangulares
                ctx.strokeStyle = '#666666';
                ctx.lineWidth = 0.8;
                ctx.strokeRect(-6, -6, 4, 3);
                ctx.strokeRect(2, -6, 4, 3);
                ctx.beginPath();
                ctx.moveTo(-2, -5);
                ctx.lineTo(2, -5);
                ctx.stroke();

                // Libro
                ctx.fillStyle = '#3a3a5a';
                ctx.fillRect(11, 2, 8, 12);
            });

        case 'rodrigo-torres':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#1a1a2e',
                    colorPelo: '#1a1a1a',
                });
                // Pelo peinado hacia atrás (más liso)
                ctx.fillStyle = '#1a1a1a';
                ctx.fillRect(-10, -12, 20, 4);

                // Gafas oscuras (lentes negros)
                ctx.fillStyle = '#111111';
                ctx.fillRect(-7, -6, 5, 3);
                ctx.fillRect(2, -6, 5, 3);

                // Corbata roja
                ctx.fillStyle = '#8a2a2a';
                ctx.fillRect(-1, -1, 2, 8);

                // Maletín
                ctx.fillStyle = '#5a3a1a';
                ctx.fillRect(12, 4, 8, 6);
                ctx.fillStyle = '#DAA520';
                ctx.fillRect(14, 3, 4, 1); // asa
            });

        // ---- MUSEO LABORATORIO ----
        case 'dr-morban':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#4a6a8a',
                    colorPelo: '#888888', // pelo ralo/canoso
                    alturaPelo: 3,
                });
                // Gafas rectangulares
                ctx.strokeStyle = '#666666';
                ctx.lineWidth = 0.8;
                ctx.strokeRect(-6, -6, 4, 3);
                ctx.strokeRect(2, -6, 4, 3);
                ctx.beginPath();
                ctx.moveTo(-2, -5);
                ctx.lineTo(2, -5);
                ctx.stroke();
            });

        case 'dra-lopez':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#6a8a4a',
                });
                // Gafas protectoras en la frente
                ctx.fillStyle = '#88ccff';
                ctx.fillRect(-7, -13, 14, 3);
                ctx.strokeStyle = '#666666';
                ctx.lineWidth = 0.5;
                ctx.strokeRect(-7, -13, 14, 3);
            });

        case 'restauradora-ana':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#8a4a6a',
                });
                // Pincel en la mano
                ctx.strokeStyle = '#6B3410';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(13, -2);
                ctx.lineTo(18, -12);
                ctx.stroke();

                // Punta del pincel con color
                ctx.fillStyle = '#ff6644';
                ctx.fillRect(17, -14, 3, 3);
            });

        case 'visitante-sosp':
            return spriteHumanoide((ctx) => {
                dibujarBaseHumanoide(ctx, {
                    colorCuerpo: '#5a5a5a',
                });
                // Gorra bajada (sospechoso)
                ctx.fillStyle = '#3a3a3a';
                ctx.fillRect(-12, -14, 24, 6);
                // Postura encorvada: dibujar una pequeña joroba
                ctx.fillStyle = '#5a5a5a';
                ctx.fillRect(-6, -3, 12, 3);
            });

        default:
            return null;
    }
}


// ============================================================
// FUNCIONES AUXILIARES DE DIBUJO
// ============================================================

/**
 * Crea un objeto sprite para personajes humanoides (48×64).
 * Recibe una función dibujadorExtra(ctx) que se ejecuta con el ctx
 * ya trasladado y escalado al centro del canvas.
 */
function spriteHumanoide(dibujadorExtra) {
    return {
        ancho: 48,
        alto: 64,
        dibujar: (ctx) => {
            ctx.imageSmoothingEnabled = false;
            // Centrar el dibujo en el canvas
            ctx.translate(24, 36);
            const s = 1.5; // escala para llenar el canvas
            ctx.scale(s, s);

            // Llamar a la función de dibujo personalizada
            dibujadorExtra(ctx);
        },
    };
}

/**
 * Dibuja la base de un personaje humanoide.
 * Todas las coordenadas son relativas al centro (0,0) del personaje.
 *
 * opciones:
 * - colorCuerpo: color de la camisa/torso (obligatorio)
 * - colorPiel: color de la piel (default: '#D2956A')
 * - colorPelo: color del pelo (default: '#2a1a0a')
 * - anchoPelo: ancho del pelo en px (default: 18)
 * - alturaPelo: altura del pelo en px (default: 5)
 */
function dibujarBaseHumanoide(ctx, opciones) {
    const colorCuerpo = opciones.colorCuerpo || '#4488ff';
    const colorPiel = opciones.colorPiel || '#D2956A';
    const colorPelo = opciones.colorPelo || '#2a1a0a';
    const anchoPelo = opciones.anchoPelo || 18;
    const alturaPelo = opciones.alturaPelo || 5;

    // Sombra en el suelo
    dibujarSombra(ctx);

    // Piernas (dos rectángulos azules)
    ctx.fillStyle = '#2a5599';
    ctx.fillRect(-7, 8, 7, 8);  // pierna izquierda
    ctx.fillRect(0, 8, 7, 8);   // pierna derecha

    // Zapatos
    ctx.fillStyle = '#4a3520';
    ctx.fillRect(-8, 16, 8, 3);  // zapato izquierdo
    ctx.fillRect(0, 16, 8, 3);   // zapato derecho

    // Cuerpo (camisa/torso)
    ctx.fillStyle = colorCuerpo;
    ctx.fillRect(-10, -8, 20, 16);

    // Cabeza (piel)
    ctx.fillStyle = colorPiel;
    ctx.fillRect(-8, -15, 16, 14);

    // Pelo
    ctx.fillStyle = colorPelo;
    const peloCentradoX = -(anchoPelo / 2);
    ctx.fillRect(peloCentradoX, -12 - alturaPelo, anchoPelo, alturaPelo);

    // Ojos: fondo blanco + pupila negra
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-6, -7, 3, 3);  // ojo izquierdo
    ctx.fillRect(3, -7, 3, 3);   // ojo derecho

    ctx.fillStyle = '#000000';
    ctx.fillRect(-5, -6, 1.5, 1.5);  // pupila izquierda
    ctx.fillRect(4, -6, 1.5, 1.5);   // pupila derecha
}

/**
 * Dibuja una sombra elíptica debajo del personaje.
 * Se usa tanto para humanoides como para animales.
 */
function dibujarSombra(ctx) {
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(0, 18, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();
}

/**
 * Dibuja una tortuga marina reutilizable.
 * colorCuerpo: color del caparazón
 * colorCabeza: color de la cabeza
 * colorPatron: color de las líneas del caparazón
 */
function dibujarTortuga(ctx, colorCuerpo, colorCabeza, colorPatron) {
    // Caparazón ovalado
    ctx.fillStyle = colorCuerpo;
    ctx.beginPath();
    ctx.ellipse(0, 0, 12, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Patrón del caparazón
    ctx.strokeStyle = colorPatron;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(-6, -6);
    ctx.lineTo(-6, 6);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(0, 8);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(6, -6);
    ctx.lineTo(6, 6);
    ctx.stroke();

    // Cabeza asomando a la izquierda
    ctx.fillStyle = colorCabeza;
    ctx.fillRect(-16, -4, 8, 8);

    // Ojo
    ctx.fillStyle = '#000000';
    ctx.fillRect(-14, -3, 2, 2);

    // Aletas (4 aletas)
    ctx.fillStyle = colorCuerpo;
    ctx.fillRect(-8, -10, 6, 4);   // aleta delantera izquierda
    ctx.fillRect(-8, 6, 6, 4);     // aleta delantera derecha
    ctx.fillRect(4, -10, 6, 4);    // aleta trasera izquierda
    ctx.fillRect(4, 6, 6, 4);      // aleta trasera derecha
}
