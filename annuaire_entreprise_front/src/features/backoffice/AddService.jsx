import React, { useState } from 'react';
import { addService } from '../../utils/services';

const AddService = ({ onClose, isOpen, setServiceList }) => {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");



    const onEnteringName = (e) => {
        const value = e.target.value;
        setName(value);
        setNameError(value.length === 1 ? "Entrez un nom valide" : "");
    };



    const onClosePopUp = () => {
        setName("")
        setNameError("")
        onClose(false);
    };

    const onSubmitAdding = async (e) => {
        e.preventDefault();
        addService(name, setServiceList, onClosePopUp);
    }

    return (
        <>
            {isOpen && (
                <div className="absolute top-0 left-0 w-full h-full bg-black/40 backdrop-blur-md flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-96">
                        <div className="flex items-center justify-center w-full h-10 rounded-t-sm bg-blue-600">
                            <h2 className="text-xl text-white font-bold">Ajouter un service</h2>
                        </div>


                        <form method="post" className="p-6" onSubmit={(e) => onSubmitAdding(e)}>

                            {/* Nom */}
                            <div className="mb-3">
                                <label className="block text-gray-700">Nom</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Comptabilité"
                                    value={name}
                                    onChange={onEnteringName}
                                />
                                {nameError && <span className="text-sm text-red-500">{nameError}</span>}
                            </div>

                            {/* Boutons */}
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-400 cursor-pointer text-white rounded-md hover:bg-gray-500 transition"
                                    onClick={onClosePopUp}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all cursor-pointer disabled:cursor-not-allowed disabled:bg-white disabled:text-gray-500 disabled:border-[1px] disabled:border-gray-200/90"
                                    disabled={
                                        name.length < 2 ||
                                        nameError 
                                    }
                                >
                                    Ajouter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddService;