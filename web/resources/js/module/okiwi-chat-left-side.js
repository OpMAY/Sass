'use strict'
/*TODO Global Variable*/
let CHAT_CHANNEL_CONTAINER;
let CHAT_DM_CONTAINER;

/*TODO Initialize*/
const initializeLeftSide = (channels, users) => {
    console.log('initializeLeftSide', channels, users);
    if (!CHAT_CHANNEL_CONTAINER) {
        CHAT_CHANNEL_CONTAINER = document.querySelector('#channel .level-type-channel');
        deleteChild(CHAT_CHANNEL_CONTAINER);
        channels.forEach(function (channel) {
            CHAT_CHANNEL_CONTAINER.append(createChannelElement(channel, channelClickEventListener, channelLikeEventListener));
        });
    }
    if (!CHAT_DM_CONTAINER) {
        CHAT_DM_CONTAINER = document.querySelector('#message .level-type-dm');
        deleteChild(CHAT_DM_CONTAINER);
        users.forEach(function (user) {
            CHAT_DM_CONTAINER.append(createDMElement(user, dmClickEventListener));
        });
    }
}

/*TODO Event*/
function channelClickEventListener(event) {
    console.log('channelClickEventListener');
    event.preventDefault();
    event.stopPropagation();
}

/*TODO 4. 채널 좋아요 (Left) -> 우식*/
function channelLikeEventListener(event) {
    console.log('channelLikeEventListener');
    let channel = this.closest('.channel-item');
    if (channel.classList.contains('is-like')) {
        channel.classList.remove('is-like');
    } else {
        channel.classList.add('is-like');
    }
    event.preventDefault();
    event.stopPropagation();
}

function dmClickEventListener(event) {
    console.log('dmClickEventListener');
    event.preventDefault();
    event.stopPropagation();
}

/*TODO Create Element*/
const createChannelElement = (channel, click, like) => {
    const __buildChannelInnerElement = (channel) => {
        return `<a href="#">
                  <svg class="_like" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_338_5123)">
                      <path d="M8.00027 12.174L3.29827 14.806L4.34827 9.52065L0.391602 5.86198L5.74293 5.22732L8.00027 0.333984L10.2576 5.22732L15.6089 5.86198L11.6523 9.52065L12.7023 14.806L8.00027 12.174Z"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_338_5123">
                        <rect width="16" height="16" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <div>${channel.name}</div>
                  <div class="_alarms" style="display: ${channel.alarms !== 0 ? 'block' : 'none'};">${channel.alarms <= 9 ? channel.alarms : '9+'}</div>
                </a>`;
    }
    let channel_elem = document.createElement('li');
    channel_elem.classList.add('channel-item');
    channel_elem.setAttribute('data-id', channel.id);
    if (channel.bookmark) {
        channel_elem.classList.add('is-like');
    }
    channel_elem.innerHTML = __buildChannelInnerElement(channel);
    /*TODO Add Event*/
    if (click)
        channel_elem.addEventListener('click', click);
    if (like)
        channel_elem.querySelector('._like').addEventListener('click', like);
    return channel_elem;
}
const createDMElement = (user, click) => {
    const __buildDMInnerElement = (user) => {
        return `<a href="#">
                  <div class="_profile" style="background-image: url('${user.profile.url}')">
                    <div class="_live"></div>
                  </div>
                  <div>${user.name}</div>
                  <div class="_alarms" style="display: ${user.alarms !== 0 ? 'block' : 'none'};">${user.alarms <= 9 ? user.alarms : '9+'}</div>
                </a>`;
    }
    let dm_elem = document.createElement('li');
    dm_elem.classList.add('dm-item');
    dm_elem.setAttribute('data-id', user.id);
    if (user.is_live) {
        dm_elem.classList.add('is-live');
    }
    dm_elem.innerHTML = __buildDMInnerElement(user);
    /*TODO Add Event*/
    if (click) {
        dm_elem.addEventListener('click', click);
    }
    return dm_elem;
}

function userConverter(user) {
    user.is_live = user._live;
}

function usersConverter(users) {
    users.forEach(function (user) {
        userConverter(user);
    })
}