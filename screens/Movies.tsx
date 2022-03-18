import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import Swiper from 'react-native-swiper'
import styled from 'styled-components/native'
import { ActivityIndicator, Dimensions, RefreshControl, View } from 'react-native'
import { TMDB_API_KEY } from '../config'
import Slide from '../components/Slide'
import HMedia from '../components/HMedia'
import VMedia from '../components/VMedia'

const BASE_PATH = "https://api.themoviedb.org/3";
const Container = styled.ScrollView`
`
const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.mainBgColor};
`
const ListTitle = styled.Text`
    color: black;
    font-size: 18px;
    font-weight: 600;
    margin-left: 20px;
`
const TrendingScroll = styled.FlatList`
    margin-top: 10px;
`
const ListContainer = styled.View`
    margin-bottom: 40px;
`

const ComingSoonTitle = styled(ListTitle)`
    margin-bottom: 30px;
`
const { height: SCREEN_HEIGHT } = Dimensions.get("window")
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation: { navigate } }) => {
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(true)
    const [nowPlaying, setNowPlaying] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [trending, setTrending] = useState([])
    const getTrending = async () => {
        const { results } = await (await (fetch(`${BASE_PATH}/trending/movie/week?api_key=${TMDB_API_KEY}`))).json()
        setTrending(results)
    }
    const getUpcoming = async () => {
        const { results } = await (await (fetch(`${BASE_PATH}/movie/upcoming?api_key=${TMDB_API_KEY}&page=1&region=kr`))).json()
        setUpcoming(results)
    }
    const getNowPlaying = async () => {
        const { results } = await (await (fetch(`${BASE_PATH}/movie/now_playing?api_key=${TMDB_API_KEY}&page=1&region=kr`))).json()
        setNowPlaying(results)
    }
    const getData = async () => {
        await Promise.all([getTrending(), getUpcoming(), getNowPlaying()])
        setLoading(false)
    }
    useEffect(() => {
        getData()
    }, [])
    const onRefresh = async () => {
        setRefreshing(true)
        await getData()
        setRefreshing(false)
    }
    return loading ?
        (<Loader><ActivityIndicator size="large" color="#00ff00" /></Loader>) :
        (
            <Container
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
            >
                <Swiper
                    horizontal
                    loop
                    autoplay
                    autoplayTimeout={3.5}
                    showsButtons={false}
                    showsPagination={false}
                    containerStyle={{ marginBottom: 20, width: "100%", height: SCREEN_HEIGHT / 3 }}
                >
                    {nowPlaying.map(movie => (
                        <Slide
                            key={movie.id}
                            backdropPath={movie.backdrop_path}
                            posterPath={movie.poster_path}
                            originalTitle={movie.original_title}
                            voteAverage={movie.vote_average}
                            overview={movie.overview}
                        />
                    ))}
                </Swiper>
                <ListTitle>Trending Movies</ListTitle>
                <ListContainer>
                    <TrendingScroll
                        horizontal
                        keyExtractor={item => item.id + ""}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        data={trending}
                        renderItem={({ item }) => (
                            <VMedia
                                posterPath={item.poster_path}
                                originalTitle={item.original_title}
                                voteAverage={item.vote_average}
                            />
                        )}
                        ItemSeparatorComponent={() => (<View style={{ width: 20 }} />)}
                    />
                </ListContainer>
                <ComingSoonTitle>Coming Soon</ComingSoonTitle>
                {
                    upcoming.map(movie => (
                        <HMedia
                            key={movie.id}
                            posterPath={movie.poster_path}
                            originalTitle={movie.original_title}
                            overview={movie.overview}
                            releaseDate={movie.release_date}
                        />
                    ))
                }
            </Container >
        )
}

export default Movies