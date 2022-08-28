'use strict';

/**
 * InitializeTableList,
 * 테이블들의 데이터를 가지고 실제 리스트 테이블을 생성하는 함수
 *
 * @requires [deleteTableRowConnectable, createTableListElement]
 * @param {string} selector 리스트 테이블들을 담을 컨테이너
 * @param {Object[]} draggable_tables 전역 테이블들
 * */
const initializeTableList = (selector, draggable_tables) => {
    const list_container = document.querySelector(selector);

    // ListContainer Click Event Initialize
    $(list_container).on('click', function (event) {
        const event_target = event.target;
        if (event_target.closest('._delete')?.classList.contains('_delete')) {
            const delete_target = event_target.closest('li');
            const table_id = delete_target.closest('.table-list-component').dataset.tableId;
            const table_row_id = delete_target.dataset.tableRow;
            delete_target.remove();

            // okiwi-query.js
            deleteTableRowConnectable(table_id, table_row_id);
        } else if (event_target.closest('._name')?.classList.contains('_name')) {
            const delete_target = event_target.closest('li');
            const table_id = delete_target.closest('.table-list-component').dataset.tableId;
            const table_row_id = delete_target.dataset.tableRow;
            tableRowMoveScroll(table_id, table_row_id);
        } else if (event_target.closest('._title')?.classList.contains('_title')) {
            const table_id = event_target.closest('.table-list-component').dataset.tableId;
            tableMoveScroll(table_id);
        }
    });

    // ListContainer Accordion Event
    $(`${selector}`).on('hide.bs.collapse', function (e) {
        // do something...
        const table_list_component = e.target.closest('.table-list-component');
        const create = table_list_component.querySelector('._option._create');
        const btn_dropdown = table_list_component.querySelector('._option._dropdown');
        $(create).hide();
        $(btn_dropdown).show();
    });
    $(`${selector}`).on('show.bs.collapse', function (e) {
        // do something...
        const table_list_component = e.target.closest('.table-list-component');
        const create = table_list_component.querySelector('._option._create');
        const btn_dropdown = table_list_component.querySelector('._option._dropdown');
        $(create).show();
        $(btn_dropdown).hide();
    });
    draggable_tables.forEach(function (table, index) {
        $(list_container).append(createTableListElement(index, selector, table));
    });
};

/**
 * CreateTableListElement,
 * 리스트 테이블의 엘리먼트를 생성하는 함수
 *
 * @requires [createTableListButtonHeaderWritableElement, createTableListButtonHeaderElement, createTableListColumnElement]
 * @param {number} index 처음인지 아닌지 구분하는 변수
 * @param {string} root_selector 아코디언의 루트에 사용할 셀렉터
 * @param {Object} table 테이블의 정보가 들어있는 오브젝트
 * @param {string} writable 테이블의 이름을 수정할 수 있는 엘리먼트를 생성할지 구분하는 변수
 * @return {HTMLElement} 리스트 테이블의 엘리먼트
 * */
