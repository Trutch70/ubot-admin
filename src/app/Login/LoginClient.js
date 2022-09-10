const requestJWT = async (data) => {
    return fetch(process.env.REACT_APP_API_HOST + '/security/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const LoginClient = {
    requestJWT,
}

export default LoginClient;