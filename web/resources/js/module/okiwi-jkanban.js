'use strict';
let kanban;
const initializeKanban = (boards) => {
    const taskAddOption = {
        enabled: true, content: '업무 추가하기', footer: true, class: 'kanban-add-task btn btn-block',
    };
    const addBoardOption = {
        title: `<button class="kanban-add-board btn btn-block">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M7 0C7.23206 0 7.45462 0.0921874 7.61872 0.256282C7.78281 0.420376 7.875 0.642936 7.875 0.875V6.125H13.125C13.3571 6.125 13.5796 6.21719 13.7437 6.38128C13.9078 6.54538 14 6.76794 14 7C14 7.23206 13.9078 7.45462 13.7437 7.61872C13.5796 7.78281 13.3571 7.875 13.125 7.875H7.875V13.125C7.875 13.3571 7.78281 13.5796 7.61872 13.7437C7.45462 13.9078 7.23206 14 7 14C6.76794 14 6.54538 13.9078 6.38128 13.7437C6.21719 13.5796 6.125 13.3571 6.125 13.125V7.875H0.875C0.642936 7.875 0.420376 7.78281 0.256282 7.61872C0.0921874 7.45462 0 7.23206 0 7C0 6.76794 0.0921874 6.54538 0.256282 6.38128C0.420376 6.21719 0.642936 6.125 0.875 6.125H6.125V0.875C6.125 0.642936 6.21719 0.420376 6.38128 0.256282C6.54538 0.0921874 6.76794 0 7 0Z" fill="#F06A6A"></path>
                    </svg>
                    섹션 추가하기
               </button>`, id: 'add-board', class: 'kanban-board add-board', onClick: function (self) {
            boards = [{
                id: tokenGenerator(8), title: tokenGenerator(8), class: 'class1, class2, class3', percent: 0, item: [],
            }];
            self.addBoards(boards, false, {
                baseId: self.options.addBoardOption.id, direction: 'prepend'
            });
        }
    }
    kanban = new jKanban({
        element: '.kanban-board-container',
        gutter: '0',
        widthBoard: '286px',
        responsivePercentage: false,
        dragItems: true,
        boards: boards,
        dragBoards: true,
        itemAddOptions: taskAddOption,
        addBoardOption: addBoardOption, // 태스크 체크박스 클릭 이벤트 리스너
        check: checkboxClickEventListener, // 태스크 클릭 이벤트
        click: kanbanClickTaskEventListener,
        subTaskClick: kanbanClickSubTaskEventListener, // 태스크 오른쪽 클릭 이벤트
        context: kanbanContextTaskEventListener, // 태스크 드래그 이벤트
        dragEl: kanbanDragTaskEventListener, // 태스크 드래그 종료 이벤트
        dragendEl: kanbanDragEndTaskEventListener, // 태스크 드랍 이벤트
        dropEl: kanbanDropTaskEventListener, // 태스크 추가 옵션
        addTask: kanbanAddTaskEventListener, // 보드 드래그 이벤트
        dragBoard: kanbanDragBoardEventListener, // 보드 드래그 종료 이벤트
        dragendBoard: kanbanDragEndBoardEventListener, // 보드 드랍 이벤트
        dropBoard: kanbanDropBoardEventListener, // 보드 옵션 이벤트
        updateBoard: kanbanUpdateBoardEventListener,
    });
    updatePercents(kanban);

    //Context Menu Clear Event
    /*document.querySelector('.kanban-board-container').addEventListener('contextmenu', function (event) {
        let menu = document.querySelector('#context-menu');
        closeContextMenu(menu);
    });*/
    //Context Menu Event Initialize
    /*$('#context-menu').on('click', '.list-group a', contextMenuClickEventListener);*/
    //Dropdown Menu Event Initialize
    $('.kanban-board-container .kanban-board-header .kanban-board-option .dropright').on('show.bs.dropdown', optionDropdownShowEventListener);
    $('.kanban-board-container .kanban-board-header .kanban-board-option .dropright').on('hide.bs.dropdown', optionDropdownHideEventListener);
    return kanban;
};

