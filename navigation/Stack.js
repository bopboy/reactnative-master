import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Detail from '../screens/Detail'

const NavigateStack = createNativeStackNavigator()

const Stack = () => {
    return (
        <NavigateStack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
            }}
        >
            <NavigateStack.Screen name="Detail" component={Detail} />
        </NavigateStack.Navigator>
    )
}

export default Stack