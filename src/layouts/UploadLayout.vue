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
    <v-main class="main pa-5 pa-15">
      <slot />
    </v-main>
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
