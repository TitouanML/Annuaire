import React, { useState } from "react";
import { updateSite } from "../../utils/sites";



const AdminSiteGalleryItem = ({ site, openingPopUp, openingRestoring, isLast }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(site.name);
  const [editCity, setEditCity] = useState(site.city);
  const [editZipCode, setEditZipCode] = useState(site.zipCode);

  const handleSave = () => {
    
    updateSite(site.id, editName, editCity, editZipCode);
    setIsEditing(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center hover:scale-101 transition-all  justify-between gap-4 md:gap-8 w-full h-auto py-2 px-4">
        {/* Nom */}
        <div className="w-full md:w-1/3">
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full p-2 border rounded-md text-sm md:text-lg"
              placeholder="Nom"
            />
          ) : (
            <span className="text-sm md:text-lg">{editName || "Erreur"}</span>
          )}
        </div>
        
        {/* Ville */}
        <div className="w-full md:w-1/3">
          {isEditing ? (
            <input
              type="text"
              value={editCity}
              onChange={(e) => setEditCity(e.target.value)}
              className="w-full p-2 border rounded-md text-sm md:text-lg"
              placeholder="Ville"
            />
          ) : (
            <span className="text-sm md:text-lg">{editCity || "Erreur"}</span>
          )}
        </div>

        {/* Code Postal */}
        <div className="w-full md:w-1/3">
          {isEditing ? (
            <input
              type="text"
              value={editZipCode}
              onChange={(e) => setEditZipCode(e.target.value)}
              className="w-full p-2 border rounded-md text-sm md:text-lg"
              placeholder="Code Postal"
            />
          ) : (
            <span className="text-sm md:text-lg">{editZipCode || "Erreur"}</span>
          )}
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
              onClick={() => setIsEditing(true)}
              className="bg-orange-500 hover:bg-orange-600 transition-all cursor-pointer rounded-sm w-10 h-10 md:w-14 md:h-14 flex items-center justify-center"
            >
              <img
                src={require(`../../assets/icons/modifier.svg`).default}
                alt="Modifier"
              />
            </button>
          )}
          {site.deletedAt ? (
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
            >
              <img
                src={require(`../../assets/icons/supprimer.svg`).default}
                alt="Supprimer"
              />
            </button>
          )}
        </div>
      </div>

      {!isLast && (
        <div className="w-3/4 border-b-2 border-b-gray-300 mx-auto mt-2"></div>
      )}
    </>
  );
};

export default AdminSiteGalleryItem;
