import React, { useState, useEffect, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { ChartWrapperStyled, FadeInElement } from './chart.styles';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { useDelay, barChartValidator } from './utils';
import { ChartDataProps, LineChart } from './chart';

type ChartValidator = (chartData: ChartData) => boolean;

interface DataFetcher {
  // can be any response from axios
  rawData: any;
}

const chartTypeMapping: { [chartType: string]: React.FC<ChartDataProps> } = {
  line: LineChart
};

const chartDataValidatorMapping: { [validatorType: string]: ChartValidator } = {
  line: barChartValidator
};

export interface ChartWrapperProps {
  onClick?: (chart: Chart, event: React.MouseEvent<HTMLCanvasElement>) => void;
  chartType: ChartType;
  options?: ChartOptions;
  data?: ChartData;
  dataFetcher?: () => Promise<DataFetcher>;
  // can be any response from axios
  dataFormatter?: (rawData: any) => ChartData;
  spinner?: React.ReactNode;
  isLoading?: boolean;
}

export const ChartWrapper = (props: ChartWrapperProps) => {
  const {
    data,
    dataFetcher,
    dataFormatter,
    options = {},
    chartType = 'bar',
    spinner = '',
    isLoading = false,
    onClick
  } = props;
  const chartValidator: ChartValidator = chartDataValidatorMapping[chartType] || (() => false);
  const [chartWrapperData, setChartWrapperData] = useState<ChartData>();
  const [chartOptions] = useState<ChartOptions>(options);
  const [fetchInProgress, setFetchInProgress] = useState(false);
  const { state: delayCompleted, resumeDelay } = useDelay({ initialValue: false, updatedValue: true, delay: 1100 });

  useEffect(() => {
    if (isLoading) {
      resumeDelay();
    }
  }, [isLoading, resumeDelay]);

  useEffect(() => {
    if (dataFetcher && dataFormatter) {
      setFetchInProgress(true);
      dataFetcher()
        .then(({ rawData }) => {
          const formattedData = dataFormatter(rawData);

          if (chartValidator(formattedData)) {
            setChartWrapperData(formattedData);
          }
        })
        .catch(() => {})
        .finally(() => {
          setFetchInProgress(false);
        });
    }
  }, [dataFormatter, dataFetcher, chartValidator]);

  useEffect(() => {
    const dataIsNotEqual = !isEqual(data, chartWrapperData);

    if (data && chartValidator(data) && dataIsNotEqual) {
      setChartWrapperData(data);
    }
  }, [chartValidator, chartWrapperData, data]);

  const LoadingSpinner = useMemo(() => {
    return <FadeInElement>{spinner}</FadeInElement>;
    // to avoid re-rendering don't include spinner because we don't dynamically update spinner
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadingCompleted = delayCompleted && !fetchInProgress && !isLoading;
  const chartWrapperDataFound = chartWrapperData && chartValidator(chartWrapperData);

  const NoDataFound = useMemo(() => {
    return (
      <FadeInElement>
        <h1 style={{ textAlign: 'center', lineHeight: '300px' }}>No data found!</h1>
      </FadeInElement>
    );
  }, []);

  const Chart = useMemo(() => {
    const ChartComponent = chartTypeMapping[chartType];
    return (
      <FadeInElement>
        <ChartComponent
          onClick={onClick}
          data={chartWrapperData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            ...chartOptions
          }}
        />
      </FadeInElement>
    );
  }, [chartOptions, chartType, chartWrapperData, onClick]);

  return (
    <ChartWrapperStyled>
      {!loadingCompleted && LoadingSpinner}
      {loadingCompleted && !chartWrapperDataFound && NoDataFound}
      {loadingCompleted && chartWrapperDataFound && Chart}
    </ChartWrapperStyled>
  );
};
