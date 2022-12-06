'use strict'
let IS_RESIZE;
let PREVIEW_IS_DRAG;
let PREVIEWS = new Array();

const createPreview = ({
                           container = document.body,
                           zIndex = 9999,
                           id = tokenGenerator(8),
                           width = 200, height = 200,
                           top = 50, left = 50,
                           title = `${id} Preview`,
                           src,
                           is_full_screen = false
                       }) => {
    let preview = document.createElement('div');
    preview.classList.add('preview-container', 'window', 'app-window');
    preview.setAttribute('data-windowbackdrop', true);
    preview.setAttribute('data-window', 'chrome');
    preview.style.zIndex = zIndex;
    preview.style.top = `${top}px`;
    preview.style.left = `${left}px`;
    preview.style.width = `${width}px`;
    preview.style.height = `${height}px`;
    preview.innerHTML = __buildInnerHTML({id, title, src, is_full_screen});

    function __buildInnerHTML({id, title, src, is_full_screen}) {
        return `    <div class="draggable-window" data-id="${id}">
        <div class="_window-option _expand">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_42_9774)">
                    <path d="M10 3V5H5V19H19V14H21V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3H10ZM17.586 5H13V3H21V11H19V6.414L12 13.414L10.586 12L17.586 5Z"
                          fill="white"/>
                </g>
                <defs>
                    <clipPath id="clip0_42_9774">
                        <rect width="24" height="24" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </div>
        <div class="_window-option _minimize">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_42_10882)">
                    <path d="M4 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3ZM5 5V19H19V5H5ZM7 11H17V13H7V11Z"
                          fill="white"/>
                </g>
                <defs>
                    <clipPath id="clip0_42_10882">
                        <rect width="24" height="24" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </div>
        <div class="_window-option _maximize">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_42_10374)">
                    <path d="M4 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3ZM5 5V19H19V5H5Z"
                          fill="white"/>
                </g>
                <defs>
                    <clipPath id="clip0_42_10374">
                        <rect width="24" height="24" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </div>
        <div class="_window-option _close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_42_10514)">
                    <path d="M12 10.5862L16.95 5.63623L18.364 7.05023L13.414 12.0002L18.364 16.9502L16.95 18.3642L12 13.4142L7.04999 18.3642L5.63599 16.9502L10.586 12.0002L5.63599 7.05023L7.04999 5.63623L12 10.5862Z"
                          fill="white"/>
                </g>
                <defs>
                    <clipPath id="clip0_42_10514">
                        <rect width="24" height="24" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </div>
    </div>
    <div class="resizer ne"></div>
    <div class="resizer nw"></div>
    <div class="resizer sw"></div>
    <div class="resizer se"></div>
    <div class="window__body">
        <iframe id="${id}"
                title="${title}"
                src="${src}"
                ${is_full_screen ? 'allowfullscreen' : ''}>
        </iframe>
    </div>
    <div class="window__overlay"></div>`;
    }

    container.appendChild(preview);
    preview_resizer(preview).then(element => {
        console.log(element.querySelector('._window-option'));
        element.querySelector('._window-option._minimize').addEventListener('click', previewOptionMinimizeClickEventListener);
        element.querySelector('._window-option._expand').addEventListener('click', previewOptionExpandClickEventListener);
        element.querySelector('._window-option._maximize').addEventListener('click', previewOptionMaximizeClickEventListener);
        element.querySelector('._window-option._close').addEventListener('click', previewOptionCloseClickEventListener);
        //Preview Drag Event
        previewDraggable(element, element.querySelector('.draggable-window'), getComputedStyle(element).top.replace(/[p][x]/, '') * 1, getComputedStyle(element).left.replace(/[p][x]/, '') * 1);
        PREVIEWS.push(element);
    });
};

function previewOptionMinimizeClickEventListener(event) {
    console.log('previewOptionMinimizeClickEventListener', this);
    let container = this.closest('.preview-container');
    let height = parseInt(container.style.height);
    let width = parseInt(container.style.width);
    let expand_option = container.querySelector('._window-option._expand');
    if (width > window.innerWidth / 2) {
        width /= 2;
    }
    if (height > window.innerHeight / 2) {
        height /= 2;
    }
    expand_option.setAttribute('data-width', width);
    expand_option.setAttribute('data-height', height);
    let frame = container.querySelector('.window__body iframe');
    frame.style.height = 0;
    container.style.height = 'auto';
    event.stopPropagation();
    event.preventDefault();
}

function previewOptionExpandClickEventListener(event) {
    console.log('previewOptionExpandClickEventListener', this);
    let container = this.closest('.preview-container');
    let expand_option = container.querySelector('._window-option._expand');
    let origin_height = expand_option.dataset.height;
    let origin_width = expand_option.dataset.width;
    if (origin_height && origin_width) {
        let frame = container.querySelector('.window__body iframe');
        frame.style.height = '100%';
        container.style.height = `${origin_height}px`;
        container.style.width = `${origin_width}px`;
    } else {
        container.style.height = `${window.innerHeight / 2}px`;
        container.style.width = `${window.innerWidth / 2}px`;
    }
    expand_option.removeAttribute('data-height');
    expand_option.removeAttribute('data-width');
    event.stopPropagation();
    event.preventDefault();
}

function previewOptionMaximizeClickEventListener(event) {
    console.log('previewOptionMaximizeClickEventListener', this);
    let container = this.closest('.preview-container');
    let frame = container.querySelector('.window__body iframe');
    frame.style.height = '100%';
    container.style.height = `${window.innerHeight}px`;
    container.style.width = `${window.innerWidth}px`;
    container.style.top = 0;
    container.style.left = 0;
    event.stopPropagation();
    event.preventDefault();
}

