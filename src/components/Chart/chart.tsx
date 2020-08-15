import * as React from 'react';
import Chart, { ChartData, ChartOptions } from 'chart.js';
import isEqual from 'react-fast-compare';
import { get } from './utils';

export interface ChartDataProps {
  data?: ChartData;
  options?: ChartOptions;
  cutout?: number;
  centerComponent?: React.ReactNode;
  suffix?: string;
  onClick?: (chart: Chart, event: React.MouseEvent<HTMLCanvasElement>) => void;
}

interface ChartProps extends ChartDataProps {
  type: string;
}

const ChartComponent: React.FC<ChartProps> = React.memo(
  ({ type, data, options, onClick = () => {} }) => {
    const chartRef = React.createRef<HTMLCanvasElement>();
    const [chartInstance, setChartInstance] = React.useState<Chart | null>(null);
    const config: Chart.ChartConfiguration = {
      type,
      data,
      options
    };
    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (onClick) {
        onClick(chartInstance as Chart, e);
      }
    };

    React.useEffect(() => {
      if (chartRef && chartRef.current) {
        const chart = new Chart(chartRef.current as HTMLCanvasElement, config);
        setChartInstance(chart);
      }
      // do not include chartRef, config in the dependency
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
      if (chartInstance) {
        chartInstance.config.data = {
          ...chartInstance.config.data,
          ...data
        };
        chartInstance.update();
      }
    }, [chartInstance, data]);

    React.useEffect(() => {
      if (chartInstance) {
        chartInstance.config.options = {
          ...chartInstance.config.options,
          ...options
        };
        chartInstance.update();
      }
    }, [chartInstance, options]);

    return <canvas className={`${type}_chart`} ref={chartRef} onClick={handleClick} />;
  },
  (prevProps, nextProps) => {
    const prevDatasets = get(prevProps, 'data.datasets', []).map((item: any) => {
      const { _meta, ...rest } = item;
      return rest;
    });
    const nextDatasets = get(nextProps, 'data.datasets', []).map((item: any) => {
      const { _meta, ...rest } = item;
      return rest;
    });
    const prevLabels = get(prevProps, 'data.labels', []);
    const nextLabels = get(nextProps, 'data.labels', []);

    return isEqual(prevDatasets, nextDatasets) && isEqual(prevLabels, nextLabels);
  }
);

export const BarHorizontal: React.FC<ChartDataProps> = ({ data, options, onClick = () => {} }) => {
  const optionsCombined = {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            drawOnChartArea: false
          }
        }
      ]
    },
    ...(options ? options : {})
  };
  return <ChartComponent type="horizontalBar" data={data} options={optionsCombined} onClick={onClick} />;
};

export const BarVertical: React.FC<ChartDataProps> = ({ data, onClick = () => {}, options }) => {
  const optionsCombined = {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            drawOnChartArea: false
          }
        }
      ]
    },
    ...(options ? options : {})
  };
  return <ChartComponent type="bar" data={data} options={optionsCombined} onClick={onClick} />;
};

export const LineChart: React.FC<ChartDataProps> = ({ data, onClick = () => {}, options }) => {
  const optionsCombined = {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            drawOnChartArea: false
          }
        }
      ]
    },
    ...(options ? options : {})
  };
  return <ChartComponent type="line" data={data} options={optionsCombined} onClick={onClick} />;
};

export const AreaLineChart: React.FC<ChartDataProps> = ({ data, onClick = () => {}, options, suffix }) => {
  const optionsCombined = {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: true
          },
          ticks: {
            maxRotation: 0,
            minRotation: 0,
            callback: function(dataLabel: any, index: number) {
              return index % 1 === 0 ? dataLabel : '';
            }
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            drawOnChartArea: true
          },
          ticks: {
            callback: function(dataLabel: any) {
              return dataLabel + suffix;
            }
          }
        }
      ]
    },
    maintainAspectRatio: false,
    spanGaps: false,
    elements: {
      line: {
        tension: 0.000001
      }
    },
    plugins: {
      filler: {
        propagate: false
      }
    },
    ...(options ? options : {})
  };
  return <ChartComponent type="line" data={data} options={optionsCombined} onClick={onClick} />;
};
