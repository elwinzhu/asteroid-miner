import {MinerStatus} from "../../assets/constants";
import {logHistory} from "../../utils/history";
import {dropTable} from "../../utils/db";

const state = {
    //fullDataList: null,
    asteroidsList: null,
    minersList: null,
    planetsList: null,
    tick: 0
};


const mutations = {
    // setFullDataList: (state, list) => {
    //     //console.log(list);
    //     state.fullDataList = list;
    // },
    setAsteroids: (state, list) => {
        list.forEach(ast => {
            ast.displayPosition = `${ast.position.x},${ast.position.y}`;
            ast.displayMinerals = `${ast.currentMinerals}/${ast.initMinerals}`;
            //ast.displayCurrenMiner = (ast.currentMiner && ast.currentMiner.name) || 0;
            ast.displayCurrentMiner = state.minersList.filter(x => x.status === 2 && x.target === ast._id)
                .map(x => x.name).join(",") || 0;
        });

        state.asteroidsList = list;
    },
    setMiners: (state, list) => {
        list.forEach(miner => {
            miner.planetName = state.planetsList.find(x => x._id === miner.planet).name;
            miner.displayCapacity = `${miner.carryCapacity}/200`;
            miner.displayPosition = `${parseInt(miner.position.x)},${parseInt(miner.position.y)}`;
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
    }
};

const actions = {
    updateDataList({commit, state}, dataList) {
        //commit("setFullDataList", dataList);

        if (dataList.currentTick < state.tick) {
            //new round for another 6 min
            dropTable();
        }

        //pass the prev data whenever getting a new one
        logHistory(
            {miners: state.minersList},
            {
                miners: dataList.miners,
                tick: dataList.currentTick
            }
        );

        commit("setPlanets", dataList.planets);
        //should set miners before asteroid
        //as asteroids need to check the miners
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
