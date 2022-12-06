'use strict';

// 1번
async function getProjects() {
    function apiGetProjects() {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        const response = fetch(`${host}/crm/get/projects`, requestOptions);
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiGetProjects();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// 3번
async function getUserTasks(type) {
    function apiGetUserTasks(type) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        const response = fetch(`${host}/crm/get/member/tasks?type=${type}`, requestOptions);
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiGetUserTasks(type);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// 4번
async function createProject(project) {
    function apiCreateProject(project) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let raw = JSON.stringify(project);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        const response = fetch(`${host}/crm/create/project`, requestOptions);
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiCreateProject(project);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// 6번
async function updateProject(project) {
    function apiUpdateProject(project) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let raw = JSON.stringify(project);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        const response = fetch(`${host}/crm/update/project`, requestOptions);
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiUpdateProject(project);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// 10번
async function createBoard(board) {
    function apiCreateBoard(board) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let raw = JSON.stringify(board);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        const response = fetch(`${host}/crm/create/board`, requestOptions);
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiCreateBoard(board);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// 16번
async function createTask(task) {
    function apiCreateTask(task) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let raw = JSON.stringify(task);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        const response = fetch(`${host}/crm/create/task`, requestOptions);
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiCreateTask(task);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// 21번
async function getTaskDetail(task_id) {
    function apiGetTaskDetail(task_id) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        const response = fetch(`${host}/crm/get/task/${task_id}`, requestOptions);
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiGetTaskDetail(task_id);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// 22번
async function addTaskMember(task_id, member_no) {
    function apiAddTaskMember(task_id, member_no) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let object = {
            "id": task_id,
            "member_no": member_no
        }
        let raw = JSON.stringify(object);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        const response = fetch(`${host}/crm/update/task/member/add`, requestOptions);
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiAddTaskMember(task_id, member_no);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// 23번
async function removeTaskMember(task_id, member_no) {
    function apiRemoveTaskMember(task_id, member_no) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let object = {
            "id": task_id,
            "member_no": member_no
        }
        let raw = JSON.stringify(object);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        const response = fetch(`${host}/crm/update/task/member/remove`, requestOptions);
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiRemoveTaskMember(task_id, member_no);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// 27번
async function changeTaskThumbnail(task_id, file) {
    function apiChangeTaskThumbnail(task_id, file) {
        const formData = new FormData();
        formData.append('file', file);

        let requestOptions = {
            method: 'POST',
            body: formData,
        };
        const response = fetch(`${host}/crm/update/task/${task_id}/thumbnail`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiChangeTaskThumbnail(task_id, file);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// 30번
async function createSubTask(subtask) {
    function apiCreateSubTask(subtask) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let raw = JSON.stringify(subtask);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        const response = fetch(`${host}/crm/create/subtask`, requestOptions);
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiCreateSubTask(subtask);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//31번
async function deleteSubTask(subtask_id) {
    function apiDeleteSubTask(subtask_id) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
        };

        const response = fetch(`${host}/crm/delete/subtask/${subtask_id}`, requestOptions);
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiDeleteSubTask(subtask_id);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// 32번
async function getTaskAvailableMembers(task_id) {
    function apiGetTaskAvailableMembers(task_id) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        const response = fetch(`${host}/crm/get/task/${task_id}/members/available`, requestOptions);
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiGetTaskAvailableMembers(task_id);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// 33번
async function getTaskComments(task_id) {
    function apiGetTaskComments(task_id) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        const response = fetch(`${host}/crm/get/task/${task_id}/comments`, requestOptions);
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiGetTaskComments(task_id);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// 34번
async function addTaskComment(comment) {
    function apiGetTaskComments(comment) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let raw = JSON.stringify(comment);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        const response = fetch(`${host}/crm/create/task/comment`, requestOptions);
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiGetTaskComments(comment);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// 36번
async function getTaskFiles(task_id) {
    function apiGetTaskFiles(task_id) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        const response = fetch(`${host}/crm/get/task/${task_id}/files`, requestOptions);
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiGetTaskFiles(task_id);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// 37번
async function getProjectFiles(hash) {
    function apiGetProjectFiles(hash) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        const response = fetch(`${host}/crm/get/project/${hash}/files`, requestOptions);
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiGetProjectFiles(hash);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// 39번
async function createFileComment(task_id, file) {
    function apiCreateFileComment(task_id, file) {
        const formData = new FormData();
        formData.append('file', file);

        let requestOptions = {
            method: 'POST',
            body: formData,
        };
        const response = fetch(`${host}/crm/create/task/${task_id}/comment/file`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiCreateFileComment(task_id, file);
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function apiChangeTaskPluginUrl(task_id, plugin_type, content) {
    function apiFetchChangeTaskPluginUrl(task_id, plugin_type, content) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let raw = JSON.stringify({task_id, plugin_type, content});
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        const response = fetch(`${host}/crm/create/task/comment`, requestOptions);
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiFetchChangeTaskPluginUrl(task_id, plugin_type, content);
        return result;
    } catch (error) {
        console.log(error);
    }
}