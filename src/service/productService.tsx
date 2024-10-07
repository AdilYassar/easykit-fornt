import axios from "axios";
import { BASE_URL } from "./config";

// Fetch all categories
export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`);
     
        return response.data; // Return data on success
      
    } catch (error) {
        console.error('Error fetching categories:', error); // Improved error logging
        return []; // Return an empty array on failure
    }
};

// Fetch products by category ID
export const getProductsByCategoryId = async (id: string ) => {
    try {
        const response = await axios.get(`${BASE_URL}/products/${id}`);
      
        return response.data; // Return data on success
    } catch (error) {
        console.error(`Error fetching products by category ID (${id}):`, error); // Improved error logging
        return []; // Return an empty array on failure
    }
};
