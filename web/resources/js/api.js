let host = 'http://localhost:8080';

async function apiLogin() {
    function apiFetchLogin(email, password) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');

        let raw = JSON.stringify({
            email,
            password
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/auth/login`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchLogin('zlzldntlr@naver.com', 'zlzldntlr');
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function apiRegister() {
    function apiFetchRegister(name, phone, email, password) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');

        let raw = JSON.stringify({
            name,
            phone,
            email,
            password
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/auth/register`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchRegister('kimwoosik', '010-4529-9453', 'zlzldntlr@naver.com', 'zlzldntlr');
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function apiFindEmail() {
    function apiFetchFindEmail(phone) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');

        let raw = JSON.stringify({
            phone
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/auth/find/email`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchFindEmail('010-4529-9453');
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function apiFindPassword() {
    function apiFetchFindPassword(email) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');

        let raw = JSON.stringify({
            email
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/auth/find/password`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchFindPassword('zlzldntlr@naver.com');
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function apiSendCode() {
    function apiFetchSendCode() {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
        };
        const response = fetch(`${host}/auth/code/send`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchSendCode(tokenGenerator(8));
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function apiConfirmCode() {
    function apiFetchConfirmCode(code) {
        let myHeaders = new Headers();
        myHeaders.append('Content-type', 'application/json');
        let row = JSON.stringify({
            code
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: row,
        };
        const response = fetch(`${host}/auth/code/confirm`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchConfirmCode(tokenGenerator(8));
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function apiChangePassword() {
    function apiFetchChangePassword(password) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');

        let raw = JSON.stringify({
            password
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/auth/change/password`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchChangePassword('zlzldntlr');
        return result;
    } catch (error) {
        console.log(error);
    }
}