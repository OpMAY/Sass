const RIGHT_TASK_CONTAINER = document.querySelector('#okiwi-crm-right-side');
document.addEventListener('DOMContentLoaded', function () {
    if (RIGHT_TASK_CONTAINER !== null && RIGHT_TASK_CONTAINER !== undefined) {
        initializeRightTask();
    } else {
        throw new Error('RIGHT_TASK_CONTAINER is null or undefined');
    }
});

const initializeRightTask = () => {
    //TODO Control Panel
    //TODO File Message
    RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._control-panel ._file').addEventListener('click', rightTaskMessageFileUploadEventListener);
    //TODO Datepicker (start_date & end_date)
    $('#start').datepicker({
        container: '.start-datepicker-container',
        language: 'ko',
        autoclose: true,
    }).on('input', rightTaskDatepickerInputEventListener).on('changeDate', rightTaskStartDatePickerChangeEventListener);
    $('#end').datepicker({
        container: '.end-datepicker-container',
        language: 'ko',
        autoclose: true,
    }).on('input', rightTaskDatepickerInputEventListener).on('changeDate', rightTaskEndDatePickerChangeEventListener);
    //TODO Delete & Close
    RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._header ._delete').addEventListener('click', rightTaskDeleteClickEventListener);
    RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._header ._back').addEventListener('click', rightTaskBackClickEventListener);
    //TODO Title
    RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._title input').addEventListener('keydown', rightTaskTitleKeydownEventListener);
    RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._title input').addEventListener('keyup', rightTaskTitleKeyupEventListener);
    RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._title input').addEventListener('input', debounce(rightTaskTitleInputEventListener, 300));
    //TODO Checkbox
    RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._title .checkbox').addEventListener('click', rightTaskCheckboxClickEventListener);
    //TODO Content
    RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab .content-editable-container').addEventListener('keydown', rightTaskContentKeydownEventListener);
    RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab .content-editable-container').addEventListener('keyup', rightTaskContentKeyupEventListener);
    RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab .content-editable-container').addEventListener('input', debounce(rightTaskContentInputEventListener, 300));
    //TODO Dropdowns Assign Event
    $('.right-side-inner ._info ._assign .user-item-container .dropright').on('show.bs.dropdown', rightTaskUserAssignDropdownUpdateItems);
    $('.right-side-inner ._info ._assign .user-item-container .dropright').on('hide.bs.dropdown', rightTaskUserAssignDropdownClearItems);
    //TODO Dropdowns Assign Event Add
    $('.right-side-inner ._info ._assign .user-item-container .dropright .dropdown-menu').on('click', '.dropdown-item', rightTaskUserAssignAddClickEventListener);
    //TODO Figma & Query Preview Event Add
    let previews = RIGHT_TASK_CONTAINER.querySelectorAll('.right-side-inner ._plugin');
    previews.forEach(function (preview) {
        /*TODO Preview Event Add*/
        preview.querySelector('input').addEventListener('keydown', rightTaskPluginInputKeyDownEventListener);
        preview.querySelector('input').addEventListener('keyup', rightTaskPluginInputKeyUpEventListener);
        preview.querySelector('input').addEventListener('input', debounce(rightTaskPluginInputKeyInputEventListener, 300));
        preview.querySelector('._preview').addEventListener('click', rightTaskPluginPreviewClickEventListener);
    });
    //TODO Subtask
    RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._subtasks .subtask-item.add').addEventListener('click', rightTaskSubTaskAddClickEventListener);
    //TODO Comment
    RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._comment-input-container #comment-input').addEventListener('keydown', rightTaskCommentKeydownEventListener);
    RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._comment-input-container #comment-input').addEventListener('keyup', rightTaskCommentKeyupEventListener);
    RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._comment-input-container #comment-input').addEventListener('input', rightTaskCommentInputEventListener);
    RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._comment-input-container ._write').addEventListener('click', rightTaskCommentWriteEventListener);
    //TODO Content Hide Button
    RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._content-container-remover').addEventListener('click', function (event) {
        let icon = this.querySelector('i.far');
        if (!icon.classList.contains('fa-eye')) {
            //Show
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
            rightTaskShowContent(this);
        } else {
            //Hide
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
            rightTaskHideContent(this);
        }
    });
    //TODO Click OutSide Close Event
    $(document).on('click', '#okiwi-crm-right-side', function (event) {
        if (event.target.closest('.right-side-inner') === null || event.target.closest('.right-side-inner') === undefined) {
            rightTaskClose();
        }
    });
    // TODO Click Tab
    $(RIGHT_TASK_CONTAINER).on('click', '.nav-item', rightTaskTabChangeEventListener);
};

const rightTaskShowContent = (icon) => {
    let content = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab .content-editable-container');
    if (!content.classList.contains('is-hide')) {
        content.classList.add('is-hide');
        icon.classList.add('is-hide');
    }
}

const rightTaskHideContent = (icon) => {
    let content = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab .content-editable-container');
    if (content.classList.contains('is-hide')) {
        content.classList.remove('is-hide');
        icon.classList.remove('is-hide');
    }
}

const rightTaskClose = () => {
    console.log('rightTaskClose');
    if (!RIGHT_TASK_CONTAINER.classList.contains('is-close')) {
        RIGHT_TASK_CONTAINER.classList.add('is-close');
    }
    setTimeout(function () {
        if (!RIGHT_TASK_CONTAINER.classList.contains('is-closed')) {
            RIGHT_TASK_CONTAINER.classList.add('is-closed');
        }
        rightTaskClear();
    }, 100);
}

const rightTaskOpen = (task_id) => {
    console.log('rightTaskOpen');
    if (RIGHT_TASK_CONTAINER.classList.contains('is-closed')) {
        RIGHT_TASK_CONTAINER.classList.remove('is-closed');
    }
    setTimeout(function () {
        if (RIGHT_TASK_CONTAINER.classList.contains('is-close')) {
            RIGHT_TASK_CONTAINER.classList.remove('is-close');
        }
        rightTaskClear();
        rightTaskReInitialize(task_id);
    }, 100);
}

const rightTaskClear = () => {
    console.log('rightTaskClear');
    RIGHT_TASK_CONTAINER.removeAttribute('data-id');
    rightTaskCheckboxClear();
    rightTaskTitleClear();
    rightTaskAssignClear();
    rightTaskWorkTimeClear();
    rightTaskContentClear();
    rightTaskSubtasksClear();
    rightTaskCommentsClear();
    rightTaskFilesClear();
    rightTaskTabClear();
}

