import { getTokenFromCookies } from "./administrators";

const BASE_URL = process.env.REACT_APP_API_BASE_URL_HTTP;
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchingAllData = async (dataType, id = null) => {
    try {
        const token = getTokenFromCookies();
        const response = await fetch(`${BASE_URL}/${dataType}${id ? `/${id}` : ""}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "x-api-key": API_KEY,
            },
        });

        if (!response.ok) throw new Error("Erreur lors de la récupération des données");

        const data = await response.json();
        return data;

    } catch (error) {
        return { error: error.message };
    }
};
