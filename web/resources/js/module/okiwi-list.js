const LIST_CONTAINER = document.querySelector('.list-container');

const createList = (boards) => {
    createTable(boards);
    updateListPercents();
    /*let menu = document.querySelector('#list-context-menu');
    $(menu).on('click', '.list-group a', contextListMenuClickEventListener);
    $(document).on('contextmenu', 'tr._task', function (event) {
        console.log('contextmenu', this);
        let task = this;
        let position = {top: event.clientY, left: event.clientX};
        openListContextMenu(menu, position, task.dataset.boardId, task.dataset.id);
        event.stopPropagation();
        event.preventDefault();
    });
    $(document).on('click', function (event) {
        if ($(event.target.closest('#list-context-menu')).length === 0) {
            closeListContextMenu(menu);
        }
    });*/
}

const closeListContextMenu = (menu) => {
    menu.style.top = 0 + 'px';
    menu.style.left = 0 + 'px';
    menu.removeAttribute('data-board-id');
    menu.removeAttribute('data-task-id');
    menu.style.display = 'none';
}

const openListContextMenu = (menu, position, board_id, task_id) => {
    let task = findTaskListById(task_id);
    if (task.classList.contains('is-checked')) {
        menu.querySelector('._complete').style.display = 'none';
        menu.querySelector('._dis-complete').style.display = 'block';
    } else {
        menu.querySelector('._complete').style.display = 'block';
        menu.querySelector('._dis-complete').style.display = 'none';
    }

    menu.style.top = position.top + 'px';
    menu.style.left = position.left + 'px';
    menu.setAttribute('data-board-id', board_id);
    menu.setAttribute('data-task-id', task_id);
    menu.style.display = 'block';
}

const createTable = (boards) => {
    let table = document.createElement('table');
    ['list-table', 'table', 'table-borderless', 'table-hover'].forEach(function (_class) {
        table.classList.add(_class);
    });

    let thead = document.createElement('thead');
    let thead_tr = document.createElement('tr');
    [
        {th_tag: 'th', th_name: '업무명', th_scope: 'col'},
        {th_tag: 'th', th_name: '담당자', th_scope: 'col'},
        {th_tag: 'th', th_name: '하위 업무', th_scope: 'col'},
        {th_tag: 'th', th_name: '시작 일자', th_scope: 'col'},
        {th_tag: 'th', th_name: '마감 일자', th_scope: 'col'},
        {th_tag: 'th', th_name: '작업률', th_scope: 'col'}
    ].forEach(function (th) {
        let _th = document.createElement(th.th_tag);
        _th.setAttribute('scope', th.th_scope);
        _th.innerText = th.th_name;
        thead_tr.appendChild(_th);
    });
    thead.appendChild(thead_tr);

    let tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);
    boards.forEach(function (board) {
        tbody.appendChild(createBoardList(board));
        board.item.forEach(function (task) {
            tbody.appendChild(createTaskList(board.id, task));
        });
        tbody.appendChild(createAddTaskList(board.id));
    });
    tbody.appendChild(createAddBoardList());
    LIST_CONTAINER.appendChild(table);
}

const createBoardList = (board) => {
    let boardList = createBoardListElement(board);
    return boardList;
}

const createTaskList = (board_id, task) => {
    let taskList = createTaskListElement(board_id, task);
    taskList.addEventListener('click', function (event) {
        rightTaskOpen(this.dataset.id);
    });
    taskList.querySelector('.checkbox').addEventListener('click', taskListCheckboxClickEventListener);
    return taskList;
}

const createAddTaskList = (board_id) => {
    let task_add_tr = document.createElement('tr');
    task_add_tr.classList.add('_task-add');
    task_add_tr.setAttribute('data-id', board_id);
    task_add_tr.innerHTML = __taskAddListInnerElement();
    task_add_tr.addEventListener('click', taskAddListClickEventListener);
    return task_add_tr;
}

const createAddBoardList = () => {
    let board_add_tr = document.createElement('tr');
    board_add_tr.classList.add('_board-add');
    board_add_tr.innerHTML = __boardAddListInnerElement();
    board_add_tr.addEventListener('click', boardAddListClickEventListener);
    return board_add_tr;
}

