import axios from 'axios';

// 환경 변수에 따라 자동으로 baseURL이 변경됩니다.
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
