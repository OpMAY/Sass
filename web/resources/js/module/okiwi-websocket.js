'use strict'
const WEBSOCKET_STATE = {
    CONNECTING: {
        STATE: 'CONNECTING',
        STATUS: 0,
    },
    OPEN: {
        STATE: 'OPEN',
        STATUS: 1,
    },
    CLOSING: {
        STATE: 'CLOSING',
        STATUS: 2
    },
    CLOSED: {
        STATE: 'CLOSED',
        STATUS: 3,
    },
}
const WEBSOCKET_PLUG_TYPE = {
    CRM: {
        name: 'CRM',
    },
    QUERY: {
        name: 'QUERY',
    },
    CHAT: {
        name: 'CHAT',
    },
    PLAN: {
        name: 'PLAN',
    },
}
Object.freeze(WEBSOCKET_STATE);
Object.freeze(WEBSOCKET_PLUG_TYPE);

const WEBSOCKET_ENDPOINT = {}
let WEBSOCKET;

const initializeSocket = ({
                              onOpen = (event, self) => {
                                  console.log('open', 'event', event, 'this', self);
                                  WEBSOCKET.messageSend(self.options);
                              },
                              onMessage = (event, self) => {
                                  console.log('message', 'event', event, 'self', self, 'data', event.data);
                              },
                              onClose = (event, self) => {
                                  console.log(`code -> ${event.code}, reason -> ${event.reason}`, 'self', self);
                              },
                              onError = (event, self) => {
                                  console.log('error', event, 'self', self);
                              },
                              onSend = (data) => {
                                  console.log(`send -> ${JSON.stringify(data)}`, 'this', this);
                                  this.send(JSON.stringify(data));
                              },
                              disconnect = () => {
                                  this.close();
                              },
                          }, {plugin_type, user_no}) => {
    //Initialize
    WEBSOCKET = new WebSocket(getSocketWsURI(plugin_type));
    //Options
    WEBSOCKET.options = {plugin_type, user_no};
    //Method
    WEBSOCKET.addEventListener('open', function (event) {
        onOpen(event, this);
    });
    WEBSOCKET.addEventListener('message', function (event) {
        onMessage(event, this);
    });
    WEBSOCKET.addEventListener('close', function (event) {
        onClose(event, this);
    });
    WEBSOCKET.addEventListener('error', function (event) {
        onError(event, this);
    });
    WEBSOCKET.messageSend = onSend;
    WEBSOCKET.disconnect = disconnect;
    return WEBSOCKET;
}

function getSocketWsURI(plugin_type) {
    const protocol = window.location.protocol;
    const host = window.location.host;
    if (protocol === 'http:') return `ws://${host}/${plugin_type}`;
    if (protocol === 'https:') return `wss://${host}/${plugin_type}`;
}