const rightTaskCheckboxClear = () => {
    let checkbox_input = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._title .checkbox');
    if (checkbox_input.classList.contains('is-checked')) {
        checkbox_input.classList.remove('is-checked');
    }
}

const rightTaskTitleClear = () => {
    let title = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._title input');
    title.value = '';
}

const rightTaskAssignClear = () => {
    let assign_user_container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner ._info ._assign .user-item-container');
    let assign_users = assign_user_container.querySelectorAll('.user-item:not(.add)');
    assign_users.forEach(function (assign_user) {
        assign_user.remove();
    });
}

const rightTaskWorkTimeClear = () => {
    let start_date = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner ._info #start');
    let end = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner ._info #end');
    start_date.value = '';
    end.value = '';
}

const rightTaskContentClear = () => {
    let content = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab .content-editable-container');
    content.innerHTML = '';
}

const rightTaskSubtasksClear = () => {
    let subtasks_container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._subtasks');
    let subtasks = subtasks_container.querySelectorAll('.subtask-item:not(.add)');
    subtasks.forEach(function (subtask) {
        subtask.remove();
    });
}

const rightTaskCommentsClear = () => {
    let comments_container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._comments');
    let comments = comments_container.querySelectorAll('.comment-item');
    comments.forEach(function (comment) {
        comment.remove();
    });

    let comment_input = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._comment-input-container #comment-input');
    comment_input.value = '';
}

const rightTaskFilesClear = () => {
    let files_container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._files-container');
    let date_items = files_container.querySelectorAll('.date-item');
    date_items.forEach(function (date_item) {
        date_item.remove();
    });
}

// Tab 초기화 - 지우 added
const rightTaskTabClear = () => {
    let tab = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab #task-tab');
    $(tab).find('#task-content-tab').click();
}

//TODO 20221102 - 21번 - 지우, 우식
const rightTaskReInitialize = (task_id) => {
    console.log('rightTaskReInitialize', task_id);
    getTaskDetail(task_id).then((result) => {
        console.log(result);
        if (result.status === 'OK') {
            if (result.data.status) {
                let task = result.data.task;
                rightTaskInit(task);
            } else {
                alert(result.data.error_message);
            }
        }
    })
}

const rightTaskInit = (task) => {
    console.log('rightTaskInit');
    RIGHT_TASK_CONTAINER.setAttribute('data-id', task.id);
    rightTaskCheckboxInit(task.complete);
    rightTaskTitleInit(task.title);
    rightTaskFigmaInit(task.plug_figma);
    rightTaskQueryInit(task.plug_query);
    rightTaskAssignInit(task.collaborators);
    rightTaskWorkTimeInit(task.start_date, task.end_date);
    rightTaskContentInit(task.description);
    rightTaskSubtasksInit(task.subTasks);
}

const rightTaskCheckboxInit = (is_complete) => {
    let checkbox_input = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._title .checkbox');
    if (is_complete) {
        checkbox_input.classList.add('is-checked');
    }
}

const rightTaskTitleInit = (title) => {
    let title_input = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._title input');
    title_input.value = title;
}

const rightTaskAssignInit = (profiles) => {
    let assign_user_container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner ._info ._assign .user-item-container');
    let assign_user_add = assign_user_container.querySelector('.user-item.add');
    // 20221103 지우 add
    if (profiles !== undefined) {
        profiles = taskProfilesChanger(profiles);
        profiles.forEach(function (profile) {
            assign_user_add.before(createRightTaskAssignItem(profile));
        });
    }
}

const rightTaskWorkTimeInit = (start_date, end_date) => {
    let start_date_input = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner ._info #start');
    let end_date_input = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner ._info #end');
    start_date_input.value = start_date !== null ? start_date.replaceAll(/-/g, '.') : '';
    end_date_input.value = end_date !== null ? end_date.replaceAll(/-/g, '.') : '';
}

const rightTaskFigmaInit = (plug_figma_url) => {
    let title_input = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._info ._plug[data-type="FIGMA"]');
    title_input.value = plug_figma_url;
}

const rightTaskQueryInit = (plug_query_url) => {
    let title_input = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._info ._plug[data-type="QUERY"]');
    title_input.value = plug_query_url;
}
const rightTaskContentInit = (content) => {
    let content_input = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab .content-editable-container');
    content_input.innerHTML = `${content === null ? '' : content}`;
}

const rightTaskSubtasksInit = (subtasks) => {
    let subtasks_container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._subtasks');
    let subtask_add = subtasks_container.querySelector('.subtask-item.add');
    if (subtasks !== undefined) {
        subtasks.forEach(function (subtask) {
            subtask_add.before(createRightSubtaskItem(subtask));
        });
    }
}

const rightTaskCommentsInit = (comments) => {
    let comments_container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._comments');
    comments_container.innerHTML = '';
    comments.forEach(function (comment) {
        comment.profile = taskProfileChanger(comment.profile);
        comments_container.appendChild(createRightTaskCommentItem(comment));
    });
}

const rightTaskFilesInit = (files) => {
    let container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._files-container');
    files = filesChanger(files);
    initializeFiles({container, files});
}

//TODO 20221102 - 19번 - 우식
function rightTaskDeleteClickEventListener(event) {
    console.log('deleteOptionClickEventListener', this);
    let task_id = this.closest('[data-id]').dataset.id;
    apiDeleteTask(task_id).then((result) => {
        console.log('apiDeleteTask', result);
        let type = document.querySelector('#project-tab').querySelector('button.nav-link.active').dataset.target;
        let task_element = undefined, board_id = undefined;
        switch (type) {
            case '#feed':
                task_element = kanban.findElement(task_id);
                board_id = task_element.closest('.kanban-board[data-id]').dataset.id;
                let board = kanban.findBoardJSON(board_id);
                let task = kanban.findTaskJSON(board_id, task_id);
                kanban.removeTask(board, task);
                kanban.removeElement(task_id);
                updatePercent(kanban, board);
                break;
            case '#list':
                task_element = LIST_CONTAINER.querySelector(`[data-id="${RIGHT_TASK_CONTAINER.dataset.id}"]`);
                task_element.remove();
                updateListPercents();
                break;
            case '#timeline':
                break;
        }
        rightTaskClose();
    });
}

function rightTaskBackClickEventListener(event) {
    console.log('rightTaskBackClickEventListener', this);
    rightTaskClose();
}

function rightTaskTitleKeydownEventListener(event) {
    console.log('rightTaskTitleKeydownEventListener', this);
}

function rightTaskTitleKeyupEventListener(event) {
    console.log('rightTaskTitleKeyupEventListener', this);
}

