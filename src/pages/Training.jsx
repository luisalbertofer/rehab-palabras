import React, { useEffect, useState } from "react";
import { wordGroups } from "../data/wordGroups";
import AudioButton from "../components/AudioButton";
import OptionsGrid from "../components/OptionsGrid";
import SessionSummary from "../components/SessionSummary";
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

  const getGroupWords = (group) => {
    if (group.includes(".")) {
      const [parent, child] = group.split(".");
      return wordGroups[parent]?.[child] || [];
    }
    return wordGroups[group] || [];
  };

  const words = getGroupWords(selectedGroup);

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
    setFailedWords([]);
    pickNewWord();
  };

  const repeatFailsOnly = () => {
    setRepeatingFails(true);
    setCorrectCount(0);
    setIncorrectCount(0);
    setTotalAttempts(0);
    setSessionOver(false);
    pickNewWord();
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center space-y-6 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold">🎧 Entrenamiento Auditivo</h1>

      <div>
        <label className="block font-semibold mb-2">🧩 Selecciona una categoría:</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
        >
          <optgroup label="🎯 Entrenamiento general">
            <option value="palabras_comunes">Palabras comunes</option>
            <option value="palabras_similares">Palabras similares</option>
            <option value="palabras_con_acentos">Con acentos</option>
            <option value="palabras_polisilabas">Polisílabas</option>
          </optgroup>

          <optgroup label="🔡 Fonología y vocales">
            <option value="vocales">Vocales</option>
            <option value="combinaciones_vocales">Combinaciones de vocales</option>
            <option value="diptongos">Diptongos</option>
            <option value="triptongos">Triptongos</option>
            <option value="silabas_trabadas">Sílabas trabadas</option>
          </optgroup>

          <optgroup label="🗣️ Frases y comprensión verbal">
            <option value="frases_breves">Frases breves</option>
            <option value="frases_con_ruido">Frases con ruido</option>
            <option value="oraciones_ambiguas">Oraciones ambiguas</option>
            <option value="frases_con_entonacion">Frases con entonación</option>
            <option value="preguntas_comunes">Preguntas comunes</option>
            <option value="frases_tiempo_verbal">Frases con tiempos verbales</option>
            <option value="frases_con_negacion">Frases con negación</option>
            <option value="frases_con_sujeto_verbo">Sujeto + verbo</option>
          </optgroup>

          <optgroup label="🔢 Número de sílabas">
            <option value="numero_de_silabas.dos_silabas">2 sílabas</option>
            <option value="numero_de_silabas.tres_silabas">3 sílabas</option>
            <option value="numero_de_silabas.cuatro_silabas">4 sílabas</option>
          </optgroup>

          <optgroup label="🏠 Temáticas cotidianas">
            <option value="animales">Animales</option>
            <option value="casa">Casa</option>
            <option value="frutas">Frutas</option>
            <option value="verduras">Verduras</option>
            <option value="trabajo">Profesiones</option>
            <option value="ciudad">Ciudad</option>
            <option value="supermercado">Supermercado</option>
            <option value="naturaleza">Naturaleza</option>
            <option value="emociones">Emociones</option>
            <option value="tiempo_clima">Tiempo / Clima</option>
          </optgroup>

          <optgroup label="🎵 Expresiones">
            <option value="expresiones_sonoras">Interjecciones / expresiones</option>
          </optgroup>
        </select>
      </div>

      <p>Escucha la palabra y selecciona la correcta:</p>
      <AudioButton word={currentWord} group={selectedGroup} />

      <OptionsGrid
        options={options}
        currentWord={currentWord}
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
          failedWords={failedWords}
          onReset={resetSession}
          onRepeatFails={repeatFailsOnly}
        />
      ) : (
        <button
          onClick={pickNewWord}
          className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          ▶️ Siguiente
        </button>
      )}
    </div>
  );
};

export default Training;
