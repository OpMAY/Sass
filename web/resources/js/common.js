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

  console.log('common.js execute');
});
