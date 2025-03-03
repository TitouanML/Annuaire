import React, { useState } from "react";
import { validatePassword } from "../../utils/passwordValidator";
import { validateEmail } from "../../utils/emailValidator";
import { addAdmin } from "../../utils/administrators";

const AdminAddForm = ({ onClose, isOpen, setAdminList }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const onEnteringFirstName = (e) => {
        const value = e.target.value;
        setFirstName(value);
        setFirstNameError(value.length === 1 ? "Entrez un prénom valide" : "");
    };

    const onEnteringLastName = (e) => {
        const value = e.target.value;
        setLastName(value);
        setLastNameError(value.length === 1 ? "Entrez un nom valide" : "");
    };

    const onEnteringEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
        const result = validateEmail(value);
        setEmailError(!result.valid ? result.errors : "");
    };

    const onEnteringPassword = (e) => {
        const value = e.target.value;
        setPassword(value);
        const result = validatePassword(value);
        setPasswordError(!result.valid ? result.errors : "");
    };

    const onClosePopUp = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setFirstNameError("");
        setLastNameError("");
        setEmailError("");
        setPasswordError("");
        onClose(false);
    };

    const onSubmitAdding = async (e) => {
        e.preventDefault();
        addAdmin(firstName,lastName,email,password,setAdminList, onClose);

    }

    return (
        <>
            {isOpen && (
                <div className="absolute top-0 left-0 w-full h-full bg-black/40 backdrop-blur-md flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-96">
                        <div className="flex items-center justify-center w-full h-10 rounded-t-sm bg-blue-600">
                            <h2 className="text-xl text-white font-bold">Ajouter un administrateur</h2>
                        </div>


                        <form method="post" className="p-6" onSubmit={(e)=>onSubmitAdding(e)}>
                            {/* Prénom */}
                            <div className="mb-3">
                                <label className="block text-gray-700">Prénom</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="John"
                                    value={firstName}
                                    onChange={onEnteringFirstName}
                                />
                                {firstNameError && <span className="text-sm text-red-500">{firstNameError}</span>}
                            </div>

                            {/* Nom */}
                            <div className="mb-3">
                                <label className="block text-gray-700">Nom</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={onEnteringLastName}
                                />
                                {lastNameError && <span className="text-sm text-red-500">{lastNameError}</span>}
                            </div>

                            {/* Email */}
                            <div className="mb-3">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="johndoe@example.com"
                                    value={email}
                                    onChange={onEnteringEmail}
                                />
                                {emailError && <span className="text-sm text-red-500">{emailError}</span>}
                            </div>

                            {/* Mot de passe */}
                            <div className="mb-3">
                                <label className="block text-gray-700">Mot de passe</label>
                                <input
                                    required
                                    type="password"
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="******"
                                    value={password}
                                    onChange={onEnteringPassword}
                                />
                                {passwordError && <span className="text-sm text-red-500">{passwordError}</span>}
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
                                        firstName.length < 2 ||
                                        lastName.length < 2 ||
                                        password.length === 0 ||
                                        email.length === 0 ||
                                        firstNameError ||
                                        lastNameError ||
                                        emailError ||
                                        passwordError
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

export default AdminAddForm;
