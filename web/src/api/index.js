import axios from 'axios'

const BASE_URL = 'http://localhost:3991/api/v1'

axios.defaults.withCredentials = true
axios.defaults.credentials = "include"

const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
	credentials: "include",
	responseType: 'json'
})

export const ENDPOINTS = {
	user: {
		post: {
			login: 'users/login',
			register: 'users/',
			verifyEmail: 'unverified-users',
			resendEmail: 'unverified-users/resend'
		},
		get: {
			logout: 'users/logout',
			verifyUser: 'users/verifyuser'
		}
	},
	blog: {
		get: {
			all: 'blogs',
			byId: 'blogs',
			byUser: 'blogs/myblogs'
		},
		post: {
			create: 'blogs'
		}
	},
	todo: {
		get: {
			all: 'todolist',
			byId: 'todolist'
		},
		post: {
			create: 'todolist'
		}
	}

}

export const createAPIEndpoint = (endpoint) => {
	let url = `${BASE_URL}/${endpoint}`

	return {
		fetchAll: () => api.get(url),
		fetchById: (id) => api.get(`${url}/${id}`),
		post: (newRecord) => api.post(url, newRecord),
		put: (id, updatedRecord) => api.put(`${url}/${id}`, updatedRecord),
		delete: (id) => api.delete(`${url}/${id}`)
	}

}
