import { axiosInstance } from "@/boot/axios";
import { createStore } from "vuex";
import { getAccessToken } from "@/utils/cookiesUtils";

export default createStore({
  state: {
    recentlyPlayed: [],
    topArtists: [],
    topTracks: [],
    userInfo: {},
    playlists: [],
    currentTrack: false,
    currentMainScreen: "Home",
    loading: false
  },
  getters: {
    getRecentlyPlayed: state => {
      return state.recentlyPlayed;
    },
    getTopArtists: state => {
      return state.topArtists;
    },
    getTopTracks: state => {
      return state.topTracks;
    },
    getUser: state => {
      return state.userInfo;
    },
    getPlaylists: state => {
      return state.playlists;
    },
    getCurrentTrack: state => {
      return state.currentTrack;
    },
    getCurrentMainScreen: state => {
      return state.currentMainScreen;
    },
    getLoading: state => {
      return state.loading;
    }
  },
  mutations: {
    setRecentlyPlayed(state, data) {
      state.recentlyPlayed = data;
    },
    setTopArtists(state, data) {
      state.topArtists = data;
    },
    setTopTracks(state, data) {
      state.topTracks = data;
    },
    setUser(state, data) {
      state.userInfo = data;
    },
    setPlaylists(state, data) {
      state.playlists = data;
    },
    setCurrentTrack(state, data) {
      state.currentTrack = data;
    },
    setCurrentMainScreen(state, data) {
      state.currentMainScreen = data;
    },
    setLoading(state, data) {
      state.loading = data;
    }
  },
  actions: {
    login() {
      window.location.href = "https://spotify-clone-server.netlify.app/";
    },
    currentUser({ commit }) {
      axiosInstance
        .post("/user", { cookie: getAccessToken() })
        .then(response => {
          commit("setUser", response.data);
        })
        .catch(error => {
          if (error.response && error.response.status === 422) {
            return;
          }
          throw error;
        });
    },
    playlists({ commit, state }) {
      commit("setLoading", true);

      axiosInstance
        .post("/playlists", {
          cookie: getAccessToken(),
          userInfo: state.userInfo
        })
        .then(response => {
          commit("setPlaylists", response.data);
        })
        .catch(error => {
          if (error.response && error.response.status === 422) {
            return;
          }
          throw error;
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
    recentlyPlayed({ commit }) {
      commit("setLoading", true);

      axiosInstance
        .post("/recentlyPlayed", { cookie: getAccessToken() })
        .then(response => {
          commit("setRecentlyPlayed", response.data);
        })
        .catch(error => {
          if (error.response && error.response.status === 422) {
            return;
          }
          throw error;
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
    topArtists({ commit }, { limit }) {
      commit("setLoading", true);

      axiosInstance
        .post("/topArtists", { cookie: getAccessToken(), limit })
        .then(response => {
          commit("setTopArtists", response.data);
        })
        .catch(error => {
          if (error.response && error.response.status === 422) {
            return;
          }
          throw error;
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
    topTracks({ commit }, { limit }) {
      commit("setLoading", true);

      axiosInstance
        .post("/topTracks", { cookie: getAccessToken(), limit })
        .then(response => {
          commit("setTopTracks", response.data);
        })
        .catch(error => {
          if (error.response && error.response.status === 422) {
            return;
          }
          throw error;
        })
        .finally(() => {
          commit("setLoading", false);
        });
    }
  },
  modules: {}
});
