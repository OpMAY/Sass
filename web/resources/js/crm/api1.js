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
function apiTokenValidate(token, type) {
    let result;
    $.ajax({
        type: 'GET', //요청 메소드 타입
        //type = table or row
        url: `${host}/crm/token/validate/${token}/${type}`, //요청 경로
        async: false, //비동기 여부
        cache: false, //캐시 여부
        contentType: 'application/json', //요청 컨텐트 타입 "application/x-www-form-urlencoded; charset=UTF-8"
        dataType: 'json', //응답 데이터 형식 명시하지 않을 경우 자동으로 추측
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Api", tokenGenerator(8));
        },
        success: function (data, status, xhr) {
            // 정상적으로 응답 받았을 경우에는 success 콜백이 호출되게 됩니다.
            // 이 콜백 함수의 파라미터에서는 응답 바디, 응답 코드 그리고 XHR 헤더를 확인할 수 있습니다.
            console.log('apiTokenValidate', data);
            result = data.status;
        },
        error: function (xhr, status, error) {
            // 응답을 받지 못하였다거나 정상적인 응답이지만 데이터 형식을 확인할 수 없기 때문에 error 콜백이 호출될 수 있습니다.
            // 예를 들어, dataType을 지정해서 응답 받을 데이터 형식을 지정하였지만, 서버에서는 다른 데이터형식으로 응답하면  error 콜백이 호출되게 됩니다.
            throw new Error(`Error :: status : ${status}, error : ${error}`);
        }
    });
    return result;
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

function boardsTypeChanger(back_boards) {
    let boards = new Array();
    back_boards.forEach(function (back_board) {
        let board = {
            id: back_board.id,
            title: back_board.name,
            class: 'class1, class2, class3',
            percent: 0,
            item: tasksTypeChanger(back_board.taskList)
        };
        boards.push(board);
    });
    return boards;
}

function tasksTypeChanger(back_tasks) {
    let tasks = new Array();
    back_tasks.forEach(function (back_task) {
        let task = taskTypeChanger(back_task);
        tasks.push(task);
    });
    return tasks;
}

function taskTypeChanger(back_task) {
    let task = {
        id: back_task.id,
        title: back_task.title,
        complete: back_task.complete,
        cover: back_task.thumbnail != null ? back_task.thumbnail : undefined,
        profiles: taskProfilesChanger(back_task.collaborators),
        work: 0,
        subtasks: subTasksTypeChanger(back_task.subTasks),
        start_date: back_task.start_date,
        end_date: back_task.end_date
    };
    return task;
}

function subTasksTypeChanger(back_subTasks) {
    let subtasks = new Array();
    back_subTasks?.forEach(function (back_subTask) {
        let subtask = subTaskTypeChanger(back_subTask);
        subtasks.push(subtask);
    });
    return subtasks;
}

function subTaskTypeChanger(back_subTask) {
    let subtask = {
        id: back_subTask.id,
        title: back_subTask.title,
        complete: back_subTask.complete,
        work: 0
    };
    return subtask;
}

function taskProfilesChanger(back_profiles) {
    let profiles = new Array();
    back_profiles?.forEach(function (back_profile) {
        let profile = taskProfileChanger(back_profile);
        profiles.push(profile);
    });
    return profiles;
};

function taskProfileChanger(back_profile) {
    let profile = {
        url: back_profile.profile_img.url,
        name: back_profile.name,
        no: back_profile.no
    }
    return profile;
}