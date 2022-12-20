/*TODO Global Variable*/
let RIGHT_THREAD_CONTAINER;
let RIGHT_THREAD_SCROLL_CONTAINER;
let RIGHT_MAIN_THREAD_CONTAINER;
let RIGHT_SUB_THREADS_CONTAINER;
let RIGHT_SEND_CONTAINER;
let RIGHT_THREAD_WEBSOCKET;
/*TODO Initialize*/
const initializeRightThread = (is_picker_on = true, websocket) => {
    if (!RIGHT_THREAD_WEBSOCKET) {
        RIGHT_THREAD_WEBSOCKET = websocket;
        console.log('RIGHT_THREAD_WEBSOCKET', RIGHT_THREAD_WEBSOCKET);
    }
    if (!RIGHT_THREAD_CONTAINER) {
        RIGHT_THREAD_CONTAINER = document.querySelector('#chat-right-side');
        /*TODO THREAD_CONTAINER EVENT*/
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
        /*TODO SEND_CONTAINER EVENT*/
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
        let edit_buttons = RIGHT_SEND_CONTAINER.querySelector('._edit-panel').querySelectorAll('._option');
        edit_buttons.forEach(function (edit_button) {
            edit_button.addEventListener('click', sendContainerEditOptionClickEventListener);
        });
        /*TODO Add Mention Module*/
        let mention;
        try {
            mention = new OkiwiMention({container: RIGHT_SEND_CONTAINER.querySelector('._input-inner').querySelector('._chat-input')});
            console.log('mention', mention);
        } catch (e) {
            throw new Error(`${e}`);
        }
        sendContainerInputEvent(RIGHT_SEND_CONTAINER.querySelector('._input-inner').querySelector('._chat-input'), sendContainerEditorKeydownEventListener, sendContainerEditorKeyupEventListener, sendContainerEditorInputEventListener, rightThreadSendContainerWriteClickEventListener);
        let control_buttons = RIGHT_SEND_CONTAINER.querySelector('._control-panel').querySelectorAll('ul li');
        control_buttons.forEach(function (control_button) {
            control_button.addEventListener('click', rightThreadSendContainerControlOptionClickEventListener);
        });
    }
    //TODO Click OutSide Close Event
    $(document).on('click', '#chat-right-side', function (event) {
        if (event.target.closest('.right-side-inner') === null || event.target.closest('.right-side-inner') === undefined) {
            rightThreadClose();
        }
    });
}

/*TODO CONTAINER EVENT LISTENER*/
function rightThreadBackClickEventListener(event) {
    console.log('rightThreadBackClickEventListener');
    rightThreadClose();
    event.preventDefault();
    event.stopPropagation();
}

/*TODO 9. Message 보내기 (Main, Right) -> 지우씨*/
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

/*TODO 10. File Message 보내기 (Main, Right) -> 지우씨*/
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
                } else {

                }
            } else {

            }
        })
    });
}

/*TODO Utility*/
const rightThreadClose = () => {
    console.log('rightThreadClose');
    if (!RIGHT_THREAD_CONTAINER.classList.contains('is-close')) {
        RIGHT_THREAD_CONTAINER.classList.add('is-close');
    }
    setTimeout(function () {
        if (!RIGHT_THREAD_CONTAINER.classList.contains('is-closed')) {
            RIGHT_THREAD_CONTAINER.classList.add('is-closed');
        }
        /*TODO Clear*/
        rightThreadClear();
    }, 100);
}

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

const rightThreadClear = () => {
    deleteChild(RIGHT_MAIN_THREAD_CONTAINER);
    deleteChild(RIGHT_SUB_THREADS_CONTAINER);
    RIGHT_THREAD_CONTAINER.removeAttribute('data-id');
}

const rightThreadUpdateUI = (thread) => {
    console.log('rightThreadUpdateUI', thread);
    RIGHT_THREAD_CONTAINER.setAttribute('data-id', thread.message.id);
    RIGHT_MAIN_THREAD_CONTAINER.append(createMessageElement(thread.message, true));
    thread.messages.forEach(function (message) {
        RIGHT_SUB_THREADS_CONTAINER.append(createMessageElement(message, true));
    });
}

/*TODO 3. Thread 가져오기 (Right) -> 지우씨*/
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
