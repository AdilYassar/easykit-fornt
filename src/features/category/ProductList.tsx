/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {FC, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import ProductItem from './ProductItem'; // Ensure correct import path

interface Product {
  _id: string;
  name: string;
  price: number;
  dicountPrice: number;
  image: string;
  quantity: string;
}

interface ProductListProps {
  data: Product[];
}

const ProductList: FC<ProductListProps> = ({data}) => {
  useEffect(() => {
    console.log('Data passed to ProductList:'); // Debugging log
  }, [data]);

  const renderItem = ({item, index}: {item: Product; index: number}) => {
    return <ProductItem item={item} index={index} />;
  };

  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products available</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={item => item._id}
      renderItem={renderItem}
      contentContainerStyle={styles.content}
      numColumns={2}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});

export default ProductList;