function optionDropdownShowEventListener(event) {
    let option = this.closest('.kanban-board-option');
    if (!option.classList.contains('is-dropdown')) {
        option.classList.add('is-dropdown');
    }
}

function optionDropdownHideEventListener(event) {
    let option = this.closest('.kanban-board-option');
    if (option.classList.contains('is-dropdown')) {
        option.classList.remove('is-dropdown');
    }
}

//TODO 20221102 - 27번 - 지우
//TODO 20221102 - 27번 - 지우
//TODO 20221102 - 14번 - 우식
//TODO 20221102 - 15번 - 우식
//TODO 20221102 - 19번 - 우식
function contextMenuClickEventListener(event) {
    let menu = this.closest('#context-menu');
    let taskId = menu.dataset.taskId;
    let boardId = menu.dataset.boardId;
    const board = kanban.findBoardJSON(boardId);
    let task = kanban.findTaskJSON(boardId, taskId);

    if (this.classList.contains('_cover')) {
        let container = document.querySelector('.cover-input-file-container');
        deleteChild(container);
        let input_element = document.createElement('input');
        input_element.type = 'file';
        input_element.id = 'cover-file';
        input_element.addEventListener('change', function (event) {
            let task_element = kanban.findElement(taskId);
            let kanban_item_cover = task_element.querySelector('.kanban-item-cover');
            //TODO Fetch
            let image = {
                url: URL.createObjectURL(this.files[0]), size: 999, name: 'test.png', type: 'image/jpeg'
            };
            if (kanban_item_cover !== undefined && kanban_item_cover !== null) {
                kanban_item_cover.style.backgroundImage = `url('${image.url}')`;
                task.cover = image;
            } else {
                kanban_item_cover = document.createElement('div');
                kanban_item_cover.classList.add('kanban-item-cover');
                kanban_item_cover.style.backgroundImage = `url('${image.url}')`;
                task_element.prepend(kanban_item_cover);
                task.cover = image;
            }
        });
        container.appendChild(input_element);
        input_element.click();
    } else if (this.classList.contains('_cover-delete')) {
        let task_element = kanban.findElement(taskId);
        task_element.querySelector('.kanban-item-cover').remove();
        task.cover = null;
        delete task.cover;
    } else if (this.classList.contains('_edit')) {
        let task_element = kanban.findElement(taskId);
        let task_title = task_element.querySelector('.kanban-item-title');
        let value = task_title.querySelector('.title').innerText;
        task_title.innerHTML = createTaskWritableTitleElement(taskId, value);
        let input_title = task_element.querySelector(`[name="${taskId}-title"]`);
        input_title.addEventListener('keyup', taskInputKeyUpEventListener);
        input_title.addEventListener('mousedown', mouseDownEventListener);
        input_title.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
        });
    } else if (this.classList.contains('_complete')) {
        let el = kanban.findElement(taskId).querySelector('.checkbox');
        if (!el.classList.contains('active')) {
            apiUpdateTaskStatus(taskId).then((result) => {
                console.log('apiUpdateTaskStatus', result);
                task.complete = true;
                el.classList.add('active');
                const board = kanban.findBoardJSON(boardId);
                updatePercent(kanban, board);
            });
        }
    } else if (this.classList.contains('_dis-complete')) {
        let el = kanban.findElement(taskId).querySelector('.checkbox');
        if (el.classList.contains('active')) {
            apiUpdateTaskStatus(taskId).then((result) => {
                console.log('apiUpdateTaskStatus', result);
                task.complete = false;
                el.classList.remove('active');
                const board = kanban.findBoardJSON(boardId);
                updatePercent(kanban, board);
            });
        }
    } else if (this.classList.contains('_copy')) {
        apiCopyTask(taskId).then((result) => {
            console.log('apiCopyTask', result);
            let _task = taskTypeChanger(result.data.copied_task);
            kanban.addTaskAndElement(boardId, _task);
            const board = kanban.findBoardJSON(boardId);
            updatePercent(kanban, board);
        });
    } else if (this.classList.contains('_delete')) {
        //삭제
        kanban.removeTask(board, task);
        kanban.removeElement(taskId);
        updatePercent(kanban, board);
    } else if (this.classList.contains('_subtask') && this.classList.contains('_open')) {
        let task_element = kanban.findElement(taskId);
        task_element.querySelector('.kanban-sub-item-container').style.display = 'block';
    } else if (this.classList.contains('_subtask') && this.classList.contains('_close')) {
        let task_element = kanban.findElement(taskId);
        task_element.querySelector('.kanban-sub-item-container').style.display = 'none';
    }
    closeContextMenu(menu);
    event.stopPropagation();
    event.preventDefault();
};

