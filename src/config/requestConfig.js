import axios from 'axios'
const request = axios.create({
	baseURL:"http://127.0.0.1:7001/admin/",
	timeout:3000,
	withCredentials:true
})

request.interceptors.request.use(config =>{
	if(config.url !== 'login'){
		const token = localStorage.getItem('token');
		config.headers['authorization'] = `Bearer ${token}`;
	}
	return config;
})

request.interceptors.response.use(
	response =>{
		const res = response.data;
		return res
	}
)

export default request;