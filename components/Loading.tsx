import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Loader = () => {
    return (
        <LoaderLayout>
            <ActivityIndicator/>
        </LoaderLayout>
    );
}

const LoaderLayout = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default Loader;