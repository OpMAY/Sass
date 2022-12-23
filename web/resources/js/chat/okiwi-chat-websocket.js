'use strict'

/**
 * Chat Websocket 함수들의 집합
 * Switch문 안에서 사용될 함수
 * */

function receiveNewMessage(message) {
    if (_CHAT_CONTAINER) {
        if(message.parent_message_id !== undefined) {
            if(RIGHT_THREAD_CONTAINER && RIGHT_THREAD_CONTAINER.dataset.id === message.parent_message_id) {
                RIGHT_SUB_THREADS_CONTAINER.append(createMessageElement(message, true));
                updateChatContainerScroll(RIGHT_THREAD_SCROLL_CONTAINER);
            } else {
                let message_elem = _CHAT_CONTAINER.querySelector(`.chat-item[data-id="${message.parent_message_id}"]`);
                console.log(`.chat-item[data-id="${message.id}"]`)
                console.log('message_elem', message_elem)
                let original_count = $(message_elem).find('._count').html() * 1;
                $(message_elem).find('._count').html((original_count + 1))
            }
        } else {
            _CHAT_CONTAINER.append(createMessageElement(message));
            updateChatContainerScroll(_CHAT_CONTAINER);
        }
    }
}