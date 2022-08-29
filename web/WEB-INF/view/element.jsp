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
          href="../../resources/css/base/reset.css">
    <link rel="stylesheet"
          href="../../resources/css/base/default.css">
    <link rel="stylesheet"
          href="../../resources/css/base/common.css">
    <!-- Theme -->
    <link rel="stylesheet"
          href="../../resources/css/theme/theme.css">
    <!-- Layout -->
    <link rel="stylesheet"
          href="../../resources/css/layout/layout.css">
    <link rel="stylesheet"
          href="../../resources/css/layout/res-layout.css">
    <!-- Plugin -->
    <link rel="stylesheet"
          href="../../resources/css/plugin/sample.css">
    <!-- State -->
    <link rel="stylesheet"
          href="../../resources/css/state/state.css">
    <link rel="stylesheet"
          href="../../resources/css/state/res-state.css">
    <!-- Module -->
    <link rel="stylesheet"
          href="../../resources/css/module/module.css">
    <link rel="stylesheet"
          href="../../resources/css/module/res-module.css">
    <!-- Element -->
    <link rel="stylesheet"
          href="../../resources/css/base/element.css">
    <link rel="stylesheet"
          href="../../resources/css/module/modal.css">

    <title>ELEMENT</title>
    <style>
        h3 {
            margin-top: 15px !important;
            margin-bottom: 15px !important;
        }

        h6 {
            margin-top: 15px !important;
            margin-bottom: 15px !important;
        }
    </style>
