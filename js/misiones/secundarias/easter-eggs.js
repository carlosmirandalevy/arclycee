// ============================================================
// easter-eggs.js - Sistema de huevos de pascua (sorpresas ocultas)
// ============================================================
// Los "easter eggs" son objetos secretos escondidos por el mundo
// del juego. Cada uno esta basado en la personalidad de un
// miembro del equipo de desarrollo. Son divertidos de encontrar
// y algunos dan ventajas utiles al jugador.
//
// Para encontrarlos, el jugador tiene que explorar a fondo
// cada ubicacion del mapa. No son necesarios para completar
// el juego, pero si para el 100%!
// ============================================================

// --- Lista de todos los easter eggs del juego ---
// Cada easter egg tiene:
//   id: identificador unico (para guardar cuales ya encontraste)
//   nombre: el nombre que aparece en el inventario
//   descripcion: texto divertido que explica que es
//   tipo: que clase de objeto es (objeto, consumible, arma, especial)
//   efecto: que pasa cuando lo usas
//   ubicacion: donde esta escondido en el mapa
export const EASTER_EGGS = [
  {
    id: 'cuchara_elian',
    nombre: 'La Cuchara Legendaria',
    descripcion: 'Una cuchara mistica para rascarse la espalda. Segun la leyenda, pertenecio al gran explorador Elian.',
    tipo: 'objeto',
    efecto: 'Restaura 10 de resistencia al usarla',
    ubicacion: 'cueva_pomier'
  },
  {
    id: 'papas_theo',
    nombre: 'Papas Fritas del Velocista',
    descripcion: 'Papas fritas que brillan con energia supersonica. Te hacen correr mas rapido!',
    tipo: 'consumible',
    efecto: '+50% velocidad por 30 segundos',
    ubicacion: 'asentamiento_taino_1'
  },
  {
    id: 'shawarma_carlos',
    nombre: 'Shawarma Arqueologico',
    descripcion: 'Un shawarma de pollo perfectamente conservado durante siglos. Carlos Guillermo lo aprobaria.',
    tipo: 'consumible',
    efecto: 'Restaura 50 vida y 30 hambre',
    ubicacion: 'la_isabela'
  },
  {
    id: 'sable_laser_jules',
    nombre: 'Sable de Luz Antiguo',
    descripcion: 'Parece una reliquia taina, pero emite un zumbido familiar... Que la fuerza te acompane!',
    tipo: 'arma',
    efecto: 'Arma especial que brilla en la oscuridad',
    ubicacion: 'cueva_secreta'
  },
  {
    id: 'sushi_alberto',
    nombre: 'Sushi del Bromista',
    descripcion: 'Sushi que te hace reir incontrolablemente. Efecto secundario: los enemigos tambien se rien.',
    tipo: 'consumible',
    efecto: 'Todos los enemigos se rien por 10 segundos',
    ubicacion: 'costa'
  },
  {
    id: 'guitarra_rafael',
    nombre: 'Guitarra de la Musica Epica',
    descripcion: 'Una guitarra que toca musica epica automaticamente. Los side quests se sienten mas heroicos.',
    tipo: 'especial',
    efecto: 'Activa musica epica y revela side quests cercanos',
    ubicacion: 'pueblo'
  },
  {
    id: 'balon_tom',
    nombre: 'Balon de Handball Inteligente',
    descripcion: 'Un balon de handball con IA incorporada. Tom estaria orgulloso.',
    tipo: 'arma_pacifica',
    efecto: 'Puede lanzarse para activar interruptores a distancia',
    ubicacion: 'escuela'
  },
  {
    id: 'hamburguesa_nael',
    nombre: "Hamburguesa Legendaria de Wendy's",
    descripcion: 'La hamburguesa perfecta. Tea dice que es la mejor del mundo. Tiene poderes misteriosos.',
    tipo: 'consumible',
    efecto: 'Restaura TODA la vida y hambre. Ultra raro.',
    ubicacion: 'barrio'
  }
];

export class EasterEggs {
  constructor() {
    // Un Set (conjunto) guarda los IDs de los easter eggs que ya encontramos
    // Usamos Set porque es mas rapido para buscar si algo ya esta adentro
    // comparado con un array normal
    this.easterEggsEncontrados = new Set();
  }

  // --- Verificar si hay un easter egg en la ubicacion actual ---
  // Cuando el jugador entra a una zona, revisamos si hay un
  // easter egg escondido ahi que todavia no haya encontrado.
  //
  // ubicacion: el ID de la zona donde esta el jugador (ej: 'cueva_pomier')
  // jugador: el objeto del jugador (para verificar condiciones)
  //
  // Retorna el easter egg si hay uno, o null si no hay nada
  verificarEasterEgg(ubicacion, jugador) {
    // Buscamos si hay algun easter egg en esta ubicacion
    // que el jugador todavia NO haya recogido
    const easterEgg = EASTER_EGGS.find(
      ee => ee.ubicacion === ubicacion && !this.easterEggsEncontrados.has(ee.id)
    );

    // Si no encontramos nada, devolvemos null
    if (!easterEgg) return null;

    // Si encontramos uno, lo devolvemos para que el juego
    // pueda mostrar una notificacion o animacion especial
    return easterEgg;
  }

  // --- Recoger un easter egg ---
  // El jugador decidio recoger el easter egg. Lo marcamos como
  // encontrado y lo agregamos a su inventario.
  //
  // id: el ID del easter egg (ej: 'cuchara_elian')
  // jugador: el objeto del jugador donde guardar el objeto
  //
  // Retorna un objeto con el mensaje de dialogo especial
  recogerEasterEgg(id, jugador) {
    // Buscamos el easter egg por su ID
    const easterEgg = EASTER_EGGS.find(ee => ee.id === id);

    // Si no existe o ya lo encontramos, no hacemos nada
    if (!easterEgg || this.easterEggsEncontrados.has(id)) {
      return null;
    }

    // Marcamos el easter egg como encontrado
    this.easterEggsEncontrados.add(id);

    // Agregamos el objeto al inventario del jugador
    // (si el jugador tiene un inventario)
    if (jugador.inventario) {
      jugador.inventario.push({
        id: easterEgg.id,
        nombre: easterEgg.nombre,
        descripcion: easterEgg.descripcion,
        tipo: easterEgg.tipo,
        efecto: easterEgg.efecto
      });
    }

    // Calculamos el progreso actual
    const progreso = this.obtenerProgreso();

    // Devolvemos un dialogo especial para que el juego lo muestre
    return {
      titulo: 'Easter Egg Encontrado!',
      mensaje: `Encontraste: ${easterEgg.nombre}\n\n"${easterEgg.descripcion}"\n\nEfecto: ${easterEgg.efecto}`,
      progreso: `${progreso.encontrados}/${progreso.total} easter eggs encontrados`
    };
  }

  // --- Ver cuantos easter eggs hemos encontrado ---
  // Retorna un objeto con la cantidad encontrada y el total.
  // Util para mostrar el progreso en el menu del juego.
  obtenerProgreso() {
    return {
      encontrados: this.easterEggsEncontrados.size,
      total: EASTER_EGGS.length
    };
  }
}
