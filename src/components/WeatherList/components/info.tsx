import React from 'react'; 
import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Item } from 'src/interface';

export const Info = (props: Item) => {
  
  const { temperature, time } = props;
  if(!props) {
    return <Skeleton />
  }
  return (
    <Box> 
      <Typography variant='subtitle2'>Temperature: {temperature}{!!temperature && '°'}</Typography>
      <Typography variant='subtitle2'>Time: {time}</Typography>
    </Box>
  )
}