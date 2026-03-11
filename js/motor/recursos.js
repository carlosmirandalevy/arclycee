// ============================================================
// RECURSOS.JS - Carga imágenes y sonidos antes de que los necesitemos
// ============================================================
// En un juego, NO puedes usar una imagen en el momento que la necesitas
// porque cargarla toma tiempo (especialmente en internet lento).
// Este módulo carga TODO antes de empezar a jugar y lo guarda en
// memoria (caché) para que después obtener una imagen sea instantáneo.
//
// También muestra el progreso de carga (0% a 100%) para que el
// jugador vea una barra de carga en vez de una pantalla en blanco.
// ============================================================

export class CargadorRecursos {

  constructor() {
    // Mapas donde guardamos los recursos ya cargados.
    // Es como un diccionario: le pides "jugador" y te da la imagen del jugador.
    this.imagenes = new Map();
    this.sonidos = new Map();

    // Progreso de carga: va de 0 (nada cargado) a 1 (todo listo).
    // La pantalla de carga usa este número para mostrar la barra.
    this.progreso = 0;
  }

  /**
   * Carga UNA imagen y la guarda con un nombre.
   * Devuelve una Promesa porque cargar una imagen toma tiempo
   * (el navegador tiene que descargarla) y no queremos detener
   * todo el programa mientras esperamos.
   */
  cargarImagen(nombre, ruta) {
    return new Promise((resolver, rechazar) => {
      // Si ya la cargamos antes, no la cargamos de nuevo.
      // Esto ahorra tiempo y datos de internet.
      if (this.imagenes.has(nombre)) {
        resolver(this.imagenes.get(nombre));
        return;
      }

      const imagen = new Image();

      // Cuando la imagen termine de cargar, la guardamos
      imagen.onload = () => {
        this.imagenes.set(nombre, imagen);
        resolver(imagen);
      };

      // Si algo sale mal (imagen no existe, internet cortado, etc.)
      // avisamos del error en vez de quedarnos esperando para siempre
      imagen.onerror = () => {
        console.warn(`No se pudo cargar la imagen "${nombre}" desde: ${ruta}`);
        rechazar(new Error(`Error cargando imagen: ${ruta}`));
      };

      // Esto INICIA la descarga — todo lo de arriba es preparación
      imagen.src = ruta;
    });
  }

  /**
   * Carga UN sonido y lo guarda con un nombre.
   * Funciona igual que cargarImagen pero con Audio en vez de Image.
   */
  cargarSonido(nombre, ruta) {
    return new Promise((resolver, rechazar) => {
      // No cargar dos veces el mismo sonido
      if (this.sonidos.has(nombre)) {
        resolver(this.sonidos.get(nombre));
        return;
      }

      const sonido = new Audio();

      // 'canplaythrough' significa "ya puedo reproducir el sonido
      // de principio a fin sin pausas" — es mejor que 'canplay'
      // que solo significa "puedo empezar a reproducir (pero quizá pause)"
      sonido.addEventListener('canplaythrough', () => {
        this.sonidos.set(nombre, sonido);
        resolver(sonido);
      }, { once: true }); // 'once' quita el listener después de ejecutarse una vez

      sonido.addEventListener('error', () => {
        console.warn(`No se pudo cargar el sonido "${nombre}" desde: ${ruta}`);
        rechazar(new Error(`Error cargando sonido: ${ruta}`));
      }, { once: true });

      sonido.src = ruta;
      // Algunos navegadores necesitan que llamemos load() explícitamente
      sonido.load();
    });
  }

  /**
   * Carga MUCHOS recursos a la vez y actualiza el progreso.
   * Recibe una lista así: [{ tipo: 'imagen', nombre: 'jugador', ruta: 'sprites/jugador.png' }]
   *
   * Usa Promise.allSettled en vez de Promise.all porque allSettled
   * NO se detiene si un recurso falla — sigue cargando los demás.
   * Un sprite roto no debería impedir que el juego cargue.
   */
  cargarMultiples(listaRecursos) {
    // Si no hay nada que cargar, terminamos al instante
    if (listaRecursos.length === 0) {
      this.progreso = 1;
      return Promise.resolve([]);
    }

    let cargados = 0;
    const total = listaRecursos.length;

    // Creamos una promesa por cada recurso
    const promesas = listaRecursos.map((recurso) => {
      let promesa;

      if (recurso.tipo === 'imagen') {
        promesa = this.cargarImagen(recurso.nombre, recurso.ruta);
      } else if (recurso.tipo === 'sonido') {
        promesa = this.cargarSonido(recurso.nombre, recurso.ruta);
      } else {
        console.warn(`Tipo de recurso desconocido: "${recurso.tipo}"`);
        promesa = Promise.reject(new Error(`Tipo desconocido: ${recurso.tipo}`));
      }

      // Sin importar si cargó bien o mal, actualizamos el progreso.
      // Usamos .then().catch() para que SIEMPRE se actualice el contador.
      return promesa
        .then((resultado) => {
          cargados++;
          this.progreso = cargados / total;
          return resultado;
        })
        .catch((error) => {
          cargados++;
          this.progreso = cargados / total;
          // No relanzamos el error para que los demás sigan cargando
          return null;
        });
    });

    return Promise.all(promesas);
  }

  /**
   * Obtiene una imagen ya cargada. Si no existe, devuelve null
   * en vez de explotar — así el renderizador puede dibujar un
   * rectángulo rosa de emergencia en su lugar.
   */
  obtenerImagen(nombre) {
    if (!this.imagenes.has(nombre)) {
      console.warn(`Imagen "${nombre}" no encontrada. ¿Ya la cargaste?`);
      return null;
    }
    return this.imagenes.get(nombre);
  }

  /**
   * Obtiene un sonido ya cargado. Mismo principio que obtenerImagen.
   */
  obtenerSonido(nombre) {
    if (!this.sonidos.has(nombre)) {
      console.warn(`Sonido "${nombre}" no encontrado. ¿Ya lo cargaste?`);
      return null;
    }
    return this.sonidos.get(nombre);
  }
}
