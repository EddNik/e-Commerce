//Логіка сторінки Wishlist
// import { iziToastErrorMessage } from './js/helpers';
import { product, updateCartCount, updateWishCount } from './js/modal';
// import { renderProducts } from './js/render-function';
import { fetchOneProduct } from './js/products-api';
import { selectedProducts } from './js/handlers';
// import { refs } from './js/refs';

updateCartCount();
updateWishCount();

product.getWishList();

const { wishList } = product;

getWishProducts();

// async function name() {
//     const response = wishList.map(id => await fetchOneProduct(id));
// console.log(response);
// }
const promiseArray = wishList.map(id => fetchOneProduct(id));
// console.log(promiseArray);

selectedProducts(promiseArray);

function removeProductFromListPage(productID) {
  const productCart = document.querySelector(
    `.products__item[data-id="${productID}"]`
  );
  if (productCart) {
    productCart.remove();
  }
}

const isWishlistPage = window.location.pathname.includes('/wishlist');

// console.log(window.location);
