import React, { useEffect, useState } from "react";
import { phonologicalPairsByGroup } from "../data/phonologicalPairs";
import AudioButton from "../components/AudioButton";
import OptionsGrid from "../components/OptionsGrid";
import SessionSummary from "../components/SessionSummary";
import TrainingStats from "../components/TrainingStats";
import { motion, AnimatePresence } from "framer-motion";

const TrainingFonologico = () => {
    const [currentPair, setCurrentPair] = useState(null);
    const [selected, setSelected] = useState(null);
    const [result, setResult] = useState(null);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [sessionOver, setSessionOver] = useState(false);
    const [failedPairs, setFailedPairs] = useState([]);
    const [repeatingFails, setRepeatingFails] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState("todos");
    const [pairs, setPairs] = useState([]);

    const [correctCount, setCorrectCount] = useState(() =>
        parseInt(localStorage.getItem("fonologico_correct") || "0")
    );
    const [incorrectCount, setIncorrectCount] = useState(() =>
        parseInt(localStorage.getItem("fonologico_incorrect") || "0")
    );

    useEffect(() => {
        localStorage.setItem("fonologico_correct", correctCount);
        localStorage.setItem("fonologico_incorrect", incorrectCount);
    }, [correctCount, incorrectCount]);

    useEffect(() => {
        const allGroups = Object.entries(phonologicalPairsByGroup);
        const selectedPairs =
            selectedGroup === "todos"
                ? allGroups.flatMap(([, group]) => group)
                : phonologicalPairsByGroup[selectedGroup] || [];

        if (!selectedPairs || selectedPairs.length === 0) {
            console.warn(`⚠️ No hay pares disponibles para el grupo: ${selectedGroup}`);
            setPairs([]);
            setCurrentPair(null);
            return;
        }

        console.log("🔍 Grupo seleccionado:", selectedGroup);
        console.log("🔍 Pairs seleccionados:", selectedPairs);

        setPairs(selectedPairs);
    }, [selectedGroup]);

    const handleResetStats = () => {
        setCorrectCount(0);
        setIncorrectCount(0);
        localStorage.removeItem("fonologico_correct");
        localStorage.removeItem("fonologico_incorrect");
    };

    const pickNewPair = (sourceList = pairs) => {
        if (!sourceList || sourceList.length === 0) {
            console.warn("⚠️ Lista de pares vacía. No se puede seleccionar.");
            setCurrentPair(null);
            return;
        }

        const randomIndex = Math.floor(Math.random() * sourceList.length);
        const pair = sourceList[randomIndex];

        if (!pair || !pair.word1 || !pair.word2) {
            console.error("⚠️ Par inválido encontrado:", pair, "en índice:", randomIndex);
            setCurrentPair(null);
            return;
        }

        const correctWord = Math.random() < 0.5 ? pair.word1 : pair.word2;
        setCurrentPair({ ...pair, correct: correctWord });
        setSelected(null);
        setResult(null);
    };

    useEffect(() => {
        if (pairs.length > 0) {
            pickNewPair();
        } else {
            console.warn("⚠️ No hay pares disponibles para el grupo seleccionado.");
        }
    }, [pairs]);

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
            <h1 className="text-2xl font-bold">🔤 Entrenamiento Fonológico</h1>

            <div>
                <label className="block font-semibold mb-2">🎯 Grupo fonológico:</label>
                <select
                    className="w-full p-2 border rounded mb-4"
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                >
                    <option value="todos">🌐 Todos</option>
                    {Object.keys(phonologicalPairsByGroup).map((key) => (
                        <option key={key} value={key}>
                            /{key.replace("_", "/")}/
                        </option>
                    ))}
                </select>
            </div>

            {currentPair ? (
                <>
                    <p>Escucha la palabra y selecciona cuál crees que es:</p>
                    <AudioButton word={currentPair.correct} group="fonologico" />

                    <OptionsGrid
                        options={[currentPair.word1, currentPair.word2]}
                        currentWord={currentPair.correct}
                        selected={selected}
                        onSelect={handleOptionClick}
                    />
                </>
            ) : (
                <p className="text-red-600 font-semibold">⚠️ No hay pares disponibles para este grupo.</p>
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
                    failedWords={failedPairs.map(p => p.correct)}
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

export default TrainingFonologico;
