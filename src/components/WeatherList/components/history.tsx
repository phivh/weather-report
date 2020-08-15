import React, { useEffect, useState } from 'react'; 
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { axiosReq } from 'src/helpers/axiosReq';
import { AreaLineChart } from 'src/components/Chart';

export const History = (props: {cityid?:string}) => {
  const { cityid } = props;
  const [tableData, setTableData] = useState<{labels:any[], datasets: any[]}>({
    labels: [],
    datasets: []
  });
  useEffect(()=>{
    if(cityid) {
      axiosReq({reqType: 'history', params: cityid}).then(res => {
        const data = res.data.data.slice(0, 10);
        let dataSets = {
          label: 'Temperature',
          data: [],
          borderColor: [],
          backgroundColor: [],
          borderWidth: 2
        }
        let tableDataSet = {
          labels: [],
          datasets: []
        }
        if(data) { 
          data.forEach(item => {
            dataSets = {
              label: 'Temperature',
              data: [...dataSets.data, item.temperature],
              borderColor: [...dataSets.borderColor, 'rgba(94, 183, 250, 1)'],
              backgroundColor: [...dataSets.backgroundColor, 'rgba(94, 183, 250, 0.4)'],
              borderWidth: 2
            }
            tableDataSet = {
              labels: [...tableDataSet.labels, item.time],
              datasets: [dataSets],
            }
          }); 
          setTableData(tableDataSet);
        }
      });
    }
  },[cityid]); 
  const hasData = tableData.labels.length > 0;
  return (
    <Box {...props}>
      {hasData && (
        <AreaLineChart data={tableData} suffix='°'/>
      )}
      {!hasData && <Skeleton height={150} />}
    </Box>
  )
}