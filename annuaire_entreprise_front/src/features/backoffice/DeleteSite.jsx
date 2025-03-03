import React from 'react';

const DeleteSite = ({isOpen, onClose, onConfirm}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center box-border bg-black/30 backdrop-blur-sm z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-96">
                {/* Header */}
                <div className="bg-red-500 text-white text-center py-2 rounded-t-lg">
                    <h2 className="text-lg font-semibold">Confirmation</h2>
                </div>

                {/* Body */}
                <div className="p-4 text-center">
                    <p className="text-gray-700">
                        Voulez-vous vraiment supprimer ce site et les employés qui lui sont attitré ?
                    </p>
                </div>

                {/*Boutons */}
                <div className="flex justify-between mt-4 p-2">
                    <button
                        onClick={onClose}
                        className="w-1/2 py-2 cursor-pointer text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="w-1/2 py-2 ml-2 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>)
};

export default DeleteSite;