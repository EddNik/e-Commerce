// Функції, які передаються колбеками в addEventListners

import {
  fetchCategories,
  fetchProducts,
  fetchOneProduct,
  fetchQueryProduct,
  fetchCategoryProducts,
} from './products-api';

import {
  renderCategories,
  renderProducts,
  renderCartProduct,
} from './render-function';

import {
  activeCategoryBtn,
  iziToastErrorMessage,
  loadMoreVisibleStatus,
  clearGallery,
  showNotFoundProducts,
} from './helpers';

import { PAGE_SIZE } from './constants';
import { refs } from './refs';
import { openModal, product } from './modal';

import { setLocalStorage, getLocalStorage } from './storage';

let currentPage = 1;
let query;
let totalPages = 0;
let previousQuery;
let inputContext = refs.formSearch.querySelector('.search-form__input');

export async function getCategories() {
  try {
    const data = await fetchCategories();
    renderCategories(['All', ...data]);
    activeCategoryBtn();
  } catch (error) {
    iziToastErrorMessage({ message: 'Try again later!' });
  }
}

export async function getAllProducts() {
  getCategories();
  try {
    clearGallery();
    const data = await fetchProducts(currentPage);
    const { products } = data;
    renderProducts(products);

    refs.productList.addEventListener('click', event => {
      // користувач клікнув міжкартками товару
      if (event.target.nodeName === 'UL') {
        return;
      }
      getOneProduct(event);
    });

    const totalProducts = data.total;
    totalPages = Math.ceil(totalProducts / PAGE_SIZE);
    loadMoreVisibleStatus(currentPage, totalPages);
  } catch (error) {
    iziToastErrorMessage(error);
  }
}

export async function loadMoreProducts() {
  currentPage += 1;
  let data;
  try {
    if (query) {
      data = await fetchQueryProduct(query, currentPage);
    }

    if (product.categoryName === 'All' || product.categoryName === '') {
      data = await fetchProducts(currentPage);
    } else {
      data = await fetchCategoryProducts(product.categoryName, currentPage);
    }

    const { products } = data;
    renderProducts(products);
    const totalProducts = data.total;
    totalPages = Math.ceil(totalProducts / PAGE_SIZE);
    loadMoreVisibleStatus(currentPage, totalPages);
  } catch (error) {
    iziToastErrorMessage(error);
  }
}

export async function getCategoryProducts() {
  let data;
  currentPage = 1;

  try {
    clearGallery();
    if (product.categoryName === 'All' || product.categoryName === '') {
      data = await fetchProducts(currentPage);
    } else {
      data = await fetchCategoryProducts(product.categoryName, currentPage);
    }
    const { products } = data;
    if (Array.isArray(products) && products.length === 0) {
      refs.notFoundDiv.classList.add('not-found--visible');
    }
    renderProducts(products);

    const totalCategoryProducts = data.total;
    totalPages = Math.ceil(totalCategoryProducts / PAGE_SIZE);
    loadMoreVisibleStatus(currentPage, totalPages);
  } catch (error) {
    iziToastErrorMessage(error);
  }
}

export async function getOneProduct(event) {
  try {
    if (!event.target.closest('.products__item')) {
      return;
    }
    const productID = event.target.closest('.products__item').dataset.id;
    const data = await fetchOneProduct(`${productID}`);

    renderCartProduct(data);
    openModal();
  } catch (error) {
    iziToastErrorMessage(error);
  }
}

// refs.formSearch.addEventListener('submit', async event => {
//   event.preventDefault();

// window.location.href = './index.html';

export async function getQueryProduct(query) {
  try {
    if (!query) {
      refs.formSearch.reset();
      throw new Error('Sorry, this name images is empty. Please try again!');
    }

    if (query !== previousQuery) {
      currentPage = 1;
      previousQuery = query;
    }

    clearGallery();
    const data = await fetchQueryProduct(query, currentPage);
    const totalProducts = data.total;
    totalPages = Math.ceil(totalProducts / PAGE_SIZE);

    if (totalProducts === 0) {
      showNotFoundProducts();
    } else {
      renderProducts(data.products);
      loadMoreVisibleStatus(currentPage, totalPages);
    }
  } catch (error) {
    iziToastErrorMessage(error);
  }
}

export function onClearBtn() {
  inputContext.value = '';
  query = '';
  getAllProducts();
}

export async function selectedProducts(promises) {
  try {
    const selectedProductsObj = await Promise.all(promises);
    console.log(selectedProductsObj);
    renderProducts(selectedProductsObj);
  } catch (error) {
    iziToastErrorMessage(error);
  }

  refs.productList.addEventListener('click', event => {
    // користувач клікнув міжкартками товару
    if (event.target.nodeName === 'UL') {
      return;
    }
    getOneProduct(event);
  });
}

export async function addOneProductToList(productID) {
  try {
    const data = await fetchOneProduct(`${productID}`);

    const markup = renderCartProduct(data);

    console.log(markup);

    if (refs && refs.productList) {
      refs.productList.insertAdjacentHTML('afterbegin', markup);
    } else {
      console.error('Products list container not found');
    }
  } catch (error) {
    console.log(error);
  }
}
