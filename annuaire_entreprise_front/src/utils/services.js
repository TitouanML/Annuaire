import { toast } from "react-toastify";
import { getTokenFromCookies } from "./administrators";
import { getAllEmployees } from "./employee";

const BASE_URL = process.env.REACT_APP_API_BASE_URL_HTTP;
const API_KEY = process.env.REACT_APP_API_KEY;


export const getAllServices = async (includeDeleted = true) => {
  try {
    const token = getTokenFromCookies();
    const response = await fetch(`${BASE_URL}/services?deleted=${includeDeleted}`, {
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok)
      throw new Error("Erreur lors de l'obtention des services.");

    const data = await response.json();
    sessionStorage.setItem("serviceList", JSON.stringify(data));
    return data;
  } catch (error) {
    toast.error(error.message, { position: "bottom-right" });
  }
};

export const deleteService = async (id, setServiceList, serviceList) => {
  try {
    const employees = await getAllEmployees(false); // Récupérer uniquement les employés actifs

    // Vérifier s'il existe un employé actif associé à ce service
    const hasActiveEmployees = employees.some(employee => (employee.service.id === id) && (employee.deletedAt === null));

    if (hasActiveEmployees) {
      throw new Error("Impossible de supprimer ce service car des employés y sont encore rattachés.");
    }

    const token = getTokenFromCookies();
    const response = await fetch(`${BASE_URL}/services/${id}`, {
      method: "DELETE",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Erreur lors de la suppression du service.");

    const updatedServiceList = serviceList.map(service => {
      if (service.id === id) {
        return { ...service, deletedAt: Date.now() };
      }
      return service;
    });

    setServiceList(updatedServiceList);
    toast.success("Service supprimé avec succès", { position: "bottom-right" });

  } catch (error) {
    toast.error(error.message, { position: "bottom-right" });
  }
};


export const restoreService = async (id, setServiceList, serviceList) => {
  try {
    const token = getTokenFromCookies();
    const response = await fetch(`${BASE_URL}/services/restore/${id}`, {
      method: "PUT",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Erreur lors de la restauration du service.");


    const updatedServiceList = serviceList.map(service => {
      if (service.id === id) {
        return { ...service, deletedAt: null };
      }
      return service;
    });

    setServiceList(updatedServiceList);

    toast.success("Service restauré avec succès", { position: "bottom-right" });

  } catch (error) {
    toast.error(error.message, { position: "bottom-right" });
  }
};

export const addService = async (name,setServiceList,onClose) => {
  try {
    const token = getTokenFromCookies();
    const serviceData = { name };

    const response = await fetch(`${BASE_URL}/services/`, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(serviceData),
    });

    if (!response.ok) throw new Error("Erreur lors de l'ajout");

    const updatedServices = await getAllServices();

    setServiceList(updatedServices);

    toast.success("Service ajouté.", { position: "bottom-right" });
    onClose();

  } catch (error) {
    toast.error(error.message, { position: "bottom-right" });
  }
};



export const updateService = async (id, name) => {
  try {
    const token = getTokenFromCookies();
    const serviceData = { name,  };
    const response = await fetch(`${BASE_URL}/services/${id}`, {
      method: "PUT",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(serviceData),
    });

    if (!response.ok) throw new Error("Erreur lors de la modification");


    toast.success("Service modifié.", { position: "bottom-right" });

  } catch (error) {
    toast.error(error.message, { position: "bottom-right" });
  }
}

