'use strict'
/*TODO Chat Message Type*/
const CHAT_MESSAGE_TYPE = {
    TEXT: {
        name: 'TEXT',
    },
    FILE: {
        name: 'FILE',
    }
}
Object.freeze(CHAT_MESSAGE_TYPE);
const findChatMessageType = (type) => {
    switch (type) {
        case 'TEXT': {
            return CHAT_MESSAGE_TYPE.TEXT
        }
        case 'FILE': {
            return CHAT_MESSAGE_TYPE.FILE
        }
    }
}

/*TODO Global Variable*/
let FLOATER_MENU;
let CHAT_CONTAINER;
let _CHAT_CONTAINER;
let _CHAT_SEND_CONTAINER;
let EMOJI_PICKER;
let CHAT_MENTION;
let CHAT_WEBSOCKET;
/*TODO Initialize */
//is_picker_on is chat page init false forced, true is module acceptable, setting ready in okiwi-chat-right-side.js
const initializeChat = ({container, messages, is_picker_on = false, websocket}) => {
    if (!CHAT_WEBSOCKET) {
        CHAT_WEBSOCKET = websocket;
        console.log('CHAT_WEBSOCKET', CHAT_WEBSOCKET);
    }
    FLOATER_MENU = document.querySelector('#chat-floater-menu');
    floaterMenuEvent(FLOATER_MENU, floaterMenuThreadClickEventListener, floaterMenuBookmarkClickEventListener);
    CHAT_CONTAINER = typeof (container) === "object" ? container : documentSelector(container);
    CHAT_CONTAINER.prepend(createChatContainerElement());
    _CHAT_CONTAINER = document.querySelector('._chat-container');
    CHAT_CONTAINER.append(createChatSendContainerElement());

    /*TODO Add Mention Module*/
    let mention;
    try {
        mention = new OkiwiMention({container: CHAT_CONTAINER.querySelector('._chat-input')});
        if (!CHAT_MENTION) {
            CHAT_MENTION = mention;
        }
        console.log('mention', mention);
    } catch (e) {
        throw new Error(`${e}`);
    }
    /*TODO Add Event*/
    sendContainerInputEvent(CHAT_CONTAINER.querySelector('._chat-input'), sendContainerEditorKeydownEventListener, sendContainerEditorKeyupEventListener, sendContainerEditorInputEventListener, sendContainerWriteClickEventListener)

    if (is_picker_on) {
        new EmojiPicker({
            trigger: [
                {
                    selector: '#control-emoji-button',
                    insertInto: '.__chat ._chat-input', // '.selector' can be used without array
                    clear: false
                },
            ],
            closeButton: true,
        });
    }
    _CHAT_SEND_CONTAINER = document.querySelector('._send-container');
    /*TODO Message Element Create*/
    messages.forEach(function (message) {
        let message_elem = createMessageElement(message);
        _CHAT_CONTAINER.append(message_elem);
    });
    /*TODO Initialize Document Event*/
    $(document).on('mouseover', documentMouseoverEventListener);
    /*TODO Update UI*/
    updateChatContainerScroll(_CHAT_CONTAINER);
}

/*TODO Floater Menu Event*/
const floaterMenuEvent = function (menu, thread, bookmark) {
    menu.querySelector('.floater-option.thread').addEventListener('click', thread);
    menu.querySelector('.floater-option.bookmark').addEventListener('click', bookmark);
    /*TODO Reaction Menu*/
    EMOJI_PICKER = new emojiButtonList('emoji-picker', {
        dropDownXAlign: 'left',
        dropDownYAlign: 'bottom',
        yAlignMargin: 0,
        xAlignMargin: 0,
        onEmojiClick: floaterMenuReactionClickEventListener
    });
}

const showFloaterMenu = (menu, message, is_thread = false, is_sub_thread = false) => {
    let rect = message.getBoundingClientRect();
    menu.setAttribute('data-id', message.dataset.id);
    let bookmark = menu.querySelector('.floater-option.bookmark');
    let is_bookmark = message.dataset.bookmark === 'true' || message.dataset.bookmark === true ? true : false;
    if (is_bookmark) {
        if (!bookmark.classList.contains('is-active')) {
            bookmark.classList.add('is-active');
        }
        bookmark.innerHTML = `<svg width="24"
                                   height="24"
                                   viewBox="0 0 24 24"
                                   fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_42_3439)">
                                  <path d="M5 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V22.143C20.0001 22.2324 19.9763 22.3202 19.9309 22.3973C19.8855 22.4743 19.8204 22.5378 19.7421 22.5811C19.6639 22.6244 19.5755 22.6459 19.4861 22.6434C19.3968 22.641 19.3097 22.6146 19.234 22.567L12 18.03L4.766 22.566C4.69037 22.6135 4.60339 22.6399 4.5141 22.6424C4.42482 22.6449 4.33649 22.6235 4.2583 22.5803C4.1801 22.5371 4.11491 22.4738 4.06948 22.3969C4.02406 22.32 4.00007 22.2323 4 22.143V3C4 2.73478 4.10536 2.48043 4.29289 2.29289C4.48043 2.10536 4.73478 2 5 2Z"
                                        fill="black"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_42_3439">
                                    <rect width="24"
                                          height="24"
                                          fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>`;
    } else {
        if (bookmark.classList.contains('is-active')) {
            bookmark.classList.remove('is-active');
        }
        bookmark.innerHTML = `<svg width="24"
                                   height="24"
                                   viewBox="0 0 24 24"
                                   fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_42_3559)">
                                  <path d="M5 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V22.143C20.0001 22.2324 19.9763 22.3202 19.9309 22.3973C19.8855 22.4743 19.8204 22.5378 19.7421 22.5811C19.6639 22.6244 19.5755 22.6459 19.4861 22.6434C19.3968 22.641 19.3097 22.6146 19.234 22.567L12 18.03L4.766 22.566C4.69037 22.6135 4.60339 22.6399 4.5141 22.6424C4.42482 22.6449 4.33649 22.6235 4.2583 22.5803C4.1801 22.5371 4.11491 22.4738 4.06948 22.3969C4.02406 22.32 4.00007 22.2323 4 22.143V3C4 2.73478 4.10536 2.48043 4.29289 2.29289C4.48043 2.10536 4.73478 2 5 2ZM18 4H6V19.432L12 15.671L18 19.432V4Z"
                                        fill="black"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_42_3559">
                                    <rect width="24"
                                          height="24"
                                          fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>`;
    }
    is_thread ? menu.querySelector('.floater-option.thread').style.display = 'none' : menu.querySelector('.floater-option.thread').style.display = 'block';
    is_sub_thread ? menu.querySelector('.floater-option.bookmark').style.display = 'none' : menu.querySelector('.floater-option.bookmark').style.display = 'block';
    let position = {
        top: rect.top - (FLOATER_MENU.getBoundingClientRect().height / 3),
        left: rect.right - FLOATER_MENU.getBoundingClientRect().width,
        width: rect.width,
        height: rect.height
    };
    menu.style.top = `${position.top}px`;
    menu.style.left = `${position.left}px`;
    menu.setAttribute('data-hover', 'is-hover');
    menu.style.opacity = 1;
}

