import axios from 'axios';

export const patientEdit = (patient) => {
     axios.put(`http://taller-fsoler.test/api/patients/${patient.id}`, patient)
        .then(() => { 
            alert('Contact succesfully edited')
        })
        .catch((error) => { alert(error.message) }); 
        console.log(patient);
}