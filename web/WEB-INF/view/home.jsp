<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html lang="ko">
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
    <title>aVouch - Home</title>
</head>
<body>
<jsp:include page="common/header.jsp"/>
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
        <li class="nav-item ml-auto d-none"
            role="presentation">
            <button class="nav-link active p-16 d-none"
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
            <jsp:include page="common/plugin-left-sidebar.jsp"/>
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
                            <img class="img-fluid"
                                 src="../../resources/assets/images/sample/sample-banner-1.png"/>
                        </div>
                        <div class="col-6 _banner">
                            <img class="img-fluid"
                                 src="../../resources/assets/images/sample/sample-banner-2.png"/>
                        </div>
                    </div>
                    <div class="service-plugin-container">
                        <div class="_title bold-h4 c-gray-dark-low mb-20">
                            Service Plug-in
                        </div>
                        <div class="_inner">
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
<jsp:include page="common/global-modal.jsp" flush="false"/>
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
<script src="../../resources/js/inspection.js"></script>
<script src="../../resources/js/validation.js"></script>
<script src="../../resources/js/global-modal.js"></script>
<script src="../../resources/js/api.js"></script>
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
        apiGetPlugs().then((result) => {
            let container = document.querySelector('.tab-pane#plugin ._body .service-plugin-container ._inner');
            deleteChild(container);
            console.log(result.status, result.data);
            if (result.status === 'OK') {
                result.data.plugins.forEach(function (plugin) {
                    $(container).append(createPluginElement(plugin));
                });
                container.querySelectorAll('.plugin-item ._install button').forEach(function (button) {
                    let plugin_item = button.closest('.plugin-item');
                    plugin_item.addEventListener('click', function (e) {
                        location.href = '/plugin/' + this.dataset.pluginType + '/detail';
                    });
                    button.addEventListener('click', installClickEventListener);
                });
            } else {

            }
        });
    });
</script>
</body>
</html>