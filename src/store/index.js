import { createStore } from "vuex";
import api from "../api/api";

export default createStore({
  state: {
    images: [],
    breed_images: [],
    uploaded_image: {},
  },
  getters: {
    GET_IMAGES(state) {
      return state.images.map((image) => {
        return {
          ...image,
          breed: image.breeds[0],
        };
      });
    },
    GET_UPLOAD_IMAGE(state) {
      return state.uploaded_image;
    },
    GET_BREED_IMAGES(state) {
      return state.breed_images;
    },
  },
  mutations: {
    SET_IMAGES(state, payload) {
      state.images = payload;
    },
    SET_UPLOAD_IMAGE(state, payload) {
      state.uploaded_image = payload;
    },
    SET_BREED_IMAGES(state, payload) {
      state.breed_images = payload;
    },
  },
  actions: {
    async LOAD_IMAGES({ commit }, limit) {
      let query_params = {
        limit: limit,
        has_breeds: 1,
        upload_image: null,
      };

      try {
        let images = await api.loadData("/search", query_params);
        commit("SET_IMAGES", images.data);
      } catch (err) {
        console.log(err);
      }
    },
    async LOAD_BREED({ commit }, { limit, breed_ids }) {
      let query_params = {
        limit: limit,
        breed_ids: breed_ids,
      };

      try {
        let images = await api.loadData("/search", query_params);
        commit("SET_BREED_IMAGES", images.data);
      } catch (err) {
        console.log(err);
      }
    },
    async UPLOAD_IMAGE({ commit }, formData) {
      try {
        let image = await api.uploadImage(formData);
        let imagesUploaded = localStorage.images;
        let images = imagesUploaded ? JSON.parse(imagesUploaded) : [];
        images.push(image.data);
        localStorage.setItem("images", JSON.stringify(images));
        commit("SET_UPLOAD_IMAGE", image);
      } catch (err) {
        console.log(err);
      }
    },
  },
  modules: {},
});
