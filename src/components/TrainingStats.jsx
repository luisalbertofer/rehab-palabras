import React from "react";

const TrainingStats = ({ correctCount, incorrectCount, onReset }) => {
  const total = correctCount + incorrectCount;
  const accuracy = total > 0 ? ((correctCount / total) * 100).toFixed(1) : 0;

  return (
    <div className="bg-gray-100 p-4 rounded shadow text-left text-sm mt-6">
      <h2 className="font-bold text-lg mb-2">📊 Estadísticas</h2>
      <p>✅ Aciertos: <strong>{correctCount}</strong></p>
      <p>❌ Errores: <strong>{incorrectCount}</strong></p>
      <p>📈 Precisión: <strong>{accuracy}%</strong></p>
      <button
        className="mt-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        onClick={onReset}
      >
        🔁 Reiniciar estadísticas
      </button>
    </div>
  );
};

export default TrainingStats;
