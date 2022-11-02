<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
          integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N"
          crossorigin="anonymous">
    <!-- Base -->
    <link rel="stylesheet"
          href="/resources/css/base/reset.css">
    <link rel="stylesheet"
          href="/resources/css/base/default.css">
    <link rel="stylesheet"
          href="/resources/css/base/common.css">
    <!-- Theme -->
    <link rel="stylesheet"
          href="/resources/css/theme/theme.css">
    <link rel="stylesheet"
          href="/resources/css/theme/crm/theme.css">
    <!-- Layout -->
    <link rel="stylesheet"
          href="/resources/css/layout/layout.css">
    <link rel="stylesheet"
          href="/resources/css/layout/res-layout.css">
    <link rel="stylesheet"
          href="/resources/css/layout/crm/layout.css">
    <!-- Plugin -->
    <link rel="stylesheet"
          href="/resources/css/plugin/sample.css">
    <link rel="stylesheet"
          href="/resources/css/plugin/bootstrap-datepicker3.css">
    <!-- State -->
    <link rel="stylesheet"
          href="/resources/css/state/state.css">
    <link rel="stylesheet"
          href="/resources/css/state/res-state.css">
    <!-- Module -->
    <link rel="stylesheet"
          href="/resources/css/module/module.css">
    <link rel="stylesheet"
          href="/resources/css/module/res-module.css">
    <link rel="stylesheet"
          href="/resources/css/module/okiwi-crm-right-side.css">
    <link rel="stylesheet"
          href="/resources/css/module/okiwi-file.css">
    <!-- Element -->
    <link rel="stylesheet"
          href="/resources/css/base/element.css">
    <link rel="stylesheet"
          href="/resources/css/base/crm/element.css">
    <link rel="stylesheet" href="/resources/css/module/modal.css">
    <title>Okiwi CRM Workspace</title>
