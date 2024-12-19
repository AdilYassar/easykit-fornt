import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Ensure this package is installed

const NewsDetail: React.FC<any> = ({ route }) => {
    const { article } = route.params;

    const openInBrowser = () => {
        if (article.url) {
            Linking.openURL(article.url).catch((err) =>
                console.error('Failed to open URL:', err)
            );
        }
    };

    return (
        <ScrollView style={styles.container}>
            {article.urlToImage && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: article.urlToImage }} style={styles.image} />
                    <LinearGradient
                        colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                        style={styles.imageOverlay}
                    />
                    <Text style={styles.imageTitle}>{article.title}</Text>
                </View>
            )}
            <View style={styles.content}>
                <Text style={styles.source}>{article.source.name}</Text>
                <Text style={styles.description}>
                    {article.description || 'No description available.'}
                </Text>
                <TouchableOpacity style={styles.button} onPress={openInBrowser}>
                    <Text style={styles.buttonText}>Read Full Article</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: Dimensions.get('window').width,
        height: 250,
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
    },
    imageTitle: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    content: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20, // To overlap with the image
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    source: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007aff',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        textAlign: 'justify',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#007aff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NewsDetail;
