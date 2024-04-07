const HttpService = {
    post: function (url, body, token = '') {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token !== '' ? `Bearer ${token}` : null
            },
            body: body
        })
    },
    get: function (url, token = '') {
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token !== '' ? `Bearer ${token}` : null
            },
        })
    }
}

export default HttpService;