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
        language: 'ko'
    }).on('input', rightTaskDatepickerInputEventListener).on('changeDate', rightTaskStartDatePickerChangeEventListener);
    $('#end').datepicker({
        container: '.end-datepicker-container',
        language: 'ko'
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
            rightTaskShowContent();
        } else {
            //Hide
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
            rightTaskHideContent();
        }
    });
    //TODO Click OutSide Close Event
    $(document).on('click', '#okiwi-crm-right-side', function (event) {
        if (event.target.closest('.right-side-inner') === null || event.target.closest('.right-side-inner') === undefined) {
            rightTaskClose();
        }
    });
};

const rightTaskShowContent = () => {
    let content = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab .content-editable-container');
    if (!content.classList.contains('is-hide'))
        content.classList.add('is-hide');
}

const rightTaskHideContent = () => {
    let content = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab .content-editable-container');
    if (content.classList.contains('is-hide'))
        content.classList.remove('is-hide');
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

const rightTaskReInitialize = (task_id) => {
    console.log('rightTaskReInitialize', task_id);
    let task = {
        id: tokenGenerator(6),
        title: 'Item 1',
        complete: false,
        cover: {
            url: 'https://via.placeholder.com/240x240',
            size: 999,
            name: 'cover.png',
            type: 'image/jpeg'
        },
        profiles: [
            {
                no: 1,
                url: 'https://via.placeholder.com/30x30',
                name: 'kimwoosik'
            },
            {
                no: 2,
                url: 'https://via.placeholder.com/30x30',
                name: 'kimwoosik2'
            }
        ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam atque deserunt dignissimos eligendi facilis impedit inventore, nisi nobis obcaecati odit perferendis placeat rerum sed similique tempora tempore velit vitae voluptatem.',
        work: 6,
        subtasks: [{
            id: tokenGenerator(6),
            title: 'subtask1',
            complete: true,
            profiles: [
                {
                    no: 9,
                    url: 'https://via.placeholder.com/30x30',
                    name: 'kimwoosik'
                },
            ],
            work: 6,
            start_date: '2022-08-21',
            end_date: '2022-08-30'
        }, {
            id: tokenGenerator(6),
            title: 'subtask2',
            complete: true,
            profiles: [
                {
                    no: 9,
                    url: 'https://via.placeholder.com/30x30',
                    name: 'kimwoosik'
                },
            ],
            work: 6,
            start_date: '2022-08-21',
            end_date: '2022-08-30'
        }],
        start_date: '2022-08-21',
        end_date: '2022-08-30'
    };
    rightTaskInit(task);
}

const rightTaskInit = (task) => {
    console.log('rightTaskInit');
    RIGHT_TASK_CONTAINER.setAttribute('data-id', task.id);
    rightTaskCheckboxInit(task.complete);
    rightTaskTitleInit(task.title);
    rightTaskAssignInit(task.profiles);
    rightTaskWorkTimeInit(task.start_date, task.end_date);
    rightTaskContentInit(task.description);
    rightTaskSubtasksInit(task.subtasks);
    let comments = [
        {
            no: 10,
            profile: {
                no: 9,
                url: 'https://via.placeholder.com/30x30',
                name: 'kimwoosik'
            },
            type: 'text',
            content: 'content',
            date: '2022.12.02'
        }, {
            no: 10,
            profile: {
                no: 9,
                url: 'https://via.placeholder.com/30x30',
                name: 'kimwoosik'
            },
            type: 'file',
            file: {
                name: 'test.png',
                url: 'https://via.placeholder.com/350x150',
                type: 'image/png',
                size: 102938
            },
            date: '2022.12.02'
        }, {
            no: 10,
            profile: {
                no: 9,
                url: 'https://via.placeholder.com/30x30',
                name: 'kimwoosik'
            },
            type: 'file',
            file: {
                name: 'test.zip',
                url: 'https://via.placeholder.com/350x150',
                type: 'file',
                size: 102938
            },
            date: '2022.12.02'
        }
    ];
    let files = [{
        name: 'test.png',
        url: 'https://via.placeholder.com/350x150',
        type: 'image/png',
        size: 102938,
        date: '2022.11.01'
    }, {
        name: 'test.zip',
        url: 'https://via.placeholder.com/350x150',
        type: 'file',
        size: 102938,
        date: '2022.11.02'
    }, {
        name: 'test.zip',
        url: 'https://via.placeholder.com/350x150',
        type: 'file',
        size: 102938,
        date: '2022.11.01'
    }];
    rightTaskCommentsInit(comments);
    rightTaskFilesInit(files);
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
    profiles.forEach(function (profile) {
        assign_user_add.before(createRightTaskAssignItem(profile));
    });
}

const rightTaskWorkTimeInit = (start_date, end_date) => {
    let start_date_input = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner ._info #start');
    let end_date_input = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner ._info #end');
    start_date_input.value = start_date.replaceAll(/-/g, '.');
    end_date_input.value = end_date.replaceAll(/-/g, '.');
}

const rightTaskContentInit = (content) => {
    let content_input = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab .content-editable-container');
    content_input.innerHTML = `${content}`;
}

const rightTaskSubtasksInit = (subtasks) => {
    let subtasks_container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._subtasks');
    let subtask_add = subtasks_container.querySelector('.subtask-item.add');
    subtasks.forEach(function (subtask) {
        subtask_add.before(createRightSubtaskItem(subtask));
    });
}

const rightTaskCommentsInit = (comments) => {
    let comments_container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._comments');
    comments_container.innerHTML = '';
    comments.forEach(function (comment) {
        comments_container.appendChild(createRightTaskCommentItem(comment));
    });
}

const rightTaskFilesInit = (files) => {
    let container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._files-container');
    initializeFiles({container, files});
}

function rightTaskDeleteClickEventListener(event) {
    console.log('deleteOptionClickEventListener', this);
    let task_id = this.closest('[data-id]').dataset.id;
    console.log('task_id', task_id);
    //TODO Delete Fetch
    rightTaskClose();
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

function rightTaskTitleInputEventListener(event) {
    console.log('rightTaskTitleInputEventListener', this);
    let title = this;
    let task_id = this.closest('[data-id]').dataset.id;
    console.log(task_id, title.value);
}

function rightTaskCheckboxClickEventListener(event) {
    console.log('rightTaskCheckboxClickEventListener', this);
    let task_id = this.closest('[data-id]').dataset.id;
    let is_complete = this.classList.contains('is-checked');
    if (is_complete) {
        console.log(!is_complete);
        this.classList.remove('is-checked');
    } else {
        console.log(!is_complete);
        this.classList.add('is-checked');
    }
    event.preventDefault();
    event.stopPropagation();
}

function rightSubtaskCheckboxClickEventListener(event) {
    console.log('rightTaskCheckboxClickEventListener', this);
    let subtask = this.closest('[data-id]');
    let task_id = subtask.dataset.id;
    let is_complete = subtask.classList.contains('is-checked');
    if (is_complete) {
        console.log(!is_complete);
        subtask.classList.remove('is-checked');
    } else {
        console.log(!is_complete);
        subtask.classList.add('is-checked');
    }
    event.preventDefault();
    event.stopPropagation();
}

function rightSubtaskCloseClickEventListener(event) {
    console.log('rightSubtaskCloseClickEventListener', this);
    let subtask = this.closest('[data-id]');
    let task_id = subtask.dataset.id;
    console.log(task_id);
    subtask.remove();
}

function rightTaskStartDatePickerChangeEventListener(event) {
    console.log('rightTaskStartDatePickerChangeEventListener', this);
    // `e` here contains the extra attributes
    /*TODO 조건 -> end_date가 start_date보다 커야한다.*/
    $('#end').datepicker('setDate', event.date);
    event.preventDefault();
    event.stopPropagation();
}

function rightTaskEndDatePickerChangeEventListener(event) {
    console.log('rightTaskEndDatePickerChangeEventListener', this);
    event.preventDefault();
    event.stopPropagation();
}

const rightTaskUserAssignDropdownUpdateItems = (event) => {
    console.log('rightTaskUserAssignDropdownUpdateItems', event, this);
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
    let dropdown_menu = event.target.querySelector('.dropdown-menu');

    profiles.forEach(function (profile) {
        dropdown_menu.appendChild(createRightTaskDropdownAssignItem(profile));
    });
}

const rightTaskUserAssignDropdownClearItems = (event) => {
    console.log('rightTaskUserAssignDropdownClearItems', event, this);
    let dropdown_menu = event.target.querySelector('.dropdown-menu');
    let dropdown_items = dropdown_menu.querySelectorAll('.dropdown-item');
    dropdown_items.forEach(function (dropdown_item) {
        dropdown_item.remove();
    });
}

function rightTaskUserAssignDeleteClickEventListener(event) {
    console.log('rightTaskUserAssignDeleteClickEventListener', this);
    let user_item = this.closest('.user-item');
    let user_no = user_item.dataset.no;
    console.log('delete user_no', user_no);
    user_item.remove();
    event.preventDefault();
    event.stopPropagation();
}

function rightTaskUserAssignAddClickEventListener(event) {
    console.log('rightTaskUserAssignAddClickEventListener', this);
    let user_no = this.dataset.no;
    let name = this.querySelector('._name').innerText.trim();
    let img = this.querySelector('._profile').style.backgroundImage;
    let url = img.substring(img.indexOf('"') + 1, img.lastIndexOf('"'));
    let profile = {
        no: user_no,
        url,
        name
    }
    let assign_user_container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner ._info ._assign .user-item-container');
    let assign_user_add = assign_user_container.querySelector('.user-item.add');
    assign_user_add.before(createRightTaskAssignItem(profile));
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

function rightTaskContentInputEventListener(event) {
    console.log('rightTaskContentInputEventListener', this);
    let task_id = this.closest('[data-id]').dataset.id;
    let content = this;
    console.log(task_id, content.innerHTML);
}

function rightTaskSubTaskAddClickEventListener(event) {
    console.log('rightTaskSubTaskAddClickEventListener', this);
    let current_date = new Date().toISOString().slice(0, 10);
    let create_id = tokenGenerator(8);
    let subtask = {
        id: create_id,
        title: create_id,
        complete: false,
        profiles: [
            {
                no: 999,
                url: 'https://via.placeholder.com/30x30',
                name: 'kimwoosik'
            },
        ],
        work: 0,
        start_date: current_date,
        end_date: current_date
    };
    let subtasks_container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._subtasks');
    let subtask_add = subtasks_container.querySelector('.subtask-item.add');
    subtask_add.before(createRightSubtaskItem(subtask));
}

function rightTaskDownloadClickEventListener(event) {
    console.log('rightTaskDownloadClickEventListener', this);
}

function rightTaskCommentKeydownEventListener(event) {
    console.log('rightTaskCommentKeydownEventListener', this);
    if (event.key === 'Escape'.toLowerCase() || event.code === 'Escape'.toLowerCase() || event.keyCode === 27) {
        //TODO Clear
        this.value = '';
        event.preventDefault();
        event.stopPropagation();
    }
    if ((event.key === 'Enter'.toLowerCase() || event.code === 'Enter'.toLowerCase() || event.keyCode === 13) && (event.altKey || event.shiftKey || event.ctrlKey)) {
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

function rightTaskCommentWriteEventListener(event) {
    console.log('rightTaskCommentWriteEventListener', this);
    let task_id = this.closest('[data-id]').dataset.id;
    let comment_write_input = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._comment-input-container #comment-input');
    let comments_container = RIGHT_TASK_CONTAINER.querySelector('.right-side-inner > ._tab ._comments');
    console.log('task_id', task_id, comment_write_input.value);
    let current_date = new Date().toISOString().slice(0, 10);

    let comment = {
        task_id: task_id,
        no: 999,
        profile: {
            no: 999,
            url: 'https://via.placeholder.com/30x30',
            name: 'kimwoosik'
        },
        type: 'text',
        content: comment_write_input.value,
        date: current_date
    }
    comments_container.appendChild(createRightTaskCommentItem(comment));
    comment_write_input.value = '';
}

function rightTaskMessageFileUploadEventListener(event) {
    console.log('rightTaskMessageFileUploadEventListener', this);
    let task_id = this.closest('[data-id]').dataset.id;
    console.log('task_id', task_id);
    let input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();
    input.addEventListener('change', rightTaskMessageFileChangeEventListener);
    event.preventDefault();
    event.stopPropagation();
}

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
                comment.file.url = e.target.result;
                console.log(comment.file);
                callback(comment);
            }

            reader.readAsDataURL(input.files[0]);

            reader.onloadend = function (e) {

            }
        }
    }

    let comment = {
        no: 9999,
        profile: {
            no: 9999,
            url: 'https://via.placeholder.com/30x30',
            name: 'kimwoosik'
        },
        type: 'file',
        file: {
            name: file.name,
            url: 'https://via.placeholder.com/350x150',
            type: file.type,
            size: file.size
        },
        date: current_date
    };
    readURL(input, comment, (comment) => {
        comments_container.appendChild(createRightTaskCommentItem(comment))
    });
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
        if (comment.type === 'text') {
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
                            <span class="_download medium-h6">Download</span>
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
                                <span class="_download medium-h6">Download</span>
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