/**
 * Global Variable
 * */
let RIGHT_THREAD_CONTAINER;
let RIGHT_THREAD_SCROLL_CONTAINER;
let RIGHT_MAIN_THREAD_CONTAINER;
let RIGHT_SUB_THREADS_CONTAINER;
let RIGHT_SEND_CONTAINER;
let RIGHT_THREAD_WEBSOCKET;

/**
 * Thread Initialize
 * */
const initializeRightThread = (is_picker_on = true, websocket) => {
    if (!RIGHT_THREAD_WEBSOCKET) {
        RIGHT_THREAD_WEBSOCKET = websocket;
        console.log('RIGHT_THREAD_WEBSOCKET', RIGHT_THREAD_WEBSOCKET);
    }
    if (!RIGHT_THREAD_CONTAINER) {
        RIGHT_THREAD_CONTAINER = document.querySelector('#chat-right-side');
        /**
         * 쓰레드 뒤로가기 버튼 이벤트 등록
         * */
        RIGHT_THREAD_CONTAINER.querySelector('._back').addEventListener('click', rightThreadBackClickEventListener);
    }

    if (!RIGHT_THREAD_SCROLL_CONTAINER) {
        RIGHT_THREAD_SCROLL_CONTAINER = document.querySelector('#chat-right-side ._body');
    }
    if (!RIGHT_MAIN_THREAD_CONTAINER) {
        RIGHT_MAIN_THREAD_CONTAINER = document.querySelector('#chat-right-side ._main_thread');
    }

    if (!RIGHT_SUB_THREADS_CONTAINER) {
        RIGHT_SUB_THREADS_CONTAINER = document.querySelector('#chat-right-side ._sub_threads');
    }

    if (!RIGHT_SEND_CONTAINER) {
        RIGHT_SEND_CONTAINER = document.querySelector('#chat-right-side ._send-container');
        /**
         * 이모티콘 설정
         * */
        if (is_picker_on) {
            new EmojiPicker({
                trigger: [
                    {
                        selector: '#control-emoji-button',
                        insertInto: '.__thread ._chat-input', // '.selector' can be used without array
                        clear: false
                    }, {
                        selector: '#control-emoji-button',
                        insertInto: '.__chat ._chat-input', // '.selector' can be used without array
                        clear: false
                    },
                ],
                closeButton: true,
            });
        } else {
            new EmojiPicker({
                trigger: [
                    {
                        selector: '#control-emoji-button',
                        insertInto: '.__thread ._chat-input', // '.selector' can be used without array
                        clear: false
                    },
                ],
                closeButton: true,
            });
        }

        /**
         * 에디터의 글 수정 이벤트 등록
         * */
        let edit_buttons = RIGHT_SEND_CONTAINER.querySelector('._edit-panel').querySelectorAll('._option');
        edit_buttons.forEach(function (edit_button) {
            edit_button.addEventListener('click', sendContainerEditOptionClickEventListener);
        });
        /**
         * 멘션 모듈 설정
         * */
        let mention;
        try {
            const obj = getTypeAndValue();
            mention = new OkiwiMention({
                container: RIGHT_SEND_CONTAINER.querySelector('._input-inner').querySelector('._chat-input'),
                get_users_url: `/chat/channel/members?type=${obj.type}${obj.value ? '&value=' + encodeURIComponent(obj.value) : ''}`
            });
        } catch (e) {
            throw new Error(`${e}`);
        }

        /**
         * 쓰레드의 보내는 에디터 이벤트 설정
         * */
        sendContainerInputEvent(RIGHT_SEND_CONTAINER.querySelector('._input-inner').querySelector('._chat-input'), sendContainerEditorKeydownEventListener, sendContainerEditorKeyupEventListener, sendContainerEditorInputEventListener, rightThreadSendContainerWriteClickEventListener);
        let control_buttons = RIGHT_SEND_CONTAINER.querySelector('._control-panel').querySelectorAll('ul li');
        control_buttons.forEach(function (control_button) {
            control_button.addEventListener('click', rightThreadSendContainerControlOptionClickEventListener);
        });
    }

    /**
     * 바깥쪽 영역 클릭시 닫히는 이벤트 설정
     * */
    $(document).on('click', '#chat-right-side', function (event) {
        if (event.target.closest('.right-side-inner') === null || event.target.closest('.right-side-inner') === undefined) {
            rightThreadClose();
        }
    });
}

