<template>
  <div class="uploaded">
    <v-container fluid>
      <h2>My uploaded images</h2>
      <template v-if="!cards.length">
        <p class="mb-2">You don't have any images uploaded right now!</p>
        <v-btn to="/cats/new" size="small" variant="outlined">
          Upload image
        </v-btn>
      </template>
      <v-row v-else dense>
        <v-col v-for="card in cards" :key="card.title" cols="12" md="4" sm="6">
          <v-card>
            <v-img
              :src="card.url"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
            >
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "MyImages",
  data() {
    return {
      cards: [],
    };
  },
  created() {
    let imagesUploaded = localStorage.images;
    let images = imagesUploaded ? JSON.parse(imagesUploaded) : [];
    this.cards = images;
  },
};
</script>
