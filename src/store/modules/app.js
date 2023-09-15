
const state = {
    showCreateMinerPop: false
};


const mutations = {
    setShowCreateMinerPop: (state, show) => {
        state.showCreateMinerPop = show;
    }
};

const actions = {

};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
