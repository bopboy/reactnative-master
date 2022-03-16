import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text, TouchableOpacity } from 'react-native'

const NavigateStack = createNativeStackNavigator()

const ScreenOne = ({ navigation: { navigate } }) => (
    <TouchableOpacity onPress={() => navigate("Two")}><Text>go to Two</Text></TouchableOpacity>
)
const ScreenTwo = ({ navigation: { navigate } }) => (
    <TouchableOpacity onPress={() => navigate("Three")}><Text>go to Three</Text></TouchableOpacity>
)
const ScreenThree = ({ navigation: { setOptions } }) => (
    <TouchableOpacity onPress={() => setOptions({ title: "Hello" })}><Text>go to Back (Two)</Text></TouchableOpacity>
)
// const ScreenThree = ({ navigation: { goBack } }) => (
//     <TouchableOpacity onPress={() => goBack()}><Text>go to Back (Two)</Text></TouchableOpacity>
// )

const Stack = () => {
    return (
        <NavigateStack.Navigator>
            <NavigateStack.Screen name="One" component={ScreenOne} />
            <NavigateStack.Screen name="Two" component={ScreenTwo} />
            <NavigateStack.Screen name="Three" component={ScreenThree} />
        </NavigateStack.Navigator>
    )
}

export default Stack