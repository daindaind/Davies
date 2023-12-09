import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movie from "../screens/Movie";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import colors from "../colors";
import { MaterialIcons, Feather,  } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Tabs= () => {
    const isDark = useColorScheme() === "dark";
    return (
    <Tab.Navigator 
    sceneContainerStyle={{
        backgroundColor: isDark ? colors.black : colors.white,
    }}
    screenOptions={{
        tabBarStyle: {
            backgroundColor: isDark ? colors.black : colors.white,
        },
        tabBarActiveTintColor: isDark ? colors.white : colors.black,
        tabBarInactiveTintColor: isDark ? colors.dark_gray : colors.dark_white,
        headerStyle: {
            backgroundColor: isDark ? colors.black : colors.white,
        },
        headerTitleStyle: {
            color: isDark ? colors.white : colors.black,
        },
        tabBarLabelStyle: {
            marginTop: 10,
            fontSize: 12,
            fontWeight: "600",
        },
    }}
    >
        <Tab.Screen 
            name="Movie"
            component={Movie}
            options={{
                tabBarIcon: () => (
                    <MaterialIcons name="movie" size={20} color={colors.white} />
                )
            }}
        />
        <Tab.Screen 
            name="Tv"
            component={Tv}
            options={{
                tabBarIcon: () => (
                    <Feather name="tv" size={20} color={colors.white} />
                )
            }}
        />
        <Tab.Screen 
            name="Search"
            component={Search}
            options={{
                tabBarIcon: () => (
                    <Feather name="search" size={20} color={colors.white} />
                )
            }}
        />
      </Tab.Navigator>
    );
}

export default Tabs;