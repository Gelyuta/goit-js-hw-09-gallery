// Задание:
// Создание и рендер разметки по массиву данных
//  galleryItems из app.js и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery 
// и получение url большого изображения.
// Открытие модального окна по клику на элементе 
// галереи.
// Подмена значения атрибута src элемента 
// img.lightbox__image.
// Закрытие модального окна по клику на кнопку
//  button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента 
// img.lightbox__image. Это необходимо для того, 
// чтобы при следующем открытии модального окна,
//  пока грузится изображение, мы не видели предыдущее.

// ********************************************
// Дополнительно:
// Закрытие модального окна по клику на 
// div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом 
// модальном окне клавишами "влево" и "вправо".

import galleryItems from "./app"

// Галерея 
const galleryEl = document.querySelector('.js-gallery');

const imagesMarkup = createGalleryImagesMarkup(galleryItems);

galleryEl.insertAdjacentHTML('beforeend', imagesMarkup);

// console.log(createGalleryImagesMarkup(galleryItems))

function createGalleryImagesMarkup(galleryItems) {
 return galleryItems.map(({ preview, original, description }, index) => {
    return `
    <li class = "gallery__item">
    <a class = "gallery__link" href = "${original}">
    <img class = "gallery__image" src = "${preview}" alt = "${description}"  data-source = "${original}"  data-index = "${index}">
    </>
    </a>
    </li>
     `;
     
}).join(' ');
}

// Модалка 

const refs = {
  modalEl: document.querySelector('.js-lightbox'),
  overlayModalEl: document.querySelector('.lightbox__overlay'),
  btnCloseModalEl: document.querySelector('[data-action="close-lightbox"]'),
  imageEl: document.querySelector('.lightbox__image')
}

galleryEl.addEventListener('click', onClickGalleryImage)

function onClickGalleryImage (e){
e.preventDefault();

if(!e.target.classList.contains('gallery__image')){
  return
}
// console.log(e.target.dataset.source)

refs.modalEl.classList.add('is-open')
window.addEventListener('keydown', onEskPress)

refs.imageEl.src = e.target.dataset.source
refs.btnCloseModalEl.addEventListener('click', onCloseModal)
refs.overlayModalEl.addEventListener('click', onOverlayClick)

// console.log(refs.imageEl)
}

function onCloseModal() {
  window.removeEventListener('keydown', onEskPress);
  refs.modalEl.classList.remove('is-open');
  refs.imageEl.src = '';
  refs.btnCloseModalEl.removeEventListener('click', onCloseModal)
  refs.overlayModalEl.removeEventListener('click', onOverlayClick)
}

function onOverlayClick(e) {
  if(e.currentTarget === e.target){
    onCloseModal() 
  }
}

function onEskPress(e) {
if(e.code === 'Escape'){
  onCloseModal() 
  }
}

// Пролистывание галереи




