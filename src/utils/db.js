const openDb = () => {
    const dbName = "asteroid";
    const version = "1.0";
    const desc = "asteroid-miner";
    const size = 3 * 1024 * 1024;

    return openDatabase(dbName, version, desc, size);
};

const sqlCreateTab = `CREATE TABLE IF NOT EXISTS history 
    (id integer primary key autoincrement, miner, dateTime, year, planet, carryCapacity, travelSpeed, miningSpeed, position, status, action)
`;
const sqlInsertHistory = `INSERT INTO history
    (miner, dateTime,  year, planet, carryCapacity, travelSpeed, miningSpeed, position, status, action) VALUES
    (?,       ?,     ?,      ?,             ?,           ?,          ?,         ?,       ?,     ? )    
`;
const sqlQueryHistory = `SELECT * FROM history where miner=? order by id desc`;

export function insert(history) {
    let db = openDb();
    db.transaction(function (tx) {
        tx.executeSql(sqlCreateTab);
        tx.executeSql(sqlInsertHistory, [
            history.miner,
            history.dateTime,
            history.year,
            history.planet,
            history.carryCapacity,
            history.travelSpeed,
            history.miningSpeed,
            history.position,
            history.status,
            history.action
        ]);
    });
}

export function select(minerName, callback) {
    let db = openDb();
    db.transaction(function (tx) {
        tx.executeSql(sqlCreateTab);
        tx.executeSql(sqlQueryHistory, [minerName], function (tx, results) {
            callback(tx, Object.values(results.rows));
        }, null);
    });
}

export function insertMany(list) {
    let db = openDb();
    db.transaction(function (tx) {
        tx.executeSql(sqlCreateTab);

        list.forEach(history => {
            tx.executeSql(sqlInsertHistory, [
                history.miner,
                history.dateTime,
                history.year,
                history.planet,
                history.carryCapacity,
                history.travelSpeed,
                history.miningSpeed,
                history.position,
                history.status,
                history.action
            ]);
        });
    });
}

export function dropTable() {
    let db = openDb();
    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE history');
    });
}