import {MinerStatus} from "../assets/constants";
import {insert, insertMany} from "./db";


function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}/{m}/{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time
    }
    else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }

    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        // getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        return value.toString().padStart(2, '0')
    });
    return time_str
}

const statusText = {
    idle: "Idle on planet {planetName}",
    spawn: "Miner spawn on planet {planetName}",
    travelingOut: "Traveling from {planetName} to asteroid {asteroidName}",
    mining: "Mining asteroid {asteroidName} for {yearsMined} years",
    travelingIn: "Traveling back from {asteroidName} to {planetName}",
    transferring: "Transferring minerals to planet {planetName}"
};

function defineAction(miner) {
    let action;
    if (miner.status === 0) {
        action = "idle";
    }
    else if (miner.status === 1) {
        if (miner.targetType === 'Planet') {
            return "travelingIn"
        }
        else if (miner.targetType === 'Asteroid') {
            return "travelingOut"
        }
    }
    else if (miner.status === 2) {
        return "mining"
    }
    else
        action = "transferring";

    return action;
}

export function logHistory({miners: prevList}, {miners: currentList, tick}) {
    let dateTime = parseTime(new Date());
    let list = currentList.map(miner => {
        let yearsMined = Math.floor(miner.minerals / miner.miningSpeed);
        let action = statusText[defineAction(miner)]
            .replace("{planetName}", miner.planet.name)
            .replace("{asteroidName}", miner.target.name)
            .replace("{yearsMined}", yearsMined);

        return {
            dateTime,
            year: tick,
            planet: miner.planet.name,
            carryCapacity: miner.minerals,
            travelSpeed: miner.travelSpeed,
            miningSpeed: miner.miningSpeed,
            position: `${parseInt(miner.x)},${parseInt(miner.y)}`,
            status: MinerStatus[miner.status],
            miner: miner.name,
            action
        }
    });

    insertMany(list);
}

export function logSpawnMiner(miner, planet, year) {
    const history = {
        dateTime: parseTime(new Date()),
        year,
        planet: planet.name,
        carryCapacity: miner.minerals,
        travelSpeed: miner.travelSpeed,
        miningSpeed: miner.miningSpeed,
        position: `${miner.x},${miner.y}`,
        status: MinerStatus[miner.status],
        miner: miner.name,
        action: statusText.spawn.replace("{planetName}", planet.name)
    };
    insert(history);
}


