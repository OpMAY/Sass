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
    if ($(this)[0].files && $(this)[0].files[0]) {
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
});

$(document).ready(function () {
    $('[data-action="login"]').on('click', function () {
        apiLogin().then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
            } else {
            }
            $('#login-modal').modal('hide');
        });
    });
    $('[data-action="register"]').on('click', function () {
        apiRegister().then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
            } else {
            }
            $('#register-modal').modal('hide');
        });
    });
    $('[data-action="find-email"]').on('click', function () {
        apiFindEmail().then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
                let $result_modal = $('#email-result-modal');
                let $input = $result_modal.find('input[name="email"]');
                $input.prop('disabled', false);
                $input.val('zlzldntlr@naver.com');
                $input.prop('disabled', true);
                $result_modal.modal('show');
            } else {
            }
        });
    });
    $('[data-action="find-password"]').on('click', function () {
        apiFindPassword().then((result) => {
            console.log(result.status, result.data);
            if (result.status === 'OK') {
                apiSendCode().then((result) => {
                    console.log(result.status, result.data);
                    if (result.status === 'OK') {
                        let code = result.data.code;
                        let $validate_modal = $('#password-validate-modal');
                        $validate_modal.modal('show');
                    } else {
                    }
                });
            } else {
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
});