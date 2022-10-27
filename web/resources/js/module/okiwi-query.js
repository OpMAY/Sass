'use strict';
let comment_type_input_timer;
let column_name_input_timer;

Array.prototype.addAll = function (others) {
    let thisArray = this;
    others.forEach(function (e) {
        thisArray.push(e);//from w  w  w. j av  a 2s. c  o m
    });
};
// Minimum Position
let MINIMUM_POSITION = {
    left: 400,
    top: 150
}

//// 숫자 계열
//     BIT(true, 64, true, NUMBER),
//     TINYINT(true, 3, true, NUMBER),
//     BOOL(false, null, true, NUMBER),
//     BOOLEAN(false, null, true, NUMBER),
//     SMALLINT(true, 5, true, NUMBER),
//     MEDIUMINT(true, 7, true, NUMBER),
//     INT(true, 11 , true, NUMBER),
//     INTEGER(true, 11, true, NUMBER),
//     BIGINT(true, 20, true, NUMBER),
//     DECIMAL(true, 65, true, NUMBER),
//     DEC(true, 65, true, NUMBER),
//     NUMERIC(true, 65, true, NUMBER),
//     FIXED(true, 65, true, NUMBER),
//     FLOAT(true, 23, true, NUMBER),
//     DOUBLE(true, 53, true, NUMBER),
//     DOUBLE_PRECISION(true, 255, true, NUMBER),
//     REAL(true, 255, true, NUMBER),
//     // 문자열
//     CHAR(true, 255, true, STRING),
//     VARCHAR(true, 65535, true, STRING),
//     BINARY(true, 255, true, STRING),
//     VARBINARY(true, 65535, true, STRING),
//     TINYBLOB(false, null, false, STRING),
//     TINYTEXT(false, null, false, STRING),
//     BLOB(true, 65535, false, STRING),
//     TEXT(true, 65535, false, STRING),
//     MEDIUMBLOB(false, null, false, STRING),
//     MEDIUMTEXT(false, null, false, STRING),
//     LONGBLOB(false, null, false, STRING),
//     LONGTEXT(false, null, false, STRING),
//     // SPECIAL CASES
//     ENUM(true, 65535, true, STRING),
//     SET(true, 65535, true, STRING),
//
//     // 시간형형
//     DATE(false, null, true, TIME_TYPE),
//     TIME(true, 6, true, TIME_TYPE),
//     DATETIME(true, 6, true, TIME_TYPE),
//     TIMESTAMP(true, 6, true, TIME_TYPE),
//     YEAR(false, null, true, TIME_TYPE),
//
//     // JSON Type
//     JSON(false, null, true, JSON_TYPE);
// Auto Complete Entries Variable
let entries = ['BIT(64)',
    'BOOL', 'BOOLEAN',
    'TINYINT(3)', 'SMALLINT(5)', 'MEDIUMINT(7)', 'INT(11)', 'INTEGER(11)', 'BIGINT(20)',
    'DECIMAL(65)', 'FLOAT(23)', 'DOUBLE(53)', 'DATE', 'DATETIME', 'TIMESTAMP', 'YEAR',
    'CHAR(255)', 'VARCHAR(65535)', 'BINARY(255)', 'VARBINARY(65535)',
    'TINYBLOB', 'TINYTEXT', 'TEXT(65535)', 'BLOB(65535)', 'MEDIUMTEXT', 'LONGTEXT', 'LONGBLOB',
    'ENUM(65535)', 'SET(65535)'];

// Event Status Variable
const status = {
    touchStart: false, touchEnd: false, click: false,
};

// Auto Sorting GuideLine Variable
const guide_line = {
    x_lines: [], y_lines: [],
};

let database_type = 'MYSQL';


// Draggable Tables Global Variable
let draggable_tables = new Array();
// Leader lines Global Variable
let leader_lines = new Array();

// Close Event Initialize
$(document).mouseup(contextMenuMouseUpCloseEventListener);
$(document).mouseup(tableOptionListMouseUpCloseEventListener);


/**
 * initializeDatabaseTypes,
 * 초기 데이터베이스에 맞춘 type array set
 *
 *
 * @param {array} types 서버에서 전달하는 type List
 * @param {string} dbType 서버에서 전달하는 database Type
 * */
function initializeDatabaseTypes(types, dbType) {
    if (types !== undefined && types.length > 0)
        entries = types;
    database_type = dbType;
}

/**
 * InitializeScale,
 * 초기 스케일 설정 및 이벤트별 스케일 사이즈 설정
 *
 * @requires [reInitializeTableScale]
 * @param {number} scale_size 스케일 변경 사이즈 값
 * @param {number} scale 초기 스케일 값
 * */
function initializeScale(scale_size, scale) {
    document.querySelector('._right-option._scale-up').setAttribute('data-size', scale_size);
    document.querySelector('._right-option._scale-up').setAttribute('data-scale', scale ? scale : 1);
    document.querySelector('._right-option._scale-down').setAttribute('data-size', scale_size);
    document.querySelector('._right-option._scale-down').setAttribute('data-scale', scale ? scale : 1);
    document.querySelector('._right-option._scale-up').addEventListener('click', function (event) {
        const org_scale = parseFloat(this.dataset.scale);
        const size = parseFloat(this.dataset.size);
        this.setAttribute('data-scale', org_scale > parseFloat(1.6) ? org_scale : org_scale + size);
        document.querySelector('._right-option._scale-down').setAttribute('data-scale', org_scale > parseFloat(1.6) ? org_scale : org_scale + size);
        reInitializeTableScale(draggable_tables, leader_lines, org_scale > parseFloat(1.6) ? org_scale : org_scale + size);
    });
    document.querySelector('._right-option._scale-down').addEventListener('click', function (event) {
        const org_scale = parseFloat(this.dataset.scale);
        const size = parseFloat(this.dataset.size);
        this.setAttribute('data-scale', org_scale < parseFloat(0.4) ? org_scale : org_scale - size);
        document.querySelector('._right-option._scale-up').setAttribute('data-scale', org_scale < parseFloat(0.4) ? org_scale : org_scale - size);
        reInitializeTableScale(draggable_tables, leader_lines, org_scale < parseFloat(0.4) ? org_scale : org_scale - size);
    });
}

/**
 * ContextMenuMouseUpCloseEventListener,
 * 커스텀 컨텍스트 메뉴 닫기 이벤트 리스너
 *
 * @param {MouseEvent} e
 * */
function contextMenuMouseUpCloseEventListener(e) {
    const target = $('#context-menu');
    if (target.has(e.target).length === 0) {
        if (target.css('display') === 'none') {
            return;
        } else {
            target.css('display', 'none');
        }
    }
}

/**
 * TableOptionListMouseUpCloseEventListener,
 * 테이블 옵션 리스트 닫기 이벤트 리스너
 *
 * @param {MouseEvent} e
 * */
function tableOptionListMouseUpCloseEventListener(e) {
    const options = $('#table-option-list');
    if (options.has(e.target).length === 0) {
        if (options.css('display') === 'none') {
            return;
        } else {
            options.css('display', 'none');
        }
    }
}

/**
 * TableAutoSorting,
 * 테이블들의 자동 정렬 함수
 *
 * @requires [findTableById, getMaxHeight, updateContainerFix, updatePosition, updateLines]
 * @param {Object[]} draggable_tables 전역 테이블들
 * @param {Object[]} leader_lines 전역 연결선들
 * */
const tableAutoSorting = (draggable_tables, leader_lines) => {
    /* AutoSorting Bug
      * 테이블 크키만큼 Scale 했을때 미세한 차이가 난다.
      * */
    const tables = document.querySelectorAll('.table-container .component');
    const scale = parseFloat(document.querySelector('._right-option._scale-up').dataset.scale);
    let base_top = MINIMUM_POSITION.top * scale;
    let base_left = MINIMUM_POSITION.left * scale;
    let next_left = base_left;
    let base_draggable_table_objects = new Array();
    for (let i = 0; i < tables.length; i++) {
        const draggable_table_object = findTableById(draggable_tables, tables[i].id);
        if (i === 0) {
            updateContainerFix(draggable_table_object.draggable_table, {
                left: base_left, top: base_top,
            });
            draggable_table_object.draggable_table.element.style.transform = `translate(${base_left}px, ${base_top}px) scale(${scale})`;
            draggable_table_object.draggable_table.position();
            updatePosition(draggable_tables, draggable_table_object.draggable_table.element, {
                left: draggable_table_object.draggable_table.rect.left,
                top: draggable_table_object.draggable_table.rect.top,
            });
            next_left = base_left + (draggable_table_object.draggable_table.element.offsetWidth * scale) + (100 * scale);
            base_draggable_table_objects.push(draggable_table_object);
            continue;
        }
        updateContainerFix(draggable_table_object.draggable_table, {
            left: next_left, top: base_top,
        });
        draggable_table_object.draggable_table.element.style.transform = `translate(${next_left}px, ${base_top}px) scale(${scale})`;
        draggable_table_object.draggable_table.position();
        updatePosition(draggable_tables, draggable_table_object.draggable_table.element, {
            left: draggable_table_object.draggable_table.rect.left,
            top: draggable_table_object.draggable_table.rect.top,
        });
        next_left = next_left + (draggable_table_object.draggable_table.element.offsetWidth * scale) + (100 * scale);

        base_draggable_table_objects.push(draggable_table_object);
        if (i % 3 === 0) {
            const tableMaxHeight = getMaxHeight(base_draggable_table_objects);
            base_top = base_top + (tableMaxHeight * scale) + (100 * scale);
            next_left = base_left;
            base_draggable_table_objects = new Array();
        }
    }
    // Line Update
    updateLines(leader_lines);
};

/**
 * GetNearYGuideLine,
 * Y축의 가이드라인들 중, {top}과 가장 가까운 y_line을 얻는 함수,
 * 가장 가까운 Y축 가이드라인을 얻는 함수
 *
 * @deprecated
 * @param {number} top 테이블의 Top 포지션
 * @return {Object} {top}과 가장 가까운 y_line 오브젝트
 * */
const getNearYGuideLine = (top) => {
    let near = 0;
    let abs = 0;
    let min = 1000000;
    guide_line.y_lines.forEach(function (y_line) {
        abs = ((y_line.distance - top) < 0) ? -(y_line.distance - top) : (y_line.distance - top);
        if (abs < min) {
            min = abs;
            near = y_line;
        }
    });
    return near;
};

/**
 * GetMinTop,
 * 테이블들중 가장 위에있는 테이블의 Top 좌표값을 얻는 함수
 *
 * @param {Object[]} tables javascript에 등록된 있는 테이블의 목록들
 * @return {number} {tables} 중에서 가장 위에있는 테이블의 Top 좌표
 * */
const getMinTop = (tables) => {
    let min_top = 1000000;
    tables.forEach(function (table) {
        if (min_top > table.position.top) {
            min_top = table.position.top;
        }
    });
    return min_top;
};

/**
 * GetMaxTop,
 * 테이블들중 가장 아래쪽에 있는 테이블의 Top 좌표값을 얻는 함수
 *
 * @param {Object[]} tables javascript에 등록된 있는 테이블의 목록들
 * @return {number} {tables} 중에서 가장 위에있는 테이블의 Top 좌표
 * */
const getMaxTop = (tables) => {
    let max_top = 0;
    tables.forEach(function (table) {
        if (max_top < table.position.top) {
            max_top = table.position.top;
        }
    });
    return max_top;
};

/**
 * GetMaxHeight,
 * 테이블들중 가장 Height가 높은 테이블의 길이를 가져오는 함수
 *
 * @param {Object[]} tables javascript에 등록된 테이블의 목록들
 * @return {number} {tables} 중에서 가장 Height가 높은 테이블의 길이
 * */
const getMaxHeight = (tables) => {
    let max_height = 0;
    tables.forEach(function (table) {
        const table_height = $(table.draggable_table.element).innerHeight();
        if (max_height < table_height) {
            max_height = table_height;
        }
    });
    return max_height;
};

/**
 * GetNextTableId,
 * 테이블의 ID을 랜덤으로 가져오는 함수,
 * 곧 deprecated 될 예정인 함수
 *
 * @require utility.js imported
 * @return {string} 10자리 랜덤 스트링
 * */
const getNextTableId = () => {
    return tokenGenerator(10);
};

/**
 * GetNextRowId,
 * 테이블의 행 ID을 랜덤으로 가져오는 함수,
 * 곧 deprecated 될 예정인 함수
 *
 * @require utility.js imported
 * @return {string} 10자리 랜덤 스트링
 * */
const getNextRowId = () => {
    return tokenGenerator(10);
};

/**
 * CreateTableModifyElement,
 * 테이블 수정 (테이블 이름) 엘리먼트를 생성하는 함수
 *
 * @param {string} tableId 수정할 테이블의 고유 아이디
 * @param {number} height 엘리먼트의 height
 * @param {string} value 수정할때 기본으로 가져갈 테이블의 이름
 * @return {string} html code
 * */
const createTableModifyElement = ({tableId, height, value}) => {
    return `<input type="text" data-table-id="${tableId}" name="${tableId}_table-header_name" value="${value}" style="height: ${height};">
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 6L5.5 10.5L13 1.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>`;
};

/**
 * InitializeTableOptions,
 * 테이블의 옵션 클릭에 관한 각각의 로직을 설정하는 함수
 *
 * @requires [createTableModifyElement, updateTableListName, deleteTable, findTableById]
 * @param {string} selector 옵션 엘리먼트의 Selector
 * */
