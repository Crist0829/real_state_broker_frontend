import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept' : 'application/json'
    },
    withCredentials: true,
    withXSRFToken: true
})

/* axios.interceptors.request.use((config)=>{
    
}) */

export default axios