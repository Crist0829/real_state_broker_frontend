import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'https://tl300.selfip.net:41/real_estate_broker_backend',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true
})

/* axios.interceptors.request.use((config)=>{
    
}) */

export default axios