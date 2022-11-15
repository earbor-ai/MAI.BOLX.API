import axios from "axios";
import Cookies from "universal-cookie";

axios.defaults.baseURL = "http://216.230.74.17:8013/api";

const cookies = new Cookies();
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
          accessToken: cookies.get("myToken"),
          refreshToken: cookies.get("refreshTok"),
        })
        .then((response) => {
          cookies.set("myToken", response.data.accessToken, { path: "/" });
          cookies.set("refreshTok", response.data.refreshToken, { path: "/" });
          error.response.config.headers[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;
          return axios(error.response.config);
        })
        .catch((error2) => {
          console.log(error2);
          return (
            cookies.remove("myToken", { path: "/" }),
            cookies.remove("refreshTok", { path: "/" }),
            this.router.push("/"),
            Promise.reject(error2)
          );
        })
        .finally(createAxiosResponseInterceptor);
    }
  );
}
createAxiosResponseInterceptor();
