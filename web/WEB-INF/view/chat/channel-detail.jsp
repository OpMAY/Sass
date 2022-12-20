<%@ page import="com.model.query.DataBase" %>
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
          href="/resources/css/theme/chat/theme.css">
    <!-- Layout -->
    <link rel="stylesheet"
          href="/resources/css/layout/layout.css">
    <link rel="stylesheet"
          href="/resources/css/layout/res-layout.css">
    <link rel="stylesheet"
          href="/resources/css/layout/chat/layout.css">
    <!-- Plugin -->
    <link rel="stylesheet"
          href="/resources/css/plugin/sample.css">
    <link rel="stylesheet"
          href="/resources/css/plugin/emoji/emojibuttonlistjs.css"/>
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
          href="/resources/css/module/okiwi-chat.css">
    <link rel="stylesheet"
          href="/resources/css/module/okiwi-chat-right-side.css">
    <link rel="stylesheet"
          href="/resources/css/module/okiwi-mention.css">
    <!-- Element -->
    <link rel="stylesheet"
          href="/resources/css/base/element.css">
    <link rel="stylesheet"
          href="/resources/css/base/chat/element.css">
    <link rel="stylesheet"
          href="/resources/css/module/modal.css">
    <title>Okiwi Chat Channel</title>
</head>
<body>
<header id="l-header"
        class="chat-theme">
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
<div id="plugin-left-sidebar">
    <div class="_plugin-container">
        <div class="_left-plugin"
             data-type="query">
            <img width="36"
                 height="36"
                 src="/resources/assets/images/sample/plugin-sample-1.png"/>
        </div>
        <div class="_left-plugin"
             data-type="query">
            <img width="36"
                 height="36"
                 src="/resources/assets/images/sample/plugin-sample-2.png"/>
        </div>
        <div class="_left-plugin"
             data-type="query">
            <img width="36"
                 height="36"
                 src="/resources/assets/images/sample/plugin-sample-3.png"/>
        </div>
        <div class="_left-plugin"
             data-type="query">
            <img width="36"
                 height="36"
                 src="/resources/assets/images/sample/plugin-sample-1.png"/>
        </div>
        <div class="_left-plugin"
             data-type="query">
            <img width="36"
                 height="36"
                 src="/resources/assets/images/sample/plugin-sample-2.png"/>
        </div>
        <div class="_left-plugin"
             data-type="query">
            <img width="36"
                 height="36"
                 src="/resources/assets/images/sample/plugin-sample-3.png"/>
        </div>
    </div>
