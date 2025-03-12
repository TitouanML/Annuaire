import { toast } from "react-toastify";
import { getTokenFromCookies } from "./administrators";

const BASE_URL = process.env.REACT_APP_API_BASE_URL_HTTP;
const API_KEY = process.env.REACT_APP_API_KEY;


export const getAllEmployees = async (includeDeleted = true) => {
    try {
        const token = getTokenFromCookies();
        const response = await fetch(`${BASE_URL}/employees?deleted=${includeDeleted}`, {
            method: "GET",
            headers: {
                "x-api-key": API_KEY,
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok)
            throw new Error("Erreur lors de l'obtention des employés.");

        const data = await response.json();
        sessionStorage.setItem("employeeList", JSON.stringify(data));
        return data;
    } catch (error) {
        toast.error(error.message, { position: "bottom-right" });
    }
};

export const getAllEmployeesBySite = async (id,includeDeleted = false) => {
    try {
        const token = getTokenFromCookies();
        const response = await fetch(`${BASE_URL}/employees?site=${id}&deleted=${includeDeleted}`, {
            method: "GET",
            headers: {
                "x-api-key": API_KEY,
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok)
            throw new Error("Erreur lors de l'obtention des employés.");

        const data = await response.json();
        sessionStorage.setItem("employeeList", JSON.stringify(data));
        return data;
    } catch (error) {
        toast.error(error.message, { position: "bottom-right" });
    }
};

export const deleteEmployee = async (id, setEmployeeList, employeeList) => {
    try {
        const token = getTokenFromCookies();
        const response = await fetch(`${BASE_URL}/employees/${id}`, {
            method: "DELETE",
            headers: {
                "x-api-key": API_KEY,
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Erreur lors de la suppression de l'employé.");

        const updatedEmployeeList = employeeList.map(employee => {
            if (employee.id === id) {
                return { ...employee, deletedAt: Date.now() };
            }
            return employee;
        });

        setEmployeeList(updatedEmployeeList);

        toast.success("Employé supprimé avec succès", { position: "bottom-right" });

    } catch (error) {
        toast.error(error.message, { position: "bottom-right" });
    }
};

export const restoreEmployee = async (id, setEmployeeList, employeeList) => {
    try {
        const token = getTokenFromCookies();
        const response = await fetch(`${BASE_URL}/employees/restore/${id}`, {
            method: "PUT",
            headers: {
                "x-api-key": API_KEY,
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Erreur lors de la restauration de l'employé.");

        const updatedEmployeeList = employeeList.map(employee => {
            if (employee.id === id) {
                return { ...employee, deletedAt: null };
            }
            return employee;
        });

        setEmployeeList(updatedEmployeeList);

        toast.success("Employé restauré avec succès", { position: "bottom-right" });

    } catch (error) {
        toast.error(error.message, { position: "bottom-right" });
    }
};

export const addEmployee = async (lastName, firstName, email, mobilePhone = null, landlinePhone = null, siteId, serviceId, setEmployeeList, onClose) => {
    try {
        const token = getTokenFromCookies();
        const employeeData = { lastName, firstName, email, mobilePhone, landlinePhone, siteId, serviceId };
        const response = await fetch(`${BASE_URL}/employees/`, {
            method: "POST",
            headers: {
                "x-api-key": API_KEY,
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(employeeData),
        });

        if (!response.ok) throw new Error("Erreur lors de l'ajout de l'employé");

        const updatedEmployees = await getAllEmployees();

        setEmployeeList(updatedEmployees);

        toast.success("Employé ajouté.", { position: "bottom-right" });
        onClose();

    } catch (error) {
        toast.error(error.message, { position: "bottom-right" });
    }
};


export const updateEmployee = async (id, lastName, firstName, email, mobilePhone = null, landlinePhone = null, siteId, serviceId) => {
    try {
        const token = getTokenFromCookies();
        const employeeData = { lastName, firstName, email, mobilePhone, landlinePhone, siteId, serviceId };
        const response = await fetch(`${BASE_URL}/employees/${id}`, {
            method: "PUT",
            headers: {
                "x-api-key": API_KEY,
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(employeeData),
        });

        if (!response.ok) throw new Error("Erreur lors de la modification de l'employé");
        
        toast.success("Employé modifié.", { position: "bottom-right" });

    } catch (error) {
        toast.error(error.message, { position: "bottom-right" });
    }
};
