'use strict'

/**
 * {
 *     id: channel.dataset.id, bookmark: false
 * }
 * */
async function updateChannelLike(channel) {
    function apiFetch(channel) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let raw = JSON.stringify(channel);
        const response = fetch(`/chat/update/channel/like`, {
            method: 'POST',
            headers: myHeaders,
            body: raw
        });
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiFetch(channel);
        return result;
    } catch (error) {
        console.log(error);
    }
}

/**
 * {
 *     message_id,
 *     title: tokenGenerator(8),
 *     reaction: selected_emoji,
 * }
 * */
async function createReaction(reaction) {
    function apiFetch(reaction) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let raw = JSON.stringify(reaction);
        const response = fetch(`/chat/create/message/reaction`, {
            method: 'POST',
            headers: myHeaders,
            body: raw
        });
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiFetch(reaction);
        return result;
    } catch (error) {
        console.log(error);
    }
}

/**
 * {
 *     message_id,
 *     title: tokenGenerator(8),
 *     reaction: selected_emoji,
 * }
 * */
async function removeReaction(reaction) {
    function apiFetch(reaction) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let raw = JSON.stringify(reaction);
        const response = fetch(`/chat/delete/message/reaction`, {
            method: 'POST',
            headers: myHeaders,
            body: raw
        });
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiFetch(reaction);
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function updateMessageBookmark(message) {
    function apiFetch(message) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let raw = JSON.stringify(message);
        const response = fetch(`/chat/update/message/bookmark`, {
            method: 'POST',
            headers: myHeaders,
            body: raw
        });
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiFetch(message);
        return result;
    } catch (error) {
        console.log(error);
    }
}