function previewOptionCloseClickEventListener(event) {
    console.log('previewOptionCloseClickEventListener', this);
    let container = this.closest('.preview-container');
    deleteChild(container);
    container.remove();
    event.stopPropagation();
    event.preventDefault();
}

//창 조절
const preview_resizer = async (element) => {
    //TODO Resizer Event
    const resizers = element.querySelectorAll('.resizer');
    let currentResizer;
    let preview;
    for (let resizer of resizers) {
        resizer.addEventListener('mousedown', mousedown);

        function mousedown(e) {
            currentResizer = e.target;
            IS_RESIZE = true;
            let prevX = e.clientX;
            let prevY = e.clientY;
            if (!preview) {
                preview = e.target.closest('.preview-container');
                if (!preview.querySelector('.window__overlay').classList.contains('is-mousedown')) {
                    preview.querySelector('.window__overlay').classList.add('is-mousedown');
                }
            }
            window.addEventListener('mousemove', mousemove);
            window.addEventListener('mouseup', mouseup);

            function mousemove(e) {
                const rect = element.getBoundingClientRect();
                if (currentResizer.classList.contains("se")) {
                    element.style.width = rect.width - (prevX - e.clientX) + "px";
                    element.style.height = rect.height - (prevY - e.clientY) + "px";
                } else if (currentResizer.classList.contains("sw")) {
                    element.style.width = rect.width + (prevX - e.clientX) + "px";
                    element.style.height = rect.height - (prevY - e.clientY) + "px";
                    element.style.left = rect.left - (prevX - e.clientX) + "px";
                } else if (currentResizer.classList.contains('nw')) {
                    element.style.width = rect.width - (prevX - e.clientX) + "px";
                    element.style.height = rect.height + (prevY - e.clientY) + "px";
                    element.style.top = rect.top - (prevY - e.clientY) + "px";
                } else {
                    element.style.width = rect.width + (prevX - e.clientX) + "px";
                    element.style.height = rect.height + (prevY - e.clientY) + "px";
                    element.style.top = rect.top - (prevY - e.clientY) + "px";
                    element.style.left = rect.left - (prevX - e.clientX) + "px";
                }
                prevX = e.clientX;
                prevY = e.clientY;
            }

            function mouseup() {
                if (preview) {
                    if (preview.querySelector('.window__overlay').classList.contains('is-mousedown')) {
                        preview.querySelector('.window__overlay').classList.remove('is-mousedown');
                    }
                    preview = undefined;
                }
                window.removeEventListener("mousemove", mousemove);
                window.removeEventListener("mouseup", mouseup);
                IS_RESIZE = false;
            }
        }
    }
    return element;
}

/**
 * Makes an element draggable.
 *
 * @param {HTMLElement} element - The element.
 */
function previewDraggable(container = document.body, element, initialX = 0, initialY = 0) {
    let isMouseDown = false;
    // initial mouse X and Y for `mousedown`
    let mouseX;
    let mouseY;
    let preview;
    let window_width = window.innerWidth;
    let window_height = window.innerHeight;

    // element X and Y before and after move
    let elementX = initialX;
    let elementY = initialY;

    // mouse button down over the element
    element.addEventListener('mousedown', onPreviewMouseDown);
    // mouse button released
    document.addEventListener('mouseup', onPreviewMouseUp);
    // need to attach to the entire document
    // in order to take full width and height
    // this ensures the element keeps up with the mouse
    document.addEventListener('mousemove', onPreviewMouseMove);

    /**
     * Listens to `mousedown` event.
     *
     * @param {Object} event - The event.
     */
    function onPreviewMouseDown(event) {
        window_width = window.innerWidth;
        window_height = window.innerHeight;
        mouseX = event.clientX;
        mouseY = event.clientY;
        isMouseDown = true;
        if (!preview) {
            preview = event.target.closest('.preview-container');
            if (!preview.querySelector('.window__overlay').classList.contains('is-mousedown')) {
                preview.querySelector('.window__overlay').classList.add('is-mousedown');
            }
        }
    }

    /**
     * Listens to `mouseup` event.
     *
     * @param {Object} event - The event.
     */
    function onPreviewMouseUp(event) {
        isMouseDown = false;
        elementX = parseInt(container.style.left);
        elementY = parseInt(container.style.top);
        if (preview) {
            if (preview.querySelector('.window__overlay').classList.contains('is-mousedown')) {
                preview.querySelector('.window__overlay').classList.remove('is-mousedown');
            }
            preview = undefined;
        }
    }

    /**
     * Listens to `mousemove` event.
     *
     * @param {Object} event - The event.
     */
    function onPreviewMouseMove(event) {
        if (!isMouseDown) {
            return;
        }
        let deltaX = event.clientX - mouseX;
        let deltaY = event.clientY - mouseY;
        if (container && preview) {
            if (elementX + deltaX > 0 && elementX + deltaX + preview.offsetWidth < window_width) {
                preview.style.left = elementX + deltaX + 'px';
            } else if (elementX + deltaX + preview.offsetWidth >= window_width) {
                preview.style.left = window_width - preview.offsetWidth;
            } else {
                preview.style.left = 0;
            }
            if (elementY + deltaY > 0 && elementY + deltaY + preview.offsetHeight < window_height) {
                preview.style.top = elementY + deltaY + 'px';
            } else if (elementY + deltaY + preview.offsetHeight >= window_height) {
                preview.style.top = window_height - preview.offsetHeight;
            } else {
                preview.style.top = 0;
            }
        }
    }
}