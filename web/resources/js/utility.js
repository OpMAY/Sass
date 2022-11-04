'use strict';
$(document).ready(function () {
    console.log('utility.js execute');
});

/**
 * TokenGenerator,
 * 토큰을 생성해주는 함수
 * @param {number} length 만들려는 토큰의 자릿수
 * @return {String} 자릿수 만큼의 String을 리턴
 * */
const tokenGenerator = ((length = 11) => {
    return Math.random().toString(36).substr(2, length); // "twozs5xfni"
});

const getURLParamByPrevAndNext = (find_first_slash_string, find_last_slash_string) => {
    let path_name = location.pathname;
    return path_name.substring(path_name.indexOf(find_first_slash_string) + (find_first_slash_string.length + 1), path_name.lastIndexOf(find_last_slash_string) - 1);
}

/**
 * GetURLBuilder,
 * base url 에 json object 를 get 요청 url 로 변환해주는 함수
 *
 * @param {string} baseUrl ex) url
 * @param {Object}  object ex) {key: 'value', k: 'v'}
 * @return {string} url?key=value&h&v
 */
function FetchGetURLBuilder(baseUrl, object) {
    let result = baseUrl + '?';
    Object.keys(object).forEach((key) => {
        result += key + '=' + object[key] + '&';
    });
    return result.substring(0, result.length - 1);
}

/**
 * FocusInputLastCarret,
 * Input을 클릭시 생성되는 케럿을 맨 뒤로 이동시켜주는 함수
 *
 * @param {string} id 엘리먼트의 아이디, default = undefined
 * @param {string} selector 엘리먼트의 셀렉터, default = undefined
 * @param {HTMLElement} root 부모 엘리먼트, default = document.getElementsByTagName('body')[0]
 */
function focusInputLastCarret({id = undefined, selector = undefined, root = document.getElementsByTagName('body')[0]}) {
    const inputField = id !== undefined ? root.getElementById(id) : root.querySelector(selector);
    if (inputField != null && inputField.value.length != 0) {
        if (inputField.createTextRange) {
            const FieldRange = inputField.createTextRange();
            FieldRange.moveStart('character', inputField.value.length);
            FieldRange.collapse();
            FieldRange.select();
        } else if (inputField.selectionStart || inputField.selectionStart == '0') {
            const elemLen = inputField.value.length;
            inputField.selectionStart = elemLen;
            inputField.selectionEnd = elemLen;
            inputField.focus();
        }
    } else {
        inputField.focus();
    }
}

/**
 * DeleteChild,
 * 엘리먼트 안에 모든 하위 엘리먼트 제거하는 함수
 *
 * @param {HTMLElement | Node} element 하위 엘리먼트를 제거할 상위 엘리먼트
 * */
const deleteChild = (element) => {
    element.innerHTML = '';
};

function copyText(target, callback) {
    let range;
    let select;
    if (document.createRange) {
        range = document.createRange();
        range.selectNode(target);
        select = window.getSelection();
        select.removeAllRanges();
        select.addRange(range);
        document.execCommand('copy');
        select.removeAllRanges();
    } else {
        range = document.body.createTextRange();
        range.moveToElementText(target);
        range.select();
        document.execCommand('copy');
    }
    callback();
}

const getParameter = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

class Time {

    static formatLocalDatetime(datetime) {
        if (datetime === undefined) return this.get_yyyy_mm_dd();
        try {
            const year = datetime.year;
            const month = datetime.monthValue > 9 ? datetime.monthValue : '0' + datetime.monthValue;
            const day = datetime.dayOfMonth > 9 ? datetime.dayOfMonth : '0' + datetime.dayOfMonth;
            const hour = datetime.hour > 9 ? datetime.hour : '0' + datetime.hour;
            const minute = datetime.minute > 9 ? datetime.minute : '0' + datetime.minute;
            const second = datetime.second > 9 ? datetime.second : '0' + datetime.second;

            return `${year}.${month}.${day} ${hour}:${minute}`;
        } catch (e) {
            console.error(e);
            return '';
        }
    }

    static formatLocalDate(datetime) {
        if (datetime === undefined) return this.get_yyyy_mm_dd();
        try {
            const year = datetime.year;
            const month = datetime.monthValue > 9 ? datetime.monthValue : '0' + datetime.monthValue;
            const day = datetime.dayOfMonth > 9 ? datetime.dayOfMonth : '0' + datetime.dayOfMonth;

            return `${year}.${month}.${day}`;
        } catch (e) {
            console.error(e);
            return '';
        }
    }

