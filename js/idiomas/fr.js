// Traductions en français — pour les joueurs francophones du lycée
// La structure reflète exactement celle du fichier espagnol pour maintenir la cohérence

const fr = {
  menu: {
    titulo: 'ArcLycée',
    nuevoJuego: 'Nouvelle Partie',
    continuarJuego: 'Continuer la Partie',
    opciones: 'Options',
    idioma: 'Langue',
    creditos: 'Crédits'
  },

  seleccion: {
    eligePersonaje: 'Choisis ton Personnage',
    pepito: 'Pepito',
    pepita: 'Pepita',
    descripcion: 'Description',
    confirmar: 'Confirmer'
  },

  interfaz: {
    vida: 'Vie',
    inventario: 'Inventaire',
    guardar: 'Sauvegarder',
    mapa: 'Carte',
    misiones: 'Missions',
    opciones: 'Options'
  },

  // Les dialogues conservent certains mots en espagnol quand le contexte culturel l'exige
  dialogos: {
    intro: {
      linea1: "Qu'est-ce qui brille parmi les décombres de la construction ?",
      linea2: "On dirait... une relique ancienne ?",
      linea3: 'ATTENTION ! Le sol s\'effondre !',
      linea4: "...Où suis-je ? Ça ressemble à... une grotte."
    },

    // Le grand-père dominicain transmet des valeurs sur le patrimoine collectif
    abuelo: {
      saludo: 'Mon petit-enfant, la terre garde des secrets que seuls les curieux peuvent découvrir.',
      consejo1: 'Rappelle-toi : chaque pièce que tu trouves appartient au peuple, pas à une seule personne.'
    },

    // La grand-mère francophone reflète l'héritage éducatif franco-dominicain
    abuela: {
      saludo: "Mon petit/e, l'aventure t'attend ! Mais d'abord, prépare-toi bien.",
      consejo1: 'Dans chaque musée il y a une histoire... dans chaque histoire il y a un musée.'
    },

    // L'esprit taïno relie le joueur à l'histoire précolombienne
    espirituTaina: {
      saludo: "Jeune descendant/e, les cemíes t'ont choisi/e pour protéger ce qui reste de notre peuple.",
      revelacion: 'La grotte du Pomier cache plus de secrets que tu ne l\'imagines...'
    },

    // L'esprit africain honore l'héritage afro-descendant du pays
    espirituAfricano: {
      saludo: 'La force de tes ancêtres coule dans tes veines, jeune guerrier/ère.',
      sabiduria: "Tout trésor ne brille pas. Parfois le vrai trésor est la connaissance."
    },

    // Magnoboot ajoute humour et fonctionnalité en tant que compagnon robotique
    magnoboot: {
      presentacion: '¡BZZT! Je suis Magnoboot, robot excavateur modèle MX-7. Prêt à déblayer !',
      ayuda: 'Je détecte quelque chose de métallique sous ces roches ! Tu veux que je creuse ?'
    },

    // Viralata est le chien errant — reflète la faune urbaine dominicaine
    viralata: {
      descripcion: 'Le chien errant remue la queue avec excitation. Il semble avoir trouvé une piste...'
    },

    // Le Cemí Chauve-souris est lié à la mythologie taïno des grottes
    cemiMurcielago: {
      presentacion: 'Une chauve-souris spectrale apparaît parmi les ombres de la grotte...',
      vinculo: "Tu ressens une connexion ancestrale avec l'esprit Cemí."
    },

    cueva: {
      espirituIntro1: 'Jeune descendant/e... les cemíes t\'ont amené/e ici pour une raison.',
      espirituIntro2: 'Ces grottes gardent la mémoire de notre peuple taïno.',
      espirituIntro3: 'Cherche les pétroglyphes sacrés. Ils te montreront le chemin.',
      espirituIntro4: 'Fais attention aux graffitis... quelqu\'un a profané ce lieu.',

      petroSol: 'C\'est le pétroglyphe du Soleil. Les Taïnos l\'adoraient comme source de toute vie. Sa chaleur nourrissait les conucos et sa lumière guidait les pêcheurs.',
      petroMurcielago: 'Le Cemí Chauve-souris... Les Taïnos croyaient que les esprits des morts se transformaient en chauves-souris et habitaient les grottes.',
      petroCara: 'Un visage sculpté dans la roche. Il peut représenter un cacique ou un esprit ancestral qui protégeait la grotte.',
      petroEspiral: 'La spirale symbolise l\'eau et le mouvement éternel. La mer était sacrée pour les Taïnos — elle apportait la subsistance.',
      petroRana: 'La grenouille représentait la fertilité et la pluie. Sans pluie pas de récolte, sans récolte pas de peuple.',

      arqueologoIntro: 'Halte-là ! Qui es-tu ?',
      arqueologoReconoce: 'Attends... tu as trouvé des pétroglyphes ? Incroyable ! Je suis la Dre Martínez, archéologue.',
      arqueologoRegalo: 'Tiens, tu en auras besoin dehors. C\'est Magnoboot, un robot excavateur qui t\'aidera.',
      arqueologoDespedida: 'Prends soin du patrimoine. Chaque pièce que tu trouves appartient au peuple dominicain.',

      misionExplorar: 'Explore la grotte et trouve les pétroglyphes',
      misionSalir: 'Cherche la sortie de la grotte',
      misionArtefacto: 'Apporte l\'artefact à la sortie',
      caida: 'Tu es tombé/e dans le vide ! Retour au dernier point sûr.'
    },

    // Dialogues du village taïno — enseignent la vie quotidienne
    aldea: {
      cacique1: 'Bienvenue dans notre yucayeque, jeune voyageur/euse !',
      cacique2: 'Je suis Guacanagaríx, cacique de ce village. Mon peuple vit ici depuis des générations.',
      cacique3: 'Un yucayeque est notre village — avec des bohíos pour les familles et le caney où je vis.',
      cacique4: 'Parle aux villageois. Chacun a beaucoup à t\'apprendre sur notre mode de vie.',

      alfarera1: 'Bonjour ! Je fabrique un pot en argile pour cuisiner.',
      alfarera2: 'Les Taïnos étaient de grands potiers. Nos vases étaient décorés de visages et de figures.',
      alfarera3: 'Avec l\'argile nous faisions des marmites, des assiettes et des burenes — le burén sert à griller le casabe.',
      alfarera4: 'Le casabe est fait de yuca râpée et pressée. C\'est le pain de notre peuple !',

      pescador1: 'Bonjour ! La pêche a été bonne dans la rivière aujourd\'hui.',
      pescador2: 'Les Taïnos pêchaient avec des filets de coton, des nasses en osier et des hameçons en os.',
      pescador3: 'Nous faisions aussi des pirogues taillées dans un seul tronc de ceiba.',
      pescador4: 'Certaines pirogues pouvaient transporter jusqu\'à 50 personnes entre les îles des Caraïbes !',

      perro1: 'Un chien errant ! Il a l\'air amical... il a faim et te regarde avec des yeux suppliants.',
      perro2: 'Le chien remue la queue et s\'approche doucement. Il veut t\'accompagner !',
      perro3: 'C\'est décidé ! Tu l\'appelleras Viralata. Son nez peut flairer les objets cachés. Il rejoint ton équipe !',

      misionHablar: 'Parle aux 3 villageois',
      misionCompleta: 'Village exploré ! Retour à la carte (M)'
    },

    // Dialogues du deuxième village — agriculture, médecine et cérémonies
    aldea2: {
      behique1: 'Je suis Yuisa, le behique — guérisseur et guide spirituel de ce village.',
      behique2: 'Les plantes de cette île ont de grands pouvoirs curatifs que les dieux nous ont enseignés.',
      behique3: 'Nous utilisons le tabac dans la cérémonie de la cohoba, pour communiquer avec les cemíes.',
      behique4: 'La goyave guérit la fièvre, le jagua protège la peau et l\'aloès soigne les blessures.',

      agricultor1: 'Regarde nos conucos ! Chaque monticule de terre est un jardin de nourriture.',
      agricultor2: 'Les conucos sont des monticules où nous plantons. Ainsi la terre draine mieux et les racines poussent fortes.',
      agricultor3: 'Nous cultivons le yuca, le maïs, la patate douce, le piment et le tabac — tout ce dont nous avons besoin.',
      agricultor4: 'Le yuca est le plus important. Avec lui nous faisons le casabe, qui est notre pain quotidien.',

      musico1: 'Bienvenue au batey, le cœur de notre village !',
      musico2: 'Ici nous célébrons l\'areíto — notre grande cérémonie de musique, danse et mémoire.',
      musico3: 'Nous jouons des maracas en higüero, des güiros en calebasse et des tambours taillés dans des troncs de ceiba.',
      musico4: 'Dans l\'areíto nous chantons l\'histoire de notre peuple — pour que les jeunes n\'oublient jamais d\'où ils viennent.',

      behiqueCemi: 'L\'esprit du Cemí Chauve-souris t\'a choisi ! Il te guidera dans les grottes avec son écho-localisation.',

      misionHablar: 'Parle aux 3 villageois',
      misionCompleta: 'Village exploré ! Retour à la carte (M)'
    },

    // La Isabela — premier établissement européen en Amérique (1494)
    isabela: {
      soldado1: 'Halte ! Cette zone est interdite par ordre du Vice-roi !',
      soldado2: 'Personne ne peut entrer dans les ruines sans la permission de la Couronne !',
      soldadoPaz1: 'Tu as raison... ces ruines doivent être protégées, pas interdites.',
      soldadoPaz2: 'La Isabela a été fondée en 1494. C\'est la première ville européenne en Amérique.',

      cronista1: 'Je suis Fray Ramón Pané, le premier chroniqueur des Indes.',
      cronista2: 'J\'écris sur les coutumes des Taïnos pour qu\'elles ne soient pas perdues.',
      cronista3: 'Mon œuvre s\'appelle « Relation sur les antiquités des Indiens ».',
      cronista4: 'C\'est le premier livre écrit en Amérique. Protéger l\'histoire est mon devoir.',

      taino1: 'Je suis Guatiguaná. Mon peuple fut parmi les premiers à résister aux envahisseurs.',
      taino2: 'Les Espagnols nous ont forcés à chercher de l\'or. Beaucoup sont morts de travail forcé.',
      taino3: 'Mais notre culture n\'est pas morte. Elle vit dans les mots : hamac, canoë, tabac, maïs.',
      taino4: 'Chaque fois que tu dis « ouragan » ou manges du casabe, les Taïnos vivent encore.',

      cassa1: 'Je suis Roberto Cassá, historien. J\'étudie les origines de notre nation.',
      cassaSinArcabuz: 'Je cherche des artefacts coloniaux de La Isabela. Si tu trouves quelque chose, apporte-le moi — j\'ai quelque chose de précieux à t\'offrir en échange.',
      cassaVeArcabuz: 'Un arquebuse colonial ! On les utilisait à La Isabela depuis 1494. C\'est une pièce inestimable.',
      cassaIntercambio: 'Je te propose un échange : donne-moi l\'arquebuse pour le musée, et je te donne ma carte des sites coloniaux.',
      cassaEntrega: 'Marché conclu ! Avec cette carte tu pourras visiter la Zone Coloniale de Santo Domingo et d\'autres sites historiques.',
      cassaRepite: 'Utilise la carte coloniale pour visiter les sites historiques. Il y a tant à découvrir !',

      misionHablar: 'Explore les ruines de La Isabela',
      misionCompleta: 'La Isabela explorée ! Retour à la carte (M)'
    },

    // Zone Coloniale de Santo Domingo — Patrimoine Mondial de l'Humanité (UNESCO)
    zonaColonial: {
      constructor1: 'Dégage, gamin ! Ces vieilles pierres vont tomber pour faire place à mon hôtel !',
      constructor2: 'Personne ne m\'empêchera de construire ! Ces décombres ne valent rien !',
      constructorPaz1: 'Attends... Patrimoine de l\'Humanité ? Je n\'en avais aucune idée.',
      constructorPaz2: 'Je vais réunir mon équipe, mes investisseurs et inviter des historiens pour repenser le projet.',
      constructorPaz3: 'Un hôtel qui protège et met en valeur ces ruines... ça coûtera plus cher, mais ça lui donnera une valeur unique.',
      constructorPaz4: 'Ça pourrait même être plus rentable. Et en plus... c\'est la bonne chose à faire.',
      constructorDerrota1: 'D\'accord, d\'accord... tu m\'as fait réfléchir.',
      constructorDerrota2: 'Je parlerai aux investisseurs. On pourrait construire quelque chose qui respecte l\'histoire.',
      constructorRepite: 'J\'ai déjà parlé aux investisseurs. On va repenser l\'hôtel pour protéger les ruines. Ce sera unique !',

      arqueologa1: 'Je suis la Dre Pérez, archéologue du Musée de l\'Homme Dominicain.',
      arqueologa2: 'La Zone Coloniale a plus de 500 ans. Chaque pierre raconte une histoire.',
      arqueologa3: 'Il y a des trésors enfouis sous ces rues. Ton robot pourrait aider à les trouver.',
      arqueologa4: 'Appuie sur F pour que Magnoboot scanne le sol. S\'il détecte quelque chose, tu pourras creuser avec E.',

      guia1: 'Bienvenue dans la Zone Coloniale ! Je suis Don Rafael, guide certifié.',
      guia2: 'La Cathédrale Primada fut la première d\'Amérique. Sa construction a commencé en 1512 !',
      guia3: 'L\'Hôpital San Nicolás de Bari fut le premier hôpital du Nouveau Monde, fondé en 1503.',
      guia4: 'Et la Calle de las Damas est la première rue pavée d\'Amérique. Tu marches sur l\'histoire !',

      estudiante1: 'Salut ! Je suis María, j\'étudie l\'architecture à l\'UASD.',
      estudiante2: 'J\'étudie les techniques de construction coloniale. Ils utilisaient du corail fossilisé comme matériau !',
      estudiante3: 'Le Monastère San Francisco fut le premier d\'Amérique. Aujourd\'hui ses ruines accueillent des concerts.',
      estudiante4: 'Le Panthéon National était une église jésuite. Il abrite maintenant les restes de nos héros nationaux.',

      // Fabiola Herrera — Directrice du Bénévolat, Musée de la Cathédrale
      fabiola1: 'Bienvenue au Musée de la Cathédrale ! Je suis Fabiola Herrera, directrice du bénévolat.',
      fabiola2: 'Ce musée est installé dans l\'ancienne Prison Royale de Santo Domingo. Nous l\'avons restaurée pour préserver des siècles d\'histoire et de foi.',
      fabiola3: 'Nous avons 15 salles avec des trésors du XVIe au XXe siècle : le portapax de Colomb, des croix pectorales, l\'Aigle Bicéphale, le Chœur Bas de la Cathédrale...',
      fabiola4: 'Je suis mathématicienne. J\'ai travaillé sur des projets technologiques toute ma vie, mais un jour j\'ai découvert que ma vraie mission était de transformer ce rêve en réalité.',
      fabiola5: 'Un musée n\'est pas qu\'un espace d\'exposition. C\'est un voyage qui transporte le visiteur dans un passé rempli d\'art et de dévotion.',
      fabiola6: 'Chaque objet ici raconte une histoire. La Pierre Pentagonale, les sculptures restaurées avec leur patine originale... tout parle !',

      // Roberto Cassá — conversations rotatives (mentor récurrent)
      cassaZC1: 'On se retrouve ! Je suis venu étudier la Zone Coloniale.',
      cassaZC2: 'Cet endroit a plus de 500 ans d\'histoire. Chaque coin cache un secret.',

      cassaConflicto1: 'Tu as vu le constructeur ? Ça arrive souvent : des entrepreneurs qui veulent démolir pour construire.',
      cassaConflicto2: 'Mais l\'histoire ne se remplace pas. Un hôtel neuf se construit en mois... ces pierres ont pris des siècles.',
      cassaConflicto3: 'Le mieux, c\'est quand ils arrivent à s\'intégrer : modernité et patrimoine qui coexistent. Tout le monde y gagne.',

      cassaDatos1: 'Savais-tu que la Cathédrale Primada abrite les restes attribués à Christophe Colomb ?',
      cassaDatos2: 'L\'Hôpital San Nicolás de Bari soignait Espagnols et indigènes de façon égale. Révolutionnaire pour l\'époque.',
      cassaDatos3: 'La Calle de las Damas tient son nom des dames de la cour de María de Toledo qui s\'y promenaient.',

      cassaPatrimonio1: 'L\'UNESCO a déclaré cette zone Patrimoine de l\'Humanité en 1990.',
      cassaPatrimonio2: 'Cela signifie qu\'elle appartient à tous les peuples du monde, pas seulement à nous.',
      cassaPatrimonio3: 'Protéger le patrimoine, ce n\'est pas juste conserver des pierres — c\'est garder vivante la mémoire de qui nous sommes.',

      cassaCalle1: 'Tu vois cette rue ? C\'est la Calle de las Damas — la première rue pavée d\'Amérique.',
      cassaCalle2: 'Elle a été tracée sur ordre de Nicolás de Ovando en 1502. Les gouverneurs et leurs familles y passaient.',
      cassaCalle3: 'On raconte que les dames de la cour de María de Toledo s\'y promenaient chaque après-midi. D\'où son nom.',

      cassaReloj1: 'As-tu vu le Cadran Solaire ? C\'est l\'un des plus anciens d\'Amérique.',
      cassaReloj2: 'Il a été construit au XVIe siècle pour que les habitants de la ville puissent mesurer le temps.',
      cassaReloj3: 'Avant les horloges mécaniques, le soleil était le seul chronomètre. Cette colonne projetait son ombre sur les repères horaires.',

      cassaPista1: 'Tu as beaucoup appris sur les Taïnos et les colonisateurs...',
      cassaPista2: 'Mais il y a un monde que tu n\'as pas encore exploré : la mer qui entoure notre île.',
      cassaPista3: 'Les océans cachent des trésors et des dangers. Baleines, tortues, récifs... et des menaces à affronter.',
      cassaPista4: 'Quand tu seras prêt/e, le Monde Aquatique t\'attend. Bonne chance, jeune archéologue !',

      // Gardes du Panthéon National — Premier Régiment de la Garde Présidentielle
      guardia1: 'Les gardes ne peuvent pas parler pendant leur service. C\'est le protocole militaire.',
      guardia2: 'Ce sont des membres du Premier Régiment Dominicain de la Garde Présidentielle.',
      guardia3: 'Ils gardent l\'entrée du Panthéon National, où reposent les restes des héros de la patrie.',
      guardia4: 'À intervalles réguliers, ils effectuent la relève de la garde : une cérémonie solennelle où deux gardes relèvent les précédents.',
      guardia5: 'À l\'intérieur du Panthéon brûle une flamme qui ne s\'éteint jamais — symbole éternel du sacrifice des pères de la nation.',

      // Combat Constructeur Méndez — options d'activisme citoyen
      combatePista: 'Utilise l\'activisme citoyen pour remplir la barre de Patience',
      accionRedes: 'Réseaux Sociaux',
      accionRedesMsg: 'Tu publies des photos des ruines menacées en ligne !',
      respuestaRedes: 'Méndez paie des influenceurs pour promouvoir son hôtel.',
      accionProtestas: 'Manifestation',
      accionProtestasMsg: 'Tu organises une manifestation devant le chantier !',
      respuestaProtestas: 'Méndez parraine une fête et des concerts pour la communauté.',
      accionDenuncia: 'Dénoncer',
      accionDenunciaMsg: 'Tu dénonces la démolition aux autorités !',
      respuestaDenuncia: 'Méndez négocie des permis et exceptions avec les politiciens.',
      accionLegal: 'Voie Légale',
      accionLegalMsg: 'Tu déposes un recours légal pour arrêter les travaux !',
      respuestaLegal: 'Méndez utilise des manœuvres juridiques pour retarder tout en continuant à construire.',

      misionExplorar: 'Explore la Zone Coloniale',
      misionCompleta: 'Zone Coloniale explorée ! Retour à la carte (M)'
    }
  },

  // Le combat privilégie la résolution pacifique — reflète l'approche éducative du jeu
  combate: {
    atacar: 'Attaquer',
    hablar: 'Parler',
    negociar: 'Négocier',
    huir: 'Fuir',
    persuadir: 'Persuader',
    educar: 'Éduquer',
    pacificar: 'Pacifier'
  },

  objetos: {
    linterna: 'Lampe torche',
    navaja: 'Couteau suisse',
    brujula: 'Boussole',
    mapa: 'Carte Ancienne',
    magnetometro: 'Magnétomètre',
    fragmentoMapa: 'Fragment de Carte',
    artefactoTaino: 'Artefact Taïno',

    descLinterna: 'Éclaire l\'obscurité des grottes. Augmente ton rayon de vision.',
    descNavaja: 'Outil multifonction. Utile pour couper des lianes et ouvrir des serrures.',
    descBrujula: 'Indique le nord. T\'aide à ne pas te perdre dans les grands espaces.',
    descMapa: 'Une carte ancienne avec des marques mystérieuses de sites archéologiques.',
    descFragmentoMapa: 'Un morceau de carte ancienne. Il semble montrer d\'autres grottes.',
    descArtefactoTaino: 'Un cemí doré. Il doit être emmené au musée pour étude.',
    descMagnetometro: 'Détecte les objets métalliques enterrés sous terre.',

    arcabuz: 'Arquebuse Coloniale',
    descArcabuz: 'Arme à feu du XVe siècle utilisée par les conquistadors. Pièce de musée.',
    mapaColonial: 'Carte Coloniale',
    descMapaColonial: 'Carte montrant les sites coloniaux les plus importants de l\'île. Cadeau de Roberto Cassá.',

    planoColonial: 'Plan Architectural',
    descPlanoColonial: 'Plan original de la Cathédrale Primada d\'Amérique. Document historique inestimable.',
    monedaColonial: 'Monnaie de la Couronne',
    descMonedaColonial: 'Monnaie espagnole du XVIe siècle trouvée sous les rues de la Zone Coloniale.',
    azulejoAntiguo: 'Carreau Colonial',
    descAzulejoAntiguo: 'Carreau de céramique décorée de l\'époque coloniale. Technique venue d\'Espagne.',
    llaveHierro: 'Clé en Fer',
    descLlaveHierro: 'Clé coloniale en fer forgé. Elle pourrait ouvrir une porte ancienne.'
  },

  inventario: {
    titulo: 'Inventaire',
    vacio: 'Ton sac est vide',
    lleno: 'Sac plein',
    usar: '[E] Utiliser',
    cerrar: '[I] ou [Q] Fermer',
    slots: 'slots'
  },

  // Les mondes représentent des couches thématiques de l'histoire dominicaine
  mundos: {
    taino: 'Monde Taïno',
    colonial: 'Monde Colonial',
    acuatico: 'Monde Aquatique',
    juridico: 'Monde Juridique',
    laboratorio: 'Laboratoire / Musée'
  },

  // Le climat affecte le gameplay et reflète les phénomènes réels des Caraïbes
  clima: {
    soleado: 'Ensoleillé',
    lluvia: 'Pluie',
    huracan: 'Ouragan !',
    terremoto: 'Tremblement de terre !'
  },

  guardado: {
    guardarPartida: 'Sauvegarder la Partie',
    cargarPartida: 'Charger la Partie',
    nombreSesion: 'Nom de la session',
    contrasena: 'Mot de passe',
    guardarLocal: 'Sauvegarder Localement',
    guardarNube: 'Sauvegarder dans le Cloud',
    guardadoExitoso: 'Partie sauvegardée !',
    errorGuardado: 'Erreur lors de la sauvegarde'
  },

  tutorial: {
    bienvenida: 'Bienvenue dans ArcLycée !',
    movimiento: 'Utilise les flèches ou WASD pour te déplacer',
    accion: 'Appuie sur E pour interagir avec les objets et personnages',
    saltar: 'Appuie sur ESPACE pour sauter (dans les zones de plateformes)'
  }
};

export default fr;
