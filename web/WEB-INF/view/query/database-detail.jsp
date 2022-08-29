<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
          integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N"
          crossorigin="anonymous">
    <!-- Base -->
    <link rel="stylesheet" href="../../../resources/css/base/reset.css">
    <link rel="stylesheet" href="../../../resources/css/base/default.css">
    <link rel="stylesheet" href="../../../resources/css/base/common.css">
    <!-- Theme -->
    <link rel="stylesheet" href="../../../resources/css/theme/theme.css">
    <link rel="stylesheet" href="../../../resources/css/theme/query/theme.css">
    <!-- Layout -->
    <link rel="stylesheet" href="../../../resources/css/layout/layout.css">
    <link rel="stylesheet" href="../../../resources/css/layout/res-layout.css">
    <link rel="stylesheet" href="../../../resources/css/layout/query/layout.css">
    <!-- Plugin -->
    <!-- State -->
    <link rel="stylesheet" href="../../../resources/css/state/state.css">
    <link rel="stylesheet" href="../../../resources/css/state/res-state.css">
    <link rel="stylesheet" href="../../../resources/css/state/query/state.css">
    <!-- Module -->
    <link rel="stylesheet" href="../../../resources/css/module/okiwi-query.css">
    <link rel="stylesheet" href="../../../resources/css/module/okiwi-query-left.css">
    <link rel="stylesheet" href="../../../resources/css/module/auto-complete.css">
    <!-- Element -->
    <link rel="stylesheet" href="../../../resources/css/base/element.css">
    <link rel="stylesheet" href="../../../resources/css/base/query/element.css">
    <title>Okiwi Query Database - Detail</title>
</head>
<body>
<!-- Header -->
<header id="l-header" class="query-theme">
    <img class="mr-12" src="../../../resources/assets/images/icon/query/white-theme-logo-24x24.png"/>
    <span class="regular-h5 my-auto">qeuryPlug - 데이터베이스 ERD 및 SQL 자동 생성</span>
    <div class="_option ml-auto my-auto">
        <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM12 18.9643C11.408 18.9643 10.9286 18.4848 10.9286 17.8929C10.9286 17.3009 11.408 16.8214 12 16.8214C12.592 16.8214 13.0714 17.3009 13.0714 17.8929C13.0714 18.4848 12.592 18.9643 12 18.9643ZM13.6848 13.0848C13.4422 13.1785 13.2335 13.3431 13.0859 13.5572C12.9382 13.7712 12.8585 14.0248 12.8571 14.2848V14.8929C12.8571 15.0107 12.7607 15.1071 12.6429 15.1071H11.3571C11.2393 15.1071 11.1429 15.0107 11.1429 14.8929V14.317C11.1429 13.6982 11.3223 13.0875 11.6759 12.5786C12.0214 12.0804 12.5036 11.7 13.0714 11.483C13.9821 11.1321 14.5714 10.3688 14.5714 9.53571C14.5714 8.35446 13.417 7.39286 12 7.39286C10.583 7.39286 9.42857 8.35446 9.42857 9.53571V9.73929C9.42857 9.85714 9.33214 9.95357 9.21429 9.95357H7.92857C7.81071 9.95357 7.71429 9.85714 7.71429 9.73929V9.53571C7.71429 8.48304 8.175 7.5 9.01071 6.76875C9.81429 6.06429 10.875 5.67857 12 5.67857C13.125 5.67857 14.1857 6.06696 14.9893 6.76875C15.825 7.5 16.2857 8.48304 16.2857 9.53571C16.2857 11.0839 15.2652 12.4768 13.6848 13.0848Z"
                      fill="#222222"/>
            </svg>
        </div>
        <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_102_3910)">
                    <path d="M13.2936 2.19017e-06C13.6464 2.19017e-06 13.962 0.219602 14.0808 0.548402L14.928 2.8968C15.2316 2.9724 15.492 3.048 15.7128 3.1272C15.954 3.2136 16.2648 3.3444 16.6488 3.5232L18.6216 2.4792C18.7826 2.39389 18.9669 2.3631 19.1469 2.39144C19.327 2.41978 19.4929 2.50574 19.62 2.6364L21.3552 4.4304C21.5856 4.6692 21.6504 5.0184 21.5208 5.3232L20.5956 7.4916C20.7492 7.7736 20.8716 8.0148 20.9652 8.2164C21.066 8.436 21.1908 8.7384 21.3396 9.1284L23.496 10.0524C23.82 10.1904 24.0204 10.5144 23.9988 10.8612L23.8404 13.3512C23.8295 13.513 23.7714 13.668 23.6733 13.7971C23.5752 13.9261 23.4413 14.0235 23.2884 14.0772L21.246 14.8032C21.1872 15.0852 21.126 15.3264 21.0612 15.5304C20.9566 15.8455 20.8373 16.1554 20.7036 16.4592L21.7296 18.7272C21.802 18.8866 21.8215 19.0649 21.7852 19.2361C21.7489 19.4074 21.6588 19.5625 21.528 19.6788L19.5768 21.4212C19.4483 21.5355 19.2879 21.6077 19.1172 21.6283C18.9465 21.6489 18.7735 21.6168 18.6216 21.5364L16.6104 20.4708C16.2957 20.6374 15.9711 20.7845 15.6384 20.9112L14.76 21.24L13.98 23.4C13.9222 23.5582 13.8179 23.6952 13.6808 23.7931C13.5438 23.8909 13.3803 23.9451 13.212 23.9484L10.932 24C10.7591 24.0045 10.5891 23.9554 10.4453 23.8593C10.3016 23.7633 10.1911 23.625 10.1292 23.4636L9.20995 21.0312C8.89633 20.924 8.5858 20.808 8.27875 20.6832C8.02761 20.5745 7.78027 20.4572 7.53715 20.3316L5.25715 21.306C5.10692 21.3701 4.9413 21.3891 4.78044 21.3608C4.61959 21.3325 4.47044 21.258 4.35115 21.1464L2.66395 19.5636C2.53834 19.4463 2.45279 19.2924 2.41941 19.1238C2.38603 18.9552 2.40651 18.7803 2.47795 18.624L3.45835 16.488C3.32797 16.235 3.20708 15.9772 3.09595 15.7152C2.96623 15.3945 2.84618 15.0699 2.73595 14.742L0.587953 14.088C0.413354 14.0352 0.261066 13.9263 0.15474 13.7781C0.0484149 13.6299 -0.00599784 13.4507 -4.73183e-05 13.2684L0.0839527 10.9632C0.0899318 10.8128 0.136917 10.6669 0.219826 10.5413C0.302736 10.4156 0.418415 10.315 0.554353 10.2504L2.80795 9.168C2.91235 8.7852 3.00355 8.4876 3.08395 8.2704C3.19716 7.9803 3.32288 7.69523 3.46075 7.416L2.48395 5.352C2.40982 5.19526 2.38731 5.01905 2.41966 4.84871C2.452 4.67836 2.53753 4.52267 2.66395 4.404L4.34875 2.8128C4.46686 2.70141 4.61464 2.62652 4.77431 2.59714C4.93398 2.56776 5.09873 2.58515 5.24875 2.6472L7.52635 3.588C7.77835 3.42 8.00635 3.2844 8.21275 3.1752C8.45875 3.0444 8.78755 2.9076 9.20155 2.76L9.99355 0.550802C10.0521 0.389124 10.1591 0.24946 10.3 0.15088C10.4409 0.0522992 10.6088 -0.000391501 10.7808 2.19017e-06H13.2936ZM12.0288 8.4228C10.0284 8.4228 8.40715 10.0248 8.40715 12.0024C8.40715 13.98 10.0284 15.5832 12.0288 15.5832C14.028 15.5832 15.6492 13.98 15.6492 12.0024C15.6492 10.0248 14.0292 8.4228 12.0288 8.4228Z"
                          fill="#222222"/>
                </g>
                <defs>
                    <clipPath id="clip0_102_3910">
                        <rect width="24" height="24" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </div>
    </div>
