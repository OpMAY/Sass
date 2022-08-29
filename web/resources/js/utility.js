'use strict';
$(document).ready(function() {
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
  let range; let select;
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
