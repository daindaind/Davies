import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Dimensions, View, StyleSheet, Platform, Share } from "react-native";
import { darkTheme } from '../styles';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Movie, TV, moviesApi, tvApi } from "../api";
import { makeImgPath } from "../utils";
import Poster from "../components/Poster";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "react-query";
import Loader from "../components/Loading";
import { Ionicons } from "@expo/vector-icons";

const { height: VIEW_HEIGHT } = Dimensions.get("window");

const Container = styled.View`
    flex: 1;
    background-color: ${darkTheme.mainBgColor};
`;
const Header = styled.View`
    height: ${VIEW_HEIGHT/3}px;
    justify-content: flex-end;
    padding: 0px 20px;
`;

const Background = styled.Image``;

const Title = styled.Text`
    font-size: 36px;
    color: white;
    font-weight: 500;
    align-self: flex-end;
    margin-left: 15px;
`;

const Overview = styled.Text`
    color: white;
    padding: 20px;
    line-height: 20;
`;

const ShareButton = styled.TouchableOpacity`
    margin-right: 10px;
`;

type RootStackParamList = {
    Detail: Movie | TV;
}
type DetailScreenProps = NativeStackScreenProps<RootStackParamList>

const Detail: React.FC<DetailScreenProps> = ({
    navigation: { setOptions },
    route: { params },
}) => {
    const {
        isLoading: moviesLoading, 
        data: movieData
    } = useQuery(["movie", params.id], moviesApi.detail, {
        enabled: "original_title" in params
    });
    const {
        isLoading: tvLoading, 
        data: tvData
    } = useQuery(["tv", params.id], tvApi.detail, {
        enabled: "original_name" in params
    });

    const data = movieData || tvData;
    const loading = moviesLoading || tvLoading;

    const shareMedia = async () => {
        const isAndroid = Platform.OS === "android";
        if (isAndroid) {
            await Share.share({
                message: `${params.overview}\nmore info: ${data.homepage}`,
                title:  "original_title" in params 
                ? params.original_title : params.original_name,
            })
        } else {
            await Share.share({
                url: `${"https://www.imdb.com/title/${data.imdb_id}" || "${data.homepage}"}`,
                title: "original_title" in params 
                    ? params.original_title : params.original_name,
            })
        }
    }

    useEffect(()=>{
        setOptions({
            title: "original_title" in params ? "Movie" : "Tv Show",
        })
    }, []);

    useEffect(()=>{
        if (data) {
            setOptions({
                headerRight: () => 
                <ShareButton
                    onPress={shareMedia}
                >
                    <Ionicons name="md-share-outline" size={20} color="white"/>
                </ShareButton>
            });
        }
    }, [data]);

    return(
        <Container>
            <Header>
                <Background
                    style={StyleSheet.absoluteFill}
                    source={{uri: makeImgPath(params.backdrop_path || "")}}
                />
                <LinearGradient
                    colors={["transparent", darkTheme.mainBgColor]}
                    style={StyleSheet.absoluteFill}
                />
                
                <View style={{flexDirection: "row"}}>
                    <Poster posterPath={params.poster_path || ""}/>

                    <View style={{flexDirection: "column"}}>
                        <Title>{params.original_title ? params.original_title : params.original_name}</Title>
                    </View>
                </View>
            </Header>
            {loading ? <Loader/> : null}
            <Overview>{params.overview}</Overview>
        </Container>
    );
}

export default Detail;