const hideFloaterMenu = () => {
    $(FLOATER_MENU).hide().after(function () {
        FLOATER_MENU.style.opacity = 0;
    });
    FLOATER_MENU.removeAttribute('data-hover');
}

function floaterMenuThreadClickEventListener(event) {
    let menu = this.closest('#chat-floater-menu');
    let message_id = menu.dataset.id;
    /*TODO Open Thread*/
    if (RIGHT_THREAD_CONTAINER) {
        rightThreadOpen(message_id);
    }
    event.preventDefault();
    event.stopPropagation();
}

/*TODO 5. Emoji 추가하기 (Main,Right) -> 우식*/
function floaterMenuReactionClickEventListener(selected_emoji) {
    let message_id = FLOATER_MENU.dataset.id;
    let messages = findMessages(message_id);
    let duplicate_checker = false;
    messages.forEach(function (message) {
        let reaction_container = message.querySelector('._reactions');
        console.log('selected_emoji', selected_emoji);
        let selected_reaction = findReaction(message, selected_emoji);
        let reaction = {
            chat_message_id: message_id,
            title: tokenGenerator(8),
            reaction: selected_emoji,
        }
        if (selected_reaction) {
            /*TODO 해당되는 Reaction이 있을 때*/
            console.log('1');
            if (selected_reaction.classList.contains('is-active')) {
                /*TODO 해당되는 Reaction을 이미 했을 때 -> 제거*/
                console.log('2');
                if (!duplicate_checker) {
                    removeReaction(reaction).then((result) => {
                        if (result.status === 'OK') {
                            selected_reaction.classList.remove('is-active');
                            let count = selected_reaction.querySelector('._count');
                            let integer_count = count.dataset.count * 1;
                            integer_count -= 1;
                            count.setAttribute('data-count', integer_count);
                            console.log('integer_count', integer_count);
                            if (integer_count > 0) {
                                count.innerHTML = integer_count <= 99 ? integer_count : '99+';
                            } else {
                                selected_reaction.remove();
                            }
                        } else {
                            viewAlert({content: '리액션을 제거할 수 없습니다.'});
                        }
                    });
                    duplicate_checker = true;
                } else {
                    selected_reaction.classList.remove('is-active');
                    let count = selected_reaction.querySelector('._count');
                    let integer_count = count.dataset.count * 1;
                    integer_count -= 1;
                    count.setAttribute('data-count', integer_count);
                    console.log('integer_count', integer_count);
                    if (integer_count > 0) {
                        count.innerHTML = integer_count <= 99 ? integer_count : '99+';
                    } else {
                        selected_reaction.remove();
                    }
                }
            } else {
                /*TODO 해당되는 Reaction을 않했을 때 -> 생성*/
                console.log('3');
                reaction.count = 1;
                reaction.active = true;
                if (!duplicate_checker) {
                    createReaction(reaction).then((result) => {
                        if (result.status === 'OK') {
                            selected_reaction.classList.add('is-active');
                            let count = selected_reaction.querySelector('._count');
                            let integer_count = count.dataset.count * 1;
                            integer_count += 1;
                            count.setAttribute('data-count', integer_count);
                            console.log('integer_count', integer_count);
                            if (integer_count > 0) {
                                count.innerHTML = integer_count <= 99 ? integer_count : '99+';
                            }
                        } else {
                            viewAlert({content: '리액션을 추가할 수 없습니다.'});
                        }
                    });
                    duplicate_checker = true;
                } else {
                    selected_reaction.classList.add('is-active');
                    let count = selected_reaction.querySelector('._count');
                    let integer_count = count.dataset.count * 1;
                    integer_count += 1;
                    count.setAttribute('data-count', integer_count);
                    console.log('integer_count', integer_count);
                    if (integer_count > 0) {
                        count.innerHTML = integer_count <= 99 ? integer_count : '99+';
                    }
                }
            }
        } else {
            /*TODO 해당하는 Reaction이 현재 없을 때 -> 생성*/
            reaction.count = 1;
            reaction.active = true;
            if (!duplicate_checker) {
                createReaction(reaction).then((result) => {
                    if (result.status === 'OK') {
                        reaction.emoji = reaction.reaction;
                        let reaction_elem = createMessageReactionElement(reaction);
                        reaction_elem.addEventListener('click', messageReactionClickEventListener);
                        if (reaction_container) {
                            reaction_container.appendChild(reaction_elem);
                        } else {
                            reaction_container = createMessageReactionsElement([reaction], false);
                            insertAfter(message.querySelector('._content'), reaction_container);
                        }
                    } else {
                        viewAlert({content: '리액션을 추가할 수 없습니다.'});
                    }
                });
                duplicate_checker = true;
            } else {
                let reaction_elem = createMessageReactionElement(reaction);
                reaction_elem.addEventListener('click', messageReactionClickEventListener);
                if (reaction_container) {
                    reaction_container.appendChild(reaction_elem);
                } else {
                    reaction_container = createMessageReactionsElement([reaction], false);
                    insertAfter(message.querySelector('._content'), reaction_container);
                }
            }
        }
    });
}

/*TODO 7. Bookmark 설정 및 해제 (Main, Right) -> 우식*/
function floaterMenuBookmarkClickEventListener(event) {
    let menu = this.closest('#chat-floater-menu');
    let message_id = menu.dataset.id;
    let messages = findMessages(message_id);
    let check;
    messages.forEach(function (message) {
        check = updateFloaterBookmarkMenu(menu, message);
    });
    let message = {
        id: message_id,
        bookmark: check,
    }
    if (check) {
        /*TODO API Bookmark Register*/
        updateMessageBookmark(message).then((result) => {
            if (result.status === 'OK') {

            } else {
                viewAlert({content: '북마크를 추가할 수 없습니다.'});
            }
        });
    } else {
        /*TODO API Bookmark UnRegister*/
        updateMessageBookmark(message).then((result) => {
            if (result.status === 'OK') {

            } else {
                viewAlert({content: '북마크를 추가할 수 없습니다.'});
            }
        });
    }
    event.preventDefault();
    event.stopPropagation();
}

