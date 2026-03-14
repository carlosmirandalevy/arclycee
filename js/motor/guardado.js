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
    // --- Serializar compañeros ---
    // Los compañeros son instancias de clase (Magnoboot, Viralata, etc.)
    // que no se pueden guardar directamente en JSON. Guardamos solo
    // su tipo y si están activos, para poder recrearlos al cargar.
    const companerosSerializados = [];
    if (juego.companeros) {
      for (const comp of juego.companeros) {
        companerosSerializados.push({
          tipo: comp.tipo,
          activo: comp.activo
        });
      }
    }

    // --- Serializar inventario ---
    // juego.inventario es una instancia de Inventario (clase con UI).
    // Lo que necesitamos guardar son los objetos dentro de ella.
    const objetosInventario = [];
    if (juego.inventario && juego.inventario.objetos) {
      for (const obj of juego.inventario.objetos) {
        objetosInventario.push({ ...obj });
      }
    }

    // --- También guardamos el inventario simple del jugador ---
    // (array en jugador.inventario que algunas escenas usan directamente)
    const inventarioJugador = [];
    if (juego.jugador && juego.jugador.inventario) {
      for (const obj of juego.jugador.inventario) {
        inventarioJugador.push({ ...obj });
      }
    }

    return {
      // --- Escena actual ---
      // Para saber a dónde llevar al jugador cuando cargue la partida
      escena: juego.nombreEscenaActual || 'mapaPrincipal',

      // --- Género del personaje (pepito/pepita) ---
      generoJugador: juego.generoJugador || 'pepito',

      // --- Vida del jugador ---
      vida: juego.jugador ? juego.jugador.vida : 100,

      // --- Progreso del mapa ---
      // Qué nodos completó y cuáles están desbloqueados
      progreso: {
        nodosCompletados: [...(juego.progreso.nodosCompletados || [])],
        nodosDesbloqueados: [...(juego.progreso.nodosDesbloqueados || [])],
        combatesPacificados: juego.progreso.combatesPacificados || 0,
        combatesViolentos: juego.progreso.combatesViolentos || 0,
        accionesEcologicas: juego.progreso.accionesEcologicas || 0,
        robotProgramado: juego.progreso.robotProgramado || false,
        magnetometroCalibrado: juego.progreso.magnetometroCalibrado || false,
        equipoReparado: juego.progreso.equipoReparado || false,
        equipoEntregado: juego.progreso.equipoEntregado || false,
        descubrimientoCientifico: juego.progreso.descubrimientoCientifico || false,
        periodicoRecogido: juego.progreso.periodicoRecogido || false,
        naufragiosRobotDescubiertos: juego.progreso.naufragiosRobotDescubiertos || false,
        manatiLiberado: juego.progreso.manatiLiberado || false,
        arrecifeLimpiado: juego.progreso.arrecifeLimpiado || false,
        // Estado persistente por mundo (NPCs hablados, objetos recogidos, etc.)
        mundos: juego.progreso.mundos || {}
      },

      // --- Inventario UI (objetos con nombre, descripción, ícono) ---
      inventario: objetosInventario,

      // --- Inventario simple del jugador ---
      inventarioJugador: inventarioJugador,

      // --- Compañeros (tipo + estado) ---
      companeros: companerosSerializados,

      // --- Idioma activo ---
      idioma: juego.idiomas ? juego.idiomas.idiomaActual : 'es',

      // --- Reputación del jugador ---
      reputacion: juego.reputacion ? juego.reputacion.puntos : 0,

      // --- Estado de misiones secundarias ---
      misiones: juego.misiones ? juego.misiones.serializar() : null,

      // --- Registro de misiones (diario del jugador) ---
      registroEntradas: juego.registro ? juego.registro.entradas.map(e => ({ ...e })) : [],

      // --- Álbum de fotos (solo metadata, sin imágenes) ---
      // Las imágenes base64 son demasiado grandes para localStorage,
      // así que solo guardamos la lista de fotos tomadas (sin miniaturas).
      // Al cargar, las fotos aparecen como placeholders en el álbum.
      albumFotos: juego.album ? juego.album.serializar() : [],

      // --- Cuándo se guardó ---
      marcaTiempo: Date.now()
    };
  }
}
