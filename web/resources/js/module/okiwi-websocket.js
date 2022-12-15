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
const WEBSOCKET_ACTION_TYPE = {
    CREATE: {
        name: 'CREATE',
    },
    READ: {
        name: 'READ',
    },
    UPDATE: {
        name: 'UPDATE',
    },
    DELETE: {
        name: 'DELETE',
    },
    SEND_MESSAGE: {
        name: 'SEND_MESSAGE',
    },
}
const WEBSOCKET_CATEGORY = {
    CATEGORY: {
        SIDE: {
            name: 'SIDE',
            SUBCATEGORY: {
                BOARD: {
                    name: 'BOARD',
                    TARGET: {
                        BOARD: {
                            name: 'BOARD',
                        },
                        TITLE: {
                            name: 'TITLE',
                        },
                        ORDER: {
                            name: 'ORDER',
                        },
                    }
                },
                TASK: {
                    name: 'TASK',
                    TARGET: {
                        CHECK: {
                            name: 'CHECK',
                        }, TASK: {
                            name: 'TASK',
                        }, ORDER: {
                            name: 'ORDER',
                        }, TITLE: {
                            name: 'TITLE',
                        }, MOVE: {
                            name: 'MOVE',
                        }, MEMBER_ADD: {
                            name: 'MEMBER_ADD',
                        }, MEMBER_REMOVE: {
                            name: 'MEMBER_REMOVE',
                        }, DATE_START: {
                            name: 'DATE_START',
                        }, DATE_END: {
                            name: 'DATE_END',
                        }, THUMBNAIL: {
                            name: 'THUMBNAIL',
                        }, DESCRIPTION: {
                            name: 'DESCRIPTION',
                        }, SUBTASK_CHECK: {
                            name: 'SUBTASK_CHECK',
                        }, SUBTASK_NAME: {
                            name: 'SUBTASK_NAME',
                        }, SUBTASK: {
                            name: 'SUBTASK',
                        }, SUBTASK_REMOVE: {
                            name: 'SUBTASK_REMOVE',
                        }, COMMENT: {
                            name: 'COMMENT',
                        }, FILE: {
                            name: 'FILE',
                        }, FIGMA: {
                            name: 'FIGMA',
                        }, QUERY: {
                            name: 'QUERY',
                        }
                    }
                },
                PROJECT: {
                    name: 'PROJECT'
                }
            }
        },
        FEED: {
            name: 'FEED',
            SUBCATEGORY: {
                BOARD: {
                    name: 'BOARD',
                    TARGET: {
                        BOARD: {
                            name: 'BOARD',
                        },
                        TITLE: {
                            name: 'TITLE',
                        },
                        ORDER: {
                            name: 'ORDER',
                        },
                    }
                },
                TASK: {
                    name: 'TASK',
                    TARGET: {
                        CHECK: {
                            name: 'CHECK',
                        }, TASK: {
                            name: 'TASK',
                        }, ORDER: {
                            name: 'ORDER',
                        }, TITLE: {
                            name: 'TITLE',
                        }, MOVE: {
                            name: 'MOVE',
                        }, MEMBER_ADD: {
                            name: 'MEMBER_ADD',
                        }, MEMBER_REMOVE: {
                            name: 'MEMBER_REMOVE',
                        }, DATE_START: {
                            name: 'DATE_START',
                        }, DATE_END: {
                            name: 'DATE_END',
                        }, THUMBNAIL: {
                            name: 'THUMBNAIL',
                        }, DESCRIPTION: {
                            name: 'DESCRIPTION',
                        }, SUBTASK_CHECK: {
                            name: 'SUBTASK_CHECK',
                        }, SUBTASK_NAME: {
                            name: 'SUBTASK_NAME',
                        }, SUBTASK: {
                            name: 'SUBTASK',
                        }, SUBTASK_REMOVE: {
                            name: 'SUBTASK_REMOVE',
                        }, COMMENT: {
                            name: 'COMMENT',
                        }, FILE: {
                            name: 'FILE',
                        }, FIGMA: {
                            name: 'FIGMA',
                        }, QUERY: {
                            name: 'QUERY',
                        }
                    }
                },
                PROJECT: {
                    name: 'PROJECT'
                }
            }
        },
        LIST: {
            name: 'LIST',
            SUBCATEGORY: {
                BOARD: {
                    name: 'BOARD',
                    TARGET: {
                        BOARD: {
                            name: 'BOARD',
                        },
                        TITLE: {
                            name: 'TITLE',
                        },
                        ORDER: {
                            name: 'ORDER',
                        },
                    }
                },
                TASK: {
                    name: 'TASK',
                    TARGET: {
                        CHECK: {
                            name: 'CHECK',
                        }, TASK: {
                            name: 'TASK',
                        }, ORDER: {
                            name: 'ORDER',
                        }, TITLE: {
                            name: 'TITLE',
                        }, MOVE: {
                            name: 'MOVE',
                        }, MEMBER_ADD: {
                            name: 'MEMBER_ADD',
                        }, MEMBER_REMOVE: {
                            name: 'MEMBER_REMOVE',
                        }, DATE_START: {
                            name: 'DATE_START',
                        }, DATE_END: {
                            name: 'DATE_END',
                        }, THUMBNAIL: {
                            name: 'THUMBNAIL',
                        }, DESCRIPTION: {
                            name: 'DESCRIPTION',
                        }, SUBTASK_CHECK: {
                            name: 'SUBTASK_CHECK',
                        }, SUBTASK_NAME: {
                            name: 'SUBTASK_NAME',
                        }, SUBTASK: {
                            name: 'SUBTASK',
                        }, SUBTASK_REMOVE: {
                            name: 'SUBTASK_REMOVE',
                        }, COMMENT: {
                            name: 'COMMENT',
                        }, FILE: {
                            name: 'FILE',
                        }, FIGMA: {
                            name: 'FIGMA',
                        }, QUERY: {
                            name: 'QUERY',
                        }
                    }
                },
                PROJECT: {
                    name: 'PROJECT'
                }
            }
        },
        TIMELINE: {
            name: 'TIMELINE',
            SUBCATEGORY: {
                BOARD: {
                    name: 'BOARD',
                    TARGET: {
                        BOARD: {
                            name: 'BOARD',
                        },
                        TITLE: {
                            name: 'TITLE',
                        },
                        ORDER: {
                            name: 'ORDER',
                        },
                    }
                },
                TASK: {
                    name: 'TASK',
                    TARGET: {
                        CHECK: {
                            name: 'CHECK',
                        }, TASK: {
                            name: 'TASK',
                        }, ORDER: {
                            name: 'ORDER',
                        }, TITLE: {
                            name: 'TITLE',
                        }, MOVE: {
                            name: 'MOVE',
                        }, MEMBER_ADD: {
                            name: 'MEMBER_ADD',
                        }, MEMBER_REMOVE: {
                            name: 'MEMBER_REMOVE',
                        }, DATE_START: {
                            name: 'DATE_START',
                        }, DATE_END: {
                            name: 'DATE_END',
                        }, THUMBNAIL: {
                            name: 'THUMBNAIL',
                        }, DESCRIPTION: {
                            name: 'DESCRIPTION',
                        }, SUBTASK_CHECK: {
                            name: 'SUBTASK_CHECK',
                        }, SUBTASK_NAME: {
                            name: 'SUBTASK_NAME',
                        }, SUBTASK: {
                            name: 'SUBTASK',
                        }, SUBTASK_REMOVE: {
                            name: 'SUBTASK_REMOVE',
                        }, COMMENT: {
                            name: 'COMMENT',
                        }, FILE: {
                            name: 'FILE',
                        }, FIGMA: {
                            name: 'FIGMA',
                        }, QUERY: {
                            name: 'QUERY',
                        }
                    }
                },
                PROJECT: {
                    name: 'PROJECT'
                }
            }
        },
        FILE: {
            name: 'FILE',
        },
        PROJECT: {
            name: 'PROJECT',
        }
    }
}
Object.freeze(WEBSOCKET_STATE);
Object.freeze(WEBSOCKET_PLUG_TYPE);
Object.freeze(WEBSOCKET_ACTION_TYPE);

const WEBSOCKET_ENDPOINT = {}
let WEBSOCKET;

const initializeSocket = ({
                              onOpen = (event, self) => {
                                  console.log('open', 'event', event, 'this', self);
                                  console.log('You need define initializeSocket function in onOpen');
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
                              onSend = (data, self) => {
                                  console.log(`send -> ${JSON.stringify(data)}`, 'self', self);
                                  self.send(JSON.stringify(data));
                              },
                              disconnect = () => {
                                  this.close();
                              },
                          }, {plugin_type, user_no, hash}) => {
    //Initialize
    WEBSOCKET = new WebSocket(getSocketWsURI(plugin_type, hash));
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
    WEBSOCKET.onSend = onSend;
    WEBSOCKET.disconnect = disconnect;
    return WEBSOCKET;
}

function getSocketWsURI(plugin_type, hash) {
    const protocol = window.location.protocol;
    const host = window.location.host;
    const param = hash !== null ? `/${hash}` : '';
    if (protocol === 'http:') return `ws://${host}/socket/${plugin_type.toLowerCase()}${param}`;
    if (protocol === 'https:') return `wss://${host}/socket/${plugin_type.toLowerCase()}${param}`;
}