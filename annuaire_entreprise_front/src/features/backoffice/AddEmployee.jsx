import React, { useEffect, useState } from "react";
import { validateEmail } from "../../utils/emailValidator";
import { getAllSites } from "../../utils/sites";
import { getAllServices } from "../../utils/services";
import { addEmployee } from "../../utils/employee";

const AddEmployee = ({ onClose, isOpen, setEmployeeList }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobilePhone, setMobilePhone] = useState("");
    const [landlinePhone, setLandlinePhone] = useState("");
    const [siteId, setSiteId] = useState("");
    const [serviceId, setServiceId] = useState("");

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");



    const [services, setServices] = useState([]);
    const [sites, setSites] = useState([]);

    useEffect(() => {

        const fetchServices = async () => {
            let services = sessionStorage.getItem("serviceList");
            if (services) {
                setServices(JSON.parse(services));
            } else {
                services = await getAllServices(true);
                setServices(services);
            }
        };

        const fetchSites = async () => {
            let sites = sessionStorage.getItem("siteList");
            if (sites) {
                setSites(JSON.parse(sites));
            } else {
                sites = await getAllSites(true);
                setSites(sites);
            }
        };

        fetchSites();
        fetchServices();

    }, [ setServices, setSites]);




    const onEnteringFirstName = (e) => {
        const value = e.target.value;
        setFirstName(value);
        setFirstNameError(value.length < 2 ? "Entrez un prénom valide" : "");
    };

    const onEnteringLastName = (e) => {
        const value = e.target.value;
        setLastName(value);
        setLastNameError(value.length < 2 ? "Entrez un nom valide" : "");
    };

    const onEnteringEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
        const result = validateEmail(value);
        setEmailError(!result.valid ? result.errors : "");
    };

    const onClosePopUp = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setMobilePhone("");
        setLandlinePhone("");
        setSiteId("");
        setServiceId("");
        setFirstNameError("");
        setLastNameError("");
        setEmailError("");
        onClose(false);
    };

    const onSubmitAdding = async (e) => {
        e.preventDefault();
        addEmployee(lastName,firstName,email,mobilePhone ? mobilePhone : null,landlinePhone ? landlinePhone : null,Number(siteId),Number(serviceId),setEmployeeList, onClose);
        onClose(false);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex justify-center items-center p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
                        <div className="flex items-center justify-center w-full h-10 bg-blue-600 rounded-t-lg">
                            <h2 className="text-xl text-white font-bold">Ajouter un employé</h2>
                        </div>

                        <form className="p-6" onSubmit={onSubmitAdding}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Prénom" value={firstName} onChange={onEnteringFirstName} required />
                                <input type="text" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Nom" value={lastName} onChange={onEnteringLastName} required />
                            </div>
                            <input type="email" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-3" placeholder="Email" value={email} onChange={onEnteringEmail} required />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                <input type="text" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Téléphone mobile" value={mobilePhone} onChange={(e) => setMobilePhone(e.target.value)} />
                                <input type="text" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Téléphone fixe" value={landlinePhone} onChange={(e) => setLandlinePhone(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" value={siteId} onChange={(e) => setSiteId(e.target.value)}>
                                    <option value="">Sélectionner un site</option>
                                    {sites.map((site) => (
                                        <option key={site.id} value={site.id}>{site.name}</option>
                                    ))}
                                </select>
                                <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
                                    <option value="">Sélectionner un service</option>
                                    {services.map((service) => (
                                        <option key={service.id} value={service.id}>{service.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                                <button type="button" className="px-4 py-2 bg-gray-400 cursor-pointer text-white rounded-md hover:bg-gray-500 transition" onClick={onClosePopUp}>Annuler</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all cursor-pointer disabled:cursor-not-allowed disabled:bg-white disabled:text-gray-500 disabled:border-[1px] disabled:border-gray-200/90" disabled={firstName.length < 2 || lastName.length < 2 || email.length < 2 || firstNameError || lastNameError || emailError || !siteId ||!serviceId}>Ajouter</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddEmployee;
