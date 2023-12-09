import axios from 'axios';
import React, { useState } from "react";
import { Dimensions, FlatList } from "react-native";
import styled from "styled-components/native";
import Swiper from 'react-native-swiper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Slide from '../components/Slide';
import HMedia from '../components/HMedia';
import HList from '../components/HList';
import { useQuery, useQueryClient } from 'react-query';
import { moviesApi } from '../api';
import { MovieResponse } from '../api';
import Loader from '../components/Loading';

const { height: VIEW_HEIGHT } = Dimensions.get("window");

const Movie: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
    const [refreshing, setRefreshing] = useState(false);
    const queryClient = useQueryClient();
    const {
        isLoading: nowPlayingLoading, 
        data: nowPlayingData,
        isRefetching: isRefetchingNowPlaying,
    } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
    const {
        isLoading: upComingLoading, 
        data: upComingData,
        isRefetching: isRefetchingupComing,
    } = useQuery<MovieResponse>(["movies", "upComing"], moviesApi.upComing);
    const {
        isLoading: trendingLoading, 
        data: trendingData,
        isRefetching: isRefetchingTrending,
    } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);
    const loading = nowPlayingLoading || upComingLoading || trendingLoading;

    const onRefresh = async() => {
        setRefreshing(true);
        await queryClient.refetchQueries(["movies"])
        setRefreshing(false);
    }

    const renderHMedia = ({item}) => (
        <HMedia
            key={item.id}
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            originalName={item.original_name}
            releaseDate={item.release_date}
            overview={item.overview}
            fullData={item}
        ></HMedia>
    );

    const movieKeyExfector = (item) => item.id + "";
    return ( loading ? (
        <Loader/>
    ) : (
        upComingData ?
        <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            ListHeaderComponent={
                <>
                    <Swiper
                        horizontal
                        loop={true}
                        autoplay
                        autoplayTimeout={3.45}
                        showsButtons={false}
                        showsPagination={false}
                        containerStyle={{width: "100%", height: VIEW_HEIGHT/4}}
                    >
                    {nowPlayingData?.results && 
                        nowPlayingData.results.map((item, index)=>
                            <Slide
                                key={item.id}
                                backdropPath={item.backdrop_path} 
                                posterPath={item.poster_path}
                                originalTitle={item.original_title}
                                voteAverage={item.vote_average}
                                overview={item.overview}
                            />
                        )
                    }
                    </Swiper>

                    {trendingData ? (
                        <HList
                            title={"Trending Movies"}
                            data={trendingData.results}
                        />
                    ) : null}

                    <ListTitle>Comming Soon</ListTitle>
                    {upComingData ? (
                        <UpCommingListContainer
                            data={upComingData.results}
                            keyExtractor={movieKeyExfector}
                            ItemSeparatorComponent={HSeperator}
                            renderItem={renderHMedia}   
                        />
                    ) : null}
                </>
            }
        />
    : null));
}

const HSeperator = styled.View`
    width: 20px;
    height: 20px;
`;

const ListTitle = styled.Text`
    margin: 15px 15px;
    font-size: 16px;
    color: white;
    font-weight: bold;
`;

const UpCommingListContainer = styled.FlatList`
    padding: 15px;
`;

export default Movie;