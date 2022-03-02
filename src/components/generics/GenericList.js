import React, {useState, useEffect} from 'react';
import axios from 'axios';


export const GenericList = () => {
    const [generics, setGenerics] = useState([]);

    useEffect(() => {
        getGenerics()
    }, []);

    const getGenerics = () => {
        axios.get("http://localhost:3000/generics")
            .then((response) => { setGenerics(response.data) })
            .catch((error) => { alert(error.message) });
    }


  return (
    <div>
            <h2>Generics</h2>
            <div className="container">
                <div className="row mb-3">
                    <div className="col-1">
                    cod
                    </div>
                    <div className="col-3">
                    Nombre
                    </div>
                    <div className="col-3">
                    Presentacion
                    </div>
                   
                </div>
            </div>
            <ul>
                {
                    generics.map((generic, index) => 
                            <li key={index}>
                                index: {index}<br/>
                                cod_syb: {generic.cod_sybis} <br/>
                                Nombre: {generic.name} <br/>
                                presentacion: {generic.presentation} <br/>
                                {/* <button className='btn btn-warning' onClick={() => history.push(`/contacts/${contact.id}/edit`)}>Edit</button>
                                <button className='btn btn-danger' onClick={() => deleteContact(contact.id)}>Delete</button> */}
                            </li>
                        )
                }
            </ul>
        </div>
  )
}
