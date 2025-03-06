import React from "react";

const ContactCard = ({ contact, isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg border border-gray-300">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {contact.firstName} {contact.lastName}
          </h1>
          <button
            className="w-16 h-10 cursor-pointer bg-red-500 hover:bg-red-600 hover:text-gray-300 text-white font-semibold rounded-lg transition-colors"
            onClick={onClose}
          >
            Fermer
          </button>
        </div>
        <div className="text-gray-600 text-sm mb-2">
          <span className="font-medium">Mail:</span> {contact.email}
        </div>
        <div className="text-gray-600 text-sm mb-2">
          <span className="font-medium">Portable:</span> {contact.mobilePhone || "NC"} | 
          <span className="font-medium"> Fixe:</span> {contact.landlinePhone || "NC"}
        </div>
        <div className="text-gray-500 text-sm">
          <span className="font-medium">Site:</span> {contact.site.name} | 
          <span className="font-medium"> Service:</span> {contact.service.name}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