const initializeTableOptions = (selector) => {
    const option = document.querySelector(selector);
    $(option).on('click', 'li', function (event) {
        if (this.classList.contains('_modify')) {
            const table = document.querySelector(`.table-container .component[id="${option.dataset.tableId}"]`);
            const value = table.querySelector('._table-header th._name').innerText;
            const name_element = table.querySelector('._table-header th._name');
            const styles = window.getComputedStyle(name_element);
            const height = 'auto';
            name_element.innerHTML = createTableModifyElement({
                tableId: option.dataset.tableId, height: height, value: value,
            });
            name_element.querySelector('svg').addEventListener('click', function (event) {
                const name_element = this.closest('._name');
                const update_value = name_element.querySelector('input').value;
                const table = findTableById(draggable_tables, name_element.querySelector('input').dataset.tableId);
                // okiwi-query-left.js
                if (table.name !== update_value && findTableByName(draggable_tables, update_value).length !== 0) {
                    console.log(table);
                    alert('테이블의 이름이 다른 테이블과 중복됩니다. 다시 입력해주세요.');
                    return;
                }
                if (update_value.length !== 0 && (update_value.length >= 2 && update_value.length < 64) && !update_value.includes(' ')) {
                    updateTableListName(name_element.querySelector('input').dataset.tableId, update_value);
                    name_element.innerHTML = `${update_value}`;
                    table.name = `${update_value}`;
                    // apis.js
                    apiUpdateTable(getURLParamByPrevAndNext('database', 'detail'), table.id, {name: `${update_value}`}, () => {
                    }, () => {
                    });
                } else {
                    alert('테이블 이름은 최소 2글자 최대 63자 까지 설정이 가능합니다.');
                }
            });
        } else if (this.classList.contains('_duplicate')) {
            // TODO Duplicate
        } else if (this.classList.contains('_sql')) {
            // TODO SQL Creator
        } else if (this.classList.contains('_data')) {
            // TODO Data Creator
        } else if (this.classList.contains('_view')) {
            // TODO View Mode (Full View, Simple View)
        } else if (this.classList.contains('_delete')) {
            deleteTable(document.querySelector(`.table-container .component[id="${option.dataset.tableId}"]`));
        }
        $(option).hide();
    });
};

/**
 * InitializeGuideLines,
 * 정렬 가이드라인 설정 및 초기화하는 함수
 *
 * @require 전역으로 등록된 guide_line object 필요
 * @default is_position -> false
 * @deprecated
 * @param {Object} guide_line javascript에 등록된 전역 변수
 * @param {number} xInterval X축 간격
 * @param {number} yInterval Y축 간격
 * @param {number} count 간격의 개수
 * @param {number} offsetX 초기 X축의 값
 * @param {number} offsetY 초기 Y축의 값
 * */
const initializeGuideLines = (guide_line, xInterval = 600, yInterval = 600, count = 20, offsetX = 400, offsetY = 0) => {
    for (let i = 1; i <= count; i++) {
        if (guide_line.x_lines === undefined || guide_line.x_lines === null) {
            guide_line.x_lines = new Array();
        }
        if (guide_line.y_lines === undefined || guide_line.y_lines === null) {
            guide_line.y_lines = new Array();
        }
        guide_line.x_lines.push({distance: i * xInterval + offsetX, is_position: false});
        guide_line.y_lines.push({distance: i * yInterval + offsetY, is_position: false});
    }
};

/**
 * Initialize Table Sorted,
 * 초기 테이블들을 불러올때에 테이블들의 자동 정렬하는 함수
 *
 * @deprecated
 *
 * @param {Object[]} tables javascript에 등록된 테이블의 목록들
 * @param {Object[]} leader_lines javascript에 등록된 연결선의 목록들
 * @return {Object[]} position이 등록된 tables arraylist
 * */
const initializeTableSorted = (tables) => {
    return tables;
};

/**
 * ReInitializeView,
 * 화면의 Width와 Height을 테이블의 포지션에 맞게 값 조절하는 함수
 *
 * @require {initializeTable}이 먼저 실행되어야 합니다.
 * @default {max_top} + 800, {max_left} + 800으로 컨테이너 사이즈 조절
 * @param {HTMLElement} container view(element)
 * @param {Object} object {max_top, max_left}
 * */
const reinitializeView = (container, {max_top, max_left}) => {
    container.style.width = (max_left + 800) + 'px';
    container.style.height = (max_top + 600) + 'px';
};

/**
 * GetMaxView,
 * 테이블들의 Top과 Left를 파악해 가장 큰값을 얻는 함수
 *
 * @param {Object[]} tables javascript에 등록된 테이블들의 목록
 * @return {Object} {max_top, max_left}
 * */
const getMaxView = (tables) => {
    let max_top = 0;
    let max_left = 0;

    tables.forEach(function (table) {
        if (max_top < table.position.top) {
            max_top = table.position.top;
        }

        if (max_left < table.position.left) {
            max_left = table.position.left;
        }
    });

    return {max_top, max_left};
};

/**
 * InitializeTableControlEventRegister,
 * 테이블의 이벤트들을 등록해주는 함수,
 *
 * @requires [tableRowUpEventListener,tableRowDownEventListener,tableRowCreateEventListener,tableOptionClickEventListener,tableMouseHoverEventListener]
 * @param {HTMLElement} element 테이블의 Element
 * */
const initializeControlEventListener = (element) => {
    const btn_up = element.querySelector('._table ._table-header ._sort.__up');
    btn_up.addEventListener('click', tableRowUpEventListener);
    const btn_down = element.querySelector('._table ._table-columns ._sort.__down');
    btn_down.addEventListener('click', tableRowDownEventListener);
    const btn_create = element.querySelector('._table ._table-columns ._create');
    btn_create.addEventListener('click', tableRowCreateEventListener);
    const btn_option = element.querySelector('._table ._table-header ._option');
    btn_option.addEventListener('click', tableOptionClickEventListener);

    // Auto ZIndex 설정
    element.addEventListener('mouseover', tableMouseHoverEventListener);
};

/**
 * InitializeTable,
 * 테이블들의 데이터를 가지고 실제 테이블을 생성하는 함수
 * @requires [createTableElement(), getMaxView()]
 * @param {jQuery} $container 테이블들을 생성할 컨테이너
 * @param {Object[]} tables javascript에 등록된 테이블들의 목록
 * @return {jQuery} 생성된 테이블들
 * */
const initializeTable = ($container, tables) => {
    const is_simple = document.querySelector('._side-simple').dataset.type === 'simple' ? true : false;
    reinitializeView($container[0], getMaxView(tables));
    tables.forEach(function (table, index) {
        $container.append(createTableElement(table, index + 2000, is_simple));
    });
    return $('.table-container .component');
};

/**
 * CreateTable,
 * 테이블을 추가 생성하는 함수
 *
 * @requires [createTableElement, onMoveEventListener, onMoveStartEventListener, onDragEventListener, onDragStartEventListener, onDragEndEventListener, initializeControlEventListener, initializeTableRowSelect, initializeTableRowDrag, tableRowAutoCompletes, createTableListConnectable, simpleTableView, detailTableView]
 * @param {jQuery} $container 테이블들 등록시킬 컨테이너
 * @param {Object[]} draggable_tables 생성한 테이블의 object를 넣을 전역 테이블들
 * @param {Object} table 생성할 테이블의 object
 * @param {number} zIndex 생성할 테이블의 z-index 값
 * @param {string} connectable LeftSidebar에서도 로직 진행을 시킬지 구분하는 변수, default = undefined
 * */
const createTable = ($container, draggable_tables, table, zIndex, connectable = undefined) => {
    const is_simple = document.querySelector('._side-simple').dataset.type === 'simple' ? true : false;
    const scrollWidth = $container[0].getBoundingClientRect().left;
    const scrollHeight = $container[0].getBoundingClientRect().top;

    const table_position = {
        id: table.id, position: {
            // 100은 만들어질 Component 초기 Height
            top: (window.innerHeight / 2) + Math.abs(scrollHeight) - 130, // 200은 만들어질 Component 초기 Width
            left: (window.innerWidth / 2) + Math.abs(scrollWidth) - 200,
        },
    };
    table.position = table_position.position;
    $container.append(createTableElement(table, zIndex, is_simple));

    const table_element = $('.component' + `[id="${table.id}"]`);
    const draggable_table = new PlainDraggable(table_element[0], {
        onMove: onMoveEventListener,
        onMoveStart: onMoveStartEventListener,
        onDrag: onDragEventListener,
        onDragStart: onDragStartEventListener,
        onDragEnd: onDragEndEventListener,
        handle: table_element[0].querySelector('._table ._table-header th:first-child'),
        autoScroll: true,
        scale: parseFloat(document.querySelector('._right-option._scale-up').dataset.scale),
    });
    // Control Button Event Listener
    initializeControlEventListener(draggable_table.element);
    // Table Row Select Event Listener
    initializeTableRowSelect(draggable_table.element.querySelectorAll('table._table > tbody > tr'));
    // Initialize Row Drag Event Listener
    initializeTableRowDrag(draggable_table.element.querySelectorAll('table._table > tbody > tr'));
    table.draggable_table = draggable_table;
    // Auto Complete in Type Column
    tableRowAutoCompletes(table);

    draggable_tables.push(table);

    // okiwi-query-left.js
    if (connectable === undefined) {
        createTableListConnectable('#list-tables', table);
    }

    const type = document.querySelector('#right-sidebar ._right-menu ._side-button-container ._side-simple').dataset.type;
    if (type === 'simple') {
        simpleTableView(table.draggable_table.element);
    } else {
        detailTableView(table.draggable_table.element);
    }
    // apis.js
    apiCreateTable(getURLParamByPrevAndNext('database', 'detail'), table, () => {
    }, () => {
    });
};

/**
 * InitializeDraggableTables,
 * DOM에 등록된 테이블들에 Drag 이벤트와 각종이벤트를 등록시키는 함수
 * @requires [onMoveEventListener, onMoveStartEventListener, onDragEventListener, onDragStartEventListener, onDragEndEventListener, initializeControlEventListener, initializeTableRowSelect, initializeTableRowDrag, tableRowAutoCompletes, tableAutoSorting]
 * @param {Object[]} draggable_tables 이벤트를 등록한 테이블들을 넣는 전역 테이블들
 * @param {jQuery} $tables 생성할 테이블의 오브젝트들
 * @param {HTMLElement[] | Object[]} origin_tables 테이블의 오브젝트들
 * */
const initializeDraggableTables = (draggable_tables, $tables, origin_tables) => {
    // Process
    // onDragStart -> onDrag -> onMoveStart -> onMove -> onDragEnd
    $tables.each(function (index, table) {
        const draggable_table = new PlainDraggable(table, {
            onMove: onMoveEventListener,
            onMoveStart: onMoveStartEventListener,
            onDrag: onDragEventListener,
            onDragStart: onDragStartEventListener,
            onDragEnd: onDragEndEventListener,
            handle: table.querySelector('._table ._table-header th:first-child'),
            autoScroll: true,
            scale: parseFloat(document.querySelector('._right-option._scale-up').dataset.scale),
        });
        // Control Button Event Listener
        initializeControlEventListener(draggable_table.element);
        // Table Row Select Event Listener
        initializeTableRowSelect(draggable_table.element.querySelectorAll('table._table > tbody > tr'));
        const origin_table = origin_tables.find(function (origin_table) {
            if (origin_table.id === table.id) {
                return true;
            }
        });
        // Initialize Row Drag Event Listener
        initializeTableRowDrag(draggable_table.element.querySelectorAll('table._table > tbody > tr'));
        origin_table.draggable_table = draggable_table;
        // Table Row AutoComplete in Type Column
        tableRowAutoCompletes(origin_table);
        draggable_tables.push(origin_table);
    });
    // tableAutoSorting(draggable_tables, leader_lines);
};

/**
 * InitializeLeaderLine,
 * 연결선에 관련된 오브젝트들로 연결을 초기 설정하는 함수
 *
 * @param {Object[]} lines 연결할 선들의 정보가 담긴 목록
 * @return {Object[]} 연결선 오브젝트들
 * */
