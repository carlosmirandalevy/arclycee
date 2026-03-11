// Gestor de internacionalización (i18n) del juego
// Centraliza todas las traducciones y permite cambiar idioma en tiempo de ejecución

import es from './es.js';
import fr from './fr.js';
import en from './en.js';

class Idiomas {
  constructor() {
    // Español como idioma predeterminado porque el público principal es dominicano
    this.idiomaActual = 'es';

    // Mapa de traducciones indexado por código de idioma para acceso O(1)
    this.traducciones = {
      es,
      fr,
      en
    };
  }

  /**
   * Cambia el idioma activo del juego
   * Solo acepta códigos registrados para evitar errores silenciosos
   */
  cambiarIdioma(codigo) {
    if (this.traducciones[codigo]) {
      this.idiomaActual = codigo;
      return true;
    }

    // Retorna falso si el código no existe para que la UI pueda mostrar un aviso
    console.warn(`Idioma '${codigo}' no disponible. Idiomas válidos: ${Object.keys(this.traducciones).join(', ')}`);
    return false;
  }

  /**
   * Obtiene una traducción usando notación de punto (ej: 'menu.titulo')
   * Recorre el objeto de traducciones nivel por nivel
   * Si la clave no existe, retorna la clave misma para facilitar depuración
   */
  t(clave) {
    const partes = clave.split('.');
    let resultado = this.traducciones[this.idiomaActual];

    // Navega por cada nivel del objeto anidado
    for (const parte of partes) {
      if (resultado === undefined || resultado === null) {
        // Retorna la clave original para que sea visible en pantalla qué falta traducir
        return clave;
      }
      resultado = resultado[parte];
    }

    // Si el valor final no existe, retorna la clave como indicador visual de traducción faltante
    return resultado !== undefined ? resultado : clave;
  }

  /**
   * Lista los idiomas disponibles con sus nombres legibles
   * Útil para el menú de selección de idioma en opciones
   */
  obtenerIdiomas() {
    return [
      { codigo: 'es', nombre: 'Español' },
      { codigo: 'fr', nombre: 'Français' },
      { codigo: 'en', nombre: 'English' }
    ];
  }
}

// Exporta como singleton para que todo el juego comparta la misma instancia de idioma
const idiomas = new Idiomas();
export default idiomas;