</header>
<!-- Left Sidebar -->
<div id="plugin-left-sidebar">
    <div class="_plugin-container">
        <div class="_left-plugin" data-type="query">
            <img width="36" height="36" src="../../../resources/assets/images/sample/plugin-sample-1.png"/>
        </div>
        <div class="_left-plugin" data-type="query">
            <img width="36" height="36" src="../../../resources/assets/images/sample/plugin-sample-2.png"/>
        </div>
        <div class="_left-plugin" data-type="query">
            <img width="36" height="36" src="../../../resources/assets/images/sample/plugin-sample-3.png"/>
        </div>
        <div class="_left-plugin" data-type="query">
            <img width="36" height="36" src="../../../resources/assets/images/sample/plugin-sample-1.png"/>
        </div>
        <div class="_left-plugin" data-type="query">
            <img width="36" height="36" src="../../../resources/assets/images/sample/plugin-sample-2.png"/>
        </div>
        <div class="_left-plugin" data-type="query">
            <img width="36" height="36" src="../../../resources/assets/images/sample/plugin-sample-3.png"/>
        </div>
    </div>
</div>
<!-- Right Sidebar -->
<div id="right-sidebar" class="is-open">
    <div class="_right-menu is-open">
        <div class="_side-button-container">
            <div class="_side-toggle">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16 0C7.16364 0 0 7.16364 0 16C0 24.8364 7.16364 32 16 32C24.8364 32 32 24.8364 32 16C32 7.16364 24.8364 0 16 0ZM19.2102 11.2102C19.4751 10.9359 19.6217 10.5684 19.6184 10.1871C19.6151 9.80568 19.4621 9.44086 19.1925 9.17117C18.9228 8.90149 18.558 8.74852 18.1766 8.7452C17.7952 8.74189 17.4278 8.8885 17.1535 9.15345L11.3353 14.9716C11.0626 15.2444 10.9094 15.6143 10.9094 16C10.9094 16.3857 11.0626 16.7556 11.3353 17.0284L17.1535 22.8465C17.4278 23.1115 17.7952 23.2581 18.1766 23.2548C18.558 23.2515 18.9228 23.0985 19.1925 22.8288C19.4621 22.5591 19.6151 22.1943 19.6184 21.8129C19.6217 21.4316 19.4751 21.0641 19.2102 20.7898L14.4204 16L19.2102 11.2102Z"
                          fill="#F08705"/>
                </svg>
            </div>
            <div class="_side-simple" data-type="detail">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="15.5" fill="white" stroke="#E6E6E6"/>
                    <path d="M22.667 18.4997L16.0003 11.833L9.33366 18.4997"
                          stroke="#F08705"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="_side-sort">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="15.5" fill="white" stroke="#E6E6E6"/>
                    <rect x="9" y="9" width="3.5" height="3.5" rx="1" fill="#F08705"/>
                    <rect x="14.25" y="9" width="3.5" height="3.5" rx="1" fill="#F08705"/>
                    <rect x="19.5" y="9" width="3.5" height="3.5" rx="1" fill="#F08705"/>
                    <rect x="9" y="14.25" width="3.5" height="3.5" rx="1" fill="#F08705"/>
                    <rect x="14.25" y="14.25" width="3.5" height="3.5" rx="1" fill="#F08705"/>
                    <rect x="19.5" y="14.25" width="3.5" height="3.5" rx="1" fill="#F08705"/>
                    <rect x="9" y="19.5" width="3.5" height="3.5" rx="1" fill="#F08705"/>
                    <rect x="14.25" y="19.5" width="3.5" height="3.5" rx="1" fill="#F08705"/>
                    <rect x="19.5" y="19.5" width="3.5" height="3.5" rx="1" fill="#F08705"/>
                </svg>
            </div>
            <div class="_side-save">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="15.5" fill="white" stroke="#E6E6E6"/>
                    <path d="M20.5264 9H10.75C9.78663 9 9 9.7875 9 10.75V21.25C9 22.2125 9.78663 23 10.75 23H21.25C22.2134 23 23 22.2125 23 21.25V11.7361L20.5264 9ZM19.5 14.25C19.5 14.7304 19.1062 15.125 18.625 15.125H13.375C12.8937 15.125 12.5 14.7304 12.5 14.25V9.875H19.5V14.25ZM18.625 10.75H16.875V14.25H18.625V10.75Z"
                          fill="#F08705"/>
                </svg>
            </div>
            <div class="_side-add">
                <div class="bold-h6 c-basic-white bg-brand-orange">
                    테이블 추가
                </div>
            </div>
        </div>
        <div class="container-fluid px-0 _info-container">
            <div class="row mx-0">
                <div class="col-12 pl-16 pr-16">
                    <div class="d-flex _title">
                        <div class="_name medium-h3">
                            Sustable
                        </div>
                        <div class="_version regular-h6 ml-8 mt-auto">
                            0.0.2
                        </div>
                    </div>
                    <div class="d-flex _database mt-1">
                        <div class="_type c-brand-orange">
                            MySQL
                        </div>
                    </div>
                    <div class="d-flex _search mt-16 mb-16">
                        <div class="form-group inner-append is-append w-100">
                            <input class="form-control form-general is-disabled"
                                   type="text"
                                   name="search"
                                   placeholder="테이블 및 컬럼을 입력해주세요."/>
                            <p class="cursor-pointer">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.0262 13.8478L18.5953 17.4162L17.4162 18.5953L13.8478 15.0262C12.5201 16.0905 10.8687 16.6694 9.16699 16.667C5.02699 16.667 1.66699 13.307 1.66699 9.16699C1.66699 5.02699 5.02699 1.66699 9.16699 1.66699C13.307 1.66699 16.667 5.02699 16.667 9.16699C16.6694 10.8687 16.0905 12.5201 15.0262 13.8478ZM13.3545 13.2295C14.4121 12.1419 15.0027 10.684 15.0003 9.16699C15.0003 5.94366 12.3895 3.33366 9.16699 3.33366C5.94366 3.33366 3.33366 5.94366 3.33366 9.16699C3.33366 12.3895 5.94366 15.0003 9.16699 15.0003C10.684 15.0027 12.1419 14.4121 13.2295 13.3545L13.3545 13.2295Z"
                                          fill="#CCCCCC"/>
                                </svg>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="_scroll-container">
            <div class="container-fluid px-0">
                <div class="row mx-0">
                    <div class="col-12 px-0">
                        <div class="accordion" id="list-tables"></div>
                    </div>
                </div>
            </div>
            <div class="container-fluid px-0">
                <div class="row mx-0">
                    <div class="col-12 px-0 text-right">
                        <div class="_right-menu-option _create" onclick="createTableList('#list-tables','writable')">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M10.0002 0.833374C4.93766 0.833374 0.833496 4.93754 0.833496 10C0.833496 15.0625 4.93766 19.1667 10.0002 19.1667C15.0627 19.1667 19.1668 15.0625 19.1668 10C19.1668 4.93754 15.0627 0.833374 10.0002 0.833374ZM10.8335 13.3334C10.8335 13.5544 10.7457 13.7664 10.5894 13.9226C10.4331 14.0789 10.2212 14.1667 10.0002 14.1667C9.77915 14.1667 9.56719 14.0789 9.41091 13.9226C9.25463 13.7664 9.16683 13.5544 9.16683 13.3334V10.8334H6.66683C6.44582 10.8334 6.23385 10.7456 6.07757 10.5893C5.92129 10.433 5.8335 10.2211 5.8335 10C5.8335 9.77903 5.92129 9.56707 6.07757 9.41079C6.23385 9.25451 6.44582 9.16671 6.66683 9.16671H9.16683V6.66671C9.16683 6.44569 9.25463 6.23373 9.41091 6.07745C9.56719 5.92117 9.77915 5.83337 10.0002 5.83337C10.2212 5.83337 10.4331 5.92117 10.5894 6.07745C10.7457 6.23373 10.8335 6.44569 10.8335 6.66671V9.16671H13.3335C13.5545 9.16671 13.7665 9.25451 13.9228 9.41079C14.079 9.56707 14.1668 9.77903 14.1668 10C14.1668 10.2211 14.079 10.433 13.9228 10.5893C13.7665 10.7456 13.5545 10.8334 13.3335 10.8334H10.8335V13.3334Z"
                                      fill="black"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Tables Global Option-->
