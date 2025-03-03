import React, { useState } from 'react';
import { validateZipCode } from '../../utils/zipcodeValidator';
import { addSite } from '../../utils/sites';

const AddSite = ({ onClose, isOpen, setSiteList }) => {
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");

    const [nameError, setNameError] = useState("");
    const [cityError, setCityError] = useState("");
    const [zipCodeError, setZipCodeError] = useState("");


    const onEnteringName = (e) => {
        const value = e.target.value;
        setName(value);
        setNameError(value.length === 1 ? "Entrez un nom valide" : "");
    };

    const onEnteringCity = (e) => {
        const value = e.target.value;
        setCity(value);
        setCityError(value.length === 1 ? "Entrez une ville valide" : "");
    };

    const onEnteringZipCode = (e) => {
        const value = e.target.value;
        setZipCode(value);
        const result = validateZipCode(value);
        setZipCodeError(!result.valid ? result.errors : "");
    };

    const onClosePopUp = () => {
        setName("")
        setCity("")
        setZipCode("")
        setNameError("")
        setCityError("")
        setZipCodeError("")
        onClose(false);
    };

    const onSubmitAdding = async (e) => {
        e.preventDefault();
        addSite(name, city, zipCode, setSiteList, onClosePopUp);
    }

    return (
        <>
            {isOpen && (
                <div className="absolute top-0 left-0 w-full h-full bg-black/40 backdrop-blur-md flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-96">
                        <div className="flex items-center justify-center w-full h-10 rounded-t-sm bg-blue-600">
                            <h2 className="text-xl text-white font-bold">Ajouter un administrateur</h2>
                        </div>


                        <form method="post" className="p-6" onSubmit={(e) => onSubmitAdding(e)}>

                            {/* Nom */}
                            <div className="mb-3">
                                <label className="block text-gray-700">Nom</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Siège social"
                                    value={name}
                                    onChange={onEnteringName}
                                />
                                {nameError && <span className="text-sm text-red-500">{nameError}</span>}
                            </div>

                            {/* Email */}
                            <div className="mb-3">
                                <label className="block text-gray-700">Ville</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Paris"
                                    value={city}
                                    onChange={onEnteringCity}
                                />
                                {cityError && <span className="text-sm text-red-500">{cityError}</span>}
                            </div>

                            {/* Mot de passe */}
                            <div className="mb-3">
                                <label className="block text-gray-700">Code postal</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="70000"
                                    value={zipCode}
                                    onChange={onEnteringZipCode}
                                />
                                {zipCodeError && <span className="text-sm text-red-500">{zipCodeError}</span>}
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
                                        city.length < 2 ||
                                        zipCode.length === 0 ||
                                        nameError ||
                                        cityError ||
                                        zipCodeError
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

export default AddSite;