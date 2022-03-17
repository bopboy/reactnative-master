import React from 'react'
import { View, StyleSheet, useColorScheme } from 'react-native'
import styled from 'styled-components/native'
import { makeImagePath } from '../utils'
import { BlurView } from 'expo-blur'
import Poster from './Poster'

const BgImg = styled.Image``
const Title = styled.Text<{ isDark: boolean }>`
    font-size: 16px;
    font-weight: 600;
    color:${props => props.isDark ? props.theme.textColor : "white"};
`
const Wrapper = styled.View`
    flex-direction: row;
    height: 100%;
    width: 90%;
    margin: 0 auto;
    justify-content: space-around;
    align-items: center;
`
const Column = styled.View`
    width: 60%;
    /* margin-left: 15px; */
`
const Overview = styled.Text<{ isDark: boolean }>`
    margin-top: 10px;
    color: ${props => props.isDark ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)"};
`
const Votes = styled(Overview)`
    font-size: 12px;
`

interface SlideProps {
    backdropPath: string
    posterPath: string
    originalTitle: string
    voteAverage: number
    overview: string
}
const Slide: React.FC<SlideProps> = ({
    backdropPath,
    posterPath,
    originalTitle,
    voteAverage,
    overview
}) => {
    const isDark = useColorScheme() === "dark"
    return (
        <View style={{ flex: 1 }}>
            <BgImg
                style={StyleSheet.absoluteFill}
                source={{ uri: makeImagePath(backdropPath) }}
            />
            <BlurView
                intensity={100}
                style={StyleSheet.absoluteFill}
                tint={isDark ? "light" : "dark"}
            >
                <Wrapper>
                    <Poster path={posterPath} />
                    <Column>
                        <Title isDark={isDark}>{originalTitle}</Title>
                        {voteAverage > 0 ?
                            (<Votes isDark={isDark}>⭐️ {voteAverage} / 10</Votes>) : null
                        }
                        <Overview isDark={isDark}>{overview.slice(0, 90)}...</Overview>
                    </Column>
                </Wrapper>
            </BlurView>
        </View>
    )
}
export default Slide