<ul id="table-option-list" class="list-group table-option-list" style="display: none;">
    <li class="list-group-item list-group-item-action _modify">테이블 수정
    </li>
    <li class="list-group-item list-group-item-action _duplicate">테이블 복사
    </li>
    <li class="list-group-item list-group-item-action _sql">테이블 SQL 생성
    </li>
    <li class="list-group-item list-group-item-action _data">테스트 데이터 생성
    </li>
    <li class="list-group-item list-group-item-action _view">컬럼 전체 보기
    </li>
    <li class="list-group-item list-group-item-action _delete">테이블 삭제
    </li>
</ul>
<!-- Context Menu Option -->
<!--<ul id="context-menu" class="list-group dropright" style="display: none;">
  <li class="list-group-item list-group-item-action _delete">삭제
  </li>
  <li class="list-group-item list-group-item-action _view"
      data-toggle="dropdown"
      aria-expanded="false"
      id="dropdownMenu1">
    PK,FK 보기
    <div class="dropdown-menu" aria-labelledby="dropdownMenu1"></div>
  </li>
</ul>-->
<div class="_right-option _create-sql">
    <div class="bold-h6 c-basic-white bg-brand-orange">
        데이터베이스 생성 SQL
    </div>
</div>
<div class="_right-option _scale-up">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="15.5" fill="white" stroke="#E6E6E6"/>
        <path d="M16 9C16.2321 9 16.4546 9.09219 16.6187 9.25628C16.7828 9.42038 16.875 9.64294 16.875 9.875V15.125H22.125C22.3571 15.125 22.5796 15.2172 22.7437 15.3813C22.9078 15.5454 23 15.7679 23 16C23 16.2321 22.9078 16.4546 22.7437 16.6187C22.5796 16.7828 22.3571 16.875 22.125 16.875H16.875V22.125C16.875 22.3571 16.7828 22.5796 16.6187 22.7437C16.4546 22.9078 16.2321 23 16 23C15.7679 23 15.5454 22.9078 15.3813 22.7437C15.2172 22.5796 15.125 22.3571 15.125 22.125V16.875H9.875C9.64294 16.875 9.42038 16.7828 9.25628 16.6187C9.09219 16.4546 9 16.2321 9 16C9 15.7679 9.09219 15.5454 9.25628 15.3813C9.42038 15.2172 9.64294 15.125 9.875 15.125H15.125V9.875C15.125 9.64294 15.2172 9.42038 15.3813 9.25628C15.5454 9.09219 15.7679 9 16 9Z"
              fill="#F08705"/>
    </svg>
</div>
<div class="_right-option _scale-down">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="15.5" fill="white" stroke="#E6E6E6"/>
        <line x1="10" y1="16" x2="22" y2="16" stroke="#F08705" stroke-width="2" stroke-linecap="round"/>
    </svg>
</div>
<!-- Table Container -->
<div class="table-container"></div>

