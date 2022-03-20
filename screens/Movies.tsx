import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import Swiper from 'react-native-swiper'
import styled from 'styled-components/native'
import { ActivityIndicator, Dimensions, FlatList } from 'react-native'
import Slide from '../components/Slide'
import HMedia from '../components/HMedia'
import VMedia from '../components/VMedia'
import { useQuery, useQueryClient } from 'react-query'
import { MovieResponse, moviesApi, Movie } from '../api'
import Loader from '../components/Loader'
import HList from '../components/HList'

const ListTitle = styled.Text`
    color: black;
    font-size: 18px;
    font-weight: 600;
    margin-left: 20px;
`
const ListContainer = styled.View`
    margin-bottom: 40px;
`
const ComingSoonTitle = styled(ListTitle)`
    margin-bottom: 30px;
`
const VSeparator = styled.View`
    height: 10px;
`
const HSeparator = styled.View`
    width: 20px;
`
const { height: SCREEN_HEIGHT } = Dimensions.get("window")
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation: { navigate } }) => {
    const queryClient = useQueryClient()
    const [refreshing, setRefreshing] = useState(false)
    const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying)
    const { isLoading: upcomingLoading, data: upcomingData } = useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming)
    const { isLoading: trendingLoading, data: trendingData } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending)
    const onRefresh = async () => {
        setRefreshing(true)
        queryClient.refetchQueries(["movies"])
        setRefreshing(false)
    }
    const loading = nowPlayingLoading || upcomingLoading || trendingLoading
    return loading ?
        <Loader /> :
        (
            <FlatList
                onRefresh={onRefresh}
                refreshing={refreshing}
                data={upcomingData?.results}
                keyExtractor={(item) => item.id + ""}
                ItemSeparatorComponent={VSeparator}
                renderItem={
                    ({ item }) => (
                        <HMedia
                            posterPath={item.poster_path || ""}
                            originalTitle={item.original_title}
                            overview={item.overview}
                            releaseDate={item.release_date}
                            fullData={item}
                        />
                    )
                }
                ListHeaderComponent={
                    <>
                        <Swiper
                            horizontal
                            loop
                            autoplay
                            autoplayTimeout={3.5}
                            showsButtons={false}
                            showsPagination={false}
                            containerStyle={{ marginBottom: 20, width: "100%", height: SCREEN_HEIGHT / 3 }}
                        >
                            {nowPlayingData?.results.map(movie => (
                                <Slide
                                    key={movie.id}
                                    backdropPath={movie.backdrop_path || ""}
                                    posterPath={movie.poster_path || ""}
                                    originalTitle={movie.original_title}
                                    voteAverage={movie.vote_average}
                                    overview={movie.overview}
                                    fullData={movie}
                                />
                            ))}
                        </Swiper>
                        {trendingData ? (<HList title="Trending Movies" data={trendingData.results} />) : null}
                        <ComingSoonTitle>Coming Soon</ComingSoonTitle>
                    </>
                }
            />
        )
}

export default Movies