import React from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {

    const navigate = useNavigate();

    return (
        <div className="h-[80vh] flex flex-col items-center justify-center text-center px-4 py-12 sm:px-6 lg:px-8">
            {/* Section d'introduction */}
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Bienvenue chez Annuaire
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Découvrez notre annuaire interne, une manière révolutionnaire de connaître nos employés. 🌿
            </p>

            {/* Slogan */}
            <p className="italic text-lg text-gray-500 mb-6">
                "Un annuaire qui vous fait sourire !"
            </p>

            {/* Bouton vers la page de recherche */}
            <button onClick={()=>navigate("/search")}
                className="inline-block px-8 py-3 bg-teal-600 text-white text-lg font-medium rounded-lg hover:bg-teal-500 transition-colors duration-300 cursor-pointer"
            >
                À la recherche de nos employés !
            </button>

            {/* Footer minimal */}
            <footer className="mt-16 text-sm text-gray-500">
                <p>© 2025 Annuaire. Tous droits réservés</p>
            </footer>
        </div>
    );
};

export default Home;