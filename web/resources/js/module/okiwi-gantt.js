'use strict';
let task_order = 1;
const week = ['일', '월', '화', '수', '목', '금', '토'];
let boards = new Array();

function accordionDropdownShowEvent(event) {
    let items = event.target.querySelectorAll('li.list-group-item[id]');
    items.forEach(function (item) {
        let task = findTimelineTask(item.id);
        task.style.display = 'block';
        item.setAttribute('data-show', true);
    });
    updateTimelineTaskPosition();
}

function accordionDropdownHideEvent(event) {
    console.log(event.target);
    let items = event.target.querySelectorAll('li.list-group-item[id]');
    items.forEach(function (item) {
        let task = findTimelineTask(item.id);
        task.style.display = 'none';
        item.setAttribute('data-show', false);
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
    boards = initializeGantt(_boards);
    $('#gantt-accordion').on('shown.bs.collapse', accordionDropdownShowEvent);
    $('#gantt-accordion').on('hidden.bs.collapse', accordionDropdownHideEvent);
    //Context Menu Event Initialize
    //$('#gantt-context-menu').on('click', '.list-group a', contextMenuClickEventListener);
    $('#gantt-board-option-menu').on('click', '.list-group a', ganttBoardOptionMenuClickEventListener);
};

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
        gantt_timeline_tasks.forEach(function (task) {
            let gantt_timeline_task = findTimelineTask(task.getAttribute('id'));
            console.log('gantt_timeline_task', gantt_timeline_task);
            gantt_timeline_task.remove();
        });
        gantt_board_element.remove();
    }
    updateTimelineTaskPosition();
    closeGanttContextMenu(menu);
};

function ganttContextMenuClickEventListener(event) {
    let menu = this.closest('#gantt-context-menu');
    let taskId = menu.dataset.taskId;
    let container = document.querySelector('.gantt-container');
    if (this.classList.contains('_edit')) {
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
        gantt_timeline_item_task_element.querySelector('.checkbox').click();
    } else if (this.classList.contains('_dis-complete')) {
        console.log('_dis-complete');
        let _content = document.querySelector('.gantt-container ._gantt-timeline ._content');
        let gantt_timeline_item_task_element = _content.querySelector(`.gantt-task[data-id="${taskId}"]`);
        gantt_timeline_item_task_element.querySelector('.checkbox').click();
    } else if (this.classList.contains('_copy')) {
        console.log('_copy');
        let gantt_board_item_task_element = container.querySelector(`.list-group-item[id="${taskId}"]`);
        let create_gantt_board_item_task = gantt_board_item_task_element.cloneNode(true);
        /*TODO Fetch and Get Task Data*/
        let current_date = new Date().toISOString().slice(0, 10);
        let create_id = tokenGenerator(8);
        let task = {
            id: create_id,
            title: create_id,
            complete: gantt_board_item_task_element.classList.contains('is-checked'),
            profiles: [{
                url: 'https://via.placeholder.com/30x30',
                name: 'kimwoosik'
            }],
            work: 0,
            start_date: current_date,
            end_date: current_date
        };

        create_gantt_board_item_task.setAttribute('id', task.id);
        create_gantt_board_item_task.addEventListener('contextmenu', ganttContextTaskEventListener);
        create_gantt_board_item_task.querySelector('.dropright').addEventListener('click', ganttBoardTaskOptionClickEventListener);
        gantt_board_item_task_element.closest('.list-group').querySelector('.list-group-item:last-child').before(create_gantt_board_item_task);

        let _content = document.querySelector('.gantt-container ._gantt-timeline ._content');
        //create right side element
        expandGanttWidth(task.end_date);
        let position = getGanttTaskPosition(task);
        let task_element = createGanttTaskElement(position, task);
        $(_content).append(task_element);
        let inserted_task_element = $(_content).find(`.gantt-task[data-id="${task.id}"]`)[0];
        inserted_task_element.querySelector('.checkbox').addEventListener('click', ganttTaskCheckboxClickEventListener);
    } else if (this.classList.contains('_delete')) {
        console.log('_delete');
        removeGanttTaskItemElement(taskId);
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
    updateGanttBoardName(gantt_board.querySelector('.title'), value);
    gantt_board_title_input.remove();
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
    updateGanttTaskName(gantt_timeline_task.querySelector('.gantt-info .task-title .title'), value);
    updateGanttTaskName(gantt_board_task.querySelector('.title'), value);
    gantt_board_task_title_input.remove();
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
            let position = getGanttTaskPosition(task);
            let task_element = createGanttTaskElement(position, task);
            $(_content).append(task_element);
            let inserted_task_element = $(_content).find(`.gantt-task[data-id="${task.id}"]`)[0];
            inserted_task_element.addEventListener('click', function (event) {
                rightTaskOpen(this.dataset.id);
            });
            inserted_task_element.querySelector('.checkbox').addEventListener('click', ganttTaskCheckboxClickEventListener);
        });
    });

    let currentDate = new Date().toISOString().slice(0, 10);
    let currentDateElement =
        document.querySelector(`.gantt-container ._gantt-timeline ._date [data-date="${currentDate}"]`);
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

