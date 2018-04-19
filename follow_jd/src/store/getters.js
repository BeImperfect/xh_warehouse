export default {
    loading: state => {
        return state.isShow
    },
    showNav: state => {
        return state.isNavShow
    },
    getUserInfo: state => {
        return state.userInfo
    }
}