function rightTaskTabChangeEventListener(event) {
    let id = RIGHT_TASK_CONTAINER.dataset.id;
    switch ($(this).find('button').data().type) {
        case 'content' :
            // for prevent tab change on close
            if (id !== undefined) {
                getTaskDetail(id).then((result) => {
                    console.log(result);
                    if (result.status === 'OK') {
                        if (result.data.status) {
                            let task = result.data.task;
                            rightTaskWorkTimeInit(task.start_date, task.end_date);
                            rightTaskContentInit(task.description);
                            rightTaskSubtasksClear();
                            rightTaskSubtasksInit(task.subTasks);
                        } else {
                            alert(result.data.error_message);
                        }
                    }
                })
            }
            break;
        case 'comment':
            // TODO WHEN COMMENT TAB OPEN
            //TODO 20221102 - 34번 - 지우 O
            getTaskComments(id).then((result) => {
                console.log(result)
                if (result.status === 'OK') {
                    if (result.data.status) {
                        let comments = result.data.comments;
                        rightTaskCommentsInit(comments);
                    } else {
                        alert(result.data.error_message);
                    }
                }
            })
            break;
        case 'file':
            // TODO WHEN FILE TAB OPEN
            //TODO 20221102 - 36번 - 지우 O
            getTaskFiles(id).then((result) => {
                console.log(result);
                if (result.status === 'OK') {
                    if (result.data.status) {
                        let files = result.data.files;
                        rightTaskFilesInit(files);
                    } else {
                        alert(result.data.error_message);
                    }
                }
            })
    }
}

//TODO 20221102 - 18번 - 우식
function rightTaskTitleInputEventListener(event) {
    console.log('rightTaskTitleInputEventListener', this);
    let title = this;
    let task_id = this.closest('[data-id]').dataset.id;
    let is_subtask = this.closest('.subtask-item') !== undefined && this.closest('.subtask-item') !== null;
    if (is_subtask) {
        apiChangeSubTaskName(task_id, title.value).then((result) => {
            console.log('apiChangeSubTaskName', result);
            let type = document.querySelector('#project-tab').querySelector('button.nav-link.active').dataset.target;
            switch (type) {
                case '#feed':
                    let subtask_id = task_id;
                    task_id = RIGHT_TASK_CONTAINER.dataset.id;
                    let task_element = kanban.findElement(task_id);
                    let board_id = task_element.closest('.kanban-board[data-id]').dataset.id;
                    let task = kanban.findTaskJSON(board_id, task_id);
                    //SUBTASK
                    let subtask = findSubTask(task, subtask_id);
                    subtask.title = title.value;
                    let subtask_element = findSubTaskElement(task, subtask_id);
                    subtask_element.querySelector('._title').innerHTML = `${subtask.title}`;
                    break;
                case '#list':
                    //TODO okiwi-list.js -> Subtask 개발 예정
                    break;
                case '#timeline':
                    //TODO okiwi-gantt.js -> Subtask 개발 예정
                    break;
            }
        });
    } else {
        apiChangeTaskName(task_id, title.value).then((result) => {
            console.log('apiChangeTaskName', result);
            let type = document.querySelector('#project-tab').querySelector('button.nav-link.active').dataset.target;
            let task_element = undefined;
            switch (type) {
                case '#feed':
                    task_element = kanban.findElement(task_id);
                    let board_id = task_element.closest('.kanban-board[data-id]').dataset.id;
                    let task = kanban.findTaskJSON(board_id, task_id);
                    task.title = title.value;
                    task_element.querySelector('.kanban-item-title .title').innerHTML = `${task.title}`;
                    break;
                case '#list':
                    task_element = LIST_CONTAINER.querySelector(`[data-id="${task_id}"]`);
                    if (title.value.trim().length !== 0) {
                        task_element.querySelector('._name').innerHTML = `${title.value}`;
                    } else {
                        task_element.querySelector('._name').innerHTML = `업무명을 입력해주세요.`;
                    }
                    break;
                case '#timeline':
                    //LEFT
                    let left_task_element = document.querySelector(`.gantt-container ._gantt-board .list-group-item[id="${task_id}"]`);
                    console.log(left_task_element);
                    if (title.value.trim().length !== 0) {
                        left_task_element.querySelector('.title').innerHTML = `${title.value}`;
                    } else {
                        left_task_element.querySelector('.title').innerHTML = `업무명을 입력해주세요.`;
                    }
                    //GANTT
                    task_element = document.querySelector(`.gantt-container ._gantt-timeline ._content .gantt-task[data-id="${task_id}"]`);
                    if (title.value.trim().length !== 0) {
                        task_element.querySelector('.title').innerHTML = `${title.value}`;
                    } else {
                        task_element.querySelector('.title').innerHTML = `업무명을 입력해주세요.`;
                    }
                    break;
            }
        });
    }
}

