import { toast } from "react-toastify";
import { getTokenFromCookies } from "./administrators";
import { getAllEmployees } from "./employee";

const BASE_URL = process.env.REACT_APP_API_BASE_URL_HTTP;
const API_KEY = process.env.REACT_APP_API_KEY;


export const getAllSites = async (includeDeleted = true) => {
  try {
    const token = getTokenFromCookies();
    const response = await fetch(`${BASE_URL}/sites?deleted=${includeDeleted}`, {
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok)
      throw new Error("Erreur lors de l'obtention des sites.");

    const data = await response.json();
    sessionStorage.setItem("siteList", JSON.stringify(data));
    return data;
  } catch (error) {
    toast.error(error.message, { position: "bottom-right" });
  }
};

export const deleteSite = async (id, setSiteList, siteList) => {
  try {
    const employees = await getAllEmployees(false);

    const hasActiveEmployees = employees.some(employee => (employee.site.id === id)  && (employee.deletedAt === null));

    if (hasActiveEmployees) {
      throw new Error("Impossible de supprimer ce site car des employés y sont encore rattachés.");
    }

    const token = getTokenFromCookies();
    const response = await fetch(`${BASE_URL}/sites/${id}`, {
      method: "DELETE",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Erreur lors de la suppression du site.");

    const updatedSiteList = siteList.map(site => {
      if (site.id === id) {
        return { ...site, deletedAt: Date.now() };
      }
      return site;
    });
    
    setSiteList(updatedSiteList);
    toast.success("Site supprimé avec succès", { position: "bottom-right" });

  } catch (error) {
    toast.error(error.message, { position: "bottom-right" });
  }
};



export const restoresite = async (id, setSiteList, siteList) => {
  try {
    const token = getTokenFromCookies();
    const response = await fetch(`${BASE_URL}/sites/restore/${id}`, {
      method: "PUT",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Erreur lors de la restauration du site.");


    const updatedSiteList = siteList.map(site => {
      if (site.id === id) {
        return { ...site, deletedAt: null };
      }
      return site;
    });

    setSiteList(updatedSiteList);

    toast.success("Site restauré avec succès", { position: "bottom-right" });

  } catch (error) {
    toast.error(error.message, { position: "bottom-right" });
  }
};

export const addSite = async (name, city, zipCode, setSiteList, onClose) => {
  try {
    const token = getTokenFromCookies();
    const siteData = { name, city, zipCode };

    const response = await fetch(`${BASE_URL}/sites/`, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(siteData),
    });

    if (!response.ok) throw new Error("Erreur lors de l'ajout");

    // Récupérer la liste complète des sites après l'ajout
    const updatedSites = await getAllSites();

    // Mettre à jour la liste des sites avec les données récupérées
    setSiteList(updatedSites);

    toast.success("Site ajouté.", { position: "bottom-right" });
    onClose();

  } catch (error) {
    toast.error(error.message, { position: "bottom-right" });
  }
};



export const updateSite = async (id, name, city, zipCode) => {
  try {
    const token = getTokenFromCookies();
    const siteData = { name, city, zipCode };
    const response = await fetch(`${BASE_URL}/sites/${id}`, {
      method: "PUT",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(siteData),
    });

    if (!response.ok) throw new Error("Erreur lors de la modification");


    toast.success("Site modifié.", { position: "bottom-right" });

  } catch (error) {
    toast.error(error.message, { position: "bottom-right" });
  }
}