</div>
<div id="l-content-wrapper"
     class="left-sidebar-type sidebar-is-open">
    <div class="content-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 px-0 chat-tab">
                    <div class="_title">
                        <div class="_name bold-h4 c-gray-dark-low">이슈 및 리스트</div>
                    </div>
                </div>
                <div class="col-12 px-0">
                    <div class="chat-container">
                        <!--<div class="_bookmark-container">
                          <div class="_bookmark">
                            <div class="_favicon"
                                 style="background-image: url('https://www.naver.com/favicon.ico')">
                            </div>
                            <a href="https://www.naver.com"
                               target="_blank"
                               class="_link">https://www.naver.com</a>
                          </div>
                          <div class="_bookmark add">
                            <svg width="24"
                                 height="24"
                                 viewBox="0 0 24 24"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                              <g clip-path="url(#clip0_42_9962)">
                                <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"
                                      fill="black"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_42_9962">
                                  <rect width="24"
                                        height="24"
                                        fill="white"/>
                                </clipPath>
                              </defs>
                            </svg>
                            <div class="_link">추가하기</div>
                          </div>
                        </div>-->
                        <!--<div class="_send-container">
                          <div class="_edit-panel">
                            <div class="_edit-icon _option bold">
                              <svg width="24"
                                   height="24"
                                   viewBox="0 0 24 24"
                                   fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_42_6537)">
                                  <path d="M8 11H12.5C13.163 11 13.7989 10.7366 14.2678 10.2678C14.7366 9.79893 15 9.16304 15 8.5C15 7.83696 14.7366 7.20107 14.2678 6.73223C13.7989 6.26339 13.163 6 12.5 6H8V11ZM18 15.5C18 16.0909 17.8836 16.6761 17.6575 17.2221C17.4313 17.768 17.0998 18.2641 16.682 18.682C16.2641 19.0998 15.768 19.4313 15.2221 19.6575C14.6761 19.8836 14.0909 20 13.5 20H6V4H12.5C13.381 4.00004 14.2425 4.25865 14.9779 4.74378C15.7132 5.2289 16.29 5.9192 16.6367 6.72907C16.9834 7.53894 17.0847 8.43276 16.9282 9.29969C16.7716 10.1666 16.3641 10.9685 15.756 11.606C16.4386 12.0013 17.0053 12.5692 17.3992 13.2526C17.7931 13.9361 18.0003 14.7112 18 15.5ZM8 13V18H13.5C14.163 18 14.7989 17.7366 15.2678 17.2678C15.7366 16.7989 16 16.163 16 15.5C16 14.837 15.7366 14.2011 15.2678 13.7322C14.7989 13.2634 14.163 13 13.5 13H8Z"
                                        fill="black"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_42_6537">
                                    <rect width="24"
                                          height="24"
                                          fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div class="_edit-icon _option italic">
                              <svg width="24"
                                   height="24"
                                   viewBox="0 0 24 24"
                                   fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_42_6662)">
                                  <path d="M15 20H7V18H9.927L12.043 6H9V4H17V6H14.073L11.957 18H15V20Z"
                                        fill="black"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_42_6662">
                                    <rect width="24"
                                          height="24"
                                          fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div class="_edit-icon _option strikethrough">
                              <svg width="24"
                                   height="24"
                                   viewBox="0 0 24 24"
                                   fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_42_6455)">
                                  <path d="M17.154 14C17.384 14.516 17.5 15.09 17.5 15.72C17.5 17.062 16.976 18.112 15.929 18.867C14.88 19.622 13.433 20 11.586 20C9.946 20 8.323 19.619 6.716 18.856V16.6C8.236 17.477 9.791 17.916 11.382 17.916C13.933 17.916 15.212 17.184 15.221 15.719C15.2263 15.422 15.1716 15.1269 15.0603 14.8515C14.9489 14.5761 14.7832 14.3259 14.573 14.116L14.453 13.999H3V11.999H21V13.999H17.154V14ZM13.076 11H7.629C7.45383 10.8403 7.29289 10.6656 7.148 10.478C6.716 9.92 6.5 9.246 6.5 8.452C6.5 7.216 6.966 6.165 7.897 5.299C8.83 4.433 10.271 4 12.222 4C13.693 4 15.101 4.328 16.444 4.984V7.136C15.244 6.449 13.929 6.106 12.498 6.106C10.018 6.106 8.779 6.888 8.779 8.452C8.779 8.872 8.997 9.238 9.433 9.551C9.869 9.864 10.407 10.113 11.046 10.301C11.666 10.481 12.343 10.715 13.076 11V11Z"
                                        fill="black"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_42_6455">
                                    <rect width="24"
                                          height="24"
                                          fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div class="_edit-icon _option underline">
                              <svg width="24"
                                   height="24"
                                   viewBox="0 0 24 24"
                                   fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_42_6431)">
                                  <path d="M8 3V12C8 13.0609 8.42143 14.0783 9.17157 14.8284C9.92172 15.5786 10.9391 16 12 16C13.0609 16 14.0783 15.5786 14.8284 14.8284C15.5786 14.0783 16 13.0609 16 12V3H18V12C18 13.5913 17.3679 15.1174 16.2426 16.2426C15.1174 17.3679 13.5913 18 12 18C10.4087 18 8.88258 17.3679 7.75736 16.2426C6.63214 15.1174 6 13.5913 6 12V3H8ZM4 20H20V22H4V20Z"
                                        fill="black"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_42_6431">
                                    <rect width="24"
                                          height="24"
                                          fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div class="_edit-icon _option link">
                              <svg width="24"
                                   height="24"
                                   viewBox="0 0 24 24"
                                   fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_42_6509)">
                                  <path d="M17.657 14.828L16.243 13.414L17.657 12C18.0285 11.6286 18.3231 11.1876 18.5241 10.7023C18.7252 10.217 18.8286 9.69681 18.8286 9.1715C18.8286 8.6462 18.7252 8.12605 18.5241 7.64073C18.3231 7.15542 18.0285 6.71445 17.657 6.343C17.2856 5.97156 16.8446 5.67691 16.3593 5.47589C15.874 5.27487 15.3538 5.1714 14.8285 5.1714C14.3032 5.1714 13.7831 5.27487 13.2977 5.47589C12.8124 5.67691 12.3715 5.97156 12 6.343L10.586 7.757L9.17201 6.343L10.586 4.929C11.7143 3.81892 13.2356 3.19966 14.8184 3.2061C16.4012 3.21255 17.9174 3.84418 19.0366 4.96341C20.1558 6.08265 20.7875 7.5988 20.7939 9.18162C20.8004 10.7644 20.1811 12.2857 19.071 13.414L17.657 14.828ZM14.828 17.657L13.414 19.071C12.8585 19.6356 12.1968 20.0846 11.4669 20.3922C10.737 20.6998 9.95343 20.8598 9.16139 20.863C8.36936 20.8662 7.58452 20.7126 6.85215 20.411C6.11979 20.1094 5.45438 19.6658 4.89432 19.1057C4.33426 18.5456 3.89063 17.8802 3.58902 17.1479C3.28741 16.4155 3.13379 15.6307 3.13701 14.8386C3.14024 14.0466 3.30025 13.263 3.60781 12.5331C3.91538 11.8033 4.36441 11.1415 4.92901 10.586L6.34301 9.172L7.75701 10.586L6.34301 12C5.97157 12.3714 5.67692 12.8124 5.4759 13.2977C5.27488 13.783 5.17141 14.3032 5.17141 14.8285C5.17141 15.3538 5.27488 15.874 5.4759 16.3593C5.67692 16.8446 5.97157 17.2856 6.34301 17.657C6.71446 18.0284 7.15543 18.3231 7.64074 18.5241C8.12605 18.7251 8.64621 18.8286 9.17151 18.8286C9.69681 18.8286 10.217 18.7251 10.7023 18.5241C11.1876 18.3231 11.6286 18.0284 12 17.657L13.414 16.243L14.828 17.657ZM14.828 7.757L16.243 9.172L9.17201 16.242L7.75701 14.828L14.828 7.758V7.757Z"
                                        fill="black"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_42_6509">
                                    <rect width="24"
                                          height="24"
                                          fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div class="_edit-icon _option unlink">
                              <svg width="24"
                                   height="24"
                                   viewBox="0 0 24 24"
                                   fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_42_6722)">
                                  <path d="M17 17H22V19H19V22H17V17ZM7 7H2V5H5V2H7V7ZM18.364 15.536L16.95 14.12L18.364 12.706C18.8316 12.2424 19.2031 11.6911 19.4571 11.0836C19.711 10.4761 19.8425 9.82442 19.844 9.16597C19.8454 8.50751 19.7168 7.85526 19.4655 7.24666C19.2142 6.63805 18.8451 6.08508 18.3795 5.61948C17.9139 5.15389 17.3609 4.78484 16.7523 4.53353C16.1437 4.28221 15.4915 4.15359 14.833 4.15503C14.1746 4.15647 13.5229 4.28795 12.9154 4.54193C12.3079 4.7959 11.7566 5.16737 11.293 5.635L9.879 7.05L8.464 5.636L9.88 4.222C11.1928 2.90918 12.9734 2.17164 14.83 2.17164C16.6866 2.17164 18.4672 2.90918 19.78 4.222C21.0928 5.53482 21.8304 7.31539 21.8304 9.172C21.8304 11.0286 21.0928 12.8092 19.78 14.122L18.365 15.536H18.364ZM15.536 18.364L14.121 19.778C12.8082 21.0908 11.0276 21.8284 9.171 21.8284C7.31439 21.8284 5.53382 21.0908 4.221 19.778C2.90818 18.4652 2.17064 16.6846 2.17064 14.828C2.17064 12.9714 2.90818 11.1908 4.221 9.878L5.636 8.464L7.05 9.88L5.636 11.294C5.16837 11.7576 4.7969 12.3089 4.54293 12.9164C4.28895 13.5239 4.15747 14.1756 4.15603 14.834C4.15459 15.4925 4.28321 16.1447 4.53453 16.7533C4.78584 17.3619 5.15489 17.9149 5.62048 18.3805C6.08608 18.8461 6.63905 19.2152 7.24766 19.4665C7.85626 19.7178 8.50851 19.8464 9.16696 19.845C9.82541 19.8435 10.4771 19.712 11.0846 19.4581C11.6921 19.2041 12.2434 18.8326 12.707 18.365L14.121 16.951L15.536 18.365V18.364ZM14.828 7.757L16.243 9.172L9.172 16.242L7.757 14.828L14.828 7.758V7.757Z"
                                        fill="black"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_42_6722">
                                    <rect width="24"
                                          height="24"
                                          fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div class="_edit-icon _option order-list">
                              <svg width="24"
                                   height="24"
                                   viewBox="0 0 24 24"
                                   fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_42_6533)">
                                  <path d="M8 4H21V6H8V4ZM5 3V6H6V7H3V6H4V4H3V3H5ZM3 14V11.5H5V11H3V10H6V12.5H4V13H6V14H3ZM5 19.5H3V18.5H5V18H3V17H6V21H3V20H5V19.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"
                                        fill="black"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_42_6533">
                                    <rect width="24"
                                          height="24"
                                          fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div class="_edit-icon _option unordered-list">
                              <svg width="24"
                                   height="24"
                                   viewBox="0 0 24 24"
                                   fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_42_6686)">
                                  <path d="M8 4H21V6H8V4ZM3 3.5H6V6.5H3V3.5ZM3 10.5H6V13.5H3V10.5ZM3 17.5H6V20.5H3V17.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"
                                        fill="black"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_42_6686">
                                    <rect width="24"
                                          height="24"
                                          fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </div>
                          <div class="_input-inner">
                            <div contenteditable="true"
                                 class="form-control _chat-input"
                                 placeholder="내용을 입력해주세요."></div>
                            <div class="_write">
                              <svg width="32"
                                   height="32"
                                   viewBox="0 0 32 32"
                                   fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16"
                                        cy="16"
                                        r="16"
                                        fill="#00C473"></circle>
                                <path d="M23.0714 8.93836C22.9731 8.84067 22.8489 8.77304 22.7135 8.74341C22.5781 8.71378 22.437 8.72338 22.3068 8.77109L6.28825 14.589C6.1501 14.6413 6.03117 14.7344 5.94724 14.8558C5.86331 14.9773 5.81836 15.1214 5.81836 15.2689C5.81836 15.4165 5.86331 15.5606 5.94724 15.682C6.03117 15.8035 6.1501 15.8966 6.28825 15.9489L12.5428 18.4433L17.159 13.8181L18.1857 14.8435L13.5476 19.476L16.0523 25.723C16.1063 25.8583 16.1997 25.9743 16.3204 26.056C16.4411 26.1377 16.5836 26.1812 16.7295 26.1811C16.8766 26.1781 17.0194 26.1306 17.139 26.0449C17.2585 25.9592 17.3493 25.8394 17.3993 25.7011L23.2243 9.70196C23.2739 9.57329 23.2858 9.43319 23.2588 9.29799C23.2317 9.1628 23.1667 9.03807 23.0714 8.93836Z"
                                      fill="white"></path>
                              </svg>
                            </div>
                          </div>
                          <div class="_control-panel">
                            <ul>
                              <li class="_file">
                                <svg width="24"
                                     height="24"
                                     viewBox="0 0 24 24"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                  <g clip-path="url(#clip0_42_6509)">
                                    <path d="M17.657 14.828L16.243 13.414L17.657 12C18.0285 11.6286 18.3231 11.1876 18.5241 10.7023C18.7252 10.217 18.8286 9.69681 18.8286 9.1715C18.8286 8.6462 18.7252 8.12605 18.5241 7.64073C18.3231 7.15542 18.0285 6.71445 17.657 6.343C17.2856 5.97156 16.8446 5.67691 16.3593 5.47589C15.874 5.27487 15.3538 5.1714 14.8285 5.1714C14.3032 5.1714 13.7831 5.27487 13.2977 5.47589C12.8124 5.67691 12.3715 5.97156 12 6.343L10.586 7.757L9.17201 6.343L10.586 4.929C11.7143 3.81892 13.2356 3.19966 14.8184 3.2061C16.4012 3.21255 17.9174 3.84418 19.0366 4.96341C20.1558 6.08265 20.7875 7.5988 20.7939 9.18162C20.8004 10.7644 20.1811 12.2857 19.071 13.414L17.657 14.828ZM14.828 17.657L13.414 19.071C12.8585 19.6356 12.1968 20.0846 11.4669 20.3922C10.737 20.6998 9.95343 20.8598 9.16139 20.863C8.36936 20.8662 7.58452 20.7126 6.85215 20.411C6.11979 20.1094 5.45438 19.6658 4.89432 19.1057C4.33426 18.5456 3.89063 17.8802 3.58902 17.1479C3.28741 16.4155 3.13379 15.6307 3.13701 14.8386C3.14024 14.0466 3.30025 13.263 3.60781 12.5331C3.91538 11.8033 4.36441 11.1415 4.92901 10.586L6.34301 9.172L7.75701 10.586L6.34301 12C5.97157 12.3714 5.67692 12.8124 5.4759 13.2977C5.27488 13.783 5.17141 14.3032 5.17141 14.8285C5.17141 15.3538 5.27488 15.874 5.4759 16.3593C5.67692 16.8446 5.97157 17.2856 6.34301 17.657C6.71446 18.0284 7.15543 18.3231 7.64074 18.5241C8.12605 18.7251 8.64621 18.8286 9.17151 18.8286C9.69681 18.8286 10.217 18.7251 10.7023 18.5241C11.1876 18.3231 11.6286 18.0284 12 17.657L13.414 16.243L14.828 17.657ZM14.828 7.757L16.243 9.172L9.17201 16.242L7.75701 14.828L14.828 7.758V7.757Z"
                                          fill="black"></path>
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_42_6509">
                                      <rect width="24"
                                            height="24"
                                            fill="white"></rect>
                                    </clipPath>
                                  </defs>
                                </svg>
                              </li>
                              <li class="_mention">
                                <svg width="24"
                                     height="24"
                                     viewBox="0 0 24 24"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                  <g clip-path="url(#clip0_42_3275)">
                                    <path d="M20 12C19.9998 10.2169 19.4039 8.48494 18.3069 7.07919C17.2099 5.67345 15.6747 4.67448 13.9451 4.24094C12.2155 3.80739 10.3906 3.96411 8.76028 4.68621C7.12992 5.40831 5.78753 6.65439 4.94629 8.22659C4.10504 9.79879 3.81316 11.607 4.11699 13.364C4.42083 15.1211 5.30296 16.7262 6.62331 17.9246C7.94366 19.1231 9.62653 19.846 11.4047 19.9787C13.1829 20.1114 14.9544 19.6462 16.438 18.657L17.548 20.321C15.9062 21.4187 13.975 22.0032 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12V13.5C22.0001 14.2488 21.7601 14.9778 21.3152 15.5801C20.8703 16.1823 20.244 16.626 19.5283 16.846C18.8126 17.066 18.0453 17.0507 17.3389 16.8023C16.6326 16.5539 16.0245 16.0855 15.604 15.466C14.9366 16.16 14.083 16.6465 13.1457 16.8671C12.2085 17.0877 11.2275 17.033 10.3206 16.7096C9.41366 16.3861 8.61943 15.8077 8.03331 15.0438C7.44718 14.2799 7.09408 13.363 7.01644 12.4033C6.9388 11.4436 7.13991 10.4819 7.59562 9.63367C8.05133 8.78549 8.74225 8.08692 9.58537 7.6219C10.4285 7.15688 11.3879 6.94519 12.3485 7.01227C13.309 7.07934 14.2297 7.42232 15 8H17V13.5C17 13.8978 17.158 14.2794 17.4393 14.5607C17.7206 14.842 18.1022 15 18.5 15C18.8978 15 19.2794 14.842 19.5607 14.5607C19.842 14.2794 20 13.8978 20 13.5V12ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z"
                                          fill="black"></path>
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_42_3275">
                                      <rect width="24"
                                            height="24"
                                            fill="white"></rect>
                                    </clipPath>
                                  </defs>
                                </svg>
                              </li>
                              <li class="_emoji">
                                <button id="control-emoji-button"
                                        type="button"></button>
                                <svg width="24"
                                     height="24"
                                     viewBox="0 0 24 24"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                  <g clip-path="url(#clip0_42_11332)">
                                    <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM8 13H16C16 14.0609 15.5786 15.0783 14.8284 15.8284C14.0783 16.5786 13.0609 17 12 17C10.9391 17 9.92172 16.5786 9.17157 15.8284C8.42143 15.0783 8 14.0609 8 13ZM8 11C7.60218 11 7.22064 10.842 6.93934 10.5607C6.65804 10.2794 6.5 9.89782 6.5 9.5C6.5 9.10218 6.65804 8.72064 6.93934 8.43934C7.22064 8.15804 7.60218 8 8 8C8.39782 8 8.77936 8.15804 9.06066 8.43934C9.34196 8.72064 9.5 9.10218 9.5 9.5C9.5 9.89782 9.34196 10.2794 9.06066 10.5607C8.77936 10.842 8.39782 11 8 11ZM16 11C15.6022 11 15.2206 10.842 14.9393 10.5607C14.658 10.2794 14.5 9.89782 14.5 9.5C14.5 9.10218 14.658 8.72064 14.9393 8.43934C15.2206 8.15804 15.6022 8 16 8C16.3978 8 16.7794 8.15804 17.0607 8.43934C17.342 8.72064 17.5 9.10218 17.5 9.5C17.5 9.89782 17.342 10.2794 17.0607 10.5607C16.7794 10.842 16.3978 11 16 11Z"
                                          fill="black"/>
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_42_11332">
                                      <rect width="24"
                                            height="24"
                                            fill="white"/>
                                    </clipPath>
                                  </defs>
                                </svg>
                              </li>
                            </ul>
                          </div>
                        </div>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="chat-left-sidebar">
    <ul class="list-group">
        <li class="list-group-item first">Chat Plug</li>
        <ul class="list-group">
            <li class="list-group-item">스레드</li>
            <li class="list-group-item">@나를 멘션</li>
            <li class="list-group-item">
                <div class="_collapsable">
                    <a href="#channel"
                       data-toggle="collapse"
                       role="button"
                       aria-expanded="true"
                       aria-controls="channel">
                        <span>채널</span>
                    </a>
                    <div class="collapse show"
                         id="channel">
                        <ul class="nav-second-level level-type-channel">
                            <!--<li class="channel-item is-like">
                              <a href="#">
                                <svg class="_like"
                                     width="16"
                                     height="16"
                                     viewBox="0 0 16 16"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                  <g clip-path="url(#clip0_338_5123)">
                                    <path d="M8.00027 12.174L3.29827 14.806L4.34827 9.52065L0.391602 5.86198L5.74293 5.22732L8.00027 0.333984L10.2576 5.22732L15.6089 5.86198L11.6523 9.52065L12.7023 14.806L8.00027 12.174Z"/>
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_338_5123">
                                      <rect width="16"
                                            height="16"
                                            fill="white"/>
                                    </clipPath>
                                  </defs>
                                </svg>
                                <div>Plugin Markets</div>
                                <div class="_alarms">3</div>
                              </a>
                            </li>
                            <li class="channel-item is-like">
                              <a href="#">
                                <svg class="_like"
                                     width="16"
                                     height="16"
                                     viewBox="0 0 16 16"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                  <g clip-path="url(#clip0_338_5123)">
                                    <path d="M8.00027 12.174L3.29827 14.806L4.34827 9.52065L0.391602 5.86198L5.74293 5.22732L8.00027 0.333984L10.2576 5.22732L15.6089 5.86198L11.6523 9.52065L12.7023 14.806L8.00027 12.174Z"/>
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_338_5123">
                                      <rect width="16"
                                            height="16"
                                            fill="white"/>
                                    </clipPath>
                                  </defs>
                                </svg>
                                <div>Plugin Querys</div>
                                <div class="_alarms">3</div>
                              </a>
                            </li>
                            <li class="channel-item">
                              <a href="#">
                                <svg class="_like"
                                     width="16"
                                     height="16"
                                     viewBox="0 0 16 16"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                  <g clip-path="url(#clip0_338_5123)">
                                    <path d="M8.00027 12.174L3.29827 14.806L4.34827 9.52065L0.391602 5.86198L5.74293 5.22732L8.00027 0.333984L10.2576 5.22732L15.6089 5.86198L11.6523 9.52065L12.7023 14.806L8.00027 12.174Z"/>
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_338_5123">
                                      <rect width="16"
                                            height="16"
                                            fill="white"/>
                                    </clipPath>
                                  </defs>
                                </svg>
                                <div>Plugin CRM</div>
                              </a>
                            </li>
                            <li class="channel-item">
                              <a href="#">
                                <svg class="_like"
                                     width="16"
                                     height="16"
                                     viewBox="0 0 16 16"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                  <g clip-path="url(#clip0_338_5123)">
                                    <path d="M8.00027 12.174L3.29827 14.806L4.34827 9.52065L0.391602 5.86198L5.74293 5.22732L8.00027 0.333984L10.2576 5.22732L15.6089 5.86198L11.6523 9.52065L12.7023 14.806L8.00027 12.174Z"/>
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_338_5123">
                                      <rect width="16"
                                            height="16"
                                            fill="white"/>
                                    </clipPath>
                                  </defs>
                                </svg>
                                <div>Plugin Chat</div>
                              </a>
                            </li>
                            <li class="channel-item is-active">
                              <a href="#">
                                <svg class="_like"
                                     width="16"
                                     height="16"
                                     viewBox="0 0 16 16"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                  <g clip-path="url(#clip0_338_5123)">
                                    <path d="M8.00027 12.174L3.29827 14.806L4.34827 9.52065L0.391602 5.86198L5.74293 5.22732L8.00027 0.333984L10.2576 5.22732L15.6089 5.86198L11.6523 9.52065L12.7023 14.806L8.00027 12.174Z"/>
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_338_5123">
                                      <rect width="16"
                                            height="16"
                                            fill="white"/>
                                    </clipPath>
                                  </defs>
                                </svg>
                                <div>이슈 및 리스트</div>
                              </a>
                            </li>-->
                        </ul>
                    </div>
                </div>
            </li>
            <li class="list-group-item">
                <div class="_collapsable">
                    <a href="#message"
                       data-toggle="collapse"
                       role="button"
                       aria-expanded="true"
                       aria-controls="message">
                        <span>다이렉트 메세지</span>
                        <span class="menu-arrow"></span>
                    </a>
                    <div class="collapse show"
                         id="message">
                        <ul class="nav-second-level level-type-dm">
                            <!--<li class="dm-item is-live"
                                data-user-no="1">
                              <a href="#">
                                <div class="_profile"
                                     style="background-image: url('https://via.placeholder.com/24x24')">
                                  <div class="_live"></div>
                                </div>
                                <div>유병준</div>
                                <div class="_alarms">3</div>
                              </a>
                            </li>
                            <li class="dm-item is-live"
                                data-user-no="2">
                              <a href="#">
                                <div class="_profile"
                                     style="background-image: url('https://via.placeholder.com/24x24')">
                                  <div class="_live"></div>
                                </div>
                                <div>김우식</div>
                              </a>
                            </li>
                            <li class="dm-item"
                                data-user-no="3">
                              <a href="#">
                                <div class="_profile"
                                     style="background-image: url('https://via.placeholder.com/24x24')">
                                  <div class="_live"></div>
                                </div>
                                <div>한지우</div>
                              </a>
                            </li>
                            <li class="dm-item"
                                data-user-no="4">
                              <a href="#">
                                <div class="_profile"
                                     style="background-image: url('https://via.placeholder.com/24x24')">
                                  <div class="_live"></div>
                                </div>
                                <div>장택성</div>
                              </a>
                            </li>
                            <li class="dm-item"
                                data-user-no="5">
                              <a href="#">
                                <div class="_profile"
                                     style="background-image: url('https://via.placeholder.com/24x24')">
                                  <div class="_live"></div>
                                </div>
                                <div>홍스님</div>
                              </a>
                            </li>-->
                        </ul>
                    </div>
                </div>
            </li>
        </ul>
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
                  fill="#00C473"></path>
        </svg>
    </div>
