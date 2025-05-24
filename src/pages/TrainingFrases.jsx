import React, { useEffect, useState } from "react";
import { wordGroups } from "../data/wordGroups";
import AudioButton from "../components/AudioButton";
import OptionsGrid from "../components/OptionsGrid";
import SessionSummary from "../components/SessionSummary";
import TrainingStats from "../components/TrainingStats";
import { motion, AnimatePresence } from "framer-motion";

const TrainingFrases = () => {
  const [currentFrase, setCurrentFrase] = useState("");
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [sessionOver, setSessionOver] = useState(false);
  const [failedFrases, setFailedFrases] = useState([]);
  const [repeatingFails, setRepeatingFails] = useState(false);

  const frases = wordGroups["frases_breves"] || [];

  const [correctCount, setCorrectCount] = useState(() =>
    parseInt(localStorage.getItem("frases_correct") || "0")
  );
  const [incorrectCount, setIncorrectCount] = useState(() =>
    parseInt(localStorage.getItem("frases_incorrect") || "0")
  );

  useEffect(() => {
    localStorage.setItem("frases_correct", correctCount);
    localStorage.setItem("frases_incorrect", incorrectCount);
  }, [correctCount, incorrectCount]);

  const handleResetStats = () => {
    setCorrectCount(0);
    setIncorrectCount(0);
    localStorage.removeItem("frases_correct");
    localStorage.removeItem("frases_incorrect");
  };

  const getRandomOptions = (correct, all, n = 3) => {
    const set = new Set([correct]);
    while (set.size < n) {
      const rand = all[Math.floor(Math.random() * all.length)];
      set.add(rand);
    }
    return Array.from(set).sort(() => Math.random() - 0.5);
  };

  const pickNewFrase = () => {
    const source = repeatingFails ? failedFrases : frases;
    const frase = source[Math.floor(Math.random() * source.length)];
    const opts = getRandomOptions(frase, source);
    setCurrentFrase(frase);
    setOptions(opts);
    setSelected(null);
    setResult(null);
  };

  useEffect(() => {
    if (frases.length > 0) pickNewFrase();
  }, []);

  const handleOptionClick = (option) => {
    setSelected(option);
    const isCorrect = option === currentFrase;
    setResult(isCorrect ? "✅ ¡Correcto!" : "❌ Incorrecto");

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
      setFailedFrases((prev) => [...new Set([...prev, currentFrase])]);
    }

    setTotalAttempts((prev) => {
      const total = prev + 1;
      if (total >= 10) setSessionOver(true);
      return total;
    });
  };

  const resetSession = () => {
    setCorrectCount(0);
    setIncorrectCount(0);
    setTotalAttempts(0);
    setSessionOver(false);
    setRepeatingFails(false);
    setFailedFrases([]);
    pickNewFrase();
  };

  const repeatFailsOnly = () => {
    setRepeatingFails(true);
    setCorrectCount(0);
    setIncorrectCount(0);
    setTotalAttempts(0);
    setSessionOver(false);
    pickNewFrase();
  };

  // 🧠 Transformar frase a nombre de archivo (sin acentos, signos)
  const fraseToFilename = (frase) =>
    frase
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[¿?¡!.,]/g, "")
      .replace(/\s+/g, "_");

  return (
    <div className="p-6 max-w-xl mx-auto text-center space-y-6 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold">🗣️ Entrenamiento con Frases</h1>

      <p>Escucha la frase y selecciona la correcta:</p>
      <AudioButton word={fraseToFilename(currentFrase)} group="frases_breves" />

      <OptionsGrid
        options={options}
        currentWord={currentFrase}
        selected={selected}
        onSelect={handleOptionClick}
      />

      <AnimatePresence>
        {result && (
          <motion.p
            key={result}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`text-lg font-semibold ${
              result.includes("Correcto") ? "text-green-700" : "text-red-700"
            }`}
          >
            {result}
          </motion.p>
        )}
      </AnimatePresence>

      <TrainingStats
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        onReset={handleResetStats}
      />

      {sessionOver ? (
        <SessionSummary
          correct={correctCount}
          incorrect={incorrectCount}
          failedWords={failedFrases}
          onReset={resetSession}
          onRepeatFails={repeatFailsOnly}
        />
      ) : (
        <button
          onClick={pickNewFrase}
          className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          ▶️ Siguiente
        </button>
      )}
    </div>
  );
};

export default TrainingFrases;
