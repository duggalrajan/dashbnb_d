import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// process.on('unhandledRejection', (error) => {
//     global.logAxiosError(error);
//     fail(error);
//   });
//   process.on('uncaughtException', (error) => {
//     global.logAxiosError(error);
//     fail(error);
//   });

global.flushPromises = () => new Promise((resolve) => setTimeout(resolve));

global.logAxiosError = (error) => {
    if (error?.response?.request) {
      return;
    }
    if (error?.isAxiosError && error?.response?.status >= 400) {
      console.log(
        `${error.response.config.method} ${error.response.config.url} Status ${error.response.status}`
      );
    }
  };

const originalAxiosCreate = axios.create;
axios.create = function createPatchedAxios(conf) {
  const instance = originalAxiosCreate(conf);
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      global.logAxiosError(error);
      return Promise.reject(error);
    }
  );
  return instance;
};
const mockAxios = new MockAdapter(axios);
mockAxios.default = mockAxios.axiosInstance;
global.mockAxios = mockAxios;