'use strict';
let TASK_ORDER = 1;
const WEEK = ['일', '월', '화', '수', '목', '금', '토'];
let GANTT_BOARDS = new Array();
let BODY_ELEMENT = document.documentElement;
let SCROLL_POSITION = {top: 0, left: 0, x: 0, y: 0};

function accordionDropdownShowEvent(event) {
    let items = event.target.querySelectorAll('li.list-group-item[id]');
    items.forEach(function (item) {
        let task = findTimelineTask(item.id);
        if (task !== null && task !== undefined) {
            task.style.display = 'block';
            item.setAttribute('data-show', true);
        }
    });
    updateTimelineTaskPosition();
}

function accordionDropdownHideEvent(event) {
    console.log(event.target);
    let items = event.target.querySelectorAll('li.list-group-item[id]');
    items.forEach(function (item) {
        let task = findTimelineTask(item.id);
        if (task !== null && task !== undefined) {
            task.style.display = 'none';
            item.setAttribute('data-show', false);
        }
    });
    updateTimelineTaskPosition();
}

const updateTimelineTaskPosition = () => {
    let task_elements = document.querySelectorAll('.gantt-container ._gantt-timeline ._content .gantt-task');
    task_elements.forEach(function (task_element) {
        let task = {
            id: task_element.dataset.id,
            start_date: task_element.dataset.startDate,
            end_date: task_element.dataset.endDate,
        }
        let position = getGanttTaskPosition(task);
        task_element.style.top = position.top + 'px';
        task_element.style.left = position.left + 'px';
        task_element.style.width = position.width + 'px';
    });
}

const findTimelineTask = (id) => {
    return document.querySelector(`._gantt-timeline ._content .gantt-task[data-id="${id}"]`);
}

const createGantt = (_boards, gantt_container) => {
    gantt_container.appendChild(createGanttLeftSide(_boards));
    gantt_container.appendChild(createGanttRightSide(_boards));
    GANTT_BOARDS = initializeGantt(_boards);
    $('#gantt-accordion').on('shown.bs.collapse', accordionDropdownShowEvent);
    $('#gantt-accordion').on('hidden.bs.collapse', accordionDropdownHideEvent);
    //Context Menu Event Initialize
    //$('#gantt-context-menu').on('click', '.list-group a', contextMenuClickEventListener);
    $('#gantt-board-option-menu').on('click', '.list-group a', ganttBoardOptionMenuClickEventListener);
    BODY_ELEMENT.addEventListener('mousedown', ganttScrollTopMouseDownEventListener);
};

//TODO 20221102 - 13번 - 우식
function ganttBoardOptionMenuClickEventListener(event) {
    let menu = this.closest('#gantt-board-option-menu');
    let boardId = menu.dataset.boardId;
    let container = document.querySelector('.gantt-container');
    if (this.classList.contains('_edit')) {
        console.log('boardId', boardId, '_edit');
        let gantt_board_element = container.querySelector(`.card-header[data-id="${boardId}"]`);
        let title = gantt_board_element.querySelector('.title');
        let value = title.innerText.trim();
        title.innerHTML = createBoardItemWritableTitleElement(boardId, value);
        let input_title = gantt_board_element.querySelector(`[name="${boardId}-title"]`);
        input_title.addEventListener('keyup', ganttBoardWritableElementInputKeyUpEventListener);
        input_title.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
        });
    } else if (this.classList.contains('_delete')) {
        console.log('boardId', boardId, '_delete');
        let gantt_board_element = container.querySelector(`.card-header[data-id="${boardId}"]`).closest('.card');
        let gantt_timeline_tasks = gantt_board_element.querySelectorAll('.board-collapse li[id]');
        console.log('gantt_timeline_tasks', gantt_timeline_tasks);
        apiDeleteBoard(boardId).then((result) => {
            console.log('apiDeleteBoard', result);
            gantt_timeline_tasks.forEach(function (task) {
                let gantt_timeline_task = findTimelineTask(task.getAttribute('id'));
                console.log('gantt_timeline_task', gantt_timeline_task);
                gantt_timeline_task.remove();
            });
            gantt_board_element.remove();
            updateTimelineTaskPosition();
        });
    }
    updateTimelineTaskPosition();
    closeGanttContextMenu(menu);
};

