<template>
    <v-card class="pa-4">
      <v-text-field v-model="newProductForm.name" label="Name"></v-text-field>
      <v-text-field v-model="newProductForm.description" label="Description"></v-text-field>
      <v-text-field type="number" v-model="newProductForm.price" label="Price"></v-text-field>
      <v-text-field type="number" v-model="newProductForm.stock" label="Stock"></v-text-field>
      <v-text-field type="number" v-model="newProductForm.rating" label="Rating"></v-text-field>
      <v-text-field v-model="newProductForm.image" label="Image URL"></v-text-field>
      <v-text-field v-model="newProductForm.category" label="Category"></v-text-field>
      <v-btn color="primary" @click="confirmAndAddProduct">Add Product</v-btn>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useProductStore } from '../stores/ProductStore'; 
  
  const newProductForm = ref({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    rating: 0,
    image: '',
    category: '',
  });
  
  const productStore = useProductStore();
  
  function confirmAndAddProduct() {
    if (window.confirm("You are about to add a new item. Continue?")) {
      addProduct();
    }
  }
  
  async function addProduct() {
    await productStore.addProduct({ ...newProductForm.value });
    alert("Thank you for adding a product!");
  
    newProductForm.value = {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      rating: 0,
      image: '',
      category: '',
    };
  }
  </script>
  