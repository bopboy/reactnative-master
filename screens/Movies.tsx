import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import Swiper from 'react-native-web-swiper'
import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import { TMDB_API_KEY } from '../config'

const Container = styled.ScrollView`
    background-color: ${props => props.theme.mainBgColor};
`
const View = styled.View`
    flex: 1;
`
const { height: SCREEN_HEIGHT } = Dimensions.get("window")
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation: { navigate } }) => {
    const getNowPlaying = () => {
        fetch(`
        https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1&region=kr`)
    }
    return (
        <Container>
            <Swiper
                loop
                timeout={3.5}
                controlsEnabled={false}
                containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
            >
                <View style={{ backgroundColor: "red" }}></View>
                <View style={{ backgroundColor: "blue" }}></View>
                <View style={{ backgroundColor: "grey" }}></View>
                <View style={{ backgroundColor: "yellow" }}></View>
            </Swiper>
        </Container>
    )
}

export default Movies