/*TODO Message Item Event*/
function messageMenuEnterEvent(message) {
    /*TODO 길이를 구할 수 없어 미리 Display Block을 해줘야함 */
    $(FLOATER_MENU).show().after(function () {
        FLOATER_MENU.style.opacity = 0;
    });
    let is_thread = message.closest('#chat-right-side') !== null && message.closest('#chat-right-side') !== undefined;
    let is_sub_thread = message.closest('._sub_threads') !== null && message.closest('._sub_threads') !== undefined;
    showFloaterMenu(FLOATER_MENU, message, is_thread, is_sub_thread);
}

function messageMenuLeaveEvent() {
    if (FLOATER_MENU.getAttribute('data-hover') === null ||
        FLOATER_MENU.getAttribute('data-hover') === undefined) {
        hideFloaterMenu();
    }
}

const messageMenuEvent = function (elem, enter, leave) {
    let timeout = null;
    elem.onmouseenter = function (event) {
        // Set timeout to be a timer which will invoke callback after 1s
        timeout = setTimeout(function () {
            enter(elem);
        }, 100);
    };

    elem.onmouseleave = function (event) {
        // Clear any timers set to timeout
        clearTimeout(timeout);
        leave(this);
    }
};

/*TODO Message Element Reaction Event*/
const messageElementEvent = (message, reaction, thread) => {
    let reaction_elems = message.querySelectorAll('._reactions ._reaction');
    reaction_elems.forEach(function (reaction_elem) {
        reaction_elem.addEventListener('click', reaction);
    });
    let thread_elem = message.querySelector('._mores');
    thread_elem?.addEventListener('click', thread);
}
/*TODO 5. Emoji 추가하기 (Main,Right) -> 우식*/

/*TODO 8. Emoji 반응 및 해제 (Main, Right) -> 우식*/
function messageReactionClickEventListener(event) {
    let reaction = this;
    let message = this.closest('.chat-item[data-id]');
    let message_id = message.dataset.id;
    let selected_emoji = reaction.querySelector('._emoji').innerHTML.trim();
    let reaction_obj = {
        chat_message_id: message_id,
        title: tokenGenerator(8),
        reaction: selected_emoji,
    }
    if (reaction.classList.contains('is-active')) {
        /*TODO 해당되는 Reaction을 이미 했을 때 -> 제거*/
        removeReaction(reaction_obj).then((result) => {
            if (result.status === 'OK') {
                reaction.classList.remove('is-active');
                let count = reaction.querySelector('._count');
                let integer_count = count.dataset.count * 1;
                integer_count -= 1;
                count.setAttribute('data-count', integer_count);
                if (integer_count > 0) {
                    count.innerHTML = integer_count <= 99 ? integer_count : '99+';
                } else {
                    reaction.remove();
                }
            } else {
                viewAlert({content: '리액션을 제거할 수 없습니다.'});
            }
        });
    } else {
        /*TODO 해당되는 Reaction을 않했을 때 -> 생성*/
        createReaction(reaction_obj).then((result) => {
            if (result.status === 'OK') {
                reaction.classList.add('is-active');
                let count = reaction.querySelector('._count');
                let integer_count = count.dataset.count * 1;
                integer_count += 1;
                count.setAttribute('data-count', integer_count);
                if (integer_count > 0) {
                    count.innerHTML = integer_count <= 99 ? integer_count : '99+';
                }
            } else {
                viewAlert({content: '리액션을 추가할 수 없습니다.'});
            }
        });
    }
    event.stopPropagation();
    event.preventDefault();
}

function messageThreadClickEventListener(event) {
    let message = this.closest('.chat-item[data-id]');
    let message_id = message.dataset.id;
    if (RIGHT_THREAD_CONTAINER) {
        rightThreadOpen(message_id);
    }
    event.stopPropagation();
    event.preventDefault();
}

const messageFileElementEvent = (message, file) => {
    let file_elems = message.querySelectorAll('._content ._comment-file');
    file_elems.forEach(function (file_elem) {
        file_elem.querySelector('._download').addEventListener('click', file);
    });
}

function messageFileDownloadClickEvent(event) {
    // For Comment
    downloadFileFromUrl($(this).data().url, $(this).data().name);
    event.preventDefault();
    event.stopPropagation();
}

/*TODO SendContainer Event*/

/*TODO Edit Panel Event*/
function sendContainerEditOptionClickEventListener(event) {
    let input = this.closest('._send-container').querySelector('._input-inner');
    if (this.classList.contains('bold')) {
        console.log('bold');
    } else if (this.classList.contains('italic')) {
        console.log('italic');
    } else if (this.classList.contains('strikethrough')) {
        console.log('strikethrough');
    } else if (this.classList.contains('underline')) {
        console.log('underline');
    } else if (this.classList.contains('link')) {
        console.log('link');
    } else if (this.classList.contains('unlink')) {
        console.log('unlink');
    } else if (this.classList.contains('order-list')) {
        console.log('order-list');
    } else if (this.classList.contains('unordered-list')) {
        console.log('unordered-list');
    }
    event.stopPropagation();
    event.preventDefault();
}

/*TODO Control Panel Event*/
function sendContainerControlOptionClickEventListener(event) {
    if (this.classList.contains('_file')) {
        let input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.addEventListener('change', sendContainerControlFileChangeEventListener);
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
function sendContainerControlFileChangeEventListener(event) {
    let input = this;
    let file = input.files[0];

    function readURL(input, callback) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
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
            message_json: {files}
        }
        sendMessage(message, getTypeAndValue()).then((result) => {
            console.log(result);
            if (result.status === 'OK') {
                if (result.data.status) {
                    _CHAT_CONTAINER.append(createMessageElement(result.data.message));
                    updateChatContainerScroll(_CHAT_CONTAINER);
                } else {

                }
            } else {

            }
        })

    });
}

/*TODO Input Panel Event*/
const sendContainerInputEvent = (editor, keydown, keyup, input, send) => {
    editor.addEventListener('keydown', keydown);
    editor.addEventListener('input', input);
    editor.addEventListener('keyup', keyup);
    editor.closest('._input-inner').querySelector('._write').addEventListener('click', send);
}

function sendContainerEditorKeydownEventListener(event) {
    console.log('sendContainerEditorKeydownEventListener');
}

