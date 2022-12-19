/*TODO Global Variable*/
let RIGHT_THREAD_CONTAINER;
let RIGHT_THREAD_SCROLL_CONTAINER;
let RIGHT_MAIN_THREAD_CONTAINER;
let RIGHT_SUB_THREADS_CONTAINER;
let RIGHT_SEND_CONTAINER;
/*TODO Initialize*/
const initializeRightThread = (is_picker_on = true) => {
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
    rightThreadOpen(tokenGenerator(6));
}

/*TODO CONTAINER EVENT LISTENER*/
function rightThreadBackClickEventListener(event) {
    console.log('rightThreadBackClickEventListener');
    rightThreadClose();
    event.preventDefault();
    event.stopPropagation();
}

function rightThreadSendContainerWriteClickEventListener(event) {
    console.log('rightThreadSendContainerWriteClickEventListener', this);
    let editor = this.closest('._input-inner').querySelector('._chat-input');
    let value = editor.innerHTML;
    value = value.replace(/<br\s*\/?>/gi, '');
    let message = {
        id: tokenGenerator(6),
        bookmark: false,
        profile: {
            name: 'test.png',
            url: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fthumb2.gettyimageskorea.com%2Fimage_preview%2F700%2F201709%2FEYM%2F752194037.jpg&type=a340',
            size: 9999,
            type: 'image/png'
        },
        name: '김우식',
        type: 'TEXT',
        content: value,
        date: {
            "year": 2022,
            "month": "NOVEMBER",
            "monthValue": 11,
            "dayOfMonth": 7,
            "hour": 21,
            "minute": 58,
            "second": 49,
            "nano": 0,
            "dayOfWeek": "MONDAY",
            "dayOfYear": 311,
            "chronology": {
                "calendarType": "iso8601",
                "id": "ISO"
            }
        },
        reactions: [],
        edited: false,
        threads: 0
    }
    RIGHT_SUB_THREADS_CONTAINER.append(createMessageElement(message, true));
    editor.innerHTML = ``;
    updateChatContainerScroll(RIGHT_THREAD_SCROLL_CONTAINER);
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

function rightThreadSendContainerControlFileChangeEventListener(event) {
    console.log('rightThreadSendContainerControlFileChangeEventListener', this, event);
    let input = this;
    let file = input.files[0];

    function readURL(input, callback) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                console.log('e', e);
                let message = {
                    id: tokenGenerator(6),
                    bookmark: false,
                    profile: {
                        name: 'test.png',
                        url: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fthumb2.gettyimageskorea.com%2Fimage_preview%2F700%2F201709%2FEYM%2F752194037.jpg&type=a340',
                        size: 9999,
                        type: 'image/png'
                    },
                    name: '김우식',
                    type: 'FILE',
                    files: [{
                        name: file.name,
                        url: e.target.result,
                        size: file.size,
                        type: file.type
                    }],
                    date: {
                        "year": 2022,
                        "month": "NOVEMBER",
                        "monthValue": 11,
                        "dayOfMonth": 7,
                        "hour": 21,
                        "minute": 58,
                        "second": 49,
                        "nano": 0,
                        "dayOfWeek": "MONDAY",
                        "dayOfYear": 311,
                        "chronology": {
                            "calendarType": "iso8601",
                            "id": "ISO"
                        }
                    },
                    reactions: [],
                    edited: false,
                    threads: 0
                };
                callback(message);
            }
            reader.readAsDataURL(input.files[0]);
            reader.onloadend = function (e) {
            }
        }
    }

    readURL(input, (message) => {
        RIGHT_SUB_THREADS_CONTAINER.append(createMessageElement(message));
        updateChatContainerScroll(RIGHT_THREAD_SCROLL_CONTAINER);
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

const rightThreadReInitialize = (message_id) => {
    console.log('rightThreadReInitialize', message_id);
    fetch('../../../resources/assets/datas/thread_sample.json')
        .then((response) => response.json())
        .then((thread) => {
            console.log('thread', thread);
            rightThreadUpdateUI(thread);
        });
}
