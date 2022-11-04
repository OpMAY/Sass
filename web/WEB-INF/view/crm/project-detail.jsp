<%@ page contentType="text/html;charset=UTF-8"
         language="java" %>
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
    <link rel="stylesheet"
          href="/resources/css/plugin/jkanban.css">
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
          href="/resources/css/module/okiwi-list.css">
    <link rel="stylesheet"
          href="/resources/css/module/okiwi-gantt.css">
    <link rel="stylesheet"
          href="/resources/css/module/okiwi-file.css">
    <!-- Element -->
    <link rel="stylesheet"
          href="/resources/css/base/element.css">
    <link rel="stylesheet"
          href="/resources/css/base/crm/element.css">
    <link rel="stylesheet"
          href="/resources/css/module/modal.css">
    <title>Okiwi CRM Workspace</title>
</head>
<body>
<div class="context-menu"
     id="context-menu"
     style="position: absolute; top: 0; left: 0; z-index: 1; display: none;">
    <div class="list-group">
        <a class="list-group-item list-group-item-action _cover"
           aria-labelledby="cover-file">커버 이미지 추가 및 수정</a>
        <a class="list-group-item list-group-item-action _cover-delete"
           style="display: none;">커버 이미지 제거</a>
        <a class="list-group-item list-group-item-action _edit">태스크 이름 수정</a>
        <a class="list-group-item list-group-item-action _complete">작업 완료</a>
        <a class="list-group-item list-group-item-action _dis-complete">작업 취소</a>
        <a class="list-group-item list-group-item-action _copy">작업 복사</a>
        <a class="list-group-item list-group-item-action _delete">작업 삭제</a>
        <a class="list-group-item list-group-item-action _subtask _open">하위 작업 보기</a>
        <a class="list-group-item list-group-item-action _subtask _close">하위 작업 닫기</a>
    </div>
</div>
<div class="context-menu"
     id="list-context-menu"
     style="position: absolute; top: 0; left: 0; z-index: 1; display: none;">
    <div class="list-group">
        <a class="list-group-item list-group-item-action _edit">태스크 이름 수정</a>
        <a class="list-group-item list-group-item-action _complete">작업 완료</a>
        <a class="list-group-item list-group-item-action _dis-complete">작업 완료 해제</a>
        <a class="list-group-item list-group-item-action _copy">작업 복사</a>
        <a class="list-group-item list-group-item-action _delete">작업 삭제</a>
    </div>
</div>
<div class="context-menu"
     id="gantt-context-menu"
     style="position: absolute; top: 0; left: 0; z-index: 1; display: none;">
    <div class="list-group">
        <a class="list-group-item list-group-item-action _view">작업 보기</a>
        <a class="list-group-item list-group-item-action _edit">태스크 이름 수정</a>
        <a class="list-group-item list-group-item-action _complete">작업 완료</a>
        <a class="list-group-item list-group-item-action _dis-complete">작업 완료 해제</a>
        <a class="list-group-item list-group-item-action _copy">작업 복사</a>
        <a class="list-group-item list-group-item-action _delete">작업 삭제</a>
    </div>
</div>
<div class="context-menu"
     id="gantt-board-option-menu"
     style="position: absolute; top: 0; left: 0; z-index: 1; display: none;">
    <div class="list-group">
        <a class="list-group-item list-group-item-action _edit">보드 수정</a>
        <a class="list-group-item list-group-item-action _delete">보드 삭제</a>
    </div>