//TODO 20221102 - 14번 - 우식 check
//TODO 20221102 - 15번 - 우식 check
//TODO 20221102 - 19번 - 우식 check
function ganttContextMenuClickEventListener(event) {
    let menu = this.closest('#gantt-context-menu');
    let taskId = menu.dataset.taskId;
    let container = document.querySelector('.gantt-container');
    if (this.classList.contains('_view')) {
        console.log('_view');
        rightTaskOpen(taskId);
    } else if (this.classList.contains('_edit')) {
        console.log('_edit');
        let gantt_board_item_task_element = container.querySelector(`.list-group-item[id="${taskId}"]`);
        let title = gantt_board_item_task_element.querySelector('.title');
        let value = title.innerText.trim();
        title.innerHTML = createBoardItemWritableTitleElement(taskId, value);
        let input_title = gantt_board_item_task_element.querySelector(`[name="${taskId}-title"]`);
        input_title.addEventListener('keyup', ganttBoardItemWritableElementInputKeyUpEventListener);
    } else if (this.classList.contains('_complete')) {
        console.log('_complete');
        let _content = document.querySelector('.gantt-container ._gantt-timeline ._content');
        let gantt_timeline_item_task_element = _content.querySelector(`.gantt-task[data-id="${taskId}"]`);
        if (gantt_timeline_item_task_element !== undefined && gantt_timeline_item_task_element !== null) {
            gantt_timeline_item_task_element.querySelector('.checkbox').click();
        } else {
            let gantt_board_task = container.querySelector(`._gantt-board .list-group li[id="${taskId}"]`);
            if (gantt_board_task.classList.contains('is-checked')) {
                apiUpdateTaskStatus(taskId).then((result) => {
                    console.log('apiUpdateTaskStatus', result);
                    gantt_board_task.classList.remove('is-checked');
                });
            } else {
                apiUpdateTaskStatus(taskId).then((result) => {
                    console.log('apiUpdateTaskStatus', result);
                    gantt_board_task.classList.add('is-checked');
                });
            }
        }
    } else if (this.classList.contains('_dis-complete')) {
        console.log('_dis-complete');
        let _content = document.querySelector('.gantt-container ._gantt-timeline ._content');
        let gantt_timeline_item_task_element = _content.querySelector(`.gantt-task[data-id="${taskId}"]`);
        if (gantt_timeline_item_task_element !== undefined && gantt_timeline_item_task_element !== null) {
            gantt_timeline_item_task_element.querySelector('.checkbox').click();
        } else {
            let gantt_board_task = container.querySelector(`._gantt-board .list-group li[id="${taskId}"]`);
            if (gantt_board_task.classList.contains('is-checked')) {
                apiUpdateTaskStatus(taskId).then((result) => {
                    console.log('apiUpdateTaskStatus', result);
                    gantt_board_task.classList.remove('is-checked');
                });
            } else {
                apiUpdateTaskStatus(taskId).then((result) => {
                    console.log('apiUpdateTaskStatus', result);
                    gantt_board_task.classList.add('is-checked');
                });
            }
        }
    } else if (this.classList.contains('_copy')) {
        console.log('_copy');
        let gantt_board_item_task_element = container.querySelector(`.list-group-item[id="${taskId}"]`);
        let create_gantt_board_item_task = gantt_board_item_task_element.cloneNode(true);
        apiCopyTask(taskId).then((result) => {
            console.log('apiCopyTask', result);
            let _task = taskTypeChanger(result.data.copied_task);
            create_gantt_board_item_task.setAttribute('id', _task.id);
            create_gantt_board_item_task.addEventListener('contextmenu', ganttContextTaskEventListener);
            create_gantt_board_item_task.querySelector('.dropright').addEventListener('click', ganttBoardTaskOptionClickEventListener);
            create_gantt_board_item_task.addEventListener('click', ganttBoardTaskClickEventListener);
            gantt_board_item_task_element.closest('.list-group').querySelector('.list-group-item:last-child').before(create_gantt_board_item_task);

            let _content = document.querySelector('.gantt-container ._gantt-timeline ._content');
            //create right side element
            if (_task.start_date !== undefined && _task.start_date !== null && _task.end_date !== undefined && _task.end_date !== null) {
                expandGanttWidth(_task.end_date);
                let position = getGanttTaskPosition(_task);
                let task_element = createGanttTaskElement(position, _task);
                $(_content).append(task_element);
                let inserted_task_element = $(_content).find(`.gantt-task[data-id="${_task.id}"]`)[0];
                inserted_task_element.querySelector('.checkbox').addEventListener('click', ganttTaskCheckboxClickEventListener);
            }
            updateTimelineTaskPosition();
        });
    } else if (this.classList.contains('_delete')) {
        console.log('_delete');
        apiDeleteTask(taskId).then((result) => {
            console.log('apiChangeTaskName', result);
            removeGanttTaskItemElement(taskId);
            updateTimelineTaskPosition();
        });
    }
    updateTimelineTaskPosition();
    closeGanttContextMenu(menu);
};

const removeGanttTaskItemElement = (taskId) => {
    let container = document.querySelector('.gantt-container');
    let gantt_board_item_task_element = container.querySelector(`.list-group-item[id="${taskId}"]`);
    if (gantt_board_item_task_element !== undefined && gantt_board_item_task_element !== null) {
        gantt_board_item_task_element.remove();
    }
    let gantt_timeline_item_task_element = container.querySelector(`._gantt-timeline ._content .gantt-task[data-id="${taskId}"]`);
    if (gantt_timeline_item_task_element !== undefined && gantt_timeline_item_task_element !== null) {
        gantt_timeline_item_task_element.remove();
    }
}

const createBoardItemWritableTitleElement = (taskId, value) => {
    return `<input type="text"
                   value="${value}"
                   name="${taskId}-title" data-origin-value="${value}"/>`;
};

function ganttBoardWritableElementInputKeyUpEventListener(event) {
    if (event.key === 'Escape'.toLowerCase() || event.code === 'Escape'.toLowerCase() || event.keyCode === 27) {
        ganttBoardWritableElementInputKeyUpUpdateListener(event, true);
    }
    if (event.key === 'Enter'.toLowerCase() || event.code === 'Enter'.toLowerCase() || event.keyCode === 13) {
        ganttBoardWritableElementInputKeyUpUpdateListener(event, false);
    }
};

//TODO 20221102 - 11번 - 우식
function ganttBoardWritableElementInputKeyUpUpdateListener(e, is_close) {
    let container = document.querySelector('.gantt-container');
    let gantt_board = e.target.closest('.card-header[data-id]');
    let gantt_board_title_container = gantt_board.querySelector('.title');
    let gantt_board_title_input = gantt_board_title_container.querySelector('input');
    let value;
    if (is_close) {
        value = gantt_board_title_input.dataset.originValue;
    } else {
        value = gantt_board_title_input.value;
    }
    apiChangeBoardName(gantt_board.dataset.id, value).then((result) => {
        console.log('apiChangeBoardName', result);
        updateGanttBoardName(gantt_board.querySelector('.title'), value);
        gantt_board_title_input.remove();
    });
    e.preventDefault();
}

