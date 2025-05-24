import React, { useEffect, useState } from "react";
import { wordGroups } from "../data/wordGroups";
import TrainingStats from "../components/TrainingStats";
import { motion, AnimatePresence } from "framer-motion";



const Training = () => {
  const [selectedGroup, setSelectedGroup] = useState("animales");
  const [currentWord, setCurrentWord] = useState("");
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [sessionOver, setSessionOver] = useState(false);
  const [failedWords, setFailedWords] = useState([]);
  const [repeatingFails, setRepeatingFails] = useState(false);

  const words = wordGroups[selectedGroup] || [];

  // Estadísticas persistentes
  const [correctCount, setCorrectCount] = useState(() =>
    parseInt(localStorage.getItem("correctCount") || "0")
  );
  const [incorrectCount, setIncorrectCount] = useState(() =>
    parseInt(localStorage.getItem("incorrectCount") || "0")
  );

  useEffect(() => {
    localStorage.setItem("correctCount", correctCount);
    localStorage.setItem("incorrectCount", incorrectCount);
  }, [correctCount, incorrectCount]);

  const handleResetStats = () => {
    setCorrectCount(0);
    setIncorrectCount(0);
    localStorage.removeItem("correctCount");
    localStorage.removeItem("incorrectCount");
  };

  const getRandomOptions = (correctWord, allWords, n = 3) => {
    const options = new Set([correctWord]);
    while (options.size < n) {
      const random = allWords[Math.floor(Math.random() * allWords.length)];
      options.add(random);
    }
    return Array.from(options).sort(() => Math.random() - 0.5);
  };

  const pickNewWord = () => {
    const sourceWords = repeatingFails ? failedWords : words;
    const word = sourceWords[Math.floor(Math.random() * sourceWords.length)];
    const opts = getRandomOptions(word, sourceWords);
    setCurrentWord(word);
    setOptions(opts);
    setSelected(null);
    setResult(null);
  };


  useEffect(() => {
    if (words.length > 0) pickNewWord();
  }, [selectedGroup]);

  const handleOptionClick = (option) => {
    setSelected(option);
    const isCorrect = option === currentWord;
    setResult(isCorrect ? "✅ ¡Correcto!" : "❌ Incorrecto");
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
      setFailedWords((prev) => [...new Set([...prev, currentWord])]);
    }

    setTotalAttempts(prev => {
      const newTotal = prev + 1;
      if (newTotal >= 10) {
        setSessionOver(true);
      }
      return newTotal;
    });
  };

  const resetSession = () => {
    setCorrectCount(0);
    setIncorrectCount(0);
    setTotalAttempts(0);
    setSessionOver(false);
    setRepeatingFails(false);
    setFailedWords([]);
    pickNewWord();
  };


  const playAudio = () => {
    const path = `/audios/${selectedGroup}/${currentWord}.mp3`;

    fetch(path)
      .then(res => {
        if (!res.ok) throw new Error("Audio no encontrado");
        const audio = new Audio(path);
        audio.play();
      })
      .catch(() => {
        alert("⚠️ Este audio no está disponible aún. Por favor, contacta con el Admin.");
      });
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center space-y-6 bg-white shadow-md rounded-xl">

      <h1 className="text-2xl font-bold">🎧 Entrenamiento Auditivo</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-2">🧩 Selecciona una categoría:</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
        >
          {Object.keys(wordGroups).map((group) => (
            <option key={group} value={group}>
              {group.replaceAll("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="mb-2">Escucha el audio y selecciona la palabra correcta:</p>
        <button
          className="group bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 hover:scale-105 transition transform duration-200"
          onClick={playAudio}
        >
          <span className="group-hover:animate-pulse">🔊</span> Escuchar audio
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option}
            className={`border px-4 py-2 rounded-lg shadow text-sm transition-all ${selected
                ? option === currentWord
                  ? "bg-green-200 border-green-600"
                  : option === selected
                    ? "bg-red-200 border-red-600"
                    : "bg-gray-100"
                : "hover:bg-gray-100"
              }`}
            onClick={() => handleOptionClick(option)}
            disabled={selected !== null}
          >
            {option}
          </button>
        ))}
      </div>

      {result && <AnimatePresence>
        {result && (
          <motion.p
            key={result}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`text-lg font-semibold ${result.includes("Correcto") ? "text-green-700" : "text-red-700"
              }`}
          >
            {result}
          </motion.p>
        )}
      </AnimatePresence>
      }

      <TrainingStats
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        onReset={handleResetStats}
      />

      {sessionOver ? (
        <div className="mt-6 p-4 bg-blue-100 rounded text-center">
          <h2 className="text-xl font-semibold mb-2">🎉 Sesión completada</h2>
          <p>✅ Aciertos: <strong>{correctCount}</strong></p>
          <p>❌ Errores: <strong>{incorrectCount}</strong></p>
          <p>📈 Precisión: <strong>{((correctCount / totalAttempts) * 100).toFixed(1)}%</strong></p>

          {failedWords.length > 0 && (
            <button
              onClick={() => {
                setRepeatingFails(true);
                setCorrectCount(0);
                setIncorrectCount(0);
                setTotalAttempts(0);
                setSessionOver(false);
                pickNewWord();
              }}
              className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              🔁 Repetir solo errores ({failedWords.length})
            </button>
          )}

          <button
            onClick={resetSession}
            className="mt-4 ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            🔄 Nueva sesión completa
          </button>
        </div>
      ) : (
        <button
          className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          onClick={pickNewWord}
        >
          ▶️ Siguiente
        </button>
      )}


    </div>
  );
};

export default Training;
