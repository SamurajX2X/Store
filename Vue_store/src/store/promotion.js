import { getPromotion, getProduct } from "@/api"

const promotion = {
    state() {
        return {
            promotionObject: {},
            promotionLoading: false,
            promotionError: null
        }
    },
    mutations: {
        SET_PROMOTION_OBJECT(state, newPromotionObject) {
            state.promotionObject = newPromotionObject
        },
        SET_PROMOTION_LOADING(state, value) {
            state.promotionLoading = value
        },
        SET_PROMOTION_ERROR(state, error) {
            state.promotionError = error
        }
    },
    getters: {
        GET_PROMOTION_OBJECT(state) {
            return state.promotionObject
        },
        GET_PROMOTION_LOADING(state) {
            return state.promotionLoading
        },
        GET_PROMOTION_ERROR(state) {
            return state.promotionError
        }
    },
    actions: {
        FETCH_PROMOTION({ state, commit, getters }, promotionId) {
            // zaczynamy pobierać dane
            commit("SET_PROMOTION_LOADING", true)

            // czyścimy poprzedni obiekt promocji
            commit("SET_PROMOTION_OBJECT", {})

            // poniższa funkcja ustala co się dziele przy jakimś błędzie
            const handleError = () => {
                commit("SET_PROMOTION_ERROR", "server error!!!")
                commit("SET_PROMOTION_LOADING", false)
            }

            // lista wszystkich promocji ze store promotions.js
            // dostęp do danych drugiego store z poprzedniej lekcji zapewnia argumenet getters
            // w akcji FETCH_PROMOTION
            const promotionsList = getters.GET_PROMOTIONS_LIST

            // na tym etapie warto wylogować czy mamy dane w store, pobrane z serwera
            console.log(promotionsList)

            // wyszukaj za pomocą find() w promotionsList taką promocję która ma id = promotionId
            const promotionFromStore = promotionsList.find(promotion => promotion.id === promotionId)

            const handlePromotion = (data) => {
                // tu dostajemy obiekty produktów z danej promocji
                const fetchPromises = data.items.map((productId) => getProduct(productId));

                // a jak je dostaniemy to ustalamy w store, dodając je do danych promotionObject
                // trzy kropki , tzw spread operator, służy do kopiowania obiektu czy tablicy

                // i kończymy ładowanie loadera
                Promise.all(fetchPromises)
                    .then((values) => {
                        const returnObject = { ...data, items: values.map(v => v.product) };
                        commit("SET_PROMOTION_OBJECT", returnObject);
                        commit("SET_PROMOTION_LOADING", false);
                    })
                    .catch(handleError);
            }

            // jeśli jest promocja w store to ją obsługujemy ze store
            if (promotionFromStore) {
                handlePromotion(promotionFromStore)
            }

            // jeśli nie ma, to pobieramy z serwera (np przy odświeżeniu strony)
            else {
                getPromotion(promotionId)
                    .then(response => handlePromotion(response.promotion))
                    .catch(handleError)
            }
        }
    }
}

export default promotion