<!-- Database Create SQL Container -->
<div id="database-editor-container">
    <div class="database-editor-container">
        <div class="_option _close">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16 0C7.16364 0 0 7.16364 0 16C0 24.8364 7.16364 32 16 32C24.8364 32 32 24.8364 32 16C32 7.16364 24.8364 0 16 0ZM19.2102 11.2102C19.4751 10.9359 19.6217 10.5684 19.6184 10.1871C19.6151 9.80568 19.4621 9.44086 19.1925 9.17117C18.9228 8.90149 18.558 8.74852 18.1766 8.7452C17.7952 8.74189 17.4278 8.8885 17.1535 9.15345L11.3353 14.9716C11.0626 15.2444 10.9094 15.6143 10.9094 16C10.9094 16.3857 11.0626 16.7556 11.3353 17.0284L17.1535 22.8465C17.4278 23.1115 17.7952 23.2581 18.1766 23.2548C18.558 23.2515 18.9228 23.0985 19.1925 22.8288C19.4621 22.5591 19.6151 22.1943 19.6184 21.8129C19.6217 21.4316 19.4751 21.0641 19.2102 20.7898L14.4204 16L19.2102 11.2102Z"
                      fill="#F08705"/>
            </svg>
        </div>
        <div class="_option _copy">
            <button type="button" class="btn btn-outline-gray-high-medium">복사하기</button>
        </div>
        <div class="_option _save">
            <button type="button" class="btn btn-brand">
                <div class="d-flex">
                    <svg class="my-auto mr-8"
                         width="14"
                         height="14"
                         viewBox="0 0 14 14"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5264 0H1.75C0.786625 0 0 0.7875 0 1.75V12.25C0 13.2125 0.786625 14 1.75 14H12.25C13.2134 14 14 13.2125 14 12.25V2.73612L11.5264 0ZM10.5 5.25C10.5 5.73037 10.1062 6.125 9.625 6.125H4.375C3.89375 6.125 3.5 5.73037 3.5 5.25V0.875H10.5V5.25ZM9.625 1.75H7.875V5.25H9.625V1.75Z"
                              fill="white"/>
                    </svg>
                    <span class="my-auto">파일로 저장</span>
                </div>
            </button>
        </div>
        <div class="database-editor">
            <div class="_option _search d-none">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" fill="white" stroke="#E6E6E6"/>
                    <path d="M20.0482 19.0737L23 22.0248L22.0248 23L19.0737 20.0482C17.9757 20.9285 16.6099 21.4072 15.2026 21.4052C11.7788 21.4052 9 18.6265 9 15.2026C9 11.7788 11.7788 9 15.2026 9C18.6265 9 21.4052 11.7788 21.4052 15.2026C21.4072 16.6099 20.9285 17.9757 20.0482 19.0737ZM18.6657 18.5624C19.5404 17.6629 20.0289 16.4572 20.0269 15.2026C20.0269 12.5369 17.8677 10.3784 15.2026 10.3784C12.5369 10.3784 10.3784 12.5369 10.3784 15.2026C10.3784 17.8677 12.5369 20.0269 15.2026 20.0269C16.4572 20.0289 17.6629 19.5404 18.5624 18.6657L18.6657 18.5624Z"
                          fill="#F08705"/>
                </svg>
            </div>
            <div class="_option _update-check">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="16" fill="#F08705"/>
                    <rect width="18" height="18" transform="translate(7 7)" fill="#F08705"/>
                    <path d="M10 16L14.5 20.5L22 11.5"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="_option _update">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="15.5" fill="white" stroke="#E6E6E6"/>
                    <path d="M9.77126 22.9962C9.66468 22.996 9.5593 22.9736 9.46183 22.9305C9.36436 22.8874 9.27693 22.8245 9.20509 22.7457C9.13196 22.6677 9.07615 22.575 9.04133 22.4739C9.00651 22.3727 8.99347 22.2654 9.00305 22.1588L9.19126 20.0893L17.8858 11.3978L20.603 14.1142L11.9107 22.8049L9.84117 22.9931C9.81793 22.9952 9.7946 22.9963 9.77126 22.9962ZM21.1453 13.5711L18.4289 10.8547L20.0583 9.2253C20.1297 9.15388 20.2144 9.09722 20.3076 9.05856C20.4009 9.0199 20.5009 9 20.6018 9C20.7028 9 20.8027 9.0199 20.896 9.05856C20.9893 9.09722 21.074 9.15388 21.1453 9.2253L22.7747 10.8547C22.8461 10.926 22.9028 11.0107 22.9414 11.104C22.9801 11.1973 23 11.2972 23 11.3982C23 11.4991 22.9801 11.5991 22.9414 11.6924C22.9028 11.7856 22.8461 11.8703 22.7747 11.9417L21.1461 13.5703L21.1453 13.5711Z"
                          fill="#F08705"/>
                </svg>
            </div>
            <div class="_editor medium-h5 c-gray-dark-low">
                <div>
                    <div>
                        <div>-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.</div>
                        <div><br></div>
                        <div>-- Company Table Create SQL</div>
                        <div>CREATE TABLE Company</div>
                        <div>(</div>
                        <div>&nbsp; &nbsp; `no`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; INT&nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp;
                            &nbsp; &nbsp;NOT NULL&nbsp; &nbsp; AUTO_INCREMENT,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `companyID`&nbsp; &nbsp; &nbsp;VARCHAR(100)&nbsp; &nbsp; NOT NULL,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `businessCode`&nbsp; VARCHAR(300)&nbsp; &nbsp; NOT NULL,&nbsp;</div>
                        <div>&nbsp; &nbsp; `name`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; VARCHAR(100)&nbsp; &nbsp; NOT NULL,&nbsp;</div>
                        <div>&nbsp; &nbsp; `createDate`&nbsp; &nbsp; DATETIME&nbsp; &nbsp; &nbsp; &nbsp; NOT
                            NULL,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; &nbsp;PRIMARY KEY (no)</div>
                        <div>);</div>
                        <div><br></div>
                        <div>ALTER TABLE Company COMMENT '기업';</div>
                        <div><br></div>
                        <div><br></div>
                        <div>-- QueryPlug Table Create SQL</div>
                        <div>CREATE TABLE QueryPlug</div>
                        <div>(</div>
                        <div>&nbsp; &nbsp; `no`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;INT&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp;NOT
                            NULL&nbsp; &nbsp; COMMENT 'ERD 고유 KEY',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `companyNo`&nbsp; INT&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;NOT
                            NULL,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `type`&nbsp; &nbsp; &nbsp; &nbsp;VARCHAR(50)&nbsp; &nbsp; &nbsp;NOT NULL&nbsp;
                            &nbsp;
                            COMMENT '연결 database type',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `name`&nbsp; &nbsp; &nbsp; &nbsp;VARCHAR(100)&nbsp; &nbsp; NOT NULL&nbsp;
                            &nbsp; COMMENT
                            '이름',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `dbVersion`&nbsp; VARCHAR(45)&nbsp; &nbsp; &nbsp;NOT NULL&nbsp; &nbsp;
                            COMMENT '연결
                            database version',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; &nbsp;PRIMARY KEY (no)</div>
                        <div>);</div>
                        <div><br></div>
                        <div>ALTER TABLE QueryPlug COMMENT 'erd';</div>
                        <div><br></div>
                        <div>ALTER TABLE QueryPlug</div>
                        <div>&nbsp; &nbsp; ADD CONSTRAINT FK_QueryPlug_companyNo_Company_no FOREIGN KEY (companyNo)
                        </div>
                        <div>&nbsp; &nbsp; &nbsp; &nbsp; REFERENCES Company (no) ON DELETE RESTRICT ON UPDATE
                            RESTRICT;
                        </div>
                        <div><br></div>
                        <div><br></div>
                        <div>-- DataBase Table Create SQL</div>
                        <div>CREATE TABLE DataBase</div>
                        <div>(</div>
                        <div>&nbsp; &nbsp; `no`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;VARCHAR(300)&nbsp; &nbsp; NOT
                            NULL&nbsp;
                            &nbsp; COMMENT '스키마 고유 KEY',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `queryPlugNo`&nbsp; INT&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;NOT
                            NULL&nbsp;
                            &nbsp; COMMENT 'ERD 고유 KEY',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `name`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;VARCHAR(45)&nbsp; &nbsp; &nbsp;NOT
                            NULL&nbsp;
                            &nbsp; COMMENT '이름',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `description`&nbsp; VARCHAR(300)&nbsp; &nbsp; NOT NULL,&nbsp;</div>
                        <div>&nbsp; &nbsp; &nbsp;PRIMARY KEY (no)</div>
                        <div>);</div>
                        <div><br></div>
                        <div>ALTER TABLE DataBase COMMENT '스키마';</div>
                        <div><br></div>
                        <div>ALTER TABLE DataBase</div>
                        <div>&nbsp; &nbsp; ADD CONSTRAINT FK_DataBase_queryPlugNo_QueryPlug_no FOREIGN KEY
                            (queryPlugNo)
                        </div>
                        <div>&nbsp; &nbsp; &nbsp; &nbsp; REFERENCES QueryPlug (no) ON DELETE RESTRICT ON UPDATE
                            RESTRICT;
                        </div>
                        <div><br></div>
                        <div><br></div>
                        <div>-- table Table Create SQL</div>
                        <div>CREATE TABLE table</div>
                        <div>(</div>
                        <div>&nbsp; &nbsp; `no`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;VARCHAR(300)&nbsp; &nbsp;
                            NOT NULL&nbsp;
                            &nbsp; COMMENT '테이블 고유 KEY',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `dataBaseNo`&nbsp; &nbsp; &nbsp;VARCHAR(300)&nbsp; &nbsp; NOT NULL&nbsp;
                            &nbsp; COMMENT
                            '스키마 고유 KEY',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `name`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;VARCHAR(45)&nbsp; &nbsp;
                            &nbsp;NOT NULL&nbsp;
                            &nbsp; COMMENT '이름',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `logicalName`&nbsp; &nbsp; VARCHAR(45)&nbsp; &nbsp; &nbsp;NULL&nbsp; &nbsp;
                            &nbsp; &nbsp;
                            COMMENT '논리적 이름',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `comment`&nbsp; &nbsp; &nbsp; &nbsp; VARCHAR(45)&nbsp; &nbsp; &nbsp;NULL&nbsp;
                            &nbsp;
                            &nbsp; &nbsp; COMMENT '코멘트',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `hasPrimaryKey`&nbsp; TINYINT(1)&nbsp; &nbsp; &nbsp; NOT NULL&nbsp; &nbsp;
                            COMMENT 'PK 존재
                            하는지',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `hasForeignKey`&nbsp; TINYINT(1)&nbsp; &nbsp; &nbsp; NOT NULL&nbsp; &nbsp;
                            COMMENT 'FK 존재
                            하는지',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; &nbsp;PRIMARY KEY (no)</div>
                        <div>);</div>
                        <div><br></div>
                        <div>ALTER TABLE table COMMENT '테이블';</div>
                        <div><br></div>
                        <div>ALTER TABLE table</div>
                        <div>&nbsp; &nbsp; ADD CONSTRAINT FK_table_dataBaseNo_DataBase_no FOREIGN KEY (dataBaseNo)</div>
                        <div>&nbsp; &nbsp; &nbsp; &nbsp; REFERENCES DataBase (no) ON DELETE RESTRICT ON UPDATE
                            RESTRICT;
                        </div>
                        <div><br></div>
                        <div><br></div>
                        <div>-- column Table Create SQL</div>
                        <div>CREATE TABLE column</div>
                        <div>(</div>
                        <div>&nbsp; &nbsp; `no`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;VARCHAR(300)&nbsp;
                            &nbsp; NOT
                            NULL&nbsp; &nbsp; COMMENT '컬럼 고유 KEY',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `tableNo`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; VARCHAR(300)&nbsp; &nbsp; NOT
                            NULL&nbsp;
                            &nbsp; COMMENT '테이블 고유 KEY',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `order`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; INT&nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp;
                            &nbsp; &nbsp;NOT NULL&nbsp; &nbsp; COMMENT '순서',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `name`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;VARCHAR(45)&nbsp;
                            &nbsp; &nbsp;NOT
                            NULL&nbsp; &nbsp; COMMENT '이름',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `logicalName`&nbsp; &nbsp; &nbsp; VARCHAR(45)&nbsp; &nbsp; &nbsp;NULL&nbsp;
                            &nbsp; &nbsp;
                            &nbsp; COMMENT '논리적 이름',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `comment`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; VARCHAR(45)&nbsp; &nbsp; &nbsp;NULL&nbsp;
                            &nbsp; &nbsp; &nbsp; COMMENT '코멘트',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `isPrimaryKey`&nbsp; &nbsp; &nbsp;TINYINT(1)&nbsp; &nbsp; &nbsp; NOT NULL&nbsp;
                            &nbsp;
                            COMMENT 'primary☆key 인지',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `isAutoIncrement`&nbsp; TINYINT(1)&nbsp; &nbsp; &nbsp; NOT NULL&nbsp; &nbsp;
                            COMMENT '자동
                            증가 여부',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `isUnique`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;TINYINT(1)&nbsp; &nbsp; &nbsp;
                            NOT NULL&nbsp;
                            &nbsp; COMMENT '고유 값 여부',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `isForeignKey`&nbsp; &nbsp; &nbsp;TINYINT(1)&nbsp; &nbsp; &nbsp; NOT NULL&nbsp;
                            &nbsp;
                            COMMENT '외래키 여부',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `isNullable`&nbsp; &nbsp; &nbsp; &nbsp;TINYINT(1)&nbsp; &nbsp; &nbsp; NOT
                            NULL&nbsp;
                            &nbsp; COMMENT 'null 여부',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `type`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;VARCHAR(45)&nbsp;
                            &nbsp; &nbsp;NOT
                            NULL&nbsp; &nbsp; COMMENT '컬럼 data type',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `defaultValue`&nbsp; &nbsp; &nbsp;VARCHAR(45)&nbsp; &nbsp; &nbsp;NULL&nbsp;
                            &nbsp; &nbsp;
                            &nbsp; COMMENT '기본 값',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `size`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;INT&nbsp; &nbsp; &nbsp;
                            &nbsp;
                            &nbsp; &nbsp; &nbsp;NULL&nbsp; &nbsp; &nbsp; &nbsp; COMMENT '컬럼 data size',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; &nbsp;PRIMARY KEY (no)</div>
                        <div>);</div>
                        <div><br></div>
                        <div>ALTER TABLE column COMMENT '컬럼';</div>
                        <div><br></div>
                        <div>ALTER TABLE column</div>
                        <div>&nbsp; &nbsp; ADD CONSTRAINT FK_column_tableNo_table_no FOREIGN KEY (tableNo)</div>
                        <div>&nbsp; &nbsp; &nbsp; &nbsp; REFERENCES table (no) ON DELETE RESTRICT ON UPDATE RESTRICT;
                        </div>
                        <div><br></div>
                        <div><br></div>
                        <div>-- User Table Create SQL</div>
                        <div>CREATE TABLE User</div>
                        <div>(</div>
                        <div>&nbsp; &nbsp; `no`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; INT&nbsp;
                            &nbsp;
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;NOT NULL&nbsp; &nbsp; AUTO_INCREMENT,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `name`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; VARCHAR(50)&nbsp;
                            &nbsp;
                            &nbsp;NOT NULL,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `email`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;VARCHAR(50)&nbsp;
                            &nbsp;
                            &nbsp;NOT NULL,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `phone`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;VARCHAR(50)&nbsp;
                            &nbsp;
                            &nbsp;NOT NULL,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `password`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; VARCHAR(300)&nbsp; &nbsp;
                            NOT NULL,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `agreeData`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;JSON&nbsp; &nbsp; &nbsp;
                            &nbsp;
                            &nbsp; &nbsp; NOT NULL,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `marketingAgree`&nbsp; &nbsp; &nbsp; TINYINT(1)&nbsp; &nbsp; &nbsp; NOT NULL,&nbsp;</div>
                        <div>&nbsp; &nbsp; `marketingAgreeDate`&nbsp; DATETIME&nbsp; &nbsp; &nbsp; &nbsp; NULL,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `profileImg`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; VARCHAR(500)&nbsp; &nbsp;
                            NULL,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `pluginAlarm`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;TINYINT(1)&nbsp; &nbsp; &nbsp;
                            NOT NULL,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `serviceAlarm`&nbsp; &nbsp; &nbsp; &nbsp; TINYINT(1)&nbsp; &nbsp; &nbsp; NOT
                            NULL,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `createDate`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; DATETIME&nbsp; &nbsp; &nbsp;
                            &nbsp; NOT
                            NULL,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `lastLoginDate`&nbsp; &nbsp; &nbsp; &nbsp;DATETIME&nbsp; &nbsp; &nbsp; &nbsp;
                            NOT NULL,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; &nbsp;PRIMARY KEY (no)</div>
                        <div>);</div>
                        <div><br></div>
                        <div>ALTER TABLE User COMMENT '유저';</div>
                        <div><br></div>
                        <div><br></div>
                        <div>-- history Table Create SQL</div>
                        <div>CREATE TABLE history</div>
                        <div>(</div>
                        <div>&nbsp; &nbsp; `dataBaseNo`&nbsp; &nbsp;VARCHAR(300)&nbsp; &nbsp; NOT NULL&nbsp; &nbsp;
                            COMMENT '스키마 고유
                            KEY',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `schema`&nbsp; &nbsp; &nbsp; &nbsp;JSON&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; NOT NULL&nbsp;
                            &nbsp; COMMENT '스키마 데이터',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `createdDate`&nbsp; DATETIME&nbsp; &nbsp; &nbsp; &nbsp; NOT NULL&nbsp; &nbsp;
                            COMMENT '기록
                            생성 일자'
                        </div>
                        <div>);</div>
                        <div><br></div>
                        <div>ALTER TABLE history COMMENT '저장 기록';</div>
                        <div><br></div>
                        <div>ALTER TABLE history</div>
                        <div>&nbsp; &nbsp; ADD CONSTRAINT FK_history_dataBaseNo_DataBase_no FOREIGN KEY (dataBaseNo)
                        </div>
                        <div>&nbsp; &nbsp; &nbsp; &nbsp; REFERENCES DataBase (no) ON DELETE RESTRICT ON UPDATE
                            RESTRICT;
                        </div>
                        <div><br></div>
                        <div><br></div>
                        <div>-- index Table Create SQL</div>
                        <div>CREATE TABLE index</div>
                        <div>(</div>
                        <div>&nbsp; &nbsp; `no`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; VARCHAR(300)&nbsp;
                            &nbsp; NOT
                            NULL&nbsp; &nbsp; COMMENT '인덱스 고유 KEY',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `tableNo`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;VARCHAR(300)&nbsp; &nbsp;
                            NOT NULL&nbsp;
                            &nbsp; COMMENT '테이블 고유 KEY',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `name`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; VARCHAR(45)&nbsp;
                            &nbsp; &nbsp;NOT
                            NULL&nbsp; &nbsp; COMMENT '이름',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `targetColumnList`&nbsp; JSON&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; NOT
                            NULL&nbsp;
                            &nbsp; COMMENT 'index 처리할 컬럼 리스트',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; &nbsp;PRIMARY KEY (no)</div>
                        <div>);</div>
                        <div><br></div>
                        <div>ALTER TABLE index COMMENT '인덱스';</div>
                        <div><br></div>
                        <div>ALTER TABLE index</div>
                        <div>&nbsp; &nbsp; ADD CONSTRAINT FK_index_tableNo_table_no FOREIGN KEY (tableNo)</div>
                        <div>&nbsp; &nbsp; &nbsp; &nbsp; REFERENCES table (no) ON DELETE RESTRICT ON UPDATE RESTRICT;
                        </div>
                        <div><br></div>
                        <div><br></div>
                        <div>-- relation Table Create SQL</div>
                        <div>CREATE TABLE relation</div>
                        <div>(</div>
                        <div>&nbsp; &nbsp; `mainTable`&nbsp; &nbsp; &nbsp;VARCHAR(300)&nbsp; &nbsp; NOT NULL&nbsp;
                            &nbsp; COMMENT
                            'FK 테이블',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `mainColumn`&nbsp; &nbsp; VARCHAR(300)&nbsp; &nbsp; NOT NULL&nbsp; &nbsp;
                            COMMENT 'FK
                            컬럼',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `targetTable`&nbsp; &nbsp;VARCHAR(300)&nbsp; &nbsp; NOT NULL&nbsp; &nbsp;
                            COMMENT 'FK
                            target 테이블',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `targetColumn`&nbsp; VARCHAR(300)&nbsp; &nbsp; NOT NULL&nbsp; &nbsp; COMMENT
                            'FK target
                            컬럼',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `onDelete`&nbsp; &nbsp; &nbsp; VARCHAR(45)&nbsp; &nbsp; &nbsp;NOT NULL&nbsp;
                            &nbsp;
                            COMMENT '삭제시 constraint',&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `onUpdate`&nbsp; &nbsp; &nbsp; VARCHAR(45)&nbsp; &nbsp; &nbsp;NOT NULL&nbsp;
                            &nbsp;
                            COMMENT '업데이트 시 constraint'
                        </div>
                        <div>);</div>
                        <div><br></div>
                        <div>ALTER TABLE relation COMMENT '관계 (FK)';</div>
                        <div><br></div>
                        <div>ALTER TABLE relation</div>
                        <div>&nbsp; &nbsp; ADD CONSTRAINT FK_relation_mainTable_table_no FOREIGN KEY (mainTable)</div>
                        <div>&nbsp; &nbsp; &nbsp; &nbsp; REFERENCES table (no) ON DELETE RESTRICT ON UPDATE RESTRICT;
                        </div>
                        <div><br></div>
                        <div>ALTER TABLE relation</div>
                        <div>&nbsp; &nbsp; ADD CONSTRAINT FK_relation_targetTable_table_no FOREIGN KEY (targetTable)
                        </div>
                        <div>&nbsp; &nbsp; &nbsp; &nbsp; REFERENCES table (no) ON DELETE RESTRICT ON UPDATE RESTRICT;
                        </div>
                        <div><br></div>
                        <div>ALTER TABLE relation</div>
                        <div>&nbsp; &nbsp; ADD CONSTRAINT FK_relation_mainColumn_column_no FOREIGN KEY (mainColumn)
                        </div>
                        <div>&nbsp; &nbsp; &nbsp; &nbsp; REFERENCES column (no) ON DELETE RESTRICT ON UPDATE RESTRICT;
                        </div>
                        <div><br></div>
                        <div>ALTER TABLE relation</div>
                        <div>&nbsp; &nbsp; ADD CONSTRAINT FK_relation_targetColumn_column_no FOREIGN KEY
                            (targetColumn)
                        </div>
                        <div>&nbsp; &nbsp; &nbsp; &nbsp; REFERENCES column (no) ON DELETE RESTRICT ON UPDATE RESTRICT;
                        </div>
                        <div><br></div>
                        <div><br></div>
                        <div>-- CompanyMember Table Create SQL</div>
                        <div>CREATE TABLE CompanyMember</div>
                        <div>(</div>
                        <div>&nbsp; &nbsp; `userNo`&nbsp; &nbsp; &nbsp; &nbsp;INT&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; NOT NULL,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `companyNo`&nbsp; &nbsp; INT&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; NOT
                            NULL,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `role`&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;VARCHAR(45)&nbsp; &nbsp; NOT NULL,&nbsp;</div>
                        <div>&nbsp; &nbsp; `editAuth`&nbsp; &nbsp; &nbsp;TINYINT(1)&nbsp; &nbsp; &nbsp;NOT NULL,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `readAuth`&nbsp; &nbsp; &nbsp;TINYINT(1)&nbsp; &nbsp; &nbsp;NOT NULL,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `requestDate`&nbsp; DATETIME&nbsp; &nbsp; &nbsp; &nbsp;NOT NULL,&nbsp;</div>
                        <div>&nbsp; &nbsp; `createDate`&nbsp; &nbsp;DATETIME&nbsp; &nbsp; &nbsp; &nbsp;NULL,&nbsp;</div>
                        <div>&nbsp; &nbsp; `reviseDate`&nbsp; &nbsp;DATETIME&nbsp; &nbsp; &nbsp; &nbsp;NULL&nbsp;
                            &nbsp;
                        </div>
                        <div>);</div>
                        <div><br></div>
                        <div>ALTER TABLE CompanyMember</div>
                        <div>&nbsp; &nbsp; ADD CONSTRAINT FK_CompanyMember_userNo_User_no FOREIGN KEY (userNo)</div>
                        <div>&nbsp; &nbsp; &nbsp; &nbsp; REFERENCES User (no) ON DELETE RESTRICT ON UPDATE RESTRICT;
                        </div>
                        <div><br></div>
                        <div>ALTER TABLE CompanyMember</div>
                        <div>&nbsp; &nbsp; ADD CONSTRAINT FK_CompanyMember_companyNo_Company_no FOREIGN KEY
                            (companyNo)
                        </div>
                        <div>&nbsp; &nbsp; &nbsp; &nbsp; REFERENCES Company (no) ON DELETE RESTRICT ON UPDATE
                            RESTRICT;
                        </div>
                        <div><br></div>
                        <div><br></div>
                        <div>-- CompanyMemberPlugAuth Table Create SQL</div>
                        <div>CREATE TABLE CompanyMemberPlugAuth</div>
                        <div>(</div>
                        <div>&nbsp; &nbsp; `userNo`&nbsp; &nbsp; &nbsp; INT&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; NOT
                            NULL,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `companyNo`&nbsp; &nbsp;INT&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; NOT
                            NULL,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `plugNo`&nbsp; &nbsp; &nbsp; VARCHAR(45)&nbsp; &nbsp; NOT NULL,&nbsp;</div>
                        <div>&nbsp; &nbsp; `editAuth`&nbsp; &nbsp; TINYINT(1)&nbsp; &nbsp; &nbsp;NOT NULL,&nbsp;</div>
                        <div>&nbsp; &nbsp; `readAuth`&nbsp; &nbsp; TINYINT(1)&nbsp; &nbsp; &nbsp;NOT NULL,&nbsp;</div>
                        <div>&nbsp; &nbsp; `createDate`&nbsp; DATETIME&nbsp; &nbsp; &nbsp; &nbsp;NOT NULL,&nbsp;</div>
                        <div>&nbsp; &nbsp; `reviseDate`&nbsp; DATETIME&nbsp; &nbsp; &nbsp; &nbsp;NOT NULL</div>
                        <div>);</div>
                        <div><br></div>
                        <div>ALTER TABLE CompanyMemberPlugAuth</div>
                        <div>&nbsp; &nbsp; ADD CONSTRAINT FK_CompanyMemberPlugAuth_userNo_User_no FOREIGN KEY (userNo)
                        </div>
                        <div>&nbsp; &nbsp; &nbsp; &nbsp; REFERENCES User (no) ON DELETE RESTRICT ON UPDATE RESTRICT;
                        </div>
                        <div><br></div>
                        <div>ALTER TABLE CompanyMemberPlugAuth</div>
                        <div>&nbsp; &nbsp; ADD CONSTRAINT FK_CompanyMemberPlugAuth_companyNo_Company_no FOREIGN KEY
                            (companyNo)
                        </div>
                        <div>&nbsp; &nbsp; &nbsp; &nbsp; REFERENCES Company (no) ON DELETE RESTRICT ON UPDATE
                            RESTRICT;
                        </div>
                        <div><br></div>
                        <div><br></div>
                        <div>-- CompanyPlug Table Create SQL</div>
                        <div>CREATE TABLE CompanyPlug</div>
                        <div>(</div>
                        <div>&nbsp; &nbsp; `companyNo`&nbsp; &nbsp;INT&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; NOT
                            NULL,&nbsp;
                        </div>
                        <div>&nbsp; &nbsp; `plugNo`&nbsp; &nbsp; &nbsp; VARCHAR(45)&nbsp; &nbsp; NOT NULL,&nbsp;</div>
                        <div>&nbsp; &nbsp; `createDate`&nbsp; VARCHAR(45)&nbsp; &nbsp; NOT NULL,&nbsp;</div>
                        <div>&nbsp; &nbsp; `reviseDate`&nbsp; VARCHAR(45)&nbsp; &nbsp; NOT NULL</div>
                        <div>);</div>
                        <div><br></div>
                        <div>ALTER TABLE CompanyPlug</div>
                        <div>&nbsp; &nbsp; ADD CONSTRAINT FK_CompanyPlug_companyNo_Company_no FOREIGN KEY (companyNo)
                        </div>
                        <div>&nbsp; &nbsp; &nbsp; &nbsp; REFERENCES Company (no) ON DELETE RESTRICT ON UPDATE
                            RESTRICT;
                        </div>
                        <div><br></div>
                        <div><br></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Optional JavaScript; choose one of the two! -->

