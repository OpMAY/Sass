'use strict';
$(document).ready(function() {
  $('[data-href]').on('click', function () {
    window.location.href = $(this).data().href;
  })

  $('input').on('focus', function () {
    let placeholder = $(this).attr('placeholder');
    $(this).attr('placeholder', '');
    $(this).data('op', placeholder);
  }).on('blur', function () {
    $(this).attr('placeholder', $(this).data().op);
    $(this).data('op', '');
  })

  $('#logout').on('click', function () {
    apiLogout().then((result) => {
      if (result.status === 'OK') {
        alert('로그아웃 되었습니다.');
        window.location.reload();
      } else {
      }
    })
  })

  console.log('common.js execute');
});
