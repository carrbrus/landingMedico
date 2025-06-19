import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const saveAppointment = ({ patientName, patientEmail, appointmentDate, appointmentTime}) => {
    const appointmentsRef = ref(database, 'appointments');
    const newAppointmentRef = push(appointmentsRef);
    const appointmentData = {
        patientName,
        patientEmail,
        appointmentDate,
        appointmentTime,
        createdAt: new Date().toISOString()
    };
    return set(newAppointmentRef, appointmentData)
        .then(() => ({
            success: true, 
            message: 'Cita médica reservada exitosamente.'
        }))
        .catch((error) => ({
            success: false, 
            message: `Error al reservar cita: ${error.message}`
        }));
};

export { saveAppointment };

  