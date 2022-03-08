
import React, { useEffect, useState } from 'react'
import {PatientsList} from './patients/PatientsList' 


export default function PatientsItem () {
  
  /* const [patients, setPatients] = useState({});

  const getPatients = () => {
    axios.get("http://taller-fsoler.test/api/patients")
        .then((response) => { setPatients(response.data.data) })
        .catch((error) => { alert(error.message) });
  } 

  useEffect(() => {
    getPatients();
  }, [])
   */
  
  return (
    <>
        <PatientsList
        ></PatientsList>
    </>
  )
}