//TODO 20221102 - 14번 - 우식
function rightTaskCheckboxClickEventListener(event) {
    console.log('rightTaskCheckboxClickEventListener', this);
    let task_id = this.closest('[data-id]').dataset.id;
    let is_before_complete = this.classList.contains('is-checked');
    if (is_before_complete) {
        apiUpdateTaskStatus(task_id).then((result) => {
            console.log('apiUpdateTaskStatus', result);
            this.classList.remove('is-checked');
            //FALSE
            let type = document.querySelector('#project-tab').querySelector('button.nav-link.active').dataset.target;
            let task_element = undefined, checkbox = undefined;
            switch (type) {
                case '#feed':
                    task_id = RIGHT_TASK_CONTAINER.dataset.id;
                    task_element = kanban.findElement(task_id);
                    let board_id = task_element.closest('.kanban-board[data-id]').dataset.id;
                    let task = kanban.findTaskJSON(board_id, task_id);
                    task.complete = false;
                    checkbox = task_element.querySelector('.kanban-item .checkbox');
                    if (checkbox.classList.contains('active')) {
                        checkbox.classList.remove('active');
                    }
                    updatePercents(kanban);
                    break;
                case '#list':
                    task_id = RIGHT_TASK_CONTAINER.dataset.id;
                    task_element = LIST_CONTAINER.querySelector(`[data-id="${task_id}"]`);
                    checkbox = task_element.querySelector('.checkbox');
                    if (task_element.classList.contains('is-checked')) {
                        task_element.classList.remove('is-checked');
                    }
                    updateListPercents();
                    break;
                case '#timeline':
                    //LEFT
                    let left_task_element = document.querySelector(`.gantt-container ._gantt-board .list-group-item[id="${task_id}"]`);
                    if (left_task_element.classList.contains('is-checked')) {
                        left_task_element.classList.remove('is-checked');
                    }
                    //GANTT
                    task_element = document.querySelector(`.gantt-container ._gantt-timeline ._content .gantt-task[data-id="${task_id}"]`);
                    if (task_element.classList.contains('is-checked')) {
                        task_element.classList.remove('is-checked');
                    }
                    break;
            }
        });
    } else {
        apiUpdateTaskStatus(task_id).then((result) => {
            console.log('apiUpdateTaskStatus', result);
            this.classList.add('is-checked');
            //TRUE
            let type = document.querySelector('#project-tab').querySelector('button.nav-link.active').dataset.target;
            let task_element = undefined, checkbox = undefined;
            switch (type) {
                case '#feed':
                    task_id = RIGHT_TASK_CONTAINER.dataset.id;
                    task_element = kanban.findElement(task_id);
                    let board_id = task_element.closest('.kanban-board[data-id]').dataset.id;
                    let task = kanban.findTaskJSON(board_id, task_id);
                    task.complete = true;
                    checkbox = task_element.querySelector('.kanban-item .checkbox');
                    if (!checkbox.classList.contains('active')) {
                        checkbox.classList.add('active');
                    }
                    updatePercents(kanban);
                    break;
                case '#list':
                    task_id = RIGHT_TASK_CONTAINER.dataset.id;
                    task_element = LIST_CONTAINER.querySelector(`[data-id="${task_id}"]`);
                    checkbox = task_element.querySelector('.checkbox');
                    if (!task_element.classList.contains('is-checked')) {
                        task_element.classList.add('is-checked');
                    }
                    updateListPercents();
                    break;
                case '#timeline':
                    //LEFT
                    let left_task_element = document.querySelector(`.gantt-container ._gantt-board .list-group-item[id="${task_id}"]`);
                    if (!left_task_element.classList.contains('is-checked')) {
                        left_task_element.classList.add('is-checked');
                    }
                    //GANTT
                    task_element = document.querySelector(`.gantt-container ._gantt-timeline ._content .gantt-task[data-id="${task_id}"]`);
                    if (!task_element.classList.contains('is-checked')) {
                        task_element.classList.add('is-checked');
                    }
                    break;
            }
        });
    }
    event.preventDefault();
    event.stopPropagation();
}

//TODO 20221102 - 28 - 우식
function rightSubtaskCheckboxClickEventListener(event) {
    console.log('rightSubtaskCheckboxClickEventListener', this);
    let subtask = this.closest('[data-id]');
    let subtask_id = subtask.dataset.id;
    let is_complete = subtask.classList.contains('is-checked');
    if (is_complete) {
        apiChangeSubTaskStatus(subtask_id).then((result) => {
            console.log('apiChangeSubTaskStatus', result);
            subtask.classList.remove('is-checked');
            let type = document.querySelector('#project-tab').querySelector('button.nav-link.active').dataset.target;
            let task_id = undefined, task_element = undefined, subtask_element = undefined;
            switch (type) {
                case '#feed':
                    task_id = RIGHT_TASK_CONTAINER.dataset.id;
                    task_element = kanban.findElement(task_id);
                    let board_id = task_element.closest('.kanban-board[data-id]').dataset.id;
                    let task = kanban.findTaskJSON(board_id, task_id);
                    let _subtask = findSubTask(task, subtask_id);
                    _subtask.complete = false;
                    subtask_element = findSubTaskElement(task, subtask_id);
                    subtask_element.classList.remove('active');
                    break;
                case '#list':
                    break;
                case '#timeline':
                    break;
            }
        });
    } else {
        apiChangeSubTaskStatus(subtask_id).then((result) => {
            console.log('apiChangeSubTaskStatus', result);
            subtask.classList.add('is-checked');
            let type = document.querySelector('#project-tab').querySelector('button.nav-link.active').dataset.target;
            let task_id = undefined, task_element = undefined, subtask_element = undefined;
            switch (type) {
                case '#feed':
                    task_id = RIGHT_TASK_CONTAINER.dataset.id;
                    task_element = kanban.findElement(task_id);
                    let board_id = task_element.closest('.kanban-board[data-id]').dataset.id;
                    let task = kanban.findTaskJSON(board_id, task_id);
                    let _subtask = findSubTask(task, subtask_id);
                    _subtask.complete = true;
                    subtask_element = findSubTaskElement(task, subtask_id);
                    subtask_element.classList.add('active');
                    break;
                case '#list':
                    break;
                case '#timeline':
                    break;
            }
        });
    }
    event.preventDefault();
    event.stopPropagation();
}

//TODO 20221102 - 31번 - 우식
function rightSubtaskCloseClickEventListener(event) {
    console.log('rightSubtaskCloseClickEventListener', this);
    let subtask = this.closest('[data-id]');
    let subtask_id = subtask.dataset.id;
    deleteSubTask(subtask_id).then((result) => {
        console.log('deleteSubTask', result);
        if (result.status === 'OK') {
            if (result.data.status) {
                subtask.remove();
                let type = document.querySelector('#project-tab').querySelector('button.nav-link.active').dataset.target;
                let task_id = undefined, task_element = undefined, subtasks_container = undefined,
                    subtask_add = undefined;
                switch (type) {
                    case '#feed':
                        task_id = RIGHT_TASK_CONTAINER.dataset.id;
                        task_element = kanban.findElement(task_id);
                        let board_id = task_element.closest('.kanban-board[data-id]').dataset.id;
                        let task = kanban.findTaskJSON(board_id, task_id);
                        let subtask_container = task_element.querySelector('.kanban-sub-item-container');
                        let subtask_is_open = subtask_container.style.display !== 'none' ? true : false;
                        //subtask remove
                        task.subtasks = task.subtasks.filter((_subtask) => {
                            if (_subtask.id !== subtask_id) {
                                console.log(_subtask, subtask_id);
                                return true;
                            }
                            return false;
                        });
                        subtask_container.outerHTML = kanban.__buildItemSubCardInnerHTML(task.subtasks);
                        subtask_container = task_element.querySelector('.kanban-sub-item-container');
                        subtask_container.style.display = subtask_is_open ? 'block' : 'none';
                        kanban.__onSubTaskClickHandler(subtask_container.querySelectorAll('.kanban-sub-item .checkbox'));
                        task_element.querySelector('.sub-task-count ._count').innerHTML = `${task.subtasks.length}`;
                        break;
                    case '#list':
                        task_id = RIGHT_TASK_CONTAINER.dataset.id;
                        task_element = LIST_CONTAINER.querySelector(`[data-id="${RIGHT_TASK_CONTAINER.dataset.id}"]`);
                        let list_task_subtasks_count = RIGHT_TASK_CONTAINER.querySelectorAll('._subtasks .subtask-item:not(.add)').length;
                        task_element.querySelector('._subtasks').innerHTML = `${list_task_subtasks_count}개`;
                        break;
                    case '#timeline':
                        break;
                }
            }
        }
    });
}

