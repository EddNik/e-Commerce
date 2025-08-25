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
  activeFirstBtn,
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
    activeFirstBtn();
  } catch (error) {
    iziToastErrorMessage({ message: 'Try again later!' });
  }
}

export async function getAllProducts() {
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
  console.log(product.categoryName);
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
    console.log(data);

    //

    const { products } = data;
    renderProducts(products);
    const totalProducts = data.total;
    totalPages = Math.ceil(totalProducts / PAGE_SIZE);
    loadMoreVisibleStatus(currentPage, totalPages);
  } catch (error) {
    iziToastErrorMessage(error);
  }
}

export function getCategoryProducts() {
  let data;

  refs.categoriesList.addEventListener('click', async event => {
    currentPage = 1;
    if (event.target.nodeName !== 'BUTTON') {
      return;
    }

    product.categoryName = event.target.textContent;

    // getCategoryProducts(product.categoryName);
    //   changeActiveButton(event);

    console.log(product.categoryName);

    try {
      clearGallery();
      if (product.categoryName === 'All' || product.categoryName === '') {
        data = await fetchProducts(currentPage);
      } else {
        data = await fetchCategoryProducts(product.categoryName, currentPage);
      }

      console.log(data);
      const { products } = data;
      console.log(products);
      console.log(currentPage);

      if (Array.isArray(products) && products.length === 0) {
        refs.notFoundDiv.classList.add('not-found--visible');
      }
      renderProducts(products);

      refs.productList.addEventListener('click', event => {
        // користувач клікнув міжкартками товару
        if (event.target.nodeName === 'UL') {
          return;
        }
        getOneProduct(event);
      });

      const totalCategoryProducts = data.total;
      totalPages = Math.ceil(totalCategoryProducts / PAGE_SIZE);
      loadMoreVisibleStatus(currentPage, totalPages);
    } catch (error) {
      iziToastErrorMessage(error);
    }
  });
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

export function getQueryProduct() {
  refs.formSearch.addEventListener('submit', async event => {
    event.preventDefault();

    // window.location.href = './index.html';
    query = event.target.searchValue.value.trim();
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
  });
}

export function onClearBtn() {
  refs.clearBtn.addEventListener('click', event => {
    event.preventDefault();
    inputContext.value = '';
    query = '';
    getAllProducts();
  });
}

export async function selectedProducts(response) {
  try {
    const selectedProducts = await Promise.all(response);
    console.log(selectedProducts);
    renderProducts(selectedProducts);
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
