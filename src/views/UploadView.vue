<template>
  <div class="upload">
    <v-container fluid>
      <v-col
        xs12
        class="text-xs-center text-sm-center text-md-center text-lg-center"
      >
        <v-img :src="image_url" height="300px" v-if="image_url" contain></v-img>

        <v-text-field
          label="Select Image"
          @click="pickFile"
          v-model="image_name"
        ></v-text-field>
        <input
          type="file"
          style="display: none"
          ref="image"
          accept="image/*"
          @change="onFilePicked"
        />
      </v-col>
      <v-layout align-center justify-center>
        <v-btn
          v-show="!uploading"
          class="mr-3"
          color="green"
          dark
          large
          @click="pickFile"
        >
          Choose New Image &nbsp; <v-icon>upload</v-icon>
        </v-btn>
        <v-btn
          v-show="image_file && !uploading"
          color="blue"
          dark
          large
          @click="uploadFile"
        >
          Upload &nbsp; <v-icon>upload</v-icon>
        </v-btn>
        <div v-show="uploading">Uploading</div>
      </v-layout>
    </v-container>

    <v-container>
      <v-alert v-show="error_message" :value="true" type="error">
        {{ error_message }}
      </v-alert>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      image_name: "",
      image_file: "",
      image_url: "",

      uploading: false,

      error_message: null,
    };
  },
  computed: {
    ...mapGetters({
      uploaded_image: "GET_UPLOAD_IMAGE",
    }),
  },
  methods: {
    ...mapActions(["UPLOAD_IMAGE"]),
    pickFile() {
      this.error_message = null;
      this.$refs.image.click();
    },

    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.image_name = files[0].name;
        if (this.image_name.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.image_url = fr.result;
          this.image_file = files[0];
        });
      } else {
        this.image_name = "";
        this.image_file = "";
        this.image_url = "";
      }
    },
    async uploadFile() {
      this.uploading = true;
      let formData = new FormData();
      formData.append("file", this.image_file);

      try {
        await this.UPLOAD_IMAGE(formData);
        this.uploading = false;
        this.image_file = null;
      } catch (error) {
        console.log(error);
        this.error_message = error.response.data.message;
        this.uploading = false;
        this.image_file = null;
      }
    },
  },
};
</script>
