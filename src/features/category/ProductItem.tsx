import CustomText from '@components/ui/CustomText';
import UniversalAdd from '@components/ui/UniversalAdd';
import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const ProductItem = ({item}: any) => {
  if (!item) {
    return <CustomText variant="h8">Invalid product data</CustomText>; // Fallback if item is undefined
  }

  return (
    <View style={styles.container}>
      {item.image ? (
        <Image source={{uri: item.image}} style={styles.image} />
      ) : (
        <CustomText variant="h8">No Image</CustomText>
      )}

      <CustomText variant="h8" style={styles.name}>
        {item.name || 'Unknown Name'}
      </CustomText>

      {/* Price and Discount Price View */}
      <View style={styles.priceContainer}>
        <CustomText variant="h8" style={styles.price}>
          Price: ${item.price || 0}
        </CustomText>
        <CustomText variant="h8" style={styles.discount}>
          Discount: ${item.dicountPrice || 0}
        </CustomText>
      </View>

      {/* UniversalAdd component here */}
      <View style={styles.addContainer}>
        <UniversalAdd item={item} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  name: {
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'column', // Ensure this is column for vertical layout
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
  },
  price: {
    color: 'red',
    textDecorationLine: 'line-through', // Original price strikethrough
  },
  discount: {
    color: 'green',
    marginTop: 5, // Margin for spacing
  },
  addContainer: {
    marginTop: 10, // Add some spacing above UniversalAdd
    width: '100%',
    alignItems: 'center', // Center the button horizontally
  },
});

export default ProductItem;
