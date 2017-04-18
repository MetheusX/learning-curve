import Axios from 'axios'

const API_URL = 'http://5879e473326f981200e7053f.mockapi.io/api';

export const fetchItems = () => Axios.get(`${API_URL}/items`);
export const fetchItem = id => Axios.get(`${API_URL}/items/${id}`);
