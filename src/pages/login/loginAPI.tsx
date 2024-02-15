import axios from 'axios';

const wsGameApi = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
});

export const apiPlayerEndpoint = '/player';

export const getPlayers = async () => {
    const res = await wsGameApi.get(apiPlayerEndpoint);
    return res.data;
}

export const addPlayer = async (addPlayerDTO: { name: string }) => {
    const { name } = addPlayerDTO;
    const res = await wsGameApi.post(apiPlayerEndpoint, name);
    return res.data;
}

export const deletePlayer = async (deletePlayerDTO: { id: string }) => {
    const { id } = deletePlayerDTO;

    return await wsGameApi.delete(`${apiPlayerEndpoint}/${id}`);
}
