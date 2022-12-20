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
    <!-- Element -->
    <link rel="stylesheet"
          href="/resources/css/base/element.css">
    <link rel="stylesheet"
          href="/resources/css/base/chat/element.css">
    <title>Okiwi CRM Workspace</title>
</head>
<body>
<header id="l-header"
        class="chat-theme">
    <img class="mr-12"
         src="/resources/assets/images/icon/sample_chatplug.svg"/>
    <span class="regular-h5 my-auto">chatPlug - 팀원 간 업무 커뮤니케이션</span>
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
                            chatPlug를 소개합니다.
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="callout regular-h5 bg-basic-white c-gray-dark-low p-24">
                        chatPlug는 팀원들과 업무에 대한 실시간 커뮤니케이션 기능을 지원하는 채팅 도구입니다.
                    </div>
                </div>
                <div class="col-12 mt-32">
                    <div class="row">
                        <div class="col-9 ">
                            <div class="recent-status-container px-0 py-24 bg-basic-white callout">
                                <ul class="nav nav-tabs mt-8"
                                    id="recent-tab"
                                    role="tablist">
                                    <li class="nav-item"
                                        role="presentation">
                                        <button class="nav-link bold-h5 active"
                                                id="channel-list-tab"
                                                data-toggle="tab"
                                                data-target="#channel-list"
                                                type="button"
                                                role="tab"
                                                aria-controls="channel-list"
                                                aria-selected="true">채널
                                        </button>
                                    </li>
                                    <li class="nav-item"
                                        role="presentation">
                                        <button class="nav-link bold-h5"
                                                id="thread-tab"
                                                data-toggle="tab"
                                                data-target="#thread"
                                                type="button"
                                                role="tab"
                                                aria-controls="thread"
                                                aria-selected="false">스레드
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
                                    <li class="nav-item"
                                        role="presentation">
                                        <button class="nav-link bold-h5"
                                                id="direct-tab"
                                                data-toggle="tab"
                                                data-target="#direct"
                                                type="button"
                                                role="tab"
                                                aria-controls="direct"
                                                aria-selected="false">다이렉트 메시지
                                        </button>
                                    </li>
                                    <li class="nav-item"
                                        role="presentation">
                                        <button class="nav-link bold-h5"
                                                id="store-tab"
                                                data-toggle="tab"
                                                data-target="#store"
                                                type="button"
                                                role="tab"
                                                aria-controls="store"
                                                aria-selected="false">저장된 항목
                                        </button>
                                    </li>
                                </ul>
                                <div class="tab-content"
                                     id="myTabContent">
                                    <div class="tab-pane fade show active"
                                         id="channel-list"
                                         role="tabpanel"
                                         aria-labelledby="channel-list-tab">
                                        <ul class="list-group level-workspace-list-chat">
                                            <li class="py-3 list-group-item border-bold " data-id="task_id">
                                                <div class="_name bold-h5"># 채널 명</div>
                                                <div class="_body"
                                                     style="width: 100% !important; min-height: auto !important;">
                                                    <div class="_main_thread">
                                                        <div class="chat-item workspace"
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
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit. Accusantium alias delectus eum
                                                                        fugiat iure
                                                                        libero maxime nam nemo odio omnis porro quae
                                                                        quia, quos ratione, tenetur totam ut voluptate
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

                                                        <div class="chat-item workspace" data-id="az1848"
                                                             data-bookmark="false">
                                                            <div class="media">
                                                                <a class="mr-3" href="#">
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
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit. Accusantium alias delectus eum
                                                                        fugiat iure
                                                                        libero maxime nam nemo odio omnis porro quae
                                                                        quia, quos ratione, tenetur totam ut voluptate
                                                                        voluptatum?<span class="_edited">(편집됨)</span>
                                                                    </div>
                                                                    <div class="_reactions">
                                                                        <div class="_reaction is-active"
                                                                             data-title="test">
                                                                            <div class="_emoji">😂</div>
                                                                            <div class="_count" data-count="101">99+
                                                                            </div>
                                                                        </div>
                                                                        <div class="_reaction" data-title="test">
                                                                            <div class="_emoji">✅</div>
                                                                            <div class="_count" data-count="99">99
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class=" pt-16">
                                                <span class="medium-h5 c-brand-green">
                                                    + 메시지 보내기
                                                </span>
                                                </div>
                                            </li>
                                            <li class="py-3 list-group-item border-bold" data-id="task_id">
                                                <div class="_name bold-h5"># 채널 명</div>
                                                <div class="_body"
                                                     style="width: 100% !important; min-height: auto !important;">
                                                    <div class="_main_thread">
                                                        <div class="chat-item workspace"
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
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit. Accusantium alias delectus eum
                                                                        fugiat iure
                                                                        libero maxime nam nemo odio omnis porro quae
                                                                        quia, quos ratione, tenetur totam ut voluptate
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

                                                        <div class="chat-item workspace" data-id="az1848"
                                                             data-bookmark="false">
                                                            <div class="media">
                                                                <a class="mr-3" href="#">
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
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit. Accusantium alias delectus eum
                                                                        fugiat iure
                                                                        libero maxime nam nemo odio omnis porro quae
                                                                        quia, quos ratione, tenetur totam ut voluptate
                                                                        voluptatum?<span class="_edited">(편집됨)</span>
                                                                    </div>
                                                                    <div class="_reactions">
                                                                        <div class="_reaction is-active"
                                                                             data-title="test">
                                                                            <div class="_emoji">😂</div>
                                                                            <div class="_count" data-count="101">99+
                                                                            </div>
                                                                        </div>
                                                                        <div class="_reaction" data-title="test">
                                                                            <div class="_emoji">✅</div>
                                                                            <div class="_count" data-count="99">99
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class=" pt-16">
                                                <span class="medium-h5 c-brand-green">
                                                    + 메시지 보내기
                                                </span>
                                                </div>
                                            </li>
                                            <li class="py-3 list-group-item border-bold" data-id="task_id">
                                                <div class="_name bold-h5"># 채널 명</div>
                                                <div class="_body"
                                                     style="width: 100% !important; min-height: auto !important;">
                                                    <div class="_main_thread">
                                                        <div class="chat-item workspace"
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
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit. Accusantium alias delectus eum
                                                                        fugiat iure
                                                                        libero maxime nam nemo odio omnis porro quae
                                                                        quia, quos ratione, tenetur totam ut voluptate
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

                                                        <div class="chat-item workspace" data-id="az1848"
                                                             data-bookmark="false">
                                                            <div class="media">
                                                                <a class="mr-3" href="#">
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
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit. Accusantium alias delectus eum
                                                                        fugiat iure
                                                                        libero maxime nam nemo odio omnis porro quae
                                                                        quia, quos ratione, tenetur totam ut voluptate
                                                                        voluptatum?<span class="_edited">(편집됨)</span>
                                                                    </div>
                                                                    <div class="_reactions">
                                                                        <div class="_reaction is-active"
                                                                             data-title="test">
                                                                            <div class="_emoji">😂</div>
                                                                            <div class="_count" data-count="101">99+
                                                                            </div>
                                                                        </div>
                                                                        <div class="_reaction" data-title="test">
                                                                            <div class="_emoji">✅</div>
                                                                            <div class="_count" data-count="99">99
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class=" pt-16">
                                                <span class="medium-h5 c-brand-green">
                                                    + 메시지 보내기
                                                </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="tab-pane fade"
                                         id="thread"
                                         role="tabpanel"
                                         aria-labelledby="thread-tab">
                                        <ul class="list-group">
                                            <li class="py-3 list-group-item border-bold" data-id="task_id">
                                                <div class="_name bold-h5"># 채널 명</div>
                                                <div class="_body"
                                                     style="width: 100% !important; min-height: auto !important;">
                                                    <div class="_main_thread">
                                                        <div class="chat-item workspace"
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
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit. Accusantium alias delectus eum
                                                                        fugiat iure
                                                                        libero maxime nam nemo odio omnis porro quae
                                                                        quia, quos ratione, tenetur totam ut voluptate
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

                                                        <div class="chat-item workspace" data-id="az1848"
                                                             data-bookmark="false">
                                                            <div class="media">
                                                                <a class="mr-3" href="#">
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
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit. Accusantium alias delectus eum
                                                                        fugiat iure
                                                                        libero maxime nam nemo odio omnis porro quae
                                                                        quia, quos ratione, tenetur totam ut voluptate
                                                                        voluptatum?<span class="_edited">(편집됨)</span>
                                                                    </div>
                                                                    <div class="_reactions">
                                                                        <div class="_reaction is-active"
                                                                             data-title="test">
                                                                            <div class="_emoji">😂</div>
                                                                            <div class="_count" data-count="101">99+
                                                                            </div>
                                                                        </div>
                                                                        <div class="_reaction" data-title="test">
                                                                            <div class="_emoji">✅</div>
                                                                            <div class="_count" data-count="99">99
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class=" pt-16">
                                                <span class="medium-h5 c-brand-green">
                                                    + 메시지 보내기
                                                </span>
                                                </div>
                                            </li>
                                            <li class="py-3 list-group-item border-bold" data-id="task_id">
                                                <div class="_name bold-h5"># 채널 명</div>
                                                <div class="_body"
                                                     style="width: 100% !important; min-height: auto !important;">
                                                    <div class="_main_thread">
                                                        <div class="chat-item workspace"
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
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit. Accusantium alias delectus eum
                                                                        fugiat iure
                                                                        libero maxime nam nemo odio omnis porro quae
                                                                        quia, quos ratione, tenetur totam ut voluptate
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

                                                        <div class="chat-item workspace" data-id="az1848"
                                                             data-bookmark="false">
                                                            <div class="media">
                                                                <a class="mr-3" href="#">
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
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit. Accusantium alias delectus eum
                                                                        fugiat iure
                                                                        libero maxime nam nemo odio omnis porro quae
                                                                        quia, quos ratione, tenetur totam ut voluptate
                                                                        voluptatum?<span class="_edited">(편집됨)</span>
                                                                    </div>
                                                                    <div class="_reactions">
                                                                        <div class="_reaction is-active"
                                                                             data-title="test">
                                                                            <div class="_emoji">😂</div>
                                                                            <div class="_count" data-count="101">99+
                                                                            </div>
                                                                        </div>
                                                                        <div class="_reaction" data-title="test">
                                                                            <div class="_emoji">✅</div>
                                                                            <div class="_count" data-count="99">99
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class=" pt-16">
                                                <span class="medium-h5 c-brand-green">
                                                    + 메시지 보내기
                                                </span>
                                                </div>
                                            </li>
                                            <li class="py-3 list-group-item border-bold" data-id="task_id">
                                                <div class="_name bold-h5"># 채널 명</div>
                                                <div class="_body"
                                                     style="width: 100% !important; min-height: auto !important;">
                                                    <div class="_main_thread">
                                                        <div class="chat-item workspace"
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
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit. Accusantium alias delectus eum
                                                                        fugiat iure
                                                                        libero maxime nam nemo odio omnis porro quae
                                                                        quia, quos ratione, tenetur totam ut voluptate
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

                                                        <div class="chat-item workspace" data-id="az1848"
                                                             data-bookmark="false">
                                                            <div class="media">
                                                                <a class="mr-3" href="#">
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
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit. Accusantium alias delectus eum
                                                                        fugiat iure
                                                                        libero maxime nam nemo odio omnis porro quae
                                                                        quia, quos ratione, tenetur totam ut voluptate
                                                                        voluptatum?<span class="_edited">(편집됨)</span>
                                                                    </div>
                                                                    <div class="_reactions">
                                                                        <div class="_reaction is-active"
                                                                             data-title="test">
                                                                            <div class="_emoji">😂</div>
                                                                            <div class="_count" data-count="101">99+
                                                                            </div>
                                                                        </div>
                                                                        <div class="_reaction" data-title="test">
                                                                            <div class="_emoji">✅</div>
                                                                            <div class="_count" data-count="99">99
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class=" pt-16">
                                                <span class="medium-h5 c-brand-green">
                                                    + 메시지 보내기
                                                </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>


                                    <div class="tab-pane fade"
                                         id="mention"
                                         role="tabpanel"
                                         aria-labelledby="mention-tab">
                                        <ul class="list-group">
                                            <li class="py-3 list-group-item border-bold" data-id="task_id">
                                                <div class="_name bold-h5"># 채널 명</div>
                                                <div class="_body"
                                                     style="width: 100% !important; min-height: auto !important;">
                                                    <div class="_main_thread">
                                                        <div class="chat-item workspace"
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
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit. Accusantium alias delectus eum
                                                                        fugiat iure
                                                                        libero maxime nam nemo odio omnis porro quae
                                                                        quia, quos ratione, tenetur totam ut voluptate
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

                                                        <div class="chat-item workspace" data-id="az1848"
                                                             data-bookmark="false">
                                                            <div class="media">
                                                                <a class="mr-3" href="#">
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
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit. Accusantium alias delectus eum
                                                                        fugiat iure
                                                                        libero maxime nam nemo odio omnis porro quae
                                                                        quia, quos ratione, tenetur totam ut voluptate
                                                                        voluptatum?<span class="_edited">(편집됨)</span>
                                                                    </div>
                                                                    <div class="_reactions">
                                                                        <div class="_reaction is-active"
                                                                             data-title="test">
                                                                            <div class="_emoji">😂</div>
                                                                            <div class="_count" data-count="101">99+
                                                                            </div>
                                                                        </div>
                                                                        <div class="_reaction" data-title="test">
                                                                            <div class="_emoji">✅</div>
                                                                            <div class="_count" data-count="99">99
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class=" pt-16">
                                                <span class="medium-h5 c-brand-green">
                                                    + 메시지 보내기
                                                </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tab-pane fade"
                                         id="direct"
                                         role="tabpanel"
                                         aria-labelledby="direct-tab">
                                        <ul class="list-group">
                                            <li class="py-3 list-group-item border-bold" data-id="task_id">
                                                <div class="_body"
                                                     style="width: 100% !important; min-height: auto !important;">
                                                    <div class="_main_thread">
                                                        <div class="chat-item direct"
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
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit. Accusantium alias delectus eum
                                                                        fugiat iure
                                                                        libero maxime nam nemo odio omnis porro quae
                                                                        quia, quos ratione, tenetur totam ut voluptate
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
                                                </div>
                                                <div class=" pt-16">
                                                <span class="medium-h5 c-brand-green">
                                                    + 메시지 보내기
                                                </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tab-pane fade"
                                         id="store"
                                         role="tabpanel"
                                         aria-labelledby="store-tab">
                                        <ul class="list-group">
                                            <li class="py-3 list-group-item border-bold" data-id="task_id">
                                                <div class="_name bold-h5"># 채널 명</div>
                                                <div class="_body"
                                                     style="width: 100% !important; min-height: auto !important;">
                                                    <div class="_main_thread">
                                                        <div class="chat-item workspace"
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
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit. Accusantium alias delectus eum
                                                                        fugiat iure
                                                                        libero maxime nam nemo odio omnis porro quae
                                                                        quia, quos ratione, tenetur totam ut voluptate
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

                                                        <div class="chat-item workspace" data-id="az1848"
                                                             data-bookmark="false">
                                                            <div class="media">
                                                                <a class="mr-3" href="#">
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
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit. Accusantium alias delectus eum
                                                                        fugiat iure
                                                                        libero maxime nam nemo odio omnis porro quae
                                                                        quia, quos ratione, tenetur totam ut voluptate
                                                                        voluptatum?<span class="_edited">(편집됨)</span>
                                                                    </div>
                                                                    <div class="_reactions">
                                                                        <div class="_reaction is-active"
                                                                             data-title="test">
                                                                            <div class="_emoji">😂</div>
                                                                            <div class="_count" data-count="101">99+
                                                                            </div>
                                                                        </div>
                                                                        <div class="_reaction" data-title="test">
                                                                            <div class="_emoji">✅</div>
                                                                            <div class="_count" data-count="99">99
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class=" pt-16">
                                                <span class="medium-h5 c-brand-green">
                                                    + 메시지 보내기
                                                </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-3">


                            <div class="project-container  bg-basic-white callout bold-h5">

                                <div id="chat-left-sidebar" class="workspace-channel">
                                    <ul class="list-group">
                                        <ul class="list-group">
                                            <li class="list-group-item mt-16">
                                                <div class="_collapsable">
                                                    <a href="#channel" data-toggle="collapse" role="button"
                                                       aria-expanded="true" aria-controls="channel">
                                                        <span>채널</span>
                                                    </a>
                                                    <div class="collapse show" id="channel">
                                                        <ul class="nav-second-level level-type-channel pt-1">
                                                            <li class="channel-item is-like"
                                                                data-id="SRTOSoKrZ0q79uyoFX5N1A==">
                                                                <a href="#">
                                                                    <svg class="_like" width="16" height="16"
                                                                         viewBox="0 0 16 16" fill="none"
                                                                         xmlns="http://www.w3.org/2000/svg">
                                                                        <g clip-path="url(#clip0_338_5123)">
                                                                            <path d="M8.00027 12.174L3.29827 14.806L4.34827 9.52065L0.391602 5.86198L5.74293 5.22732L8.00027 0.333984L10.2576 5.22732L15.6089 5.86198L11.6523 9.52065L12.7023 14.806L8.00027 12.174Z"></path>
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_338_5123">
                                                                                <rect width="16" height="16"
                                                                                      fill="white"></rect>
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                    <div>Plugin PipeLine</div>
                                                                    <div class="_alarms" style="display: block;">9+
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li class="channel-item" data-id="SRTOSoKrZ0q79uyoFX5N1A==">
                                                                <a href="#">
                                                                    <svg class="_like" width="16" height="16"
                                                                         viewBox="0 0 16 16" fill="none"
                                                                         xmlns="http://www.w3.org/2000/svg">
                                                                        <g clip-path="url(#clip0_338_5123)">
                                                                            <path d="M8.00027 12.174L3.29827 14.806L4.34827 9.52065L0.391602 5.86198L5.74293 5.22732L8.00027 0.333984L10.2576 5.22732L15.6089 5.86198L11.6523 9.52065L12.7023 14.806L8.00027 12.174Z"></path>
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_338_5123">
                                                                                <rect width="16" height="16"
                                                                                      fill="white"></rect>
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                    <div>Plugin CRM</div>
                                                                    <div class="_alarms" style="display: block;">3</div>
                                                                </a></li>
                                                            <li class="channel-item" data-id="SRTOSoKrZ0q79uyoFX5N1A==">
                                                                <a href="#">
                                                                    <svg class="_like" width="16" height="16"
                                                                         viewBox="0 0 16 16" fill="none"
                                                                         xmlns="http://www.w3.org/2000/svg">
                                                                        <g clip-path="url(#clip0_338_5123)">
                                                                            <path d="M8.00027 12.174L3.29827 14.806L4.34827 9.52065L0.391602 5.86198L5.74293 5.22732L8.00027 0.333984L10.2576 5.22732L15.6089 5.86198L11.6523 9.52065L12.7023 14.806L8.00027 12.174Z"></path>
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_338_5123">
                                                                                <rect width="16" height="16"
                                                                                      fill="white"></rect>
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                    <div>Plugin Chat</div>
                                                                    <div class="_alarms" style="display: block;">1</div>
                                                                </a></li>
                                                            <li class="channel-item is-like"
                                                                data-id="SRTOSoKrZ0q79uyoFX5N1A==">
                                                                <a href="#">
                                                                    <svg class="_like" width="16" height="16"
                                                                         viewBox="0 0 16 16" fill="none"
                                                                         xmlns="http://www.w3.org/2000/svg">
                                                                        <g clip-path="url(#clip0_338_5123)">
                                                                            <path d="M8.00027 12.174L3.29827 14.806L4.34827 9.52065L0.391602 5.86198L5.74293 5.22732L8.00027 0.333984L10.2576 5.22732L15.6089 5.86198L11.6523 9.52065L12.7023 14.806L8.00027 12.174Z"></path>
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_338_5123">
                                                                                <rect width="16" height="16"
                                                                                      fill="white"></rect>
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                    <div>Plugin Querys</div>
                                                                    <div class="_alarms" style="display: none;">0</div>
                                                                </a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list-group-item">
                                                <div class="_collapsable">
                                                    <a href="#message" data-toggle="collapse" role="button"
                                                       aria-expanded="true" aria-controls="message">
                                                        <span>다이렉트 메세지</span>
                                                        <span class="menu-arrow"></span>
                                                    </a>
                                                    <div class="collapse show" id="message">
                                                        <ul class="nav-second-level level-type-dm">
                                                            <li class="dm-item is-live" data-id="asdfkjnvdf"><a
                                                                    href="#">
                                                                <div class="_profile"
                                                                     style="background-image: url('https://search.pstatic.net/sunny/?src=https%3A%2F%2Fthumb2.gettyimageskorea.com%2Fimage_preview%2F700%2F201709%2FEYM%2F752194037.jpg&amp;type=a340')">
                                                                    <div class="_live"></div>
                                                                </div>
                                                                <div>김우식</div>
                                                                <div class="_alarms" style="display: none;">0</div>
                                                            </a></li>
                                                            <li class="dm-item is-live" data-id="asdfkjnvdf"><a
                                                                    href="#">
                                                                <div class="_profile"
                                                                     style="background-image: url('https://search.pstatic.net/sunny/?src=https%3A%2F%2Fthumb2.gettyimageskorea.com%2Fimage_preview%2F700%2F201709%2FEYM%2F752194037.jpg&amp;type=a340')">
                                                                    <div class="_live"></div>
                                                                </div>
                                                                <div>유병준</div>
                                                                <div class="_alarms" style="display: block;">1</div>
                                                            </a></li>
                                                            <li class="dm-item" data-id="asdfkjnvdf"><a href="#">
                                                                <div class="_profile"
                                                                     style="background-image: url('https://search.pstatic.net/sunny/?src=https%3A%2F%2Fthumb2.gettyimageskorea.com%2Fimage_preview%2F700%2F201709%2FEYM%2F752194037.jpg&amp;type=a340')">
                                                                    <div class="_live"></div>
                                                                </div>
                                                                <div>홍스님</div>
                                                                <div class="_alarms" style="display: block;">1</div>
                                                            </a></li>
                                                            <li class="dm-item" data-id="asdfkjnvdf"><a href="#">
                                                                <div class="_profile"
                                                                     style="background-image: url('https://search.pstatic.net/sunny/?src=https%3A%2F%2Fthumb2.gettyimageskorea.com%2Fimage_preview%2F700%2F201709%2FEYM%2F752194037.jpg&amp;type=a340')">
                                                                    <div class="_live"></div>
                                                                </div>
                                                                <div>장택성</div>
                                                                <div class="_alarms" style="display: block;">1</div>
                                                            </a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="okiwi-crm-right-side"
     class="right-side-container is-close is-closed">
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

<script src="/resources/js/validation.js"></script>
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
        /*TODO Chat Content Initialize*/
        $('.channel-item').click(function (event) {
            location.href = '/chat/channel/SRTOSoKrZ0q79uyoFX5N1A==';
        });
        /*fetch('/resources/assets/datas/chat_workspace.json')
            .then((response) => response.json())
            .then((list) => {
                initializeChatWorkSpace(list.channels, list.users);
            });

        fetch('/resources/assets/datas/chat_workspace_info.json')
            .then((response) => response.json())
            .then((list) => {
                initializeChatWorkSpaceInfo(list.channels,list.threads,list.mentions,list.directs,list.stored);
            });*/
    });
</script>
</body>
</html>