</div>
<div id="chat-right-side"
     class="right-side-container is-close is-closed">
    <div class="right-side-inner">
        <div class="_header">
            <div class="_back">
                <svg width="22"
                     height="20"
                     viewBox="0 0 22 20"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 9.75H21"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"></path>
                    <path d="M12.25 1L21 9.75L12.25 18.5"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"></path>
                </svg>
            </div>
        </div>
        <div class="_body">
            <div class="_main_thread">
                <div class="chat-item"
                     data-id="az1848"
                     data-bookmark="false">
                    <div class="media">
                        <a class="mr-3"
                           href="#">
                            <div class="_profile"
                                 style="background-image: url('https://search.pstatic.net/sunny/?src=https%3A%2F%2Fthumb2.gettyimageskorea.com%2Fimage_preview%2F700%2F201709%2FEYM%2F752194037.jpg&amp;type=a340')"></div>
                        </a>
                        <div class="media-body">
                            <div class="mt-0 media-title">
                                <div class="_name">
                                    김우식
                                </div>
                                <div class="_date">
                                    <span class="__meridian">오후</span>
                                    <span class="__time">9:58</span>
                                </div>
                            </div>
                            <div class="_content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias delectus eum
                                fugiat iure
                                libero maxime nam nemo odio omnis porro quae quia, quos ratione, tenetur totam ut
                                voluptate
                                voluptatum?<span class="_edited">(편집됨)</span>
                            </div>
                            <div class="_reactions">
                                <div class="_reaction is-active"
                                     data-title="test">
                                    <div class="_emoji">😂</div>
                                    <div class="_count"
                                         data-count="101">99+
                                    </div>
                                </div>
                                <div class="_reaction"
                                     data-title="test">
                                    <div class="_emoji">✅</div>
                                    <div class="_count"
                                         data-count="99">99
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="text-divider">
                <div class="_divider"></div>
                <div class="_divider-text">댓글</div>
                <div class="_divider"></div>
            </div>
            <div class="_sub_threads">
                <div class="chat-item"
                     data-id="az1848"
                     data-bookmark="false">
                    <div class="media">
                        <a class="mr-3"
                           href="#">
                            <div class="_profile"
                                 style="background-image: url('https://search.pstatic.net/sunny/?src=https%3A%2F%2Fthumb2.gettyimageskorea.com%2Fimage_preview%2F700%2F201709%2FEYM%2F752194037.jpg&amp;type=a340')"></div>
                        </a>
                        <div class="media-body">
                            <div class="mt-0 media-title">
                                <div class="_name">
                                    김우식
                                </div>
                                <div class="_date">
                                    <span class="__meridian">오후</span>
                                    <span class="__time">9:58</span>
                                </div>
                            </div>
                            <div class="_content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias delectus eum
                                fugiat iure
                                libero maxime nam nemo odio omnis porro quae quia, quos ratione, tenetur totam ut
                                voluptate
                                voluptatum?<span class="_edited">(편집됨)</span>
                            </div>
                            <div class="_reactions">
                                <div class="_reaction is-active"
                                     data-title="test">
                                    <div class="_emoji">😂</div>
                                    <div class="_count"
                                         data-count="101">99+
                                    </div>
                                </div>
                                <div class="_reaction"
                                     data-title="test">
                                    <div class="_emoji">✅</div>
                                    <div class="_count"
                                         data-count="99">99
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="chat-item"
                     data-id="az1848"
                     data-bookmark="false">
                    <div class="media">
                        <a class="mr-3"
                           href="#">
                            <div class="_profile"
                                 style="background-image: url('https://search.pstatic.net/sunny/?src=https%3A%2F%2Fthumb2.gettyimageskorea.com%2Fimage_preview%2F700%2F201709%2FEYM%2F752194037.jpg&amp;type=a340')"></div>
                        </a>
                        <div class="media-body">
                            <div class="mt-0 media-title">
                                <div class="_name">
                                    김우식
                                </div>
                                <div class="_date">
                                    <span class="__meridian">오후</span>
                                    <span class="__time">9:58</span>
                                </div>
                            </div>
                            <div class="_content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias delectus eum
                                fugiat iure
                                libero maxime nam nemo odio omnis porro quae quia, quos ratione, tenetur totam ut
                                voluptate
                                voluptatum?<span class="_edited">(편집됨)</span>
                            </div>
                            <div class="_reactions">
                                <div class="_reaction is-active"
                                     data-title="test">
                                    <div class="_emoji">😂</div>
                                    <div class="_count"
                                         data-count="101">99+
                                    </div>
                                </div>
                                <div class="_reaction"
                                     data-title="test">
                                    <div class="_emoji">✅</div>
                                    <div class="_count"
                                         data-count="99">99
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="chat-item"
                     data-id="az1848"
                     data-bookmark="false">
                    <div class="media">
                        <a class="mr-3"
                           href="#">
                            <div class="_profile"
                                 style="background-image: url('https://search.pstatic.net/sunny/?src=https%3A%2F%2Fthumb2.gettyimageskorea.com%2Fimage_preview%2F700%2F201709%2FEYM%2F752194037.jpg&amp;type=a340')"></div>
                        </a>
                        <div class="media-body">
                            <div class="mt-0 media-title">
                                <div class="_name">
                                    김우식
                                </div>
                                <div class="_date">
                                    <span class="__meridian">오후</span>
                                    <span class="__time">9:58</span>
                                </div>
                            </div>
                            <div class="_content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias delectus eum
                                fugiat iure
                                libero maxime nam nemo odio omnis porro quae quia, quos ratione, tenetur totam ut
                                voluptate
                                voluptatum?<span class="_edited">(편집됨)</span>
                            </div>
                            <div class="_reactions">
                                <div class="_reaction is-active"
                                     data-title="test">
                                    <div class="_emoji">😂</div>
                                    <div class="_count"
                                         data-count="101">99+
                                    </div>
                                </div>
                                <div class="_reaction"
                                     data-title="test">
                                    <div class="_emoji">✅</div>
                                    <div class="_count"
                                         data-count="99">99
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="_send-container __thread">
                <div class="_edit-panel">
                    <div class="_edit-icon _option bold">
                        <svg width="24"
                             height="24"
                             viewBox="0 0 24 24"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_42_6537)">
                                <path d="M8 11H12.5C13.163 11 13.7989 10.7366 14.2678 10.2678C14.7366 9.79893 15 9.16304 15 8.5C15 7.83696 14.7366 7.20107 14.2678 6.73223C13.7989 6.26339 13.163 6 12.5 6H8V11ZM18 15.5C18 16.0909 17.8836 16.6761 17.6575 17.2221C17.4313 17.768 17.0998 18.2641 16.682 18.682C16.2641 19.0998 15.768 19.4313 15.2221 19.6575C14.6761 19.8836 14.0909 20 13.5 20H6V4H12.5C13.381 4.00004 14.2425 4.25865 14.9779 4.74378C15.7132 5.2289 16.29 5.9192 16.6367 6.72907C16.9834 7.53894 17.0847 8.43276 16.9282 9.29969C16.7716 10.1666 16.3641 10.9685 15.756 11.606C16.4386 12.0013 17.0053 12.5692 17.3992 13.2526C17.7931 13.9361 18.0003 14.7112 18 15.5ZM8 13V18H13.5C14.163 18 14.7989 17.7366 15.2678 17.2678C15.7366 16.7989 16 16.163 16 15.5C16 14.837 15.7366 14.2011 15.2678 13.7322C14.7989 13.2634 14.163 13 13.5 13H8Z"
                                      fill="black"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_42_6537">
                                    <rect width="24"
                                          height="24"
                                          fill="white"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div class="_edit-icon _option italic">
                        <svg width="24"
                             height="24"
                             viewBox="0 0 24 24"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_42_6662)">
                                <path d="M15 20H7V18H9.927L12.043 6H9V4H17V6H14.073L11.957 18H15V20Z"
                                      fill="black"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_42_6662">
                                    <rect width="24"
                                          height="24"
                                          fill="white"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div class="_edit-icon _option strikethrough">
                        <svg width="24"
                             height="24"
                             viewBox="0 0 24 24"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_42_6455)">
                                <path d="M17.154 14C17.384 14.516 17.5 15.09 17.5 15.72C17.5 17.062 16.976 18.112 15.929 18.867C14.88 19.622 13.433 20 11.586 20C9.946 20 8.323 19.619 6.716 18.856V16.6C8.236 17.477 9.791 17.916 11.382 17.916C13.933 17.916 15.212 17.184 15.221 15.719C15.2263 15.422 15.1716 15.1269 15.0603 14.8515C14.9489 14.5761 14.7832 14.3259 14.573 14.116L14.453 13.999H3V11.999H21V13.999H17.154V14ZM13.076 11H7.629C7.45383 10.8403 7.29289 10.6656 7.148 10.478C6.716 9.92 6.5 9.246 6.5 8.452C6.5 7.216 6.966 6.165 7.897 5.299C8.83 4.433 10.271 4 12.222 4C13.693 4 15.101 4.328 16.444 4.984V7.136C15.244 6.449 13.929 6.106 12.498 6.106C10.018 6.106 8.779 6.888 8.779 8.452C8.779 8.872 8.997 9.238 9.433 9.551C9.869 9.864 10.407 10.113 11.046 10.301C11.666 10.481 12.343 10.715 13.076 11V11Z"
                                      fill="black"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_42_6455">
                                    <rect width="24"
                                          height="24"
                                          fill="white"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div class="_edit-icon _option underline">
                        <svg width="24"
                             height="24"
                             viewBox="0 0 24 24"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_42_6431)">
                                <path d="M8 3V12C8 13.0609 8.42143 14.0783 9.17157 14.8284C9.92172 15.5786 10.9391 16 12 16C13.0609 16 14.0783 15.5786 14.8284 14.8284C15.5786 14.0783 16 13.0609 16 12V3H18V12C18 13.5913 17.3679 15.1174 16.2426 16.2426C15.1174 17.3679 13.5913 18 12 18C10.4087 18 8.88258 17.3679 7.75736 16.2426C6.63214 15.1174 6 13.5913 6 12V3H8ZM4 20H20V22H4V20Z"
                                      fill="black"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_42_6431">
                                    <rect width="24"
                                          height="24"
                                          fill="white"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div class="_edit-icon _option link">
                        <svg width="24"
                             height="24"
                             viewBox="0 0 24 24"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_42_6509)">
                                <path d="M17.657 14.828L16.243 13.414L17.657 12C18.0285 11.6286 18.3231 11.1876 18.5241 10.7023C18.7252 10.217 18.8286 9.69681 18.8286 9.1715C18.8286 8.6462 18.7252 8.12605 18.5241 7.64073C18.3231 7.15542 18.0285 6.71445 17.657 6.343C17.2856 5.97156 16.8446 5.67691 16.3593 5.47589C15.874 5.27487 15.3538 5.1714 14.8285 5.1714C14.3032 5.1714 13.7831 5.27487 13.2977 5.47589C12.8124 5.67691 12.3715 5.97156 12 6.343L10.586 7.757L9.17201 6.343L10.586 4.929C11.7143 3.81892 13.2356 3.19966 14.8184 3.2061C16.4012 3.21255 17.9174 3.84418 19.0366 4.96341C20.1558 6.08265 20.7875 7.5988 20.7939 9.18162C20.8004 10.7644 20.1811 12.2857 19.071 13.414L17.657 14.828ZM14.828 17.657L13.414 19.071C12.8585 19.6356 12.1968 20.0846 11.4669 20.3922C10.737 20.6998 9.95343 20.8598 9.16139 20.863C8.36936 20.8662 7.58452 20.7126 6.85215 20.411C6.11979 20.1094 5.45438 19.6658 4.89432 19.1057C4.33426 18.5456 3.89063 17.8802 3.58902 17.1479C3.28741 16.4155 3.13379 15.6307 3.13701 14.8386C3.14024 14.0466 3.30025 13.263 3.60781 12.5331C3.91538 11.8033 4.36441 11.1415 4.92901 10.586L6.34301 9.172L7.75701 10.586L6.34301 12C5.97157 12.3714 5.67692 12.8124 5.4759 13.2977C5.27488 13.783 5.17141 14.3032 5.17141 14.8285C5.17141 15.3538 5.27488 15.874 5.4759 16.3593C5.67692 16.8446 5.97157 17.2856 6.34301 17.657C6.71446 18.0284 7.15543 18.3231 7.64074 18.5241C8.12605 18.7251 8.64621 18.8286 9.17151 18.8286C9.69681 18.8286 10.217 18.7251 10.7023 18.5241C11.1876 18.3231 11.6286 18.0284 12 17.657L13.414 16.243L14.828 17.657ZM14.828 7.757L16.243 9.172L9.17201 16.242L7.75701 14.828L14.828 7.758V7.757Z"
                                      fill="black"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_42_6509">
                                    <rect width="24"
                                          height="24"
                                          fill="white"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div class="_edit-icon _option unlink">
                        <svg width="24"
                             height="24"
                             viewBox="0 0 24 24"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_42_6722)">
                                <path d="M17 17H22V19H19V22H17V17ZM7 7H2V5H5V2H7V7ZM18.364 15.536L16.95 14.12L18.364 12.706C18.8316 12.2424 19.2031 11.6911 19.4571 11.0836C19.711 10.4761 19.8425 9.82442 19.844 9.16597C19.8454 8.50751 19.7168 7.85526 19.4655 7.24666C19.2142 6.63805 18.8451 6.08508 18.3795 5.61948C17.9139 5.15389 17.3609 4.78484 16.7523 4.53353C16.1437 4.28221 15.4915 4.15359 14.833 4.15503C14.1746 4.15647 13.5229 4.28795 12.9154 4.54193C12.3079 4.7959 11.7566 5.16737 11.293 5.635L9.879 7.05L8.464 5.636L9.88 4.222C11.1928 2.90918 12.9734 2.17164 14.83 2.17164C16.6866 2.17164 18.4672 2.90918 19.78 4.222C21.0928 5.53482 21.8304 7.31539 21.8304 9.172C21.8304 11.0286 21.0928 12.8092 19.78 14.122L18.365 15.536H18.364ZM15.536 18.364L14.121 19.778C12.8082 21.0908 11.0276 21.8284 9.171 21.8284C7.31439 21.8284 5.53382 21.0908 4.221 19.778C2.90818 18.4652 2.17064 16.6846 2.17064 14.828C2.17064 12.9714 2.90818 11.1908 4.221 9.878L5.636 8.464L7.05 9.88L5.636 11.294C5.16837 11.7576 4.7969 12.3089 4.54293 12.9164C4.28895 13.5239 4.15747 14.1756 4.15603 14.834C4.15459 15.4925 4.28321 16.1447 4.53453 16.7533C4.78584 17.3619 5.15489 17.9149 5.62048 18.3805C6.08608 18.8461 6.63905 19.2152 7.24766 19.4665C7.85626 19.7178 8.50851 19.8464 9.16696 19.845C9.82541 19.8435 10.4771 19.712 11.0846 19.4581C11.6921 19.2041 12.2434 18.8326 12.707 18.365L14.121 16.951L15.536 18.365V18.364ZM14.828 7.757L16.243 9.172L9.172 16.242L7.757 14.828L14.828 7.758V7.757Z"
                                      fill="black"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_42_6722">
                                    <rect width="24"
                                          height="24"
                                          fill="white"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div class="_edit-icon _option order-list">
                        <svg width="24"
                             height="24"
                             viewBox="0 0 24 24"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_42_6533)">
                                <path d="M8 4H21V6H8V4ZM5 3V6H6V7H3V6H4V4H3V3H5ZM3 14V11.5H5V11H3V10H6V12.5H4V13H6V14H3ZM5 19.5H3V18.5H5V18H3V17H6V21H3V20H5V19.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"
                                      fill="black"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_42_6533">
                                    <rect width="24"
                                          height="24"
                                          fill="white"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div class="_edit-icon _option unordered-list">
                        <svg width="24"
                             height="24"
                             viewBox="0 0 24 24"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_42_6686)">
                                <path d="M8 4H21V6H8V4ZM3 3.5H6V6.5H3V3.5ZM3 10.5H6V13.5H3V10.5ZM3 17.5H6V20.5H3V17.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"
                                      fill="black"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_42_6686">
                                    <rect width="24"
                                          height="24"
                                          fill="white"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>
                <div class="_input-inner">
                    <div contenteditable="true"
                         class="form-control _chat-input"
                         placeholder="내용을 입력해주세요."></div>
                    <div class="_write">
                        <svg width="32"
                             height="32"
                             viewBox="0 0 32 32"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16"
                                    cy="16"
                                    r="16"
                                    fill="#00C473"></circle>
                            <path d="M23.0714 8.93836C22.9731 8.84067 22.8489 8.77304 22.7135 8.74341C22.5781 8.71378 22.437 8.72338 22.3068 8.77109L6.28825 14.589C6.1501 14.6413 6.03117 14.7344 5.94724 14.8558C5.86331 14.9773 5.81836 15.1214 5.81836 15.2689C5.81836 15.4165 5.86331 15.5606 5.94724 15.682C6.03117 15.8035 6.1501 15.8966 6.28825 15.9489L12.5428 18.4433L17.159 13.8181L18.1857 14.8435L13.5476 19.476L16.0523 25.723C16.1063 25.8583 16.1997 25.9743 16.3204 26.056C16.4411 26.1377 16.5836 26.1812 16.7295 26.1811C16.8766 26.1781 17.0194 26.1306 17.139 26.0449C17.2585 25.9592 17.3493 25.8394 17.3993 25.7011L23.2243 9.70196C23.2739 9.57329 23.2858 9.43319 23.2588 9.29799C23.2317 9.1628 23.1667 9.03807 23.0714 8.93836Z"
                                  fill="white"></path>
                        </svg>
                    </div>
                </div>
                <div class="_control-panel">
                    <ul>
                        <li class="_file">
                            <svg width="24"
                                 height="24"
                                 viewBox="0 0 24 24"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_42_6509)">
                                    <path d="M17.657 14.828L16.243 13.414L17.657 12C18.0285 11.6286 18.3231 11.1876 18.5241 10.7023C18.7252 10.217 18.8286 9.69681 18.8286 9.1715C18.8286 8.6462 18.7252 8.12605 18.5241 7.64073C18.3231 7.15542 18.0285 6.71445 17.657 6.343C17.2856 5.97156 16.8446 5.67691 16.3593 5.47589C15.874 5.27487 15.3538 5.1714 14.8285 5.1714C14.3032 5.1714 13.7831 5.27487 13.2977 5.47589C12.8124 5.67691 12.3715 5.97156 12 6.343L10.586 7.757L9.17201 6.343L10.586 4.929C11.7143 3.81892 13.2356 3.19966 14.8184 3.2061C16.4012 3.21255 17.9174 3.84418 19.0366 4.96341C20.1558 6.08265 20.7875 7.5988 20.7939 9.18162C20.8004 10.7644 20.1811 12.2857 19.071 13.414L17.657 14.828ZM14.828 17.657L13.414 19.071C12.8585 19.6356 12.1968 20.0846 11.4669 20.3922C10.737 20.6998 9.95343 20.8598 9.16139 20.863C8.36936 20.8662 7.58452 20.7126 6.85215 20.411C6.11979 20.1094 5.45438 19.6658 4.89432 19.1057C4.33426 18.5456 3.89063 17.8802 3.58902 17.1479C3.28741 16.4155 3.13379 15.6307 3.13701 14.8386C3.14024 14.0466 3.30025 13.263 3.60781 12.5331C3.91538 11.8033 4.36441 11.1415 4.92901 10.586L6.34301 9.172L7.75701 10.586L6.34301 12C5.97157 12.3714 5.67692 12.8124 5.4759 13.2977C5.27488 13.783 5.17141 14.3032 5.17141 14.8285C5.17141 15.3538 5.27488 15.874 5.4759 16.3593C5.67692 16.8446 5.97157 17.2856 6.34301 17.657C6.71446 18.0284 7.15543 18.3231 7.64074 18.5241C8.12605 18.7251 8.64621 18.8286 9.17151 18.8286C9.69681 18.8286 10.217 18.7251 10.7023 18.5241C11.1876 18.3231 11.6286 18.0284 12 17.657L13.414 16.243L14.828 17.657ZM14.828 7.757L16.243 9.172L9.17201 16.242L7.75701 14.828L14.828 7.758V7.757Z"
                                          fill="black"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_42_6509">
                                        <rect width="24"
                                              height="24"
                                              fill="white"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                        </li>
                        <li class="_mention">
                            <svg width="24"
                                 height="24"
                                 viewBox="0 0 24 24"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_42_3275)">
                                    <path d="M20 12C19.9998 10.2169 19.4039 8.48494 18.3069 7.07919C17.2099 5.67345 15.6747 4.67448 13.9451 4.24094C12.2155 3.80739 10.3906 3.96411 8.76028 4.68621C7.12992 5.40831 5.78753 6.65439 4.94629 8.22659C4.10504 9.79879 3.81316 11.607 4.11699 13.364C4.42083 15.1211 5.30296 16.7262 6.62331 17.9246C7.94366 19.1231 9.62653 19.846 11.4047 19.9787C13.1829 20.1114 14.9544 19.6462 16.438 18.657L17.548 20.321C15.9062 21.4187 13.975 22.0032 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12V13.5C22.0001 14.2488 21.7601 14.9778 21.3152 15.5801C20.8703 16.1823 20.244 16.626 19.5283 16.846C18.8126 17.066 18.0453 17.0507 17.3389 16.8023C16.6326 16.5539 16.0245 16.0855 15.604 15.466C14.9366 16.16 14.083 16.6465 13.1457 16.8671C12.2085 17.0877 11.2275 17.033 10.3206 16.7096C9.41366 16.3861 8.61943 15.8077 8.03331 15.0438C7.44718 14.2799 7.09408 13.363 7.01644 12.4033C6.9388 11.4436 7.13991 10.4819 7.59562 9.63367C8.05133 8.78549 8.74225 8.08692 9.58537 7.6219C10.4285 7.15688 11.3879 6.94519 12.3485 7.01227C13.309 7.07934 14.2297 7.42232 15 8H17V13.5C17 13.8978 17.158 14.2794 17.4393 14.5607C17.7206 14.842 18.1022 15 18.5 15C18.8978 15 19.2794 14.842 19.5607 14.5607C19.842 14.2794 20 13.8978 20 13.5V12ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z"
                                          fill="black"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_42_3275">
                                        <rect width="24"
                                              height="24"
                                              fill="white"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                        </li>
                        <li class="_emoji">
                            <button id="control-emoji-button"
                                    type="button"></button>
                            <svg width="24"
                                 height="24"
                                 viewBox="0 0 24 24"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_42_11332)">
                                    <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM8 13H16C16 14.0609 15.5786 15.0783 14.8284 15.8284C14.0783 16.5786 13.0609 17 12 17C10.9391 17 9.92172 16.5786 9.17157 15.8284C8.42143 15.0783 8 14.0609 8 13ZM8 11C7.60218 11 7.22064 10.842 6.93934 10.5607C6.65804 10.2794 6.5 9.89782 6.5 9.5C6.5 9.10218 6.65804 8.72064 6.93934 8.43934C7.22064 8.15804 7.60218 8 8 8C8.39782 8 8.77936 8.15804 9.06066 8.43934C9.34196 8.72064 9.5 9.10218 9.5 9.5C9.5 9.89782 9.34196 10.2794 9.06066 10.5607C8.77936 10.842 8.39782 11 8 11ZM16 11C15.6022 11 15.2206 10.842 14.9393 10.5607C14.658 10.2794 14.5 9.89782 14.5 9.5C14.5 9.10218 14.658 8.72064 14.9393 8.43934C15.2206 8.15804 15.6022 8 16 8C16.3978 8 16.7794 8.15804 17.0607 8.43934C17.342 8.72064 17.5 9.10218 17.5 9.5C17.5 9.89782 17.342 10.2794 17.0607 10.5607C16.7794 10.842 16.3978 11 16 11Z"
                                          fill="black"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_42_11332">
                                        <rect width="24"
                                              height="24"
                                              fill="white"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Chat Plug -> Chat Item Floater Menu -->
