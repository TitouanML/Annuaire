import React, { useEffect, useState } from 'react';
import { deleteEmployee, getAllEmployees, restoreEmployee } from '../../utils/employee';
import AdminEmployeeGalleryItem from '../../components/ui/AdminEmployeeGalleryItem';
import BacklogTable from '../../components/ui/BacklogTable';
import { getAllServices } from '../../utils/services';
import { getAllSites } from '../../utils/sites';
import DeleteEmployee from './DeleteEmployee';
import RestoreEmployee from './RestoreEmployee';

const AdminEmployeeList = ({ isDisplayed, includeDeleted, setEmployeeList, employeeList, searchTerm }) => {
    const [isOpenedDeletion, setIsOpenedDeletion] = useState(false);
    const [isOpenedRestoration, setIsOpenedRestoration] = useState(false);
    const [examinedEmployee, setExaminedEmployee] = useState(null);
    const [servicesChoices, setServicesChoices] = useState([]);
    const [sitesChoices, setSitesChoices] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            const employees = await getAllEmployees(includeDeleted);
            setEmployeeList(employees);
        };

        const fetchServices = async () => {
            let services = sessionStorage.getItem("serviceList");
            if (services) {
                setServicesChoices(JSON.parse(services));
            } else {
                services = await getAllServices(includeDeleted);
                setServicesChoices(services);
            }
        };

        const fetchSites = async () => {
            let sites = sessionStorage.getItem("siteList");
            if (sites) {
                setSitesChoices(JSON.parse(sites));
            } else {
                sites = await getAllSites(includeDeleted);
                setSitesChoices(sites);
            }
        };

        fetchEmployees();
        fetchServices();
        fetchSites();
    }, [includeDeleted, setEmployeeList]);

    const openingPopUp = (employee) => {
        setIsOpenedDeletion(true);
        setExaminedEmployee(employee);
    };

    const onCloseDeletion = () => {
        setIsOpenedDeletion(false);
        setExaminedEmployee(null);
    };

    const openingRestoration = (employee) => {
        setIsOpenedRestoration(true);
        setExaminedEmployee(employee);
    };

    const onCloseRestoration = () => {
        setIsOpenedRestoration(false);
        setExaminedEmployee(null);
    };

    const onConfirmRestoration = async () => {
        await restoreEmployee(examinedEmployee.id, setEmployeeList, employeeList);
        setIsOpenedRestoration(false);
    };

    const onConfirmDeletion = async () => {
        await deleteEmployee(examinedEmployee.id, setEmployeeList, employeeList);
        setIsOpenedDeletion(false);
    };

    // Filtrage des employés en fonction du `searchTerm`
    const filteredEmployeeList = Array.isArray(employeeList) ? employeeList.filter((employee) => {
        if (!searchTerm || searchTerm.length < 3) return true;
        return (`${employee.firstName} ${employee.lastName}`).toLowerCase().includes(searchTerm.toLowerCase());
    }) : [];

    // Filtrage des employés supprimés/non supprimés selon `includeDeleted`
    const displayedEmployees = filteredEmployeeList.filter((employee) => {
        if (includeDeleted === null) return true;
        return includeDeleted ? !!employee.deletedAt : !employee.deletedAt;
    });

    if (!isDisplayed) return null;

    return (
        <>
            <BacklogTable>
                {displayedEmployees.length > 0 ? (
                    displayedEmployees.map((employee, idx) => (
                        <AdminEmployeeGalleryItem
                            key={employee.id}
                            employee={employee}
                            openingPopUp={() => openingPopUp(employee)}
                            openingRestoring={() => openingRestoration(employee)}
                            isLast={idx === displayedEmployees.length - 1}
                            services={servicesChoices}
                            sites={sitesChoices}
                        />
                    ))
                ) : (
                    <span>Aucun employé à afficher</span>
                )}
            </BacklogTable>

            <DeleteEmployee 
                isOpen={isOpenedDeletion} 
                onClose={onCloseDeletion} 
                onConfirm={onConfirmDeletion} 
            />
            <RestoreEmployee 
                isOpen={isOpenedRestoration} 
                onClose={onCloseRestoration} 
                onConfirm={onConfirmRestoration} 
            />
        </>
    );
};

export default AdminEmployeeList;
