<template>
  <div class="home">
    <v-container fluid>
      <v-progress-circular
        v-if="!cards.length"
        :width="3"
        color="red"
        indeterminate
      ></v-progress-circular>
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
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="white"
                  variant="tonal"
                  @click="handlerMore(card.breed.id)"
                >
                  More
                </v-btn>
              </v-card-actions>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-dialog v-model="isDialog">
          <v-card>
            <v-carousel>
              <v-carousel-item
                v-for="image in currentImages"
                :key="image.id"
                :src="image.url"
                cover
              ></v-carousel-item>
            </v-carousel>
            <v-card-actions>
              <v-btn color="primary" block @click="handlerCloseDialog()"
                >Close Dialog</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "HomeView",
  data() {
    return {
      limit: 12,
      isDialog: false,
    };
  },
  computed: {
    ...mapGetters({
      cards: "GET_IMAGES",
      currentImages: "GET_BREED_IMAGES",
    }),
  },
  created() {
    this.LOAD_IMAGES(this.limit);
  },
  methods: {
    ...mapActions(["LOAD_IMAGES", "LOAD_BREED"]),
    ...mapMutations({
      setBreedImages: "GET_BREED_IMAGES",
    }),
    async handlerMore(id) {
      try {
        let query_params = {
          limit: 8,
          breed_ids: id,
        };

        await this.LOAD_BREED(query_params);

        this.isDialog = true;
      } catch (err) {
        console.log(err);
      }
    },
    handlerCloseDialog() {
      this.isDialog = false;
      this.setBreedImages = [];
    },
  },
};
</script>
