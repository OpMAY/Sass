'use strict';
$(document).ready(function() {
  $('[data-href]').on('click', function () {
    window.location.href = $(this).data().href;
  })
  console.log('common.js execute');
});
