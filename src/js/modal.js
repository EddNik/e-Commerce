// функції модального вікна (відкриття, закриття і так далі).

// зберігай функції модального вікна (відкриття, закриття і так далі).
// Додавання товарів у кошик.
// Додавання товарів у Wishlist.
import iziToast from 'izitoast';
import { refs } from './refs';
import { getLocalStorage, setLocalStorage } from './storage';
import { KEY } from './constants';

export const product = {
  id: null,
  categoryName: '',
  cartList: [],
  wishList: [],

  getId() {
    const modalProductContent = document.querySelector(
      '.modal-product__content'
    );
    if (!modalProductContent) return;
    this.id = modalProductContent.dataset.id;
  },

  getCartList() {
    this.cartList = getLocalStorage(KEY.CART_KEY);
  },

  getWishList() {
    this.wishList = getLocalStorage(KEY.WISH_KEY);
  },
};

export function openModal() {
  refs.modal.classList.add('modal--is-open');

  refs.modalClose.addEventListener('click', closeModal);
  refs.modalBackdrop.addEventListener('click', closeBackdrop);
  document.addEventListener('keydown', closeEscape);

  buyProduct();
  updateCart();
  updateWishList();

  selectProduct();
}

function closeModal() {
  refs.modal.classList.remove('modal--is-open');

  refs.modalClose.removeEventListener('click', closeModal);
  refs.modalBackdrop.removeEventListener('click', closeBackdrop);

  document.removeEventListener('keydown', closeEscape);
}

export function closeBackdrop(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

export function closeEscape(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function buyProduct() {
  const buyBtn = document.querySelector('.modal-product__buy-btn');

  buyBtn.addEventListener('click', () => {
    iziToast.success({ title: 'Success', message: 'Оформлення замовлення' });
  });
}

function updateCart() {
  product.getId();
  product.getCartList();

  const { cartList, id } = product;

  if (!cartList.includes(id)) {
    refs.cartBtn.textContent = 'Add to cart';
  } else {
    refs.cartBtn.textContent = 'Remove from cart';
  }
}
function updateWishList() {
  product.getId();
  product.getWishList();

  const { wishList, id } = product;

  if (!wishList.includes(id)) {
    refs.wishBtn.textContent = 'Add to Wishlist';
  } else {
    refs.wishBtn.textContent = 'Remove from Wishlist';
  }
}

function selectProduct() {
  product.getId();
  product.getCartList();
  product.getWishList();

  const { id, cartList, wishList } = product;

  const isWishlistPage = window.location.pathname.includes('/wishlist');
  const isCartlistPage = window.location.pathname.includes('/cart');

  refs.cartBtn.addEventListener('click', event => {
    if (!cartList.includes(id)) {
      cartList.push(id);
      setLocalStorage(KEY.CART_KEY, cartList);
      event.target.textContent = 'Remove from cart';
    } else {
      const productIndex = cartList.indexOf(id);
      cartList.splice(productIndex, 1);
      setLocalStorage(KEY.CART_KEY, cartList);
      event.target.textContent = 'Add to cart';

      if (isCartlistPage) {
        const productCard = document.querySelector(
          `.products__item[data-id="${id}"]`
        );
        if (productCard) {
          productCard.remove();
        }
      }
    }
    updateCartCount();
  });

  refs.wishBtn.addEventListener('click', event => {
    if (!wishList.includes(id)) {
      wishList.push(id);
      setLocalStorage(KEY.WISH_KEY, wishList);
      event.target.textContent = 'Remove from Wishlist';
    } else {
      const productIndex = cartList.indexOf(id);
      wishList.splice(productIndex, 1);
      setLocalStorage(KEY.WISH_KEY, wishList);
      event.target.textContent = 'Add to Wishlist';

      if (isWishlistPage) {
        const productCard = document.querySelector(
          `.products__item[data-id="${id}"]`
        );
        if (productCard) {
          productCard.remove();
        }
      }
    }
    updateWishCount();
  });
}

export function updateCartCount() {
  product.getCartList();
  refs.cartCount.textContent = product.cartList.length;
}

export function updateWishCount() {
  product.getWishList();
  refs.wishCount.textContent = product.wishList.length;
}