const initializeLines = (lines) => {
    const options = {
        path: 'fluid', color: '#969696', dash: {len: 5, gap: 2},
    };

    const initializedLines = new Array();
    lines.forEach(function (line) {
        const to_row = document.querySelector(`[data-table-id="${line.to}"][data-table-row="${line.to_row}"]`);
        const from_row = document.querySelector(`[data-table-id="${line.from}"][data-table-row="${line.from_row}"]`);

        const leader_line_obj = {
            leader_line: new LeaderLine(to_row, from_row, options,), info_line: line,
        };
        to_row.querySelector('._fk').innerHTML = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                              <g clip-path="url(#clip0_6_4459)">
                                                                  <path fill-rule="evenodd" clip-rule="evenodd"
                                                                        d="M6.85575 6.8558C3.65198 10.0596 3.65198 15.2542 6.85575 18.4579C10.0595 21.6617 15.2541 21.6617 18.4579 18.4579C21.6616 15.2542 21.6616 10.0596 18.4579 6.8558C15.2541 3.65203 10.0595 3.65203 6.85575 6.8558ZM15.2937 14.239C15.4335 14.3788 15.5121 14.5685 15.5121 14.7663C15.5121 14.9641 15.4335 15.1538 15.2937 15.2937C15.1538 15.4336 14.9641 15.5121 14.7663 15.5122C14.5685 15.5122 14.3788 15.4336 14.2389 15.2937L12.6568 13.7116L11.0747 15.2937C10.9348 15.4336 10.7451 15.5121 10.5473 15.5121C10.3495 15.5121 10.1598 15.4336 10.02 15.2937C9.8801 15.1538 9.80152 14.9641 9.80152 14.7663C9.80152 14.5685 9.8801 14.3788 10.02 14.239L11.6021 12.6569L10.02 11.0748C9.8801 10.9349 9.80152 10.7452 9.80152 10.5474C9.80152 10.3496 9.8801 10.1599 10.02 10.02C10.1598 9.88015 10.3495 9.80157 10.5473 9.80157C10.7451 9.80157 10.9348 9.88015 11.0747 10.02L12.6568 11.6021L14.2389 10.02C14.3788 9.88015 14.5685 9.80157 14.7663 9.80157C14.9641 9.80157 15.1538 9.88015 15.2937 10.02C15.4335 10.1599 15.5121 10.3496 15.5121 10.5474C15.5121 10.7452 15.4335 10.9349 15.2937 11.0748L13.7115 12.6569L15.2937 14.239Z"
                                                                        fill="#F08705"/>
                                                              </g>
                                                              <defs>
                                                                  <clipPath id="clip0_6_4459">
                                                                      <rect width="17.8995" height="17.8995" fill="white" transform="translate(0 12.6569) rotate(-45)"/>
                                                                  </clipPath>
                                                              </defs>
                                                          </svg>`;
        to_row.querySelector('._fk').setAttribute('data-status', 'close');
        initializedLines.push(leader_line_obj);
    });
    return initializedLines;
};

/**
 * MoveLeaderLines,
 * 선들을 {container} 안으로 이동시키는 함수
 *
 * @requires [moveLeaderLine, updateLines]
 * @param {jQuery} $container 테이블들이 있는 Container
 * @param {Object[]} lines 연결할 선들의 정보가 담긴 목록
 * */
const moveLeaderLines = ($container, lines) => {
    const defs = $('body > #leader-line-defs');
    if (defs !== null && defs !== undefined && defs.length > 0) {
        $container.append(defs);
    }
    lines.forEach(function (line) {
        moveLeaderLine($container, line);
    });
    updateLines(lines);
};

/**
 * MoveLeaderLine,
 * 선을 {container} 안으로 이동시키는 함수

 * @param {jQuery} container 테이블들이 있는 컨테이너
 * @param {Object} leader_line 연결할 선의 정보가 담긴 목록
 * */
const moveLeaderLine = (container, leader_line) => {
    const vector = $(`body > svg.leader-line #leader-line-${leader_line.leader_line._id}-line-path`).closest('.leader-line');
    if (vector !== null && vector !== undefined && vector.length > 0) {
        vector.attr('data-line-id', leader_line.leader_line._id);
        container.append(vector);
    }
};

/**
 * OnDragEventListener,
 * Draggable onDrag Event Listener
 *
 * @requires [updateContainer]
 * @param {Object} position 드래그하고 있는 위치 좌표에 대한 정보
 * */
function onDragEventListener(position) {
    const draggable_table = this;
    const table = draggable_table.element;
    const container = draggable_table.containment;
    const table_id = draggable_table._id;
    if (position.top < MINIMUM_POSITION.top) {
        position.top = MINIMUM_POSITION.top;
    }
    if (position.left < MINIMUM_POSITION.left) {
        position.left = MINIMUM_POSITION.left;
    }
    updateContainer(draggable_table, position);
}

/**
 * OnDragStartEventListener,
 * Draggable onDragStart Event Listener
 *
 * @requires [updateZIndex, updatePosition]
 * @param {Object} position 드래그시작 위치 좌표에 대한 정보
 * */
function onDragStartEventListener(position) {
    const draggable_table = this;
    const table = draggable_table.element;
    const container = draggable_table.containment;
    const table_id = draggable_table._id;
    updateZIndex(container, draggable_table);
    //updatePosition(draggable_tables, table, position);
}

/**
 * OnDragEndEventListener,
 * Draggable onDragEnd Event Listener
 *
 * @requires [updateZIndex(), updatePosition()]
 * @param {Object} position 드래그가 끝난 위치 좌표에 대한 정보
 * */
function onDragEndEventListener(position) {
    const draggable_table = this;
    const table = draggable_table.element;
    const container = draggable_table.containment;
    const table_id = draggable_table._id;
    updateZIndex(container, draggable_table);
    updatePosition(draggable_tables, table, position);
}

/**
 * OnMoveStartEventListener,
 * Draggable onMoveStart Event Listener
 *
 * @requires [updatePosition, updateContainer]
 * @param {Object} position 이동이 시작된 위치 좌표에 대한 정보
 * */
function onMoveStartEventListener(position) {
    const draggable_table = this;
    const table = draggable_table.element;
    if (table.classList.contains('plain-draggable-dragging')) {
        if (!table.classList.contains('is-move')) {
            table.classList.add('is-move');
        }
    }
    const container = draggable_table.containment;
    const table_id = draggable_table._id;
    //updatePosition(draggable_tables, table, position);
    updateContainer(draggable_table, position);
}

/**
 * OnMoveEventListener,
 * Draggable onMove Event Listener
 *
 * @requires [updateLines, updatePosition]
 * @param {Object} position 이동하고 있는 위치 좌표에 대한 정보
 * */
function onMoveEventListener(position) {
    const draggable_table = this;
    const table = draggable_table.element;
    const container = draggable_table.containment;
    const table_id = draggable_table._id;
    updateLines(leader_lines);
    //updatePosition(draggable_tables, table, position);
}

/**
 * UpdatePosition,
 * 테이블 드래그 및 이동할때 DOM에 등록된 테이블들의 목록에서 위치에 관한것을 수정해주는 함수
 *
 * @param {Object[]} draggable_tables 전역 테이블들
 * @param {HTMLElement} table 포지션을 등록할 테이블
 * @param {Object} position top, left 정보가 담긴 오브젝트
 * */
const updatePosition = (draggable_tables, table, position) => {
    const draggable_table = draggable_tables.find(function (draggable_table) {
        if (draggable_table.id === table.id) {
            return true;
        }
    });
    draggable_table.position.top = position.top;
    draggable_table.position.left = position.left;
    // api.js
    apiUpdateTablePosition(getURLParamByPrevAndNext('database', 'detail'), draggable_table.id, position, () => {
    }, () => {
    });
};

/**
 * UpdateLines,
 * DOM에 등록된 연결선들을 업데이트 해주는 함수
 *
 * @requires [updateLine]
 * @param {Object[]} leader_lines 선에 관한 정보를 담고있는 목록들
 * */
const updateLines = (leader_lines) => {
    leader_lines.forEach(function (line) {
        updateLine(line);
    });
};

/**
 * UpdateLine,
 * DOM에 등록된 연결선을 업데이트 해주는 함수
 *
 * @requires [updateLineDirection]
 * @param {Object} line 선에 관한 정보를 담고있는 오브젝트
 * */
const updateLine = (line) => {
    line.leader_line.position();
    updateLineDirection(line);
};

/**
 * CreateLine,
 * 연결선을 생성하는 함수
 *
 * @requires [moveLeaderLine]
 * @param {Object[]} leader_lines 선에 관한 정보를 담고있는 목록들
 * @param {HTMLElement} to_row 선을 연결할 시작부분의 엘리먼트
 * @param {HTMLElement} from_row 선을 연결할 끝부분의 엘리먼트
 * @param {Object} options 선 생성에 관한 옵션을 담고있는 오브젝트
 * @param {Object} line 선에 관한 정보를 담고있는 오브젝트
 * */
const createLine = (leader_lines, to_row, from_row, options, line) => {
    const leader_line_obj = {
        leader_line: new LeaderLine(to_row, from_row, options,), info_line: line,
    };
    leader_lines.push(leader_line_obj);
    moveLeaderLine($('.table-container'), leader_line_obj);
    // api.js
    apiConnectLine(getURLParamByPrevAndNext('database', 'detail'), leader_line_obj.info_line, () => {
    }, () => {
    });
    return leader_line_obj;
};

/**
 * UpdateLineDirection,
 * 선을 View에 그릴때 이쁘게 그려지도록 하는 함수,
 * 선을 그릴때 시작 부분과 끝부분을 조절하는 함수
 *
 * @requires [getTransformStyle]
 * @param {Object} leader_line_obj 선에 관한 정보를 담고있는 오브젝트
 * */
const updateLineDirection = (leader_line_obj) => {
    const scale = parseFloat(document.querySelector('._right-option._scale-up').dataset.scale);
    const to_element = document.querySelector(`[data-table-id="${leader_line_obj.info_line.to}"][data-table-row="${leader_line_obj.info_line.to_row}"]`);
    const from_element = document.querySelector(`[data-table-id="${leader_line_obj.info_line.from}"][data-table-row="${leader_line_obj.info_line.from_row}"]`);

    const to_table = to_element.closest('.component');
    const from_table = from_element.closest('.component');

    const to_table_position = getTransformStyle(to_table);
    const from_table_position = getTransformStyle(from_table);

    const to_table_width = $(to_table).innerWidth() * scale;
    const from_table_width = $(from_table).innerWidth() * scale;

    const to_table_center_x = (to_table_position.left * scale) + (to_table_width / 2);
    const from_table_center_x = (from_table_position.left * scale) + (from_table_width / 2);
    const distance = Math.abs((to_table_position.left * scale) - (from_table_position.left) * scale);
    if (to_table_center_x > from_table_center_x) {
        // To Table의 중앙값이 From Table의 중앙값보다 오른쪽에 있을때
        // Threshing Setting
        if (distance > from_table_width) {
            // 중앙값 간의 거리를 비교헀을때 거리가 Table의 Width를 넘을 때
            //          [ start ]
            // [end]
            leader_line_obj.leader_line.setOptions({
                startSocket: 'left', endSocket: 'right', startSocketGravity: [-100, 0], endSocketGravity: [100, 0],
            });
        } else if (distance < from_table_width) {
            // 중앙값 간의 거리를 비교헀을때 거리가 Table의 Width를 넘지않았을 때
            // [  start  ]
            // [ end ]
            leader_line_obj.leader_line.setOptions({
                startSocket: 'left', endSocket: 'left', startSocketGravity: [-100, 0], endSocketGravity: [-100, 0],
            });
        }
    } else {
        // To Table의 중앙값이 From Table의 중앙값보다 왼쪽에 있을때
        if (distance > from_table_width) {
            // 중앙값 간의 거리를 비교헀을때 거리가 Table의 Width를 넘을 때
            //          [ start ]
            //                      [end]
            leader_line_obj.leader_line.setOptions({
                startSocket: 'right', endSocket: 'left', startSocketGravity: [100, 0], endSocketGravity: [-100, 0],
            });
        } else if (distance < from_table_width) {
            // 중앙값 간의 거리를 비교헀을때 거리가 Table의 Width를 넘지않았을 때
            // [  start  ]
            //       [ end ]
            leader_line_obj.leader_line.setOptions({
                startSocket: 'right', endSocket: 'right', startSocketGravity: [100, 0], endSocketGravity: [100, 0],
            });
        }
    }
};

/**
 * UpdateZIndex,
 * 테이블들의 z-index 값을 업데이트 하는 함수
 *
 * @requires [getMaxZIndex]
 * @param {HTMLElement} container 테이블들이 있는 컨테이너
 * @param {Object} draggable_table 테이블의 정보를 담고있는 오브젝트
 * */
const updateZIndex = (container, draggable_table) => {
    const tables = container.querySelectorAll('.component');
    draggable_table.element.style.zIndex = getMaxZIndex(tables);
};

/**
 * GetMaxZIndex,
 * 테이블들 중 가장 큰 Z Index 반환하는 함수
 *
 * @param {NodeList | HTMLElement[]} tables javascript에 등록된 테이블들
 * @return {number} 가장 큰 Z Index에서 +1을 한 값
 * */
const getMaxZIndex = (tables) => {
    let maxIndex = 0;
    tables.forEach(function (table) {
        const zIndex = table.style.zIndex;
        if (maxIndex < zIndex) {
            maxIndex = zIndex;
        }
    });
    return ++maxIndex;
};

/**
 * GetTransformStyle,
 * 엘리먼트에 등록된 Transform의 데이터(좌표)를 가져오는 함수
 *
 * @param {HTMLElement} element
 * @return {Object} {left, top}
 * */
const getTransformStyle = (element) => {
    const transformValue = window.getComputedStyle(element).transform;
    const w = window.getComputedStyle(element).width;
    const matrix = new WebKitCSSMatrix(transformValue);
    return {left: matrix.m41, top: matrix.m42};
};

/**
 * CreateTableElement,
 * 테이블의 Element를 생성하는 함수,
 * (기존 테이블에 관련된 데이터가 있을 경우)
 *
 * @requires [createTableHeadHeaderElement, createTableHeadColumnsElement, createTableRowElement]
 * @param {Object} table 테이블에 관한 정보가 있는 오브젝트
 * @param {number} zIndex 등록할 테이블의 z-index 값
 * @param {boolean} is_simple 간단 보기 옵션, default = false
 * @return {HTMLElement} html code
 * */
const createTableElement = (table, zIndex, is_simple = false) => {
    const component = document.createElement('div');
    component.classList.add('component', 'position-absolute');
    component.setAttribute('id', `${table.id}`);
    ['width', 'z-index', 'transform'].forEach(function (style) {
        switch (style) {
            case 'width':
                component.style.width = 'auto';
                break;
            case 'z-index':
                component.style.zIndex = `${zIndex}`;
                break;
            case 'transform':
                component.style.transform = `translate(${table.position.left}px, ${table.position.top}px`;
                break;
        }
    });

    const table_element = document.createElement('table');
    table_element.classList.add('table', 'table-dark', '_table');

    const table_head_element = document.createElement('thead');

    const table_head_header_element = document.createElement('tr');
    table_head_header_element.classList.add('_table-header');
    $(table_head_header_element).append(createTableHeadHeaderElement(table));
    table_head_element.append(table_head_header_element);

    const table_head_columns_element = document.createElement('tr');
    table_head_columns_element.classList.add('_table-columns');
    $(table_head_columns_element).append(createTableHeadColumnsElement(is_simple));
    table_head_element.append(table_head_columns_element);

    table_element.append(table_head_element);

    const table_body_element = document.createElement('tbody');
    table.columns.forEach(function (column, index) {
        let table_row_element = createTableRowElement(table, index, is_simple);
        $(table_body_element).append(table_row_element);
    });
    table_element.append(table_body_element);
    component.append(table_element);
    return component;
};

/**
 * CreateTableHeadHeaderElement,
 * 테이블의 엘리먼트 일부를(이동, 테이블 이름, 옵션보기, 위치 위로 이동) 생성하는 함수,
 * 테이블의 헤더를 설정하는 함수
 *
 * @param {Object} table 테이블에 관한 정보가 있는 오브젝트
 * @return {string} html code
 * */
const createTableHeadHeaderElement = (table) => {
    return `<th scope="col" class="_move">
              <img class="img-fluid"
                   src="../../../resources/assets/images/icon/bx_table_move.svg"/>
            </th>
            <th scope="col"
                colspan="6" class="_name">${table.name}
            </th>
            <th scope="col" class="_option">
              <img class="img-fluid"
                   src="../../../resources/assets/images/icon/table_options.svg"/>
            </th>
            <th scope="col" class="_sort __up">
              <img class="img-fluid"
                   src="../../../resources/assets/images/icon/table_sort_up.svg"/>
            </th>`;
};

/**
 * CreateTableHeadColumnsElement,
 * 테이블의 엘리먼트 일부를(삭제, PK, AI, Nullable, Column Name, Type, Comment, FK, 위치 아래로 이동) 생성하는 함수,
 * 테이블의 컬럼을 설정하는 함수
 *
 * @param {boolean} is_simple 간단 보기 옵션, default = false
 * @return {string} html code
 * */
const createTableHeadColumnsElement = (is_simple = false) => {
    return `<th scope="col" class="_create">
              <img class="img-fluid" src="../../../resources/assets/images/icon/table_row_create.svg"/>
            </th>
            <th scope="col" class="__pk" ${is_simple ? 'style="display: none;"' : void (0)}>PK
            </th>
            <th scope="col" class="__ai" ${is_simple ? 'style="display: none;"' : void (0)}>AI
            </th>
            <th scope="col" class="__nullable" ${is_simple ? 'style="display: none;"' : void (0)}>Null
            </th>
            <th scope="col" class="__name">Column Name
            </th>
            <th scope="col" class="__type" ${is_simple ? 'style="display: none;"' : void (0)}>Type
            </th>
            <th scope="col" class="__comment" ${is_simple ? 'style="display: none;"' : void (0)}>Comment
            </th>
            <th scope="col" class="__fk">FK
            </th>
            <th scope="col" class="_sort __down">
              <img class="img-fluid" src="../../../resources/assets/images/icon/table_sort_down.svg"/>
            </th>`;
};

/**
 * CreateTableRowElement,
 * 테이블의 행을 HTML로 생성하는 함수
 *
 * @requires [tableRowDeleteClickEventListener, createTableCheckboxElement, inputTableListChangeConnectable, inputChangeEventListener]
 * @param {Object} table 테이블에 관련된 정보
 * @param {number} index 테이블의 행들에 관한 인덱스
 * @param {boolean} is_simple 간단 보기 옵션, default = false
 * */
const createTableRowElement = (table, index, is_simple = false) => {
    const column = table.columns[index];
    return `<tr data-table-id="${table.id}"
                data-table-row="${column.id}"
                data-table-index="${index}">
              <th scope="row" onclick="tableRowDeleteClickEventListener(this);" class="_delete not-draggable">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_6_4459)">
                          <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M6.85575 6.8558C3.65198 10.0596 3.65198 15.2542 6.85575 18.4579C10.0595 21.6617 15.2541 21.6617 18.4579 18.4579C21.6616 15.2542 21.6616 10.0596 18.4579 6.8558C15.2541 3.65203 10.0595 3.65203 6.85575 6.8558ZM15.2937 14.239C15.4335 14.3788 15.5121 14.5685 15.5121 14.7663C15.5121 14.9641 15.4335 15.1538 15.2937 15.2937C15.1538 15.4336 14.9641 15.5121 14.7663 15.5122C14.5685 15.5122 14.3788 15.4336 14.2389 15.2937L12.6568 13.7116L11.0747 15.2937C10.9348 15.4336 10.7451 15.5121 10.5473 15.5121C10.3495 15.5121 10.1598 15.4336 10.02 15.2937C9.8801 15.1538 9.80152 14.9641 9.80152 14.7663C9.80152 14.5685 9.8801 14.3788 10.02 14.239L11.6021 12.6569L10.02 11.0748C9.8801 10.9349 9.80152 10.7452 9.80152 10.5474C9.80152 10.3496 9.8801 10.1599 10.02 10.02C10.1598 9.88015 10.3495 9.80157 10.5473 9.80157C10.7451 9.80157 10.9348 9.88015 11.0747 10.02L12.6568 11.6021L14.2389 10.02C14.3788 9.88015 14.5685 9.80157 14.7663 9.80157C14.9641 9.80157 15.1538 9.88015 15.2937 10.02C15.4335 10.1599 15.5121 10.3496 15.5121 10.5474C15.5121 10.7452 15.4335 10.9349 15.2937 11.0748L13.7115 12.6569L15.2937 14.239Z"
                                fill="#CCCCCC"/>
                      </g>
                      <defs>
                          <clipPath id="clip0_6_4459">
                              <rect width="17.8995" height="17.8995" fill="white" transform="translate(0 12.6569) rotate(-45)"/>
                          </clipPath>
                      </defs>
                  </svg>
              </th>
              <td class="_pk not-draggable ${column.pk === true ? 'is-checked' : ''}" ${is_simple ? 'style="display: none;"' : ''}>${column.pk === true ? createTableCheckboxElement() : createTableCheckboxElement()}</td>
              <td class="_ai not-draggable ${column.auto_increment === true ? 'is-checked' : ''}" ${is_simple ? 'style="display: none;"' : ''}>${column.auto_increment === true ? createTableCheckboxElement() : createTableCheckboxElement()}</td>
              <td class="_null not-draggable ${column.nullable === true ? 'is-checked' : ''}" ${is_simple ? 'style="display: none;"' : ''}>${column.nullable === true ? createTableCheckboxElement() : createTableCheckboxElement()}</td>
              <td class="_column-name not-draggable">
                  <input oninput="inputTableListChangeConnectable(this)" type="text" maxlength="32" name="${table.id}__${table.name}__name" value="${column.name}"/>
              </td>
              <td class="_type not-draggable" ${is_simple ? 'style="display: none;"' : ''}>
                <div class="autocomplete">
                  <input oninput="inputChangeEventListener(this)" type="text" class="__autocomplete"
                         name="${table.id}__${table.name}__type"
                         data-type="type"
                         value="${column.type}${column.size !== null && column.size !== undefined ? ('(' + column.size + ')') : ''}"
                         placeholder="Write your type">
                </div>
              </td>
              <td class="_comment not-draggable" ${is_simple ? 'style="display: none;"' : ''}>
                  <input oninput="inputChangeEventListener(this)" type="text" name="${table.id}__${table.name}__comment" data-type="comment" value="${column.comment === null ? '' : column.comment}"/>
              </td>
              <td class="_fk fk-draggable" data-status="open">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.9997 7.33337H8.66634V4.00004H10.6663L7.99967 1.33337L5.33301 4.00004H7.33301V7.33337H3.99967V5.33337L1.33301 8.00004L3.99967 10.6667V8.66671H7.33301V12H5.33301L7.99967 14.6667L10.6663 12H8.66634V8.66671H11.9997V10.6667L14.6663 8.00004L11.9997 5.33337V7.33337Z"
                            fill="#CCCCCC"/>
                  </svg>
              </td>
              <td class="_sort not-draggable">
                ${createTableCheckboxElement()}
              </td>
            </tr>`;
};

/**
 * CreateTableRowElementDynamic,
 * 테이블의 행을 HTML로 생성하는 함수,
 * 동적으로 행을 생성할때 사용하는 함수
 *
 * @requires [tableRowDeleteClickEventListener, inputTableListChangeConnectable, inputChangeEventListener, createTableCheckboxElement]
 *
 * @param {string} table_id 테이블의 고유 아이디
 * @param {string} table_name 테이블의 이름
 * @param {string} column_id 행의 고유 아이디
 * @param {boolean} column_pk 행의 PK 여부
 * @param {boolean} column_auto_increment 행의 Auto Increment 여부
 * @param {boolean} column_nullable 행의 Null 여부
 * @param {string} column_type 행의 타입 여부
 * @param {string} column_comment 행의 코멘트
 * @param {string} column_name 행의 이름
 * @param {number} index 테이블에 행에 관련된 인덱스
 * @return {string} html code
 * */
const createTableRowElementDynamic = ({table_id, table_name}, {
    column_id, column_pk, column_auto_increment, column_nullable, column_type, column_comment, column_name,
}, index) => {
    return `<tr data-table-id="${table_id}"
                data-table-row="${column_id}"
                data-table-index="${index}">
              <th scope="row" onclick="tableRowDeleteClickEventListener(this);" class="_delete not-draggable">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_6_4459)">
                          <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M6.85575 6.8558C3.65198 10.0596 3.65198 15.2542 6.85575 18.4579C10.0595 21.6617 15.2541 21.6617 18.4579 18.4579C21.6616 15.2542 21.6616 10.0596 18.4579 6.8558C15.2541 3.65203 10.0595 3.65203 6.85575 6.8558ZM15.2937 14.239C15.4335 14.3788 15.5121 14.5685 15.5121 14.7663C15.5121 14.9641 15.4335 15.1538 15.2937 15.2937C15.1538 15.4336 14.9641 15.5121 14.7663 15.5122C14.5685 15.5122 14.3788 15.4336 14.2389 15.2937L12.6568 13.7116L11.0747 15.2937C10.9348 15.4336 10.7451 15.5121 10.5473 15.5121C10.3495 15.5121 10.1598 15.4336 10.02 15.2937C9.8801 15.1538 9.80152 14.9641 9.80152 14.7663C9.80152 14.5685 9.8801 14.3788 10.02 14.239L11.6021 12.6569L10.02 11.0748C9.8801 10.9349 9.80152 10.7452 9.80152 10.5474C9.80152 10.3496 9.8801 10.1599 10.02 10.02C10.1598 9.88015 10.3495 9.80157 10.5473 9.80157C10.7451 9.80157 10.9348 9.88015 11.0747 10.02L12.6568 11.6021L14.2389 10.02C14.3788 9.88015 14.5685 9.80157 14.7663 9.80157C14.9641 9.80157 15.1538 9.88015 15.2937 10.02C15.4335 10.1599 15.5121 10.3496 15.5121 10.5474C15.5121 10.7452 15.4335 10.9349 15.2937 11.0748L13.7115 12.6569L15.2937 14.239Z"
                                fill="#CCCCCC"/>
                      </g>
                      <defs>
                          <clipPath id="clip0_6_4459">
                              <rect width="17.8995" height="17.8995" fill="white" transform="translate(0 12.6569) rotate(-45)"/>
                          </clipPath>
                      </defs>
                  </svg>
              </th>
              <td class="_pk not-draggable ${column_pk === true ? 'is-checked' : ''}">${column_pk === true ? createTableCheckboxElement() : createTableCheckboxElement()}</td>
              <td class="_ai not-draggable ${column_auto_increment === true ? 'is-checked' : ''}">${column_auto_increment === true ? createTableCheckboxElement() : createTableCheckboxElement()}</td>
              <td class="_null not-draggable ${column_nullable === true ? 'is-checked' : ''}">${column_nullable === true ? createTableCheckboxElement() : createTableCheckboxElement()}</td>
              <td class="_column-name not-draggable">
                  <input oninput="inputTableListChangeConnectable(this)" type="text" name="${table_id}__${table_name}__name" value="${column_name}"/>
              </td>
              <td class="_type not-draggable">
                <div class="autocomplete">
                  <input oninput="inputChangeEventListener(this)" type="text"
                         name="${table_id}__${table_name}__type"
                         data-type="type"
                         value="${column_type}"
                         class="__autocomplete"
                         placeholder="Write your type">
                </div>
              </td>
              <td class="_comment not-draggable">
                  <input oninput="inputChangeEventListener(this)" type="text" name="${table_id}__${table_name}__comment" data-type="comment" value="${column_comment}"/>
              </td>
              <td class="_fk fk-draggable" data-status="open">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.9997 7.33337H8.66634V4.00004H10.6663L7.99967 1.33337L5.33301 4.00004H7.33301V7.33337H3.99967V5.33337L1.33301 8.00004L3.99967 10.6667V8.66671H7.33301V12H5.33301L7.99967 14.6667L10.6663 12H8.66634V8.66671H11.9997V10.6667L14.6663 8.00004L11.9997 5.33337V7.33337Z"
                            fill="#CCCCCC"/>
                  </svg>              
              </td>
              <td class="_sort not-draggable">
                ${createTableCheckboxElement()}
              </td>
            </tr>`;
};

/**
 * CreateTableCheckboxElement,
 * 테이블의 엘리먼트 일부를(체크박스) 생성하는 함수
 *
 * @param {string} color 색상 코드 또는 텍스트 (#969696, white, etc...), default = undefined
 * @return {HTMLElement} html code
 * */
const createTableCheckboxElement = (color = undefined) => {
    let checkbox;
    if (color != null && color !== undefined) {
        checkbox = `<svg width="14"
                         height="12"
                         viewBox="0 0 14 12"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6L5.5 10.5L13 1.5"
                            stroke="${color}"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"/>
                    </svg>`;
    } else {
        checkbox = `<svg width="14"
                         height="12"
                         viewBox="0 0 14 12"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6L5.5 10.5L13 1.5"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"/>
                    </svg>`;
    }
    return checkbox;
};

/**
 * InitializeTableRowSelect,
 * 테이블의 행에 대한 선택 이벤트 등록하는 함수
 *
 * @requires [tableRowTouchStartEventListener, tableRowTouchEndEventListener, tableRowSelectEventListener, tableRowContextMenuEventListener]
 * @param {NodeList | Element[]} table_rows 이벤트가 등록될 테이블의 행들
 * */
const initializeTableRowSelect = (table_rows) => {
    table_rows.forEach(function (table_row) {
        table_row.addEventListener('mousedown', tableRowTouchStartEventListener);
        table_row.addEventListener('mouseup', tableRowTouchEndEventListener);
        table_row.addEventListener('click', tableRowSelectEventListener);
        table_row.addEventListener('contextmenu', tableRowContextMenuEventListener);
    });
};

/**
 * InitializeTableRowDrag,
 * 테이블의 행에 대한 드래그 이벤트 등록하는 함수
 *
 * @requires [updateLine, effectHighlightCallback]
 * @param {NodeList | Element[]} table_rows
 * */
const initializeTableRowDrag = (table_rows) => {
    // Drag Row Event Listener로 대체 요구
    $(table_rows).draggable({
        opacity: 0.6, helper: 'clone', cancel: '.not-draggable', start: function (e, ui) {
            let lines = findLineRowByTo(leader_lines, $(this));
            if (lines.length === 0) {
                ui.position.left = 0;
                ui.position.top = 0;
                ui.helper.addClass('is-selected');
                return true;
            } else {
                alert('이미 참조되어 있는 컬럼입니다.');
                return false;
            }
        }, drag: function (e, ui) {
            const scale = parseFloat(document.querySelector('._right-option._scale-up').dataset.scale);
            // console.log('drag', e, ui);
            const changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
            const newLeft = ui.originalPosition.left + changeLeft / scale; // adjust new left by our zoomScale

            const changeTop = ui.position.top - ui.originalPosition.top; // find change in top
            const newTop = ui.originalPosition.top + changeTop / scale; // adjust new top by our zoomScale

            ui.position.left = newLeft;
            ui.position.top = newTop;
        }, stop: function (e, ui) {
        },
    });
    $(table_rows).droppable({
        drop: function (event, ui) {
            /**
             * Type 일치
             * PK 여부 확인
             * */
            const dropped_item = this;
            const dragged_item = ui.draggable;

            // Drop 로직
            // Row끼리 서로 연결
            // DB에서 PK, FK 연결
            // dragged_item : PK
            // dropped_item : FK
            //
            // 서로 Line 연결
            // Dragged_item(PK) -> Dropped_item(FK)로 연결
            //
            // 이후 .is-selected 제거
            const to_row = dragged_item[0];
            const from_row = dropped_item;
            let to_row_object = findTableRowById(to_row.dataset.tableId, to_row.dataset.tableRow);
            let from_row_object = findTableRowById(from_row.dataset.tableId, from_row.dataset.tableRow);
            let from_lines = findLineRowByTo(leader_lines, $(from_row));
            let check = false;
            from_lines.forEach(function (line) {
                if (line.info_line.from_row === to_row_object.id && line.info_line.to_row === from_row_object.id) {
                    check = true;
                }
            });
            if (check) {
                if (this.classList.contains('is-selected')) {
                    this.classList.remove('is-selected');
                }
                alert('순환참조는 불가능 합니다.');
            } else if (from_row_object.pk !== true) {
                if (this.classList.contains('is-selected')) {
                    this.classList.remove('is-selected');
                }
                alert('연결 대상 컬럼이 Primary Key여야만 합니다.');
            } else if (!to_row_object.type.toUpperCase().includes(from_row_object.type.toUpperCase())) {
                if (this.classList.contains('is-selected')) {
                    this.classList.remove('is-selected');
                }
                alert('연결하려는 컬럼의 타입이 동일해야합니다.');
            } else {
                const options = {
                    path: 'fluid', color: '#969696', dash: {len: 5, gap: 2},
                };
                const info_line = {
                    to: `${dragged_item[0].dataset.tableId}`,
                    to_row: `${dragged_item[0].dataset.tableRow}`,
                    from: `${dropped_item.dataset.tableId}`,
                    from_row: `${dropped_item.dataset.tableRow}`,
                };
                const leader_line_obj = createLine(leader_lines, to_row, from_row, options, info_line);
                if (dragged_item[0].classList.contains('is-selected')) {
                    dragged_item[0].classList.remove('is-selected');
                }
                if (dropped_item.classList.contains('is-selected')) {
                    dropped_item.classList.remove('is-selected');
                }

                updateLine(leader_line_obj);

                $(dropped_item).effect('highlight', {}, 500, effectHighlightCallback);

                const button_fk = to_row.querySelector(`._fk[data-status="open"]`);
                if (button_fk !== undefined && button_fk !== null) {
                    button_fk.setAttribute('data-status', 'close');
                    button_fk.innerHTML = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <g clip-path="url(#clip0_6_4459)">
                                           <path fill-rule="evenodd" clip-rule="evenodd" d="M6.85575 6.8558C3.65198 10.0596 3.65198 15.2542 6.85575 18.4579C10.0595 21.6617 15.2541 21.6617 18.4579 18.4579C21.6616 15.2542 21.6616 10.0596 18.4579 6.8558C15.2541 3.65203 10.0595 3.65203 6.85575 6.8558ZM15.2937 14.239C15.4335 14.3788 15.5121 14.5685 15.5121 14.7663C15.5121 14.9641 15.4335 15.1538 15.2937 15.2937C15.1538 15.4336 14.9641 15.5121 14.7663 15.5122C14.5685 15.5122 14.3788 15.4336 14.2389 15.2937L12.6568 13.7116L11.0747 15.2937C10.9348 15.4336 10.7451 15.5121 10.5473 15.5121C10.3495 15.5121 10.1598 15.4336 10.02 15.2937C9.8801 15.1538 9.80152 14.9641 9.80152 14.7663C9.80152 14.5685 9.8801 14.3788 10.02 14.239L11.6021 12.6569L10.02 11.0748C9.8801 10.9349 9.80152 10.7452 9.80152 10.5474C9.80152 10.3496 9.8801 10.1599 10.02 10.02C10.1598 9.88015 10.3495 9.80157 10.5473 9.80157C10.7451 9.80157 10.9348 9.88015 11.0747 10.02L12.6568 11.6021L14.2389 10.02C14.3788 9.88015 14.5685 9.80157 14.7663 9.80157C14.9641 9.80157 15.1538 9.88015 15.2937 10.02C15.4335 10.1599 15.5121 10.3496 15.5121 10.5474C15.5121 10.7452 15.4335 10.9349 15.2937 11.0748L13.7115 12.6569L15.2937 14.239Z" fill="#F08705"></path>
                                       </g>
                                       <defs>
                                           <clipPath id="clip0_6_4459">
                                               <rect width="17.8995" height="17.8995" fill="white" transform="translate(0 12.6569) rotate(-45)"></rect>
                                           </clipPath>
                                       </defs>
                                   </svg>`;
                }
            }
        }, over: function () {
            if (!this.classList.contains('is-selected')) {
                this.classList.add('is-selected');
            }
        }, out: function () {
            if (this.classList.contains('is-selected')) {
                this.classList.remove('is-selected');
            }
        },
    });
};

/**
 * EffectHighlightCallback,
 * 테이블의 행을 드래그 & 드랍 했을때에 이벤트 콜백함수
 * */
function effectHighlightCallback() {
    const target = this;
    setTimeout(function () {
        $(target).removeAttr('style').hide().fadeIn();
    }, 1000);
}

/**
 * TableRowTouchStartEventListener,
 * 테이블의 행에 대한 터치 시작 이벤트 리스너,
 * 컨트롤키 입력시 제외
 *
 * @param {TouchEvent} event
 * */
function tableRowTouchStartEventListener(event) {
    status.touchStart = true;
    event.preventDefault();
    event.stopPropagation();
}

/**
 * TableRowTouchEndEventListener,
 * 테이블의 행에 대한 터치 끝에 이벤트 리스너,
 * 컨트롤키 입력시 제외
 *
 * @param {TouchEvent} event
 * */
function tableRowTouchEndEventListener(event) {
    status.touchStart = false;
    status.touchEnd = true;
}

/**
 * TableRowSelectEventListener,
 * 테이블의 행에 대한 클릭 이벤트 리스너,
 * 컨트롤키 입력시 제외,
 * 마우스 왼쪽 클릭시 누르고 포인트 이동해서 땐경우 타겟이 제대로 안잡히는 버그 존재
 *
 * @requires [focusInputLastCarret, deleteLineRowByTo, findLine, findTableRowById]
 * @param {MouseEvent} event
 * */
function tableRowSelectEventListener(event) {
    if (status.touchEnd || status.touchStart) {
        const target = this;
        const event_target = event.target;
        if (event_target.closest('._fk')?.classList.contains('_fk')) {
            if (event_target.closest(`._fk[data-status="close"]`)?.classList.contains('_fk')) {
                const button_fk = event_target.closest(`._fk[data-status="close"]`);
                if (button_fk !== undefined && button_fk !== null) {
                    const target_row = button_fk.closest('[data-table-id][data-table-row]');
                    deleteLineRowByTo($(target_row));
                    button_fk.setAttribute('data-status', 'open');
                    button_fk.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                           <path d="M11.9997 7.33337H8.66634V4.00004H10.6663L7.99967 1.33337L5.33301 4.00004H7.33301V7.33337H3.99967V5.33337L1.33301 8.00004L3.99967 10.6667V8.66671H7.33301V12H5.33301L7.99967 14.6667L10.6663 12H8.66634V8.66671H11.9997V10.6667L14.6663 8.00004L11.9997 5.33337V7.33337Z"
                                                 fill="#CCCCCC"/>
                                       </svg>`;
                }
            } else {
                if (target.classList.contains('is-selected')) {
                    target.classList.remove('is-selected');

                    // TODO Change Line Origin Color
                    const find_leader_lines = findLine(leader_lines, $(target));
                    find_leader_lines.forEach(function (line) {
                        if (line.info_line.to_row === target.dataset.tableRow) {
                            line.leader_line.color = '#969696';
                        }
                    });
                } else {
                    const selected_rows = $('.component table._table > tbody > tr.is-selected');
                    selected_rows.each(function (index, selected_row) {
                        selected_row.classList.remove('is-selected');
                        // TODO Change Line Origin Color
                        const find_leader_lines = findLine(leader_lines, $(selected_row));
                        find_leader_lines.forEach(function (line) {
                            line.leader_line.color = '#969696';
                        });
                    });
                    target.classList.add('is-selected');

                    // TODO Change Line Color
                    const find_leader_lines = findLine(leader_lines, $(target));
                    find_leader_lines.forEach(function (line) {
                        if (line.info_line.to_row === target.dataset.tableRow) {
                            line.leader_line.color = '#F08705';
                        }
                    });
                }
            }
        } else {
            // input
            const write_target = event_target.closest('.not-draggable');
            const table_row_element = write_target.closest('[data-table-id][data-table-row]');
            const table_row = findTableRowById(table_row_element.dataset.tableId, table_row_element.dataset.tableRow);
            // TODO Bugfix ncaught TypeError: Cannot read properties of null (reading 'classList')
            write_target.classList.forEach(function (class_name) {
                switch (class_name) {
                    case '_delete':
                        // delete(button click event)
                        // overriding onclick event
                        break;
                    case '_pk':
                        // _pk setting(checkbox)
                        if (table_row.pk === false && table_row.nullable === true) {
                            alert('해당 컬럼에 Primary Key를 설정하시려면 Null을 해제해주세요.');
                            break;
                        } else {
                            if (write_target.classList.contains('is-checked')) {
                                write_target.classList.remove('is-checked');
                                table_row.column_pk = false;
                            } else {
                                write_target.classList.add('is-checked');
                                table_row.column_pk = true;
                            }
                            table_row.pk = table_row.column_pk;
                            apiUpdateTableRow(getURLParamByPrevAndNext('database', 'detail'), table_row_element.dataset.tableId, table_row, () => {
                            }, () => {
                            });
                            break;
                        }
                    case '_ai':
                        // auto increment setting(checkbox)
                        if (write_target.classList.contains('is-checked')) {
                            write_target.classList.remove('is-checked');
                            table_row.column_auto_increment = false;
                        } else {
                            write_target.classList.add('is-checked');
                            table_row.column_auto_increment = true;
                        }
                        table_row.auto_increment = table_row.column_auto_increment;
                        apiUpdateTableRow(getURLParamByPrevAndNext('database', 'detail'), table_row_element.dataset.tableId, table_row, () => {
                        }, () => {
                        });
                        break;
                    case '_null':
                        // nullable setting(checkbox)
                        if (table_row.pk === true && table_row.nullable === false) {
                            alert('해당 컬럼에 Null을 설정하시려면 Primary Key를 해제해주세요.');
                            break;
                        } else {
                            if (write_target.classList.contains('is-checked')) {
                                write_target.classList.remove('is-checked');
                                table_row.column_nullable = false;
                            } else {
                                write_target.classList.add('is-checked');
                                table_row.column_nullable = true;
                            }
                            table_row.nullable = table_row.column_nullable;
                            apiUpdateTableRow(getURLParamByPrevAndNext('database', 'detail'), table_row_element.dataset.tableId, table_row, () => {
                            }, () => {
                            });
                            break;
                        }
                    case '_column-name':
                        // column name setting
                        focusInputLastCarret({id: undefined, selector: 'input', root: write_target});
                        break;
                    case '_type':
                        // type setting(select or dropdown)
                        focusInputLastCarret({id: undefined, selector: 'input', root: write_target});
                        break;
                    case '_comment':
                        // comment setting
                        focusInputLastCarret({id: undefined, selector: 'input', root: write_target});
                        break;
                    case '_sort':
                        // Sort Up and Down
                        if (write_target.classList.contains('is-checked')) {
                            write_target.classList.remove('is-checked');
                        } else {
                            write_target.classList.add('is-checked');
                        }
                        break;
                    default:
                        // default
                        break;
                }
            });
        }
    }
    status.touchEnd = false;
    status.touchStart = false;
}

/**
 * TableRowContextMenuInitialize,
 * 오른쪽 클릭의 대한 클릭 이벤트 초기화 함수
 *
 * @deprecated
 * @requires [tableRowDelete, contextClose]
 * */
const tableRowContextMenuInitialize = () => {
    const context_menu = $('#context-menu');
    if (context_menu.length !== 0) {
        context_menu.on('click', 'li', function (e) {
            const right_selected_row = $('.table-container table._table > tbody > tr.right-selected');
            const option_element = this;
            if (option_element.classList.contains('_delete')) {
                tableRowDelete(draggable_tables, right_selected_row);
                contextClose(right_selected_row[0], context_menu[0]);
            } else if (option_element.classList.contains('_view')) {

            } else {

            }
        });
    }
};

/**
 * TableRowDelete,
 * 테이블의 행을 삭제하는 함수
 *
 * @requires [deleteLine, findTableById, updateLines, deleteTableListRowConnectable]
 * @param {Object[]} draggable_tables 전역 테이블들
 * @param {jQuery} table_row 삭제할 테이블의 행 엘리먼트
 * */
const tableRowDelete = (draggable_tables, $table_row) => {
    const table_id = $table_row.data('tableId');
    const table_row_id = $table_row.data('tableRow');
    // 연결된 라인 해제
    let deleted_lines = deleteLine($table_row);
    // 연결된 라인 해제
    const table = findTableById(draggable_tables, table_id);
    table.columns = table.columns.filter(function (column) {
        if (column.id === table_row_id) {
            return false;
        }
        return true;
    });
    $table_row.remove();
    updateLines(leader_lines);

    // okiwi-query-left.js
    deleteTableListRowConnectable(table_id, table_row_id);
    // api.js
    if (deleted_lines.length !== 0) {
        apiDisconnectLine(getURLParamByPrevAndNext('database', 'detail'), deleted_lines, () => {
        }, () => {
        });
    }
    apiDeleteTableRow(getURLParamByPrevAndNext('database', 'detail'), table_id, table_row_id, () => {
    }, () => {
    });
};

/**
 * TableDeleteClickEventListener,
 * 테이블 삭제 버튼 클릭 이벤트 리스너
 *
 * @requires [deleteTable]
 * @param {MouseEvent} e
 * */
function tableDeleteClickEventListener(e) {
    const table = this.closest('.component');
    deleteTable(table);
}

/**
 * DeleteTable,
 * 테이블을 삭제하는 함수
 *
 * @requires [deleteLine]
 * @param {HTMLElement} table 삭제할 테이블 엘리먼트
 * */
const deleteTable = (table) => {
    const table_id = table.id;
    const $table = $(table);
    const table_rows = $table.find('table._table > tbody > tr');
    let deleted_lines = new Array();
    table_rows.each(function (index, table_row) {
        if (index === 0) {
            deleted_lines = deleteLine($(table_row));
        } else {
            deleted_lines.addAll(deleteLine($(table_row)));
        }
    });
    draggable_tables = draggable_tables.filter(function (table) {
        return table.id === table_id ? false : true;
    });
    $table.remove();
    // okiwi-query-left.js
    deleteTableList(table_id);
    // api.js
    if (deleted_lines.length !== 0) {
        apiDisconnectLine(getURLParamByPrevAndNext('database', 'detail'), deleted_lines, () => {
        }, () => {
        });
    }
    apiDeleteTable(getURLParamByPrevAndNext('database', 'detail'), table_id, () => {
    }, () => {
    });
};

/**
 * Table Option Click EventListener,
 * 테이블의 옵션버튼을 클릭헀을 때의 실행 함수
 *
 * @requires [getTransformStyle]
 * @param {MouseEvent} e
 * */
function tableOptionClickEventListener(e) {
    const scale = parseFloat(document.querySelector('._right-option._scale-up').dataset.scale);
    const options = document.getElementById('table-option-list');
    const table = this.closest('.component');
    const draggable = findTableById(draggable_tables, table.id);
    options.setAttribute('data-table-id', table.id);
    console.log(draggable.draggable_table);
    options.style.left = draggable.position.left + ($(table).outerWidth() * scale) + 'px';
    options.style.top = draggable.position.top + 'px';
    if (options.style.display.length === 4) {
        $(options).show();
    } else {
        $(options).hide();
    }
}

/**
 * TableMouseHoverEventListener,
 * 테이블에 마우스를 올렸을때 발동하는 함수,
 * zIndex를 업데이트 시켜주는 이벤트 리스너
 *
 * @requires [getMaxZIndex]
 * @param {MouseEvent} e
 * */
function tableMouseHoverEventListener(e) {
    const container = document.querySelector('.table-container');
    const tables = container.querySelectorAll('.component');

    const target_table = this;

    const max_zIndex = getMaxZIndex(tables) - 1;
    const current_zIndex = target_table.style.zIndex * 1;
    if (max_zIndex < 6000 && (max_zIndex !== current_zIndex)) {
        target_table.style.zIndex = (max_zIndex + 1);
    }
}

/**
 * DeleteLine,
 * 연결선을 삭제하는 함수
 *
 * @requires [findLine]
 * @param {jQuery} $table_row 연결선을 삭제할 테이블 행 엘리먼트
 * */
const deleteLine = ($table_row) => {
    const leader_line_objects = findLine(leader_lines, $table_row);
    let deleted_lines = new Array();
    leader_line_objects.forEach(function (line) {
        $(`.table-container .leader-line[data-line-id="${line.leader_line._id}"]`).remove();
        leader_lines = leader_lines.filter(function (leader_line) {
            if (line.leader_line._id === leader_line.leader_line._id) {
                deleted_lines.push(line.info_line);
                return false;
            } else {
                return true;
            }
        });
    });
    return deleted_lines;
};

/**
 * DeleteLineRowByTo,
 * 특정 행에서 참조하는 PK 관계가 있는 연결선을 삭제하는 함수,
 *
 * @requires [findLineRowByTo]
 * @param {jQuery} $table_row 연결선을 삭제할 테이블 행 엘리먼트
 * */
const deleteLineRowByTo = ($table_row) => {
    const leader_line_objects = findLineRowByTo(leader_lines, $table_row);
    let deleting_lines = new Array();
    leader_line_objects.forEach(function (line) {
        $(`.table-container .leader-line[data-line-id="${line.leader_line._id}"]`).remove();
        leader_lines = leader_lines.filter(function (leader_line) {
            if (line.leader_line._id === leader_line.leader_line._id) {
                deleting_lines.push(leader_line.info_line);
                return false;
            } else {
                return true;
            }
        });
    });
    // api.js
    if (deleting_lines.length !== 0) {
        apiDisconnectLine(getURLParamByPrevAndNext('database', 'detail'), deleting_lines, () => {
        }, () => {
        });
    }
};

/**
 * FindLine,
 * 테이블 행과 연결된 라인을 찾아주는 함수
 *
 * @param {Object[]} leader_lines 전역 라인 목록 리스트
 * @param {jQuery} $table_row 테이블의 행
 * @return {Object[]} leader_line_objects 추출한 라인 목록 리스트
 * */
const findLine = (leader_lines, $table_row) => {
    const table_id = $table_row.data('tableId');
    const table_row_id = $table_row.data('tableRow').toString();
    const leader_line_objects = leader_lines.filter(function (line_object) {
        if (table_id === line_object.info_line.to) {
            if (table_row_id === line_object.info_line.to_row) {
                return true;
            }
        }
        if (table_id === line_object.info_line.from) {
            if (table_row_id === line_object.info_line.from_row) {
                return true;
            }
        }
    });
    return leader_line_objects;
};

/**
 * FindLineRowByTo,
 * 테이블 행에서 참조하는 PK 관계가 있는 연결된 라인을 찾아주는 함수
 *
 * @param {Object[]} leader_lines 전역 라인 목록 리스트
 * @param {jQuery} $table_row 테이블의 행
 * @return {Object[]} leader_line_objects 추출한 라인 목록 리스트
 * */
const findLineRowByTo = (leader_lines, $table_row) => {
    const table_id = $table_row.data('tableId');
    const table_row_id = $table_row.data('tableRow').toString();
    const leader_line_objects = leader_lines.filter(function (line_object) {
        if (table_id === line_object.info_line.to) {
            if (table_row_id === line_object.info_line.to_row) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    });
    return leader_line_objects;
};

/**
 * TableRowContextMenuEventListener,
 * 테이블 행 오른쪽 클릭시 이벤트 리스너
 *
 * @require contextOpen
 * @deprecated
 * @param {MouseEvent} event 오른쪽 클릭시 이벤트 오브젝트
 * */
function tableRowContextMenuEventListener(event) {
    event.preventDefault();
    contextOpen(this, document.getElementById('context-menu'), event);
}

/**
 * ContextOpen,
 * 테이블 행 오른쪽 클릭시 나타나는 컨텍스트 메뉴 보여주는 함수
 *
 * @require lineListViewInitialize
 * @deprecated
 * @param {HTMLElement} row_element 테이블 행 엘리먼트
 * @param {HTMLElement} ctx_menu 컨텍스트 메뉴
 * @param {MouseEvent} event tableRowContextMenuEventListener에서 위임된 이벤트 오브젝트
 * */
const contextOpen = (row_element, ctx_menu, event) => {
    lineListViewInitialize(row_element, ctx_menu);
    ctx_menu.style.display = 'block';
    ctx_menu.style.top = event.pageY + 'px';
    ctx_menu.style.left = event.pageX + 'px';
    row_element.classList.add('right-selected');
};

/**
 * LineListViewInitialize,
 * 테이블 행에 연결된 라인 목록 초기화 및 재설정하는 함수
 *
 * @requires [findLine, deleteChild, createConnectedLineHeaderElement, createConnectedLineElement]
 * @deprecated
 * @param {HTMLElement} row_element 테이블 행 엘리먼트
 * @param {HTMLElement} ctx_menu 컨텍스트 메뉴
 * */
const lineListViewInitialize = (row_element, ctx_menu) => {
    const lines = findLine(leader_lines, $(row_element));
    const dropdown = ctx_menu.querySelector('._view').querySelector('.dropdown-menu');

    deleteChild(dropdown);

    const actives = new Array();
    const passives = new Array();

    lines.forEach(function (line) {
        if (line.info_line.to === row_element.dataset.tableId) {
            if (line.info_line.to_row === row_element.dataset.tableRow.toString()) {
                actives.push(line);
            }
        }
        if (line.info_line.from === row_element.dataset.tableId) {
            if (line.info_line.from_row === row_element.dataset.tableRow.toString()) {
                passives.push(line);
            }
        }
    });

    $(dropdown).append(createConnectedLineHeaderElement('연결된 라인'));
    actives.forEach(function (active_line) {
        $(dropdown).append(createConnectedLineElement(active_line));
    });
    $(dropdown).append(createConnectedLineHeaderElement('연결 받은 라인'));
    passives.forEach(function (passive_line) {
        $(dropdown).append(createConnectedLineElement(passive_line));
    });
};

/**
 * CreateConnectedLineHeaderElement,
 * 테이블 행에 연결된 라인 목록의 헤더 엘리먼트를 생성하는 함수
 *
 * @param {string} text 헤더에 들어갈 텍스트
 * */
const createConnectedLineHeaderElement = (text) => {
    return `<h6 class="dropdown-header">${text}</h6>`;
};

/**
 * CreateConnectedLineElement,
 * 테이블 행에 연결된 라인 목록의 목록 하나의 엘리먼트를 생성하는 함수
 *
 * @param {Object} line 라인 오브젝트
 * */
const createConnectedLineElement = (line) => {
    return `<a class="dropdown-item"
               href="javascript:void(0);">${line.info_line.to} : ${line.info_line.to_row} -> ${line.info_line.from} : ${line.info_line.from_row}</a>`;
};

/**
 * ContextClose,
 * 테이블 행 오른쪽 클릭시 나타나는 컨텍스트 메뉴 닫기
 *
 * @deprecated
 * @param {HTMLElement} row_element 오른쪽 클릭한 테이블 행 엘리먼트
 * @param {HTMLElement} ctx_menu 컨텍스트 메뉴
 * */
const contextClose = (row_element, ctx_menu) => {
    row_element.classList.remove('right-selected');
    ctx_menu.style.display = 'none';
    ctx_menu.style.top = '0px';
    ctx_menu.style.left = '0px';
};

/**
 * TableRowDownEventListener,
 * 테이블의 행을 아래로 내리는 클릭 이벤트 리스너
 * @requires [updateLines]
 * @param {MouseEvent} event
 * */
function tableRowDownEventListener(event) {
    const component = this.closest('.component');
    const table_rows = component.querySelectorAll('table._table > tbody > tr');
    let selected_table_rows = component.querySelectorAll('table._table > tbody > tr > td._sort.is-checked');
    if (selected_table_rows.length !== 0) {
        selected_table_rows = [...selected_table_rows];
        selected_table_rows.reverse().forEach(function (selected_table_row) {
            selected_table_row = selected_table_row.closest('[data-table-id][data-table-row]');
            const nextSibling = $(selected_table_row).next();
            if (nextSibling.length > 0 && nextSibling.find('td._sort.is-checked').length === 0) {
                $(selected_table_row).insertAfter(nextSibling);
            }
        });
        updateLines(leader_lines);
        const table_rows = component.querySelectorAll('table._table > tbody > tr');
        // api.js
        let table_row_objs = new Array();
        table_rows.forEach(function (table_row_element, index) {
            table_row_objs.push({
                id: table_row_element.dataset.tableRow,
                order: index + 1
            });
        });
        apiUpdateTableRowsOrder(getURLParamByPrevAndNext('database', 'detail'), component.id, table_row_objs, () => {
        }, () => {
        });
    }
}

/**
 * TableRowUpEventListener
 * 테이블의 행을 올리는 클릭 이벤트 리스너
 * @requires [updateLines]
 * @param {MouseEvent} event
 * */
function tableRowUpEventListener(event) {
    const component = this.closest('.component');
    let selected_table_rows = component.querySelectorAll('table._table > tbody > tr > td._sort.is-checked');
    if (selected_table_rows.length !== 0) {
        selected_table_rows = [...selected_table_rows];
        selected_table_rows.forEach(function (selected_table_row) {
            selected_table_row = selected_table_row.closest('[data-table-id][data-table-row]');
            const prevSibling = $(selected_table_row).prev();
            if (prevSibling.length > 0 && prevSibling.find('td._sort.is-checked').length === 0) {
                $(selected_table_row).insertBefore(prevSibling);
            }
        });
        updateLines(leader_lines);
        const table_rows = component.querySelectorAll('table._table > tbody > tr');
        // api.js
        let table_row_objs = new Array();
        table_rows.forEach(function (table_row_element, index) {
            table_row_objs.push({
                id: table_row_element.dataset.tableRow,
                order: index + 1
            });
        });
        apiUpdateTableRowsOrder(getURLParamByPrevAndNext('database', 'detail'), component.id, table_row_objs, () => {
        }, () => {
        });
    }
}

/**
 * TableRowCreateEventListener,
 * 테이블의 행을 생성하는 클릭 이벤트 리스너
 * @requires [createTableRow]
 * @param {MouseEvent} event
 * */
function tableRowCreateEventListener(event) {
    const component = this.closest('.component');
    const table_rows = component.querySelectorAll('table._table > tbody > tr');
    const type = document.querySelector('#right-sidebar ._right-menu ._side-button-container ._side-simple').dataset.type;
    createTableRow(component, table_rows, undefined, type);
}


/**
 * CreateTableRow,
 * 테이블의 행을 생성하는 함수
 *
 * @requires [findTableById, createTableRowElementDynamic, initializeTableRowSelect, initializeTableRowDrag, autocomplete, createTableListRowConnectable, simpleTableView, detailTableView]
 * @param {HTMLElement} component 행을 생성할 테이블 엘리먼트
 * @param {NodeList | Element[]} table_rows 행을 생성할 테이블의 행의 엘리먼트들
 * @param {string} col_id 행의 아이디가 정해져 있을 경우 아이디를 입력, default = undefined
 * @param {string} view Simple or Detail Type
 * */
const createTableRow = (component, table_rows, col_id = undefined, view) => {
    const table = findTableById(draggable_tables, component.id);
    const row_container = component.querySelector('table._table > tbody');
    const column_id = col_id ? col_id : apiCreateNextId(getURLParamByPrevAndNext('database', 'detail'), 'ROW');
    let column = {
        column_id: column_id,
        column_pk: false,
        column_auto_increment: false,
        column_nullable: false,
        column_name: column_id,
        column_type: 'INT',
        column_comment: '',
    };
    column.id = column.column_id;
    column.pk = column.column_pk;
    column.auto_increment = column.column_auto_increment;
    column.nullable = column.column_nullable;
    column.name = column.column_name;
    column.type = column.column_type;
    column.comment = column.column_comment;
    $(row_container).append(createTableRowElementDynamic({
        table_id: component.id, table_name: table.name,
    }, column, table_rows.length + 1));

    const origin_table = draggable_tables.find(function (draggable_table) {
        if (component.id === draggable_table.id) {
            return true;
        }
    });

    // Table Row Select Event Listener
    const rows = origin_table.draggable_table.element.querySelectorAll(`table._table > tbody > tr[data-table-id="${component.id}"][data-table-row="${column_id}"]`);
    initializeTableRowSelect(rows);

    // Initialize Row Drag Event Listener
    initializeTableRowDrag(rows);

    // Table Row AutoComplete in Type Column
    const row = origin_table.draggable_table.element.querySelector(`table._table > tbody > tr[data-table-id="${component.id}"][data-table-row="${column_id}"]`);
    const input = row.querySelector('._type > .autocomplete > input');
    autocomplete(input, entries);

    // okiwi-query-left.js
    if (col_id === undefined) {
        createTableListRowConnectable(table, row);
    }
    table.columns.push(column);

    if (view === 'simple') {
        simpleTableView(origin_table.draggable_table.element);
    } else {
        detailTableView(origin_table.draggable_table.element);
    }
    // api.js
    apiCreateTableRow(getURLParamByPrevAndNext('database', 'detail'), origin_table.id, column, () => {
    }, () => {
    });
};

/**
 * CreateTableRowElementTemp,
 * 테이블의 행을 HTML로 생성하는 함수,
 * deprecated 함수
 *
 * @deprecated
 * @param {Object} row_info 행의 정보를 담은 오브젝트
 * */
const createTableRowElementTemp = (row_info) => {
    return `<tr data-table-id="${row_info.id}"
                data-table-row="${row_info.index}">
              <th scope="row">${row_info.index}
              </th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>`;
};

/**
 * UpdateContainer,
 * 컨테이너의 길이를 조절하는 함수
 *
 * @requires [expendContainerWidth, expendContainerHeight]
 * @param {Object} draggable_table 테이블에 관한 정보가 들어있는 오브젝트
 * @param {Object} position 좌표의 정보가 들어있는 오브젝트
 * */
const updateContainer = (draggable_table, position) => {
    const table = draggable_table.element;
    const container = draggable_table.containment;
    // Expend Container Width And Height
    const threshold = 200;
    const container_rect = container.getBoundingClientRect();
    expendContainerWidth(threshold, container, table, position, container_rect);
    expendContainerHeight(threshold, container, table, position, container_rect);
};

/**
 * UpdateContainerFix,
 * 컨테이너의 길이를 조절하는 함수
 *
 * @requires [expendContainerWidthFix, expendContainerHeightFix]
 * @param {Object} draggable_table 테이블에 관한 정보가 들어있는 오브젝트
 * @param {Object} position 좌표의 정보가 들어있는 오브젝트
 * */
const updateContainerFix = (draggable_table, position) => {
    const table = draggable_table.element;
    const container = draggable_table.containment;
    // Expend Container Width And Height
    const threshold = 200;
    const container_rect = container.getBoundingClientRect();
    expendContainerWidthFix(threshold, container, table, position, container_rect);
    expendContainerHeightFix(threshold, container, table, position, container_rect);
};

/**
 * ExpendContainerWidth,
 * 스크롤중 View의 길이(Width) 늘리는 함수
 *
 * @param {number} threshold 임계값
 * @param {HTMLElement} container Width를 늘릴 컨테이너
 * @param {HTMLElement} table 테이블 엘리먼트
 * @param {Object} position 좌표의 정보가 들어있는 오브젝트
 * @param {Object} rect {container}의 BoundingClientRect 정보가 들어있는 오브젝트
 * @return {number} 늘어난 또는 컨테이너의 가로 길이
 * */
const expendContainerWidth = (threshold, container, table, position, rect) => {
    const table_width = $(table).innerWidth();
    if (position.left + table_width + threshold > rect.width) {
        container.style.width = (rect.width + threshold) + 'px';
        return (rect.width + threshold);
    }
    return rect.width;
};

/**
 * ExpendContainerWidth,
 * 로직 수행 중 View의 길이(Width) 늘리는 함수
 *
 * @param {number} threshold 임계값
 * @param {HTMLElement} container Width를 늘릴 컨테이너
 * @param {HTMLElement} table 테이블 엘리먼트
 * @param {Object} position 좌표의 정보가 들어있는 오브젝트
 * @param {Object} rect {container}의 BoundingClientRect 정보가 들어있는 오브젝트
 * @return {number} 늘어난 또는 컨테이너의 가로 길이
 * */
const expendContainerWidthFix = (threshold, container, table, position, rect) => {
    const table_width = $(table).innerWidth();
    if (position.left + table_width + threshold > rect.width) {
        container.style.width = (rect.width + table_width + threshold) + 'px';
        return (rect.width + table_width + threshold);
    }
    return rect.width;
};

/**
 * ExpendContainerHeight,
 * 스크롤중 View의 길이(Height) 늘리는 함수
 *
 * @param {number} threshold 임계값
 * @param {HTMLElement} container Height를 늘릴 컨테이너
 * @param {HTMLElement} table 테이블 엘리먼트
 * @param {Object} position 좌표의 정보가 들어있는 오브젝트
 * @param {Object} rect {container}의 BoundingClientRect 정보가 들어있는 오브젝트
 * @return {number} 늘어난 또는 컨테이너의 높이
 * */
const expendContainerHeight = (threshold, container, table, position, rect) => {
    const table_height = $(table).innerHeight();
    if (position.top + table_height + threshold > rect.height) {
        container.style.height = (rect.height + threshold) + 'px';
        return (rect.height + threshold);
    }
    return rect.height;
};

/**
 * ExpendContainerHeight,
 * 로직 수행 중 View의 길이(Height) 늘리는 함수
 *
 * @param {number} threshold 임계값
 * @param {HTMLElement} container Height를 늘릴 컨테이너
 * @param {HTMLElement} table 테이블 엘리먼트
 * @param {Object} position 좌표의 정보가 들어있는 오브젝트
 * @param {Object} rect {container}의 BoundingClientRect 정보가 들어있는 오브젝트
 * @return {number} 늘어난 또는 컨테이너의 높이
 * */
const expendContainerHeightFix = (threshold, container, table, position, rect) => {
    const table_height = $(table).innerHeight();
    if (position.top + table_height + threshold > rect.height) {
        container.style.height = (rect.height + table_height + threshold) + 'px';
        return (rect.height + table_height + threshold);
    }
    return rect.height;
};

/**
 * TableRowAutoCompletes,
 * 특정 테이블의 행들에 타입에 관련된 자동완성 이벤트를 등록 해주는 함수
 *
 * @requires [autocomplete]
 * @param {HTMLElement} origin_table 테이블 엘리먼트
 * */
const tableRowAutoCompletes = (table) => {
    const rows = table.draggable_table.element.querySelectorAll('table._table > tbody > tr');
    rows.forEach(function (row) {
        const input = row.querySelector('._type > .autocomplete > input');
        autocomplete(input, entries);
    });
};

/**
 * TableRowDeleteClickEventListener,
 * 테이블 행의 삭제 클릭 이벤트 리스너
 *
 * @requires [tableRowDelete]
 * @param {HTMLElement} element 삭제옵션이 담긴 엘리먼트, 자기자신(this)
 * */
const tableRowDeleteClickEventListener = (element) => {
    const table_row = $(element).closest('tr[data-table-id][data-table-row]');
    tableRowDelete(draggable_tables, table_row);
};

/**
 * FindTableById,
 * 테이블의 아이디로 전역 테이블을 찾는 함수
 *
 * @param {Object[]} draggable_tables 전역 테이블들
 * @param {string} table_id 찾고자하는 테이블의 고유 아이디
 * */
const findTableById = (draggable_tables, table_id) => {
    const draggable_table = draggable_tables.find(function (draggable_table) {
        if (draggable_table.id === table_id) {
            return true;
        }
    });
    return draggable_table;
};

const findTableByName = (draggable_tables, table_name) => {
    const draggable_table = draggable_tables.filter(function (draggable_table) {
        if (draggable_table.name.includes(table_name)) {
            return true;
        }
    });
    return draggable_table;
}

/**
 * DeleteTableRowConnectable,
 * LeftSidebar에서 테이블의 행을 삭제시, 화면에서 테이블의 행을 삭제하는 함수
 *
 * @param {string} table_id 삭제할 행이 포함된 테이블의 고유 아이디
 * @param {string} row_id 삭제할 행의 고유 아이디
 * */
const deleteTableRowConnectable = (table_id, row_id) => {
    const component_row = document.querySelector(`.table-container .component table._table > tbody > tr[data-table-id="${table_id}"][data-table-row="${row_id}"]`);
    if (component_row) {
        component_row.querySelector('._delete').click();
    }
};

/**
 * CreateTableRowConnectable,
 * LeftSidebar에서 테이블의 행을 생성시, 화면에서 테이블의 행을 생성하는 함수
 *
 * @requires [createTableRow]
 * @param {string} table_id 삭제할 행이 포함된 테이블의 고유 아이디
 * @param {string} row_id 삭제할 행의 고유 아이디
 * */
const createTableRowConnectable = (table_id, row_id) => {
    const component = document.querySelector(`.table-container .component[id="${table_id}"]`);
    const table_rows = component.querySelectorAll('table._table > tbody > tr');
    const type = document.querySelector('#right-sidebar ._right-menu ._side-button-container ._side-simple').dataset.type;
    createTableRow(component, table_rows, row_id, type);
};

/**
 * UpdateTableRowNameConnectable,
 * LeftSidebar에서 테이블의 행의 이름을 수정시, 화면에서 테이블의 행의 이름을 수정하는 함수
 *
 * @param {string} table_id 삭제할 행이 포함된 테이블의 고유 아이디
 * @param {string} row_id 삭제할 행의 고유 아이디
 * @param {string} name 변경할 테이블 행의 이름
 * */
const updateTableRowNameConnectable = (table_id, row_id, name) => {
    const component = document.querySelector(`.table-container .component[id="${table_id}"]`);
    const component_row = component.querySelector(`tbody > tr[data-table-id="${table_id}"][data-table-row="${row_id}"]`);
    component_row.querySelector('td._column-name input').value = name;
    let table_row = findTableRowById(table_id, row_id);
    table_row.name = name;
    // api.js
    apiUpdateTableRow(getURLParamByPrevAndNext('database', 'detail'), table_id, table_row, () => {
    }, () => {
    });
};

/**
 * UpdateTableNameConnectable,
 * LeftSidebar에서 테이블의 이름을 수정시, 화면에서 테이블의 이름을 수정하는 함수
 *
 * @requires [findTableById]
 * @param {Object[]} draggable_tables 전역 테이블들
 * @param {string} row_id 삭제할 행의 고유 아이디
 * @param {string} name 변경할 테이블 행의 이름
 * */
const updateTableNameConnectable = (draggable_tables, table_id, update_value) => {
    const table = findTableById(draggable_tables, table_id);
    table.name = `${update_value}`;
    const component = document.querySelector(`.table-container .component[id="${table_id}"]`);
    component.querySelector('._table-header th._name').innerHTML = `${update_value}`;
    // api.js
    apiUpdateTable(getURLParamByPrevAndNext('database', 'detail'), table.id, table, () => {
    }, () => {
    });
};

/**
 * CreateTableConnectable,
 * LeftSidebar에서 테이블을 생성시, 화면에서 테이블을 생성하는 함수
 *
 * @requires [createTable, getMaxZIndex]
 * @param {string} selector 테이블을 등록시킬 컨테이너 셀렉터
 * @param {Object[]} draggable_tables 전역 테이블들
 * @param {Object} table 테이블의 정보가 담긴 오브젝트
 * */
const createTableConnectable = (selector, draggable_tables, table) => {
    createTable($(selector), draggable_tables, table, getMaxZIndex(document.querySelectorAll(selector + ' .component[data-table-id]')), 'connectable');
};


/**
 * FindTableRowById,
 * 테이블의 컬럼 아이디로 행을 찾는 함수
 *
 * @requires [findTableById]
 * @param {string} table_id
 * @param {string} column_id
 * */
const findTableRowById = (table_id, row_id) => {
    const table = findTableById(draggable_tables, table_id);
    const result = table.columns.find(function (column) {
        if (column.id === row_id) {
            return true;
        }
    });
    return result;
};

const findTableRowByName = (draggable_tables, row_name) => {
    let columns = new Array();
    draggable_tables.forEach(function (draggable_table) {
        columns.addAll(draggable_table.columns.filter(function (column) {
            if (column.name.includes(row_name)) {
                column.type = 'column';
                column.table_id = draggable_table.id;
                return true;
            }
        }));
    });
    return columns;
}

/**
 * InputChangeEventListener,
 *
 * @param {HTMLInputElement} input
 * */

class ColumnType {
    constructor(size_available, max_size, type_name) {
        this.size_available = size_available;
        this.max_size = max_size;
        this.type_name = type_name;
    }

    get name() {
        return this.type_name;
    }
}

function inputChangeEventListener(input) {
    const BIT = new ColumnType(true, 64, 'BIT');
    const TINYINT = new ColumnType(true, 3, 'TINYINT');
    const BOOL = new ColumnType(false, null, 'BOOL');
    const BOOLEAN = new ColumnType(false, null, 'BOOLEAN');
    const SMALLINT = new ColumnType(true, 5, 'SMALLINT');
    const MEDIUMINT = new ColumnType(true, 7, 'MEDIUMINT');
    const INT = new ColumnType(true, 11, 'INT');
    const INTEGER = new ColumnType(true, 11, 'INTEGER');
    const BIGINT = new ColumnType(true, 20, 'BIGINT');
    const DECIMAL = new ColumnType(true, 65, 'DECIMAL');
    const DEC = new ColumnType(true, 65, 'DEC');
    const NUMERIC = new ColumnType(true, 65, 'NUMERIC');
    const FIXED = new ColumnType(true, 65, 'FIXED');
    const FLOAT = new ColumnType(true, 23, 'FLOAT');
    const DOUBLE = new ColumnType(true, 53, 'DOUBLE');
    const DOUBLE_PRECISION = new ColumnType(true, 255, 'DOUBLE_PRECISION');
    const REAL = new ColumnType(true, 255, 'REAL');
    const CHAR = new ColumnType(true, 255, 'CHAR');
    const VARCHAR = new ColumnType(true, 65535, 'VARCHAR');
    const BINARY = new ColumnType(true, 255, 'BINARY');
    const VARBINARY = new ColumnType(true, 65535, 'VARBINARY');
    const TINYBLOB = new ColumnType(false, null, 'TINYBLOB');
    const TINYTEXT = new ColumnType(false, null, 'TINYTEXT');
    const BLOB = new ColumnType(true, 65535, 'BLOB');
    const TEXT = new ColumnType(true, 65535, 'TEXT');
    const MEDIUMBLOB = new ColumnType(false, null, 'MEDIUMBLOB');
    const MEDIUMTEXT = new ColumnType(false, null, 'MEDIUMTEXT');
    const LONGBLOB = new ColumnType(false, null, 'LONGBLOB');
    const LONGTEXT = new ColumnType(false, null, 'LONGTEXT');
    const ENUM = new ColumnType(true, 65535, 'ENUM');
    const SET = new ColumnType(true, 65535, 'SET');
    const DATE = new ColumnType(false, null, 'DATE');
    const TIME = new ColumnType(true, 6, 'TIME');
    const DATETIME = new ColumnType(true, 6, 'DATETIME');
    const TIMESTAMP = new ColumnType(true, 6, 'TIMESTAMP');
    const YEAR = new ColumnType(false, null, 'YEAR');
    const JSON = new ColumnType(false, null, 'JSON');
    const DATETIME2 = new ColumnType(false, null, 'DATETIME2');
    const DATETIMEOFFSET = new ColumnType(false, null, 'DATETIMEOFFSET');
    const SMALLDATETIME = new ColumnType(false, null, 'SMALLDATETIME');
    const MONEY = new ColumnType(false, null, 'MONEY');
    const SMALLMONEY = new ColumnType(false, null, 'SMALLMONEY');
    const NCHAR = new ColumnType(true, 4000, 'NCHAR');
    const NVARCHAR = new ColumnType(true, 4000, 'NVARCHAR');
    const VARCHAR2 = new ColumnType(true, 4000, 'VARCHAR2');
    const NTEXT = new ColumnType(false, null, 'NTEXT');
    const IMAGE = new ColumnType(false, null, 'IMAGE');
    const CURSOR = new ColumnType(false, null, 'CURSOR');
    const ROWVERSION = new ColumnType(false, null, 'ROWVERSION');
    const HIERARCHYID = new ColumnType(false, null, 'HIERARCHYID');
    const UNIQUEIDENTIFIER = new ColumnType(false, null, 'UNIQUEIDENTIFIER');
    const SQL_VARIANT = new ColumnType(false, null, 'SQL_VARIANT');
    const XML = new ColumnType(false, null, 'XML');
    const LONG = new ColumnType(false, null, 'LONG');
    const CLOB = new ColumnType(false, null, 'CLOB');
    const NCLOB = new ColumnType(false, null, 'NCLOB');
    const NUMBER = new ColumnType(false, null, 'NUMBER');
    const BINARY_FLOAT = new ColumnType(false, null, 'BINARY_FLOAT');
    const BINARY_DOUBLE = new ColumnType(false, null, 'BINARY_DOUBLE');
    const BFILE = new ColumnType(false, null, 'BFILE');
    const FLOAT8 = new ColumnType(false, null, 'FLOAT8');
    const TIMESTAMPTZ = new ColumnType(false, null, 'TIMESTAMPTZ');
    const INTERVAL = new ColumnType(false, null, 'INTERVAL');
    const JSONB = new ColumnType(false, null, 'JSONB');
    const UUID = new ColumnType(false, null, 'UUID');

    const mySQLTypesArray = [
        BIT,
        TINYINT,
        BOOL,
        BOOLEAN,
        SMALLINT,
        MEDIUMINT,
        INT,
        INTEGER,
        BIGINT,
        DECIMAL,
        DEC,
        NUMERIC,
        FIXED,
        FLOAT,
        DOUBLE,
        DOUBLE_PRECISION,
        REAL,
        CHAR,
        VARCHAR,
        BINARY,
        VARBINARY,
        TINYBLOB,
        TINYTEXT,
        BLOB,
        TEXT,
        MEDIUMBLOB,
        MEDIUMTEXT,
        LONGBLOB,
        LONGTEXT,
        ENUM,
        SET,
        DATE,
        TIME,
        DATETIME,
        TIMESTAMP,
        YEAR,
        JSON
    ];
    const msSQLTypesArray = [
        BIGINT,
        INT,
        SMALLINT,
        TINYINT,
        NUMERIC,
        DECIMAL,
        BIT,
        MONEY,
        SMALLMONEY,
        FLOAT,
        REAL,
        DATETIME,
        DATETIME2,
        DATE,
        DATETIMEOFFSET,
        SMALLDATETIME,
        TIME,
        CHAR,
        VARCHAR,
        TEXT,
        NCHAR,
        NVARCHAR,
        NTEXT,
        BINARY,
        VARBINARY,
        IMAGE,
        CURSOR,
        ROWVERSION,
        HIERARCHYID,
        UNIQUEIDENTIFIER,
        SQL_VARIANT,
        XML
    ];
    const oracleTypesArray = [
        CHAR,
        VARCHAR2,
        NCHAR,
        NVARCHAR,
        LONG,
        CLOB,
        NCLOB,
        NUMBER,
        FLOAT,
        BINARY_FLOAT,
        BINARY_DOUBLE,
        DATE,
        TIMESTAMP,
        BLOB,
        BFILE

    ];
    const postgreSQLTypesArray = [
        BOOLEAN,
        BOOL,
        CHAR,
        VARCHAR,
        TEXT,
        SMALLINT,
        INT,
        FLOAT,
        REAL,
        FLOAT8,
        NUMERIC,
        DATE,
        TIME,
        TIMESTAMP,
        TIMESTAMPTZ,
        INTERVAL,
        JSON,
        JSONB,
        UUID,
    ];

    const table_row_element = input.closest('[data-table-id][data-table-row]');
    const table_row = findTableRowById(table_row_element.dataset.tableId, table_row_element.dataset.tableRow);
    if (comment_type_input_timer) {
        clearTimeout(comment_type_input_timer);
    }
    if (input.dataset.type === 'comment') {
        table_row.comment = input.value;
        comment_type_input_timer = setTimeout(function () {
            apiUpdateTableRow(getURLParamByPrevAndNext('database', 'detail'), table_row_element.dataset.tableId, table_row, () => {
            }, () => {
            });
        }, 500);
    } else if (input.dataset.type === 'type') {
        // Type Change Listener
        table_row.type = input.value;
        // TODO Inspection
        // 1. 괄호 있으면 괄호랑 구분
        let type = input.value.split('(')[0];
        let number = input.value.split('(')[1];
        let match = false;
        let type_match_array = [];
        switch (database_type) {
            case 'MYSQL':
            case 'MARIA_DB':
                type_match_array = mySQLTypesArray;
                break;
            case 'MSSQL':
                type_match_array = msSQLTypesArray;
                break;
            case 'ORACLE':
                type_match_array = oracleTypesArray;
                break;
            case 'POSTGRE_SQL':
                type_match_array = postgreSQLTypesArray;
                break;
        }
        type_match_array.forEach((item) => {
            if (type.toUpperCase() === item.name) {
                match = true;
                table_row.type = type;
                let bracketNumberRegex = /\(([^)]+)\)/;
                let inspection_check = false;
                if (number !== undefined && bracketNumberRegex.test(('(' + number)) && item.size_available && item.max_size >= number.replace(')', '')) {
                    table_row.size = number.replace(')', '');
                    console.log('업데이트 가능 input timer 끝나면 업데이트');
                    comment_type_input_timer = setTimeout(function () {
                        apiUpdateTableRow(getURLParamByPrevAndNext('database', 'detail'), table_row_element.dataset.tableId, table_row, () => {
                        }, () => {
                        });
                    }, 500);
                    inspection_check = true;
                } else if (number === undefined && (!item.size_available || item.name === 'INT')) {
                    console.log('업데이트 가능 input timer 끝나면 업데이트');
                    comment_type_input_timer = setTimeout(function () {
                        apiUpdateTableRow(getURLParamByPrevAndNext('database', 'detail'), table_row_element.dataset.tableId, table_row, () => {
                        }, () => {
                        });
                    }, 500);
                    inspection_check = true;
                } else {
                    // TODO 업데이트 안되는 상세 이유?
                    //2022-10-25
                    console.log('업데이트 실패');
                    console.log('size 가 필요한데 없거나, 사이즈가 필요없는데 있거나');
                    console.log('형식이 올바르지 않을때도 적용 Type(size)의 형식을 맞춰야함');
                    console.log('Type Rule : ', item);
                    inspection_check = false;
                }
                let container = input.closest('._type');
                if (!inspection_check) {
                    if (!container.classList.contains('is-failed')) {
                        container.classList.add('is-failed');
                        viewAlert({content: '컬럼의 타입이 올바르지 않습니다.', type: 'failed'});
                    }
                } else {
                    if (container.classList.contains('is-failed')) {
                        container.classList.remove('is-failed');
                    }
                }
            }
        })

        if (!match) {
            console.log('일치하는 Type 없음');
            let container = input.closest('._type');
            if (!container.classList.contains('is-failed')) {
                container.classList.add('is-failed');
                viewAlert({content: '컬럼의 타입이 일치하는 타입이 없습니다.', type: 'failed'});
            }
        }
    }
}

/**
 * SimpleTableView,
 * 테이블을 심플하게 보여주는 함수
 *
 * @param {HTMLElement} table 테이블 엘리먼트
 * */
const simpleTableView = (table) => {
    const ths = table.querySelectorAll('._table ._table-columns th:not(._create):not(.__name):not(.__fk):not(._sort)');
    const name = table.querySelector('._table ._table-header th._name');
    name.setAttribute('colspan', '1');
    ths.forEach(function (th) {
        $(th).hide();
    });
    const tds = table.querySelectorAll('._table tbody tr[data-table-id][data-table-row] td:not(._column-name):not(._fk):not(._sort)');
    tds.forEach(function (td) {
        $(td).hide();
    });
};

/**
 * DetailTableView,
 * 테이블을 디테일하게 보여주는 함수
 *
 * @param {HTMLElement} table 테이블 엘리먼트
 * */
const detailTableView = (table) => {
    const ths = table.querySelectorAll('._table ._table-columns th:not(._create):not(.__name):not(.__fk):not(._sort)');
    const name = table.querySelector('._table ._table-header th._name');
    name.setAttribute('colspan', '6');
    ths.forEach(function (th) {
        $(th).show();
    });
    const tds = table.querySelectorAll('._table tbody tr[data-table-id][data-table-row] td:not(._column-name):not(._fk):not(._sort)');
    tds.forEach(function (td) {
        $(td).show();
    });
};

/**
 * TableMoveScroll,
 * 해당 테이블 아이디를 가진 테이블로 이동하는 함수
 *
 * @requires [getMaxZIndex, tableOutlineHighlightCallback]
 * @param {string} table_id 테이블의 아이디
 * */
const tableMoveScroll = (table_id, effectTimeout = 500, callbackTimeout = 1000) => {
    const table = document.querySelector(`.component[id="${table_id}"]`);
    const position = getTransformStyle(table);


    const container = document.querySelector('.table-container');
    const tables = container.querySelectorAll('.component');

    const target_table = table;

    const max_zIndex = getMaxZIndex(tables) - 1;
    const current_zIndex = target_table.style.zIndex * 1;
    if (max_zIndex < 6000 && (max_zIndex !== current_zIndex)) {
        target_table.style.zIndex = (max_zIndex + 1);
    }

    window.scroll({
        left: position.left - MINIMUM_POSITION.left, top: position.top - MINIMUM_POSITION.top, behavior: 'smooth',
    });
    setTimeout(function () {
        table.style.outline = '2px solid #F08705';
        $(table).effect('highlight', {}, callbackTimeout, tableOutlineHighlightCallback);
    }, effectTimeout);
};

/**
 * TableRowMoveScroll,
 * 해당 테이블 행의 아이디를 가진 테이블의 행으로 이동하는 함수
 *
 * @requires [getMaxZIndex, tableOutlineHighlightCallback]
 * @param {string} table_id 테이블의 아이디
 * @param {string} table_row_id 테이블의 행의 아이디
 * */
const tableRowMoveScroll = (table_id, table_row_id, effectTimeout = 500, callbackTimeout = 1000) => {
    const table = document.querySelector(`.component[id="${table_id}"]`);
    const position = getTransformStyle(table);
    const table_row = table.querySelector(`._table tr[data-table-id="${table_id}"][data-table-row="${table_row_id}"]`);

    const container = document.querySelector('.table-container');
    const tables = container.querySelectorAll('.component');

    const target_table = table;

    const max_zIndex = parseInt(getMaxZIndex(tables) - 1);
    const current_zIndex = parseInt(target_table.style.zIndex);
    if (max_zIndex < 6000 && (max_zIndex !== current_zIndex)) {
        target_table.style.zIndex = (max_zIndex + 1);
    }

    window.scroll({
        left: position.left - MINIMUM_POSITION.left, top: position.top - MINIMUM_POSITION.top, behavior: 'smooth',
    });
    setTimeout(function () {
        table_row.style.outline = '2px solid #F08705';
        $(table_row).effect('highlight', {color: 'transparent'}, callbackTimeout, tableOutlineHighlightCallback);
    }, effectTimeout);
};

/**
 * TableOutlineHighlightCallback,
 * 테이블로 또는 테이블의 행으로 이동했을때의 애니메이션 콜백
 * */
function tableOutlineHighlightCallback() {
    this.style.outline = '2px solid transparent';
}

/**
 * ReInitializeTableScale,
 * 전체 테이블의 스케일을 특정 사이즈만큼 재조정해주는 함수
 *
 * @requires [updateLines]
 * @param {Object[]} tables 전역 테이블들
 * @param {Object[]} lines 전역 연결선들
 * @param {number} scale 조정할 스케일 값
 * */
function reInitializeTableScale(tables, lines, scale) {
    tables.forEach(function (table) {
        table.draggable_table.scale = scale;
    });
    updateLines(lines);
}