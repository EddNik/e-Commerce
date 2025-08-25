// функції модального вікна (відкриття, закриття і так далі).

import { refs } from './refs';

export function openModal() {
  refs.modal.classList.add('modal--is-open');
  refs.modalClose.addEventListener('click', closeModal);

  document.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      closeModal();
    }
    return;
  });
}

// export function closeModal() {
//   refs.modalClose.addEventListener('click', () => {
//     refs.modal.classList.remove('modal--is-open');
//   });
// }
function closeModal() {
  refs.modal.classList.remove('modal--is-open');
  refs.modalClose.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', closeModal);
}
