import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import Swiper from 'react-native-swiper'
import styled from 'styled-components/native'
import { ActivityIndicator, Dimensions, RefreshControl } from 'react-native'
import { TMDB_API_KEY } from '../config'
import Slide from '../components/Slide'
import Poster from '../components/Poster'

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
const TrendingScroll = styled.ScrollView`
    margin-top: 10px;
`
const Movie = styled.View`
    margin-right: 10px;
    align-items: center;
`
const Title = styled.Text`
    color: black;
    font-weight: 600;
    margin-top: 7px;
    margin-bottom: 5px;
`
const Votes = styled.Text`
    color: rgba(0,0,0,0.8);
    font-size: 10px;
`
const ListContainer = styled.View`
    margin-bottom: 40px;
`
const HMovie = styled.View`
    padding: 0 30px;
    margin-bottom: 10px;
    flex-direction: row;
`
const HColumn = styled.View`
    margin-left: 15px;
    width: 80%;
`
const Overview = styled.Text`
    color: black;
    opacity: 0.5;
    width: 80%;
`
const Release = styled.Text`
    color: black;
    font-size: 12px;
    margin-vertical: 10px;
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
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingLeft: 20 }}
                    >
                        {trending.map(movie => (
                            <Movie key={movie.id}>
                                <Poster path={movie.poster_path} />
                                <Title>
                                    {movie.original_title.slice(0, 13)}
                                    {movie.original_title.length > 13 ? "..." : ""}
                                </Title>
                                <Votes>{movie.vote_average > 0 ? `⭐️ ${movie.vote_average}/10` : `Coming Soon`}</Votes>
                            </Movie>
                        ))}
                    </TrendingScroll>
                </ListContainer>
                <ComingSoonTitle>Coming Soon</ComingSoonTitle>
                {upcoming.map(movie => (
                    <HMovie key={movie.id}>
                        <Poster path={movie.poster_path} />
                        <HColumn>
                            <Title>{movie.original_title}</Title>
                            <Release>{new Date(movie.release_date).toLocaleDateString("ko", {
                                month: "long", day: "numeric", year: "numeric"
                            })}</Release>
                            <Overview>{movie.overview !== "" && movie.overview.length > 140 ? `${movie.overview.slice(0, 140)}...` : movie.overview}</Overview>
                        </HColumn>
                    </HMovie>
                ))}
            </Container>
        )
}

export default Movies