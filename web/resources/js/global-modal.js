/**
 * register Modal checkbox listener
 * **/
$('#agree-all').on('change', function () {
    const status = $(this).is(':checked');
    $('._agree').find('[data-type=checkbox]:not(#agree-all)').prop('checked', status);
    listenRegisterModalValid();
})

$('#register-modal input[data-required=true]').on('input', function () {
    listenRegisterModalValid()
})

$('[data-type=phone]').on('input', function () {
    $(this).val(phoneNumFormatter($(this).val()));
})

function listenRegisterModalValid() {
    const inputs = $('#register-modal').find('input[data-required=true]');
    let valid = true;
    const eRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const pRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
    inputs.each((i, e) => {
        switch (e.dataset.type) {
            case 'name' :
                valid = valid && $(e).val().length >= 3;
                break;
            case 'phone' :
                valid = valid && pRegex.test($(e).val());
                break;
            case 'email' :
                valid = valid && eRegex.test($(e).val());
                break;
            case 'password' :
                valid = valid && passwordValidation($(e).val(), 0, false);
                break;
            case 'checkbox' :
                valid = valid && $(e).is(':checked');
                break;
            default:
                valid = false;
                break;
        }
    })
    if (valid) {
        $('[data-action=register]').removeClass('is-disabled').removeAttr('disabled');
    } else {
        $('[data-action=register]').addClass('is-disabled').attr('disabled', 'disabled');
    }
}

$('#register-modal').on('show.bs.modal', function () {
    listenRegisterModalValid();
}).on('hide.bs.modal', function () {
    $(this).find('input[type=text]').val('');
    $(this).find('input[type=checkbox]').prop('checked', false);
    $(this).find('input[type=password]').val('');
    $(this).find('input[type=email]').val('');
})

$('#login-modal').on('hide.bs.modal', function () {
    $(this).find('input').val('');
})

/**
 * login modal input listener
 * **/
$('#login-modal input').on('keypress', function (e) {
    if (e.keyCode === 13) {
        $('[data-action=login]').click();
    }
});

/**
 * email find modal input listener
 * **/
$('#phone-number-input').on('input', function (e) {
    $(this).val(phoneNumFormatter($(this).val()));
    let $button = $(this).parent().next().find(':first-child');
    // TODO add Phone number validation function
    const pRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
    console.log($(this).val());
    if (pRegex.test($(this).val())) {
        if ($button.hasClass('is-disabled')) {
            $button.removeClass('is-disabled').removeAttr('disabled');
        }
    } else {
        if (!$button.hasClass('is-disabled')) {
            $button.addClass('is-disabled').attr('disabled', true);
        }
    }
});

$('#find-email-modal').on('hide.bs.modal', function () {
    $(this).find('input').val('');
})
/**
 * Password find modal input listener
 * **/
$('#email-input').on('input', function (e) {
    let $button = $(this).parent().next().find(':first-child');
    // TODO add email validation function
    const eRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (eRegex.test($(this).val())) {
        if ($button.hasClass('is-disabled')) {
            $button.removeClass('is-disabled').removeAttr('disabled');
        }
    } else {
        if (!$button.hasClass('is-disabled')) {
            $button.addClass('is-disabled').attr('disabled', true);
        }
    }
});

$('#find-password-modal').on('hide.bs.modal', function () {
    $(this).find('input').val('');
})

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
        if (time <= 60) {
            $element.css('color', 'red');
        }
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
    let $button = $(this).parent().next().find(':first-child');
    if ($(this).val().trim().length > 2) {
        if ($button.hasClass('is-disabled')) {
            $button.removeClass('is-disabled').removeAttr('disabled');
        }
    } else {
        if (!$button.hasClass('is-disabled')) {
            $button.addClass('is-disabled').attr('disabled', true);
        }
    }
});

$('#corporation-create-modal').find('._buttons button:first-child').on('click', function () {
    let $this_modal = $('#corporation-create-modal');
    apiCreateCorporate($('#corporation-create-name').val()).then((result) => {
        console.log(result.data, result.status);
        if (result.status === 'OK') {
            let r = result.data.result;
            if (r === null) {
                alert('로그인 세션이 만료되었습니다.\n다시 로그인해주세요.');
                window.location.reload();
            } else {
                if (r === -1) {
                    alert('기업 이름이 이미 존재합니다');
                } else if (r === -2) {
                    alert('이미 사용중인 사업자 등록번호입니다.');
                } else {
                    alert('생성 완료');
                    $this_modal.modal('hide');
                }
            }
        } else {
            alert('서버 에러, error : ' + result.status);
        }
    })
})

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