const createTableListElement = (index, root_selector, table, writable = undefined) => {
    const card = document.createElement('div');
    card.classList.add('card', 'table-list-component');
    card.setAttribute('data-table-id', table.id);
    card.style.borderRadius = 0;

    const card_header = document.createElement('div');
    card_header.classList.add('card-header');
    card_header.setAttribute('id', table.id);
    card_header.style.padding = 0;

    const h2 = document.createElement('div');
    h2.classList.add('mb-0');
    const button = document.createElement('div');
    button.classList.add('_header', 'd-block', 'text-left', 'd-flex');
    button.style.borderRadius = 0;
    if (writable) {
        button.innerHTML = createTableListButtonHeaderWritableElement(table.id, table.name);
    } else {
        button.innerHTML = createTableListButtonHeaderElement(table.name);
    }
    const button_dropdown = button.querySelector('._option._dropdown');
    ['type', 'data-toggle', 'data-target', 'aria-expanded', 'aria-controls'].forEach(function (attr) {
        switch (attr) {
            case 'type':
                button_dropdown.setAttribute(attr, 'button');
                break;
            case 'data-toggle':
                button_dropdown.setAttribute(attr, 'collapse');
                break;
            case 'data-target':
                button_dropdown.setAttribute(attr, `#collapse-${table.id}`);
                break;
            case 'aria-expanded':
                button_dropdown.setAttribute(attr, `${index === 0 ? 'false' : 'false'}`);
                break;
            case 'aria-controls':
                button_dropdown.setAttribute(attr, `${table.id}`);
                break;
        }
    });
    h2.appendChild(button);
    card_header.appendChild(h2);
    card.appendChild(card_header);

    const collapse = document.createElement('div');
    collapse.classList.add('collapse');
    /* if (index === 0) {
          collapse.classList.add('show');
      }*/

    ['id', 'aria-labelledby', 'data-parent'].forEach(function (attr) {
        switch (attr) {
            case 'id':
                collapse.setAttribute(attr, `collapse-${table.id}`);
                break;
            case 'aria-labelledby':
                collapse.setAttribute(attr, `${table.id}`);
                break;
            case 'data-parent':
                collapse.setAttribute(attr, `${root_selector}`);
                break;
        }
    });

    const card_body = document.createElement('div');
    card_body.classList.add('card-body');
    card_body.style.padding = 0;

    const column_list = document.createElement('ul');
    column_list.classList.add('list-group', 'list-group-flush');

    table.columns.forEach(function (column) {
        column_list.appendChild(createTableListColumnElement(column));
    });

    card_body.appendChild(column_list);
    collapse.appendChild(card_body);
    card.appendChild(collapse);

    return card;
};

/**
 * CreateTableListColumnElement,
 * 리스트 테이블의 행에 관한 엘리먼트를 생성하는 함수
 *
 * @param {Object} column 처음인지 아닌지 구분하는 변수
 * */
const createTableListColumnElement = (column) => {
    const li = document.createElement('li');
    li.setAttribute('data-table-row', column.id);
    li.classList.add('list-group-item');
    li.innerHTML = `<div class="_name">${column.name}</div>
                    <div class="_delete">
                      <svg width="10"
                           height="10"
                           viewBox="0 0 10 10"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.209802 0.209802C0.276139 0.143298 0.354944 0.0905335 0.441704 0.0545322C0.528463 0.0185308 0.621474 0 0.715406 0C0.809339 0 0.902349 0.0185308 0.989109 0.0545322C1.07587 0.0905335 1.15467 0.143298 1.22101 0.209802L5.00019 3.99041L8.77936 0.209802C8.84576 0.143405 8.92459 0.0907363 9.01134 0.0548025C9.09809 0.0188688 9.19107 0.000373895 9.28497 0.000373895C9.37887 0.000373895 9.47185 0.0188688 9.5586 0.0548025C9.64535 0.0907363 9.72418 0.143405 9.79057 0.209802C9.85697 0.276199 9.90964 0.355023 9.94557 0.441775C9.98151 0.528527 10 0.621507 10 0.715406C10 0.809306 9.98151 0.902286 9.94557 0.989038C9.90964 1.07579 9.85697 1.15461 9.79057 1.22101L6.00997 5.00019L9.79057 8.77936C9.85697 8.84576 9.90964 8.92459 9.94557 9.01134C9.98151 9.09809 10 9.19107 10 9.28497C10 9.37887 9.98151 9.47185 9.94557 9.5586C9.90964 9.64535 9.85697 9.72418 9.79057 9.79057C9.72418 9.85697 9.64535 9.90964 9.5586 9.94557C9.47185 9.98151 9.37887 10 9.28497 10C9.19107 10 9.09809 9.98151 9.01134 9.94557C8.92459 9.90964 8.84576 9.85697 8.77936 9.79057L5.00019 6.00997L1.22101 9.79057C1.15461 9.85697 1.07579 9.90964 0.989038 9.94557C0.902286 9.98151 0.809306 10 0.715406 10C0.621507 10 0.528527 9.98151 0.441775 9.94557C0.355023 9.90964 0.276199 9.85697 0.209802 9.79057C0.143405 9.72418 0.0907363 9.64535 0.0548025 9.5586C0.0188688 9.47185 0.000373895 9.37887 0.000373895 9.28497C0.000373895 9.19107 0.0188688 9.09809 0.0548025 9.01134C0.0907363 8.92459 0.143405 8.84576 0.209802 8.77936L3.99041 5.00019L0.209802 1.22101C0.143298 1.15467 0.0905335 1.07587 0.0545322 0.989109C0.0185308 0.902349 0 0.809339 0 0.715406C0 0.621474 0.0185308 0.528463 0.0545322 0.441704C0.0905335 0.354944 0.143298 0.276139 0.209802 0.209802Z"
                              fill="black"/>
                      </svg>
                    </div>`;
    return li;
};

