import React, { useEffect, useState } from "react";
import { vowelPairsByGroup } from "../data/vowelPairsByGroup";
import AudioButton from "../components/AudioButton";
import OptionsGrid from "../components/OptionsGrid";
import SessionSummary from "../components/SessionSummary";
import TrainingStats from "../components/TrainingStats";
import { motion, AnimatePresence } from "framer-motion";

const TrainingFonologicoVocales = () => {
    const [selectedGroup, setSelectedGroup] = useState("todos");
    const [pairs, setPairs] = useState([]);
    const [currentPair, setCurrentPair] = useState(null);
    const [selected, setSelected] = useState(null);
    const [result, setResult] = useState(null);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [sessionOver, setSessionOver] = useState(false);
    const [failedPairs, setFailedPairs] = useState([]);
    const [repeatingFails, setRepeatingFails] = useState(false);

    const [correctCount, setCorrectCount] = useState(() =>
        parseInt(localStorage.getItem("vocales_correct") || "0")
    );
    const [incorrectCount, setIncorrectCount] = useState(() =>
        parseInt(localStorage.getItem("vocales_incorrect") || "0")
    );

    useEffect(() => {
        localStorage.setItem("vocales_correct", correctCount);
        localStorage.setItem("vocales_incorrect", incorrectCount);
    }, [correctCount, incorrectCount]);

    useEffect(() => {
        const allGroups = Object.entries(vowelPairsByGroup);
        const selectedPairs =
            selectedGroup === "todos"
                ? allGroups.flatMap(([, group]) => group)
                : vowelPairsByGroup[selectedGroup] || [];

        if (selectedPairs.length > 0) {
            setPairs(selectedPairs);
            pickNewPair(selectedPairs);
        } else {
            setPairs([]);
            setCurrentPair(null);
        }
    }, [selectedGroup]);

    const pickNewPair = (sourceList = pairs) => {
        if (!sourceList || sourceList.length === 0) {
            setCurrentPair(null);
            return;
        }

        const pair = sourceList[Math.floor(Math.random() * sourceList.length)];
        const correctWord = Math.random() < 0.5 ? pair.word1 : pair.word2;
        setCurrentPair({ ...pair, correct: correctWord });
        setSelected(null);
        setResult(null);
    };

    const handleResetStats = () => {
        setCorrectCount(0);
        setIncorrectCount(0);
        localStorage.removeItem("vocales_correct");
        localStorage.removeItem("vocales_incorrect");
    };

    const handleOptionClick = (option) => {
        setSelected(option);
        const isCorrect = option === currentPair.correct;
        setResult(isCorrect ? "✅ ¡Correcto!" : "❌ Incorrecto");

        if (isCorrect) {
            setCorrectCount((prev) => prev + 1);
        } else {
            setIncorrectCount((prev) => prev + 1);
            setFailedPairs((prev) => [...new Set([...prev, currentPair])]);
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
        setFailedPairs([]);
        pickNewPair();
    };

    const repeatFailsOnly = () => {
        setRepeatingFails(true);
        setCorrectCount(0);
        setIncorrectCount(0);
        setTotalAttempts(0);
        setSessionOver(false);
        pickNewPair();
    };

    return (
        <div className="p-6 max-w-xl mx-auto text-center space-y-6 bg-white shadow-md rounded-xl">
            <h1 className="text-2xl font-bold">🗣️ Discriminación de Vocales</h1>

            <div>
                <label className="block font-semibold mb-2">🎯 Grupo vocálico:</label>
                <select
                    className="w-full p-2 border rounded mb-4"
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                >
                    <option value="todos">🌐 Todos</option>
                    {Object.keys(vowelPairsByGroup).map((key) => (
                        <option key={key} value={key}>
                            /{key.replace("_", "/")}/
                        </option>
                    ))}
                </select>
            </div>

            {currentPair ? (
                <>
                    <p>Escucha la palabra y selecciona cuál crees que es:</p>
                    <AudioButton word={currentPair.correct} group="fonologico_vocales" />

                    <OptionsGrid
                        options={[currentPair.word1, currentPair.word2]}
                        currentWord={currentPair.correct}
                        selected={selected}
                        onSelect={handleOptionClick}
                    />
                </>
            ) : (
                <p className="text-red-600 font-semibold">
                    ⚠️ No hay pares disponibles para este grupo.
                </p>
            )}

            <AnimatePresence>
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

            <TrainingStats
                correctCount={correctCount}
                incorrectCount={incorrectCount}
                onReset={handleResetStats}
            />

            {sessionOver ? (
                <SessionSummary
                    correct={correctCount}
                    incorrect={incorrectCount}
                    failedWords={failedPairs.map((p) => p.correct)}
                    onReset={resetSession}
                    onRepeatFails={repeatFailsOnly}
                />
            ) : (
                <button
                    onClick={() => pickNewPair()}
                    className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                >
                    ▶️ Siguiente
                </button>
            )}
        </div>
    );
};

export default TrainingFonologicoVocales;