<div id="chat-floater-menu"
     style="display: none;">
    <div class="floater-option thread">
        <svg width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_42_4109)">
                <path d="M7.29101 20.824L2.00001 22L3.17601 16.709C2.40154 15.2604 1.99754 13.6426 2.00001 12C2.00001 6.477 6.47701 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C10.3574 22.0025 8.73963 21.5985 7.29101 20.824ZM7.58101 18.711L8.23401 19.061C9.39256 19.6801 10.6864 20.0027 12 20C13.5823 20 15.129 19.5308 16.4446 18.6518C17.7602 17.7727 18.7855 16.5233 19.391 15.0615C19.9965 13.5997 20.155 11.9911 19.8463 10.4393C19.5376 8.88743 18.7757 7.46197 17.6569 6.34315C16.538 5.22433 15.1126 4.4624 13.5607 4.15372C12.0089 3.84504 10.4004 4.00346 8.93854 4.60896C7.47674 5.21447 6.22731 6.23984 5.34825 7.55544C4.4692 8.87103 4.00001 10.4177 4.00001 12C4.00001 13.334 4.32501 14.618 4.94001 15.766L5.28901 16.419L4.63401 19.366L7.58101 18.711Z"
                      fill="black"/>
            </g>
            <defs>
                <clipPath id="clip0_42_4109">
                    <rect width="24"
                          height="24"
                          fill="white"/>
                </clipPath>
            </defs>
        </svg>
    </div>
    <div id="emoji-picker"
         class="floater-option reaction">
        <svg width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_42_11364)">
                <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM7 13H9C9 13.7956 9.31607 14.5587 9.87868 15.1213C10.4413 15.6839 11.2044 16 12 16C12.7956 16 13.5587 15.6839 14.1213 15.1213C14.6839 14.5587 15 13.7956 15 13H17C17 14.3261 16.4732 15.5979 15.5355 16.5355C14.5979 17.4732 13.3261 18 12 18C10.6739 18 9.40215 17.4732 8.46447 16.5355C7.52678 15.5979 7 14.3261 7 13ZM8 11C7.60218 11 7.22064 10.842 6.93934 10.5607C6.65804 10.2794 6.5 9.89782 6.5 9.5C6.5 9.10218 6.65804 8.72064 6.93934 8.43934C7.22064 8.15804 7.60218 8 8 8C8.39782 8 8.77936 8.15804 9.06066 8.43934C9.34196 8.72064 9.5 9.10218 9.5 9.5C9.5 9.89782 9.34196 10.2794 9.06066 10.5607C8.77936 10.842 8.39782 11 8 11ZM16 11C15.6022 11 15.2206 10.842 14.9393 10.5607C14.658 10.2794 14.5 9.89782 14.5 9.5C14.5 9.10218 14.658 8.72064 14.9393 8.43934C15.2206 8.15804 15.6022 8 16 8C16.3978 8 16.7794 8.15804 17.0607 8.43934C17.342 8.72064 17.5 9.10218 17.5 9.5C17.5 9.89782 17.342 10.2794 17.0607 10.5607C16.7794 10.842 16.3978 11 16 11Z"
                      fill="black"/>
            </g>
            <defs>
                <clipPath id="clip0_42_11364">
                    <rect width="24"
                          height="24"
                          fill="white"/>
                </clipPath>
            </defs>
        </svg>
    </div>
    <div class="floater-option bookmark">
        <svg width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_42_3559)">
                <path d="M5 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V22.143C20.0001 22.2324 19.9763 22.3202 19.9309 22.3973C19.8855 22.4743 19.8204 22.5378 19.7421 22.5811C19.6639 22.6244 19.5755 22.6459 19.4861 22.6434C19.3968 22.641 19.3097 22.6146 19.234 22.567L12 18.03L4.766 22.566C4.69037 22.6135 4.60339 22.6399 4.5141 22.6424C4.42482 22.6449 4.33649 22.6235 4.2583 22.5803C4.1801 22.5371 4.11491 22.4738 4.06948 22.3969C4.02406 22.32 4.00007 22.2323 4 22.143V3C4 2.73478 4.10536 2.48043 4.29289 2.29289C4.48043 2.10536 4.73478 2 5 2ZM18 4H6V19.432L12 15.671L18 19.432V4Z"
                      fill="black"/>
            </g>
            <defs>
                <clipPath id="clip0_42_3559">
                    <rect width="24"
                          height="24"
                          fill="white"/>
                </clipPath>
            </defs>
        </svg>
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

