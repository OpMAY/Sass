'use strict'
let host = 'http://localhost:8080';

function apiGetTables(database_no) {
    let result;
    $.ajax({
        type: 'GET', //요청 메소드 타입
        url: `${host}/query/get/${database_no}/tables`, //요청 경로
        async: false, //비동기 여부
        cache: false, //캐시 여부
        contentType: 'application/json', //요청 컨텐트 타입 "application/x-www-form-urlencoded; charset=UTF-8"
        dataType: 'json', //응답 데이터 형식 명시하지 않을 경우 자동으로 추측
        success: function (data, status, xhr) {
            // 정상적으로 응답 받았을 경우에는 success 콜백이 호출되게 됩니다.
            // 이 콜백 함수의 파라미터에서는 응답 바디, 응답 코드 그리고 XHR 헤더를 확인할 수 있습니다.
            result = data.data;
        },
        error: function (xhr, status, error) {
            // 응답을 받지 못하였다거나 정상적인 응답이지만 데이터 형식을 확인할 수 없기 때문에 error 콜백이 호출될 수 있습니다.
            // 예를 들어, dataType을 지정해서 응답 받을 데이터 형식을 지정하였지만, 서버에서는 다른 데이터형식으로 응답하면  error 콜백이 호출되게 됩니다.
            throw new Error(`Error :: status : ${status}, error : ${error}`);
        }
    });
    console.log(result);
    return result;
}

function apiCreateTable(database_no, table, success, failed) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "id": "randomString",
        "name": "randomString",
        "position": {
            "left": 400,
            "top": 150
        },
        "columns": [
            {
                "id": "randomString",
                "name": "randomString",
                "type": "INT",
                "pk": false,
                "comment": null,
                "auto_increment": false,
                "nullable": false
            }
        ]
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    fetch(`${host}/query/create/${database_no}/table`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            success();
        })
        .catch((error) => {
            console.log('error', error);
            failed();
        });
}

function apiCreateTableRow(database_no, table_id, table_row, success, failed) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "id": "randomString",
        "name": "randomString",
        "type": "INT",
        "pk": false,
        "auto_increment": false,
        "nullable": false,
        "comment": null
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`${host}/query/create/${database_no}/table/${table_id}/row`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            success();
        })
        .catch((error) => {
            console.log('error', error);
            failed();
        });
}

function apiUpdateTable(database_no, table_id, table, success, failed) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "name": "update_name",
        "position": {
            "left": 1400,
            "top": 200
        }
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`${host}/query/update/${database_no}/table/${table_id}`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            success();
        })
        .catch((error) => {
            console.log('error', error);
            failed();
        });
}

function apiUpdateTableRow(database_no, table_id, table_row, success, failed) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "id": "randomString",
        "name": "randomString",
        "type": "INT",
        "pk": false,
        "auto_increment": false,
        "nullable": false,
        "comment": "comment test"
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    fetch(`${host}/query/update/${database_no}/table/${table_id}/row`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            success();
        })
        .catch((error) => {
            console.log('error', error);
            failed();
        });
}

function apiUpdateTablePosition(database_no, table_id, position, success, failed) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "position": {
            "left": 400,
            "top": 600
        }
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    fetch(`${host}/query/update/${database_no}/table/${table_id}/position`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            success();
        })
        .catch((error) => {
            console.log('error', error);
            failed();
        });
}

function apiUpdateTablePositions(database_no, tables, success, failed) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify([
        {
            "id": "randomString",
            "position": {
                "left": 400,
                "top": 150
            }
        },
        {
            "id": "randomString",
            "position": {
                "left": 400,
                "top": 150
            }
        },
        {
            "id": "randomString",
            "position": {
                "left": 400,
                "top": 150
            }
        }
    ]);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`${host}/query/update/${database_no}/table/positions`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            success();
        })
        .catch((error) => {
            console.log('error', error);
            failed();
        });
}

function apiUpdateTableRowsOrder(database_no, table_id, table_rows, success, failed) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify([
        {
            "id": "randomString",
            "name": "randomString",
            "order": 1
        },
        {
            "id": "randomString",
            "name": "randomString",
            "order": 2
        },
        {
            "id": "randomString",
            "name": "randomString",
            "order": 3
        },
        {
            "id": "randomString",
            "name": "randomString",
            "order": 4
        }
    ]);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    fetch(`${host}/query/update/10/table/${table_id}/rows`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            success();
        })
        .catch((error) => {
            console.log('error', error);
            failed();
        });
}

function apiDeleteTable(database_no, table_id, success, failed) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
    };

    fetch(`${host}/query/delete/${database_no}/table/${table_id}`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            success();
        })
        .catch((error) => {
            console.log('error', error);
            failed();
        });
}

function apiDeleteTableRow(database_no, table_id, row_id, success, failed) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
    };

    fetch(`${host}/query/delete/${database_no}/table/${table_id}/row/${row_id}`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            success();
        })
        .catch((error) => {
            console.log('error', error);
            failed();
        });
}

function apiConnectLine(database_no, table_id, line, success, failed) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "to": "n2o6n9gv",
        "to_row": "292kcffs",
        "from": "723x330e",
        "from_row": "8tff3pup"
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    fetch(`${host}/query/create/${database_no}/table/${table_id}/line`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            success();
        })
        .catch((error) => {
            console.log('error', error);
            failed();
        });
}

function apiDisconnectLine(database_no, table_id, lines, success, failed) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify([
        {
            "to": "n2o6n9gv",
            "to_row": "292kcffs",
            "from": "723x330e",
            "from_row": "8tff3pup"
        },
        {
            "to": "n2o6n9gv",
            "to_row": "292kcffs",
            "from": "723x330e",
            "from_row": "8tff3pup"
        }
    ]);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    fetch(`${host}/query/delete/${database_no}/table/${table_id}/lines`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            success();
        })
        .catch((error) => {
            console.log('error', error);
            failed();
        });
}

function apiCreateNextId(database_no, type) {
    let result;
    type = type.toLowerCase();
    $.ajax({
        type: 'GET', //요청 메소드 타입
        //type = table or row
        url: `${host}/query/create/${database_no}/${type}/next/id`, //요청 경로
        async: false, //비동기 여부
        cache: false, //캐시 여부
        contentType: 'application/json', //요청 컨텐트 타입 "application/x-www-form-urlencoded; charset=UTF-8"
        dataType: 'json', //응답 데이터 형식 명시하지 않을 경우 자동으로 추측
        success: function (data, status, xhr) {
            // 정상적으로 응답 받았을 경우에는 success 콜백이 호출되게 됩니다.
            // 이 콜백 함수의 파라미터에서는 응답 바디, 응답 코드 그리고 XHR 헤더를 확인할 수 있습니다.
            result = data.data.id;
        },
        error: function (xhr, status, error) {
            // 응답을 받지 못하였다거나 정상적인 응답이지만 데이터 형식을 확인할 수 없기 때문에 error 콜백이 호출될 수 있습니다.
            // 예를 들어, dataType을 지정해서 응답 받을 데이터 형식을 지정하였지만, 서버에서는 다른 데이터형식으로 응답하면  error 콜백이 호출되게 됩니다.
            throw new Error(`Error :: status : ${status}, error : ${error}`);
        }
    });
    return result;
}