</head>
<body>
<div id="element-section"
     class="container-fluid mt-5 mb-5">
    <h3>Tab</h3>
    <div class="row">
        <div class="col-12">
            <ul class="nav nav-tabs tabs"
                id="myTab"
                role="tablist">
                <li class="nav-item"
                    role="presentation">
                    <button class="nav-link p-16 active"
                            id="plugin-tab"
                            data-toggle="tab"
                            data-target="#plugin"
                            type="button"
                            role="tab"
                            aria-controls="plugin"
                            aria-selected="true">Plug-In
                    </button>
                </li>
                <li class="nav-item"
                    role="presentation">
                    <button class="nav-link p-16"
                            id="api-tab"
                            data-toggle="tab"
                            data-target="#api"
                            type="button"
                            role="tab"
                            aria-controls="api"
                            aria-selected="false">API
                    </button>
                </li>
                <li class="nav-item"
                    role="presentation">
                    <button class="nav-link p-16"
                            id="community-tab"
                            data-toggle="tab"
                            data-target="#community"
                            type="button"
                            role="tab"
                            aria-controls="community"
                            aria-selected="false">Community
                    </button>
                </li>
                <li class="nav-item ml-auto"
                    role="presentation">
                    <button class="nav-link active p-16"
                            type="button">Search
                    </button>
                </li>
            </ul>
            <div class="tab-content"
                 id="myTabContent">
                <div class="tab-pane fade show active"
                     id="plugin"
                     role="tabpanel"
                     aria-labelledby="plugin-tab">
                    Plugin Contents
                </div>
                <div class="tab-pane fade"
                     id="api"
                     role="tabpanel"
                     aria-labelledby="api-tab">
                    API Contents
                </div>
                <div class="tab-pane fade"
                     id="community"
                     role="tabpanel"
                     aria-labelledby="community-tab">
                    Community Contents
                </div>
            </div>
        </div>
    </div>
    <h3>Input</h3>
    <div class="row">
        <div class="col-3">
            <h6>General</h6>
            <input type="text"
                   placeholder="placeholder"
                   class="form-control form-general regular-h5 p-16">
        </div>
        <div class="col-3">
            <h6>Focus</h6>
            <input type="text"
                   placeholder="placeholder"
                   value="value"
                   class="form-control form-general is-focus regular-h5 p-16">
        </div>
        <div class="col-3">
            <h6>Disabled</h6>
            <input type="text"
                   placeholder="placeholder"
                   disabled="disabled"
                   value="value"
                   class="form-control form-general regular-h5 p-16">
            <h6>Disabled</h6>
            <input type="text"
                   placeholder="placeholder"
                   value="value"
                   class="form-control form-general is-disabled regular-h5 p-16">
        </div>
        <div class="col-3">
            <h6>Append</h6>
            <div class="form-group inner-append is-append">
                <input type="text"
                       placeholder="placeholder"
                       value="value"
                       class="form-control form-general regular-h5 p-16">
                <p class="bold-h5 c-gray-dark-low">05:50</p>
            </div>
            <h6>Not Append</h6>
            <div class="form-group inner-append">
                <input type="text"
                       placeholder="placeholder"
                       value="value"
                       class="form-control form-general regular-h5 p-16">
                <p class="bold-h5 c-gray-dark-low">05:50</p>
            </div>
        </div>
    </div>
    <h3>Icon + Text</h3>
    <div class="row">
        <div class="col-2">
            <h6>Icon + Text Fill Type</h6>
            <div class="icon-text medium-h5">
                <svg width="16"
                     height="16"
                     viewBox="0 0 16 16"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.66663 14.6666C2.66663 13.2521 3.22853 11.8956 4.22872 10.8954C5.22892 9.8952 6.58547 9.33329 7.99996 9.33329C9.41445 9.33329 10.771 9.8952 11.7712 10.8954C12.7714 11.8956 13.3333 13.2521 13.3333 14.6666H12C12 13.6058 11.5785 12.5883 10.8284 11.8382C10.0782 11.0881 9.06082 10.6666 7.99996 10.6666C6.93909 10.6666 5.92168 11.0881 5.17153 11.8382C4.42139 12.5883 3.99996 13.6058 3.99996 14.6666H2.66663ZM7.99996 8.66663C5.78996 8.66663 3.99996 6.87663 3.99996 4.66663C3.99996 2.45663 5.78996 0.666626 7.99996 0.666626C10.21 0.666626 12 2.45663 12 4.66663C12 6.87663 10.21 8.66663 7.99996 8.66663ZM7.99996 7.33329C9.47329 7.33329 10.6666 6.13996 10.6666 4.66663C10.6666 3.19329 9.47329 1.99996 7.99996 1.99996C6.52663 1.99996 5.33329 3.19329 5.33329 4.66663C5.33329 6.13996 6.52663 7.33329 7.99996 7.33329Z"
                          fill="#383838"/>
                </svg>
                <span class="c-gray-dark-medium">65</span>
            </div>
            <h6>Icon + Text Fill Type Gray</h6>
            <div class="icon-text medium-h5">
                <svg width="16"
                     height="16"
                     viewBox="0 0 16 16"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.66663 14.6666C2.66663 13.2521 3.22853 11.8956 4.22872 10.8954C5.22892 9.8952 6.58547 9.33329 7.99996 9.33329C9.41445 9.33329 10.771 9.8952 11.7712 10.8954C12.7714 11.8956 13.3333 13.2521 13.3333 14.6666H12C12 13.6058 11.5785 12.5883 10.8284 11.8382C10.0782 11.0881 9.06082 10.6666 7.99996 10.6666C6.93909 10.6666 5.92168 11.0881 5.17153 11.8382C4.42139 12.5883 3.99996 13.6058 3.99996 14.6666H2.66663ZM7.99996 8.66663C5.78996 8.66663 3.99996 6.87663 3.99996 4.66663C3.99996 2.45663 5.78996 0.666626 7.99996 0.666626C10.21 0.666626 12 2.45663 12 4.66663C12 6.87663 10.21 8.66663 7.99996 8.66663ZM7.99996 7.33329C9.47329 7.33329 10.6666 6.13996 10.6666 4.66663C10.6666 3.19329 9.47329 1.99996 7.99996 1.99996C6.52663 1.99996 5.33329 3.19329 5.33329 4.66663C5.33329 6.13996 6.52663 7.33329 7.99996 7.33329Z"
                          fill="#969696"/>
                </svg>
                <span class="c-gray-medium">65</span>
            </div>
        </div>
    </div>
    <h3>Button</h3>
    <div class="row">
        <div class="col-6">
            <h6>Small Button</h6>
            <button type="button"
                    class="btn btn-sm btn-gray-dark-low">lorem ipsume
            </button>
            <button type="button"
                    class="btn btn-sm btn-gray-high-light">lorem ipsume
            </button>
            <button type="button"
                    class="btn btn-sm btn-medium btn-outline-gray-high-light">lorem ipsume
            </button>
            <h6>Normal Button</h6>
            <button type="button"
                    class="btn btn-gray-dark-low">lorem ipsume
            </button>
            <button type="button"
                    class="btn btn-gray-high-light">lorem ipsume
            </button>
            <button type="button"
                    class="btn btn-medium btn-outline-gray-high-light">lorem ipsume
            </button>
            <button type="button"
                    class="btn btn-medium btn-outline-gray-dark-low border-2px">lorem ipsume
            </button>
            <button type="button"
                    class="btn btn-medium btn-outline-gray-dark-low">lorem ipsume
            </button>
            <h6>Block Button</h6>
            <button type="button"
                    class="btn btn-block btn-gray-dark-low">lorem ipsume
            </button>
            <h6>Active Type (Non Active)</h6>
            <button type="button"
                    class="btn btn-block btn-gray-high-light active-type">lorem ipsume
            </button>
            <h6>Active Type (Active)</h6>
            <button type="button"
                    class="btn btn-block btn-gray-high-light active-type is-active">lorem ipsume
            </button>
            <h6>Transparent</h6>
            <button type="button"
                    class="btn btn-block btn-transparent c-brand-purple">lorem ipsume
            </button>
        </div>
    </div>
    <h3>Checkbox</h3>
    <div class="row">
        <div class="col-2">
            <h6>Checkbox</h6>
            <label data-label="checkbox"
                   class="checkbox-item">
                <input id="checkbox-1"
                       data-type="checkbox"
                       type="checkbox"
                       name="checkbox-name-1">
                <span class="_checkbox"></span>
                <span class="_text bold-h5 c-gray-dark-low">전체 동의</span>
            </label>
            <h6>Checkbox Child Type</h6>
            <label data-label="checkbox"
                   class="checkbox-item">
                <input id="checkbox-2"
                       data-type="checkbox"
                       type="checkbox"
                       name="checkbox-name-2">
                <span class="_checkbox no-border"></span>
                <span class="_text bold-h5 c-gray-dark-low">서비스 이용약관 동의 (필수)</span>
            </label>

            <h6>Checkbox Child Type + Link</h6>
            <div class="d-flex">
                <label data-label="checkbox"
                       class="checkbox-item">
                    <input id="checkbox-3"
                           data-type="checkbox"
                           type="checkbox"
                           name="checkbox-name-3">
                    <span class="_checkbox no-border"></span>
                    <span class="_text bold-h5 c-gray-dark-low">서비스 이용약관 동의 (필수)</span>
                </label>
                <svg class="ml-auto cursor-pointer my-auto"
                     width="20"
                     height="20"
                     viewBox="0 0 20 20"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.9767 9.99999L6.85171 5.87499L8.03004 4.69666L13.3334 9.99999L8.03004 15.3033L6.85171 14.125L10.9767 9.99999Z"
                          fill="#222222"/>
                </svg>
            </div>
        </div>
    </div>
    <h3>Media Object</h3>
    <div class="row">
        <div class="col-12">
            <div class="media plugin-item p-16">
                <img src="../../resources/assets/images/sample/plugin-sample-1.png"
                     class="align-self-start mr-20">
                <div class="media-body">
                    <h5 class="bold-h5 mb-8">QeuryPlug - 데이터베이스 ERD 및 SQL 자동 생성</h5>
                    <p class="_desc regular-h5 c-gray-medium">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam autem ducimus enim
                        eum
                        exercitationem facilis fugiat ipsam laboriosam maiores maxime nam odio quisquam recusandae rem,
                        sapiente
                        tenetur, veritatis vero? </p>
                </div>
                <div class="_install">
                    <div class="_usage mr-16">
                        <div class="icon-text medium-h5">
                            <svg width="16"
                                 height="16"
                                 viewBox="0 0 16 16"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.66663 14.6666C2.66663 13.2521 3.22853 11.8956 4.22872 10.8954C5.22892 9.8952 6.58547 9.33329 7.99996 9.33329C9.41445 9.33329 10.771 9.8952 11.7712 10.8954C12.7714 11.8956 13.3333 13.2521 13.3333 14.6666H12C12 13.6058 11.5785 12.5883 10.8284 11.8382C10.0782 11.0881 9.06082 10.6666 7.99996 10.6666C6.93909 10.6666 5.92168 11.0881 5.17153 11.8382C4.42139 12.5883 3.99996 13.6058 3.99996 14.6666H2.66663ZM7.99996 8.66663C5.78996 8.66663 3.99996 6.87663 3.99996 4.66663C3.99996 2.45663 5.78996 0.666626 7.99996 0.666626C10.21 0.666626 12 2.45663 12 4.66663C12 6.87663 10.21 8.66663 7.99996 8.66663ZM7.99996 7.33329C9.47329 7.33329 10.6666 6.13996 10.6666 4.66663C10.6666 3.19329 9.47329 1.99996 7.99996 1.99996C6.52663 1.99996 5.33329 3.19329 5.33329 4.66663C5.33329 6.13996 6.52663 7.33329 7.99996 7.33329Z"
                                      fill="#383838"/>
                            </svg>
                            <span class="c-gray-dark-medium">65</span>
                        </div>
                    </div>
                    <button type="button"
                            class="btn btn-sm btn-gray-dark-low">설치하기
                    </button>
                </div>
                <div class="_date medium-h5 c-gray-dark-medium">3시간 전</div>
            </div>
            <div class="media plugin-item p-16">
                <img src="../../resources/assets/images/sample/plugin-sample-2.png"
                     class="align-self-start mr-20">
                <div class="media-body">
                    <h5 class="bold-h5 mb-8">QeuryPlug - 데이터베이스 ERD 및 SQL 자동 생성</h5>
                    <p class="_desc regular-h5 c-gray-medium">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam autem ducimus enim
                        eum
                        exercitationem facilis fugiat ipsam laboriosam maiores maxime nam odio quisquam recusandae rem,
                        sapiente
                        tenetur, veritatis vero? </p>
                </div>
                <div class="_install">
                    <div class="_usage mr-16">
                        <div class="icon-text medium-h5">
                            <svg width="16"
                                 height="16"
                                 viewBox="0 0 16 16"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.66663 14.6666C2.66663 13.2521 3.22853 11.8956 4.22872 10.8954C5.22892 9.8952 6.58547 9.33329 7.99996 9.33329C9.41445 9.33329 10.771 9.8952 11.7712 10.8954C12.7714 11.8956 13.3333 13.2521 13.3333 14.6666H12C12 13.6058 11.5785 12.5883 10.8284 11.8382C10.0782 11.0881 9.06082 10.6666 7.99996 10.6666C6.93909 10.6666 5.92168 11.0881 5.17153 11.8382C4.42139 12.5883 3.99996 13.6058 3.99996 14.6666H2.66663ZM7.99996 8.66663C5.78996 8.66663 3.99996 6.87663 3.99996 4.66663C3.99996 2.45663 5.78996 0.666626 7.99996 0.666626C10.21 0.666626 12 2.45663 12 4.66663C12 6.87663 10.21 8.66663 7.99996 8.66663ZM7.99996 7.33329C9.47329 7.33329 10.6666 6.13996 10.6666 4.66663C10.6666 3.19329 9.47329 1.99996 7.99996 1.99996C6.52663 1.99996 5.33329 3.19329 5.33329 4.66663C5.33329 6.13996 6.52663 7.33329 7.99996 7.33329Z"
                                      fill="#383838"/>
                            </svg>
                            <span class="c-gray-dark-medium">65</span>
                        </div>
                    </div>
                    <button type="button"
                            class="btn btn-sm btn-gray-dark-low">설치하기
                    </button>
                </div>
                <div class="_date medium-h5 c-gray-dark-medium">3시간 전</div>
            </div>
            <div class="media plugin-item p-16">
                <img src="../../resources/assets/images/sample/plugin-sample-3.png"
                     class="align-self-start mr-20">
                <div class="media-body">
                    <h5 class="bold-h5 mb-8">QeuryPlug - 데이터베이스 ERD 및 SQL 자동 생성</h5>
                    <p class="_desc regular-h5 c-gray-medium">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam autem ducimus enim
                        eum
                        exercitationem facilis fugiat ipsam laboriosam maiores maxime nam odio quisquam recusandae rem,
                        sapiente
                        tenetur, veritatis vero? </p>
                </div>
                <div class="_install">
                    <div class="_usage mr-16">
                        <div class="icon-text medium-h5">
                            <svg width="16"
                                 height="16"
                                 viewBox="0 0 16 16"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.66663 14.6666C2.66663 13.2521 3.22853 11.8956 4.22872 10.8954C5.22892 9.8952 6.58547 9.33329 7.99996 9.33329C9.41445 9.33329 10.771 9.8952 11.7712 10.8954C12.7714 11.8956 13.3333 13.2521 13.3333 14.6666H12C12 13.6058 11.5785 12.5883 10.8284 11.8382C10.0782 11.0881 9.06082 10.6666 7.99996 10.6666C6.93909 10.6666 5.92168 11.0881 5.17153 11.8382C4.42139 12.5883 3.99996 13.6058 3.99996 14.6666H2.66663ZM7.99996 8.66663C5.78996 8.66663 3.99996 6.87663 3.99996 4.66663C3.99996 2.45663 5.78996 0.666626 7.99996 0.666626C10.21 0.666626 12 2.45663 12 4.66663C12 6.87663 10.21 8.66663 7.99996 8.66663ZM7.99996 7.33329C9.47329 7.33329 10.6666 6.13996 10.6666 4.66663C10.6666 3.19329 9.47329 1.99996 7.99996 1.99996C6.52663 1.99996 5.33329 3.19329 5.33329 4.66663C5.33329 6.13996 6.52663 7.33329 7.99996 7.33329Z"
                                      fill="#383838"/>
                            </svg>
                            <span class="c-gray-dark-medium">65</span>
                        </div>
                    </div>
                    <button type="button"
                            class="btn btn-sm btn-gray-dark-low">설치하기
                    </button>
                </div>
                <div class="_date medium-h5 c-gray-dark-medium">3시간 전</div>
            </div>
        </div>
    </div>
    <h3>Modals</h3>
    <h6 class="mb-2">- Auth Modals</h6>
    <div class="row">
        <div class="col-12">
            <button type="button"
                    class="btn btn-sm btn-gray-dark-low" data-toggle="modal" data-target="#register-modal">
                Register Modal
            </button>
            <button type="button"
                    class="btn btn-sm btn-gray-high-light" data-toggle="modal" data-target="#login-modal">Login Modal
            </button>
            <button type="button"
                    class="btn btn-sm btn-medium btn-outline-gray-high-light" data-toggle="modal"
                    data-target="#find-email-modal">find email
            </button>
            <button type="button"
                    class="btn btn-sm btn-medium btn-outline-gray-high-light" data-toggle="modal"
                    data-target="#email-result-modal">email result
            </button>
            <button type="button"
                    class="btn btn-sm btn-medium btn-outline-gray-high-light" data-toggle="modal"
                    data-target="#find-password-modal">find password
            </button>
            <button type="button"
                    class="btn btn-sm btn-medium btn-outline-gray-high-light" data-toggle="modal"
                    data-target="#password-validate-modal">password validate
            </button>
            <button type="button"
                    class="btn btn-sm btn-medium btn-outline-gray-high-light" data-toggle="modal"
                    data-target="#password-change-modal">password change
            </button>
            <button type="button"
                    class="btn btn-sm btn-medium btn-outline-gray-high-light" data-toggle="modal"
                    data-target="#corporation-type-modal">corporation type
            </button>
            <button type="button"
                    class="btn btn-sm btn-medium btn-outline-gray-high-light" data-toggle="modal"
                    data-target="#corporation-create-modal">corporation create
            </button>
            <button type="button"
                    class="btn btn-sm btn-medium btn-outline-gray-high-light" data-toggle="modal"
                    data-target="#corporation-find-modal">corporation find
            </button>
            <button type="button"
                    class="btn btn-sm btn-medium btn-outline-gray-high-light" data-toggle="modal"
                    data-target="#corporation-select-modal">corporation select
            </button>
        </div>
    </div>
    <h6 class="mb-2">- business Modals</h6>
    <div class="row">
        <div class="col-12">
            <button type="button"
                    class="btn btn-sm btn-gray-dark-low" data-toggle="modal" data-target="#setting-modal">
                Setting Modal
            </button>
        </div>
    </div>