/**
 * CreateTableListWritableColumnElement,
 * 리스트 테이블의 행(쓰기 전용)에 관한 엘리먼트를 생성하는 함수
 *
 * @param {string} table_id 테이블의 고유 아이디
 * @param {Object} column 컬럼에 관한 정보를 담고있는 오브젝트
 * */
const createTableListWritableColumnElement = (table_id, column) => {
    const li = document.createElement('li');
    li.setAttribute('data-table-row', column.id);
    li.classList.add('list-group-item');
    li.innerHTML = `<input type="text"
                           data-table-id="${table_id}"
                           value="${column.name}">
                    <div class="_check">
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
                      </svg>
                    </div>`;
    return li;
};

/**
 * CreateTableListButtonHeaderElement,
 * 리스트 테이블의 엘리먼트(헤더)를 생성하는 함수
 *
 * @requires [createTableListColumn]
 * @param {string} name 행의 이름
 * @return {string}
 * */
const createTableListButtonHeaderElement = (name) => {
    return `<div class="_title">${name}</div>
            <div class="_option _create" style="display: none;" onclick="createTableListColumn(this);">
              <svg width="20"
                   height="20"
                   viewBox="0 0 20 20"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.0002 0.833374C4.93766 0.833374 0.833496 4.93754 0.833496 10C0.833496 15.0625 4.93766 19.1667 10.0002 19.1667C15.0627 19.1667 19.1668 15.0625 19.1668 10C19.1668 4.93754 15.0627 0.833374 10.0002 0.833374ZM10.8335 13.3334C10.8335 13.5544 10.7457 13.7664 10.5894 13.9226C10.4331 14.0789 10.2212 14.1667 10.0002 14.1667C9.77915 14.1667 9.56719 14.0789 9.41091 13.9226C9.25463 13.7664 9.16683 13.5544 9.16683 13.3334V10.8334H6.66683C6.44582 10.8334 6.23385 10.7456 6.07757 10.5893C5.92129 10.433 5.8335 10.2211 5.8335 10C5.8335 9.77903 5.92129 9.56707 6.07757 9.41079C6.23385 9.25451 6.44582 9.16671 6.66683 9.16671H9.16683V6.66671C9.16683 6.44569 9.25463 6.23373 9.41091 6.07745C9.56719 5.92117 9.77915 5.83337 10.0002 5.83337C10.2212 5.83337 10.4331 5.92117 10.5894 6.07745C10.7457 6.23373 10.8335 6.44569 10.8335 6.66671V9.16671H13.3335C13.5545 9.16671 13.7665 9.25451 13.9228 9.41079C14.079 9.56707 14.1668 9.77903 14.1668 10C14.1668 10.2211 14.079 10.433 13.9228 10.5893C13.7665 10.7456 13.5545 10.8334 13.3335 10.8334H10.8335V13.3334Z"
                      fill="black"/>
              </svg>
            </div>
            <div class="_option _dropdown">
              <svg width="12"
                   height="12"
                   viewBox="0 0 12 12"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4.5L6 8.5L10 4.5"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </div>`;
};

