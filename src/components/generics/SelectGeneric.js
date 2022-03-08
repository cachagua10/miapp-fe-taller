import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export const SelectGeneric = ({isSelected,  presentation }) => {
    
    const [pres, setPres] = useState('')

    const handleSelectChange =( event)=>{
        setPres( event.target.value );
     }
     console.log(presentation);
     
  return (
      
    <Box sx={{ width: 300 }}>
        <FormControl fullWidth>
          <InputLabel id="generic-presentation-label">Presentaciones</InputLabel>
          <Select
            labelId='generic-presentation-label'
            id="generic-presentation"
            onChange={ handleSelectChange }
            value= { pres }
            label="Presentacion"
            disabled = { isSelected }
          >
            {
              !isSelected &&
              (presentation.map((pres, index) =>
                <MenuItem
                  key={ index }
                  value={pres}
                >{ pres }</MenuItem>))
            }

          </Select>
        </FormControl>
    </Box>
  )
}
