import React, { useEffect, useState } from "react";
import HeaderButton from "../ui/HeaderButton";
import AdminAuth from "../../features/backoffice/AdminAuth";
import { isAuthentified, logOut } from "../../utils/administrators";
import { useAuth } from "../../services/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [isOpened, setIsOpened] = useState(false);

  const KONAMI_CODE = process.env.REACT_APP_KONAMI_CODE;

  const headerContent = [
    { text: "Accueil", destination: "/" },
    { text: "Recherche", destination: "/search" },
    { text: "Sites", destination: "/sites" },
  ];

  if (isAuthentified()) {
    headerContent.push({ text: "Gestion", destination: "/admin" });
  }

  const onLogOut = () => {
    logOut(setIsLoggedIn, setIsOpened);
    navigate("/");
  };

  useEffect(() => {
    if (isLoggedIn || isOpened) return;

    let tempPressedKeys = [];

    const handleKeyPressed = (e) => {
      if (tempPressedKeys.length === 8) {
        tempPressedKeys.shift();
      }

      tempPressedKeys.push(e.key);

      if (tempPressedKeys.join(",") === KONAMI_CODE) {
        setIsOpened(true);
        console.log("Code Konami détecté !");
      }
    };

    window.addEventListener("keydown", handleKeyPressed);

    return () => {
      window.removeEventListener("keydown", handleKeyPressed);
    };
  }, [isLoggedIn, isOpened, KONAMI_CODE]);

  return (
    <>
      <header className="w-full p-4 box-border bg-white shadow-md">
        <div className="flex flex-row items-center justify-between">
          <span className="text-2xl font-semibold md:text-4xl">Annuaire</span>
          <div className="pl-6 mt-4 flex-wrap gap-6 justify-start w-2/3 hidden lg:flex">
            {headerContent.map((item, idx) => (
              <HeaderButton
                key={idx}
                buttonName={item.text}
                destination={item.destination}
              />
            ))}
          </div>
          <div className="mt-2 md:mt-0">
            {isLoggedIn ? (
              <button
                onClick={onLogOut}
                className="cursor-pointer bg-red-500 hover:bg-white hover:border hover:border-red-600/20 hover:text-red-500 transition-all text-lg rounded-md text-white p-2 md:p-3"
              >
                Se déconnecter
              </button>
            ) : null}
          </div>
        </div>
        <div className="mt-4 flex lg:hidden flex-wrap gap-6 justify-start">
          {headerContent.map((item, idx) => (
            <HeaderButton
              key={idx}
              buttonName={item.text}
              destination={item.destination}
            />
          ))}
        </div>
      </header>
      {isOpened && <AdminAuth setIsOpened={setIsOpened} />}
    </>
  );
};

export default Header;
