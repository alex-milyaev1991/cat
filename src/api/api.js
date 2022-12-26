import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "DEMO-API-KEY";
axios.defaults.baseURL = "https://api.thecatapi.com/v1/images";

export default {
  loadData: async (url, params) => {
    try {
      let images = await axios.get(url, { params: params });
      return images;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  uploadImage: async (formData) => {
    try {
      let image = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return image;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};
