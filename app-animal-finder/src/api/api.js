const BASE_URL = process.env.REACT_APP_API_BASE;
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const API = {
    get : async (url) => fetch(BASE_URL+API_VERSION+url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": window.localStorage.getItem('token')
        }
    }).then(response => {
        if(response.ok)
            return response.json();

        if (response.status === 405){
			localStorage.clear();
            window.location.href('/');
			return { Error: "Não autorizado !" };
		}

        if(response.status === 401){
            localStorage.clear();
            window.location.href('/');
			return { Error: "Não autorizado !" };
        }
    }).then(respo => { 
        return respo;
    }).catch(error => {
        return error;
    }),

    post : async (url, body) => fetch(BASE_URL+API_VERSION+url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": window.localStorage.getItem('token')
        },
        body: body && JSON.stringify(body)
    }).then(response => {
		console.log(response.status);
        if (response.ok)
			return response.json();

		if (response.status === 405){
			localStorage.clear();
            window.location.href = '/login';
			return { Error: "Não autorizado !" };
		}

		if(response.status === 401){
			localStorage.clear();
            window.location.href = '/login';
			return { Error: "Não autorizado !" };
        }
    }).catch(error => {
        return error;
    }),

    delete : async (url, body = null) => fetch(BASE_URL+API_VERSION+url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": window.localStorage.getItem('token')
        },        
        body: JSON.stringify(body)
    }).then(response => {
        if(response.ok)
            return response.json();

		if (response.status === 405){
			localStorage.clear();
            window.location.href = '/login';
			return { Error: "Não autorizado !" };
		}

        if(response.status === 401){
            localStorage.clear();
            window.location.href = '/login';
			return { Error: "Não autorizado !" };
        }
    }).then(respo => { 
        return respo;
    }).catch(error => {
        return error;
    })
};