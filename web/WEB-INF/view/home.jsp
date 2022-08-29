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
    <title>Home</title>
</head>
<body>
<header id="l-header">
    <img src="../../resources/assets/images/icon/black-theme-logo-80x40.svg"/>
    <div class="_option ml-auto my-auto">
        <div class="bold-h5 c-basic-white" data-toggle="modal" data-target="#login-modal">로그인</div>
        <div class="bold-h5 c-basic-white" data-target="#register-modal" data-toggle="modal">회원가입</div>
    </div>
</header>
<div id="l-content-wrapper">
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
        <li class="nav-item d-none"
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
        <li class="nav-item d-none"
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
                    type="button">
                <svg width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.031 16.617L22.314 20.899L20.899 22.314L16.617 18.031C15.0237 19.3082 13.042 20.0029 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20.0029 13.042 19.3082 15.0237 18.031 16.617ZM16.025 15.875C17.2941 14.5699 18.0029 12.8204 18 11C18 7.132 14.867 4 11 4C7.132 4 4 7.132 4 11C4 14.867 7.132 18 11 18C12.8204 18.0029 14.5699 17.2941 15.875 16.025L16.025 15.875V15.875Z"
                          fill="#222222"/>
                </svg>

            </button>
        </li>
    </ul>
    <div class="tab-content"
         id="myTabContent">
        <div class="tab-pane fade show active"
             id="plugin"
             role="tabpanel"
             aria-labelledby="plugin-tab">
            <div id="plugin-left-sidebar">
                <div class="_plugin-container">
                    <div class="_left-plugin">
                        <img width="36"
                             height="36"
                             src="../../resources/assets/images/sample/plugin-sample-1.png"/>
                    </div>
                    <div class="_left-plugin">
                        <img width="36"
                             height="36"
                             src="../../resources/assets/images/sample/plugin-sample-2.png"/>
                    </div>
                    <div class="_left-plugin">
                        <img width="36"
                             height="36"
                             src="../../resources/assets/images/sample/plugin-sample-3.png"/>
                    </div>
                    <div class="_left-plugin">
                        <img width="36"
                             height="36"
                             src="../../resources/assets/images/sample/plugin-sample-1.png"/>
                    </div>
                    <div class="_left-plugin">
                        <img width="36"
                             height="36"
                             src="../../resources/assets/images/sample/plugin-sample-2.png"/>
                    </div>
                    <div class="_left-plugin">
                        <img width="36"
                             height="36"
                             src="../../resources/assets/images/sample/plugin-sample-3.png"/>
                    </div>
                </div>
                <div class="mt-auto w-100">
                    <div class="_option">
                        <svg width="32"
                             height="32"
                             viewBox="0 0 32 32"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_169_3045)">
                                <path d="M17.7247 2.92023e-06C18.1951 2.92023e-06 18.6159 0.292803 18.7743 0.731203L19.9039 3.8624C20.3087 3.9632 20.6559 4.064 20.9503 4.1696C21.2719 4.2848 21.6863 4.4592 22.1983 4.6976L24.8287 3.3056C25.0434 3.19185 25.2892 3.15079 25.5292 3.18859C25.7692 3.22638 25.9905 3.34098 26.1599 3.5152L28.4735 5.9072C28.7807 6.2256 28.8671 6.6912 28.6943 7.0976L27.4607 9.9888C27.6655 10.3648 27.8287 10.6864 27.9535 10.9552C28.0879 11.248 28.2543 11.6512 28.4527 12.1712L31.3279 13.4032C31.7599 13.5872 32.0271 14.0192 31.9983 14.4816L31.7871 17.8016C31.7726 18.0173 31.6952 18.224 31.5643 18.3961C31.4335 18.5682 31.255 18.698 31.0511 18.7696L28.3279 19.7376C28.2495 20.1136 28.1679 20.4352 28.0815 20.7072C27.9421 21.1273 27.783 21.5405 27.6047 21.9456L28.9727 24.9696C29.0692 25.1821 29.0952 25.4199 29.0468 25.6482C28.9985 25.8765 28.8783 26.0833 28.7039 26.2384L26.1023 28.5616C25.9309 28.714 25.7171 28.8103 25.4895 28.8378C25.2619 28.8652 25.0313 28.8225 24.8287 28.7152L22.1471 27.2944C21.7275 27.5165 21.2947 27.7127 20.8511 27.8816L19.6799 28.32L18.6399 31.2C18.5628 31.4109 18.4238 31.5936 18.241 31.7241C18.0583 31.8546 17.8404 31.9268 17.6159 31.9312L14.5759 32C14.3454 32.0061 14.1187 31.9405 13.927 31.8125C13.7353 31.6844 13.5881 31.5 13.5055 31.2848L12.2799 28.0416C11.8617 27.8987 11.4477 27.744 11.0383 27.5776C10.7034 27.4327 10.3736 27.2763 10.0495 27.1088L7.00946 28.408C6.80915 28.4935 6.58832 28.5188 6.37384 28.4811C6.15937 28.4433 5.9605 28.344 5.80146 28.1952L3.55186 26.0848C3.38437 25.9284 3.27031 25.7232 3.2258 25.4984C3.1813 25.2736 3.2086 25.0405 3.30386 24.832L4.61106 21.984C4.43721 21.6467 4.27603 21.303 4.12786 20.9536C3.9549 20.526 3.79483 20.0932 3.64786 19.656L0.783856 18.784C0.551057 18.7136 0.348007 18.5684 0.206239 18.3708C0.0644718 18.1732 -0.0080785 17.9343 -0.000144471 17.6912L0.111856 14.6176C0.119828 14.4171 0.182474 14.2225 0.29302 14.055C0.403566 13.8875 0.557805 13.7534 0.739056 13.6672L3.74386 12.224C3.88306 11.7136 4.00466 11.3168 4.11186 11.0272C4.2628 10.6404 4.43043 10.2603 4.61426 9.888L3.31186 7.136C3.21302 6.92702 3.183 6.69207 3.22613 6.46494C3.26925 6.23782 3.38329 6.03022 3.55186 5.872L5.79826 3.7504C5.95573 3.60188 6.15277 3.50202 6.36566 3.46285C6.57855 3.42368 6.79823 3.44686 6.99826 3.5296L10.0351 4.784C10.3711 4.56 10.6751 4.3792 10.9503 4.2336C11.2783 4.0592 11.7167 3.8768 12.2687 3.68L13.3247 0.734403C13.4027 0.518833 13.5454 0.332613 13.7333 0.201173C13.9211 0.0697323 14.145 -0.000522001 14.3743 2.92023e-06H17.7247ZM16.0383 11.2304C13.3711 11.2304 11.2095 13.3664 11.2095 16.0032C11.2095 18.64 13.3711 20.7776 16.0383 20.7776C18.7039 20.7776 20.8655 18.64 20.8655 16.0032C20.8655 13.3664 18.7055 11.2304 16.0383 11.2304Z"
                                      fill="#222222"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_169_3045">
                                    <rect width="32"
                                          height="32"
                                          fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="_body">
                <div class="_body-wrapper mt-64 mb-64">
                    <div class="text-center mb-64">
                        <div class="bold-h1 c-gray-dark-low mb-2">
                            Plug-In 설치로 <span class="c-brand-purple">서비스 개발</span>이 쉬워지다.
                        </div>
                        <div class="regular-h5 c-gray-dark-low">
                            팀이 서비스를 개발하기 위해 기획, 관리, 데이터베이스 등등의 서비스 플러그인을 제공합니다.
                        </div>
                    </div>
                    <div class="row banner-container mb-64">
                        <div class="col-6 _banner">
                            <img class="img-fluid" alt
                                 src="../../resources/assets/images/sample/sample-banner-1.png"/>
                        </div>
                        <div class="col-6 _banner">
                            <img class="img-fluid" alt
                                 src="../../resources/assets/images/sample/sample-banner-2.png"/>
                        </div>
                    </div>
                    <div class="service-plugin-container">
                        <div class="_title bold-h4 c-gray-dark-low mb-20">
                            Service Plug-in
                        </div>
                        <div class="_inner">
                            <div class="media plugin-item p-16">
                                <img src="../../resources/assets/images/sample/plugin-sample-1.png" alt
                                     class="align-self-start mr-20">
                                <div class="media-body">
                                    <h5 class="bold-h5 mb-8">QeuryPlug - 데이터베이스 ERD 및 SQL 자동 생성</h5>
                                    <p class="_desc light-h5 c-gray-medium">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam
                                        autem ducimus enim eum
                                        exercitationem facilis fugiat ipsam laboriosam maiores maxime nam odio quisquam
                                        recusandae rem, sapiente
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
                                    <p class="_desc light-h5 c-gray-medium">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam
                                        autem ducimus enim eum
                                        exercitationem facilis fugiat ipsam laboriosam maiores maxime nam odio quisquam
                                        recusandae rem, sapiente
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
                                    <p class="_desc light-h5 c-gray-medium">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam
                                        autem ducimus enim eum
                                        exercitationem facilis fugiat ipsam laboriosam maiores maxime nam odio quisquam
                                        recusandae rem, sapiente
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
                </div>
            </div>
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
    });
</script>
</body>
</html>