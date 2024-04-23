<template>
  <v-app>
    <v-app-bar class="bg-blue-darken-4">
      <v-toolbar-title>My Online Store</v-toolbar-title>
      <v-btn class="mx-5" v-for="link in links" :key="link.text" :to="link.to">
        <v-icon>{{ link.icon }}</v-icon>
        {{ link.text }}
      </v-btn>
    </v-app-bar>
    <v-main class="bg-blue-lighten-5">
      <router-view v-slot="{ Component }">
        <transition name="shrink-explode">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

    <v-footer color="primary" app padless>
      <v-container fluid class="pa-0">
        <v-row justify="space-between" class="ma-0">
          <v-col class="pa-0">
            © 2024 My Online Store. All rights reserved.
          </v-col>
          <v-col class="pa-0" cols="auto">
            <v-btn color="secondary" @click="goToAddItem" class="mr-2">
              <v-icon>mdi-plus</v-icon>
              Add Item
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

const goToAddItem = () => {
  router.push('/add-item');
};

const links = ref([
  { text: "Home", to: "/", icon: "mdi-home" },
  { text: "Electronics", to: "/electronics", icon: "mdi-laptop" },
  { text: "Clothing", to: "/clothing", icon: "mdi-tshirt-crew" },
  { text: "Groceries", to: "/groceries", icon: "mdi-cart" },
  { text: "Best Seller", to: "/bestseller", icon: "mdi-cash-register" },
]);
</script>
