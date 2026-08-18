const API_URL = import.meta.env.VITE_API_URL;

console.log("API_URL =", API_URL);

const response = await fetch(
    `${API_URL}/api/scrap?url=${targetUrl}`
);