</div>
<div class="d-none cover-input-file-container"></div>
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
<div id="l-content-wrapper"
     class="left-sidebar-type sidebar-is-open">
    <div class="content-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 px-0 project-tab">
                    <div class="_title">
                        <div class="_icon">
                            <svg width="20"
                                 height="20"
                                 viewBox="0 0 20 20"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                <rect width="20"
                                      height="20"
                                      fill="url(#pattern0)"/>
                                <defs>
                                    <pattern id="pattern0"
                                             patternContentUnits="objectBoundingBox"
                                             width="1"
                                             height="1">
                                        <use xlink:href="#image0_427_4200"
                                             transform="scale(0.00694444)"/>
                                    </pattern>
                                    <image id="image0_427_4200"
                                           width="144"
                                           height="144"
                                           xlink:href="data:image/png;base64,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"/>
                                </defs>
                            </svg>
                        </div>
                        <div class="_name bold-h4 c-gray-dark-low">기획</div>
                    </div>
                    <ul class="nav nav-tabs"
                        id="project-tab"
                        role="tablist">
                        <li class="nav-item"
                            role="presentation">
                            <button class="nav-link active"
                                    id="feed-tab"
                                    data-toggle="tab"
                                    data-target="#feed"
                                    type="button"
                                    role="tab"
                                    aria-controls="feed"
                                    aria-selected="true">피드
                            </button>
                        </li>
                        <li class="nav-item"
                            role="presentation">
                            <button class="nav-link"
                                    id="list-tab"
                                    data-toggle="tab"
                                    data-target="#list"
                                    type="button"
                                    role="tab"
                                    aria-controls="list"
                                    aria-selected="false">리스트
                            </button>
                        </li>
                        <li class="nav-item"
                            role="presentation">
                            <button class="nav-link"
                                    id="timeline-tab"
                                    data-toggle="tab"
                                    data-target="#timeline"
                                    type="button"
                                    role="tab"
                                    aria-controls="timeline"
                                    aria-selected="false">타임라인
                            </button>
                        </li>
                        <li class="nav-item"
                            role="presentation">
                            <button class="nav-link"
                                    id="file-tab"
                                    data-toggle="tab"
                                    data-target="#file"
                                    type="button"
                                    role="tab"
                                    aria-controls="file"
                                    aria-selected="false">파일
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="col-12 px-0">
                    <div class="tab-content"
                         id="projectTabContent">
                        <div class="tab-pane fade show active"
                             id="feed"
                             role="tabpanel"
                             aria-labelledby="feed-tab">
                            <div class="status-container">
                                <div class="progress">
                                    <div class="progress-bar"
                                         role="progressbar"
                                         style="width: 78%"
                                         aria-valuenow="78"
                                         aria-valuemin="0"
                                         aria-valuemax="100"></div>
                                </div>
                                <div class="_percent c-brand-red bold-h5">78%</div>
                                <div class="_filter">
                                    <div class="btn-group dropright dropleft">
                                        <div data-toggle="dropdown"
                                             aria-expanded="false">
                                            <svg width="20"
                                                 height="20"
                                                 viewBox="0 0 20 20"
                                                 fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_271_6071)">
                                                    <path d="M16.6667 3.33398V13.334H19.1667L15.8333 17.5007L12.5 13.334H15V3.33398H16.6667ZM10 15.0007V16.6673H2.5V15.0007H10ZM11.6667 9.16732V10.834H2.5V9.16732H11.6667ZM11.6667 3.33398V5.00065H2.5V3.33398H11.6667Z"
                                                          fill="#222222"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_271_6071">
                                                        <rect width="20"
                                                              height="20"
                                                              fill="white"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <div>최신순</div>
                                        </div>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">최신 등록 순</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">하위 업무 순</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">시작 일 빠른 순</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">마감 일 빠른 순</a>
                                        </div>
                                    </div>
                                    <div class="btn-group dropright dropleft">
                                        <div data-toggle="dropdown"
                                             aria-expanded="false">
                                            <svg width="20"
                                                 height="20"
                                                 viewBox="0 0 20 20"
                                                 fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.66634 13.2H3.33301L8.33301 18V2H6.66634V13.2ZM11.6663 4.4V18H13.333V6.8H16.6663L11.6663 2V4.4Z"
                                                      fill="#222222"/>
                                            </svg>
                                            <div>완료 업무</div>
                                        </div>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">전체</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">완료 업무</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">지난 업무</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">남은 업무</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">나를 멘션</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="module-container kanban-board-container">
                            </div>
                        </div>
                        <div class="tab-pane fade"
                             id="list"
                             role="tabpanel"
                             aria-labelledby="list-tab">
                            <div class="status-container">
                                <div class="progress">
                                    <div class="progress-bar"
                                         role="progressbar"
                                         style="width: 25%"
                                         aria-valuenow="25"
                                         aria-valuemin="0"
                                         aria-valuemax="100"></div>
                                </div>
                                <div class="_percent c-brand-red bold-h5">78%</div>
                                <div class="_filter">
                                    <div class="btn-group dropright dropleft">
                                        <div data-toggle="dropdown"
                                             aria-expanded="false">
                                            <svg width="20"
                                                 height="20"
                                                 viewBox="0 0 20 20"
                                                 fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_271_6071)">
                                                    <path d="M16.6667 3.33398V13.334H19.1667L15.8333 17.5007L12.5 13.334H15V3.33398H16.6667ZM10 15.0007V16.6673H2.5V15.0007H10ZM11.6667 9.16732V10.834H2.5V9.16732H11.6667ZM11.6667 3.33398V5.00065H2.5V3.33398H11.6667Z"
                                                          fill="#222222"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_271_6071">
                                                        <rect width="20"
                                                              height="20"
                                                              fill="white"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <div>최신순</div>
                                        </div>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">최신 등록 순</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">하위 업무 순</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">시작 일 빠른 순</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">마감 일 빠른 순</a>
                                        </div>
                                    </div>
                                    <div class="btn-group dropright dropleft">
                                        <div data-toggle="dropdown"
                                             aria-expanded="false">
                                            <svg width="20"
                                                 height="20"
                                                 viewBox="0 0 20 20"
                                                 fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.66634 13.2H3.33301L8.33301 18V2H6.66634V13.2ZM11.6663 4.4V18H13.333V6.8H16.6663L11.6663 2V4.4Z"
                                                      fill="#222222"/>
                                            </svg>
                                            <div>완료 업무</div>
                                        </div>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">전체</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">완료 업무</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">지난 업무</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">남은 업무</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">나를 멘션</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="module-container list-container">
                            </div>
                        </div>
                        <div class="tab-pane fade"
                             id="timeline"
                             role="tabpanel"
                             aria-labelledby="timeline-tab">
                            <div class="status-container">
                                <div class="progress">
                                    <div class="progress-bar"
                                         role="progressbar"
                                         style="width: 25%"
                                         aria-valuenow="25"
                                         aria-valuemin="0"
                                         aria-valuemax="100"></div>
                                </div>
                                <div class="_percent c-brand-red bold-h5">78%</div>
                                <div class="_filter">
                                    <div class="btn-group dropright dropleft">
                                        <div data-toggle="dropdown"
                                             aria-expanded="false">
                                            <svg width="20"
                                                 height="20"
                                                 viewBox="0 0 20 20"
                                                 fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_271_6071)">
                                                    <path d="M16.6667 3.33398V13.334H19.1667L15.8333 17.5007L12.5 13.334H15V3.33398H16.6667ZM10 15.0007V16.6673H2.5V15.0007H10ZM11.6667 9.16732V10.834H2.5V9.16732H11.6667ZM11.6667 3.33398V5.00065H2.5V3.33398H11.6667Z"
                                                          fill="#222222"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_271_6071">
                                                        <rect width="20"
                                                              height="20"
                                                              fill="white"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <div>최신순</div>
                                        </div>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">최신 등록 순</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">하위 업무 순</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">시작 일 빠른 순</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">마감 일 빠른 순</a>
                                        </div>
                                    </div>
                                    <div class="btn-group dropright dropleft">
                                        <div data-toggle="dropdown"
                                             aria-expanded="false">
                                            <svg width="20"
                                                 height="20"
                                                 viewBox="0 0 20 20"
                                                 fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.66634 13.2H3.33301L8.33301 18V2H6.66634V13.2ZM11.6663 4.4V18H13.333V6.8H16.6663L11.6663 2V4.4Z"
                                                      fill="#222222"/>
                                            </svg>
                                            <div>완료 업무</div>
                                        </div>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">전체</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">완료 업무</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">지난 업무</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">남은 업무</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">나를 멘션</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="module-container gantt-container"
                                 style="max-height: none; height: auto;"></div>
                        </div>
                        <div class="tab-pane fade"
                             id="file"
                             role="tabpanel"
                             aria-labelledby="file-tab">
                            <div class="status-container">
                                <div class="progress">
                                    <div class="progress-bar"
                                         role="progressbar"
                                         style="width: 25%"
                                         aria-valuenow="25"
                                         aria-valuemin="0"
                                         aria-valuemax="100"></div>
                                </div>
                                <div class="_percent c-brand-red bold-h5">78%</div>
                                <div class="_filter">
                                    <div class="btn-group dropright dropleft">
                                        <div data-toggle="dropdown"
                                             aria-expanded="false">
                                            <svg width="20"
                                                 height="20"
                                                 viewBox="0 0 20 20"
                                                 fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_271_6071)">
                                                    <path d="M16.6667 3.33398V13.334H19.1667L15.8333 17.5007L12.5 13.334H15V3.33398H16.6667ZM10 15.0007V16.6673H2.5V15.0007H10ZM11.6667 9.16732V10.834H2.5V9.16732H11.6667ZM11.6667 3.33398V5.00065H2.5V3.33398H11.6667Z"
                                                          fill="#222222"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_271_6071">
                                                        <rect width="20"
                                                              height="20"
                                                              fill="white"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <div>최신순</div>
                                        </div>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">최신 등록 순</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">하위 업무 순</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">시작 일 빠른 순</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">마감 일 빠른 순</a>
                                        </div>
                                    </div>
                                    <div class="btn-group dropright dropleft">
                                        <div data-toggle="dropdown"
                                             aria-expanded="false">
                                            <svg width="20"
                                                 height="20"
                                                 viewBox="0 0 20 20"
                                                 fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.66634 13.2H3.33301L8.33301 18V2H6.66634V13.2ZM11.6663 4.4V18H13.333V6.8H16.6663L11.6663 2V4.4Z"
                                                      fill="#222222"/>
                                            </svg>
                                            <div>완료 업무</div>
                                        </div>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">전체</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">완료 업무</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">지난 업무</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">남은 업무</a>
                                            <a class="dropdown-item medium-h6"
                                               href="javascript:void(0)">나를 멘션</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="module-container file-container">
                                <div class="_files-container">
                                    <div class="date-item">
                                        <div class="_date regular-h6">
                                            2022.11.01
                                        </div>
                                        <div class="_files"
                                             data-date="2022.11.01">
                                            <div class="file-item">
                                                <div class="_file-image">
                                                </div>
                                                <div class="_file-info">
                                                    <div class="_name regular-h6"
                                                         data-toggle="tooltip"
                                                         data-placement="bottom"
                                                         title="test.png">test.png
                                                    </div>
                                                    <div class="_size regular-p1 text-muted">
                                                        102938
                                                    </div>
                                                </div>
                                                <div class="_download">
                                                    <svg width="32"
                                                         height="32"
                                                         viewBox="0 0 32 32"
                                                         fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="16"
                                                                cy="16"
                                                                r="16"
                                                                fill="#F06A6A"></circle>
                                                        <path d="M15.3737 17.9631C15.3887 17.9821 15.4078 17.9975 15.4297 18.008C15.4516 18.0186 15.4757 18.0241 15.5 18.0241C15.5243 18.0241 15.5484 18.0186 15.5703 18.008C15.5922 17.9975 15.6113 17.9821 15.6263 17.9631L17.8723 15.1452C17.9545 15.0418 17.8803 14.8886 17.746 14.8886H16.26V8.15909C16.26 8.07159 16.1878 8 16.0996 8H14.8964C14.8082 8 14.736 8.07159 14.736 8.15909V14.8866H13.254C13.1197 14.8866 13.0455 15.0398 13.1277 15.1432L15.3737 17.9631ZM22.8396 17.267H21.6364C21.5481 17.267 21.4759 17.3386 21.4759 17.4261V20.4886H9.52406V17.4261C9.52406 17.3386 9.45187 17.267 9.36364 17.267H8.16043C8.07219 17.267 8 17.3386 8 17.4261V21.3636C8 21.7156 8.28676 22 8.64171 22H22.3583C22.7132 22 23 21.7156 23 21.3636V17.4261C23 17.3386 22.9278 17.267 22.8396 17.267Z"
                                                              fill="white"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="file-item">
                                                <div class="_file-image">
                                                </div>
                                                <div class="_file-info">
                                                    <div class="_name regular-h6"
                                                         data-toggle="tooltip"
                                                         data-placement="bottom"
                                                         title="test.zip">test.zip
                                                    </div>
                                                    <div class="_size regular-p1 text-muted">
                                                        102938
                                                    </div>
                                                </div>
                                                <div class="_download">
                                                    <svg width="32"
                                                         height="32"
                                                         viewBox="0 0 32 32"
                                                         fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="16"
                                                                cy="16"
                                                                r="16"
                                                                fill="#F06A6A"></circle>
                                                        <path d="M15.3737 17.9631C15.3887 17.9821 15.4078 17.9975 15.4297 18.008C15.4516 18.0186 15.4757 18.0241 15.5 18.0241C15.5243 18.0241 15.5484 18.0186 15.5703 18.008C15.5922 17.9975 15.6113 17.9821 15.6263 17.9631L17.8723 15.1452C17.9545 15.0418 17.8803 14.8886 17.746 14.8886H16.26V8.15909C16.26 8.07159 16.1878 8 16.0996 8H14.8964C14.8082 8 14.736 8.07159 14.736 8.15909V14.8866H13.254C13.1197 14.8866 13.0455 15.0398 13.1277 15.1432L15.3737 17.9631ZM22.8396 17.267H21.6364C21.5481 17.267 21.4759 17.3386 21.4759 17.4261V20.4886H9.52406V17.4261C9.52406 17.3386 9.45187 17.267 9.36364 17.267H8.16043C8.07219 17.267 8 17.3386 8 17.4261V21.3636C8 21.7156 8.28676 22 8.64171 22H22.3583C22.7132 22 23 21.7156 23 21.3636V17.4261C23 17.3386 22.9278 17.267 22.8396 17.267Z"
                                                              fill="white"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="date-item">
                                        <div class="_date regular-h6">
                                            2022.11.02
                                        </div>
                                        <div class="_files"
                                             data-date="2022.11.02">
                                            <div class="file-item">
                                                <div class="_file-image">
                                                </div>
                                                <div class="_file-info">
                                                    <div class="_name regular-h6"
                                                         data-toggle="tooltip"
                                                         data-placement="bottom"
                                                         title="test.zip">test.zip
                                                    </div>
                                                    <div class="_size regular-p1 text-muted">
                                                        102938
                                                    </div>
                                                </div>
                                                <div class="_download">
                                                    <svg width="32"
                                                         height="32"
                                                         viewBox="0 0 32 32"
                                                         fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="16"
                                                                cy="16"
                                                                r="16"
                                                                fill="#F06A6A"></circle>
                                                        <path d="M15.3737 17.9631C15.3887 17.9821 15.4078 17.9975 15.4297 18.008C15.4516 18.0186 15.4757 18.0241 15.5 18.0241C15.5243 18.0241 15.5484 18.0186 15.5703 18.008C15.5922 17.9975 15.6113 17.9821 15.6263 17.9631L17.8723 15.1452C17.9545 15.0418 17.8803 14.8886 17.746 14.8886H16.26V8.15909C16.26 8.07159 16.1878 8 16.0996 8H14.8964C14.8082 8 14.736 8.07159 14.736 8.15909V14.8866H13.254C13.1197 14.8866 13.0455 15.0398 13.1277 15.1432L15.3737 17.9631ZM22.8396 17.267H21.6364C21.5481 17.267 21.4759 17.3386 21.4759 17.4261V20.4886H9.52406V17.4261C9.52406 17.3386 9.45187 17.267 9.36364 17.267H8.16043C8.07219 17.267 8 17.3386 8 17.4261V21.3636C8 21.7156 8.28676 22 8.64171 22H22.3583C22.7132 22 23 21.7156 23 21.3636V17.4261C23 17.3386 22.9278 17.267 22.8396 17.267Z"
                                                              fill="white"></path>
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
        </div>
    </div>
