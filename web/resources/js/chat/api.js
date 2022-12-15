async function uploadChatFile(file) {
    function apiUploadChatFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        let requestOptions = {
            method: 'POST',
            body: formData,
        };
        const response = fetch(`${host}/crm/upload/file`, requestOptions);
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