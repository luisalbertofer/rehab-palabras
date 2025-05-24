import React, { useState, useEffect } from "react";
import { generateAudio } from "../utils/generateAudio";

const defaultWords = ["hola", "gracias", "adiós", "mamá", "papá", "sí", "no", "por favor"];

const VOICE_OPTIONS = [
  { value: "es-ES-Neural2-A", label: "Español (España) - Voz Femenina A" },
  { value: "es-ES-Neural2-B", label: "Español (España) - Voz Femenina B" },
  { value: "es-ES-Neural2-C", label: "Español (España) - Voz Masculina C" },
  { value: "es-ES-Standard-A", label: "Español (Estándar) - Voz Femenina A" }
];

const Admin = () => {
  const [token, setToken] = useState("");
  const [words, setWords] = useState(defaultWords);
  const [status, setStatus] = useState({});
  const [selectedVoice, setSelectedVoice] = useState(VOICE_OPTIONS[0].value);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cargar token desde localStorage si existe
    const savedToken = localStorage.getItem("tts_token");
    if (savedToken) setToken(savedToken);
  }, []);

  const handleGenerateAll = async () => {
    if (!token.trim()) return;
    
    setIsGenerating(true);
    setProgress(0);
    const newStatus = {};
    const totalWords = words.length;

    try {
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        newStatus[word] = "loading";
        setStatus({ ...newStatus });

        try {
          await generateAudio(word, `${word}.mp3`, token, selectedVoice);
          newStatus[word] = "ok";
        } catch (err) {
          console.error("Error generando:", word, err);
          newStatus[word] = "error";
        }

        setStatus({ ...newStatus });
        setProgress(((i + 1) / totalWords) * 100);
      }
    } finally {
      setIsGenerating(false);
      // Guardar token en localStorage
      localStorage.setItem("tts_token", token);
    }
  };

  const handleWordsChange = (e) => {
    const value = e.target.value;
    const list = value.split(",").map(w => w.trim()).filter(Boolean);
    setWords(list);
  };

  const completedCount = Object.values(status).filter(s => s === "ok").length;
  const errorCount = Object.values(status).filter(s => s === "error").length;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔊 Generador de Audios con Google TTS</h1>

      <div className="space-y-4">
        <div>
          <label className="block mb-2 font-semibold">🔐 Token (Bearer):</label>
          <input
            type="password"
            placeholder="Pega aquí el token"
            className="w-full p-2 border rounded"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-1">
            El token se guardará automáticamente en tu navegador
          </p>
        </div>

        <div>
          <label className="block mb-2 font-semibold">🗣 Voz:</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
          >
            {VOICE_OPTIONS.map(voice => (
              <option key={voice.value} value={voice.value}>
                {voice.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">📄 Lista de palabras (separadas por coma):</label>
          <textarea
            className="w-full p-2 border rounded"
            placeholder="hola, mamá, papá, adiós"
            rows={3}
            value={words.join(", ")}
            onChange={handleWordsChange}
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${
              !token.trim() || isGenerating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleGenerateAll}
            disabled={!token.trim() || isGenerating}
          >
            {isGenerating ? "⏳ Generando..." : "🎧 Generar Audios"}
          </button>

          {isGenerating && (
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>

        {!isGenerating && (completedCount > 0 || errorCount > 0) && (
          <div className="p-3 bg-gray-100 rounded">
            <p>
              ✅ <span className="font-medium">{completedCount}</span> audios generados
              {errorCount > 0 && (
                <>
                  {" "} | ❌ <span className="font-medium">{errorCount}</span> errores
                </>
              )}
            </p>
          </div>
        )}

        <ul className="space-y-2">
          {words.map((word) => (
            <li key={word} className="flex justify-between items-center border p-2 rounded">
              <span className="font-medium">{word}</span>
              <span className={`text-sm px-2 py-1 rounded ${
                status[word] === "ok" ? "bg-green-100 text-green-800" :
                status[word] === "error" ? "bg-red-100 text-red-800" :
                status[word] === "loading" ? "bg-blue-100 text-blue-800" :
                "bg-gray-100 text-gray-800"
              }`}>
                {status[word] === "loading" && "⏳ Generando..."}
                {status[word] === "ok" && "✅ Generado"}
                {status[word] === "error" && "❌ Error"}
                {!status[word] && "🟡 Pendiente"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;