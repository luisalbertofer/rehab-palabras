// Conjunto completo de grupos de palabras para rehabilitación auditiva
export const wordGroups = {

  // 🌟 Vocales simples
  vocales: ["a", "e", "i", "o", "u"],

  // 🔊 Combinaciones de dos vocales distintas + duplicados ("aa", "ee", etc.)
  combinaciones_vocales: [
    // Sin repetición
    "ai", "au", "ae", "ao",
    "ea", "ei", "eu", "eo",
    "ia", "ie", "iu", "io",
    "oa", "oe", "oi", "ou",
    "ua", "ue", "ui", "uo",

    // Con repetición
    "aa", "ee", "ii", "oo", "uu"
  ],

  // 🦋 Diptongos
  diptongos: [
    "tierra", "hielo", "cielo", "ciudad", "cuento", "riesgo", "huevo", "viuda", "reina",
    "baile", "cauto", "duermo", "fuente", "suelo", "puerta", "bien", "pueblo", "ciudadano"
  ],

  // 🐝 Triptongos (ampliado)
  triptongos: [
    "limpiáis", "estudiéis", "buey", "cambiáis", "actuáis", 
    "enviéis", "agüita", "averiguáis", "miau", "paraguay", 
    "bueyera", "despreciéis", "anunciéis"
  ],

  // 🔗 Sílabas trabadas (ampliado)
  silabas_trabadas: [
    "plato", "grito", "trampa", "clavo", "flor", "brote", 
    "prisa", "cruz", "brisa", "globo", "blanco", "fruta", 
    "trueno", "drástico", "crudo", "pronto", "trozo", "droga", 
    "grúa", "bruma", "gloria", "flaco", "claro", "triste", 
    "gris", "prado", "grabar"
  ],

  // 🧩 Palabras comunes (ajustada)
  palabras_comunes: [
    "hola", "gracias", "adiós", "mamá", "papá", "sí", "no", 
    "por", "favor", "buenos días", "perdón", "¿Cómo estás?", 
    "bien", "mal", "ayuda", "calle", "casa", "escuela", "baño", 
    "trabajo", "agua", "comida", "tiempo", "ahora", "ayer", 
    "mañana", "día", "noche", "hora"
  ],

  // 🔍 Palabras similares (corregido y ampliado)
  palabras_similares: [
    "casa", "taza", "pasa", "masa", "basa",
    "tino", "dino", "vino", "fino", "mino",
    "pato", "gato", "dato", "lato", "rato",
    "mesa", "besa", "pesa", "lesa", "deja",
    "pan", "ban", "van", "fan", "man",
    "rojo", "rijo", "giro", "gora"
  ],

  // 🎯 Palabras con acentos
  palabras_con_acentos: [
    "camión", "teléfono", "fácil", "azúcar", "sofá", "inglés", "ratón", "también", "difícil",
    "número", "país", "después", "bebé", "hábito"
  ],

  // 📚 Frases breves (ligeramente enriquecido)
  frases_breves: [
    "Hola, ¿cómo estás?", "Buenos días", "¿Dónde está el baño?",
    "Me llamo Luis", "No entiendo", "¿Puedes repetir?", "Muchas gracias",
    "Estoy cansado", "Tengo hambre", "¿Qué hora es?", "Hoy hace calor",
    "Vamos al parque", "¿Cuál es tu nombre?", "Te veo mañana",
    "No me gusta esto", "Estoy aprendiendo a escuchar"
  ],

  // 🔁 Frases con ruido ambiental (simulación)
  frases_con_ruido: [
    "¿Quieres café o té?", "Por favor cierra la puerta", "El autobús llegará pronto",
    "¿Sabes dónde está mi bolso?", "Vamos al cine esta noche"
  ],

  // 🧠 Oraciones ambigüedades contextuales
  oraciones_ambiguas: [
    "La luz estaba rota",
    "Él vio a su hermana con un telescopio",
    "Corté el pasto con la podadora",
    "María le dio un libro a su amigo"
  ],

  // 🎙️ Frases con entonaciones específicas
  frases_con_entonacion: [
    "¿Vienes conmigo?", "¡Es increíble!", "Estoy listo.",
    "¿En serio?", "Lo haré mañana."
  ],

  // ❓ Preguntas comunes
  preguntas_comunes: [
    "¿Qué quieres?", "¿Estás bien?", "¿Vamos juntos?", "¿Qué has dicho?",
    "¿Dónde vives?", "¿Puedes ayudarme?", "¿Tienes hambre?", "¿Te gusta?"
  ],

  // 💬 Onomatopeyas y expresiones sonoras
  expresiones_sonoras: [
    "¡Ay!", "¡Uf!", "¡Eh!", "¡Guau!", "¡Mmm!", "¡Ajá!", "¡Oh!", "¡Epa!"
  ],

  // 🕰️ Frases con tiempos verbales
  frases_tiempo_verbal: [
    "Ayer fui al médico", "Ahora como pan", "Mañana visitaré a mi tía",
    "Hoy estoy cansado", "Mañana habrá lluvia", "Ayer dormí mal"
  ],

  // 🚫 Frases con negaciones
  frases_con_negacion: [
    "No quiero eso", "No me gusta", "No puedo ir hoy",
    "No entiendo nada", "No está aquí", "No es verdad"
  ],

  // 🗣️ Frases con sujeto explícito y verbo
  frases_con_sujeto_verbo: [
    "Yo tengo un perro", "Tú estás bien", "Él canta bonito",
    "Nosotros vamos al parque", "Ellos comen fruta", "Ella tiene frío"
  ],

  // 🧠 Palabras polisílabas comunes
  palabras_polisilabas: [
    "maravilloso", "imaginación", "biblioteca", "fotografía",
    "electricidad", "universidad", "comunicación", "naturaleza"
  ],
  // 🔄 Contrastes fonológicos y categorías temáticas (faltantes)
  vibrantes_vs_oclusivas_sonoras: [
    "rama", "bala", "rata", "dama", "rico", "goma", "cora", "toca"
  ],
  vibrantes_vs_oclusivas_sordas: [
    "rama", "pata", "rato", "casa", "risa", "taza", "ruco", "tubo"
  ],
  oclusivas_vs_fricativas: [
    "palo", "faro", "tela", "suelo", "duro", "zumo", "pan", "fan"
  ],
  diferencia_a_o: [
    "casa", "cosa", "mama", "momo", "pasta", "posta", "lana", "lona"
  ],
  diferencia_o_i: [
    "gota", "gita", "molino", "molono", "rollo", "rillo", "rollo", "rito"
  ],
  diferencia_a_i: [
    "casa", "cisa", "pata", "pita", "mago", "migo", "lana", "lina"
  ],
  diferencia_a_u: [
    "casa", "cusa", "pata", "tuna", "malta", "mulata", "madre", "mudra"
  ],
  diferencia_a_e: [
    "casa", "cesa", "pata", "peta", "mano", "meno", "calle", "celle"
  ],
  diferencia_i_u: [
    "vino", "vuna", "mima", "muma", "billete", "bullete", "limón", "lumón"
  ],
  diferencia_e_i: [
    "mesa", "misa", "vena", "vina", "ceder", "cidra", "pelo", "pilo"
  ],
  diferencia_u_o: [
    "luz", "loz", "rumbo", "rumba", "sutil", "sotil", "útil", "ótica"
  ],
  numero_de_silabas: {
    dos_silabas: ["casa", "perro", "gato", "coche", "libro"],
    tres_silabas: ["cocina", "ventana", "persona", "teléfono", "almuerzo"],
    cuatro_silabas: ["computadora", "refrigerador", "esternocleidomastoideo", "paralelepípedo"]
  },
  doble_diferencia_consonantes: [
    "pato", "casa", "brazo", "grano", "pico", "viso", "tapa", "cara"
  ],
  presencia_ausencia_fonema_r: [
    "rama", "lama", "rata", "lata", "cora", "cola", "rico", "lico"
  ],
  liquidas_vs_otras_consonantes: [
    "rama", "lama", "rata", "gata", "rico", "bico", "ruco", "culo"
  ],
  fricativas_entre_si: [
    "foco", "sopa", "vaso", "fajo", "saco", "faja", "fuego", "suero"
  ],
  liquidas_y_nasales: [
    "ramo", "namo", "rata", "nata", "lupa", "nube", "lomo", "nomo"
  ],
  oclusivas_sordas_entre_si: [
    "pata", "tapa", "casa", "paco", "tinto", "pinta", "copa", "topa"
  ],
  oclusivas_sonoras_entre_si: [
    "bala", "dama", "gato", "dato", "bando", "ganga", "gol", "don"
  ],
  animales: [
    "perro", "gato", "pájaro", "pez", "conejo",
    "caballo", "vaca", "cerdo", "oveja", "gallina",
    "tigre", "león", "elefante", "mono", "oso"
  ],
  casa: [
    "puerta", "ventana", "mesa", "silla", "cama",
    "cocina", "baño", "lavabo", "armario", "televisor",
    "interruptor", "enchufe", "alfombra", "nevera", "toalla"
  ],
  frutas: [
    "manzana", "plátano", "naranja", "uva", "fresa",
    "limón", "mango", "sandía", "pera", "kiwi",
    "mandarina", "melón", "piña", "cereza", "ciruela"
  ],
  verduras: [
    "zanahoria", "lechuga", "tomate", "pepino", "cebolla",
    "patata", "brocoli", "espinaca", "calabacín", "pimiento",
    "ajo", "apio", "coliflor", "remolacha", "berenjena"
  ],
  trabajo: [
    "médico", "profesor", "bombero", "policía", "ingeniero",
    "abogado", "programador", "enfermero", "electricista", "albañil",
    "chef", "piloto", "contador", "psicólogo", "farmacéutico"
  ],
  ciudad: [
    "calle", "avenida", "edificio", "parque", "semáforo",
    "metro", "autobús", "bicicleta", "coche", "taxi",
    "supermercado", "banco", "hospital", "escuela", "plaza"
  ],
  tiempo_clima: [
    "sol", "lluvia", "nube", "viento", "nieve",
    "llover", "nevar", "amanecer", "anochecer", "mañana",
    "tarde", "noche", "semana", "mes", "estación"
  ],
  emociones: [
    "feliz", "triste", "enojado", "asustado", "sorprendido",
    "contento", "cansado", "confundido", "entusiasmado", "tranquilo",
    "nervioso", "amor", "odio", "alegría", "miedo"
  ],
  supermercado: [
    "pan", "leche", "huevos", "queso", "jamón",
    "carne", "pescado", "arroz", "pasta", "aceite",
    "sal", "azúcar", "café", "té", "yogur"
  ],
  naturaleza: [
    "árbol", "flor", "montaña", "río", "bosque",
    "playa", "mar", "cielo", "tierra", "aire",
    "sol", "luna", "estrella", "nube", "invierno"
  ]
};
