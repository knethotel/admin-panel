import Axios, { AxiosResponse, Method } from 'axios';
import { getSessionStorageItem } from 'utils/localstorage';

// import storage from '../utils/storage';

function authRequestInterceptor(config: any) {
  config.headers = config.headers ?? {};
  const adminData: any = getSessionStorageItem('admin');
  config.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2E1ZjY0MWQ0NTllODE0ZTg2N2RmYTEiLCJuYW1lIjoiRGlieWFuc2h1IEFkbWluIiwiZW1haWwiOiJkaWJ5YW5zaHVhZG1pbkBleGFtcGxlLmNvbSIsImlhdCI6MTczOTk3NDIxMCwiZXhwIjoxLjY0NTE1NDg0Mjc1NzYzMjVlKzI4fQ.-KqHokFzh2Bx60KmPUQoXY6W4re4TC9AND1rNS7WSYU';
//   if (adminData && adminData.token) {
//   }
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

async function apiCall<T = any>(
  method: Method,
  url: string,
  data?: any
): Promise<AxiosResponse<T>> {
  // Return type is now AxiosResponse<T>
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url,
      data
      // You can add headers or other configurations here if needed
    });
    // console.log(data);
    return response; // Return the whole response object
  } catch (error: any) {
    // console.error('API call error:', error); // Log the error for debugging
    throw error; // Rethrow the error for handling in the caller
  }
}

export default apiCall;