/**
 * 쓰레드 뒤로가기 버튼 이벤트
 * */
function rightThreadBackClickEventListener(event) {
    console.log('rightThreadBackClickEventListener');
    rightThreadClose();
    event.preventDefault();
    event.stopPropagation();
}

/**
 * 쓰레드의 에디터 글 보내기 버튼 이벤트
 * */
function rightThreadSendContainerWriteClickEventListener(event) {
    console.log('rightThreadSendContainerWriteClickEventListener', this);
    let editor = this.closest('._input-inner').querySelector('._chat-input');
    let value = editor.innerHTML;
    value = value.replace(/<br\s*\/?>/gi, '');
    const info = getTypeAndValue();
    let message = {
        type: 'TEXT',
        content: value,
        parent_message_id: RIGHT_THREAD_CONTAINER.dataset.id
    }
    console.log(message);
    sendMessage(message, info).then((result) => {
        console.log(result);
        if (result.status === 'OK') {
            if (result.data.status) {
                RIGHT_SUB_THREADS_CONTAINER.append(createMessageElement(result.data.message, true));
                editor.innerHTML = ``;
                updateChatContainerScroll(RIGHT_THREAD_SCROLL_CONTAINER);
                // TODO WEBSOCKET SEND
                CHAT_WEBSOCKET.channel_websocket.onSend({
                    plugin_type: WEBSOCKET_PLUG_TYPE.CHAT.name,
                    action_type: WEBSOCKET_ACTION_TYPE.CREATE.name, data: {
                        category: WEBSOCKET_CATEGORY.CATEGORY.CHAT.name,
                        subcategory: WEBSOCKET_CATEGORY.CATEGORY.CHAT.SUBCATEGORY.MAIN.name,
                        thirdcategory : WEBSOCKET_CATEGORY.CATEGORY.CHAT.SUBCATEGORY.MAIN.THIRDCATEGORY.MESSAGE.name,
                        data: result.data.message
                    },
                }, CHAT_WEBSOCKET);
            } else {
                viewAlert({content: '메세지 전송에 실패했습니다.'});
            }
        } else {
            viewAlert({content: '메세지 전송에 실패했습니다. 네트워크를 확인하세요.'});
        }
    })
    event.preventDefault();
    event.stopPropagation();
}

/**
 * 쓰레드의 에디터 파일, 멘션, 이모티콘 클릭 이벤트
 * */
function rightThreadSendContainerControlOptionClickEventListener(event) {
    console.log('rightThreadSendContainerControlOptionClickEventListener', this);
    if (this.classList.contains('_file')) {
        let input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.addEventListener('change', rightThreadSendContainerControlFileChangeEventListener);
        input.click();
        event.preventDefault();
        event.stopPropagation();
    } else if (this.classList.contains('_mention')) {

        event.preventDefault();
        event.stopPropagation();
    } else if (this.classList.contains('_emoji')) {
        this.querySelector('button').click();
    }
}

/**
 * 쓰레드의 에디터 파일 보내기 이벤트
 * */