function ganttBoardItemWritableElementInputKeyUpEventListener(event) {
    if (event.key === 'Escape'.toLowerCase() || event.code === 'Escape'.toLowerCase() || event.keyCode === 27) {
        ganttBoardItemWritableElementInputKeyUpUpdateListener(event, true);
    }
    if (event.key === 'Enter'.toLowerCase() || event.code === 'Enter'.toLowerCase() || event.keyCode === 13) {
        ganttBoardItemWritableElementInputKeyUpUpdateListener(event, false);
    }
};

//TODO 20221102 - 18번 - 우식
function ganttBoardItemWritableElementInputKeyUpUpdateListener(e, is_close) {
    let container = document.querySelector('.gantt-container');
    let gantt_board_task = e.target.closest('.list-group-item[id]');
    let gantt_timeline_task = container.querySelector(`._gantt-timeline ._content .gantt-task[data-id="${gantt_board_task.getAttribute('id')}"]`);
    let gantt_board_task_title_container = gantt_board_task.querySelector('.title');
    let gantt_board_task_title_input = gantt_board_task_title_container.querySelector('input');
    let value;
    if (is_close) {
        value = gantt_board_task_title_input.dataset.originValue;
    } else {
        value = gantt_board_task_title_input.value;
    }
    apiChangeTaskName().then((result) => {
        console.log('apiChangeTaskName', result);
        if (gantt_timeline_task !== undefined && gantt_timeline_task !== null) {
            updateGanttTaskName(gantt_timeline_task.querySelector('.gantt-info .task-title .title'), value);
        }
        updateGanttTaskName(gantt_board_task.querySelector('.title'), value);
        gantt_board_task_title_input.remove();
    });
    e.preventDefault();
}

const updateGanttBoardName = (element, value) => {
    element.innerHTML = `${value}`;
}
const updateGanttTaskName = (element, value) => {
    element.innerHTML = `${value}`;
}

function ganttContextTaskEventListener(event) {
    let context_menu = document.querySelector('#gantt-context-menu');
    let scrollTop = document.querySelector('html').scrollTop;
    let position = {top: event.clientY + scrollTop, left: event.clientX};
    //Context Menu Click Event is programmatically called logic
    if (position.top === undefined || position.left === undefined) {
        let board_task_element = this.closest('.list-group-item');
        position = {
            top: board_task_element.querySelector('.dropright').getBoundingClientRect().top + scrollTop,
            left: board_task_element.querySelector('.dropright').getBoundingClientRect().left + 20
        }
        let dropright = board_task_element.querySelector('.dropright');
        if (!dropright.classList.contains('is-showing')) {
            dropright.classList.add('is-showing')
        }
    }
    openGanttContextMenu(context_menu, this.getAttribute('id'), position);
    event.stopPropagation();
    event.preventDefault();
}

const openGanttContextMenu = (menu, task_id, position) => {
    let container = document.querySelector('.gantt-container');
    let gantt_board_task = container.querySelector(`._gantt-board .list-group li[id="${task_id}"]`);
    if (gantt_board_task.classList.contains('is-checked')) {
        menu.querySelector('._complete').style.display = 'none';
        menu.querySelector('._dis-complete').style.display = 'block';
    } else {
        menu.querySelector('._complete').style.display = 'block';
        menu.querySelector('._dis-complete').style.display = 'none';
    }
    menu.style.top = position.top + 'px';
    menu.style.left = position.left + 'px';
    menu.setAttribute('data-task-id', task_id);
    menu.style.display = 'block';
}

const closeGanttContextMenu = (menu) => {
    menu.style.top = 0 + 'px';
    menu.style.left = 0 + 'px';
    menu.removeAttribute('data-task-id');
    menu.style.display = 'none';
}

const openBoardOptionMenu = (menu, board_id, position) => {
    console.log(menu, board_id, position);
    menu.style.top = position.top + 'px';
    menu.style.left = position.left + 'px';
    menu.setAttribute('data-board-id', board_id);
    menu.style.display = 'block';
}

const closeGanttBoardOptionMenu = (menu) => {
    menu.style.top = 0 + 'px';
    menu.style.left = 0 + 'px';
    menu.removeAttribute('data-board-id');
    menu.style.display = 'none';
}

const initializeGantt = (boards) => {
    let _content = document.querySelector('.gantt-container ._gantt-timeline ._content');
    boards.forEach(function (board) {
        board.item.forEach(function (task) {
            if (task.start_date !== undefined && task.start_date !== null && task.end_date !== undefined && task.end_date !== null) {
                let position = getGanttTaskPosition(task);
                let task_element = createGanttTaskElement(position, task);
                $(_content).append(task_element);
                let inserted_task_element = $(_content).find(`.gantt-task[data-id="${task.id}"]`)[0];
                inserted_task_element.addEventListener('click', function (event) {
                    if (event.ctrlKey || event.shiftKey || event.altKey) {
                        event.preventDefault();
                        event.stopPropagation();
                        return;
                    }
                    rightTaskOpen(this.dataset.id);
                });
                inserted_task_element.querySelector('.checkbox').addEventListener('click', ganttTaskCheckboxClickEventListener);
            }
        });
    });

    let currentDate = new Date().toISOString().slice(0, 10);
    let currentDateElement = document.querySelector(`.gantt-container ._gantt-timeline ._date [data-date="${currentDate}"]`);
    if (currentDateElement !== null && currentDateElement !== undefined) {
        currentDateElement.classList.add('active');
        let span = document.createElement('span');
        span.classList.add('current');
        currentDateElement.appendChild(span);
    }
    return boards;
}

