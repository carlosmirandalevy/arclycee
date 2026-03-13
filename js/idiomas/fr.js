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

    // Monde Aquatique — Épave de La Pinta
    acuatico: {
      pescador1: 'Bienvenue au fond de la mer, gamin ! Je suis Manuel, pêcheur de Montecristi.',
      pescador2: 'Ici reposent les restes de La Pinta, l\'une des trois caravelles de Colomb.',
      pescador3: 'Les bois de La Pinta ont servi à construire le Fort Navidad — la première structure européenne en Amérique.',
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

      misionExplorar: 'Explore l\'épave de La Pinta',
      misionCompleta: 'Épave explorée ! Retour à la carte (M)'
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

      lopez1: 'Je suis la Dre López, spécialiste de la datation au Carbone-14.',
      lopez2: 'Le Carbone-14 est un atome radioactif absorbé par tous les êtres vivants. À leur mort, il commence à se décomposer.',
      lopez3: 'En mesurant le C-14 restant dans un objet organique, nous calculons son âge avec précision.',
      lopez4: 'C\'est ainsi qu\'on confirme si un artefact a 500 ans ou s\'il s\'agit d\'une falsification moderne !',
      lopezRepite: 'Rappelle-toi : la datation C-14 fonctionne avec les matériaux organiques — bois, os, tissu.',

      ana1: 'Je suis Ana, restauratrice d\'artefacts. Mon travail est de réparer sans altérer.',
      ana2: 'La règle d\'or de la restauration : tout ce que tu fais doit être réversible.',
      ana3: 'Nous utilisons des adhésifs spéciaux, des consolidants et des microscopes pour ne pas endommager la pièce.',
      ana4: 'Un artefact mal restauré perd sa valeur historique pour toujours. La patience est la clé !',
      anaRepite: 'Restaurer, c\'est comme être médecin pour les artefacts : d\'abord, ne pas nuire.',

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
      misionFinal: 'Mission accomplie ! Appuie sur M pour voir la fin'
    },

    // Fins — 4 séquences de clôture possibles
    finales: {
      completo: {
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
    descClavoBronce: 'Clou en bronze de la coque de La Pinta. Il résistait à la corrosion de l\'eau salée.',
    mapaNaufragios: 'Carte des Épaves',
    descMapaNaufragios: 'Carte indiquant l\'emplacement des épaves dans les Caraïbes dominicaines. Cadeau de l\'archéologue sous-marine.',

    registroAduanal: 'Registre Douanier',
    descRegistroAduanal: 'Document officiel des douanes avec les anomalies détectées dans les envois de Torres.',
    ordenJudicial: 'Ordonnance du Tribunal',
    descOrdenJudicial: 'Ordonnance du tribunal autorisant la confiscation des artefacts trafiqués.',

    certificadoAutenticidad: 'Certificat d\'Authenticité',
    descCertificadoAutenticidad: 'Document officiel certifiant l\'authenticité d\'un artefact archéologique.',
    catalogoMuseo: 'Catalogue du Musée',
    descCatalogoMuseo: 'Catalogue de tous les artefacts du Musée des Atarazanas Reales.'
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
