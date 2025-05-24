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

  // 🐝 Triptongos
  triptongos: [
    "limpiáis", "estudiéis", "buey", "cambiáis", "actuáis", "enviéis", "agüita", "averiguáis"
  ],

  // 🔗 Sílabas trabadas
  silabas_trabadas: [
    "plato", "grito", "trampa", "clavo", "flor", "brote", "prisa", "cruz", "brisa", "globo",
    "blanco", "fruta", "trueno", "drástico", "crudo", "pronto", "trozo", "droga", "grúa"
  ],

  // 🧩 Palabras comunes
  palabras_comunes: [
    "hola", "gracias", "adiós", "mamá", "papá", "sí", "no", "por favor", "buenos días", "perdón",
    "cómo estás", "bien", "mal", "ayuda", "calle", "casa", "escuela", "baño", "trabajo",
    "agua", "comida", "tiempo", "ahora", "ayer", "mañana", "día", "noche", "hora"
  ],

  // 🔍 Palabras similares (discriminación auditiva)
  palabras_similares: [
    "casa", "taza", "pasa", "masa", "basa",
    "tino", "dino", "vino", "fino", "mino",
    "pato", "gato", "dato", "lato", "rato",
    "mesa", "besa", "pesa", "lesa", "deja",
    "pan", "ban", "van", "fan", "man"
  ],

  // 🎯 Palabras con acentos
  palabras_con_acentos: [
    "camión", "teléfono", "fácil", "azúcar", "sofá", "inglés", "ratón", "también", "difícil",
    "número", "país", "después", "bebé", "hábito"
  ],

  // 📚 Frases breves
  frases_breves: [
    "Hola, ¿cómo estás?", "Buenos días", "¿Dónde está el baño?",
    "Me llamo Luis", "No entiendo", "¿Puedes repetir?", "Muchas gracias",
    "Estoy cansado", "Tengo hambre", "¿Qué hora es?", "Hoy hace calor",
    "Vamos al parque", "¿Cuál es tu nombre?", "Te veo mañana"
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
    "¿Vienes conmigo?", // pregunta
    "¡Es increíble!", // exclamación
    "Estoy listo.", // afirmación
    "¿En serio?", // duda
    "Lo haré mañana." // seguridad
  ]
};