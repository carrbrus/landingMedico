"use strict";

import { saveAppointment } from "./firebase.js";
import { fetchData } from "./functions.js";


const loadPosts = async () => {
    const container = document.getElementById('ig-posts');
    if (!container) return;
    const result = await fetchData('posts.json');
    if (result.success) {
        container.innerHTML = '';
        result.body.forEach(pub => {
            container.innerHTML += `
                <div class="md:px-4 md:w-1/2 xl:w-1/4 mt-4 md:mt-0">
                  <div class="bg-white rounded border border-gray-300">
                    <a href="${pub.url}" target="_blank" title="${pub.titulo}">
                      <img src="${pub.img}" alt="${pub.titulo}" class="w-full h-48 object-cover rounded-t" />
                    </a>
                    <div class="p-4">
                      <p class="text-lg font-semibold leading-tight mt-4">${pub.titulo}</p>
                      <p class="text-gray-600 mt-1">${pub.descripcion}</p>
                      <a href="${pub.url}" target="_blank" class="block mt-4 text-teal-500 font-semibold">Ver en Instagram</a>
                    </div>
                  </div>
                </div>
            `;
        });
    } else {
        container.innerHTML = `<p class="text-red-500">${result.error}</p>`;
    }
};


// // Ejemplo de agregar una publicación (POST)
// const addPost = async (nuevaPublicacion) => {
//     const result = await postData('https://jsonplaceholder.typicode.com/posts', nuevaPublicacion);
//     if (result.success) {
//         alert('¡Publicación enviada correctamente (POST simulado)!');
//         console.log('Respuesta del POST:', result.body);
//     } else {
//         alert('Error al enviar la publicación.');
//         console.error(result.error);
//     }
// };


// // Para probar el POST, descomenta esto:
// addPost({
//     img: "images/ejemplo.jpg",
//     titulo: "Nueva publicación desde POST",
//     descripcion: "Esto es una prueba de POST.",
//     url: "https://instagram.com/p/ejemplo3"
// });




const formatTimeTo12Hour = (time24) => {
    const [hourStr, minute] = time24.split(':');
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
};



const enableForm = () => {
    const form = document.getElementById("appointmentID");
    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const formattedTime = formatTimeTo12Hour(time);

        const appointmentData = {
            patientName: name,
            patientEmail: email,
            appointmentDate: date,
            appointmentTime: formattedTime
        };

        saveAppointment(appointmentData)
            .then((result) => {
                if (result.success) {
                    alert("Cita guardada correctamente.");
                } else {
                    alert(`Error al guardar la cita: ${result.message}`);
                }
            })
            .catch((error) => {
                console.error("Error al guardar la cita:", error);
                alert("Ocurrió un error al guardar la cita.");
            });

        form.reset();
    });
};


(async () => {
    enableForm();
    loadPosts();
})();
