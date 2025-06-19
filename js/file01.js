"use strict";

import { saveAppointment } from "./firebase.js";


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
})();
