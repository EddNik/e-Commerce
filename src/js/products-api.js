// API ендпоінти:
// https://dummyjson.com/docs/products - документація бекенду, розділ продукти
// https://dummyjson.com/products?limit=10&skip=10 - отримати всі продукти з пагінацією
// https://dummyjson.com/products/1 - отримати один продукт по ID
// https://dummyjson.com/products/search?q=nail - пошук продукту по ключовому слову
// https://dummyjson.com/products/category-list - отримати список категорій продуктів
// https://dummyjson.com/products/category/smartphones - отримати продукти по категорії

import axios from 'axios';
import { BASE_URL, ENDPOINTS, PAGE_SIZE } from './constants';

axios.defaults.baseURL = BASE_URL;

export async function fetchCategories() {
  const { data } = await axios(`${ENDPOINTS.CATEGORIES}`);
  return data;
}

export async function fetchProducts(page) {
  const { data } = await axios(
    `${ENDPOINTS.ALL_PRODUCTS}${(page - 1) * PAGE_SIZE}`
  );
  return data;
}
export async function fetchCategoryProducts(categoryName, page) {
  const { data } = await axios(
    `${ENDPOINTS.CATEGORY_PRODUCTS}${categoryName}?${ENDPOINTS.PER_PAGE}${
      (page - 1) * PAGE_SIZE
    }`
  );

  console.log(
    `${ENDPOINTS.CATEGORY_PRODUCTS}${categoryName}?${ENDPOINTS.PER_PAGE}${
      (page - 1) * PAGE_SIZE
    }`
  );
  return data;
}

export async function fetchOneProduct(id) {
  const { data } = await axios(`${ENDPOINTS.ONE_PRODUCT}${id}`);
  return data;
}

export async function fetchQueryProduct(query, page) {
  const { data } = await axios(
    `${ENDPOINTS.QUERY_PRODUCT}${query}&${ENDPOINTS.PER_PAGE}${
      (page - 1) * PAGE_SIZE
    }`
  );
  return data;
}
