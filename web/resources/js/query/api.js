'use strict';

function apiGetTables(database_no) {
    let result = {
        tables: [],
        lines: []
    };
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
    return result;
};

function apiCreateTable(database_no, table, success, failed) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify(table);

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

    let raw = JSON.stringify(table_row);

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

    let raw = JSON.stringify(table);

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

    let raw = JSON.stringify(table_row);

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

    let raw = JSON.stringify(position);

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

    let raw = JSON.stringify(table_rows);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    fetch(`${host}/query/update/${database_no}/table/${table_id}/rows`, requestOptions)
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

function apiConnectLine(database_no, line, success, failed) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(line);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    fetch(`${host}/query/create/${database_no}/line`, requestOptions)
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

function apiDisconnectLine(database_no, lines, success, failed) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(lines);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    fetch(`${host}/query/delete/${database_no}/lines`, requestOptions)
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
        type: 'POST', //요청 메소드 타입
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

async function apiGetDatabases() {
    function apiFetchGetDatabases() {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        const response = fetch(`${host}/query/get/databases`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchGetDatabases();
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function apiCreateDatabase() {
    function apiFetchCreateDatabase() {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        let database = {
            name: $('[name="name"]').val(),
            description: $('[name="description"]').val(),
            database_type: $('.database-type-item-container .database-type-item.is-active[data-type]').data().type
        }
        let raw = JSON.stringify(database);
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/query/create/databases`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchCreateDatabase();
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function apiQueryCreateSQL(id) {
    function apiFetchQueryCreateSQL(id) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        const response = fetch(`${host}/query/get/database/validation/${id}`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchQueryCreateSQL(id);
        return result;
    } catch (error) {
        console.log(error);
    }
}