$('#corporation-find-modal').find('._buttons button:first-child').on('click', function () {
    let $this_modal = $('#corporation-find-modal');
    apiFindCorporate($this_modal.find('input').val()).then((result) => {
        if (result.status === 'OK') {
            let company = result.data.company;
            let $next_modal = $('#corporation-select-modal');
            $next_modal.find('input').val(company.name).data('c_id', company.no);
            $this_modal.modal('hide');
            $next_modal.modal('show');
        } else {
            alert('ID와 일치하는 기업이 존재하지 않습니다.');
        }
    })
})

$('#corporation-select-modal').find('._buttons button:first-child').on('click', function () {
    let $this_modal = $('#corporation-select-modal');
    apiJoinCorporate($this_modal.find('input').data().c_id).then((result) => {
        if (result.status === 'OK') {
            if (result.data.result) {
                alert('기업 팀원 참여 요청되었습니다.');
                $this_modal.modal('hide');
            } else {
                alert('로그인 세션이 만료되었습니다.\n다시 로그인해주세요.');
                window.location.reload();
            }
        } else {
            alert('기업 팀원 참여 요청할 수 없습니다. error : ' + result.status);
        }
    })
})

/** Setting modal open listener **/
$('#setting-modal').on('show.bs.modal', function () {
    let $this_modal = $(this);
    $this_modal.find('.nav-item:first-child button').click();
    // TODO login 세션 없을 시 모달 open 막기
    apiCallMyInfo().then((result) => {
        let data = result.data.u;
        setMyInfoModalData(data);
    })
})