//TODO 20221102 - 24번 - 우식
function rightTaskStartDatePickerChangeEventListener(event) {
    console.log('rightTaskStartDatePickerChangeEventListener', this);
    let task_id = this.closest('[data-id]').dataset.id;
    if ($('#end').val().trim().length !== 0) {
        if (this.value > $('#end').val()) {
            $('#end').datepicker('setDate', event.date);
        }
    }
    apiChangeTaskStart(task_id, this.value).then((result) => {
        console.log('apiChangeTaskStart', result);
        let type = document.querySelector('#project-tab').querySelector('button.nav-link.active').dataset.target;
        let task_element = undefined, start_time = undefined;
        switch (type) {
            case '#feed':
                task_element = kanban.findElement(task_id);
                let board_id = task_element.closest('.kanban-board[data-id]').dataset.id;
                let task = kanban.findTaskJSON(board_id, task_id);
                start_time = $('#start').val().trim().replaceAll(/\./g, '-').substring(2);
                let end_time = $('#end').val().trim().replaceAll(/\./g, '-').substring(2);
                if (end_time.length !== 0) {
                    task_element.querySelector('.kanban-item-task-info .time').innerHTML = `${start_time} - ${end_time}`;
                } else {
                    task_element.querySelector('.kanban-item-task-info .time').innerHTML = `${start_time} - 미설정`;
                }
                break;
            case '#list':
                task_id = RIGHT_TASK_CONTAINER.dataset.id;
                task_element = LIST_CONTAINER.querySelector(`[data-id="${task_id}"]`);
                start_time = $('#start').val().trim().replaceAll(/\./g, '-');
                task_element.querySelector('._start').innerHTML = `${start_time}`;
                break;
            case '#timeline':
                task_element = document.querySelector(`.gantt-container ._gantt-timeline ._content .gantt-task[data-id="${task_id}"]`);
                task_element.setAttribute('data-start-date', $('#start').val().trim());
                /*TODO Gantt Task Move*/

                break;
        }
    });
    event.preventDefault();
    event.stopPropagation();
}

//TODO 20221102 - 25번 - 우식
function rightTaskEndDatePickerChangeEventListener(event) {
    console.log('rightTaskEndDatePickerChangeEventListener', this);
    let task_id = this.closest('[data-id]').dataset.id;
    apiChangeTaskEnd(task_id, this.value).then((result) => {
        console.log('apiChangeTaskEnd', result);
        let type = document.querySelector('#project-tab').querySelector('button.nav-link.active').dataset.target;
        let task_element = undefined, end_time = undefined;
        switch (type) {
            case '#feed':
                task_element = kanban.findElement(task_id);
                let start_time = $('#start').val().trim().replaceAll(/\./g, '-').substring(2);
                end_time = $('#end').val().trim().replaceAll(/\./g, '-').substring(2);
                console.log(start_time, end_time);
                if (start_time.length !== 0) {
                    task_element.querySelector('.kanban-item-task-info .time').innerHTML = `${start_time} - ${end_time}`;
                } else {
                    task_element.querySelector('.kanban-item-task-info .time').innerHTML = `미설정 - ${end_time}`;
                }
                break;
            case '#list':
                task_id = RIGHT_TASK_CONTAINER.dataset.id;
                task_element = LIST_CONTAINER.querySelector(`[data-id="${task_id}"]`);
                end_time = $('#end').val().trim().replaceAll(/\./g, '-');
                task_element.querySelector('._end').innerHTML = `${end_time}`;
                break;
            case '#timeline':
                break;
        }
    });
    event.preventDefault();
    event.stopPropagation();
}

//TODO 20221102 - 32번 - 지우 O
const rightTaskUserAssignDropdownUpdateItems = (event) => {
    console.log('rightTaskUserAssignDropdownUpdateItems', event, this);
    getTaskAvailableMembers(RIGHT_TASK_CONTAINER.dataset.id).then((result) => {
        if (result.status === 'OK') {
            if (result.data.status) {
                let profiles = result.data.members;
                let dropdown_menu = event.target.querySelector('.dropdown-menu');
                // TODO 더이상 추가할 멤버가 없을 때 디자인 or alert?
                profiles = taskProfilesChanger(profiles);

                profiles.forEach(function (profile) {
                    dropdown_menu.appendChild(createRightTaskDropdownAssignItem(profile));
                });
            }
        }
    })
    let profiles = [
        {
            no: 1,
            url: 'https://via.placeholder.com/30x30',
            name: 'kimwoosik'
        },
        {
            no: 2,
            url: 'https://via.placeholder.com/30x30',
            name: 'kimwoosik2'
        },
        {
            no: 3,
            url: 'https://via.placeholder.com/30x30',
            name: 'kimwoosik3'
        }
    ];

}

const rightTaskUserAssignDropdownClearItems = (event) => {
    console.log('rightTaskUserAssignDropdownClearItems', event, this);
    let dropdown_menu = event.target.querySelector('.dropdown-menu');
    let dropdown_items = dropdown_menu.querySelectorAll('.dropdown-item');
    dropdown_items.forEach(function (dropdown_item) {
        dropdown_item.remove();
    });
}

