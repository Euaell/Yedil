import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	}
})

export const ENDPOINTS = {
	user: {
		login: '/users/login',

	}
}

export const createAPIEndpoint = (endpoint) => {
	let url = `${BASE_URL}/${endpoint}`
	return {
		fetchAll: () => api.get(url),
		fetchById: (id) => api.get(`${url}/${id}`),
		post: (newRecord) => api.post(url, newRecord),
		update: (id, updatedRecord) =>
			api.put(`${url}/${id}`, updatedRecord),
		delete: (id) => api.delete(`${url}/${id}`)
	}
}
