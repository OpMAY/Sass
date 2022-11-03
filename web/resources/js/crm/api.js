'use strict';

async function getProjects() {
    function apiGetProjects() {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        const response = fetch(`${host}/crm/get/projects`, requestOptions);
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiGetProjects();
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function getUserTasks(type) {
    function apiGetUserTasks(type) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        const response = fetch(`${host}/crm/get/member/tasks?type=${type}`, requestOptions);
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiGetUserTasks(type);
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function createProject(project) {
    function apiCreateProject(project) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let raw = JSON.stringify(project);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        const response = fetch(`${host}/crm/create/project`, requestOptions);
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiCreateProject(project);
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function updateProject(project) {
    function apiUpdateProject(project) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let raw = JSON.stringify(project);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        const response = fetch(`${host}/crm/update/project`, requestOptions);
        return response.then((res) => res.json());
    }

    let result;
    try {
        result = await apiUpdateProject(project);
        return result;
    } catch (error) {
        console.log(error);
    }
}

