import React from "react";
import AdminAddForm from "./AdminAddForm";
import AddSite from "./AddSite";
import AddService from "./AddService";
import AddEmployee from "./AddEmployee";

const AdminFilter = ({
  selectedStatus,
  selectedCategory,
  setSelectedCategory,
  setSelectedStatus,
  isAdding,
  setIsAdding,
  setAdminList,
  setSiteList,
  setServiceList,
  setEmployeeList,
  handleSearchChange,
  searchTerm,
  onFilterChange
}) => {

  const categories = ["Administrateurs", "Sites", "Services", "Employés"];
  const statusOptions = [
    { text: "Non supprimé(s)", value: false },
    { text: "Tout", value: null },
    { text: "Supprimé(s)", value: true }
  ];

  const onChange = (e) => {
    const value = e.target.value;

    // Met à jour l'état selectedStatus avec la bonne valeur
    setSelectedStatus(value);

    // Gestion de la valeur null, false, true en fonction de la sélection
    if (value === "Tout") {
      onFilterChange(null);
    } else if (value === "false") {
      onFilterChange(false);
    } else if (value === "true") {
      onFilterChange(true);
    }

  };



  return (
    <>
      <div className="mt-4 flex flex-col md:flex-row justify-between items-center w-full max-w-4xl mx-auto space-y-3 md:space-y-0">
        {/* Boutons de sélection */}
        <div className="grid grid-cols-2 md:flex md:space-x-4 gap-2 w-full md:w-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm md:text-base text-center border-b-2 transition-all rounded-b-sm cursor-pointer ${selectedCategory === category
                ? "border-blue-600 font-semibold"
                : "border-transparent hover:border-gray-400"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Dropdown de sélection */}
        <div className="w-full md:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => onChange(e)}
            className="w-full md:w-auto px-4 py-2 bg-transparent border-b-2 border-gray-300 focus:border-blue-600 outline-none cursor-pointer"
          >
            {statusOptions.map((status) => (
              <option key={status["text"]} value={status["value"]}>
                {status["text"]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Titre de la catégorie sélectionnée */}
      <div className="mt-4 w-9/10 md:w-8/10 lg:w-7/10 h-14 flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          Liste des {selectedCategory.toLowerCase()}
        </h1>
        <button
          onClick={() => setIsAdding(true)}
          className="w-30 h-10 rounded-md bg-blue-600 hover:bg-blue-700 transition-all text-white hover:text-gray-300 cursor-pointer"
        >
          Ajouter
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="mt-2 mb-4 w-9/10 md:w-8/10 lg:w-7/10">
        <input
          type="text"
          placeholder={`Rechercher ${selectedCategory.toLowerCase() !== "services" && selectedCategory.toLowerCase() !== "sites" ? "un(e)/des " + selectedCategory.toLowerCase() : "un/des " + selectedCategory.toLowerCase()}`}
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none"
        />
      </div>


      {/* Composants pour ajouter différentes entités */}
      <AdminAddForm
        onClose={setIsAdding}
        isOpen={isAdding && selectedCategory === "Administrateurs"}
        setAdminList={setAdminList}
      />
      <AddSite
        onClose={setIsAdding}
        isOpen={isAdding && selectedCategory === "Sites"}
        setSiteList={setSiteList}
      />
      <AddService
        onClose={setIsAdding}
        isOpen={isAdding && selectedCategory === "Services"}
        setServiceList={setServiceList}
      />
      <AddEmployee
        onClose={setIsAdding}
        isOpen={isAdding && selectedCategory === "Employés"}
        setServiceList={setServiceList}
        setEmployeeList={setEmployeeList}
      />
    </>
  );
};

export default AdminFilter;