</div>
<!-- ** Auth Modals ** -->
<!-- Register Modal -->
<div class="modal fade"
     id="register-modal"
     data-backdrop="static"
     data-keyboard="false"
     tabindex="-1"
     aria-labelledby="staticBackdropLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="_header text-center mb-48">
                    <div class="_title mb-2 bold-h1 c-gray-dark-low">
                        회원가입
                    </div>
                    <div class="_desc c-gray-dark-light">
                        이메일과 비밀번호를 입력해주세요.
                    </div>
                </div>
                <div class="_body mb-20">
                    <input type="text"
                           placeholder="이름"
                           class="form-control form-general regular-h5 p-16 mb-20">
                    <input type="text"
                           placeholder="연락처"
                           class="form-control form-general regular-h5 p-16 mb-20">
                    <input type="text"
                           placeholder="이메일"
                           class="form-control form-general regular-h5 p-16 mb-20">
                    <input type="text"
                           placeholder="비밀번호"
                           class="form-control form-general regular-h5 p-16">
                </div>
                <div class="_agree mb-48">
                    <div class="mb-12">
                        <label data-label="checkbox"
                               class="checkbox-item">
                            <input id="agree-all"
                                   data-type="checkbox"
                                   type="checkbox"
                                   name="agree-all">
                            <span class="_checkbox"></span>
                            <span class="_text bold-h5 c-gray-dark-low">전체 동의</span>
                        </label>
                    </div>
                    <div class="ml-24">
                        <div class="d-flex mb-8">
                            <label data-label="checkbox"
                                   class="checkbox-item">
                                <input id="agree-1"
                                       data-type="checkbox"
                                       type="checkbox"
                                       name="agree-1">
                                <span class="_checkbox no-border"></span>
                                <span class="_text medium-h5 c-gray-dark-low">서비스 이용약관 동의 (필수)</span>
                            </label>
                            <svg class="ml-auto cursor-pointer my-auto"
                                 width="20"
                                 height="20"
                                 viewBox="0 0 20 20"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.9767 9.99999L6.85171 5.87499L8.03004 4.69666L13.3334 9.99999L8.03004 15.3033L6.85171 14.125L10.9767 9.99999Z"
                                      fill="#222222"></path>
                            </svg>
                        </div>
                        <div class="d-flex mb-8">
                            <label data-label="checkbox"
                                   class="checkbox-item">
                                <input id="agree-2"
                                       data-type="checkbox"
                                       type="checkbox"
                                       name="agree-2">
                                <span class="_checkbox no-border"></span>
                                <span class="_text medium-h5 c-gray-dark-low">개인정보 수집 및 이용 동의 (필수)</span>
                            </label>
                            <svg class="ml-auto cursor-pointer my-auto"
                                 width="20"
                                 height="20"
                                 viewBox="0 0 20 20"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.9767 9.99999L6.85171 5.87499L8.03004 4.69666L13.3334 9.99999L8.03004 15.3033L6.85171 14.125L10.9767 9.99999Z"
                                      fill="#222222"></path>
                            </svg>
                        </div>
                        <div class="d-flex mb-8">
                            <label data-label="checkbox"
                                   class="checkbox-item">
                                <input id="agree-3"
                                       data-type="checkbox"
                                       type="checkbox"
                                       name="agree-3">
                                <span class="_checkbox no-border"></span>
                                <span class="_text medium-h5 c-gray-dark-low">개인 정보 제3자 제공 동의(필수)</span>
                            </label>
                            <svg class="ml-auto cursor-pointer my-auto"
                                 width="20"
                                 height="20"
                                 viewBox="0 0 20 20"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.9767 9.99999L6.85171 5.87499L8.03004 4.69666L13.3334 9.99999L8.03004 15.3033L6.85171 14.125L10.9767 9.99999Z"
                                      fill="#222222"></path>
                            </svg>
                        </div>
                        <div class="d-flex mb-8">
                            <label data-label="checkbox"
                                   class="checkbox-item">
                                <input id="agree-4"
                                       data-type="checkbox"
                                       type="checkbox"
                                       name="agree-4">
                                <span class="_checkbox no-border"></span>
                                <span class="_text medium-h5 c-gray-dark-low">광고성 정보 수신 동의 (선택)</span>
                            </label>
                            <svg class="ml-auto cursor-pointer my-auto"
                                 width="20"
                                 height="20"
                                 viewBox="0 0 20 20"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.9767 9.99999L6.85171 5.87499L8.03004 4.69666L13.3334 9.99999L8.03004 15.3033L6.85171 14.125L10.9767 9.99999Z"
                                      fill="#222222"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="_buttons">
                    <button type="button" class="btn btn-block btn-gray-dark-low">회원가입</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Login Modal -->
<div class="modal fade"
     id="login-modal"
     data-backdrop="static"
     data-keyboard="false"
     tabindex="-1"
     aria-labelledby="staticBackdropLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="_header text-center mb-68">
                    <div class="_title mb-2 bold-h1 c-gray-dark-low">
                        로그인
                    </div>
                    <div class="_desc c-gray-dark-light">
                        이메일과 비밀번호를 입력해주세요.
                    </div>
                </div>
                <div class="_body mb-20">
                    <input type="text"
                           placeholder="이메일"
                           class="form-control form-general regular-h5 p-16 mb-20">
                    <input type="text"
                           placeholder="비밀번호"
                           class="form-control form-general regular-h5 p-16">
                </div>
                <div class="_find mb-20">
                    <div class="row">
                        <div class="col-6">
                        </div>
                        <div class="col-3">
                            <a href="#" data-dismiss="modal" data-toggle="modal" data-target="#find-email-modal"><h5
                                    class="medium-h5 c-gray-dark-low">아이디 찾기</h5></a>
                        </div>
                        <div class="col-3 pl-0">
                            <a href="#" data-dismiss="modal" data-toggle="modal" data-target="#find-password-modal"><h5
                                    class="medium-h5 c-gray-dark-low">비밀번호 찾기</h5></a>
                        </div>
                    </div>
                </div>
                <div class="_buttons mb-36">
                    <button type="button" class="btn btn-block btn-gray-dark-low">로그인</button>
                </div>
                <hr class="mb-32">
                <div class="_go-register mb-100">
                    <h5 class="medium-h5">아직 회원이 아니신가요?</h5>
                    <a href="#" class="ml-8" data-dismiss="modal" data-toggle="modal" data-target="#register-modal"><h5
                            class="medium-h5">회원가입</h5></a>
                </div>
                <div class="_copyright">
                    <h5 class="regular-p1 c-gray-medium">Copyrights ⓒ 2022 okiwi INC. ALL RIGHTS RESERVED.</h5>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- find email Modal -->
<div class="modal fade"
     id="find-email-modal"
     data-backdrop="static"
     data-keyboard="false"
     tabindex="-1"
     aria-labelledby="staticBackdropLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="_header text-center mb-68">
                    <div class="_title mb-2 bold-h1 c-gray-dark-low">
                        이메일(ID) 찾기
                    </div>
                    <div class="_desc c-gray-dark-light">
                        가입 시 등록한 연락처를 입력해주세요.
                    </div>
                </div>
                <div class="_body mb-36">
                    <input type="text"
                           placeholder="연락처" id="phone-number-input"
                           class="form-control form-general regular-h5 p-16 mb-20">
                </div>
                <div class="_buttons">
                    <button type="button" class="btn btn-block btn-gray-dark-low is-disabled mb-28" disabled>아이디 조회
                    </button>
                    <button type="button" class="btn btn-block btn-transparent c-brand-purple" data-dismiss="modal">취소
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- email result Modal -->
<div class="modal fade"
     id="email-result-modal"
     data-backdrop="static"
     data-keyboard="false"
     tabindex="-1"
     aria-labelledby="staticBackdropLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="_header text-center mb-68">
                    <div class="_title mb-2 bold-h1 c-gray-dark-low">
                        이메일(ID) 조회
                    </div>
                    <div class="_desc c-gray-dark-light">
                        이메일(ID) 조회가 완료되었습니다.
                    </div>
                </div>
                <div class="_body mb-36">
                    <input type="text"
                           placeholder="placeholder"
                           disabled="disabled"
                           value="asszxc**@naver.com"
                           class="form-control form-general regular-h5 p-16">
                </div>
                <div class="_buttons">
                    <button type="button" class="btn btn-block btn-gray-dark-low mb-28" data-dismiss="modal"
                            data-toggle="modal" data-target="#login-modal">로그인 하러가기
                    </button>
                    <button type="button" class="btn btn-block btn-transparent c-brand-purple" data-dismiss="modal">취소
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- find password Modal -->
<div class="modal fade"
     id="find-password-modal"
     data-backdrop="static"
     data-keyboard="false"
     tabindex="-1"
     aria-labelledby="staticBackdropLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="_header text-center mb-68">
                    <div class="_title mb-2 bold-h1 c-gray-dark-low">
                        비밀번호 찾기
                    </div>
                    <div class="_desc c-gray-dark-light">
                        가입된 이메일(ID)를 입력해주세요.
                    </div>
                </div>
                <div class="_body mb-36">
                    <input type="text"
                           placeholder="이메일" id="email-input"
                           class="form-control form-general regular-h5 p-16 mb-20">
                </div>
                <div class="_buttons">
                    <button type="button" class="btn btn-block btn-gray-dark-low is-disabled mb-28">인증코드 전송</button>
                    <button type="button" class="btn btn-block btn-transparent c-brand-purple" data-dismiss="modal">취소
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- password validate Modal -->
<div class="modal fade"
     id="password-validate-modal"
     data-backdrop="static"
     data-keyboard="false"
     tabindex="-1"
     aria-labelledby="staticBackdropLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="_header text-center mb-48">
                    <div class="_title mb-2 bold-h1 c-gray-dark-low">
                        인증코드 확인
                    </div>
                    <div class="_desc c-gray-dark-light">
                        이메일로 인증코드를 전송했어요!
                    </div>
                </div>
                <div class="_body mb-20">
                    <div class="form-group inner-append is-append">
                        <input type="text"
                               placeholder="인증코드 입력"
                               value=""
                               class="form-control form-general regular-h5 p-16">
                        <p id="time-decrease" class="bold-h5 c-gray-dark-low">06:00</p>
                    </div>
                </div>
                <div class="_go-register mb-24 d-flex justify-content-between">
                    <h5 class="medium-h5 ml-8">인증코드가 오지 않았나요?</h5>
                    <a href="#" class="ml-8"><h5 class="medium-h5">인증코드 전송</h5></a>
                </div>
                <div class="_buttons mb-36">
                    <button type="button" class="btn btn-block btn-gray-dark-low mb-28">로그인</button>
                    <button type="button" class="btn btn-block btn-transparent c-brand-purple" data-dismiss="modal">취소
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- password change Modal -->
<div class="modal fade"
     id="password-change-modal"
     data-backdrop="static"
     data-keyboard="false"
     tabindex="-1"
     aria-labelledby="staticBackdropLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="_header text-center mb-68">
                    <div class="_title mb-2 bold-h1 c-gray-dark-low">
                        비밀번호 변경
                    </div>
                    <div class="_desc c-gray-dark-light">
                        새로운 비밀번호를 입력해주세요.
                    </div>
                </div>
                <div class="_body mb-36">
                    <input type="password"
                           placeholder="비밀번호" id="new-password"
                           class="form-control form-general regular-h5 p-16 mb-20">
                    <input type="password"
                           placeholder="비밀번호 확인" id="new-password-valid"
                           class="form-control form-general regular-h5 p-16 mb-20">
                </div>
                <div class="_buttons">
                    <button type="button" class="btn btn-block btn-gray-dark-low is-disabled mb-28">비밀번호 변경</button>
                    <button type="button" class="btn btn-block btn-transparent c-brand-purple" data-dismiss="modal">취소
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- corporation type Modal -->
<div class="modal fade"
     id="corporation-type-modal"
     data-backdrop="static"
     data-keyboard="false"
     tabindex="-1"
     aria-labelledby="staticBackdropLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="_header text-center mb-68">
                    <div class="_title mb-2 bold-h1 c-gray-dark-low">
                        가입 추가 정보
                    </div>
                    <div class="_desc c-gray-dark-light">
                        기업 형태를 선택해주시면 가입이 완료됩니다.
                    </div>
                </div>
                <div class="_buttons">
                    <div class="_button-item mb-32">
                        <h5 class="c-gray-dark-low regular-h5 mb-12">가입하신 기업 계정이 없으신가요?</h5>
                        <button type="button" class="btn btn-block btn-gray-dark-low" data-dismiss="modal"
                                data-toggle="modal" data-target="#corporation-create-modal">기업 회원으로 가입하기
                        </button>
                    </div>
                    <hr class="mb-24">
                    <div class="_button-item">
                        <h5 class="c-gray-dark-low regular-h5 mb-12"><span class="c-brand-purple bold-h5">잠깐!</span> 이미
                            가입되어있는 기업의 팀원이신가요?</h5>
                        <button type="button" class="btn btn-block btn-outline-gray-dark-low" data-dismiss="modal"
                                data-toggle="modal" data-target="#corporation-find-modal">기업 팀원으로 참여하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- corporation create Modal -->