const createBoardListElement = (board) => {
    let board_tr = document.createElement('tr');
    board_tr.classList.add('_board');
    board_tr.setAttribute('data-id', board.id);
    board_tr.innerHTML = __boardListInnerElement(board);
    board_tr.querySelector('._dropdown').addEventListener('click', boardListDropdownClickEventListener);
    $(board_tr.querySelector('.dropright .dropdown-menu')).on('click', '.dropdown-item', boardListOptionClickEventListener);
    return board_tr;
}

const createTaskListElement = (board_id, task) => {
    let task_tr = document.createElement('tr');
    task_tr.classList.add('_task');
    if (task.complete) {
        task_tr.classList.add('is-checked');
    }
    task_tr.setAttribute('data-id', task.id);
    task_tr.setAttribute('data-board-id', board_id);
    task_tr.innerHTML = __taskListInnerElement(task);
    return task_tr;
}

const __boardListInnerElement = (board) => {
    return `<td colspan="5">
              <div class="list-td">
                <div class="_dropdown"></div>
                <div class="_name">
                ${board.title}
                </div>
                <div class="btn-group dropright dropleft">
                  <div data-toggle="dropdown"
                       aria-expanded="false">
                    <img class="img-fluid"
                         src="/resources/assets/images/icon/board_options.svg"/>
                  </div>
                  <div class="dropdown-menu">
                    <a class="dropdown-item _modify"
                       data-type="_modify"
                       href="javascript:void(0)">보드 이름 수정</a>
                    <a class="dropdown-item _delete"
                       data-type="_delete"
                       href="javascript:void(0)">보드 삭제</a>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div class="list-td">
                <div class="_percent">${board.percent}%</div>
              </div>
            </td>`;
}

const __taskListInnerElement = (task) => {
    return `<td>
              <div class="list-td">
                <div class="_divider"></div>
                <div class="_name"
                     style="display: flex; margin-top: auto;margin-bottom: auto;">
                     ${task.title}
                </div>
                <div class="_details"
                     style="display: flex; margin-left: auto;">
                  <div style="margin-top: auto; margin-bottom: auto;">
                    Details
                  </div>
                  <svg style="margin-top: auto; margin-bottom: auto;"
                       width="14"
                       height="14"
                       viewBox="0 0 14 14"
                       fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.66699 2.33398L9.33366 7.00065L4.66699 11.6673"
                          stroke="#222222"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"></path>
                  </svg>
                </div>
              </div>
            </td>
            <td>
              <div class="list-td">
                <div class="_image background-image"
                     style="padding-top: 30px; width: 30px;
                           border-radius: 50%; background-image: url('${task.profiles[0].url}');"></div>
              </div>
            </td>
            <td>
              <div class="list-td">
                <div class="_subtasks">${task.subtasks ? task.subtasks.length : 0}개</div>
              </div>
            </td>
            <td>
              <div class="list-td">
                <div class="_start">${task.start_date}</div>
              </div>
            </td>
            <td>
              <div class="list-td">
                <div class="_end">${task.end_date}</div>
              </div>
            </td>
            <td>
              <div class="list-td">
                        <span class="checkbox">
                          <i class="fas fa-check"
                             aria-hidden="true"></i>
                        </span>
              </div>
            </td>`;
}

const __taskAddListInnerElement = () => {
    return `<td colspan="6">
              <div class="list-td">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M7 0C7.23206 0 7.45462 0.0921874 7.61872 0.256282C7.78281 0.420376 7.875 0.642936 7.875 0.875V6.125H13.125C13.3571 6.125 13.5796 6.21719 13.7437 6.38128C13.9078 6.54538 14 6.76794 14 7C14 7.23206 13.9078 7.45462 13.7437 7.61872C13.5796 7.78281 13.3571 7.875 13.125 7.875H7.875V13.125C7.875 13.3571 7.78281 13.5796 7.61872 13.7437C7.45462 13.9078 7.23206 14 7 14C6.76794 14 6.54538 13.9078 6.38128 13.7437C6.21719 13.5796 6.125 13.3571 6.125 13.125V7.875H0.875C0.642936 7.875 0.420376 7.78281 0.256282 7.61872C0.0921874 7.45462 0 7.23206 0 7C0 6.76794 0.0921874 6.54538 0.256282 6.38128C0.420376 6.21719 0.642936 6.125 0.875 6.125H6.125V0.875C6.125 0.642936 6.21719 0.420376 6.38128 0.256282C6.54538 0.0921874 6.76794 0 7 0Z" fill="#F06A6A"></path>
                  </svg>
                  <div>업무 추가하기</div>
              </div>
            </td>`;
}

