export const generateAudio = async (text, filename = "output.mp3", token) => {
  // Validación básica
  if (!text || !token) throw new Error("Texto y token son requeridos");

  const requestData = {
    input: { text },
    voice: {
      languageCode: "es-ES",
      name: "es-ES-Neural2-A", // Voz neural recomendada
      ssmlGender: "FEMALE" // Opcional: define el género
    },
    audioConfig: {
      audioEncoding: "MP3",
      speakingRate: 1.0,
      pitch: 0, // Rango: -20.0 a 20.0
      volumeGainDb: 0 // Rango: -96.0 a 16.0
    }
  };

  try {
    const response = await fetch("https://texttospeech.googleapis.com/v1/text:synthesize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "x-goog-user-project": "my-new-tts-project" // Añade tu proyecto
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Error al generar audio");
    }

    const { audioContent } = await response.json();
    downloadAudio(audioContent, filename);
    
  } catch (error) {
    console.error("Error en generateAudio:", error);
    throw error;
  }
};

// Función separada para descargar el audio
const downloadAudio = (audioContent, filename) => {
  try {
    const byteCharacters = atob(audioContent);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "audio/mpeg" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    // Limpieza
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error("Error al descargar audio:", error);
    throw error;
  }
};