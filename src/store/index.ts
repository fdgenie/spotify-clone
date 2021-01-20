import { createStore } from "vuex";

export default createStore({
  state: {},
  mutations: {},
  actions: {
    login() {
      window.location.href = "http://localhost:9000/.netlify/functions/api";
    }
    // getArtist({ commit }) {
    //   axiosInstance
    //     .post("/art", { cookie: "response.data.access_token" })
    //     .then(response => {
    //       console.log(response);
    //     })
    //     .catch(error => {
    //       if (error.response && error.response.status === 422) {
    //         return;
    //       }
    //       throw error;
    //     });
    // }
  },
  modules: {}
});
