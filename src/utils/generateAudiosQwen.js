// generateAudios.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { config } from 'dotenv';
config();

const client = new TextToSpeechClient();

// Importa las palabras/frases desde wordGroups.js
// Asegúrate de tener una versión .js o .mjs con exportación
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const wordGroups = (await import('./wordGroups.js')).wordGroups;

// Carpeta donde se guardarán los audios
const outputDir = path.join(__dirname, 'audios');


/**
 * Genera un audio para una palabra o frase
 */
async function generateAudio(text, category, filename) {
  const request = {
    input: { text },
    voice: {
      languageCode: "es-ES",
      name: "es-ES-Neural2-A", // Voz neural recomendada
      ssmlGender: "FEMALE" // Opcional: define el género
    },
        audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: 0.85, // Habla más lenta (por defecto es 1.0)
        pitch: 0.5,         // Altura natural
        volumeGainDb: 6,    // Volumen un poco más alto (opcional)
    }
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    const filePath = path.join(outputDir, category, `${filename}.mp3`);
    fs.writeFileSync(filePath, response.audioContent);
    console.log(`✅ Generado: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error generando audio para "${text}":`, error.message);
  }
}

/**
 * Crea carpetas necesarias si no existen
 */
function ensureDirectoryExistence(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Genera todos los audios organizados por categoría
 */
async function generateAllAudios() {
  for (const category in wordGroups) {
    const dirPath = path.join(outputDir, category);
    ensureDirectoryExistence(dirPath);

    for (const item of wordGroups[category]) {
      const safeFilename = item.replace(/[\\/?%*:|"<>]/g, '_'); // evitar caracteres inválidos
      await generateAudio(item, category, safeFilename);
    }
  }

  console.log("🎉 ¡Todos los audios han sido generados correctamente!");
}

// Ejecutar el proceso
generateAllAudios();