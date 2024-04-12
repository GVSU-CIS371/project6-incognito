<template>
  <v-card
    class="vcard"
    max-width="374"
  >
    <v-img
      height="250"
      :src="product.data.image"
      aspect-ratio="1"
      contain
    ></v-img>

     <v-card-subtitle>
        <span class="stockText">Stock: {{ product.data.stock }}</span>
      </v-card-subtitle>

    <v-card-title>{{ product.data.name }}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating 
          :model-value="product.data.rating"
          color="amber"
          density="compact"
          size="small"
          half-increments
          readonly
        ></v-rating>

        <div class="RatingText">
          {{ product.data.rating }}
          </div>
      </v-row>
      <br>
      <div class="text">
        ${{ product.data.price }} </div>

      <div>{{ product.data.description }}</div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { ProductDoc } from '../types/product.ts'; 

type props = {
  product: ProductDoc;
};
defineProps<props>();

</script>
