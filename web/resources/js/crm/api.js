'use strict';

function apiCreateProject(project, success, failed) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify(project);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    fetch(`${host}/crm/create/project`, requestOptions)
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