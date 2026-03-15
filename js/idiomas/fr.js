// Traductions en français — pour les joueurs francophones du lycée
// La structure reflète exactement celle du fichier espagnol pour maintenir la cohérence

const fr = {
  menu: {
    titulo: 'ArcLycée',
    nuevoJuego: 'Nouvelle Partie',
    continuarJuego: 'Continuer la Partie',
    opciones: 'Options',
    idioma: 'Langue',
    creditos: 'Crédits',
    mapaReal: 'Carte Réelle',
    documentacion: 'Documentation',
    controlesTactiles: 'Contrôles tactiles',
    joystick: 'Joystick',
    cruceta: 'Croix directionnelle',
    descJoystick: 'Stick analogique — glissez pour bouger',
    descCruceta: 'Boutons directionnels classiques',
    opcionesVolver: 'Appuyez sur Q / Échap pour revenir'
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
    opciones: 'Options',
    muerteFrases: [
      'On a fait ce qu\'on a pu, bye...',
      "Livin' la vida loca, no more!",
      'Houston, on a un problème...',
      'Game over, man!',
      'GG no re',
      'F dans le chat...',
      'Wasted.',
      'Maman, viens me chercher !',
      'Erreur 404 : vie introuvable',
      'Respawn avec dignité...'
    ]
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
      arqueologoGuanin: 'Fascinant ! Aucun cemí entièrement en or n\'a jamais été trouvé, mais les Taïnos ornaient leurs cemíes de guanín — un alliage d\'or, d\'argent et de cuivre — surtout sur les yeux et les organes sensoriels.',
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
      alfarerVasija: 'Prends ce vase avec de la pulpe de calebasse, de la sève de maguey et du figuier de barbarie. C\'est notre médecine naturelle !',
      alfareraSaludo: 'Continue à créer de l\'art avec l\'argile de notre terre !',

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
      behiqueCurar: 'Laisse-moi te préparer un remède avec des herbes sacrées. Tu seras comme neuf !',
      behiqueCuroToast: 'Le behique t\'a soigné',
      behiqueSano: 'Tu as l\'air en bonne santé. Que les cemíes te protègent dans ton voyage !',

      agricultor1: 'Regarde nos conucos ! Chaque monticule de terre est un jardin de nourriture.',
      agricultor2: 'Les conucos sont des monticules où nous plantons. Ainsi la terre draine mieux et les racines poussent fortes.',
      agricultor3: 'Nous cultivons le yuca, le maïs, la patate douce, le piment et le tabac — tout ce dont nous avons besoin.',
      agricultor4: 'Le yuca est le plus important. Avec lui nous faisons le casabe, qui est notre pain quotidien.',
      agricultorGuanabana: 'Prends ces feuilles et graines de corossol. Elles sont très médicinales pour le voyage !',
      agricultorSaludo: 'Les conucos donnent une bonne récolte aujourd\'hui !',

      musico1: 'Bienvenue au batey, le cœur de notre village !',
      musico2: 'Ici nous célébrons l\'areíto — notre grande cérémonie de musique, danse et mémoire.',
      musico3: 'Nous jouons des maracas en higüero, des güiros en calebasse et des tambours taillés dans des troncs de ceiba.',
      musico4: 'Dans l\'areíto nous chantons l\'histoire de notre peuple — pour que les jeunes n\'oublient jamais d\'où ils viennent.',

      behiqueCemi: 'L\'esprit du Cemí Chauve-souris t\'a choisi ! Il te guidera dans les grottes avec son écho-localisation.',

      // Batú — dialogues de Higüemota pour le mini-jeu
      batuOferta1: 'Tu veux jouer au batú ? C\'est notre jeu de balle sacré.',
      batuOferta2: 'On frappe avec les hanches, les épaules et la tête. Jamais avec les mains !',
      batuAceptar: 'Oui, jouons !',
      batuRechazar: 'Pas maintenant, peut-être plus tard.',
      batuOfertaRepite: 'Prêt pour le batú ? Le batey t\'attend !',
      batuPendiente: '🏐 Quête en attente : Batú',
      batuReputacion: 'Batú terminé',
      batuVictoria: 'Impressionnant ! Tu joues comme un vrai Taïno.',
      batuDerrota: 'Bon essai ! Le batú demande beaucoup de pratique.',
      batuRepite: 'C\'était un super match ! Le batú unit les villages et résout les conflits sans violence.',

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
      combatePista: 'Utilise l\'activisme citoyen pour convaincre le Constructeur',
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
    },

    // Monde Aquatique — Épave de la Santa María
    acuatico: {
      pescador1: 'Bienvenue au fond de la mer, gamin ! Je suis Manuel, pêcheur de Montecristi.',
      pescador2: 'Ici reposent les restes de la Santa María, le navire amiral de Colomb.',
      pescador3: 'La Santa María s\'est échouée sur un récif la nuit de Noël 1492. Ses bois ont servi à construire le Fort Navidad.',
      pescador4: 'Attention aux méduses ! Leur piqûre fait mal et te ralentit.',

      tortuga1: 'Je suis une tortue imbriquée. Mon espèce nage dans ces mers depuis 100 millions d\'années.',
      tortuga2: 'Nous sommes en danger critique d\'extinction. On nous chasse pour notre carapace, utilisée en bijouterie.',
      tortuga3: 'Les récifs coralliens sont notre maison. Si le corail meurt, nous aussi.',
      tortuga4: 'Les tortues imbriquées mangent des éponges marines toxiques pour d\'autres animaux. Nous sommes les gardiennes du récif !',

      arqueologa1: 'Je suis archéologue sous-marine. J\'étudie les épaves des Caraïbes dominicaines.',
      arqueologa2: 'Il y a plus de 400 épaves répertoriées au large des côtes de cette île.',
      arqueologa3: 'Chaque épave est une capsule temporelle. Les clous, céramiques et monnaies nous racontent l\'histoire.',
      arqueologa4: 'Prends cette carte des épaves. Elle t\'aidera à trouver d\'autres sites sous-marins.',
      arqueologaRepite: 'Utilise la carte des épaves pour trouver d\'autres vestiges sous-marins. La mer des Caraïbes cache bien des secrets !',
      arqueologaRobot1: 'Un robot sous-marin ! Ils l\'ont programmé au LFSD ? Impressionnant !',
      arqueologaRobot2: 'Avec ce robot, je pourrai explorer des zones trop profondes ou dangereuses pour les plongeurs.',
      arqueologaRobot3: 'Regarde ! Le robot a déjà trouvé des signaux de 4 épaves que nous n\'avions pas répertoriées.',
      arqueologaRobot4: 'J\'ai ajouté les nouvelles découvertes à ta carte des épaves. La technologie et l\'archéologie font une super équipe !',
      arqueologaPostRobot: 'Le robot continue de scanner les fonds marins. Il trouve quelque chose de nouveau chaque jour. Merci de l\'avoir apporté !',

      pezLeonIntro1: 'Un poisson-lion ! Cette espèce invasive de l\'Indo-Pacifique détruit les récifs des Caraïbes.',
      pezLeonIntro2: 'Il mange jusqu\'à 30 espèces indigènes et n\'a aucun prédateur naturel ici. Il faut agir !',
      pezLeonPaz1: 'La pêche contrôlée maintiendra l\'équilibre du récif.',
      pezLeonPaz2: 'Savais-tu que la chair du poisson-lion est délicieuse et nutritive ? Me manger est écologique !',
      pezLeonDerrota: 'Le poisson-lion se retire... mais d\'autres viendront si l\'invasion n\'est pas contrôlée.',

      combatePista: 'Utilise des actions écologiques pour contrôler l\'envahisseur',
      etiquetaControl: 'Contrôlé :',
      accionAtrapar: 'Capturer',
      accionAtraparMsg: 'Tu essaies d\'attraper le poisson-lion avec un filet pour l\'aquarium !',
      respuestaAtrapar: 'Le poisson-lion hérisse ses épines venimeuses. Attention à la piqûre !',
      accionPescar: 'Pêcher',
      accionPescarMsg: 'Tu prépares le harpon ! Le poisson-lion est comestible et le pêcher aide le récif.',
      respuestaPescar: 'Il se reproduit vite ! Pendant que tu en pêches un, des juvéniles apparaissent.',
      accionProteger: 'Protéger le Corail',
      accionProtegerMsg: 'Tu places des barrières pour protéger le corail et les poissons herbivores !',
      respuestaProteger: 'Le poisson-lion dévore les poissons herbivores. Sans eux, les algues envahissent le corail.',
      accionAlertar: 'Alerter les Plongeurs',
      accionAlertarMsg: 'Tu alertes d\'autres plongeurs pour organiser une journée de retrait !',
      respuestaAlertar: 'Le poisson-lion chasse les jeunes poissons-perroquets. Sans eux le corail ne sera pas nettoyé !',

      medusaPicadura: 'Piqûre de méduse ! Mouvement ralenti',

      cantoBallenaCerca: 'Tu entends le chant d\'une baleine à bosse au loin !',

      misionExplorar: 'Explore l\'épave de la Santa María',
      misionCompleta: 'Épave explorée ! Retour à la carte (M)'
    },

    // Sanctuaire du Lamantin — sous-niveau marin avec actions écologiques
    santuario: {
      biologa1: 'Bienvenue au Sanctuaire du Lamantin ! Je suis le Dr Sofía, biologiste marine.',
      biologa2: 'Les lamantins des Antilles sont en danger d\'extinction. Il en reste moins de 2 500 dans toutes les Caraïbes.',
      biologa3: 'La Loi 64-00 protège la biodiversité dominicaine. Blesser un lamantin est un délit environnemental.',
      biologa4: 'Les lamantins se retrouvent piégés par accident dans des filets de pêche abandonnés — on les appelle « filets fantômes ».',
      biologa5: 'Pour les libérer sans leur faire de mal, il faut couper le filet avec précaution, sans toucher l\'animal. Un lamantin effrayé peut s\'agiter et se blesser davantage.',
      biologa6: 'Il y a un lamantin adulte piégé en ce moment ! Va au filet fantôme à l\'est et appuie sur [E] pour le couper. Vite, mais calmement !',

      tortugaVerde1: 'Je suis une tortue verte. Contrairement à l\'imbriquée, je mange des algues et des herbiers marins.',
      tortugaVerde2: 'Les déchets marins nous tuent. Nous confondons les sacs plastiques avec des méduses et les mangeons.',
      tortugaVerde3: 'Regarde tous ces déchets piégés dans le récif. Ils étouffent le corail !',
      tortugaVerde4: 'Si tu ramasses les déchets, le récif pourra respirer et se rétablir. Chaque geste compte !',

      manatiBebe1: 'Le bébé lamantin pleure doucement ! Sa mère est piégée dans le filet plus loin.',
      manatiBebe2: 'Il te regarde avec de grands yeux et nage vers l\'est, te guidant...',

      liberarManati: 'Lamantin libéré ! La mère et son petit nagent ensemble à nouveau.',
      necesitasBiologa: 'Tu dois d\'abord parler à la biologiste pour savoir comment libérer le lamantin.',
      recogerDesecho: 'Déchet ramassé',
      limpiezaCompleta: 'Récif nettoyé ! Les coraux pourront se rétablir sans déchets.',
      necesitasTortuga: 'Parle à la tortue verte pour comprendre pourquoi le nettoyage est important.',

      objHablar: 'Parler aux habitants',
      objManati: 'Libérer le lamantin',
      objArrecife: 'Nettoyer le récif',

      misionExplorar: 'Explore le Sanctuaire du Lamantin',
      misionCompleta: 'Sanctuaire protégé ! Retour à la carte (M)',

      tiburonAlerta: 'Requin à proximité ! Éloigne-toi !',
      zonaHelice: 'Zone d\'hélices ! Danger !',

      dienteDescripcion: 'Dent fossile de requin mégalodon. La preuve que ces géants nageaient ici il y a des millions d\'années.',

      cantoBallenaCerca: 'Une baleine à bosse chante tout près ! Elles migrent ici chaque hiver depuis l\'Atlantique Nord.',

      // Robot sous-marin — livraison du robot programmé au LFSD
      biologaRobot1: 'Le robot sous-marin du LFSD ! Incroyable, vous avez réussi !',
      biologaRobot2: 'Avec ça je pourrai explorer les zones les plus profondes du sanctuaire et les récifs alentour.',
      biologaRobot3: 'Regarde ! Le robot a déjà détecté des signaux de 4 épaves qu\'on n\'avait pas recensées.',
      biologaRobot4: 'J\'ai ajouté les découvertes à ta carte des épaves. La technologie et la biologie marine font une super équipe !',
      biologaPostRobot: 'Le robot continue de scanner les fonds marins. Chaque jour il trouve quelque chose de nouveau. Merci de l\'avoir apporté !'
    },

    // Monde Juridique — Aéroport de Punta Cana (Acte 4)
    juridico: {
      draMartinez1: 'Je t\'attendais ! La carte des épaves a révélé quelque chose d\'inquiétant.',
      draMartinez2: 'Quelqu\'un fait sortir des artefacts archéologiques du pays par cet aéroport.',
      draMartinez3: 'Il nous faut des preuves solides. Parle à l\'Agent des Douanes et à l\'Inspecteur d\'INTERPOL.',
      draMartinez4: 'Maître Carmen Vidal te conseillera sur les lois de protection du patrimoine.',
      draMartinezRepite: 'Parle à l\'Agent Montero aux douanes. Elle peut te donner les registres.',
      draMartinezPostCombate: 'Tu as réussi ! Les artefacts seront rendus au Musée de l\'Homme Dominicain.',

      agente1: 'Je suis l\'Agent Rosa Montero, des Douanes. J\'ai détecté des mouvements suspects.',
      agente2: 'La Loi 318-68 interdit l\'exportation de tout bien du patrimoine culturel dominicain.',
      agente3: 'Les amendes vont de 500 à 10 000 salaires minimums, plus 2 à 10 ans de prison.',
      agente4: 'J\'ai préparé un registre douanier avec les anomalies. Cherche-le près de la machine à rayons X.',
      agenteRepite: 'Le registre douanier est près de la machine à rayons X. Récupère-le comme preuve.',
      agentePostCombate: 'Cette affaire fera jurisprudence. La Loi 318 s\'applique dans toute sa rigueur.',

      inspector1: 'Inspecteur Ramírez, INTERPOL. Nous traquons un réseau de trafic d\'antiquités.',
      inspector2: 'INTERPOL possède une base de données d\'œuvres d\'art volées avec plus de 52 000 entrées.',
      inspector3: 'La coopération internationale est essentielle. Un artefact volé en RD peut apparaître aux enchères en Europe.',
      inspector4: 'Avec tes preuves et la Loi 318, nous pouvons lancer une alerte internationale contre Torres.',
      inspectorRepite: 'Rassemble toutes les preuves possibles avant d\'affronter le suspect.',
      inspectorPostCombate: 'INTERPOL a émis l\'alerte. Ce trafiquant n\'échappera pas à la justice internationale.',

      carmen1_1: 'Je suis Maître Carmen Vidal, spécialiste en droit du patrimoine.',
      carmen1_2: 'La Loi 318-68 déclare patrimoine national tout objet archéologique trouvé en sol dominicain.',
      carmen1_3: 'Personne ne peut exporter, vendre ni détruire des biens patrimoniaux sans l\'autorisation de l\'État.',
      carmen2_1: 'La Convention UNESCO de 1970 est le cadre international contre le trafic de biens culturels.',
      carmen2_2: 'Plus de 140 pays l\'ont ratifiée. Elle oblige à restituer les biens culturels volés à leur pays d\'origine.',
      carmen3_1: 'Pour signaler un trafic de patrimoine, on dépose une plainte au Ministère de la Culture.',
      carmen3_2: 'Tu peux aussi aller au Parquet Général. Ils activent la chaîne judiciaire.',
      carmen4_1: 'Le Ministère de la Culture protège le patrimoine national à travers la Direction du Patrimoine Monumental.',
      carmen4_2: 'Ils tiennent le registre des biens culturels et autorisent — ou refusent — toute exportation.',
      carmen5_1: 'En 2014, la RD a récupéré des artefacts taïnos vendus illégalement à des collectionneurs européens.',
      carmen5_2: 'Grâce à INTERPOL et la Loi 318, les pièces sont retournées au Musée de l\'Homme Dominicain.',

      traficante1: 'Qu\'est-ce que tu veux, gamin ? J\'attends mon vol.',
      traficante2: 'Des artefacts ? Je ne vois pas de quoi tu parles. Cette valise contient... des souvenirs.',
      traficantePaz1: 'Les preuves sont accablantes. Torres se rend aux autorités.',
      traficantePaz2: 'Les artefacts seront rendus au Musée de l\'Homme Dominicain.',
      traficanteDerrota: 'Torres est arrêté. L\'affaire passe devant les tribunaux.',
      traficantePostCombate: 'Vous m\'avez eu... mais c\'est plus grand que moi. Il y a tout un réseau.',

      // Cinématique d'arrestation
      arrestoInspector1: 'Rodrigo Torres, vous êtes en état d\'arrestation pour trafic illicite de biens culturels.',
      arrestoAgente1: 'Vous avez le droit à un avocat. Tout ce que vous direz pourra être retenu contre vous.',
      arrestoTorres1: 'Vous ne pouvez pas me faire ça ! J\'ai des contacts !',
      arrestoInspector2: 'Vos contacts ne vous sauveront pas. INTERPOL a alerté toutes les douanes des Caraïbes.',
      arrestoAgente2: 'Emmenez-le. Les artefacts sont confisqués comme pièces à conviction.',
      inspectorPostArresto: 'Torres est en détention. INTERPOL enquêtera sur tout son réseau.',

      etiquetaEvidencia: 'Preuve :',
      combatePista: 'Utilise les lois et les preuves pour construire un dossier juridique',
      accionLey318: 'Loi 318',
      accionLey318Msg: 'Tu cites la Loi 318-68 sur le Patrimoine Culturel !',
      respuestaLey318: 'Torres montre des permis d\'exportation falsifiés.',
      accionForense: 'Preuve',
      accionForenseMsg: 'Tu présentes les preuves forensiques d\'authenticité !',
      respuestaForense: 'Torres prétend que ce sont des répliques artisanales.',
      accionInterpol: 'INTERPOL',
      accionInterpolMsg: 'Tu actives l\'alerte internationale d\'INTERPOL !',
      respuestaInterpol: 'Torres menace de fuir vers une autre juridiction.',
      accionUnesco: 'UNESCO 1970',
      accionUnescoMsg: 'Tu invoques la Convention UNESCO de 1970 !',
      respuestaUnesco: 'Torres essaie de corrompre pour qu\'on le laisse partir.',

      misionExplorar: 'Enquête sur le trafic d\'artefacts',
      misionCompleta: 'Affaire résolue ! Retour à la carte (M)'
    },

    // Monde Laboratoire — Musée des Atarazanas Reales (Acte 5)
    laboratorio: {
      morban1: 'Bienvenue au Musée des Atarazanas Reales. Je suis le Dr Fernando Morbán, directeur.',
      morban2: 'Ce musée conserve les trésors récupérés des épaves des Caraïbes.',
      morban3: 'Chaque artefact qui arrive doit être authentifié. Sans authentification, pas de valeur historique.',
      morban4: 'Parle à la Dre López au labo et à Ana à la restauration. Elles t\'enseigneront le processus.',
      morbanRepite: 'Visite le labo C-14 et l\'atelier de restauration. La science protège l\'histoire.',
      morbanPostEntrega: 'La Dre López est ravie de l\'équipement réparé. Les jeunes du LFSD savent vraiment ce qu\'ils font.',
      morbanPostDescubrimiento: 'La découverte de la Dre López a mis notre musée sur la carte internationale ! Et tu en fais partie.',

      lopez1: 'Je suis la Dre López, spécialiste de la datation au Carbone-14.',
      lopez2: 'Le Carbone-14 est un atome radioactif absorbé par tous les êtres vivants. À leur mort, il commence à se décomposer.',
      lopez3: 'En mesurant le C-14 restant dans un objet organique, nous calculons son âge avec précision.',
      lopez4: 'C\'est ainsi qu\'on confirme si un artefact a 500 ans ou s\'il s\'agit d\'une falsification moderne !',
      lopezRepite: 'Rappelle-toi : la datation C-14 fonctionne avec les matériaux organiques — bois, os, tissu.',
      lopezEsperaEquipo: 'J\'ai entendu dire que les élèves du LFSD ont réparé l\'équipement ! Apporte-le-moi quand tu peux — j\'ai plein d\'échantillons en attente !',
      lopezRecibeEquipo1: 'L\'équipement d\'analyse ! Les élèves du LFSD l\'ont réparé ? Incroyable !',
      lopezRecibeEquipo2: 'Ça fait des semaines que je ne peux plus faire de datations précises. Ça change tout.',
      lopezRecibeEquipo3: 'Je vais recalibrer le spectromètre et commencer à analyser les échantillons en attente.',
      lopezRecibeEquipo4: 'Merci ! Reviens bientôt — j\'ai le pressentiment que cet équipement va nous réserver des surprises.',
      lopezDescubrimiento1: 'Tu ne vas pas en croire tes yeux ! L\'équipement réparé a détecté quelque chose d\'extraordinaire.',
      lopezDescubrimiento2: 'Nous avons trouvé des traces de guanín authentique dans un artefact qu\'on croyait être une réplique.',
      lopezDescubrimiento3: 'C\'est une pièce taïno originale de plus de 500 ans ! Ça change ce qu\'on savait du site.',
      lopezDescubrimiento4: 'Je vais publier les résultats. Les élèves du LFSD et toi serez co-auteurs de la découverte !',
      lopezPeriodico1: 'Regarde ! On est dans le journal ! Toi et les élèves du LFSD êtes mentionnés.',
      lopezPeriodico2: 'L\'article parle de la découverte et de comment la collaboration entre jeunes et scientifiques a rendu tout cela possible.',
      lopezPeriodico3: 'Tiens, garde un exemplaire. Tu l\'as bien mérité !',
      lopezPostPeriodico: 'L\'article a suscité un intérêt international ! Trois universités veulent déjà collaborer avec nous.',
      repEntregaEquipo: 'Équipement livré à la Dre López',
      repDescubrimiento: 'Découverte scientifique',

      ana1: 'Je suis Ana, restauratrice d\'artefacts. Mon travail est de réparer sans altérer.',
      ana2: 'La règle d\'or de la restauration : tout ce que tu fais doit être réversible.',
      ana3: 'Nous utilisons des adhésifs spéciaux, des consolidants et des microscopes pour ne pas endommager la pièce.',
      ana4: 'Un artefact mal restauré perd sa valeur historique pour toujours. La patience est la clé !',
      anaRepite: 'Restaurer, c\'est comme être médecin pour les artefacts : d\'abord, ne pas nuire.',
      anaPostEntrega: 'J\'ai appris que tu as apporté l\'équipement réparé. La Dre López ne parle que des tests qu\'elle va faire !',
      anaPostDescubrimiento: 'L\'artefact découvert par la Dre López a besoin de restauration ! C\'est la pièce la plus passionnante que j\'aie vue depuis des années.',

      cassa1_1: 'On se retrouve ! Ce musée est l\'un de mes endroits préférés.',
      cassa1_2: 'Les Atarazanas Reales étaient les entrepôts du port de Santo Domingo au XVIe siècle.',
      cassa2_1: 'Savais-tu que ce bâtiment a été restauré dans les années 70 ?',
      cassa2_2: 'La restauration a respecté la structure originale. C\'est comme ça qu\'il faut toujours faire.',
      cassa3_1: 'Les musées ne sont pas des entrepôts d\'objets anciens. Ce sont des lieux vivants.',
      cassa3_2: 'Chaque pièce ici raconte une histoire qui relie le passé au présent.',
      cassa4_1: 'La République Dominicaine compte plus de 60 musées.',
      cassa4_2: 'Du Musée de l\'Homme Dominicain au Mémorial de la Résistance.',
      cassa5_1: 'Tu as fait un long chemin, jeune archéologue.',
      cassa5_2: 'Des grottes du Pomier jusqu\'à ce musée, tu as appris à protéger le patrimoine.',

      sospechoso1: 'Psst ! Tu veux acheter une relique taïno authentique ? Prix spécial pour toi.',
      sospechoso2: 'Tu dis qu\'il faut un certificat ? Mais je l\'ai trouvée dans mon jardin...',
      sospechoso3: 'Tu as raison. Sans authentification scientifique, n\'importe qui peut vendre des faux.',
      sospechoso4: 'Je ferais mieux de l\'apporter au musée pour la faire examiner. Merci du conseil !',
      sospechosoRepite: 'J\'attends les résultats du labo. Pourvu que ce soit authentique !',

      misionExplorar: 'Explore le Musée des Atarazanas Reales',
      misionCompleta: 'Musée exploré ! Appuie sur M pour voir la fin',
      misionFinal: 'Mission accomplie ! Appuie sur M pour voir la fin',

      misionWSCompleta: 'Weird Science — Terminée',
      misionWSCompletaDesc: 'L\'équipement réparé a permis une découverte scientifique. Tu es dans le journal !'
    },

    // Fins — 5 séquences de clôture possibles
    finales: {
      completo: {
        linea1: 'Tu as maîtrisé chaque recoin de cette île : les mondes, les missions, les défis.',
        linea2: 'Tu as calibré le magnétomètre, programmé le robot, réparé l\'équipement, joué au batú et sauvé le lamantin.',
        linea3: 'Des grottes du Pomier au LFSD, tu as laissé ta marque partout.',
        linea4: 'Les artefacts sont dans les musées, les récifs se rétablissent, et la justice est arrivée.',
        linea5: 'Tu es la légende de Quisqueya. 100% complété.'
      },
      pacifista: {
        linea1: 'Tu as relevé tous les défis avec sagesse et paix.',
        linea2: 'Des grottes du Pomier au Musée des Atarazanas, tu as protégé le patrimoine dominicain.',
        linea3: 'Les artefacts sont en sécurité dans les musées. Les trafiquants face à la justice.',
        linea4: 'Le poisson-lion est sous contrôle. Les récifs se rétablissent.',
        linea5: 'Tu es un véritable gardien du patrimoine. L\'histoire se souviendra de toi.'
      },
      museo: {
        linea1: 'Les artefacts récupérés brillent sous les lumières du musée.',
        linea2: 'Le Dr Morbán inaugure la nouvelle salle d\'exposition avec tes découvertes.',
        linea3: 'Des pétroglyphes taïnos aux trésors coloniaux, chaque pièce raconte une histoire.',
        linea4: 'Les visiteurs découvrent la riche histoire de la République Dominicaine.',
        linea5: 'Le patrimoine est protégé. Ta mission est terminée... pour l\'instant.'
      },
      ecologico: {
        linea1: 'La mer des Caraïbes brille de couleurs renouvelées.',
        linea2: 'Grâce à tes actions écologiques, les récifs coralliens se rétablissent.',
        linea3: 'Les tortues imbriquées nagent librement. Les poissons indigènes reviennent.',
        linea4: 'Ton exemple a inspiré des communautés entières à protéger l\'environnement marin.',
        linea5: 'La nature et l\'histoire vont de pair. Protéger l\'une, c\'est protéger l\'autre.'
      },
      oscuro: {
        linea1: 'Les artefacts sont arrivés au musée, mais pas tous intacts.',
        linea2: 'La violence a laissé des traces. Certaines pièces ont été endommagées.',
        linea3: 'Le constructeur Méndez cherche toujours à démolir les ruines.',
        linea4: 'Les trafiquants se sont enfuis par d\'autres routes. Le réseau reste actif.',
        linea5: 'Le patrimoine mérite d\'être protégé avec intelligence, pas avec la force.'
      }
    }
  },

  // Batú — jeu de balle taïno (mini-jeu)
  batu: {
    titulo: 'BATÚ',
    tituloIntro: 'Jeu de Batú !',
    introDisputa1: 'Deux villages se disputent un territoire de pêche.',
    introDisputa2: 'Les caciques ont décidé de régler le conflit par un match de batú.',
    introDisputa3: 'Le gagnant obtient les droits de pêche !',
    introCeremonia1: 'C\'est jour d\'areíto ! Le village fête avec musique et jeux.',
    introCeremonia2: 'Higüemota te défie dans un match amical de batú.',
    introCeremonia3: 'Montre ton talent sur le batey !',
    reglas: 'Règles : frappe la balle avec les hanches, épaules ou la tête. Pas de mains ni pieds !',
    reglas2: 'Le premier à 3 points gagne. La balle ne doit pas toucher le sol de ton côté.',
    continuar: '[E] Continuer',
    controles: '← → bouger | Frappe avec le corps (hanche, épaule, tête, genou)',
    saqueJugador: 'Ton service !',
    saqueRival: 'Service du rival !',
    puntoJugador: 'Ton point !',
    puntoRival: 'Point pour le rival !',
    sabiasQue: 'Le savais-tu... ?',
    victoria: 'Victoire !',
    derrota: 'Défaite !',
    victoriaDisputa: 'Ton village gagne les droits de pêche ! Le batú a résolu le conflit sans violence.',
    derrotaDisputa: 'L\'autre village gagne. Mais le batú a évité un conflit violent.',
    victoriaCeremonia: 'Super match ! Higüemota te félicite. L\'areíto continue de plus belle.',
    derrotaCeremonia: 'Higüemota gagne cette fois. Mais l\'important, c\'est la fête !',
    datoFisica: 'La balle du batú était faite de latex d\'arbre de cupey. Elle était très rebondissante, de la taille d\'une softball.',
    datoCancha: 'Les bateyes (terrains) avaient des pétroglyphes gravés sur leurs bordures en pierre. C\'étaient des lieux sacrés.',
    datoYugo: 'Le yugo était une ceinture en pierre ou bois utilisée pour frapper la balle avec les hanches.',
    datoCeremonia: 'Le batú se jouait pendant les fêtes d\'areíto, avec musique, danse et nourriture.',
    datoDisputa: 'Le batú servait à régler les conflits entre villages sans recourir à la guerre. Diplomatie sportive taïno.',
    datoArqueologia: 'Des bateyes ont été trouvés à Chacuey et La Aleta (RD), et à Tibes et Caguana (Porto Rico).'
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
    descArtefactoTaino: 'Un cemí aux détails dorés. Il doit être emmené au musée pour étude.',
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
    descLlaveHierro: 'Clé coloniale en fer forgé. Elle pourrait ouvrir une porte ancienne.',

    clavoBronce: 'Clou en Bronze',
    descClavoBronce: 'Clou en bronze de la coque de la Santa María. Il résistait à la corrosion de l\'eau salée.',
    mapaNaufragios: 'Carte des Épaves',
    descMapaNaufragios: 'Carte indiquant l\'emplacement des épaves dans les Caraïbes dominicaines. Cadeau de l\'archéologue sous-marine.',

    registroAduanal: 'Registre Douanier',
    descRegistroAduanal: 'Document officiel des douanes avec les anomalies détectées dans les envois de Torres.',
    ordenJudicial: 'Ordonnance du Tribunal',
    descOrdenJudicial: 'Ordonnance du tribunal autorisant la confiscation des artefacts trafiqués.',

    certificadoAutenticidad: 'Certificat d\'Authenticité',
    descCertificadoAutenticidad: 'Document officiel certifiant l\'authenticité d\'un artefact archéologique.',
    catalogoMuseo: 'Catalogue du Musée',
    descCatalogoMuseo: 'Catalogue de tous les artefacts du Musée des Atarazanas Reales.',

    dienteTiburon: 'Dent de Requin Fossile',
    descDienteTiburon: 'Dent fossile de requin mégalodon. La preuve que ces géants nageaient ici il y a des millions d\'années.',

    periodico: 'Article de Journal',
    descPeriodico: 'Article sur la découverte archéologique réalisée avec l\'équipement réparé au LFSD. Toi et les élèves êtes co-auteurs !',

    robotSubmarino: 'Robot Sous-Marin',
    descRobotSubmarino: 'Robot sous-marin programmé au LFSD. Apporte-le au Dr Sofía au Sanctuaire du Lamantin.',

    equipoAnalisis: 'Équipement d\'Analyse',
    descEquipoAnalisis: 'Équipement d\'analyse réparé au LFSD. Apporte-le à la Dre López au Musée des Atarazanas Reales.',

    casabe: 'Casabe',
    descCasabe: 'Pain taïno fait de manioc râpé et grillé. Restaure 25 points de vie.',
    hierbasCurativas: 'Herbes Médicinales',
    descHierbasCurativas: 'Plantes médicinales du behique. Restaurent 30 points de vie.',
    guanabana: 'Feuilles de Corossol',
    descGuanabana: 'Feuilles et graines médicinales de corossol. Restaurent 30 points de vie.',
    vasijaCurativa: 'Vase Curatif',
    descVasijaCurativa: 'Vase d\'argile avec pulpe de calebasse, sève de maguey et figue de barbarie. Restaure 35 points de vie.'
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
  },

  // LFSD — Dialogues de la salle de classe du Lycée Français de Santo Domingo
  // Trois élèves proposent des quêtes liées à la robotique et l'archéologie
  lfsd: {
    // Émile — expert en électronique (chemise bleue)
    emile1: 'Salut ! Je suis Émile, du club de robotique « les fous du robot ». Je travaille avec des capteurs électromagnétiques.',
    emile2: 'Je calibre un magnétomètre pour détecter des artefacts métalliques souterrains. Les champs électromagnétiques sont fascinants.',
    emile3: 'Le magnétomètre mesure les variations du champ magnétique terrestre. Tout objet métallique perturbe ce champ.',
    emile4: 'Tu veux essayer de le calibrer ? Il faut ajuster la fréquence, l\'amplitude et la phase pour correspondre à l\'onde de référence.',

    // Émile — dialogues supplémentaires (paires a/b affichées en séquence)
    emile5a: 'Tu connais notre club ? On est « les fous du robot » ! On construit des robots pour l\'exploration archéologique.',
    emile5b: 'On utilise Arduino, des capteurs ultrasoniques et même des caméras infrarouges. La technologie au service de l\'histoire !',
    emile6a: 'Au LFSD on apprend en trois langues : espagnol, français et anglais. Ça nous aide à collaborer avec des équipes internationales !',
    emile6b: 'On va présenter notre projet dans une foire scientifique. Ça va être incroyable !',

    // Sofía — programmeuse (chemise verte)
    sofia1: 'Salut ! Je suis Sofía, la programmeuse de l\'équipe. Je développe les algorithmes de navigation pour notre robot sous-marin.',
    sofia2: 'Notre robot peut plonger jusqu\'à 50 mètres. Mais il a besoin d\'instructions précises pour atteindre le point de scan.',
    sofia3: 'Programmer un robot, c\'est comme écrire une recette : chaque étape doit être dans le bon ordre.',
    sofia4: 'Tu veux programmer une mission ? Il faudra utiliser des commandes comme avancer, tourner, plonger et scanner.',

    // Sofía — dialogues supplémentaires (paires a/b affichées en séquence)
    sofia5a: 'Tu savais que la République Dominicaine a plus de 400 épaves le long de ses côtes ?',
    sofia5b: 'C\'est pour ça qu\'on conçoit des robots sous-marins. Il y a tant de patrimoine immergé à découvrir !',
    sofia6a: 'Ce que j\'aime le plus dans le club, c\'est combiner science et histoire. Ce n\'est pas juste coder pour coder.',
    sofia6b: 'Chaque robot qu\'on construit a un but : protéger le patrimoine archéologique dominicain.',

    // Lucas — mécanicien (chemise orange)
    lucas1: 'Hé ! Je suis Lucas, le mécanicien de l\'équipe. Je m\'occupe de l\'entretien de l\'équipement d\'analyse.',
    lucas2: 'L\'équipement d\'analyse a un circuit de connexion endommagé. Les fils de couleur se sont débranchés.',
    lucas3: 'Chaque fil doit être connecté avec son homologue de la même couleur. Si tu te trompes, ça fait des étincelles !',
    lucas4: 'Tu peux m\'aider à le réparer ? C\'est comme un puzzle électrique. Il faut relier les bonnes paires.',

    // Lucas — dialogues supplémentaires (paires a/b affichées en séquence)
    lucas5a: 'Tu savais que les Taïnos étaient d\'excellents ingénieurs ? Leurs pirogues pouvaient transporter 50 personnes.',
    lucas5b: 'On perpétue cette tradition d\'innovation. Sauf que maintenant on utilise des circuits au lieu de troncs de ceiba.',

    // Théo — fan de Sonic, vitesse et frites
    theo1: 'Sonic X Shadow Generations est le MEILLEUR jeu ! Shadow qui utilise le Chaos Control, c\'est trop fort.',
    theo2: 'Dans les jeux je choisis toujours le personnage le plus rapide. La vitesse, c\'est tout. Comme Sonic !',
    theo3: 'J\'adore les mouvements de Sonic : spin dash, homing attack, boost... la perfection !',
    theo4: 'Tu veux des frites ? J\'ai toujours un sachet par ici. C\'est mon carburant pour coder.',
    theo5: 'Un bon jeu a besoin de lore, de backstory, d\'un univers profond. Sans ça, c\'est juste un petit jeu.',
    theo6: 'On utilise Arduino et des capteurs ultrasoniques. La technologie au service de l\'histoire !',
    theo7: 'Shadow est le meilleur personnage de Sonic. Rapide, sombre, avec une histoire. Sonic est cool mais Shadow est ÉPIQUE.',
    theo8: 'Si notre robot bougeait à la vitesse de Sonic, on aurait exploré toutes les grottes du pays.',

    // Nael — fan de One Piece, Blue Lock, Roblox, Wendy's, farces
    nael1: 'Tu joues à Roblox ? J\'ai genre 500 heures. Y\'a de tout là-dedans !',
    nael2: 'Les burgers de Wendy\'s sont supérieurs. Le Baconator est une œuvre d\'art culinaire.',
    nael3: 'Dans One Piece, Luffy n\'abandonne jamais. Gear Fifth c\'est le truc le plus épique que j\'ai vu de ma vie !',
    nael4: 'Blue Lock c\'est INCROYABLE. Isagi qui calcule les angles de tir, c\'est comme ce qu\'on fait avec le robot mais en foot.',
    nael5: 'Hé hé ! Je viens de planquer le sac de Tom. Je te dis pas où. *rire maléfique*',
    nael6: 'Mon frère dit que je l\'embête trop. Moi je dis que c\'est de l\'entraînement au combat. C\'est pour son bien !',
    nael7: 'On conçoit des robots sous-marins. Il y a tant de patrimoine immergé à découvrir !',
    nael8: 'Zoro de One Piece se perd plus que notre robot quand le GPS bugue. Et c\'est dire.',

    // Jules — fan de Star Wars, Assassin's Creed, dinosaures, surf, guitare
    jules1: 'Assassin\'s Creed m\'a fait aimer l\'histoire. Les zones restreintes du jeu sont géniales : si tu entres, les PNJ deviennent suspects.',
    jules2: 'Star Wars ! Les sabres laser, la Force, les Sith... Si je pouvais être un Jedi ET un archéologue, ce serait parfait.',
    jules3: 'Tu savais que des dinosaures ont vécu sur cette île ? Enfin, pas exactement ici, mais des fossiles ont été trouvés à Hispaniola.',
    jules4: 'Après le club je vais surfer. Les vagues de Cabarete sont parfaites pour apprendre. Rien de tel que la mer des Caraïbes !',
    jules5: 'Je joue de la guitare depuis mes 8 ans. Parfois j\'ajoute de la musique à nos présentations du club.',
    jules6: 'Dans Assassin\'s Creed tu es un assassin qui protège l\'histoire. Nous, on est des robots qui protègent le patrimoine. Même énergie !',
    jules7: 'Le T-Rex avait de petits bras, mais le Vélociraptor avait des griffes mortelles. Comme notre pince robotique mais plus... mortel.',
    jules8: 'Chaque robot qu\'on construit a un but : protéger le patrimoine archéologique dominicain.',

    // Rafael — fan de Core Keeper, Minecraft, Brawl Stars, pâtes, guitare, quêtes secondaires
    rafael1: 'Dans Minecraft j\'ai construit une réplique de la Zone Coloniale. Chaque détail ! Ça m\'a pris trois mois.',
    rafael2: 'Le meilleur dans un jeu ? Les quêtes secondaires. S\'écarter de l\'histoire principale et découvrir des secrets cachés.',
    rafael3: 'Je joue de la guitare et j\'aime la musique épique. Quand je code, je mets des bandes-son de jeux vidéo. Ça aide à se concentrer !',
    rafael4: 'Core Keeper c\'est addictif. Creuser, construire, explorer... C\'est comme l\'archéologie mais en pixels !',
    rafael5: 'Pizza et pâtes, c\'est la meilleure nourriture. Si je pouvais manger des pâtes en codant, je le ferais. En fait... *regarde son assiette*',
    rafael6: 'Dans Brawl Stars, mon main c\'est Léon. Invisible et mortel. Comme un archéologue : observer sans être vu.',
    rafael7: 'L\'année dernière on a présenté notre projet à une foire scientifique à Paris. C\'était incroyable !',
    rafael8: 'Les meilleurs jeux te laissent explorer librement. Les quêtes secondaires, c\'est là que se trouve la vraie aventure.',

    // Alberto — fan de Terraria, Core Keeper, sushi, farceur
    alberto1: 'Terraria a plus de 5 000 objets. CINQ MILLE ! Et je les veux tous. Je suis un collectionneur obsessif.',
    alberto2: 'T\'as goûté le sushi au saumon ? C\'est mon plat préféré. Ça et les pancakes au sirop. Pas ensemble !',
    alberto3: 'Binding of Isaac c\'est perturbant mais génial. Chaque run est différente. Comme chaque fouille archéologique !',
    alberto4: 'Hé hé... j\'ai collé un autocollant « fragile » sur le sac de Nael. Tu crois qu\'il va remarquer ?',
    alberto5: 'Core Keeper et Terraria sont cousins. Même philosophie : creuser, construire, survivre.',
    alberto6: 'Lire des livres ? Non, je préfère lire du code. Les livres n\'ont pas de bugs... enfin, certains ont des coquilles.',
    alberto7: 'Mew Genics va être INCROYABLE quand il sortira. Chats mutants + Edmund McMillen = perfection.',
    alberto8: 'Notre équipe s\'appelle « les fous du robot ». On est les dingues du robot ! Et on en est fiers.',

    // Carlos Guillermo — fan de Percy Jackson, Hollow Knight, Adventure Time, etc.
    carlosG1: 'Percy Jackson m\'a appris que les mythes grecs sont réels... enfin, presque. Mais l\'archéologie aussi découvre des mythes qui se sont avérés vrais.',
    carlosG2: 'Tu connais Hollow Knight ? Hallownest est une civilisation perdue sous terre. Comme les grottes du Pomier ! J\'ai trop hâte pour Silksong.',
    carlosG3: 'Dans Deltarune, Ralsei dit que les choix comptent. En archéologie aussi : chaque pièce que tu protèges change l\'histoire.',
    carlosG4: 'Gravity Falls, c\'est le meilleur. Dipper qui enquête sur des mystères cachés, c\'est exactement ce qu\'on fait, mais avec des robots.',
    carlosG5: 'Adventure Time a l\'air random, mais le lore est ultra profond. La Guerre des Champignons est post-apocalyptique. Finn vit dans les ruines de notre civilisation.',
    carlosG6: 'Delicious in Dungeon m\'a fait réfléchir : et si les archéologues cuisinaient ce qu\'ils trouvent ? ...Vaut mieux pas. Mais Senshi est un génie.',
    carlosG7: 'Dan Da Dan mélange aliens, fantômes et romance. C\'est chaotique et génial. La transformation d\'Okarun, c\'est toujours épique.',
    carlosG8: 'Annabeth Chase aurait été une archéologue incroyable. Fille d\'Athéna, obsédée par l\'architecture antique... c\'est pratiquement l\'une des nôtres.',
    carlosG9: 'Spider-Man: Across the Spider-Verse a le style graphique le plus incroyable du cinéma. Chaque image est un chef-d\'œuvre. CHAQUE IMAGE !',
    carlosG10: 'Un bon personnage a besoin d\'une définition complète : caractère, histoire, motivations. Sans ça, c\'est juste un sprite qui marche.',
    carlosG11: 'Les boss fights définissent un jeu. Si le boss ne te fait pas transpirer les mains, c\'est pas réussi.',
    carlosG12: 'J\'adore lire. Percy Jackson, Harry Potter, Le Seigneur des Anneaux... les livres t\'emmènent dans des mondes que les jeux ne peuvent pas.',
    carlosG13: 'Shawarma au poulet ou falafel ? Les deux ! C\'est la nourriture parfaite pour les marathons de lecture.',
    carlosG14: 'Undertale a prouvé qu\'on peut gagner sans se battre. La route pacifiste est la plus difficile et la plus belle.',
    carlosG15: 'Dans Minecraft je construis des mondes entiers. Villes, donjons, temples... c\'est comme être architecte et explorateur en même temps.',

    // Elian — impression 3D, Fortnite, Gatorade, avocat au thon
    elian1: 'Je conçois le châssis du robot en impression 3D. C\'est plus léger que l\'aluminium !',
    elian2: 'Un bon robot a besoin d\'une bonne structure. Comme les bohíos taïnos : ingénierie simple mais efficace.',
    elian3: 'J\'ai besoin de mon Gatorade ! Coder ça donne soif. Bleu ou rouge ? Bleu, toujours bleu.',
    elian4: 'Dans Fortnite ma technique c\'est de me cacher dans un buisson jusqu\'à ce qu\'il en reste peu. Stratégie pure !',
    elian5: 'T\'as goûté avocat au thon et mayo ? Ça a l\'air bizarre mais c\'est DÉLICIEUX. Fais-moi confiance.',
    elian6: '*se gratte le dos avec une cuillère* Quoi ? C\'est multifonction. Ça sert aussi à mélanger la résine d\'impression 3D.',
    elian7: 'Faut voir toutes les options avant de décider. Dans Fortnite et dans la vie.',
    elian8: 'L\'imprimante 3D est mon outil préféré de l\'atelier.',

    // Tom — Brawl Stars, pâtes, blagues, IA, handball
    tom1: 'Je gère la communication Bluetooth entre le robot et la tablette de contrôle.',
    tom2: 'Les signaux sans fil sous l\'eau, c\'est compliqué. C\'est pour ça qu\'on utilise des câbles pour le sous-marin !',
    tom3: 'Brawl Stars ! Mon main c\'est Shelly. Simple mais efficace. Comme un bon algorithme.',
    tom4: 'L\'intelligence artificielle me fascine. Et si on mettait de l\'IA dans le robot pour qu\'il prenne des décisions tout seul ?',
    tom5: 'Les pâtes à la bolognaise c\'est la meilleure nourriture du monde. Je n\'accepte pas le débat.',
    tom6: 'Je joue au handball dans l\'équipe du LFSD. C\'est comme programmer : calculer les angles et anticiper les mouvements.',
    tom7: '*regarde Nael* Hé hé... Je viens de changer son fond d\'écran. Ne lui dis pas.',
    tom8: 'Un jour l\'IA pourra analyser les artefacts archéologiques automatiquement. Et on sera les premiers à l\'utiliser !',

    // Prof. Nicolas Droulers — professeur de robotique et leader du projet
    profesorNombre: 'Prof. Droulers',
    profesor1: 'Bienvenue dans la classe de robotique du Lycée Français. Je suis Nicolas Droulers, le professeur de ce groupe.',
    profesor2: 'Ces élèves sont "les fous du robot". Passionnés de robots, mais aussi de l\'histoire de ce pays.',
    profesor3: 'J\'ai eu l\'idée de combiner la robotique avec l\'archéologie. Une carte, un jeu vidéo, des robots qui explorent le patrimoine.',
    profesor4: 'Les élèves ont donné vie au projet. Ils conçoivent, programment, résolvent de vrais problèmes. Ils apprennent en faisant.',
    profesor5: 'La République Dominicaine a un patrimoine archéologique énorme et tellement de choses à découvrir.',
    profesor6: 'Notre travail connecte la science avec la culture. La robotique au service de l\'histoire.',
    profesor7: 'Je connais chacun de mes élèves. Chacun apporte quelque chose de différent : électronique, programmation, mécanique, design...',
    profesor8: 'Le plus important n\'est pas le robot en soi, mais ce qu\'ils apprennent en le construisant ensemble. C\'est ce qui me rend le plus fier.',
    profesor9: 'Ce projet est né d\'une idée simple : et si la technologie pouvait aider à protéger le patrimoine ?',
    profesor10: 'Chaque élève a contribué au projet et a travaillé sur différents aspects aussi. Ils ont tous beaucoup recherché.',

    // Sous-mission : livrer le robot sous-marin
    subMisionRobot: 'Livrer le Robot Sous-Marin',
    subMisionRobotDesc: 'Apporte le Robot Sous-Marin au Dr Sofía au Sanctuaire du Lamantin.',

    // Sous-mission : livrer l'équipement d'analyse
    subMisionEquipo: 'Livrer l\'Équipement d\'Analyse',
    subMisionEquipoDesc: 'Apporte l\'équipement réparé à la Dre López au Musée des Atarazanas Reales.',
    equipoObtenido: 'Équipement réparé ! Apporte-le à la Dre López.',

    // Lucas — états post mini-jeu
    lucasCompleto: 'L\'équipement remarche ! Maintenant il faut l\'apporter à la Dre López au musée.',
    lucasPostEntrega: 'La Dre López a l\'équipement ! Voyons ce qu\'elle va découvrir avec.',
    lucasPostDescubrimiento: 'On est dans le journal ! L\'article dit que notre club a aidé à une découverte scientifique.',
    lucasPostDescubrimiento2: 'Ma mère l\'a découpé et collé sur le frigo. Elle dit que je suis célèbre !'
  },

  // Journal de missions — interface du journal de jeu
  registro: {
    titulo: 'Journal de Missions',
    principal: 'Histoire Principale',
    secundaria: 'Quêtes Secondaires',
    vacio: 'Aucune mission enregistrée',
    bloqueado: '???',
    nodos: {
      nodo0: { nombre: 'Grottes du Pomier', desc: 'Explore les grottes aux pétroglyphes et pictographies taïnos.' },
      nodo1: { nombre: 'Village Taïno I', desc: 'Découvre la vie quotidienne d\'un village taïno.' },
      nodo2: { nombre: 'Village Taïno II', desc: 'Visite le batey et les cérémonies du caciquat.' },
      nodo3: { nombre: 'La Isabela', desc: 'Enquête sur les ruines du deuxième établissement européen (1494).' },
      nodo4: { nombre: 'Zone Coloniale', desc: 'Parcours la première ville européenne permanente des Amériques.' },
      nodo5: { nombre: 'Épave Santa María', desc: 'Plonge pour explorer les restes du navire amiral de Colomb.' },
      nodo6: { nombre: 'Aéroport Punta Cana', desc: 'Arrête le trafic illégal d\'artefacts archéologiques.' },
      nodo7: { nombre: 'Musée Atarazanas', desc: 'Analyse les artefacts récupérés au musée.' },
      nodo8: { nombre: 'LFSD', desc: 'Complète des missions de robotique avec les fous du robot.' }
    }
  },

  // Réputation — niveaux de reconnaissance du joueur
  reputacion: {
    etiqueta: 'Réputation',
    desconocido: 'Inconnu',
    conocido: 'Connu',
    respetado: 'Respecté',
    legendario: 'Légendaire'
  },

  // Calibration — mini-jeu « Good Vibrations » (magnétomètre)
  calibracion: {
    titulo: 'Good Vibrations',
    intro: 'Calibre le magnétomètre en faisant correspondre l\'onde cible. La précision est la clé !',
    instrucciones: '↑↓ ajuster | ←→ changer cadran | E confirmer',
    frecuencia: 'Fréquence',
    amplitud: 'Amplitude',
    fase: 'Phase',
    exito: 'Magnétomètre calibré !',
    fallo: 'Calibration échouée. Réessaie.',
    tiempo: 'Temps'
  },

  // Programmation — mini-jeu « Full Metal Archeologist » (robot sous-marin)
  programacion: {
    titulo: 'Full Metal Archeologist',
    intro: 'Programme le robot sous-marin pour atteindre le point de scan. Chaque commande compte.',
    instrucciones: '↑↓ sélectionner | E ajouter | ← supprimer | Entrée exécuter',
    avanzar: 'Avancer',
    girarIzq: 'Tourner G',
    girarDer: 'Tourner D',
    escanear: 'Scanner',
    sumergir: 'Plonger',
    ascender: 'Remonter',
    exito: 'Robot arrivé à l\'objectif !',
    fallo: 'Robot écrasé. Réessaie.',
    ejecutando: 'Exécution...'
  },

  // Connexion — mini-jeu « Weird Science » (réparation de circuit)
  conexion: {
    titulo: 'Weird Science',
    intro: 'Connecte les fils de la même couleur pour réparer l\'équipement d\'analyse. Attention aux étincelles !',
    instrucciones: '↑↓ sélectionner | E connecter',
    exito: 'Circuit complet !',
    fallo: 'Temps écoulé ! Réessaie.',
    chispa: 'Mauvaise connexion !'
  },

  // Quêtes — titres et descriptions des quêtes secondaires
  misiones: {
    batuTitulo: 'Batú',
    batuDesc: 'Jouer un match de batú contre Higüemota au batey.',
    buenasVibracionesTitulo: 'Good Vibrations',
    buenasVibracionesDesc: 'Calibre le magnétomètre au cours de robotique du LFSD.',
    metalCompletoTitulo: 'Full Metal Archeologist',
    metalCompletoDesc: 'Programme le robot sous-marin au LFSD.',
    cienciaLocaTitulo: 'Weird Science',
    cienciaLocaDesc: 'Répare l\'équipement d\'analyse au LFSD.',
    rescateManatiTitulo: 'Sauvetage du lamantin',
    rescateManatiDesc: 'Libère le lamantin piégé et nettoie le récif au Sanctuaire.',
    rescateManatiReputacion: 'Lamantin libéré',
    limpiezaReputacion: 'Récif nettoyé',
    descubierta: 'Quête découverte !'
  },

  // Album photo — captures du joueur pendant l'aventure
  album: {
    titulo: 'Album Photo',
    fotos: 'Photos',
    selfies: 'Selfies',
    vacio: 'Pas encore de photos. Explore et capture des moments !',
    vacioSelfies: 'Pas encore de selfies. Pose avec ce que tu trouves !',
    tomarFoto: '[T] Photo',
    tomarSelfie: '[G] Selfie',
    fotoTomada: 'Photo enregistrée !',
    selfieTomada: 'Selfie enregistré !',
    instrucciones: '← → changer onglet | ↑ ↓ défiler | P fermer'
  },

  // Sites archéologiques — 8 sites réels à explorer
  // Textes d'interface utilisés dans plusieurs scènes et mondes
  // (contrôles, étiquettes d'action, indicateurs du HUD)
  ui: {
    presionaE: 'Appuie sur E pour continuer',
    presionaESaltar: 'Appuie sur E pour passer',
    eContinuar: '[E] Continuer',
    eComenzar: '[E] Commencer',
    comenzar: 'Commencer',
    continuar: 'Continuer',

    eHablar: '[E] Parler',
    eExaminar: '[E] Examiner',
    eEntrar: '[E] Entrer',
    eCurar: '[E] Soigner',
    eAdoptar: '[E] Adopter',
    eExcavar: '[E] Creuser',
    eAlerta: '[E] Alerte !',
    eSospechoso: '[E] Suspect !',
    eLiberar: '[E] Libérer',
    eLiberarManati: '[E] Libérer le lamantin',
    fDetectarMetal: '[F] Détecter Métal',

    controlesCueva: 'WASD : bouger | Espace : sauter | E : examiner | I : inventaire | M : carte | P : photos | L : quêtes',
    controlesAldea: 'WASD : bouger | E : parler | I : inventaire | M : carte | P : photos | L : quêtes',
    controlesHabilidad: 'WASD : bouger | E : parler | F : capacité | I : inventaire | M : carte | P : photos | L : quêtes',
    controlesNadar: 'WASD : nager | E : parler | I : inventaire | M : carte | P : photos | L : quêtes',
    controlesNadarInteractuar: 'WASD : nager | E : interagir | I : inventaire | M : carte | P : photos | L : quêtes',
    controlesCaminar: 'WASD : marcher | E : parler | I : inventaire | M : carte | P : photos | L : quêtes',
    controlesExcavar: 'WASD : bouger | E : parler/creuser | F : détecter | I : inventaire | M : carte | P : photos | L : quêtes',
    controlesMuseo: 'WASD : bouger | E : parler/ramasser | M : carte | I : inventaire | P : photos | L : quêtes',
    controlesLFSD: 'WASD : bouger | E : parler | M : carte | I : inventaire | P : photos | L : quêtes',
    controlesMapa: 'E : entrer | I : inventaire | R : carte réelle | +/− : zoom | Q : menu',

    // --- Toasts ---
    partidaGuardada: '💾 Partie sauvegardée',

    hostilidad: 'Hostilité :',
    tuVida: 'Ta vie :',
    tuTurno: '< Ton tour — choisis une action >',
    turnoEnemigo: '... tour de l\'ennemi ...',
    controlesCombate: 'Flèches : choisir | E : confirmer',
    pistaDefecto: 'Utilise Parler ou Négocier pour convaincre l\'adversaire',

    presionaEContinuar: 'Appuie sur E pour continuer ▶',

    descripcionPersonaje: '14 ans. Ascendance taïno, espagnole et africaine.',
    controlesSeleccion: 'Gauche/Droite : changer | Entrée/E : confirmer | Q/Échap : retour',

    introLugar: 'Quelque part à Saint-Domingue...',
    introBrilla: 'Quelque chose brille parmi les décombres...',
    introCuidado: 'ATTENTION ! Le sol s\'effondre !',
    introDonde: '...Où suis-je ?',

    controlesMenu: 'Flèches/WASD : naviguer | Entrée/E : sélectionner',
    volverMenu: 'Appuie sur Q / Échap / Entrée pour revenir',

    selectorNiveles: '🔓 SÉLECTEUR DE NIVEAUX 🔓',
    konamiActivado: '(Code Konami activé)',
    masNivelesArriba: '▲ plus de niveaux',
    masNivelesAbajo: '▼ plus de niveaux',
    controlesSelector: '↑↓ : choisir  |  E : aller au niveau  |  Q : fermer',

    subtituloJuego: 'Aventure Archéologique Dominicaine',
    creadoPor: 'Créé par',
    profesor: 'Professeur',
    claseRobotica: 'Cours de Robotique',
    ubicacion: 'Saint-Domingue, République dominicaine',
    tecnologias: 'Technologies',
    inspiradoEn: 'Inspiré par',
    agradecimiento1: 'Le patrimoine archéologique de la République dominicaine',
    agradecimiento2: 'Les chercheurs du Musée de l\'Homme Dominicain',
    agradecimiento3: 'La Zona Colonial de Saint-Domingue (UNESCO)',
    agradecimiento4: 'Les grottes du Pomier et leurs pétroglyphes taïnos',
    mensajeFinal1: 'Protégeons notre patrimoine.',
    mensajeFinal2: 'L\'histoire nous appartient à tous.',
    copyright: 'Lycée Français de Saint-Domingue © 2026',

    controlesBatu: '← → bouger | Frappe avec le corps (hanche, épaule, tête, genou)',
    tu: 'Toi',
    rival: 'Rival',

    controlesRegistro: '← → changer d\'onglet | ↑ ↓ défiler | Q fermer',

    misionCompletaFinal: 'Mission accomplie ! Appuie sur M pour voir la fin',

    calibracionTitulo: 'Calibration du Signal',
    calibracionInstrucciones: '↑↓ : changer cadran | ←→ : ajuster | E : confirmer',
    calibracionDesc1: 'Ajuste les 3 cadrans pour que l\'onde corresponde',
    calibracionDesc2: 'au signal cible (ligne pointillée).',

    programacionTitulo: 'Programmation du Robot',
    programacionDesc1: 'Ordonne les blocs pour guider le robot',
    programacionDesc2: 'jusqu\'au point de scan.',
    programacionInstrucciones: '↑↓ : choisir bloc | E : ajouter | ← : retirer | F : exécuter',
    programacionBloques: 'Blocs :',
    programacionPrograma: 'Programme :',
    programacionControles: '↑↓ : choisir | E : ajouter | ← : retirer | F : exécuter',
    programacionEjecutando: 'Exécution du programme...',

    conexionTitulo: 'Connexion de Câbles',
    conexionDesc1: 'Connecte chaque câble à sa paire correspondante.',
    conexionDesc2: 'Associe les couleurs et symboles.',
    conexionInstrucciones: '↑↓ : naviguer | E : sélectionner/connecter | Q : annuler',
    conexionBonus: 'Bonus de vitesse ! +5 réputation en plus',

    lfsdTitulo: 'LFSD - Cours de Robotique',
    lfsdPizarra: 'Cours de Robotique - LFSD',

    hablarHabitantes: 'Parler aux habitants',

    // --- Noms de personnages dans les dialogues ---
    espirituTaina: '🌀 Esprit Taïno',
    petroglifo: '🗿 Pétroglyphe',

    // --- Toasts d'inventaire ---
    itemAnadido: 'objet ajouté à l\'inventaire',
    itemAnadidoCorto: 'ajouté à l\'inventaire',
    itemAnadidoBrief: 'objet ajouté'
  },

  sitiosArqueologicos: {
    titulo: 'Sites Inexplorés',
    cuevaBerna: 'Grotte de Berna — Pictogrammes taïnos, partiellement étudiés.',
    puntaMacao: 'Punta Macao — Site précéramique, fouilles minimales.',
    elCabo: 'El Cabo — Grand village taïno, partiellement fouillé.',
    playaGrande: 'Playa Grande — Période céramique, étude limitée.',
    lomaGuayacanes: 'Loma de Guayacanes — Site funéraire, prospection nécessaire.',
    padreNuestro: 'Padre Nuestro — Système de grottes avec pétroglyphes.',
    cuevaMaravillas: 'Cueva de las Maravillas — Chambres supplémentaires non explorées.',
    bocaYuma: 'Boca de Yuma — Grottes côtières, prospection archéologique limitée.'
  }
};

export default fr;
