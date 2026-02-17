import { apiRequest } from "../apiRequest";

const host = import.meta.env.VITE_BACKEND_URL;

export const login = async (dataToSend) => {
    const url = `${host}/api/login`;
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(dataToSend)
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        console.log("Error", response.status, response.statusText);
        return false;
    };
    const data = await response.json();
    return data;
}