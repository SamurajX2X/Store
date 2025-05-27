import axios from "axios"

const get = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        axios.get(url)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }, 500 + Math.random() * 1000)
})

const post = (url, userObject) => new Promise((resolve, reject) => {

    setTimeout(() => {
        axios.post(url, userObject, { withCredentials: true }) // nagłówek obsługiwany na serwerze
            .then(response => {
                console.log("data", response.data);
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })

    }, 1000);

})

const getPromotions = () => get("http://localhost:3000/promotions")
const getPromotion = (id) => get(`http://localhost:3000/promotion/${id}`)
const getProduct = (id) => get(`http://localhost:3000/product/${id}`)
const registerUser = (userObject) => post(`http://localhost:3000/createUser`, userObject);
const loginUser = (userObject) => post(`http://localhost:3000/loginUser`, userObject);
const logoutUser = () => post(`http://localhost:3000/logoutUser`);
const getCurrentUser = () => get(`http://localhost:3000/getCurrentUser`);
const getProducts = (options = {}) => {
    let url = "http://localhost:3000/products";

    const params = new URLSearchParams();
    if (options.name) params.append('name', options.name);
    if (options.category) params.append('category', options.category);
    if (options.fuel_type) params.append('fuel_type', options.fuel_type);
    if (options.drivetrain) params.append('drivetrain', options.drivetrain);
    if (options.transmission) params.append('transmission', options.transmission);
    if (options.min_price) params.append('min_price', options.min_price);
    if (options.max_price) params.append('max_price', options.max_price);
    if (options._sort) params.append('_sort', options._sort);
    if (options._order) params.append('_order', options._order);

    if (params.toString()) {
        url += `?${params.toString()}`;
    }

    return get(url);
};
const getCategories = () => get(`http://localhost:3000/categories`);

export { getPromotions, getPromotion, getProduct, registerUser, loginUser, logoutUser, getCurrentUser, getProducts, getCategories }