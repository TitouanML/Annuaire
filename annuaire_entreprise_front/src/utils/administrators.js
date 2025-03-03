import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = process.env.REACT_APP_API_BASE_URL_HTTP;
const API_KEY = process.env.REACT_APP_API_KEY;

export const login = async (email, password, setIsLoggedIn, setIsOpened) => {
  try {
    const response = await fetch(`${BASE_URL}/administrators/login`, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Erreur lors de la connexion");

    const data = await response.json();
    let token = data["token"];

    if (token) {
      document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 12
        }; secure`;
      sessionStorage.setItem("UserEmail", email);
      toast.success("Vous nous aviez manqué !", { position: "bottom-right" });
      setIsOpened(false);
      setIsLoggedIn(true);
    } else {
      throw new Error({ message: "Erreur d'authentification" });
    }
  } catch (error) {
    toast.error(error.message, { position: "bottom-right" });
  }
};

export const logOut = (setIsLoggedIn, setIsOpened) => {
  document.cookie = "token=; path=/; max-age=0;";
  sessionStorage.clear();
  toast.info("À la prochaine 👋", { position: "bottom-right" });
  setIsOpened(false);
  setIsLoggedIn(false);
};

export const getTokenFromCookies = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((row) => row.startsWith("token="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

export const isAuthentified = () => {
  const token = getTokenFromCookies();
  if (token) return true;
  return false;
};

export const isMe = (email) => {
  return email === sessionStorage.getItem("UserEmail")
}

export const getAllAdministrators = async () => {
  try {
    const token = getTokenFromCookies();
    const response = await fetch(`${BASE_URL}/administrators?includeDeleted=true`, {
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok)
      throw new Error("Erreur lors de l'obtention des administrateurs.");

    const data = await response.json();
    sessionStorage.setItem("adminList", JSON.stringify(data));
    return data;
  } catch (error) {
    toast.error(error.message, { position: "bottom-right" });
  }
};

export const deleteAdmin = async (id, setAdminList, adminList) => {
  try {
    const token = getTokenFromCookies();
    const response = await fetch(`${BASE_URL}/administrators/${id}`, {
      method: "DELETE",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Erreur lors de la suppression de l'administrateur.");

    // Mettre à jour l'état de l'administrateur pour le restaurer localement
    const updatedAdminList = adminList.map(admin => {
      if (admin.id === id) {
        return { ...admin, deletedAt: Date.now() };  // Supprime l'administrateur en ajoutant 'deletedAt'
      }
      return admin;
    });
    // Mettre à jour l'état de adminList dans le composant parent
    setAdminList(updatedAdminList);

    toast.success("Administrateur supprimé avec succès", { position: "bottom-right" });

  } catch (error) {
    toast.error(error.message, { position: "bottom-right" });
  }
};

export const restoreAdmin = async (id, setAdminList, adminList) => {
  try {
    const token = getTokenFromCookies();
    const response = await fetch(`${BASE_URL}/administrators/restore/${id}`, {
      method: "PUT",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Erreur lors de la restauration de l'administrateur.");

    // Mettre à jour l'état de l'administrateur pour le restaurer localement
    const updatedAdminList = adminList.map(admin => {
      if (admin.id === id) {
        return { ...admin, deletedAt: null };  // Restaure l'administrateur en supprimant 'deletedAt'
      }
      return admin;
    });

    // Mettre à jour l'état de adminList dans le composant parent
    setAdminList(updatedAdminList);

    toast.success("Administrateur restauré avec succès", { position: "bottom-right" });

  } catch (error) {
    toast.error(error.message, { position: "bottom-right" });
  }
};

export const addAdmin = async (firstName, lastName, email, password, setAdminList, onClose) => {
  try {
    const token = getTokenFromCookies();
    const adminData = { lastName, firstName, password, email };
    const response = await fetch(`${BASE_URL}/administrators/`, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(adminData),
    });

    if (!response.ok) throw new Error("Erreur lors de l'ajout");

    setAdminList(await getAllAdministrators());
    toast.success("Administrateur ajouté.", { position: "bottom-right" });
    onClose();

  } catch (error) {
    toast.error(error.message, { position: "bottom-right" });
  }
}


export const updateAdmin = async (id, firstName, lastName, email, password ) => {
  try {
    const token = getTokenFromCookies();
    const adminData = { lastName, firstName, password, email };
    const response = await fetch(`${BASE_URL}/administrators/${id}`, {
      method: "PUT",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(adminData),
    });

    if (!response.ok) throw new Error("Erreur lors de la modification");


    toast.success("Administrateur modifié.", { position: "bottom-right" });

  } catch (error) {
    toast.error(error.message, { position: "bottom-right" });
  }
}

