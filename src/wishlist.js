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

const response = wishList.map(id => fetchOneProduct(id));
// console.log(response);

selectedProducts(response);

function removeProductFromListPage(productID) {
  const productCard = document.querySelector(
    `.products__item[data-id="${productID}"]`
  );
  if (productCard) {
    productCard.remove();
  }
}

const isWishlistPage = window.location.pathname.includes('/wishlist');

console.log(window.location);
