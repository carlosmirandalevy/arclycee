// ============================================================
// matematicas.js - Funciones matematicas utiles para el juego
// ============================================================
// Estas funciones se usan por todo el juego. Son operaciones
// matematicas basicas que los motores de juego necesitan
// constantemente. Estan explicadas de forma simple para que
// cualquier persona las pueda entender.
// ============================================================

// --- Interpolacion Lineal (lerp) ---
// "Lerp" viene de "Linear Interpolation" en ingles.
// Es una forma de ir de un numero a otro SUAVEMENTE.
//
// Imagina que estas en una posicion (inicio=0) y quieres
// llegar a otra posicion (fin=100):
//   - t=0   -> estas en 0   (el inicio)
//   - t=0.5 -> estas en 50  (la mitad)
//   - t=1   -> estas en 100 (el final)
//
// Es como preguntar: "si el viaje va al 30% (t=0.3),
// en que posicion estoy?"
//
// Se usa para animaciones suaves, transiciones de color,
// movimiento de camara, etc.
export function lerp(inicio, fin, t) {
  return inicio + (fin - inicio) * t;
}

// --- Limitar un valor entre un minimo y un maximo ---
// Tambien conocido como "clamp" en ingles.
//
// Es como poner paredes: el valor no puede ser menor que
// el minimo ni mayor que el maximo.
//
// Ejemplo: limitar(150, 0, 100) devuelve 100
//          limitar(-20, 0, 100) devuelve 0
//          limitar(50, 0, 100)  devuelve 50 (esta dentro del rango)
//
// Muy util para que la vida del jugador no baje de 0
// o no suba mas del maximo.
export function limitar(valor, minimo, maximo) {
  // Math.max se asegura de que no baje del minimo
  // Math.min se asegura de que no suba del maximo
  return Math.max(minimo, Math.min(maximo, valor));
}

// --- Numero aleatorio decimal entre min y max ---
// Genera un numero al azar con decimales.
//
// Ejemplo: aleatorio(1, 10) podria devolver 3.74829...
//
// Math.random() devuelve un numero entre 0 y 1.
// Nosotros lo "estiramos" para que este entre min y max.
export function aleatorio(min, max) {
  return min + Math.random() * (max - min);
}

// --- Numero aleatorio ENTERO entre min y max ---
// Igual que aleatorio(), pero solo devuelve numeros
// sin decimales (enteros).
//
// Ejemplo: aleatorioEntero(1, 6) simula un dado:
//          puede dar 1, 2, 3, 4, 5 o 6
//
// Usamos Math.floor() que "aplasta" el numero hacia abajo,
// quitando los decimales. Sumamos 1 al rango porque
// Math.floor siempre redondea hacia abajo.
export function aleatorioEntero(min, max) {
  return Math.floor(aleatorio(min, max + 1));
}

// --- Angulo entre dos puntos ---
// Calcula en que direccion esta un punto respecto a otro.
//
// Imagina que estas en (x1, y1) y quieres saber en que
// direccion esta (x2, y2). Esta funcion te dice el angulo.
//
// El resultado esta en RADIANES (no en grados).
// Puedes convertirlo a grados con radianesAGrados().
//
// Math.atan2 es una funcion que calcula el angulo usando
// la diferencia en Y y la diferencia en X.
export function anguloEntre(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}

// --- Convertir grados a radianes ---
// Los humanos usamos grados (0 a 360) pero las funciones
// matematicas de JavaScript usan radianes.
//
// La conversion es: radianes = grados * (PI / 180)
//
// Datos curiosos:
//   - 360 grados = 2 * PI radianes (una vuelta completa)
//   - 180 grados = PI radianes (media vuelta)
//   - 90 grados  = PI/2 radianes (un cuarto de vuelta)
export function gradosARadianes(grados) {
  return grados * (Math.PI / 180);
}

// --- Convertir radianes a grados ---
// Lo opuesto a gradosARadianes().
// Util para mostrar angulos en la pantalla de forma
// que los humanos los entiendan.
//
// La conversion es: grados = radianes * (180 / PI)
export function radianesAGrados(radianes) {
  return radianes * (180 / Math.PI);
}