<!-- Option 1: jQuery and Bootstrap Bundle (includes Popper) -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
<!-- Jquery 3.6.0 -->
<script src="https://code.jquery.com/jquery-3.6.0.js"
        integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct"
        crossorigin="anonymous"></script>

<!-- Option 2: Separate Popper and Bootstrap JS -->
<!--
<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js" integrity="sha384-+sLIOodYLS7CIrQpBjl+C7nPvqq+FbNUBDunl/OZv93DB7Ln/533i8e/mZXLi/P+" crossorigin="anonymous"></script>
-->

<script src="../../../resources/js/utility.js"></script>
<script src="../../../resources/js/common.js"></script>
<script src="../../../resources/js/query/common.js"></script>
<script src="../../../resources/js/app.js"></script>
<script src="../../../resources/js/plugin/library-sample.js"></script>
<!-- Module JS -->
<!-- Module JS 는 특정 페이지가 아니라 다양한 페이지에서 작동하는 부분으로 Event 및 Element 생성 및 다양한 화면에 진입했을 때
     공통적으로 로직을 수행하는 Javascript를 Module JS라고 한다.
     Selector (선택자)의 Length 및 Empty 여부를 예외처리로 해줘야한다.
     (선택자가 없으면 또는 선택자의 Length가 0이면 에러가 터질 수 있기 때문에) -->
