export const saveToken = (response) => {
    localStorage.csrf = response.data.csrf;
    localStorage.signedIn = true;
}

export const removeToken = () => {
    delete localStorage.csrf;
    delete localStorage.signedIn;
}

export const saveCart = (items) => {
    localStorage.cart = JSON.stringify(items)
}

export const getCart = () => {
    let items = JSON.parse(localStorage.getItem('cart') || '[]')
    return items;
}

export const removeCart = () => {
    delete localStorage.cart
}