import React from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import VMedia from "./VMedia";

interface HListProps {
    title: string;
    data: any[];
}

const HList:React.FC<HListProps> =({title, data}) => {
    const renderVMedia = ({item}) => (
        <VMedia
            key={item.id}
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            originalName={item.original_name}
            voteAverage={item.vote_average}
            fullData={item}
        ></VMedia>
    );

    return (

            <HListContainer>
                <ListTitle>{title}</ListTitle>
                <FlatList
                    data={data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 10}}
                    renderItem={renderVMedia}
                    keyExtractor={(item) => item.id + ""}
                />
            </HListContainer>
    );
}

const HListContainer = styled.View`
    margin-bottom: 10px;
`;

const ListTitle = styled.Text`
    margin: 15px 15px;
    font-size: 16px;
    color: white;
    font-weight: bold;
`;

export default HList;