// ============================================================
// GUARDADO.JS - Guarda y carga el progreso del jugador
// ============================================================
// Nadie quiere perder 3 horas de juego porque cerró el navegador.
// Este módulo guarda el estado del juego (posición, inventario,
// misiones completadas, etc.) en el navegador del jugador
// usando localStorage.
//
// También tiene funciones "placeholder" para guardado en la nube
// (para que el jugador pueda jugar en otro dispositivo y mantener
// su progreso). Por ahora usan localStorage con una clave especial,
// pero en el futuro se conectarán a Firebase o un servidor real.
// ============================================================

import { CLAVE_GUARDADO } from './configuracion.js';

export class SistemaGuardado {

  constructor() {
    // Prefijo para guardados "en la nube" (por ahora son locales también)
    this.prefijoNube = 'arclycee_nube_';
  }

  // --- GUARDADO LOCAL ---

  /**
   * Guarda los datos del juego en el navegador.
   * Convertimos el objeto JavaScript a texto (JSON) porque
   * localStorage solo puede guardar texto, no objetos.
   */
  guardarLocal(datos) {
    try {
      const datosTexto = JSON.stringify(datos);
      localStorage.setItem(CLAVE_GUARDADO, datosTexto);
      return true;
    } catch (error) {
      // localStorage puede fallar si el almacenamiento está lleno
      // o si el navegador está en modo privado/incógnito
      console.warn('No se pudo guardar el progreso:', error.message);
      return false;
    }
  }

  /**
   * Carga los datos guardados desde el navegador.
   * Convertimos el texto de vuelta a un objeto JavaScript.
   * Si no hay datos guardados o están corruptos, devuelve null.
   */
  cargarLocal() {
    try {
      const datosTexto = localStorage.getItem(CLAVE_GUARDADO);

      // Si no hay nada guardado, devolvemos null
      // (diferente a un error — simplemente nunca se ha guardado)
      if (!datosTexto) {
        return null;
      }

      return JSON.parse(datosTexto);
    } catch (error) {
      console.warn('Los datos guardados están dañados:', error.message);
      return null;
    }
  }

  /**
   * Revisa si existe un archivo de guardado.
   * Útil para el menú principal: si hay guardado, mostramos
   * "Continuar". Si no hay, solo mostramos "Nuevo Juego".
   */
  existeGuardadoLocal() {
    return localStorage.getItem(CLAVE_GUARDADO) !== null;
  }

  /**
   * Borra el guardado local. Esto es PERMANENTE.
   * Usamos esto cuando el jugador quiere empezar de cero
   * o cuando quiere liberar espacio.
   */
  borrarGuardadoLocal() {
    localStorage.removeItem(CLAVE_GUARDADO);
  }

  // --- GUARDADO EN LA NUBE (PLACEHOLDER) ---
  // TODO: Conectar esto a Firebase para guardado real en la nube.
  // Por ahora simulamos la nube guardando en localStorage con una
  // clave diferente basada en el nombre y contraseña del jugador.

  /**
   * Simula guardar en la nube.
   * Usamos btoa() para crear un "hash" simple del nombre+contraseña.
   * btoa() convierte texto a Base64 — NO es seguro para contraseñas
   * reales, pero funciona como placeholder hasta tener Firebase.
   */
  guardarNube(nombre, contrasena, datos) {
    try {
      // Creamos una clave única combinando nombre y contraseña
      // btoa() codifica en Base64 para que no sea texto plano visible
      const claveUsuario = this.prefijoNube + btoa(nombre + ':' + contrasena);

      const datosConMeta = {
        ...datos,
        nombreUsuario: nombre,
        ultimoGuardado: Date.now()
      };

      localStorage.setItem(claveUsuario, JSON.stringify(datosConMeta));
      return true;
    } catch (error) {
      console.warn('No se pudo guardar en la nube:', error.message);
      return false;
    }
  }

  /**
   * Simula cargar desde la nube.
   * Usa la misma combinación nombre+contraseña para encontrar el guardado.
   * Si el nombre o contraseña no coinciden, simplemente no encuentra nada.
   */
  cargarNube(nombre, contrasena) {
    try {
      const claveUsuario = this.prefijoNube + btoa(nombre + ':' + contrasena);
      const datosTexto = localStorage.getItem(claveUsuario);

      if (!datosTexto) {
        return null;
      }

      return JSON.parse(datosTexto);
    } catch (error) {
      console.warn('No se pudo cargar desde la nube:', error.message);
      return null;
    }
  }

  // --- CREAR DATOS DE GUARDADO ---

  /**
   * Crea un objeto con TODO lo que necesitamos guardar del juego.
   * Centralizamos esto aquí para que todos los guardados
   * (locales y nube) tengan exactamente la misma estructura.
   *
   * Recibe el objeto 'juego' completo y extrae lo importante.
   * NO guardamos todo el juego — solo lo necesario para reconstruirlo.
   */
  crearDatosGuardado(juego) {
    return {
      // Dónde está el jugador en el mundo
      posicion: {
        x: juego.jugador ? juego.jugador.x : 0,
        y: juego.jugador ? juego.jugador.y : 0
      },

      // Qué objetos tiene en la mochila
      inventario: juego.inventario ? [...juego.inventario] : [],

      // Qué misiones ya completó (para no repetirlas)
      misionesCompletadas: juego.misionesCompletadas
        ? [...juego.misionesCompletadas]
        : [],

      // En qué reino/mundo está (cueva, mapa exterior, etc.)
      reino: juego.reinoActual || 'inicio',

      // Qué compañeros tiene el jugador en su equipo
      companeros: juego.companeros ? [...juego.companeros] : [],

      // Nivel del cemí (espíritu guía del jugador)
      nivelCemi: juego.nivelCemi || 1,

      // Configuración del jugador
      idioma: juego.idioma || 'es',
      estiloArte: juego.estiloArte || 'pixel',

      // Cuándo se guardó (para mostrar "Guardado: hace 5 minutos")
      marcaTiempo: Date.now()
    };
  }
}
