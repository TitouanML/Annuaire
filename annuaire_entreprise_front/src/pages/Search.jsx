import React, { useEffect, useState } from "react";
import { getAllEmployees } from "../utils/employee";
import { getAllSites } from "../utils/sites";
import { getAllServices } from "../utils/services";
import ContactCard from "../components/ui/ContactCard";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedSite, setSelectedSite] = useState("");
  const [employees, setEmployees] = useState([]);
  const [services, setServicesChoices] = useState([]);
  const [sites, setSitesChoices] = useState([]);
  const [isOpenedDetails, setIsOpenedDetails] = useState(false);
  const [examinedEmployee, setExaminedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      await getAllEmployees(false);
      setEmployees(JSON.parse(sessionStorage.getItem("employeeList")));
    };

    const fetchServices = async () => {
      let services = sessionStorage.getItem("serviceList");
      if (services) {
        setServicesChoices(JSON.parse(services));
      } else {
        services = await getAllServices(false);
        setServicesChoices(services);
      }
    };

    const fetchSites = async () => {
      let sites = sessionStorage.getItem("siteList");
      if (sites) {
        setSitesChoices(JSON.parse(sites));
      } else {
        sites = await getAllSites(false);
        setSitesChoices(sites);
      }
    };

    fetchSites();
    fetchServices();
    fetchEmployee(false);
  }, []);

  useEffect(() => {
    if (isOpenedDetails) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpenedDetails]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleServiceChange = (e) => setSelectedService(e.target.value);
  const handleSiteChange = (e) => setSelectedSite(e.target.value);

  const onOpeningConsultingDetails = (employee) => {
    setExaminedEmployee(employee);
    setIsOpenedDetails(true);
  };

  const onCloseConsultingDetails = () => {
    setExaminedEmployee(null);
    setIsOpenedDetails(false);
  };

  const filteredEmployees = employees.filter((employee) => {
    if (employee.deletedAt !== null) return false;
    const fullName = `${employee.firstName} ${employee.lastName}`;
    const matchesSearch = fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesService = selectedService
      ? employee.service.id.toString() === selectedService
      : true;
    const matchesSite = selectedSite
      ? employee.site.id.toString() === selectedSite
      : true;
    return matchesSearch && matchesService && matchesSite;
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Vous cherchez un de nos employés ?
      </h1>

      {/* Barre de recherche */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher un employé..."
          className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="p-3 w-full sm:w-auto border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          value={selectedService}
          onChange={handleServiceChange}
        >
          <option value="">Sélectionner un service</option>
          {services
            .filter((service) => service.deletedAt === null) // Exclure les services supprimés
            .map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
        </select>

        <select
          className="p-3 w-full sm:w-auto border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          value={selectedSite}
          onChange={handleSiteChange}
        >
          <option value="">Sélectionner un site</option>
          {Array.isArray(sites) &&
            sites
              .filter((site) => site.deletedAt === null) // Exclure les sites supprimés
              .map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
        </select>
      </div>

      {/* Liste des employés */}
      <div>
        {filteredEmployees.length > 0 ? (
          <ul>
            {filteredEmployees.map((employee) => (
              <li
                key={employee.id}
                className="p-4 bg-gray-50 border-b border-gray-200 hover:bg-gray-100 transition duration-200 hover:scale-101"
              >
                <button
                  onClick={() => onOpeningConsultingDetails(employee)}
                  className="w-full h-full flex flex-col items-start justify-center cursor-pointer"
                >
                  <div className="text-xl font-semibold text-gray-800">
                    {employee.firstName} {employee.lastName}
                  </div>
                  <div className="text-gray-600 text-sm mt-1">
                    Mail: {employee.email}
                  </div>
                  <div className="text-gray-600 text-sm">
                    Portable: {employee.mobilePhone || "NC"} | Fixe:{" "}
                    {employee.landlinePhone || "NC"}
                  </div>
                  <div className="text-gray-500 mt-2">
                    Site: {employee.site.name} | Service:{" "}
                    {employee.service.name}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">Aucun employé trouvé</p>
        )}
      </div>

      <ContactCard
        contact={examinedEmployee}
        isOpen={isOpenedDetails}
        onClose={onCloseConsultingDetails}
      />
    </div>
  );
};

export default Search;