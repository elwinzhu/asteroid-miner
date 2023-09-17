import {MinerStatus} from "../../assets/constants";
import {logHistory} from "../../utils/history";

const state = {
    //fullDataList: null,
    asteroidsList: null,
    minersList: null,
    planetsList: null,
    tick: 0,

    asteroidInitMinerals: null
};


const mutations = {
    // setFullDataList: (state, list) => {
    //     //console.log(list);
    //     state.fullDataList = list;
    // },
    setAsteroids: (state, list) => {
        list.forEach(ast => {
            ast.displayPosition = `${ast.position.x},${ast.position.y}`;
            ast.initMineral = state.asteroidInitMinerals.find(m => m.id === ast._id).minerals;
            ast.displayMinerals = `${ast.minerals}/${ast.initMineral}`;
            ast.displayCurrenMiner = (ast.currentMiner && ast.currentMiner.name) || 0;
        });

        state.asteroidsList = list;
    },
    setMiners: (state, list) => {
        list.forEach(miner => {
            miner.planetName = miner.planet.name;
            miner.displayCapacity = `${miner.carryCapacity}/200`;
            miner.displayPosition = `${parseInt(miner.x)},${parseInt(miner.y)}`;
            miner.displayStatus = `${MinerStatus[miner.status]}`;
        });

        state.minersList = list;
    },
    setPlanets: (state, list) => {
        list.forEach(planet => {
            planet.displayMinerals = `${planet.minerals}/1000`;
        });
        state.planetsList = list;
    },
    setTick: (state, tick) => {
        state.tick = tick;
    },
    setInitMinerals: (state, asteroids) => {
        state.asteroidInitMinerals = asteroids.map(ast => {
            return {
                id: ast._id,
                minerals: ast.minerals
            }
        });
    }
};

const actions = {
    updateDataList({commit, state}, dataList) {
        //commit("setFullDataList", dataList);

        //pass the prev data whenever getting a new one
        logHistory(
            {miners: state.minersList},
            {
                miners: dataList.miners,
                tick: dataList.currentTick
            }
        );

        commit("setPlanets", dataList.planets);
        commit("setMiners", dataList.miners);
        commit("setAsteroids", dataList.asteroids);
        commit("setTick", dataList.currentTick);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
