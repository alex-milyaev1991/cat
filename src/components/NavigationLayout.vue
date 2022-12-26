<template>
  <v-navigation-drawer temporary>
    <v-list density="compact" nav>
      <v-list-item
        v-for="item in links"
        :key="item.name"
        prepend-icon="mdi-forum"
        :title="item.title"
        :value="item.name"
        :to="{ name: item.name }"
        exact
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      requered: true,
    },
  },
};
</script>
