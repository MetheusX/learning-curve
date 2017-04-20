import Axios from 'axios'

const API_URL = 'http://5879e473326f981200e7053f.mockapi.io/api';
const API_URL2 = 'http://58f8857e344585120066880c.mockapi.io/api/';

export const fetchItems = () => Axios.get(`${API_URL}/items`);
export const fetchItem = id => Axios.get(`${API_URL}/items/${id}`);
export const fetchNotifications = () => Axios.get(`${API_URL2}/notification`);
