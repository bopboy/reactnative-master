import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import Swiper from 'react-native-swiper'
import styled from 'styled-components/native'
import { ActivityIndicator, Dimensions, StyleSheet, useColorScheme } from 'react-native'
import { BlurView } from 'expo-blur'
import { TMDB_API_KEY } from '../config'
import { makeImagePath } from '../utils'

const BASE_PATH = "https://api.themoviedb.org/3";
const Container = styled.ScrollView`
`
const View = styled.View`
    flex: 1;
`
const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.mainBgColor};
`
const BgImg = styled.Image``
const Poster = styled.Image`
    width: 100px;
    height: 160px;
    border-radius: 5px;
`
const Title = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color:white;
`
const Wrapper = styled.View`
    flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;
`
const Column = styled.View`
    width: 40%;
    margin-left: 15px;
`
const Overview = styled.Text`
    margin-top: 10px;
    color: rgba(255, 255, 255, 0.8);
`
const Votes = styled(Overview)`
    font-size: 12px;
`

const { height: SCREEN_HEIGHT } = Dimensions.get("window")
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation: { navigate } }) => {
    const isDark = useColorScheme() === "dark"
    const [loading, setLoading] = useState(true)
    const [nowPlaying, setNowPlaying] = useState([])
    const getNowPlaying = async () => {
        const { results } = await (await (fetch(`${BASE_PATH}/movie/now_playing?api_key=${TMDB_API_KEY}&region=kr`))).json()
        setNowPlaying(results)
        setLoading(false)
    }
    useEffect(() => {
        getNowPlaying()
    }, [])
    return loading ?
        (<Loader><ActivityIndicator size="large" color="#00ff00" /></Loader>) :
        (
            <Container>
                <Swiper
                    horizontal
                    loop
                    autoplay
                    autoplayTimeout={3.5}
                    showsButtons={false}
                    showsPagination={false}
                    containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 3 }}
                >
                    {nowPlaying.map(movie => (
                        <View key={movie.id}>
                            <BgImg
                                style={StyleSheet.absoluteFill}
                                source={{ uri: makeImagePath(movie.backdrop_path) }}
                            />
                            <BlurView
                                intensity={100}
                                style={StyleSheet.absoluteFill}
                                tint={isDark ? "light" : "dark"}
                            >
                                <Wrapper>
                                    <Poster source={{ uri: makeImagePath(movie.poster_path) }} />
                                    <Column>
                                        <Title>{movie.original_title}</Title>
                                        <Overview>{movie.overview.slice(0, 90)}...</Overview>
                                        {movie.vote_average > 0 ?
                                            (<Votes>⭐️ {movie.vote_average} / 10</Votes>) : null
                                        }
                                    </Column>
                                </Wrapper>
                            </BlurView>
                        </View>
                    ))}
                </Swiper>
            </Container>
        )
}

export default Movies