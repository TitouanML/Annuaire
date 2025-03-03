import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-gray-900text-center">
        <h2 className="text-3xl md:text-5xl font-bold mt-4">ERREUR 404</h2>
        <p className="mt-2 text-md md:text-lg text-gray-400">Oups ! Cette page s'est envolée... 🌀</p>
        <button
          onClick={()=> navigate("/")}
          className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition cursor-pointer"
        >
          Retour à l'accueil
        </button>
      </div>
    );
};

export default Error;