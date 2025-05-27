import { getProducts } from "@/api";

const products = {
    state() {
        return {
            productsList: [],
            productsLoading: false,
            productsError: null
        }
    },
    mutations: {
        SET_PRODUCTS_LIST(state, newProductsList) {
            state.productsList = newProductsList
        },
        SET_PRODUCTS_LOADING(state, value) {
            state.productsLoading = value
        },
        SET_PRODUCTS_ERROR(state, error) {
            state.productsError = error
        }
    },
    getters: {
        GET_PRODUCTS(state) {
            return state.productsList
        },
        GET_PRODUCTS_LOADING(state) {
            return state.productsLoading
        },
        GET_PRODUCTS_ERROR(state) {
            return state.productsError
        }
    }, actions: {
        FETCH_PRODUCTS({ commit }, searchOptions = {}) {
            commit("SET_PRODUCTS_LOADING", true)
            commit("SET_PRODUCTS_ERROR", null)

            getProducts(searchOptions)
                .then((data) => {
                    commit("SET_PRODUCTS_LIST", data.products)
                })
                .catch((error) => {
                    commit("SET_PRODUCTS_ERROR", error.message)
                })
                .finally(() => {
                    commit("SET_PRODUCTS_LOADING", false)
                })
        }
    }
}
export default products