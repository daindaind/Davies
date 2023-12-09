import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from '../utils';

interface PosterProps {
    posterPath: string;
}

const Poster:React.FC<PosterProps> = ({posterPath}) => {
    return (
        <TrendingPoster source={{uri: makeImgPath(posterPath)}}/>
    );
}

const TrendingPoster = styled.Image`
    width: 100px;
    height: 160px;
    border-radius: 10px;
`;

export default Poster;