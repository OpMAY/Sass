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
    <link rel="stylesheet" href="../../../resources/css/plugin/sample.css">
    <!-- State -->
    <link rel="stylesheet" href="../../../resources/css/state/state.css">
    <link rel="stylesheet" href="../../../resources/css/state/res-state.css">
    <link rel="stylesheet" href="../../../resources/css/state/query/state.css">
    <!-- Module -->
    <link rel="stylesheet" href="../../../resources/css/module/module.css">
    <link rel="stylesheet" href="../../../resources/css/module/res-module.css">
    <!-- Element -->
    <link rel="stylesheet" href="../../../resources/css/base/element.css">
    <link rel="stylesheet" href="../../../resources/css/base/query/element.css">
    <link rel="stylesheet" href="../../../resources/css/module/modal.css">
    <title>Okiwi Query Workspace</title>
</head>
<body>
<jsp:include page="common/header.jsp"/>
<jsp:include page="../common/plugin-left-sidebar.jsp"/>
<div id="l-content-wrapper">
    <div class="content-wrapper">
        <div class="container pt-100 pb-100">
            <div class="row">
                <div class="col-12 mb-24">
                    <div class="d-flex">
                        <img class="my-auto mr-16" src="../../../resources/assets/images/icon/query/icon-clap.png"/>
                        <div class="my-auto bold-h3 c-gray-dark-low">
                            queryPlug를 소개합니다.
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
                <div class="col-12 mt-48 mb-48">
                    <div class="divider"></div>
                </div>
                <div class="col-12 workspace-container">
                    <div class="d-flex mb-32">
                        <div class="bold-h3 my-auto c-gray-dark-low">
                            데이터베이스
                        </div>
                        <div class="ml-auto my-auto">
                            <button type="button" class="btn btn-brand bold-h4" data-href="/query/workspace/create">
                                만들기
                            </button>
                        </div>
                    </div>
                    <div class="row workspace-item-container">
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
<script src="../../../resources/js/inspection.js"></script>
<script src="../../../resources/js/validation.js"></script>
<script src="../../../resources/js/global-modal.js"></script>
<script src="../../../resources/js/api.js"></script>
<script src="../../../resources/js/query/api.js"></script>
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
        apiGetDatabases().then((result) => {
            let container = $('.workspace-item-container');
            if (result.status === 'OK') {
                result.data.databases.forEach((database) => {
                    container.append(createDatabaseElement(database));
                });
                container.find('.workspace').click(function (e) {
                    let target = e.target;
                    let workspace = target.closest('.workspace');
                    let options = target.closest('._options');
                    if (options !== null && options !== undefined) {
                        let dropdown = options.querySelectorAll('[data-toggle="dropdown"]')
                        $(dropdown).dropdown('toggle');
                        e.stopPropagation();
                    } else {
                        location.href = '/query/database/' + workspace.dataset.hash + '/detail';
                    }
                });

                container.find('.workspace .dropdown-menu').on('click', '.list-group .list-group-item', function (e) {
                    let target = e.target;
                    let workspace = target.closest('.workspace');
                    let actionClass = this.classList[2];
                    if(actionClass === '_copy') {
                        alert('복사 - 준비중');
                    } else if (actionClass === '_delete') {
                        let title = workspace.querySelector('._info ._title').textContent.trim();
                        if(confirm('데이터베이스 이름 : ' + title + '\n\n해당 데이터베이스를 삭제하시겠어요?')) {
                            apiDeleteDatabase(workspace.dataset.hash).then((result) => {
                                console.log(result);
                                if(result.status === 'OK') {
                                    alert('삭제되었습니다.');
                                    $(workspace).parent().remove();
                                } else {

                                }
                            })
                        }
                    } else if (actionClass === '_update') {
                        window.location.href = '/query/workspace/edit/' + workspace.dataset.hash;
                    } else {
                        console.error('wrong type : ' + actionClass);
                    }
                })
            } else {

            }
        });
    });
</script>
</body>
</html>