<%@ taglib prefix="c"
           uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.model.crm.Project" %>
<%@ page contentType="text/html;charset=UTF-8"
         language="java" %>
<%
    ArrayList<Project> projects = (ArrayList<Project>) request.getAttribute("projects");
    request.setAttribute("projects", projects);
    Project project = (Project) request.getAttribute("project");
    request.setAttribute("project", project);
%>
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
    <link rel="stylesheet"
          href="/resources/css/module/okiwi-preview.css">
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
                        <c:if test="${project.emoji ne null}">
                            <div class="_icon">
                                    ${project.emoji}
                            </div>
                        </c:if>
                        <div class="_name bold-h4 c-gray-dark-low">${project.name}</div>
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
        <li class="list-group-item first"
            onclick="new function() {
                    location.href = '/crm/project/${project.hash_no}/detail';
                    }">
            <c:if test="${project.emoji ne null}">
                <div class="_icon">
                        ${project.emoji}
                </div>
            </c:if>
            <div>
                ${project.name}
            </div>
        </li>
        <c:forEach items="${projects}"
                   var="project"
                   varStatus="status">
            <li class="list-group-item"
                onclick="new function() {
                        location.href = '/crm/project/${project.hash_no}/detail';
                        }"
                data-hash="${project.hash_no}">
                <c:if test="${project.emoji ne null}">
                    <div class="_icon">
                            ${project.emoji}
                    </div>
                </c:if>
                <div class="c-gray-dark-low bold-h6">${project.name}</div>
            </li>
        </c:forEach>
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
<div id="modal-container"></div>
<div id="alert-container"></div>
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
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"
        integrity="sha256-xLD7nhI62fcsEZK2/v8LsBcb4lG7dgULkuXoXB/j91c=" crossorigin="anonymous"></script>
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
<script src="/resources/js/module/modal.js"></script>
<script src="/resources/js/module/okiwi-crm-right-side.js"></script>
<script src="/resources/js/module/okiwi-jkanban.js"></script>
<script src="/resources/js/module/okiwi-list.js"></script>
<script src="/resources/js/module/okiwi-gantt.js"></script>
<script src="/resources/js/module/okiwi-file.js"></script>
<script src="/resources/js/module/okiwi-preview.js"></script>
<script src="/resources/js/validation.js"></script>
<script src="/resources/js/global-modal.js"></script>
<script src="/resources/js/api.js"></script>
<script src="/resources/js/crm/api.js"></script>
<script src="/resources/js/crm/api1.js"></script>
<script src="/resources/js/module/okiwi-websocket.js"></script>
<!--Font Awesome-->
<script src="https://kit.fontawesome.com/3581631c82.js"
        crossorigin="anonymous"></script>
