import React from "react";
import { View, Text, FlatList } from "react-native";
import { useQuery, useQueryClient } from 'react-query';
import styled from "styled-components/native";
import { tvApi } from "../api";
import Loader from "../components/Loading";
import HList from "../components/HList";

const Tv = () => {
    const queryClient = useQueryClient();
    const {
        isLoading: airingToDayLoading, 
        data: airingToDayData,
        isRefetching: airingToDayRefreshing,
    } = useQuery(["tvs", "airingToDay"], tvApi.airingToDay);
    const {
        isLoading: topRatedLoading, 
        data: topRatedData,
        isRefetching: topRatedrefreshing,
    } = useQuery(["tvs", "topRated"], tvApi.topRated);
    const {
        isLoading: trendingLoading, 
        data: trendingData,
        isRefetching: trendingRefreshing,
    } = useQuery(["tvs", "trending"], tvApi.trending);
    const loading = airingToDayLoading || topRatedLoading || trendingLoading;
    const refreshing = airingToDayRefreshing || topRatedrefreshing || trendingRefreshing;
    const onRefresh = async() => {
        queryClient.refetchQueries(["tvs"])
    }

    return ( loading ? (
        <Loader/>
    ) : (
        <FlatList
            onRefresh={onRefresh}
            refreshing={refreshing}
            ListHeaderComponent={
                <>
                    <HList title={"Trending"} data={trendingData.results}/>
                    <HList title={"Airing Today"} data={airingToDayData.results}/>
                    <HList title={"Top Rated TV"} data={topRatedData.results}/>
                </>
            }
        />
    ));
}

export default Tv;