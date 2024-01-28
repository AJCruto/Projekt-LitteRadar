import axios from 'axios';

// Set the base URL globally
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

// Optional: You can also set default headers, interceptors, and other Axios configuration options here.

export default axios;