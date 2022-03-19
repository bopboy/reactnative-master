import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Detail from '../screens/Detail'
import { BLACK_COLOR, WHITE_COLOR } from '../colors'
import { useColorScheme } from 'react-native'

const NavigateStack = createNativeStackNavigator()

const Stack = () => {
    const isDark = useColorScheme() === "dark"
    return (
        <NavigateStack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerStyle: { backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR },
                headerTitleStyle: { color: isDark ? WHITE_COLOR : BLACK_COLOR }
            }}
        >
            <NavigateStack.Screen name="Detail" component={Detail} />
        </NavigateStack.Navigator>
    )
}

export default Stack