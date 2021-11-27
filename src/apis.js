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

function getListingDetails(id) {
    return instance.get(`/listings/${id}`)
}

function getMyBookings() {
    return instance.get(`my/reservations`);
}

function submitBooking(data) {
    console.log(data)
    const payload = {
        "listings_id": 18,
        "start_at": new Date(),
        "end_at": new Date(),
        "price": 100,
        "booking_fee": 0,
        "total": 0,
        "confirmed_at": new Date(),
        "denied_at": new Date(),
        "canceled_at": new Date(),
        "guests": 2,
        "name": "string",
        "email": "user@example.com"
    }
    return instance.post(`reservations`, payload)
}

export default {
    setToken,
    login,
    getListings,
    getListingDetails,
    getMyBookings,
    submitBooking
}