import axios from 'axios';

const wsGameApi = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
});

export const apiPlayerEndpoint = '/players';

export const getPlayers = async () => {
    console.log('Login API - getPlayers fired!');
    const res = await wsGameApi.get(apiPlayerEndpoint);
    console.log(res);
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
