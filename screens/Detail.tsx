import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { useEffect } from 'react'
import { Dimensions, StyleSheet, Linking } from 'react-native'
import { useQuery } from 'react-query'
import styled from 'styled-components/native'
import { Movie, moviesApi, TV, tvApi } from '../api'
import { BLACK_COLOR } from '../colors'
import Loader from '../components/Loader'
import Poster from '../components/Poster'
import { makeImagePath } from '../utils'
import * as WebBrowser from 'expo-web-browser'

const { height: SCREEN_HEIGHT } = Dimensions.get("window")
const Container = styled.ScrollView`
    background-color: ${props => props.theme.mainBgColor};
`
const Header = styled.View`
    height: ${SCREEN_HEIGHT / 3}px ;
    justify-content: flex-end;
    padding: 0 20px;
`
const Background = styled.Image``
const Column = styled.View`
    flex-direction: row;
    width: 75%;
`
const Title = styled.Text`
    color: white;
    font-size: 36px;
    align-self: flex-end;
    margin-left: 15px;
    font-weight: 500;
`
const Data = styled.View`
    padding: 0 20px;
`
const Overview = styled.Text`
    color: ${props => props.theme.textColor};
    margin: 20px 0;
`
const VideoBtn = styled.TouchableOpacity`
    flex-direction: row;
`
const BtnText = styled.Text`
    color: black;
    font-weight: 600;
    margin-bottom: 10px;
    line-height: 24px;
    margin-left: 10px;
`
type RootStackParamList = { Detail: Movie | TV }
type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">

const Detail: React.FC<DetailScreenProps> =
    ({ navigation: { setOptions }, route: { params } }) => {
        const isMovie = "original_title" in params
        const { isLoading, data } = useQuery(
            [isMovie ? "movies" : "tv", params.id],
            isMovie ? moviesApi.detail : tvApi.detail,
        )
        useEffect(() => {
            setOptions({ title: "original_title" in params ? "Movie" : "TV Show" })
        }, [])
        const openYTLink = async (vidoeId: string) => {
            const baseUrl = `https://m.youtube.com/watch?v=${vidoeId}`
            // await Linking.openURL(baseUrl)
            await WebBrowser.openBrowserAsync(baseUrl)
        }
        return (
            <Container>
                <Header>
                    <Background
                        style={StyleSheet.absoluteFill}
                        source={{ uri: makeImagePath(params.backdrop_path || "") }}
                    />
                    <LinearGradient
                        colors={["transparent", BLACK_COLOR]}
                        style={StyleSheet.absoluteFill}
                    />
                    <Column>
                        <Poster path={params.poster_path || ""} />
                        <Title>
                            {"original_title" in params ? params.original_title : params.original_name}
                        </Title>
                    </Column>
                </Header>
                <Data>
                    <Overview>{params.overview}</Overview>
                    {isLoading ? <Loader /> : null}
                    {data?.videos?.results?.map(video => (
                        <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
                            <Ionicons name="logo-youtube" color="black" size={24} />
                            <BtnText>{video.name}</BtnText>
                        </VideoBtn>
                    ))}
                </Data>
            </Container>
        )
    }
export default Detail