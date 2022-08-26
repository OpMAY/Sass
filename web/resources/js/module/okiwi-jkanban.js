'use strict';
let kanban;
const initailizeKanban = (boards) => {
  const taskAddOption = {
    enabled: true,
    content: '작업 추가하기',
    footer: true,
    class: 'kanban-add-task btn btn-block',
  };
  kanban = new jKanban({
    element: '.kanban-board',
    gutter: '0',
    widthBoard: 'auto',
    responsivePercentage: false,
    dragItems: true,
    boards: boards,
    dragBoards: true,
    itemAddOptions: taskAddOption,
    // 태스크 클릭 이벤트
    click: kanbanClickTaskEventListener,
    // 태스크 오른쪽 클릭 이벤트
    context: kanbanContextTaskEventListener,
    // 태스크 드래그 이벤트
    dragEl: kanbanDragTaskEventListener,
    // 태스크 드래그 종료 이벤트
    dragendEl: kanbanDragEndTaskEventListener,
    // 태스크 드랍 이벤트
    dropEl: kanbanDropTaskEventListener,
    // 태스크 추가 옵션
    addTask: kanbanAddTaskEventListener,
    // 보드 드래그 이벤트
    dragBoard: kanbanDragBoardEventListener,
    // 보드 드래그 종료 이벤트
    dragendBoard: kanbanDragEndBoardEventListener,
    // 보드 옵션 이벤트
    updateBoard: kanbanUpdateBoardEventListener,
  });
  return kanban;
};

const kanbanClickTaskEventListener = (el) => {
  console.log('click', el);
};

const kanbanContextTaskEventListener = (el, event) => {
  console.log('context', el, event);
  const find_board = el.closest('.kanban-board');
  kanban.removeElement(el.dataset.eid);
  const board = kanban.options.boards.find(function(board) {
    if (find_board.dataset.id === board.id) {
      return true;
    }
    return false;
  });
  board.item = board.item.filter(function(task) {
    if (task.id === el.dataset.eid) {
      return false;
    }
    return true;
  });
};

const kanbanDragTaskEventListener = (el, source) => {
  const prev_board = source;
  const prev_task = el;
  console.log('dragEl', 'prev_board', prev_board, 'prev_task', prev_task);
};

const kanbanDragEndTaskEventListener = (el) => {
  console.log('dragendEl', el);
};

const kanbanDropTaskEventListener = (el, target, source, sibling) => {
  console.log('dropEl', el, target, source, sibling);
};

const kanbanDragBoardEventListener = (el, source) => {
  console.log('dragBoard', el, source);
};

const kanbanDragEndBoardEventListener = (el) => {
  console.log('dragendBoard', el);
};

const kanbanUpdateBoardEventListener = (selected_option, board, boardId) => {
  console.log('headerUpdate', board, boardId, selected_option);
  let boards;
  switch (selected_option) {
    case '_modify':
      modifyBoard(kanban, board.dataset.id);
      break;
    case '_delete':
      removeBoard(kanban, board.dataset.id);
      break;
    case '_add_left':
      boards = [{
        id: tokenGenerator(8),
        title: tokenGenerator(8),
        class: 'class1, class2, class3',
        percent: 0,
        item: [],
      }];
      addBoards(kanban, 'prepend', boardId, boards);
      break;
    case '_add_right':
      boards = [{
        id: tokenGenerator(8),
        title: tokenGenerator(8),
        class: 'class1, class2, class3',
        percent: 0,
        item: [],
      }];
      addBoards(kanban, 'append', boardId, boards);
      break;
  }
};

const kanbanAddTaskEventListener = (el, boardId) => {
  const task = {
    id: tokenGenerator(6),
    title: tokenGenerator(8),
    profile: 'https://via.placeholder.com/30x30',
    work: 0,
    start_date: '2022-08-21',
    end_date: '2022-08-30',
  };
  addTask(kanban, boardId, task);
};

const removeBoard = (kanban, boardId) => {
  kanban.removeBoard(boardId);
};

const findItemBoard = (boards, boardId) => {
  const board = boards.find(function(board) {
    if (board.id === boardId) {
      return true;
    }
    return false;
  });
  return board;
};

const addTask = (kanban, boardId, {id, title, profile, work = 0, start_date, end_date}) => {
  kanban.addElement(boardId, {
    title,
    profile,
    work,
    start_date,
    end_date,
    id,
  });
};

const createBoardWritableTitleElement = (boardId, value) => {
  return `<input type="text"
                   value="${value}"
                   name="${boardId}-title"/>
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

const createBoardTitleElement = (value) => {
  return `<div class="_title">${value}</div>`;
};

function titleUpdateClickEventListener(e) {
  e.preventDefault();
  const board = this.closest('.kanban-board[data-id]');

  const board_title_container = board.querySelector('.kanban-board-header .kanban-title-board');
  const board_percent_container = board.querySelector('.kanban-board-header ._percent');
  const board_option_container = board.querySelector('.kanban-board-header ._option');

  const board_input = board_title_container.querySelector('input');
  const value = board_input.value;
  board_input.remove();
  board_title_container.innerHTML = createBoardTitleElement(value);
  $(board_percent_container).show();
  $(board_option_container).show();
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
  const btn_confirm = board_title_elem.querySelector('svg');
  btn_confirm.addEventListener('click', titleUpdateClickEventListener);
  $(board_option).hide();
  $(percent).hide();

  const item_board = findItemBoard(kanban.options.boards, boardId);
  item_board.title = `${value}`;
};

const addBoards = (kanban, direction, boardId, boards) => {
  console.log('boards', boards);
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
  kanban.updateBoardsOrder(function(updated_order_boards) {
    console.log('updated_boards', updated_order_boards);
  });
};
