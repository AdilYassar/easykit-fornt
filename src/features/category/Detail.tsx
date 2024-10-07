/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import CustomHeader from '@components/ui/CustomHeader';
import { Colors } from '@utils/Constants';
import SideBar from './SideBar'; // Make sure this path is correct
import { getAllCategories } from '@service/productService';

const Detail: FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const response = await getAllCategories();
     // console.log('Fetched Categories:', response); // Log the fetched data

      // Assuming the response contains a property "categories"
      if (response && response.categories && Array.isArray(response.categories)) {
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

export default Detail;