function sendContainerEditorKeyupEventListener(event) {
    console.log('sendContainerEditorKeyupEventListener');
    if ((event.key === 'Enter'.toLowerCase() || event.code === 'Enter'.toLowerCase() || event.keyCode === 13) && !(event.altKey || event.shiftKey || event.ctrlKey)) {
        //TODO Enter Key
        let send_button = this.closest('._send-container').querySelector('._input-inner ._write');
        send_button.click();
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    }
}

function sendContainerEditorInputEventListener(event) {
    console.log('sendContainerEditorInputEventListener');
}

/*TODO 9. Message 보내기 (Main, Right) -> 지우씨*/
function sendContainerWriteClickEventListener(event) {
    console.log('sendContainerWriteClickEventListener', this);
    let editor = this.closest('._input-inner').querySelector('._chat-input');
    let value = editor.innerHTML;
    value = value.replace(/<br\s*\/?>/gi, '');
    let message = {
        type: 'TEXT',
        content: value,
        mentions: CHAT_MENTION.options.mentions
    }
    sendMessage(message, getTypeAndValue()).then((result) => {
        console.log(result);
        if (result.status === 'OK') {
            if (result.data.status) {
                _CHAT_CONTAINER.append(createMessageElement(result.data.message));
                editor.innerHTML = ``;
                updateChatContainerScroll(_CHAT_CONTAINER);
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

/*TODO Document Event*/
function documentMouseoverEventListener(event) {
    let chat_item_hovering = event.target.classList.contains('chat-item') ||
    event.target.closest('.chat-item') ? event.target.closest('.chat-item').classList.contains('chat-item') : false;
    let floater_menu_hovering = event.target.id === 'chat-floater-menu' ||
    event.target.closest('#chat-floater-menu') ? event.target.closest('#chat-floater-menu').id === 'chat-floater-menu' : false;

    if ((!chat_item_hovering) && (!floater_menu_hovering)) {
        hideFloaterMenu();
    }
}

/*TODO Utility*/
const documentSelector = (selector) => {
    return document.querySelector(selector);
}

const documentSelectorAll = (selector) => {
    return document.querySelectorAll(selector);
}

const findMessage = (message_id) => {
    return CHAT_CONTAINER.querySelector(`._chat-container .chat-item[data-id="${message_id}"]`);
}

const findMessages = (message_id) => {
    let messages = new Array();
    if (RIGHT_MAIN_THREAD_CONTAINER && RIGHT_THREAD_CONTAINER.dataset.id) {
        let message = RIGHT_MAIN_THREAD_CONTAINER.querySelector(`.chat-item[data-id="${message_id}"]`);
        if (message) {
            messages.push(message);
        }
    }
    if (CHAT_CONTAINER) {
        let message = CHAT_CONTAINER.querySelector(`._chat-container .chat-item[data-id="${message_id}"]`);
        if (message) {
            messages.push(message);
        }
    }
    if (RIGHT_SUB_THREADS_CONTAINER) {
        let message = RIGHT_SUB_THREADS_CONTAINER.querySelector(`.chat-item[data-id="${message_id}"]`);
        if (message) {
            messages.push(message);
        }
    }
    return messages;
}

const findReaction = (message, selected_emoji) => {
    let reactions = [...message.querySelectorAll('._reactions ._reaction')];
    let selected_reaction = reactions.find(function (reaction) {
        return reaction.querySelector('._emoji').innerText.trim() === selected_emoji;
    });
    return selected_reaction;
}

const updateFloaterBookmarkMenu = (menu, message) => {
    let bookmark = menu.querySelector('.floater-option.bookmark');
    let is_bookmark = message.dataset.bookmark === 'true' || message.dataset.bookmark === true ? true : false;
    if (is_bookmark) {
        /*TODO Bookmark Remove*/
        if (bookmark.classList.contains('is-active'))
            bookmark.classList.remove('is-active');
        message.setAttribute('data-bookmark', false);
        bookmark.innerHTML = `<svg width="24"
                                   height="24"
                                   viewBox="0 0 24 24"
                                   fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_42_3559)">
                                  <path d="M5 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V22.143C20.0001 22.2324 19.9763 22.3202 19.9309 22.3973C19.8855 22.4743 19.8204 22.5378 19.7421 22.5811C19.6639 22.6244 19.5755 22.6459 19.4861 22.6434C19.3968 22.641 19.3097 22.6146 19.234 22.567L12 18.03L4.766 22.566C4.69037 22.6135 4.60339 22.6399 4.5141 22.6424C4.42482 22.6449 4.33649 22.6235 4.2583 22.5803C4.1801 22.5371 4.11491 22.4738 4.06948 22.3969C4.02406 22.32 4.00007 22.2323 4 22.143V3C4 2.73478 4.10536 2.48043 4.29289 2.29289C4.48043 2.10536 4.73478 2 5 2ZM18 4H6V19.432L12 15.671L18 19.432V4Z"
                                        fill="black"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_42_3559">
                                    <rect width="24"
                                          height="24"
                                          fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>`;
        return false;
    } else {
        /*TODO Bookmark Add*/
        if (!bookmark.classList.contains('is-active'))
            bookmark.classList.add('is-active');
        message.setAttribute('data-bookmark', true);
        bookmark.innerHTML = `<svg width="24"
                                   height="24"
                                   viewBox="0 0 24 24"
                                   fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_42_3439)">
                                  <path d="M5 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V22.143C20.0001 22.2324 19.9763 22.3202 19.9309 22.3973C19.8855 22.4743 19.8204 22.5378 19.7421 22.5811C19.6639 22.6244 19.5755 22.6459 19.4861 22.6434C19.3968 22.641 19.3097 22.6146 19.234 22.567L12 18.03L4.766 22.566C4.69037 22.6135 4.60339 22.6399 4.5141 22.6424C4.42482 22.6449 4.33649 22.6235 4.2583 22.5803C4.1801 22.5371 4.11491 22.4738 4.06948 22.3969C4.02406 22.32 4.00007 22.2323 4 22.143V3C4 2.73478 4.10536 2.48043 4.29289 2.29289C4.48043 2.10536 4.73478 2 5 2Z"
                                        fill="black"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_42_3439">
                                    <rect width="24"
                                          height="24"
                                          fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>`;
        return true;
    }
}

/*TODO Need Time Utility*/
const changeLocalDateTimeToMeridian = (date) => {
    let hours = date.hour;
    let ampm = hours >= 12 ? '오후' : '오전';
    return ampm;
}

const changeLocalDateTimeToMm_ss = (date) => {
    let hours = date.hour;
    let minutes = date.minute;
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes;
    return strTime;
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

const updateChatContainerScroll = (element) => {
    element.scrollTop = element.scrollHeight;
}

function insertAfter(referenceNode, newNode) {
    if (!!referenceNode.nextSibling) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    } else {
        referenceNode.parentNode.appendChild(newNode);
    }
}

/*TODO Create Element*/
/*TODO Create Container Element*/
const createChatContainerElement = () => {
    let container = document.createElement('div');
    container.classList.add('_chat-container');
    return container;
}
const createChatSendContainerElement = () => {
    let container = document.createElement('div');
    container.classList.add('_send-container');
    container.classList.add('__chat');
    container.append(createEditPanelElement());
    container.append(createInputPanelElement());
    container.append(createControlPanelElement());
    return container;
}
const createEditPanelElement = () => {
    const __buildEditPanelInnerElement = () => {
        return `<div class="_edit-icon _option bold">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_42_6537)">
                      <path d="M8 11H12.5C13.163 11 13.7989 10.7366 14.2678 10.2678C14.7366 9.79893 15 9.16304 15 8.5C15 7.83696 14.7366 7.20107 14.2678 6.73223C13.7989 6.26339 13.163 6 12.5 6H8V11ZM18 15.5C18 16.0909 17.8836 16.6761 17.6575 17.2221C17.4313 17.768 17.0998 18.2641 16.682 18.682C16.2641 19.0998 15.768 19.4313 15.2221 19.6575C14.6761 19.8836 14.0909 20 13.5 20H6V4H12.5C13.381 4.00004 14.2425 4.25865 14.9779 4.74378C15.7132 5.2289 16.29 5.9192 16.6367 6.72907C16.9834 7.53894 17.0847 8.43276 16.9282 9.29969C16.7716 10.1666 16.3641 10.9685 15.756 11.606C16.4386 12.0013 17.0053 12.5692 17.3992 13.2526C17.7931 13.9361 18.0003 14.7112 18 15.5ZM8 13V18H13.5C14.163 18 14.7989 17.7366 15.2678 17.2678C15.7366 16.7989 16 16.163 16 15.5C16 14.837 15.7366 14.2011 15.2678 13.7322C14.7989 13.2634 14.163 13 13.5 13H8Z" fill="black"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_42_6537">
                        <rect width="24" height="24" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div class="_edit-icon _option italic">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_42_6662)">
                      <path d="M15 20H7V18H9.927L12.043 6H9V4H17V6H14.073L11.957 18H15V20Z" fill="black"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_42_6662">
                        <rect width="24" height="24" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div class="_edit-icon _option strikethrough">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_42_6455)">
                      <path d="M17.154 14C17.384 14.516 17.5 15.09 17.5 15.72C17.5 17.062 16.976 18.112 15.929 18.867C14.88 19.622 13.433 20 11.586 20C9.946 20 8.323 19.619 6.716 18.856V16.6C8.236 17.477 9.791 17.916 11.382 17.916C13.933 17.916 15.212 17.184 15.221 15.719C15.2263 15.422 15.1716 15.1269 15.0603 14.8515C14.9489 14.5761 14.7832 14.3259 14.573 14.116L14.453 13.999H3V11.999H21V13.999H17.154V14ZM13.076 11H7.629C7.45383 10.8403 7.29289 10.6656 7.148 10.478C6.716 9.92 6.5 9.246 6.5 8.452C6.5 7.216 6.966 6.165 7.897 5.299C8.83 4.433 10.271 4 12.222 4C13.693 4 15.101 4.328 16.444 4.984V7.136C15.244 6.449 13.929 6.106 12.498 6.106C10.018 6.106 8.779 6.888 8.779 8.452C8.779 8.872 8.997 9.238 9.433 9.551C9.869 9.864 10.407 10.113 11.046 10.301C11.666 10.481 12.343 10.715 13.076 11V11Z" fill="black"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_42_6455">
                        <rect width="24" height="24" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div class="_edit-icon _option underline">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_42_6431)">
                      <path d="M8 3V12C8 13.0609 8.42143 14.0783 9.17157 14.8284C9.92172 15.5786 10.9391 16 12 16C13.0609 16 14.0783 15.5786 14.8284 14.8284C15.5786 14.0783 16 13.0609 16 12V3H18V12C18 13.5913 17.3679 15.1174 16.2426 16.2426C15.1174 17.3679 13.5913 18 12 18C10.4087 18 8.88258 17.3679 7.75736 16.2426C6.63214 15.1174 6 13.5913 6 12V3H8ZM4 20H20V22H4V20Z" fill="black"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_42_6431">
                        <rect width="24" height="24" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div class="_edit-icon _option link">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_42_6509)">
                      <path d="M17.657 14.828L16.243 13.414L17.657 12C18.0285 11.6286 18.3231 11.1876 18.5241 10.7023C18.7252 10.217 18.8286 9.69681 18.8286 9.1715C18.8286 8.6462 18.7252 8.12605 18.5241 7.64073C18.3231 7.15542 18.0285 6.71445 17.657 6.343C17.2856 5.97156 16.8446 5.67691 16.3593 5.47589C15.874 5.27487 15.3538 5.1714 14.8285 5.1714C14.3032 5.1714 13.7831 5.27487 13.2977 5.47589C12.8124 5.67691 12.3715 5.97156 12 6.343L10.586 7.757L9.17201 6.343L10.586 4.929C11.7143 3.81892 13.2356 3.19966 14.8184 3.2061C16.4012 3.21255 17.9174 3.84418 19.0366 4.96341C20.1558 6.08265 20.7875 7.5988 20.7939 9.18162C20.8004 10.7644 20.1811 12.2857 19.071 13.414L17.657 14.828ZM14.828 17.657L13.414 19.071C12.8585 19.6356 12.1968 20.0846 11.4669 20.3922C10.737 20.6998 9.95343 20.8598 9.16139 20.863C8.36936 20.8662 7.58452 20.7126 6.85215 20.411C6.11979 20.1094 5.45438 19.6658 4.89432 19.1057C4.33426 18.5456 3.89063 17.8802 3.58902 17.1479C3.28741 16.4155 3.13379 15.6307 3.13701 14.8386C3.14024 14.0466 3.30025 13.263 3.60781 12.5331C3.91538 11.8033 4.36441 11.1415 4.92901 10.586L6.34301 9.172L7.75701 10.586L6.34301 12C5.97157 12.3714 5.67692 12.8124 5.4759 13.2977C5.27488 13.783 5.17141 14.3032 5.17141 14.8285C5.17141 15.3538 5.27488 15.874 5.4759 16.3593C5.67692 16.8446 5.97157 17.2856 6.34301 17.657C6.71446 18.0284 7.15543 18.3231 7.64074 18.5241C8.12605 18.7251 8.64621 18.8286 9.17151 18.8286C9.69681 18.8286 10.217 18.7251 10.7023 18.5241C11.1876 18.3231 11.6286 18.0284 12 17.657L13.414 16.243L14.828 17.657ZM14.828 7.757L16.243 9.172L9.17201 16.242L7.75701 14.828L14.828 7.758V7.757Z" fill="black"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_42_6509">
                        <rect width="24" height="24" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div class="_edit-icon _option unlink">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_42_6722)">
                      <path d="M17 17H22V19H19V22H17V17ZM7 7H2V5H5V2H7V7ZM18.364 15.536L16.95 14.12L18.364 12.706C18.8316 12.2424 19.2031 11.6911 19.4571 11.0836C19.711 10.4761 19.8425 9.82442 19.844 9.16597C19.8454 8.50751 19.7168 7.85526 19.4655 7.24666C19.2142 6.63805 18.8451 6.08508 18.3795 5.61948C17.9139 5.15389 17.3609 4.78484 16.7523 4.53353C16.1437 4.28221 15.4915 4.15359 14.833 4.15503C14.1746 4.15647 13.5229 4.28795 12.9154 4.54193C12.3079 4.7959 11.7566 5.16737 11.293 5.635L9.879 7.05L8.464 5.636L9.88 4.222C11.1928 2.90918 12.9734 2.17164 14.83 2.17164C16.6866 2.17164 18.4672 2.90918 19.78 4.222C21.0928 5.53482 21.8304 7.31539 21.8304 9.172C21.8304 11.0286 21.0928 12.8092 19.78 14.122L18.365 15.536H18.364ZM15.536 18.364L14.121 19.778C12.8082 21.0908 11.0276 21.8284 9.171 21.8284C7.31439 21.8284 5.53382 21.0908 4.221 19.778C2.90818 18.4652 2.17064 16.6846 2.17064 14.828C2.17064 12.9714 2.90818 11.1908 4.221 9.878L5.636 8.464L7.05 9.88L5.636 11.294C5.16837 11.7576 4.7969 12.3089 4.54293 12.9164C4.28895 13.5239 4.15747 14.1756 4.15603 14.834C4.15459 15.4925 4.28321 16.1447 4.53453 16.7533C4.78584 17.3619 5.15489 17.9149 5.62048 18.3805C6.08608 18.8461 6.63905 19.2152 7.24766 19.4665C7.85626 19.7178 8.50851 19.8464 9.16696 19.845C9.82541 19.8435 10.4771 19.712 11.0846 19.4581C11.6921 19.2041 12.2434 18.8326 12.707 18.365L14.121 16.951L15.536 18.365V18.364ZM14.828 7.757L16.243 9.172L9.172 16.242L7.757 14.828L14.828 7.758V7.757Z" fill="black"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_42_6722">
                        <rect width="24" height="24" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div class="_edit-icon _option order-list">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_42_6533)">
                      <path d="M8 4H21V6H8V4ZM5 3V6H6V7H3V6H4V4H3V3H5ZM3 14V11.5H5V11H3V10H6V12.5H4V13H6V14H3ZM5 19.5H3V18.5H5V18H3V17H6V21H3V20H5V19.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z" fill="black"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_42_6533">
                        <rect width="24" height="24" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div class="_edit-icon _option unordered-list">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_42_6686)">
                      <path d="M8 4H21V6H8V4ZM3 3.5H6V6.5H3V3.5ZM3 10.5H6V13.5H3V10.5ZM3 17.5H6V20.5H3V17.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z" fill="black"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_42_6686">
                        <rect width="24" height="24" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>`;
    }
    let panel = document.createElement('div');
    panel.classList.add('_edit-panel');
    panel.innerHTML = __buildEditPanelInnerElement();
    let edit_buttons = panel.querySelectorAll('._option');
    edit_buttons.forEach(function (edit_button) {
        edit_button.addEventListener('click', sendContainerEditOptionClickEventListener);
    });
    return panel;
}
const createInputPanelElement = () => {
    const __buildInputPanelInnerElement = () => {
        return `<div contenteditable="true" class="form-control _chat-input" placeholder="내용을 입력해주세요."></div>
                <div class="_write">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="16" fill="#00C473"></circle>
                    <path d="M23.0714 8.93836C22.9731 8.84067 22.8489 8.77304 22.7135 8.74341C22.5781 8.71378 22.437 8.72338 22.3068 8.77109L6.28825 14.589C6.1501 14.6413 6.03117 14.7344 5.94724 14.8558C5.86331 14.9773 5.81836 15.1214 5.81836 15.2689C5.81836 15.4165 5.86331 15.5606 5.94724 15.682C6.03117 15.8035 6.1501 15.8966 6.28825 15.9489L12.5428 18.4433L17.159 13.8181L18.1857 14.8435L13.5476 19.476L16.0523 25.723C16.1063 25.8583 16.1997 25.9743 16.3204 26.056C16.4411 26.1377 16.5836 26.1812 16.7295 26.1811C16.8766 26.1781 17.0194 26.1306 17.139 26.0449C17.2585 25.9592 17.3493 25.8394 17.3993 25.7011L23.2243 9.70196C23.2739 9.57329 23.2858 9.43319 23.2588 9.29799C23.2317 9.1628 23.1667 9.03807 23.0714 8.93836Z" fill="white"></path>
                  </svg>
                </div>`;
    }
    let panel = document.createElement('div');
    panel.classList.add('_input-inner');
    panel.innerHTML = __buildInputPanelInnerElement();
    return panel;
}
const createControlPanelElement = () => {
    const __buildControlPanelInnerElement = () => {
        return `<ul>
                  <li class="_file">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_42_6509)">
                        <path d="M17.657 14.828L16.243 13.414L17.657 12C18.0285 11.6286 18.3231 11.1876 18.5241 10.7023C18.7252 10.217 18.8286 9.69681 18.8286 9.1715C18.8286 8.6462 18.7252 8.12605 18.5241 7.64073C18.3231 7.15542 18.0285 6.71445 17.657 6.343C17.2856 5.97156 16.8446 5.67691 16.3593 5.47589C15.874 5.27487 15.3538 5.1714 14.8285 5.1714C14.3032 5.1714 13.7831 5.27487 13.2977 5.47589C12.8124 5.67691 12.3715 5.97156 12 6.343L10.586 7.757L9.17201 6.343L10.586 4.929C11.7143 3.81892 13.2356 3.19966 14.8184 3.2061C16.4012 3.21255 17.9174 3.84418 19.0366 4.96341C20.1558 6.08265 20.7875 7.5988 20.7939 9.18162C20.8004 10.7644 20.1811 12.2857 19.071 13.414L17.657 14.828ZM14.828 17.657L13.414 19.071C12.8585 19.6356 12.1968 20.0846 11.4669 20.3922C10.737 20.6998 9.95343 20.8598 9.16139 20.863C8.36936 20.8662 7.58452 20.7126 6.85215 20.411C6.11979 20.1094 5.45438 19.6658 4.89432 19.1057C4.33426 18.5456 3.89063 17.8802 3.58902 17.1479C3.28741 16.4155 3.13379 15.6307 3.13701 14.8386C3.14024 14.0466 3.30025 13.263 3.60781 12.5331C3.91538 11.8033 4.36441 11.1415 4.92901 10.586L6.34301 9.172L7.75701 10.586L6.34301 12C5.97157 12.3714 5.67692 12.8124 5.4759 13.2977C5.27488 13.783 5.17141 14.3032 5.17141 14.8285C5.17141 15.3538 5.27488 15.874 5.4759 16.3593C5.67692 16.8446 5.97157 17.2856 6.34301 17.657C6.71446 18.0284 7.15543 18.3231 7.64074 18.5241C8.12605 18.7251 8.64621 18.8286 9.17151 18.8286C9.69681 18.8286 10.217 18.7251 10.7023 18.5241C11.1876 18.3231 11.6286 18.0284 12 17.657L13.414 16.243L14.828 17.657ZM14.828 7.757L16.243 9.172L9.17201 16.242L7.75701 14.828L14.828 7.758V7.757Z" fill="black"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_42_6509">
                          <rect width="24" height="24" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </li>
                  <li class="_mention">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_42_3275)">
                        <path d="M20 12C19.9998 10.2169 19.4039 8.48494 18.3069 7.07919C17.2099 5.67345 15.6747 4.67448 13.9451 4.24094C12.2155 3.80739 10.3906 3.96411 8.76028 4.68621C7.12992 5.40831 5.78753 6.65439 4.94629 8.22659C4.10504 9.79879 3.81316 11.607 4.11699 13.364C4.42083 15.1211 5.30296 16.7262 6.62331 17.9246C7.94366 19.1231 9.62653 19.846 11.4047 19.9787C13.1829 20.1114 14.9544 19.6462 16.438 18.657L17.548 20.321C15.9062 21.4187 13.975 22.0032 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12V13.5C22.0001 14.2488 21.7601 14.9778 21.3152 15.5801C20.8703 16.1823 20.244 16.626 19.5283 16.846C18.8126 17.066 18.0453 17.0507 17.3389 16.8023C16.6326 16.5539 16.0245 16.0855 15.604 15.466C14.9366 16.16 14.083 16.6465 13.1457 16.8671C12.2085 17.0877 11.2275 17.033 10.3206 16.7096C9.41366 16.3861 8.61943 15.8077 8.03331 15.0438C7.44718 14.2799 7.09408 13.363 7.01644 12.4033C6.9388 11.4436 7.13991 10.4819 7.59562 9.63367C8.05133 8.78549 8.74225 8.08692 9.58537 7.6219C10.4285 7.15688 11.3879 6.94519 12.3485 7.01227C13.309 7.07934 14.2297 7.42232 15 8H17V13.5C17 13.8978 17.158 14.2794 17.4393 14.5607C17.7206 14.842 18.1022 15 18.5 15C18.8978 15 19.2794 14.842 19.5607 14.5607C19.842 14.2794 20 13.8978 20 13.5V12ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z" fill="black"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_42_3275">
                          <rect width="24" height="24" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </li>
                  <li class="_emoji">
                    <button id="control-emoji-button" type="button"></button>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_42_11332)">
                        <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM8 13H16C16 14.0609 15.5786 15.0783 14.8284 15.8284C14.0783 16.5786 13.0609 17 12 17C10.9391 17 9.92172 16.5786 9.17157 15.8284C8.42143 15.0783 8 14.0609 8 13ZM8 11C7.60218 11 7.22064 10.842 6.93934 10.5607C6.65804 10.2794 6.5 9.89782 6.5 9.5C6.5 9.10218 6.65804 8.72064 6.93934 8.43934C7.22064 8.15804 7.60218 8 8 8C8.39782 8 8.77936 8.15804 9.06066 8.43934C9.34196 8.72064 9.5 9.10218 9.5 9.5C9.5 9.89782 9.34196 10.2794 9.06066 10.5607C8.77936 10.842 8.39782 11 8 11ZM16 11C15.6022 11 15.2206 10.842 14.9393 10.5607C14.658 10.2794 14.5 9.89782 14.5 9.5C14.5 9.10218 14.658 8.72064 14.9393 8.43934C15.2206 8.15804 15.6022 8 16 8C16.3978 8 16.7794 8.15804 17.0607 8.43934C17.342 8.72064 17.5 9.10218 17.5 9.5C17.5 9.89782 17.342 10.2794 17.0607 10.5607C16.7794 10.842 16.3978 11 16 11Z" fill="black"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_42_11332">
                          <rect width="24" height="24" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </li>
                </ul>`;
    }
    let panel = document.createElement('div');
    panel.classList.add('_control-panel');
    panel.innerHTML = __buildControlPanelInnerElement();
    /*TODO Add Event*/
    let control_buttons = panel.querySelectorAll('ul li');
    control_buttons.forEach(function (control_button) {
        control_button.addEventListener('click', sendContainerControlOptionClickEventListener);
    });
    return panel;
}
/*TODO Create Message Element*/
const createMessageElement = (message, is_side = false) => {
    const __buildMessageInnerElement = (message, is_side) => {
        if (findChatMessageType(message.type) === CHAT_MESSAGE_TYPE.TEXT) {
            return `<div class="media">
                  <a class="mr-3" href="#">
                    <div class="_profile" style="background-image: url('${message.profile.url}')"></div>
                  </a>
                  <div class="media-body">
                    <div class="mt-0 media-title">
                      <div class="_name">
                        ${message.name}
                      </div>
                      <div class="_date">
                        <span class="__meridian">${changeLocalDateTimeToMeridian(message.date)}</span>
                        <span class="__time">${changeLocalDateTimeToMm_ss(message.date)}</span>
                      </div>
                    </div>
                    <div class="_content">
                      ${message.content}${message.edited ? '<span class="_edited">(편집됨)</span>' : ''}
                    </div>
                    ${createMessageReactionsElement(message.reactions, true)}
                    ${!is_side ? createMessageMoresElement(message.threads, true) : ''}
                  </div>
                </div>`;
        } else if (findChatMessageType(message.type) === CHAT_MESSAGE_TYPE.FILE) {
            return `<div class="media">
                  <a class="mr-3" href="#">
                    <div class="_profile" style="background-image: url('${message.profile.url}')"></div>
                  </a>
                  <div class="media-body">
                    <div class="mt-0 media-title">
                      <div class="_name">
                        ${message.name}
                      </div>
                      <div class="_date">
                        <span class="__meridian">${changeLocalDateTimeToMeridian(message.date)}</span>
                        <span class="__time">${changeLocalDateTimeToMm_ss(message.date)}</span>
                      </div>
                    </div>
                    <div class="_content">
                      ${createMessageFilesElementOuterHTML(message.files, true)}${message.edited ? '<span class="_edited">(편집됨)</span>' : ''}
                    </div>
                    ${createMessageReactionsElement(message.reactions, true)}
                    ${!is_side ? createMessageMoresElement(message.threads, true) : ''}
                  </div>
                </div>`;
        }
    }
    let message_elem = document.createElement('div');
    message_elem.classList.add('chat-item');
    ['data-id', 'data-bookmark'].forEach(function (key) {
        let value = key.replace('data-', '');
        if (message.hasOwnProperty(value)) {
            message_elem.setAttribute(key, message[value]);
        }
    });
    message_elem.innerHTML = __buildMessageInnerElement(message, is_side);
    /*TODO Message Initialize Event*/
    messageMenuEvent(message_elem, messageMenuEnterEvent, messageMenuLeaveEvent);
    messageElementEvent(message_elem, messageReactionClickEventListener, messageThreadClickEventListener);
    /*TODO FileType Message Initialize Event*/
    if (findChatMessageType(message.type) === CHAT_MESSAGE_TYPE.FILE) {
        messageFileElementEvent(message_elem, messageFileDownloadClickEvent);
    }
    return message_elem;
}
const createMessageFilesElementOuterHTML = (files) => {
    let file_elems_html = '';
    files.forEach(function (file) {
        file_elems_html += createMessageFileElement(file, true);
    });
    return file_elems_html;
}
const createMessageFileElement = (file, is_outer) => {
    const __buildFileImgInnerElement = (file) => {
        return `<div class="_image" style="background-image: url('${file.url}')"></div>
                <div class="_file-info">
                  <span class="_name regular-h6" data-toggle="tooltip" data-placement="bottom" title="${file.name}">${file.name}</span>
                  <span class="_download medium-h6" data-url="${file.url}" data-name="${file.name}">Download</span>
                </div>`;
    }
    const __buildFileGeneralInnerElement = (file) => {
        return `<div class="_file"></div>
                <div class="_file-info">
                  <span class="_name regular-h6" data-toggle="tooltip" data-placement="bottom" title="${file.name}">${file.name}</span>
                  <span class="_download medium-h6" data-url="${file.url}" data-name="${file.name}">Download</span>
                </div>`;
    }
    let file_elem = document.createElement('div');
    let allowedExtension = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/svg+xml'];
    file_elem.classList.add('_comment-file');
    if (allowedExtension.indexOf(file.type) > -1) {
        file_elem.innerHTML = __buildFileImgInnerElement(file);
    } else {
        file_elem.classList.add('_file');
        file_elem.innerHTML = __buildFileGeneralInnerElement(file);
    }
    if (is_outer) {
        return file_elem.outerHTML;
    } else {
        return file_elem;
    }
}
const createMessageReactionsElement = (reactions, is_outer) => {
    let container = document.createElement('div');
    container.classList.add('_reactions');
    if (!reactions) {
        reactions = [];
    }
    reactions.forEach(function (reaction) {
        let reaction_elem = createMessageReactionElement(reaction);
        reaction_elem.addEventListener('click', messageReactionClickEventListener);
        container.append(reaction_elem);
    });
    if (is_outer) {
        return reactions.length !== 0 ? container.outerHTML : '';
    } else {
        return reactions.length !== 0 ? container : undefined;
    }
}
const createMessageReactionElement = (reaction) => {
    const __buildReactionInnerElement = (reaction) => {
        return `<div class="_emoji">${reaction.emoji}</div>
                <div class="_count" data-count="${reaction.count}">${((reaction.count * 1)) <= 99 ? (reaction.count * 1) : '99+'}
                </div>`;
    }
    let reaction_elem = document.createElement('div');
    reaction_elem.classList.add('_reaction');
    reaction.active ? reaction_elem.classList.add('is-active') : reaction_elem.classList.contains('is-active') ? reaction_elem.classList.remove('is-active') : '';
    reaction_elem.setAttribute('data-title', reaction.title);
    reaction_elem.innerHTML = __buildReactionInnerElement(reaction);
    return reaction_elem;
}
const createMessageMoresElement = (threads, is_outer) => {
    const __buildMoresInnerElement = (threads) => {
        return `  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_42_9962)">
                      <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="black"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_42_9962">
                        <rect width="24" height="24" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <div>
                    <span class="_count">${threads}</span>개의 댓글
                  </div>`;
    }
    let container = document.createElement('div');
    container.classList.add('_mores');
    if (threads === undefined || threads === null) {
        threads = 0;
    }
    container.innerHTML = __buildMoresInnerElement(threads);
    if (is_outer) {
        return threads !== 0 ? container.outerHTML : '';
    } else {
        return threads !== 0 ? container : undefined;
    }
}

function getTypeAndValue() {
    const path = window.location.pathname;
    const obj = {};
    if (path.includes('/chat/channel/my')) {
        obj.type = 'MY';
    } else {
        if (path.includes('/chat/channel/direct')) {
            obj.type = 'DIRECT';
        } else {
            obj.type = 'GROUP';
        }
        obj.value = getURLLastParameter();
    }
    return obj;
}

function getWebsocketParameter(channel_hash) {
    let object = getTypeAndValue();
    if (object.type !== 'GROUP') {
        object.value = channel_hash;
    }
    return object.value;
}
