/* eslint-disable @typescript-eslint/camelcase */
import { axiosInstance } from "@/boot/axios";
import { createStore } from "vuex";
import { getAccessToken } from "@/utils/cookiesUtils";
import axios from "axios";
import querystring from "query-string";

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
      const authEndpoint = "https://accounts.spotify.com/authorize";
      const clientId = process.env.VUE_APP_SPOTIFY_CLIENT;
      const redirectUri = process.env.VUE_APP_REDIRECT_URI_AUTHORIZE;
      const scopes = [
        "user-read-private user-read-email user-read-recently-played user-top-read playlist-read-private"
      ];

      window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
        "%20"
      )}&response_type=code`;
    },
    callback({ commit }, code) {
      axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        headers: {
          Authorization: `Basic ${process.env.VUE_APP_SPOTIFY_CLIENT_64}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: querystring.stringify({
          grant_type: "authorization_code",
          redirect_uri: process.env.VUE_APP_REDIRECT_URI,
          code
        })
      })
        .then(response => {
          document.cookie = `access_token=${response.data.access_token}; path=/`;
          document.cookie = `expires_in=${response.data.expires_in};  path=/`;
          document.cookie = `refresh_token=${response.data.refresh_token};  path=/`;
          document.cookie = `date_now=${Date.now()};  path=/`;
          window.location.href = process.env.VUE_APP_REDIRECT_URI;
        })
        .catch(error => {
          if (error.response && error.response.status === 422) {
            console.log(error);
            return;
          }
          throw error;
        });
    },
    currentUser({ commit }) {
      axiosInstance
        .post("/user", JSON.stringify({ access_token: getAccessToken() }))
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
        .post(
          "/playlists",
          JSON.stringify({ cookie: getAccessToken(), userInfo: state.userInfo })
        )
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
        .post("/recentlyPlayed", JSON.stringify({ cookie: getAccessToken() }))
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
        .post(
          "/topArtists",
          JSON.stringify({ cookie: getAccessToken(), limit })
        )
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
        .post("/topTracks", JSON.stringify({ cookie: getAccessToken(), limit }))
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
