import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.VUE_APP_RESERVATION_API_URL,
});

function setToken(token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function login({ email, password }) {
    return instance.post(`/auth/login`, { email, password });
}

function getListings(param) {
    return instance.get(param ? `/listings?type=${param}` : '/listings');
}

export default {
    setToken,
    login,
    getListings,
}