//TODO 20221102 - 14번 - 우식
const checkboxClickEventListener = (kanban, el) => {
    let boardId = el.closest('.kanban-board[data-id]').dataset.id;
    let taskId = el.closest('.kanban-item').dataset.eid;
    let task = kanban.findTaskJSON(boardId, taskId);
    if (!el.classList.contains('active')) {
        apiUpdateTaskStatus(taskId).then((result) => {
            console.log('apiUpdateTaskStatus', result);
            task.complete = true;
            el.classList.add('active');
            const board = kanban.findBoardJSON(boardId);
            updatePercent(kanban, board);
        });
    } else {
        apiUpdateTaskStatus(taskId).then((result) => {
            console.log('apiUpdateTaskStatus', result);
            task.complete = false;
            el.classList.remove('active');
            const board = kanban.findBoardJSON(boardId);
            updatePercent(kanban, board);
        });
    }
}

//TODO 20221102 - 28번 - 우식
const kanbanClickSubTaskEventListener = (el) => {
    console.log('kanbanClickSubTaskEventListener', el);
    let boardId = el.closest('.kanban-board[data-id]').dataset.id;
    let taskId = el.closest('.kanban-item').dataset.eid;
    let task = kanban.findTaskJSON(boardId, taskId);
    let subtask_id = el.dataset.id;
    let subtask = findSubTask(task, subtask_id);
    if (!el.classList.contains('active')) {
        subtask.complete = true;
        el.classList.add('active');
    } else {
        subtask.complete = false;
        el.classList.remove('active');
    }
}

const kanbanClickTaskEventListener = (el) => {
    console.log('click', el);
    //TODO Logic Add case rightSideLayout is not null or not undefined
    rightTaskOpen(el.dataset.eid);
};