$('#setting-modal button[data-toggle=tab]').on('show.bs.tab', function (event) {
    let $target_tab = $($(this).data().target);
    switch ($target_tab.attr('id')) {
        case 'myInfo':
            apiCallMyInfo().then((result) => {
                if (result.status === 'OK') {
                    let data = result.data.u;
                    setMyInfoModalData(data);
                } else {
                    alert('오류');
                    event.preventDefault();
                }
            })
            break;
        case 'teammates':
            apiCallMyCorpInfo().then((result) => {
                if (result.status === 'OK') {
                    console.log(result.status, result.data);
                    let c_data = result.data.company;
                    let m_data = result.data.members;
                    let $corp_tab = $('#teammates .tab-content');
                    let $member_list_group = $corp_tab.find('._item-group');
                    $corp_tab.find('[data-company-id]').html(c_data.company_id);
                    $corp_tab.find('[data-company-owner]').html(m_data[0].name + '(' + m_data[0].email + ')');
                    $member_list_group.children().remove();
                    m_data.forEach((e, i) => {
                        console.log(e)
                        $member_list_group.append(`<ul class="nav nav-tabs _items"
                                        role="tablist" data-type="TEAM" data-user-no="${e.user_no}" data-user-role="${e.role.name}" data-user-email="${e.email}">
                                        <li class="nav-item light-h6 _name"
                                            role="presentation">
                                            ${e.name}
                                        </li>
                                        <li class="nav-item light-h6 _email"
                                            role="menuitem">
                                            <span title="asszxc@naver.com">${e.email}</span>
                                        </li>
                                        <li class="nav-item light-h6 _role"
                                            role="presentation">
                                            ${e.role.keyword}
                                        </li>
                                        <li class="nav-item light-h6 _read"
                                            role="presentation">
                                            <span class="_check ${e.read_auth ? 'on' : 'off'}" data-type="READ" data-toggle="auth-switch"></span>
                                        </li>
                                        <li class="nav-item light-h6 _edit"
                                            role="presentation">
                                            <span class="_check ${e.edit_auth ? 'on' : 'off'}" data-type="EDIT" data-toggle="auth-switch"></span>
                                        </li>
                                        <li class="nav-item medium-h4 _remove"
                                        role="presentation">
                                        ${i !== 0 && result.data.userRole.name === 'OWNER' ? '<span>&times;</span>' : ''}
                                        </li>
                                    </ul>`);
                    })
                } else {
                    alert('오류');
                    event.preventDefault();
                }
            })
            break;
        case 'plugin-manage':
            apiCallMyCorpPlugInfo().then((result) => {
                if (result.status === 'OK') {
                    console.log(result.data);
                    let list = $target_tab.find('._plugin-list');
                    list.children('._plugin-list-container').remove();
                    let d_list = result.data.plugins;
                    d_list.forEach((e, i) => {
                        let targetDiv = `<div class="_plugin-list-container col-12 px-0">
                                    <div class="_plugin-manage-container media">
                                        <div class="_plugin-manage-info media">
                                            <img src="../../resources/assets/images/sample/plugin-sample-1.png"
                                                 width="48" height="48"
                                                 class="align-self-start mr-20" alt>
                                            <div class="_media-title media-body d-block">
                                                <h5 class="medium-h6 mb-8">${e.title}</h5>
                                                <p class="_desc regular-h6 c-gray-medium text-ellipsis">${e.desc}</p>
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
                                        <div class="_item-group">`;
                        e.teammates.forEach((te, ti) => {
                            targetDiv = targetDiv + `<ul class="nav nav-tabs _items"
                                                role="tablist" data-plugin="${e.type}" data-type="PLUG" data-member-no="${te.member_no}" data-user-role="${te.role.name}" data-user-email="${te.email}">
                                                <li class="nav-item light-h6 _name"
                                                    role="presentation">
                                                    ${te.name}
                                                </li>
                                                <li class="nav-item light-h6 _email"
                                                    role="menuitem">
                                                    <span title="${te.email}">${te.email}</span>
                                                </li>
                                                <li class="nav-item light-h6 _role"
                                                    role="presentation">
                                                    ${te.role.keyword}
                                                </li>
                                                <li class="nav-item light-h6 _read"
                                                    role="presentation">
                                                    <span class="_check ${te.read_auth ? 'on' : 'off'}" data-type="READ" data-toggle="auth-switch"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check ${te.edit_auth ? 'on' : 'off'}" data-type="EDIT" data-toggle="auth-switch"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _remove"
                                                    role="presentation">
                                                    ${result.data.userRole.keyword === '관리자' ? '<span>&times;</span>' : ''}
                                                </li>
                                            </ul>`;
                        })
                        targetDiv = targetDiv + `</div>
                                        <div class="_control-panel">
                                            <h5 class="_setting medium-h6">환경 설정</h5>
                                            <h5 class="_add-new medium-h6 c-brand-purple" data-plug-no="${e.plug_no}" data-company-no="${e.company_no}">팀원 추가하기 +</h5>
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
                                        </div>
                                    </div>
                                </div>
                                            `;
                        list.append(targetDiv);
                    })
                } else {
                    alert('오류');
                    event.preventDefault();
                }
            })
            break;
        default:
            alert('nope');
    }
})

function setMyInfoModalData(data) {
    $('[data-update="name"]').html(data.name);
    $('#profileImg').attr('src', data.profile_img.url);
    $('[data-update="email"]').html(data.email);
    $('[data-update="phone"]').html(data.phone);
    let agreeTarget;
    if (data.marketing_agree) {
        agreeTarget = $('#agree-checkbox');
        if (!agreeTarget.is(':checked')) {
            agreeTarget.prop('checked', true);
            $('#disagree-checkbox').prop('checked', false);
        }
    } else {
        agreeTarget = $('#disagree-checkbox');
        if (!agreeTarget.is(':checked')) {
            agreeTarget.prop('checked', true);
            $('#agree-checkbox').prop('checked', false);
        }
    }
    $('#withdrawal-password-input').val('');
}

/**
 * Setting modal myInfo Listener
 * **/
$('#agree-checkbox').on('change', function () {
    let $disagreeCheckbox = $('#disagree-checkbox');
    // Change other checkbox
    if ($disagreeCheckbox.is(':checked')) {
        console.log('checked');
        $disagreeCheckbox.prop('checked', false);
        apiChangeMarketingAgree(true).then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
            } else {
                alert('로그인 세션이 만료되었습니다.\n다시 로그인해주세요.');
                window.location.reload();
            }
        });
    }

    // Block checked remove on toggle twice
    if (!$(this).is(':checked')) {
        $(this).prop('checked', true);
    }

});