const __boardAddListInnerElement = () => {
    return `<td colspan="6">
              <div class="list-td">
                <div>
                  섹션 추가하기
                </div>
              </div>
            </td>`;
}

const __listNameWritableInnerElement = (board_id, value, width) => {
    return `<input type="text" style="width: ${width}px;"
                   value="${value}"
                   name="${board_id}-title" data-origin-value="${value}"/>`;
}

const updateTaskCheckbox = (task_id, need_check) => {
    let task = findTaskListById(task_id);
    if (need_check) {
        task.classList.add('is-checked');
    } else {
        task.classList.remove('is-checked');
    }
    updateListPercents();
}

const updateListPercents = () => {
    let boards = findBoardListAll();
    boards.forEach(function (board) {
        updateListPercent(board);
    });
}

const updateListPercent = (board) => {
    let percent = board.querySelector('._percent');
    let tasks = findTaskListAllByBoardId(board.dataset.id);
    let count = 0;
    tasks.forEach(function (task) {
        if (task.classList.contains('is-checked')) {
            count++;
        }
    });
    percent.innerHTML = tasks.length !== 0 ? `${Math.floor((count / tasks.length) * 100)}%` : `0%`;
}

const findBoardListById = (board_id) => {
    return document.querySelector(`.list-table tbody ._board[data-id="${board_id}"]`);
}

const findBoardListAll = () => {
    return document.querySelectorAll('.list-table tbody ._board[data-id]');
}

const findTaskListById = (task_id) => {
    return document.querySelector(`.list-table tbody ._task[data-id="${task_id}"]`);
}

const findTaskListAll = () => {
    return document.querySelectorAll('.list-table tbody ._task[data-id][data-board-id]');
}

const findTaskListAllByBoardId = (board_id) => {
    return document.querySelectorAll(`.list-table tbody ._task[data-board-id="${board_id}"]`);
}

const findTaskAddListById = (board_id) => {
    let task_list_add = document.querySelector(`.list-table tbody ._task-add[data-id="${board_id}"]`);
    return task_list_add;
}

const removeBoardListById = (board_id) => {
    let board = findBoardListById(board_id);
    let tasks = findTaskListAllByBoardId(board_id);
    tasks.forEach(function (task) {
        task.remove();
    });
    let task_add = findTaskAddListById(board_id);
    task_add.remove();
    board.remove();
}

function taskListCheckboxClickEventListener(event) {
    console.log('taskListCheckboxClickEventListener', this);
    let task = this.closest('._task[data-id][data-board-id]');
    updateTaskCheckbox(task.dataset.id, !task.classList.contains('is-checked'));
    event.stopPropagation();
    event.preventDefault();
}

function boardListDropdownClickEventListener(event) {
    console.log('boardListDropdownClickEventListener', this);
    let board = this.closest('._board[data-id]');
    if (board.classList.contains('is-close')) {
        //Open
        board.classList.remove('is-close');
        let tasks = findTaskListAllByBoardId(board.dataset.id);
        tasks.forEach(function (task) {
            $(task).show();
        });
        let task_add = findTaskAddListById(board.dataset.id);
        $(task_add).show();
    } else {
        //Close
        board.classList.add('is-close');
        let tasks = findTaskListAllByBoardId(board.dataset.id);
        tasks.forEach(function (task) {
            $(task).hide();
        });
        let task_add = findTaskAddListById(board.dataset.id);
        $(task_add).hide();
    }
}