function boardAddClickEventListener(event) {
    console.log(event, this);
    let last_index = document.querySelector('.gantt-container ._gantt-board #gantt-accordion .card:last-child .card-header[data-index]').dataset.index;
    let board_id = tokenGenerator(8);
    let board = {
        id: board_id,
        title: board_id,
        class: 'class1, class2, class3',
        percent: 0,
        item: []
    };
    let board_element = createGanttBoardElement(board, parseInt(last_index) + 1);
    let accordion = document.querySelector('.gantt-container ._gantt-board #gantt-accordion');
    accordion.appendChild(board_element);
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

    let title = document.createElement('div');
    title.classList.add('title');
    title.innerText = `${board.title}`;
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
    task_order++;
    board.item.forEach(function (task) {
        let gantt_board_task_element = createGanttBoardTaskElement(task);
        gantt_board_task_element.addEventListener('contextmenu', ganttContextTaskEventListener);
        gantt_board_task_element.querySelector('.dropright').addEventListener('click', ganttBoardTaskOptionClickEventListener);
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
    console.log('event', event, this);
    let context_menu = document.querySelector('#gantt-board-option-menu');
    let board_id = this.closest('.card-header').dataset.id;
    let scrollTop = document.querySelector('html').scrollTop;
    let position = {top: event.clientY + scrollTop, left: event.clientX};

    openBoardOptionMenu(context_menu, board_id, position);
    event.preventDefault();
    event.stopPropagation();
}

function ganttBoardTaskOptionClickEventListener(event) {
    console.log('event', this);
    this.closest('.list-group-item').dispatchEvent(new Event('contextmenu'));
    event.stopPropagation();
    event.preventDefault();
}

const createGanttBoardAddTaskElement = () => {
    let add_li = document.createElement('li');
    add_li.classList.add('list-group-item');
    add_li.style.color = '#F06A6A';
    add_li.setAttribute('order', task_order++);
    add_li.innerText = `업무 추가하기`;
    return add_li;
}
const createGanttBoardTaskElement = (task) => {
    let li = document.createElement('li');
    li.classList.add('list-group-item');
    if (task.complete) {
        li.classList.add('is-checked');
    }
    li.setAttribute('id', `${task.id}`);
    li.setAttribute('order', task_order++);
    li.setAttribute('data-show', true);
    li.innerHTML = `<div class="title">${task.title}</div>
                    <div class="btn-group dropright">
                      <div>
                        <img class="img-fluid" src="/resources/assets/images/icon/board_options.svg">
                      </div>
                    </div>`;
    return li;
}

function addTaskClickEventListener(event) {
    let task_id = tokenGenerator(6);
    let current_date = new Date().toISOString().slice(0, 10);
    let task = {
        id: task_id,
        title: task_id,
        complete: false,
        profiles: [{
            url: 'https://via.placeholder.com/30x30',
            name: 'kimwoosik'
        }],
        work: 0,
        start_date: current_date,
        end_date: current_date
    };

    //create left side element
    let gantt_board_task_element = createGanttBoardTaskElement(task);
    gantt_board_task_element.addEventListener('contextmenu', ganttContextTaskEventListener);
    gantt_board_task_element.querySelector('.dropright').addEventListener('click', ganttBoardTaskOptionClickEventListener)
    this.before(gantt_board_task_element);

    let _content = document.querySelector('.gantt-container ._gantt-timeline ._content');
    //create right side element
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

function ganttTaskCheckboxClickEventListener(event) {
    let is_checked = false;
    let container = document.querySelector('.gantt-container');
    let gantt_task = this.closest('.gantt-task[data-id]');
    let task_id = gantt_task.dataset.id;
    if (gantt_task.classList.contains('is-checked')) {
        gantt_task.classList.remove('is-checked');
    } else {
        gantt_task.classList.add('is-checked');
        is_checked = true;
    }
    let gantt_board_task = container.querySelector(`._gantt-board .list-group li[id="${task_id}"]`);
    if (!is_checked && gantt_board_task.classList.contains('is-checked')) {
        gantt_board_task.classList.remove('is-checked');
    } else {
        gantt_board_task.classList.add('is-checked');
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
            let last_date = new Date(month.substring(0, month.lastIndexOf('-')) * 1,
                month.substring(month.lastIndexOf('-') + 1) * 1, 0).getDate();
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
        let last_date = new Date(month.substring(0, month.lastIndexOf('-')) * 1,
            month.substring(month.lastIndexOf('-') + 1) * 1, 0).getDate();
        month_element.style.minWidth = ((12 + 12 + 20) * (last_date - first_date + 1)) + 'px';
        _month.appendChild(month_element);
    });
    gantt_header.appendChild(_month);
    let _date = document.createElement('div');
    _date.classList.add('_date');
    months.forEach(function (month) {
        let first_date = 1;
        let last_date = new Date(month.substring(0, month.lastIndexOf('-')) * 1,
            month.substring(month.lastIndexOf('-') + 1) * 1, 0).getDate();
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
    let startDate = Date.parse(start_date);
    let endDate = Date.parse(end_date);
    const elapsedMSec = endDate - startDate;
    const elapsedDay = elapsedMSec / 1000 / 60 / 60 / 24;
    return elapsedDay <= 0 ? 0 : elapsedDay * 44 - 16;
}

const findLeftTask = (id) => {
    return $('#gantt-accordion').find(`li.list-group-item[id="${id}"]`);
}

const createGanttTaskElement = (position, task) => {
    let _class = '';
    if (position.width === 0) {
        _class = 'day one';
    } else if (position.width <= 72) {
        _class = 'day two';
    } else if (position.width <= 116) {
        _class = 'day third';
    }
    return `<div class="gantt-task ${_class} ${task.complete ? 'is-checked' : ''}" data-width="${position.width}" data-start-date="${task.start_date}" data-end-date="${task.end_date}" data-id="${task.id}"
                     style="width: ${position.width}px; top: ${position.top}px; left: ${position.left}px;">
              <div class="gantt-inner-container">
                <div class="gantt-info">
                  <span class="divider"></span>
                  <img width="24" height="24" src="${task.profiles[0].url}"/>
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
            if (min_year > getYear(task.start_date)) {
                min_year = getYear(task.start_date);
            }
            if (max_year < getYear(task.end_date)) {
                max_year = getYear(task.end_date);
            }
        });
    });

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
                let last_date = new Date(month.substring(0, month.lastIndexOf('-')) * 1,
                    month.substring(month.lastIndexOf('-') + 1) * 1, 0).getDate();
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
            let last_date = new Date(month.substring(0, month.lastIndexOf('-')) * 1,
                month.substring(month.lastIndexOf('-') + 1) * 1, 0).getDate();
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
            dates.push(Date.parse(task.start_date));
            dates.push(Date.parse(task.end_date));
        });
    });
    let maxDate = new Date(Math.max.apply(null, dates));
    let minDate = new Date(Math.min.apply(null, dates));
    return getMonthsStartToLast(minDate, maxDate);
}

function getMonthsStartToLast(startDate, lastDate) {
    var start_date_str = startDate.toISOString().slice(0, 10);
    let end_date_star = lastDate.toISOString().slice(0, 10);
    var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    if (!(regex.test(start_date_str) && regex.test(end_date_star))) return "Not Date Format";
    var result = [];
    var curDate = new Date(start_date_str);
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
    const dayOfWeek = week[new Date(date).getDay()];
    return dayOfWeek;
}