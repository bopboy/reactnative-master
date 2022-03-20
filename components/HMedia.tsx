import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Movie } from '../api'
import Poster from './Poster'
import Votes from './Votes'

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
    font-weight: 500;
    opacity: 0.6;
`
const Title = styled.Text`
    color: black;
    font-weight: 600;
    margin-top: 7px;
    margin-bottom: 5px;
`
interface HMediaProps {
    posterPath: string
    originalTitle: string
    overview: string
    voteAverage?: number
    releaseDate?: string
    fullData: Movie
}
const HMedia: React.FC<HMediaProps> = ({
    posterPath,
    originalTitle,
    voteAverage,
    overview,
    releaseDate,
    fullData
}) => {
    const navigation = useNavigation()
    //@ts-ignore
    const goToDetail = () => { navigation.navigate("Stack", { screen: "Detail", params: { ...fullData } }) }
    return (
        <TouchableOpacity onPress={goToDetail}>
            <HMovie>
                <Poster path={posterPath} />
                <HColumn>
                    <Title>{originalTitle.length > 30 ? `${originalTitle.slice(0, 30)}...` : originalTitle}</Title>
                    {releaseDate ? (<Release>{new Date(releaseDate).toLocaleDateString("ko", {
                        month: "long", day: "numeric", year: "numeric"
                    })}</Release>) : null}
                    {voteAverage ? (<Votes votes={voteAverage} />) : null}
                    <Overview>{overview !== "" && overview.length > 140 ? `${overview.slice(0, 140)}...` : overview}</Overview>
                </HColumn>
            </HMovie>
        </TouchableOpacity>
    )
}
export default HMedia