/**
 * CreateTableListButtonHeaderWritableElement,
 * 리스트 테이블의 엘리먼트(헤더, 읽기전용)를 생성하는 함수
 *
 * @requires [updateTableName, createTableListColumn]
 * @param {string} table_id 테이블의 고유 아이디
 * @param {string} name 테이블의 이름
 * @return {string}
 * */
const createTableListButtonHeaderWritableElement = (table_id, name) => {
    return `<div class="_title">
              <input type="text"
                     data-table-id="${table_id}"
                     value="${name}">
            </div>
            <div class="_option _update" onclick="updateTableName(this);">
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
              </svg>
            </div>
            <div style="display: none;" class="_option _create" onclick="createTableListColumn(this);">
              <svg width="20"
                   height="20"
                   viewBox="0 0 20 20"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.0002 0.833374C4.93766 0.833374 0.833496 4.93754 0.833496 10C0.833496 15.0625 4.93766 19.1667 10.0002 19.1667C15.0627 19.1667 19.1668 15.0625 19.1668 10C19.1668 4.93754 15.0627 0.833374 10.0002 0.833374ZM10.8335 13.3334C10.8335 13.5544 10.7457 13.7664 10.5894 13.9226C10.4331 14.0789 10.2212 14.1667 10.0002 14.1667C9.77915 14.1667 9.56719 14.0789 9.41091 13.9226C9.25463 13.7664 9.16683 13.5544 9.16683 13.3334V10.8334H6.66683C6.44582 10.8334 6.23385 10.7456 6.07757 10.5893C5.92129 10.433 5.8335 10.2211 5.8335 10C5.8335 9.77903 5.92129 9.56707 6.07757 9.41079C6.23385 9.25451 6.44582 9.16671 6.66683 9.16671H9.16683V6.66671C9.16683 6.44569 9.25463 6.23373 9.41091 6.07745C9.56719 5.92117 9.77915 5.83337 10.0002 5.83337C10.2212 5.83337 10.4331 5.92117 10.5894 6.07745C10.7457 6.23373 10.8335 6.44569 10.8335 6.66671V9.16671H13.3335C13.5545 9.16671 13.7665 9.25451 13.9228 9.41079C14.079 9.56707 14.1668 9.77903 14.1668 10C14.1668 10.2211 14.079 10.433 13.9228 10.5893C13.7665 10.7456 13.5545 10.8334 13.3335 10.8334H10.8335V13.3334Z"
                      fill="black"/>
              </svg>
            </div>
            <div style="display: none;" class="_option _dropdown">
              <svg width="12"
                   height="12"
                   viewBox="0 0 12 12"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4.5L6 8.5L10 4.5"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </div>`;
};

/**
 * UpdateTableName,
 * 테이블의 이름을 수정하는 함수
 *
 * @requires [updateTableNameConnectable]
 * @param {HTMLElement} option 테이블의 고유 아이디
 * */
function updateTableName(option) {
    const list_table = option.closest('.table-list-component');
    const input_element = list_table.querySelector('._title > input');
    const title_element = list_table.querySelector('._title');
    const btn_create = list_table.querySelector('._option._create');
    const btn_dropdown = list_table.querySelector('._option._dropdown');
    // $(btn_create).show();
    $(btn_dropdown).show();
    let updated_value = input_element.value;
    // okiwi-query.js
    updateTableNameConnectable(draggable_tables, list_table.dataset.tableId, updated_value);

    title_element.innerHTML = `${updated_value}`;
    option.remove();
}

/**
 * CreateTableListColumn,
 * 테이블의 컬럼을 생성하는 함수
 *
 * @requires [createTableListWritableColumnElement, updateTableRowNameConnectable, createTableRowConnectable]
 * @param {HTMLElement} option 테이블의 고유 아이디
 * */
