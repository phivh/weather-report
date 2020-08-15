import React, { useState, useEffect } from 'react'; 
import { makeStyles, Box, BoxProps, Select, MenuItem, Button, Grid, FormControl, InputLabel } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useAppContext } from 'src/contexts/app/app.provider';
import { axiosReq } from 'src/helpers/axiosReq';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const AddCity = (props: BoxProps) => {
  const classes = useStyles();
  const {addItem, loadLocal} = useAppContext();
  const [city, setCity] = useState('');
  const [cities, setCities] = useState<any[]>([]); 
  const handleChange = (e) => {
    let value = e.target.value;
    setCity(value);
  }
  const handleAddCity = async (city) => {
    const res = await axiosReq({reqType: 'current', params: city.id});
    addItem({
      id: city.id,
      name: city.name,
      detail: {
        ...res.data
      }
    });
  }
  useEffect(()=>{
    loadLocal();
    axiosReq({reqType: 'stations'}).then(res => {
      if(!res.data) throw Error;
      setCities(res.data);
    });
  },[]);
  if(cities.length === 0) {
    return <Skeleton />;
  }
  return (
    <Box {...props}>
      <Grid container
  direction="row"
  justify="center"
  alignItems="center">
        <Grid item xs={6}>
            <FormControl className={classes.formControl}> 
              <InputLabel id="city-select">Select a City</InputLabel>
              <Select
                labelId="city-select"
                value={city}
                onChange={handleChange}
                >
              {cities.map(item => (
                <MenuItem key={item.id} value={item}>{item.name}</MenuItem>
                ))} 
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={()=>handleAddCity(city)}>
            Add City
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}