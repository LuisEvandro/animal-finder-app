export const TOKEN_KEY = "Token";
export const USER_KEY = "UserData";

export const isAuthenticated = () => { 
	if(localStorage.getItem(TOKEN_KEY) && localStorage.getItem(USER_KEY)){
		return true;
	}else{
		return false;
	}
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = token => {
	localStorage.setItem(TOKEN_KEY, token);
};

export const setUserData = user => {

	let data = {
		name: user.name,
		email: user.email,
		guid: user.guid,
		phone: user.phone,
		created_at: user.created_at,
		updated_at: user.updated_at
	}

	localStorage.setItem(USER_KEY, JSON.stringify(data));
};

export const getUserData = () => { return JSON.parse(localStorage.getItem(USER_KEY)) };

export const logout = () => {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(USER_KEY);
};