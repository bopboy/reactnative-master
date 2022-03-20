import React from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'
import VMedia from './VMedia'

const ListTitle = styled.Text`
    color: black;
    font-size: 18px;
    font-weight: 600;
    margin-left: 20px;
    margin-bottom: 20px;
`
const ListContainer = styled.View`
    margin-bottom: 40px;
`
export const HListSeparator = styled.View`
    width:20px;
`
interface HListProps {
    title: string,
    data: any[]
}
const HList: React.FC<HListProps> = ({ title, data }) => {
    return (
        <ListContainer>
            <ListTitle>
                {title}
            </ListTitle>
            <FlatList
                data={data}
                horizontal
                keyExtractor={item => item.id + ""}
                ItemSeparatorComponent={HListSeparator}
                contentContainerStyle={{ paddingHorizontal: 30 }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <VMedia
                        posterPath={item.poster_path}
                        originalTitle={item.original_title ?? item.original_name}
                        voteAverage={item.vote_average}
                        fullData={item}
                    />
                )}
            />
        </ListContainer>
    )
}
export default HList