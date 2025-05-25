import { getCategories } from "@/api"

const categories = {
    state() {
        return {
            categoriesList: [],
            categoriesLoading: false,
            categoriesError: null
        }
    },
    mutations: {
        SET_CATEGORIES_LIST(state, newCategoriesList) {
            state.categoriesList = newCategoriesList
        },
        SET_CATEGORIES_LOADING(state, value) {
            state.categoriesLoading = value
        },
        SET_CATEGORIES_ERROR(state, error) {
            state.categoriesError = error
        }
    },
    getters: {
        GET_CATEGORIES(state) {
            return state.categoriesList
        },
        GET_CATEGORIES_LOADING(state) {
            return state.categoriesLoading
        },
        GET_CATEGORIES_ERROR(state) {
            return state.categoriesError
        }
    },
    actions: {
        FETCH_CATEGORIES({ state, commit }) {
            commit("SET_CATEGORIES_LOADING", true)
            getCategories()
                .then(response => {
                    commit("SET_CATEGORIES_LIST", response.data)
                })
                .catch(error => {
                    commit("SET_CATEGORIES_ERROR", error)
                })
                .finally(() => {
                    commit("SET_CATEGORIES_LOADING", false)
                })
        }
    }
}

export default categories