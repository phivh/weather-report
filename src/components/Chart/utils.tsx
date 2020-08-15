import { useState, useEffect, useCallback } from 'react';
import { ChartData } from 'chart.js';

// can be anything that the consumer sends and want's to set as default value
export const get = (obj: { [key: string]: any }, path: string, defaultValue: any = undefined) => {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      // any: obj parameter
      .reduce((res: { [key: string]: any }, key: string) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  const found = result === undefined || result === obj ? defaultValue : result;
  return found;
};

export const barChartValidator = (chartData: ChartData = {}) => {
  const data = get(chartData, 'datasets[0].data', []);
  return data.length > 0;
};

interface UseDelay {
  // can be anything the consumer wants to set
  initialValue?: any;
  // can be anything the consumer wants to set
  updatedValue?: any;
  delay: number;
}

export const useDelay = ({ initialValue, updatedValue, delay }: UseDelay) => {
  // use of any follows the parameter
  const [state, setState] = useState<any>(initialValue);
  const [timeoutIds, setTimeoutIds] = useState<number[]>([]);

  const cleanup = useCallback(() => {
    timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
  }, [timeoutIds]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const resumeDelay = useCallback(() => {
    setState(initialValue);

    const timer = setTimeout(() => {
      setState(updatedValue);
    }, delay);

    setTimeoutIds(prev => [...prev, timer]);
  }, [initialValue, delay, updatedValue]);

  useEffect(() => resumeDelay(), [resumeDelay]);

  return { state, resumeDelay, setState };
};
