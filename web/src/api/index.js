import axios from 'axios'

const BASE_URL = 'https://yedil.onrender.com/api/v1'

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
		},
		delete: {
			deletebyId: 'blogs'
		}
	},
	todo: {
		get: {
			all: 'todolist',
			byId: 'todolist',
			suggestions: 'todolist/tasks'
		},
		post: {
			create: 'todolist'
		},
		put: {
			update: 'todolist',
			updateTask: 'todolist/tasks'
		},
		delete: {
			deletebyId: 'todolist'
		}
	},
	tags: {
		get: {
			all: 'tags'
		},
		post: {
			create: 'tags'
		}
	},
	image: {
		post: {
			upload: 'images'
		}
	}
}

export const createAPIEndpoint = (endpoint) => {
	let url = `${BASE_URL}/${endpoint}`
	api.defaults.headers.token = localStorage.getItem('token') || null

	return {
		fetchAll: () => api.get(url),
		fetchById: (id) => api.get(`${url}/${id}`),
		post: (newRecord) => api.post(url, newRecord),
		put: (id, updatedRecord) => api.put(`${url}/${id}`, updatedRecord),
		delete: (id) => api.delete(`${url}/${id}`)
	}

}
