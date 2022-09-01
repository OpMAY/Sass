$(document).ready(function () {
    initializeMovePageClickEventListener();
});

const initializeMovePageClickEventListener = () => {
    $('[data-href]').on('click', function (e) {
        const target = this;
        location.href = target.dataset.href;
    });
};

const createDatabaseElement = (database) => {
    return `<div class="col-4 mb-32">
              <div class="workspace" data-hash="${database.hash_no}">
                <div class="_info">
                  <div class="_title bold-h3 c-gray-dark-low ellipsis-one-line">
                    ${database.name}
                  </div>
                  <div class="_desc regular-p1 c-gray-dark-low mt-1 ellipsis-double-line">
                    ${database.description}
                  </div>
                </div>
                <div class="_sub-info ml-auto">
                  <div class="_users">
                    <img src="../../../resources/assets/images/sample/sample-user.png"/>
                    <img src="../../../resources/assets/images/sample/sample-user.png"/>
                  </div>
                  <div class="_type medium-h5 c-brand-orange mt-1 mb-auto">
                    ${database.database_type}
                  </div>
                </div>
                <div class="_options">
                  <div class="btn-group cursor-pointer dropright"
                       type="button"
                       data-toggle="dropdown"
                       aria-expanded="false">
                    <svg width="4" height="18" viewBox="0 0 4 18" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <circle cx="1.92857" cy="1.92857" r="1.92857" fill="#CCCCCC"/>
                      <circle cx="1.92857" cy="8.99998" r="1.92857" fill="#CCCCCC"/>
                      <circle cx="1.92857" cy="16.0714" r="1.92857" fill="#CCCCCC"/>
                    </svg>
                    <div class="dropdown-menu">
                      <!-- Dropdown menu links -->
                      <ul class="list-group table-option-list">
                        <li class="list-group-item list-group-item-action _update">데이터베이스 수정
                        </li>
                        <li class="list-group-item list-group-item-action _copy">데이터베이스 복사
                        </li>
                        <li class="list-group-item list-group-item-action _delete">데이터베이스 삭제
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
}