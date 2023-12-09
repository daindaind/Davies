import React from "react";
import styled from "styled-components/native";
import { View, Text, TouchableOpacity } from "react-native";
import { makeImgPath } from '../utils';
import { useNavigation } from "@react-navigation/native";
import { Movie, TV } from "../api";

interface VMediaProps {
    posterPath: string;
    originalTitle: string;
    originalName: string;
    voteAverage: string;
    fullData: Movie | TV;
}

const VMedia:React.FC<VMediaProps> = ({posterPath, originalTitle, originalName, voteAverage, fullData}) => {
    const navigation = useNavigation();
    const goToDetail = () => {
        navigation.navigate("Stack", {screen: "Detail", params: { ...fullData } });
    }
    return (
        <TouchableOpacity 
            onPress={goToDetail}
        >
            <View style={{padding: 5}}>
                <TrendingPoster source={{uri: makeImgPath(posterPath)}}/>
                <View style={{alignItems: "center"}}>
                    <Text style={{fontSize: 10, color: "white"}}>
                        {originalTitle ? originalTitle.slice(0, 13) : originalName ? originalName.slice(0, 13) : "제목없음"}
                        {(originalTitle && originalTitle.length > 13) ? "..." : (originalName && originalName.length > 13) ? "..." : ''}
                    </Text>
                    <Text style={{fontSize: 10, color: "white"}}>
                        ⭐ {voteAverage} /10
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

export default VMedia;