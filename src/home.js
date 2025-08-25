//Логіка сторінки Home

// import { getProductsEndpoint } from './js/products-api';
// import * as constants from './js/constants';
import {
  getCategoryProducts,
  loadHomePage,
  getCardProduct,
} from './js/handlers';
import { refs } from './js/refs';
import { pageState } from './js/constants';
import { changeActiveButton } from './js/helpers';

document.addEventListener('DOMContentLoaded', loadHomePage);
// document.addEventListener('DOMContentLoaded', loadProducts);

refs.categoriesList.addEventListener('click', event => {
  if (event.target.nodeName !== 'BUTTON') {
    return; // користувач клікнув між кнопками
  }

  pageState.categoryName = event.target.textContent;
  //   if (url === 'All') {
  //     getCategoryProducts();
  //     console.log(getCategoryProducts());
  //   } else {

  // console.log(constants.CATEGORY + url);
  getCategoryProducts(pageState.categoryName);
  //   }
  changeActiveButton(event);
  //   console.log(url);
});

// refs.productAll.addEventListener('click', event => {
//   console.log(event.elements);
// });

refs.productsList.addEventListener('click', event => {
  getCardProduct(event);
  // console.log(refs.modal);
  // console.log(productID);
});

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  console.log(refs.form.elements);
  pageState.query = form.elements['search-text'].value.trim();
});

// refs.modalClose.addEventListener('click', () => {
//   refs.modal.classList.remove('modal--is-open');
// });
