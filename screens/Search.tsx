import React, { useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components/native'
import { moviesApi } from '../api'

const Container = styled.ScrollView``

const SearchBar = styled.TextInput`
    background-color: lightgrey;
    padding: 10px 15px;
    border-radius: 15px;
    width: 90%;
    margin: 10px auto;
`

const Search = () => {
    const [query, setQuery] = useState("")
    const { isLoading: moviesLoading, data: moiveData, refetch: searchMovies } = useQuery(["searchMovies", query], moviesApi.search, { enabled: false })
    const { isLoading: tvLoading, data: tvData, refetch: searchTv } = useQuery(["searchTv", query], moviesApi.search, { enabled: false })
    const onChangeText = (text: string) => setQuery(text)
    const onSubmit = () => {
        if (query === "") return
        searchMovies()
        searchTv()
    }
    return (
        <Container>
            <SearchBar
                placeholder="Search for Movie or Tv Shows"
                placeholderTextColor="black"
                returnKeyType="search"
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
            />
        </Container>
    )
}

export default Search