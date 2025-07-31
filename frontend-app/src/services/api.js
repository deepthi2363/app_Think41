
// services/api.js

import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/products';

export const getProducts = () => axios.get(API_BASE);

export const getProductById = (id) => axios.get(`${API_BASE}/${id}`);
