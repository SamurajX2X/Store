import { loginUser, logoutUser, getCurrentUser } from '@/api';

const user = {
    state() {
        return {
            userObject: null,
            userLoading: false,
        }
    },
    mutations: {
        SET_CURRENT_USER(state, userObject) {
            state.userObject = userObject;
        },
        SET_CURRENT_USER_LOADING(state, value) {
            state.userLoading = value;
        }
    },
    getters: {
        GET_CURRENT_USER(state) {
            return state.userObject;
        },
        GET_CURRENT_USER_LOADING(state) {
            return state.userLoading;
        }
    },
    actions: {
        LOGIN_USER({ commit, getters }, { email, password }) {
            commit("SET_CURRENT_USER_LOADING", true);

            return loginUser({ email, password })
                .then((userObject) => {
                    if (userObject.email) {
                        commit("SET_CURRENT_USER", userObject);
                    }
                })
                .finally(() => {
                    commit("SET_CURRENT_USER_LOADING", false);
                });
        },

        LOGOUT_USER({ commit }) {
            commit("SET_CURRENT_USER", null);
            return logoutUser();
        },

        FETCH_CURRENT_USER({ commit, getters }) {
            //jeśli w store jest user to go zwróć
            if (getters.GET_CURRENT_USER) {
                console.log("jest user w store");
                return Promise.resolve();
            }
            //jeśli w store nie ma usera to go weź z serwera
            //czyli z api /getCurrentUser
            else {
                commit("SET_CURRENT_USER_LOADING", true);
                //
                return getCurrentUser()
                    .then((userObject) => {
                        console.log("pobieranie usera", userObject);
                        // jeśli serwer mówi że zalogowany to wstawiam go do store

                        if (userObject.email) {
                            commit("SET_CURRENT_USER", userObject);
                        }
                    })
                    .finally(() => {
                        commit("SET_CURRENT_USER_LOADING", false);
                    });
            }
        }
    }
}

export default user;