</div>
<div id="project-left-sidebar">
    <ul class="list-group">
        <li class="list-group-item first">crmPlug</li>
        <li class="list-group-item">
            <div class="_icon">
                <svg width="16"
                     height="16"
                     viewBox="0 0 16 16"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink">
                    <rect width="16"
                          height="16"
                          fill="url(#pattern0)"/>
                    <defs>
                        <pattern id="pattern0"
                                 patternContentUnits="objectBoundingBox"
                                 width="1"
                                 height="1">
                            <use xlink:href="#image0_260_4140"
                                 transform="scale(0.00694444)"/>
                        </pattern>
                        <image id="image0_260_4140"
                               width="144"
                               height="144"
                               xlink:href="data:image/png;base64,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"/>
                    </defs>
                </svg>
            </div>
            <div class="c-gray-dark-low bold-h6">기획</div>
        </li>
        <li class="list-group-item">
            <div class="_icon">
                <svg width="16"
                     height="16"
                     viewBox="0 0 16 16"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink">
                    <rect width="16"
                          height="16"
                          fill="url(#pattern0)"/>
                    <defs>
                        <pattern id="pattern0"
                                 patternContentUnits="objectBoundingBox"
                                 width="1"
                                 height="1">
                            <use xlink:href="#image0_260_4140"
                                 transform="scale(0.00694444)"/>
                        </pattern>
                        <image id="image0_260_4140"
                               width="144"
                               height="144"
                               xlink:href="data:image/png;base64,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"/>
                    </defs>
                </svg>
            </div>
            <div class="c-gray-dark-low bold-h6">개발</div>
        </li>
        <li class="list-group-item">
            <div class="_icon">
                <svg width="16"
                     height="16"
                     viewBox="0 0 16 16"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink">
                    <rect width="16"
                          height="16"
                          fill="url(#pattern0)"/>
                    <defs>
                        <pattern id="pattern0"
                                 patternContentUnits="objectBoundingBox"
                                 width="1"
                                 height="1">
                            <use xlink:href="#image0_260_4140"
                                 transform="scale(0.00694444)"/>
                        </pattern>
                        <image id="image0_260_4140"
                               width="144"
                               height="144"
                               xlink:href="data:image/png;base64,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"/>
                    </defs>
                </svg>
            </div>
            <div class="c-gray-dark-low bold-h6">디자인</div>
        </li>
        <li class="list-group-item _project-add">
            <svg width="18"
                 height="18"
                 viewBox="0 0 18 18"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9 0C4.02955 0 0 4.02955 0 9C0 13.9705 4.02955 18 9 18C13.9705 18 18 13.9705 18 9C18 4.02955 13.9705 0 9 0ZM9.81818 12.2727C9.81818 12.4897 9.73198 12.6978 9.57854 12.8513C9.4251 13.0047 9.217 13.0909 9 13.0909C8.783 13.0909 8.5749 13.0047 8.42146 12.8513C8.26802 12.6978 8.18182 12.4897 8.18182 12.2727V9.81818H5.72727C5.51028 9.81818 5.30217 9.73198 5.14873 9.57854C4.99529 9.4251 4.90909 9.217 4.90909 9C4.90909 8.783 4.99529 8.5749 5.14873 8.42146C5.30217 8.26802 5.51028 8.18182 5.72727 8.18182H8.18182V5.72727C8.18182 5.51028 8.26802 5.30217 8.42146 5.14873C8.5749 4.99529 8.783 4.90909 9 4.90909C9.217 4.90909 9.4251 4.99529 9.57854 5.14873C9.73198 5.30217 9.81818 5.51028 9.81818 5.72727V8.18182H12.2727C12.4897 8.18182 12.6978 8.26802 12.8513 8.42146C13.0047 8.5749 13.0909 8.783 13.0909 9C13.0909 9.217 13.0047 9.4251 12.8513 9.57854C12.6978 9.73198 12.4897 9.81818 12.2727 9.81818H9.81818V12.2727Z"
                      fill="#F06A6A"/>
            </svg>
        </li>
    </ul>
    <div class="_back">
        <svg width="32"
             height="32"
             viewBox="0 0 32 32"
             fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16 0C7.16364 0 0 7.16364 0 16C0 24.8364 7.16364 32 16 32C24.8364 32 32 24.8364 32 16C32 7.16364 24.8364 0 16 0ZM19.2102 11.2102C19.4751 10.9359 19.6217 10.5684 19.6184 10.1871C19.6151 9.80568 19.4621 9.44086 19.1925 9.17117C18.9228 8.90149 18.558 8.74852 18.1766 8.7452C17.7952 8.74189 17.4278 8.8885 17.1535 9.15345L11.3353 14.9716C11.0626 15.2444 10.9094 15.6143 10.9094 16C10.9094 16.3857 11.0626 16.7556 11.3353 17.0284L17.1535 22.8465C17.4278 23.1115 17.7952 23.2581 18.1766 23.2548C18.558 23.2515 18.9228 23.0985 19.1925 22.8288C19.4621 22.5591 19.6151 22.1943 19.6184 21.8129C19.6217 21.4316 19.4751 21.0641 19.2102 20.7898L14.4204 16L19.2102 11.2102Z"
                  fill="#F06A6A"/>
        </svg>
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
<script src="/resources/js/plugin/jkanban.js"></script>
<script src="/resources/js/plugin/jkanban-auto-scroll-plug.min.js"></script>
<!-- Module JS -->
<!-- Module JS 는 특정 페이지가 아니라 다양한 페이지에서 작동하는 부분으로 Event 및 Element 생성 및 다양한 화면에 진입했을 때
     공통적으로 로직을 수행하는 Javascript를 Module JS라고 한다.
     Selector (선택자)의 Length 및 Empty 여부를 예외처리로 해줘야한다.
     (선택자가 없으면 또는 선택자의 Length가 0이면 에러가 터질 수 있기 때문에) -->
