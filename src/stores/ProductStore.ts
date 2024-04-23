import { defineStore } from "pinia";
import { Product, ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  addDoc
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBgiOmhf1VPuZZWIM9FSCdku26m_NO4Tw",
  authDomain: "project6-incognito.firebaseapp.com",
  projectId: "project6-incognito",
  storageBucket: "project6-incognito.appspot.com",
  messagingSenderId: "129496457942",
  appId: "1:129496457942:web:a043887ad3087251b59f77",
  measurementId: "G-ZKF3MN5KLG",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    products: [] as ProductDoc[],
  }),
  actions: {
    async init() {
      const productsRef = collection(db, "products");
      const querySnapshot = await getDocs(productsRef);

      if (querySnapshot.empty) {
        // Both Electronics and Groceries collections are empty, initialize with default products
        await Promise.all(
          initProducts.map(async (product) => {
            const docref = doc(db, "products", product.id);
            await setDoc(docref, product.data);
          })
        );
        this.products = initProducts;
      } else {
        // Firestore has existing products, load them
        this.products = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data() as Product,
          };
        }) as ProductDoc[];
      }
      
    },
    async addProduct(newProductData: Product) {
      try {
        const docRef = await addDoc(collection(db, "products"), newProductData);
        console.log("Product added with ID: ", docRef.id);
        // Optionally, you might want to update your state with the new product
        this.products.push({ id: docRef.id, data: newProductData });
      } catch (error) {
        console.error("Error adding product: ", error);
      }
    },
    filterByCategory(category: string) {
      return this.products.filter(
        (product) => product.data.category === category
      );
    },
    filterByRating(minRating: number) {
      return this.products.filter(
        (product) => product.data.rating >= minRating
      );
    },
    OriginalProductData(productId: string) {
      return this.products.filter(
        (product) => product.id === productId
      );
    },
  },
});
export { doc };