function createTableListColumn(option) {
    const list_table = option.closest('.table-list-component');
    const list_container = list_table.querySelector('.card-body .list-group');
    const row_id = apiCreateNextId(0, 'ROW');
    const column = {
        id: row_id,
        name: row_id,
    };
    const writable_column = createTableListWritableColumnElement(list_table.dataset.tableId, column);
    writable_column.querySelector('._check').addEventListener('click', function (event) {
        const li = this.closest('li');
        const input = li.querySelector('input');
        li.innerHTML = `<div class="_name">${input.value}</div>
                        <div class="_delete">
                          <svg width="10"
                               height="10"
                               viewBox="0 0 10 10"
                               fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.209802 0.209802C0.276139 0.143298 0.354944 0.0905335 0.441704 0.0545322C0.528463 0.0185308 0.621474 0 0.715406 0C0.809339 0 0.902349 0.0185308 0.989109 0.0545322C1.07587 0.0905335 1.15467 0.143298 1.22101 0.209802L5.00019 3.99041L8.77936 0.209802C8.84576 0.143405 8.92459 0.0907363 9.01134 0.0548025C9.09809 0.0188688 9.19107 0.000373895 9.28497 0.000373895C9.37887 0.000373895 9.47185 0.0188688 9.5586 0.0548025C9.64535 0.0907363 9.72418 0.143405 9.79057 0.209802C9.85697 0.276199 9.90964 0.355023 9.94557 0.441775C9.98151 0.528527 10 0.621507 10 0.715406C10 0.809306 9.98151 0.902286 9.94557 0.989038C9.90964 1.07579 9.85697 1.15461 9.79057 1.22101L6.00997 5.00019L9.79057 8.77936C9.85697 8.84576 9.90964 8.92459 9.94557 9.01134C9.98151 9.09809 10 9.19107 10 9.28497C10 9.37887 9.98151 9.47185 9.94557 9.5586C9.90964 9.64535 9.85697 9.72418 9.79057 9.79057C9.72418 9.85697 9.64535 9.90964 9.5586 9.94557C9.47185 9.98151 9.37887 10 9.28497 10C9.19107 10 9.09809 9.98151 9.01134 9.94557C8.92459 9.90964 8.84576 9.85697 8.77936 9.79057L5.00019 6.00997L1.22101 9.79057C1.15461 9.85697 1.07579 9.90964 0.989038 9.94557C0.902286 9.98151 0.809306 10 0.715406 10C0.621507 10 0.528527 9.98151 0.441775 9.94557C0.355023 9.90964 0.276199 9.85697 0.209802 9.79057C0.143405 9.72418 0.0907363 9.64535 0.0548025 9.5586C0.0188688 9.47185 0.000373895 9.37887 0.000373895 9.28497C0.000373895 9.19107 0.0188688 9.09809 0.0548025 9.01134C0.0907363 8.92459 0.143405 8.84576 0.209802 8.77936L3.99041 5.00019L0.209802 1.22101C0.143298 1.15467 0.0905335 1.07587 0.0545322 0.989109C0.0185308 0.902349 0 0.809339 0 0.715406C0 0.621474 0.0185308 0.528463 0.0545322 0.441704C0.0905335 0.354944 0.143298 0.276139 0.209802 0.209802Z"
                                  fill="black"/>
                          </svg>
                        </div>`;
        // okiwi-query.js
        updateTableRowNameConnectable(li.closest('.table-list-component').dataset.tableId, li.dataset.tableRow, input.value);
    });
    list_container.append(writable_column);

    // okiwi-query.js
    createTableRowConnectable(list_table.dataset.tableId, row_id);
}

/**
 * CreateTableList,
 * 리스트 테이블을 생성하는 함수
 *
 * @requires [createTableListElement, createTableConnectable]
 * @param {string} selector 리스트 테이블을 담을 컨테이너 셀렉터
 * @param {string} writable 테이블의 이름을 수정할 수 있는 엘리먼트를 생성할지 구분하는 변수
 * */
