import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function DetailScreen({ route }) {
    const [anime, setAnime] = useState({});
    const mal_id = route.params.mal_id;

    useEffect(() => {
        axios.get(`https://api.jikan.moe/v4/anime/${mal_id}`)
            .then((response) => {
                const animeData = {
                    mal_id: response.data.data.mal_id,
                    image_url: response.data.data.images.jpg.large_image_url,
                    title: response.data.data.title,
                    title_english: response.data.data.title_english,
                    title_japanese: response.data.data.title_japanese,
                    type: response.data.data.type,
                    episodes: response.data.data.episodes,
                    status: response.data.data.status,
                    airing: response.data.data.airing,
                    aired_from: response.data.data.aired.from,
                    rating: response.data.data.rating,
                    score: response.data.data.score,
                    scored_by: response.data.data.scored_by,
                    rank: response.data.data.rank,
                    popularity: response.data.data.popularity,
                    synopsis: response.data.data.synopsis,
                    genres: response.data.data.genres.map(genre => genre.name),
                };
                setAnime(animeData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [mal_id]);

    return (
        <View style={styles.container}>
            <ScrollView>
                <Image style={styles.itemImage} source={{ uri: anime.image_url }} />
                <Text style={styles.itemTitle}>{anime.title}</Text>
                <View style={styles.itemMeta}>
                    <Text style={styles.itemMetaText}>{anime.type}</Text>
                    <Text style={styles.itemMetaText}>{anime.episodes} episodes</Text>
                    <Text style={styles.itemMetaText}>{anime.score} score</Text>
                </View>
                <Text style={styles.synopsis}>{anime.synopsis}</Text>
                <View style={styles.genreContainer}>
                    {anime.genres && anime.genres.map((genre) => (
                        <Text style={styles.genre} key={genre.mal_id}>{genre.name}</Text>
                    ))}
                </View>
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    itemTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
        marginHorizontal: 16,
    },
    itemMeta: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginBottom: 8,
    },
    itemMetaText: {
        fontSize: 16,
        color: '#666',
        marginRight: 16,
    },
    synopsis: {
        marginHorizontal: 16,
        marginBottom: 16,
        fontSize: 18,
        lineHeight: 24,
    },
    genreContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 16,
        marginBottom: 16,
    },
    genre: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: '#f2f2f2',
        borderRadius: 4,
        fontSize: 16,
        color: '#333',
    },
});
