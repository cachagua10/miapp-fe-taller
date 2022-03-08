import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridActionsCellItem,
} from '@mui/x-data-grid-pro';

import axios from 'axios';
import { patientEdit } from '../helpers/patients/patientEdit';



export const PatientsList = () => {
  

  const columns = [
    { field: 'name', headerName: 'Nombre', width: 180, editable: true },
    { field: 'lastname', headerName: 'Apellido', width: 180, editable: true },
    { field: 'dni', headerName: 'DNI', type: 'number', editable: true },
    {
      field: 'birthdate',
      headerName: 'Fecha Nacimiento',
      type: 'date',
      width: 180,
      editable: true,
    },
    { field: 'os', headerName: 'Obra Social', width: 180, editable: true },
    { field: 'military', headerName: 'Activo', type:'boolean', editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        
        if (editingMode && id === idRowEdit) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
              color="primary"
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
  
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={ handleEditClick(id) }
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={ handleDeleteClick(id) }
            color="inherit"
          />,
        ];
      },
    },
  ];

  const [patientEditing, setPatientEditing] = useState({})
  const [idRowEdit, setIdRowEdit] = useState()
  const [editingMode, setEditingMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [patients, setPatients] = useState([]);
  const [rows, setRows] = useState([]);
      
    useEffect(() => {
    const getPatients = async () => {
      try {
        const response = await axios({
          url: "http://taller-fsoler.test/api/patients",
        });
        setPatients(response.data.data);
      
      } catch (error) {
        console.log(alert( error.message));
      }
    };

    getPatients();
   
    setLoading(false);
    
  }, [setPatients, setEditingMode]);

  

   useEffect(() => {  
    patients.map(element =>
      {
        console.log(element);
        const nuevo = {
        id: element.id, 
        name: element.person.first_name,
        lastname: element.person.last_name,
        dni: element.person.dni,
        birthdate: element.person.birth_date,
        os: element.os_number,
        military: element.is_military
      }
      setRows(rows => [...rows, nuevo])
      }
    ) 
  }, [patients]); 

  
  const handleRowModelChange = (params, event)=>{
    event.defaultMuiPrevented = true;
    if (editingMode && params[idRowEdit]){
    setPatientEditing({
        id: idRowEdit,

          first_name: params[idRowEdit].name.value,
          last_name: params[idRowEdit].lastname.value,
          dni: params[idRowEdit].dni.value,
          birth_date: params[idRowEdit].birthdate.value,
  
        os_number: params[idRowEdit].os.value,
        is_military: params[idRowEdit].military.value
    })
  }
    console.log(params);
    console.log(patientEditing);
    
  }
  
  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    //event.defaultMuiPrevented = true;
  };

  const handleCellFocusOut = (params, event) => {
    event.defaultMuiPrevented = true;
    params.isFocus = false;
  };

  const handleEditClick = (id) => (event) => {
    event.stopPropagation();
    console.log(id);
    setIdRowEdit(id);
    setEditingMode(true);

  };

  const handleSaveClick = (id) => (event) => {
    event.stopPropagation();
    // Wait for the validation to run
    window.confirm("Seguro desea guardar?");
    patientEdit(patientEditing);

  };

  const handleDeleteClick = (id) => (event) => {
    event.stopPropagation();
    
  };

  const handleCancelClick = (id) => (event) => {
    event.stopPropagation();
    setIdRowEdit(null);
    setEditingMode(false);
    setPatientEditing({});
  };
    

  if (loading){
    return <h1>Espere por favor</h1>
  }

  return (
    <>
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid 
        editMode="row" 
        rows={rows} 
        columns={columns}
        onEditRowsModelChange = {handleRowModelChange}
        /* onRowEditStart={handleRowEditStart} 
        onRowEditStop={handleRowEditStop} */
        onRowFocusOut={handleCellFocusOut} 
        isCellEditable = {(params)=>params.id === idRowEdit}
        isEditable = { editingMode }
      />
    </div>  
   
            </>
 
);
}