function taskAddListClickEventListener(event) {
    console.log('taskAddListClickEventListener', this);
    let task_add_list = this;
    let board_id = task_add_list.dataset.id;
    let created_task_id = tokenGenerator(6);
    let current_date = new Date().toISOString().slice(0, 10);
    let task = {
        id: created_task_id,
        title: created_task_id,
        complete: false,
        profiles: [{
            url: 'https://via.placeholder.com/30x30',
            name: 'kimwoosik'
        }],
        work: 0,
        start_date: current_date,
        end_date: current_date
    };
    let created_task_element = createTaskList(board_id, task);
    task_add_list.before(created_task_element);
    updateListPercents();
}

function boardAddListClickEventListener(event) {
    console.log('boardAddListClickEventListener', this);
    let board_add_list = this;
    let created_board_id = tokenGenerator(8);
    let board = {
        id: created_board_id,
        title: created_board_id,
        class: 'class1, class2, class3',
        percent: 0,
    }

    let board_element = createBoardListElement(board);
    let task_add_element = createAddTaskList(created_board_id);

    board_add_list.before(board_element);
    board_add_list.before(task_add_element);
}

function boardListOptionClickEventListener(event) {
    console.log('boardListOptionClickEventListener', this);
    if (this.classList.contains('_modify')) {
        let board = this.closest('._board');
        let name = board.querySelector('._name');
        let value = name.innerText.trim();
        name.innerHTML = __listNameWritableInnerElement(board.dataset.id, value, name.getBoundingClientRect().width);
        let input_title = name.querySelector('input');
        input_title.addEventListener('keyup', listWritableInputKeyUpEventListener);
        input_title.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
        });
        input_title.focus();
        input_title.value = '';
        input_title.value = value;
    } else if (this.classList.contains('_delete')) {
        let board = this.closest('._board');
        removeBoardListById(board.dataset.id);
    }
}

function listWritableInputKeyUpEventListener(event) {
    if (event.key === 'Escape'.toLowerCase() || event.code === 'Escape'.toLowerCase() || event.keyCode === 27) {
        listWritableInputKeyUpUpdateEventListener(event, this, true);
    }
    if (event.key === 'Enter'.toLowerCase() || event.code === 'Enter'.toLowerCase() || event.keyCode === 13) {
        listWritableInputKeyUpUpdateEventListener(event, this, false);
    }
}

const listWritableInputKeyUpUpdateEventListener = (event, input, is_close) => {
    let name = input.closest('._name');
    let value;
    if (is_close) {
        value = input.dataset.originValue;
    } else {
        value = input.value;
    }
    name.innerHTML = `${value}`;
    input.remove();
    event.preventDefault();
}

function contextListMenuClickEventListener(event) {
    console.log('contextListMenuClickEventListener', this);
    let menu = this.closest('#list-context-menu');
    let board_id = menu.dataset.boardId;
    let task_id = menu.dataset.taskId;
    if (this.classList.contains('_edit')) {
        let task = findTaskListById(task_id);
        let name = task.querySelector('._name');
        let value = name.innerText.trim();
        name.innerHTML = __listNameWritableInnerElement(task.dataset.id, value, name.getBoundingClientRect().width);
        let input_title = name.querySelector('input');
        input_title.addEventListener('keyup', listWritableInputKeyUpEventListener);
        input_title.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
        });
        input_title.focus();
        input_title.value = '';
        input_title.value = value;
    } else if (this.classList.contains('_complete')) {
        let task = findTaskListById(task_id);
        task.querySelector('.checkbox').click();
    } else if (this.classList.contains('_dis-complete')) {
        let task = findTaskListById(task_id);
        task.querySelector('.checkbox').click();
    } else if (this.classList.contains('_copy')) {
        let task_element = findTaskListById(task_id);
        /*TODO Fetch and Get Task Data*/
        let current_date = new Date().toISOString().slice(0, 10);
        let create_id = tokenGenerator(8);

        let task = {
            id: create_id,
            title: create_id,
            complete: task_element.classList.contains('is-checked'),
            profiles: [{
                url: 'https://via.placeholder.com/30x30',
                name: 'kimwoosik'
            }],
            work: 0,
            start_date: current_date,
            end_date: current_date
        };
        let created_task = createTaskList(board_id, task);
        task_element.after(created_task);
    } else if (this.classList.contains('_delete')) {
        let task = findTaskListById(task_id);
        task.remove();
    }
    closeListContextMenu(menu);
}
