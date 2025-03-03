import React, { useState } from "react";
import { toast } from "react-toastify";
import { login, getTokenFromCookies } from "../../utils/administrators";
import { useAuth } from "../../services/AuthContext";

const AdminAuth = ({ setIsOpened }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useAuth();

  const submitLoginForm = async (event) => {
    event.preventDefault();

    const result = await login(mail, password, setIsLoggedIn, setIsOpened);

    if (result?.error) {
      toast.error("Erreur de connexion : " + result.error);
      return;
    }

    const token = getTokenFromCookies();

    if (token) {
      // console.log("getting administrators...");
      // const administrators = await fetchingAllData("administrators", token);
      // console.log(administrators);

      // Mettre à jour l'état global d'authentification
      setIsLoggedIn(true);
      // Fermer la popup après succès
      setTimeout(() => setIsOpened(false), 1500);
    }
    return;
  };

  return (
    <div className="absolute top-0 left-0 z-10 w-full h-full bg-black/50 flex flex-col items-center justify-center backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-md md:max-w-lg pb-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="bg-[#0f172b] w-full h-14 flex items-center justify-between px-4 rounded-t-lg">
          <span className="text-white text-lg font-semibold">Connexion</span>
          <button
            onClick={() => setIsOpened(false)}
            className="text-white text-2xl hover:text-gray-300 transition cursor-pointer"
          >
            ✖
          </button>
        </div>

        <form
          onSubmit={submitLoginForm}
          className="w-[90%] flex flex-col items-center mt-6 space-y-4"
        >
          <input
            type="email"
            placeholder="Adresse mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f172b]"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f172b]"
          />
          <button
            type="submit"
            className="w-full p-3 bg-[#0f172b] text-white rounded-md font-semibold hover:bg-[#1e293b] transition-all"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
