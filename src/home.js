//Логіка сторінки Home

import {
  getAllProducts,
  getQueryProduct,
  onClearBtn,
  getCategoryProducts,
  getOneProduct,
} from './js/handlers';

import { refs } from './js/refs';

import { updateCartCount, updateWishCount, product } from './js/modal';

document.addEventListener('DOMContentLoaded', getAllProducts);

refs.categoriesList.addEventListener('click', async event => {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  product.categoryName = event.target.textContent;
  getCategoryProducts();
});

refs.productList.addEventListener('click', event => {
  if (event.target.nodeName === 'UL') {
    return;
  }
  getOneProduct(event);
});

refs.formSearch.addEventListener('submit', async event => {
  event.preventDefault();
  const query = event.target.searchValue.value.trim();
  getQueryProduct(query);
});

refs.clearBtn.addEventListener('click', onClearBtn);

updateCartCount();
updateWishCount();
getCategoryProducts();

// refs.categoriesList.addEventListener('click', event => {
//   const categoryName = event.target.textContent;
//   //   console.log(categoryName);
//   if (event.target.nodeName !== 'BUTTON') {
//     return;
//   }

//   getCategoryProducts(categoryName);
//   //   changeActiveButton(event);
// });

refs.formSearch.reset();