<script src="/resources/js/module/sample.js"></script>
<script src="/resources/js/module/okiwi-crm-right-side.js"></script>
<script src="/resources/js/module/okiwi-jkanban.js"></script>
<script src="/resources/js/module/okiwi-list.js"></script>
<script src="/resources/js/module/okiwi-gantt.js"></script>
<script src="/resources/js/module/okiwi-file.js"></script>
<script src="/resources/js/validation.js"></script>
<script src="/resources/js/global-modal.js"></script>
<script src="/resources/js/api.js"></script>
<script src="/resources/js/crm/api.js"></script>
<script src="/resources/js/crm/api1.js"></script>
<!--Font Awesome-->
<script src="https://kit.fontawesome.com/3581631c82.js"
        crossorigin="anonymous"></script>
<script>
    let TEMP_HASH = getURLParamByPrevAndNext('project', 'detail');
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
                    selector: '#control-emoji-button',
                    insertInto: ['#comment-input'], // '.selector' can be used without array
                    clear: false
                },
            ],
            closeButton: true,
        });
        $('#project-tab button[data-toggle="tab"]').on('shown.bs.tab', function (event) {
            event.target // newly activated tab
            event.relatedTarget // previous active tab
            deleteChild(document.querySelector('.kanban-board-container'));
            deleteChild(document.querySelector('.list-container'));
            deleteChild(document.querySelector('.gantt-container'));
            let boards;

            //TODO 20221102 - 2번 - 우식, 지우
            switch (event.target.getAttribute('aria-controls')) {
                case 'feed':
                    //TODO Initialize Feed
                    apiGetProject(TEMP_HASH).then((result) => {
                        console.log('getProjects', result);
                        let boards = boardsTypeChanger(result.data.project.boardList);
                        initializeKanban(boards);
                    });
                    break;
                case 'list':
                    apiGetProject(TEMP_HASH).then((result) => {
                        console.log('getProjects', result);
                        let boards = boardsTypeChanger(result.data.project.boardList);
                        createList(boards);
                    });
                    break;
                case 'timeline':
                    apiGetProject(TEMP_HASH).then((result) => {
                        console.log('getProjects', result);
                        let boards = boardsTypeChanger(result.data.project.boardList);
                        let gantt_container = document.querySelector('.gantt-container');
                        createGantt(boards, gantt_container);

                        //Global Event
                        let timeline_container = document.querySelector('._gantt-timeline');
                        timeline_container.addEventListener('scroll', function (event) {
                            let offsetX = timeline_container.scrollLeft;
                            if (offsetX % 44 !== 0) {
                                let remainder = offsetX % 44;
                                let distance = 44 - remainder;
                                timeline_container.scrollLeft = offsetX + distance;
                            }
                        });
                        const slider_timeline = document.querySelector('.gantt-container ._gantt-timeline');
                        let isGanttDown = false;
                        let ganttStartX;
                        let ganttScrollLeft;

                        slider_timeline.addEventListener('mousedown', (e) => {
                            isGanttDown = true;
                            slider_timeline.classList.add('is-scroll');
                            ganttStartX = e.pageX - slider_timeline.offsetLeft;
                            ganttScrollLeft = slider_timeline.scrollLeft;
                        });
                        slider_timeline.addEventListener('mouseleave', () => {
                            isGanttDown = false;
                            slider_timeline.classList.remove('is-scroll');
                        });
                        slider_timeline.addEventListener('mouseup', () => {
                            isGanttDown = false;
                            slider_timeline.classList.remove('is-scroll');
                        });
                        slider_timeline.addEventListener('mousemove', (e) => {
                            if (!isGanttDown) return;
                            e.preventDefault();
                            const x = e.pageX - slider_timeline.offsetLeft;
                            const walk = (x - ganttStartX) * 1; //scroll-fast
                            slider_timeline.scrollLeft = ganttScrollLeft - walk;
                        });
                    });
                    break;
                case 'file':
                    //TODO 20221102 - 37번 - 지우 O
                    getProjectFiles(getURLParamByPrevAndNext('project', 'detail')).then((result) => {
                        console.log(result);
                        if (result.status === 'OK') {
                            if (result.data.status) {
                                let files = result.data.files;
                                files = filesChanger(files);
                                initializeFiles({files});
                            }
                        }
                    })
                    // let files = [{
                    //     name: 'test.png',
                    //     url: 'https://via.placeholder.com/350x150',
                    //     type: 'image/png',
                    //     size: 102938,
                    //     date: '2022.11.01'
                    // }, {
                    //     name: 'test.zip',
                    //     url: 'https://via.placeholder.com/350x150',
                    //     type: 'file',
                    //     size: 102938,
                    //     date: '2022.11.02'
                    // }, {
                    //     name: 'test.zip',
                    //     url: 'https://via.placeholder.com/350x150',
                    //     type: 'file',
                    //     size: 102938,
                    //     date: '2022.11.01'
                    // }];
                    break;
            }
        });

        //TODO First Initialize Feed Start
        //TODO 20221102 - 2번 - 우식, 지우
        apiGetProject(TEMP_HASH).then((result) => {
            console.log('getProjects', result);
            let boards = boardsTypeChanger(result.data.project.boardList);
            initializeKanban(boards);
        });

        //Context Menu Clear Event
        document.querySelector('.kanban-board-container').addEventListener('contextmenu', function (event) {
            let menu = document.querySelector('#context-menu');
            closeContextMenu(menu);
        });

        //Context Menu Event Initialize
        $('#context-menu').on('click', '.list-group a', contextMenuClickEventListener);

        //JKanban Auto Scroll in Dragging
        autoScroll([document.querySelector('.kanban-board-container')], {
            margin: 40,
            maxSpeed: 20,
            scrollWhenOutside: true,
            autoScroll: function () {
                //Only scroll when the pointer is down, and there is a child being dragged.
                return (this.down && kanban.drake.dragging) || (this.down && kanban.options.board_dragging);
            }
        });

        //Context Menu Clear Event
        $(document).on('click', '.kanban-item .dropright', function (event) {
            event.stopPropagation();
            event.preventDefault();
        });

        $(document).click(function (event) {
            let context_menu = document.querySelector('#context-menu');
            if ($(event.target.closest('#context-menu')).length === 0) {
                closeContextMenu(context_menu);
            }
        });

        const slider = document.querySelector('.kanban-board-container');
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('is-scroll');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('is-scroll');
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('is-scroll');
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1; //scroll-fast
            slider.scrollLeft = scrollLeft - walk;
        });

        document.querySelector('#project-left-sidebar ._back').addEventListener('click', function (event) {
            console.log(this);
            let project_left_sidebar = this.closest('#project-left-sidebar');
            let content_wrapper = document.querySelector('#l-content-wrapper');
            if (project_left_sidebar.classList.contains('is-close')) {
                project_left_sidebar.classList.remove('is-close');
                content_wrapper.classList.add('sidebar-is-open');
            } else {
                project_left_sidebar.classList.add('is-close');
                content_wrapper.classList.remove('sidebar-is-open');
            }
        });
        //First Initialize Feed End

        //TODO Initialize List Start
        let menu = document.querySelector('#list-context-menu');
        $(menu).on('click', '.list-group a', contextListMenuClickEventListener);
        $(document).on('contextmenu', 'tr._task', function (event) {
            const getScrollPosition = (el = window) => ({
                x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
                y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
            });
            let task = this;
            let position = {top: event.clientY + getScrollPosition().y, left: event.clientX + getScrollPosition().x};
            openListContextMenu(menu, position, task.dataset.boardId, task.dataset.id);
            event.stopPropagation();
            event.preventDefault();
        });
        $(document).on('click', function (event) {
            if ($(event.target.closest('#list-context-menu')).length === 0) {
                closeListContextMenu(menu);
            }
        });
        //Initialize List End
        //TODO Initialize Timeline Start
        //Context Menu Event Initialize
        $('#gantt-context-menu').on('click', '.list-group a', ganttContextMenuClickEventListener);

        $(document).click(function (event) {
            let context_menu = document.querySelector('#gantt-context-menu');
            if ($(event.target.closest('#gantt-context-menu')).length === 0) {
                closeGanttContextMenu(context_menu);
            }
            let gantt_board_option_menu = document.querySelector('#gantt-board-option-menu');
            if ($(event.target.closest('#gantt-board-option-menu')).length === 0) {
                closeGanttBoardOptionMenu(gantt_board_option_menu);
            }
        });
        //Initialize Timeline End
        //TODO Initialize Files Start

        //Initialize Files Start End
    });
</script>
</body>
</html>
