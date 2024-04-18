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

     <v-card-subtitle v-if="!editMode">
        <span class="stockText">Stock: {{ product.data.stock }}</span>
      </v-card-subtitle>

    <v-card-title>
      <template v-if="editMode">{{ product.data.name }}</template>
      <template v-else>
        <v-text-field v-model="editedProduct.name" label="Name"></v-text-field>
      </v-card-title>
      </template>
    <v-card-text>

      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating 
          :model-value="editMode ? editedProduct.rating : product.data.rating"
          color="amber"
          density="compact"
          size="small"
          half-increments
          readonly="!editMode"
        ></v-rating>

        <template v-if="editMode">
          <v-text-field v-model="editedProduct.rating" label="Rating"></v-text-field>
        </template>

        <div class="RatingText" v-else>
          {{ product.data.rating }}
        </div>
      </v-row>
      <br>
      <template v-if="!editMode">
        <div class="text">
          ${{ product.data.price }} </div>
      </template>
      <template v-else>
        <v-text-field v-model="editedProduct.price" label="Price"></v-text-field>
      <template>
      <div>{{ !editMode ? product.data.description : '' }}</div>
      <v-textarea v-model="editedProduct.description" label="Description" v-if="editMode"></v-textarea>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>
    <template v-if="!editMode">
      <v-btn @click="confirmDelete" color="error">Delete</v-btn>
      <v-btn @click="enableEditMode" color="primary">Edit</v-btn>
    </template>
    <template v-else>
      <v-btn @click="confirmUpdate" color="Success">Update</v-btn>
      <v-btn @click="cancelUpdate" color="error">Cancel</v-btn>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { ProductDoc } from '../types/product.ts'; 
import {deleteProduct, updateProduct} from '@/services/TBD';

type props = {
  product: ProductDoc;
};
defineProps<props>();


const editMode = ref(false);
const editedProduct = ref({ ...product.data }); 

const enableEditMode = () => {
  editMode.value = true;
};

const cancelEdit = () => {
  editMode.value = false;
  editedProduct.value = { ...product.data }; 
};

const confirmDelete = () => {
  if(confirm("Are you sure you want to delete this item?")){
    deletePoduct();
  }
}

const deleteProduct = async () => {
  try{
    await deleteProduct(product.id);

  }catch(error){
    console.error('Error deleting product: ', error);
  }
}

const confirmUpdate = () => {
  if (confirm('Are you sure you want to update this product?')) {
    updateProduct();
  }
};

const updateProduct = async () => {
  try {
    await updateProduct(product.id, editedProduct.value); 
    editMode.value = false;
  } catch (error) {
    console.error('Error updating product:', error);
   
  }
};
</script>