const kanbanContextTaskEventListener = (el, event) => {
    //console.log('context', el, event);
    const board_element = el.closest('.kanban-board');
    const boardId = board_element.dataset.id;
    const board = kanban.findBoardJSON(boardId);
    let taskId = el.dataset.eid;
    let task = kanban.findTaskJSON(boardId, taskId);
    let context_menu = document.querySelector('#context-menu');
    let position = {top: event.clientY, left: event.clientX};
    //Context Menu Click Event is programmatically called logic
    if (position.top === undefined || position.left === undefined) {
        let task_element = kanban.findElement(task.id);
        position = {
            top: task_element.querySelector('.dropright').getBoundingClientRect().top,
            left: task_element.querySelector('.dropright').getBoundingClientRect().left
        }
        let dropright = task_element.querySelector('.dropright');
        if (!dropright.classList.contains('is-showing')) {
            dropright.classList.add('is-showing')
        }
    }
    openContextMenu(context_menu, boardId, taskId, position);
    event.preventDefault();
    event.stopPropagation();
};
const closeContextMenu = (menu) => {
    let task_id = menu.dataset.taskId;
    if (task_id !== undefined && task_id !== null) {
        let kanban_item = kanban.findElement(task_id);
        let dropright = kanban_item?.querySelector('.dropright');
        if (dropright !== null && dropright !== undefined && dropright.classList.contains('is-showing')) {
            dropright.classList.remove('is-showing')
        }
    }
    menu.style.top = 0 + 'px';
    menu.style.left = 0 + 'px';
    menu.removeAttribute('data-board-id');
    menu.removeAttribute('data-task-id');
    menu.style.display = 'none';
};
const openContextMenu = (menu, board_id, task_id, position) => {
    let task = kanban.findElement(task_id);
    let task_json = kanban.findTaskJSON(board_id, task_id);
    let is_cover = task.querySelector('.kanban-item-cover') !== null && task.querySelector('.kanban-item-cover') !== undefined ? true : false;
    if (is_cover) {
        menu.querySelector('._cover-delete').style.display = 'block';
    } else {
        menu.querySelector('._cover-delete').style.display = 'none';
    }
    let is_sub_container = task.querySelector('.kanban-sub-item-container').style.display === 'block' ? true : false;

    if (is_sub_container) {
        menu.querySelector('._subtask._open').style.display = 'none';
        menu.querySelector('._subtask._close').style.display = 'block';
    } else {
        menu.querySelector('._subtask._open').style.display = 'block';
        menu.querySelector('._subtask._close').style.display = 'none';
    }
    if (task_json.complete) {
        menu.querySelector('._dis-complete').style.display = 'block';
        menu.querySelector('._complete').style.display = 'none';
    } else {
        menu.querySelector('._dis-complete').style.display = 'none';
        menu.querySelector('._complete').style.display = 'block';
    }
    menu.style.top = position.top + 'px';
    menu.style.left = position.left + 'px';
    menu.setAttribute('data-board-id', board_id);
    menu.setAttribute('data-task-id', task_id);
    menu.style.display = 'block';
};

//TODO 20221102 - 12번, 20번 - 우식
const kanbanDragTaskEventListener = (el, source) => {
    const prev_board = source;
    const prev_task = el;
    let context_menu = document.querySelector('#context-menu');
    closeContextMenu(context_menu);
    //console.log('dragEl', 'prev_board', prev_board, 'prev_task', prev_task);
};

//TODO 20221102 - 12번, 20번 - 우식
const kanbanDragEndTaskEventListener = (el) => {
    //console.log('dragendEl', el);
};

//TODO 20221102 - 12번, 20번 - 우식
const kanbanDropTaskEventListener = (self, el, target, source, sibling) => {
    let source_board_element = source.closest('.kanban-board[data-id]');
    let target_board_element = target.closest('.kanban-board[data-id]');

    let source_board = self.findBoardJSON(source_board_element.dataset.id);
    let task = self.findTaskJSON(source_board.id, el.dataset.eid);
    source_board.item = source_board.item.filter(function (task) {
        if (el.dataset.eid === task.id) {
            return false;
        }
        return true;
    });
    let target_board = self.findBoardJSON(target_board_element.dataset.id);
    target_board.item.push(task);
    updatePercents(self);
};

//TODO 20221102 - 12번 - 우식
const kanbanDragBoardEventListener = (el, source) => {
    //console.log('dragBoard', el, source);
    kanban.options.board_dragging = true;
    let context_menu = document.querySelector('#context-menu');
    closeContextMenu(context_menu);
};

//TODO 20221102 - 12번 - 우식
const kanbanDragEndBoardEventListener = (el) => {
    //console.log('dragendBoard', el);
};

//TODO 20221102 - 12번 - 우식
const kanbanDropBoardEventListener = (el, target, source, sibling) => {
    kanban.options.board_dragging = false;
    let board_id = el.dataset.id;
    let order = el.dataset.order * 1;
    console.log(board_id, order);
    apiChangeBoardOrder(board_id, order).then((result) => {
        console.log('apiChangeBoardOrder', result);
    });
}

