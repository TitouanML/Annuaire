import React, { useState } from "react";
import { updateEmployee } from "../../utils/employee";

const AdminEmployeeGalleryItem = ({
  employee,
  openingPopUp,
  openingRestoring,
  isLast,
  services, // Liste des services non supprimés
  sites, // Liste des sites non supprimés
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editFirstName, setEditFirstName] = useState(employee.firstName);
  const [editLastName, setEditLastName] = useState(employee.lastName);
  const [editEmail, setEditEmail] = useState(employee.email);
  const [editPhoneFixed, setEditPhoneFixed] = useState(
    employee.landlinePhone ? employee.landlinePhone : ""
  );
  const [editPhoneMobile, setEditPhoneMobile] = useState(
    employee.mobilePhone ? employee.mobilePhone : ""
  );
  const [editService, setEditService] = useState(employee.service.id);
  const [editSite, setEditSite] = useState(employee.site.id);

  const handleSave = () => {
    updateEmployee(
      employee.id,
      editFirstName,
      editLastName,
      editEmail.toLowerCase(),
      editPhoneMobile ? editPhoneMobile : null,
      editPhoneFixed ? editPhoneFixed : null,
      editSite.toString(),
      editService.toString(),
      
    );
    setIsEditing(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-start hover:scale-101 transition-all justify-between gap-4 md:gap-8 w-full h-auto py-2 px-4">
        {/* Div principale contenant tous les champs */}
        <div className="w-full flex flex-col gap-4 md:w-3/4">
          {/* Première moitié des champs (Nom, Prénom, Email) */}
          <div className="flex flex-col md:flex-row gap-4 w-full">
            {/* Nom et Prénom */}
            <div className="w-full md:w-1/2">
              {isEditing ? (
                <input
                  type="text"
                  value={editFirstName}
                  onChange={(e) => setEditFirstName(e.target.value)}
                  className="w-full p-2 border rounded-md text-sm md:text-lg"
                />
              ) : (
                <span className="text-sm md:text-lg">
                  {editFirstName || "Erreur"}
                </span>
              )}
            </div>

            <div className="w-full md:w-1/2">
              {isEditing ? (
                <input
                  type="text"
                  value={editLastName}
                  onChange={(e) => setEditLastName(e.target.value)}
                  className="w-full p-2 border rounded-md text-sm md:text-lg"
                />
              ) : (
                <span className="text-sm md:text-lg">
                  {editLastName || "Erreur"}
                </span>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="w-full">
            {isEditing ? (
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full p-2 border rounded-md text-sm md:text-lg"
              />
            ) : (
              <span className="text-sm md:text-lg">
                {editEmail || "Erreur"}
              </span>
            )}
          </div>

          {/* Deuxième moitié des champs (Téléphone fixe, Portable, Service, Site) */}
          <div className="flex flex-col md:flex-row gap-4 w-full">
            {/* Téléphone fixe */}
            <div className="w-full md:w-1/2">
              {isEditing ? (
                <input
                  type="tel"
                  value={editPhoneFixed}
                  onChange={(e) => setEditPhoneFixed(e.target.value)}
                  className="w-full p-2 border rounded-md text-sm md:text-lg"
                  placeholder="Fix"
                />
              ) : (
                <span className="text-sm md:text-lg">
                  {editPhoneFixed || "NC"}
                </span>
              )}
            </div>

            {/* Téléphone portable */}
            <div className="w-full md:w-1/2">
              {isEditing ? (
                <input
                  type="tel"
                  value={editPhoneMobile}
                  onChange={(e) => setEditPhoneMobile(e.target.value)}
                  className="w-full p-2 border rounded-md text-sm md:text-lg"
                  placeholder="Mobile"
                />
              ) : (
                <span className="text-sm md:text-lg">
                  {editPhoneMobile || "NC"}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full">
            {/* Select Service */}
            <div className="w-full md:w-1/2">
              {isEditing ? (
                <select
                  value={editService}
                  onChange={(e) => setEditService(e.target.value.toString())}
                  className="w-full p-2 border rounded-md text-sm md:text-lg"
                >
                  {Array.isArray(services) &&
                    services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                </select>
              ) : (
                <span className="text-sm md:text-lg">
                  {(Array.isArray(services) &&
                    services.find((s) => s.id === parseInt(editService))?.name) ||
                    "Erreur"}
                </span>
              )}
            </div>

            {/* Select Site */}
            <div className="w-full md:w-1/2">
              {isEditing ? (
                <select
                  value={editSite}
                  onChange={(e) => setEditSite(e.target.value.toString())}
                  className="w-full p-2 border rounded-md text-sm md:text-lg"
                >
                  {Array.isArray(sites) &&
                    sites.map((site) => (
                      <option key={site.id} value={site["id"]}>
                        {site.name}
                      </option>
                    ))}
                </select>
              ) : (
                <span className="text-sm md:text-lg">
                  {(Array.isArray(sites) &&
                    sites.find((s) => s.id === parseInt(editSite))?.name) ||
                    "Erreur"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Div pour les boutons */}
        <div className="flex flex-row md:flex-col gap-2 justify-end md:items-end w-full md:w-1/4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer rounded-sm w-12 h-12 md:w-14 md:h-14 flex items-center justify-center"
            >
              <img
                src={require(`../../assets/icons/sauvegarder.svg`).default}
                alt="Sauvegarder"
              />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)} // Activer le mode édition
              className="bg-orange-500 hover:bg-orange-600 transition-all cursor-pointer rounded-sm w-12 h-12 md:w-14 md:h-14 flex items-center justify-center"
            >
              <img
                src={require(`../../assets/icons/modifier.svg`).default}
                alt="Modifier"
              />
            </button>
          )}

          {/* Affichage du bouton en fonction de si l'admin est supprimé */}
          {employee.deletedAt ? (
            <button
              onClick={openingRestoring}
              className="bg-green-500 hover:bg-green-600 transition-all cursor-pointer rounded-sm w-12 h-12 md:w-14 md:h-14 flex items-center justify-center"
            >
              <img
                src={require(`../../assets/icons/valider.svg`).default}
                alt="Valider"
              />
            </button>
          ) : (
            <button
              onClick={openingPopUp}
              className="bg-red-500 hover:bg-red-600 transition-all cursor-pointer rounded-sm w-12 h-12 md:w-14 md:h-14 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
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

export default AdminEmployeeGalleryItem;