//TODO 20221102 - 23번 - 지우 O
function rightTaskUserAssignDeleteClickEventListener(event) {
    console.log('rightTaskUserAssignDeleteClickEventListener', this);
    let user_item = this.closest('.user-item');
    let user_no = user_item.dataset.no * 1;
    console.log('delete user_no', user_no);
    event.preventDefault();
    event.stopPropagation();
    removeTaskMember(RIGHT_TASK_CONTAINER.dataset.id, user_no).then((result) => {
        console.log(result);
        if (result.status === 'OK') {
            if (result.data.status) {
                user_item.remove();
                let type = document.querySelector('#project-tab').querySelector('button.nav-link.active').dataset.target;
                let task_element = undefined, profile_container = undefined, size = undefined;
                switch (type) {
                    case '#feed':
                        task_element = kanban.findElement(RIGHT_TASK_CONTAINER.dataset.id);
                        let board_id = task_element.closest('.kanban-board[data-id]').dataset.id;
                        let task = kanban.findTaskJSON(board_id, RIGHT_TASK_CONTAINER.dataset.id);
                        task.profiles = task.profiles.filter((_profile) => {
                            if (_profile.no !== user_no) {
                                return true;
                            }
                            return false;
                        });
                        task.profiles = duplicateProfilesRemover(task.profiles);
                        profile_container = task_element.querySelector('.kanban-item-task-info .left');
                        deleteChild(profile_container);
                        profile_container.innerHTML = kanban.__createProfileHTML(task.profiles);
                        break;
                    case '#list':
                        task_element = LIST_CONTAINER.querySelector(`[data-id="${RIGHT_TASK_CONTAINER.dataset.id}"]`);
                        size = RIGHT_TASK_CONTAINER.querySelectorAll('.user-item-container .user-item:not(.add)').length;
                        profile_container = task_element.querySelector('._image');
                        if (size === 0) {
                            if (!profile_container.classList.contains('d-none')) {
                                profile_container.classList.add('d-none');
                                profile_container.style.backgroundImage = `url('')`;
                            }
                        }
                        break;
                    case '#timeline':
                        size = RIGHT_TASK_CONTAINER.querySelectorAll('.user-item-container .user-item:not(.add)').length;
                        task_element = document.querySelector(`.gantt-container ._gantt-timeline ._content .gantt-task[data-id="${RIGHT_TASK_CONTAINER.dataset.id}"]`);
                        profile_container = task_element.querySelector('.gantt-info > img');
                        if (size === 0) {
                            if (profile_container.style.display !== 'none') {
                                profile_container.style.display = 'none';
                                profile_container.setAttribute('src', ``);
                            }
                        }
                        break;
                }
            }
        }
    })
}

//TODO 20221102 - 22번 - 지우 O
function rightTaskUserAssignAddClickEventListener(event) {
    console.log('rightTaskUserAssignAddClickEventListener', this);
    let user_no = this.dataset.no * 1;
    let name = this.querySelector('._name').innerText.trim();
    let img = this.querySelector('._profile').style.backgroundImage;
    let url = img.substring(img.indexOf('"') + 1, img.lastIndexOf('"'));
    let profile = {
        no: user_no,
        url,
        name
    }
    addTaskMember(RIGHT_TASK_CONTAINER.dataset.id, user_no).then((result) => {
        if (result.status === 'OK') {
            if (result.data.status) {
                let assign_user_container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner ._info ._assign .user-item-container');
                let assign_user_add = assign_user_container.querySelector('.user-item.add');
                assign_user_add.before(createRightTaskAssignItem(profile));
                let type = document.querySelector('#project-tab').querySelector('button.nav-link.active').dataset.target;
                let task_element = undefined, profile_container = undefined;
                switch (type) {
                    case '#feed':
                        task_element = kanban.findElement(RIGHT_TASK_CONTAINER.dataset.id);
                        let board_id = task_element.closest('.kanban-board[data-id]').dataset.id;
                        let task = kanban.findTaskJSON(board_id, RIGHT_TASK_CONTAINER.dataset.id);
                        task.profiles.push(profile);
                        task.profiles = duplicateProfilesRemover(task.profiles);
                        profile_container = task_element.querySelector('.kanban-item-task-info .left');
                        deleteChild(profile_container);
                        profile_container.innerHTML = kanban.__createProfileHTML(task.profiles);
                        break;
                    case '#list':
                        task_element = LIST_CONTAINER.querySelector(`[data-id="${RIGHT_TASK_CONTAINER.dataset.id}"]`);
                        profile_container = task_element.querySelector('._image');
                        if (profile_container.classList.contains('d-none')) {
                            profile_container.style.backgroundImage = `url('${profile.url}')`;
                            profile_container.classList.remove('d-none');
                        }
                        break;
                    case '#timeline':
                        task_element = document.querySelector(`.gantt-container ._gantt-timeline ._content .gantt-task[data-id="${RIGHT_TASK_CONTAINER.dataset.id}"]`);
                        profile_container = task_element.querySelector('.gantt-info > img');
                        if (profile_container.style.display === 'none') {
                            profile_container.style.display = 'inline';
                            profile_container.setAttribute('src', `${profile.url}`);
                        }
                        break;
                }
            } else {
                alert(result.data.error_message);
            }
        }
    })
}

function rightTaskDatepickerInputEventListener(event) {
    console.log('rightTaskDatepickerInputEventListener', this);
}

function rightTaskContentKeydownEventListener(event) {
    console.log('rightTaskContentKeydownEventListener', this);
}

function rightTaskContentKeyupEventListener(event) {
    console.log('rightTaskContentKeyupEventListener', this);
}

//TODO 20221102 - 26번 - 우식
function rightTaskContentInputEventListener(event) {
    console.log('rightTaskContentInputEventListener', this);
    let task_id = this.closest('[data-id]').dataset.id;
    let content = this;
    apiChangeTaskDescription(task_id, content.innerHTML).then((result) => {
        console.log('apiChangeTaskDescription', result);
    });
}

//TODO 20221102 - 30번 - 지우 O
function rightTaskSubTaskAddClickEventListener(event) {
    console.log('rightTaskSubTaskAddClickEventListener', this);
    let create_id = tokenGenerator(8);
    let subtask = {
        id: create_id,
        title: create_id,
        task_id: RIGHT_TASK_CONTAINER.dataset.id,
        complete: false,
    };
    createSubTask(subtask).then((result) => {
        console.log(result);
        if (result.status === 'OK') {
            if (result.data.status) {
                let type = document.querySelector('#project-tab').querySelector('button.nav-link.active').dataset.target;
                let task_id = undefined, task_element = undefined, subtasks_container = undefined,
                    subtask_add = undefined;
                switch (type) {
                    case '#feed':
                        task_id = RIGHT_TASK_CONTAINER.dataset.id;
                        task_element = kanban.findElement(task_id)
                        let board_id = task_element.closest('.kanban-board[data-id]').dataset.id;
                        let task = kanban.findTaskJSON(board_id, task_id);
                        subtask = result.data.subTask;
                        task.subtasks.push(subtask);
                        subtasks_container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._subtasks');
                        subtask_add = subtasks_container.querySelector('.subtask-item.add');
                        subtask_add.before(createRightSubtaskItem(subtask));

                        let subtask_container = task_element.querySelector('.kanban-sub-item-container');
                        let subtask_is_open = subtask_container.style.display !== 'none' ? true : false;
                        subtask_container.outerHTML = kanban.__buildItemSubCardInnerHTML(task.subtasks);
                        subtask_container = task_element.querySelector('.kanban-sub-item-container');
                        subtask_container.style.display = subtask_is_open ? 'block' : 'none';
                        kanban.__onSubTaskClickHandler(subtask_container.querySelectorAll('.kanban-sub-item .checkbox'));
                        task_element.querySelector('.sub-task-count ._count').innerHTML = `${task.subtasks.length}`;
                        break;
                    case '#list':
                        task_id = RIGHT_TASK_CONTAINER.dataset.id;
                        task_element = LIST_CONTAINER.querySelector(`[data-id="${RIGHT_TASK_CONTAINER.dataset.id}"]`);
                        subtask = result.data.subTask;
                        subtasks_container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._subtasks');
                        subtask_add = subtasks_container.querySelector('.subtask-item.add');
                        subtask_add.before(createRightSubtaskItem(subtask));

                        let list_task_subtasks_count = RIGHT_TASK_CONTAINER.querySelectorAll('._subtasks .subtask-item:not(.add)').length;
                        task_element.querySelector('._subtasks').innerHTML = `${list_task_subtasks_count}개`;
                        break;
                    case '#timeline':
                        break;
                }
            } else {
                alert(result.data.error_message);
            }
        }
    })
}

