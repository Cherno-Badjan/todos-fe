export const USER = 'USER';

export function putUserInLs(user) {
    localStorage.setItem(USER, JSON.stringify(user));
}
export function getUserFromLs() {
    const user = localStorage.getItem(USER);

    if (user && user.token) return JSON.parse(user);

    return {
        email: '',
        id: '',
        token: ''
    }
}