/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts } from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import RollingBar from 'react-native-rolling-bar';
import CustomText from '@components/ui/CustomText';
import { Keyboard, StyleSheet, TouchableOpacity, View, FlatList, Image, Text, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { FC, useState, useEffect } from 'react';
import { getAllCategories } from '../../service/productService'; // Adjust the path accordingly
import { getProductsByCategoryId } from '../../service/productService'; // Import your fetchProducts API

const CategorySearchInput: FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState<any[]>([]); // Store fetched categories
    const [filteredCategories, setFilteredCategories] = useState<any[]>([]); // Store filtered categories
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null); // Store selected category
    const [products, setProducts] = useState<any[]>([]); // Store fetched products
    const [productsLoading, setProductsLoading] = useState(false); // Loading state for products

    // Fetch categories from API
    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const response = await getAllCategories(); // Fetch all categories

            if (response && response.categories && Array.isArray(response.categories)) {
                setCategories(response.categories); // Store all categories
                setFilteredCategories(response.categories); // Initially show all categories
            }
        } catch (error) {
            console.log('Error fetching categories:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch products by category ID
    const fetchProducts = async (categoryId: string) => {
        try {
            setProductsLoading(true);
            const response = await getProductsByCategoryId(categoryId); // Fetch products by category ID

            if (response && response.products && Array.isArray(response.products)) {
                setProducts(response.products); // Set products array
            } else {
                setProducts([]); // Optionally set to an empty array if no products are found
            }
        } catch (error) {
            console.log('Error fetching products:', error);
            setProducts([]); // Optionally set to an empty array on error
        } finally {
            setProductsLoading(false);
        }
    };

    // Search and filter categories based on the query
    const handleSearch = () => {
        if (searchQuery.trim()) {
            const filtered = categories.filter((category) =>
                category.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredCategories(filtered); // Update filtered categories
            onSearch(searchQuery.trim()); // Optionally pass query to the parent component
        } else {
            setFilteredCategories([]); // If query is empty, clear the filtered categories
        }
        Keyboard.dismiss(); // Close the keyboard after search
    };

    // Reset search state when user starts typing again
    const handleFocus = () => {
        setIsFocused(true);
        setSearchQuery(''); // Clear the search query when focusing the search input
        setFilteredCategories([]); // Clear the filtered categories when starting a new search
        setSelectedCategory(null); // Reset selected category
        onSearch(''); // Optionally reset the search query in parent
    };

    // Fetch categories when the component mounts
    useEffect(() => {
        fetchCategories();
    }, []);

    // Fetch products when the selected category changes
    useEffect(() => {
        if (selectedCategory && selectedCategory._id) {
            fetchProducts(selectedCategory._id); // Fetch products by selected category
        }
    }, [selectedCategory]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={handleFocus} // Reset state when tapping the search bar
                style={styles.searchWrapper}
            >
                <Icon name="search" color={Colors.text} size={RFValue(20)} />
                {isFocused ? (
                    <TextInput
                        style={styles.textInput}
                        placeholder="Search Categories..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearch}
                        autoFocus={true}
                        onBlur={() => setIsFocused(false)}
                        returnKeyType="search"
                    />
                ) : (
                    <RollingBar
                        interval={3000}
                        defaultStyle={false}
                        customStyle={styles.textContainer}
                    >
                        <CustomText variant="h6" fontFamily={Fonts.Medium}>
                            Search "Nachos"
                        </CustomText>
                        <CustomText variant="h6" fontFamily={Fonts.Medium}>
                            Search "Dairy"
                        </CustomText>
                        <CustomText variant="h6" fontFamily={Fonts.Medium}>
                            Search "Frozen Foods"
                        </CustomText>
                        <CustomText variant="h6" fontFamily={Fonts.Medium}>
                            Search "Snacks"
                        </CustomText>
                    </RollingBar>
                )}
                <View style={styles.divide} />
                <Icon name="mic" color={Colors.text} size={RFValue(20)} onPress={() => console.log('Voice search pressed')} />
            </TouchableOpacity>

            {/* Display filtered categories only when there is a search query */}
            {searchQuery.trim() && filteredCategories.length > 0 ? (
                <View style={styles.categoryDropdown}>
                    <FlatList
                        data={filteredCategories}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.categoryItem}
                                onPress={() => {
                                    setSearchQuery(item.name); // Set the query to the selected category name
                                    onSearch(item.name); // Optionally pass the category name to the parent
                                    setFilteredCategories([]); // Clear filtered categories
                                    setSelectedCategory(item); // Set the selected category
                                }}
                            >
                                <CustomText variant="h6" fontFamily={Fonts.Medium}>
                                    {item.name}
                                </CustomText>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={() => (
                            <View style={styles.emptyContainer}>
                                <CustomText variant="h6" fontFamily={Fonts.Regular}>
                                    No categories found.
                                </CustomText>
                            </View>
                        )}
                    />
                </View>
            ) : null}

            {/* Display the selected category */}
            {selectedCategory && (
                <View style={styles.selectedCategoryContainer}>
                    <CustomText variant="h5" fontFamily={Fonts.Bold}>
                        {selectedCategory.name}
                    </CustomText>

                    <Image
                        source={{ uri: selectedCategory.image }}
                        style={styles.selectedCategoryImage}
                    />

                    {/* Display the products for the selected category */}
                    {productsLoading ? (
                        <CustomText variant="h6" fontFamily={Fonts.Regular}>
                            Loading products...
                        </CustomText>
                    ) : (
                        <FlatList
                            data={products}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                               <ScrollView>
                                 <View style={styles.productItem}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.productImage}
                                    />
                                    <View style={styles.productDetails}>
                                        <Text style={styles.productName}>{item.name}</Text>
                                        <Text style={styles.productPrice}>${item.price}</Text>
                                    </View>
                                </View>
                               </ScrollView>
                            )}
                            ListEmptyComponent={() => (
                                <CustomText variant="h6" fontFamily={Fonts.Regular}>
                                    No products found for this category.
                                </CustomText>
                            )}
                        />
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3F4F7',
        flexDirection: 'column',
        marginTop: 15,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Colors.border,
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    textInput: {
        width: '85%',
        paddingLeft: 10,
        height: 45,
        fontSize: RFValue(14),
        color: Colors.text,
        fontFamily: Fonts.Regular,
    },
    textContainer: {
        width: '90%',
        paddingLeft: 10,
        height: 50,
    },
    divide: {
        width: 1,
        height: 24,
        backgroundColor: '#ddd',
        marginHorizontal: 10,
    },
    categoryDropdown: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginTop: 10,
        maxHeight: 250,
        borderWidth: 1,
        borderColor: Colors.border,
        position: 'absolute',
        top: 70,
        left: 10,
        right: 10,
        zIndex: 1000,
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    categoryItem: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: Colors.border,
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    selectedCategoryContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.border,
        elevation: 5,
    },
    selectedCategoryImage: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 10,
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: Colors.border,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 15,
    },
    productDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    productName: {
        fontFamily: Fonts.Bold,
        fontSize: RFValue(14),
        color: Colors.text,
    },
    productPrice: {
        fontFamily: Fonts.Regular,
        fontSize: RFValue(12),
        color: Colors.primary,
    },
});

export default CategorySearchInput;