$('#disagree-checkbox').on('change', function () {
    let $agreeCheckbox = $('#agree-checkbox');
    // Change other checkbox
    if ($agreeCheckbox.is(':checked')) {
        console.log('checked');
        $agreeCheckbox.prop('checked', false);
        apiChangeMarketingAgree(false).then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
            } else {
                alert('로그인 세션이 만료되었습니다.\n다시 로그인해주세요.');
                window.location.reload();
            }
        });
    }

    // Block checked remove on toggle twice
    if (!$(this).is(':checked')) {
        $(this).prop('checked', true);
    }

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
    if ($(this)[0].files && $(this)[0].files[0]) {
        reader.onload = (e) => {
            $('#profileImg').attr('src', e.target.result);
        }
        reader.onloadend = (e) => {
            apiChangeProfile($(this)[0].files[0]).then((result) => {
                console.log(result.status, result.data);
                if (result.status === 'OK') {
                    $('#setting-modal #profileImg').attr('src', result.data.file.url);
                } else {
                }
            });
        }
        reader.readAsDataURL($(this)[0].files[0]);
    }
})

$('#name-change-input').on('input', function () {
    // TODO input validation & fetch
    let $button = $(this).parent().next().find('button:first-child');
    if ($(this).val().trim().length >= 2 && $(this).val().trim().length <= 20) {
        $button.removeClass('is-disabled').removeAttr('disabled');
    } else {
        $button.addClass('is-disabled').attr('disabled', 'disabled');
    }
})

$('#email-change-input').on('input', function () {
    // TODO input validation & fetch
    let $button = $(this).parent().next().find('button:first-child');
    const eRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (eRegex.test($(this).val())) {
        $button.removeClass('is-disabled').removeAttr('disabled');
    } else {
        $button.addClass('is-disabled').attr('disabled', 'disabled');
    }
})

$('#phone-change-input').on('input', function () {
    // TODO input validation & fetch
    let $button = $(this).parent().next().find('button:first-child');
    const pRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
    if (pRegex.test($(this).val())) {
        $button.removeClass('is-disabled').removeAttr('disabled');
    } else {
        $button.addClass('is-disabled').attr('disabled', 'disabled');
    }
})

$('#name-change-modal').on('hide.bs.modal', function () {
    $(this).find('input').val('');
    $(this).find('button:first-child').addClass('is-disabled').attr('disabled', 'disabled');
})

$('#email-change-modal').on('hide.bs.modal', function () {
    $(this).find('input').val('');
    $(this).find('button:first-child').addClass('is-disabled').attr('disabled', 'disabled');
})

$('#phone-change-modal').on('hide.bs.modal', function () {
    $(this).find('input').val('');
    $(this).find('button:first-child').addClass('is-disabled').attr('disabled', 'disabled');
})

/**
 * Setting modal teammate info check button
 * **/
$('.check-button-content').on('click', '._check[data-toggle=auth-switch]', function () {
    // TODO FETCH status change
    console.log($(this))
    let $check = $(this);
    let info = this.closest('._items').dataset;
    let type = this.dataset.type;
    let is_checked = this.classList.contains('on');
    console.log(info, type, is_checked);
    if (info.type === 'TEAM') {
        console.log('update team', info);
        const grant = {
            user_no: info.userNo,
            role: info.userRole,
            type,
            auth: !is_checked
        }
        apiChangeTeamGrant(grant).then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
                changeCheckElementStatus($check, type);
            } else {
            }
        });
    } else {
        console.log('update plug', info);
        const grant = {
            plugin: info.plugin,
            member_no: info.memberNo,
            role: info.userRole,
            type,
            auth: !is_checked
        }
        apiChangePlugGrant(grant).then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
                changeCheckElementStatus($check, type);
            } else {
            }
        });
    }
});

function changeCheckElementStatus($check, type) {
    /**
     * Read off 시 -> write off
     * Write On 시 -> read on
     * **/
    if(type === 'READ') {
        if ($check.hasClass('on')) {
            $check.removeClass('on');
            $check.addClass('off');
            let $editCheck = $check.parent().next().find('._check');
            if($editCheck.hasClass('on')) {
                $editCheck.removeClass('on');
                $editCheck.addClass('off');
            }
        } else {
            $check.removeClass('off');
            $check.addClass('on');
        }
    } else {
        if ($check.hasClass('on')) {
            $check.removeClass('on');
            $check.addClass('off');
        } else {
            $check.removeClass('off');
            $check.addClass('on');
            let $readCheck = $check.parent().prev().find('._check');
            if($readCheck.hasClass('off')) {
                $readCheck.removeClass('off');
                $readCheck.addClass('on');
            }
        }
    }
}