<div class="modal fade"
     id="corporation-create-modal"
     data-backdrop="static"
     data-keyboard="false"
     tabindex="-1"
     aria-labelledby="staticBackdropLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="_header text-center mb-68">
                    <div class="_title mb-2 bold-h1 c-gray-dark-low">
                        기업 정보
                    </div>
                    <div class="_desc c-gray-dark-light">
                        간단한 기업 정보를 입력해주세요.
                    </div>
                </div>
                <div class="_body mb-36">
                    <input type="text"
                           placeholder="상호명" id="corporation-create-name"
                           class="form-control form-general regular-h5 p-16 mb-20">
                    <input type="text"
                           placeholder="사업자 등록 번호" id="corporation-create-code"
                           class="form-control form-general regular-h5 p-16 mb-20">
                </div>
                <div class="_buttons">
                    <button type="button" class="btn btn-block btn-gray-dark-low is-disabled mb-28" disabled>기업 회원으로
                        가입하기
                    </button>
                    <button type="button" class="btn btn-block btn-transparent c-brand-purple" data-dismiss="modal">취소
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- corporation find Modal -->
<div class="modal fade"
     id="corporation-find-modal"
     data-backdrop="static"
     data-keyboard="false"
     tabindex="-1"
     aria-labelledby="staticBackdropLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="_header text-center mb-68">
                    <div class="_title mb-2 bold-h1 c-gray-dark-low">
                        기업 ID 조회
                    </div>
                    <div class="_desc c-gray-dark-light">
                        기업에게 배정된 ID 코드를 입력해주세요.
                    </div>
                </div>
                <div class="_body mb-36">
                    <input type="text"
                           placeholder="조직 ID" id="corporation-find-input"
                           class="form-control form-general regular-h5 p-16 mb-20">
                </div>
                <div class="_buttons">
                    <button type="button" class="btn btn-block btn-gray-dark-low is-disabled mb-28" disabled>기업 ID 조회
                    </button>
                    <button type="button" class="btn btn-block btn-transparent c-brand-purple" data-dismiss="modal">취소
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- corporation select Modal -->
<div class="modal fade"
     id="corporation-select-modal"
     data-backdrop="static"
     data-keyboard="false"
     tabindex="-1"
     aria-labelledby="staticBackdropLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="_header text-center mb-68">
                    <div class="_title mb-2 bold-h1 c-gray-dark-low">
                        기업 ID 조회
                    </div>
                    <div class="_desc c-gray-dark-light">
                        기업 ID 조회가 완료되었습니다.
                    </div>
                </div>
                <div class="_body mb-36">
                    <input type="text"
                           placeholder="상호명"
                           disabled="disabled"
                           value="오키위"
                           class="form-control form-general regular-h5 p-16 mb-20">
                </div>
                <div class="_buttons">
                    <button type="button" class="btn btn-block btn-gray-dark-low mb-28">기업 팀원으로 참여하기
                    </button>
                    <button type="button" class="btn btn-block btn-transparent c-brand-purple" data-dismiss="modal">취소
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- ** Business Modals ** -->
<!-- setting Modal -->
<div class="modal fade"
     id="setting-modal"
     data-backdrop="static"
     data-keyboard="false"
     tabindex="-1"
     aria-labelledby="staticBackdropLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-medium">
        <div class="modal-content height-fixed">
            <div class="modal-header">
                <ul class="nav nav-tabs modal-tabs tabs"
                    id="modalTab"
                    role="tablist">
                    <li class="nav-item"
                        role="presentation">
                        <button class="nav-link p-8 pt-0 pb-0 active"
                                id=""
                                data-toggle="tab"
                                data-target="#myInfo"
                                type="button"
                                role="tab"
                                aria-controls="myInfo"
                                aria-selected="true">내 정보
                        </button>
                    </li>
                    <li class="nav-item"
                        role="presentation">
                        <button class="nav-link p-8 pt-0 pb-0"
                                id="teammates-tab"
                                data-toggle="tab"
                                data-target="#teammates"
                                type="button"
                                role="tab"
                                aria-controls="teammates"
                                aria-selected="false">팀원 관리
                        </button>
                    </li>
                    <li class="nav-item"
                        role="presentation">
                        <button class="nav-link p-8 pt-0 pb-0"
                                id="plugin-manage-tab"
                                data-toggle="tab"
                                data-target="#plugin-manage"
                                type="button"
                                role="tab"
                                aria-controls="plugin-manage"
                                aria-selected="false">플러그인 관리
                        </button>
                    </li>
                </ul>
                <button type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body gray-top">
                <div class="tab-content"
                     id="modalTabContent">
                    <div class="tab-pane fade show active"
                         id="myInfo"
                         role="tabpanel"
                         aria-labelledby="myInfo-tab">
                        <div class="tab-content">
                            <div class="row mb-44">
                                <div class="_name col-6">
                                    <h5 class="regular-h6 c-gray-medium mb-12">이름</h5>
                                    <h5 class="medium-h3 c-gray-dark-low mb-1">유병준</h5>
                                    <h5 class="regular-h6 c-brand-purple _profile-change" data-type="name">변경</h5>
                                </div>
                                <div class="_profile col-6">
                                    <h5 class="regular-h6 c-gray-medium mb-12">프로필 이미지</h5>
                                    <img id="profileImg" src="../../resources/assets/images/sample/user_basic_profile.png" alt>
                                    <img class="_pencil"
                                         src="../../resources/assets/images/sample/profile_edit_pencil.png" alt>
                                    <input type="file" id="profileInput" class="d-none" accept="image/*">
                                </div>
                            </div>
                            <div class="row mb-44">
                                <div class="_email col-6">
                                    <h5 class="regular-h6 c-gray-medium mb-12">이메일</h5>
                                    <h5 class="medium-h3 c-gray-dark-low mb-1">asszxc@naver.com</h5>
                                    <h5 class="regular-h6 c-brand-purple _profile-change" data-type="email">변경</h5>
                                </div>
                            </div>
                            <div class="row mb-44">
                                <div class="_phone col-6">
                                    <h5 class="regular-h6 c-gray-medium mb-12">연락처</h5>
                                    <h5 class="medium-h3 c-gray-dark-low mb-1">010-9431-1977</h5>
                                    <h5 class="regular-h6 c-brand-purple _profile-change" data-type="phone">변경</h5>
                                </div>
                            </div>
                            <div class="row mb-44">
                                <div class="_marketing col-6">
                                    <h5 class="regular-h6 c-gray-medium mb-12">마케팅 정보 수신 알람</h5>
                                    <label data-label="checkbox"
                                           class="checkbox-item">
                                        <input id="agree-checkbox"
                                               data-type="checkbox"
                                               type="checkbox" checked
                                               name="marketing-checkbox">
                                        <span class="_checkbox"></span>
                                        <span class="_text bold-h5 c-gray-dark-low mr-24">동의</span>
                                    </label>
                                    <label data-label="checkbox"
                                           class="checkbox-item">
                                        <input id="disagree-checkbox"
                                               data-type="checkbox"
                                               type="checkbox"
                                               name="marketing-checkbox">
                                        <span class="_checkbox"></span>
                                        <span class="_text bold-h5 c-gray-dark-low">동의 안함</span>
                                    </label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="_withdraw col-12">
                                    <h5 class="regular-h6 c-gray-medium mb-24">회원 탈퇴</h5>
                                    <h5 class="medium-h6 c-gray-dark-low mb-0">회원 탈퇴 시 모든 정보가 삭제되며 서비스 이용복구는 허용되지
                                        않습니다.</h5>
                                    <h5 class="medium-h6 c-gray-dark-low mb-32">그래도 탈퇴하시겠습니까?</h5>
                                    <div class="row">
                                        <div class="col-9">
                                            <input type="password"
                                                   placeholder="비밀번호"
                                                   class="form-control form-general regular-h5 p-16">
                                        </div>
                                        <div class="col-3">
                                            <button type="button"
                                                    class="btn btn-block btn-gray-dark-low">회원 탈퇴
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade"
                         id="teammates"
                         role="tabpanel"
                         aria-labelledby="teammates-tab">
                        <!-- TODO 글 길이 길어질 때 Ellipsis -->
                        <div class="tab-content">
                            <div class="_corp-title row mb-40">
                                <div class="col-12">
                                    <h5 class="medium-h3 c-gray-dark-low mb-12">팀원 정보 및 권한 설정</h5>
                                    <h5 class="regular-h5 c-gray-dark-low">팀원에게 기업 ID를 공유한 후 회원가입 시 입력하면 자동 연결됩니다.</h5>
                                </div>
                            </div>
                            <div class="_corp-info row mb-16">
                                <div class="_title col-2">
                                    <h5 class="regular-h6 c-gray-medium">기업 ID</h5>
                                </div>
                                <div class="_item col-10">
                                    <h5 class="medium-h3 c-brand-purple">2Y23dy</h5>
                                </div>
                            </div>
                            <div class="_corp-info row mb-40">
                                <div class="_title col-2">
                                    <h5 class="regular-h6 c-gray-medium">관리자</h5>
                                </div>
                                <div class="_item col-10">
                                    <h5 class="regular-h6 c-gray-dark-low">유병준(asszxc@naver.com)</h5>
                                </div>
                            </div>
                            <div class="_authorization">
                                <div class="_cover-line _top"></div>
                                <ul class="nav nav-tabs mb-12"
                                    role="tablist">
                                    <li class="nav-item medium-h6 _name"
                                        role="presentation">
                                        이름
                                    </li>
                                    <li class="nav-item medium-h6 _email"
                                        role="menuitem">
                                        이메일
                                    </li>
                                    <li class="nav-item medium-h6 _role"
                                        role="presentation">
                                        역할
                                    </li>
                                    <li class="nav-item medium-h6 _read"
                                        role="presentation">
                                        읽기
                                    </li>
                                    <li class="nav-item medium-h6 _edit"
                                        role="presentation">
                                        수정
                                    </li>
                                    <li class="nav-item medium-h6 _remove"
                                        role="presentation">
                                        제거
                                    </li>
                                </ul>
                                <div class="_cover-line _bottom"></div>
                                <div class="_item-group">
                                    <ul class="nav nav-tabs _items"
                                        role="tablist">
                                        <li class="nav-item light-h6 _name"
                                            role="presentation">
                                            유병준
                                        </li>
                                        <li class="nav-item light-h6 _email"
                                            role="menuitem">
                                            <span title="asszxc@naver.com">asszxc@naver.com</span>
                                        </li>
                                        <li class="nav-item light-h6 _role"
                                            role="presentation">
                                            관리자
                                        </li>
                                        <li class="nav-item light-h6 _read"
                                            role="presentation">
                                            <span class="_check on" data-type="read"></span>
                                        </li>
                                        <li class="nav-item light-h6 _edit"
                                            role="presentation">
                                            <span class="_check on" data-type="edit"></span>
                                        </li>
                                        <li class="nav-item medium-h4 _remove"
                                            role="presentation">

                                        </li>
                                    </ul>
                                    <ul class="nav nav-tabs _items"
                                        role="tablist">
                                        <li class="nav-item light-h6 _name"
                                            role="presentation">
                                            김우식
                                        </li>
                                        <li class="nav-item light-h6 _email"
                                            role="menuitem">
                                            <span title="zlzldntlr@naver.com">zlzldntlr@naver.com</span>
                                        </li>
                                        <li class="nav-item light-h6 _role"
                                            role="presentation">
                                            팀원
                                        </li>
                                        <li class="nav-item light-h6 _read"
                                            role="presentation">
                                            <span class="_check on" data-type="read"></span>
                                        </li>
                                        <li class="nav-item light-h6 _edit"
                                            role="presentation">
                                            <span class="_check on" data-type="edit"></span>
                                        </li>
                                        <li class="nav-item medium-h4 _remove"
                                            role="presentation">
                                            <span>&times;</span>
                                        </li>
                                    </ul>
                                    <ul class="nav nav-tabs _items"
                                        role="tablist">
                                        <li class="nav-item light-h6 _name"
                                            role="presentation">
                                            한지우
                                        </li>
                                        <li class="nav-item light-h6 _email"
                                            role="menuitem">
                                            <span title="kevin8622@naver.com">kevin8622@naver.com</span>
                                        </li>
                                        <li class="nav-item light-h6 _role"
                                            role="presentation">
                                            팀원
                                        </li>
                                        <li class="nav-item light-h6 _read"
                                            role="presentation">
                                            <span class="_check on" data-type="read"></span>
                                        </li>
                                        <li class="nav-item light-h6 _edit"
                                            role="presentation">
                                            <span class="_check off" data-type="edit"></span>
                                        </li>
                                        <li class="nav-item medium-h4 _remove"
                                            role="presentation">
                                            <span>&times;</span>
                                        </li>
                                    </ul>
                                    <ul class="nav nav-tabs _items"
                                        role="tablist">
                                        <li class="nav-item light-h6 _name"
                                            role="presentation">
                                            홍길동
                                        </li>
                                        <li class="nav-item light-h6 _email"
                                            role="menuitem">
                                            <span title="kevin8622@naver.com">kevin8622@naver.com</span>
                                        </li>
                                        <li class="nav-item light-h6 _role"
                                            role="presentation">
                                            요청
                                        </li>
                                        <li class="nav-item light-h6 _read"
                                            role="presentation">
                                            <span class="_check off" data-type="read"></span>
                                        </li>
                                        <li class="nav-item light-h6 _edit"
                                            role="presentation">
                                            <span class="_check off" data-type="edit"></span>
                                        </li>
                                        <li class="nav-item medium-h4 _remove"
                                            role="presentation">
                                            <span>&times;</span>
                                        </li>
                                    </ul>
                                    <ul class="nav nav-tabs _items"
                                        role="tablist">
                                        <li class="nav-item light-h6 _name"
                                            role="presentation">
                                            홍길동
                                        </li>
                                        <li class="nav-item light-h6 _email"
                                            role="menuitem">
                                            <span title="kevin8622@naver.com">kevin8622@naver.com</span>
                                        </li>
                                        <li class="nav-item light-h6 _role"
                                            role="presentation">
                                            요청
                                        </li>
                                        <li class="nav-item light-h6 _read"
                                            role="presentation">
                                            <span class="_check off" data-type="read"></span>
                                        </li>
                                        <li class="nav-item light-h6 _edit"
                                            role="presentation">
                                            <span class="_check off" data-type="edit"></span>
                                        </li>
                                        <li class="nav-item medium-h4 _remove"
                                            role="presentation">
                                            <span>&times;</span>
                                        </li>
                                    </ul>
                                    <ul class="nav nav-tabs _items"
                                        role="tablist">
                                        <li class="nav-item light-h6 _name"
                                            role="presentation">
                                            홍길동
                                        </li>
                                        <li class="nav-item light-h6 _email"
                                            role="menuitem">
                                            <span title="kevin8622@naver.com">kevin8622@naver.com</span>
                                        </li>
                                        <li class="nav-item light-h6 _role"
                                            role="presentation">
                                            요청
                                        </li>
                                        <li class="nav-item light-h6 _read"
                                            role="presentation">
                                            <span class="_check off" data-type="read"></span>
                                        </li>
                                        <li class="nav-item light-h6 _edit"
                                            role="presentation">
                                            <span class="_check off" data-type="edit"></span>
                                        </li>
                                        <li class="nav-item medium-h4 _remove"
                                            role="presentation">
                                            <span>&times;</span>
                                        </li>
                                    </ul>
                                    <ul class="nav nav-tabs _items"
                                        role="tablist">
                                        <li class="nav-item light-h6 _name"
                                            role="presentation">
                                            홍길동
                                        </li>
                                        <li class="nav-item light-h6 _email"
                                            role="menuitem">
                                            <span title="kevin8622@naver.com">kevin8622@naver.com</span>
                                        </li>
                                        <li class="nav-item light-h6 _role"
                                            role="presentation">
                                            요청
                                        </li>
                                        <li class="nav-item light-h6 _read"
                                            role="presentation">
                                            <span class="_check off" data-type="read"></span>
                                        </li>
                                        <li class="nav-item light-h6 _edit"
                                            role="presentation">
                                            <span class="_check off" data-type="edit"></span>
                                        </li>
                                        <li class="nav-item medium-h4 _remove"
                                            role="presentation">
                                            <span>&times;</span>
                                        </li>
                                    </ul>
                                    <ul class="nav nav-tabs _items"
                                        role="tablist">
                                        <li class="nav-item light-h6 _name"
                                            role="presentation">
                                            홍길동
                                        </li>
                                        <li class="nav-item light-h6 _email"
                                            role="menuitem">
                                            <span title="kevin8622@naver.com">kevin8622@naver.com</span>
                                        </li>
                                        <li class="nav-item light-h6 _role"
                                            role="presentation">
                                            요청
                                        </li>
                                        <li class="nav-item light-h6 _read"
                                            role="presentation">
                                            <span class="_check off" data-type="read"></span>
                                        </li>
                                        <li class="nav-item light-h6 _edit"
                                            role="presentation">
                                            <span class="_check off" data-type="edit"></span>
                                        </li>
                                        <li class="nav-item medium-h4 _remove"
                                            role="presentation">
                                            <span>&times;</span>
                                        </li>
                                    </ul>
                                    <ul class="nav nav-tabs _items"
                                        role="tablist">
                                        <li class="nav-item light-h6 _name"
                                            role="presentation">
                                            홍길동
                                        </li>
                                        <li class="nav-item light-h6 _email"
                                            role="menuitem">
                                            <span title="kevin8622@naver.com">kevin8622@naver.com</span>
                                        </li>
                                        <li class="nav-item light-h6 _role"
                                            role="presentation">
                                            요청
                                        </li>
                                        <li class="nav-item light-h6 _read"
                                            role="presentation">
                                            <span class="_check off" data-type="read"></span>
                                        </li>
                                        <li class="nav-item light-h6 _edit"
                                            role="presentation">
                                            <span class="_check off" data-type="edit"></span>
                                        </li>
                                        <li class="nav-item medium-h4 _remove"
                                            role="presentation">
                                            <span>&times;</span>
                                        </li>
                                    </ul>
                                    <ul class="nav nav-tabs _items"
                                        role="tablist">
                                        <li class="nav-item light-h6 _name"
                                            role="presentation">
                                            홍길동
                                        </li>
                                        <li class="nav-item light-h6 _email"
                                            role="menuitem">
                                            <span title="kevin8622@naver.com">kevin8622@naver.com</span>
                                        </li>
                                        <li class="nav-item light-h6 _role"
                                            role="presentation">
                                            요청
                                        </li>
                                        <li class="nav-item light-h6 _read"
                                            role="presentation">
                                            <span class="_check off" data-type="read"></span>
                                        </li>
                                        <li class="nav-item light-h6 _edit"
                                            role="presentation">
                                            <span class="_check off" data-type="edit"></span>
                                        </li>
                                        <li class="nav-item medium-h4 _remove"
                                            role="presentation">
                                            <span>&times;</span>
                                        </li>
                                    </ul>
                                    <ul class="nav nav-tabs _items"
                                        role="tablist">
                                        <li class="nav-item light-h6 _name"
                                            role="presentation">
                                            홍길동
                                        </li>
                                        <li class="nav-item light-h6 _email"
                                            role="menuitem">
                                            <span title="kevin8622@naver.com">kevin8622@naver.com</span>
                                        </li>
                                        <li class="nav-item light-h6 _role"
                                            role="presentation">
                                            요청
                                        </li>
                                        <li class="nav-item light-h6 _read"
                                            role="presentation">
                                            <span class="_check off" data-type="read"></span>
                                        </li>
                                        <li class="nav-item light-h6 _edit"
                                            role="presentation">
                                            <span class="_check off" data-type="edit"></span>
                                        </li>
                                        <li class="nav-item medium-h4 _remove"
                                            role="presentation">
                                            <span>&times;</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade"
                         id="plugin-manage"
                         role="tabpanel"
                         aria-labelledby="plugin-manage-tab">
                        <div class="tab-content full-width-tab position-relative">
                            <div class="_plugin-manage-title row mb-40">
                                <div class="col-12">
                                    <h5 class="medium-h3 mb-12">플러그인 및 권한 설정</h5>
                                    <h5 class="regular-h6">플러그인 별로 권한을 설정할 수 있으며, 플러그인 별 설정을 변경할 수 있습니다.</h5>
                                </div>
                            </div>
                            <div class="_plugin-list row mx-0">
                                <div class="_plugin-list-container col-12 px-0">
                                    <div class="_plugin-manage-container media">
                                        <div class="_plugin-manage-info media">
                                            <img src="../../resources/assets/images/sample/plugin-sample-1.png"
                                                 width="48" height="48"
                                                 class="align-self-start mr-20" alt>
                                            <div class="_media-title media-body d-block">
                                                <h5 class="medium-h6 mb-8">QueryPlug - 데이터베이스 ERD 및 SQL 자동 생성</h5>
                                                <p class="_desc regular-h6 c-gray-medium text-ellipsis">팀이 서비스를 개발하기 위해
                                                    기획, 관리, 데이터베이스 등등의 서비스를 위한 유틸들을 사용할 수 있는 플랫폼</p>
                                            </div>
                                        </div>
                                        <div class="_plugin-manage-button hidden">
                                            <span class="_arrow-down"></span>
                                        </div>
                                    </div>
                                    <div class="_plugin-manage-child collapse">
                                        <ul class="nav nav-tabs mb-12 mt-12"
                                            role="tablist">
                                            <li class="nav-item medium-h6 _name"
                                                role="presentation">
                                                이름
                                            </li>
                                            <li class="nav-item medium-h6 _email"
                                                role="menuitem">
                                                이메일
                                            </li>
                                            <li class="nav-item medium-h6 _role"
                                                role="presentation">
                                                역할
                                            </li>
                                            <li class="nav-item medium-h6 _read"
                                                role="presentation">
                                                읽기
                                            </li>
                                            <li class="nav-item medium-h6 _edit"
                                                role="presentation">
                                                수정
                                            </li>
                                            <li class="nav-item medium-h6 _remove"
                                                role="presentation">
                                                제거
                                            </li>
                                        </ul>
                                        <div class="_cover-line _bottom"></div>
                                        <div class="_item-group">
                                            <ul class="nav nav-tabs _items"
                                                role="tablist">
                                                <li class="nav-item light-h6 _name"
                                                    role="presentation">
                                                    유병준
                                                </li>
                                                <li class="nav-item light-h6 _email"
                                                    role="menuitem">
                                                    <span title="asszxc@naver.com">asszxc@naver.com</span>
                                                </li>
                                                <li class="nav-item light-h6 _role"
                                                    role="presentation">
                                                    관리자
                                                </li>
                                                <li class="nav-item light-h6 _read"
                                                    role="presentation">
                                                    <span class="_check on" data-type="read"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check on" data-type="edit"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _remove"
                                                    role="presentation">

                                                </li>
                                            </ul>
                                            <ul class="nav nav-tabs _items"
                                                role="tablist">
                                                <li class="nav-item light-h6 _name"
                                                    role="presentation">
                                                    유병준
                                                </li>
                                                <li class="nav-item light-h6 _email"
                                                    role="menuitem">
                                                    <span title="asszxc@naver.com">asszxc@naver.com</span>
                                                </li>
                                                <li class="nav-item light-h6 _role"
                                                    role="presentation">
                                                    팀원
                                                </li>
                                                <li class="nav-item light-h6 _read"
                                                    role="presentation">
                                                    <span class="_check on" data-type="read"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check on" data-type="edit"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _remove"
                                                    role="presentation">
                                                    <span>&times;</span>
                                                </li>
                                            </ul>
                                            <ul class="nav nav-tabs _items"
                                                role="tablist">
                                                <li class="nav-item light-h6 _name"
                                                    role="presentation">
                                                    유병준
                                                </li>
                                                <li class="nav-item light-h6 _email"
                                                    role="menuitem">
                                                    <span title="asszxc@naver.com">asszxc@naver.com</span>
                                                </li>
                                                <li class="nav-item light-h6 _role"
                                                    role="presentation">
                                                    팀원
                                                </li>
                                                <li class="nav-item light-h6 _read"
                                                    role="presentation">
                                                    <span class="_check on" data-type="read"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check off" data-type="edit"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _remove"
                                                    role="presentation">
                                                    <span>&times;</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="_control-panel">
                                            <h5 class="_setting medium-h6">환경 설정</h5>
                                            <h5 class="_add-new medium-h6 c-brand-purple">팀원 추가하기 +</h5>
                                        </div>
                                    </div>
                                    <div class="_plugin-add-member-container d-none">
                                        <ul class="nav nav-tabs mb-12 mt-12"
                                            role="tablist">
                                            <li class="nav-item medium-h6 _name"
                                                role="presentation">
                                                이름
                                            </li>
                                            <li class="nav-item medium-h6 _email"
                                                role="menuitem">
                                                이메일
                                            </li>
                                            <li class="nav-item medium-h6 _role"
                                                role="presentation">
                                                역할
                                            </li>
                                            <li class="nav-item medium-h6 _read"
                                                role="presentation">
                                                읽기
                                            </li>
                                            <li class="nav-item medium-h6 _edit"
                                                role="presentation">
                                                수정
                                            </li>
                                            <li class="nav-item medium-h6 _remove"
                                                role="presentation">
                                                선택
                                            </li>
                                        </ul>
                                        <div class="_cover-line _bottom"></div>
                                        <div class="_item-group">
                                            <ul class="nav nav-tabs _items"
                                                role="tablist">
                                                <li class="nav-item light-h6 _name"
                                                    role="presentation">
                                                    김우식
                                                </li>
                                                <li class="nav-item light-h6 _email"
                                                    role="menuitem">
                                                    <span title="asszxc@naver.com">asszxc@naver.com</span>
                                                </li>
                                                <li class="nav-item light-h6 _role"
                                                    role="presentation">
                                                    관리자
                                                </li>
                                                <li class="nav-item light-h6 _read"
                                                    role="presentation">
                                                    <span class="_check on" data-type="read"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check on" data-type="edit"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _select"
                                                    role="presentation">
                                                    <span class="_check off" data-type="select"></span>
                                                </li>
                                            </ul>
                                            <ul class="nav nav-tabs _items"
                                                role="tablist">
                                                <li class="nav-item light-h6 _name"
                                                    role="presentation">
                                                    한지우
                                                </li>
                                                <li class="nav-item light-h6 _email"
                                                    role="menuitem">
                                                    <span title="asszxc@naver.com">asszxc@naver.com</span>
                                                </li>
                                                <li class="nav-item light-h6 _role"
                                                    role="presentation">
                                                    팀원
                                                </li>
                                                <li class="nav-item light-h6 _read"
                                                    role="presentation">
                                                    <span class="_check on" data-type="read"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check on" data-type="edit"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _select"
                                                    role="presentation">
                                                    <span class="_check off" data-type="select"></span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="_plugin-list-container col-12 px-0">
                                    <div class="_plugin-manage-container media">
                                        <div class="_plugin-manage-info media">
                                            <img src="../../resources/assets/images/sample/plugin-sample-2.png"
                                                 width="48" height="48"
                                                 class="align-self-start mr-20" alt>
                                            <div class="_media-title media-body d-block">
                                                <h5 class="medium-h6 mb-8">CRMPlug - 업무 형상 관리 툴</h5>
                                                <p class="_desc regular-h6 c-gray-medium text-ellipsis">팀이 서비스를 개발하기
                                                    위해
                                                    기획, 관리, 데이터베이스 등등의 서비스를 위한 유틸들을 사용할 수 있는 플랫폼</p>
                                            </div>
                                        </div>
                                        <div class="_plugin-manage-button hidden">
                                            <span class="_arrow-down"></span>
                                        </div>
                                    </div>
                                    <div class="_plugin-manage-child collapse">
                                        <ul class="nav nav-tabs mb-12 mt-12"
                                            role="tablist">
                                            <li class="nav-item medium-h6 _name"
                                                role="presentation">
                                                이름
                                            </li>
                                            <li class="nav-item medium-h6 _email"
                                                role="menuitem">
                                                이메일
                                            </li>
                                            <li class="nav-item medium-h6 _role"
                                                role="presentation">
                                                역할
                                            </li>
                                            <li class="nav-item medium-h6 _read"
                                                role="presentation">
                                                읽기
                                            </li>
                                            <li class="nav-item medium-h6 _edit"
                                                role="presentation">
                                                수정
                                            </li>
                                            <li class="nav-item medium-h6 _remove"
                                                role="presentation">
                                                제거
                                            </li>
                                        </ul>
                                        <div class="_cover-line _bottom"></div>
                                        <div class="_item-group">
                                            <ul class="nav nav-tabs _items"
                                                role="tablist">
                                                <li class="nav-item light-h6 _name"
                                                    role="presentation">
                                                    유병준
                                                </li>
                                                <li class="nav-item light-h6 _email"
                                                    role="menuitem">
                                                    <span title="asszxc@naver.com">asszxc@naver.com</span>
                                                </li>
                                                <li class="nav-item light-h6 _role"
                                                    role="presentation">
                                                    관리자
                                                </li>
                                                <li class="nav-item light-h6 _read"
                                                    role="presentation">
                                                    <span class="_check on" data-type="read"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check on" data-type="edit"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _remove"
                                                    role="presentation">

                                                </li>
                                            </ul>
                                            <ul class="nav nav-tabs _items"
                                                role="tablist">
                                                <li class="nav-item light-h6 _name"
                                                    role="presentation">
                                                    유병준
                                                </li>
                                                <li class="nav-item light-h6 _email"
                                                    role="menuitem">
                                                    <span title="asszxc@naver.com">asszxc@naver.com</span>
                                                </li>
                                                <li class="nav-item light-h6 _role"
                                                    role="presentation">
                                                    팀원
                                                </li>
                                                <li class="nav-item light-h6 _read"
                                                    role="presentation">
                                                    <span class="_check on" data-type="read"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check on" data-type="edit"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _remove"
                                                    role="presentation">
                                                    <span>&times;</span>
                                                </li>
                                            </ul>
                                            <ul class="nav nav-tabs _items"
                                                role="tablist">
                                                <li class="nav-item light-h6 _name"
                                                    role="presentation">
                                                    유병준
                                                </li>
                                                <li class="nav-item light-h6 _email"
                                                    role="menuitem">
                                                    <span title="asszxc@naver.com">asszxc@naver.com</span>
                                                </li>
                                                <li class="nav-item light-h6 _role"
                                                    role="presentation">
                                                    팀원
                                                </li>
                                                <li class="nav-item light-h6 _read"
                                                    role="presentation">
                                                    <span class="_check on" data-type="read"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check off" data-type="edit"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _remove"
                                                    role="presentation">
                                                    <span>&times;</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="_control-panel">
                                            <h5 class="_setting medium-h6">환경 설정</h5>
                                            <h5 class="_add-new medium-h6 c-brand-purple">팀원 추가하기 +</h5>
                                        </div>
                                    </div>
                                    <div class="_plugin-add-member-container d-none">
                                        <ul class="nav nav-tabs mb-12 mt-12"
                                            role="tablist">
                                            <li class="nav-item medium-h6 _name"
                                                role="presentation">
                                                이름
                                            </li>
                                            <li class="nav-item medium-h6 _email"
                                                role="menuitem">
                                                이메일
                                            </li>
                                            <li class="nav-item medium-h6 _role"
                                                role="presentation">
                                                역할
                                            </li>
                                            <li class="nav-item medium-h6 _read"
                                                role="presentation">
                                                읽기
                                            </li>
                                            <li class="nav-item medium-h6 _edit"
                                                role="presentation">
                                                수정
                                            </li>
                                            <li class="nav-item medium-h6 _remove"
                                                role="presentation">
                                                선택
                                            </li>
                                        </ul>
                                        <div class="_cover-line _bottom"></div>
                                        <div class="_item-group">
                                            <ul class="nav nav-tabs _items"
                                                role="tablist">
                                                <li class="nav-item light-h6 _name"
                                                    role="presentation">
                                                    김우식
                                                </li>
                                                <li class="nav-item light-h6 _email"
                                                    role="menuitem">
                                                    <span title="asszxc@naver.com">asszxc@naver.com</span>
                                                </li>
                                                <li class="nav-item light-h6 _role"
                                                    role="presentation">
                                                    관리자
                                                </li>
                                                <li class="nav-item light-h6 _read"
                                                    role="presentation">
                                                    <span class="_check on" data-type="read"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check on" data-type="edit"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _select"
                                                    role="presentation">
                                                    <span class="_check off" data-type="select"></span>
                                                </li>
                                            </ul>
                                            <ul class="nav nav-tabs _items"
                                                role="tablist">
                                                <li class="nav-item light-h6 _name"
                                                    role="presentation">
                                                    한지우
                                                </li>
                                                <li class="nav-item light-h6 _email"
                                                    role="menuitem">
                                                    <span title="asszxc@naver.com">asszxc@naver.com</span>
                                                </li>
                                                <li class="nav-item light-h6 _role"
                                                    role="presentation">
                                                    팀원
                                                </li>
                                                <li class="nav-item light-h6 _read"
                                                    role="presentation">
                                                    <span class="_check on" data-type="read"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check on" data-type="edit"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _select"
                                                    role="presentation">
                                                    <span class="_check off" data-type="select"></span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="_plugin-list-container col-12 px-0">
                                    <div class="_plugin-manage-container media">
                                        <div class="_plugin-manage-info media">
                                            <img src="../../resources/assets/images/sample/plugin-sample-3.png"
                                                 width="48" height="48"
                                                 class="align-self-start mr-20" alt>
                                            <div class="_media-title media-body d-block">
                                                <h5 class="medium-h6 mb-8">ChatPlug - 채팅을 통한 커뮤니케이션</h5>
                                                <p class="_desc regular-h6 c-gray-medium text-ellipsis">팀이 서비스를 개발하기
                                                    위해
                                                    기획, 관리, 데이터베이스 등등의 서비스를 위한 유틸들을 사용할 수 있는 플랫폼</p>
                                            </div>
                                        </div>
                                        <div class="_plugin-manage-button hidden">
                                            <span class="_arrow-down"></span>
                                        </div>
                                    </div>
                                    <div class="_plugin-manage-child collapse">
                                        <ul class="nav nav-tabs mb-12 mt-12"
                                            role="tablist">
                                            <li class="nav-item medium-h6 _name"
                                                role="presentation">
                                                이름
                                            </li>
                                            <li class="nav-item medium-h6 _email"
                                                role="menuitem">
                                                이메일
                                            </li>
                                            <li class="nav-item medium-h6 _role"
                                                role="presentation">
                                                역할
                                            </li>
                                            <li class="nav-item medium-h6 _read"
                                                role="presentation">
                                                읽기
                                            </li>
                                            <li class="nav-item medium-h6 _edit"
                                                role="presentation">
                                                수정
                                            </li>
                                            <li class="nav-item medium-h6 _remove"
                                                role="presentation">
                                                제거
                                            </li>
                                        </ul>
                                        <div class="_cover-line _bottom"></div>
                                        <div class="_item-group">
                                            <ul class="nav nav-tabs _items"
                                                role="tablist">
                                                <li class="nav-item light-h6 _name"
                                                    role="presentation">
                                                    유병준
                                                </li>
                                                <li class="nav-item light-h6 _email"
                                                    role="menuitem">
                                                    <span title="asszxc@naver.com">asszxc@naver.com</span>
                                                </li>
                                                <li class="nav-item light-h6 _role"
                                                    role="presentation">
                                                    관리자
                                                </li>
                                                <li class="nav-item light-h6 _read"
                                                    role="presentation">
                                                    <span class="_check on" data-type="read"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check on" data-type="edit"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _remove"
                                                    role="presentation">

                                                </li>
                                            </ul>
                                        </div>
                                        <div class="_control-panel">
                                            <h5 class="_setting medium-h6">환경 설정</h5>
                                            <h5 class="_add-new medium-h6 c-brand-purple">팀원 추가하기 +</h5>
                                        </div>
                                    </div>
                                    <div class="_plugin-add-member-container d-none">
                                        <ul class="nav nav-tabs mb-12 mt-12"
                                            role="tablist">
                                            <li class="nav-item medium-h6 _name"
                                                role="presentation">
                                                이름
                                            </li>
                                            <li class="nav-item medium-h6 _email"
                                                role="menuitem">
                                                이메일
                                            </li>
                                            <li class="nav-item medium-h6 _role"
                                                role="presentation">
                                                역할
                                            </li>
                                            <li class="nav-item medium-h6 _read"
                                                role="presentation">
                                                읽기
                                            </li>
                                            <li class="nav-item medium-h6 _edit"
                                                role="presentation">
                                                수정
                                            </li>
                                            <li class="nav-item medium-h6 _remove"
                                                role="presentation">
                                                선택
                                            </li>
                                        </ul>
                                        <div class="_cover-line _bottom"></div>
                                        <div class="_item-group">
                                            <ul class="nav nav-tabs _items"
                                                role="tablist">
                                                <li class="nav-item light-h6 _name"
                                                    role="presentation">
                                                    김우식
                                                </li>
                                                <li class="nav-item light-h6 _email"
                                                    role="menuitem">
                                                    <span title="asszxc@naver.com">asszxc@naver.com</span>
                                                </li>
                                                <li class="nav-item light-h6 _role"
                                                    role="presentation">
                                                    관리자
                                                </li>
                                                <li class="nav-item light-h6 _read"
                                                    role="presentation">
                                                    <span class="_check on" data-type="read"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check on" data-type="edit"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _select"
                                                    role="presentation">
                                                    <span class="_check off" data-type="select"></span>
                                                </li>
                                            </ul>
                                            <ul class="nav nav-tabs _items"
                                                role="tablist">
                                                <li class="nav-item light-h6 _name"
                                                    role="presentation">
                                                    한지우
                                                </li>
                                                <li class="nav-item light-h6 _email"
                                                    role="menuitem">
                                                    <span title="asszxc@naver.com">asszxc@naver.com</span>
                                                </li>
                                                <li class="nav-item light-h6 _role"
                                                    role="presentation">
                                                    팀원
                                                </li>
                                                <li class="nav-item light-h6 _read"
                                                    role="presentation">
                                                    <span class="_check on" data-type="read"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check on" data-type="edit"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _select"
                                                    role="presentation">
                                                    <span class="_check off" data-type="select"></span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="_plugin-teammate-add-button d-none row mx-0">
                                    <div class="col-12 px-5">
                                        <button type="button"
                                                class="btn btn-block btn-gray-dark-low">추가하기
                                        </button>
                                        <button type="button" class="btn btn-block btn-transparent c-brand-purple">취소
                                        </button>
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
<!-- name change Modal -->
<div class="modal fade"
     id="name-change-modal"
     data-backdrop="static"
     data-keyboard="false"
     tabindex="-1"
     aria-labelledby="staticBackdropLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="_header text-center mb-68">
                    <div class="_title mb-2 bold-h1 c-gray-dark-low">
                        이름 변경
                    </div>
                    <div class="_desc c-gray-dark-light">
                        변경하실 이름을 입력해주세요.
                    </div>
                </div>
                <div class="_body mb-36">
                    <input type="text"
                           placeholder="이름" id="name-change-input"
                           class="form-control form-general regular-h5 p-16 mb-20">
                </div>
                <div class="_buttons">
                    <button type="button" class="btn btn-block btn-gray-dark-low is-disabled mb-28" disabled>수정 완료
                    </button>
                    <button type="button" class="btn btn-block btn-transparent c-brand-purple" data-dismiss="modal">취소
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- email change Modal -->
<div class="modal fade"
     id="email-change-modal"
     data-backdrop="static"
     data-keyboard="false"
     tabindex="-1"
     aria-labelledby="staticBackdropLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="_header text-center mb-68">
                    <div class="_title mb-2 bold-h1 c-gray-dark-low">
                        이메일(ID) 변경
                    </div>
                    <div class="_desc c-gray-dark-light">
                        변경하실 이메일(ID)을 입력해주세요.
                    </div>
                </div>
                <div class="_body mb-36">
                    <input type="email"
                           placeholder="이메일" id="email-change-input"
                           class="form-control form-general regular-h5 p-16 mb-20">
                </div>
                <div class="_buttons">
                    <button type="button" class="btn btn-block btn-gray-dark-low is-disabled mb-28" disabled>수정 완료
                    </button>
                    <button type="button" class="btn btn-block btn-transparent c-brand-purple" data-dismiss="modal">취소
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- phone change Modal -->
<div class="modal fade"
     id="phone-change-modal"
     data-backdrop="static"
     data-keyboard="false"
     tabindex="-1"
     aria-labelledby="staticBackdropLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="_header text-center mb-68">
                    <div class="_title mb-2 bold-h1 c-gray-dark-low">
                        전화번호 변경
                    </div>
                    <div class="_desc c-gray-dark-light">
                        변경하실 전화번호를 입력해주세요.
                    </div>
                </div>
                <div class="_body mb-36">
                    <input type="text"
                           placeholder="전화번호" id="phone-change-input"
                           class="form-control form-general regular-h5 p-16 mb-20">
                </div>
                <div class="_buttons">
                    <button type="button" class="btn btn-block btn-gray-dark-low is-disabled mb-28" disabled>수정 완료
                    </button>
                    <button type="button" class="btn btn-block btn-transparent c-brand-purple" data-dismiss="modal">취소
                    </button>
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

