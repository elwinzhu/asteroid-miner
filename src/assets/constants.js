export const MinerStatus = {
    0: "Idle",
    1: "Traveling",
    2: "Mining",
    3: "Transfering"
};


export const MinerColumns = (showPlanetName = true) => {
    return [
        {
            field: "_id", isRowKey: true, hidden: true
        },
        {
            field: "name", label: "Name",
            cellStyle: showPlanetName && ((data) => {
                return {color: 'white', textDecoration: 'underline'}
            })
        },
        showPlanetName && {
            field: "planetName", label: "Planet", width: 100,
        },
        {
            field: "displayCapacity", label: "CarryCapacity", width: 80,
            cellStyle: (data) => {
                if (data.carryCapacity === 200)
                    return {color: '#00CF67'}
            }
        },
        {
            field: "travelSpeed", label: "TravelSpeed", width: 75
        },
        {
            field: "miningSpeed", label: "MiningSpeed", width: 75
        },
        {
            field: "displayPosition", label: "Position",
        },
        {
            field: "displayStatus", label: "Status",
        }
    ].filter(x => !!x);
};

export const AsteroidColumns = [
    {
        field: "_id", isRowKey: true, hidden: true
    },
    {
        field: "name", label: "Name", width: 80
    },
    {
        field: "displayMinerals", label: "Minerals", width: 80,
        cellStyle: (data) => {
            if (data.minerals === 0)
                return {color: '#EB5757'}
        }
    },
    {
        field: "displayCurrenMiner", label: "CurrentMiner", width: 80
    },
    {
        field: "displayPosition", label: "Position", width: 80
    }
];

export const PlanetsColumns = [
    {
        field: "_id", isRowKey: true, hidden: true
    },
    {
        field: "name", label: "Name"
    },
    {
        field: "miners", label: "Miners"
    },
    {
        field: "displayMinerals", label: "Minerals",
        cellStyle: (data) => {
            if (data.minerals > 1000)
                return {color: '#00CF67'}
        }
    },
    {
        isAction: true,
        show: (data) => data.minerals > 1000
    }
];

export const HistoryColumns = [
    {
        field: "id", isRowKey: true, hidden: true
    },
    {
        field: "dateTime", label: "Date", minWidth: 120,
        maxWidth: 120
    },
    {
        field: "year", label: "Year", maxWidth: 40
    },
    {
        field: "planet", label: "Planet", maxWidth: 60
    },
    {
        field: "carryCapacity", label: "carryCapacity",
        template: (data) => `${data.carryCapacity}/200`,
        cellStyle: (data) => {
            if (parseInt(data.carryCapacity) >= 200)
                return {color: '#00CF67'}
        },
        maxWidth: 70
    },
    {
        field: "travelSpeed", label: "travelSpeed",  maxWidth: 65
    },
    {
        field: "miningSpeed", label: "miningSpeed",  maxWidth: 65
    },
    {
        field: "position", label: "Position", maxWidth: 60
    },
    {
        field: "action", label: "Status", minWidth:220
    }
];
