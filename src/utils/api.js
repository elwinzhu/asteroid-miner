import axios from "axios";

axios.defaults.baseURL = "http://localhost:1681";

function responseToData(response) {
    if (response && response.status === 200) {
        return response.data;
    }

    return null;
}

export async function getMiners({planetId, minerId}) {
    let url = "/miners";
    if (minerId) {
        url += `/${minerId}`
    }
    if (planetId) {
        url += `?planetId=${planetId}`;
    }

    let response = await axios.get(url).catch(err => {
        return null;
    });
    return responseToData(response);
}

export async function createMiner(data) {
    let response = await axios.post("/miners", data).catch(err => {
        return null;
    });
    return responseToData(response);
}

export async function updateMiner(id, data) {
    return await axios.put(`/miners/${id}`, data)
}

export async function deleteMiner(id) {
    return axios.delete(`/miners/${id}`)
}

export async function getPlanets(planetId) {
    let url = "/planets";
    if (planetId) {
        url += `/${planetId}`
    }

    return axios.get(url);
}

export async function createPlanet(data) {
    return await axios.post("/planets", data)
}

export async function updatePlanet(id, data) {
    return axios.put(`/planets/${id}`, data)
}

export async function deletePlanet(id) {
    return axios.delete(`/planets/${id}`);

}

export async function getAsteroids(asteroidId) {
    let url = "/asteroids";
    if (asteroidId) {
        url += `/${asteroidId}`
    }

    return axios.get(url);
}

export async function createAsteroid(data) {
    return axios.post("/asteroids", data);
}

export async function updateAsteroid(id, data) {
    return axios.put(`/asteroids/${id}`, data);
}

export async function deleteAsteroid(id) {
    return axios.delete(`/asteroids/${id}`);
}