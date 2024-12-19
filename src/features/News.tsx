import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    SectionList,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';

import { navigate } from '@utils/Navigation'; // Your custom navigation utility

interface Article {
    title: string;
    description: string;
    urlToImage: string;
    source: {
        name: string;
    };
    url: string; // To open the article in the browser
}

interface Section {
    title: string;
    data: Article[];
}

const News: React.FC = () => {
    const [sections, setSections] = useState<Section[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(
                    'https://newsapi.org/v2/everything?q=food+OR+grocery&apiKey=65616e2ee13a4347a94031872e9aba7b'
                );
                const data = await response.json();

                const groupedArticles = data.articles.reduce(
                    (acc: { [key: string]: Article[] }, article: Article) => {
                        const sourceName = article.source.name || 'Unknown';
                        if (!acc[sourceName]) acc[sourceName] = [];
                        acc[sourceName].push(article);
                        return acc;
                    },
                    {}
                );

                const sectionsData = Object.keys(groupedArticles).map((key) => ({
                    title: key,
                    data: groupedArticles[key].filter(article => article.urlToImage), // Filter out articles without images
                }));

                setSections(sectionsData);
            } catch (error) {
                console.error('Error fetching the news:', error);
            }
        };

        fetchNews();
    }, []);

    const renderItem = ({ item, index }: { item: Article; index: number }) => {
        const isLargeCard = index % 4 === 0; // Show large card every 4th item
        return (
            <TouchableOpacity
                style={[styles.card, isLargeCard && styles.largeCard]}
                onPress={() => navigate('NewsDetail', { article: item })}
                activeOpacity={0.8}
            >
                {item.urlToImage && (
                    <Image
                        source={{ uri: item.urlToImage }}
                        style={[styles.image, isLargeCard && styles.largeImage]}
                    />
                )}
                <View style={[styles.textContainer, isLargeCard && styles.largeTextContainer]}>
                    <Text style={[styles.title, isLargeCard && styles.largeTitle]} numberOfLines={2}>
                        {item.title}
                    </Text>
                    <Text style={[styles.description, isLargeCard && styles.largeDescription]} numberOfLines={3}>
                        {item.description}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderSectionHeader = ({ section }: { section: Section }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Latest News</Text>
            </View>
            <SectionList
                sections={sections}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item, index) => `${item.title}-${index}`}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 16 }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8f5e9', // Soft green background
    },
    header: {
        backgroundColor: '#81c784', // Green header
        padding: 16,
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        textTransform: 'uppercase',
    },
    sectionHeader: {
        backgroundColor: '#c8e6c9', // Light green section header
        padding: 10,
        marginHorizontal: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#388e3c',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginHorizontal: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        overflow: 'hidden',
    },
    largeCard: {
        flexDirection: 'column',
        marginHorizontal: 12,
        marginBottom: 20,
        borderRadius: 16,
    },
    image: {
        width: Dimensions.get('window').width * 0.3,
        height: 100,
        borderRadius: 8,
        margin: 10,
    },
    largeImage: {
        width: Dimensions.get('window').width - 24,
        height: 200,
        borderRadius: 12,
    },
    textContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    largeTextContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2e7d32',
        marginBottom: 4,
    },
    largeTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2e7d32',
    },
    description: {
        fontSize: 14,
        color: '#666666',
        lineHeight: 18,
    },
    largeDescription: {
        fontSize: 16,
        color: '#555555',
        lineHeight: 22,
    },
});

export default News;
