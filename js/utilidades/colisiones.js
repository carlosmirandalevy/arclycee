// ============================================================
// colisiones.js - Funciones para detectar colisiones
// ============================================================
// En un juego 2D, necesitamos saber cuando dos cosas se tocan.
// Por ejemplo: cuando el jugador toca un enemigo, cuando una
// bala golpea una pared, o cuando el jugador recoge un objeto.
//
// Estas funciones comparan las posiciones y tamanos de dos
// cosas para determinar si se estan tocando o no.
// ============================================================

// --- Verificar si dos rectangulos se tocan ---
// Esta es la colision mas comun en juegos 2D.
// Se llama "AABB" (Axis-Aligned Bounding Box), que significa
// que los rectangulos NO estan rotados.
//
// Cada rectangulo necesita: { x, y, ancho, alto }
//   x, y = esquina superior izquierda
//   ancho = que tan ancho es
//   alto = que tan alto es
//
// Retorna true si se tocan, false si no.
export function rectangulosColisionan(a, b) {
  // La idea es simple: dos rectangulos NO se tocan si:
  //   - uno esta completamente a la izquierda del otro
  //   - uno esta completamente a la derecha del otro
  //   - uno esta completamente arriba del otro
  //   - uno esta completamente abajo del otro
  //
  // Si NINGUNA de esas es verdad, entonces si se tocan!

  const noColisionan =
    a.x + a.ancho <= b.x ||    // 'a' esta a la izquierda de 'b'
    b.x + b.ancho <= a.x ||    // 'b' esta a la izquierda de 'a'
    a.y + a.alto <= b.y ||     // 'a' esta arriba de 'b'
    b.y + b.alto <= a.y;       // 'b' esta arriba de 'a'

  // Si NO es verdad que no colisionan, entonces SI colisionan
  return !noColisionan;
}

// --- Verificar si un punto esta dentro de un rectangulo ---
// Util para saber si el mouse hizo click en un boton, o si
// un proyectil (que es muy pequeno) toco algo.
//
// px, py = posicion del punto
// rect = { x, y, ancho, alto }
//
// Retorna true si el punto esta adentro, false si no.
export function puntoEnRectangulo(px, py, rect) {
  // El punto esta adentro si:
  //   - su X esta entre el borde izquierdo y el derecho
  //   - su Y esta entre el borde de arriba y el de abajo
  return (
    px >= rect.x &&
    px <= rect.x + rect.ancho &&
    py >= rect.y &&
    py <= rect.y + rect.alto
  );
}

// --- Calcular la distancia entre dos puntos ---
// Usa el teorema de Pitagoras (a^2 + b^2 = c^2)
// que aprendemos en matematicas.
//
// Imagina un triangulo rectangulo donde:
//   - un lado es la diferencia en X
//   - otro lado es la diferencia en Y
//   - la hipotenusa es la distancia que buscamos
//
// Retorna la distancia en pixeles.
export function distanciaEntre(x1, y1, x2, y2) {
  const diferenciaX = x2 - x1;
  const diferenciaY = y2 - y1;

  // Math.sqrt calcula la raiz cuadrada
  // Es como preguntar: "que numero multiplicado por si mismo da esto?"
  return Math.sqrt(diferenciaX * diferenciaX + diferenciaY * diferenciaY);
}

// --- Verificar si dos circulos se tocan ---
// Dos circulos colisionan si la distancia entre sus centros
// es menor que la suma de sus radios.
//
// Piensalo asi: si dos pelotas estan tan cerca que sus bordes
// se tocan, la distancia entre sus centros es exactamente
// radio1 + radio2. Si estan mas cerca, se estan encimando.
//
// x1, y1, r1 = centro y radio del primer circulo
// x2, y2, r2 = centro y radio del segundo circulo
//
// Retorna true si se tocan, false si no.
export function circulosColisionan(x1, y1, r1, x2, y2, r2) {
  const distancia = distanciaEntre(x1, y1, x2, y2);
  const sumaRadios = r1 + r2;

  return distancia <= sumaRadios;
}

// --- Verificar si un rectangulo toca un circulo ---
// Esta es la colision mas complicada pero muy util.
// Por ejemplo: una bala redonda golpeando una pared rectangular.
//
// La idea es encontrar el punto del rectangulo que esta
// MAS CERCA del centro del circulo. Si ese punto esta
// dentro del circulo, entonces colisionan.
//
// rect = { x, y, ancho, alto }
// cx, cy = centro del circulo
// radio = radio del circulo
//
// Retorna true si se tocan, false si no.
export function rectanguloEnCirculo(rect, cx, cy, radio) {
  // Encontrar el punto del rectangulo mas cercano al circulo.
  // Usamos "clamp" (limitar): si el centro del circulo esta
  // a la izquierda del rectangulo, el punto mas cercano es
  // el borde izquierdo. Si esta a la derecha, es el borde
  // derecho. Si esta en medio, es la misma X del centro.

  // Math.max y Math.min hacen el trabajo de "limitar"
  const puntoMasCercanoX = Math.max(rect.x, Math.min(cx, rect.x + rect.ancho));
  const puntoMasCercanoY = Math.max(rect.y, Math.min(cy, rect.y + rect.alto));

  // Ahora solo verificamos si ese punto esta dentro del circulo
  const distancia = distanciaEntre(puntoMasCercanoX, puntoMasCercanoY, cx, cy);

  return distancia <= radio;
}
