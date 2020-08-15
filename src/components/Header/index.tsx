import React from 'react'; 
import { Box, BoxProps, Grid,Typography } from '@material-ui/core';
import { AddCity } from './addCity';
export const Header = (props: BoxProps) => {
  return (
    <Box {...props}>
      <Grid container spacing={3}>
        <Grid item xs={7}>
            <Typography variant='h3'>{props.children}</Typography>
        </Grid>
        <Grid item xs={3}>
          <AddCity />
        </Grid>
      </Grid>
    </Box>
  )
}