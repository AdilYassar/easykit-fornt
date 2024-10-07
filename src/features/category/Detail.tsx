/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import CustomHeader from '@components/ui/CustomHeader';
import {Colors} from '@utils/Constants';
import SideBar from './SideBar'; // Make sure this path is correct
import {
  getAllCategories,
  getProductsByCategoryId,
} from '@service/productService';
import ProductList from './ProductList';
import withCart from '@features/cart/WithCart';

const Detail: FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [productsloading, setProductsLoading] = useState<boolean>(true);

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const response = await getAllCategories();
      // console.log('Fetched Categories:', response); // Log the fetched data

      // Assuming the response contains a property "categories"
      if (
        response &&
        response.categories &&
        Array.isArray(response.categories)
      ) {
        setCategories(response.categories);
        setSelectedCategory(response.categories[0]); // Select the first category if available
      } else {
        console.log('No valid categories found in response');
      }
    } catch (error) {
      console.log('Error fetching categories:', error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async (categoryId: string) => {
    try {
      setProductsLoading(true);
      const response = await getProductsByCategoryId(categoryId);
     // console.log('Fetched Products:', response); // Debugging log

      if (response && response.products && Array.isArray(response.products)) {
        setProducts(response.products); // Set only the products array
      } else {
        console.log('No valid products found in response');
        setProducts([]); // Optionally set to an empty array
      }
    } catch (error) {
      console.log('Error fetching products:', error);
      setProducts([]); // Optionally set to an empty array on error
    } finally {
      setProductsLoading(false);
    }
  };
  useEffect(() => {
    if (selectedCategory && selectedCategory._id) {
      fetchProducts(selectedCategory._id);
    }
  }, [selectedCategory]); // Added `selectedCategory` as a dependency

  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={selectedCategory?.name || 'Categories'} search />
      <View style={styles.subContainer}>
        {categoriesLoading ? (
          <ActivityIndicator size="small" color={Colors.border} />
        ) : (
          <SideBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryPress={(category: any) => setSelectedCategory(category)}
          />
        )}

        {productsloading ? (
          <ActivityIndicator size="large" color={Colors.border} style={{}} />
        ) : (
          <ProductList data={products || []} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default withCart(Detail);
