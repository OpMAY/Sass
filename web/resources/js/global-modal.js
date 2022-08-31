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
    apiChangeMarketingAgree().then((result) => {
        console.log(result.status, result.data);
        if (result.status === 'OK') {
        } else {
        }
    });
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
    apiChangeMarketingAgree().then((result) => {
        console.log(result.status, result.data);
        if (result.status === 'OK') {
        } else {
        }
    });
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
    if ($(this).hasClass('on')) {
        $(this).removeClass('on');
        $(this).addClass('off');
    } else {
        $(this).removeClass('off');
        $(this).addClass('on');
    }
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
            auth: is_checked
        }
        apiChangeTeamGrant(grant).then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
            } else {
            }
        });
    } else {
        console.log('update plug', info);
        const grant = {
            plugin: info.plugin,
            user_no: info.userNo,
            role: info.userRole,
            type,
            auth: is_checked
        }
        apiChangePlugGrant(grant).then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
            } else {
            }
        });
    }
});

$('.nav-item._remove span').on('click', function () {
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
            user_no: info.userNo,
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
                user_no: info.userNo,
                role: info.userRole,
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
                let r = result.data.result;
                if (r !== null) {
                    // 로그인 완료
                    if (r.login_status === 1) {
                        // 회사 선택 승인 대기중
                        alert('기업 멤버 승인 대기 중');
                    } else if (r.login_status === 2) {
                        // 회사 선택 반려됨
                        alert('기업 멤버 요청이 반려됨');
                        $('#corporation-type-modal').modal('show');
                    } else if (r.login_status === 3) {
                        // 회사 선택 필요
                        alert('기업 선택 안함');
                        $('#corporation-type-modal').modal('show');
                    } else {
                        // 로그인 완료
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
        apiFindPassword($this_modal.find('input').val()).then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
                apiSendCode().then((result) => {
                    console.log(result.status, result.data);
                    if (result.status === 'OK') {
                        let $validate_modal = $('#password-validate-modal');
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
        apiConfirmCode().then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
                let $password_change_modal = $('#password-change-modal');
                $password_change_modal.modal('show');
            } else {
            }
        });
    });
    $('[data-action="change-password"]').on('click', function () {
        apiChangePassword().then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
                $('#login-modal').modal('show');
            } else {
            }
        });
    });
    $('[data-action="change-name"]').on('click', function () {
        apiChangeName().then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
                let $change_name_modal = $('#name-change-modal');
                let $change_name_element = $('[data-update="name"]');
                $change_name_element.html(`${result.data.name}`);
                $change_name_modal.modal('hide');
            } else {
            }
        });
    });

    $('[data-action="change-email"]').on('click', function () {
        apiChangeEmail().then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
                let $change_email_modal = $('#email-change-modal');
                let $change_email_element = $('[data-update="email"]');
                $change_email_element.html(`${result.data.email}`);
                $change_email_modal.modal('hide');
            } else {
            }
        });
    });
    $('[data-action="change-phone"]').on('click', function () {
        apiChangePhone().then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
                let $change_phone_modal = $('#phone-change-modal');
                let $change_phone_element = $('[data-update="phone"]');
                $change_phone_element.html(`${result.data.phone}`);
                $change_phone_modal.modal('hide');
            } else {
            }
        });
    });
    $('[data-action="withdrawal"]').on('click', function () {
        apiChangeWithdrawal().then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
            } else {
            }
        });
    });
});