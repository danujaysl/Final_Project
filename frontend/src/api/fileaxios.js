import axios from 'axios';


const fileaxios = axios.create({
    baseURL:'http://127.0.0.1:5000',
    headers: {
        'Content-Type':'multipart/form-data',
      },

})

export default fileaxios;