const createGanttLeftSide = (boards) => {
    let gantt_left_side = document.createElement('div');
    gantt_left_side.classList.add('_gantt-board');

    let title = document.createElement('div');
    title.classList.add('_title');
    title.innerText = '업무명';

    gantt_left_side.appendChild(title);

    let accordion = document.createElement('div');
    accordion.classList.add('accordion', 'board-container');
    accordion.setAttribute('id', 'gantt-accordion');
    boards.forEach(function (board, index) {
        let gantt_board = createGanttBoardElement(board, index);
        accordion.appendChild(gantt_board);
    });
    gantt_left_side.appendChild(accordion);

    let boardAdd = document.createElement('div');
    boardAdd.classList.add('_board-add');
    boardAdd.innerText = '섹션 추가하기';
    boardAdd.addEventListener('click', boardAddClickEventListener);
    gantt_left_side.appendChild(boardAdd);

    return gantt_left_side;
};

//TODO 20221102 - 10번 - 지우 O
function boardAddClickEventListener(event) {
    console.log(event, this);
    let last_index = document.querySelector('.gantt-container ._gantt-board #gantt-accordion .card:last-child .card-header[data-index]')?.dataset.index;
    if (last_index === undefined || last_index === null)
        last_index = 0;
    let board_id = tokenGenerator(8);
    let board = {
        project_hash: getURLParamByPrevAndNext('project', 'detail'),
        id: board_id,
        name: board_id,
        class: 'class1, class2, class3', // TODO java에선 class로 변수를 만들 수 없어서 model에 넣기 위해선 변수명 수정 필요
        percent: 0,
        item: []
    };
    createBoard(board).then((result) => {
        console.log(result);
        if (result.status === 'OK') {
            if (result.data.status) {
                board.id = result.data.board.id;
                let board_element = createGanttBoardElement(boardTypeChanger(board), parseInt(last_index) + 1);
                let accordion = document.querySelector('.gantt-container ._gantt-board #gantt-accordion');
                accordion.appendChild(board_element);
            } else {
                alert(result.data.error_message);
            }
        }
    });
}

const createGanttBoardElement = (board, index) => {
    let board_element = document.createElement('div');
    board_element.classList.add('card');

    let board_header = document.createElement('div');
    board_header.classList.add('card-header');
    board_header.setAttribute('id', `heading-${index}`);
    board_header.setAttribute('data-index', `${index}`);
    board_header.setAttribute('data-id', `${board.id}`);

    let h2 = document.createElement('h2');
    h2.classList.add('mb-0');

    let button = document.createElement('button');
    button.classList.add('btn', 'btn-link', 'btn-block', 'text-left');
    button.innerHTML = `<div class="dropdown"></div>`;
    let title = document.createElement('div');
    title.classList.add('title');
    title.innerHTML = `${board.title}`;
    button.appendChild(title);

    let dropright = document.createElement('div');
    dropright.classList.add('btn-group', 'dropright');

    let div = document.createElement('div');

    let img = document.createElement('img');
    img.classList.add('img-fluid');
    img.setAttribute('src', '/resources/assets/images/icon/board_options.svg');

    dropright.addEventListener('click', ganttBoardHeaderOptionClickEventListener);

    div.appendChild(img);
    dropright.appendChild(div);
    button.appendChild(dropright);

    ['type', 'data-toggle', 'data-target', 'aria-expanded', 'aria-controls'].forEach(function (attr) {
        switch (attr) {
            case 'type':
                button.setAttribute('type', 'button');
                break;
            case 'data-toggle':
                button.setAttribute('data-toggle', 'collapse');
                break;
            case 'data-target':
                button.setAttribute('data-target', `#collapse-${index}`);
                break;
            case 'aria-expanded':
                button.setAttribute('aria-expanded', 'true');
                break;
            case 'aria-controls':
                button.setAttribute('aria-controls', `#collapse-${index}`);
                break;
        }
    });
    h2.appendChild(button);
    board_header.appendChild(h2);
    board_element.appendChild(board_header);

    let board_collapse = document.createElement('div');
    board_collapse.setAttribute('id', `collapse-${index}`);
    board_collapse.classList.add('board-collapse', 'collapse', 'show');
    board_collapse.setAttribute('aria-labelledby', `heading-${index}`);

    let card_body = document.createElement('div');
    card_body.classList.add('card-body');

    let list_group = document.createElement('ul');
    list_group.classList.add('list-group', 'list-group-flush');
    TASK_ORDER++;
    board.item.forEach(function (task) {
        let gantt_board_task_element = createGanttBoardTaskElement(task);
        gantt_board_task_element.addEventListener('contextmenu', ganttContextTaskEventListener);
        gantt_board_task_element.querySelector('.dropright').addEventListener('click', ganttBoardTaskOptionClickEventListener);
        gantt_board_task_element.addEventListener('click', ganttBoardTaskClickEventListener);
        list_group.appendChild(gantt_board_task_element);
    });
    //업무 추가하기 버튼
    let add_li = createGanttBoardAddTaskElement();
    add_li.addEventListener('click', addTaskClickEventListener);

    list_group.appendChild(add_li);
    card_body.appendChild(list_group);
    board_collapse.appendChild(card_body);
    board_element.appendChild(board_collapse);
    return board_element;
}

