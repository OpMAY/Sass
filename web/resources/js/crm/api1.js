'use strict';
document.addEventListener('DOMContentLoaded', function () {
    let temp_hash = 'NSzLGByKc8ZJ+xUyjF2Vwg=='; //1번 프로젝트 hash
    let temp_board_id = '3fq4ku8z';
    let temp_task_id = "9u8xcibk";
    //TODO Error
    /*apiCopyBoard(temp_board_id).then((result) => {
        console.log('apiCopyBoard', result);
    });*/
});

//TODO 2번 - 우식, 지우
async function apiGetProject(hash) {
    function apiFetchGetProject() {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        const response = fetch(`${host}/crm/project/${hash}/data`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchGetProject(hash);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 5번 - 우식
async function apiDeleteProject(hash) {
    function apiFetchDeleteProject() {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
        };
        const response = fetch(`${host}/crm/delete/project/${hash}`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchDeleteProject(hash);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 7번 - 우식
async function apiCopyProject(hash) {
    function apiFetchCopyProject() {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
        };
        const response = fetch(`${host}/crm/copy/project/${hash}`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchCopyProject(hash);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 8번 - 우식
//TODO type is task, board, subtask
async function apiTokenValidate(token, type) {
    function apiFetchTokenValidate(token, type) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        const response = fetch(`${host}/crm/token/validate/${token}/${type}`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchTokenValidate(token, type);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 9번 - 우식
async function apiCopyBoard(board_id) {
    function apiFetchCopyBoard(board_id) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
        };
        const response = fetch(`${host}/crm/copy/board/${board_id}`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchCopyBoard(board_id);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 11번 - 우식
async function apiChangeBoardName(board_id, name) {
    function apiFetchChangeBoardName(board_id, name) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let raw = JSON.stringify({id: board_id, name});
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/crm/update/board/name`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchChangeBoardName(board_id, name);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 12번 - 우식
async function apiChangeBoardOrder(board_id, order) {
    function apiFetchChangeBoardOrder(board_id, order) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let raw = JSON.stringify({id: board_id, order});
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/crm/update/board/order`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchChangeBoardOrder(board_id, order);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 13번 - 우식
async function apiDeleteBoard(board_id) {
    function apiFetchDeleteBoard(board_id) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
        };
        const response = fetch(`${host}/crm/delete/board/${board_id}`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchDeleteBoard(board_id);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 14번 - 우식
async function apiUpdateTaskStatus(task_id) {
    function apiFetchUpdateTaskStatus(task_id) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
        };
        const response = fetch(`${host}/crm/update/task/${task_id}/status`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchUpdateTaskStatus(task_id);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 15번 - 우식
async function apiCopyTask(task_id) {
    function apiFetchCopyTask(task_id) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
        };
        const response = fetch(`${host}/crm/copy/task/${task_id}`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchCopyTask(task_id);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 17번 - 우식
async function apiChangeTaskOrder(task_id, order) {
    function apiFetchChangeTaskOrder(task_id, order) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let raw = JSON.stringify({id: task_id, order});
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/crm/update/task/order`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchChangeTaskOrder(task_id, order);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 18번 - 우식
async function apiChangeTaskName(task_id, name) {
    function apiFetchChangeTaskName(task_id, name) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let raw = JSON.stringify({id: task_id, name});
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/crm/update/task/name`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchChangeTaskName(task_id, name);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 19번 - 우식
async function apiDeleteTask(task_id) {
    function apiFetchDeleteTask(task_id) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
        };
        const response = fetch(`${host}/crm/delete/task/${task_id}`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchDeleteTask(task_id);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 20번 - 우식
async function apiMoveTaskToOtherBoard(task_id, board_id, order) {
    function apiFetchMoveTaskToOtherBoard(task_id, board_id, order) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let raw = JSON.stringify({task_id, board_id, order});
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/crm/update/task/move`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchMoveTaskToOtherBoard(task_id, board_id, order);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 21번 - 우식, 지우
async function apiGetTask(task_id) {
    function apiFetchGetTask(task_id) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        const response = fetch(`${host}/crm/get/task/${task_id}`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchGetTask(task_id);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 24번 - 우식
async function apiChangeTaskStart(task_id, start_date) {
    function apiFetchChangeTaskStart(task_id, start_date) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let raw = JSON.stringify({id: task_id, date: start_date});
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/crm/update/task/start_date`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchChangeTaskStart(task_id, start_date);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 25번 - 우식
async function apiChangeTaskEnd(task_id, end_date) {
    function apiFetchChangeTaskEnd(task_id, end_date) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let raw = JSON.stringify({id: task_id, date: end_date});
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/crm/update/task/end_date`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchChangeTaskEnd(task_id, end_date);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 26번 - 우식
async function apiChangeTaskDescription(task_id, description) {
    function apiFetchChangeTaskDescription(task_id, description) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let raw = JSON.stringify({id: task_id, description});
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/crm/update/task/description`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchChangeTaskDescription(task_id, description);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 28번 - 우식
async function apiChangeSubTaskStatus(subtask_id) {
    function apiFetchChangeSubTaskStatus(subtask_id) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
        };
        const response = fetch(`${host}/crm/update/task/subtask/${subtask_id}/status`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchChangeSubTaskStatus(subtask_id);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 29번 - 우식
async function apiChangeSubTaskName(subtask_id, name) {
    function apiFetchChangeSubTaskName(subtask_id, name) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let raw = JSON.stringify({id: subtask_id, name});
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/crm/update/task/subtask/name`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchChangeSubTaskName(subtask_id, name);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 31번 - 우식
async function apiDeleteSubTask(subtask_id) {
    function apiFetchDeleteSubTask(subtask_id) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
        };
        const response = fetch(`${host}/crm/delete/subtask/${subtask_id}`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchDeleteSubTask(subtask_id);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 35번 - 우식
async function apiDeleteTaskComment(comment_no) {
    function apiFetchDeleteTaskComment(comment_no) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
        };
        const response = fetch(`${host}/crm/delete/comment/${comment_no}`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchDeleteTaskComment(comment_no);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO 38번 - 우식
async function apiDeleteFile(file_no) {
    function apiFetchDeleteFile(file_no) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Content-Api", tokenGenerator(8));
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
        };
        const response = fetch(`${host}/crm/delete/file/${file_no}`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchDeleteFile(comment_no);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}