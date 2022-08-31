$(document).ready(function() {
  initializeMovePageClickEventListener();
});

const initializeMovePageClickEventListener = () => {
  $('[data-href]').on('click', function(e) {
    const target = this;
    location.href = target.dataset.href;
  });
};