//TODO 20221102 - 40번 - 지우 O
function rightTaskDownloadClickEventListener(event) {
    console.log('rightTaskDownloadClickEventListener', this);
    // For Comment
    downloadFileFromUrl($(this).data().url, $(this).data().name);
}

function rightTaskCommentKeydownEventListener(event) {
    console.log('rightTaskCommentKeydownEventListener', this);
    if (event.key === 'Escape'.toLowerCase() || event.code === 'Escape'.toLowerCase() || event.keyCode === 27) {
        //TODO Clear
        this.value = '';
        event.preventDefault();
        event.stopPropagation();
    }
    if ((event.key === 'Enter'.toLowerCase() || event.code === 'Enter'.toLowerCase() || event.keyCode === 13) && !(event.altKey || event.shiftKey || event.ctrlKey)) {
        //TODO Enter Key
        event.preventDefault();
        event.stopPropagation();
        let send_button = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._comment-input-container ._write');
        send_button.click();
    }
}

function rightTaskCommentKeyupEventListener(event) {
    console.log('rightTaskCommentKeyupEventListener', this);

}

function rightTaskCommentInputEventListener(event) {
    console.log('rightTaskCommentInputEventListener', this);
}

//TODO 20221102 - 34번 - 지우 O
function rightTaskCommentWriteEventListener(event) {
    console.log('rightTaskCommentWriteEventListener', this);
    let task_id = this.closest('[data-id]').dataset.id;
    let comment_write_input = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._comment-input-container #comment-input');
    let comments_container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._comments');
    let current_date = new Date().toISOString().slice(0, 10);

    let comment = {
        task_id: task_id,
        type: 'TEXT',
        content: comment_write_input.value,
    }
    addTaskComment(comment).then((result) => {
        console.log(result);
        if (result.status === 'OK') {
            if (result.data.status) {
                comment = result.data.comment;
                comment.profile = taskProfileChanger(comment.profile);
                comments_container.appendChild(createRightTaskCommentItem(comment));
                comment_write_input.value = '';
            } else {
                alert(result.data.error_message);
            }
        }
    })
}

function rightTaskMessageFileUploadEventListener(event) {
    console.log('rightTaskMessageFileUploadEventListener', this);
    let task_id = this.closest('[data-id]').dataset.id;
    let input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();
    input.addEventListener('change', rightTaskMessageFileChangeEventListener);
    event.preventDefault();
    event.stopPropagation();
}

//TODO 20221102 - 39번 - 지우 O
function rightTaskMessageFileChangeEventListener(event) {
    console.log('rightTaskMessageFileChangeEventListener', this, event);
    let comments_container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._comments');
    let task_id = RIGHT_TASK_CONTAINER.dataset.id;
    let input = this;
    let file = input.files[0];
    let current_date = new Date().toISOString().slice(0, 10);

    function readURL(input, comment, callback) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                createFileComment(task_id, file).then((result) => {
                    console.log(result);
                    if (result.status === 'OK') {
                        if (result.data.status) {
                            comment = result.data.comment;
                            // comment.file.url = e.target.result;
                            // console.log(comment.file);
                            comment.profile = taskProfileChanger(comment.profile);
                            callback(comment);
                        } else {
                            alert(result.data.error_message);
                        }
                    }
                })

            }

            reader.readAsDataURL(input.files[0]);

            reader.onloadend = function (e) {

            }
        }
    }

    let comment = {
        // no: 9999,
        // profile: {
        //     no: 9999,
        //     url: 'https://via.placeholder.com/30x30',
        //     name: 'kimwoosik'
        // },
        // type: 'file',
        // file: {
        //     name: file.name,
        //     url: 'https://via.placeholder.com/350x150',
        //     type: file.type,
        //     size: file.size
        // },
        // date: current_date
    };
    readURL(input, comment, (comment) => {
        comments_container.appendChild(createRightTaskCommentItem(comment))
    });
}

//TODO 2022-12-02 Figma & Query link add
function rightTaskPluginPreviewClickEventListener(event) {
    console.log('rightTaskPluginPreviewClickEventListener');
    let type = this.closest('[data-type]').dataset.type;
    let url = this.parentElement.querySelector('input').value;
    console.log('type', type, 'url', url);
    //Initialize Window
    switch (type) {
        case 'FIGMA':
            createPreview({
                id: tokenGenerator(8),
                width: 400,
                height: 400,
                top: 50,
                left: 50,
                title: 'Figma Plugin',
                src: `https://www.figma.com/embed?embed_host=share&url=${url}`,
                is_full_screen: true
            });
            break;
        case 'QUERY':
            createPreview({
                id: tokenGenerator(8),
                width: 400,
                height: 400,
                top: 50,
                left: 50,
                title: 'Query Plugin',
                src: `${url}?summary=preview`,
                is_full_screen: true
            });
            break;
    }
}

function rightTaskPluginInputKeyDownEventListener(event) {
    console.log('rightTaskPluginInputKeyDownEventListener');
}

function rightTaskPluginInputKeyUpEventListener(event) {
    console.log('rightTaskPluginInputKeyUpEventListener');
}

function rightTaskPluginInputKeyInputEventListener(event) {
    console.log('rightTaskPluginInputKeyInputEventListener');
    let plugin_type = this.closest('[data-type]').dataset.type;
    let task_id = this.closest('[data-id]').dataset.id;
    let content = this;
    console.log('plugin_type', plugin_type, 'task_id', task_id, 'content', content.value);

    /*apiChangeTaskPluginUrl(task_id, plugin_type, content.value).then((result) => {
        console.log('apiChangeTaskDescription', result);
    });*/
}