const createTableList = (selector, writable = undefined) => {
    const list_container = document.querySelector(selector);
    let table_id = apiCreateNextId(0, 'TABLE');
    let row_id = apiCreateNextId(0, 'ROW');
    const table = {
        id: table_id,
        name: table_id,
        columns: [{
            id: row_id,
            name: 'no',
            type: 'int',
            comment: '',
            pk: false,
            nullable: false,
            auto_increment: false,
        }],
    };
    $(list_container).append(createTableListElement(999, '#list-tables', table, writable));
    // okiwi-query.js
    createTableConnectable('.table-container', draggable_tables, table);
};

/**
 * CreateTableListConnectable,
 * 화면에서 테이블 생성시, LeftSidebar에서 테이블을 생성하는 함수
 *
 * @requires [createTableListElement]
 * @param {string} selector 리스트 테이블을 담을 컨테이너 셀렉터
 * @param {Object} draggable_table 화면에서 생성한 테이블의 정보를 담고있는 변수
 * */
const createTableListConnectable = (selector, draggable_table) => {
    const list_container = document.querySelector(selector);
    const table = {
        id: draggable_table.id,
        name: draggable_table.name,
        columns: draggable_table.columns,
    };
    $(list_container).append(createTableListElement(999, undefined, table, undefined));
};

/**
 * UpdateTableListName,
 * 화면에서 테이블 이름 수정시, LeftSidebar에서 테이블의 이름을 수정하는 함수
 *
 * @param {string} table_id 테이블의 고유 아이디
 * @param {string} changed_name 변경할 테이블 이름
 * */
const updateTableListName = (table_id, changed_name) => {
    const list_table = document.querySelector(`.table-list-component[data-table-id="${table_id}"]`);
    const title_element = list_table.querySelector('._header ._title');
    title_element.innerHTML = `${changed_name}`;
};

/**
 * CreateTableListRowConnectable,
 * 화면에서 테이블 행 생성시, LeftSidebar에서 테이블 행을 생성하는 함수
 *
 * @param {Object} draggable_table 화면에서 생성한 테이블 행의 테이블 정보를 담고있는 변수
 * @param {Node | HTMLElement} row 화면에서 생성된 행 엘리먼트 또는 노드
 * */
const createTableListRowConnectable = (draggable_table, row) => {
    const list_table = document.querySelector(`.table-list-component[data-table-id="${draggable_table.id}"]`);
    const column = {
        id: row.dataset.tableRow,
        name: row.querySelector('td._column-name > input').value,
    };
    const column_list = list_table.querySelector('.card-body .list-group');
    column_list.append(createTableListColumnElement(column));
};

/**
 * InputTableListChangeConnectable,
 * 화면에서 테이블 행의 이름을 수정시, LeftSidebar에서 테이블 행의 이름을 수정하는 함수
 *
 * @param {HTMLInputElement | Node} input 삭제옵션이 담긴 엘리먼트, 자기자신(this)
 * */
function inputTableListChangeConnectable(input) {
    const table_row_element = input.closest('[data-table-id][data-table-row]');
    const list_table = document.querySelector(`.table-list-component[data-table-id="${table_row_element.dataset.tableId}"]`);
    const list_table_column_name = list_table.querySelector(`.card-body .list-group .list-group-item[data-table-row="${table_row_element.dataset.tableRow}"] ._name`);
    list_table_column_name.innerHTML = `${input.value}`;
    const table_row = findTableRowById(table_row_element.dataset.tableId, table_row_element.dataset.tableRow);
    if (input.value.trim() === table_row.name) {
        return;
    }
    table_row.name = input.value;
}

/**
 * DeleteTableListRowConnectable,
 * 화면에서 테이블 행을 삭제시, LeftSidebar에서 테이블 행을 삭제하는 함수
 *
 * @param {string} table_id 삭제할 행이 포함된 테이블의 고유 아이디
 * @param {string} row_id 삭제할 행의 고유 아이디
 * */
function deleteTableListRowConnectable(table_id, row_id) {
    const list_table = document.querySelector(`.table-list-component[data-table-id="${table_id}"]`);
    const list_table_column = list_table.querySelector(`.card-body .list-group .list-group-item[data-table-row="${row_id}"]`);
    if (list_table_column) {
        list_table_column.querySelector('._delete').click();
    }
}
