export const LEVELS = {
  A1: {
    name: "Principiante",
    color: "#35b98b",
    description: "Tus primeras conversaciones en francés.",
    lessons: [
      {
        id: "a1-1", title: "Presentarse y el verbo être",
        topic: "Presentaciones",
        explanation: "El verbo être significa ser o estar. Es uno de los verbos más importantes del francés.",
        rule: "Je suis · Tu es · Il/Elle est · Nous sommes · Vous êtes · Ils/Elles sont",
        example: "Je suis espagnol. → Soy español.\nElle est française. → Ella es francesa.",
        task: "Completa: Je ___ étudiant.",
        answer: "suis"
      },
      {
        id: "a1-2", title: "El verbo avoir",
        topic: "Tener y la edad",
        explanation: "Avoir significa tener. En francés se utiliza para expresar la edad.",
        rule: "J'ai · Tu as · Il/Elle a · Nous avons · Vous avez · Ils/Elles ont",
        example: "J'ai vingt ans. → Tengo veinte años.\nNous avons un chien. → Tenemos un perro.",
        task: "Completa: Tu ___ un frère.",
        answer: "as"
      },
      {
        id: "a1-3", title: "Artículos definidos e indefinidos",
        topic: "Los artículos",
        explanation: "Le y la equivalen a el y la. Un y une equivalen a un y una. Les y des son plurales.",
        rule: "le / la / l' / les · un / une / des",
        example: "Un livre → Un libro.\nLa maison → La casa.\nLes amis → Los amigos.",
        task: "Completa: ___ maison.",
        answer: "la"
      },
      {
        id: "a1-4", title: "El presente de los verbos -ER",
        topic: "Verbos regulares",
        explanation: "Para conjugar un verbo regular terminado en -ER, quitamos -ER y añadimos las terminaciones.",
        rule: "Je -e · Tu -es · Il -e · Nous -ons · Vous -ez · Ils -ent",
        example: "Parler: je parle, tu parles, nous parlons.",
        task: "Completa: Nous parl___ français.",
        answer: "ons"
      },
      {
        id: "a1-5", title: "La negación ne... pas",
        topic: "Frases negativas",
        explanation: "Para negar una frase, colocamos ne antes del verbo y pas después. Ne se convierte en n' delante de vocal.",
        rule: "Sujet + ne/n' + verbe + pas",
        example: "Je ne parle pas anglais. → No hablo inglés.",
        task: "Traduce: No soy francés.",
        answer: "Je ne suis pas français"
      }
    ],
    words: [
      ["bonjour","hola"],["bonsoir","buenas tardes/noches"],["salut","hola/adiós informal"],
      ["merci","gracias"],["s'il vous plaît","por favor"],["au revoir","adiós"],
      ["maison","casa"],["école","escuela"],["travail","trabajo"],
      ["eau","agua"],["pain","pan"],["fromage","queso"],
      ["pomme","manzana"],["livre","libro"],["voiture","coche"],
      ["ami","amigo"],["famille","familia"],["enfant","niño"],
      ["homme","hombre"],["femme","mujer"],["aujourd'hui","hoy"],
      ["demain","mañana"],["hier","ayer"],["maintenant","ahora"],
      ["manger","comer"],["boire","beber"],["parler","hablar"],
      ["aimer","gustar/amar"],["habiter","vivir"],["travailler","trabajar"]
    ],
    verbs: ["être","avoir","aller","faire","parler","aimer","habiter","manger","boire","travailler"],
    exercises: [
      ["Je","m'appelle","Marie"],
      ["J'habite","à","Paris"],
      ["Nous","parlons","français"],
      ["Il","a","un chien"],
      ["Je","ne","comprends","pas"]
    ]
  },

  A2: {
    name: "Elemental",
    color: "#3988e8",
    description: "Habla de tu pasado, tus planes y tu día a día.",
    lessons: [
      {
        id: "a2-1", title: "Le passé composé con avoir",
        topic: "El pasado",
        explanation: "El passé composé se utiliza para hablar de acciones terminadas en el pasado. Se forma con avoir o être más el participio pasado.",
        rule: "Sujet + avoir au présent + participe passé",
        example: "J'ai mangé. → He comido.\nNous avons regardé un film. → Hemos visto una película.",
        task: "Completa: Hier, j'___ travaillé.",
        answer: "ai"
      },
      {
        id: "a2-2", title: "El futuro próximo",
        topic: "Planes y proyectos",
        explanation: "El futur proche expresa algo que va a ocurrir pronto. Se forma con aller en presente + infinitivo.",
        rule: "Sujet + aller au présent + infinitif",
        example: "Je vais voyager. → Voy a viajar.\nNous allons manger. → Vamos a comer.",
        task: "Completa: Tu ___ étudier.",
        answer: "vas"
      },
      {
        id: "a2-3", title: "Los pronombres COD",
        topic: "Pronombres",
        explanation: "Me, te, le, la y les sustituyen al complemento directo y suelen colocarse delante del verbo.",
        rule: "me · te · le · la · nous · vous · les",
        example: "Je regarde le film. → Je le regarde.",
        task: "Sustituye: Je connais Marie. → Je ___ connais.",
        answer: "la"
      },
      {
        id: "a2-4", title: "Comparativos",
        topic: "Comparar",
        explanation: "Para comparar utilizamos plus... que, moins... que y aussi... que.",
        rule: "plus / moins / aussi + adjectif + que",
        example: "Paris est plus grand que Lyon. → París es más grande que Lyon.",
        task: "Completa: Paul est ___ grand que Marc. (más)",
        answer: "plus"
      },
      {
        id: "a2-5", title: "El imperfecto",
        topic: "Describir el pasado",
        explanation: "L'imparfait sirve para describir situaciones, hábitos y acciones habituales en el pasado.",
        rule: "Raíz de nous en presente sin -ons + ais, ais, ait, ions, iez, aient",
        example: "Quand j'étais petit, je jouais au football.",
        task: "Completa: Avant, j'___ à Lyon. (habiter)",
        answer: "habitais"
      }
    ],
    words: [
      ["voyage","viaje"],["billet","billete"],["gare","estación"],["aéroport","aeropuerto"],
      ["valise","maleta"],["réservation","reserva"],["chambre","habitación"],["hôtel","hotel"],
      ["addition","cuenta"],["commande","pedido"],["serveur","camarero"],["magasin","tienda"],
      ["prix","precio"],["cher","caro"],["gratuit","gratis"],["ordonnance","receta médica"],
      ["médecin","médico"],["douleur","dolor"],["fatigué","cansado"],["malade","enfermo"],
      ["bientôt","pronto"],["souvent","a menudo"],["parfois","a veces"],["d'habitude","habitualmente"],
      ["choisir","elegir"],["réussir","tener éxito"],["attendre","esperar"],["partir","irse"],
      ["revenir","volver"],["oublier","olvidar"]
    ],
    verbs: ["finir","choisir","attendre","vendre","partir","sortir","prendre","mettre","voir","venir"],
    exercises: [
      ["Hier","j'ai","mangé","une","pizza"],
      ["Nous","allons","visiter","Paris"],
      ["Elle","a","acheté","un","livre"],
      ["Je","vais","prendre","le","train"],
      ["Quand","j'étais","petit","je","jouais"]
    ]
  },

  B1: {
    name: "Intermedio",
    color: "#a16be8",
    description: "Expresa opiniones, experiencias y situaciones complejas.",
    lessons: [
      {
        id: "b1-1", title: "El plus-que-parfait",
        topic: "Acciones anteriores a otras acciones pasadas",
        explanation: "Se utiliza para hablar de una acción que ya había ocurrido antes de otra acción pasada.",
        rule: "Avoir / être à l'imparfait + participe passé",
        example: "J'avais déjà mangé quand il est arrivé. → Ya había comido cuando llegó.",
        task: "Completa: Elle ___ déjà parti. (être)",
        answer: "était"
      },
      {
        id: "b1-2", title: "El condicional presente",
        topic: "Deseos y situaciones hipotéticas",
        explanation: "Se utiliza para expresar deseos, peticiones educadas o situaciones hipotéticas.",
        rule: "Infinitif + terminaciones del imparfait",
        example: "Je voudrais un café. → Querría un café.",
        task: "Completa: Nous ___ voyager. (aimer)",
        answer: "aimerions"
      },
      {
        id: "b1-3", title: "El subjuntivo presente",
        topic: "Necesidad y opinión",
        explanation: "Se usa después de expresiones de necesidad, deseo, emoción o duda.",
        rule: "Il faut que + subjonctif",
        example: "Il faut que tu viennes. → Hace falta que vengas.",
        task: "Completa: Il faut que tu ___ . (être)",
        answer: "sois"
      },
      {
        id: "b1-4", title: "Los pronombres Y y EN",
        topic: "Pronombres adverbiales",
        explanation: "Y sustituye normalmente a un lugar o a à + cosa. EN sustituye a de + cosa o expresa cantidad.",
        rule: "Je vais à Paris → J'y vais. / Je parle de ce livre → J'en parle.",
        example: "Tu veux du café ? Oui, j'en veux.",
        task: "Tu vas à la banque ? Oui, j'___ vais.",
        answer: "y"
      },
      {
        id: "b1-5", title: "Conectores para argumentar",
        topic: "Expresar ideas",
        explanation: "Los conectores ayudan a organizar argumentos y dar coherencia al discurso.",
        rule: "D'abord · ensuite · pourtant · cependant · donc · enfin",
        example: "Il pleut, pourtant je vais sortir. → Llueve, sin embargo voy a salir.",
        task: "Completa: Il est malade, ___ il reste chez lui. (por eso)",
        answer: "donc"
      }
    ],
    words: [
      ["pourtant","sin embargo"],["cependant","no obstante"],["en revanche","en cambio"],
      ["d'ailleurs","por cierto"],["néanmoins","aun así"],["donc","por lo tanto"],
      ["enjeu","desafío / cuestión importante"],["démarche","gestión / procedimiento"],
      ["environnement","medio ambiente"],["développement","desarrollo"],
      ["embauche","contratación"],["entretien","entrevista"],["collègue","compañero"],
      ["salaire","salario"],["compétence","habilidad"],["expérience","experiencia"],
      ["conseil","consejo"],["avis","opinión"],["comportement","comportamiento"],
      ["habitude","costumbre"],["améliorer","mejorar"],["atteindre","alcanzar"],
      ["éviter","evitar"],["permettre","permitir"],["proposer","proponer"],
      ["soutenir","apoyar"],["se rendre compte","darse cuenta"],
      ["s'occuper de","ocuparse de"],["réussir à","conseguir"],["dépendre de","depender de"]
    ],
    verbs: ["croire","connaître","suivre","recevoir","devoir","pouvoir","vouloir","savoir","falloir","vivre"],
    exercises: [
      ["Je","voudrais","apprendre","le","français"],
      ["Il","faut","que","tu","viennes"],
      ["J'en","ai","déjà","parlé"],
      ["Elle","avait","terminé","son","travail"],
      ["Je","pense","que","c'est","important"]
    ]
  },

  B2: {
    name: "Intermedio alto",
    color: "#e69b32",
    description: "Argumenta, debate y comprende matices con precisión.",
    lessons: [
      {
        id: "b2-1", title: "El condicional pasado",
        topic: "Arrepentimientos e hipótesis",
        explanation: "Expresa una situación hipotética que no ocurrió en el pasado o un arrepentimiento.",
        rule: "Avoir / être au conditionnel présent + participe passé",
        example: "J'aurais aimé venir. → Me habría gustado venir.",
        task: "Completa: Nous ___ accepté. (avoir)",
        answer: "aurions"
      },
      {
        id: "b2-2", title: "La concordancia de tiempos",
        topic: "Discurso indirecto",
        explanation: "Cuando el verbo introductorio está en pasado, a menudo cambian los tiempos verbales en el discurso indirecto.",
        rule: "Présent → imparfait · Passé composé → plus-que-parfait · Futur → conditionnel",
        example: "Il dit : « Je viendrai ». → Il a dit qu'il viendrait.",
        task: "Completa: Il a dit qu'il ___ . (venir, conditionnel)",
        answer: "viendrait"
      },
      {
        id: "b2-3", title: "La voz pasiva",
        topic: "Estructuras avanzadas",
        explanation: "La voz pasiva pone el foco en quien recibe la acción.",
        rule: "Être conjugué + participe passé (+ par)",
        example: "Le livre a été écrit par Victor Hugo.",
        task: "Completa: La maison ___ construite en 1990.",
        answer: "a été"
      },
      {
        id: "b2-4", title: "La concesión y la oposición",
        topic: "Argumentación",
        explanation: "Permiten presentar una idea contraria sin abandonar el argumento principal.",
        rule: "Bien que + subjonctif · Même si + indicatif · Malgré + nom",
        example: "Bien qu'il soit fatigué, il continue.",
        task: "Completa: Bien qu'il ___ tard, je vais sortir. (être)",
        answer: "soit"
      },
      {
        id: "b2-5", title: "Matices y expresiones idiomáticas",
        topic: "Francés natural",
        explanation: "Las expresiones idiomáticas dan naturalidad al discurso y no siempre se traducen palabra por palabra.",
        rule: "Avoir beau · mettre en place · tenir compte de · prendre en charge",
        example: "J'ai beau essayer, je n'y arrive pas. → Por más que lo intento, no lo consigo.",
        task: "Completa: Il faut tenir ___ de son avis.",
        answer: "compte"
      }
    ],
    words: [
      ["approfondir","profundizar"],["remettre en question","cuestionar"],
      ["prendre en compte","tener en cuenta"],["mettre en œuvre","poner en práctica"],
      ["aboutir à","desembocar en"],["faire face à","hacer frente a"],
      ["envisager","contemplar"],["négliger","descuidar"],["nuancer","matizar"],
      ["pertinent","pertinente"],["incontournable","ineludible"],["ambivalent","ambivalente"],
      ["enjeu majeur","cuestión fundamental"],["à long terme","a largo plazo"],
      ["en l'occurrence","en este caso"],["dans la mesure où","en la medida en que"],
      ["faute de","a falta de"],["à condition que","a condición de que"],
      ["quoique","aunque"],["tandis que","mientras que"],
      ["d'autant plus","tanto más"],["à vrai dire","a decir verdad"],
      ["il va de soi","es evidente"],["mettre en évidence","poner de manifiesto"],
      ["remédier à","remediar"],["s'avérer","resultar"],["souligner","subrayar"],
      ["revendiquer","reivindicar"],["accroître","aumentar"],["concilier","conciliar"]
    ],
    verbs: ["acquérir","résoudre","convaincre","atteindre","maintenir","s'apercevoir","prévoir","conclure","exiger","remettre"],
    exercises: [
      ["J'aurais","préféré","rester","chez","moi"],
      ["Bien","qu'il","soit","fatigué","il","continue"],
      ["Cette","décision","a","été","prise","hier"],
      ["Il","faut","tenir","compte","des","conséquences"],
      ["Elle","a","remis","en","question","cette","idée"]
    ]
  }
};

export const LEVEL_ORDER = ["A1", "A2", "B1", "B2"];