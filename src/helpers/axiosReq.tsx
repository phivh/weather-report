import Axios, { AxiosRequestConfig, Method } from 'axios';
import { APP_API_URL, APP_API_STATIONS_PATH, APP_API_CURRENT_PATH, APP_API_HISTORY_PATH } from './constant';

export type ReqType = 'stations' | 'current' | 'history';

interface AxiosReq {
  baseUrl?: string;
  reqType: ReqType;
  method?: Method;
  env?: string;
  // any, axios accepts any type
  params?: any;
  data?: any;
}

export const axiosReq = async ({ reqType, params }: AxiosReq): Promise<any> => {
  const config: AxiosRequestConfig = {
    timeout: 30000,
    headers: {
      Accept: '*/*'
    }
  };

  switch (reqType) {
    case 'stations':
      config.url = APP_API_URL + APP_API_STATIONS_PATH;
      config.method = 'GET';
      break;
    
      case 'current':
      config.url = APP_API_URL + APP_API_CURRENT_PATH.replace('${city_id}', params);
      config.method = 'GET';
      break;

    case 'history':
      config.url = APP_API_URL +  APP_API_HISTORY_PATH.replace('${city_id}', params);
      config.method = 'GET';
      break;
  }

  return await Axios(config);
};