$('.check-button-content').on('click', '.nav-item._remove span', function () {
    // TODO FETCH remove teammate
    let info = this.closest('._items').dataset;
    if (info.type === 'TEAM') {
        console.log('delete team', info);
        const grant = {
            user_no: info.userNo,
            role: info.userRole,
        }
        apiDeleteTeamGrant(grant).then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
                this.closest('._items').remove();
            } else {
            }
        });
    } else {
        console.log('delete plug', info);
        const grant = {
            plugin: info.plugin,
            member_no: info.memberNo,
            role: info.userRole,
        }
        apiDeletePlugGrant(grant).then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
                this.closest('._items').remove();
            } else {
            }
        });
    }
});

let $plugin_list = $('._plugin-list');

$plugin_list.on('click', '._select ._check', function () {
    if ($(this).hasClass('on')) {
        $(this).removeClass('on');
        $(this).addClass('off');
    } else {
        $(this).removeClass('off');
        $(this).addClass('on');
    }
})


$plugin_list.on('click', '._plugin-manage-button', function (e) {
    // TODO CLOSED -> hidden  로 변경
    if (!$(this).hasClass('closed') && $(this).parent().next().hasClass('show') && !$(this).hasClass('blocked')) {
        $(this).addClass('closed');
        $(this).parent().removeClass('open');
        $(this).parent().next().collapse('hide');
        e.stopPropagation();
    }
});

