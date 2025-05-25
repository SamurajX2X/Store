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
    },
    actions: {
        FETCH_PRODUCTS({ state, commit }) {
            // Pobieranie danych
            commit("SET_PRODUCTS_LOADING", true)

            //  Clear poprzedich obiektow
            commit("SET_PRODUCTS_LIST", [])

            getProducts()
                .then((data) => {
                    commit("SET_PRODUCTS_LIST", data.products)  // Access products property
                    commit("SET_PRODUCTS_LOADING", false)
                })
                .catch((error) => {
                    commit("SET_PRODUCTS_ERROR", error.message || "Failed to load products")
                    commit("SET_PRODUCTS_LOADING", false)
                })
        }
    }
}
export default products