<script>
    let HASH_PARAM = getURLParamByPrevAndNext('project', 'detail');
    /**
     * Static JS
     * Static JS는 특정 페이지 에서만 작동하는 부분으로 Event 및 Element 생성 및 화면에 진입했을 때의
     * 해당 화면만의 특정 로직을 수행하는 Javascript를 Static JS라고 한다.
     * */
    $(document).ready(function () {
        console.log('Static JS is ready');
        //Initialize WebSocket
        let websocket = initializeSocket({
            onOpen: (event, self) => {
                console.log('open', 'event', event, 'self', self);
            },
            onMessage: (event, self) => {
                console.log('message', 'event', event, 'self', self, 'data', event.data);
                let data = JSON.parse(event.data);
                console.log('MESSAGE', data);
                switch (data.action_type) {
                    case WEBSOCKET_ACTION_TYPE.CREATE.name:
                        switch (data.data.category) {
                            case WEBSOCKET_CATEGORY.CATEGORY.FEED.name:
                                switch (data.data.subcategory) {
                                    case WEBSOCKET_CATEGORY.CATEGORY.FEED.SUBCATEGORY.TASK.name:
                                        break;
                                    case WEBSOCKET_CATEGORY.CATEGORY.FEED.SUBCATEGORY.BOARD.name:
                                        break;
                                    case WEBSOCKET_CATEGORY.CATEGORY.FEED.SUBCATEGORY.PROJECT.name:
                                        break;
                                }
                                break;
                            case WEBSOCKET_CATEGORY.CATEGORY.LIST.name:
                                break;
                            case WEBSOCKET_CATEGORY.CATEGORY.TIMELINE.name:
                                break;
                            case WEBSOCKET_CATEGORY.CATEGORY.FILE.name:
                                break;
                            case WEBSOCKET_CATEGORY.CATEGORY.PROJECT.name:
                                break;
                            case WEBSOCKET_CATEGORY.CATEGORY.SIDE.name:
                                break;
                        }
                        break;
                    case WEBSOCKET_ACTION_TYPE.UPDATE.name:
                        console.log('UPDATE', data.data.category);
                        switch (data.data.category) {
                            case WEBSOCKET_CATEGORY.CATEGORY.FEED.name:
                                switch (data.data.subcategory) {
                                    case WEBSOCKET_CATEGORY.CATEGORY.FEED.SUBCATEGORY.TASK.name:
                                        switch (data.data.target) {
                                            case WEBSOCKET_CATEGORY.CATEGORY.FEED.SUBCATEGORY.TASK.TARGET.TITLE.name: {
                                                let task_element = kanban.findElement(data.data.data.id);
                                                let boardId = task_element.closest('.kanban-board[data-id]').dataset.id;
                                                let task = kanban.findTaskJSON(boardId, task_element.dataset.eid);
                                                task_element.querySelector('.kanban-item-title .title').innerHTML = task.title = data.data.data.name;
                                                /*TODO SIDE 적용 로직 미적용*/
                                                break;
                                            }
                                        }
                                        break;
                                    case WEBSOCKET_CATEGORY.CATEGORY.FEED.SUBCATEGORY.BOARD.name:
                                        break;
                                    case WEBSOCKET_CATEGORY.CATEGORY.FEED.SUBCATEGORY.PROJECT.name:
                                        break;
                                }
                                break;
                            case WEBSOCKET_CATEGORY.CATEGORY.LIST.name:
                                break;
                            case WEBSOCKET_CATEGORY.CATEGORY.TIMELINE.name:
                                break;
                            case WEBSOCKET_CATEGORY.CATEGORY.FILE.name:
                                break;
                            case WEBSOCKET_CATEGORY.CATEGORY.PROJECT.name:
                                break;
                            case WEBSOCKET_CATEGORY.CATEGORY.SIDE.name:
                                console.log('SIDE', data.data.subcategory, WEBSOCKET_CATEGORY.CATEGORY.SIDE.SUBCATEGORY.TASK.name);
                                switch (data.data.subcategory) {
                                    case WEBSOCKET_CATEGORY.CATEGORY.SIDE.SUBCATEGORY.TASK.name:
                                        console.log('TASK', data.data.subcategory);
                                        switch (data.data.target) {
                                            case WEBSOCKET_CATEGORY.CATEGORY.SIDE.SUBCATEGORY.TASK.TARGET.TITLE.name: {
                                                console.log('TITLE', data.data.target);
                                                /*TODO SIDE TASK LOGIC*/
                                                if (RIGHT_TASK_CONTAINER.dataset.id === data.data.data.id) {
                                                    RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._title input').value = data.data.data.name;
                                                }
                                                /*TODO FEED TASK LOGIC*/
                                                let task_element = kanban.findElement(data.data.data.id);
                                                let boardId = task_element.closest('.kanban-board[data-id]').dataset.id;
                                                let task = kanban.findTaskJSON(boardId, task_element.dataset.eid);
                                                task_element.querySelector('.kanban-item-title .title').innerHTML = task.title = data.data.data.name;
                                                break;
                                            }
                                            case WEBSOCKET_CATEGORY.CATEGORY.SIDE.SUBCATEGORY.TASK.TARGET.CHECK.name: {
                                                console.log('CHECK', data.data.target);
                                                /*TODO SIDE TASK LOGIC*/
                                                if (RIGHT_TASK_CONTAINER.dataset.id === data.data.data.id) {
                                                    let checkbox = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._title .checkbox');
                                                    if (data.data.data.check) {
                                                        checkbox.classList.add('is-checked');
                                                    } else {
                                                        checkbox.classList.remove('is-checked');
                                                    }
                                                }
                                                /*TODO FEED TASK LOGIC*/
                                                break;
                                            }
                                            case WEBSOCKET_CATEGORY.CATEGORY.SIDE.SUBCATEGORY.TASK.TARGET.MEMBER_ADD.name: {
                                                console.log('MEMBER_ADD', data.data.target);
                                                /*TODO SIDE TASK LOGIC*/
                                                if (RIGHT_TASK_CONTAINER.dataset.id === data.data.data.id) {
                                                    let assign_user_container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner ._info ._assign .user-item-container');
                                                    let assign_user_add = assign_user_container.querySelector('.user-item.add');
                                                    assign_user_add.before(createRightTaskAssignItem(data.data.data.profile));
                                                }
                                                /*TODO FEED TASK LOGIC*/
                                                break;
                                            }
                                            case WEBSOCKET_CATEGORY.CATEGORY.SIDE.SUBCATEGORY.TASK.TARGET.MEMBER_REMOVE.name: {
                                                console.log('MEMBER_REMOVE', data.data.target);
                                                /*TODO SIDE TASK LOGIC*/
                                                if (RIGHT_TASK_CONTAINER.dataset.id === data.data.data.id) {
                                                    let assign_user_container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner ._info ._assign .user-item-container');
                                                    let user_item = assign_user_container.querySelector('.user-item[data-no="' + data.data.data.user_no + '"]');
                                                    user_item.remove();
                                                }
                                                /*TODO FEED TASK LOGIC*/
                                                break;
                                            }
                                            case WEBSOCKET_CATEGORY.CATEGORY.SIDE.SUBCATEGORY.TASK.TARGET.DATE_START.name: {
                                                console.log('DATE_START', data.data.target);
                                                /*TODO SIDE TASK LOGIC*/
                                                if (RIGHT_TASK_CONTAINER.dataset.id === data.data.data.id) {
                                                    $('#start').val(data.data.data.start_date);
                                                }
                                                /*TODO FEED TASK LOGIC*/
                                                break;
                                            }
                                            case WEBSOCKET_CATEGORY.CATEGORY.SIDE.SUBCATEGORY.TASK.TARGET.DATE_END.name: {
                                                console.log('DATE_END', data.data.target);
                                                /*TODO SIDE TASK LOGIC*/
                                                if (RIGHT_TASK_CONTAINER.dataset.id === data.data.data.id) {
                                                    $('#end').val(data.data.data.end_date);
                                                }
                                                /*TODO FEED TASK LOGIC*/
                                                break;
                                            }
                                            case WEBSOCKET_CATEGORY.CATEGORY.SIDE.SUBCATEGORY.TASK.TARGET.DESCRIPTION.name: {
                                                console.log('DESCRIPTION', data.data.target);
                                                /*TODO SIDE TASK LOGIC*/
                                                if (RIGHT_TASK_CONTAINER.dataset.id === data.data.data.id) {
                                                    RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab .content-editable-container').innerHTML = data.data.data.content;
                                                }
                                                /*TODO FEED TASK LOGIC*/
                                                break;
                                            }
                                            case WEBSOCKET_CATEGORY.CATEGORY.SIDE.SUBCATEGORY.TASK.TARGET.SUBTASK_CHECK.name: {
                                                console.log('SUBTASK_CHECK', data.data.target);
                                                /*TODO SIDE TASK LOGIC*/
                                                if (RIGHT_TASK_CONTAINER.dataset.id === data.data.data.id) {
                                                    let checkbox = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._subtasks .subtask-item[data-id="' + data.data.data.subtask_id + '"]');
                                                    if (data.data.data.check) {
                                                        checkbox.classList.add('is-checked');
                                                    } else {
                                                        checkbox.classList.remove('is-checked');
                                                    }
                                                }
                                                /*TODO FEED TASK LOGIC*/
                                                break;
                                            }
                                            case WEBSOCKET_CATEGORY.CATEGORY.SIDE.SUBCATEGORY.TASK.TARGET.SUBTASK_NAME.name: {
                                                console.log('SUBTASK_NAME', data.data.target);
                                                /*TODO SIDE TASK LOGIC*/
                                                if (RIGHT_TASK_CONTAINER.dataset.id === data.data.data.id) {
                                                    let subtask_item = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._subtasks .subtask-item[data-id="' + data.data.data.subtask_id + '"]');
                                                    let input = subtask_item.querySelector('._title input');
                                                    input.value = data.data.data.name;
                                                }
                                                /*TODO FEED TASK LOGIC*/
                                                break;
                                            }
                                            case WEBSOCKET_CATEGORY.CATEGORY.SIDE.SUBCATEGORY.TASK.TARGET.SUBTASK.name: {
                                                console.log('SUBTASK', data.data.target);
                                                /*TODO SIDE TASK LOGIC*/
                                                if (RIGHT_TASK_CONTAINER.dataset.id === data.data.data.id) {
                                                    let subtasks_container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._subtasks');
                                                    let subtask_add = subtasks_container.querySelector('.subtask-item.add');
                                                    subtask_add.before(createRightSubtaskItem(data.data.data.subtask));
                                                }
                                                /*TODO FEED TASK LOGIC*/
                                                break;
                                            }
                                            case WEBSOCKET_CATEGORY.CATEGORY.SIDE.SUBCATEGORY.TASK.TARGET.SUBTASK_REMOVE.name: {
                                                console.log('SUBTASK_REMOVE', data.data.target);
                                                /*TODO SIDE TASK LOGIC*/
                                                if (RIGHT_TASK_CONTAINER.dataset.id === data.data.data.id) {
                                                    let subtask_item = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._subtasks .subtask-item[data-id="' + data.data.data.subtask_id + '"]');
                                                    subtask_item.remove();
                                                }
                                                /*TODO FEED TASK LOGIC*/
                                                break;
                                            }
                                            case WEBSOCKET_CATEGORY.CATEGORY.SIDE.SUBCATEGORY.TASK.TARGET.COMMENT.name: {
                                                console.log('COMMENT', data.data.target);
                                                /*TODO SIDE TASK LOGIC*/
                                                if (RIGHT_TASK_CONTAINER.dataset.id === data.data.data.id) {
                                                    let comments_container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._comments');
                                                    comments_container.appendChild(createRightTaskCommentItem(data.data.data.comment));
                                                }
                                                /*TODO FEED TASK LOGIC*/
                                                break;
                                            }
                                        }
                                        break;
                                    case WEBSOCKET_CATEGORY.CATEGORY.SIDE.SUBCATEGORY.BOARD.name:
                                        break;
                                    case WEBSOCKET_CATEGORY.CATEGORY.SIDE.SUBCATEGORY.PROJECT.name:
                                        break;
                                }
                                break;
                        }
                        break;
                    case WEBSOCKET_ACTION_TYPE.DELETE.name:
                        switch (data.data.category) {
                            case WEBSOCKET_CATEGORY.CATEGORY.FEED.name:
                                switch (data.data.subcategory) {
                                    case WEBSOCKET_CATEGORY.CATEGORY.FEED.SUBCATEGORY.TASK.name:
                                        break;
                                    case WEBSOCKET_CATEGORY.CATEGORY.FEED.SUBCATEGORY.BOARD.name:
                                        break;
                                    case WEBSOCKET_CATEGORY.CATEGORY.FEED.SUBCATEGORY.PROJECT.name:
                                        break;
                                }
                                break;
                            case WEBSOCKET_CATEGORY.CATEGORY.LIST.name:
                                break;
                            case WEBSOCKET_CATEGORY.CATEGORY.TIMELINE.name:
                                break;
                            case WEBSOCKET_CATEGORY.CATEGORY.FILE.name:
                                break;
                            case WEBSOCKET_CATEGORY.CATEGORY.PROJECT.name:
                                break;
                            case WEBSOCKET_CATEGORY.CATEGORY.SIDE.name:
                                switch (data.data.subcategory) {
                                    case WEBSOCKET_CATEGORY.CATEGORY.SIDE.SUBCATEGORY.TASK.name:
                                        switch (data.data.target) {
                                            case WEBSOCKET_CATEGORY.CATEGORY.SIDE.SUBCATEGORY.TASK.TARGET.TASK.name: {
                                                console.log('TASK', data.data.target);
                                                /*TODO SIDE TASK LOGIC*/
                                                if (RIGHT_TASK_CONTAINER.dataset.id === data.data.data.id) {
                                                    rightTaskClose();
                                                }
                                                /*TODO FEED TASK LOGIC*/
                                                break;
                                            }
                                        }
                                        break;
                                    case WEBSOCKET_CATEGORY.CATEGORY.SIDE.SUBCATEGORY.BOARD.name:
                                        break;
                                    case WEBSOCKET_CATEGORY.CATEGORY.SIDE.SUBCATEGORY.PROJECT.name:
                                        break;
                                }
                                break;
                        }
                        break;
                    case WEBSOCKET_ACTION_TYPE.READ.name:
                        switch (data.data.category) {
                            case WEBSOCKET_CATEGORY.CATEGORY.FEED.name:
                                switch (data.data.subcategory) {
                                    case WEBSOCKET_CATEGORY.CATEGORY.FEED.SUBCATEGORY.TASK.name:
                                        break;
                                    case WEBSOCKET_CATEGORY.CATEGORY.FEED.SUBCATEGORY.BOARD.name:
                                        break;
                                    case WEBSOCKET_CATEGORY.CATEGORY.FEED.SUBCATEGORY.PROJECT.name:
                                        break;
                                }
                                break;
                            case WEBSOCKET_CATEGORY.CATEGORY.LIST.name:
                                break;
                            case WEBSOCKET_CATEGORY.CATEGORY.TIMELINE.name:
                                break;
                            case WEBSOCKET_CATEGORY.CATEGORY.FILE.name:
                                break;
                            case WEBSOCKET_CATEGORY.CATEGORY.PROJECT.name:
                                break;
                            case WEBSOCKET_CATEGORY.CATEGORY.SIDE.name:
                                break;
                        }
                        break;
                    default:
                        throw new Error('data action type is not found in onMessage');
                }
            },
            onClose: (event, self) => {
                console.log('close code', event.code, 'close reason', event.reason, 'self', self);
            },
            onError: (event, self) => {
                console.log('error', event, 'self', self);
            },
            onSend: (data, self) => {
                console.log('send', JSON.stringify(data), 'self', self);
                self.send(JSON.stringify(data));
            },
            disconnect: () => {
                this.close();
            },
        }, {
            plugin_type: WEBSOCKET_PLUG_TYPE.CRM.name,
            user_no: 10
        });
        if (RIGHT_TASK_CONTAINER !== null && RIGHT_TASK_CONTAINER !== undefined) {
            initializeRightTask(websocket);
        } else {
            throw new Error('RIGHT_TASK_CONTAINER is null or undefined');
        }
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
                    apiGetProject(HASH_PARAM).then((result) => {
                        console.log('getProjects', result);
                        let boards = boardsTypeChanger(result.data.project.boardList);
                        initializeKanban(boards);
                    });
                    break;
                case 'list':
                    apiGetProject(HASH_PARAM).then((result) => {
                        console.log('getProjects', result);
                        let boards = boardsTypeChanger(result.data.project.boardList);
                        createList(boards);
                    });
                    break;
                case 'timeline':
                    apiGetProject(HASH_PARAM).then((result) => {
                        console.log('getProjects', result);
                        let boards = boardsTypeChanger(result.data.project.boardList);
                        let gantt_container = document.querySelector('.gantt-container');
                        createGantt(boards, gantt_container);
                        //Global Event Scroll Left
                        const slider_timeline = document.querySelector('.gantt-container ._gantt-timeline');
                        let ganttStartX;
                        let ganttScrollLeft;
                        let isGanttDown = false;
                        let isCtrlDown = false;
                        slider_timeline.addEventListener('mousedown', (e) => {
                            console.log(e);
                            isCtrlDown = e.ctrlKey || e.shiftKey || e.altKey;
                            isGanttDown = true;
                            slider_timeline.classList.add('is-scroll');
                            ganttStartX = e.pageX - slider_timeline.offsetLeft;
                            ganttScrollLeft = slider_timeline.scrollLeft;
                        });
                        slider_timeline.addEventListener('mouseleave', () => {
                            isGanttDown = false;
                            isCtrlDown = false;
                            slider_timeline.classList.remove('is-scroll');
                        });
                        slider_timeline.addEventListener('mouseup', () => {
                            isGanttDown = false;
                            isCtrlDown = false;
                            slider_timeline.classList.remove('is-scroll');
                        });
                        slider_timeline.addEventListener('mousemove', (e) => {
                            if (!isGanttDown) return;
                            e.preventDefault();
                            const x = e.pageX - slider_timeline.offsetLeft;
                            const x_walk = (x - ganttStartX) * 1; //scroll-fast
                            if (!isCtrlDown) {
                                slider_timeline.scrollLeft = ganttScrollLeft - x_walk;
                            }
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
                    });
                    break;
            }
        });

        //TODO First Initialize Feed Start
        //TODO 20221102 - 2번 - 우식, 지우
        apiGetProject(HASH_PARAM).then((result) => {
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
