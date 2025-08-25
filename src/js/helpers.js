// допоміжні функції, які знадобляться для реалізації завдання

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { refs } from './refs';

export const iziToastOption = {
  timeout: 5000,
  theme: 'dark',
  messageColor: 'white',
  //   icon: 'custom-svg-icon',
  iconColor: '#FFFFFF',
  closeOnClick: true,
  backgroundColor: '#ef4040',
  position: 'topCenter',
};

export function changeActiveButton(event) {
  //   [...event.currentTarget.children].forEach(element => {
  //     [...element.children].forEach(element => {
  //       if (element.classList.contains(className)) {
  //         element.classList.remove(className);
  //       }
  //       event.target.classList.add(className);
  //     });
  //   });

  const onClickButton = document.querySelectorAll('.categories__btn');
  onClickButton.forEach(element => {
    if (element.classList.contains('categories__btn--active')) {
      element.classList.remove('categories__btn--active');
    }
    event.target.classList.add('categories__btn--active');
  });
}

export function iziToastErrorMessage(error) {
  iziToastOption.message = error.message;
  iziToast.show(iziToastOption);
}

export function clearGallery() {
  refs.productsList.innerHTML = '';
}