    static formatChatDateTime(datetime) {
        if (datetime === undefined || datetime === null) return '방금 전';
        try {
            const time_gap = new Date().getTime() - this.getLocalDateTime(datetime);
            if (time_gap < 1000 * 60) { // 1분 이내
                return Math.floor(time_gap / (1000)) + '초전';
            } else if (time_gap < 1000 * 60 * 60) { // 60분 이내
                return Math.floor(time_gap / (1000 * 60)) + '분 전';
            } else if (time_gap < 1000 * 60 * 60 * 24) { // 24시간 이내
                return Math.floor(time_gap / (1000 * 60 * 60)) + '시간 전';
            } else if (time_gap < 1000 * 60 * 60 * 24 * datetime.dayOfMonth) { //한달 이내
                return Math.floor(time_gap / (1000 * 60 * 60 * 24)) + '일 전';
            } else if (time_gap < 1000 * 60 * 60 * 24 * 365) {
                return Math.floor(time_gap / (1000 * 60 * 60 * 24 * 30)) + '개월 전';
            } else if (time_gap < 1000 * 60 * 60 * 24 * 365 * 10) {
                return Math.floor(time_gap / (1000 * 60 * 60 * 24 * 365)) + '년 전';
            } else {
                return this.formatLocalDate(datetime);
            }
        } catch (e) {
            console.error(e);
            return '';
        }
    }

    static getLocalDateTime(datetime) {
        const year = datetime.year;
        const month = datetime.monthValue - 1;
        const day = datetime.dayOfMonth;
        const hour = datetime.hour;
        const minute = datetime.minute;
        const second = datetime.second;
        return new Date(year, month, day, hour, minute, second).getTime();
    }

    static get_yyyy_mm_dd(target_date) {
        if (!target_date)
            target_date = new Date();
        const [year, month, date] = target_date.toLocaleDateString().replace(/\s/g, '').split('.');
        return `${year}.${month > 9 ? month : '0' + month}.${date > 9 ? date : '0' + date}`;
    }
}

const phoneNumFormatter = (str) => {
    let RegNotNum = /[^0-9]/g;
    let RegPhoneNum = "";
    let DataForm = "";

    // return blank

    if (str === "" || str == null) return "";

    // delete not number
    str = str.replace(RegNotNum, '');

    /* 4자리 이하일 경우 아무런 액션도 취하지 않음. */

    if (str.length < 4) return str;

    if (str.substring(0, 2) === "02" && str.length > 10) {
        /* 지역번호 02일 경우 10자리 이상입력 못하도록 제어함. */
        str = str.substring(0, 10);
    } else {
        /* 그 외의 경우 11자리 이상입력 못하도록 제어함. */
        str = str.substring(0, 11);
    }

    if (str.length > 3 && str.length < 7) {
        if (str.substring(0, 2) === "02") {
            DataForm = "$1-$2";

            RegPhoneNum = /([0-9]{2})([0-9]+)/;

        } else {
            DataForm = "$1-$2";

            RegPhoneNum = /([0-9]{3})([0-9]+)/;
        }
    } else if (str.length === 7) {
        if (str.substring(0, 2) === "02") {
            DataForm = "$1-$2-$3";

            RegPhoneNum = /([0-9]{2})([0-9]{3})([0-9]+)/;
        } else {
            DataForm = "$1-$2";

            RegPhoneNum = /([0-9]{3})([0-9]{4})/;
        }
    } else if (str.length === 9) {
        if (str.substring(0, 2) === "02") {
            DataForm = "$1-$2-$3";

            RegPhoneNum = /([0-9]{2})([0-9]{3})([0-9]+)/;
        } else {
            DataForm = "$1-$2-$3";

            RegPhoneNum = /([0-9]{3})([0-9]{3})([0-9]+)/;
        }
    } else if (str.length === 10) {
        if (str.substring(0, 2) === "02") {
            DataForm = "$1-$2-$3";

            RegPhoneNum = /([0-9]{2})([0-9]{4})([0-9]+)/;
        } else {
            DataForm = "$1-$2-$3";

            RegPhoneNum = /([0-9]{3})([0-9]{3})([0-9]+)/;
        }
    } else if (str.length > 10) {
        if (str.substring(0, 2) === "02") {
            DataForm = "$1-$2-$3";

            RegPhoneNum = /([0-9]{2})([0-9]{4})([0-9]+)/;
        } else {
            DataForm = "$1-$2-$3";

            RegPhoneNum = /([0-9]{3})([0-9]{4})([0-9]+)/;
        }
    } else {
        if (str.substring(0, 2) === "02") {
            DataForm = "$1-$2-$3";

            RegPhoneNum = /([0-9]{2})([0-9]{3})([0-9]+)/;
        } else {
            DataForm = "$1-$2-$3";

            RegPhoneNum = /([0-9]{3})([0-9]{3})([0-9]+)/;
        }
    }

    while (RegPhoneNum.test(str)) {
        str = str.replace(RegPhoneNum, DataForm);
    }

    return str;
}

function downloadFileFromUrl(url, filename) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
        })
        .catch(console.error);
}
