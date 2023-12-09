import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from "./Tabs";
import Stack from "./Stack";

const RootNav = createStackNavigator();

const RootNavigation = () => {
    return (
        <RootNav.Navigator screenOptions={{presentation: "modal", headerShown:false}}>
            <RootNav.Screen name="Tabs" component={Tabs}/>
            <RootNav.Screen name="Stack" component={Stack}/>
        </RootNav.Navigator>
    );
}

export default RootNavigation;