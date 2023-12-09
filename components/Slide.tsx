import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from '../utils';
import { BlurView } from 'expo-blur';
import { StyleSheet, useColorScheme, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface SlideProps {
    backdropPath: string;
    posterPath: string;
    originalTitle: string;
    voteAverage: number;
    overview: string;
}

const Slide:React.FC<SlideProps> = ({backdropPath, posterPath, originalTitle, voteAverage, overview}) => {
    const isDark = useColorScheme() === "dark";
    const navigation = useNavigation();
    const goToDetail = () => {
        navigation.navigate("Stack", {screen: "Detail"});
    }

    return (
        <View>
            <BgImg  source={{uri: makeImgPath(backdropPath)}} />
            <BlurView
                tint={isDark ? "dark" : "light"}
                intensity={50}
                style={StyleSheet.absoluteFill}
            >
                <Wrapper>
                    <Poster source={{uri: makeImgPath(posterPath)}} />
                    <Column>
                        <Title isDark={isDark}>{originalTitle}</Title>
                        <Vote isDark={isDark}>⭐  {voteAverage} /10</Vote>
                        <OverView isDark={isDark}>{overview.slice(0, 130)} ...</OverView>
                    </Column>
                </Wrapper>
            </BlurView>
        </View>
    );
}

const View = styled.View`
    flex: 1;
`;
const BgImg = styled.Image`
    flex: 1;
`;
const Title = styled.Text<{isDark : boolean}>`
    color: ${(props) => props.isDark ? "white" : "black"};
    font-weight: bold;
    font-size: 16px;
`;
const Poster = styled.Image`
    width: 80px;
    height: 140px;
    padding: 10px;
`;
const Wrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 15px
`;
const Column = styled.View`
    flex-direction: column;
    gap: 10px;
    width: 70%;
`;
const Vote = styled.Text<{isDark : boolean}>`
    color: ${(props) => props.isDark ? "white" : "black"};
    font-weight: bold;
`;
const OverView = styled.Text<{isDark : boolean}>`
    color: ${(props) => props.isDark ? "white" : "black"};
    font-size: 13px;
`;

export default Slide;