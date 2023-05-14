import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Stack = createNativeStackNavigator();
import rateLimit from 'axios-rate-limit';

export default function ResultsScreen({ navigation, route }) {
    let searchTerm = route.params.searchTerm;
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const http = rateLimit(axios.create(), { maxRPS: 3 }); // 1 request per second

    const getResults = (searchTerm) => {
        setIsLoading(true);
        http.get(`https://api.jikan.moe/v4/anime/?q=${searchTerm}&current_page=${currentPage}`)
            .then((response) => {
                const animeData = response.data.data.map((anime) => {
                    return {
                        mal_id: anime.mal_id,
                        image_url: anime.images.jpg.image_url,
                        title: anime.title,
                        title_english: anime.title_english,
                        title_japanese: anime.title_japanese,
                        type: anime.type,
                        episodes: anime.episodes,
                        status: anime.status,
                        airing: anime.airing,
                        aired_from: anime.aired.from,
                        rating: anime.rating,
                        score: anime.score,
                        scored_by: anime.scored_by,
                        rank: anime.rank,
                        popularity: anime.popularity,
                        synopsis: anime.synopsis,
                    };
                });
                console.log(animeData.image_url);
                setResults([...results, ...animeData]);
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000); // add a delay of 1 second before the next request
            });
    };


    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemWrapper} onPress={() => navigation.navigate('Detail', { mal_id: item.mal_id })}>
                <Image style={styles.itemImage} source={{ uri: item.image_url }} />
                <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <View style={styles.itemMeta}>
                        <Text style={styles.itemMetaText}>{item.type}</Text>
                        <Text style={styles.itemMetaText}>{item.episodes} episodes</Text>
                        <Text style={styles.itemMetaText}>{item.score} score</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderLoader = () => {
        return (
            isLoading ?
                <View style={styles.loaderStyle}>
                    <ActivityIndicator size="large" color="#aaa" />
                </View> : null
        )
    }

    const loadMoreItems = () => {
        setCurrentPage(currentPage + 1);
    };

    useEffect(() => {
        getResults(searchTerm);
    }, [currentPage]);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContent}
                data={results}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.mal_id}-${index}`}
                ListHeaderComponent={<Text style={styles.headerStyle}>Results</Text>}
                ListFooterComponent={renderLoader}
                onEndReached={loadMoreItems}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        //paddingVertical: 32, // increase the padding value to move the header down
        marginTop: StatusBar.currentHeight, // add padding for status bar
    },
    header: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10, // add margin from top
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 20,
    },
    itemWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    itemImage: {
        width: 60,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 4,
        marginRight: 16,
    },
    itemInfo: {
        flex: 1,
        justifyContent: 'space-between',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    itemMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    itemMetaText: {
        fontSize: 12,
        color: '#666',
        marginRight: 8,
    },
    itemSynopsis: {
        fontSize: 14,
        lineHeight: 20,
    },
    headerStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 16,
    },

});
