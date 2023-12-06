import axios, {AxiosInstance} from 'axios';
import { getToken } from './token';
// import { StatusCodes } from 'http-status-codes';
// import {processErrorHandle} from './process-error-handle';

const BASE_URL = 'https://14.design.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

// type DetailMessageType = {
//   type: string;
//   message: string;
// }

// const StatusCodeMapping: Record<number, boolean> = {
//   [StatusCodes.BAD_REQUEST]: true,
//   [StatusCodes.UNAUTHORIZED]: true,
//   [StatusCodes.NOT_FOUND]: true
// };

// const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

// создание экземпляра Axios
export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });
    // Настройка перехватчика - обработка запроса - передача токена
  api.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );
  // Перехватчик - обработка ошибки -> соответствующая ошибка -> processErrorHandle(сообщение ошибки)
  // api.interceptors.response.use(
  //   (response) => response,
  //   (error: AxiosError<DetailMessageType>) => {
  //     if (error.response && shouldDisplayError(error.response)) {
  //       const detailMessage = (error.response.data);

  //       processErrorHandle(detailMessage.message);
  //     }

  //     throw error;
  //   }
  // );

  return api;
};
