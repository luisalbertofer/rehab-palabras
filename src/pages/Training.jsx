import React, { useEffect, useState } from "react";
import { wordGroups } from "../data/wordGroups";
import TrainingStats from "../components/TrainingStats";


const Training = () => {
  const [selectedGroup, setSelectedGroup] = useState("animales");
  const [currentWord, setCurrentWord] = useState("");
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

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
    const word = words[Math.floor(Math.random() * words.length)];
    const opts = getRandomOptions(word, words);
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
    }
  };

  const playAudio = () => {
    const path = `/audios/${selectedGroup}/${currentWord}.mp3`;
    const audio = new Audio(path);
    audio.play();
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center space-y-6">
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={playAudio}
        >
          🔊 Reproducir audio
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option}
            className={`border px-4 py-2 rounded ${
              selected
                ? option === currentWord
                  ? "bg-green-200"
                  : option === selected
                  ? "bg-red-200"
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

      {result && <p className="text-lg font-semibold">{result}</p>}

      <div>
        <button
          className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          onClick={pickNewWord}
        >
          ▶️ Siguiente
        </button>
      </div>

      <TrainingStats
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        onReset={handleResetStats}
      />
    </div>
  );
};

export default Training;
