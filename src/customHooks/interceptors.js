import axios from "axios";
// import Cookies from "universal-cookie";

axios.defaults.baseURL = "http://216.230.74.17:8013/api";

// const cookies = new Cookies();
function createAxiosResponseInterceptor() {
  const interceptor = axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status !== 401) {
        return Promise.reject(error);
      }
      axios.interceptors.response.eject(interceptor);

      return axios
        .post("/Auth/refresh-token", {
          accessToken: localStorage.getItem("myToken"),
          refreshToken: localStorage.getItem("refreshTok"),
        })
        .then((response) => {
          localStorage.setItem("myToken", response.data.accessToken);
          localStorage.setItem("refreshTok", response.data.refreshToken);
          error.response.config.headers[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;
          return axios(error.response.config);
        })
        .catch((error2) => {
          console.log(error2);
          return (
            localStorage.remove("myToken"),
            localStorage.remove("refreshTok"),
            this.router.push("/"),
            Promise.reject(error2)
          );
        })
        .finally(createAxiosResponseInterceptor);
    }
  );
}
createAxiosResponseInterceptor();
