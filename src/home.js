//Логіка сторінки Home

import {
  getCategories,
  getAllProducts,
  getQueryProduct,
  onClearBtn,
  getCategoryProducts,
} from './js/handlers';
import { refs } from './js/refs';

import { updateCartCount, updateWishCount } from './js/modal';

// const productID = getCartProduct();
getCategories();
getAllProducts();
getQueryProduct();
onClearBtn();
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
