import React, { useEffect, useState } from "react";
import AdminList from "../features/backoffice/AdminList";
import AdminFilter from "../features/backoffice/AdminFilter";
import AdminSiteList from "../features/backoffice/AdminSiteList";
import AdminServiceList from "../features/backoffice/AdminServiceList";
import AdminEmployeeList from "../features/backoffice/AdminEmployeeList";
import { isAuthentified } from "../utils/administrators";
import { useNavigate } from "react-router-dom";

const BackOffice = () => {
  const [selectedCategory, setSelectedCategory] = useState("Employés");
  const [selectedStatus, setSelectedStatus] = useState("Tout");
  const [adminList, setAdminList] = useState([]);
  const [siteList, setSiteList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [includeDeleted, setIncludeDeleted] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // État pour la recherche
  const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuthentified()){
            navigate("/error");
        }
    },[navigate])

  const handleFilterChange = (newIncludeDeleted) => {
    setIncludeDeleted(newIncludeDeleted);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if(!isAuthentified()) return null;

  return (
    <main className="flex flex-col items-center justify-start">
      <AdminFilter
        isAdding={isAdding}
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
        onFilterChange={handleFilterChange}
        handleSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        setSelectedCategory={setSelectedCategory}
        setSelectedStatus={setSelectedStatus}
        setIsAdding={setIsAdding}
        setEmployeeList={setEmployeeList}
        setAdminList={setAdminList}
        setSiteList={setSiteList}
        setServiceList={setServiceList}
      />
      <AdminList
        includeDeleted={includeDeleted}
        isDisplayed={selectedCategory === "Administrateurs"}
        setAdminList={setAdminList}
        adminList={adminList}
        searchTerm={searchTerm}
      />
      <AdminSiteList
        includeDeleted={includeDeleted}
        isDisplayed={selectedCategory === "Sites"}
        setSiteList={setSiteList}
        siteList={siteList}
        searchTerm={searchTerm}
      />
      <AdminServiceList
        includeDeleted={includeDeleted}
        isDisplayed={selectedCategory === "Services"}
        serviceList={serviceList}
        setServiceList={setServiceList}
        searchTerm={searchTerm}
      />
      <AdminEmployeeList
        includeDeleted={includeDeleted}
        isDisplayed={selectedCategory === "Employés"}
        employeeList={employeeList}
        setEmployeeList={setEmployeeList}
        searchTerm={searchTerm}
      />
    </main>
  );
};

export default BackOffice;
