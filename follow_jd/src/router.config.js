import Home from './components/Home.vue'
import Category from './components/Category.vue'
import Cart from './components/Cart.vue'
import GoodsDetail from './components/GoodsDetail.vue'
import SearchPage from './components/SearchPage.vue'
import Mine from './components/Mine.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

export default [
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/search',
        component: SearchPage
    },
    {
        path: '/mine',
        component: Mine
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/category/:id',
        component: Category
    },
    {
        path: '/detail/:id',
        component: GoodsDetail
    },
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '*',
        redirect: '/home'
    }
]