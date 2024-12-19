/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC, useState } from 'react';
import { Colors } from '@utils/Constants';
import CategorySearchInput from './CategorySearchInput';

const StickyCategorySearch: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]); // Store filtered categories from SearchBar

  // Define the onSearch function that will be passed to the CategorySearchInput
  const handleSearch = (query: string, categories: any[]) => {
    console.log('Search Query:', query); // Log the query
    setSearchQuery(query); // Set the search query

    // Filter the categories based on the query
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategories(filtered); // Update filtered categories
  };

  return (
    <View style={styles.container}>
      <CategorySearchInput onSearch={(query: string) => handleSearch(query, filteredCategories)} />
      
      {/* Conditional rendering of the dropdown with filtered categories */}
      {filteredCategories.length > 0 && (
        <View style={styles.categoryDropdown}>
          {filteredCategories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryItem}
              onPress={() => {
                setSearchQuery(category.name); // Set the query to the selected category name
                setFilteredCategories([]); // Clear filtered categories after selection
              }}
            >
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  shadow: {
    height: 15,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  categoryDropdown: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'absolute',
    top: 60, // Adjust based on the layout
    left: 10,
    right: 10,
    zIndex: 1000, // Ensure dropdown is above other elements
  },
  categoryItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.text,
  },
});

export default StickyCategorySearch;
