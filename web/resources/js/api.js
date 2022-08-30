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

async function apiChangeName() {
    function apiFetchChangeName(name) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');

        let raw = JSON.stringify({
            name
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/auth/change/name`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchChangeName('zlzldntlr');
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function apiChangeProfile(file) {
    function apiFetchChangeProfile(file) {
        const formData = new FormData();
        formData.append('file', file);

        let requestOptions = {
            method: 'POST',
            body: formData,
        };
        const response = fetch(`${host}/auth/change/profile`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchChangeProfile(file);
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function apiChangeEmail() {
    function apiFetchChangeEmail(email) {
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
        const response = fetch(`${host}/auth/change/email`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchChangeEmail('zlzldntlr1@naver.com');
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function apiChangePhone() {
    function apiFetchChangePhone(phone) {
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
        const response = fetch(`${host}/auth/change/phone`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchChangePhone('010-4529-9453');
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function apiChangeMarketingAgree() {
    function apiFetchChangeMarketingAgree(agree) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');

        let raw = JSON.stringify({
            agree
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/auth/change/agree`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchChangeMarketingAgree(true);
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function apiChangeWithdrawal() {
    function apiFetchChangeWithdrawal(password) {
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
        const response = fetch(`${host}/auth/withdrawal`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchChangeWithdrawal('zlzldntlr');
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function apiChangeTeamGrant(grant) {
    function apiFetchChangeTeamGrant() {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');

        let raw = JSON.stringify(grant);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/auth/change/team/grant`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchChangeTeamGrant(grant);
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function apiDeleteTeamGrant(grant) {
    function apiFetchDeleteTeamGrant(grant) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');

        let raw = JSON.stringify(grant);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/auth/delete/team/grant`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchDeleteTeamGrant(grant);
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function apiChangePlugGrant(grant) {
    function apiFetchChangePlugGrant() {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');

        let raw = JSON.stringify(grant);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/auth/change/plug/grant`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchChangePlugGrant(grant);
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function apiDeletePlugGrant(grant) {
    function apiFetchDeletePlugGrant(grant) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');

        let raw = JSON.stringify(grant);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/auth/delete/plug/grant`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchDeletePlugGrant(grant);
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function apiAddPlugGrant(grant) {
    function apiFetchAddPlugGrant(grant) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');

        let raw = JSON.stringify(grant);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = fetch(`${host}/auth/add/plug/grant`, requestOptions);
        return response.then(res => res.json());
    }

    let result;
    try {
        result = await apiFetchAddPlugGrant(grant);
        return result;
    } catch (error) {
        console.log(error);
    }
}