import Axios, { Method } from 'axios';
import { getSessionStorageItem } from 'utils/localstorage';

// import storage from '../utils/storage';

function authRequestInterceptor(config: any) {
  config.headers = config.headers ?? {};
  const adminData: any = getSessionStorageItem('admin');
  if (adminData && adminData.token) {
    config.headers.authorization = adminData.token;
  }
  config.headers.Accept = 'application/json';
  return config;
}
export const axios = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`
});
axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response: any) => {
    return response.data?.result ? response.data?.result : response.data;
  },
  (error: any) => {
    let message = error.response?.data?.message || error.message;
    if (
      error.response &&
      error.response.data &&
      error.response.data.error &&
      (error.response.data.error?.errors ||
        error.response.data.error?.error_params)
    ) {
      message =
        error.response.data.error?.errors.join(',') ||
        error.response.data.error?.error_params
          ?.map((e: any) => e.message || e.msg)
          ?.join(',');
    }
    // Handle Error
    // eslint-disable-next-line no-undef
    return Promise.reject({
      statusCode: error.response?.status,
      message: message
    });
  }
);

// Common method for api hitting

export async function apiCall<T = any>(
  method: Method,
  url: string,
  data?: any
): Promise<T> {
  try {
    const response: T = await axios({
      method,
      url,
      data
    });
    return response; // response is already the data, not AxiosResponse
  } catch (error: any) {
    throw error;
  }
}

export default apiCall;