function ganttBoardHeaderOptionClickEventListener(event) {
    console.log('ganttBoardHeaderOptionClickEventListener', event, this);
    let context_menu = document.querySelector('#gantt-board-option-menu');
    let board_id = this.closest('.card-header').dataset.id;
    let scrollTop = document.querySelector('html').scrollTop;
    let position = {top: event.clientY + scrollTop, left: event.clientX};

    openBoardOptionMenu(context_menu, board_id, position);
    event.preventDefault();
    event.stopPropagation();
}

function ganttBoardTaskOptionClickEventListener(event) {
    console.log('ganttBoardTaskOptionClickEventListener', this);
    this.closest('.list-group-item').dispatchEvent(new Event('contextmenu'));
    event.stopPropagation();
    event.preventDefault();
}

function ganttBoardTaskClickEventListener(event) {
    console.log('ganttBoardTaskClickEventListener', this, event);
    let task_id = this.getAttribute('id');
    moveScrollToTimelineTask(task_id);
    event.preventDefault();
    event.stopPropagation();
}

const createGanttBoardAddTaskElement = () => {
    let add_li = document.createElement('li');
    add_li.classList.add('list-group-item');
    add_li.style.color = '#F06A6A';
    add_li.setAttribute('order', TASK_ORDER++);
    add_li.innerHTML = `<svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M7 0C7.23206 0 7.45462 0.0921874 7.61872 0.256282C7.78281 0.420376 7.875 0.642936 7.875 0.875V6.125H13.125C13.3571 6.125 13.5796 6.21719 13.7437 6.38128C13.9078 6.54538 14 6.76794 14 7C14 7.23206 13.9078 7.45462 13.7437 7.61872C13.5796 7.78281 13.3571 7.875 13.125 7.875H7.875V13.125C7.875 13.3571 7.78281 13.5796 7.61872 13.7437C7.45462 13.9078 7.23206 14 7 14C6.76794 14 6.54538 13.9078 6.38128 13.7437C6.21719 13.5796 6.125 13.3571 6.125 13.125V7.875H0.875C0.642936 7.875 0.420376 7.78281 0.256282 7.61872C0.0921874 7.45462 0 7.23206 0 7C0 6.76794 0.0921874 6.54538 0.256282 6.38128C0.420376 6.21719 0.642936 6.125 0.875 6.125H6.125V0.875C6.125 0.642936 6.21719 0.420376 6.38128 0.256282C6.54538 0.0921874 6.76794 0 7 0Z" fill="#F06A6A"></path>
                                         </svg>업무 추가하기`;
    return add_li;
}
const createGanttBoardTaskElement = (task) => {
    let li = document.createElement('li');
    li.classList.add('list-group-item');
    if (task.complete) {
        li.classList.add('is-checked');
    }
    li.setAttribute('id', `${task.id}`);
    li.setAttribute('order', TASK_ORDER++);
    li.setAttribute('data-show', true);
    li.innerHTML = `<div class="title">${task.title}</div>
                    <div class="btn-group dropright">
                      <div>
                        <img class="img-fluid" src="/resources/assets/images/icon/board_options.svg">
                      </div>
                    </div>`;
    return li;
}

//TODO 20221102 - 16번 - 지우 O
function addTaskClickEventListener(event) {
    let task_id = tokenGenerator(6);
    let current_date = new Date().toISOString().slice(0, 10);
    console.log(event);
    let task = {
        id: task_id,
        title: task_id,
        board_id: event.target.closest('.card').querySelector('.card-header').dataset.id,  // TODO Board_id get
        complete: false,
    };
    // TODO Task 초기 생성 시 start_date, end_date === null => date === null 인 요소에 대해 처리 후 생성 function 넣기
    createTask(task).then((result) => {
        console.log(result);
        if (result.status === 'OK') {
            if (result.data.status) {
                task = result.data.task;
//create left side element
                let gantt_board_task_element = createGanttBoardTaskElement(task);
                gantt_board_task_element.addEventListener('contextmenu', ganttContextTaskEventListener);
                gantt_board_task_element.querySelector('.dropright').addEventListener('click', ganttBoardTaskOptionClickEventListener);
                gantt_board_task_element.addEventListener('click', ganttBoardTaskClickEventListener);
                this.before(gantt_board_task_element);

                let _content = document.querySelector('.gantt-container ._gantt-timeline ._content');
                //create right side element
                if (task.start_date !== undefined && task.start_date !== null && task.end_date !== undefined && task.end_date !== null) {
                    expandGanttWidth(task.end_date);
                    let position = getGanttTaskPosition(task);
                    let task_element = createGanttTaskElement(position, task);
                    $(_content).append(task_element);
                    let inserted_task_element = $(_content).find(`.gantt-task[data-id="${task.id}"]`)[0];
                    console.log('inserted_task_element', inserted_task_element);
                    inserted_task_element.addEventListener('click', function (event) {
                        rightTaskOpen(this.dataset.id);
                    });
                    inserted_task_element.querySelector('.checkbox').addEventListener('click', ganttTaskCheckboxClickEventListener);
                }
            } else {
                alert(result.data.error_message);
            }
        }
    })
}

//TODO 20221102 - 14번 - 우식
function ganttTaskCheckboxClickEventListener(event) {
    let is_checked = false;
    let container = document.querySelector('.gantt-container');
    let gantt_task = this.closest('.gantt-task[data-id]');
    let task_id = gantt_task.dataset.id;
    if (!gantt_task.classList.contains('is-checked')) {
        is_checked = true;
    }
    let gantt_board_task = container.querySelector(`._gantt-board .list-group li[id="${task_id}"]`);
    if (!is_checked && gantt_board_task.classList.contains('is-checked')) {
        apiUpdateTaskStatus(task_id).then((result) => {
            console.log('apiUpdateTaskStatus', result);
            gantt_task.classList.remove('is-checked');
            gantt_board_task.classList.remove('is-checked');
        });
    } else {
        apiUpdateTaskStatus(task_id).then((result) => {
            console.log('apiUpdateTaskStatus', result);
            gantt_task.classList.add('is-checked');
            gantt_board_task.classList.add('is-checked');
        });
    }
    event.preventDefault();
    event.stopPropagation();
}

