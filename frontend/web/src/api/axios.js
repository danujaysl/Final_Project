import axios from 'axios';


const Axios = axios.create({
    baseURL:'http://127.0.0.1:5000',
    headers: {
        'Content-Type': 'application/json', // Set the request content type to JSON
      },
      withCredentials: true
})

export default Axios;