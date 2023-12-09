import React, { useState } from "react";
import { Dimensions, FlatList, View, Text } from "react-native";
import styled from "styled-components/native";
import { moviesApi, tvApi } from "../api";
import { useQuery, useQueryClient } from 'react-query';
import Loader from "../components/Loading";
import HList from "../components/HList";

const { height: VIEW_HEIGHT, width: VIEW_WIDTH } = Dimensions.get("window");

const Container = styled.ScrollView``;

const SearchBarLayout = styled.View`
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
`;

const SearchBar = styled.TextInput`
    background-color: white;
    border-radius: 20px;
    height: ${Math.floor(VIEW_HEIGHT/17)};
    width: ${Math.floor(VIEW_WIDTH-30)};
    padding: 10px 20px;
    font-size: 13px;
`;

const Search = () => {
    const [query, setQuery] = useState("");
    const {
        isLoading: moviesLoading, 
        data: moviesData, 
        refetch: searchMovies
    } = useQuery(["searchMovies", query], moviesApi.search, {
        enabled: false,
    });

    const {
        isLoading: tvsLoading, 
        data: tvsData, 
        refetch: searchTv
    } = useQuery(["searchTv", query], tvApi.search, {
        enabled: false,
    });

    const onChangeText = (text: string) => setQuery(text);
    const onSubmit = () => {
        if (query === "") {
            return;
        }
        searchMovies();
        searchTv();
    };
    return (
        <Container>
            <SearchBarLayout>
                <SearchBar
                    placeholder="Search for Movie or TV Show"
                    placeholderTextColor="grey"
                    returnKeyType="search"
                    onChangeText={onChangeText}
                    onSubmitEditing={(onSubmit)}
                />
            </SearchBarLayout>
            {moviesLoading || tvsLoading ? <Loader/> : null}
            {moviesData ? <HList title={"Movie"} data={moviesData.results} /> : null}
            {tvsData ? <HList title={"TV"} data={tvsData.results} /> : null}
        </Container>
    );
};

export default Search;