const createGanttRightSide = (boards) => {
    let years = getYears(boards);
    let months = getMonths(boards);
    let contentMinWidth = 0;

    let gantt_timeline = document.createElement('div');
    gantt_timeline.classList.add('_gantt-timeline');

    let gantt_header = document.createElement('div');
    gantt_header.classList.add('_gantt-header')

    let _year = document.createElement('div');
    _year.classList.add('_year');
    years.forEach(function (year) {
        let year_element = document.createElement('div');
        year_element.setAttribute('data-year', year);

        let year_text = document.createElement('span');
        year_text.innerText = `${year}`;
        year_element.appendChild(year_text);

        let year_months = months.filter(function (value, index) {
            if (value.includes(year)) {
                return true;
            }
            return false;
        });

        let total_date = 0;
        year_months.forEach(function (month) {
            let first_date = 1;
            let last_date = new Date(month.substring(0, month.lastIndexOf('-')) * 1, month.substring(month.lastIndexOf('-') + 1) * 1, 0).getDate();
            total_date += (last_date - first_date + 1);
        });
        year_element.style.minWidth = ((12 + 12 + 20) * total_date) + 'px';
        contentMinWidth += ((12 + 12 + 20) * total_date);
        _year.appendChild(year_element);
    });
    gantt_header.appendChild(_year);
    let _month = document.createElement('div');
    _month.classList.add('_month')
    months.forEach(function (month) {
        let month_element = document.createElement('div');
        month_element.setAttribute('data-year', month.substring(0, month.lastIndexOf('-')) * 1);
        month_element.setAttribute('data-month', month.substring(month.lastIndexOf('-') + 1) * 1);

        let month_text = document.createElement('span');
        month_text.innerText = `${month.substring(month.lastIndexOf('-') + 1) * 1}`;
        month_element.appendChild(month_text);
        let first_date = 1;
        let last_date = new Date(month.substring(0, month.lastIndexOf('-')) * 1, month.substring(month.lastIndexOf('-') + 1) * 1, 0).getDate();
        month_element.style.minWidth = ((12 + 12 + 20) * (last_date - first_date + 1)) + 'px';
        _month.appendChild(month_element);
    });
    gantt_header.appendChild(_month);
    let _date = document.createElement('div');
    _date.classList.add('_date');
    months.forEach(function (month) {
        let first_date = 1;
        let last_date = new Date(month.substring(0, month.lastIndexOf('-')) * 1, month.substring(month.lastIndexOf('-') + 1) * 1, 0).getDate();
        for (let i = first_date; i <= last_date; i++) {
            let date_element = document.createElement('div');
            date_element.setAttribute('data-year', month.substring(0, month.lastIndexOf('-')));
            date_element.setAttribute('data-month', month.substring(month.lastIndexOf('-') + 1));
            date_element.setAttribute('data-day', i < 10 ? '0' + i : i);
            date_element.setAttribute('data-date', month + '-' + (i < 10 ? '0' + i : i));
            let date_text = document.createElement('span');
            date_text.innerText = `${i}`;
            date_element.appendChild(date_text);
            let weekend = getDayOfWeek(date_element.dataset.date);
            if (weekend === '토' || weekend === '일') {
                let span = document.createElement('span');
                span.classList.add('weekend');
                date_element.appendChild(span);
            }
            _date.appendChild(date_element);
        }
    });
    gantt_header.appendChild(_date);
    let _content = document.createElement('div');
    _content.classList.add('_content');
    _content.style.minWidth = contentMinWidth + 'px';

    gantt_header.appendChild(_content);

    gantt_timeline.appendChild(gantt_header);
    return gantt_timeline;
};

const getGanttTaskPosition = (task) => {
    let left_task = findLeftTask(task.id)[0];
    let left_task_parent = left_task.closest('#gantt-accordion');

    let timeline_element = $('._gantt-timeline').find(`[data-date="${task.start_date}"]`)[0];
    let timeline_parent = timeline_element.closest('._date');
    return {
        top: left_task.getBoundingClientRect().top - left_task_parent.getBoundingClientRect().top + 2,
        left: timeline_element.getBoundingClientRect().left - timeline_parent.getBoundingClientRect().left + 8,
        width: getDistance(task.start_date, task.end_date)
    }
}

const getDistance = (start_date, end_date) => {
    let startDate = new Date(start_date).getTime();
    let endDate = new Date(end_date).getTime();
    const elapsedMSec = endDate - startDate;
    const elapsedDay = elapsedMSec / (1000 * 60 * 60 * 24);
    return elapsedDay <= 0 ? 0 : (elapsedDay + 1) * 44 - 16;
}

const findLeftTask = (id) => {
    return $('#gantt-accordion').find(`li.list-group-item[id="${id}"]`);
}

