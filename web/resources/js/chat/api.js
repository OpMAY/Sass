async function uploadChatFile(file) {
    function apiUploadChatFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        let requestOptions = {
            method: 'POST',
            body: formData,
        };
        const response = fetch(`/chat/upload/file`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiUploadChatFile(file);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// TODO 1. channel 메세지 가져오기 (Main) -> 지우씨
async function getChannelMessages(type, value, last_message_id) {
    function getChannelMessages(type, value, last_message_id) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        console.log(`/chat/channel/messages?type=${type}${value !== null ? '&value=' + value : ''}${last_message_id !== null ? '&last_message_id=' + last_message_id : ''}`);
        const response = fetch(`/chat/channel/messages?type=${type}${value !== null ? '&value=' + value : ''}${last_message_id !== null ? '&last_message_id=' + last_message_id : ''}`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await getChannelMessages(type, value, last_message_id);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// TODO 2. channels, users 가져오기 (Left) -> 지우씨
async function getCompanyChannelsAndMembers() {
    function getCompanyChannelsAndMembers() {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        const response = fetch(`/chat/info`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await getCompanyChannelsAndMembers();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// TODO 3. Thread 가져오기 (Right) -> 지우씨
async function getThreadMessages(message_id, last_message_id) {
    function getThreadMessages(message_id, last_message_id) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        const response = fetch(`/chat/channel/thread/messages?message_id=${message_id}${last_message_id !== null ? '&last_message_id=' + last_message_id : ''}`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await getThreadMessages(message_id, last_message_id);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// TODO 9. Message 보내기 (Main, Right), 10. File Message 보내기 (Main, Right) -> 지우씨
async function sendMessage(chatMessage, info) {
    function sendMessage(chatMessage, info) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(chatMessage),
        };
        const response = fetch(`/chat/send/message?type=${info.type}${info.value ? '&value=' + info.value : ''}`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await sendMessage(chatMessage, info);
        return result;
    } catch (error) {
        console.log(error);
    }
}