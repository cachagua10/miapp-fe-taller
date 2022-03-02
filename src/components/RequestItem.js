import * as React from 'react';
import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import  { genericos } from '../data/generics/generics';
import Box from '@mui/material/Box';
import { SelectGeneric } from './generics/SelectGeneric';
import Grid from '@mui/material/Grid';
import { GenericList } from './generics/GenericList';

export default function RequestItem( ) {
  
    const [selected, setSelected] = useState(true);
    const [presentation, setPresentation] = useState([]);
  
    const handleGenericChange = ( event, value )=>{
        event.preventDefault();
        setSelected(false);
        const presentations = genericos.filter(option => option.name === value)
        .map((option) => option.presentation);
        setPresentation( presentations ); 
    }
    

  return (
      <>
      <Box 
        sx={{ flexGrow: 1 }}
      >
        <Grid 
          container spacing={2}
          justifyContent="space-between"
        >
          <Grid item xs={6}>

            <Autocomplete
              freeSolo
              id="generic"
              disableClearable
              onChange={(event, value) => handleGenericChange( event, value ) }
              options={
                  genericos.filter(option => !option.disposable)
                  .map((option) => option.name)
                  }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Ingresar generico"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
            
          </Grid>
          <Grid item xs>
            <SelectGeneric
            presentation = { presentation }
            isSelected = { selected }
            />
          </Grid>
          <Grid item xs>
            <TextField
              id="generic-quantity"
              label="Cantidad"
              type = "number"
              defaultValue=''
              disabled = { selected }
            />
          </Grid>
        </Grid>
      </Box>
      <GenericList > Genericos</GenericList>
    
    
  </>
  );
}

