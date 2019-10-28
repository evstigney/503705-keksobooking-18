'use strict';

(function () {
  var housingPhotoImg =
    '<img width="70" height="70" alt="Фото жилья" src="" id="images-preview" class="visually-hidden" style="border-radius: 5px;">';

  document.querySelector('.ad-form__photo').insertAdjacentHTML('afterbegin', housingPhotoImg);

  var avatar = new window.UserPhoto(
      document.querySelector('#avatar'),
      document.querySelector('img[alt="Аватар пользователя"]')
  );
  var housingPhoto = new window.UserPhoto(
      document.querySelector('#images'),
      document.querySelector('#images-preview')
  );

  avatar.upload();

  housingPhoto.fileChooser.addEventListener('change', function () {
    housingPhoto.preview.classList.remove('visually-hidden');
  });

  housingPhoto.upload();
})();
