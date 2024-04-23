<template>
  <v-card class="vcard" max-width="374">
    <v-img
      height="250"
      :src="editedProduct.data.image"
      aspect-ratio="1"
      contain
    ></v-img>

    <v-card-subtitle v-if="!editMode">
      <span class="stockText">Stock: {{ editedProduct.data.stock }}</span>
    </v-card-subtitle>

    <v-card-title>
      <template v-if="!editMode">{{ editedProduct.data.name }}</template>
      <template v-else>
        <v-text-field
          v-model="editedProduct.data.name"
          label="Name"
        ></v-text-field
      ></template>
    </v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :model-value="
            editMode ? editedProduct.data.rating : product.data.rating
          "
          color="amber"
          density="compact"
          size="small"
          half-increments
          :readonly="!editMode"
        ></v-rating>

        <template v-if="editMode">
          <v-text-field
            v-model="editedProduct.data.rating"
            label="Rating"
          ></v-text-field>
        </template>

        <div class="RatingText" v-else>
          {{ editedProduct.data.rating }}
        </div>
      </v-row>
      <br />
      <template v-if="!editMode">
        <div class="text">${{ editedProduct.data.price }}</div>
      </template>
      <template v-else>
        <v-text-field
          v-model="editedProduct.data.price"
          label="Price"
        ></v-text-field>
      </template>
      <div>{{ !editMode ? editedProduct.data.description : "" }}</div>
      <v-textarea
        v-model="editedProduct.data.description"
        label="Description"
        v-if="editMode"
      ></v-textarea>
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
import { ref } from "vue";
import { ProductDoc } from "../types/product.ts";
// import { deleteProduct, updateProduct } from "@/services/TBD";
import { useProductStore, db, doc } from "../stores/ProductStore";

const productStore = useProductStore();

type ProductType = {
  product: ProductDoc;
};
const props = defineProps<ProductType>();

const editMode = ref(false);
const editedProduct = ref(props.product);

console.log(editedProduct);

const enableEditMode = () => {
  editMode.value = true;
};

const cancelUpdate = () => {
  const original_product = productStore.products.find((ogproduct) => ogproduct.id === editedProduct.value.id);
  if(original_product){
    editedProduct.data.rating = original_product.data.rating;
    editedProduct.data.name = original_product.data.name;
    editedProduct.data.description = original_product.data.description;
    editedProduct.data.stock = original_product.data.stock;
  }
  editMode.value = false;
};

const confirmDelete = () => {
  if (confirm("Are you sure you want to delete this item?")) {
    productStore.deleteProduct(editedProduct.value.id);
  }
};

// const deleteProduct = async () => {
//   try {
//     await deleteProduct(product.id);
//   } catch (error) {
//     console.error("Error deleting product: ", error);
//   }
// };

const confirmUpdate = () => {
  if (confirm("Are you sure you want to update this product?")) {
    
  }
};

// const updateProduct = async () => {
//   try {
//     await updateProduct(product.id, editedProduct.data.value);
//     editMode.value = false;
//   } catch (error) {
//     console.error("Error updating product:", error);
//   }
// };
</script>