</head>
<body>
<header id="l-header"
        class="crm-theme">
    <img class="mr-12"
         src="/resources/assets/images/icon/crm/white-theme-logo-24x24.png"/>
    <span class="regular-h5 my-auto">CRM Plug - 업무 형상 관리 대시보드</span>
    <div class="_option ml-auto my-auto">
        <div>
            <svg width="24"
                 height="24"
                 viewBox="0 0 24 24"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM12 18.9643C11.408 18.9643 10.9286 18.4848 10.9286 17.8929C10.9286 17.3009 11.408 16.8214 12 16.8214C12.592 16.8214 13.0714 17.3009 13.0714 17.8929C13.0714 18.4848 12.592 18.9643 12 18.9643ZM13.6848 13.0848C13.4422 13.1785 13.2335 13.3431 13.0859 13.5572C12.9382 13.7712 12.8585 14.0248 12.8571 14.2848V14.8929C12.8571 15.0107 12.7607 15.1071 12.6429 15.1071H11.3571C11.2393 15.1071 11.1429 15.0107 11.1429 14.8929V14.317C11.1429 13.6982 11.3223 13.0875 11.6759 12.5786C12.0214 12.0804 12.5036 11.7 13.0714 11.483C13.9821 11.1321 14.5714 10.3688 14.5714 9.53571C14.5714 8.35446 13.417 7.39286 12 7.39286C10.583 7.39286 9.42857 8.35446 9.42857 9.53571V9.73929C9.42857 9.85714 9.33214 9.95357 9.21429 9.95357H7.92857C7.81071 9.95357 7.71429 9.85714 7.71429 9.73929V9.53571C7.71429 8.48304 8.175 7.5 9.01071 6.76875C9.81429 6.06429 10.875 5.67857 12 5.67857C13.125 5.67857 14.1857 6.06696 14.9893 6.76875C15.825 7.5 16.2857 8.48304 16.2857 9.53571C16.2857 11.0839 15.2652 12.4768 13.6848 13.0848Z"
                      fill="#222222"/>
            </svg>
        </div>
        <div>
            <svg width="24"
                 height="24"
                 viewBox="0 0 24 24"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_102_3910)">
                    <path d="M13.2936 2.19017e-06C13.6464 2.19017e-06 13.962 0.219602 14.0808 0.548402L14.928 2.8968C15.2316 2.9724 15.492 3.048 15.7128 3.1272C15.954 3.2136 16.2648 3.3444 16.6488 3.5232L18.6216 2.4792C18.7826 2.39389 18.9669 2.3631 19.1469 2.39144C19.327 2.41978 19.4929 2.50574 19.62 2.6364L21.3552 4.4304C21.5856 4.6692 21.6504 5.0184 21.5208 5.3232L20.5956 7.4916C20.7492 7.7736 20.8716 8.0148 20.9652 8.2164C21.066 8.436 21.1908 8.7384 21.3396 9.1284L23.496 10.0524C23.82 10.1904 24.0204 10.5144 23.9988 10.8612L23.8404 13.3512C23.8295 13.513 23.7714 13.668 23.6733 13.7971C23.5752 13.9261 23.4413 14.0235 23.2884 14.0772L21.246 14.8032C21.1872 15.0852 21.126 15.3264 21.0612 15.5304C20.9566 15.8455 20.8373 16.1554 20.7036 16.4592L21.7296 18.7272C21.802 18.8866 21.8215 19.0649 21.7852 19.2361C21.7489 19.4074 21.6588 19.5625 21.528 19.6788L19.5768 21.4212C19.4483 21.5355 19.2879 21.6077 19.1172 21.6283C18.9465 21.6489 18.7735 21.6168 18.6216 21.5364L16.6104 20.4708C16.2957 20.6374 15.9711 20.7845 15.6384 20.9112L14.76 21.24L13.98 23.4C13.9222 23.5582 13.8179 23.6952 13.6808 23.7931C13.5438 23.8909 13.3803 23.9451 13.212 23.9484L10.932 24C10.7591 24.0045 10.5891 23.9554 10.4453 23.8593C10.3016 23.7633 10.1911 23.625 10.1292 23.4636L9.20995 21.0312C8.89633 20.924 8.5858 20.808 8.27875 20.6832C8.02761 20.5745 7.78027 20.4572 7.53715 20.3316L5.25715 21.306C5.10692 21.3701 4.9413 21.3891 4.78044 21.3608C4.61959 21.3325 4.47044 21.258 4.35115 21.1464L2.66395 19.5636C2.53834 19.4463 2.45279 19.2924 2.41941 19.1238C2.38603 18.9552 2.40651 18.7803 2.47795 18.624L3.45835 16.488C3.32797 16.235 3.20708 15.9772 3.09595 15.7152C2.96623 15.3945 2.84618 15.0699 2.73595 14.742L0.587953 14.088C0.413354 14.0352 0.261066 13.9263 0.15474 13.7781C0.0484149 13.6299 -0.00599784 13.4507 -4.73183e-05 13.2684L0.0839527 10.9632C0.0899318 10.8128 0.136917 10.6669 0.219826 10.5413C0.302736 10.4156 0.418415 10.315 0.554353 10.2504L2.80795 9.168C2.91235 8.7852 3.00355 8.4876 3.08395 8.2704C3.19716 7.9803 3.32288 7.69523 3.46075 7.416L2.48395 5.352C2.40982 5.19526 2.38731 5.01905 2.41966 4.84871C2.452 4.67836 2.53753 4.52267 2.66395 4.404L4.34875 2.8128C4.46686 2.70141 4.61464 2.62652 4.77431 2.59714C4.93398 2.56776 5.09873 2.58515 5.24875 2.6472L7.52635 3.588C7.77835 3.42 8.00635 3.2844 8.21275 3.1752C8.45875 3.0444 8.78755 2.9076 9.20155 2.76L9.99355 0.550802C10.0521 0.389124 10.1591 0.24946 10.3 0.15088C10.4409 0.0522992 10.6088 -0.000391501 10.7808 2.19017e-06H13.2936ZM12.0288 8.4228C10.0284 8.4228 8.40715 10.0248 8.40715 12.0024C8.40715 13.98 10.0284 15.5832 12.0288 15.5832C14.028 15.5832 15.6492 13.98 15.6492 12.0024C15.6492 10.0248 14.0292 8.4228 12.0288 8.4228Z"
                          fill="#222222"/>
                </g>
                <defs>
                    <clipPath id="clip0_102_3910">
                        <rect width="24"
                              height="24"
                              fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </div>
    </div>
