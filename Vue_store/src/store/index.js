import { createStore } from 'vuex'
import promotions from './promotions'
import promotion from './promotion'
import user from './user'
import products from './products'
import categories from './categories'

const modules = { promotions, promotion, user, products, categories }

export default createStore({ modules })