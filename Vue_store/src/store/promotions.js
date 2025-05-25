import { getPromotions } from "@/api"

const promotions = {
    state() {
        return {
            promotionsList: [],
            promotionsLoading: false,
            promotionsError: null
        }
    },
    mutations: {
        SET_PROMOTIONS_LIST(state, newPromotions) {
            state.promotionsList = newPromotions
        },
        SET_PROMOTIONS_LOADING(state, value) {
            state.promotionsLoading = value
        },
        SET_PROMOTIONS_ERROR(state, error) {
            state.promotionsError = error
        }
    },
    getters: {
        GET_PROMOTIONS_LIST(state) {
            return state.promotionsList
        },
        GET_PROMOTIONS_LOADING(state) {
            return state.promotionsLoading
        },
        GET_PROMOTIONS_ERROR(state) {
            return state.promotionsError
        }
    },
    actions: {
        FETCH_PROMOTIONS({ commit }) {
            commit("SET_PROMOTIONS_LOADING", true)
            getPromotions()
                .then(data => commit("SET_PROMOTIONS_LIST", data.promotions))
                .catch(error => commit("SET_PROMOTIONS_ERROR", "server error!!!"))
                .finally(() => commit("SET_PROMOTIONS_LOADING", false))
        }
    }
}

export default promotions