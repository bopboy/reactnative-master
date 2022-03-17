import React from 'react'
// import { TouchableOpacity, Text } from 'react-native'
import styled from 'styled-components/native'

const Btn = styled.TouchableOpacity`
    flex:1;
    justify-content: center ;
    align-items: center;
    background-color: ${props => props.theme.mainBgColor};
`
const Title = styled.Text`
    color: ${props => props.theme.textColor};
    /* color: red; */
`
const Movies = ({ navigation: { navigate } }) => (
    <Btn
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        onPress={() => navigate("Stack", { screen: "Three" })}
    >
        <Title>Movies</Title>
    </Btn >
)

export default Movies