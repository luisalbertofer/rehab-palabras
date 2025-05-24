// Genera audios para palabras/frases usando Google Cloud Text-to-Speech
// Asegúrate de tener configurado tu entorno con las credenciales de Google Cloud
// primero cd src/utils
// y luego ejecuta este script con Node.js
// node generateAudiosQwen.js

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

const wordGroups = (await import('./wordGroupFonologicoVocales.js')).wordGroups;

// Carpeta donde se guardarán los audios
const outputDir = path.join(__dirname, 'audios');

/**
 * Crea recursivamente los directorios necesarios si no existen
 */
function ensureDirectoryExistence(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Creada carpeta: ${dirPath}`);
  }
}

/**
 * Genera un audio para una palabra o frase
 */
async function generateAudio(text, category, filename) {
  // Original location
  const filePath = path.join(outputDir, category, `${filename}.mp3`);
  
  // Public folder location
  const publicDir = path.join(__dirname, '..', '..', 'public', 'audios');
  const publicFilePath = path.join(publicDir, category, `${filename}.mp3`);
  
  // Ensure public directory exists
  ensureDirectoryExistence(path.join(publicDir, category));
  
  // Verificar si el archivo ya existe
  if (fs.existsSync(filePath)) {
    console.log(`⏭️ Omitiendo (ya existe): ${filePath}`);
    
    // Copy to public if it doesn't exist there but exists in src
    if (!fs.existsSync(publicFilePath)) {
      fs.copyFileSync(filePath, publicFilePath);
      console.log(`📋 Copiado a public: ${publicFilePath}`);
    }
    
    return;
  }
  
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
    // Save to original location
    ensureDirectoryExistence(path.dirname(filePath));
    fs.writeFileSync(filePath, response.audioContent);
    console.log(`✅ Generado: ${filePath}`);
    
    // Also save to public folder
    fs.writeFileSync(publicFilePath, response.audioContent);
    console.log(`📋 Guardado en public: ${publicFilePath}`);
  } catch (error) {
    console.error(`❌ Error generando audio para "${text}":`, error.message);
  }
}

/**
 * Genera todos los audios organizados por categoría
 */
async function generateAllAudios() {
  // Contador para estadísticas
  let stats = {
    total: 0,
    existentes: 0,
    nuevos: 0,
    errores: 0
  };
  
  // Procesar cada categoría
  for (const category in wordGroups) {
    const dirPath = path.join(outputDir, category);
    ensureDirectoryExistence(dirPath);
    console.log(`🔍 Procesando categoría: ${category}`);

    try {
      // Caso especial para categorías que contienen subobjetos
      if (category === 'numero_de_silabas') {
        for (const subcategory in wordGroups[category]) {
          const subDirPath = path.join(dirPath, subcategory);
          ensureDirectoryExistence(subDirPath);
          
          console.log(`  📁 Subcategoría: ${subcategory} (${wordGroups[category][subcategory].length} palabras)`);
          for (const item of wordGroups[category][subcategory]) {
            stats.total++;
            const safeFilename = item.replace(/[\\/?%*:|"<>]/g, '_');
            const filePath = path.join(outputDir, `${category}/${subcategory}`, `${safeFilename}.mp3`);
            
            if (fs.existsSync(filePath)) {
              stats.existentes++;
              console.log(`  ⏭️ Omitiendo (ya existe): ${item}`);
              
              // Also ensure it's in public folder
              const publicDir = path.join(__dirname, '..', '..', 'public', 'audios');
              const publicFilePath = path.join(publicDir, `${category}/${subcategory}`, `${safeFilename}.mp3`);
              ensureDirectoryExistence(path.dirname(publicFilePath));
              
              if (!fs.existsSync(publicFilePath)) {
                fs.copyFileSync(filePath, publicFilePath);
                console.log(`  📋 Copiado a public: ${publicFilePath}`);
              }
            } else {
              try {
                await generateAudio(item, `${category}/${subcategory}`, safeFilename);
                stats.nuevos++;
              } catch (err) {
                stats.errores++;
                console.error(`  ❌ Error al generar: ${item}`, err);
              }
            }
          }
        }
      } else {
        // Caso normal para arrays simples
        console.log(`  📄 Palabras: ${wordGroups[category].length}`);
        for (const item of wordGroups[category]) {
          stats.total++;
          const safeFilename = item.replace(/[\\/?%*:|"<>]/g, '_');
          const filePath = path.join(outputDir, category, `${safeFilename}.mp3`);
          
          if (fs.existsSync(filePath)) {
            stats.existentes++;
            console.log(`  ⏭️ Omitiendo (ya existe): ${item}`);
            
            // Also ensure it's in public folder
            const publicDir = path.join(__dirname, '..', '..', 'public', 'audios');
            const publicFilePath = path.join(publicDir, category, `${safeFilename}.mp3`);
            ensureDirectoryExistence(path.dirname(publicFilePath));
            
            if (!fs.existsSync(publicFilePath)) {
              fs.copyFileSync(filePath, publicFilePath);
              console.log(`  📋 Copiado a public: ${publicFilePath}`);
            }
          } else {
            try {
              await generateAudio(item, category, safeFilename);
              stats.nuevos++;
            } catch (err) {
              stats.errores++;
              console.error(`  ❌ Error al generar: ${item}`, err);
            }
          }
        }
      }
    } catch (error) {
      console.error(`❌ Error procesando categoría ${category}:`, error);
      stats.errores++;
      // Continuamos con la siguiente categoría en caso de error
    }
  }

  // Mostrar resumen de la generación
  console.log("\n📊 RESUMEN DE GENERACIÓN DE AUDIOS:");
  console.log(`Total palabras/frases: ${stats.total}`);
  console.log(`Archivos ya existentes: ${stats.existentes}`);
  console.log(`Nuevos archivos generados: ${stats.nuevos}`);
  console.log(`Errores: ${stats.errores}`);
  console.log("\n🎉 ¡Proceso completado!");
}

// Ejecutar el proceso
generateAllAudios();