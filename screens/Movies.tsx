import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import Swiper from 'react-native-web-swiper'
import styled from 'styled-components/native'
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native'
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
const BgImg = styled.Image`

`
const Title = styled.Text``
const { height: SCREEN_HEIGHT } = Dimensions.get("window")
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation: { navigate } }) => {
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
                    loop
                    timeout={3.5}
                    controlsEnabled={false}
                    containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
                >
                    {nowPlaying.map(movie => (
                        <View key={movie.id}>
                            <BgImg
                                style={StyleSheet.absoluteFill}
                                source={{ uri: makeImagePath(movie.backdrop_path) }}
                            />
                            <BlurView
                                intensity={90}
                                style={StyleSheet.absoluteFill}
                            >
                                <Title>{movie.original_title}</Title>
                            </BlurView>
                        </View>
                    ))}
                </Swiper>
            </Container>
        )
}

export default Movies