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
const VSeparator = styled.View`
    height: 20px;
`
const HSeparator = styled.View`
    width: 20px;
`
const { height: SCREEN_HEIGHT } = Dimensions.get("window")
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation: { navigate } }) => {
    const queryClient = useQueryClient()
    const { isLoading: nowPlayingLoading, data: nowPlayingData, isRefetching: isRefetchingNowPlaying } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying)
    const { isLoading: upcomingLoading, data: upcomingData, isRefetching: isRefetchingUpcoming } = useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming)
    const { isLoading: trendingLoading, data: trendingData, isRefetching: isRefetchingTrending } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending)
    const onRefresh = async () => {
        queryClient.refetchQueries(["movies"])
    }
    const loading = nowPlayingLoading || upcomingLoading || trendingLoading
    const refreshing = isRefetchingNowPlaying || isRefetchingTrending || isRefetchingUpcoming
    return loading ?
        (<Loader><ActivityIndicator size="large" color="#00ff00" /></Loader>) :
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
                            posterPath={item.poster_path}
                            originalTitle={item.original_title}
                            overview={item.overview}
                            releaseDate={item.release_date}
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
                                />
                            ))}
                        </Swiper>
                        <ListTitle>Trending Movies</ListTitle>
                        <ListContainer>
                            <TrendingScroll
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                                data={trendingData?.results}
                                keyExtractor={(item) => item.id + ""}
                                renderItem={
                                    ({ item }) => (
                                        <VMedia
                                            posterPath={item.poster_path}
                                            originalTitle={item.original_title}
                                            voteAverage={item.vote_average}
                                        />
                                    )
                                }
                                ItemSeparatorComponent={HSeparator}
                            />
                        </ListContainer>
                        <ComingSoonTitle>Coming Soon</ComingSoonTitle>
                    </>
                }
            />
        )
}

export default Movies