function rightThreadSendContainerControlFileChangeEventListener(event) {
    console.log('rightThreadSendContainerControlFileChangeEventListener', this, event);
    let input = this;
    let file = input.files[0];

    function readURL(input, callback) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                console.log('e', e);
                uploadChatFile(file).then((result) => {
                    if (result.status === 'OK') {
                        let files = [{
                            name: result.data.file.name,
                            url: result.data.file.url,
                            size: result.data.file.size,
                            type: result.data.file.type
                        }]
                        callback(files);
                    }
                })
            }
            reader.readAsDataURL(input.files[0]);
            reader.onloadend = function (e) {
            }
        }
    }

    readURL(input, (files) => {
        let message = {
            type: 'FILE',
            message_json: {files},
            parent_message_id: RIGHT_THREAD_CONTAINER.dataset.id
        }
        sendMessage(message, getTypeAndValue()).then((result) => {
            console.log(result);
            if (result.status === 'OK') {
                if (result.data.status) {
                    RIGHT_SUB_THREADS_CONTAINER.append(createMessageElement(result.data.message));
                    updateChatContainerScroll(RIGHT_THREAD_SCROLL_CONTAINER);
                    CHAT_WEBSOCKET.channel_websocket.onSend({
                        plugin_type: WEBSOCKET_PLUG_TYPE.CHAT.name,
                        action_type: WEBSOCKET_ACTION_TYPE.CREATE.name,
                        data: {
                            category: WEBSOCKET_CATEGORY.CATEGORY.CHAT.name,
                            subcategory: WEBSOCKET_CATEGORY.CATEGORY.CHAT.SUBCATEGORY.MAIN.name,
                            thirdcategory : WEBSOCKET_CATEGORY.CATEGORY.CHAT.SUBCATEGORY.MAIN.THIRDCATEGORY.MESSAGE.name,
                            data: result.data.message
                        },
                    }, CHAT_WEBSOCKET);
                } else {

                }
            } else {

            }
        })
    });
}

/**
 * Utility
 * */
/**
 * 쓰레드 닫기
 * */
const rightThreadClose = () => {
    console.log('rightThreadClose');
    if (!RIGHT_THREAD_CONTAINER.classList.contains('is-close')) {
        RIGHT_THREAD_CONTAINER.classList.add('is-close');
    }
    setTimeout(function () {
        if (!RIGHT_THREAD_CONTAINER.classList.contains('is-closed')) {
            RIGHT_THREAD_CONTAINER.classList.add('is-closed');
        }
        rightThreadClear();
    }, 100);
}

/**
 * 쓰레드 오픈
 * */
const rightThreadOpen = (message_id = tokenGenerator(6)) => {
    console.log('rightThreadOpen');
    if (RIGHT_THREAD_CONTAINER.classList.contains('is-closed')) {
        RIGHT_THREAD_CONTAINER.classList.remove('is-closed');
    }
    setTimeout(function () {
        if (RIGHT_THREAD_CONTAINER.classList.contains('is-close')) {
            RIGHT_THREAD_CONTAINER.classList.remove('is-close');
        }
        /*TODO Clear*/
        rightThreadClear();
        /*TODO ReInitialize*/
        rightThreadReInitialize(message_id);
    }, 100);
}

/**
 * 쓰레드 정리
 * */
const rightThreadClear = () => {
    deleteChild(RIGHT_MAIN_THREAD_CONTAINER);
    deleteChild(RIGHT_SUB_THREADS_CONTAINER);
    RIGHT_THREAD_CONTAINER.removeAttribute('data-id');
}

/**
 * 쓰레드의 엘리먼트 삽입 및 설정
 * */
const rightThreadUpdateUI = (thread) => {
    console.log('rightThreadUpdateUI', thread);
    RIGHT_THREAD_CONTAINER.setAttribute('data-id', thread.message.id);
    RIGHT_MAIN_THREAD_CONTAINER.append(createMessageElement(thread.message, true));
    thread.messages.forEach(function (message) {
        RIGHT_SUB_THREADS_CONTAINER.append(createMessageElement(message, true));
    });
}

/**
 * 쓰레드의 재설정
 * */
const rightThreadReInitialize = (message_id) => {
    console.log('rightThreadReInitialize', message_id);
    getThreadMessages(message_id, null)
        .then((result) => {
            console.log('result', result);
            if (result.status === 'OK') {
                if (result.data.status) {
                    result.data.thread.messages.reverse();
                    rightThreadUpdateUI(result.data.thread);
                } else {
                    viewAlert({content: '스레드 내역을 불러올 수 없습니다.'});
                }
            } else {
                viewAlert({content: '스레드 내역을 불러올 수 없습니다.'});
            }
        });
}