const createGanttTaskElement = (position, task) => {
    let _class = '';
    if (position.width === 0) {
        _class = 'day one';
    } else if (position.width <= 72 && position.width > 0) {
        _class = 'day two';
    } else if (position.width <= 116) {
        _class = 'day third';
    }
    let is_profile = true;
    if (task.profiles.length === 0) {
        is_profile = false;
    } else {
        is_profile = true;
    }
    return `<div class="gantt-task ${_class} ${task.complete ? 'is-checked' : ''}" data-width="${position.width}" data-start-date="${task.start_date}" data-end-date="${task.end_date}" data-id="${task.id}"
                     style="width: ${position.width}px; top: ${position.top}px; left: ${position.left}px;">
              <div class="gantt-inner-container">
                <div class="gantt-info">
                  <span class="divider"></span>
                  <img style="min-width: 24px; ${!is_profile ? 'display:none;' : ''}" width="24" height="24" src="${is_profile ? task.profiles[0].url : ''}"/>
                  <div class="task-title"><div class="title">${task.title}</div></div>
                  <span class="checkbox"><i class="fas fa-check" aria-hidden="true"></i></span>
                </div>
              </div>
            </div>`;
};

const getYears = (boards) => {
    let years = new Array();
    let min_year = 9999;
    let max_year = 0;
    let current_date = new Date().toISOString().slice(0, 10);
    boards.forEach(function (board) {
        board.item.forEach(function (task) {
            if (task.start_date !== undefined && task.start_date !== null && task.end_date !== undefined && task.end_date !== null) {
                if (min_year > getYear(task.start_date)) {
                    min_year = getYear(task.start_date);
                }
                if (max_year < getYear(task.end_date)) {
                    max_year = getYear(task.end_date);
                }
            }
        });
    });
    if (max_year === 0 && min_year === 9999) {
        max_year = getYear(current_date);
        min_year = getYear(current_date);
    }

    for (let y = min_year; y <= max_year; y++) {
        years.push(y);
    }
    return years;
}

const getYear = (date_str) => {
    return date_str.substring(0, 4) * 1;
}

const updatePositions = (_boards) => {
    if (_boards !== null && _boards !== undefined) {
        _boards.forEach(function (board) {
            board.item.forEach(function (task) {
                let timeline_task = findTimelineTask(task.id);
                expandGanttWidth(task.end_date);
                updatePosition(task, timeline_task);
            });
        });
    } else {
        boards.forEach(function (board) {
            board.item.forEach(function (task) {
                let timeline_task = findTimelineTask(task.id);
                expandGanttWidth(task.end_date);
                updatePosition(task, timeline_task);
            });
        });
    }
}

const updatePosition = (task, element) => {
    //width, top, left, start,end
    let position = getGanttTaskPosition(task);
    element.style.width = position.width + 'px';
    element.style.top = position.top + 'px';
    element.style.left = position.left + 'px';
    element.setAttribute('data-start-date', task.start_date);
    element.setAttribute('data-end-date', task.end_date);
}

const expandGanttWidth = (end_date) => {
    let last_date_element = document.querySelector('.gantt-container ._gantt-timeline ._gantt-header ._date [data-year][data-month][data-day][data-date]:last-child');
    let last_date = last_date_element.dataset.date;
    let _last_date = new Date(last_date);
    _last_date = new Date(_last_date.setDate(_last_date.getDate() + 1));	// 하루후 -> 10월 마지막 날짜 + 1 -> 11월 01일
    let _end_date = new Date(end_date);
    if (last_date < end_date) {
        let contentMinWidth = 0;
        let gantt_header = document.querySelector('.gantt-container ._gantt-timeline ._gantt-header');
        let _content = gantt_header.querySelector('._content');
        let _year = gantt_header.querySelector('._year');
        let _month = gantt_header.querySelector('._month');
        let _date = gantt_header.querySelector('._date');
        let months = getMonthsStartToLast(_last_date, _end_date);
        let years = new Array();

        let min_year = 9999;
        let max_year = 0;
        months.forEach(function (month_date) {
            if (min_year > getYear(month_date)) {
                min_year = getYear(month_date);
            }
            if (max_year < getYear(month_date)) {
                max_year = getYear(month_date);
            }
        });
        for (let y = min_year; y <= max_year; y++) {
            years.push(y);
        }

        years.forEach(function (year) {
            let year_element = document.createElement('div');
            year_element.setAttribute('data-year', year);

            let year_text = document.createElement('span');
            year_text.innerText = `${year}`;
            year_element.appendChild(year_text);

            let year_months = months.filter(function (value, index) {
                if (value.includes(year)) {
                    return true;
                }
                return false;
            });

            let total_date = 0;
            year_months.forEach(function (month) {
                let first_date = 1;
                let last_date = new Date(month.substring(0, month.lastIndexOf('-')) * 1, month.substring(month.lastIndexOf('-') + 1) * 1, 0).getDate();
                total_date += (last_date - first_date + 1);
            });
            year_element.style.minWidth = ((12 + 12 + 20) * total_date) + 'px';
            contentMinWidth += ((12 + 12 + 20) * total_date);
            _year.appendChild(year_element);
        });
        months.forEach(function (month) {
            let month_element = document.createElement('div');
            month_element.setAttribute('data-year', month.substring(0, month.lastIndexOf('-')) * 1);
            month_element.setAttribute('data-month', month.substring(month.lastIndexOf('-') + 1) * 1);

            let month_text = document.createElement('span');
            month_text.innerText = `${month.substring(month.lastIndexOf('-') + 1) * 1}`;
            month_element.appendChild(month_text);
            let first_date = 1;
            let last_date = new Date(month.substring(0, month.lastIndexOf('-')) * 1, month.substring(month.lastIndexOf('-') + 1) * 1, 0).getDate();
            month_element.style.minWidth = ((12 + 12 + 20) * (last_date - first_date + 1)) + 'px';
            _month.appendChild(month_element);

            for (let i = first_date; i <= last_date; i++) {
                let date_element = document.createElement('div');
                date_element.setAttribute('data-year', month.substring(0, month.lastIndexOf('-')));
                date_element.setAttribute('data-month', month.substring(month.lastIndexOf('-') + 1));
                date_element.setAttribute('data-day', i < 10 ? '0' + i : i);
                date_element.setAttribute('data-date', month + '-' + (i < 10 ? '0' + i : i));
                let date_text = document.createElement('span');
                date_text.innerText = `${i}`;
                date_element.appendChild(date_text);
                let weekend = getDayOfWeek(date_element.dataset.date);
                if (weekend === '토' || weekend === '일') {
                    let span = document.createElement('span');
                    span.classList.add('weekend');
                    date_element.appendChild(span);
                }
                _date.appendChild(date_element);
            }
        });
        _content.style.minWidth = parseInt(_content.style.minWidth.substring(0, _content.style.minWidth.lastIndexOf('px'))) + contentMinWidth + 'px';

        let currentDate = new Date().toISOString().slice(0, 10);
        let currentDateElement = _date.querySelector(`[data-date="${currentDate}"]`);
        if (currentDateElement !== null && currentDateElement !== undefined) {
            if (!currentDateElement.classList.contains('active')) {
                currentDateElement.classList.add('active');
                let span = document.createElement('span');
                span.classList.add('current');
                currentDateElement.appendChild(span);
            }
        }
    }
}

