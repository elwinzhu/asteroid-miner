import axios from "axios";

axios.defaults.baseURL = "https://asteroids.dev.mediasia.cn";

export function getMiners({planetId, minerId}) {
    let url = "/miners";
    if (minerId) {
        url += `/${minerId}`
    }
    if (planetId) {
        url += `?planetId=${planetId}`;
    }

    return axios.get(url);
}

export function createMiner(data) {
    return axios.post("/miners", data);
}

export function updateMiner(id, data) {
    return axios.put(`/miners/${id}`, data);
}

export function deleteMiner(id) {
    return axios.delete(`/miners/${id}`);
}

export function getPlanets(planetId) {
    let url = "/planets";
    if (planetId) {
        url += `/${planetId}`
    }

    return axios.get(url);
}

export function createPlanet(data) {
    return axios.post("/planets", data);
}

export function updatePlanet(id, data) {
    return axios.put(`/planets/${id}`, data);
}

export function deletePlanet(id) {
    return axios.delete(`/planets/${id}`);
}

export function getAsteroids(asteroidId) {
    let url = "/asteroids";
    if (asteroidId) {
        url += `/${asteroidId}`
    }

    return axios.get(url);
}

export function createAsteroid(data) {
    return axios.post("/asteroids", data);
}

export function updateAsteroid(id, data) {
    return axios.put(`/asteroids/${id}`, data);
}

export function deleteAsteroid(id) {
    return axios.delete(`/asteroids/${id}`);
}