const kanbanUpdateBoardEventListener = (selected_option, board, boardId) => {
    //console.log('headerUpdate', board, boardId, selected_option);
    let boards;
    switch (selected_option) {
        case '_modify':
            modifyBoard(kanban, board.dataset.id);
            break;
        case '_delete':
            apiDeleteBoard(board.dataset.id).then((result) => {
                removeBoard(kanban, board.dataset.id);
            });
            break;
        case '_add_left':
            boards = [{
                id: tokenGenerator(8), title: tokenGenerator(8), class: 'class1, class2, class3', percent: 0, item: [],
            }];
            addBoards(kanban, 'prepend', boardId, boards);
            break;
        case '_add_right':
            boards = [{
                id: tokenGenerator(8), title: tokenGenerator(8), class: 'class1, class2, class3', percent: 0, item: [],
            }];
            addBoards(kanban, 'append', boardId, boards);
            break;
    }
};

//TODO 20221102 - 16번 - 지우
const kanbanAddTaskEventListener = (el, boardId) => {
    const task = {
        id: tokenGenerator(6), title: tokenGenerator(8), complete: false, profiles: [{
            url: 'https://via.placeholder.com/30x30', name: 'kimwoosik'
        }, {
            url: 'https://via.placeholder.com/30x30', name: 'kimwoosik2'
        }], work: 0, start_date: '2022-08-21', end_date: '2022-08-30',
    };
    kanban.addTaskAndElement(boardId, task);

    const board = kanban.findBoardJSON(boardId);
    updatePercent(kanban, board);
    let context_menu = document.querySelector('#context-menu');
    closeContextMenu(context_menu);
};

//TODO 20221102 - 13번 - 우식
const removeBoard = (kanban, boardId) => {
    kanban.removeBoard(boardId);
};

const createTaskWritableTitleElement = (taskId, value) => {
    return `<input type="text"
                   value="${value}"
                   name="${taskId}-title" data-origin-value="${value}"/>`;
};

const createBoardWritableTitleElement = (boardId, value) => {
    return `<input type="text"
                   value="${value}"
                   name="${boardId}-title" data-origin-value="${value}"/>
            <svg width="14"
                 height="12"
                 viewBox="0 0 14 12"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M1 6L5.5 10.5L13 1.5"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"></path>
            </svg>`;
};
const createTaskTitleElement = (value) => {
    return `<h6 class="title">${value}</h6>`;
};
const createBoardTitleElement = (value) => {
    return `<div class="_title">${value}</div>`;
};

//TODO 20221102 - 18번 - 우식
function taskTitleUpdateClickEventListener(e, is_close) {
    e.preventDefault();
    let task = e.target.closest('.kanban-item[data-eid]');
    let board = e.target.closest('.kanban-board[data-id]');
    let task_title_container = task.querySelector('.kanban-item-title');
    let task_input = task_title_container.querySelector('input');
    let value;
    if (is_close) {
        value = task_input.dataset.originValue;
    } else {
        value = task_input.value;
    }
    task_input.remove();
    task_title_container.innerHTML = createTaskTitleElement(value);
    task_title_container.setAttribute('title', value);
    const item_task = kanban.findTaskJSON(board.dataset.id, task.dataset.eid);
    item_task.title = `${value}`;
}

//TODO 20221102 - 11번 - 우식
function boardTitleUpdateClickEventListener(e, is_close) {
    e.preventDefault();
    let board;
    if (this === undefined || this === null) {
        board = e.target.closest('.kanban-board[data-id]');
    } else {
        board = this.closest('.kanban-board[data-id]');
    }

    const board_title_container = board.querySelector('.kanban-board-header .kanban-title-board');
    const board_percent_container = board.querySelector('.kanban-board-header ._percent');
    const board_option_container = board.querySelector('.kanban-board-header ._option');

    const board_input = board_title_container.querySelector('input');
    let value;
    if (is_close) {
        value = board_input.dataset.originValue;
    } else {
        value = board_input.value
    }
    apiChangeBoardName(board.dataset.id, value).then((result) => {
        console.log('apiChangeBoardName', result);
        board_input.remove();
        board_title_container.innerHTML = createBoardTitleElement(value);
        board_title_container.setAttribute('title', value);
        $(board_percent_container).show();
        $(board_option_container).show();
        const item_board = kanban.findBoardJSON(board.dataset.id);
        item_board.title = `${value}`;
    });
}

