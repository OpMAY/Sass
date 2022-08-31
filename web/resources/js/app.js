'use strict';
$(document).ready(function () {
    console.log('app.js execute');
});

const createPluginElement = (plugin) => {
    let button = document.createElement('button');
    button.classList.add('btn', 'btn-sm', 'btn-gray-dark-low');
    if (plugin.install) {
        button.classList.add('is-installed');
        button.textContent = '설치완료';
    } else {
        button.textContent = '설치하기';
    }

    return `<div class="media plugin-item p-16">
                    <img width="82" height="82" src="${plugin.profile_image.url}" alt="" data-href="/desc/query" class="align-self-start mr-20">
                    <div class="media-body" data-href="/desc/query">
                        <h5 class="bold-h5 mb-8">${plugin.title}</h5>
                        <p class="_desc light-h5 c-gray-medium">${plugin.desc}</p>
                    </div>
                    <div class="_install">
                        <div class="_usage mr-16">
                            <div class="icon-text medium-h5">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.66663 14.6666C2.66663 13.2521 3.22853 11.8956 4.22872 10.8954C5.22892 9.8952 6.58547 9.33329 7.99996 9.33329C9.41445 9.33329 10.771 9.8952 11.7712 10.8954C12.7714 11.8956 13.3333 13.2521 13.3333 14.6666H12C12 13.6058 11.5785 12.5883 10.8284 11.8382C10.0782 11.0881 9.06082 10.6666 7.99996 10.6666C6.93909 10.6666 5.92168 11.0881 5.17153 11.8382C4.42139 12.5883 3.99996 13.6058 3.99996 14.6666H2.66663ZM7.99996 8.66663C5.78996 8.66663 3.99996 6.87663 3.99996 4.66663C3.99996 2.45663 5.78996 0.666626 7.99996 0.666626C10.21 0.666626 12 2.45663 12 4.66663C12 6.87663 10.21 8.66663 7.99996 8.66663ZM7.99996 7.33329C9.47329 7.33329 10.6666 6.13996 10.6666 4.66663C10.6666 3.19329 9.47329 1.99996 7.99996 1.99996C6.52663 1.99996 5.33329 3.19329 5.33329 4.66663C5.33329 6.13996 6.52663 7.33329 7.99996 7.33329Z" fill="#383838"></path>
                                </svg>
                                <span class="c-gray-dark-medium">${plugin.subscribes}</span>
                            </div>
                        </div>
                        ${button.outerHTML}
                    </div>
                    <div class="_date medium-h5 c-gray-dark-medium">${Time.formatChatDateTime(plugin.updated_datetime)}</div>
                </div>`;
}

function installClickEventListener(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.classList.contains('is-installed')) {
        alert('설치하기');
    }
}