// Функції для роботи з бекендом
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

axios.defaults.baseURL = 'https://dummyjson.com/products';

export async function getProductsEndpoint(endpoint) {
  //   const response = await axios.get(endpoint);
  //   return response.data;

  return await axios(endpoint).then(response => {
    return response.data;
  }); //return array
}
