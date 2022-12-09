(function () {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c) return c(i, !0);
                    if (u) return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND", a
                }
                var p = n[i] = {exports: {}};
                e[i][0].call(p.exports, function (r) {
                    var n = e[i][1][r];
                    return o(n || r)
                }, p, p.exports, r, e, n, t)
            }
            return n[i].exports
        }

        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
        return o
    }

    return r
})()({
    1: [function (require, module, exports) {
        /**
         * jKanban
         * Vanilla Javascript plugin for manage kanban boards
         *
         * @site: http://www.riccardotartaglia.it/jkanban/
         * @author: Riccardo Tartaglia
         */

//Require dragula
        var dragula = require('dragula');

        (function () {
            this.jKanban = function () {
                var self = this
                var __DEFAULT_ITEM_HANDLE_OPTIONS = {
                    enabled: false
                }
                var __DEFAULT_ITEM_ADD_OPTIONS = {
                    enabled: false
                }
                this._disallowedItemProperties = [
                    'id',
                    'title',
                    'click',
                    'context',
                    'drag',
                    'dragend',
                    'drop',
                    'order'
                ]
                this.element = ''
                this.container = ''
                this.boardContainer = []
                this.handlers = []
                this.dragula = dragula
                this.drake = ''
                this.drakeBoard = ''
                this.itemAddOptions = __DEFAULT_ITEM_ADD_OPTIONS
                this.itemHandleOptions = __DEFAULT_ITEM_HANDLE_OPTIONS
                var defaults = {
                    element: '',
                    gutter: '15px',
                    widthBoard: '250px',
                    responsive: '700',
                    responsivePercentage: false,
                    boards: [],
                    dragBoards: true,
                    dragItems: true, //whether can drag cards or not, useful when set permissions on it.
                    itemAddOptions: __DEFAULT_ITEM_ADD_OPTIONS,
                    itemHandleOptions: __DEFAULT_ITEM_HANDLE_OPTIONS,
                    dragEl: function (el, source) {
                    },
                    dragendEl: function (el) {
                    },
                    dropEl: function (self, el, target, source, sibling) {
                    },
                    dragBoard: function (el, source) {
                    },
                    dragendBoard: function (el) {
                    },
                    dropBoard: function (el, target, source, sibling) {
                    },
                    click: function (el) {
                    },
                    subTaskClick: function (el) {
                    },
                    context: function (el, e) {
                    },
                    buttonClick: function (el, boardId) {
                    },
                    updateBoard: function (selected_option, el, boardId) {
                    },
                    addTask: function (el, boardId) {
                    },
                    headerOptionShow: function (el, e) {
                    },
                    headerOptionHide: function (el, e) {
                    },
                    propagationHandlers: [],
                }

                if (arguments[0] && typeof arguments[0] === 'object') {
                    this.options = __extendDefaults(defaults, arguments[0])
                }

                this.__getCanMove = function (handle) {
                    if (handle.classList.contains('kanban-add-task')) {
                        return false;
                    }
                    if (!self.options.itemHandleOptions.enabled) {
                        return !!self.options.dragItems
                    }

                    if (self.options.itemHandleOptions.handleClass) {
                        return handle.classList.contains(self.options.itemHandleOptions.handleClass)
                    }
                    return handle.classList.contains('item_handle')
                }

                this.init = function () {
                    //set initial boards
                    __setBoard()
                    //set drag with dragula
                    if (window.innerWidth > self.options.responsive) {
                        //Init Drag Board
                        self.drakeBoard = self
                            .dragula([self.container], {
                                moves: function (el, source, handle, sibling) {
                                    if (!self.options.dragBoards) return false
                                    return (
                                        handle.classList.contains('kanban-board-header') ||
                                        handle.classList.contains('kanban-title-board') ||
                                        handle.classList.contains('kanban-percent') ||
                                        handle.classList.contains('_title')
                                    )
                                },
                                accepts: function (el, target, source, sibling) {
                                    return target.classList.contains('kanban-container')
                                },
                                revertOnSpill: true,
                                direction: 'horizontal'
                            })
                            .on('drag', function (el, source) {
                                el.classList.add('is-moving')
                                self.options.dragBoard(el, source)
                                if (typeof el.dragfn === 'function') el.dragfn(el, source)
                            })
                            .on('dragend', function (el) {
                                el.classList.remove('is-moving')
                                self.options.dragendBoard(el)
                                if (typeof el.dragendfn === 'function') el.dragendfn(el)
                            })
                            .on('drop', function (el, target, source, sibling) {
                                __updateBoardsOrder()
                                el.classList.remove('is-moving')
                                self.options.dropBoard(el, target, source, sibling)
                                if (typeof el.dropfn === 'function')
                                    el.dropfn(el, target, source, sibling)
                            })

                        //Init Drag Item
                        self.drake = self
                            .dragula(self.boardContainer, {
                                moves: function (el, source, handle, sibling) {
                                    return self.__getCanMove(handle);
                                },
                                revertOnSpill: true,
                            }).on('cancel', function (el, container, source) {
                                self.enableAllBoards()
                            })
                            .on('drag', function (el, source) {
                                var elClass = el.getAttribute('class')
                                if (elClass !== '' && elClass.indexOf('not-draggable') > -1) {
                                    self.drake.cancel(true);
                                    return false;
                                }

                                el.classList.add('is-moving')

                                self.options.dragEl(el, source)

                                var boardJSON = __findBoardJSON(source.parentNode.dataset.id)
                                if (boardJSON.dragTo !== undefined) {
                                    self.options.boards.map(function (board) {
                                        if (
                                            boardJSON.dragTo.indexOf(board.id) === -1 &&
                                            board.id !== source.parentNode.dataset.id
                                        ) {
                                            self.findBoard(board.id).classList.add('disabled-board')
                                        }
                                    })
                                }

                                if (el !== null && typeof el.dragfn === 'function')
                                    el.dragfn(el, source)
                            })
                            .on('dragend', function (el) {
                                self.options.dragendEl(el)
                                if (el !== null && typeof el.dragendfn === 'function')
                                    el.dragendfn(el)
                            })
                            .on('drop', function (el, target, source, sibling) {
                                self.enableAllBoards();

                                var boardJSON = __findBoardJSON(source.parentNode.dataset.id)

                                if (boardJSON.dragTo !== undefined) {
                                    if (
                                        boardJSON.dragTo.indexOf(target.parentNode.dataset.id) === -1 &&
                                        target.parentNode.dataset.id !== source.parentNode.dataset.id
                                    ) {
                                        self.drake.cancel(true)
                                    }
                                }
                                if (el !== null) {
                                    var result = self.options.dropEl(self, el, target, source, sibling)
                                    if (result === false) {
                                        self.drake.cancel(true)
                                    }
                                    el.classList.remove('is-moving')
                                    if (typeof el.dropfn === 'function') {
                                        el.dropfn(el, target, source, sibling)
                                    }
                                }
                            })
                    }
                }

                this.enableAllBoards = function () {
                    var allB = document.querySelectorAll('.kanban-board')
                    if (allB.length > 0 && allB !== undefined) {
                        for (var i = 0; i < allB.length; i++) {
                            allB[i].classList.remove('disabled-board')
                        }
                    }
                }

                this.addTaskAndElement = function (boardId, element) {
                    self.addElement(boardId, element);
                }

                this.addElement = function (boardID, element, position) {
                    if (typeof position === 'undefined') {
                        position = -1
                    }
                    let board = self.element.querySelector(`[data-id="${boardID}"] .kanban-drag`);
                    let childNodes = board.childNodes;
                    let footerNode;
                    for (let i = 0; i < childNodes.length; i++) {
                        if (childNodes[i].dataset.eid === undefined || childNodes[i].dataset.eid === null) {
                            footerNode = childNodes[i];
                        }
                    }
                    let refElement = board.childNodes[position];
                    let nodeItem = document.createElement('div')
                    nodeItem.classList.add('kanban-item')
                    if (typeof element.id !== 'undefined' && element.id !== '') {
                        nodeItem.setAttribute('data-eid', element.id)
                    }
                    if (element.class && Array.isArray(element.class)) {
                        element.class.forEach(function (cl) {
                            nodeItem.classList.add(cl)
                        })
                    }
                    nodeItem.innerHTML = __buildItemCard(element)
                    //add function
                    nodeItem.clickfn = element.click
                    nodeItem.contextfn = element.context;
                    nodeItem.dragfn = element.drag
                    nodeItem.dragendfn = element.dragend
                    nodeItem.dropfn = element.drop
                    __appendCustomProperties(nodeItem, element)
                    __onclickHandler(nodeItem)
                    __onSubTaskClickHandler(nodeItem.querySelectorAll('.kanban-sub-item .checkbox'));
                    __onContextHandler(nodeItem)
                    let boardJSON = __findBoardJSON(boardID);

                    boardJSON.item.push(element);

                    //체크박스 클릭 이벤트
                    nodeItem.querySelector('.checkbox').addEventListener('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        self.options.check(self, this);
                    });
                    //컨텍스트 메뉴(태스크 메뉴) 클릭 이벤트
                    nodeItem.querySelector('.dropright').addEventListener('click', function (e) {
                        let item = this.closest('.kanban-item');
                        item.dispatchEvent(new Event('contextmenu'));
                        e.stopPropagation();
                        e.preventDefault();
                    });
                    if (self.options.itemHandleOptions.enabled) {
                        nodeItem.style.cursor = 'default'
                    }
                    if (position === -1) {
                        board.insertBefore(nodeItem, footerNode);
                    } else {
                        board.insertBefore(nodeItem, refElement);
                    }
                    return self
                }

                this.addForm = function (boardID, formItem) {
                    var board = self.element.querySelector(
                        `[data-id=${boardID}] .kanban-drag`
                    )
                    var _attribute = formItem.getAttribute('class')
                    formItem.setAttribute('class', _attribute + ' not-draggable')
                    board.appendChild(formItem)
                    return self
                }

                this.addBoards = function (boards, isInit, addOption = {baseId: undefined, direction: undefined}) {
                    if (self.options.responsivePercentage) {
                        self.container.style.width = '100%'
                        self.options.gutter = '1%'
                        if (window.innerWidth > self.options.responsive) {
                            var boardWidth = (100 - boards.length * 2) / boards.length
                        } else {
                            var boardWidth = 100 - boards.length * 2
                        }
                    } else {
                        var boardWidth = self.options.widthBoard
                    }
                    var addButton = self.options.itemAddOptions.enabled
                    var buttonContent = self.options.itemAddOptions.content
                    var buttonClass = self.options.itemAddOptions.class
                    var buttonFooter = self.options.itemAddOptions.footer

                    //for on all the boards
                    let board_count = boards.length;
                    for (let boardkey in boards) {
                        // single board
                        let board = boards[boardkey]
                        if (!isInit) {
                            self.options.boards.push(board)
                        }

                        if (!self.options.responsivePercentage) {
                            //add width to container
                            if (self.container.style.width === '') {
                                self.container.style.width =
                                    parseInt(boardWidth) + parseInt(self.options.gutter) * 2 + 'px'
                            } else {
                                self.container.style.width =
                                    parseInt(self.container.style.width) +
                                    parseInt(boardWidth) +
                                    parseInt(self.options.gutter) * 2 +
                                    'px'
                            }
                        }
                        //create node
                        let boardNode = document.createElement('div')
                        boardNode.dataset.id = board.id
                        boardNode.dataset.order = self.container.childNodes.length + 1
                        boardNode.classList.add('kanban-board')
                        //set style
                        if (self.options.responsivePercentage) {
                            boardNode.style.width = boardWidth + '%'
                        } else {
                            boardNode.style.width = boardWidth
                        }
                        boardNode.style.marginLeft = self.options.gutter
                        boardNode.style.marginRight = self.options.gutter
                        // header board
                        var headerBoard = document.createElement('header')
                        if (board.class !== '' && board.class !== undefined)
                            var allClasses = board.class.split(',')
                        else allClasses = []
                        headerBoard.classList.add('kanban-board-header')
                        allClasses.map(function (value) {
                            // Remove empty spaces
                            value = value.replace(/^[ ]+/g, '')
                            headerBoard.classList.add(value)
                        });
                        headerBoard.innerHTML = this.createHeaderBoardElement(board);
                        __onHeaderOptionShowHandler(headerBoard);
                        __onHeaderOptionHideHandler(headerBoard);

                        //Event Listener Add
                        let option_container = headerBoard.querySelector('.kanban-board-option');
                        ['_modify', '_delete', '_add_left', '_add_right'].forEach(function (option) {
                            __onUpdateBoardHandler(option_container.querySelector(`.${option}`), boardNode.dataset.id);
                        });

                        //content board
                        var contentBoard = document.createElement('main')
                        contentBoard.classList.add('kanban-drag')
                        if (board.bodyClass !== '' && board.bodyClass !== undefined)
                            var bodyClasses = board.bodyClass.split(',')
                        else bodyClasses = []
                        bodyClasses.map(function (value) {
                            contentBoard.classList.add(value)
                        })
                        //add drag to array for dragula
                        self.boardContainer.push(contentBoard)
                        for (var itemkey in board.item) {
                            //create item
                            var itemKanban = board.item[itemkey]
                            var nodeItem = document.createElement('div')
                            nodeItem.classList.add('kanban-item')
                            if (itemKanban.id) {
                                nodeItem.dataset.eid = itemKanban.id
                            }
                            if (itemKanban.class && Array.isArray(itemKanban.class)) {
                                itemKanban.class.forEach(function (cl) {
                                    nodeItem.classList.add(cl)
                                })
                            }
                            nodeItem.innerHTML = __buildItemCard(itemKanban);
                            //add function
                            nodeItem.clickfn = itemKanban.click
                            nodeItem.contextfn = itemKanban.context
                            nodeItem.dragfn = itemKanban.drag
                            nodeItem.dragendfn = itemKanban.dragend
                            nodeItem.dropfn = itemKanban.drop
                            __appendCustomProperties(nodeItem, itemKanban);
                            //add click handler of item
                            __onclickHandler(nodeItem);
                            __onSubTaskClickHandler(nodeItem.querySelectorAll('.kanban-sub-item .checkbox'));
                            __onContextHandler(nodeItem);
                            if (self.options.itemHandleOptions.enabled) {
                                nodeItem.style.cursor = 'default'
                            }

                            //체크박스 클릭 이벤트
                            nodeItem.querySelector('.checkbox').addEventListener('click', function (e) {
                                e.preventDefault();
                                e.stopPropagation();
                                self.options.check(self, this);
                            });
                            //컨텍스트 메뉴(태스크 메뉴) 클릭 이벤트
                            nodeItem.querySelector('.dropright').addEventListener('click', function (e) {
                                let item = this.closest('.kanban-item');
                                item.dispatchEvent(new Event('contextmenu'));
                                e.preventDefault();
                                e.stopPropagation();
                            });
                            contentBoard.appendChild(nodeItem);
                        }
                        //footer board
                        var footerBoard = document.createElement('footer')
                        footerBoard.classList.add('not-draggable');
                        // if add button is true, add button to the board
                        if (addButton) {
                            let btn = document.createElement('button');
                            let t = document.createTextNode(buttonContent ? buttonContent : '+');
                            btn.setAttribute(
                                'class',
                                buttonClass ? buttonClass : 'kanban-title-button btn btn-default btn-xs'
                            )
                            $(btn).append(`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 0C7.23206 0 7.45462 0.0921874 7.61872 0.256282C7.78281 0.420376 7.875 0.642936 7.875 0.875V6.125H13.125C13.3571 6.125 13.5796 6.21719 13.7437 6.38128C13.9078 6.54538 14 6.76794 14 7C14 7.23206 13.9078 7.45462 13.7437 7.61872C13.5796 7.78281 13.3571 7.875 13.125 7.875H7.875V13.125C7.875 13.3571 7.78281 13.5796 7.61872 13.7437C7.45462 13.9078 7.23206 14 7 14C6.76794 14 6.54538 13.9078 6.38128 13.7437C6.21719 13.5796 6.125 13.3571 6.125 13.125V7.875H0.875C0.642936 7.875 0.420376 7.78281 0.256282 7.61872C0.0921874 7.45462 0 7.23206 0 7C0 6.76794 0.0921874 6.54538 0.256282 6.38128C0.420376 6.21719 0.642936 6.125 0.875 6.125H6.125V0.875C6.125 0.642936 6.21719 0.420376 6.38128 0.256282C6.54538 0.0921874 6.76794 0 7 0Z" fill="#F06A6A"/>
                                           </svg>
                                           `);
                            btn.appendChild(t);
                            //var buttonHtml = '<button class="kanban-title-button btn btn-default btn-xs">'+buttonContent+'</button>'
                            if (buttonFooter) {
                                footerBoard.appendChild(btn);
                            } else {
                                headerBoard.appendChild(btn);
                            }
                            __onAddButtonClickHandler(btn, board.id);
                        }
                        //board assembly
                        boardNode.appendChild(headerBoard);
                        contentBoard.appendChild(footerBoard);
                        boardNode.appendChild(contentBoard);
                        //board add
                        if (addOption.baseId !== undefined && addOption.baseId !== null) {
                            let findBoard = self.findBoard(addOption.baseId);
                            if (addOption.direction === 'append') {
                                findBoard.after(boardNode);
                            } else if (addOption.direction === 'prepend') {
                                findBoard.before(boardNode);
                            }
                        } else {
                            self.container.appendChild(boardNode);
                        }
                    }

                    if ($(".kanban-board[data-id='add-board']").length === 0) {
                        if (!self.options.responsivePercentage) {
                            //add width to container
                            if (self.container.style.width === '') {
                                self.container.style.width =
                                    parseInt(boardWidth) + parseInt(self.options.gutter) * 2 + 'px'
                            } else {
                                self.container.style.width =
                                    parseInt(self.container.style.width) +
                                    parseInt(boardWidth) +
                                    parseInt(self.options.gutter) * 2 +
                                    'px'
                            }
                        }
                        let addBoardOption = self.options.addBoardOption;
                        var board = {
                            'id': addBoardOption.id,
                            'title': addBoardOption.title,
                            'item': [],
                            'board_class': addBoardOption.class
                        };
                        var boardNode = document.createElement('div')
                        boardNode.dataset.id = board.id
                        boardNode.dataset.order = self.container.childNodes.length + 1;
                        boardNode.setAttribute('class', board.board_class);
                        boardNode.classList.add('kanban-board', 'add-board');
                        //set style
                        if (self.options.responsivePercentage) {
                            boardNode.style.width = boardWidth + '%'
                        } else {
                            boardNode.style.width = boardWidth
                        }
                        boardNode.style.marginLeft = self.options.gutter
                        boardNode.style.marginRight = self.options.gutter
                        // header board
                        var headerBoard = document.createElement('header')
                        if (board.class !== '' && board.class !== undefined)
                            var allClasses = board.class.split(',')
                        else allClasses = []
                        headerBoard.classList.add('kanban-board-header')
                        allClasses.map(function (value) {
                            // Remove empty spaces
                            value = value.replace(/^[ ]+/g, '')
                            headerBoard.classList.add(value)
                        })
                        headerBoard.innerHTML = `<div class="kanban-title-board">${board.title}</div>`;
                        //add drag to array for dragula
                        boardNode.appendChild(headerBoard)
                        //board add
                        self.container.appendChild(boardNode)
                        //add Event
                        boardNode.querySelector('.kanban-add-board').addEventListener('click', function (event) {
                            self.options.addBoardOption.onClick(self);
                            event.preventDefault();
                            event.stopPropagation();
                        });
                    } else {
                        var board = boards[0];
                        var empty;
                        for (var i = 0; i < self.container.childNodes.length; i++) {
                            if (self.container.childNodes[i].dataset.id === 'add-board') {
                                empty = self.container.childNodes[i];
                                self.container.childNodes[i].remove();
                            }
                        }
                        self.container.appendChild(empty);
                        __updateBoardsOrder();
                    }
                    return self
                }
                this.moveBoard = function (boardID, addOption = {baseId: undefined, direction: undefined}) {
                    let findBoard = self.findBoard(boardID);
                    findBoard.remove();
                    let findBoardJson = self.findBoardJSON(boardID);
                    self.removeBoard(boardID);
                    self.addBoards([findBoardJson], false, addOption);
                }

                this.updateBoardsOrder = function (callback) {
                    let index = 1
                    for (let i = 0; i < self.container.childNodes.length; i++) {
                        self.container.childNodes[i].dataset.order = index++
                    }
                    callback(self.container.childNodes);
                }

                this.createHeaderBoardElement = function (board) {
                    return `<div class="kanban-title-board">
                              <div class="_title" data-toggle="tooltip" data-placement="bottom" title="${board.title}">${board.title}</div>
                            </div>
                            <div class="kanban-percent _percent">${board.percent}%</div>
                            <div class="kanban-board-option _option">
                              <div class="btn-group dropright">
                                <div data-toggle="dropdown"
                                     aria-expanded="false">
                                  <img class="img-fluid"
                                       src="/resources/assets/images/icon/board_options.svg"/>
                                </div>
                                <div class="dropdown-menu">
                                  <a class="dropdown-item _modify" data-type="_modify"
                                     href="javascript:void(0)">보드 이름 수정</a>
                                  <a class="dropdown-item _delete" data-type="_delete"
                                     href="javascript:void(0)">보드 삭제</a>
                                  <a class="dropdown-item _add_left" data-type="_add_left"
                                     href="javascript:void(0)">해당 보드 왼쪽에 추가</a>
                                  <a class="dropdown-item _add_right" data-type="_add_right"
                                     href="javascript:void(0)">해당 보드 오른쪽에 추가</a>
                                </div>
                              </div>
                            </div>`;
                }

                this.findBoard = function (id) {
                    var el = self.element.querySelector('[data-id="' + id + '"]')
                    return el
                }

                this.getParentBoardID = function (el) {
                    if (typeof el === 'string') {
                        el = self.element.querySelector('[data-eid="' + el + '"]')
                    }
                    if (el === null) {
                        return null
                    }
                    return el.parentNode.parentNode.dataset.id
                }

                this.moveTask = function (taskID, addOption = {boardId: undefined, position: undefined}) {
                    let findTask = self.findElement(taskID);
                    let board_id = findTask.closest('.kanban-board[data-id]').dataset.id;
                    let findTaskJson = self.findTaskJSON(board_id, taskID);
                    let baseBoardJson = self.findBoardJSON(board_id);
                    self.removeTask(baseBoardJson, findTaskJson);
                    findTask.remove();
                    self.addElement(addOption.boardId, findTaskJson, addOption.position);
                }
                this.moveElement = function (targetBoardID, elementID, element) {
                    if (targetBoardID === this.getParentBoardID(elementID)) {
                        return
                    }
                    this.removeElement(elementID)
                    return this.addElement(targetBoardID, element)
                }

                this.replaceElement = function (el, element) {
                    var nodeItem = el
                    if (typeof nodeItem === 'string') {
                        nodeItem = self.element.querySelector('[data-eid="' + el + '"]')
                    }
                    nodeItem.innerHTML = __buildItemCard(element)
                    // add function
                    nodeItem.clickfn = element.click
                    nodeItem.contextfn = element.context
                    nodeItem.dragfn = element.drag
                    nodeItem.dragendfn = element.dragend
                    nodeItem.dropfn = element.drop
                    __appendCustomProperties(nodeItem, element)
                    __onclickHandler(nodeItem)
                    __onSubTaskClickHandler(nodeItem.querySelectorAll('.kanban-sub-item .checkbox'));
                    __onContextHandler(nodeItem)
                    __onHeaderOptionShowHandler(nodeItem);
                    __onHeaderOptionHideHandler(nodeItem);

                    //체크박스 클릭 이벤트
                    nodeItem.querySelector('.checkbox').addEventListener('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        self.options.check(self, this);
                    });
                    //컨텍스트 메뉴(태스크 메뉴) 클릭 이벤트
                    nodeItem.querySelector('.dropright').addEventListener('click', function (e) {
                        let item = this.closest('.kanban-item');
                        item.dispatchEvent(new Event('contextmenu'));
                        e.stopPropagation();
                        e.preventDefault();
                    });
                    return self
                }

                this.findElement = function (id) {
                    var el = self.element.querySelector('[data-eid="' + id + '"]')
                    return el
                }

                this.__createProfileHTML = function (profiles) {
                    let profiles_html = __createProfileHTML(profiles);
                    return profiles_html;
                }

                this.__buildItemSubCardInnerHTML = function (subtasks) {
                    let subtasks_html = __buildItemSubCardInnerHTML(subtasks);
                    return subtasks_html;
                }

                this.__onSubTaskClickHandler = function (nodeItems, clickfn) {
                    __onSubTaskClickHandler(nodeItems);
                }

                this.findBoardJSON = function (board_id) {
                    let board = __findBoardJSON(board_id);
                    return board;
                }

                this.findTaskJSON = function (board_id, task_id) {
                    let board = __findBoardJSON(board_id);
                    let task = board.item.find(function (task) {
                        if (task.id === task_id) {
                            return true;
                        }
                    });
                    return task;
                }

                this.getBoardElements = function (id) {
                    var board = self.element.querySelector(
                        '[data-id="' + id + '"] .kanban-drag'
                    )
                    return board.childNodes
                }

                this.removeElement = function (el) {
                    if (typeof el === 'string')
                        el = self.element.querySelector('[data-eid="' + el + '"]')
                    if (el !== null) {
                        //fallback for IE
                        if (typeof el.remove == 'function') {
                            el.remove()
                        } else {
                            el.parentNode.removeChild(el)
                        }
                    }
                    return self
                }
                this.removeTask = function (board, task) {
                    // remove thboard in options.boards
                    for (var i = 0; i < board.item.length; i++) {
                        if (board.item[i].id === task.id) {
                            board.item.splice(i, 1);
                            break
                        }
                    }
                    return self
                }

                this.removeBoard = function (board) {
                    var boardElement = null
                    if (typeof board === 'string')
                        boardElement = self.element.querySelector('[data-id="' + board + '"]')
                    if (boardElement !== null) {
                        //fallback for IE
                        if (typeof boardElement.remove == 'function') {
                            boardElement.remove()
                        } else {
                            boardElement.parentNode.removeChild(boardElement)
                        }
                    }

                    // remove thboard in options.boards
                    for (var i = 0; i < self.options.boards.length; i++) {
                        if (self.options.boards[i].id === board) {
                            self.options.boards.splice(i, 1)
                            break
                        }
                    }

                    return self
                }

                // board button on click function
                this.onButtonClick = function (el) {
                }

                //PRIVATE FUNCTION
                function __extendDefaults(source, properties) {
                    var property
                    for (property in properties) {
                        if (properties.hasOwnProperty(property)) {
                            source[property] = properties[property]
                        }
                    }
                    return source
                }

                function __setBoard() {
                    self.element = document.querySelector(self.options.element)
                    //create container
                    var boardContainer = document.createElement('div')
                    boardContainer.classList.add('kanban-container')
                    self.container = boardContainer
                    //add boards
                    self.addBoards(self.options.boards, true)
                    //appends to container
                    self.element.appendChild(self.container)
                }

                function __onclickHandler(nodeItem, clickfn) {
                    nodeItem.addEventListener('click', function (e) {
                        if (!self.options.propagationHandlers.includes('click')) e.preventDefault()
                        self.options.click(this)
                        if (typeof this.clickfn === 'function') this.clickfn(this)
                    })
                }

                function __onSubTaskClickHandler(nodeItems, clickfn) {
                    nodeItems.forEach(function (nodeItem) {
                        nodeItem.addEventListener('click', function (e) {
                            if (!self.options.propagationHandlers.includes('click')) e.preventDefault();
                            self.options.subTaskClick(this.closest('.kanban-sub-item'));
                            if (typeof this.clickfn === 'function') this.clickfn(this)
                            e.preventDefault();
                            e.stopPropagation();
                        });
                    });
                }

                function __onHeaderOptionShowHandler(nodeItem) {
                    $(nodeItem.querySelector('.kanban-board-option .dropright')).on('show.bs.dropdown', function (e) {
                        self.options.headerOptionShow(this, e);
                    });
                }

                function __onHeaderOptionHideHandler(nodeItem) {
                    $(nodeItem.querySelector('.kanban-board-option .dropright')).on('hide.bs.dropdown', function (e) {
                        self.options.headerOptionHide(this, e);
                    });
                }

                function __onContextHandler(nodeItem, contextfn) {
                    if (nodeItem.addEventListener) {
                        nodeItem.addEventListener('contextmenu', function (e) {
                            if (!self.options.propagationHandlers.includes('context')) e.preventDefault()
                            self.options.context(this, e)
                            if (typeof this.contextfn === 'function') this.contextfn(this, e)
                        }, false)
                    } else {
                        nodeItem.attachEvent('oncontextmenu', function () {
                            self.options.context(this)
                            if (typeof this.contextfn === 'function') this.contextfn(this)
                            if (!self.options.propagationHandlers.includes('context')) window.event.returnValue = false
                        })
                    }
                }

                function __onAddButtonClickHandler(nodeItem, boardId) {
                    nodeItem.addEventListener('click', function (e) {
                        e.preventDefault();
                        self.options.addTask(this, boardId);
                    });
                }

                function __onUpdateBoardHandler(nodeItem, boardId) {
                    nodeItem.addEventListener('click', function (e) {
                        e.preventDefault();
                        self.options.updateBoard(nodeItem.dataset.type, nodeItem.closest('.kanban-board[data-id]'), boardId)
                    });
                }

                function __onButtonClickHandler(nodeItem, boardId) {
                    nodeItem.addEventListener('click', function (e) {
                        e.preventDefault()
                        self.options.buttonClick(this, boardId)
                        /*if (typeof (this.clickfn) === 'function')
                            this.clickfn(this);*/
                    })
                }

                function __findBoardJSON(id) {
                    var el = []
                    self.options.boards.map(function (board) {
                        if (board.id === id) {
                            return el.push(board)
                        }
                    })
                    return el[0]
                }

                function __appendCustomProperties(element, parentObject) {
                    for (var propertyName in parentObject) {
                        if (self._disallowedItemProperties.indexOf(propertyName) > -1) {
                            continue
                        }

                        element.setAttribute(
                            'data-' + propertyName,
                            parentObject[propertyName]
                        )
                    }
                }

                function __updateBoardsOrder() {
                    var index = 1
                    for (var i = 0; i < self.container.childNodes.length; i++) {
                        self.container.childNodes[i].dataset.order = index++
                    }
                }

                function __buildItemCard(item) {
                    let result = 'title' in item ? item.title : '';

                    if (self.options.itemHandleOptions.enabled) {
                        if ((self.options.itemHandleOptions.customHandler || undefined) === undefined) {
                            var customCssHandler = self.options.itemHandleOptions.customCssHandler
                            var customCssIconHandler = self.options.itemHandleOptions.customCssIconHandler
                            var customItemLayout = self.options.itemHandleOptions.customItemLayout
                            if ((customCssHandler || undefined) === undefined) {
                                customCssHandler = 'drag_handler';
                            }

                            if ((customCssIconHandler || undefined) === undefined) {
                                customCssIconHandler = customCssHandler + '_icon';
                            }

                            if ((customItemLayout || undefined) === undefined) {
                                customItemLayout = '';
                            }

                            result = '<div class=\'item_handle ' + customCssHandler + '\'><i class=\'item_handle ' + customCssIconHandler + '\'></i></div><div>' + result + '</div>'
                        } else {
                            result = '<div> ' + self.options.itemHandleOptions.customHandler.replace(/%([^%]+)%/g, (match, key) => {
                                return item[key] !== undefined ? item[key] : ''
                            }) + ' </div>'
                            return result
                        }
                        return result
                    } else {
                        let element = __buildItemCardInnerHTML(item);
                        return element;
                    }
                }

                function __createSubTasksHTML(subtasks) {
                    if (subtasks !== null && subtasks !== undefined && subtasks != 0) {
                        return `<div class="sub-task-count">
                              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.6 2.8V2H0.8V6H5.6V5.2C5.6 5.09391 5.64214 4.99217 5.71716 4.91716C5.79217 4.84214 5.89391 4.8 6 4.8H7.0344C7.14048 4.80002 7.2422 4.84218 7.3172 4.9172L7.8828 5.4828C7.95782 5.5578 7.99998 5.65952 8 5.7656V7.6C8 7.70609 7.95786 7.80783 7.88284 7.88284C7.80783 7.95786 7.70609 8 7.6 8H6C5.89391 8 5.79217 7.95786 5.71716 7.88284C5.64214 7.80783 5.6 7.70609 5.6 7.6V6.8H0.4C0.293913 6.8 0.192172 6.75786 0.117157 6.68284C0.0421427 6.60783 0 6.50609 0 6.4V0.4C0 0.293913 0.0421427 0.192172 0.117157 0.117157C0.192172 0.0421427 0.293913 0 0.4 0C0.506087 0 0.607828 0.0421427 0.682843 0.117157C0.757857 0.192172 0.8 0.293913 0.8 0.4V1.2H5.6V0.4C5.6 0.293913 5.64214 0.192172 5.71716 0.117157C5.79217 0.0421427 5.89391 0 6 0H7.0344C7.14048 2.2655e-05 7.2422 0.0421802 7.3172 0.1172L7.8828 0.6828C7.95782 0.757797 7.99998 0.859522 8 0.9656V2.8C8 2.90609 7.95786 3.00783 7.88284 3.08284C7.80783 3.15786 7.70609 3.2 7.6 3.2H6C5.89391 3.2 5.79217 3.15786 5.71716 3.08284C5.64214 3.00783 5.6 2.90609 5.6 2.8Z" fill="#222222"/>
                              </svg>
                              <span class="_count">${subtasks}</span>
                            </div>`;
                    } else {
                        return `<div class="sub-task-count">
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.6 2.8V2H0.8V6H5.6V5.2C5.6 5.09391 5.64214 4.99217 5.71716 4.91716C5.79217 4.84214 5.89391 4.8 6 4.8H7.0344C7.14048 4.80002 7.2422 4.84218 7.3172 4.9172L7.8828 5.4828C7.95782 5.5578 7.99998 5.65952 8 5.7656V7.6C8 7.70609 7.95786 7.80783 7.88284 7.88284C7.80783 7.95786 7.70609 8 7.6 8H6C5.89391 8 5.79217 7.95786 5.71716 7.88284C5.64214 7.80783 5.6 7.70609 5.6 7.6V6.8H0.4C0.293913 6.8 0.192172 6.75786 0.117157 6.68284C0.0421427 6.60783 0 6.50609 0 6.4V0.4C0 0.293913 0.0421427 0.192172 0.117157 0.117157C0.192172 0.0421427 0.293913 0 0.4 0C0.506087 0 0.607828 0.0421427 0.682843 0.117157C0.757857 0.192172 0.8 0.293913 0.8 0.4V1.2H5.6V0.4C5.6 0.293913 5.64214 0.192172 5.71716 0.117157C5.79217 0.0421427 5.89391 0 6 0H7.0344C7.14048 2.2655e-05 7.2422 0.0421802 7.3172 0.1172L7.8828 0.6828C7.95782 0.757797 7.99998 0.859522 8 0.9656V2.8C8 2.90609 7.95786 3.00783 7.88284 3.08284C7.80783 3.15786 7.70609 3.2 7.6 3.2H6C5.89391 3.2 5.79217 3.15786 5.71716 3.08284C5.64214 3.00783 5.6 2.90609 5.6 2.8Z" fill="#222222"/>
                              </svg>
                              <span class="_count">0</span>
                              </div>`;
                    }
                }

                function __createProfileHTML(profiles) {
                    let profiles_html = '';
                    profiles.forEach(function (profile, index) {
                        if (index <= 4) {
                            if (index === 0) {
                                profiles_html += `<img data-toggle="tooltip" data-placement="bottom" title="${profile.name}" style="left: 0px;" src="${profile.url}" data-label="${profile.name}">`;
                            } else {
                                profiles_html += `<img data-toggle="tooltip" data-placement="bottom" title="${profile.name}" style="left: ${index * 32}px;" src="${profile.url}" data-label="${profile.name}">`;
                            }
                        }
                    });
                    return profiles_html;
                }

                function __buildItemSubCardInnerHTML(items) {
                    let container = document.createElement('div');
                    container.classList.add('kanban-sub-item-container');
                    container.style.display = 'none';
                    items?.forEach(function (item) {
                        $(container).append(`<div class="kanban-sub-item ${item.complete === true ? 'active' : ''}"
                                                  data-id="${item.id}">
                                               <span class="_title">${item.title}</span>
                                               <span class="checkbox"><i class="fas fa-check" aria-hidden="true"></i></span>
                                             </div>`);
                    });
                    return container.outerHTML;
                }

                function __buildItemCardInnerHTML(item) {
                    // console.log(JSON.stringify(item));
                    if (item.cover !== undefined && item.cover !== null) {
                        return `<div class="kanban-item-cover" style="background-image: url('${item.cover.url}')"></div><div class="kanban-item-title">
                                <h6 class="title" data-toggle="tooltip" data-placement="bottom" title="${item.title}">${item.title}</h6>
                            </div>
                            <div class="kanban-item-task-info">
                                <div class="left">
                                    ${__createProfileHTML(item.profiles)}
                                </div>
                                <div class="right text-right">
                                  ${__createSubTasksHTML(item.subtasks !== undefined && item.subtasks !== null ? item.subtasks.length : void (0))}
                                  <span class="time">${item.start_date !== undefined && item.start_date !== null ? item.end_date !== undefined && item.end_date !== null ? item.start_date.substring(2) + ' ~ ' + item.end_date.substring(2) : item.start_date.substring(2) + ' ~ ' + '종료 날짜 미지정' : item.end_date !== undefined && item.end_date !== null ? '시작 날짜 미지정' + ' ~ ' + item.end_date.substring(2) : '날짜 미지정'}</span>
                                </div>
                            </div>
                            <div class="btn-group dropright">
                              <div>
                                <img class="img-fluid"
                                     src="/resources/assets/images/icon/board_options.svg">
                              </div>
                            </div>
                            <span class="checkbox ${item.complete ? 'active' : ''}"><i class="fas fa-check" aria-hidden="true"></i></span>
                            ${__buildItemSubCardInnerHTML(item.subtasks)}`;
                    } else {
                        return `<div class="kanban-item-title">
                                <h6 class="title" data-toggle="tooltip" data-placement="bottom" title="${item.title}">${item.title}</h6>
                            </div>
                            <div class="kanban-item-task-info">
                                <div class="left">
                                    ${__createProfileHTML(item.profiles)}
                                </div>
                                <div class="right text-right">
                                  ${__createSubTasksHTML(item.subtasks !== undefined && item.subtasks !== null ? item.subtasks.length : void (0))}
                                  <span class="time">${item.start_date !== undefined && item.start_date !== null ? item.end_date !== undefined && item.end_date !== null ? item.start_date.substring(2) + ' ~ ' + item.end_date.substring(2) : item.start_date.substring(2) + ' ~ ' + '종료 날짜 미지정' : item.end_date !== undefined && item.end_date !== null ? '시작 날짜 미지정' + ' ~ ' + item.end_date.substring(2) : '날짜 미지정'}</span>
                                </div>
                            </div>
                            <div class="btn-group dropright">
                              <div>
                                <img class="img-fluid"
                                     src="/resources/assets/images/icon/board_options.svg">
                              </div>
                            </div>
                            <span class="checkbox ${item.complete ? 'active' : ''}"><i class="fas fa-check" aria-hidden="true"></i></span>
                            ${__buildItemSubCardInnerHTML(item.subtasks)}`;
                    }
                }

                //init plugin
                this.init()
            }
        })()

    }, {"dragula": 9}], 2: [function (require, module, exports) {
        module.exports = function atoa(a, n) {
            return Array.prototype.slice.call(a, n);
        }

    }, {}], 3: [function (require, module, exports) {
        'use strict';

        var ticky = require('ticky');

        module.exports = function debounce(fn, args, ctx) {
            if (!fn) {
                return;
            }
            ticky(function run() {
                fn.apply(ctx || null, args || []);
            });
        };

    }, {"ticky": 11}], 4: [function (require, module, exports) {
        'use strict';

        var atoa = require('atoa');
        var debounce = require('./debounce');

        module.exports = function emitter(thing, options) {
            var opts = options || {};
            var evt = {};
            if (thing === undefined) {
                thing = {};
            }
            thing.on = function (type, fn) {
                if (!evt[type]) {
                    evt[type] = [fn];
                } else {
                    evt[type].push(fn);
                }
                return thing;
            };
            thing.once = function (type, fn) {
                fn._once = true; // thing.off(fn) still works!
                thing.on(type, fn);
                return thing;
            };
            thing.off = function (type, fn) {
                var c = arguments.length;
                if (c === 1) {
                    delete evt[type];
                } else if (c === 0) {
                    evt = {};
                } else {
                    var et = evt[type];
                    if (!et) {
                        return thing;
                    }
                    et.splice(et.indexOf(fn), 1);
                }
                return thing;
            };
            thing.emit = function () {
                var args = atoa(arguments);
                return thing.emitterSnapshot(args.shift()).apply(this, args);
            };
            thing.emitterSnapshot = function (type) {
                var et = (evt[type] || []).slice(0);
                return function () {
                    var args = atoa(arguments);
                    var ctx = this || thing;
                    if (type === 'error' && opts.throws !== false && !et.length) {
                        throw args.length === 1 ? args[0] : args;
                    }
                    et.forEach(function emitter(listen) {
                        if (opts.async) {
                            debounce(listen, args, ctx);
                        } else {
                            listen.apply(ctx, args);
                        }
                        if (listen._once) {
                            thing.off(type, listen);
                        }
                    });
                    return thing;
                };
            };
            return thing;
        };

    }, {"./debounce": 3, "atoa": 2}], 5: [function (require, module, exports) {
        (function (global) {
            (function () {
                'use strict';

                var customEvent = require('custom-event');
                var eventmap = require('./eventmap');
                var doc = global.document;
                var addEvent = addEventEasy;
                var removeEvent = removeEventEasy;
                var hardCache = [];

                if (!global.addEventListener) {
                    addEvent = addEventHard;
                    removeEvent = removeEventHard;
                }

                module.exports = {
                    add: addEvent,
                    remove: removeEvent,
                    fabricate: fabricateEvent
                };

                function addEventEasy(el, type, fn, capturing) {
                    return el.addEventListener(type, fn, capturing);
                }

                function addEventHard(el, type, fn) {
                    return el.attachEvent('on' + type, wrap(el, type, fn));
                }

                function removeEventEasy(el, type, fn, capturing) {
                    return el.removeEventListener(type, fn, capturing);
                }

                function removeEventHard(el, type, fn) {
                    var listener = unwrap(el, type, fn);
                    if (listener) {
                        return el.detachEvent('on' + type, listener);
                    }
                }

                function fabricateEvent(el, type, model) {
                    var e = eventmap.indexOf(type) === -1 ? makeCustomEvent() : makeClassicEvent();
                    if (el.dispatchEvent) {
                        el.dispatchEvent(e);
                    } else {
                        el.fireEvent('on' + type, e);
                    }

                    function makeClassicEvent() {
                        var e;
                        if (doc.createEvent) {
                            e = doc.createEvent('Event');
                            e.initEvent(type, true, true);
                        } else if (doc.createEventObject) {
                            e = doc.createEventObject();
                        }
                        return e;
                    }

                    function makeCustomEvent() {
                        return new customEvent(type, {detail: model});
                    }
                }

                function wrapperFactory(el, type, fn) {
                    return function wrapper(originalEvent) {
                        var e = originalEvent || global.event;
                        e.target = e.target || e.srcElement;
                        e.preventDefault = e.preventDefault || function preventDefault() {
                            e.returnValue = false;
                        };
                        e.stopPropagation = e.stopPropagation || function stopPropagation() {
                            e.cancelBubble = true;
                        };
                        e.which = e.which || e.keyCode;
                        fn.call(el, e);
                    };
                }

                function wrap(el, type, fn) {
                    var wrapper = unwrap(el, type, fn) || wrapperFactory(el, type, fn);
                    hardCache.push({
                        wrapper: wrapper,
                        element: el,
                        type: type,
                        fn: fn
                    });
                    return wrapper;
                }

                function unwrap(el, type, fn) {
                    var i = find(el, type, fn);
                    if (i) {
                        var wrapper = hardCache[i].wrapper;
                        hardCache.splice(i, 1); // free up a tad of memory
                        return wrapper;
                    }
                }

                function find(el, type, fn) {
                    var i, item;
                    for (i = 0; i < hardCache.length; i++) {
                        item = hardCache[i];
                        if (item.element === el && item.type === type && item.fn === fn) {
                            return i;
                        }
                    }
                }

            }).call(this)
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {"./eventmap": 6, "custom-event": 7}], 6: [function (require, module, exports) {
        (function (global) {
            (function () {
                'use strict';

                var eventmap = [];
                var eventname = '';
                var ron = /^on/;

                for (eventname in global) {
                    if (ron.test(eventname)) {
                        eventmap.push(eventname.slice(2));
                    }
                }

                module.exports = eventmap;

            }).call(this)
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}], 7: [function (require, module, exports) {
        (function (global) {
            (function () {

                var NativeCustomEvent = global.CustomEvent;

                function useNative() {
                    try {
                        var p = new NativeCustomEvent('cat', {detail: {foo: 'bar'}});
                        return 'cat' === p.type && 'bar' === p.detail.foo;
                    } catch (e) {
                    }
                    return false;
                }

                /**
                 * Cross-browser `CustomEvent` constructor.
                 *
                 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
                 *
                 * @public
                 */

                module.exports = useNative() ? NativeCustomEvent :

                    // IE >= 9
                    'undefined' !== typeof document && 'function' === typeof document.createEvent ? function CustomEvent(type, params) {
                            var e = document.createEvent('CustomEvent');
                            if (params) {
                                e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
                            } else {
                                e.initCustomEvent(type, false, false, void 0);
                            }
                            return e;
                        } :

                        // IE <= 8
                        function CustomEvent(type, params) {
                            var e = document.createEventObject();
                            e.type = type;
                            if (params) {
                                e.bubbles = Boolean(params.bubbles);
                                e.cancelable = Boolean(params.cancelable);
                                e.detail = params.detail;
                            } else {
                                e.bubbles = false;
                                e.cancelable = false;
                                e.detail = void 0;
                            }
                            return e;
                        }

            }).call(this)
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}], 8: [function (require, module, exports) {
        'use strict';

        var cache = {};
        var start = '(?:^|\\s)';
        var end = '(?:\\s|$)';

        function lookupClass(className) {
            var cached = cache[className];
            if (cached) {
                cached.lastIndex = 0;
            } else {
                cache[className] = cached = new RegExp(start + className + end, 'g');
            }
            return cached;
        }

        function addClass(el, className) {
            var current = el.className;
            if (!current.length) {
                el.className = className;
            } else if (!lookupClass(className).test(current)) {
                el.className += ' ' + className;
            }
        }

        function rmClass(el, className) {
            el.className = el.className.replace(lookupClass(className), ' ').trim();
        }

        module.exports = {
            add: addClass,
            rm: rmClass
        };

    }, {}], 9: [function (require, module, exports) {
        (function (global) {
            (function () {
                'use strict';

                var emitter = require('contra/emitter');
                var crossvent = require('crossvent');
                var classes = require('./classes');
                var doc = document;
                var documentElement = doc.documentElement;

                function dragula(initialContainers, options) {
                    var len = arguments.length;
                    if (len === 1 && Array.isArray(initialContainers) === false) {
                        options = initialContainers;
                        initialContainers = [];
                    }
                    var _mirror; // mirror image
                    var _source; // source container
                    var _item; // item being dragged
                    var _offsetX; // reference x
                    var _offsetY; // reference y
                    var _moveX; // reference move x
                    var _moveY; // reference move y
                    var _initialSibling; // reference sibling when grabbed
                    var _currentSibling; // reference sibling now
                    var _copy; // item used for copying
                    var _renderTimer; // timer for setTimeout renderMirrorImage
                    var _lastDropTarget = null; // last container item was over
                    var _grabbed; // holds mousedown context until first mousemove

                    var o = options || {};
                    if (o.moves === void 0) {
                        o.moves = always;
                    }
                    if (o.accepts === void 0) {
                        o.accepts = always;
                    }
                    if (o.invalid === void 0) {
                        o.invalid = invalidTarget;
                    }
                    if (o.containers === void 0) {
                        o.containers = initialContainers || [];
                    }
                    if (o.isContainer === void 0) {
                        o.isContainer = never;
                    }
                    if (o.copy === void 0) {
                        o.copy = false;
                    }
                    if (o.copySortSource === void 0) {
                        o.copySortSource = false;
                    }
                    if (o.revertOnSpill === void 0) {
                        o.revertOnSpill = false;
                    }
                    if (o.removeOnSpill === void 0) {
                        o.removeOnSpill = false;
                    }
                    if (o.direction === void 0) {
                        o.direction = 'vertical';
                    }
                    if (o.ignoreInputTextSelection === void 0) {
                        o.ignoreInputTextSelection = true;
                    }
                    if (o.mirrorContainer === void 0) {
                        o.mirrorContainer = doc.body;
                    }

                    var drake = emitter({
                        containers: o.containers,
                        start: manualStart,
                        end: end,
                        cancel: cancel,
                        remove: remove,
                        destroy: destroy,
                        canMove: canMove,
                        dragging: false
                    });

                    if (o.removeOnSpill === true) {
                        drake.on('over', spillOver).on('out', spillOut);
                    }

                    events();

                    return drake;

                    function isContainer(el) {
                        return drake.containers.indexOf(el) !== -1 || o.isContainer(el);
                    }

                    function events(remove) {
                        var op = remove ? 'remove' : 'add';
                        touchy(documentElement, op, 'mousedown', grab);
                        touchy(documentElement, op, 'mouseup', release);
                    }

                    function eventualMovements(remove) {
                        var op = remove ? 'remove' : 'add';
                        touchy(documentElement, op, 'mousemove', startBecauseMouseMoved);
                    }

                    function movements(remove) {
                        var op = remove ? 'remove' : 'add';
                        crossvent[op](documentElement, 'selectstart', preventGrabbed); // IE8
                        crossvent[op](documentElement, 'click', preventGrabbed);
                    }

                    function destroy() {
                        events(true);
                        release({});
                    }

                    function preventGrabbed(e) {
                        if (_grabbed) {
                            e.preventDefault();
                        }
                    }

                    function grab(e) {
                        _moveX = e.clientX;
                        _moveY = e.clientY;
                        var ignore = whichMouseButton(e) !== 1 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey;
                        if (ignore) {
                            return; // we only care about honest-to-god left clicks and touch events
                        }
                        var item = e.target;
                        var context = canStart(item);
                        if (!context) {
                            return;
                        }
                        _grabbed = context;
                        eventualMovements();
                        if (e.type === 'mousedown') {
                            if (isInput(item)) { // see also: https://github.com/bevacqua/dragula/issues/208
                                item.focus(); // fixes https://github.com/bevacqua/dragula/issues/176
                            } else {
                                e.preventDefault(); // fixes https://github.com/bevacqua/dragula/issues/155
                            }
                        }
                    }

                    function startBecauseMouseMoved(e) {
                        if (!_grabbed) {
                            return;
                        }
                        if (whichMouseButton(e) === 0) {
                            release({});
                            return; // when text is selected on an input and then dragged, mouseup doesn't fire. this is our only hope
                        }

                        // truthy check fixes #239, equality fixes #207, fixes #501
                        if ((e.clientX !== void 0 && Math.abs(e.clientX - _moveX) <= (o.slideFactorX || 0)) &&
                            (e.clientY !== void 0 && Math.abs(e.clientY - _moveY) <= (o.slideFactorY || 0))) {
                            return;
                        }

                        if (o.ignoreInputTextSelection) {
                            var clientX = getCoord('clientX', e) || 0;
                            var clientY = getCoord('clientY', e) || 0;
                            var elementBehindCursor = doc.elementFromPoint(clientX, clientY);
                            if (isInput(elementBehindCursor)) {
                                return;
                            }
                        }

                        var grabbed = _grabbed; // call to end() unsets _grabbed
                        eventualMovements(true);
                        movements();
                        end();
                        start(grabbed);

                        var offset = getOffset(_item);
                        _offsetX = getCoord('pageX', e) - offset.left;
                        _offsetY = getCoord('pageY', e) - offset.top;

                        classes.add(_copy || _item, 'gu-transit');
                        renderMirrorImage();
                        drag(e);
                    }

                    function canStart(item) {
                        if (drake.dragging && _mirror) {
                            return;
                        }
                        if (isContainer(item)) {
                            return; // don't drag container itself
                        }
                        var handle = item;
                        while (getParent(item) && isContainer(getParent(item)) === false) {
                            if (o.invalid(item, handle)) {
                                return;
                            }
                            item = getParent(item); // drag target should be a top element
                            if (!item) {
                                return;
                            }
                        }
                        var source = getParent(item);
                        if (!source) {
                            return;
                        }
                        if (o.invalid(item, handle)) {
                            return;
                        }

                        var movable = o.moves(item, source, handle, nextEl(item));
                        if (!movable) {
                            return;
                        }

                        return {
                            item: item,
                            source: source
                        };
                    }

                    function canMove(item) {
                        return !!canStart(item);
                    }

                    function manualStart(item) {
                        var context = canStart(item);
                        if (context) {
                            start(context);
                        }
                    }

                    function start(context) {
                        if (isCopy(context.item, context.source)) {
                            _copy = context.item.cloneNode(true);
                            drake.emit('cloned', _copy, context.item, 'copy');
                        }

                        _source = context.source;
                        _item = context.item;
                        _initialSibling = _currentSibling = nextEl(context.item);

                        drake.dragging = true;
                        drake.emit('drag', _item, _source);
                    }

                    function invalidTarget() {
                        return false;
                    }

                    function end() {
                        if (!drake.dragging) {
                            return;
                        }
                        var item = _copy || _item;
                        drop(item, getParent(item));
                    }

                    function ungrab() {
                        _grabbed = false;
                        eventualMovements(true);
                        movements(true);
                    }

                    function release(e) {
                        ungrab();

                        if (!drake.dragging) {
                            return;
                        }
                        var item = _copy || _item;
                        var clientX = getCoord('clientX', e) || 0;
                        var clientY = getCoord('clientY', e) || 0;
                        var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
                        var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
                        if (dropTarget && ((_copy && o.copySortSource) || (!_copy || dropTarget !== _source))) {
                            drop(item, dropTarget);
                        } else if (o.removeOnSpill) {
                            remove();
                        } else {
                            cancel();
                        }
                    }

                    function drop(item, target) {
                        var parent = getParent(item);
                        if (_copy && o.copySortSource && target === _source) {
                            parent.removeChild(_item);
                        }
                        if (isInitialPlacement(target)) {
                            drake.emit('cancel', item, _source, _source);
                        } else {
                            drake.emit('drop', item, target, _source, _currentSibling);
                        }
                        cleanup();
                    }

                    function remove() {
                        if (!drake.dragging) {
                            return;
                        }
                        var item = _copy || _item;
                        var parent = getParent(item);
                        if (parent) {
                            parent.removeChild(item);
                        }
                        drake.emit(_copy ? 'cancel' : 'remove', item, parent, _source);
                        cleanup();
                    }

                    function cancel(revert) {
                        if (!drake.dragging) {
                            return;
                        }
                        var reverts = arguments.length > 0 ? revert : o.revertOnSpill;
                        var item = _copy || _item;
                        var parent = getParent(item);
                        var initial = isInitialPlacement(parent);
                        if (initial === false && reverts) {
                            if (_copy) {
                                if (parent) {
                                    parent.removeChild(_copy);
                                }
                            } else {
                                _source.insertBefore(item, _initialSibling);
                            }
                        }
                        if (initial || reverts) {
                            drake.emit('cancel', item, _source, _source);
                        } else {
                            drake.emit('drop', item, parent, _source, _currentSibling);
                        }
                        cleanup();
                    }

                    function cleanup() {
                        var item = _copy || _item;
                        ungrab();
                        removeMirrorImage();
                        if (item) {
                            classes.rm(item, 'gu-transit');
                        }
                        if (_renderTimer) {
                            clearTimeout(_renderTimer);
                        }
                        drake.dragging = false;
                        if (_lastDropTarget) {
                            drake.emit('out', item, _lastDropTarget, _source);
                        }
                        drake.emit('dragend', item);
                        _source = _item = _copy = _initialSibling = _currentSibling = _renderTimer = _lastDropTarget = null;
                    }

                    function isInitialPlacement(target, s) {
                        var sibling;
                        if (s !== void 0) {
                            sibling = s;
                        } else if (_mirror) {
                            sibling = _currentSibling;
                        } else {
                            sibling = nextEl(_copy || _item);
                        }
                        return target === _source && sibling === _initialSibling;
                    }

                    function findDropTarget(elementBehindCursor, clientX, clientY) {
                        var target = elementBehindCursor;
                        while (target && !accepted()) {
                            target = getParent(target);
                        }
                        return target;

                        function accepted() {
                            var droppable = isContainer(target);
                            if (droppable === false) {
                                return false;
                            }

                            var immediate = getImmediateChild(target, elementBehindCursor);
                            var reference = getReference(target, immediate, clientX, clientY);
                            var initial = isInitialPlacement(target, reference);
                            if (initial) {
                                return true; // should always be able to drop it right back where it was
                            }
                            return o.accepts(_item, target, _source, reference);
                        }
                    }

                    function drag(e) {
                        if (!_mirror) {
                            return;
                        }
                        e.preventDefault();

                        var clientX = getCoord('clientX', e) || 0;
                        var clientY = getCoord('clientY', e) || 0;
                        var x = clientX - _offsetX;
                        var y = clientY - _offsetY;

                        _mirror.style.left = x + 'px';
                        _mirror.style.top = y + 'px';

                        var item = _copy || _item;
                        var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
                        var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
                        var changed = dropTarget !== null && dropTarget !== _lastDropTarget;
                        if (changed || dropTarget === null) {
                            out();
                            _lastDropTarget = dropTarget;
                            over();
                        }

                        var parent = getParent(item);
                        if (dropTarget === _source && _copy && !o.copySortSource) {
                            if (parent) {
                                parent.removeChild(item);
                            }
                            return;
                        }
                        var reference;
                        var immediate = getImmediateChild(dropTarget, elementBehindCursor);
                        if (immediate !== null) {
                            reference = getReference(dropTarget, immediate, clientX, clientY);
                        } else if (o.revertOnSpill === true && !_copy) {
                            reference = _initialSibling;
                            dropTarget = _source;
                        } else {
                            if (_copy && parent) {
                                parent.removeChild(item);
                            }
                            return;
                        }
                        if (
                            (reference === null && changed) ||
                            reference !== item &&
                            reference !== nextEl(item)
                        ) {
                            _currentSibling = reference;
                            if (reference !== null && reference !== undefined) {
                                dropTarget.insertBefore(item, reference);
                                drake.emit('shadow', item, dropTarget, _source);
                            } else {
                                //reference null cancel
                                /*reference = dropTarget.querySelector('footer');
                                dropTarget.insertBefore(item, reference);
                                drake.emit('shadow', item, dropTarget, _source);*/
                            }
                        }

                        function moved(type) {
                            drake.emit(type, item, _lastDropTarget, _source);
                        }

                        function over() {
                            if (changed) {
                                moved('over');
                            }
                        }

                        function out() {
                            if (_lastDropTarget) {
                                moved('out');
                            }
                        }
                    }

                    function spillOver(el) {
                        classes.rm(el, 'gu-hide');
                    }

                    function spillOut(el) {
                        if (drake.dragging) {
                            classes.add(el, 'gu-hide');
                        }
                    }

                    function renderMirrorImage() {
                        if (_mirror) {
                            return;
                        }
                        var rect = _item.getBoundingClientRect();
                        _mirror = _item.cloneNode(true);
                        _mirror.style.width = getRectWidth(rect) + 'px';
                        _mirror.style.height = getRectHeight(rect) + 'px';
                        classes.rm(_mirror, 'gu-transit');
                        classes.add(_mirror, 'gu-mirror');
                        o.mirrorContainer.appendChild(_mirror);
                        touchy(documentElement, 'add', 'mousemove', drag);
                        classes.add(o.mirrorContainer, 'gu-unselectable');
                        drake.emit('cloned', _mirror, _item, 'mirror');
                    }

                    function removeMirrorImage() {
                        if (_mirror) {
                            classes.rm(o.mirrorContainer, 'gu-unselectable');
                            touchy(documentElement, 'remove', 'mousemove', drag);
                            getParent(_mirror).removeChild(_mirror);
                            _mirror = null;
                        }
                    }

                    function getImmediateChild(dropTarget, target) {
                        var immediate = target;
                        while (immediate !== dropTarget && getParent(immediate) !== dropTarget) {
                            immediate = getParent(immediate);
                        }
                        if (immediate === documentElement) {
                            return null;
                        }
                        return immediate;
                    }

                    function getReference(dropTarget, target, x, y) {
                        var horizontal = o.direction === 'horizontal';
                        var reference = target !== dropTarget ? inside() : outside();
                        return reference;

                        function outside() { // slower, but able to figure out any position
                            var len = dropTarget.children.length;
                            var i;
                            var el;
                            var rect;
                            for (i = 0; i < len; i++) {
                                el = dropTarget.children[i];
                                rect = el.getBoundingClientRect();
                                if (horizontal && (rect.left + rect.width / 2) > x) {
                                    return el;
                                }
                                if (!horizontal && (rect.top + rect.height / 2) > y) {
                                    return el;
                                }
                            }
                            return null;
                        }

                        function inside() { // faster, but only available if dropped inside a child element
                            var rect = target.getBoundingClientRect();
                            if (horizontal) {
                                return resolve(x > rect.left + getRectWidth(rect) / 2);
                            }
                            return resolve(y > rect.top + getRectHeight(rect) / 2);
                        }

                        function resolve(after) {
                            return after ? nextEl(target) : target;
                        }
                    }

                    function isCopy(item, container) {
                        return typeof o.copy === 'boolean' ? o.copy : o.copy(item, container);
                    }
                }

                function touchy(el, op, type, fn) {
                    var touch = {
                        mouseup: 'touchend',
                        mousedown: 'touchstart',
                        mousemove: 'touchmove'
                    };
                    var pointers = {
                        mouseup: 'pointerup',
                        mousedown: 'pointerdown',
                        mousemove: 'pointermove'
                    };
                    var microsoft = {
                        mouseup: 'MSPointerUp',
                        mousedown: 'MSPointerDown',
                        mousemove: 'MSPointerMove'
                    };
                    if (global.navigator.pointerEnabled) {
                        crossvent[op](el, pointers[type], fn);
                    } else if (global.navigator.msPointerEnabled) {
                        crossvent[op](el, microsoft[type], fn);
                    } else {
                        crossvent[op](el, touch[type], fn);
                        crossvent[op](el, type, fn);
                    }
                }

                function whichMouseButton(e) {
                    if (e.touches !== void 0) {
                        return e.touches.length;
                    }
                    if (e.which !== void 0 && e.which !== 0) {
                        return e.which;
                    } // see https://github.com/bevacqua/dragula/issues/261
                    if (e.buttons !== void 0) {
                        return e.buttons;
                    }
                    var button = e.button;
                    if (button !== void 0) { // see https://github.com/jquery/jquery/blob/99e8ff1baa7ae341e94bb89c3e84570c7c3ad9ea/src/event.js#L573-L575
                        return button & 1 ? 1 : button & 2 ? 3 : (button & 4 ? 2 : 0);
                    }
                }

                function getOffset(el) {
                    var rect = el.getBoundingClientRect();
                    return {
                        left: rect.left + getScroll('scrollLeft', 'pageXOffset'),
                        top: rect.top + getScroll('scrollTop', 'pageYOffset')
                    };
                }

                function getScroll(scrollProp, offsetProp) {
                    if (typeof global[offsetProp] !== 'undefined') {
                        return global[offsetProp];
                    }
                    if (documentElement.clientHeight) {
                        return documentElement[scrollProp];
                    }
                    return doc.body[scrollProp];
                }

                function getElementBehindPoint(point, x, y) {
                    point = point || {};
                    var state = point.className || '';
                    var el;
                    point.className += ' gu-hide';
                    el = doc.elementFromPoint(x, y);
                    point.className = state;
                    return el;
                }

                function never() {
                    return false;
                }

                function always() {
                    return true;
                }

                function getRectWidth(rect) {
                    return rect.width || (rect.right - rect.left);
                }

                function getRectHeight(rect) {
                    return rect.height || (rect.bottom - rect.top);
                }

                function getParent(el) {
                    return el.parentNode === doc ? null : el.parentNode;
                }

                function isInput(el) {
                    return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || isEditable(el);
                }

                function isEditable(el) {
                    if (!el) {
                        return false;
                    } // no parents were editable
                    if (el.contentEditable === 'false') {
                        return false;
                    } // stop the lookup
                    if (el.contentEditable === 'true') {
                        return true;
                    } // found a contentEditable element in the chain
                    return isEditable(getParent(el)); // contentEditable is set to 'inherit'
                }

                function nextEl(el) {
                    return el.nextElementSibling || manually();

                    function manually() {
                        var sibling = el;
                        do {
                            sibling = sibling.nextSibling;
                        } while (sibling && sibling.nodeType !== 1);
                        return sibling;
                    }
                }

                function getEventHost(e) {
                    // on touchend event, we have to use `e.changedTouches`
                    // see http://stackoverflow.com/questions/7192563/touchend-event-properties
                    // see https://github.com/bevacqua/dragula/issues/34
                    if (e.targetTouches && e.targetTouches.length) {
                        return e.targetTouches[0];
                    }
                    if (e.changedTouches && e.changedTouches.length) {
                        return e.changedTouches[0];
                    }
                    return e;
                }

                function getCoord(coord, e) {
                    var host = getEventHost(e);
                    var missMap = {
                        pageX: 'clientX', // IE8
                        pageY: 'clientY' // IE8
                    };
                    if (coord in missMap && !(coord in host) && missMap[coord] in host) {
                        coord = missMap[coord];
                    }
                    return host[coord];
                }

                module.exports = dragula;

            }).call(this)
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {"./classes": 8, "contra/emitter": 4, "crossvent": 5}], 10: [function (require, module, exports) {
// shim for using process in browser
        var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

        var cachedSetTimeout;
        var cachedClearTimeout;

        function defaultSetTimout() {
            throw new Error('setTimeout has not been defined');
        }

        function defaultClearTimeout() {
            throw new Error('clearTimeout has not been defined');
        }

        (function () {
            try {
                if (typeof setTimeout === 'function') {
                    cachedSetTimeout = setTimeout;
                } else {
                    cachedSetTimeout = defaultSetTimout;
                }
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                if (typeof clearTimeout === 'function') {
                    cachedClearTimeout = clearTimeout;
                } else {
                    cachedClearTimeout = defaultClearTimeout;
                }
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        }())

        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) {
                //normal enviroments in sane situations
                return setTimeout(fun, 0);
            }
            // if setTimeout wasn't available but was latter defined
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                cachedSetTimeout = setTimeout;
                return setTimeout(fun, 0);
            }
            try {
                // when when somebody has screwed with setTimeout but no I.E. maddness
                return cachedSetTimeout(fun, 0);
            } catch (e) {
                try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                    return cachedSetTimeout.call(null, fun, 0);
                } catch (e) {
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }


        }

        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) {
                //normal enviroments in sane situations
                return clearTimeout(marker);
            }
            // if clearTimeout wasn't available but was latter defined
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                cachedClearTimeout = clearTimeout;
                return clearTimeout(marker);
            }
            try {
                // when when somebody has screwed with setTimeout but no I.E. maddness
                return cachedClearTimeout(marker);
            } catch (e) {
                try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                    return cachedClearTimeout.call(null, marker);
                } catch (e) {
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                    // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                    return cachedClearTimeout.call(this, marker);
                }
            }


        }

        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;

        function cleanUpNextTick() {
            if (!draining || !currentQueue) {
                return;
            }
            draining = false;
            if (currentQueue.length) {
                queue = currentQueue.concat(queue);
            } else {
                queueIndex = -1;
            }
            if (queue.length) {
                drainQueue();
            }
        }

        function drainQueue() {
            if (draining) {
                return;
            }
            var timeout = runTimeout(cleanUpNextTick);
            draining = true;

            var len = queue.length;
            while (len) {
                currentQueue = queue;
                queue = [];
                while (++queueIndex < len) {
                    if (currentQueue) {
                        currentQueue[queueIndex].run();
                    }
                }
                queueIndex = -1;
                len = queue.length;
            }
            currentQueue = null;
            draining = false;
            runClearTimeout(timeout);
        }

        process.nextTick = function (fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) {
                for (var i = 1; i < arguments.length; i++) {
                    args[i - 1] = arguments[i];
                }
            }
            queue.push(new Item(fun, args));
            if (queue.length === 1 && !draining) {
                runTimeout(drainQueue);
            }
        };

// v8 likes predictible objects
        function Item(fun, array) {
            this.fun = fun;
            this.array = array;
        }

        Item.prototype.run = function () {
            this.fun.apply(null, this.array);
        };
        process.title = 'browser';
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = ''; // empty string to avoid regexp issues
        process.versions = {};

        function noop() {
        }

        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.prependListener = noop;
        process.prependOnceListener = noop;

        process.listeners = function (name) {
            return []
        }

        process.binding = function (name) {
            throw new Error('process.binding is not supported');
        };

        process.cwd = function () {
            return '/'
        };
        process.chdir = function (dir) {
            throw new Error('process.chdir is not supported');
        };
        process.umask = function () {
            return 0;
        };

    }, {}], 11: [function (require, module, exports) {
        (function (setImmediate) {
            (function () {
                var si = typeof setImmediate === 'function', tick;
                if (si) {
                    tick = function (fn) {
                        setImmediate(fn);
                    };
                } else {
                    tick = function (fn) {
                        setTimeout(fn, 0);
                    };
                }

                module.exports = tick;
            }).call(this)
        }).call(this, require("timers").setImmediate)
    }, {"timers": 12}], 12: [function (require, module, exports) {
        (function (setImmediate, clearImmediate) {
            (function () {
                var nextTick = require('process/browser.js').nextTick;
                var apply = Function.prototype.apply;
                var slice = Array.prototype.slice;
                var immediateIds = {};
                var nextImmediateId = 0;

// DOM APIs, for completeness

                exports.setTimeout = function () {
                    return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
                };
                exports.setInterval = function () {
                    return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
                };
                exports.clearTimeout =
                    exports.clearInterval = function (timeout) {
                        timeout.close();
                    };

                function Timeout(id, clearFn) {
                    this._id = id;
                    this._clearFn = clearFn;
                }

                Timeout.prototype.unref = Timeout.prototype.ref = function () {
                };
                Timeout.prototype.close = function () {
                    this._clearFn.call(window, this._id);
                };

// Does not start the time, just sets up the members needed.
                exports.enroll = function (item, msecs) {
                    clearTimeout(item._idleTimeoutId);
                    item._idleTimeout = msecs;
                };

                exports.unenroll = function (item) {
                    clearTimeout(item._idleTimeoutId);
                    item._idleTimeout = -1;
                };

                exports._unrefActive = exports.active = function (item) {
                    clearTimeout(item._idleTimeoutId);

                    var msecs = item._idleTimeout;
                    if (msecs >= 0) {
                        item._idleTimeoutId = setTimeout(function onTimeout() {
                            if (item._onTimeout)
                                item._onTimeout();
                        }, msecs);
                    }
                };

// That's not how node.js implements it but the exposed api is the same.
                exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function (fn) {
                    var id = nextImmediateId++;
                    var args = arguments.length < 2 ? false : slice.call(arguments, 1);

                    immediateIds[id] = true;

                    nextTick(function onNextTick() {
                        if (immediateIds[id]) {
                            // fn.call() is faster so we optimize for the common use-case
                            // @see http://jsperf.com/call-apply-segu
                            if (args) {
                                fn.apply(null, args);
                            } else {
                                fn.call(null);
                            }
                            // Prevent ids from leaking
                            exports.clearImmediate(id);
                        }
                    });

                    return id;
                };

                exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function (id) {
                    delete immediateIds[id];
                };
            }).call(this)
        }).call(this, require("timers").setImmediate, require("timers").clearImmediate)
    }, {"process/browser.js": 10, "timers": 12}]
}, {}, [1]);