<script src="../../resources/js/utility.js"></script>
<script src="../../resources/js/common.js"></script>
<script src="../../resources/js/app.js"></script>
<script src="../../resources/js/plugin/library-sample.js"></script>
<!-- Module JS -->
<!-- Module JS 는 특정 페이지가 아니라 다양한 페이지에서 작동하는 부분으로 Event 및 Element 생성 및 다양한 화면에 진입했을 때
     공통적으로 로직을 수행하는 Javascript를 Module JS라고 한다.
     Selector (선택자)의 Length 및 Empty 여부를 예외처리로 해줘야한다.
     (선택자가 없으면 또는 선택자의 Length가 0이면 에러가 터질 수 있기 때문에) -->
<script src="../../resources/js/module/sample.js"></script>
<script src="../../resources/js/validation.js"></script>
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
        $('#setting-modal').modal('show');
    });


    /**
     * email find modal input listener
     * **/
    $('#phone-number-input').on('input', function (e) {
        let $button = $(this).parent().next().find(':first-child');
        // TODO add Phone number validation function
        if ($(this).val().length > 5) {
            if ($button.hasClass('is-disabled')) {
                $button.removeClass('is-disabled').removeAttr('disabled');
            }
        } else {
            if (!$button.hasClass('is-disabled')) {
                $button.addClass('is-disabled').attr('disabled', true);
            }
        }
    });

    /**
     * Password find modal input listener
     * **/
    $('#email-input').on('input', function (e) {
        let $button = $(this).parent().next().find(':first-child');
        // TODO add email validation function
        if ($(this).val().length > 5) {
            if ($button.hasClass('is-disabled')) {
                $button.removeClass('is-disabled').removeAttr('disabled');
            }
        } else {
            if (!$button.hasClass('is-disabled')) {
                $button.addClass('is-disabled').attr('disabled', true);
            }
        }
    });


    /**
     * Password validation modal timer function
     * **/
    let x;

    $('#password-validate-modal').on('show.bs.modal', function () {
        timer(359);
    });

    $('#password-validate-modal').on('hide.bs.modal', function () {
        let $element = $('#time-decrease');
        $element.html('06:00');
        clearInterval(x);
    });

    function timer(time) {
        let $element = $('#time-decrease');
        let min = '';
        let sec = '';
        x = setInterval(function () {
            min = parseInt(time / 60);
            sec = time % 60;
            if (sec <= 9) {
                sec = '0' + sec;
            }
            $element.html('0' + min + ':' + sec);
            time--;
            if (time < 0) {
                clearInterval(x);
            }
        }, 1000);
    }


    /**
     * Password change modal input listener
     * **/
    $('#new-password').on('input', function () {
        let $validInput = $('#new-password-valid');
        let $button = $(this).parent().next().find(':first-child');
        // TODO add password validation function
        if ($(this).val().trim().length >= 8 && $validInput.val() === $(this).val()) {
            if ($button.hasClass('is-disabled')) {
                $button.removeClass('is-disabled').removeAttr('disabled');
            }
        } else {
            if (!$button.hasClass('is-disabled')) {
                $button.addClass('is-disabled').attr('disabled');
            }
        }
    });

    $('#new-password-valid').on('input', function () {
        let $newInput = $('#new-password');
        let $button = $(this).parent().next().find(':first-child');
        // TODO add password validation function
        if ($newInput.val().trim().length >= 8 && $(this).val() === $newInput.val()) {
            if ($button.hasClass('is-disabled')) {
                $button.removeClass('is-disabled').removeAttr('disabled');
            }
        } else {
            if (!$button.hasClass('is-disabled')) {
                $button.addClass('is-disabled').attr('disabled');
            }
        }
    });

    /**
     * corporation create modal listener
     * **/
    $('#corporation-create-name').on('input', function () {
        let $restInput = $('#corporation-create-code');
        let $button = $(this).parent().next().find(':first-child');
        if ($(this).val().trim().length > 8 && $restInput.val().trim().length > 8) {
            if ($button.hasClass('is-disabled')) {
                $button.removeClass('is-disabled').removeAttr('disabled');
            }
        } else {
            if (!$button.hasClass('is-disabled')) {
                $button.addClass('is-disabled').attr('disabled', true);
            }
        }
    });

    $('#corporation-create-code').on('input', function () {
        let $restInput = $('#corporation-create-name');
        let $button = $(this).parent().next().find(':first-child');
        if ($(this).val().trim().length > 8 && $restInput.val().trim().length > 8) {
            if ($button.hasClass('is-disabled')) {
                $button.removeClass('is-disabled').removeAttr('disabled');
            }
        } else {
            if (!$button.hasClass('is-disabled')) {
                $button.addClass('is-disabled').attr('disabled', true);
            }
        }
    });

    /**
     * corporation create modal listener
     * **/
    $('#corporation-find-input').on('input', function () {
        let $button = $(this).parent().next().find(':first-child');
        if ($(this).val().trim().length >= 6) {
            if ($button.hasClass('is-disabled')) {
                $button.removeClass('is-disabled').removeAttr('disabled');
            }
        } else {
            if (!$button.hasClass('is-disabled')) {
                $button.addClass('is-disabled').attr('disabled', true);
            }
        }
    });


    /**
     * Setting modal myInfo Listener
     * **/
    $('#agree-checkbox').on('change', function () {
        let $disagreeCheckbox = $('#disagree-checkbox');
        // Change other checkbox
        if ($disagreeCheckbox.is(':checked')) {
            console.log('checked');
            $disagreeCheckbox.prop('checked', false);
        }

        // Block checked remove on toggle twice
        if (!$(this).is(':checked')) {
            $(this).prop('checked', true);
        }
        // TODO status change fetch
    });

    $('#disagree-checkbox').on('change', function () {
        let $agreeCheckbox = $('#agree-checkbox');
        // Change other checkbox
        if ($agreeCheckbox.is(':checked')) {
            console.log('checked');
            $agreeCheckbox.prop('checked', false);
        }

        // Block checked remove on toggle twice
        if (!$(this).is(':checked')) {
            $(this).prop('checked', true);
        }
        // TODO status change fetch
    });

    $('._pencil').on('click', function () {
        $('#profileInput').click();
    })

    $('._profile-change').on('click', function () {
        let type = $(this).data().type;
        // TODO type 별 모달 띄우기
        $('#' + type + '-change-modal').css('z-index', '1100').modal('show');
        $('.modal-backdrop:last-child').css('z-index', '1090');
    })

    $('#profileInput').on('change', function () {
        const reader = new FileReader();
        console.log($(this)[0].files);
        if($(this)[0].files && $(this)[0].files[0]) {
            reader.onload = (e) => {
                $('#profileImg').attr('src', e.target.result);
            }
            reader.readAsDataURL($(this)[0].files[0]);
        }
    })

    $('#name-change-input').on('input', function () {
        // TODO input validation & fetch
        let $button = $(this).parent().next().find('button:first-child');
        if ($(this).val().length > 3) {
            console.log('over');
            $button.removeClass('is-disabled').removeAttr('disabled');
        } else {
            $button.addClass('is-disabled').attr('disabled', 'disabled');
        }
    })

    $('#email-change-input').on('input', function () {
        // TODO input validation & fetch
        let $button = $(this).parent().next().find('button:first-child');
        if ($(this).val().length > 3) {
            console.log('over');
            $button.removeClass('is-disabled').removeAttr('disabled');
        } else {
            $button.addClass('is-disabled').attr('disabled', 'disabled');
        }
    })

    $('#phone-change-input').on('input', function () {
        // TODO input validation & fetch
        let $button = $(this).parent().next().find('button:first-child');
        if ($(this).val().length > 3) {
            console.log('over');
            $button.removeClass('is-disabled').removeAttr('disabled');
        } else {
            $button.addClass('is-disabled').attr('disabled', 'disabled');
        }
    })

    /**
     * Setting modal teammate info check button
     * **/
    $('.nav-item ._check').on('click', function () {
        // TODO FETCH status change
        console.log('target : ', $(this).data().type);
        let type = $(this).data().type;
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).addClass('off');
            alert('OFF : ' + type);
        } else {
            $(this).removeClass('off');
            $(this).addClass('on');
            alert('ON : ' + type);
        }

    });

    $('.nav-item._remove span').on('click', function () {
        // TODO FETCH remove teammate
        alert('삭제 버튼');
    });


    $('._plugin-manage-button').on('click', function (e) {
        console.log('arrow clicked');
        // TODO CLOSED -> hidden  로 변경
        if (!$(this).hasClass('closed') && $(this).parent().next().hasClass('show') && !$(this).hasClass('blocked')) {
            $(this).addClass('closed');
            $(this).parent().removeClass('open');
            $(this).parent().next().collapse('hide');
            e.stopPropagation();
        }
    });

    $('._plugin-list ._plugin-manage-container').on('click', function () {
        if (!$(this).hasClass('open') && $(this).next().hasClass('collapse')) {
            $(this).addClass('open');
            let $button = $(this).find('._plugin-manage-button');
            if ($button.hasClass('hidden')) {
                $button.removeClass('hidden');
            } else if ($button.hasClass('closed')) {
                $button.removeClass('closed');
            }
            $(this).next().collapse('show');
            console.log('container clicked');
        }
    });

    $('._control-panel ._setting').on('click', function () {
        alert('환경설정으로 이동');
    })

    $('._control-panel ._add-new').on('click', function () {
        let thisTab = $(this).parent().parent().parent();
        let listDiv = $('._plugin-list');
        let containerList = listDiv.find('._plugin-list-container');
        console.log('thisTab : ', thisTab);
        containerList.each((idx, item) => {
            if (item === thisTab[0]) {
                console.log('match index : ', idx);
                $(item).find('._plugin-manage-button').addClass('blocked');
            } else {
                $(item).addClass('d-none');
            }
        })
        $(this).parent().addClass('d-none');
        $('._plugin-teammate-add-button').removeClass('d-none').fadeIn('slow');

        thisTab.find('._plugin-manage-child').addClass('d-none');
        thisTab.find('._plugin-add-member-container').removeClass('d-none');

        // TODO 해당 버튼에 data 요소 추가
        console.log(containerList);
    })

    $('._plugin-teammate-add-button').find('.btn-gray-dark-low').on('click', function () {
        // TODO 팀원 추가 AJAX
        let listDiv = $('._plugin-list');
        let containerList = listDiv.find('._plugin-list-container');
        $(this).parent().parent().addClass('d-none');
        containerList.each((idx, item) => {
            if ($(item).hasClass('d-none')) {
                $(item).removeClass('d-none');
            } else {
                $(item).find('._control-panel').removeClass('d-none');
                $(item).find('._plugin-manage-child').removeClass('d-none');
                $(item).find('._plugin-add-member-container').addClass('d-none');
            }
        })
    })

    $('._plugin-teammate-add-button').find('.c-brand-purple').on('click', function () {
        let listDiv = $('._plugin-list');
        let containerList = listDiv.find('._plugin-list-container');
        $(this).parent().parent().addClass('d-none');
        containerList.each((idx, item) => {
            console.log('item : ', item, ', index : ', idx);
            if ($(item).hasClass('d-none')) {
                $(item).removeClass('d-none');
            } else {
                $(item).find('._control-panel').removeClass('d-none');
                $(item).find('._plugin-manage-child').removeClass('d-none');
                $(item).find('._plugin-add-member-container').addClass('d-none');
                $(item).find('._plugin-manage-button').removeClass('blocked');
            }
        })
    })
</script>
</body>
</html>
