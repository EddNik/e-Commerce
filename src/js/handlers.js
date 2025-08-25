// Функції, які передаються колбеками в addEventListners

import { getProductsEndpoint } from './products-api';
import {
  pageState,
  CATEGORY,
  LIMIT_SKIP,
  CATEGORY_LIST,
  SEARCH,
} from './constants';
import {
  renderCategoriesList,
  renderProducts,
  renderCardProduct,
} from './render-function';
import { refs } from './refs';

import { iziToastErrorMessage, clearGallery } from './helpers';
import { openModal } from './modal';

export async function loadHomePage() {
  pageState.currentPage = 1;
  // Обробка помилок в іншій асинхронній функції

  const nameRequestPerPage = LIMIT_SKIP + `${(pageState.currentPage - 1) * 12}`;
  try {
    const categories = await getProductsEndpoint(CATEGORY_LIST);
    console.log(nameRequestPerPage);
    renderCategoriesList(categories);

    const responseData = await getProductsEndpoint(nameRequestPerPage); // here there is response with data in variable in left part and in right part is Promise
    const { products } = responseData;
    console.log(responseData);
    renderProducts(products);

    pageState.totalProducts = responseData.total;

    if (pageState.totalProducts > 12) {
      refs.loadMoreBtn.classList.remove('is-hidden');
      refs.loadMoreBtn.addEventListener('click', loadMoreProducts);
    } else {
      refs.loadMoreBtn.classList.add('is-hidden');
      refs.loadMoreBtn.removeEventListener('click', loadMoreProducts);
    }
    pageState.totalProducts -= 12;
  } catch (error) {
    iziToastErrorMessage(error);
  }
}

export async function getCategoryProducts(categoryName) {
  clearGallery();
  pageState.currentPage = 1;
  let urlCategoryRequest = CATEGORY + categoryName;
  let urlRequestPerPage = LIMIT_SKIP + `${(pageState.currentPage - 1) * 12}`;

  if (categoryName !== 'All') {
    urlRequestPerPage = urlCategoryRequest + urlRequestPerPage;
  }
  console.log(urlRequestPerPage);
  try {
    const responseData = await getProductsEndpoint(urlRequestPerPage);
    const { products } = { ...responseData };
    console.log(products);

    pageState.totalProducts = responseData.total;

    console.log(pageState.totalProducts);
    if (Array.isArray(products) && products.length === 0) {
      refs.notFoundDiv.classList.add('not-found--visible');
    }
    renderProducts(products);

    if (pageState.totalProducts > 12) {
      refs.loadMoreBtn.classList.remove('is-hidden');
      refs.loadMoreBtn.addEventListener('click', loadMoreProducts);
    } else {
      refs.loadMoreBtn.classList.add('is-hidden');
      refs.loadMoreBtn.removeEventListener('click', loadMoreProducts);
    }
    pageState.totalProducts -= 12;
  } catch (error) {
    iziToastErrorMessage(error);
  }
}

export async function getCardProduct(event) {
  try {
    if (!event.target.closest('.products__item')) {
      return; // користувач клікнув між кнопками
    }

    const productID = event.target.closest('.products__item').dataset.id;
    const responseData = await getProductsEndpoint(`/${productID}`);
    console.log(responseData.tags);
    renderCardProduct({ ...responseData });
    openModal();
  } catch (error) {
    iziToastErrorMessage(error);
  }
}

export async function loadMoreProducts() {
  pageState.currentPage += 1;
  let urlCategoryRequest = CATEGORY + pageState.categoryName;
  if (pageState.categoryName === 'All' || pageState.categoryName === '') {
    urlCategoryRequest = '';
  }
  const nameRequestPerPage =
    urlCategoryRequest + LIMIT_SKIP + `${(pageState.currentPage - 1) * 12}`;
  try {
    console.log(nameRequestPerPage);
    const responseData = await getProductsEndpoint(nameRequestPerPage);
    const { products } = { ...responseData };

    renderProducts(products);

    if (pageState.totalProducts < 12) {
      refs.loadMoreBtn.classList.add('is-hidden');
      refs.loadMoreBtn.removeEventListener('click', loadMoreProducts);
    }
    pageState.totalProducts -= 12;
  } catch (error) {
    console.log(error);
  }
}