$plugin_list.on('click', '._plugin-manage-container', function () {
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

$plugin_list.on('click', '._control-panel ._setting', function () {
    alert('환경설정으로 이동');
})

$plugin_list.on('click', '._control-panel ._add-new', function () {
    let dataset = this.dataset;
    apiCallPlugNotAssociatedMembers(dataset.companyNo, dataset.plugNo).then((result) => {
        console.log(result);
        if(result.status === 'OK') {
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
            let $new_member_tab = thisTab.find('._plugin-add-member-container')
            $new_member_tab.removeClass('d-none');
            let list_group = $new_member_tab.find('._item-group');
            list_group.children().remove();
            result.data.members.forEach((e, i) => {
                list_group.append(`<ul class="nav nav-tabs _items"
                                                role="tablist" data-plugin="${result.data.plugin_type}" data-plug-no="${dataset.plugNo}" data-type="PLUG" data-member-no="${e.member_no}" data-user-role="${e.role.name}" data-user-email="${e.email}">
                                                <li class="nav-item light-h6 _name"
                                                    role="presentation">
                                                    ${e.name}
                                                </li>
                                                <li class="nav-item light-h6 _email"
                                                    role="menuitem">
                                                    <span title="${e.email}">${e.email}</span>
                                                </li>
                                                <li class="nav-item light-h6 _role"
                                                    role="presentation">
                                                    ${e.role.keyword}
                                                </li>
                                                <li class="nav-item light-h6 _read"
                                                    role="presentation">
                                                    <span class="_check ${e.read_auth ? 'on' : 'off'}" data-type="READ"></span>
                                                </li>
                                                <li class="nav-item light-h6 _edit"
                                                    role="presentation">
                                                    <span class="_check ${e.edit_auth ? 'on' : 'off'}" data-type="EDIT"></span>
                                                </li>
                                                <li class="nav-item medium-h4 _select"
                                                    role="presentation">
                                                    <span class="_check off" data-type="READY"></span>
                                                </li>
                                            </ul>`);
            })
        } else {

        }
    })

})

$('[data-action="create-plug"]').on('click', function () {
    // TODO 팀원 추가 AJAX
    let listDiv = this.closest('._plugin-list');
    let containerList = listDiv.querySelectorAll('._plugin-list-container');
    $(this).parent().parent().addClass('d-none');
    let selected_container;
    containerList.forEach((container) => {
        if (!container.querySelector('._plugin-add-member-container').classList.contains('d-none')) {
            selected_container = container.querySelector('._plugin-add-member-container');
        }
        if (container.classList.contains('d-none')) {
            container.classList.remove('d-none');
        } else {
            container.querySelector('._control-panel').classList.remove('d-none');
            container.querySelector('._plugin-manage-child').classList.remove('d-none');
            container.querySelector('._plugin-add-member-container').classList.add('d-none');
        }
    });
    let member_elements = selected_container.querySelectorAll('._item-group ._items');
    member_elements.forEach((member_element) => {
        if (member_element.querySelector('._select ._check.on')) {
            console.log(member_element);
            let info = member_element.dataset;
            const grant = {
                plugin: info.plugin,
                member_no: info.memberNo,
                role: info.userRole,
                plug_no: info.plugNo,
            }
            console.log(info);
            apiAddPlugGrant(grant).then((result) => {
                console.log(result.status, result.data);
                if (result.status === 'OK') {
                    member_element.remove();
                    let append_container = selected_container.closest('._plugin-list-container').querySelector('._plugin-manage-child ._item-group');
                    console.log(append_container);
                    $(append_container).append(`<ul class="nav nav-tabs _items" role="tablist" data-plugin="QUERY" data-type="PLUG" data-user-no="1" data-user-role="PERSONAL" data-user-email="asszxc@naver.com">
                                                    <li class="nav-item light-h6 _name" role="presentation">
                                                        유병준
                                                    </li>
                                                    <li class="nav-item light-h6 _email" role="menuitem">
                                                        <span title="asszxc@naver.com">asszxc@naver.com</span>
                                                    </li>
                                                    <li class="nav-item light-h6 _role" role="presentation">
                                                        팀원
                                                    </li>
                                                    <li class="nav-item light-h6 _read" role="presentation">
                                                        <span class="_check on" data-type="READ"></span>
                                                    </li>
                                                    <li class="nav-item light-h6 _edit" role="presentation">
                                                        <span class="_check off" data-type="EDIT"></span>
                                                    </li>
                                                    <li class="nav-item medium-h4 _remove" role="presentation">
                                                        <span>×</span>
                                                    </li>
                                                </ul>`);
                } else {
                }
            });
        }
    });
});

$('[data-action="cancel-plug"]').on('click', function () {
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
});

$(document).ready(function () {
    $('[data-action="login"]').on('click', function () {
        let modal = $('#login-modal');
        let email = modal.find('input[name=email]').val();
        let password = modal.find('input[name=password]').val();
        // Input Validation
        if (email.length < 10) {
            alert('이메일을 입력하세요.');
            return;
        }
        if (password.length < 8) {
            alert('비밀번호를 입력하세요.')
            return;
        }
        apiLogin(email, password).then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
                let r = result.data.login_status;
                if (r !== null) {
                    // 로그인 완료
                    if (r === 1) {
                        // 회사 선택 승인 대기중
                        alert('기업 멤버 승인 대기 중');
                    } else if (r === 2) {
                        // 회사 선택 반려됨
                        alert('기업 멤버 요청이 반려됨');
                        $('#corporation-type-modal').modal('show');
                    } else if (r === 3) {
                        // 회사 선택 필요
                        alert('기업 선택 안함');
                        $('#corporation-type-modal').modal('show');
                    } else {
                        // 로그인 완료
                        window.location.reload();
                    }
                    $('#login-modal').modal('hide');
                } else {
                    // 로그인 실패
                    alert('이메일 또는 비밀번호가 일치하지 않습니다.');
                }
            } else {
                // 통신 실패
                alert('통신에 오류가 발생했습니다.\nerror: ' + result.status);
            }
        });
    });
    $('[data-action="register"]').on('click', function () {
        apiRegister().then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
                if (result.data.r) {
                    alert('회원가입 완료');
                    $('#register-modal').modal('hide');
                    $('#corporation-type-modal').modal('show');
                } else {
                    alert('이미 등록된 회원입니다.');
                }
            } else {
                // 통신 실패
                alert('통신에 오류가 발생했습니다.\nerror: ' + result.status);
            }
        });
    });
    $('[data-action="find-email"]').on('click', function () {
        let $this_modal = $('#find-email-modal');
        apiFindEmail($this_modal.find('input').val()).then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
                let $result_modal = $('#email-result-modal');
                let $input = $result_modal.find('input[name="email"]');
                // $input.prop('disabled', false);
                $input.val(result.data.email);
                $input.prop('disabled', true);
                $this_modal.modal('hide');
                $result_modal.modal('show');
            } else {
                alert('일치하는 이메일이 없습니다.');
            }
        });
    });
    $('[data-action="find-password"]').on('click', function () {
        let $this_modal = $('#find-password-modal');
        let email = $this_modal.find('input').val();
        apiFindPassword(email).then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
                apiSendCode(email).then((result) => {
                    console.log(result.status, result.data);
                    if (result.status === 'OK') {
                        let $validate_modal = $('#password-validate-modal');
                        $validate_modal.data().email = email;
                        $this_modal.modal('hide');
                        $validate_modal.modal('show');
                    } else {
                        // 통신 실패
                        alert('통신에 오류가 발생했습니다.\nerror: ' + result.status);
                    }
                });
            } else {
                alert('존재하지 않는 이메일입니다.');
            }
        });
    });
    $('[data-action="code-confirm"]').on('click', function () {
        let $this_modal = $('#password-validate-modal');
        apiConfirmCode($this_modal.find('input').val()).then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
                let $password_change_modal = $('#password-change-modal');
                alert('인증이 완료되었습니다.\n비밀번호 변경을 해주시길 바랍니다.');
                $this_modal.modal('hide');
                $password_change_modal.modal('show');
                $password_change_modal.data('email', $this_modal.data().email);
            } else {
                alert('인증 코드가 일치하지 않습니다.');
            }
        });
    });
    $('[data-action="change-password"]').on('click', function () {
        let $this_modal = $('#password-change-modal');
        apiChangePassword($this_modal.data().email, $this_modal.find('#new-password').val()).then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
                alert('변경되었습니다.');
                $this_modal.modal('hide');
                $('#login-modal').modal('show');
            } else {
            }
        });
    });
    $('[data-action="change-name"]').on('click', function () {
        let $name_modal = $('#name-change-modal');
        if (verifyNameSubmit()) {
            apiChangeName($name_modal.find('input').val()).then((result) => {
                console.log(result.status, result.data);
                if (result.status === 'OK') {
                    alert('변경되었습니다.');
                    let $change_name_modal = $('#name-change-modal');
                    let $change_name_element = $('[data-update="name"]');
                    $change_name_element.html(`${result.data.name}`);
                    $change_name_modal.modal('hide');
                } else {
                }
            });
        }
    });

    $('[data-action="change-email"]').on('click', function () {
        let $email_modal = $('#email-change-modal');
        if (verifyMailSubmit()) {
            apiChangeEmail($email_modal.find('input').val()).then((result) => {
                console.log(result.status, result.data);
                if (result.status === 'OK') {
                    if (result.data.result === -1) {
                        alert('이미 다른 회원이 사용 중인 이메일입니다.');
                    } else if (result.data.result === -2) {
                        alert('현재 사용 중인 이메일과 동일합니다.');
                    } else {
                        alert('변경되었습니다.\n변경된 이메일로 다시 로그인해주세요.');
                        window.location.reload();
                    }
                    // let $change_email_modal = $('#email-change-modal');
                    // let $change_email_element = $('[data-update="email"]');
                    // $change_email_element.html(`${result.data.email}`);
                    // $change_email_modal.modal('hide');
                } else {
                }
            });
        }
    });
    $('[data-action="change-phone"]').on('click', function () {
        let $phone_modal = $('#phone-change-modal');
        if (verifyPhoneSubmit()) {
            apiChangePhone($phone_modal.find('input').val()).then((result) => {
                console.log(result.status, result.data);
                if (result.status === 'OK') {
                    if (result.data.result === -1) {
                        alert('이미 다른 회원이 사용 중인 연락처입니다.');
                    } else if (result.data.result === -2) {
                        alert('현재 사용 중인 연락처와 동일합니다.');
                    } else {
                        alert('변경되었습니다.');
                        let $change_phone_modal = $('#phone-change-modal');
                        let $change_phone_element = $('[data-update="phone"]');
                        $change_phone_element.html(`${result.data.phone}`);
                        $change_phone_modal.modal('hide');
                    }
                } else {
                }
            });
        }
    });
    $('[data-action="withdrawal"]').on('click', function () {
        if (confirm('정말 회원 탈퇴하시겠습니까?')) {
            apiChangeWithdrawal($('#withdrawal-password-input').val()).then((result) => {
                console.log(result.status, result.data);
                if (result.status === 'OK') {
                    if (result.data.result === -1) {
                        alert('비밀번호가 일치하지 않습니다.');
                    } else {
                        alert('회원 탈퇴 되었습니다.');
                        window.location.reload();
                    }
                } else {

                }
            });
        }
    });
});