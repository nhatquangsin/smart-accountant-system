import axios from 'axios';
import { SecureStore } from 'expo';

import { API_URL } from '../constants/api';
// eslint-disable-next-line import/no-cycle
import store from '../redux/store';

export const query = async ({
  method = 'GET',
  endpoint = '/',
  data = null,
  headers = {},
  params = {},
}) =>
  // eslint-disable-next-line no-return-await
  await axios({
    method,
    url: API_URL + endpoint,
    data,
    params,
    headers: store.getState().user.isLogged
      ? { ...headers, token: await SecureStore.getItemAsync('token') }
      : headers,
  });
