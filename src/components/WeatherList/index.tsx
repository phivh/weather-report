import React from 'react'; 
import { Box, BoxProps, List, ListItem, Typography } from '@material-ui/core';
import { useAppContext } from 'src/contexts/app/app.provider'; 
import { WeatherItem } from './components/weatherItem';

export const WeatherList = (props: BoxProps) => {
  const { items } = useAppContext();
  const hasItems =  items && items.length > 0;
  return (
    <Box {...props} m={2}>
      {hasItems ? (
        <List>
          {items.map((item, idx) => (
            <ListItem key={idx}>
              <WeatherItem {...item }/>
            </ListItem> 
          ))} 
        </List>
      ) : (
        <Typography variant='caption'>No content</Typography>
      )}
      
    </Box>
  )
}