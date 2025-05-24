// src/components/SessionSummary.jsx
import React from "react";

const SessionSummary = ({ correct, incorrect, failedWords, onRepeatFails, onReset }) => {
  const total = correct + incorrect;
  const accuracy = total > 0 ? ((correct / total) * 100).toFixed(1) : 0;

  return (
    <div className="mt-6 p-4 bg-blue-100 rounded text-center">
      <h2 className="text-xl font-semibold mb-2">🎉 Sesión completada</h2>
      <p>✅ Aciertos: <strong>{correct}</strong></p>
      <p>❌ Errores: <strong>{incorrect}</strong></p>
      <p>📈 Precisión: <strong>{accuracy}%</strong></p>

      {failedWords.length > 0 && (
        <button
          onClick={onRepeatFails}
          className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          🔁 Repetir solo errores ({failedWords.length})
        </button>
      )}

      <button
        onClick={onReset}
        className="mt-4 ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        🔄 Nueva sesión completa
      </button>
    </div>
  );
};

export default SessionSummary;
