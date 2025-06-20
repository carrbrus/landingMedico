"use strict"

const fetchData = (url) => {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => ({
            success: true,
            body: data
        }))
        .catch(error => ({
            success: false,
            error: `Error en la petición: ${error.message}`
        }));
};


const postData = (url, data) => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => ({
            success: true,
            body: data
        }))
        .catch(error => ({
            success: false,
            error: `Error en la petición: ${error.message}`
        }));
};

export { fetchData, postData };