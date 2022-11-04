const FILE_CONTAINER = document.querySelector('.file-container');
document.addEventListener('DOMContentLoaded', function () {
    console.log('file module init');
});

const initializeFiles = ({container = document.querySelector('.file-container'), files}) => {
    console.log('initializeFiles');
    container.innerHTML = '';
    let dates = new Array();
    files.forEach(function (file) {
        if (dates.length === 0) {
            dates.push(file.date);
        } else {
            let check = false;
            check = dates.find(function (date) {
                if (file.date === date) {
                    return true;
                }
                return false;
            });
            if (!check) {
                dates.push(file.date);
            }
        }
    });
    dates.forEach(function (date) {
        container.appendChild(createFileDateItem(date));
    });
    files.forEach(function (file) {
        let date_item_files_container = container.querySelector(`._files[data-date="${file.date}"]`);
        date_item_files_container.appendChild(createFileItem(file));
    });
}

const createFileDateItem = (date) => {
    const __buildFileDateItem = (date) => {
        return `<div class="_date regular-h6">
                  ${date}
                </div>
                <div class="_files" data-date="${date}">
                </div>`;
    }
    let date_item = document.createElement('div');
    date_item.classList.add('date-item');
    date_item.innerHTML = __buildFileDateItem(date);
    return date_item;
}

const createFileItem = (file) => {
    const __buildFileItem = (file) => {
        return `<div class="_file-image">
                </div>
                <div class="_file-info">
                  <div class="_name regular-h6"
                       data-toggle="tooltip"
                       data-placement="bottom"
                       title="${file.name}">${file.name}
                  </div>
                  <div class="_size regular-p1 text-muted">${convertFileSize(file.size)}</div>
                </div>
                <div class="_download" data-url="${file.url}" data-name="${file.name}">
                  <svg width="32"
                       height="32"
                       viewBox="0 0 32 32"
                       fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16"
                            cy="16"
                            r="16"
                            fill="#F06A6A"></circle>
                    <path d="M15.3737 17.9631C15.3887 17.9821 15.4078 17.9975 15.4297 18.008C15.4516 18.0186 15.4757 18.0241 15.5 18.0241C15.5243 18.0241 15.5484 18.0186 15.5703 18.008C15.5922 17.9975 15.6113 17.9821 15.6263 17.9631L17.8723 15.1452C17.9545 15.0418 17.8803 14.8886 17.746 14.8886H16.26V8.15909C16.26 8.07159 16.1878 8 16.0996 8H14.8964C14.8082 8 14.736 8.07159 14.736 8.15909V14.8866H13.254C13.1197 14.8866 13.0455 15.0398 13.1277 15.1432L15.3737 17.9631ZM22.8396 17.267H21.6364C21.5481 17.267 21.4759 17.3386 21.4759 17.4261V20.4886H9.52406V17.4261C9.52406 17.3386 9.45187 17.267 9.36364 17.267H8.16043C8.07219 17.267 8 17.3386 8 17.4261V21.3636C8 21.7156 8.28676 22 8.64171 22H22.3583C22.7132 22 23 21.7156 23 21.3636V17.4261C23 17.3386 22.9278 17.267 22.8396 17.267Z"
                          fill="white"></path>
                  </svg>
                </div>`;
    }
    let file_item = document.createElement('div');
    file_item.classList.add('file-item');
    file_item.innerHTML = __buildFileItem(file);
    file_item.querySelector('._download').addEventListener('click', fileDownloadClickEventListener);
    return file_item;
}

function fileDownloadClickEventListener(event) {
    console.log('fileDownloadClickEventListener', this);
    downloadFileFromUrl($(this).data().url, $(this).data().name);
}

const convertFileSize = (size) => {
    let file_size = size / 1024 / 1024;
    if (size >= 1024) {
        if (file_size < 1) {
            file_size *= 1024;
            file_size = Math.ceil(file_size);
            file_size += 'KB';
        } else {
            file_size = Math.ceil(file_size);
            file_size += 'MB';
        }
    } else {
        file_size = size + 'B';
    }
    return file_size;
}