</header>
<jsp:include page="../common/plugin-left-sidebar.jsp"/>
<div id="l-content-wrapper">
    <div class="content-wrapper">
        <div class="container pt-100 pb-100">
            <div class="row">
                <div class="col-12 mb-24">
                    <div class="d-flex">
                        <img class="my-auto mr-16"
                             src="/resources/assets/images/icon/query/icon-clap.png"/>
                        <div class="my-auto bold-h3 c-gray-dark-low">
                            crmPlug를 소개합니다.
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="callout regular-h5 bg-basic-white c-gray-dark-low p-24">
                        팀이 서비스를 개발하기 위해 기획, 관리, 데이터베이스 등등의 서비스 플러그인을 제공합니다.팀이 서비스를 개발하기 위해 기획, 관리, 데이터베이스 등등의 서비스 플러그인을
                        제공합니다.
                        인을 제공합니다.인을 제공합니다.인을 제공합니다.인을 제공합니다.
                    </div>
                </div>
                <div class="col-12 mt-32">
                    <div class="row">
                        <div class="col-6">
                            <div class="recent-status-container p-24">
                                <div class="bold-h4">
                                    <span>김우식</span>님의 업무 현황
                                </div>
                                <ul class="nav nav-tabs mt-8"
                                    id="recent-tab"
                                    role="tablist">
                                    <li class="nav-item"
                                        role="presentation">
                                        <button class="nav-link bold-h5 active"
                                                id="remain-tab"
                                                data-toggle="tab"
                                                data-target="#remain"
                                                type="button"
                                                role="tab"
                                                aria-controls="remain"
                                                aria-selected="true">남은 업무
                                        </button>
                                    </li>
                                    <li class="nav-item"
                                        role="presentation">
                                        <button class="nav-link bold-h5"
                                                id="latest-tab"
                                                data-toggle="tab"
                                                data-target="#latest"
                                                type="button"
                                                role="tab"
                                                aria-controls="latest"
                                                aria-selected="false">지난 업무
                                        </button>
                                    </li>
                                    <li class="nav-item"
                                        role="presentation">
                                        <button class="nav-link bold-h5"
                                                id="complete-tab"
                                                data-toggle="tab"
                                                data-target="#complete"
                                                type="button"
                                                role="tab"
                                                aria-controls="complete"
                                                aria-selected="false">완료 업무
                                        </button>
                                    </li>
                                    <li class="nav-item"
                                        role="presentation">
                                        <button class="nav-link bold-h5"
                                                id="mention-tab"
                                                data-toggle="tab"
                                                data-target="#mention"
                                                type="button"
                                                role="tab"
                                                aria-controls="mention"
                                                aria-selected="false">@나를 멘션
                                        </button>
                                    </li>
                                </ul>
                                <div class="tab-content"
                                     id="myTabContent">
                                    <div class="tab-pane fade show active"
                                         id="remain"
                                         role="tabpanel"
                                         aria-labelledby="remain-tab">
                                        <ul class="list-group">
                                            <li class="list-group-item is-checked" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item is-checked" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item is-checked" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item add">
                                                <div class="_name medium-h5"></div>
                                                <div class="_date medium-h5 ml-auto">
                                                    <div>업무 생성하기</div>
                                                    <svg class="ml-8"
                                                         width="12"
                                                         height="12"
                                                         viewBox="0 0 12 12"
                                                         fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.14286 5.14286V0H6.85714V5.14286H12V6.85714H6.85714V12H5.14286V6.85714H0V5.14286H5.14286Z"
                                                              fill="#F06A6A"/>
                                                    </svg>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tab-pane fade"
                                         id="latest"
                                         role="tabpanel"
                                         aria-labelledby="latest-tab">
                                        <ul class="list-group">
                                            <li class="list-group-item is-checked" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item is-checked" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item is-checked" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item add">
                                                <div class="_name medium-h5"></div>
                                                <div class="_date medium-h5 ml-auto">
                                                    <div>업무 생성하기</div>
                                                    <svg class="ml-8"
                                                         width="12"
                                                         height="12"
                                                         viewBox="0 0 12 12"
                                                         fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.14286 5.14286V0H6.85714V5.14286H12V6.85714H6.85714V12H5.14286V6.85714H0V5.14286H5.14286Z"
                                                              fill="#F06A6A"/>
                                                    </svg>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tab-pane fade"
                                         id="complete"
                                         role="tabpanel"
                                         aria-labelledby="complete-tab">
                                        <ul class="list-group">
                                            <li class="list-group-item is-checked" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item is-checked" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item is-checked" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item add">
                                                <div class="_name medium-h5"></div>
                                                <div class="_date medium-h5 ml-auto">
                                                    <div>업무 생성하기</div>
                                                    <svg class="ml-8"
                                                         width="12"
                                                         height="12"
                                                         viewBox="0 0 12 12"
                                                         fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.14286 5.14286V0H6.85714V5.14286H12V6.85714H6.85714V12H5.14286V6.85714H0V5.14286H5.14286Z"
                                                              fill="#F06A6A"/>
                                                    </svg>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tab-pane fade"
                                         id="mention"
                                         role="tabpanel"
                                         aria-labelledby="mention-tab">
                                        <ul class="list-group">
                                            <li class="list-group-item is-checked" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item is-checked" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item is-checked" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item" data-id="task_id">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
                                                <div class="_name medium-h5">[디자인] 디자인 컨펌 요청</div>
                                                <div class="_date bold-h5 ml-auto">D-3</div>
                                            </li>
                                            <li class="list-group-item add">
                                                <div class="_name medium-h5"></div>
                                                <div class="_date medium-h5 ml-auto">
                                                    <div>업무 생성하기</div>
                                                    <svg class="ml-8"
                                                         width="12"
                                                         height="12"
                                                         viewBox="0 0 12 12"
                                                         fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.14286 5.14286V0H6.85714V5.14286H12V6.85714H6.85714V12H5.14286V6.85714H0V5.14286H5.14286Z"
                                                              fill="#F06A6A"/>
                                                    </svg>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="row row-cols-2 project-container">
                                <div class="col project">
                                    <div class="p-24">
                                        <div class="emoji-container-pure">🙊</div>
                                        <div class="_name ml-8 medium-h4">기획</div>
                                        <div class="btn-group dropright dropleft">
                                            <div data-toggle="dropdown"
                                                 aria-expanded="false">
                                                <img class="img-fluid"
                                                     src="/resources/assets/images/icon/board_options.svg">
                                            </div>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item _modify medium-h6"
                                                   data-type="_modify"
                                                   href="javascript:void(0)">프로젝트 수정</a>
                                                <a class="dropdown-item _copy medium-h6"
                                                   data-type="_delete"
                                                   href="javascript:void(0)">프로젝트 복사</a>
                                                <a class="dropdown-item _delete medium-h6"
                                                   data-type="_delete"
                                                   href="javascript:void(0)">프로젝트 삭제</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col project">
                                    <div class="p-24">
                                        <div class="emoji-container-pure">🙊</div>
                                        <div class="_name ml-8 medium-h4">디자인</div>
                                        <div class="btn-group dropright dropleft">
                                            <div data-toggle="dropdown"
                                                 aria-expanded="false">
                                                <img class="img-fluid"
                                                     src="/resources/assets/images/icon/board_options.svg">
                                            </div>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item _modify medium-h6"
                                                   data-type="_modify"
                                                   href="javascript:void(0)">프로젝트 수정</a>
                                                <a class="dropdown-item _copy medium-h6"
                                                   data-type="_delete"
                                                   href="javascript:void(0)">프로젝트 복사</a>
                                                <a class="dropdown-item _delete medium-h6"
                                                   data-type="_delete"
                                                   href="javascript:void(0)">프로젝트 삭제</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col project">
                                    <div class="p-24">
                                        <div class="_name ml-8 medium-h4">개발</div>
                                        <div class="btn-group dropright dropleft">
                                            <div data-toggle="dropdown"
                                                 aria-expanded="false">
                                                <img class="img-fluid"
                                                     src="/resources/assets/images/icon/board_options.svg">
                                            </div>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item _modify medium-h6"
                                                   data-type="_modify"
                                                   href="javascript:void(0)">프로젝트 수정</a>
                                                <a class="dropdown-item _copy medium-h6"
                                                   data-type="_delete"
                                                   href="javascript:void(0)">프로젝트 복사</a>
                                                <a class="dropdown-item _delete medium-h6"
                                                   data-type="_delete"
                                                   href="javascript:void(0)">프로젝트 삭제</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col project add edit">
                                    <div class="p-24">
                                        <div class="position-relative">
                                            <button id="emoji-picker">
                      <span>
                        <svg width="20"
                             height="20"
                             viewBox="0 0 20 20"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                        <rect width="20"
                              height="20"
                              rx="2"
                              fill="#F2F2F2"/>
                        <path d="M10 4C10.1989 4 10.3897 4.07902 10.5303 4.21967C10.671 4.36032 10.75 4.55109 10.75 4.75V9.25H15.25C15.4489 9.25 15.6397 9.32902 15.7803 9.46967C15.921 9.61032 16 9.80109 16 10C16 10.1989 15.921 10.3897 15.7803 10.5303C15.6397 10.671 15.4489 10.75 15.25 10.75H10.75V15.25C10.75 15.4489 10.671 15.6397 10.5303 15.7803C10.3897 15.921 10.1989 16 10 16C9.80109 16 9.61032 15.921 9.46967 15.7803C9.32902 15.6397 9.25 15.4489 9.25 15.25V10.75H4.75C4.55109 10.75 4.36032 10.671 4.21967 10.5303C4.07902 10.3897 4 10.1989 4 10C4 9.80109 4.07902 9.61032 4.21967 9.46967C4.36032 9.32902 4.55109 9.25 4.75 9.25H9.25V4.75C9.25 4.55109 9.32902 4.36032 9.46967 4.21967C9.61032 4.07902 9.80109 4 10 4Z"
                              fill="white"/>
                      </svg>
                      </span>
                                            </button>
                                            <div id="emoji-container"
                                                 class="emoji-container"></div>
                                            <button id="_emoji-picker"></button>
                                        </div>
                                        <div class="_name ml-8 medium-h4">
                                            <input type="text"
                                                   placeholder="프로젝트 명 입력"
                                                   class="form-control medium-h4"
                                                   name="name"/>
                                        </div>
                                        <span class="checkbox">
                    <i class="fas fa-check"
                       aria-hidden="true"></i>
                  </span>
                                    </div>
                                </div>
                                <div class="col project add">
                                    <div class="p-24">
                                        <div class="_name medium-h4">새 프로젝트 생성하기</div>
                                        <svg width="20"
                                             height="20"
                                             viewBox="0 0 20 20"
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.57143 8.57143V0H11.4286V8.57143H20V11.4286H11.4286V20H8.57143V11.4286H0V8.57143H8.57143Z"
                                                  fill="white"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="common/task-right-side.jsp"/>
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