const modifyBoard = (kanban, boardId) => {
    const board = document.querySelector(`.kanban-container .kanban-board[data-id="${boardId}"]`);
    const board_title_elem = board.querySelector('.kanban-board-header .kanban-title-board');
    const board_option = board.querySelector('.kanban-board-header ._option');
    const percent = board.querySelector('.kanban-board-header ._percent');

    if (!board_title_elem.classList.contains('w-100')) {
        board_title_elem.classList.add('w-100');
    }

    const value = board_title_elem.querySelector('._title').innerText;
    board_title_elem.innerHTML = createBoardWritableTitleElement(boardId, value);
    let input_title = board_title_elem.querySelector(`[name="${boardId}-title"]`);
    input_title.addEventListener('keyup', boardInputKeyUpEventListener);
    input_title.addEventListener('mousedown', mouseDownEventListener);
    input_title.addEventListener('click', function (event) {
        event.stopPropagation();
        event.preventDefault();
    });
    const btn_confirm = board_title_elem.querySelector('svg');
    btn_confirm.addEventListener('click', boardTitleUpdateClickEventListener);

    $(board_option).hide();
    $(percent).hide();
};

function mouseDownEventListener(event) {
    event.stopPropagation();
};

function taskInputKeyUpEventListener(event) {
    if (event.key === 'Escape'.toLowerCase() || event.code === 'Escape'.toLowerCase() || event.keyCode === 27) {
        taskTitleUpdateClickEventListener(event, true);
    }
    if (event.key === 'Enter'.toLowerCase() || event.code === 'Enter'.toLowerCase() || event.keyCode === 13) {
        taskTitleUpdateClickEventListener(event, false);
    }
};

function boardInputKeyUpEventListener(event) {
    if (event.key === 'Escape'.toLowerCase() || event.code === 'Escape'.toLowerCase() || event.keyCode === 27) {
        boardTitleUpdateClickEventListener(event, true);
    }
    if (event.key === 'Enter'.toLowerCase() || event.code === 'Enter'.toLowerCase() || event.keyCode === 13) {
        boardTitleUpdateClickEventListener(event, false);
    }
};

//TODO 20221102 - 10번 - 지우
const addBoards = (kanban, direction, boardId, boards) => {
    switch (direction) {
        case 'prepend':
            kanban.addBoards(boards, false, {baseId: boardId, direction: 'prepend'});
            break;
        case 'append':
            kanban.addBoards(boards, false, {baseId: boardId, direction: 'append'});
            break;
        case 'last':
            kanban.addBoards(boards);
            break;
    }
    kanban.updateBoardsOrder(function (updated_order_boards) {
        //console.log('updated_boards', updated_order_boards);
    });
};

const updatePercents = (kanban) => {
    kanban.options.boards.forEach(function (board) {
        updatePercent(kanban, board);
    });
}

const updatePercent = (kanban, board) => {
    let total = board.item.length;
    let percent, count;
    if (total !== 0) {
        count = board.item.filter(function (task) {
            if (task.complete) {
                return true;
            }
        }).length;
        percent = Math.ceil((count / total) * 100);
    } else {
        percent = 0;
    }

    board.percent = percent;
    let board_element = kanban.findBoard(board.id);
    board_element.querySelector('.kanban-percent').innerHTML = `${board.percent}%`;
}

const findSubTask = (task, subtask_id) => {
    if (task.subtasks.length !== 0) {
        return task.subtasks.filter(function (subtask) {
            if (subtask.id === subtask_id) {
                return true;
            }
            return false;
        })[0];
    } else {
        throw new Error(`${task.id}, ${task.title} subtask is empty`);
    }
}