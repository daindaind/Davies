import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet, Text, TouchableOpacity, View, useColorScheme} from 'react-native';
import Detail from '../screens/Detail';
import { darkTheme } from '../styles';

const NativeStack = createStackNavigator();

const Stack = () => {
    const isDark = useColorScheme() === "dark";

    return (
    <NativeStack.Navigator
        screenOptions={{
            headerBackTitleVisible: true,
            headerLeftLabelVisible: false,
            headerTitleAlign: 'center',
            headerTintColor: darkTheme.textColor,
            headerStyle: {
                backgroundColor: isDark ? darkTheme.mainBgColor : "white",
                
            }
        }}
    >
        <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
    );
}

export default Stack;