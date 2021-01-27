export const saveToken = (response) => {
    localStorage.csrf = response.data.csrf;
    localStorage.signedIn = true;
}

export const removeToken = () => {
    delete localStorage.csrf;
    delete localStorage.signedIn;
}