const getMonths = (boards) => {
    let dates = new Array();
    boards.forEach(function (board) {
        board.item.forEach(function (task) {
            if (task.start_date !== undefined && task.start_date !== null && task.end_date !== undefined && task.end_date !== null) {
                dates.push(Date.parse(task.start_date));
                dates.push(Date.parse(task.end_date));
            }
        });
    });
    let maxDate = new Date(Math.max.apply(null, dates));
    let minDate = new Date(Math.min.apply(null, dates));
    return getMonthsStartToLast(dates.length !== 0 ? minDate : null, dates.length !== 0 ? maxDate : null);
}

function getMonthsStartToLast(startDate, lastDate) {
    let start_date_str = startDate !== null ? startDate.toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
    let end_date_star = lastDate !== null ? lastDate.toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
    let regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    if (!(regex.test(start_date_str) && regex.test(end_date_star))) return "Not Date Format";
    let result = [];
    let curDate = new Date(start_date_str);
    let end_date = new Date(end_date_star);
    let end_date_str = new Date(end_date.setDate(end_date.getDate() + 6)).toISOString().slice(0, 10);
    while (curDate <= new Date(end_date_str)) {
        result.push(curDate.toISOString().split("T")[0].substring(0, 7));
        curDate.setDate(curDate.getDate() + 1);
    }

    const dupArr = result;
    const set = new Set(dupArr);
    const uniqueArr = [...set];
    return uniqueArr;
}

function getDayOfWeek(date) {
    const dayOfWeek = WEEK[new Date(date).getDay()];
    return dayOfWeek;
}

function ganttScrollTopMouseMoveEventListener(event) {
    console.log('ganttScrollTopMouseMoveEventListener');
    // How far the mouse has been moved
    const dx = event.clientX - SCROLL_POSITION.x;
    const dy = event.clientY - SCROLL_POSITION.y;

    // Scroll the element
    BODY_ELEMENT.scrollTop = SCROLL_POSITION.top - dy;
    BODY_ELEMENT.scrollLeft = SCROLL_POSITION.left - dx;
}

function ganttScrollTopMouseDownEventListener(event) {
    console.log('ganttScrollTopMouseDownEventListener');
    SCROLL_POSITION = {
        // The current scroll
        left: BODY_ELEMENT.scrollLeft,
        top: BODY_ELEMENT.scrollTop,
        // Get the current mouse position
        x: event.clientX,
        y: event.clientY,
    };
    BODY_ELEMENT.addEventListener('mousemove', ganttScrollTopMouseMoveEventListener);
    BODY_ELEMENT.addEventListener('mouseup', ganttScrollTopMouseUpEventListener);
}

function ganttScrollTopMouseUpEventListener(event) {
    console.log('ganttScrollTopMouseUpEventListener');
    BODY_ELEMENT.removeEventListener('mousemove', ganttScrollTopMouseMoveEventListener);
    BODY_ELEMENT.removeEventListener('mouseup', ganttScrollTopMouseUpEventListener);
}

function moveScrollToTimelineTask(task_id, effectTimeout = 500, callbackTimeout = 1000) {
    let gantt_task = findTimelineTask(task_id);
    if (gantt_task !== undefined && gantt_task !== null) {
        let gantt_timeline_container = document.querySelector('._gantt-timeline');
        //Y축 중앙 정렬, X축 태스크의 - 200 정렬
        let position = {
            x: gantt_task.style.left.substring(0, gantt_task.style.left.lastIndexOf('px')) * 1 - 200,
            y: BODY_ELEMENT.scrollTop + gantt_task.getBoundingClientRect().top - (BODY_ELEMENT.clientHeight / 2)
        }
        gantt_timeline_container.scroll({left: position.x, behavior: 'smooth'});
        BODY_ELEMENT.scroll({top: position.y, behavior: 'smooth'});
        setTimeout(function () {
            gantt_task.style.outline = '2px solid #F06A6A';
            $(gantt_task).effect('highlight', {color: '#FFF'}, callbackTimeout, timelineTaskOutlineHighlightCallback);
        }, effectTimeout);
    } else {
        viewAlert({content: '해당 업무는 타임라인에 표시되지 않아 찾을 수 없습니다. 날짜를 설정해주세요.'});
    }
}

function timelineTaskOutlineHighlightCallback() {
    console.log('timelineTaskOutlineHighlightCallback');
    this.style.outline = '2px solid transparent';
}