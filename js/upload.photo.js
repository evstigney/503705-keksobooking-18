'use strict';

/**
 * Модуль для загрузки изображений пользователя
 */
(function () {
  var housingPhotoImg =
    '<img width="70" height="70" alt="Фото жилья" src="" id="images-preview" class="visually-hidden" style="border-radius: 5px;">';

  document.querySelector('.ad-form__photo').insertAdjacentHTML('afterbegin', housingPhotoImg);

  /**
   * Аватар пользователя
   */
  var avatar = new window.UserPhoto(
      document.querySelector('#avatar'),
      document.querySelector('img[alt="Аватар пользователя"]'),
      document.querySelector('.ad-form-header__drop-zone')
  );

  /**
   * Фото жилья
   */
  var housingPhoto = new window.UserPhoto(
      document.querySelector('#images'),
      document.querySelector('#images-preview'),
      document.querySelector('.ad-form__drop-zone')
  );

  avatar.uploadByClick();
  avatar.uploadByDnD();

  housingPhoto.uploadByClick();
  housingPhoto.uploadByDnD();
})();
