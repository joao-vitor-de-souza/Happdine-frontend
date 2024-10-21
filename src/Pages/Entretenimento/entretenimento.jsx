// src/Pages/Entretenimento/entretenimento.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Importe o Link


const Entretenimento = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mt-6">Entretenimento</h1>
      <div className="flex justify-center gap-4 mt-4 flex-wrap">

        <Link to="/entretenimento/flappybird/tela_inicial">
          <button className="w-24 h-24 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">
            FlappyChicken
          </button>
        </Link>

        <Link to="/pagina2">
          <button className="w-24 h-24 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">
            Dine-Match
          </button>
        </Link>
        
      </div>
    </div>
  );
};

export default Entretenimento;
