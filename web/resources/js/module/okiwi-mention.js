const OkiwiMention = function (options = {
    container,
    mention_key: 50,
    escape_key: 27,
    shiftKey: true,
    users: [],
    list: undefined,
    get_users_url: '/resources/assets/datas/users_sample.json',
    mention_users: [],
    escapeCallback: (event) => {
        console.log('escape', event);
    },
    mentioningCallback: (event, keyword, node, startOffset, endOffset) => {
        console.log('mentioningCallback', event, keyword, node, startOffset, endOffset);
    },
    mentionStartCallback: (event, node, startOffset, list) => {
        console.log('mentionStartCallback', event, node, startOffset, list);
    },
    mentionEndCallback: (event, node, startOffset, endOffset, mention_users, current_mention_user) => {
        console.log('mentionEndCallback', event, node, startOffset, endOffset, mention_users, current_mention_user);
    }
}) {
    let _this = this, d = document, keyword, node, startOffset, endOffset, mention = false, list_loading = false;
    this.options = {};
    this.options.key = options.hasOwnProperty('mention_key') ? options.mention_key : 50;
    this.options.escape = options.hasOwnProperty('escape_key') ? options.escape_key : 27;
    if (!options.container) {
        this.options.container = d.querySelector(options.container);
    } else {
        if (options.container.nodeType !== 1) {
            this.options.container = d.querySelector(options.container);
        } else {
            this.options.container = options.container;
        }
    }
    console.log('this.options.container', this.options.container);
    this.options.shiftKey = options.hasOwnProperty('escape_key') ? options.shiftKey : true;
    this.options.parentContainer = this.options.container.parentElement;
    this.options.parentContainer.style.position = 'relative';
    this.options.parentContainer.classList.add('mention-container');
    this.options.mentioningCallback = options.hasOwnProperty('mentioningCallback') ? options.mentioningCallback : (event, keyword, node, startOffset, endOffset) => {
        console.log('mentioningCallback', event, keyword, node, startOffset, endOffset);
    };
    this.options.mentionStartCallback = options.hasOwnProperty('mentionStartCallback') ? options.mentionStartCallback : (event, node, startOffset, list) => {
        console.log('mentionStartCallback', event, node, startOffset, list);
    };
    this.options.mentionEndCallback = options.hasOwnProperty('mentionEndCallback') ? options.mentionEndCallback : (event, node, startOffset, endOffset, mention_users, current_mention_user) => {
        console.log('mentionEndCallback', event, node, startOffset, endOffset, mention_users, current_mention_user);
    };
    this.options.escapeCallback = options.hasOwnProperty('escapeCallback') ? options.escapeCallback : (event) => {
        console.log('escape', event);
    };
    this.options.get_users_url = options.hasOwnProperty('get_users_url') ? options.get_users_url : '/resources/assets/datas/users_sample.json';
    this.options.users = options.hasOwnProperty('users') ? options.users : [];
    this.options.mention_users = options.hasOwnProperty('mention_users') ? options.mention_users : [];
    this.options.list = options.hasOwnProperty('list') ? options.list : undefined;
    let _options = this.options;

    this.clearMentionUsers = () => {
        _options.mention_users = [];
    }
    this.clearUsers = () => {
        _options.users = [];
    }
    this.setURL = (url) => {
        _options.get_users_url = url;
    }

    const removeMentionUser = ({id, name}) => {
        let filtered = _options.mention_users.filter(function (e) {
            if (id) {
                return e.id !== id;
            } else if (name) {
                return e.name !== name;
            }
        });
        return _options.mention_users = filtered;
    }

    const removeListElement = () => {
        if (_options.list) {
            _options.list.remove();
            _options.list = undefined;
        }
        _this.clearUsers();
    }

    const createListElement = (position, users) => {
        console.log('origin_position', position);
        let parentPosition = _options.parentContainer.getBoundingClientRect();
        let list = d.createElement('ul');
        list.style.position = 'absolute';
        list.style.top = `${position.y - parentPosition.y - 42}px`;
        list.style.left = `${position.x - parentPosition.x + 16}px`;
        list.classList.add('list_mention');
        users.forEach(function (user, index) {
            let li = d.createElement('li');
            li.setAttribute('data-name', user.name);
            li.setAttribute('data-id', user.id);
            li.innerHTML = `${user.name}`;
            if (index === 0)
                li.classList.add('is-active');
            list.append(li);
        });
        return list;
    }

    const createMentionElement = ({id, name}) => {
        let created_mention_elm = d.createElement('a');
        created_mention_elm.classList.add('__mention');
        created_mention_elm.innerHTML = __buildCreateMentionElement(name);
        created_mention_elm.setAttribute('data-id', id);
        created_mention_elm.setAttribute('data-name', name);
        return created_mention_elm;
    }

    const __buildCreateMentionElement = (name) => {
        return `@${name}`;
    }

    const createMentionNextElement = (html) => {
        let next_elem = d.createElement('span');
        next_elem.innerHTML = html;
        return next_elem;
    }

    const insertNodeAtCaret = (node) => {
        if (typeof window.getSelection != "undefined") {
            let sel = window.getSelection();
            if (sel.rangeCount) {
                let range = sel.getRangeAt(0);
                let textNode = createMentionNextElement(`\u00A0`);
                range.collapse(false);
                range.insertNode(textNode);
                range.insertNode(node);
                range = range.cloneRange();
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
                range.setStartAfter(textNode);
            }
        }
    }

    const bindEvents = () => {
        console.log('bindEvents', this);
        this.options.container.addEventListener('keydown', keydownEventListener);
        this.options.container.addEventListener('keyup', keyupEventListener);
        return this.options;
    }

    function keydownEventListener(event) {
        let key = event.keyCode || event.which;
        if (mention && key == 13) {
            event.preventDefault();
        } else if (!list_loading && mention && (key == 38 || key == 40)) {
            let active_li = _options.list.querySelector('li.is-active');
            if (key == 38) { //Up Button
                if (active_li.previousElementSibling) {
                    active_li.classList.remove('is-active');
                    active_li.previousElementSibling.classList.add('is-active');
                }
            } else if (key == 40) { //Down Button
                if (active_li.nextElementSibling) {
                    active_li.classList.remove('is-active');
                    active_li.nextElementSibling.classList.add('is-active');
                }
            }
            event.preventDefault();
            event.stopPropagation();
        } else if (key == 8) {
            let sel = window.getSelection();
            let range = sel.getRangeAt(0);
            if (range.startContainer.parentElement == range.endContainer.parentElement) {
                if (range.startContainer.parentElement.classList.contains('__mention')) {
                    removeMentionUser(range.startContainer.parentElement.dataset);
                    range.startContainer.parentElement.remove();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        }
    }

    function keyupEventListener(event) {
        event.preventDefault();
        event.stopPropagation();
        let key = event.keyCode || event.which;
        let sel = window.getSelection();
        if (!mention && event.shiftKey == _options.shiftKey && key == _options.key) {
            mention = true;
            node = sel.focusNode;
            startOffset = sel.focusOffset;
            list_loading = true;
            fetch(_options.get_users_url).then((response) => {
                return response.json();
            }).then((result) => {
                // TODO response.json().data.users 안됨
                console.log('mention users fetch', result)
                _options.users = result.data.users;
                let list = createListElement(getCaretCoordinates(), _options.users);
                _options.list = list;
                _options.parentContainer.append(list);
                _options.mentionStartCallback(event, node, startOffset, list);
                list_loading = false;
            });
        } else if (mention && key == 13) {
            let sel = window.getSelection();
            endOffset = sel.focusOffset;
            mention = false;
            let range = sel.getRangeAt(0);
            range.setStart(node, startOffset - 1);
            range.deleteContents();
            let active_li = _options.list.querySelector('li.is-active');
            let dataset = active_li.dataset;
            insertNodeAtCaret(createMentionElement(dataset));
            _options.mention_users.push(dataset);
            removeListElement();
            _options.mentionEndCallback(event, node, startOffset, endOffset, _options.mention_users, dataset);
            event.stopPropagation();
            event.preventDefault();
            event.stopImmediatePropagation();
        } else if (mention && key == _options.escape) {
            mention = false;
            _options.escapeCallback(event);
            removeListElement();
        } else if (mention) {
            endOffset = sel.focusOffset;
            let range = sel.getRangeAt(0);
            if (endOffset < startOffset) {
                mention = false;
                return;
            }
            range.setStart(node, startOffset);
            range.setEnd(node, endOffset);
            keyword = range.toString();
            _options.mentioningCallback(event, keyword, node, startOffset, endOffset);
        }
    }

    function getCaretCoordinates() {
        let x = 0,
            y = 0;
        const isSupported = typeof window.getSelection !== "undefined";
        if (isSupported) {
            const selection = window.getSelection();
            // Check if there is a selection (i.e. cursor in place)
            if (selection.rangeCount !== 0) {
                // Clone the range
                const range = selection.getRangeAt(0).cloneRange();
                // Collapse the range to the start, so there are not multiple chars selected
                range.collapse(true);
                // getCientRects returns all the positioning information we need
                const rect = range.getClientRects()[0];
                if (rect) {
                    x = rect.left; // since the caret is only 1px wide, left == right
                    y = rect.top; // top edge of the caret
                }
            }
        }
        return {x, y};
    }

    (() => {
        // Event functions
        return bindEvents.call(this);
    })()
}
