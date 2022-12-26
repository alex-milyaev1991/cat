<template>
  <v-app>
    <v-toolbar dark prominent>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Cats</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
    <navigation-layout v-model="drawer" :links="links"></navigation-layout>
    <v-main class="main pa-5">
      <slot />
    </v-main>
    <v-footer class="bg-grey-lighten-1" height="50px" app="true">
      <v-row>
        <v-col>
          <p class="text-center">Aleksandr Milyaev 2022</p>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import NavigationLayout from "../components/NavigationLayout.vue";

export default {
  components: {
    NavigationLayout,
  },
  data() {
    return {
      drawer: false,
      links: [
        { name: "home", title: "Home" },
        { name: "my", title: "My images" },
        { name: "new", title: "Upload image" },
      ],
    };
  },
};
</script>
