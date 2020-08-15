import { Item } from "src/interface";
import React from 'react'; 
import { Box, Grid, Typography, Card, CardContent, Button, CardActions } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Info } from "./info";
import { History } from "./history";
import { useAppContext } from 'src/contexts/app/app.provider';

interface ItemProps {
  id: string;
  name: string;
  detail: Item;
}

export const WeatherItem = (props: ItemProps) => {
  const {removeItem} = useAppContext();
  return (
    <Box p={2} width={'100%'}>
      <Grid container spacing={3}>
      <Grid item xs={4}>
        <Card> 
          <CardContent>
            <Typography variant='h3'>{props.name}</Typography>
            <Info {...props.detail} />
          </CardContent>
          <CardActions>
          <Button onClick={()=>removeItem(props)} size="small"><DeleteForeverIcon color='error'/> Delete</Button>
          </CardActions>
        </Card> 
      </Grid>
      <Grid item xs={8}>
        <History cityid={props.id} />
      </Grid>
    </Grid>
    </Box>
  )
}