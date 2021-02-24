/* eslint-disable @typescript-eslint/camelcase */
import { axiosInstance } from "@/boot/axios";
import { createStore } from "vuex";
import { getAccessToken, getRefreshToken } from "@/utils/cookiesUtils";
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
    callback(_, code) {
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
    dispathRefreshToken() {
      axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        headers: {
          Authorization: `Basic ${process.env.VUE_APP_SPOTIFY_CLIENT_64}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: querystring.stringify({
          grant_type: "refresh_token",
          refresh_token: getRefreshToken()
        })
      })
        .then(response => {
          console.log(response);
          document.cookie = `access_token=${response.data.access_token}; path=/`;
          document.cookie = `expires_in=${response.data.expires_in};  path=/`;
          document.cookie = `refresh_token=${getRefreshToken()};  path=/`;
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
    currentUser({ dispatch, commit }) {
      axiosInstance({
        method: "get",
        url: "me",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      })
        .then(response => {
          commit("setUser", response.data);
          dispatch("playlists", response.data.id);
        })
        .catch(error => {
          if (error.response && error.response.status === 422) {
            return;
          }
          throw error;
        });
    },
    playlists({ commit }, userId) {
      commit("setLoading", true);

      axiosInstance({
        method: "get",
        url: `users/${userId}/playlists?limit=8`,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      })
        .then(response => {
          commit("setPlaylists", response.data.items);
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

      axiosInstance({
        method: "get",
        url: "me/player/recently-played?limit=6",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      })
        .then(response => {
          commit("setRecentlyPlayed", response.data.items);
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

      axiosInstance({
        method: "get",
        url: `me/top/artists?limit=${limit}`,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      })
        .then(response => {
          commit("setTopArtists", response.data.items);
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

      axiosInstance({
        method: "get",
        url: `https://api.spotify.com/v1/me/top/tracks?limit=${limit}`,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      })
        .then(response => {
          commit("setTopTracks", response.data.items);
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
