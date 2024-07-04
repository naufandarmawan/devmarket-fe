import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

const refreshTokenRequest = async (refreshToken) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refreshtoken`, { refreshToken });
        return response.data.data;
    } catch (error) {
        console.error('Refresh token error:', error);
        return null;
    }
};

api.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const originalRequest = error.config;
        console.log(error);

        const message = error.response?.data?.message;
        console.log(message);
        if (message === "Expired Token" && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = await localStorage.getItem('refreshToken')
                const newTokens = await refreshTokenRequest(refreshToken);

                if (newTokens) {
                    await localStorage.setItem('token', newTokens.token);
                    await localStorage.setItem('refreshToken', newTokens.refreshToken);
                    originalRequest.headers.Authorization = `Bearer ${newTokens.token}`;
                    return api(originalRequest);
                }

                return api(originalRequest)
            } catch (error) {
                console.log(error);
            }
        }

        return Promise.reject(error);
    }
);

export default api