function debounce(callback, limit = 100) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback.apply(this, args);
        }, limit);
    };
}

const createRightTaskAssignItem = (profile) => {
    const __buildRightTaskAssignInnerHTML = (profile) => {
        return `<div class="_user">
              <div class="_profile"
                   style="background-image: url('${profile.url}')">
              </div>
              <div class="_name">
                ${profile.name}
              </div>
            </div>
            <div class="_close">
              <svg width="12"
                   height="12"
                   viewBox="0 0 20 20"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_636_4094)">
                  <path d="M10.0003 8.14974L16.4821 1.66797L18.3337 3.51953L11.8519 10.0013L18.3337 16.4831L16.4821 18.3346L10.0003 11.8529L3.51855 18.3346L1.66699 16.4831L8.14876 10.0013L1.66699 3.51953L3.51855 1.66797L10.0003 8.14974Z"
                        fill="#222222"></path>
                </g>
                <defs>
                  <clipPath id="clip0_636_4094">
                    <rect width="20"
                          height="20"
                          fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>`;
    }
    let user_item = document.createElement('div');
    user_item.classList.add('user-item');
    user_item.setAttribute('data-no', profile.no);
    user_item.innerHTML = __buildRightTaskAssignInnerHTML(profile);
    user_item.querySelector('._close').addEventListener('click', rightTaskUserAssignDeleteClickEventListener);
    return user_item;
}

const createRightSubtaskItem = (subtask) => {
    const __buildRightSubtaskInnerHTML = (subtask) => {
        return `<div class="_title">
              <span class="checkbox">
                <i class="fas fa-check" aria-hidden="true"></i>
              </span>
              <div class="_name regular-h5">
                <input type="text" name="right-side-task-name" placeholder="업무 이름을 입력해주세요." value="${subtask.title}">
              </div>
              <div class="_close">
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_636_4094)">
                    <path d="M10.0003 8.14974L16.4821 1.66797L18.3337 3.51953L11.8519 10.0013L18.3337 16.4831L16.4821 18.3346L10.0003 11.8529L3.51855 18.3346L1.66699 16.4831L8.14876 10.0013L1.66699 3.51953L3.51855 1.66797L10.0003 8.14974Z" fill="#222222"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_636_4094">
                      <rect width="20" height="20" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>`;
    }
    let task = document.createElement('div');
    task.classList.add('subtask-item');
    if (subtask.complete) {
        task.classList.add('is-checked');
    }
    task.setAttribute('data-id', subtask.id);
    task.innerHTML = __buildRightSubtaskInnerHTML(subtask);
    task.querySelector('._title input').addEventListener('keydown', rightTaskTitleKeydownEventListener);
    task.querySelector('._title input').addEventListener('keyup', rightTaskTitleKeyupEventListener);
    task.querySelector('._title input').addEventListener('input', debounce(rightTaskTitleInputEventListener, 300));
    task.querySelector('._title .checkbox').addEventListener('click', rightSubtaskCheckboxClickEventListener);
    task.querySelector('._title ._close').addEventListener('click', rightSubtaskCloseClickEventListener);
    return task;
}

const createRightTaskDropdownAssignItem = (profile) => {
    const __buildRightTaskDropdownAssignInnerHTML = (profile) => {
        return `  <div class="_dropdown-user">
                <div class="_profile" style="background-image: url('${profile.url}')">
                </div>
                <div class="_name">
                  ${profile.name}
                </div>
              </div>`;
    }
    let dropdown_item = document.createElement('a');
    dropdown_item.classList.add('dropdown-item', 'medium-h6');
    dropdown_item.setAttribute('data-no', profile.no);
    dropdown_item.innerHTML = __buildRightTaskDropdownAssignInnerHTML(profile);
    return dropdown_item;
}

const createRightTaskCommentItem = (comment) => {
    const __buildRightTaskCommentItem = (comment) => {
        if (comment.type === 'TEXT') {
            return `<div class="_profile"
                     style="background-image: url('${comment.profile.url}')"></div>
                <div class="_info">
                  <div class="_user">
                    <div class="_title bold-h5 c-gray-dark-low">${comment.profile.name}</div>
                    <div class="_date medium-h6 c-gray-dark-light">${comment.date}</div>
                  </div>
                  <div class="_content">
                    ${comment.content}
                  </div>
                </div>`;
        } else {
            let allowedExtension = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/svg+xml'];
            if (allowedExtension.indexOf(comment.file.type) > -1) {
                return `<div class="_profile"
                         style="background-image: url('${comment.profile.url}')"></div>
                    <div class="_info">
                      <div class="_user">
                        <div class="_title bold-h5 c-gray-dark-low">${comment.profile.name}</div>
                        <div class="_date medium-h6 c-gray-dark-light">${comment.date}</div>
                      </div>
                      <div class="_content">
                        <div class="_comment-file">
                          <div class="_image"
                               style="background-image: url('${comment.file.url}')"></div>
                          <div class="_file-info">
                            <span class="_name regular-h6"
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  title="${comment.file.name}">${comment.file.name}</span>
                            <span class="_download medium-h6" data-url="${comment.file.url}" data-name="${comment.file.name}">Download</span>
                          </div>
                        </div>
                      </div>
                    </div>`;
            } else {
                return `<div class="_profile"
                             style="background-image: url('${comment.profile.url}')"></div>
                        <div class="_info">
                          <div class="_user">
                            <div class="_title bold-h5 c-gray-dark-low">${comment.profile.name}</div>
                            <div class="_date medium-h6 c-gray-dark-light">${comment.date}</div>
                          </div>
                          <div class="_content">
                            <div class="_comment-file _file">
                              <div class="_file">
                              </div>
                              <div class="_file-info">
                                <span class="_name regular-h6"
                                      data-toggle="tooltip"
                                      data-placement="bottom"
                                      title="${comment.file.name}">${comment.file.name}</span>
                                <span class="_download medium-h6" data-url="${comment.file.url}" data-name="${comment.file.name}">Download</span>
                              </div>
                            </div>
                          </div>
                        </div>`;
            }
        }
    }
    let comment_element = document.createElement('div');
    comment_element.classList.add('comment-item');
    comment_element.innerHTML = __buildRightTaskCommentItem(comment);
    comment_element.querySelector('._download')?.addEventListener('click', rightTaskDownloadClickEventListener);
    return comment_element;
}
