import React, { useEffect, useState } from 'react';
import { getAllSites } from '../utils/sites';
import { getAllEmployees, getAllEmployeesBySite } from '../utils/employee';
import { getAllServices } from '../utils/services';
import SiteCard from '../components/ui/SiteCard'; // Un composant séparé pour afficher une carte de site

const Site = () => {
    const [sites, setSites] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [selectedSite, setSelectedSite] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [services, setServicesChoices] = useState([]);
    const [selectedService, setSelectedService] = useState('');

    // Récupérer les sites et services au démarrage
    useEffect(() => {
        const fetchSites = async () => {
            const sitesData = await getAllSites();
            const filteredSites = sitesData.filter(s => s.deletedAt === null);
            setSites(filteredSites);
        };

        const fetchEmployees = async () => {
            const employeesData = await getAllEmployees("none");
            setEmployees(employeesData);
            setFilteredEmployees(employeesData);
        };

        const fetchServices = async () => {
            const servicesData = await getAllServices(false);
            setServicesChoices(servicesData);
        };

        fetchSites();
        fetchEmployees();
        fetchServices();
    }, []);

    // Récupérer les employés d'un site lorsque le site est sélectionné
    useEffect(() => {
        const fetchEmployeesForSite = async () => {
            if (selectedSite) {
                const employeesData = await getAllEmployeesBySite(selectedSite.id, "none");
                const filteredData = employeesData.filter(emp => emp.site.id === selectedSite.id); 
                setFilteredEmployees(filteredData); 
            } else {
                // Si aucun site n'est sélectionné, réinitialise le filtrage avec tous les employés
                setFilteredEmployees(employees);
            }
        };

        fetchEmployeesForSite();
    }, [selectedSite, employees]); // Délégation à `employees` pour les filtres généraux

    // Gérer la recherche d'employés
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value.length >= 3 || selectedService) {
            filterEmployees(e.target.value, selectedService);
        } else {
            setFilteredEmployees(employees);
        }
    };

    // Filtrer les employés en fonction du service et de la recherche
    const filterEmployees = (search, service) => {
        const lowerSearch = search.toLowerCase();
        const filtered = employees.filter((employee) => {
            const matchesSearch = `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(lowerSearch);
            const matchesService = service ? employee.service.id.toString() === service : true;
            const isDeleted = employee.deletedAt === null || employee.deletedAt === ''; // Assurer que l'employé n'est pas supprimé
            return matchesSearch && matchesService && isDeleted;
        });

        setFilteredEmployees(filtered);
    };

    // Gérer la sélection du service dans le dropdown
    const handleServiceChange = (e) => {
        const selectedService = e.target.value;
        setSelectedService(selectedService);
        filterEmployees(searchTerm, selectedService);
    };

    // Gérer la sélection du site
    const handleSiteClick = (site) => {
        setSelectedSite(site);
    };

    // Gérer le retour à l'affichage des sites
    const handleBackClick = () => {
        setSelectedSite(null);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                {selectedSite ? `${selectedSite.name} - Employés` : 'Sites de l\'entreprise'}
            </h1>

            {/* Affichage des cartes de sites */}
            {!selectedSite ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {sites.map((site) => (
                        <SiteCard
                            key={site.id}
                            site={site}
                            onClick={() => handleSiteClick(site)}
                            employeeCount={employees.filter((emp) => emp.site.id === site.id).length}
                        />
                    ))}
                </div>
            ) : (
                <div>
                    {/* Affichage du bouton retour et dropdown sur la même ligne */}
                    <div className="flex items-center justify-between mb-6">
                        <button
                            className="p-2 bg-blue-500 text-white rounded-md"
                            onClick={handleBackClick}
                        >
                            Retour aux sites
                        </button>

                        <div className="w-full sm:w-auto">
                            <select
                                className="p-3 w-full sm:w-auto border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                value={selectedService}
                                onChange={handleServiceChange}
                            >
                                <option value="">Filtrer par service</option>
                                {services.map((service) => (
                                    <option key={service.id} value={service.id}>
                                        {service.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Recherche d'employés */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Rechercher un employé..."
                            className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>

                    {/* Liste des employés filtrés */}
                    <div>
                        <ul>
                            {filteredEmployees.length > 0 ? (
                                filteredEmployees.map((employee) => (
                                    <li key={employee.id} className="p-4 bg-gray-50 border-b border-gray-200 hover:bg-gray-100 transition duration-200">
                                        <div className="text-xl font-semibold text-gray-800">
                                            {employee.firstName} {employee.lastName}
                                        </div>
                                        <div className="text-gray-600 text-sm mt-1">Mail: {employee.email}</div>
                                        <div className="text-gray-600 text-sm">Portable: {employee.mobilePhone || 'NC'} | Fixe: {employee.landlinePhone || 'NC'}</div>
                                        <div className="text-gray-500 mt-2">Service: {employee.service.name}</div>
                                    </li>
                                ))
                            ) : (
                                <p className="text-center text-gray-600">Aucun employé trouvé</p>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Site;