<script src="/resources/js/utility.js"></script>
<script src="/resources/js/common.js"></script>
<script src="/resources/js/app.js"></script>
<script src="/resources/js/plugin/library-sample.js"></script>
<script src="/resources/js/plugin/emoji/emoji-picker.js"></script>
<script src="/resources/js/plugin/emoji/emojibuttonlistjs.js"></script>
<!-- Module JS -->
<!-- Module JS 는 특정 페이지가 아니라 다양한 페이지에서 작동하는 부분으로 Event 및 Element 생성 및 다양한 화면에 진입했을 때
     공통적으로 로직을 수행하는 Javascript를 Module JS라고 한다.
     Selector (선택자)의 Length 및 Empty 여부를 예외처리로 해줘야한다.
     (선택자가 없으면 또는 선택자의 Length가 0이면 에러가 터질 수 있기 때문에) -->
<script src="/resources/js/module/sample.js"></script>
<script src="/resources/js/module/modal.js"></script>
<script src="/resources/js/module/okiwi-chat.js"></script>
<script src="/resources/js/module/okiwi-chat-left-side.js"></script>
<script src="/resources/js/module/okiwi-chat-right-side.js"></script>
<script src="/resources/js/module/okiwi-mention.js"></script>
<script src="/resources/js/validation.js"></script>
<script src="/resources/js/chat/api.js"></script>
<script src="/resources/js/chat/api1.js"></script>
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
        /*TODO COMMON OPTIONS*/
        document.querySelector('#chat-left-sidebar ._back').addEventListener('click', function (event) {
            console.log(this);
            let project_left_sidebar = this.closest('#chat-left-sidebar');
            let content_wrapper = document.querySelector('#l-content-wrapper');
            if (project_left_sidebar.classList.contains('is-close')) {
                project_left_sidebar.classList.remove('is-close');
                content_wrapper.classList.add('sidebar-is-open');
            } else {
                project_left_sidebar.classList.add('is-close');
                content_wrapper.classList.remove('sidebar-is-open');
            }
        });
        
        /*TODO Chat Content Initialize*/
        /*TODO 1. channel 메세지 가져오기 (Main) -> 지우씨*/
        const info = getTypeAndValue();
        getChannelMessages(info.type, info.value, null)
            .then((result) => {
                console.log(result);
                if (result.status === 'OK') {
                    if (result.data.status) {
                        initializeChat({
                            container: '.chat-container',
                            messages: result.data.messages.reverse()
                        });
                    } else {
                        viewAlert({content: '메세지를 불러오지 못했습니다.'});
                    }
                } else {
                    viewAlert({content: '메세지를 불러오지 못했습니다.'});
                }
            })
        
        /*TODO Chat Left Initialize*/
        /*TODO 2. channels, users 가져오기 (Left) -> 지우씨*/
        getCompanyChannelsAndMembers().then((result) => {
            console.log(result);
            if (result.status === 'OK') {
                if (result.data.status) {
                    usersConverter(result.data.users);
                    initializeLeftSide(result.data.channels, result.data.users);
                } else {
                    viewAlert({content: '유저 정보를 불러오지 못했습니다.'});
                }
            } else {
                viewAlert({content: '유저 정보를 불러오지 못했습니다.'});
            }
        })
        /*TODO Chat Right Initialize*/
        initializeRightThread();
    });
</script>
</body>
</html>