import React from "react";
import styled from "styled-components/native";
import { View, Text, TouchableOpacity } from "react-native";
import { makeImgPath } from '../utils';
import { useNavigation } from "@react-navigation/native";
import { Movie, TV } from "../api";

interface HMediaProps {
    posterPath: string;
    originalTitle: string;
    originalName: string;
    releaseDate: string;
    overview: string;
    fullData: Movie | TV;
}

const HMedia:React.FC<HMediaProps> = ({posterPath, originalTitle, originalName, releaseDate, overview, fullData}) => {
    const navigation = useNavigation();
    const goToDetail = () => {
        navigation.navigate("Stack", {screen: "Detail", params: { ...fullData }});
    }
    return (
        <TouchableOpacity 
            onPress={goToDetail}
        >
            <View style={{flexDirection: "row", gap: 10, width: "85%"}}>
                <TrendingPoster source={{uri: makeImgPath(posterPath)}}/>
                <View style={{padding: 10, width: "100%", gap: 10}}>
                    <Text style={{color: "white", fontWeight: "bold", fontSize: 16}}>
                        {originalTitle ? originalTitle.slice(0, 13) : originalName 
                        ? originalName.slice(0, 13) : "제목없음"}
                    </Text>
                    <Text style={{color: "white", fontSize: 13}}>
                        {new Date(releaseDate).toLocaleDateString("ko", {year: "numeric", month: "long", day: "numeric"})}
                    </Text>
                    <Text style={{color: "white", width: "85%", fontSize: 13}}>{overview !== "" && overview.length > 80 
                        ?  overview.slice(0, 140) + "..."
                        :  overview}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const TrendingPoster = styled.Image`
    width: 100px;
    height: 160px;
    border-radius: 10px;
`;

export default HMedia;