<script src="/resources/js/utility.js"></script>
<script src="/resources/js/common.js"></script>
<script src="/resources/js/app.js"></script>
<script src="/resources/js/plugin/library-sample.js"></script>
<script src="/resources/js/plugin/emoji/emoji-picker.js"></script>
<script src="/resources/js/plugin/bootstrap-datepicker.js"></script>
<script src="/resources/js/plugin/bootstrap-datepicker.ko.min.js"></script>
<!-- Module JS -->
<!-- Module JS 는 특정 페이지가 아니라 다양한 페이지에서 작동하는 부분으로 Event 및 Element 생성 및 다양한 화면에 진입했을 때
     공통적으로 로직을 수행하는 Javascript를 Module JS라고 한다.
     Selector (선택자)의 Length 및 Empty 여부를 예외처리로 해줘야한다.
     (선택자가 없으면 또는 선택자의 Length가 0이면 에러가 터질 수 있기 때문에) -->
<script src="/resources/js/module/sample.js"></script>
<script src="/resources/js/module/okiwi-crm-right-side.js"></script>
<script src="/resources/js/module/okiwi-file.js"></script>
<script src="/resources/js/validation.js"></script>
<script src="/resources/js/global-modal.js"></script>
<script src="/resources/js/api.js"></script>
<!--Font Awesome-->
<script src="https://kit.fontawesome.com/3581631c82.js"
        crossorigin="anonymous"></script>
<script>
    /**
     * Static JS
     * Static JS는 특정 페이지 에서만 작동하는 부분으로 Event 및 Element 생성 및 화면에 진입했을 때의
     * 해당 화면만의 특정 로직을 수행하는 Javascript를 Static JS라고 한다.
     * */
    $(document).ready(function () {
        console.log('Static JS is ready');
        new EmojiPicker({
            trigger: [
                {
                    selector: '#_emoji-picker',
                    insertInto: ['#emoji-container'], // '.selector' can be used without array
                    clear: true
                },
                {
                    selector: '#control-emoji-button',
                    insertInto: ['#comment-input'], // '.selector' can be used without array
                    clear: false
                },
            ],
            closeButton: true,
        });
        $('.recent-status-container .tab-content .list-group').on('click', '.list-group-item:not(.add)', function
            (event) {
            rightTaskOpen(this.dataset.id);
        });
    });
</script>
</body>
</html>