<script src="../../../resources/js/module/sample.js"></script>
<script src="../../../resources/js/validation.js"></script>
<!-- UI Draggable Lib -->
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
<!-- UI Arrow Line Lib -->
<script src="../../../resources/js/plugin/leader-line.min.js"></script>
<!-- UI Table Draggable Lib -->
<script src="../../../resources/js/plugin/plain-draggable.js"></script>
<!-- Module Okiwi Query Lib-->
<script src="../../../resources/js/module/okiwi-query.js"></script>
<script src="../../../resources/js/module/okiwi-query-left.js"></script>
<script src="../../../resources/js/query/api.js"></script>
<!-- Auto Complete Lib -->
<script src="../../../resources/js/module/auto-complete.js"></script>
<!--Font Awesome-->
<script src="https://kit.fontawesome.com/3581631c82.js" crossorigin="anonymous"></script>
<script>
    /**
     * Static JS
     * Static JS는 특정 페이지 에서만 작동하는 부분으로 Event 및 Element 생성 및 화면에 진입했을 때의
     * 해당 화면만의 특정 로직을 수행하는 Javascript를 Static JS라고 한다.
     * */
    $(document).ready(function () {
        console.log('Static JS is ready');

        let scale_size = 0.2;
        initializeScale(scale_size, 1);
        initializeTableOptions('#table-option-list');
        initializeGuideLines(guide_line, 600, 600, 20);
        // apis.js
        let get_tables = apiGetTables(getParameter('no'));
        let tables = get_tables.tables;
        let lines = get_tables.lines;
        /**
         * Table Sorted Position 추가하는 로직
         * */
        tables = initializeTableSorted(tables);

        let draggable_tables_objects = initializeTable($('.table-container'), tables);

        initializeDraggableTables(draggable_tables, draggable_tables_objects, tables);

        leader_lines = initializeLines(lines);
        /** Move LeaderLines into the container */
        moveLeaderLines($('.table-container'), leader_lines);
        updateLines(leader_lines);

        /** Global Event Listener (Right Sidebar) */
        document.querySelector('#right-sidebar ._right-menu ._side-button-container ._side-toggle').addEventListener('click', function () {
            let sidebar = this.closest('._right-menu');
            let sidebar_parent = sidebar.closest('#right-sidebar');
            if (sidebar.classList.contains('is-open')) {
                sidebar.classList.remove('is-open');
                sidebar.classList.add('is-close');
                if (sidebar_parent.classList.contains('is-open')) {
                    sidebar_parent.classList.remove('is-open');
                    sidebar_parent.classList.add('is-close');
                }
                MINIMUM_POSITION.left = MINIMUM_POSITION.left - 260;
                setTimeout(function () {
                    tableAutoSorting(draggable_tables, leader_lines);
                }, 500);
            } else {
                sidebar.classList.add('is-open');
                sidebar.classList.remove('is-close');
                if (sidebar_parent.classList.contains('is-close')) {
                    sidebar_parent.classList.remove('is-close');
                    sidebar_parent.classList.add('is-open');
                }
                MINIMUM_POSITION.left = MINIMUM_POSITION.left + 260;
                tableAutoSorting(draggable_tables, leader_lines);
            }
        });
        document.querySelector('#right-sidebar ._right-menu ._side-button-container ._side-sort').addEventListener('click', function (event) {
            tableAutoSorting(draggable_tables, leader_lines);
        });
        document.querySelector('#right-sidebar ._right-menu ._side-button-container ._side-add').addEventListener('click', function (event) {
            let table_elems = new Array();
            draggable_tables.forEach(function (table) {
                table_elems.push(table.draggable_table.element);
            });
            let table_id = apiCreateNextId(getParameter('no'), 'TABLE');
            let row_id = apiCreateNextId(getParameter('no'), 'ROW');
            let table = {
                id: table_id,
                name: table_id,
                columns: [{
                    id: row_id,
                    name: 'no', type: 'INT', comment: '', pk: false,
                    auto_increment: false, nullable: false
                }]
            }
            createTable($('.table-container'), draggable_tables, table, getMaxZIndex(table_elems));
        });
        document.querySelector('#right-sidebar ._right-menu ._side-button-container ._side-simple').addEventListener('click', function (event) {
            let simple = this;
            if (simple.dataset.type !== 'simple') {
                draggable_tables.forEach(function (draggable_table_object) {
                    simpleTableView(draggable_table_object.draggable_table.element);
                });
                simple.setAttribute('data-type', 'simple');
                simple.querySelector('svg').style.transform = 'rotate(180deg)';
            } else {
                draggable_tables.forEach(function (draggable_table_object) {
                    detailTableView(draggable_table_object.draggable_table.element);
                });
                simple.setAttribute('data-type', 'detail');
                simple.querySelector('svg').style.transform = 'rotate(0)';
            }
            let scale = parseFloat(document.querySelector('._right-option._scale-up').dataset.scale);
            reInitializeTableScale(draggable_tables, leader_lines, scale);
        });

        /** Global Event Listener (Right Option) */
        document.querySelector('._right-option._create-sql').addEventListener('click', function (event) {
            let $editor_container = document.querySelector('#database-editor-container');
            if (!$editor_container.classList.contains('is-open')) {
                $editor_container.classList.add('is-open');
            } else {
                $editor_container.classList.remove('is-open');
            }
        });

        /** Global Event Listener (Database Editor Container) */
        document.querySelector('#database-editor-container ._option._close').addEventListener('click', function (event) {
            let $editor_container = document.querySelector('#database-editor-container');
            if (!$editor_container.classList.contains('is-open')) {
                $editor_container.classList.add('is-open');
            } else {
                $editor_container.classList.remove('is-open');
            }
        });
        document.querySelector('#database-editor-container ._option._copy').addEventListener('click', function (event) {
            let editor = document.querySelector('#database-editor-container .database-editor ._editor');
            copyText(editor, function () {
                alert('복사가 완료되었습니다.');
            });
        });
        document.querySelector('#database-editor-container ._option._save').addEventListener('click', function (event) {
            alert('developing');
        });
        document.querySelector('#database-editor-container .database-editor ._option._update').addEventListener('click', function (event) {
            let editor = document.querySelector('#database-editor-container .database-editor ._editor');
            editor.setAttribute('contenteditable', true);
            let update_check = document.querySelector('#database-editor-container .database-editor ._option._update-check');
            $(update_check).show();
            $(this).hide();
        });
        document.querySelector('#database-editor-container .database-editor ._option._update-check').addEventListener('click', function (event) {
            let editor = document.querySelector('#database-editor-container .database-editor ._editor');
            editor.setAttribute('contenteditable', false);
            let update = document.querySelector('#database-editor-container .database-editor ._option._update');
            $(update).show();
            $(this).hide();
        });
        document.querySelector('#database-editor-container .database-editor ._option._search').addEventListener('click', function (event) {
            alert('developing');
        });

        /** Context menu event listener */
        tableRowContextMenuInitialize();

        /** Initialize Left Side (okiwi-query-left.js)*/
        initializeTableList('#list-tables', draggable_tables);

        /** Ctrl + Mouse Drag Event Listener Initialize */
        const slider = document.querySelector('.table-container');
        let isDown = false;
        var isDragged = false;
        let startX;
        let startY;
        let scrollLeft;
        let scrollTop;
        slider.addEventListener('mousedown', e => {
            isDown = true;
            slider.classList.add('is-scroll');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            startY = e.pageY - slider.offsetTop;
            scrollTop = slider.scrollTop;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('is-scroll');
        });
        slider.addEventListener('mouseup', e => {
            isDown = false;
            slider.classList.remove('is-scroll');
            isDragged = false;
        });
        slider.addEventListener('mousemove', e => {
            if (!isDown) return;
            isDragged = true;
            const x = e.pageX - slider.offsetLeft;
            const y = e.pageY - slider.offsetTop;
            let xWalk = (x - startX);
            let yWalk = (y - startY);
            if (xWalk < 0) {
                xWalk = Math.abs(xWalk) * 2;
            } else {
                xWalk *= -1;
            }
            if (yWalk < 0) {
                yWalk = Math.abs(yWalk) * 2;
            } else {
                yWalk *= -1;
            }
            window.scroll({
                left: window.scrollX + xWalk,
                top: window.scrollY + yWalk
            });
            updateLines(leader_lines);
        });
    });
</script>
</body>
</html>