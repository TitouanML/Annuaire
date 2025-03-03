import React, { useState } from "react";
import { isMe, updateAdmin } from "../../utils/administrators";

const AdminGalleryItem = ({ admin, openingPopUp, openingRestoring, isLast }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editFirstName, setEditFirstName] = useState(admin.firstName);
  const [editLastName, setEditLastName] = useState(admin.lastName);
  const [editEmail, setEditEmail] = useState(admin.email);

  const handleSave = () => {
    updateAdmin(admin.id, editFirstName, editLastName, editEmail.toLowerCase());
    setIsEditing(false);
  };


  return (
    <>
      <div className="flex flex-col md:flex-row hover:scale-101 transition-all  items-center justify-between gap-4 md:gap-8 w-full h-auto py-2 px-4">
        <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8">
          {/* Nom et Prénom */}
          <div className="flex flex-col md:flex-row gap-2 w-full">
            {/* Prénom */}
            <div className="w-full md:w-1/3">
              {isEditing ? (
                <input
                  type="text"
                  value={editFirstName}
                  onChange={(e) => setEditFirstName(e.target.value)}
                  className="w-full p-2 border rounded-md text-sm md:text-lg"
                />
              ) : (
                <span className="text-sm md:text-lg">{editFirstName || "Erreur"}</span>
              )}
            </div>

            {/* Nom */}
            <div className="w-full md:w-1/3">
              {isEditing ? (
                <input
                  type="text"
                  value={editLastName}
                  onChange={(e) => setEditLastName(e.target.value)}
                  className="w-full p-2 border rounded-md text-sm md:text-lg"
                />
              ) : (
                <span className="text-sm md:text-lg">{editLastName || "Erreur"}</span>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            {isEditing ? (
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full p-2 border rounded-md text-sm md:text-lg"
              />
            ) : (
              <span className="text-sm md:text-lg">{editEmail || "Erreur"}</span>
            )}
          </div>
        </div>

        {/* Boutons */}
        <div className="flex flex-row gap-2 md:flex-col justify-end items-center md:items-end w-full md:w-1/4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer rounded-sm w-10 h-10 md:w-14 md:h-14 flex items-center justify-center"
            >
              <img
                src={require(`../../assets/icons/sauvegarder.svg`).default}
                alt="Sauvegarder"
              />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)} // Activer le mode édition
              className="bg-orange-500 hover:bg-orange-600 transition-all cursor-pointer rounded-sm w-10 h-10 md:w-14 md:h-14 flex items-center justify-center"
            >
              <img
                src={require(`../../assets/icons/modifier.svg`).default}
                alt="Modifier"
              />
            </button>
          )}

          {/* Affichage du bouton en fonction de si l'admin est supprimé */}
          {admin.deletedAt ? (
                        <button
                            onClick={() => openingRestoring()}
                            className="bg-green-500 hover:bg-green-600 transition-all cursor-pointer rounded-sm w-10 h-10 md:w-14 md:h-14 flex items-center justify-center"
                        >
                            <img
                                src={require(`../../assets/icons/valider.svg`).default}
                                alt="Valider"
                            />
                        </button>
                    ) : (
                        <button
                            onClick={() => openingPopUp()}
                            className="bg-red-500 hover:bg-red-600 transition-all cursor-pointer rounded-sm w-10 h-10 md:w-14 md:h-14 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled = {isMe(admin.email)}
                        >
                            <img
                                src={require(`../../assets/icons/supprimer.svg`).default}
                                alt="Supprimer"
                            />
                        </button>
                    )}
        </div>
      </div>

      {/* Bordure en bas avec 75% de largeur */}
      {!isLast && (
        <div className="w-3/4 border-b-2 border-b-gray-300 mx-auto mt-2"></div>
      )}
    </>
  );
};

export default AdminGalleryItem;
