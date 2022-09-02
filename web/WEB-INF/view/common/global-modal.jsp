<%--
  Created by IntelliJ IDEA.
  User: zlzld
  Date: 2022-08-29
  Time: 오후 6:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
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
                           placeholder="이름" data-required="true" data-type="name"
                           class="form-control form-general regular-h5 p-16 mb-20">
                    <input type="text"
                           placeholder="연락처" data-required="true" data-type="phone"
                           class="form-control form-general regular-h5 p-16 mb-20">
                    <input type="email"
                           placeholder="이메일" data-required="true" data-type="email"
                           class="form-control form-general regular-h5 p-16 mb-20">
                    <input type="password"
                           placeholder="비밀번호" data-required="true" data-type="password"
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
                                       data-required="true"
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
                                       data-required="true"
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
                                       data-required="true"
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
                                       data-required="false"
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
                    <button type="button" data-action="register" class="btn btn-block btn-gray-dark-low is-disabled" disabled>회원가입</button>
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
                           name="email"
                           class="form-control form-general regular-h5 p-16 mb-20">
                    <input type="password"
                           placeholder="비밀번호"
                           name="password"
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
                    <button type="button" data-action="login" class="btn btn-block btn-gray-dark-low">로그인</button>
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
                    <button type="button" data-action="find-email" class="btn btn-block btn-gray-dark-low is-disabled mb-28" disabled>아이디 조회
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
                           name="email"
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
                    <button type="button" data-action="find-password" class="btn btn-block btn-gray-dark-low is-disabled mb-28">인증코드 전송</button>
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
                               name="code"
                               class="form-control form-general regular-h5 p-16">
                        <p id="time-decrease" class="bold-h5 c-gray-dark-low">06:00</p>
                    </div>
                </div>
                <div class="_go-register mb-24 d-flex justify-content-between">
                    <h5 class="medium-h5 ml-8">인증코드가 오지 않았나요?</h5>
                    <a href="#" class="ml-8"><h5 class="medium-h5">인증코드 전송</h5></a>
                </div>
                <div class="_buttons mb-36">
                    <button type="button" data-action="code-confirm" class="btn btn-block btn-gray-dark-low mb-28">인증코드 확인</button>
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
                    <button type="button" data-action="change-password" class="btn btn-block btn-gray-dark-low is-disabled mb-28">비밀번호 변경</button>
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
                                id="myInfo-tab"
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
                                    <h5 class="medium-h3 c-gray-dark-low mb-1" data-update="name">유병준</h5>
                                    <h5 class="regular-h6 c-brand-purple _profile-change" data-type="name">변경</h5>
                                </div>
                                <div class="_profile col-6">
                                    <h5 class="regular-h6 c-gray-medium mb-12">프로필 이미지</h5>
                                    <img id="profileImg"
                                         src="../../resources/assets/images/sample/user_basic_profile.png" alt>
                                    <img class="_pencil"
                                         src="../../resources/assets/images/sample/profile_edit_pencil.png" alt>
                                    <input type="file" id="profileInput" class="d-none" accept="image/*">
                                </div>
                            </div>
                            <div class="row mb-44">
                                <div class="_email col-6">
                                    <h5 class="regular-h6 c-gray-medium mb-12">이메일</h5>
                                    <h5 class="medium-h3 c-gray-dark-low mb-1" data-update="email">asszxc@naver.com</h5>
                                    <h5 class="regular-h6 c-brand-purple _profile-change" data-type="email">변경</h5>
                                </div>
                            </div>
                            <div class="row mb-44">
                                <div class="_phone col-6">
                                    <h5 class="regular-h6 c-gray-medium mb-12">연락처</h5>
                                    <h5 class="medium-h3 c-gray-dark-low mb-1" data-update="phone">010-9431-1977</h5>
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
                                                   placeholder="비밀번호" id="withdrawal-password-input"
                                                   class="form-control form-general regular-h5 p-16">
                                        </div>
                                        <div class="col-3">
                                            <button type="button"
                                                    class="btn btn-block btn-gray-dark-low" data-action="withdrawal">회원 탈퇴
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
                        <div class="tab-content check-button-content">
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
                                    <h5 class="medium-h3 c-brand-purple" data-company-id="2Y23dy">2Y23dy</h5>
                                </div>
                            </div>
                            <div class="_corp-info row mb-40">
                                <div class="_title col-2">
                                    <h5 class="regular-h6 c-gray-medium">관리자</h5>
                                </div>
                                <div class="_item col-10">
                                    <h5 class="regular-h6 c-gray-dark-low" data-company-owner="유병준" data-compnay-owner-email="asszxc@naver.com">유병준(asszxc@naver.com)</h5>
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
                                        role="tablist" data-type="TEAM" data-user-no="1" data-user-role="OWNER" data-user-email="asszxc@naver.com">
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
                                            <span class="_check on" data-type="READ"></span>
                                        </li>
                                        <li class="nav-item light-h6 _edit"
                                            role="presentation">
                                            <span class="_check on" data-type="EDIT"></span>
                                        </li>
                                        <li class="nav-item medium-h4 _remove"
                                            role="presentation">

                                        </li>
                                    </ul>
                                    <ul class="nav nav-tabs _items" data-type="TEAM" data-user-no="2" data-user-role="PERSONAL" data-user-email="zlzldntlr@naver.com"
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
                                            <span class="_check on" data-type="READ"></span>
                                        </li>
                                        <li class="nav-item light-h6 _edit"
                                            role="presentation">
                                            <span class="_check on" data-type="EDIT"></span>
                                        </li>
                                        <li class="nav-item medium-h4 _remove"
                                            role="presentation">
                                            <span>&times;</span>
                                        </li>
                                    </ul>
                                    <ul class="nav nav-tabs _items" data-type="TEAM" data-user-no="3" data-user-role="PERSONAL" data-user-email="kevin8622@naver.com"
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
                                            <span class="_check on" data-type="READ"></span>
                                        </li>
                                        <li class="nav-item light-h6 _edit"
                                            role="presentation">
                                            <span class="_check off" data-type="EDIT"></span>
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
                        <div class="tab-content full-width-tab position-relative check-button-content">
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
                                                role="tablist" data-plugin="QUERY" data-type="PLUG" data-user-no="1" data-user-role="OWNER" data-user-email="asszxc@naver.com">
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
                                                    <span class="_check on" data-type="READ"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check on" data-type="EDIT"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _remove"
                                                    role="presentation">
                                                </li>
                                            </ul>
                                            <ul class="nav nav-tabs _items"
                                                role="tablist" data-plugin="QUERY" data-type="PLUG" data-user-no="1" data-user-role="PERSONAL" data-user-email="asszxc@naver.com">
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
                                                    <span class="_check on" data-type="READ"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check on" data-type="EDIT"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _remove"
                                                    role="presentation">
                                                    <span>&times;</span>
                                                </li>
                                            </ul>
                                            <ul class="nav nav-tabs _items"
                                                role="tablist" data-plugin="QUERY" data-type="PLUG" data-user-no="1" data-user-role="PERSONAL" data-user-email="asszxc@naver.com">
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
                                                    <span class="_check on" data-type="READ"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check off" data-type="EDIT"></span>
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
                                                role="tablist" data-plugin="QUERY" data-type="PLUG" data-user-no="1" data-user-role="PERSONAL" data-user-email="asszxc@naver.com">
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
                                                    <span class="_check on" data-type="READ"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check on" data-type="EDIT"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _select"
                                                    role="presentation">
                                                    <span class="_check off" data-type="READY"></span>
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
                                                role="tablist" data-plugin="CRM" data-type="PLUG" data-user-no="1" data-user-role="OWNER" data-user-email="asszxc@naver.com">
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
                                                    <span class="_check on" data-type="READ"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check on" data-type="EDIT"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _remove"
                                                    role="presentation">
                                                </li>
                                            </ul>
                                            <ul class="nav nav-tabs _items"
                                                role="tablist" data-plugin="CRM" data-type="PLUG" data-user-no="1" data-user-role="PERSONAL" data-user-email="asszxc@naver.com">
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
                                                    <span class="_check on" data-type="READ"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check on" data-type="EDIT"></span>
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
                                                role="tablist" data-plugin="CRM" data-type="PLUG" data-user-no="1" data-user-role="PERSONAL" data-user-email="asszxc@naver.com">
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
                                                    <span class="_check on" data-type="READ"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check on" data-type="EDIT"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _select"
                                                    role="presentation">
                                                    <span class="_check off" data-type="READY"></span>
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
                                                role="tablist" data-plugin="CHAT" data-type="PLUG" data-user-no="1" data-user-role="OWNER" data-user-email="asszxc@naver.com">
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
                                                    <span class="_check on" data-type="READ"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check on" data-type="EDIT"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _remove"
                                                    role="presentation">
                                                </li>
                                            </ul>
                                            <ul class="nav nav-tabs _items"
                                                role="tablist" data-plugin="CHAT" data-type="PLUG" data-user-no="1" data-user-role="PERSONAL" data-user-email="asszxc@naver.com">
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
                                                    <span class="_check on" data-type="READ"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check on" data-type="EDIT"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _remove"
                                                    role="presentation">
                                                    <span>&times;</span>
                                                </li>
                                            </ul>
                                            <ul class="nav nav-tabs _items"
                                                role="tablist" data-plugin="CHAT" data-type="PLUG" data-user-no="1" data-user-role="PERSONAL" data-user-email="asszxc@naver.com">
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
                                                    <span class="_check on" data-type="READ"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check off" data-type="EDIT"></span>
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
                                                role="tablist" data-plugin="CHAT" data-type="PLUG" data-user-no="1" data-user-role="PERSONAL" data-user-email="asszxc@naver.com">
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
                                                    <span class="_check on" data-type="READ"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check on" data-type="EDIT"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _select"
                                                    role="presentation">
                                                    <span class="_check off" data-type="READY"></span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="_plugin-teammate-add-button d-none row mx-0">
                                    <div class="col-12 px-5">
                                        <button type="button"
                                                class="btn btn-block btn-gray-dark-low" data-action="create-plug">추가하기
                                        </button>
                                        <button type="button" class="btn btn-block btn-transparent c-brand-purple" data-action="cancel-plug">취소
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
                    <button type="button" data-action="change-name" class="btn btn-block btn-gray-dark-low is-disabled mb-28" disabled>수정 완료
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
                    <button type="button" data-action="change-email" class="btn btn-block btn-gray-dark-low is-disabled mb-28" disabled>수정 완료
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
                    <button type="button" data-action="change-phone" class="btn btn-block btn-gray-dark-low is-disabled mb-28" disabled>수정 완료
                    </button>
                    <button type="button" class="btn btn-block btn-transparent c-brand-purple" data-dismiss="modal">취소
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>