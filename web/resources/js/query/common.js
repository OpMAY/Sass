$(document).ready(function() {
  initializeLeftSidebarClickEventListener();
  initializeMovePageClickEventListener();
});

const initializeLeftSidebarClickEventListener = () => {
  $('#plugin-left-sidebar ._left-plugin[data-type]').on('click', function() {
    const target = this;
    switch (target.dataset.type) {
      case 'query':
        console.log('location', location);
        location.href = '/web/WEB-INF/view/query/workspace.html';
        break;
    }
  });
};

const initializeMovePageClickEventListener = () => {
  $('[data-href]').on('click', function(e) {
    const target = this;
    location.href = target.dataset.href;
  });
};
